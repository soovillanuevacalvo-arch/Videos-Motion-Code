import { AbsoluteFill } from "remotion";
import { z } from "zod";
import { SafeZones } from "./components/SafeZones";

export const anuncioSchema = z.object({
  mostrarZonasSeguras: z.boolean(),
});

export type AnuncioProps = z.infer<typeof anuncioSchema>;

export const Anuncio: React.FC<AnuncioProps> = ({ mostrarZonasSeguras }) => {
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0b0d" }}>
      {/* Las placas se agregan aquí cuando tenga los datos del producto y la voz */}
      {mostrarZonasSeguras ? <SafeZones /> : null}
    </AbsoluteFill>
  );
};
