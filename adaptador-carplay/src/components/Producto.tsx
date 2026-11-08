import { Img, staticFile } from "remotion";
import { FUENTE } from "../estilo";

// Foto real del producto. Mientras no exista, se muestra un marcador visible (no se inventa el producto).
export const Producto: React.FC<{
  foto: string;
  ancho: number;
  style?: React.CSSProperties;
}> = ({ foto, ancho, style }) => {
  if (foto) {
    return (
      <Img
        src={staticFile(foto)}
        style={{
          width: ancho,
          height: "auto",
          filter: "drop-shadow(0 24px 30px rgba(0,0,0,0.7))",
          ...style,
        }}
      />
    );
  }
  return (
    <div
      style={{
        width: ancho,
        height: ancho * 0.62,
        borderRadius: ancho * 0.08,
        border: "6px dashed #ffffff",
        background:
          "repeating-linear-gradient(45deg,#26282d 0 22px,#1d1e22 22px 44px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#fff",
        fontFamily: FUENTE,
        fontSize: ancho * 0.1,
        textAlign: "center",
        boxShadow: "0 24px 50px rgba(0,0,0,0.6)",
        ...style,
      }}
    >
      [FOTO DEL
      <br />
      PRODUCTO]
    </div>
  );
};
