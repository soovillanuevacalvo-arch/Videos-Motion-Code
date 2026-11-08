import {
  AbsoluteFill,
  CalculateMetadataFunction,
  Composition,
  Easing,
  Interactive,
  interpolate,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

type Props = {};

const calculateMetadata: CalculateMetadataFunction<Props> = () => {
  return {};
};

export const MyComposition = () => {
  return (
    <Composition
      id="MyComp"
      component={MyComponent}
      durationInFrames={120}
      fps={30}
      width={1920}
      height={1080}
      calculateMetadata={calculateMetadata}
    />
  );
};

const Title: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Interactive.Div
      name="Title"
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        fontWeight: 800,
        fontSize: 160,
        color: "white",
        opacity: interpolate(frame, [0, 0.8 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        scale: interpolate(frame, [0, 1 * fps], [0.6, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.spring({ damping: 200 }),
          output: "perceptual-scale",
        }),
      }}
    >
      Hola, Remotion
    </Interactive.Div>
  );
};

const Subtitle: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Interactive.Div
      name="Subtitle"
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        fontSize: 64,
        color: "#7dd3fc",
        marginTop: 24,
        opacity: interpolate(frame, [0.6 * fps, 1.4 * fps], [0, 1], {
          extrapolateLeft: "clamp",
          extrapolateRight: "clamp",
          easing: Easing.bezier(0.16, 1, 0.3, 1),
        }),
        translate: interpolate(
          frame,
          [0.6 * fps, 1.4 * fps],
          ["0px 60px", "0px 0px"],
          {
            extrapolateLeft: "clamp",
            extrapolateRight: "clamp",
            easing: Easing.bezier(0.16, 1, 0.3, 1),
          },
        ),
      }}
    >
      Motion graphics con código
    </Interactive.Div>
  );
};

export const MyComponent: React.FC<Props> = () => {
  return (
    <AbsoluteFill
      style={{
        backgroundColor: "#0f172a",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Title />
      <Subtitle />
    </AbsoluteFill>
  );
};
