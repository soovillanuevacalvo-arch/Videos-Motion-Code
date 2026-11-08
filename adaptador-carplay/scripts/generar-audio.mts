// Sintetiza la música y los efectos del anuncio y los guarda como WAV en public/audio/.
// Uso: npm run audio
// Lee los mismos tiempos que las escenas, así que si cambian las placas basta con volver a correrlo.
import { mkdirSync, writeFileSync } from "node:fs";
import { FRAME_TIRON, iniciosPlacas } from "../src/eventos.ts";
import { duracionTotalFrames, FPS } from "../src/tiempos.ts";

const SR = 48000;
const BPM = 104;
const BEAT = 60 / BPM;

// ---------- utilidades ----------
let semilla = 12345;
const ruido = () => {
  semilla = (semilla * 1664525 + 1013904223) >>> 0;
  return (semilla / 0xffffffff) * 2 - 1;
};

const escribirWav = (ruta: string, l: Float32Array, r: Float32Array = l) => {
  const n = l.length;
  const buf = Buffer.alloc(44 + n * 4);
  buf.write("RIFF", 0);
  buf.writeUInt32LE(36 + n * 4, 4);
  buf.write("WAVEfmt ", 8);
  buf.writeUInt32LE(16, 16);
  buf.writeUInt16LE(1, 20);
  buf.writeUInt16LE(2, 22);
  buf.writeUInt32LE(SR, 24);
  buf.writeUInt32LE(SR * 4, 28);
  buf.writeUInt16LE(4, 32);
  buf.writeUInt16LE(16, 34);
  buf.write("data", 36);
  buf.writeUInt32LE(n * 4, 40);
  for (let i = 0; i < n; i++) {
    const a = Math.max(-1, Math.min(1, l[i]));
    const b = Math.max(-1, Math.min(1, r[i]));
    buf.writeInt16LE(Math.round(a * 32767), 44 + i * 4);
    buf.writeInt16LE(Math.round(b * 32767), 46 + i * 4);
  }
  writeFileSync(ruta, buf);
};

const normalizarPico = (x: Float32Array, pico: number) => {
  let m = 0;
  for (const v of x) m = Math.max(m, Math.abs(v));
  if (m > 0) for (let i = 0; i < x.length; i++) x[i] *= pico / m;
  return x;
};

// Filtro de estado variable (pasa bajos / banda / altos) con corte variable
const svf = (x: Float32Array, corte: (i: number) => number, q: number, tipo: "lp" | "bp" | "hp") => {
  const y = new Float32Array(x.length);
  let low = 0;
  let band = 0;
  for (let i = 0; i < x.length; i++) {
    const f = 2 * Math.sin((Math.PI * Math.min(corte(i), SR / 6)) / SR);
    low += f * band;
    const high = x[i] - low - q * band;
    band += f * high;
    y[i] = tipo === "lp" ? low : tipo === "bp" ? band : high;
  }
  return y;
};

const mezclar = (dst: Float32Array, src: Float32Array, desde: number, gan = 1) => {
  const o = Math.round(desde * SR);
  for (let i = 0; i < src.length && o + i < dst.length; i++) if (o + i >= 0) dst[o + i] += src[i] * gan;
};

// ---------- instrumentos ----------
const bombo = () => {
  const d = 0.32;
  const x = new Float32Array(Math.round(d * SR));
  let fase = 0;
  for (let i = 0; i < x.length; i++) {
    const t = i / SR;
    const f = 45 + 110 * Math.exp(-t * 28);
    fase += (2 * Math.PI * f) / SR;
    x[i] = Math.sin(fase) * Math.exp(-t * 9) + (t < 0.004 ? ruido() * 0.5 : 0);
  }
  return x;
};

const palmas = () => {
  const d = 0.2;
  const n = new Float32Array(Math.round(d * SR)).map(() => ruido());
  const x = svf(n, () => 1600, 0.8, "bp");
  for (let i = 0; i < x.length; i++) {
    const t = i / SR;
    const env = Math.exp(-t * 22) * (t < 0.01 ? 0.6 + 0.4 * Math.sin(t * 2000) : 1);
    x[i] *= env * 2.2;
  }
  return x;
};

const platillo = (largo: number) => {
  const x = new Float32Array(Math.round(largo * SR)).map(() => ruido());
  const y = svf(x, () => 9000, 0.6, "hp");
  for (let i = 0; i < y.length; i++) y[i] *= Math.exp((-i / SR) * (largo > 0.1 ? 14 : 55));
  return y;
};

const nota = (f: number, d: number, brillo: number) => {
  const x = new Float32Array(Math.round(d * SR));
  for (let i = 0; i < x.length; i++) {
    const t = i / SR;
    // sierra con algunos armónicos
    let v = 0;
    for (let h = 1; h <= 8; h++) v += Math.sin(2 * Math.PI * f * h * t) / h;
    x[i] = v * 0.5;
  }
  const y = svf(x, (i) => brillo * (0.35 + 0.65 * Math.exp((-i / SR) * 6)), 0.5, "lp");
  for (let i = 0; i < y.length; i++) {
    const t = i / SR;
    y[i] *= Math.min(1, t / 0.005) * Math.min(1, (d - t) / 0.02);
  }
  return y;
};

const acorde = (fs: number[], d: number, brillo: number) => {
  const x = new Float32Array(Math.round(d * SR));
  for (const f of fs) {
    const a = nota(f, d, brillo);
    const b = nota(f * 1.006, d, brillo); // leve desafinación para ancho
    for (let i = 0; i < x.length; i++) x[i] += (a[i] + b[i]) * 0.25;
  }
  return x;
};

const hz = (midi: number) => 440 * 2 ** ((midi - 69) / 12);

// Progresión La menor – Fa – Do – Sol (un compás cada una)
const PROG = [
  { bajo: 45, acorde: [57, 60, 64] },
  { bajo: 41, acorde: [57, 60, 65] },
  { bajo: 48, acorde: [55, 60, 64] },
  { bajo: 43, acorde: [55, 59, 62] },
];

// ---------- música ----------
const total = duracionTotalFrames() / FPS;
const inicios = iniciosPlacas().map((f) => f / FPS);
const tCorte = inicios[1] + FRAME_TIRON / FPS; // se corta junto con el cable
const tVuelta = inicios[2]; // vuelve más fuerte en la placa 3

const N = Math.round(total * SR);
const musL = new Float32Array(N);
const musR = new Float32Array(N);
const K = bombo();
const P = palmas();
const hatC = platillo(0.05);
const hatA = platillo(0.25);

const tocar = (desde: number, hasta: number, fuerte: boolean) => {
  const g = fuerte ? 1.15 : 1;
  for (let b = 0; ; b++) {
    const t = desde + b * BEAT;
    if (t >= hasta - 0.01) break;
    const compas = Math.floor(b / 4) % PROG.length;
    const { bajo, acorde: ac } = PROG[compas];
    mezclar(musL, K, t, 0.95 * g);
    mezclar(musR, K, t, 0.95 * g);
    if (b % 2 === 1) {
      mezclar(musL, P, t, 0.45 * g);
      mezclar(musR, P, t, 0.45 * g);
    }
    // charles en corcheas (y semicorcheas cuando vuelve fuerte)
    const sub = fuerte ? 4 : 2;
    for (let s = 0; s < sub; s++) {
      const th = t + (s * BEAT) / sub;
      const abierto = s === sub / 2;
      mezclar(musL, abierto ? hatA : hatC, th, abierto ? 0.18 : 0.12);
      mezclar(musR, abierto ? hatA : hatC, th + 0.004, abierto ? 0.18 : 0.12);
    }
    // bajo en corcheas a contratiempo
    const nb = nota(hz(bajo), BEAT / 2 - 0.02, 900);
    mezclar(musL, nb, t + BEAT / 2, 0.5 * g);
    mezclar(musR, nb, t + BEAT / 2, 0.5 * g);
    // acordes cortos (stabs)
    if (fuerte || b % 2 === 0) {
      const st = acorde(ac.map((m) => hz(m + 12)), BEAT * 0.35, 3500);
      mezclar(musL, st, t + BEAT * 0.5, 0.22 * g);
      mezclar(musR, st, t + BEAT * 0.52, 0.2 * g);
    }
  }
};

// 1) arranca con energía desde el frame 0 y se corta en seco con el cable
tocar(0, tCorte, false);
const corte = Math.round(tCorte * SR);
for (let i = corte; i < N; i++) {
  musL[i] = 0;
  musR[i] = 0;
}
// micro fundido de 4 ms para evitar un clic digital
for (let i = 0; i < 0.004 * SR; i++) {
  const g = 1 - i / (0.004 * SR);
  musL[corte - 1 - Math.round(0.004 * SR) + i] *= g;
  musR[corte - 1 - Math.round(0.004 * SR) + i] *= g;
}

// 2) silencio breve y una subida (riser) que lleva a la vuelta
const tRiser = tCorte + 0.35;
const dRiser = tVuelta - tRiser;
const rz = new Float32Array(Math.round(dRiser * SR)).map(() => ruido());
const riser = svf(rz, (i) => 300 + 6000 * (i / rz.length) ** 2, 0.4, "bp");
for (let i = 0; i < riser.length; i++) riser[i] *= ((i / riser.length) ** 2) * 1.6;
mezclar(musL, riser, tRiser, 1);
mezclar(musR, riser, tRiser, 0.9);

// 3) vuelve más fuerte en la placa 3 con un golpe grave
const boom = bombo().map((v, i) => v * (1 + Math.exp(-i / SR / 0.3)));
mezclar(musL, boom, tVuelta, 0.75);
mezclar(musR, boom, tVuelta, 0.75);
const finCompases = tVuelta + Math.floor((total - tVuelta) / BEAT) * BEAT;
tocar(tVuelta, finCompases, true);

// 4) cierre: golpe final y cola que termina justo en el último frame
const golpe = acorde(PROG[0].acorde.map(hz), total - finCompases, 2500);
mezclar(musL, K, finCompases, 1);
mezclar(musR, K, finCompases, 1);
mezclar(musL, golpe, finCompases, 0.35);
mezclar(musR, golpe, finCompases, 0.35);
const colaN = Math.round(0.08 * SR);
for (let i = 0; i < colaN; i++) {
  const g = 1 - i / colaN;
  musL[N - colaN + i] *= g;
  musR[N - colaN + i] *= g;
}

// pico común a -3 dBFS
let m = 0;
for (let i = 0; i < N; i++) m = Math.max(m, Math.abs(musL[i]), Math.abs(musR[i]));
for (let i = 0; i < N; i++) {
  musL[i] *= 0.707 / m;
  musR[i] *= 0.707 / m;
}

// ---------- efectos ----------
const whoosh = () => {
  const d = 0.5;
  const x = new Float32Array(Math.round(d * SR)).map(() => ruido());
  const y = svf(x, (i) => 400 + 5000 * Math.sin((Math.PI * i) / x.length), 1.2, "bp");
  for (let i = 0; i < y.length; i++) {
    const t = i / SR;
    y[i] *= t < 0.18 ? (t / 0.18) ** 2 : Math.exp(-(t - 0.18) * 9);
  }
  return normalizarPico(y, 0.8);
};

const pop = () => {
  const d = 0.16;
  const x = new Float32Array(Math.round(d * SR));
  let fase = 0;
  for (let i = 0; i < x.length; i++) {
    const t = i / SR;
    fase += (2 * Math.PI * (350 + 1100 * (1 - Math.exp(-t * 60)))) / SR;
    x[i] = Math.sin(fase) * Math.exp(-t * 30) + (t < 0.003 ? ruido() * 0.6 : 0);
  }
  return normalizarPico(x, 0.85);
};

const clic = () => {
  const d = 0.12;
  const x = new Float32Array(Math.round(d * SR));
  for (const [t0, g] of [
    [0, 1],
    [0.045, 0.7],
  ]) {
    for (let i = 0; i < 0.03 * SR; i++) {
      const t = i / SR;
      const v = (ruido() * 0.6 + Math.sin(2 * Math.PI * 2400 * t)) * Math.exp(-t * 250) * g;
      x[Math.round(t0 * SR) + i] += v;
    }
  }
  return normalizarPico(svf(x, () => 1200, 0.7, "hp"), 0.85);
};

const campanita = () => {
  const d = 1.4;
  const x = new Float32Array(Math.round(d * SR));
  const golpes: [number, number][] = [
    [0, hz(88)],
    [0.11, hz(93)],
  ];
  for (const [t0, f] of golpes) {
    for (let i = Math.round(t0 * SR); i < x.length; i++) {
      const t = i / SR - t0;
      const env = Math.exp(-t * 4) * Math.min(1, t / 0.002);
      x[i] += (Math.sin(2 * Math.PI * f * t) + 0.4 * Math.sin(2 * Math.PI * f * 2.76 * t) * Math.exp(-t * 6)) * env * 0.5;
    }
  }
  return normalizarPico(x, 0.75);
};

mkdirSync("public/audio", { recursive: true });
escribirWav("public/audio/musica.wav", musL, musR);
escribirWav("public/audio/whoosh.wav", whoosh());
escribirWav("public/audio/pop.wav", pop());
escribirWav("public/audio/clic.wav", clic());
escribirWav("public/audio/campanita.wav", campanita());
console.log(`Música: ${total.toFixed(3)} s, corte en ${tCorte.toFixed(3)} s, vuelve en ${tVuelta.toFixed(3)} s`);
