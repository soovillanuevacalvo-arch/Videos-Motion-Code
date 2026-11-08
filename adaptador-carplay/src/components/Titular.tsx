import { fitText } from "@remotion/layout-utils";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { useSafeArea } from "../layout";
import { COLORES, FUENTE, textoFuerte } from "../estilo";

export const TAMANO_MINIMO = 110;

const limpiar = (w: string) => w.replace(/[¿?¡!.,]/g, "");

// Junta las palabras clave seguidas en un solo recuadro rojo
const agrupar = (linea: string, clave: string[]) => {
  const grupos: { texto: string; esClave: boolean }[] = [];
  for (const w of linea.split(" ")) {
    const esClave = clave.includes(limpiar(w));
    const ultimo = grupos[grupos.length - 1];
    if (esClave && ultimo?.esClave) ultimo.texto += ` ${w}`;
    else grupos.push({ texto: w, esClave });
  }
  return grupos;
};

// Titular principal: aparece palabra por palabra, la palabra clave va en recuadro rojo
export const Titular: React.FC<{
  lineas: readonly string[];
  destacado: string;
  tamano: number;
  inicio?: number;
  ritmo?: number;
}> = ({ lineas, destacado, tamano, inicio = 0, ritmo = 4 }) => {
  const frame = useCurrentFrame();
  const { width } = useSafeArea();
  const clave = destacado.split(" ");
  // Cada línea entra en una sola línea: se achica si no cabe, pero nunca bajo 110 px
  const tamanoReal = Math.max(
    TAMANO_MINIMO,
    Math.min(
      tamano,
      ...lineas.map(
        (l) =>
          fitText({
            text: l,
            withinWidth: width - tamano * 0.6,
            fontFamily: FUENTE,
            letterSpacing: "1px",
          }).fontSize,
      ),
    ),
  );
  let indice = 0;
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: tamanoReal * 0.12,
      }}
    >
      {lineas.map((linea) => (
        <div
          key={linea}
          style={{
            display: "flex",
            flexWrap: "nowrap",
            justifyContent: "center",
            gap: tamanoReal * 0.22,
          }}
        >
          {agrupar(linea, clave).map(({ texto: palabra, esClave }) => {
            const desde = inicio + indice++ * ritmo;
            return (
              <span
                key={palabra}
                style={{
                  ...textoFuerte,
                  fontSize: tamanoReal,
                  display: "inline-block",
                  padding: esClave ? `0 ${tamanoReal * 0.14}px` : 0,
                  background: esClave ? COLORES.rojo : "transparent",
                  borderRadius: esClave ? 8 : 0,
                  boxShadow: esClave ? "0 8px 0 rgba(0,0,0,0.85)" : "none",
                  opacity: interpolate(frame, [desde - 2, desde], [0, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  }),
                  scale: interpolate(frame, [desde, desde + 6], [desde <= 0 ? 1 : 1.6, 1], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                    easing: Easing.out(Easing.back(2.2)),
                  }),
                  rotate: esClave
                    ? `${interpolate(frame, [desde, desde + 8], [-8, -2], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}deg`
                    : "0deg",
                }}
              >
                {palabra}
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};
