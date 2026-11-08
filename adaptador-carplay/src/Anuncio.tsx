import { slide } from "@remotion/transitions/slide";
import { linearTiming, TransitionSeries } from "@remotion/transitions";
import { AbsoluteFill, useVideoConfig } from "remotion";
import { z } from "zod";
import { SafeZones } from "./components/SafeZones";
import { Demo } from "./escenas/Demo";
import { Gancho } from "./escenas/Gancho";
import { Oferta } from "./escenas/Oferta";
import { Problema } from "./escenas/Problema";
import { Solucion } from "./escenas/Solucion";
import { guion } from "./guion";
import { PLACAS_SEGUNDOS, TRANSICION_FRAMES } from "./tiempos";

export const anuncioSchema = z.object({
  mostrarZonasSeguras: z.boolean(),
  fotoProducto: z.string(),
});

export type AnuncioProps = z.infer<typeof anuncioSchema>;

const [gancho, problema, solucion, demo, oferta] = guion;

export const Anuncio: React.FC<AnuncioProps> = ({
  mostrarZonasSeguras,
  fotoProducto,
}) => {
  const { fps } = useVideoConfig();
  const transicion = linearTiming({ durationInFrames: TRANSICION_FRAMES });
  return (
    <AbsoluteFill style={{ backgroundColor: "#0b0b0d" }}>
      <TransitionSeries>
        <TransitionSeries.Sequence
          name="Placa 1 - Gancho"
          durationInFrames={Math.round(PLACAS_SEGUNDOS.gancho * fps)}
        >
          <Gancho
            lineas={gancho.pantalla}
            destacado={gancho.destacado}
            captions={[
              {
                text: "¿Todavía",
                startMs: 150,
                endMs: 594,
                timestampMs: 372,
                confidence: null,
              },
              {
                text: " conectas",
                startMs: 624,
                endMs: 1110,
                timestampMs: 867,
                confidence: null,
              },
              {
                text: " el",
                startMs: 1140,
                endMs: 1374,
                timestampMs: 1257,
                confidence: null,
              },
              {
                text: " celu",
                startMs: 1404,
                endMs: 1722,
                timestampMs: 1563,
                confidence: null,
              },
              {
                text: " con",
                startMs: 1752,
                endMs: 2028,
                timestampMs: 1890,
                confidence: null,
              },
              {
                text: " cable",
                startMs: 2058,
                endMs: 2418,
                timestampMs: 2238,
                confidence: null,
              },
              {
                text: " cada",
                startMs: 2448,
                endMs: 2766,
                timestampMs: 2607,
                confidence: null,
              },
              {
                text: " vez",
                startMs: 2796,
                endMs: 3072,
                timestampMs: 2934,
                confidence: null,
              },
              {
                text: " que",
                startMs: 3102,
                endMs: 3378,
                timestampMs: 3240,
                confidence: null,
              },
              {
                text: " te",
                startMs: 3408,
                endMs: 3642,
                timestampMs: 3525,
                confidence: null,
              },
              {
                text: " subes",
                startMs: 3672,
                endMs: 4032,
                timestampMs: 3852,
                confidence: null,
              },
              {
                text: " al",
                startMs: 4062,
                endMs: 4296,
                timestampMs: 4179,
                confidence: null,
              },
              {
                text: " auto?",
                startMs: 4326,
                endMs: 4644,
                timestampMs: 4485,
                confidence: null,
              },
            ]}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={transicion}
        />
        <TransitionSeries.Sequence
          name="Placa 2 - Problema"
          durationInFrames={Math.round(PLACAS_SEGUNDOS.problema * fps)}
        >
          <Problema
            lineas={problema.pantalla}
            destacado={problema.destacado}
            captions={[
              {
                text: "Se",
                startMs: 150,
                endMs: 384,
                timestampMs: 267,
                confidence: null,
              },
              {
                text: " suelta",
                startMs: 414,
                endMs: 816,
                timestampMs: 615,
                confidence: null,
              },
              {
                text: " en",
                startMs: 846,
                endMs: 1080,
                timestampMs: 963,
                confidence: null,
              },
              {
                text: " la",
                startMs: 1110,
                endMs: 1344,
                timestampMs: 1227,
                confidence: null,
              },
              {
                text: " mitad",
                startMs: 1374,
                endMs: 1734,
                timestampMs: 1554,
                confidence: null,
              },
              {
                text: " del",
                startMs: 1764,
                endMs: 2040,
                timestampMs: 1902,
                confidence: null,
              },
              {
                text: " camino",
                startMs: 2070,
                endMs: 2472,
                timestampMs: 2271,
                confidence: null,
              },
              {
                text: " y",
                startMs: 2502,
                endMs: 2694,
                timestampMs: 2598,
                confidence: null,
              },
              {
                text: " se",
                startMs: 2724,
                endMs: 2958,
                timestampMs: 2841,
                confidence: null,
              },
              {
                text: " te",
                startMs: 2988,
                endMs: 3222,
                timestampMs: 3105,
                confidence: null,
              },
              {
                text: " corta",
                startMs: 3252,
                endMs: 3612,
                timestampMs: 3432,
                confidence: null,
              },
              {
                text: " la",
                startMs: 3642,
                endMs: 3876,
                timestampMs: 3759,
                confidence: null,
              },
              {
                text: " música.",
                startMs: 3906,
                endMs: 4308,
                timestampMs: 4107,
                confidence: null,
              },
            ]}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-bottom" })}
          timing={transicion}
        />
        <TransitionSeries.Sequence
          name="Placa 3 - Solución"
          durationInFrames={Math.round(PLACAS_SEGUNDOS.solucion * fps)}
        >
          <Solucion
            lineas={solucion.pantalla}
            destacado={solucion.destacado}
            foto={fotoProducto}
            captions={[
              {
                text: "Con",
                startMs: 150,
                endMs: 426,
                timestampMs: 288,
                confidence: null,
              },
              {
                text: " este",
                startMs: 456,
                endMs: 774,
                timestampMs: 615,
                confidence: null,
              },
              {
                text: " adaptador",
                startMs: 804,
                endMs: 1332,
                timestampMs: 1068,
                confidence: null,
              },
              {
                text: " lo",
                startMs: 1362,
                endMs: 1596,
                timestampMs: 1479,
                confidence: null,
              },
              {
                text: " enchufas",
                startMs: 1626,
                endMs: 2112,
                timestampMs: 1869,
                confidence: null,
              },
              {
                text: " una",
                startMs: 2142,
                endMs: 2418,
                timestampMs: 2280,
                confidence: null,
              },
              {
                text: " vez",
                startMs: 2448,
                endMs: 2724,
                timestampMs: 2586,
                confidence: null,
              },
              {
                text: " y",
                startMs: 2754,
                endMs: 2946,
                timestampMs: 2850,
                confidence: null,
              },
              {
                text: " listo.",
                startMs: 2976,
                endMs: 3336,
                timestampMs: 3156,
                confidence: null,
              },
            ]}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-right" })}
          timing={transicion}
        />
        <TransitionSeries.Sequence
          name="Placa 4 - Demo"
          durationInFrames={Math.round(PLACAS_SEGUNDOS.demo * fps)}
        >
          <Demo
            lineas={demo.pantalla}
            destacado={demo.destacado}
            letraChica={demo.letraChica}
            captions={[
              {
                text: "Te",
                startMs: 150,
                endMs: 384,
                timestampMs: 267,
                confidence: null,
              },
              {
                text: " subes,",
                startMs: 414,
                endMs: 774,
                timestampMs: 594,
                confidence: null,
              },
              {
                text: " se",
                startMs: 994,
                endMs: 1228,
                timestampMs: 1111,
                confidence: null,
              },
              {
                text: " conecta",
                startMs: 1258,
                endMs: 1702,
                timestampMs: 1480,
                confidence: null,
              },
              {
                text: " solo",
                startMs: 1732,
                endMs: 2050,
                timestampMs: 1891,
                confidence: null,
              },
              {
                text: " y",
                startMs: 2080,
                endMs: 2272,
                timestampMs: 2176,
                confidence: null,
              },
              {
                text: " tienes",
                startMs: 2302,
                endMs: 2704,
                timestampMs: 2503,
                confidence: null,
              },
              {
                text: " tu",
                startMs: 2734,
                endMs: 2968,
                timestampMs: 2851,
                confidence: null,
              },
              {
                text: " CarPlay",
                startMs: 2998,
                endMs: 3442,
                timestampMs: 3220,
                confidence: null,
              },
              {
                text: " sin",
                startMs: 3472,
                endMs: 3748,
                timestampMs: 3610,
                confidence: null,
              },
              {
                text: " cables,",
                startMs: 3778,
                endMs: 4180,
                timestampMs: 3979,
                confidence: null,
              },
              {
                text: " con",
                startMs: 4400,
                endMs: 4676,
                timestampMs: 4538,
                confidence: null,
              },
              {
                text: " mapa",
                startMs: 4706,
                endMs: 5024,
                timestampMs: 4865,
                confidence: null,
              },
              {
                text: " y",
                startMs: 5054,
                endMs: 5246,
                timestampMs: 5150,
                confidence: null,
              },
              {
                text: " música.",
                startMs: 5276,
                endMs: 5678,
                timestampMs: 5477,
                confidence: null,
              },
            ]}
          />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition
          presentation={slide({ direction: "from-left" })}
          timing={transicion}
        />
        <TransitionSeries.Sequence
          name="Placa 5 - Oferta"
          durationInFrames={Math.round(PLACAS_SEGUNDOS.oferta * fps)}
        >
          <Oferta
            lineas={oferta.pantalla}
            destacado={oferta.destacado}
            foto={fotoProducto}
            captions={[
              {
                text: "Hacemos",
                startMs: 150,
                endMs: 594,
                timestampMs: 372,
                confidence: null,
              },
              {
                text: " envíos",
                startMs: 624,
                endMs: 1026,
                timestampMs: 825,
                confidence: null,
              },
              {
                text: " a",
                startMs: 1056,
                endMs: 1248,
                timestampMs: 1152,
                confidence: null,
              },
              {
                text: " todo",
                startMs: 1278,
                endMs: 1596,
                timestampMs: 1437,
                confidence: null,
              },
              {
                text: " Chile.",
                startMs: 1626,
                endMs: 1986,
                timestampMs: 1806,
                confidence: null,
              },
              {
                text: " Pídelo",
                startMs: 2366,
                endMs: 2768,
                timestampMs: 2567,
                confidence: null,
              },
              {
                text: " hoy.",
                startMs: 2798,
                endMs: 3074,
                timestampMs: 2936,
                confidence: null,
              },
            ]}
          />
        </TransitionSeries.Sequence>
      </TransitionSeries>
      {mostrarZonasSeguras ? <SafeZones /> : null}
    </AbsoluteFill>
  );
};
