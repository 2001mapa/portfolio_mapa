import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
export const alt = 'Miguel Albornoz | Ecosistemas Digitales';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
 
export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0a0a0a',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          color: '#e8e4db',
          position: 'relative'
        }}
      >
        <div style={{ 
          position: 'absolute', 
          top: 60, 
          left: 80, 
          display: 'flex', 
          gap: '12px', 
          alignItems: 'center' 
        }}>
          <div style={{ width: 16, height: 16, borderRadius: '50%', background: '#FF4C24' }} />
          <span style={{ fontSize: 24, letterSpacing: '0.3em', fontWeight: 600, color: '#FF4C24' }}>LIVE</span>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '-40px' }}>
          <div style={{ fontSize: 160, fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.9 }}>
            MIGUEL
          </div>
          <div style={{ fontSize: 160, fontWeight: 900, letterSpacing: '-0.05em', lineHeight: 0.9, color: '#4a4a4a' }}>
            ALBORNOZ
          </div>
        </div>

        <div style={{ 
          fontSize: 32, 
          marginTop: 60, 
          borderTop: '2px solid #333', 
          paddingTop: 30, 
          letterSpacing: '0.4em',
          fontWeight: 600,
          color: '#a39481'
        }}>
          ECOSISTEMAS DIGITALES
        </div>
      </div>
    ),
    { ...size }
  );
}
