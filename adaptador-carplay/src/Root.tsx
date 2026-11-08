import { Composition } from "remotion";
import { Anuncio, anuncioSchema } from "./Anuncio";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="Anuncio-9x16"
        component={Anuncio}
        schema={anuncioSchema}
        durationInFrames={30 * 30}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{ mostrarZonasSeguras: false }}
      />
      <Composition
        id="Anuncio-4x5"
        component={Anuncio}
        schema={anuncioSchema}
        durationInFrames={30 * 30}
        fps={30}
        width={1080}
        height={1350}
        defaultProps={{ mostrarZonasSeguras: false }}
      />
    </>
  );
};
