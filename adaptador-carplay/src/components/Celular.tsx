// Celular genérico con reproductor de música (sin marcas)
export const Celular: React.FC<{
  ancho: number;
  progreso: number;
  sonando: boolean;
  children?: React.ReactNode;
}> = ({ ancho, progreso, sonando, children }) => {
  const alto = ancho * 2;
  return (
    <div
      style={{
        width: ancho,
        height: alto,
        borderRadius: ancho * 0.14,
        background: "#050506",
        border: `${ancho * 0.035}px solid #3b3d43`,
        boxShadow: "0 30px 60px rgba(0,0,0,0.7)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: ancho * 0.06,
          borderRadius: ancho * 0.09,
          background: "linear-gradient(#24262c,#111214)",
        }}
      >
        <div
          style={{
            margin: `${ancho * 0.22}px auto 0`,
            width: ancho * 0.6,
            height: ancho * 0.6,
            borderRadius: ancho * 0.06,
            background: sonando
              ? "linear-gradient(135deg,#e1251b,#5a0d09)"
              : "#3a3c42",
          }}
        />
        <div
          style={{
            margin: `${ancho * 0.12}px auto 0`,
            width: ancho * 0.62,
            height: ancho * 0.03,
            background: "#3a3c42",
            borderRadius: 99,
          }}
        >
          <div
            style={{
              width: `${progreso * 100}%`,
              height: "100%",
              background: "#fff",
              borderRadius: 99,
            }}
          />
        </div>
        {children}
      </div>
    </div>
  );
};
