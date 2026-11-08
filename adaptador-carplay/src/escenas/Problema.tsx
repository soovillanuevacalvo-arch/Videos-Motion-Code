import type { Caption } from "@remotion/captions";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { Celular } from "../components/Celular";
import { FondoAuto } from "../components/FondoAuto";
import { IconoDesconectado, IconoMusica } from "../components/Iconos";
import { Placa, TAMANO_TITULAR } from "../components/Placa";
import { Titular } from "../components/Titular";

// Frame (local) en que el cable se suelta: la música se corta aquí
export const FRAME_TIRON = 18;

const Escena: React.FC<{ ancho: number; alto: number }> = ({ ancho, alto }) => {
  const frame = useCurrentFrame();
  const anchoCel = Math.min(ancho * 0.28, alto * 0.36);
  const suelto = frame >= FRAME_TIRON;
  const sacudida = interpolate(
    frame,
    [FRAME_TIRON, FRAME_TIRON + 12],
    [22, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const caida = interpolate(frame, [FRAME_TIRON, FRAME_TIRON + 14], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
    easing: Easing.out(Easing.cubic),
  });
  const yCel = alto * 0.42 - anchoCel; // borde superior del celular
  const yEnchufe = yCel + anchoCel * 2;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        translate: `${Math.sin(frame * 3) * sacudida}px 0px`,
      }}
    >
      {/* cable que cuelga y se cae */}
      <svg
        width={ancho}
        height={alto + 400}
        style={{ position: "absolute", left: 0, top: 0, overflow: "visible" }}
      >
        <path
          d={`M ${ancho / 2 + caida * 190} ${yEnchufe + caida * 70}
              C ${ancho / 2 + caida * 260} ${yEnchufe + 200}, ${ancho * 0.9} ${alto * 0.95}, ${ancho * 1.1} ${alto + 300}`}
          stroke="#f2f2f2"
          strokeWidth={20}
          fill="none"
          strokeLinecap="round"
        />
        <rect
          x={ancho / 2 - 22 + caida * 190}
          y={yEnchufe - 10 + caida * 70}
          width={44}
          height={70}
          rx={8}
          fill="#d9d9d9"
          stroke="#000"
          strokeWidth={4}
          style={{
            transformBox: "fill-box",
            transformOrigin: "center",
            rotate: `${caida * 55}deg`,
          }}
        />
      </svg>
      <div
        style={{
          position: "absolute",
          left: ancho / 2 - anchoCel / 2,
          top: yCel,
        }}
      >
        <Celular
          ancho={anchoCel}
          progreso={
            suelto ? 0.42 : interpolate(frame, [0, FRAME_TIRON], [0.4, 0.42])
          }
          sonando={!suelto}
        />
      </div>
      {/* música cortada y alerta de desconexión */}
      <div
        style={{
          position: "absolute",
          left: ancho / 2 + anchoCel * 0.55,
          top: yCel + anchoCel * 0.1,
          scale: interpolate(frame, [FRAME_TIRON, FRAME_TIRON + 6], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.back(3)),
          }),
        }}
      >
        <IconoDesconectado size={anchoCel * 0.55} />
      </div>
      <div
        style={{
          position: "absolute",
          left: ancho / 2 - anchoCel * 1.25,
          top: yCel + anchoCel * 0.5 + Math.sin(frame / 6) * 10,
          scale: interpolate(
            frame,
            [FRAME_TIRON + 4, FRAME_TIRON + 10],
            [0, 1],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.out(Easing.back(3)),
            },
          ),
        }}
      >
        <IconoMusica size={anchoCel * 0.6} color="#ffffff" tachado />
      </div>
    </div>
  );
};

export const Problema: React.FC<{
  lineas: readonly string[];
  destacado: string;
  captions: Caption[];
}> = ({ lineas, destacado, captions }) => (
  <Placa
    fondo={<FondoAuto temblor={2} />}
    titular={
      <Titular
        lineas={lineas}
        destacado={destacado}
        tamano={TAMANO_TITULAR}
        inicio={2}
        ritmo={5}
      />
    }
    captions={captions}
    visual={(caja) => <Escena {...caja} />}
  />
);
