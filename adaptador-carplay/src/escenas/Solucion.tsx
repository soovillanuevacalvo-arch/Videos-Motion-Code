import type { Caption } from "@remotion/captions";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { FondoAuto } from "../components/FondoAuto";
import { Placa, TAMANO_TITULAR } from "../components/Placa";
import { Producto } from "../components/Producto";
import { Titular } from "../components/Titular";

export const FRAME_POP = 4; // aparece el producto
export const FRAME_CLIC = 52; // se enchufa al USB

const Escena: React.FC<{ ancho: number; alto: number; foto: string }> = ({
  ancho,
  alto,
  foto,
}) => {
  const frame = useCurrentFrame();
  const anchoProd = Math.min(ancho * 0.5, alto * 0.62);
  const yPuerto = alto * 0.86;
  const destello = interpolate(
    frame,
    [FRAME_CLIC, FRAME_CLIC + 3, FRAME_CLIC + 14],
    [0, 1, 0],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
    },
  );
  return (
    <div style={{ position: "absolute", inset: 0 }}>
      {/* puerto USB del auto */}
      <div
        style={{
          position: "absolute",
          left: ancho / 2 - anchoProd * 0.6,
          top: yPuerto - 30,
          width: anchoProd * 1.2,
          height: 90,
          borderRadius: 24,
          background: "linear-gradient(#26282d,#121316)",
          border: "4px solid #3a3c42",
          boxShadow: `0 0 ${60 * destello}px ${30 * destello}px rgba(80,255,140,${0.6 * destello})`,
        }}
      >
        <div
          style={{
            margin: "26px auto",
            width: 120,
            height: 30,
            background: "#000",
            border: "4px solid #8a8a8a",
            borderRadius: 4,
          }}
        />
      </div>
      <div
        style={{
          position: "absolute",
          left: ancho / 2 - anchoProd / 2 + anchoProd * 0.22,
          top: 0,
          scale: interpolate(frame, [FRAME_POP, FRAME_POP + 10], [0, 1], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.out(Easing.back(2.6)),
          }),
          translate: `0px ${interpolate(
            frame,
            [FRAME_CLIC - 16, FRAME_CLIC],
            [0, yPuerto - anchoProd * 1.02],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
              easing: Easing.in(Easing.cubic),
            },
          )}px`,
          rotate: `${interpolate(
            frame,
            [FRAME_POP, FRAME_POP + 14, FRAME_CLIC - 16, FRAME_CLIC],
            [-30, 80, 80, 90],
            {
              extrapolateLeft: "clamp",
              extrapolateRight: "clamp",
            },
          )}deg`,
        }}
      >
        <Producto foto={foto} ancho={anchoProd} />
      </div>
      {/* onda del clic */}
      <div
        style={{
          position: "absolute",
          left: ancho / 2 - 160,
          top: yPuerto - 140,
          width: 320,
          height: 320,
          borderRadius: "50%",
          border: "10px solid #ffffff",
          opacity: destello,
          scale: interpolate(frame, [FRAME_CLIC, FRAME_CLIC + 14], [0.4, 1.6], {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
          }),
        }}
      />
    </div>
  );
};

export const Solucion: React.FC<{
  lineas: readonly string[];
  destacado: string;
  captions: Caption[];
  foto: string;
}> = ({ lineas, destacado, captions, foto }) => (
  <Placa
    fondo={<FondoAuto />}
    titular={
      <Titular
        lineas={lineas}
        destacado={destacado}
        tamano={TAMANO_TITULAR}
        inicio={2}
        ritmo={4}
      />
    }
    captions={captions}
    visual={(caja) => <Escena {...caja} foto={foto} />}
  />
);
