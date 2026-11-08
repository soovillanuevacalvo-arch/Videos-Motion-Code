import { AbsoluteFill } from "remotion";
import { useSafeArea } from "../layout";

const blocked: React.CSSProperties = {
  position: "absolute",
  background: "rgba(255, 0, 140, 0.35)",
};

export const SafeZones: React.FC = () => {
  const s = useSafeArea();
  return (
    <AbsoluteFill style={{ pointerEvents: "none" }}>
      <div style={{ ...blocked, top: 0, left: 0, right: 0, height: s.top }} />
      <div style={{ ...blocked, bottom: 0, left: 0, right: 0, height: s.bottom }} />
      <div style={{ ...blocked, top: s.top, bottom: s.bottom, left: 0, width: s.left }} />
      <div style={{ ...blocked, top: s.top, bottom: s.bottom, right: 0, width: s.right }} />
      <div
        style={{
          position: "absolute",
          top: s.top,
          left: s.left,
          width: s.width,
          height: s.height,
          border: "4px dashed #00ff88",
          boxSizing: "border-box",
        }}
      />
    </AbsoluteFill>
  );
};
