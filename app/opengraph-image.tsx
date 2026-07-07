import { ImageResponse } from 'next/og';

export const alt = 'Thoughtstead — a homestead for your thoughts';
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
          background: '#FAF7F2',
        }}
      >
        <div style={{ width: 96, height: 4, background: '#3F6212', display: 'flex' }} />
        <div
          style={{
            marginTop: 36,
            fontSize: 104,
            color: '#1A1714',
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
            color: '#1A1714',
            opacity: 0.7,
          }}
        >
          A homestead for your thoughts.
        </div>
      </div>
    ),
    { ...size }
  );
}
