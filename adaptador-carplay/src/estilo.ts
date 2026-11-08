import { loadFont } from "@remotion/google-fonts/Anton";

const { fontFamily } = loadFont("normal", {
  weights: ["400"],
  subsets: ["latin", "latin-ext"],
});

export const FUENTE = fontFamily;

export const COLORES = {
  fondo: "#0b0b0d",
  fondo2: "#1a1b1f",
  gris: "#2a2c31",
  blanco: "#ffffff",
  rojo: "#E1251B",
  azul: "#1e7bff",
  azulOscuro: "#0a2a5c",
};

// Contorno + sombra fuerte para leer sobre cualquier fondo
export const textoFuerte: React.CSSProperties = {
  fontFamily: FUENTE,
  color: COLORES.blanco,
  textTransform: "uppercase",
  WebkitTextStroke: "10px #000",
  paintOrder: "stroke fill",
  textShadow: "0 8px 0 rgba(0,0,0,0.9), 0 0 30px rgba(0,0,0,0.7)",
  lineHeight: 1.02,
  letterSpacing: 1,
};
