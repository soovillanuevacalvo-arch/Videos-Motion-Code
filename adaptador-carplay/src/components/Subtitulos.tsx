import { createTikTokStyleCaptions, type Caption } from "@remotion/captions";
import { useMemo } from "react";
import { interpolate, useCurrentFrame, useVideoConfig } from "remotion";
import { textoFuerte } from "../estilo";

// Subtítulos de la voz: de a 2–3 palabras, sincronizados palabra por palabra
export const Subtitulos: React.FC<{ captions: Caption[]; tamano: number }> = ({
  captions,
  tamano,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const ms = (frame / fps) * 1000;
  const { pages } = useMemo(
    () =>
      createTikTokStyleCaptions({
        captions,
        combineTokensWithinMilliseconds: 650,
      }),
    [captions],
  );
  const pagina = pages.find(
    (p, i) =>
      ms >= p.startMs &&
      ms < (pages[i + 1]?.startMs ?? p.startMs + p.durationMs + 400),
  );
  if (!pagina) return null;
  return (
    <div style={{ textAlign: "center", minHeight: tamano * 1.1 }}>
      {pagina.tokens.map((t) => {
        const activo = ms >= t.fromMs && ms < t.toMs;
        const dicho = ms >= t.fromMs;
        return (
          <span
            key={t.fromMs}
            style={{
              ...textoFuerte,
              WebkitTextStroke: "8px #000",
              fontSize: tamano,
              whiteSpace: "pre",
              display: "inline-block",
              opacity: dicho ? 1 : 0.35,
              scale: activo
                ? interpolate(ms, [t.fromMs, t.fromMs + 90], [1.18, 1.06], {
                    extrapolateLeft: "clamp",
                    extrapolateRight: "clamp",
                  })
                : 1,
            }}
          >
            {t.text.toUpperCase()}
          </span>
        );
      })}
    </div>
  );
};
