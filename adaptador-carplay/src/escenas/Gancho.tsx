import type { Caption } from "@remotion/captions";
import { interpolate, useCurrentFrame } from "remotion";
import { Celular } from "../components/Celular";
import { FondoAuto } from "../components/FondoAuto";
import { Placa, TAMANO_TITULAR } from "../components/Placa";
import { Titular } from "../components/Titular";

// Cables enredados que se sacuden con fuerza alrededor del celular
export const Cables: React.FC<{ ancho: number; alto: number }> = ({
  ancho,
  alto,
}) => {
  const frame = useCurrentFrame();
  const golpe =
    frame < 14 ? (14 - frame) / 14 : Math.max(0, Math.sin(frame / 5)) ** 8;
  const cables = [
    { color: "#f2f2f2", f: 0.0 },
    { color: "#bdbdbd", f: 1.7 },
    { color: "#e1251b", f: 3.1 },
    { color: "#8a8a8a", f: 4.4 },
  ];
  const cx = ancho / 2;
  const cy = alto / 2;
  return (
    <svg
      width={ancho}
      height={alto}
      style={{ position: "absolute", inset: 0, overflow: "visible" }}
    >
      {cables.map(({ color, f }, i) => {
        const w = (k: number) =>
          Math.sin(frame / 3.2 + f + k) * (40 + golpe * 90);
        const d = `M ${-80} ${alto * (0.2 + i * 0.18)}
          C ${cx * 0.4 + w(1)} ${cy - 260 + w(2)}, ${cx * 0.6 + w(3)} ${cy + 280 + w(4)}, ${cx + w(5)} ${cy + w(6) * 0.5}
          S ${cx * 1.5 + w(7)} ${cy - 300 + w(8)}, ${ancho + 80} ${alto * (0.75 - i * 0.15)}`;
        return (
          <g key={color}>
            <path
              d={d}
              stroke="#000"
              strokeWidth={30}
              fill="none"
              strokeLinecap="round"
              opacity={0.5}
            />
            <path
              d={d}
              stroke={color}
              strokeWidth={20}
              fill="none"
              strokeLinecap="round"
            />
          </g>
        );
      })}
    </svg>
  );
};

const Escena: React.FC<{ ancho: number; alto: number }> = ({ ancho, alto }) => {
  const frame = useCurrentFrame();
  const golpe = frame < 10 ? (10 - frame) * 3 : 0;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        translate: `${Math.sin(frame * 3.3) * golpe}px ${Math.cos(frame * 2.1) * golpe}px`,
        rotate: `${Math.sin(frame / 9) * 4 + Math.sin(frame * 2.5) * golpe * 0.3}deg`,
      }}
    >
      <Celular
        ancho={Math.min(ancho * 0.3, alto * 0.42)}
        progreso={interpolate(frame, [0, 160], [0.3, 0.55])}
        sonando
      />
      <Cables ancho={ancho} alto={alto} />
    </div>
  );
};

export const Gancho: React.FC<{
  lineas: readonly string[];
  destacado: string;
  captions: Caption[];
}> = ({ lineas, destacado, captions }) => {
  return (
    <Placa
      fondo={<FondoAuto temblor={6} />}
      titular={
        <Titular
          lineas={lineas}
          destacado={destacado}
          tamano={TAMANO_TITULAR}
          ritmo={0}
        />
      }
      captions={captions}
      visual={(caja) => <Escena {...caja} />}
    />
  );
};
