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
          background: 'radial-gradient(circle at 85% 0%, rgba(0,212,255,0.35), rgba(37,99,235,0.25) 35%, #0B1F3A 70%)',
          color: '#fff',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 44, fontWeight: 700, color: '#00D4FF' }}>Delix4</div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.1, maxWidth: 950 }}>
            Building digital products that help businesses grow
          </div>
          <div style={{ marginTop: 28, fontSize: 32, color: '#A3B3C9' }}>
            Web Development · Mobile Apps · AI Solutions
          </div>
        </div>
        <div style={{ fontSize: 28, color: '#A3B3C9' }}>delix4.com</div>
      </div>
    ),
    size
  );
}
