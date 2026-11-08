// Duraciones de cada placa en segundos (ajustadas a la voz estimada; se recalculan con la voz real)
export const FPS = 30;
export const TRANSICION_FRAMES = 7;
export const PLACAS_SEGUNDOS = {
  gancho: 5.2,
  problema: 5.0,
  solucion: 4.6,
  demo: 6.3,
  oferta: 4.6,
};

export const duracionTotalFrames = () => {
  const placas = Object.values(PLACAS_SEGUNDOS).map((s) => Math.round(s * FPS));
  return (
    placas.reduce((a, b) => a + b, 0) - TRANSICION_FRAMES * (placas.length - 1)
  );
};
