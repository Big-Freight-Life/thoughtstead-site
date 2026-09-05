'use client';

import { useEffect, useRef } from 'react';
import { BigFreightLifeMark } from './big-freight-life-mark';
import styles from './animated-showcase-card.module.css';

/**
 * The complete 15-second loop. These timestamps are intentionally centralized
 * so the pacing can be tuned without touching rendering or presentation code.
 */
export const SHOWCASE_TIMELINE = [
  { phase: 'void', start: 0, end: 1.05, description: 'Sparse particles drift in deep space.' },
  { phase: 'formation', start: 0.85, end: 4.75, description: 'Particles gather into the Thoughtstead mark.' },
  { phase: 'title', start: 3.95, end: 6.95, description: 'The Thoughtstead title resolves and recedes.' },
  { phase: 'hold', start: 6.95, end: 7.4, description: 'The mark holds alone for a beat before the screens arrive.' },
  { phase: 'workspace', start: 7.4, end: 12.3, description: 'Product panels settle into a layered workspace.' },
  { phase: 'dissolve', start: 12, end: 14.6, description: 'The workspace and the mark disperse back into particles.' },
  { phase: 'signoff', start: 14.6, end: 17, description: 'The Big Freight Life mark signs the film off.' },
  { phase: 'gather', start: 17, end: 21, description: 'The field draws back together into the opening drift.' },
  { phase: 'reset', start: 21, end: 21.2, description: 'The dark opening state, already reached before the wrap.' },
] as const;

const LOOP_SECONDS = 21.2;
/**
 * The card's own behaviour, matched to the reference it was modelled on.
 *
 * The card enters at half size and scrubs up to full as it is scrolled in —
 * from the moment its top touches the bottom of the viewport until that top
 * reaches the middle — eased `power2.out`, with roughly a second of catch-up
 * lag. Both the scrub and the pointer pill are damped toward a target every
 * frame instead of being handed to a CSS transition, because a transition
 * fights a reversed scroll and a flicked pointer.
 */
const ENTRY_MIN_SCALE = 0.5;
const ENTRY_SCRUB_RATE = 3.4;
const CURSOR_FOLLOW_RATE = 9;

/**
 * The three filled paths of the Thoughtstead mark — crown, lower-left lobe,
 * lower-right lobe — copied from `thoughtstead-logo.tsx` in its own 64-unit
 * viewBox. The particles form the brand's brain, not an abstract shape, so
 * these must stay in step with the mark: if the logo is redrawn, redraw this.
 * The veins are strokes and are deliberately left out — at this particle
 * density they close the seams that give the mark its shape.
 */
const MARK_VIEWBOX = 64;
const MARK_PATHS = [
  'M6 40c-3-3-4-8-2-12-1-5 2-9 6-12 1-5 5-8 10-8 3-4 8-4 12 .5 4-4.5 10-3.5 13 .5 5 0 9 4 10 9 5 2 7 7 5 12 3 4 1 8-2 11-8.5 1.5-16.5-1-24 1-9.5 2-18-2.5-29-1Z',
  'M6.5 42.3c7.5-1.5 16.5 2.1 24.1-.1 1.5 4.8-1.1 8.8.2 13-1.4 4.1-5.4 6.7-10.1 6.6-4.5-.1-8-2.5-10.1-6-4.2-.8-7-4-6.4-8.2.2-2 1.1-3.6 2.3-4.8Z',
  'M33.8 42.2c7.5 2.2 16.5-1.4 23.8.2 2.4 2.5 3.5 6 2 9.2.8 4-2 7-6 7.7-2.8 3.5-7.5 4.4-11.6 2.1-4.4-1.1-7.4-3.8-7.5-7.3-1.4-4.2 1.4-8.1-.7-11.7Z',
];
/** How much of the card's height the mark occupies once it has formed. Model
 *  space is isotropic — the shader divides x by the aspect ratio, so one unit
 *  is the same number of pixels on both axes and the mark needs no widening. */
const MARK_HEIGHT = 1.28;
const STATIC_FRAME_SECONDS = 9.45;
/* A filled silhouette needs a good deal more than the thin arch this replaced:
   at 5200 the mark read as a haze rather than a shape. */
const PARTICLE_COUNT_DESKTOP = 11000;
const PARTICLE_COUNT_MOBILE = 5200;

type ParticleRenderer = {
  resize: () => void;
  render: (frame: ParticleFrame) => void;
  destroy: () => void;
};

type ParticleFrame = {
  phase: number;
  formation: number;
  dissolve: number;
  push: number;
  alpha: number;
};

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));

function smoothRange(start: number, end: number, value: number) {
  const amount = clamp01((value - start) / (end - start));
  return amount * amount * (3 - 2 * amount);
}

function mix(from: number, to: number, amount: number) {
  return from + (to - from) * amount;
}

function seededRandom() {
  let seed = 0x2f6e2b1;
  return () => {
    seed ^= seed << 13;
    seed ^= seed >>> 17;
    seed ^= seed << 5;
    return (seed >>> 0) / 4294967296;
  };
}

function interpolateColor(from: readonly number[], to: readonly number[], amount: number) {
  return [
    mix(from[0], to[0], amount) / 255,
    mix(from[1], to[1], amount) / 255,
    mix(from[2], to[2], amount) / 255,
  ];
}

function particleColor(height: number, variation: number) {
  const cobalt = [36, 87, 255] as const;
  const sky = [149, 201, 255] as const;
  const mint = [121, 229, 190] as const;
  const paleYellow = [239, 246, 169] as const;
  const softPink = [244, 190, 199] as const;

  if (height < 0.34) return interpolateColor(cobalt, sky, height / 0.34);
  if (height < 0.62) return interpolateColor(sky, mint, (height - 0.34) / 0.28);
  if (height < 0.84) return interpolateColor(mint, paleYellow, (height - 0.62) / 0.22);
  return interpolateColor(paleYellow, softPink, clamp01((height - 0.84) / 0.16 + variation * 0.08));
}

/**
 * Rejection-samples points inside the mark by rasterising it once and reading
 * back the alpha. Filling the real paths is what keeps the silhouette honest —
 * an approximation of a brain drawn in code would drift from the logo the
 * moment either changed.
 */
function sampleMarkPoints(count: number, random: () => number) {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext('2d', { willReadFrequently: true });
  if (!context) return null;

  const scale = size / MARK_VIEWBOX;
  context.setTransform(scale, 0, 0, scale, 0, 0);
  context.fillStyle = '#ffffff';
  for (const definition of MARK_PATHS) context.fill(new Path2D(definition));

  const { data } = context.getImageData(0, 0, size, size);

  // Measured, not assumed. The paths do not fill their own viewBox, and reading
  // the colour ramp over the whole box instead of the mark's own bounds was
  // what kept the mark stuck at the dark blue end of the palette.
  let minX = size;
  let maxX = 0;
  let minY = size;
  let maxY = 0;
  for (let y = 0; y < size; y += 1) {
    for (let x = 0; x < size; x += 1) {
      if (data[(y * size + x) * 4 + 3] < 128) continue;
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
  if (maxX <= minX || maxY <= minY) return null;

  const centreX = (minX + maxX) / 2;
  const centreY = (minY + maxY) / 2;
  // The longer side sets the scale for both, so the mark keeps its proportions.
  const span = Math.max(maxX - minX, maxY - minY);

  const points: number[][] = [];
  // The mark covers roughly half its box, so this lands about two tries per
  // point. The ceiling is only there so a mis-drawn path cannot spin forever.
  const ceiling = count * 60;
  for (let attempt = 0; attempt < ceiling && points.length < count; attempt += 1) {
    const x = Math.min(size - 1, Math.floor(random() * size));
    const y = Math.min(size - 1, Math.floor(random() * size));
    if (data[(y * size + x) * 4 + 3] < 128) continue;
    points.push([
      (x + random() - centreX) / span,
      (y + random() - centreY) / span,
      (maxY - y) / (maxY - minY),
    ]);
  }
  return points.length === count ? points : null;
}

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) throw new Error('Unable to create showcase shader.');
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) || 'Unknown showcase shader error.';
    gl.deleteShader(shader);
    throw new Error(message);
  }
  return shader;
}

function createParticleRenderer(canvas: HTMLCanvasElement): ParticleRenderer | null {
  const gl = canvas.getContext('webgl', {
    alpha: false,
    antialias: true,
    depth: false,
    powerPreference: 'high-performance',
    preserveDrawingBuffer: false,
  });
  if (!gl) return null;

  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, `
    precision highp float;
    attribute vec3 a_origin;
    attribute vec3 a_target;
    attribute vec3 a_meta;
    attribute vec3 a_color;
    uniform float u_phase;
    uniform float u_formation;
    uniform float u_dissolve;
    uniform float u_push;
    uniform float u_alpha;
    uniform float u_aspect;
    uniform float u_dpr;
    varying vec3 v_color;
    varying float v_alpha;

    void main() {
      // Driven by the loop's own phase, never by elapsed seconds, and every
      // frequency is a WHOLE number of turns per loop. Run on raw time these
      // wanders land mid-cycle at the wrap: the origins jump by up to a dozen
      // pixels and every particle's shimmer changes brightness in one frame,
      // which is a cut no amount of fading at the end can hide.
      float shimmerTurns = 2.0 + floor(a_meta.y * 4.0);
      float shimmer = sin(u_phase * shimmerTurns + a_meta.y * 38.0) * 0.5 + 0.5;
      vec3 origin = a_origin;
      origin.x += sin(u_phase + a_meta.y * 21.0) * (0.018 + a_meta.z * 0.018);
      origin.y += cos(u_phase + a_meta.y * 17.0) * (0.014 + a_meta.z * 0.022);

      vec3 target = a_target;
      target.x += sin(u_phase * 2.0 + a_meta.y * 30.0) * 0.009;
      target.y += cos(u_phase * 2.0 + a_meta.y * 24.0) * 0.008;
      float localFormation = smoothstep(a_meta.y * 0.12, 0.72 + a_meta.y * 0.08, u_formation);
      vec3 position = mix(origin, target, localFormation);

      vec3 dispersal = origin * vec3(1.18, 1.1, 1.0);
      dispersal.x += sign(target.x) * (0.12 + a_meta.z * 0.16);
      dispersal.y += (a_meta.y - 0.5) * 0.18;
      position = mix(position, dispersal, u_dissolve);
      position.xy *= 1.0 + u_push * 0.075;

      gl_Position = vec4(position.x / u_aspect, position.y, 0.0, 1.0);
      float depthScale = 1.0 + (0.24 - position.z) * 0.3;
      float openingSize = mix(0.58, 1.0, u_formation);
      gl_PointSize = max(1.0, a_meta.x * u_dpr * depthScale * openingSize * (0.84 + shimmer * 0.3));
      v_color = a_color * (0.72 + shimmer * 0.38);
      v_alpha = u_alpha * (0.36 + a_meta.z * 0.64) * (0.68 + shimmer * 0.32);
    }
  `);

  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, `
    precision mediump float;
    varying vec3 v_color;
    varying float v_alpha;

    void main() {
      float distanceToCenter = length(gl_PointCoord - vec2(0.5)) * 2.0;
      if (distanceToCenter > 1.0) discard;
      float core = smoothstep(0.42, 0.0, distanceToCenter);
      float halo = smoothstep(1.0, 0.18, distanceToCenter) * 0.24;
      float intensity = core + halo;
      gl_FragColor = vec4(v_color * (0.76 + core * 0.75), intensity * v_alpha);
    }
  `);

  const program = gl.createProgram();
  if (!program) throw new Error('Unable to create showcase WebGL program.');
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    throw new Error(gl.getProgramInfoLog(program) || 'Unable to link showcase WebGL program.');
  }
  gl.useProgram(program);

  const count = window.innerWidth < 720 ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
  const origins = new Float32Array(count * 3);
  const targets = new Float32Array(count * 3);
  const metadata = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const random = seededRandom();
  const markPoints = sampleMarkPoints(count, random);
  if (!markPoints) throw new Error('Unable to sample the Thoughtstead mark.');

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    const [u, v, height] = markPoints[index];
    // Height within the mark, bottom to top, which is what the palette reads:
    // cobalt through the lobes, mint and pale yellow across the crown.
    const color = particleColor(height, random() - 0.5);

    origins[offset] = (random() * 2 - 1) * 1.82;
    origins[offset + 1] = (random() * 2 - 1) * 0.88;
    origins[offset + 2] = (random() * 2 - 1) * 0.5;

    targets[offset] = u * MARK_HEIGHT;
    targets[offset + 1] = -v * MARK_HEIGHT;
    // A shallow bulge so the mark reads as a solid rather than a decal.
    targets[offset + 2] = (random() - 0.5) * 0.3 + Math.sin(height * Math.PI) * 0.12;

    metadata[offset] = 1.3 + random() * 2.3;
    metadata[offset + 1] = random();
    metadata[offset + 2] = 0.28 + random() * 0.72;

    colors[offset] = color[0];
    colors[offset + 1] = color[1];
    colors[offset + 2] = color[2];
  }

  const buffers: WebGLBuffer[] = [];
  const addAttribute = (name: string, values: Float32Array) => {
    const location = gl.getAttribLocation(program, name);
    const buffer = gl.createBuffer();
    if (location < 0 || !buffer) throw new Error(`Unable to initialize ${name}.`);
    buffers.push(buffer);
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, values, gl.STATIC_DRAW);
    gl.enableVertexAttribArray(location);
    gl.vertexAttribPointer(location, 3, gl.FLOAT, false, 0, 0);
  };

  addAttribute('a_origin', origins);
  addAttribute('a_target', targets);
  addAttribute('a_meta', metadata);
  addAttribute('a_color', colors);

  const uniforms = {
    phase: gl.getUniformLocation(program, 'u_phase'),
    formation: gl.getUniformLocation(program, 'u_formation'),
    dissolve: gl.getUniformLocation(program, 'u_dissolve'),
    push: gl.getUniformLocation(program, 'u_push'),
    alpha: gl.getUniformLocation(program, 'u_alpha'),
    aspect: gl.getUniformLocation(program, 'u_aspect'),
    dpr: gl.getUniformLocation(program, 'u_dpr'),
  };

  let width = 1;
  let height = 1;
  let dpr = 1;

  const resize = () => {
    width = Math.max(1, canvas.clientWidth);
    height = Math.max(1, canvas.clientHeight);
    dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    const nextWidth = Math.round(width * dpr);
    const nextHeight = Math.round(height * dpr);
    if (canvas.width !== nextWidth || canvas.height !== nextHeight) {
      canvas.width = nextWidth;
      canvas.height = nextHeight;
      gl.viewport(0, 0, nextWidth, nextHeight);
    }
  };

  const render = (frame: ParticleFrame) => {
    resize();
    gl.useProgram(program);
    gl.clearColor(0.008, 0.009, 0.012, 1);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
    gl.uniform1f(uniforms.phase, frame.phase);
    gl.uniform1f(uniforms.formation, frame.formation);
    gl.uniform1f(uniforms.dissolve, frame.dissolve);
    gl.uniform1f(uniforms.push, frame.push);
    gl.uniform1f(uniforms.alpha, frame.alpha);
    gl.uniform1f(uniforms.aspect, width / height);
    gl.uniform1f(uniforms.dpr, dpr);
    gl.drawArrays(gl.POINTS, 0, count);
  };

  return {
    resize,
    render,
    destroy: () => {
      buffers.forEach((buffer) => gl.deleteBuffer(buffer));
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
    },
  };
}

type PanelName = 'code' | 'agent' | 'prompt';

/**
 * Where each panel travels from, in the stage's own space.
 *
 * The workspace already declares `perspective: 1600px` and parks the panels at
 * real depths — the editor at 0, the verdict at 34px, the prompt at 72px — each
 * with its own Y-rotation. None of that used to be animated: all three faded up
 * from `scale(.9)` and rose 42px, identical motion offset only in time, so the
 * product arrived flat and only then occupied a stage that had already been
 * paid for. Three copies of one animation read as one animation repeated rather
 * than as a workspace assembling.
 *
 * These are OFFSETS that decay to zero, so the resting position stays a layout
 * decision in the stylesheet and only the approach lives here.
 */
const PANEL_APPROACH: Record<PanelName, { x: number; y: number; z: number; rotate: number }> = {
  // The editor is the largest surface and sits deepest, so it comes forward
  // from furthest back and swings square to the viewer as it lands.
  code: { x: -46, y: 34, z: -180, rotate: 5 },
  // The verdict arrives from the right — the side it already faces.
  agent: { x: 54, y: 22, z: -140, rotate: -6 },
  // The prompt is the nearest surface and the last to land, so it slides up
  // under the other two rather than flying in, and the stack reads bottom-last.
  prompt: { x: 0, y: 52, z: -60, rotate: 0 },
};

function setPanelFrame(card: HTMLDivElement, name: PanelName, progress: number, exit: number) {
  const approach = PANEL_APPROACH[name];
  // Front-loaded on purpose: opaque by 40% of the travel. A panel that fades
  // across its whole approach is semi-transparent while it moves, so the
  // particle field shows through the editor and it reads as a ghost instead of
  // a surface. The depth change now carries the arrival; the fade only starts it.
  const opacity = clamp01(progress * 2.4) * (1 - exit);
  card.style.setProperty(`--${name}-opacity`, opacity.toFixed(4));
  // Shallower than the old .9: most of the size change is the panel genuinely
  // coming forward through the perspective, and scaling on top of that as well
  // double-counts it.
  card.style.setProperty(`--${name}-scale`, mix(0.965, 1, progress).toFixed(4));
  card.style.setProperty(`--${name}-x`, `${mix(approach.x, 0, progress).toFixed(2)}px`);
  card.style.setProperty(`--${name}-y`, `${mix(approach.y, -18 * exit, progress).toFixed(2)}px`);
  card.style.setProperty(`--${name}-z`, `${mix(approach.z, 0, progress).toFixed(2)}px`);
  card.style.setProperty(`--${name}-rotate`, `${mix(approach.rotate, 0, progress).toFixed(3)}deg`);
}

function applyPresentationFrame(card: HTMLDivElement, seconds: number) {
  // THE BEAT SHEET. The film used to spend its first 1.35s on nothing at all —
  // particles drifting at the opening brightness with no event — and then took
  // 4.4s to form the mark, so it was 6.1s in before it said its own name. That
  // front is where "slow" was being felt, so it is the only thing that moved:
  // the open is cut to a beat, the formation tightened to 4.0s, and everything
  // from the title onward shifted 1.15s earlier by the same amount. Every HOLD
  // is untouched — the title's 0.95s, the workspace's 2.65s (the only reading
  // time in the film), the sign-off's 0.9s, and the gather's 3.5s. Shortening a
  // hold is what makes a film feel rushed; shortening the wait before one does
  // not.
  const titleIn = smoothRange(3.95, 5.0, seconds);
  const titleOut = smoothRange(5.95, 6.95, seconds);
  const titleOpacity = titleIn * (1 - titleOut);
  const uiExit = smoothRange(12.0, 13.65, seconds);
  // The sign-off overlaps the tail of the dissolve, so the mark resolves out of
  // the scattering particles rather than waiting for a blank card.
  const signoff = smoothRange(14.1, 15.1, seconds) * (1 - smoothRange(16.0, 16.9, seconds));
  // THE BEAT BEFORE THE SCREENS. These used to start at 6.05s, while the title
  // was still at about a quarter opacity and falling — the panels arrived on top
  // of the word rather than after it. They now wait until the title has fully
  // cleared at 6.95s and the mark has held alone for a beat.
  const code = smoothRange(7.4, 8.45, seconds);
  const agent = smoothRange(7.75, 8.9, seconds);
  const prompt = smoothRange(8.25, 9.35, seconds);
  const arch = smoothRange(0.85, 4.75, seconds) * (1 - smoothRange(12.4, 14.55, seconds));

  card.style.setProperty('--title-opacity', titleOpacity.toFixed(4));
  card.style.setProperty('--title-scale', mix(0.94, 1.035, titleIn).toFixed(4));
  card.style.setProperty('--arch-opacity', arch.toFixed(4));
  card.style.setProperty('--signoff-opacity', signoff.toFixed(4));
  card.style.setProperty('--signoff-scale', mix(0.965, 1, smoothRange(14.1, 15.1, seconds)).toFixed(4));
  setPanelFrame(card, 'code', code, uiExit);
  setPanelFrame(card, 'agent', agent, uiExit);
  setPanelFrame(card, 'prompt', prompt, uiExit);
  card.dataset.phase = SHOWCASE_TIMELINE.find(({ start, end }) => seconds >= start && seconds < end)?.phase || 'reset';

  const productPresence = Math.max(code, agent, prompt) * (1 - uiExit);

  // THE SEAM. Every value the wrap can show — where each particle is, how
  // bright it is, how far out the field has been pushed — has to arrive back at
  // its t=0 value BY t=LOOP_SECONDS, or the restart reads as a cut however
  // gently the sign-off faded. The film therefore does not end; it gathers the
  // field back into the drift it opened on, and the loop point lands inside a
  // state that is already the opening state.
  //
  // Two windows, deliberately offset. `collapse` lets go of the mark's target
  // first, while the field is still fully dispersed and the change is invisible
  // — do it in one window with the gather and the particles set off toward the
  // mark before turning for the centre, which reads as a wobble. `gather` then
  // brings them home: dispersal back to origin, the push relaxing, the light
  // going with them so the field dims as it converges rather than before it.
  const collapse = smoothRange(16.7, 19.0, seconds);
  const gather = smoothRange(17.5, 21.0, seconds);
  const formed = smoothRange(0.6, 4.6, seconds);

  const formation = formed * (1 - collapse);
  const dissolve = smoothRange(12.35, 14.65, seconds) * (1 - gather);
  const presence = formed * (1 - gather);
  return {
    phase: (seconds / LOOP_SECONDS) * Math.PI * 2,
    formation,
    dissolve,
    push: smoothRange(0, 14.0, seconds) * (1 - gather),
    // The particle field steps back behind the sign-off rather than competing
    // with it — but only a step. At 0.46 it emptied the frame to near black and
    // the credit sat on nothing; the film should still be dispersing behind it.
    alpha: 0.14 + presence * 0.86 - productPresence * 0.34 - dissolve * 0.18 - signoff * 0.3,
  };
}

export function AnimatedShowcaseCard() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const restartRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    const section = sectionRef.current;
    const card = cardRef.current;
    const canvas = canvasRef.current;
    const cursor = cursorRef.current;
    if (!section || !card || !canvas || !cursor) return;

    let renderer: ParticleRenderer | null = null;
    try {
      renderer = createParticleRenderer(canvas);
    } catch {
      renderer = null;
    }

    card.dataset.renderer = renderer ? 'webgl' : 'fallback';
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const hoverQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    let reducedMotion = motionQuery.matches;
    let visible = false;
    let engaged = false;
    let frameId = 0;
    let elapsedMs = 0;
    let previousTime = 0;

    let scale = 1;
    let scaleTarget = 1;
    let pillX = 0;
    let pillY = 0;
    let pointerClientX = 0;
    let pointerClientY = 0;
    let cursorActive = false;

    const paint = (seconds: number) => {
      const particleFrame = applyPresentationFrame(card, seconds);
      renderer?.render(particleFrame);
    };

    // Measured on the section, not the card. The card carries the scale, so
    // reading its own rect would feed the scrub its own output.
    const readScaleTarget = () => {
      const viewport = window.innerHeight;
      if (viewport <= 0) return 1;
      const progress = clamp01((viewport - section.getBoundingClientRect().top) / (viewport / 2));
      return ENTRY_MIN_SCALE + (1 - ENTRY_MIN_SCALE) * (1 - (1 - progress) ** 2);
    };

    const writeScale = (value: number) => {
      scale = value;
      card.style.setProperty('--card-scale', value.toFixed(4));
    };

    // The pointer is kept in client coordinates and converted every frame, so
    // the pill stays under a motionless cursor while the card scrolls and
    // scales beneath it.
    const writePill = (dt: number) => {
      const rect = card.getBoundingClientRect();
      const ratio = rect.width > 0 ? card.offsetWidth / rect.width : 1;
      const targetX = (pointerClientX - rect.left) * ratio;
      const targetY = (pointerClientY - rect.top) * ratio;
      const follow = dt > 0 ? 1 - Math.exp(-dt * CURSOR_FOLLOW_RATE) : 1;
      pillX += (targetX - pillX) * follow;
      pillY += (targetY - pillY) * follow;
      cursor.style.setProperty('--cursor-x', `${pillX.toFixed(2)}px`);
      cursor.style.setProperty('--cursor-y', `${pillY.toFixed(2)}px`);
    };

    const step = (now: number) => {
      frameId = 0;
      if (reducedMotion) return;
      if (!previousTime) previousTime = now;
      const dt = Math.min((now - previousTime) / 1000, 0.064);
      previousTime = now;

      scaleTarget = readScaleTarget();
      const settled = Math.abs(scaleTarget - scale) < 0.0005;
      writeScale(settled ? scaleTarget : scale + (scaleTarget - scale) * (1 - Math.exp(-dt * ENTRY_SCRUB_RATE)));

      if (cursorActive) writePill(dt);

      if (visible) {
        elapsedMs = (elapsedMs + dt * 1000) % (LOOP_SECONDS * 1000);
        paint(elapsedMs / 1000);
      }

      if (engaged || cursorActive || !settled) frameId = window.requestAnimationFrame(step);
      else previousTime = 0;
    };

    const wake = () => {
      if (frameId || reducedMotion) return;
      previousTime = 0;
      frameId = window.requestAnimationFrame(step);
    };

    const stop = () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
      previousTime = 0;
    };

    restartRef.current = () => {
      elapsedMs = 0;
      paint(reducedMotion ? STATIC_FRAME_SECONDS : 0);
      wake();
    };

    const localise = (event: MouseEvent) => {
      pointerClientX = event.clientX;
      pointerClientY = event.clientY;
    };

    const showCursor = (event: MouseEvent) => {
      if (reducedMotion || !hoverQuery.matches || cursorActive) return;
      localise(event);
      const rect = card.getBoundingClientRect();
      const ratio = rect.width > 0 ? card.offsetWidth / rect.width : 1;
      // Placed, not flown in: the pill grows where the pointer already is.
      pillX = (pointerClientX - rect.left) * ratio;
      pillY = (pointerClientY - rect.top) * ratio;
      cursor.style.setProperty('--cursor-x', `${pillX.toFixed(2)}px`);
      cursor.style.setProperty('--cursor-y', `${pillY.toFixed(2)}px`);
      cursorActive = true;
      card.dataset.cursor = 'active';
      wake();
    };

    const hideCursor = () => {
      if (!cursorActive) return;
      cursorActive = false;
      card.dataset.cursor = 'idle';
    };

    const trackCursor = (event: MouseEvent) => {
      if (!cursorActive) {
        showCursor(event);
        return;
      }
      localise(event);
      wake();
    };

    // Two observers. `visible` decides whether the loop is worth painting;
    // `engaged` reaches a viewport further out, so the entry scrub is already
    // running before any of the card has been reached.
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio > 0.02 && !reducedMotion;
      card.dataset.running = visible ? 'true' : 'false';
      if (visible) wake();
    }, { threshold: [0, 0.02, 0.15] });

    const proximityObserver = new IntersectionObserver(([entry]) => {
      const wasEngaged = engaged;
      engaged = entry.isIntersecting;
      if (!engaged || reducedMotion) return;
      if (!wasEngaged) writeScale(readScaleTarget());
      wake();
    }, { rootMargin: '100% 0px 100% 0px' });

    const resizeObserver = new ResizeObserver(() => {
      renderer?.resize();
      paint(reducedMotion ? STATIC_FRAME_SECONDS : elapsedMs / 1000);
    });

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      card.dataset.motion = reducedMotion ? 'reduced' : 'full';
      if (reducedMotion) {
        stop();
        hideCursor();
        writeScale(1);
        visible = false;
        card.dataset.running = 'false';
        elapsedMs = STATIC_FRAME_SECONDS * 1000;
        paint(STATIC_FRAME_SECONDS);
      } else {
        elapsedMs = 0;
        writeScale(readScaleTarget());
        paint(0);
        wake();
      }
    };

    card.dataset.motion = reducedMotion ? 'reduced' : 'full';
    card.dataset.running = 'false';
    card.dataset.cursor = 'idle';
    if (!reducedMotion) writeScale(readScaleTarget());
    paint(reducedMotion ? STATIC_FRAME_SECONDS : 0);
    visibilityObserver.observe(card);
    proximityObserver.observe(section);
    resizeObserver.observe(card);
    motionQuery.addEventListener('change', handleMotionPreference);
    card.addEventListener('mouseenter', showCursor);
    card.addEventListener('mousemove', trackCursor);
    card.addEventListener('mouseleave', hideCursor);
    window.addEventListener('scroll', wake, { passive: true });
    window.addEventListener('resize', wake, { passive: true });

    return () => {
      stop();
      visibilityObserver.disconnect();
      proximityObserver.disconnect();
      resizeObserver.disconnect();
      motionQuery.removeEventListener('change', handleMotionPreference);
      card.removeEventListener('mouseenter', showCursor);
      card.removeEventListener('mousemove', trackCursor);
      card.removeEventListener('mouseleave', hideCursor);
      window.removeEventListener('scroll', wake);
      window.removeEventListener('resize', wake);
      renderer?.destroy();
      restartRef.current = () => undefined;
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label="Thoughtstead animated product introduction"
      data-showcase-section
    >
      {/* The whole card replays, as the pointer pill promises it will. The
          button below is the keyboard and screen-reader route to the same
          thing, so this handler needs no role of its own. */}
      <div
        ref={cardRef}
        className={styles.card}
        data-showcase-card
        onClick={() => restartRef.current()}
      >
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
        <div className={styles.atmosphere} aria-hidden="true" />

        <div className={styles.titleMoment} aria-hidden="true">
          <strong>Thoughtstead</strong>
        </div>

        <div className={styles.workspace} aria-hidden="true">
          <article className={`${styles.panel} ${styles.codePanel}`}>
            <header className={styles.panelBar}>
              <span className={styles.windowDots}><i /><i /><i /></span>
              <b>decision.ts</b>
              <em>Release 2.1</em>
            </header>
            <div className={styles.editorBody}>
              <aside><span>18</span><span>19</span><span>20</span><span>21</span><span>22</span><span>23</span></aside>
              <pre><code><span className={styles.codeMuted}>const</span> decision = valueMatrix({'{'}{`\n`}  assumption: <span className={styles.codeString}>&apos;activation lift&apos;</span>,{`\n`}  falsePositive: <span className={styles.codeNumber}>42</span>,{`\n`}  falseNegative: <span className={styles.codeNumber}>180</span>,{`\n`}{'}'});{`\n\n`}decision.<span className={styles.codeAccent}>shouldShip</span>();</code></pre>
            </div>
            <footer className={styles.editorFooter}><span>Value Matrix</span><i /> <span>Inputs valid</span></footer>
          </article>

          <article className={`${styles.panel} ${styles.agentPanel}`}>
            <header className={styles.agentHeader}><span>Agent review</span><i /></header>
            <div className={styles.agentIdentity}><b>Rollout reviewer</b><span>Evidence connected</span></div>
            <p>The downside rests on one assumption: retained activation after day seven.</p>
            <div className={styles.recommendation}><span>Recommendation</span><strong>Hold the release</strong></div>
            <footer><span>Outbound action</span><b>Parked for approval</b></footer>
          </article>

          <article className={`${styles.panel} ${styles.promptPanel}`}>
            <span className={styles.promptSpark}>✦</span>
            <div><b>Ask Thoughtstead</b><p>Compare the launch assumption with the last three customer calls.</p></div>
            <span className={styles.promptArrow}>↗</span>
          </article>
        </div>

        <div className={styles.signoff} aria-hidden="true">
          <BigFreightLifeMark className={styles.signoffMark} />
          <span className={styles.signoffLine}>Deliver with intent.</span>
        </div>

        <div className={styles.vignette} aria-hidden="true" />

        <div ref={cursorRef} className={styles.cursor} aria-hidden="true">
          <span className={styles.cursorPill}>
            <span className={styles.cursorGlyph} />
            Play intro
          </span>
        </div>

        <div className={styles.playSlot}>
          <button
            type="button"
            className={styles.playButton}
            onClick={(event) => {
              event.stopPropagation();
              restartRef.current();
            }}
            aria-label="Play the Thoughtstead animated product introduction from the beginning"
          >
            <span className={styles.playGlyph} aria-hidden="true" />
            <span className="sr-only">Play intro</span>
          </button>
        </div>
      </div>
    </section>
  );
}
