import {
  AbsoluteFill,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

// Interior de auto oscuro con balanceo suave: siempre hay algo moviéndose
export const FondoAuto: React.FC<{ temblor?: number }> = ({ temblor = 0 }) => {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const sway = Math.sin(frame / 22) * 10;
  const jx = temblor ? Math.sin(frame * 2.7) * temblor : 0;
  const jy = temblor ? Math.cos(frame * 3.1) * temblor * 0.6 : 0;
  return (
    <AbsoluteFill style={{ background: "#0b0b0d", overflow: "hidden" }}>
      <AbsoluteFill
        style={{ translate: `${sway + jx}px ${jy}px`, scale: 1.08 }}
      >
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          <defs>
            <radialGradient id="luz" cx="50%" cy="35%" r="75%">
              <stop offset="0%" stopColor="#2b2d33" />
              <stop offset="60%" stopColor="#141518" />
              <stop offset="100%" stopColor="#070708" />
            </radialGradient>
            <linearGradient id="tablero" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1e1f23" />
              <stop offset="100%" stopColor="#09090a" />
            </linearGradient>
          </defs>
          <rect width={width} height={height} fill="url(#luz)" />
          {/* parabrisas con luces de la calle pasando */}
          {[0, 1, 2, 3].map((i) => (
            <circle
              key={i}
              cx={
                ((frame * 9 + i * width * 0.37) % (width * 1.4)) - width * 0.2
              }
              cy={height * (0.12 + i * 0.035)}
              r={width * 0.05}
              fill={i % 2 ? "#e1251b" : "#fff3d6"}
              opacity={0.07}
            />
          ))}
          <path
            d={`M0 ${height * 0.78} Q ${width / 2} ${height * 0.68} ${width} ${height * 0.78} L ${width} ${height} L 0 ${height} Z`}
            fill="url(#tablero)"
          />
          <path
            d={`M0 ${height * 0.78} Q ${width / 2} ${height * 0.68} ${width} ${height * 0.78}`}
            stroke="#3a3c42"
            strokeWidth={4}
            fill="none"
          />
        </svg>
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 45%, rgba(0,0,0,0.75) 100%)",
          opacity: interpolate(frame, [0, 1], [1, 1]),
        }}
      />
    </AbsoluteFill>
  );
};
