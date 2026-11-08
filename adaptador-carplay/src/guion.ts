// Guion en español de Chile (tuteo, tono cercano). Duración objetivo: 25–28 s, máximo 30 s.
// La duración real de cada placa la define la voz grabada (calculateMetadata).
export const DURACION_MAXIMA_SEGUNDOS = 30;

export const guion = [
  {
    id: "gancho",
    voz: "¿Todavía conectas el celu con cable cada vez que te subes al auto?",
    pantalla: ["¿TODAVÍA CONECTAS", "EL CELU CON CABLE?"],
    destacado: "CABLE",
  },
  {
    id: "problema",
    voz: "Se suelta en la mitad del camino, se corta la música y encima te gasta la batería.",
    pantalla: ["SE DESCONECTA.", "TE GASTA LA BATERÍA."],
    destacado: "BATERÍA",
  },
  {
    id: "solucion",
    voz: "Con este adaptador lo enchufas una vez y listo.",
    pantalla: ["ENCHÚFALO", "UNA VEZ Y LISTO"],
    destacado: "UNA VEZ",
  },
  {
    id: "demo",
    voz: "Te subes, se conecta solo y tienes tu CarPlay sin cables, con mapa y música.",
    pantalla: ["CARPLAY SIN CABLES.", "SE CONECTA SOLO."],
    destacado: "SIN CABLES",
    letraChica: "Para autos con CarPlay con cable",
  },
  {
    id: "oferta",
    voz: "Hacemos envíos a todo Chile. Pídelo hoy.",
    pantalla: ["[OFERTA]", "ENVÍO A TODO CHILE", "PÍDELO HOY"],
    destacado: "PÍDELO HOY",
  },
] as const;
