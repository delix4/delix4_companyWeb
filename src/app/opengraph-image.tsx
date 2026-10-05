import { ImageResponse } from 'next/og';

export const alt = 'Delix4 – Building digital products that help businesses grow';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

// Default social share image for every page that does not define its own.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 80,
          background: 'radial-gradient(circle at 20% 0%, rgba(255,215,0,0.25), #000 60%)',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 700, color: '#ffd700' }}>Delix4</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1, maxWidth: 950 }}>
            Building digital products that help businesses grow
          </div>
          <div style={{ marginTop: 28, fontSize: 32, color: '#9ca3af' }}>
            Web Development · Mobile Apps · AI Solutions
          </div>
        </div>
        <div style={{ fontSize: 28, color: '#9ca3af' }}>delix4.com</div>
      </div>
    ),
    size
  );
}
