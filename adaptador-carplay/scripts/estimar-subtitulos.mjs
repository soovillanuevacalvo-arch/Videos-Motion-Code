// Estima tiempos palabra por palabra para el guion (habla chilena relajada, ~2,6 palabras/s).
// Se reemplaza por la transcripción real cuando esté la voz grabada.
const escenas = {
  gancho: "¿Todavía conectas el celu con cable cada vez que te subes al auto?",
  problema: "Se suelta en la mitad del camino y se te corta la música.",
  solucion: "Con este adaptador lo enchufas una vez y listo.",
  demo: "Te subes, se conecta solo y tienes tu CarPlay sin cables, con mapa y música.",
  oferta: "Hacemos envíos a todo Chile. Pídelo hoy.",
};
const INICIO_MS = 150;
const out = {};
for (const [id, texto] of Object.entries(escenas)) {
  let t = INICIO_MS;
  out[id] = texto.split(" ").map((w, i) => {
    const letras = w.replace(/[^\p{L}]/gu, "").length;
    const dur = Math.round(150 + letras * 42);
    const c = { text: (i === 0 ? "" : " ") + w, startMs: t, endMs: t + dur, timestampMs: t + Math.round(dur / 2), confidence: null };
    t += dur + (/[,]$/.test(w) ? 220 : /[.?!]$/.test(w) ? 380 : 30);
    return c;
  });
  console.error(id, "termina en", out[id].at(-1).endMs, "ms");
}
console.log(JSON.stringify(out));
