"""Sintetiza musica (10 s) y efectos de sonido. Sin muestras externas.
Salida: public/audio/*.wav  (44.1 kHz, 16 bit, estereo)"""
import json, os, wave
import numpy as np

SR = 44100
ROOT = os.path.join(os.path.dirname(__file__), "..")
OUT = os.path.join(ROOT, "public", "audio")
os.makedirs(OUT, exist_ok=True)
TL = json.load(open(os.path.join(ROOT, "src", "timeline.json")))
DUR = TL["durationInFrames"] / TL["fps"]  # 10 s
N = int(DUR * SR)
rng = np.random.default_rng(7)

def t_arr(n): return np.arange(n) / SR
def mtof(m): return 440.0 * 2 ** ((m - 69) / 12)

def write(name, sig, peak):
    sig = np.asarray(sig, dtype=np.float64)
    if sig.ndim == 1: sig = np.stack([sig, sig], 1)
    sig = sig / max(1e-9, np.abs(sig).max()) * peak
    data = (sig * 32767).astype("<i2")
    with wave.open(os.path.join(OUT, name), "wb") as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR); w.writeframes(data.tobytes())

def add(buf, sig, start_s, pan=0.0, gain=1.0):
    i = int(start_s * SR)
    if i >= len(buf): return
    sig = sig[: len(buf) - i]
    l = gain * (1 - max(0, pan)); r = gain * (1 + min(0, pan))
    buf[i:i + len(sig), 0] += sig * l
    buf[i:i + len(sig), 1] += sig * r

def lowpass(x, fc):
    a = np.exp(-2 * np.pi * fc / SR); y = np.zeros_like(x); s = 0.0
    for i, v in enumerate(x):
        s = (1 - a) * v + a * s; y[i] = s
    return y

# ---------- instrumentos ----------
def marimba(f, dur=0.6):
    t = t_arr(int(dur * SR))
    s = np.sin(2*np.pi*f*t)*np.exp(-t*7) + 0.35*np.sin(2*np.pi*f*4*t)*np.exp(-t*22) + 0.15*np.sin(2*np.pi*f*10*t)*np.exp(-t*40)
    s *= np.minimum(1, t / 0.003)
    return s

def pad(f, dur):
    t = t_arr(int(dur * SR)); s = 0
    for d in (-0.004, 0.0, 0.004):
        ff = f * (1 + d)
        for h, a in ((1, 1), (2, 0.4), (3, 0.2), (4, 0.1)):
            s = s + a * np.sin(2*np.pi*ff*h*t + rng.random()*6.28) / 3
    env = np.minimum(1, t / 0.35) * np.minimum(1, (dur - t) / 0.25)
    return s * env

def bass(f, dur=0.5):
    t = t_arr(int(dur * SR))
    s = np.sin(2*np.pi*f*t) + 0.3*np.sin(2*np.pi*2*f*t)*np.exp(-t*6)
    return s * np.exp(-t*3.5) * np.minimum(1, t / 0.005)

def kick(dur=0.3):
    t = t_arr(int(dur * SR)); f = 45 + 80*np.exp(-t*30)
    ph = 2*np.pi*np.cumsum(f)/SR
    return np.sin(ph) * np.exp(-t*12)

def hat(dur=0.06):
    t = t_arr(int(dur * SR)); n = rng.standard_normal(len(t)); n = np.diff(n, prepend=0)
    return n * np.exp(-t*70)

def shaker_clap(dur=0.18):
    t = t_arr(int(dur * SR)); n = rng.standard_normal(len(t)); n = lowpass(n, 6000) - lowpass(n, 900)
    return n * np.exp(-t*22)

# ---------- musica ----------
def music():
    bpm = 100.0; beat = 60.0 / bpm  # 0.6 s -> 54 frames = 3 beats
    buf = np.zeros((N, 2))
    chords = [  # (acorde, bajo)  C - G - Am - F - C final
        ([48, 52, 55, 60], 36), ([47, 50, 55, 59], 31), ([45, 52, 57, 60], 33), ([41, 53, 57, 60], 29),
    ]
    for ci in range(4):
        ch, root = chords[ci]; start = ci * 3 * beat
        for m in ch: add(buf, pad(mtof(m), 3 * beat + 0.2), start, gain=0.10)
        add(buf, bass(mtof(root + 12)), start, gain=0.55)
        add(buf, bass(mtof(root + 12)), start + 2.0*beat, gain=0.35)
        pat = [0, 1, 2, 3, 2, 1]
        for k, idx in enumerate(pat):
            pan = -0.25 + 0.5 * (k / 5)
            add(buf, marimba(mtof(ch[idx] + 12)), start + k * beat / 2, pan=pan, gain=0.33)
    # acorde final (beat 12 -> 7.2 s), sostenido y con fade out
    start = 12 * beat; rem = DUR - start
    for m in [48, 52, 55, 60, 64]: add(buf, pad(mtof(m), rem), start, gain=0.12)
    add(buf, bass(mtof(36), 1.2), start, gain=0.6)
    for k, m in enumerate([72, 67, 64, 72, 76]):
        add(buf, marimba(mtof(m), 1.0), start + k * beat / 2, pan=-0.2 + 0.1*k, gain=0.30)
    # percusion suave: bombo en cada pulso, hats a contratiempo, clap en 2 y 4 (desde beat 2)
    nb = int(12 * beat / beat) + 1
    for b in range(0, 17):
        ts = b * beat
        if ts >= DUR - 0.3: break
        if b >= 2: add(buf, kick(), ts, gain=0.55 if b < 12 else 0.5)
        if b >= 2 and b % 2 == 1 and b < 12: add(buf, shaker_clap(), ts, gain=0.20)
    for k in range(4, 34):
        ts = k * beat / 2
        if ts >= 7.2: break
        add(buf, hat(), ts + beat/4*0 + (beat/2 if False else 0), pan=0.3, gain=0.10 if k % 2 else 0.06)
    # envolvente global: entrada 0.15 s y fade out 8.6 -> 10 s
    t = t_arr(N)
    env = np.minimum(1, t / 0.15) * np.where(t > 8.6, 0.5 * (1 + np.cos(np.pi * np.clip((t - 8.6) / (DUR - 8.6), 0, 1))), 1.0)
    return buf * env[:, None]

# ---------- efectos ----------
def sfx_whoosh():
    d = 0.7; n = int(d * SR); t = t_arr(n)
    noise = rng.standard_normal(n)
    out = np.zeros(n); ch = 24
    # barrido de banda: filtro paso-bajo con cutoff creciente y luego cayendo
    fc = 300 + 5200 * np.sin(np.pi * np.clip(t / d, 0, 1)) ** 1.5
    seg = 512; y = np.zeros(n); s = 0.0
    for i in range(0, n, seg):
        a = np.exp(-2*np.pi*fc[i]/SR)
        for j in range(i, min(n, i + seg)):
            s = (1 - a) * noise[j] + a * s; y[j] = s
    env = np.sin(np.pi * np.clip(t / d, 0, 1)) ** 2
    y = y * env
    st = np.stack([y, np.roll(y, 40)], 1)
    return st

def sfx_pop():
    d = 0.22; t = t_arr(int(d*SR)); f = 260 + 700*np.exp(-t*45)
    ph = 2*np.pi*np.cumsum(f)/SR
    s = np.sin(ph) * np.exp(-t*20) + 0.4*np.sin(2*ph) * np.exp(-t*34)
    click = rng.standard_normal(len(t)) * np.exp(-t*400) * 0.15
    return (s + click) * np.minimum(1, t / 0.0015)

def sfx_accent():
    d = 1.6; n = int(d*SR); t = t_arr(n); s = np.zeros(n)
    for i, m in enumerate([72, 76, 79, 84, 88]):  # campanitas C mayor + brillo
        f = mtof(m); dl = int(i * 0.06 * SR)
        tt = t_arr(n - dl)
        b = np.sin(2*np.pi*f*tt) * np.exp(-tt*2.6) + 0.3*np.sin(2*np.pi*f*2.76*tt) * np.exp(-tt*6)
        s[dl:] += b / (1 + i*0.2)
    imp = np.sin(2*np.pi*(55 + 70*np.exp(-t*25)).cumsum()/SR) * np.exp(-t*7) * 0.8
    hi = rng.standard_normal(n); hi = np.diff(hi, prepend=0) * np.exp(-t*9) * 0.05
    return s * 0.6 + imp + hi

mus = music()
write("musica.wav", mus, 0.55)
write("sfx_whoosh.wav", sfx_whoosh(), 0.7)
write("sfx_pop.wav", sfx_pop(), 0.7)
write("sfx_accent.wav", sfx_accent(), 0.7)
print("OK", {f: os.path.getsize(os.path.join(OUT, f)) for f in os.listdir(OUT)})
