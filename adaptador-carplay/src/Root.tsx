import { Composition } from "remotion";
import { Anuncio, anuncioSchema } from "./Anuncio";
import { duracionTotalFrames, FPS } from "./tiempos";

const defaultProps = {
  mostrarZonasSeguras: false,
  fotoProducto: "producto.png",
};

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Anuncio-9x16"
        component={Anuncio}
        schema={anuncioSchema}
        durationInFrames={duracionTotalFrames()}
        fps={FPS}
        width={1080}
        height={1920}
        defaultProps={defaultProps}
      />
      <Composition
        id="Anuncio-4x5"
        component={Anuncio}
        schema={anuncioSchema}
        durationInFrames={duracionTotalFrames()}
        fps={FPS}
        width={1080}
        height={1350}
        defaultProps={defaultProps}
      />
    </>
  );
};
