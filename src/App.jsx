import { useState, useEffect, useRef } from "react";

// Engagement photos
const PHOTOS = {
  hero: "/photo-hero.jpg",
  story: "/photo-story.jpg",
  proposal: "/photo-proposal.jpg",
  ring: "/photo-ring.jpg",
  sunset: "/photo-sunset.jpg",
};

const P = {
  bg: "#FAF7F4", ivory: "#FFF9F5", parch: "#F0EAE2",
  burg: "#722F37", burgDk: "#5C252C", burgLt: "#8B3A43", burgFa: "#D4A0A7",
  sage: "#3D6B2E", sageLt: "#5A7D4A", sageFa: "#A8BF9A", sageDk: "#2A4E1E",
  gold: "#C9A96E", goldLt: "#E2C48A", goldDk: "#A07C45", goldFa: "#F0E0C0",
  ink: "#1A1816", inkS: "#2E2A27", inkF: "#5A544D", white: "#FFFFFF",
};

function Icon({ type, size = 28, color }) {
  const s = { width: size, height: size, display: "block", margin: "0 auto" };
  const c = color || P.burg;
  const icons = {
    courthouse: <svg viewBox="0 0 32 32" style={s}><path d="M16 3L4 11v2h24v-2L16 3z" fill="none" stroke={c} strokeWidth="1.2"/><rect x="7" y="15" width="3" height="10" rx="0.5" fill="none" stroke={c} strokeWidth="1"/><rect x="14.5" y="15" width="3" height="10" rx="0.5" fill="none" stroke={c} strokeWidth="1"/><rect x="22" y="15" width="3" height="10" rx="0.5" fill="none" stroke={c} strokeWidth="1"/><rect x="3" y="26" width="26" height="2.5" rx="0.5" fill="none" stroke={c} strokeWidth="1"/><circle cx="16" cy="8.5" r="1.5" fill={c} opacity="0.4"/></svg>,
    flame: <svg viewBox="0 0 32 32" style={s}><path d="M16 4c0 0-8 8-8 16a8 8 0 0016 0c0-8-8-16-8-16z" fill="none" stroke={c} strokeWidth="1.2"/><path d="M16 14c0 0-3 3-3 6a3 3 0 006 0c0-3-3-6-3-6z" fill={c} opacity="0.15"/></svg>,
    diamond: <svg viewBox="0 0 32 32" style={s}><path d="M16 4L6 14l10 14 10-14L16 4z" fill="none" stroke={c} strokeWidth="1.2"/><path d="M6 14h20" stroke={c} strokeWidth="0.8" opacity="0.3"/></svg>,
    rings: <svg viewBox="0 0 32 32" style={s}><circle cx="12" cy="16" r="6" fill="none" stroke={c} strokeWidth="1.2"/><circle cx="20" cy="16" r="6" fill="none" stroke={c} strokeWidth="1.2"/></svg>,
    gift: <svg viewBox="0 0 32 32" style={s}><rect x="5" y="12" width="22" height="4" rx="1" fill="none" stroke={c} strokeWidth="1.1"/><rect x="7" y="16" width="18" height="12" rx="1" fill="none" stroke={c} strokeWidth="1.1"/><line x1="16" y1="12" x2="16" y2="28" stroke={c} strokeWidth="0.8"/><path d="M16 12c0 0-3-5-7-5s-2 4 0 5" fill="none" stroke={c} strokeWidth="1"/><path d="M16 12c0 0 3-5 7-5s2 4 0 5" fill="none" stroke={c} strokeWidth="1"/></svg>,
    envelope: <svg viewBox="0 0 32 32" style={s}><rect x="4" y="8" width="24" height="16" rx="1.5" fill="none" stroke={c} strokeWidth="1.1"/><path d="M4 8l12 10L28 8" fill="none" stroke={c} strokeWidth="1"/></svg>,
    heart: <svg viewBox="0 0 32 32" style={s}><path d="M16 28S4 20 4 13a6 6 0 0112 0 6 6 0 0112 0c0 7-12 15-12 15z" fill="none" stroke={c} strokeWidth="1.2"/></svg>,
    person: <svg viewBox="0 0 32 32" style={s}><circle cx="16" cy="10" r="4.5" fill="none" stroke={c} strokeWidth="1.1"/><path d="M8 28c0-5 3.5-9 8-9s8 4 8 9" fill="none" stroke={c} strokeWidth="1.1"/></svg>,
  };
  return icons[type] || null;
}

function Leaf({ style, flip }) {
  return (
    <svg viewBox="0 0 60 240" style={{ position: "absolute", width: 36, opacity: 0.18, transform: flip ? "scaleX(-1)" : "none", ...style }}>
      <path d="M30 230Q29 190 30 150Q31 110 30 70Q29 40 30 10" fill="none" stroke={P.sage} strokeWidth="1"/>
      {[35,70,105,140,175,210].map((y,i) => (
        <ellipse key={y} cx={i%2===0?20:40} cy={y} rx="11" ry="5.5" fill={P.sage} opacity={0.5-i*0.04}
          transform={`rotate(${i%2===0?-28:28} ${i%2===0?20:40} ${y})`}/>
      ))}
    </svg>
  );
}

function GoldOrnament({ w = 200 }) {
  return (
    <svg width={w} height="20" viewBox={`0 0 ${w} 20`} style={{ display: "block", margin: "28px auto" }}>
      <line x1="0" y1="10" x2={w*0.3} y2="10" stroke={P.goldFa} strokeWidth="0.8"/>
      <line x1="0" y1="10" x2={w*0.28} y2="10" stroke={P.gold} strokeWidth="0.4" opacity="0.6"/>
      <circle cx={w*0.36} cy="10" r="1.5" fill={P.gold} opacity="0.7"/>
      <circle cx={w*0.42} cy="10" r="1" fill={P.goldLt} opacity="0.8"/>
      <path d={`M${w*0.46} 10 L${w*0.5} 4 L${w*0.54} 10 L${w*0.5} 16 Z`} fill={P.gold} opacity="0.85"/>
      <circle cx={w*0.58} cy="10" r="1" fill={P.goldLt} opacity="0.8"/>
      <circle cx={w*0.64} cy="10" r="1.5" fill={P.gold} opacity="0.7"/>
      <line x1={w*0.7} y1="10" x2={w} y2="10" stroke={P.goldFa} strokeWidth="0.8"/>
      <line x1={w*0.72} y1="10" x2={w} y2="10" stroke={P.gold} strokeWidth="0.4" opacity="0.6"/>
    </svg>
  );
}

function Orn({ w = 160 }) {
  return (
    <svg width={w} height="16" viewBox={`0 0 ${w} 16`} style={{ display: "block", margin: "24px auto" }}>
      <line x1="0" y1="8" x2={w*0.36} y2="8" stroke={P.goldFa} strokeWidth="0.7"/>
      <circle cx={w*0.42} cy="8" r="1.2" fill={P.gold}/>
      <circle cx={w*0.5} cy="8" r="2" fill={P.gold}/>
      <circle cx={w*0.58} cy="8" r="1.2" fill={P.gold}/>
      <line x1={w*0.64} y1="8" x2={w} y2="8" stroke={P.goldFa} strokeWidth="0.7"/>
    </svg>
  );
}

function Head({ pre, title }) {
  return (
    <div style={{ textAlign: "center", marginBottom: 52 }}>
      <p style={{ fontFamily: "'Lora', serif", fontSize: 11, letterSpacing: 6, textTransform: "uppercase", color: P.gold, margin: "0 0 12px 0", fontWeight: 600 }}>{pre}</p>
      <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,6vw,48px)", fontWeight: 500, fontStyle: "italic", color: P.burgDk, margin: 0, lineHeight: 1.2 }}>{title}</h2>
      <GoldOrnament w={180} />
    </div>
  );
}

function useIsMobile() {
  const [m, setM] = useState(() => window.innerWidth < 600);
  useEffect(() => {
    const h = () => setM(window.innerWidth < 600);
    window.addEventListener("resize", h);
    return () => window.removeEventListener("resize", h);
  }, []);
  return m;
}

function useReveal() {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) { setV(true); return; }
    try {
      const o = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); o.disconnect(); } }, { threshold: 0.15 });
      o.observe(el);
      const fallback = setTimeout(() => setV(true), 2000);
      return () => { o.disconnect(); clearTimeout(fallback); };
    } catch { setV(true); }
  }, []);
  return [ref, v];
}

function PhotoFrame({ src, alt, style, rounded }) {
  return (
    <div style={{ position: "relative", display: "inline-block", ...style }}>
      <div style={{ position: "absolute", inset: -6, border: `1px solid ${P.gold}`, borderRadius: rounded ? "50%" : 4, pointerEvents: "none", opacity: 0.6 }} />
      <img src={src} alt={alt} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", borderRadius: rounded ? "50%" : 3 }} />
    </div>
  );
}

function Countdown({ date }) {
  const [t, setT] = useState({ d:0, h:0, m:0, s:0 });
  useEffect(() => {
    const tick = () => {
      const diff = new Date(date) - new Date();
      if (diff > 0) setT({ d: Math.floor(diff/864e5), h: Math.floor((diff%864e5)/36e5), m: Math.floor((diff%36e5)/6e4), s: Math.floor((diff%6e4)/1e3) });
    };
    tick(); const i = setInterval(tick, 1000); return () => clearInterval(i);
  }, [date]);
  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "clamp(16px,5vw,36px)", marginTop: 40, flexWrap: "wrap" }}>
      {[["d","Days"],["h","Hours"],["m","Min"],["s","Sec"]].map(([k,l]) => (
        <div key={k} style={{ textAlign: "center" }}>
          <div style={{
            fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,8vw,50px)", fontWeight: 500,
            color: P.burgDk, lineHeight: 1, minWidth: 56,
            background: `linear-gradient(180deg, ${P.burgDk} 0%, ${P.gold} 100%)`,
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          }}>{String(t[k]).padStart(2,"0")}</div>
          <div style={{ fontFamily: "'Lora', serif", fontSize: 9, letterSpacing: 4, textTransform: "uppercase", color: P.gold, marginTop: 10, fontWeight: 600 }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

function RSVPForm() {
  const [done, setDone] = useState(false);
  const [confetti, setConfetti] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);
  const [f, setF] = useState({ name:"", email:"", att:"", note:"" });
  const SHEET_URL = "https://script.google.com/macros/s/AKfycbzSb3gTQS-dIn3BA6JzkDMsslayJwJhczIw8Y_8KF8NoNeqHxW3ZxcI3nAHcyh_zRpF/exec";
  const inp = {
    fontFamily: "'Lora', serif", fontSize: 15, padding: "15px 18px",
    border: `1px solid ${P.goldFa}`, borderRadius: 3,
    background: P.ivory, color: P.ink, width: "100%", boxSizing: "border-box",
    outline: "none", transition: "border-color 0.2s ease",
  };

  const handleSubmit = async () => {
    if (!f.name || !f.att) return;
    setSending(true);
    setError(false);
    try {
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: f.name,
          email: f.email,
          attending: f.att === "yes" ? "Joyfully Accepts" : "Regretfully Declines",
          note: f.note || "",
        }),
      });
      setDone(true);
      if (f.att === "yes") { setConfetti(true); setTimeout(() => setConfetti(false), 3000); }
    } catch (err) {
      setError(true);
    }
    setSending(false);
  };

  if (done) return (
    <>
      {confetti && <Confetti />}
      <div style={{ textAlign: "center", padding: "56px 44px", background: P.ivory, border: `1px solid ${P.goldFa}`, borderRadius: 6, maxWidth: 480, boxShadow: `0 8px 40px rgba(201,169,110,0.12), 0 2px 12px rgba(114,47,55,0.08)`, animation: "fadeInUp 0.8s ease-out" }}>
        <svg width="56" height="56" viewBox="0 0 56 56" style={{ display:"block", margin:"0 auto 20px" }}>
          <circle cx="28" cy="28" r="26" fill="none" stroke={P.goldFa} strokeWidth="1.5" />
          <circle cx="28" cy="28" r="22" fill="none" stroke={P.gold} strokeWidth="0.5" opacity="0.5" />
          <path d="M18 28l7 7 13-13" fill="none" stroke={P.burg} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 500, fontStyle: "italic", color: P.burgDk, margin: "0 0 14px 0" }}>
          {f.att === "yes" ? `We can't wait to see you!` : `We'll miss you dearly`}
        </h3>
        <p style={{ fontFamily: "'Lora', serif", fontSize: 15, color: P.inkS, lineHeight: 1.8 }}>
          {f.att === "yes"
            ? <>Thank you, <em>{f.name.split(" ")[0]}</em>. Your presence means everything to us. We'll see you on July 31st!</>
            : <>Thank you, <em>{f.name.split(" ")[0]}</em>, for letting us know. You'll be in our hearts on our special day.</>}
        </p>
        {f.att === "yes" && (
          <div style={{ marginTop: 28, padding: "18px 22px", background: `${P.goldFa}40`, borderRadius: 4, border: `1px solid ${P.goldFa}` }}>
            <p style={{ fontFamily: "'Lora', serif", fontSize: 11, letterSpacing: 3, color: P.burgDk, textTransform: "uppercase", fontWeight: 600 }}>Friday · July 31, 2026</p>
            <p style={{ fontFamily: "'Lora', serif", fontSize: 13, color: P.inkF, marginTop: 6 }}>Sarasota County Courthouse → Terra Gaucha, Tampa</p>
          </div>
        )}
      </div>
    </>
  );
  return (
    <div style={{ maxWidth: 480, width: "100%", background: P.ivory, padding: "clamp(28px,6vw,48px) clamp(20px,5vw,40px)", borderRadius: 6, border: `1px solid ${P.goldFa}`, boxShadow: `0 8px 40px rgba(201,169,110,0.1), 0 2px 12px rgba(114,47,55,0.06)` }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <input style={inp} placeholder="Your Full Name *" value={f.name} onChange={e => setF({...f, name: e.target.value})} />
        <input style={inp} placeholder="Email Address" type="email" value={f.email} onChange={e => setF({...f, email: e.target.value})} />
        <div style={{ display: "flex", gap: 12 }}>
          {["Joyfully Accept","Regretfully Decline"].map(opt => {
            const val = opt[0]==="J"?"yes":"no"; const sel = f.att===val;
            return (<button key={opt} onClick={() => setF({...f, att: val})}
              style={{ flex: 1, padding: "15px 8px", fontFamily: "'Lora', serif", fontSize: 13, fontWeight: 500,
                border: `1px solid ${sel ? P.gold : P.goldFa}`, borderRadius: 3, cursor: "pointer",
                background: sel ? P.burg : P.ivory, color: sel ? P.white : P.inkS,
                transition: "all 0.2s ease",
                boxShadow: sel ? `0 4px 16px rgba(114,47,55,0.2)` : "none",
              }}>{opt}</button>);
          })}
        </div>
        <textarea style={{...inp, minHeight: 80, resize: "vertical"}} placeholder="Leave us a sweet note (optional)" value={f.note} onChange={e => setF({...f, note: e.target.value})} />
        {error && <p style={{ fontFamily: "'Lora', serif", fontSize: 13, color: "#c0392b", textAlign: "center", margin: 0 }}>Something went wrong. Please try again.</p>}
        {!f.name && !f.att ? null : !f.name ? <p style={{ fontFamily: "'Lora', serif", fontSize: 12, color: P.inkF, textAlign: "center", margin: 0 }}>Please enter your name</p> : !f.att ? <p style={{ fontFamily: "'Lora', serif", fontSize: 12, color: P.inkF, textAlign: "center", margin: 0 }}>Please select your attendance</p> : null}
        <button onClick={handleSubmit} disabled={sending || !f.name || !f.att}
          style={{ padding: "16px 32px", fontFamily: "'Lora', serif", fontSize: 11, letterSpacing: 4, fontWeight: 600,
            textTransform: "uppercase", border: `1.5px solid ${P.gold}`, borderRadius: 3, cursor: sending ? "wait" : "pointer",
            background: "transparent", color: P.burgDk, marginTop: 4, opacity: sending || !f.name || !f.att ? 0.5 : 1,
            transition: "all 0.2s ease",
          }}>
          {sending ? "Sending..." : "Send RSVP"}
        </button>
      </div>
    </div>
  );
}

function Envelope({ onOpen }) {
  const [phase, setPhase] = useState("idle");
  const isMobile = useIsMobile();

  const go = () => {
    if (phase !== "idle") return;
    setPhase("cracking");
    setTimeout(() => setPhase("sealGone"), 500);
    setTimeout(() => setPhase("open"), 900);
    setTimeout(() => { setPhase("gone"); onOpen(); }, 2400);
  };

  if (phase === "gone") return null;

  const envW = isMobile ? Math.min(window.innerWidth * 0.88, 320) : 360;
  const envH = Math.round(envW * 0.62);
  const flapH = Math.round(envH * 0.48);

  return (
    <div onClick={go} style={{ position: "fixed", inset: 0, zIndex: 200, cursor: "pointer", overflow: "hidden" }}>
      {/* Tulip background */}
      <img src="/Tulipanes.jpeg" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 60%" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, rgba(8,6,4,0.3) 0%, rgba(8,6,4,0.55) 100%)" }} />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 60%, transparent 30%, rgba(0,0,0,0.35) 100%)" }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "0 16px" }}>

        <p style={{ fontFamily: "'Lora', serif", fontSize: "clamp(8px,2.5vw,10px)", letterSpacing: 7, textTransform: "uppercase", color: "rgba(245,237,228,0.7)", fontWeight: 600, marginBottom: 14, textAlign: "center" }}>You are cordially invited</p>

        <p style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(36px,9vw,68px)",
          fontStyle: "italic", fontWeight: 500,
          background: `linear-gradient(135deg, #FFF9F5 0%, ${P.goldLt} 40%, #FFF9F5 55%, ${P.gold} 75%, #FFF9F5 100%)`,
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
          lineHeight: 1.1, textAlign: "center", margin: 0,
          animation: "shimmer 4s linear infinite",
        }}>Daniel &amp; Edelys</p>

        <svg width={isMobile ? 140 : 180} height="22" viewBox="0 0 180 22" style={{ margin: "14px 0 8px" }}>
          <line x1="0" y1="11" x2="72" y2="11" stroke={`${P.gold}55`} strokeWidth="0.7" />
          <circle cx="80" cy="11" r="1.5" fill={`${P.gold}80`} />
          <circle cx="90" cy="11" r="3" fill={`${P.gold}60`} />
          <circle cx="100" cy="11" r="1.5" fill={`${P.gold}80`} />
          <line x1="108" y1="11" x2="180" y2="11" stroke={`${P.gold}55`} strokeWidth="0.7" />
        </svg>
        <p style={{ fontFamily: "'Lora', serif", fontSize: "clamp(9px,2.5vw,11px)", letterSpacing: 5, color: `${P.goldLt}CC`, fontWeight: 600, textTransform: "uppercase", marginBottom: isMobile ? 28 : 40, textAlign: "center" }}>July 31st · 2026</p>

        {/* === ENVELOPE === */}
        <div style={{ position: "relative", width: envW, perspective: 1200 }}>

          {/* Card — behind the body, slides up when opened */}
          <div style={{
            position: "absolute",
            top: 0, left: "8%", width: "84%",
            height: envH * 0.8,
            background: "linear-gradient(160deg, #FFFDF8 0%, #FFF5E8 50%, #FDF0DC 100%)",
            borderRadius: 3,
            zIndex: 0,
            transform: `translateY(${phase === "open" ? Math.round(-envH * 0.35) : 0}px)`,
            transition: "transform 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.2s",
            boxShadow: "0 -4px 20px rgba(0,0,0,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <div style={{ textAlign: "center", opacity: phase === "open" ? 1 : 0, transition: "opacity 0.6s ease 0.8s" }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: isMobile ? 13 : 15, color: P.burgDk, margin: 0 }}>Daniel &amp; Edelys</p>
              <p style={{ fontFamily: "'Lora', serif", fontSize: 9, letterSpacing: 3, color: P.gold, textTransform: "uppercase", fontWeight: 600, marginTop: 6 }}>July 31, 2026</p>
            </div>
          </div>

          {/* Envelope body — relative positioning defines the layout flow */}
          <div style={{
            position: "relative",
            width: "100%",
            height: envH,
            background: `linear-gradient(170deg, #FDFAF6 0%, #F5EEE4 40%, #EDE3D5 100%)`,
            borderRadius: 4,
            border: "1px solid rgba(201,169,110,0.3)",
            boxShadow: "0 20px 60px rgba(0,0,0,0.45), 0 8px 24px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.6)",
            zIndex: 2,
            overflow: "hidden",
          }}>
            {[...Array(8)].map((_,i) => (
              <div key={i} style={{ position: "absolute", left: 0, right: 0, top: `${12 + i * 13}%`, height: 1, background: "rgba(180,165,145,0.08)" }} />
            ))}
            <svg width="100%" height="100%" viewBox={`0 0 ${envW} ${envH}`} style={{ position: "absolute", inset: 0 }}>
              <path d={`M0 ${envH} L${envW/2} ${envH*0.48} L${envW} ${envH}`} fill="rgba(225,215,200,0.45)" />
              <path d={`M0 ${envH} L${envW/2} ${envH*0.48} L${envW} ${envH}`} fill="none" stroke="rgba(201,169,110,0.2)" strokeWidth="0.8" />
              <path d={`M0 0 L${envW/2} ${envH*0.48} L0 ${envH}`} fill="rgba(210,200,185,0.2)" />
              <path d={`M${envW} 0 L${envW/2} ${envH*0.48} L${envW} ${envH}`} fill="rgba(210,200,185,0.2)" />
              <path d={`M0 0 L${envW/2} ${envH*0.48} L0 ${envH}`} fill="none" stroke="rgba(201,169,110,0.15)" strokeWidth="0.6" />
              <path d={`M${envW} 0 L${envW/2} ${envH*0.48} L${envW} ${envH}`} fill="none" stroke="rgba(201,169,110,0.15)" strokeWidth="0.6" />
              <rect x="1" y="1" width={envW-2} height={envH-2} rx="3" fill="none" stroke="rgba(201,169,110,0.25)" strokeWidth="0.8" />
            </svg>
          </div>

          {/* Flap — covers top of body, triangle pointing down, hinges at top */}
          <div style={{
            position: "absolute",
            top: 0, left: 0,
            width: "100%",
            height: flapH,
            transformOrigin: "top center",
            opacity: (phase === "sealGone" || phase === "open") ? 0 : 1,
            transform: (phase === "sealGone" || phase === "open") ? "translateY(-12px)" : "translateY(0)",
            transition: "opacity 0.5s ease, transform 0.5s ease",
            zIndex: 4,
          }}>
            <div style={{
              position: "absolute", inset: 0,
              background: "linear-gradient(190deg, #F8F2E8 0%, #EDE3D5 60%, #E5D8C5 100%)",
              clipPath: "polygon(0% 0%, 100% 0%, 50% 100%)",
              boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
            }}>
              <svg width="100%" height="100%" viewBox={`0 0 ${envW} ${flapH}`} style={{ position: "absolute", inset: 0 }}>
                <path d={`M0 0 L${envW} 0 L${envW/2} ${flapH}`} fill="none" stroke="rgba(201,169,110,0.2)" strokeWidth="0.6" />
              </svg>
            </div>

          </div>

          {/* Wax seal — at the tip of the flap triangle */}
          <div style={{
            position: "absolute",
            top: flapH - 23,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 5,
            opacity: (phase === "cracking" || phase === "sealGone" || phase === "open") ? 0 : 1,
            transition: "opacity 0.35s ease 0.15s",
            animation: phase === "cracking" ? "sealCrack 0.4s ease-out" : "none",
          }}>
            <svg width="46" height="46" viewBox="0 0 46 46">
              <circle cx="23" cy="23" r="22" fill="none" stroke={`${P.gold}40`} strokeWidth="2" />
              <circle cx="23" cy="23" r="19" fill={P.burg} />
              <circle cx="23" cy="23" r="19" fill="url(#sealGrad)" />
              <defs>
                <radialGradient id="sealGrad" cx="35%" cy="30%">
                  <stop offset="0%" stopColor="#A04050" />
                  <stop offset="100%" stopColor={P.burgDk} />
                </radialGradient>
              </defs>
              <circle cx="23" cy="23" r="15" fill="none" stroke={`${P.gold}60`} strokeWidth="0.8" />
              <text x="23" y="27" textAnchor="middle" fill="rgba(255,249,245,0.92)" fontSize="12" fontFamily="'Playfair Display', serif" fontStyle="italic" fontWeight="500">{`D\u00b7E`}</text>
              {phase === "cracking" && <>
                <line x1="23" y1="4" x2="19" y2="20" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
                <line x1="38" y1="14" x2="26" y2="22" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" />
                <line x1="40" y1="30" x2="28" y2="25" stroke="rgba(255,255,255,0.3)" strokeWidth="0.6" />
              </>}
            </svg>
          </div>
        </div>

        <p style={{ marginTop: isMobile ? 24 : 32, fontFamily: "'Lora', serif", fontSize: "clamp(8px,2.5vw,10px)", letterSpacing: 6, color: "rgba(245,237,228,0.5)", textTransform: "uppercase", fontWeight: 600, animation: "pulse 2.5s ease-in-out infinite" }}>Tap to open</p>
      </div>
    </div>
  );
}

function Petals() {
  const petals = [
    {l:"8%",d:"0s",dur:"9s",s:9,r:20},{l:"18%",d:"1.5s",dur:"11s",s:7,r:80},
    {l:"28%",d:"3s",dur:"8s",s:11,r:140},{l:"40%",d:"0.8s",dur:"12s",s:6,r:200},
    {l:"52%",d:"2.2s",dur:"10s",s:10,r:260},{l:"63%",d:"4s",dur:"9s",s:8,r:320},
    {l:"74%",d:"1s",dur:"11s",s:7,r:40},{l:"83%",d:"3.5s",dur:"8s",s:9,r:100},
    {l:"91%",d:"0.5s",dur:"13s",s:6,r:160},{l:"47%",d:"5s",dur:"10s",s:8,r:220},
    {l:"35%",d:"6s",dur:"9s",s:7,r:280},{l:"70%",d:"2.8s",dur:"12s",s:10,r:340},
  ];
  return (
    <div style={{ position:"absolute", inset:0, overflow:"hidden", pointerEvents:"none", zIndex:1 }}>
      {petals.map((p,i) => (
        <div key={i} style={{ position:"absolute", left:p.l, top:"-30px", animation:`petalFall ${p.dur} ${p.d} infinite linear` }}>
          <svg width={p.s} height={p.s*1.4} viewBox="0 0 10 14">
            <ellipse cx="5" cy="7" rx="3.5" ry="6" fill={P.burgFa} opacity="0.7" transform={`rotate(${p.r} 5 7)`} />
          </svg>
        </div>
      ))}
    </div>
  );
}

function Divider() {
  return (
    <div style={{ width:"100%", display:"flex", justifyContent:"center", margin:"-1px 0", lineHeight:0, overflow:"hidden" }}>
      <svg width="460" height="48" viewBox="0 0 460 48" style={{ display:"block" }}>
        <line x1="0" y1="24" x2="185" y2="24" stroke={P.goldFa} strokeWidth="0.7" />
        <path d="M195 24 Q202 14 210 24 Q218 34 226 24 Q234 14 242 24 Q250 34 258 24 Q266 14 274 24" fill="none" stroke={P.gold} strokeWidth="1.2" opacity="0.6" />
        <circle cx="234" cy="24" r="3.5" fill={P.gold} opacity="0.5" />
        <circle cx="210" cy="24" r="2" fill={P.goldLt} opacity="0.5" />
        <circle cx="258" cy="24" r="2" fill={P.goldLt} opacity="0.5" />
        <line x1="275" y1="24" x2="460" y2="24" stroke={P.goldFa} strokeWidth="0.7" />
      </svg>
    </div>
  );
}

function StaggerCard({ children, index, style }) {
  const [ref, vis] = useReveal();
  return (
    <div ref={ref} style={{ ...style, opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(36px)",
      transition: `opacity 0.7s ease-out ${index * 150}ms, transform 0.7s ease-out ${index * 150}ms` }}>
      {children}
    </div>
  );
}

function CalendarButton() {
  const googleUrl = "https://calendar.google.com/calendar/render?action=TEMPLATE&text=Daniel+%26+Edelys+Wedding&dates=20260731T210000Z/20260801T010000Z&details=Reception+at+Terra+Gaucha+Brazilian+Steakhouse%2C+Tampa.+Ceremony+earlier+at+Sarasota+County+Courthouse+(contact+us+for+time).&location=Terra+Gaucha+Brazilian+Steakhouse%2C+Tampa%2C+FL";
  const downloadIcs = () => {
    const lines = [
      "BEGIN:VCALENDAR","VERSION:2.0","PRODID:-//Daniel & Edelys Wedding//EN",
      "CALSCALE:GREGORIAN","METHOD:PUBLISH","BEGIN:VEVENT",
      "DTSTART:20260731T170000","DTEND:20260731T210000",
      "SUMMARY:Daniel & Edelys Wedding",
      "LOCATION:2000 Main Street\, Sarasota\, FL",
      "DESCRIPTION:Ceremony at Sarasota County Courthouse. Reception at Terra Gaucha Brazilian Steakhouse\, Tampa.",
      "END:VEVENT","END:VCALENDAR"
    ].join("\r\n");
    const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent) || /iPad|iPhone|iPod/.test(navigator.userAgent);
    if (isSafari) {
      window.open("data:text/calendar;charset=utf-8," + encodeURIComponent(lines));
    } else {
      const blob = new Blob([lines], { type:"text/calendar;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url; a.download = "daniel-edelys-wedding.ics";
      document.body.appendChild(a); a.click(); document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  };
  const btnStyle = {
    fontFamily:"'Lora', serif", fontSize:10, letterSpacing:3, fontWeight:600, textTransform:"uppercase",
    padding:"13px 28px", borderRadius:3, cursor:"pointer", border:`1px solid ${P.goldFa}`,
    background:"transparent", color:P.inkF, transition:"all 0.2s ease",
  };
  return (
    <div style={{ display:"flex", gap:14, flexWrap:"wrap", justifyContent:"center", marginTop:36 }}>
      <a href={googleUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none" }}>
        <button style={btnStyle}>+ Google Calendar</button>
      </a>
      <button style={btnStyle} onClick={downloadIcs}>+ Apple / iCal</button>
    </div>
  );
}

function Confetti() {
  const colors = [P.burg, P.burgFa, P.sage, P.sageFa, P.gold, P.goldLt, "#F5EDE4", P.burgLt, "#A8BF9A"];
  const pieces = Array.from({ length: 70 }, (_, i) => ({
    left: `${(i * 13.7) % 100}%`,
    delay: `${(i * 0.06) % 1}s`,
    dur: `${1.4 + (i * 0.07) % 1}s`,
    color: colors[i % colors.length],
    w: 5 + (i * 3) % 7,
    h: 3 + (i * 2) % 5,
    rot: (i * 47) % 360,
  }));
  return (
    <div style={{ position:"fixed", inset:0, pointerEvents:"none", zIndex:9998, overflow:"hidden" }}>
      {pieces.map((p, i) => (
        <div key={i} style={{ position:"absolute", left:p.left, top:"-12px", width:p.w, height:p.h,
          background:p.color, borderRadius:1, opacity:0.9,
          animation:`confettiFall ${p.dur} ${p.delay} ease-in forwards`,
          transform:`rotate(${p.rot}deg)` }} />
      ))}
    </div>
  );
}

function Sec({ id, children, bg }) {
  const [ref, vis] = useReveal();
  return (
    <section ref={ref} id={id} style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "clamp(64px,10vw,120px) clamp(16px,5vw,40px)", background: bg || P.bg, position: "relative", overflow: "hidden",
      opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(48px)",
      transition: "opacity 0.9s ease-out, transform 0.9s ease-out" }}>
      {children}
    </section>
  );
}

export default function App() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const loader = document.getElementById("loader");
    if (loader) {
      loader.classList.add("fade-out");
      setTimeout(() => loader.remove(), 800);
    }
  }, []);

  useEffect(() => {
    const wedding = new Date("2026-07-31T00:00:00");
    const update = () => {
      const diff = wedding - new Date();
      const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
      document.title = diff > 0 ? `${days} days · Daniel & Edelys` : "Daniel & Edelys - July 31, 2026";
    };
    update();
    const t = setInterval(update, 60000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    if (!open) return;
    let ticking = false;
    const h = () => {
      if (!ticking) { window.requestAnimationFrame(() => {
        setScrolled(window.scrollY > 50);
        for (const id of ["home","story","details","party","registry","rsvp"]) {
          const el = document.getElementById(id);
          if (el) { const r = el.getBoundingClientRect(); if (r.top <= 160 && r.bottom > 160) { setActive(id); break; } }
        }
        ticking = false;
      }); ticking = true; }
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, [open]);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  const links = [["home","Home"],["story","Our Story"],["details","Details"],["party","Wedding Party"],["registry","Registry"],["rsvp","RSVP"]];

  const timeline = [
    { date: "Feb 22, 2025", title: "First Conversation", text: "A simple message turned into something neither of us expected. God was already writing our story before we even knew it." },
    { date: "Mar 10, 2025", title: "First Hangout & Bible Study", text: "We opened the Word together for the first time. In that moment, it became clear this was more than just a friendship." },
    { date: "Mar 26, 2025", title: "Hearts Revealed", text: "We finally expressed what we'd been feeling. Honest, vulnerable, and certain that this was something worth pursuing." },
    { date: "Apr 13, 2025", title: "Official - Palm Sunday", text: "On Palm Sunday, we made it official. A day that already carried so much meaning became the start of our journey together." },
    { date: "Apr 19, 2025", title: "First Date - Patrona", text: "Our first real date at Patrona. Good food, better conversation, and a night we'll never forget." },
    { date: "Feb 15, 2026", title: "The Proposal", text: "The day after Valentine's Day, Daniel asked Edelys to be his forever. With her parents' blessing and a heart full of certainty - she said yes." },
  ];

  return (
    <div style={{ background: P.bg, minHeight: "100vh", fontFamily: "'Lora', serif", color: P.ink }}>
      <style>{`
        * { box-sizing:border-box; margin:0; }
        html { scroll-behavior:smooth; }
        ::selection { background:${P.goldFa}; color:${P.ink}; }
        @keyframes petalFall {
          0% { transform: translateY(-20px) rotate(0deg) scale(0.8); opacity:0; }
          10% { opacity:0.55; }
          85% { opacity:0.35; }
          100% { transform: translateY(105vh) rotate(420deg) scale(1); opacity:0; }
        }
        @keyframes fadeInUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
        @keyframes pulse { 0%,100% { opacity:0.5; } 50% { opacity:1; } }
        @keyframes confettiFall {
          0% { transform: translateY(-10px) rotate(0deg); opacity:1; }
          100% { transform: translateY(105vh) rotate(720deg); opacity:0; }
        }
        @keyframes drawLine { from { stroke-dashoffset: 400; } to { stroke-dashoffset: 0; } }
        @keyframes shimmer { 0% { background-position: 200% center; } 100% { background-position: -200% center; } }
        @keyframes sealCrack {
          0% { transform: translateX(-50%) scale(1) rotate(0deg); }
          25% { transform: translateX(-50%) scale(1.08) rotate(-2deg); }
          50% { transform: translateX(-50%) scale(0.95) rotate(1deg); }
          75% { transform: translateX(-50%) scale(1.03) rotate(-1deg); }
          100% { transform: translateX(-50%) scale(1) rotate(0deg); }
        }
        button:hover:not(:disabled) { opacity: 0.85; }
        a:hover { opacity: 0.8; }
        @media (max-width: 480px) {
          nav button { padding: 8px 8px !important; font-size: 8px !important; letter-spacing: 1.5px !important; }
        }
      `}</style>

      {!open && <Envelope onOpen={() => setOpen(true)} />}

      {open && (<>
        <nav style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 90,
          display: "flex", justifyContent: "center", alignItems: "center", gap: 2, flexWrap: "wrap",
          padding: scrolled ? "6px 8px" : "10px 8px",
          background: `${P.bg}f4`, backdropFilter: "blur(14px)",
          borderBottom: `1px solid ${P.goldFa}60`,
          boxShadow: scrolled ? `0 1px 12px rgba(201,169,110,0.1)` : "none",
          transition: "padding 0.3s ease, box-shadow 0.3s ease",
        }}>
          {links.map(([id, label]) => (
            <button key={id} onClick={() => go(id)}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontFamily: "'Lora', serif",
                fontSize: "clamp(8px,2.2vw,10.5px)",
                letterSpacing: 2, textTransform: "uppercase",
                padding: "6px 12px", minHeight: 36,
                color: active === id ? P.burgDk : P.inkF,
                position: "relative", fontWeight: active === id ? 700 : 500,
                transition: "color 0.2s ease",
              }}>
              {label}
              {active === id && <span style={{ position: "absolute", bottom: 2, left: "50%", transform: "translateX(-50%)", width: 16, height: 1.5, background: P.gold, borderRadius: 1 }} />}
            </button>
          ))}
        </nav>

        {/* HOME */}
        <section id="home" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "clamp(100px,15vw,140px) clamp(16px,5vw,40px) clamp(60px,8vw,100px)", background: P.bg, position: "relative", overflow: "hidden" }}>
          <Petals />
          <Leaf style={{ top: 80, left: 20 }} />
          <Leaf style={{ top: 80, right: 20 }} flip />
          <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
            <p style={{ fontFamily: "'Lora', serif", fontSize: "clamp(9px,2.5vw,12px)", letterSpacing: 7, textTransform: "uppercase", color: P.gold, marginBottom: 22, fontWeight: 600 }}>Together with their families</p>

            {/* Names with gold shimmer */}
            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(48px,11vw,92px)", fontWeight: 500, fontStyle: "italic",
              background: `linear-gradient(135deg, ${P.burgDk} 0%, ${P.burg} 30%, ${P.gold} 50%, ${P.burg} 70%, ${P.burgDk} 100%)`,
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              lineHeight: 1.05,
              animation: "shimmer 5s linear infinite",
            }}>Daniel</h1>

            <svg width="80" height="28" viewBox="0 0 80 28" style={{ display: "block", margin: "10px auto" }}>
              <line x1="0" y1="14" x2="28" y2="14" stroke={P.goldFa} strokeWidth="0.6"/>
              <circle cx="32" cy="14" r="1.2" fill={P.gold} opacity="0.7"/>
              <text x="40" y="18" textAnchor="middle" fill={P.gold} fontSize="16" fontFamily="'Playfair Display', serif" fontStyle="italic">&amp;</text>
              <circle cx="48" cy="14" r="1.2" fill={P.gold} opacity="0.7"/>
              <line x1="52" y1="14" x2="80" y2="14" stroke={P.goldFa} strokeWidth="0.6"/>
            </svg>

            <h1 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(48px,11vw,92px)", fontWeight: 500, fontStyle: "italic",
              background: `linear-gradient(135deg, ${P.burgDk} 0%, ${P.burg} 30%, ${P.gold} 50%, ${P.burg} 70%, ${P.burgDk} 100%)`,
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              lineHeight: 1.05,
              animation: "shimmer 5s linear infinite",
            }}>Edelys</h1>

            <GoldOrnament w={150} />

            {/* Hero photo */}
            <div style={{ margin: "28px auto", maxWidth: "clamp(260px, 70vw, 360px)", borderRadius: 6, overflow: "hidden", border: `1px solid ${P.goldFa}`, boxShadow: `0 12px 40px rgba(114,47,55,0.12), 0 4px 16px rgba(201,169,110,0.15)` }}>
              <img src={PHOTOS.hero} alt="Daniel and Edelys" style={{ display: "block", width: "100%", height: "auto" }} />
            </div>

            <p style={{ fontFamily: "'Lora', serif", fontSize: "clamp(11px,3vw,14px)", letterSpacing: 4, textTransform: "uppercase", color: P.inkS, fontWeight: 500, marginTop: 8 }}>Request the pleasure of your company</p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(18px,4vw,22px)", fontStyle: "italic", color: P.ink, marginTop: 20, fontWeight: 500 }}>Friday, the Thirty-First of July</p>
            <p style={{ fontFamily: "'Lora', serif", fontSize: "clamp(11px,3vw,13px)", letterSpacing: 4, color: P.gold, marginTop: 6, fontWeight: 600 }}>Two Thousand Twenty-Six</p>
            <Countdown date="2026-07-31T00:00:00" />
            <button onClick={() => go("rsvp")} style={{ marginTop: 48, padding: "16px 48px", fontFamily: "'Lora', serif", fontSize: "clamp(10px,2.5vw,11px)", letterSpacing: 5, fontWeight: 600, textTransform: "uppercase", border: `1.5px solid ${P.gold}`, borderRadius: 2, cursor: "pointer", background: "transparent", color: P.burgDk, transition: "all 0.25s ease", minHeight: 52 }}>Kindly Respond</button>
          </div>
        </section>

        <Divider />

        {/* OUR STORY */}
        <Sec id="story" bg={P.ivory}>
          <Head pre="The Beginning" title="Our Story" />

          <div style={{ margin: "0 auto 52px", maxWidth: "clamp(280px, 80vw, 500px)", borderRadius: 6, overflow: "hidden", border: `1px solid ${P.goldFa}`, boxShadow: `0 12px 40px rgba(114,47,55,0.1), 0 4px 16px rgba(201,169,110,0.12)` }}>
            <img src={PHOTOS.story} alt="Daniel and Edelys laughing together" style={{ display: "block", width: "100%", height: "auto" }} />
          </div>

          <div style={{ maxWidth: 560, width: "100%", position: "relative" }}>
            <div style={{ position: "absolute", left: isMobile ? 16 : "50%", top: 0, bottom: 0, width: 1, background: `linear-gradient(to bottom, transparent, ${P.goldFa}, transparent)`, transform: isMobile ? "none" : "translateX(-50%)" }} />
            {timeline.map((item, i) => (
              <div key={i} style={{ display: "flex", flexDirection: isMobile ? "column" : (i%2===0?"row":"row-reverse"), marginBottom: isMobile ? 36 : 52, position: "relative", paddingLeft: isMobile ? 40 : 0 }}>
                <div style={{ position: "absolute", left: isMobile ? 12 : "50%", top: 6, transform: isMobile ? "none" : "translateX(-50%)", width: 10, height: 10, borderRadius: "50%", border: `1.5px solid ${P.gold}`, background: P.ivory, zIndex: 2, boxShadow: `0 0 0 3px ${P.goldFa}60` }} />
                <div style={{ width: isMobile ? "100%" : "45%", textAlign: "left", padding: isMobile ? 0 : (i%2===0?"0 28px 0 0":"0 0 0 28px") }}>
                  <p style={{ fontFamily: "'Lora', serif", fontSize: 10, letterSpacing: 3, color: P.gold, marginBottom: 6, textTransform: "uppercase", fontWeight: 600 }}>{item.date}</p>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(16px,4vw,19px)", fontWeight: 500, fontStyle: "italic", color: P.burgDk, margin: "0 0 8px 0" }}>{item.title}</h3>
                  <p style={{ fontFamily: "'Lora', serif", fontSize: "clamp(13px,3vw,13.5px)", color: P.inkS, lineHeight: 1.8 }}>{item.text}</p>
                  {i === 5 && (<>
                    <div style={{ marginTop: 18, borderRadius: 5, overflow: "hidden", border: `1px solid ${P.goldFa}` }}>
                      <img src={PHOTOS.proposal} alt="The Proposal" style={{ display: "block", width: "100%", height: "auto" }} />
                    </div>
                    {isMobile && <div style={{ marginTop: 12, borderRadius: 5, overflow: "hidden", border: `1px solid ${P.goldFa}` }}>
                      <img src={PHOTOS.ring} alt="The Ring" style={{ display: "block", width: "100%", height: "auto" }} />
                    </div>}
                  </>)}
                </div>
                {!isMobile && <div style={{ width: "10%" }} />}
                {!isMobile && <div style={{ width: "45%" }}>
                  {i === 5 && (
                    <div style={{ marginTop: 8, borderRadius: 5, overflow: "hidden", border: `1px solid ${P.goldFa}` }}>
                      <img src={PHOTOS.ring} alt="The Ring" style={{ display: "block", width: "100%", height: "auto" }} />
                    </div>
                  )}
                </div>}
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20, textAlign: "center", maxWidth: 480, padding: "32px 28px", background: `${P.bg}80`, borderRadius: 5, border: `1px solid ${P.goldFa}`, boxShadow: `0 4px 20px rgba(201,169,110,0.08)` }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(15px,3.5vw,17px)", color: P.inkS, lineHeight: 1.85 }}>"And over all these virtues put on love, which binds them all together in perfect unity."</p>
            <p style={{ fontFamily: "'Lora', serif", fontSize: 10, letterSpacing: 4, color: P.gold, marginTop: 14, fontWeight: 600 }}>COLOSSIANS 3:14</p>
          </div>
        </Sec>

        <Divider />

        {/* DETAILS */}
        <Sec id="details">
          <Head pre="The Celebration" title="Wedding Details" />
          <div style={{ display: "flex", gap: "clamp(16px,3vw,28px)", flexWrap: "wrap", justifyContent: "center", maxWidth: 920 }}>
            {[
              { icon: "courthouse", title: "The Ceremony", lines: ["Sarasota County Courthouse","2000 Main Street, Sarasota, FL","Friday, July 31, 2026","Contact us for time details"], map: "https://maps.google.com/?q=2000+Main+Street+Sarasota+FL+34237" },
              { icon: "flame", title: "The Celebration", lines: ["Terra Gaucha Brazilian Steakhouse","Tampa, Florida","Five O'Clock in the Evening","Dinner, Toasts & Dancing"], map: "https://maps.google.com/?q=Terra+Gaucha+Brazilian+Steakhouse+Tampa+FL" },
              { icon: "diamond", title: "Dress Code", lines: ["Formal Attire","Color Scheme: Burgundy & Olive","Anything but white or beige","Dress to impress"] },
              { icon: "heart", title: "Adults Only", lines: ["This is an adults-only celebration","We appreciate your understanding","Thank you for respecting our wishes"] },
            ].map((card, i) => (
              <StaggerCard key={card.title} index={i} style={{
                textAlign: "center", padding: "clamp(24px,4vw,40px) clamp(16px,3vw,28px)",
                background: P.ivory,
                border: `1px solid ${P.goldFa}`,
                borderRadius: 5,
                width: "clamp(220px,30vw,270px)",
                boxShadow: `0 4px 24px rgba(201,169,110,0.08), 0 1px 8px rgba(114,47,55,0.05)`,
                transition: "box-shadow 0.3s ease, transform 0.3s ease",
              }}>
                <div style={{ marginBottom: 20 }}><Icon type={card.icon} size={32} color={P.gold} /></div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(17px,3.5vw,20px)", fontWeight: 500, fontStyle: "italic", color: P.burgDk, margin: "0 0 18px 0" }}>{card.title}</h3>
                {/* Gold top border accent */}
                <div style={{ width: 40, height: 1, background: `linear-gradient(90deg, transparent, ${P.gold}, transparent)`, margin: "0 auto 18px" }} />
                {card.lines.map((l, j) => (
                  <p key={j} style={{ fontFamily: "'Lora', serif", fontSize: "clamp(12px,2.5vw,13.5px)", color: j===0?P.ink:P.inkS, lineHeight: 1.75, fontWeight: j===0?600:400 }}>{l}</p>
                ))}
                {card.map && (
                  <a href={card.map} target="_blank" rel="noopener noreferrer" style={{ textDecoration:"none", display:"inline-block", marginTop:20 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:6, padding:"10px 18px", border:`1px solid ${P.goldFa}`, borderRadius:3, background:"transparent", transition:"all 0.2s ease" }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={P.gold} strokeWidth="2" strokeLinecap="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>
                      <span style={{ fontFamily:"'Lora', serif", fontSize:10, letterSpacing:3, textTransform:"uppercase", color:P.gold, fontWeight:600 }}>Get Directions</span>
                    </div>
                  </a>
                )}
              </StaggerCard>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 40, padding: "20px 32px", border: `1px solid ${P.goldFa}`, borderRadius: 4, maxWidth: 480, margin: "40px auto 0" }}>
            <p style={{ fontFamily: "'Lora', serif", fontSize: "clamp(10px,2vw,11px)", letterSpacing: 4, textTransform: "uppercase", color: P.gold, fontWeight: 600, margin: "0 0 10px 0" }}>Please Note</p>
            <p style={{ fontFamily: "'Lora', serif", fontSize: "clamp(12px,2.5vw,13.5px)", color: P.inkS, lineHeight: 1.85, margin: 0 }}>We kindly request an adults-only celebration. We appreciate your understanding and look forward to sharing this evening with you.</p>
          </div>
          <CalendarButton />
        </Sec>

        <Divider />

        {/* WEDDING PARTY */}
        <Sec id="party" bg={P.ivory}>
          <Head pre="Our Favorite People" title="The Wedding Party" />
          {[
            { side: "Groom's Side", members: [{ name:"Daniel Boyer", role:"Best Man" }, { name:"Emanuel Luciano", role:"Groomsman" }, { name:"Jaden Fish", role:"Groomsman" }] },
            { side: "Bride's Side", members: [{ name:"Yanelys Colon", role:"Maid of Honor" }, { name:"Gia Santiago", role:"Bridesmaid" }, { name:"Melanie Acevedo", role:"Bridesmaid" }] },
          ].map(group => (
            <div key={group.side} style={{ textAlign: "center", marginBottom: 44 }}>
              <p style={{ fontFamily: "'Lora', serif", fontSize: 11, letterSpacing: 5, textTransform: "uppercase", color: P.gold, marginBottom: 26, fontWeight: 600 }}>{group.side}</p>
              <div style={{ display: "flex", gap: "clamp(16px,4vw,24px)", justifyContent: "center", flexWrap: "wrap" }}>
                {group.members.map((m, i) => (
                  <StaggerCard key={i} index={i} style={{ textAlign: "center", width: "clamp(110px,28vw,140px)" }}>
                    <div style={{ width: 76, height: 76, borderRadius: "50%", background: `linear-gradient(135deg, ${P.parch}, ${P.goldFa}40)`, margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", border: `1px solid ${P.goldFa}`, boxShadow: `0 4px 16px rgba(201,169,110,0.12)` }}>
                      <Icon type="person" size={28} color={P.gold} />
                    </div>
                    <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(13px,3vw,15px)", fontStyle: "italic", color: P.ink, fontWeight: 500 }}>{m.name}</p>
                    <p style={{ fontFamily: "'Lora', serif", fontSize: 9, letterSpacing: 3, textTransform: "uppercase", color: P.gold, marginTop: 4, fontWeight: 600 }}>{m.role}</p>
                  </StaggerCard>
                ))}
              </div>
            </div>
          ))}
        </Sec>

        <Divider />

        {/* REGISTRY */}
        <Sec id="registry">
          <Head pre="Your Generosity" title="Gift Registry" />
          <p style={{ textAlign: "center", maxWidth: 480, fontFamily: "'Lora', serif", fontSize: "clamp(13px,3vw,15px)", color: P.inkS, lineHeight: 1.85, marginBottom: 40 }}>
            Your presence at our wedding is the greatest gift of all. If you wish to honor us, we've curated a few registries for your convenience.
          </p>
          <div style={{ display: "flex", gap: "clamp(12px,3vw,20px)", flexWrap: "wrap", justifyContent: "center" }}>
            {[
              ["Amazon","gift","https://www.amazon.com/wedding/share/danielandedelys"],
              ["Honeymoon Fund","heart","https://www.paypal.com/ncp/payment/TCSPVJF8NFAFA"],
            ].map(([name, icon, url]) => (
              <a key={name} href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                <div style={{
                  padding: "clamp(22px,4vw,32px) clamp(18px,3vw,28px)",
                  background: P.ivory,
                  border: `1px solid ${P.goldFa}`,
                  borderRadius: 5,
                  textAlign: "center",
                  cursor: "pointer",
                  minWidth: "clamp(140px,35vw,165px)",
                  boxShadow: `0 4px 20px rgba(201,169,110,0.08), 0 1px 6px rgba(114,47,55,0.04)`,
                  transition: "box-shadow 0.25s ease, transform 0.25s ease",
                }}>
                  <div style={{ marginBottom: 14 }}><Icon type={icon} size={28} color={P.gold} /></div>
                  <h4 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(13px,3vw,15px)", fontWeight: 500, color: P.ink, margin: 0 }}>{name}</h4>
                  <p style={{ fontFamily: "'Lora', serif", fontSize: 9, letterSpacing: 3, color: P.gold, marginTop: 10, textTransform: "uppercase", fontWeight: 600 }}>View Registry →</p>
                </div>
              </a>
            ))}
          </div>
        </Sec>

        <Divider />

        {/* RSVP */}
        <Sec id="rsvp" bg={P.ivory}>
          <Head pre="We Hope You Can Make It" title="Kindly Respond" />
          <div style={{ margin: "0 auto 40px", maxWidth: "clamp(280px, 80vw, 520px)", borderRadius: 6, overflow: "hidden", border: `1px solid ${P.goldFa}`, boxShadow: `0 12px 40px rgba(114,47,55,0.1), 0 4px 16px rgba(201,169,110,0.1)` }}>
            <img src={PHOTOS.sunset} alt="Daniel and Edelys at sunset" style={{ display: "block", width: "100%", height: "auto" }} />
          </div>
          <p style={{ textAlign: "center", maxWidth: 440, fontFamily: "'Lora', serif", fontSize: "clamp(13px,3vw,15px)", color: P.inkS, lineHeight: 1.85, marginBottom: 36 }}>
            Please let us know by June 30, 2026 so we can plan the perfect celebration.
          </p>
          <RSVPForm />
        </Sec>

        {/* FOOTER */}
        <footer style={{ textAlign: "center", padding: "clamp(40px,8vw,64px) clamp(16px,5vw,40px)", background: P.bg, borderTop: `1px solid ${P.goldFa}50` }}>
          <Icon type="rings" size={34} color={P.gold} />
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px,5vw,30px)", fontWeight: 500, fontStyle: "italic", color: P.burgDk, margin: "18px 0 8px 0" }}>Daniel &amp; Edelys</h2>
          <p style={{ fontFamily: "'Lora', serif", fontSize: 11, letterSpacing: 5, color: P.gold, textTransform: "uppercase", fontWeight: 600 }}>July 31, 2026 · Sarasota &amp; Tampa, FL</p>
          <GoldOrnament w={160} />
          <div style={{ marginTop: 8 }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: "clamp(13px,3vw,15px)", color: P.inkS, lineHeight: 1.75 }}>"For where two or three gather in my name, there am I with them."</p>
            <p style={{ fontFamily: "'Lora', serif", fontSize: 9, letterSpacing: 3, color: P.gold, marginTop: 10, fontWeight: 600 }}>MATTHEW 18:20</p>
          </div>
        </footer>
      </>)}
    </div>
  );
}
