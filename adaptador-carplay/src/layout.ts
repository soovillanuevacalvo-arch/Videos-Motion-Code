import { useVideoConfig } from "remotion";

export type SafeArea = {
  top: number;
  bottom: number;
  left: number;
  right: number;
  /** Alto del área útil (sin zonas tapadas por la interfaz de Meta) */
  height: number;
  width: number;
  isVertical: boolean;
};

// 9:16: 14% arriba, 35% abajo, 65 px a los costados. 4:5: 60 px en todos los bordes.
export const getSafeArea = (width: number, height: number): SafeArea => {
  const isVertical = height / width > 1.5;
  const top = isVertical ? Math.round(height * 0.14) : 60;
  const bottom = isVertical ? Math.round(height * 0.35) : 60;
  const side = isVertical ? 65 : 60;
  return {
    top,
    bottom,
    left: side,
    right: side,
    height: height - top - bottom,
    width: width - side * 2,
    isVertical,
  };
};

export const useSafeArea = () => {
  const { width, height } = useVideoConfig();
  return getSafeArea(width, height);
};
