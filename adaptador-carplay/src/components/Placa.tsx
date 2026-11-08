import type { Caption } from "@remotion/captions";
import { AbsoluteFill } from "remotion";
import { useSafeArea } from "../layout";
import { Subtitulos } from "./Subtitulos";

export const TAMANO_TITULAR = 116; // >= 110 px en 1080 de ancho
export const TAMANO_SUBTITULO = 66; // >= 56 px

// Estructura común de cada placa, dentro de la zona segura:
// titular arriba, visual al medio y subtítulos de la voz abajo.
export const Placa: React.FC<{
  fondo: React.ReactNode;
  titular: React.ReactNode;
  captions: Caption[];
  visual: (caja: { ancho: number; alto: number }) => React.ReactNode;
  extra?: React.ReactNode;
  lineasTitular?: number;
}> = ({ fondo, titular, captions, visual, extra, lineasTitular = 2 }) => {
  const s = useSafeArea();
  const altoTitular = TAMANO_TITULAR * (lineasTitular * 1.22 + 0.1);
  const altoSubs = TAMANO_SUBTITULO * 1.3;
  const altoVisual = s.height - altoTitular - altoSubs - 60;
  return (
    <AbsoluteFill>
      {fondo}
      <div
        style={{
          position: "absolute",
          top: s.top,
          left: s.left,
          width: s.width,
          height: s.height,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{ height: altoTitular, display: "flex", alignItems: "center" }}
        >
          {titular}
        </div>
        <div
          style={{
            height: altoVisual,
            width: "100%",
            position: "relative",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {visual({ ancho: s.width, alto: altoVisual })}
        </div>
        <div
          style={{ height: altoSubs, display: "flex", alignItems: "flex-end" }}
        >
          <Subtitulos captions={captions} tamano={TAMANO_SUBTITULO} />
        </div>
      </div>
      {extra}
    </AbsoluteFill>
  );
};
