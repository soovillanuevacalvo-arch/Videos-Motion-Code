import type { Caption } from "@remotion/captions";
import { Easing, interpolate, useCurrentFrame } from "remotion";
import { COLORES, FUENTE, textoFuerte } from "../estilo";
import { FondoAuto } from "../components/FondoAuto";
import { IconoMusica } from "../components/Iconos";
import { Placa, TAMANO_SUBTITULO, TAMANO_TITULAR } from "../components/Placa";
import { Titular } from "../components/Titular";

export const FRAME_CONECTADO = 40; // pasa de "conectando…" a la interfaz (campanita)

// Pantalla del auto con una interfaz genérica tipo CarPlay (sin logos)
const Pantalla: React.FC<{ ancho: number; alto: number }> = ({
  ancho,
  alto,
}) => {
  const frame = useCurrentFrame();
  const w = ancho * 0.94;
  const h = Math.min(alto * 0.78, w * 0.62);
  const conectado = frame >= FRAME_CONECTADO;
  const aparece = interpolate(
    frame,
    [FRAME_CONECTADO, FRAME_CONECTADO + 10],
    [0, 1],
    {
      extrapolateLeft: "clamp",
      extrapolateRight: "clamp",
      easing: Easing.out(Easing.cubic),
    },
  );
  const ruta = interpolate(
    frame,
    [FRAME_CONECTADO + 4, FRAME_CONECTADO + 60],
    [0, 1],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" },
  );
  const pad = w * 0.03;
  const interior = h - 20; // alto sin el marco
  const mh = interior - pad * 2; // alto del mapa
  const mapaW = (w - 20) * 0.6;
  return (
    <div
      style={{
        width: w,
        height: h,
        borderRadius: 28,
        border: "10px solid #050506",
        boxSizing: "border-box",
        background: conectado ? COLORES.azulOscuro : "#07080a",
        boxShadow: "0 30px 70px rgba(0,0,0,0.8), 0 0 0 4px #3a3c42",
        position: "relative",
        overflow: "hidden",
        scale: interpolate(frame, [0, 8], [0.92, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.out(Easing.cubic),
        }),
      }}
    >
      {!conectado ? (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 30,
          }}
        >
          <svg
            width={110}
            height={110}
            viewBox="0 0 100 100"
            style={{ rotate: `${frame * 14}deg` }}
          >
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#26303f"
              strokeWidth={12}
              fill="none"
            />
            <path
              d="M50 10 A40 40 0 0 1 90 50"
              stroke={COLORES.azul}
              strokeWidth={12}
              fill="none"
              strokeLinecap="round"
            />
          </svg>
          <div
            style={{
              fontFamily: FUENTE,
              fontSize: TAMANO_SUBTITULO,
              color: "#fff",
            }}
          >
            CONECTANDO{".".repeat(1 + (Math.floor(frame / 6) % 3))}
          </div>
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: aparece,
            scale: interpolate(aparece, [0, 1], [1.06, 1]),
          }}
        >
          {/* mapa */}
          <svg
            width={mapaW}
            height={mh}
            style={{
              position: "absolute",
              left: pad,
              top: pad,
              borderRadius: 18,
              background: "#13335f",
            }}
          >
            {[0.15, 0.4, 0.65, 0.9].map((f) => (
              <line
                key={`v${f}`}
                x1={mapaW * f}
                y1={0}
                x2={mapaW * f - 40}
                y2={mh}
                stroke="#2b5592"
                strokeWidth={14}
              />
            ))}
            {[0.2, 0.5, 0.8].map((f) => (
              <line
                key={`h${f}`}
                x1={0}
                y1={mh * f}
                x2={mapaW}
                y2={mh * f + 30}
                stroke="#2b5592"
                strokeWidth={14}
              />
            ))}
            <path
              d={`M ${mapaW * 0.12} ${mh * 0.75} L ${mapaW * 0.38} ${mh * 0.52} L ${mapaW * 0.62} ${mh * 0.55} L ${mapaW * 0.86} ${mh * 0.18}`}
              stroke="#4fc3ff"
              strokeWidth={14}
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              pathLength={1}
              strokeDasharray={1}
              strokeDashoffset={1 - ruta}
            />
            <circle
              cx={mapaW * 0.12}
              cy={mh * 0.75}
              r={20 + Math.sin(frame / 4) * 4}
              fill="#fff"
              stroke={COLORES.azul}
              strokeWidth={8}
            />
          </svg>
          {/* tarjeta de música */}
          <div
            style={{
              position: "absolute",
              left: pad * 2 + mapaW,
              top: pad,
              right: pad,
              bottom: pad,
              borderRadius: 18,
              background: "#0f4c9e",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 18,
            }}
          >
            <div
              style={{
                height: "52%",
                aspectRatio: "1",
                borderRadius: 14,
                background: "linear-gradient(135deg,#4fc3ff,#1e7bff)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                scale: 1 + Math.max(0, Math.sin(frame / 3.5)) * 0.05,
              }}
            >
              <IconoMusica size={90} color="#ffffff" />
            </div>
            <div
              style={{
                width: "70%",
                height: 10,
                background: "#2b5592",
                borderRadius: 99,
              }}
            >
              <div
                style={{
                  width: `${interpolate(frame, [FRAME_CONECTADO, 190], [5, 60], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}%`,
                  height: "100%",
                  background: "#fff",
                  borderRadius: 99,
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export const Demo: React.FC<{
  lineas: readonly string[];
  destacado: string;
  captions: Caption[];
  letraChica: string;
}> = ({ lineas, destacado, captions, letraChica }) => (
  <Placa
    fondo={<FondoAuto />}
    titular={
      <Titular
        lineas={lineas}
        destacado={destacado}
        tamano={TAMANO_TITULAR}
        inicio={FRAME_CONECTADO - 6}
        ritmo={3}
      />
    }
    captions={captions}
    visual={(caja) => (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 18,
        }}
      >
        <Pantalla
          ancho={caja.ancho}
          alto={caja.alto - TAMANO_SUBTITULO * 2.3}
        />
        <div
          style={{
            ...textoFuerte,
            WebkitTextStroke: "6px #000",
            fontSize: 56,
            textTransform: "none",
            textAlign: "center",
            lineHeight: 1.05,
          }}
        >
          {letraChica}
        </div>
      </div>
    )}
  />
);
