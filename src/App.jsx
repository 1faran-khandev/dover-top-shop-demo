import { useState, useEffect, useRef } from "react";

// ─── REPLACE THESE with your real photo imports ───────────────────────────────
import photo0 from "./assets/photo-0.jpg";
import photo1 from "./assets/photo-1.jpg";
import photo2 from "./assets/photo-2.jpg";
import photo3 from "./assets/photo-3.jpg";
// ─────────────────────────────────────────────────────────────────────────────

// ─── THEME ────────────────────────────────────────────────────────────────────
const C = {
  dark:       "#0a1409",
  darkMid:    "#0f1a0e",
  darkLight:  "#162212",
  gold:       "#c8a84b",
  goldGlow:   "rgba(200,168,75,0.25)",
  cream:      "#faf8f3",
  text:       "#1a2e16",
  textMid:    "#4a5248",
  textLight:  "#8a9488",
  white:      "#f5f0e8",
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const MENU_ITEMS = [
  { category: "Breakfast", name: "Bacon & Eggs Roll",        desc: "Turkish bread toasted, local favourite",          price: "$9.50"      },
  { category: "Breakfast", name: "All Day Breakfast",        desc: "Eggs your way, bacon, toast & grilled tomato",    price: "$13.00"     },
  { category: "Breakfast", name: "Turkish Breakfast Roll",   desc: "House special with fresh fillings",               price: "$11.00"     },
  { category: "Seafood",   name: "Fish & Chips",             desc: "Fresh local catch, golden battered",              price: "$15.00"     },
  { category: "Seafood",   name: "Scallops",                 desc: "Local Tasmanian scallops, simply prepared",       price: "$14.00"     },
  { category: "Seafood",   name: "Calamari",                 desc: "Tender rings, lightly crumbed",                   price: "$13.50"     },
  { category: "Burgers",   name: "Hamburger with the Lot",   desc: "Old-fashioned classic — great value",             price: "$13.00"     },
  { category: "Burgers",   name: "Chicken Schnitzel Burger", desc: "Crispy schnitzel, fresh bun, house sauce",        price: "$13.50"     },
  { category: "Coffee",    name: "Botero Coffee",            desc: "Cappuccino, latte, long black — premium roast",   price: "From $4.50" },
  { category: "Coffee",    name: "Hot Chocolate",            desc: "Rich and creamy, made with real chocolate",       price: "$5.00"      },
  { category: "Snacks",    name: "Potato Cakes",             desc: "Golden and scrumptious — customer favourite",     price: "$5.00"      },
  { category: "Snacks",    name: "Scones",                   desc: "Freshly baked with jam and cream",                price: "$4.00"      },
];

const CATEGORIES = ["All", "Breakfast", "Seafood", "Burgers", "Coffee", "Snacks"];

const REVIEWS = [
  {
    name: "Mars & Frank",
    location: "Hobart, TAS",
    stars: 5,
    text: "The Turkish breakfast roll was absolutely delicious — we came all the way from Hobart and it was worth every kilometre. Friendly staff too!",
  },
  {
    name: "Peter W.",
    location: "Google Review",
    stars: 5,
    text: "Great old fashioned hamburger, well cooked and great value. The coffee was excellent too. A must-stop when driving through Dover.",
  },
  {
    name: "Sarah T.",
    location: "TripAdvisor",
    stars: 5,
    text: "Doesn't look much from the outside but inside is a gem. Tasty food at great prices and the staff couldn't be friendlier. We'll be back!",
  },
];

const STRIP_ITEMS = [
  "Fresh Local Seafood",
  "All Day Breakfast",
  "Dine In & Takeaway",
  "Wheelchair Friendly",
  "Outdoor Seating",
  "Family Friendly",
];

const FEATURES = [
  "Fresh seafood daily",
  "All day breakfast",
  "Dine in & takeaway",
  "Wheelchair access",
  "Outdoor seating",
  "Family friendly",
];

// ─── REUSABLE UI COMPONENTS ───────────────────────────────────────────────────

function Button({ children, variant = "primary", onClick, href, style = {} }) {
  const base = {
    display: "inline-block",
    padding: "12px 26px",
    borderRadius: 2,
    fontSize: 12,
    fontWeight: variant === "primary" ? 600 : 400,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    cursor: "pointer",
    textDecoration: "none",
    border: "none",
    fontFamily: "inherit",
    transition: "transform 0.18s, box-shadow 0.18s, border-color 0.2s, color 0.2s",
  };

  const variants = {
    primary: {
      background: C.gold,
      color: C.dark,
    },
    ghost: {
      background: "transparent",
      color: C.white,
      border: `1px solid rgba(245,240,232,0.22)`,
    },
    dark: {
      background: C.dark,
      color: C.white,
    },
  };

  const [hovered, setHovered] = useState(false);

  const hoverStyles = {
    primary: hovered ? { transform: "translateY(-2px)", boxShadow: `0 8px 24px ${C.goldGlow}` } : {},
    ghost:   hovered ? { borderColor: C.gold, color: C.gold } : {},
    dark:    hovered ? { transform: "translateY(-1px)" } : {},
  };

  const merged = { ...base, ...variants[variant], ...hoverStyles[variant], ...style };

  if (href) {
    return (
      <a
        href={href}
        style={merged}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {children}
      </a>
    );
  }

  return (
    <button
      onClick={onClick}
      style={merged}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {children}
    </button>
  );
}

function SectionTitle({ eyebrow, title, subtitle, light = false }) {
  const eyebrowColor = light ? "rgba(200,168,75,0.7)" : "#8a6e2f";
  const titleColor   = light ? C.white : C.text;
  const subColor     = light ? "rgba(245,240,232,0.35)" : "#8a6e2f";
  const lineColor    = C.gold;

  return (
    <div style={{ textAlign: "center", marginBottom: 36 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
        <div style={{ width: 24, height: 1, background: lineColor }} />
        <span style={{ fontSize: 11, letterSpacing: "0.18em", color: eyebrowColor, textTransform: "uppercase" }}>
          {eyebrow}
        </span>
        <div style={{ width: 24, height: 1, background: lineColor }} />
      </div>
      <h2 style={{
        fontSize: "clamp(22px,3.5vw,30px)", fontWeight: 500,
        color: titleColor, fontFamily: "Georgia, serif", marginBottom: 6,
      }}>
        {title}
      </h2>
      {subtitle && (
        <p style={{ fontSize: 13, color: subColor }}>{subtitle}</p>
      )}
    </div>
  );
}

function Card({ children, style = {}, hoverLift = false }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "white",
        border: "0.5px solid rgba(26,46,22,0.1)",
        borderRadius: 2,
        padding: 22,
        transition: "transform 0.2s, box-shadow 0.18s",
        ...(hoverLift && hovered
          ? { transform: "translateY(-4px)", boxShadow: "0 10px 28px rgba(26,46,22,0.1)" }
          : {}),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function StarIcon({ size = 12, filled = true }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill={filled ? C.gold : "none"} stroke={C.gold} strokeWidth="0.5">
      <polygon points="6,0.5 7.5,4.5 12,4.5 8.5,7 9.8,11.5 6,9 2.2,11.5 3.5,7 0,4.5 4.5,4.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
      <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke={C.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// WhatsApp icon as SVG
function WhatsAppIcon({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(10,20,9,0.97)" : C.dark,
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: `0.5px solid rgba(200,168,75,${scrolled ? 0.2 : 0.08})`,
        padding: "0 24px", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "background 0.3s, border-color 0.3s",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, background: C.gold, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 600, color: C.dark, letterSpacing: "0.05em",
          }}>DT</div>
          <span style={{ fontSize: 15, fontWeight: 500, color: C.white, fontFamily: "Georgia, serif", letterSpacing: "0.03em" }}>
            Dover Top Shop
          </span>
        </div>

        {/* Desktop nav */}
        <div className="nav-links-desktop" style={{ display: "flex", gap: 28 }}>
          {["about", "menu", "reviews", "contact"].map((id) => (
            <NavLink key={id} onClick={() => scrollTo(id)}>{id}</NavLink>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Button href="tel:+61362926020" variant="primary" style={{ padding: "8px 18px", fontSize: 11 }}>
            Call Now
          </Button>
          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger-btn"
            style={{
              background: "none", border: "none", cursor: "pointer",
              display: "none", flexDirection: "column", gap: 5, padding: 4,
            }}
          >
            {[0, 1, 2].map((i) => (
              <span key={i} style={{
                width: 22, height: 1.5, background: menuOpen ? C.gold : C.white, display: "block",
                transition: "all 0.3s",
                transform: menuOpen
                  ? i === 0 ? "rotate(45deg) translate(4px,4px)"
                  : i === 2 ? "rotate(-45deg) translate(4px,-4px)"
                  : "none"
                  : "none",
                opacity: menuOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div style={{
        position: "fixed", top: 60, left: 0, right: 0, zIndex: 99,
        background: "rgba(10,20,9,0.98)", backdropFilter: "blur(16px)",
        borderBottom: "0.5px solid rgba(200,168,75,0.15)",
        maxHeight: menuOpen ? 300 : 0, overflow: "hidden",
        padding: menuOpen ? "20px 24px 24px" : "0 24px",
        transition: "max-height 0.35s ease, padding 0.3s ease",
      }}>
        {["about", "menu", "reviews", "contact"].map((id) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            style={{
              display: "block", background: "none", border: "none", cursor: "pointer",
              fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase",
              color: "rgba(245,240,232,0.7)", fontFamily: "inherit",
              padding: "12px 0", width: "100%", textAlign: "left",
              borderBottom: "0.5px solid rgba(245,240,232,0.06)",
            }}
          >
            {id}
          </button>
        ))}
      </div>
    </>
  );
}

function NavLink({ children, onClick }) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "none", border: "none", cursor: "pointer",
        fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
        color: hovered ? C.gold : "rgba(245,240,232,0.5)",
        fontFamily: "inherit", transition: "color 0.2s",
      }}
    >
      {children}
    </button>
  );
}

// ─── WHATSAPP FAB ─────────────────────────────────────────────────────────────
function WhatsAppFAB() {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href="https://wa.me/61362926020"
      target="_blank"
      rel="noreferrer"
      title="Chat on WhatsApp"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "fixed", bottom: 28, right: 28, zIndex: 200,
        width: 56, height: 56, borderRadius: "50%",
        background: "#25d366",
        display: "flex", alignItems: "center", justifyContent: "center",
        textDecoration: "none",
        boxShadow: hovered
          ? "0 8px 28px rgba(37,211,102,0.5)"
          : "0 4px 16px rgba(37,211,102,0.35)",
        transform: hovered ? "scale(1.1)" : "scale(1)",
        transition: "transform 0.2s, box-shadow 0.2s",
        animation: "waPulse 2.5s infinite",
      }}
    >
      <WhatsAppIcon size={26} />
    </a>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  const scrollToMenu = () => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section style={{ background: C.dark, paddingTop: 60, minHeight: "100vh", display: "flex", alignItems: "center" }}>
      <div
        className="hero-grid"
        style={{
          maxWidth: 1100, margin: "0 auto", padding: "60px 24px",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 48, alignItems: "center",
        }}
      >
        {/* Left text */}
        <div style={{ animation: "fadeUp 0.8s ease both" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 32, height: 1, background: C.gold }} />
            <span style={{ fontSize: 11, letterSpacing: "0.2em", color: C.gold, textTransform: "uppercase" }}>
              Dover · Far South Tasmania
            </span>
          </div>

          <h1 style={{
            fontSize: "clamp(30px,5vw,46px)", fontWeight: 500, color: C.white,
            lineHeight: 1.15, marginBottom: 18, fontFamily: "Georgia, serif",
          }}>
            Where the{" "}
            <span style={{ color: C.gold }}>highway</span>
            <br />meets great food
          </h1>

          <p style={{ fontSize: 14, color: "rgba(245,240,232,0.55)", lineHeight: 1.75, marginBottom: 28, maxWidth: 380 }}>
            Local seafood, all-day breakfast, and artisan coffee — crafted with care
            at the bottom of the world.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36 }}>
            <Button onClick={scrollToMenu} variant="primary">View Menu</Button>
            <Button href="tel:+61362926020" variant="ghost">Call to Order</Button>
          </div>

          <div style={{ display: "flex", gap: 32, paddingTop: 28, borderTop: "0.5px solid rgba(245,240,232,0.1)" }}>
            {[["4.5★", "Star Rating"], ["182", "Reviews"], ["07:30", "Opens Daily"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontSize: 22, fontWeight: 500, color: C.white, fontFamily: "Georgia, serif" }}>{num}</div>
                <div style={{ fontSize: 11, color: "rgba(245,240,232,0.35)", letterSpacing: "0.06em", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — hero photo with parallax */}
        <ParallaxPhoto src={photo0} alt="Food at Dover Top Shop" height={460} />
      </div>
    </section>
  );
}

// ─── PARALLAX PHOTO ───────────────────────────────────────────────────────────
function ParallaxPhoto({ src, alt, height = 460 }) {
  const ref = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const center = rect.top + rect.height / 2 - window.innerHeight / 2;
      const offset = center * 0.25;
      ref.current.querySelector("img").style.transform = `translateY(${offset}px)`;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={ref}
      className="hero-image"
      style={{
        borderRadius: 2, overflow: "hidden", height,
        animation: "fadeUp 0.8s 0.15s ease both",
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{ width: "100%", height: "110%", objectFit: "cover", willChange: "transform", transition: "transform 0.1s linear" }}
      />
    </div>
  );
}

// ─── MARQUEE STRIP ────────────────────────────────────────────────────────────
function Strip() {
  const doubled = [...STRIP_ITEMS, ...STRIP_ITEMS];
  return (
    <div style={{ background: C.gold, padding: "13px 0", overflow: "hidden" }}>
      <div style={{ display: "flex", width: "max-content", animation: "marquee 20s linear infinite" }}>
        {doubled.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 16, padding: "0 20px" }}>
            <span style={{ fontSize: 12, color: C.dark, fontWeight: 600, letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
              {item}
            </span>
            {i < doubled.length - 1 && (
              <span style={{ width: 4, height: 4, background: "rgba(10,20,9,0.3)", borderRadius: "50%", display: "inline-block" }} />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── PHOTO MOSAIC ─────────────────────────────────────────────────────────────
function PhotoMosaic() {
  return (
    <>
      <div className="photo-mosaic-desktop" style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gridTemplateRows: "200px 200px", gap: 10 }}>
        <img src={photo1} alt="Cafe interior" style={{ width: "100%", height: "100%", objectFit: "cover", gridRow: "1 / span 2", borderRadius: 6 }} />
        <img src={photo2} alt="Food"          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }} />
        <img src={photo3} alt="Coffee"        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }} />
      </div>
      <div className="photo-mosaic-mobile" style={{ display: "none", gap: 10, overflowX: "auto", WebkitOverflowScrolling: "touch", scrollSnapType: "x mandatory", paddingBottom: 4 }}>
        {[photo1, photo2, photo3].map((src, i) => (
          <img key={i} src={src} alt={`Gallery ${i + 1}`} style={{ flexShrink: 0, width: "72vw", maxWidth: 260, height: 160, objectFit: "cover", borderRadius: 6, scrollSnapAlign: "start" }} />
        ))}
      </div>
    </>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ background: C.cream, padding: "72px 24px" }}>
      <div className="about-grid" style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52, alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 24, height: 1, background: C.gold }} />
            <span style={{ fontSize: 11, letterSpacing: "0.18em", color: "#8a6e2f", textTransform: "uppercase" }}>Our Story</span>
          </div>
          <h2 style={{ fontSize: "clamp(22px,3.5vw,30px)", fontWeight: 500, color: C.text, lineHeight: 1.3, marginBottom: 18, fontFamily: "Georgia, serif" }}>
            A Dover landmark, loved by locals &amp; visitors
          </h2>
          <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.8, marginBottom: 12 }}>
            Nestled at 6979 Huon Highway in the heart of Dover, we've been serving travellers
            and locals alike with honest, delicious food made with care. Whether you're passing
            through on a road trip or a regular who knows us by name — you're always welcome here.
          </p>
          <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.8, marginBottom: 24 }}>
            From our famous Turkish breakfast rolls to fresh Tasmanian seafood and Botero coffee —
            every dish is made with local ingredients and a whole lot of love.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {FEATURES.map((f) => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.text, padding: "7px 0", borderBottom: "0.5px solid rgba(26,46,22,0.08)" }}>
                <div style={{ width: 18, height: 18, background: C.text, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <CheckIcon />
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>
        <PhotoMosaic />
      </div>
    </section>
  );
}

// ─── MENU ─────────────────────────────────────────────────────────────────────
function Menu() {
  const [active, setActive] = useState("All");
  const [animKey, setAnimKey] = useState(0);

  const handleCategoryChange = (cat) => {
    setActive(cat);
    setAnimKey((k) => k + 1);
  };

  const filtered = active === "All" ? MENU_ITEMS : MENU_ITEMS.filter((i) => i.category === active);

  return (
    <section id="menu" style={{ background: C.dark, padding: "72px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionTitle
          light
          eyebrow="What we serve"
          title="Our Menu"
          subtitle="Fresh ingredients · Cooked to order · All day"
        />

        {/* Category tabs */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 28, flexWrap: "wrap" }}>
          {CATEGORIES.map((cat) => (
            <MenuTab key={cat} label={cat} active={active === cat} onClick={() => handleCategoryChange(cat)} />
          ))}
        </div>

        {/* Menu grid with staggered animation */}
        <div
          key={animKey}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 1,
            background: "rgba(245,240,232,0.06)",
            borderRadius: 2, overflow: "hidden",
          }}
        >
          {filtered.map((item, i) => (
            <MenuCard key={item.name} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuTab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: "6px 16px", borderRadius: 2,
        fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
        cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s",
        background: active ? C.gold : "rgba(245,240,232,0.06)",
        color:      active ? C.dark : "rgba(245,240,232,0.45)",
        border:     active ? `0.5px solid ${C.gold}` : "0.5px solid rgba(245,240,232,0.1)",
        fontWeight: active ? 600 : 400,
      }}
    >
      {label}
    </button>
  );
}

function MenuCard({ item, index }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered ? C.darkLight : C.darkMid,
        padding: "20px 18px",
        display: "flex", flexDirection: "column", gap: 5,
        transform: hovered ? "scale(1.015)" : "scale(1)",
        position: "relative", zIndex: hovered ? 1 : 0,
        transition: "background 0.2s, transform 0.2s",
        animation: `cardIn 0.35s ${index * 0.05}s ease both`,
        opacity: 0,
      }}
    >
      <div style={{ fontSize: 10, letterSpacing: "0.15em", color: C.gold, textTransform: "uppercase" }}>{item.category}</div>
      <div style={{ fontSize: 14, fontWeight: 500, color: C.white }}>{item.name}</div>
      <div style={{ fontSize: 12, color: "rgba(245,240,232,0.4)", lineHeight: 1.5, flex: 1 }}>{item.desc}</div>
      <div style={{ fontSize: 14, fontWeight: 500, color: C.gold, marginTop: 8 }}>{item.price}</div>
    </div>
  );
}

// ─── REVIEWS ──────────────────────────────────────────────────────────────────
function Reviews() {
  return (
    <section id="reviews" style={{ background: C.cream, padding: "72px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <SectionTitle
          eyebrow="What people say"
          title="Loved by locals &amp; visitors"
          subtitle="4.5 stars across 182 Google reviews"
        />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {REVIEWS.map((r, i) => (
            <Card key={i} hoverLift style={{ animation: `fadeUp 0.5s ${i * 0.1}s ease both`, opacity: 0 }}>
              <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
                {Array.from({ length: r.stars }).map((_, j) => <StarIcon key={j} />)}
              </div>
              <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.7, fontStyle: "italic", marginBottom: 14 }}>
                "{r.text}"
              </p>
              <div style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{r.name}</div>
              <div style={{ fontSize: 11, color: C.textLight, marginTop: 2 }}>{r.location}</div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CTA BANNER ───────────────────────────────────────────────────────────────
function CTA() {
  return (
    <div style={{ textAlign: "center", padding: "56px 24px", background: C.gold }}>
      <h2 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(22px,3.5vw,30px)", fontWeight: 500, color: C.dark, marginBottom: 10 }}>
        Visit Dover Top Shop Today
      </h2>
      <p style={{ fontSize: 14, color: "rgba(10,20,9,0.65)", marginBottom: 24 }}>
        Fresh food, great coffee, and friendly service waiting for you on the Huon Highway.
      </p>
      <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
        <Button href="tel:+61362926020" variant="dark">
          📞 Call Now — +61 3 6292 6020
        </Button>
        <Button href="https://wa.me/61362926020" variant="dark" style={{ background: "#25d366" }}>
          💬 WhatsApp Us
        </Button>
      </div>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <>
      {/* Google Map */}
      <iframe
        title="Dover Top Shop Location"
        src="https://maps.google.com/maps?q=Dover%20Top%20Shop%2C%206979%20Huon%20Hwy%2C%20Dover%20TAS&t=&z=14&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="280"
        style={{ border: 0, display: "block" }}
        loading="lazy"
        allowFullScreen
      />

      <footer id="contact" style={{ background: "#080f08", padding: "52px 24px 24px" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>
          <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 36, marginBottom: 40 }}>

            {/* Brand */}
            <div>
              <div style={{ fontSize: 18, fontWeight: 500, color: C.white, fontFamily: "Georgia, serif", marginBottom: 10 }}>
                Dover Top Shop
              </div>
              <p style={{ fontSize: 12, color: "rgba(245,240,232,0.35)", lineHeight: 1.75 }}>
                Fresh food, great coffee &amp; local seafood at the bottom of the world.
                On the Huon Highway — hard to miss.
              </p>
              {/* WhatsApp link in footer */}
              <a
                href="https://wa.me/61362926020"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  marginTop: 16, color: "#25d366", fontSize: 12, textDecoration: "none",
                  border: "0.5px solid rgba(37,211,102,0.3)",
                  padding: "7px 14px", borderRadius: 2,
                  transition: "border-color 0.2s",
                }}
              >
                <WhatsAppIcon size={14} />
                Chat on WhatsApp
              </a>
            </div>

            {/* Hours */}
            <div>
              <FooterColTitle>Hours</FooterColTitle>
              {[["Mon – Thu", "07:30 – 15:00"], ["Fri – Sun", "07:30 – 16:00"]].map(([day, time]) => (
                <div key={day} style={{ fontSize: 12, color: "rgba(245,240,232,0.45)", marginBottom: 5 }}>
                  <span style={{ color: "rgba(245,240,232,0.25)", marginRight: 6 }}>{day}</span>{time}
                </div>
              ))}
              <div style={{ fontSize: 11, color: "rgba(245,240,232,0.18)", marginTop: 6 }}>Hours may vary — call ahead</div>
            </div>

            {/* Contact */}
            <div>
              <FooterColTitle>Contact</FooterColTitle>
              <p style={{ fontSize: 12, color: "rgba(245,240,232,0.45)", marginBottom: 5 }}>6979 Huon Hwy, Dover TAS 7117</p>
              <FooterLink href="tel:+61362926020">+61 3 6292 6020</FooterLink>
              <FooterLink href="mailto:topshop6979@gmail.com">topshop6979@gmail.com</FooterLink>
              <FooterLink href="https://wa.me/61362926020" style={{ color: "#25d366" }}>WhatsApp →</FooterLink>
            </div>

            {/* Links */}
            <div>
              <FooterColTitle>Follow</FooterColTitle>
              <FooterLink href="https://www.facebook.com/people/Top-Shop-Cafe/100055149624000/" target="_blank">Facebook Page →</FooterLink>
              <FooterLink href="https://dover-top-shop.sumupstore.com/" target="_blank">Order Online →</FooterLink>
              <FooterLink href="https://g.co/kgs/dover-top-shop" target="_blank">Google Reviews →</FooterLink>
            </div>
          </div>

          {/* Bottom */}
          <div style={{ borderTop: "0.5px solid rgba(245,240,232,0.08)", paddingTop: 18, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <span style={{ fontSize: 11, color: "rgba(245,240,232,0.2)" }}>© 2025 Dover Top Shop Café. All rights reserved.</span>
            <span style={{ fontSize: 11, color: "rgba(245,240,232,0.2)" }}>Website by Faran Khan</span>
          </div>
        </div>
      </footer>
    </>
  );
}

function FooterColTitle({ children }) {
  return (
    <div style={{ fontSize: 10, letterSpacing: "0.18em", color: C.gold, textTransform: "uppercase", marginBottom: 12 }}>
      {children}
    </div>
  );
}

function FooterLink({ children, href, target, style = {} }) {
  const [hovered, setHovered] = useState(false);
  return (
    <a
      href={href}
      target={target}
      rel={target === "_blank" ? "noreferrer" : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "block", fontSize: 12,
        color: hovered ? C.gold : "rgba(245,240,232,0.45)",
        marginBottom: 5, textDecoration: "none",
        transition: "color 0.2s",
        ...style,
      }}
    >
      {children}
    </a>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes marquee {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes waPulse {
          0%,100% { box-shadow: 0 0 0 0 rgba(37,211,102,0.4); }
          50%      { box-shadow: 0 0 0 10px rgba(37,211,102,0); }
        }

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        img { display: block; }
        button { font-family: inherit; }

        .photo-mosaic-mobile::-webkit-scrollbar { display: none; }
        .photo-mosaic-mobile { -ms-overflow-style: none; scrollbar-width: none; }

        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .hamburger-btn     { display: flex !important; }
          .hero-grid         { grid-template-columns: 1fr !important; gap: 32px !important; padding: 40px 20px 48px !important; }
          .hero-image        { height: 260px !important; }
          .about-grid        { grid-template-columns: 1fr !important; }
          .photo-mosaic-desktop { display: none !important; }
          .photo-mosaic-mobile  { display: flex !important; }
          .footer-grid       { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
        }
        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .hero-grid   { padding: 32px 16px 40px !important; }
        }
      `}</style>

      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <Strip />
      <About />
      <Menu />
      <Reviews />
      <CTA />
      <Footer />
      <WhatsAppFAB />
    </>
  );
}