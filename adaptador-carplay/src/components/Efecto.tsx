import { Audio } from "@remotion/media";
import { Sequence, staticFile } from "remotion";

// Efecto de sonido sincronizado a un frame exacto dentro de su placa
export const Efecto: React.FC<{
  nombre: string;
  desde: number;
  volumen?: number;
}> = ({ nombre, desde, volumen = 1 }) => (
  <Sequence from={desde} name={`SFX ${nombre}`} layout="none">
    <Audio src={staticFile(`audio/${nombre}.wav`)} volume={volumen * 0.7} />
  </Sequence>
);
