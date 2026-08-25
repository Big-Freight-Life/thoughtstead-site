import { ImageResponse } from 'next/og';

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
          background: '#0b0a08',
        }}
      >
        <div style={{ width: 96, height: 4, background: '#a8ce49', display: 'flex' }} />
        <div
          style={{
            marginTop: 36,
            fontSize: 104,
            color: '#f5f1e8',
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
            color: '#f5f1e8',
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
