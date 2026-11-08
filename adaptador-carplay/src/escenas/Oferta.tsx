import type { Caption } from "@remotion/captions";
import { Efecto } from "../components/Efecto";
import { Easing, interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { FondoAuto } from "../components/FondoAuto";
import { Placa, TAMANO_TITULAR } from "../components/Placa";
import { Producto } from "../components/Producto";
import { Titular } from "../components/Titular";
import { Cables } from "./Gancho";

// Últimos frames: los cables vuelven a entrar y la imagen se sacude, igual que el
// primer frame del gancho, para que el bucle de Meta no se sienta como un corte.
const PuenteBucle: React.FC<{ ancho: number; alto: number }> = ({
  ancho,
  alto,
}) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const desde = durationInFrames - 10;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        opacity: interpolate(frame, [desde, durationInFrames - 1], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
        }),
      }}
    >
      <Cables ancho={ancho} alto={alto} />
    </div>
  );
};

const Escena: React.FC<{ ancho: number; alto: number; foto: string }> = ({
  ancho,
  alto,
  foto,
}) => {
  const frame = useCurrentFrame();
  const anchoProd = Math.min(ancho * 0.7, alto * 1.05);
  return (
    <div
      style={{
        scale: interpolate(frame, [0, 8, 130], [0.6, 1, 1.08], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.back(1.8)),
        }),
        rotate: `${Math.sin(frame / 14) * 3}deg`,
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: -anchoProd * 0.15,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(225,37,27,0.55) 0%, rgba(225,37,27,0) 65%)",
        }}
      />
      <Producto foto={foto} ancho={anchoProd} />
    </div>
  );
};

export const Oferta: React.FC<{
  lineas: readonly string[];
  destacado: string;
  captions: Caption[];
  foto: string;
}> = ({ lineas, destacado, captions, foto }) => (
  <Placa
    fondo={<FondoAuto />}
    lineasTitular={lineas.length}
    titular={
      <Titular
        lineas={lineas}
        destacado={destacado}
        tamano={TAMANO_TITULAR}
        ritmo={0}
      />
    }
    captions={captions}
    visual={(caja) => (
      <>
        <Escena {...caja} foto={foto} />
        <PuenteBucle {...caja} />
      </>
    )}
    extra={
      <>
        <Efecto nombre="whoosh" desde={0} />
      </>
    }
  />
);
