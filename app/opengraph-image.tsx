import { ImageResponse } from 'next/og';
import { ThoughtsteadMark } from '@/components/thoughtstead-logo';

export const alt = 'Thoughtstead — a life operating system';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f0eee5',
        }}
      >
        <ThoughtsteadMark style={{ width: 96, height: 96 }} />
        <div
          style={{
            marginTop: 28,
            fontSize: 104,
            color: '#11110f',
            fontWeight: 700,
            letterSpacing: -2,
          }}
        >
          Thoughtstead
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: 34,
            color: '#5d6270',
            opacity: 0.66,
          }}
        >
          A life operating system.
        </div>
      </div>
    ),
    { ...size }
  );
}
