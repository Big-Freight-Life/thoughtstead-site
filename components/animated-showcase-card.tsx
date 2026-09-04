'use client';

import { useEffect, useRef } from 'react';
import styles from './animated-showcase-card.module.css';

/**
 * The complete 15-second loop. These timestamps are intentionally centralized
 * so the pacing can be tuned without touching rendering or presentation code.
 */
export const SHOWCASE_TIMELINE = [
  { phase: 'void', start: 0, end: 2.2, description: 'Sparse particles drift in deep space.' },
  { phase: 'formation', start: 1.6, end: 5.9, description: 'Particles gather into the twin arch.' },
  { phase: 'title', start: 5.1, end: 8.1, description: 'The Thoughtstead title resolves and recedes.' },
  { phase: 'workspace', start: 7.2, end: 12.1, description: 'Product panels settle into a layered workspace.' },
  { phase: 'dissolve', start: 11.8, end: 14.4, description: 'The workspace and arch disperse back into particles.' },
  { phase: 'reset', start: 14.4, end: 15, description: 'The dark opening state returns for a seamless loop.' },
] as const;

const LOOP_SECONDS = 15;
const STATIC_FRAME_SECONDS = 9.45;
const PARTICLE_COUNT_DESKTOP = 5200;
const PARTICLE_COUNT_MOBILE = 2800;

type ParticleRenderer = {
  resize: () => void;
  render: (frame: ParticleFrame) => void;
  destroy: () => void;
};

type ParticleFrame = {
  time: number;
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
    uniform float u_time;
    uniform float u_formation;
    uniform float u_dissolve;
    uniform float u_push;
    uniform float u_alpha;
    uniform float u_aspect;
    uniform float u_dpr;
    varying vec3 v_color;
    varying float v_alpha;

    void main() {
      float shimmer = sin(u_time * (0.7 + a_meta.y * 0.8) + a_meta.y * 38.0) * 0.5 + 0.5;
      vec3 origin = a_origin;
      origin.x += sin(u_time * 0.24 + a_meta.y * 21.0) * (0.018 + a_meta.z * 0.018);
      origin.y += cos(u_time * 0.19 + a_meta.y * 17.0) * (0.014 + a_meta.z * 0.022);

      vec3 target = a_target;
      target.x += sin(u_time * 0.42 + a_meta.y * 30.0) * 0.009;
      target.y += cos(u_time * 0.36 + a_meta.y * 24.0) * 0.008;
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

  for (let index = 0; index < count; index += 1) {
    const offset = index * 3;
    const path = Math.pow(random(), 0.9);
    const side = random() > 0.5 ? 1 : -1;
    const thickness = 0.018 + (1 - path) * 0.052;
    const jitter = (random() + random() + random() - 1.5) * thickness;
    const color = particleColor(path, random() - 0.5);

    origins[offset] = (random() * 2 - 1) * 1.82;
    origins[offset + 1] = (random() * 2 - 1) * 0.88;
    origins[offset + 2] = (random() * 2 - 1) * 0.5;

    targets[offset] = side * (0.115 + 0.82 * Math.pow(1 - path, 0.72)) + jitter;
    targets[offset + 1] = -0.61 + path * 1.28 + (random() - 0.5) * thickness * 1.7;
    targets[offset + 2] = (random() - 0.5) * 0.48 + Math.sin(path * Math.PI) * 0.08;

    metadata[offset] = 1.05 + random() * 2.15;
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
    time: gl.getUniformLocation(program, 'u_time'),
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
    gl.uniform1f(uniforms.time, frame.time);
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

function setPanelFrame(card: HTMLDivElement, name: string, progress: number, exit: number) {
  const opacity = progress * (1 - exit);
  card.style.setProperty(`--${name}-opacity`, opacity.toFixed(4));
  card.style.setProperty(`--${name}-scale`, mix(0.9, 1, progress).toFixed(4));
  card.style.setProperty(`--${name}-y`, `${mix(42, -18 * exit, progress).toFixed(2)}px`);
}

function applyPresentationFrame(card: HTMLDivElement, seconds: number) {
  const titleIn = smoothRange(5.1, 6.15, seconds);
  const titleOut = smoothRange(7.1, 8.1, seconds);
  const titleOpacity = titleIn * (1 - titleOut);
  const uiExit = smoothRange(11.8, 13.45, seconds);
  const code = smoothRange(7.2, 8.25, seconds);
  const agent = smoothRange(7.55, 8.7, seconds);
  const prompt = smoothRange(8.05, 9.15, seconds);
  const arch = smoothRange(1.6, 5.9, seconds) * (1 - smoothRange(12.2, 14.35, seconds));

  card.style.setProperty('--title-opacity', titleOpacity.toFixed(4));
  card.style.setProperty('--title-scale', mix(0.94, 1.035, titleIn).toFixed(4));
  card.style.setProperty('--arch-opacity', arch.toFixed(4));
  setPanelFrame(card, 'code', code, uiExit);
  setPanelFrame(card, 'agent', agent, uiExit);
  setPanelFrame(card, 'prompt', prompt, uiExit);
  card.dataset.phase = SHOWCASE_TIMELINE.find(({ start, end }) => seconds >= start && seconds < end)?.phase || 'reset';

  const formation = smoothRange(1.35, 5.75, seconds);
  const dissolve = smoothRange(12.15, 14.45, seconds);
  const productPresence = Math.max(code, agent, prompt) * (1 - uiExit);
  return {
    time: seconds,
    formation,
    dissolve,
    push: smoothRange(0, 13.8, seconds),
    alpha: 0.12 + formation * 0.74 - productPresence * 0.34 - dissolve * 0.18,
  };
}

export function AnimatedShowcaseCard() {
  const cardRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const restartRef = useRef<() => void>(() => undefined);

  useEffect(() => {
    const card = cardRef.current;
    const canvas = canvasRef.current;
    if (!card || !canvas) return;

    let renderer: ParticleRenderer | null = null;
    try {
      renderer = createParticleRenderer(canvas);
    } catch {
      renderer = null;
    }

    card.dataset.renderer = renderer ? 'webgl' : 'fallback';
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = motionQuery.matches;
    let visible = false;
    let frameId = 0;
    let elapsedMs = 0;
    let previousTime = 0;

    const paint = (seconds: number) => {
      const particleFrame = applyPresentationFrame(card, seconds);
      renderer?.render(particleFrame);
    };

    const animate = (now: number) => {
      if (!visible || reducedMotion) return;
      if (!previousTime) previousTime = now;
      elapsedMs = (elapsedMs + Math.min(now - previousTime, 64)) % (LOOP_SECONDS * 1000);
      previousTime = now;
      paint(elapsedMs / 1000);
      frameId = window.requestAnimationFrame(animate);
    };

    const start = () => {
      if (!visible || reducedMotion || frameId) return;
      previousTime = 0;
      frameId = window.requestAnimationFrame(animate);
      card.dataset.running = 'true';
    };

    const stop = () => {
      if (frameId) window.cancelAnimationFrame(frameId);
      frameId = 0;
      previousTime = 0;
      card.dataset.running = 'false';
    };

    restartRef.current = () => {
      elapsedMs = 0;
      paint(0);
      stop();
      start();
    };

    const visibilityObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio > 0.02;
      if (visible) start();
      else stop();
    }, { threshold: [0, 0.02, 0.15] });

    const resizeObserver = new ResizeObserver(() => {
      renderer?.resize();
      paint(reducedMotion ? STATIC_FRAME_SECONDS : elapsedMs / 1000);
    });

    const handleMotionPreference = (event: MediaQueryListEvent) => {
      reducedMotion = event.matches;
      card.dataset.motion = reducedMotion ? 'reduced' : 'full';
      if (reducedMotion) {
        stop();
        elapsedMs = STATIC_FRAME_SECONDS * 1000;
        paint(STATIC_FRAME_SECONDS);
      } else {
        elapsedMs = 0;
        paint(0);
        start();
      }
    };

    card.dataset.motion = reducedMotion ? 'reduced' : 'full';
    card.dataset.running = 'false';
    paint(reducedMotion ? STATIC_FRAME_SECONDS : 0);
    visibilityObserver.observe(card);
    resizeObserver.observe(card);
    motionQuery.addEventListener('change', handleMotionPreference);

    return () => {
      stop();
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      motionQuery.removeEventListener('change', handleMotionPreference);
      renderer?.destroy();
      restartRef.current = () => undefined;
    };
  }, []);

  return (
    <section className={styles.section} aria-label="Thoughtstead animated product introduction" data-showcase-section>
      <div ref={cardRef} className={styles.card} data-showcase-card>
        <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />
        <div className={styles.atmosphere} aria-hidden="true" />

        <div className={styles.titleMoment} aria-hidden="true">
          <span className={styles.titleMarker} />
          <strong>Thoughtstead</strong>
          <span className={styles.titleCaption}>The whole product, connected.</span>
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

        <div className={styles.vignette} aria-hidden="true" />
        <button
          type="button"
          className={styles.playButton}
          onClick={() => restartRef.current()}
          aria-label="Play the Thoughtstead animated product introduction from the beginning"
        >
          <span aria-hidden="true" />
          Play intro
        </button>
      </div>
    </section>
  );
}
