// Íconos simples dibujados (sin marcas)
export const IconoMusica: React.FC<{
  size: number;
  color: string;
  tachado?: boolean;
}> = ({ size, color, tachado }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <path
      d="M38 72V22l44-10v50"
      stroke={color}
      strokeWidth={8}
      fill="none"
      strokeLinejoin="round"
    />
    <circle cx="28" cy="74" r="12" fill={color} />
    <circle cx="72" cy="64" r="12" fill={color} />
    {tachado ? (
      <line
        x1="10"
        y1="10"
        x2="90"
        y2="90"
        stroke="#E1251B"
        strokeWidth={12}
        strokeLinecap="round"
      />
    ) : null}
  </svg>
);

export const IconoDesconectado: React.FC<{ size: number }> = ({ size }) => (
  <svg width={size} height={size} viewBox="0 0 100 100">
    <circle
      cx="50"
      cy="50"
      r="46"
      fill="#E1251B"
      stroke="#000"
      strokeWidth={6}
    />
    <path
      d="M32 32 L68 68 M68 32 L32 68"
      stroke="#fff"
      strokeWidth={12}
      strokeLinecap="round"
    />
  </svg>
);
