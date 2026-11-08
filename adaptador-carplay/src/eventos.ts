import { FPS, PLACAS_SEGUNDOS, TRANSICION_FRAMES } from "./tiempos.ts";

// Frames locales de cada evento dentro de su placa
export const FRAME_TIRON = 18; // placa 2: el cable se suelta y la música se corta
export const FRAME_POP = 4; // placa 3: aparece el producto
export const FRAME_CLIC = 52; // placa 3: se enchufa al USB
export const FRAME_CONECTADO = 40; // placa 4: aparece la interfaz (campanita)

// Inicio absoluto (en frames) de cada placa, descontando las transiciones
export const iniciosPlacas = () => {
  const duraciones = Object.values(PLACAS_SEGUNDOS).map((s) =>
    Math.round(s * FPS),
  );
  const inicios: number[] = [];
  let t = 0;
  for (const d of duraciones) {
    inicios.push(t);
    t += d - TRANSICION_FRAMES;
  }
  return inicios;
};
