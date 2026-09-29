import { useState, useEffect, useRef, useCallback } from "react";


/* ─────────────────────────────────────────────
   GOOGLE FONTS – loaded via @import in style tag
   Playfair Display · Dancing Script · Lato
───────────────────────────────────────────── */
const FONT_LINK = `https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=Dancing+Script:wght@600;700&family=Lato:wght@300;400;700&display=swap`;

/* ─── DATA ─────────────────────────────────── */
const QUOTES = [
  {
    icon: "🌸",
    text: "You are not just my best friend — you are the chapter in my life I will re-read a hundred times and love more every time.",
    tag: "My favourite story",
  },
  {
    icon: "💫",
    text: "Having you in my life is proof that the universe sometimes gets it exactly right. You are my perfectly placed miracle.",
    tag: "Truly grateful",
  },
  {
    icon: "🌹",
    text: "You have a heart so enormous it could hold the entire world. And somehow, you always save the warmest corner for me.",
    tag: "Forever yours",
  },
  {
    icon: "✨",
    text: "Every laugh, every secret, every silly 3 AM  sorry 10 PM(u sleep early) conversation — they are the most precious things I will ever own.",
    tag: "Our memories",
  },
  {
    icon: "🦋",
    text: "You make impossible things feel easy and hard days feel lighter. You are strength wearing the most beautiful disguise.",
    tag: "My hero",
  },
  {
    icon: "🌙",
    text: "On this birthday I want the whole world to know: you are extraordinary, and I am the luckiest person alive to call you mine.",
    tag: "Happy Birthday my Dearest",
  },
];

const WISHES = [
  {
    icon: "🌟",
    title: "Endless Joy",
    text: "May every single day bring you the kind of happiness you so generously pour over everyone around you.",
    bg: "#fff9c4",
    accent: "#f57f17",
  },
  {
    icon: "💖",
    title: "Overflowing Love",
    text: "May your heart always be full, your life always be radiant, and may love find you in the most unexpected, beautiful ways.",
    bg: "#fce4ec",
    accent: "#c2185b",
  },
  {
    icon: "🌺",
    title: "Wild Adventures",
    text: "May this year carry you to places, people, and moments that leave you breathless with gratitude.",
    bg: "#e8f5e9",
    accent: "#2e7d32",
  },
  {
    icon: "🦋",
    title: "Growth & Grace",
    text: "May you bloom into every beautiful version of yourself this year — fully, fearlessly, and on your own terms.",
    bg: "#ede7f6",
    accent: "#512da8",
  },
  {
    icon: "🎯",
    title: "Dreams Made Real",
    text: "May every dream you have ever whispered to yourself in quiet moments become your loudest, most glorious reality.",
    bg: "#fff3e0",
    accent: "#e65100",
  },
  {
    icon: "🌈",
    title: "Pure Magic",
    text: "May this birthday mark the first page of the most magical, dazzling chapter your story has ever dared to write.",
    bg: "#e0f7fa",
    accent: "#006064",
  },
];

const PHOTO_SLOTS = [
  { label: "Your Beautiful Smile ☀️", defaultImg: "/her1.jpeg" },
  { label: "Forever you 💞", defaultImg: "/her2.jpeg" },
  { label: "Our Favourite Memory 🎉", defaultImg: "/together1.jpeg" },
  { label: "Your Magical Glow ✨", defaultImg: "/her3.jpeg" },
  { label: "Your Little World 🌸", defaultImg: "/her4.jpeg" },
  { label: "Us, Always 🦋", defaultImg: "/together2.jpg" },
  { label: "That Gorgeous Smile 💕", defaultImg: "/her5.jpeg" },
  { label: "Simply Beautiful 🌷", defaultImg: "/her6.jpeg" },
  { label: "A Moment With You 💗", defaultImg: "/together3.jpeg" },
  { label: "Your Pretty Eyes 👀✨", defaultImg: "/her7.jpeg" },
  { label: "My Favourite View 🌹", defaultImg: "/her8.jpeg" },
  { label: "Memories With You 🥰", defaultImg: "/together4.jpeg" },
  { label: "Absolutely Adorable 🧸", defaultImg: "/her9.jpeg" },
  { label: "The Cutest One 💖", defaultImg: "/her10.jpeg" },
  { label: "Together Feels Like Home 🏡💕", defaultImg: "/together5.jpeg" },
  { label: "Your Charming Side ✨", defaultImg: "/her11.jpeg" },
  { label: "My Beautiful Girl 🌺", defaultImg: "/her12.jpeg" },
  { label: "A Face Worth Remembering 💫", defaultImg: "/her13.jpeg" },
  { label: "Forever Beautiful ❤️", defaultImg: "/her14.jpeg" },
  { label: "That Special Moment 🌙", defaultImg: "/her15.jpeg" },
  { label: "Pretty As Always 🌸", defaultImg: "/her16.jpeg" },
  { label: "A Little Piece of Happiness 🌈", defaultImg: "/her17.jpeg" },
  { label: "You Make Everything Beautiful 💕", defaultImg: "/her18.jpeg" },
  { label: "One of My Favourite Memories 🥹❤️", defaultImg: "/her19.jpeg" },
];

/* ─── CONFETTI SHOWERS (independent, stackable bursts) ───── */
function useConfettiShowers() {
  const [showers, setShowers] = useState([]);

  const launch = useCallback(() => {
    const id = Date.now() + Math.random(); // unique per click
    setShowers((prev) => [...prev, { id }]);

    // remove *only this* shower after its animation finishes,
    // leaving any other still-running showers untouched
    setTimeout(() => {
      setShowers((prev) => prev.filter((s) => s.id !== id));
    }, 3000);
  }, []);

  return { showers, launch };
}

function ConfettiShower({ id }) {
  const pieces = Array.from({ length: 25 });
  return (
    <div className="confetti-shower" key={id}>
      {pieces.map((_, i) => {
        const left = Math.random() * 100;
        const delay = Math.random() * 0.4;
        const duration = 2.2 + Math.random() * 1.2;
        const emoji = ["💖", "💕", "💗", "💞", "💝", "✨"][i % 6];
        return (
          <span
            key={i}
            className="confetti-piece"
            style={{
              left: `${left}%`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
            }}
          >
            {emoji}
          </span>
        );
      })}
    </div>
  );
}

function PhotoSlideshow({ slots }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slots.length);
    }, 2500); // change slide every 3s
    return () => clearInterval(timer);
  }, [slots.length]);

  return (
    <div className="slideshow-wrap">
      <div className="slideshow-frame">
        {slots.map((s, i) => (
          <div
            key={i}
            className={`slide ${i === current ? "slide-active" : ""}`}
          >
            <img src={s.defaultImg} alt={s.label} />
            <div className="slide-caption">
              <span className="slide-label">{s.label}</span>
              <span className="slide-hint">{s.hint}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Dots navigation */}
      <div className="slide-dots">
        {slots.map((_, i) => (
          <button
            key={i}
            className={`dot ${i === current ? "dot-active" : ""}`}
            onClick={() => setCurrent(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

const TIMELINE = [
  { year: "Day One", icon: "🌱", text: "The day we met & I never knew that we will be Best Firends." },
  { year: "The Laughs", icon: "😂", text: "The jokes, the teasing, and all the little moments that gave me way too many reasons to flirt with you. 😉" },
  { year: "The Tears", icon: "🤝", text: "Every hard moment we faced side by side, I love how You Support me." },
  { year: "Right Now", icon: "💖", text: "Grateful every day I choose to talk to You I feel Very Lucky That I have someone like You in my Life." },
  { year: "Forever", icon: "♾️", text: "I wish we wil be togater forever & ever. Thanks for beging with a dumb guy like me!" },
];

/* ─── GLOBAL STYLES ─────────────────────────── */
const GlobalStyle = () => (
  <style>{`
    @import url('${FONT_LINK}');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: #fff0f3; font-family: 'Lato', sans-serif; overflow-x: hidden; cursor: default; }

    :root {
      --rose: #e8748a;
      --deep: #c2185b;
      --dark: #880e4f;
      --blush: #fce4ec;
      --petal: #f8bbd9;
      --cream: #fffef9;
      --gold: #f9a825;
    }

    @keyframes float { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-20px) rotate(5deg)} }
    @keyframes fadeUp { from{opacity:0;transform:translateY(50px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeLeft { from{opacity:0;transform:translateX(-50px)} to{opacity:1;transform:translateX(0)} }
    @keyframes fadeRight { from{opacity:0;transform:translateX(50px)} to{opacity:1;transform:translateX(0)} }
    @keyframes heartPop { 0%,100%{transform:scale(1)} 50%{transform:scale(1.25)} }
    @keyframes shimmer { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
    @keyframes petalFall {
      0%   { transform: translateY(-40px) rotate(0deg) translateX(0); opacity: 1; }
      100% { transform: translateY(110vh) rotate(800deg) translateX(60px); opacity: 0; }
    }
    @keyframes typing { from{border-right-color:var(--rose)} to{border-right-color:transparent} }
    @keyframes glowPulse { 0%,100%{box-shadow:0 0 20px rgba(232,116,138,0.3)} 50%{box-shadow:0 0 50px rgba(232,116,138,0.7)} }
    @keyframes ribbonSlide { from{transform:scaleX(0)} to{transform:scaleX(1)} }
    @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }

    .animate-fadeUp   { animation: fadeUp  0.8s ease both; }
    .animate-fadeLeft { animation: fadeLeft 0.8s ease both; }
    .animate-fadeRight{ animation: fadeRight 0.8s ease both; }
    .animate-float    { animation: float 4s ease-in-out infinite; }
    .animate-heartPop { animation: heartPop 1.4s ease-in-out infinite; }
    .animate-bounce   { animation: bounce 2s ease-in-out infinite; }

    /* NAV */
    .nav {
      position: fixed; top: 0; left: 0; right: 0; z-index: 999;
      display: flex; align-items: center; justify-content: space-between;
      padding: 1rem 2.5rem;
      background: rgba(255,240,243,0.88);
      backdrop-filter: blur(18px);
      border-bottom: 1px solid rgba(248,187,217,0.5);
      transition: all 0.3s;
    }
    .nav.scrolled { padding: 0.6rem 2.5rem; box-shadow: 0 4px 30px rgba(194,24,91,0.1); }
    .nav-brand { font-family: 'Dancing Script', cursive; font-size: 1.5rem; color: var(--deep); }
    .nav-links { display: flex; gap: 2rem; }
    .nav-link {
      font-size: 0.72rem; letter-spacing: 2.5px; text-transform: uppercase;
      color: var(--dark); cursor: pointer; text-decoration: none;
      position: relative; transition: color 0.2s;
    }
    .nav-link::after {
      content: ''; position: absolute; bottom: -4px; left: 0; right: 0;
      height: 1.5px; background: var(--rose); transform: scaleX(0);
      transition: transform 0.25s; transform-origin: left;
    }
    .nav-link:hover { color: var(--deep); }
    .nav-link:hover::after { transform: scaleX(1); }

    /* HERO */
    .hero {
      min-height: 100vh; display: flex; flex-direction: column;
      align-items: center; justify-content: center; text-align: center;
      padding: 7rem 2rem 4rem;
      background: linear-gradient(135deg, #ffe0e9 0%, #fff0f3 35%, #fce4ec 65%, #f8bbd9 100%);
      background-size: 300% 300%;
      animation: shimmer 10s ease infinite;
      position: relative; overflow: hidden;
    }
    .hero-badge {
      display: inline-block; background: linear-gradient(135deg, var(--rose), var(--deep));
      color: #fff; font-size: 0.7rem; letter-spacing: 3.5px; text-transform: uppercase;
      padding: 8px 28px; border-radius: 50px; margin-bottom: 1.5rem;
    }
    .hero-title {
      font-family: 'Dancing Script', cursive;
      font-size: clamp(3.5rem, 10vw, 7.5rem);
      color: var(--dark); line-height: 1;
    }
    .hero-name-wrap {
      font-family: 'Playfair Display', serif; font-style: italic;
      font-size: clamp(2rem, 6vw, 4rem); color: var(--deep);
      margin: 0.3rem 0 1.2rem;
    }
    .hero-name-edit {
      cursor: text; border-bottom: 2.5px dashed var(--petal);
      transition: border-color 0.2s; padding-bottom: 2px;
    }
    .hero-name-edit:hover { border-color: var(--rose); }
    .hero-name-input {
      font-family: 'Playfair Display', serif; font-style: italic;
      font-size: inherit; color: var(--deep); border: none;
      border-bottom: 2.5px solid var(--rose); background: transparent;
      outline: none; text-align: center; width: 280px;
    }
    .hero-hearts { font-size: 3rem; line-height: 1; }
    .hero-sub {
      font-family: 'Playfair Display', serif; font-style: italic;
      color: var(--dark); opacity: 0.75; font-size: 1.05rem; margin-top: 1rem;
    }
    .hero-scroll {
      margin-top: 2.5rem; cursor: pointer; font-size: 0.72rem;
      letter-spacing: 3px; text-transform: uppercase; color: var(--deep);
    }

    /* SECTION BASE */
    .section { max-width: 1120px; margin: 0 auto; padding: 5rem 2rem; }
    .sec-title {
      font-family: 'Dancing Script', cursive;
      font-size: clamp(2.2rem, 5vw, 3.8rem); color: var(--deep);
      text-align: center; margin-bottom: 0.4rem;
    }
    .sec-sub {
      font-family: 'Playfair Display', serif; font-style: italic;
      color: var(--dark); opacity: 0.75; text-align: center;
      font-size: 1rem; margin-bottom: 3rem;
    }

    /* PHOTO SLIDESHOW */
    .slideshow-wrap {
      display: flex; flex-direction: column; align-items: center; gap: 1.25rem;
    }
    .slideshow-frame {
      position: relative;
      width: min(90vw, 480px);
      aspect-ratio: 4 / 5;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(194,24,91,0.18);
      background: #fff;
    }
    .slide {
      position: absolute; inset: 0; opacity: 0; transform: scale(1.02);
      transition: opacity 1.2s ease, transform 1.2s ease; pointer-events: none;
    }
    .slide-active { opacity: 1; transform: scale(1); pointer-events: auto; }
    .slide img { width: 100%; height: 100%; object-fit: cover; display: block; }
    .slide-caption {
      position: absolute; bottom: 0; left: 0; right: 0;
      padding: 1rem 1.25rem;
      background: linear-gradient(to top, rgba(0,0,0,0.55), transparent);
      color: #fff; display: flex; flex-direction: column; gap: 0.15rem;
    }
    .slide-label { font-size: 1.05rem; font-weight: 600; }
    .slide-hint { font-size: 0.85rem; opacity: 0.85; }
    .slide-dots { display: flex; gap: 0.5rem; }
    .dot {
      width: 8px; height: 8px; border-radius: 50%; border: none;
      background: rgba(194,24,91,0.2); cursor: pointer;
      transition: background 0.3s ease, transform 0.3s ease;
    }
    .dot-active { background: var(--deep); transform: scale(1.3); }

    /* QUOTES */
    .quotes-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.6rem; }
    .quote-card {
      background: #fff; border-radius: 22px; padding: 2rem 1.8rem;
      box-shadow: 0 6px 30px rgba(194,24,91,0.09);
      position: relative; overflow: hidden;
      transition: transform 0.3s, box-shadow 0.3s;
      border-left: 4px solid var(--rose);
    }
    .quote-card:hover { transform: translateY(-7px); box-shadow: 0 18px 50px rgba(194,24,91,0.18); }
    .quote-card::before {
      content: '"'; position: absolute; top: -15px; right: 12px;
      font-family: 'Playfair Display', serif; font-size: 9rem;
      color: var(--blush); line-height: 1; z-index: 0; pointer-events: none;
    }
    .quote-icon { font-size: 1.6rem; margin-bottom: 0.8rem; position: relative; z-index: 1; }
    .quote-text {
      font-family: 'Playfair Display', serif; font-style: italic;
      color: #3a001a; line-height: 1.75; font-size: 1.02rem;
      position: relative; z-index: 1; margin-bottom: 1rem;
    }
    .quote-tag { font-family: 'Dancing Script', cursive; color: var(--rose); font-size: 1.15rem; }

    /* TIMELINE */
    .timeline { position: relative; max-width: 700px; margin: 0 auto; }
    .timeline::before {
      content: ''; position: absolute; left: 50%; top: 0; bottom: 0;
      width: 2px; background: linear-gradient(to bottom, var(--petal), var(--rose), var(--deep));
      transform: translateX(-50%);
    }
    .tl-item { display: flex; align-items: flex-start; margin-bottom: 3rem; position: relative; }
    .tl-item:nth-child(odd) { flex-direction: row; }
    .tl-item:nth-child(even) { flex-direction: row-reverse; }
    .tl-dot {
      position: absolute; left: 50%; transform: translateX(-50%);
      width: 48px; height: 48px; border-radius: 50%;
      background: linear-gradient(135deg, var(--rose), var(--deep));
      display: flex; align-items: center; justify-content: center;
      font-size: 1.3rem; box-shadow: 0 4px 20px rgba(194,24,91,0.35);
      z-index: 2; flex-shrink: 0;
    }
    .tl-content {
      width: calc(50% - 50px); background: #fff; border-radius: 18px;
      padding: 1.2rem 1.5rem; box-shadow: 0 4px 20px rgba(194,24,91,0.1);
      transition: transform 0.3s;
    }
    .tl-item:nth-child(odd) .tl-content { margin-right: auto; text-align: right; }
    .tl-item:nth-child(even) .tl-content { margin-left: auto; text-align: left; }
    .tl-content:hover { transform: scale(1.03); }
    .tl-year { font-family: 'Dancing Script', cursive; font-size: 1.3rem; color: var(--deep); }
    .tl-text { font-family: 'Playfair Display', serif; font-style: italic; color: #4a001e; font-size: 0.95rem; line-height: 1.6; margin-top: 0.3rem; }

    /* LETTER WRAPPER — always centered, full width to center against */
    .letter-wrap {
      display: flex; justify-content: center;
      max-width: 780px; width: 100%; margin: 0 auto;
    }

    /* ENVELOPE (closed state) */
    .envelope {
      position: relative;
      width: min(88vw, 420px);
      aspect-ratio: 3 / 2;
      margin: 0 auto;
      cursor: pointer;
      overflow: hidden;
      border-radius: 14px;
      box-shadow: 0 15px 40px rgba(194,24,91,0.22);
    }
    .envelope-back {
      position: absolute; inset: 0;
      background: linear-gradient(135deg, var(--petal), #e0aebd);
      z-index: 0;
    }
    .envelope-peek {
      position: absolute; top: -6px; left: 8%; width: 84%; height: 26px;
      background: var(--cream); border-radius: 4px; z-index: 1;
    }
    .envelope-pocket-left, .envelope-pocket-right {
      position: absolute; top: 0; width: 50%; height: 100%;
      background: linear-gradient(135deg, #eab8c6, #d896a8);
      z-index: 2; transition: opacity 0.5s ease;
    }
    .envelope-pocket-left { left: 0; clip-path: polygon(0 0, 100% 100%, 0 100%); }
    .envelope-pocket-right { right: 0; clip-path: polygon(100% 0, 100% 100%, 0 100%); }
    .envelope-flap {
      position: absolute; top: 0; left: 0; width: 100%; height: 100%;
      background: linear-gradient(160deg, #f8e2e7, var(--petal));
      clip-path: polygon(0 0, 100% 0, 50% 62%);
      transform-origin: top center;
      transition: transform 0.75s cubic-bezier(0.65, 0, 0.35, 1);
      z-index: 3; backface-visibility: hidden;
    }
    .envelope-open .envelope-flap { transform: rotateX(180deg); }
    .envelope-open .envelope-pocket-left,
    .envelope-open .envelope-pocket-right { opacity: 0; }
    .wax-seal {
      position: absolute; top: 38%; left: 50%; transform: translate(-50%, -50%);
      font-size: 1.9rem; z-index: 4;
      filter: drop-shadow(0 3px 4px rgba(0,0,0,0.25));
      transition: opacity 0.35s ease, transform 0.35s ease;
    }
    .envelope-open .wax-seal { opacity: 0; transform: translate(-50%, -50%) scale(0.3); }
    .envelope-cta {
      position: absolute; bottom: 14px; left: 50%; transform: translateX(-50%);
      font-family: 'Lato', sans-serif; font-size: 0.8rem; letter-spacing: 1px;
      color: #fff; z-index: 5; animation: envelopePulse 1.8s ease-in-out infinite;
    }
    @keyframes envelopePulse { 0%,100%{opacity:0.7} 50%{opacity:1} }

    /* LETTER (revealed state) */
    .letter-paper {
      width: 100%;
      background: var(--cream); border-radius: 22px; padding: 3.5rem;
      box-shadow: 0 12px 60px rgba(194,24,91,0.15);
      border: 1px solid var(--petal); position: relative; overflow: hidden;
      box-sizing: border-box;
    }
    .letter-reveal { animation: letterFadeUp 0.6s ease both; }
    @keyframes letterFadeUp {
      from { opacity: 0; transform: translateY(24px) scale(0.98); }
      to   { opacity: 1; transform: translateY(0) scale(1); }
    }
    .letter-paper::before {
      content: ''; position: absolute; left: 4rem; top: 0; bottom: 0;
      width: 1.5px; background: #fce4ec;
    }
    .letter-lines {
      position: absolute; inset: 0; pointer-events: none;
      background-image: repeating-linear-gradient(
        transparent, transparent 39px, #fce4ec 40px
      );
      opacity: 0.5;
    }
    .letter-heading {
      font-family: 'Dancing Script', cursive; font-size: 2.4rem;
      color: var(--deep); margin-bottom: 1.5rem; text-align: center;
      position: relative; z-index: 1;
    }
    .letter-body {
      font-family: 'Playfair Display', serif; font-style: italic;
      color: #3a001a; line-height: 2.2; font-size: 1.05rem;
      padding-left: 1.5rem; position: relative; z-index: 1;
    }
    .letter-body p { margin-bottom: 1.3rem; }
    .letter-sign {
      display: flex; align-items: center; justify-content: flex-end;
      gap: 10px; margin-top: 2rem; position: relative; z-index: 1;
    }
    .letter-sign-name {
      font-family: 'Dancing Script', cursive; font-size: 2rem;
      color: var(--rose); cursor: text;
      border-bottom: 2px dashed var(--petal); padding-bottom: 2px;
      transition: border-color 0.2s;
    }
    .letter-sign-name:hover { border-color: var(--rose); }
    .letter-sign-input {
      font-family: 'Dancing Script', cursive; font-size: 2rem;
      color: var(--rose); border: none; border-bottom: 2.5px solid var(--rose);
      background: transparent; outline: none; width: 240px;
    }
    .letter-tap-note {
      font-family: 'Lato', sans-serif; font-size: 0.68rem;
      color: var(--petal); text-align: right; margin-top: 8px;
      letter-spacing: 1px; position: relative; z-index: 1;
    }

    /* WISHES */
    .wishes-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 1.3rem; }
    .wish-card {
      border-radius: 20px; padding: 1.8rem 1.5rem; text-align: center;
      transition: transform 0.3s cubic-bezier(.34,1.56,.64,1), box-shadow 0.3s;
      box-shadow: 0 4px 18px rgba(0,0,0,0.07);
    }
    .wish-card:hover { transform: translateY(-8px) scale(1.03); box-shadow: 0 14px 40px rgba(0,0,0,0.12); }
    .wish-icon { font-size: 2.4rem; margin-bottom: 0.7rem; }
    .wish-title { font-family: 'Dancing Script', cursive; font-size: 1.4rem; margin-bottom: 0.5rem; }
    .wish-text { font-family: 'Lato', sans-serif; font-size: 0.9rem; line-height: 1.65; opacity: 0.85; }

    /* CONFETTI SHOWERS (independent, stackable bursts) */
    .confetti-shower { position: fixed; inset: 0; pointer-events: none; z-index: 9999; overflow: hidden; }
    .confetti-piece {
      position: absolute; top: -40px; font-size: 1.4rem;
      animation-name: confettiPieceFall;
      animation-timing-function: ease-in;
      animation-fill-mode: forwards;
    }
    @keyframes confettiPieceFall {
      0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
      100% { transform: translateY(110vh) rotate(360deg); opacity: 0.4; }
    }

    /* FOOTER HERO */
    .footer-cta {
      background: linear-gradient(135deg, var(--dark), var(--deep), var(--rose));
      background-size: 200% 200%;
      animation: shimmer 6s ease infinite;
      padding: 6rem 2rem; text-align: center;
      position: relative; overflow: hidden;
    }
    .footer-cta::before {
      content: '';
      position: absolute; inset: 0;
      background: url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.04'%3E%3Cpath d='M40 30c-5.5 0-10 4.5-10 10s4.5 10 10 10 10-4.5 10-10-4.5-10-10-10z'/%3E%3C/g%3E%3C/svg%3E");
    }
    .footer-title {
      font-family: 'Dancing Script', cursive;
      font-size: clamp(2.8rem, 8vw, 6rem); color: #fff;
      text-shadow: 0 4px 30px rgba(0,0,0,0.2); position: relative; z-index: 1;
    }
    .footer-sub {
      font-family: 'Playfair Display', serif; font-style: italic;
      color: rgba(255,255,255,0.88); font-size: 1.15rem;
      max-width: 560px; margin: 1rem auto 2rem; line-height: 1.75;
      position: relative; z-index: 1;
    }
    .footer-hearts { font-size: 2.2rem; letter-spacing: 10px; position: relative; z-index: 1; }
    .footer-note {
      font-size: 0.75rem; color: rgba(255,255,255,0.5);
      letter-spacing: 2.5px; text-transform: uppercase;
      margin-top: 2.5rem; position: relative; z-index: 1;
    }

    /* CONFETTI BTN */
    .confetti-btn {
      display: inline-flex; align-items: center; gap: 8px;
      background: rgba(255,255,255,0.15); border: 1.5px solid rgba(255,255,255,0.4);
      color: #fff; padding: 12px 30px; border-radius: 50px;
      font-family: 'Lato', sans-serif; font-size: 0.85rem;
      letter-spacing: 2px; text-transform: uppercase;
      cursor: pointer; transition: background 0.25s, transform 0.2s;
      position: relative; z-index: 1; margin-top: 1.5rem;
    }
    .confetti-btn:hover { background: rgba(255,255,255,0.25); transform: scale(1.04); }

    /* DIVIDER */
    .divider {
      text-align: center; padding: 2.5rem 0; font-size: 1.4rem;
      letter-spacing: 10px; color: var(--petal);
    }

    /* SECTION BG */
    .bg-cream { background: #fff; }
    .bg-blush { background: linear-gradient(180deg, #fff0f3, #fff); }
    .bg-letter { background: linear-gradient(135deg, #fff0f3, #fce4ec); }

    /* INPUT HIDDEN */
    input[type="file"] { display: none; }

    /* TOOLTIP hint */
    .hint-text {
      font-family: 'Lato', sans-serif; font-size: 0.78rem;
      color: var(--dark); opacity: 0.65; letter-spacing: 0.5px;
    }

    /* RESPONSIVE */
    @media (max-width: 640px) {
      .nav-links { display: none; }
      .timeline::before { left: 22px; }
      .tl-item, .tl-item:nth-child(even) { flex-direction: column; }
      .tl-dot { left: 22px; top: 0; position: absolute; }
      .tl-content, .tl-item:nth-child(odd) .tl-content,
      .tl-item:nth-child(even) .tl-content {
        width: calc(100% - 70px); margin-left: 70px; text-align: left;
      }
      .letter-paper { padding: 2rem 1.5rem; }
      .letter-paper::before { left: 2rem; }
    }
  `}</style>
);

/* ─── FALLING PETALS ────────────────────────── */
function Petals() {
  const petals = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 16 + 8}px`,
    delay: `${Math.random() * 12}s`,
    duration: `${Math.random() * 10 + 8}s`,
    color: ["#f8bbd9", "#f48fb1", "#fce4ec", "#e91e63", "#f06292", "#ff80ab"][
      Math.floor(Math.random() * 6)
    ],
    shape: Math.random() > 0.5 ? "50% 0 50% 0" : "50%",
  }));

  return (
    <>
      {petals.map((p) => (
        <div
          key={p.id}
          style={{
            position: "fixed",
            top: "-30px",
            left: p.left,
            width: p.size,
            height: p.size,
            borderRadius: p.shape,
            background: p.color,
            opacity: 0.55,
            pointerEvents: "none",
            zIndex: 0,
            animation: `petalFall ${p.duration} ${p.delay} linear infinite`,
          }}
        />
      ))}
    </>
  );
}

/* ─── LETTER ENVELOPE ───────────────────────── */
function LetterEnvelope({ senderName, editSender, setEditSender, setSenderName }) {
  const [opened, setOpened] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleOpen = () => {
    if (opened) return;
    setOpened(true);
    setTimeout(() => setRevealed(true), 850); // matches CSS transition time
  };

  return (
    <div className="letter-wrap">
      {!revealed && (
        <div
          className={`envelope ${opened ? "envelope-open" : ""}`}
          onClick={handleOpen}
        >
          <div className="envelope-back" />
          <div className="envelope-peek" />
          <div className="envelope-pocket-left" />
          <div className="envelope-pocket-right" />
          <div className="envelope-flap" />
          <div className="wax-seal">💌</div>
          {!opened && <div className="envelope-cta">Tap to open</div>}
        </div>
      )}

      {revealed && (
        <div className="letter-paper letter-reveal">
          <div className="letter-lines" />
          <div className="letter-heading">To my irreplaceable one,</div>
          <div className="letter-body">
            <p>
              On this beautiful day that the universe decided to give us <em>you</em>, I want you
              to know something I carry with in heart every single day —
            </p>
            <p>
              You are not just my best friend. You are the person who showed me what it means to
              be truly, unabashedly yourself. You are the loudest laugh in every room, the warmest
              hug on every hard day, and the most honest voice when I need it the most.
            </p>
            <p>
              I have watched you carry so much with grace, with fire, with a kind of strength that
              leaves me in quiet awe. You do not even know how many times simply watching you go
              after your dreams has made me braver too.
            </p>
            <p>
              Thank you for every late-night conversation, every inside joke no one else would
              understand, and every time you showed up — without even being asked — because that
              is simply who you are.
            </p>
            <p>
              On this birthday, I hope you feel as celebrated, as deeply seen, and as loved as
              you make everyone around you feel every single day. You deserve the whole world. You
              deserve every beautiful thing.
            </p>
            <p>Here is to you — the most extraordinary person I have ever known.</p>
          </div>
          <div className="letter-sign">
            With all my love,&nbsp;
            With all my love,&nbsp;
            <span className="letter-sign-name">
              Shubh
            </span>
            &nbsp;💕
          </div>
          {/* <div className="letter-tap-note">tap the name to personalise</div> */}
        </div>
      )}
    </div>
  );
}

/* ─── PHOTO CARD (unused now that PhotoSlideshow replaced the grid, kept for reference) ─── */
function PhotoCard({ slot, index }) {
  const [img, setImg] = useState(slot.defaultImg || null);
  const [dragging, setDragging] = useState(false);
  const fileRef = useRef();

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    const reader = new FileReader();
    reader.onload = (e) => setImg(e.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <div
      className="photo-card animate-fadeUp"
      style={{ animationDelay: `${index * 0.12}s` }}
    >
      <div
        className={`photo-drop${dragging ? " dragging" : ""}`}
        onClick={() => !img && fileRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault(); setDragging(false);
          handleFile(e.dataTransfer.files[0]);
        }}
      >
        {img ? (
          <>
            <img src={img} alt={slot.label} />
            <button className="photo-remove" onClick={(e) => { e.stopPropagation(); setImg(null); }}>✕</button>
          </>
        ) : (
          <>
            <div style={{ fontSize: "2.8rem" }}>📷</div>
            <div className="hint-text">{slot.hint}</div>
            <button className="photo-upload-btn" onClick={(e) => { e.stopPropagation(); fileRef.current.click(); }}>
              + Add Photo
            </button>
          </>
        )}
        <input
          type="file" ref={fileRef} accept="image/*"
          onChange={(e) => handleFile(e.target.files[0])}
        />
      </div>
      <div className="photo-label">{slot.label}</div>
    </div>
  );
}

/* ─── TIMELINE ITEM ─────────────────────────── */
function TimelineItem({ item, index }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="tl-item"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "none" : index % 2 === 0 ? "translateX(-40px)" : "translateX(40px)",
        transition: `opacity 0.7s ${index * 0.1}s, transform 0.7s ${index * 0.1}s`,
      }}
    >
      <div className="tl-dot animate-float" style={{ animationDelay: `${index * 0.3}s` }}>
        {item.icon}
      </div>
      <div className="tl-content">
        <div className="tl-year">{item.year}</div>
        <div className="tl-text">{item.text}</div>
      </div>
    </div>
  );
}

/* ─── MAIN APP ──────────────────────────────── */
export default function BirthdayWebsite() {
  const [scrolled, setScrolled] = useState(false);
  const [bestieName] = useState("Soniya");
  const [senderName, setSenderName] = useState("Shubh");
  const [editSender, setEditSender] = useState(false);
  const { showers, launch } = useConfettiShowers();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <GlobalStyle />
      <Petals />

      {/* Confetti overlay — every click stacks its own independent shower */}
      {showers.map((s) => (
        <ConfettiShower key={s.id} id={s.id} />
      ))}

      {/* NAV */}
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <div className="nav-brand">🌸 Birthday Love</div>
        {/* <div className="nav-links">
          {["photos", "praise", "story", "letter", "wishes"].map((id) => (
            <span key={id} className="nav-link" onClick={() => scrollTo(id)}>
              {id.charAt(0).toUpperCase() + id.slice(1)}
            </span>
          ))}
        </div> */}
      </nav>

      {/* ── HERO ── */}
      <section className="hero">
        <div style={{ position: "relative", zIndex: 2 }}>
          <div className="hero-badge animate-fadeUp" style={{ animationDelay: "0.1s" }}>
            🎀 A Very Special Day 🎀
          </div>

          <div className="hero-title animate-fadeUp" style={{ animationDelay: "0.25s" }}>
            Happy Birthday,
          </div>

          <div className="hero-name-wrap animate-fadeUp" style={{ animationDelay: "0.4s" }}>
            <span className="hero-name-edit">Soniya</span>
          </div>

          <div className="hero-hearts animate-heartPop animate-fadeUp" style={{ animationDelay: "0.55s" }}>
            💖
          </div>

          <div className="hero-sub animate-fadeUp" style={{ animationDelay: "0.7s" }}>
            Today is entirely, beautifully yours.
          </div>

          <div
            className="hero-scroll animate-bounce animate-fadeUp"
            style={{ animationDelay: "1s" }}
            onClick={() => scrollTo("photos")}
          >
            ↓ &nbsp; Scroll to celebrate &nbsp; ↓
          </div>
        </div>
      </section>

      <div className="divider">✦ &nbsp; ✦ &nbsp; ✦</div>

      {/* ── PHOTOS ── */}
      <div id="photos" className="bg-cream">
        <div className="section">
          <div className="sec-title">Our Beautiful Story</div>
          <PhotoSlideshow slots={PHOTO_SLOTS} />
        </div>
      </div>

      <div className="divider">🌸 &nbsp; 🌸 &nbsp; 🌸</div>

      {/* ── QUOTES / PRAISE ── */}
      <div id="praise" className="bg-blush">
        <div className="section">
          <div className="sec-title">Why You Are Everything</div>
          <div className="sec-sub">
            Words that could never be enough — but here is my wholehearted attempt
          </div>
          <div className="quotes-grid">
            {QUOTES.map((q, i) => (
              <div
                key={i}
                className="quote-card animate-fadeUp"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                <div className="quote-icon">{q.icon}</div>
                <div className="quote-text">{q.text}</div>
                <div className="quote-tag">— {q.tag}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="divider">💌 &nbsp; 💌 &nbsp; 💌</div>

      {/* ── TIMELINE ── */}
      <div id="story" className="bg-cream">
        <div className="section">
          <div className="sec-title">Our Story, Chapter by Chapter</div>
          <div className="sec-sub">Every moment that made us, us</div>
          <div className="timeline">
            {TIMELINE.map((item, i) => (
              <TimelineItem key={i} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="divider">🌟 &nbsp; 🌟 &nbsp; 🌟</div>

      {/* ── LETTER ── */}
      <div id="letter" className="bg-letter">
        <div className="section">
          <div className="sec-title">A Letter From My Heart</div>
          <div className="sec-sub">Written with all the love I cannot always say out loud</div>
          <LetterEnvelope
            senderName={senderName}
            editSender={editSender}
            setEditSender={setEditSender}
            setSenderName={setSenderName}
          />
        </div>
      </div>

      <div className="divider">🦋 &nbsp; 🦋 &nbsp; 🦋</div>

      {/* ── WISHES ── */}
      <div id="wishes" className="bg-cream">
        <div className="section">
          <div className="sec-title">Birthday Wishes for You</div>
          <div className="sec-sub">
            Everything my heart wants for you this year and always
          </div>
          <div className="wishes-grid">
            {WISHES.map((w, i) => (
              <div
                key={i}
                className="wish-card animate-fadeUp"
                style={{
                  background: w.bg, color: w.accent,
                  animationDelay: `${i * 0.1}s`,
                }}
              >
                <div className="wish-icon">{w.icon}</div>
                <div className="wish-title" style={{ color: w.accent }}>{w.title}</div>
                <div className="wish-text" style={{ color: w.accent }}>{w.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── FOOTER CTA ── */}
      <div className="footer-cta">
        <div className="footer-title">
          Happy Birthday, {bestieName} 🎂
        </div>
        <div className="footer-sub">
          "The most beautiful thing about having you in my life is knowing I never have to face any of it alone. I promise I’ll always be there for you, through the good days and especially the hard ones. Whatever happens, you’ll always have me by your side. This one is for you — forever and always. ❤️"
        </div>
        <div className="footer-hearts animate-heartPop">💖 💕 💗 💞 💝</div>
        <button className="confetti-btn" onClick={launch}>
          🎉 Celebrate!
        </button>
        <div className="footer-note">
          Made with love · Just for you · Always &amp; Forever
        </div>
      </div>
    </>
  );
}