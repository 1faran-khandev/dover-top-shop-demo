import { useState, useEffect } from "react";

// ─── REPLACE THESE with your real photo imports ───────────────────────────────
import photo0 from "./assets/photo-0.jpg";
import photo1 from "./assets/photo-1.jpg";
import photo2 from "./assets/photo-2.jpg";
import photo3 from "./assets/photo-3.jpg";
// ─────────────────────────────────────────────────────────────────────────────

// ─── THEME ────────────────────────────────────────────────────────────────────
const C = {
  dark:      "#0a1409",
  darkMid:   "#0f1a0e",
  darkLight: "#162212",
  gold:      "#c8a84b",
  goldDim:   "rgba(200,168,75,0.15)",
  cream:     "#faf8f3",
  text:      "#1a2e16",
  textMid:   "#4a5248",
  textLight: "#8a9488",
  white:     "#f5f0e8",
  whiteFade: "rgba(245,240,232,",  // append opacity + ")"
};

// ─── DATA ─────────────────────────────────────────────────────────────────────
const MENU_ITEMS = [
  { category: "Breakfast", name: "Bacon & Eggs Roll",        desc: "Turkish bread toasted, local favourite",          price: "$9.50"       },
  { category: "Breakfast", name: "All Day Breakfast",        desc: "Eggs your way, bacon, toast & grilled tomato",    price: "$13.00"      },
  { category: "Breakfast", name: "Turkish Breakfast Roll",   desc: "House special with fresh fillings",               price: "$11.00"      },
  { category: "Seafood",   name: "Fish & Chips",             desc: "Fresh local catch, golden battered",              price: "$15.00"      },
  { category: "Seafood",   name: "Scallops",                 desc: "Local Tasmanian scallops, simply prepared",       price: "$14.00"      },
  { category: "Seafood",   name: "Calamari",                 desc: "Tender rings, lightly crumbed",                   price: "$13.50"      },
  { category: "Burgers",   name: "Hamburger with the Lot",   desc: "Old-fashioned classic — great value",             price: "$13.00"      },
  { category: "Burgers",   name: "Chicken Schnitzel Burger", desc: "Crispy schnitzel, fresh bun, house sauce",        price: "$13.50"      },
  { category: "Coffee",    name: "Botero Coffee",            desc: "Cappuccino, latte, long black — premium roast",   price: "From $4.50"  },
  { category: "Coffee",    name: "Hot Chocolate",            desc: "Rich and creamy, made with real chocolate",       price: "$5.00"       },
  { category: "Snacks",    name: "Potato Cakes",             desc: "Golden and scrumptious — customer favourite",     price: "$5.00"       },
  { category: "Snacks",    name: "Scones",                   desc: "Freshly baked with jam and cream",                price: "$4.00"       },
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

// ─── SMALL ICONS ──────────────────────────────────────────────────────────────
function StarIcon({ size = 12 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill={C.gold}>
      <polygon points="6,0.5 7.5,4.5 12,4.5 8.5,7 9.8,11.5 6,9 2.2,11.5 3.5,7 0,4.5 4.5,4.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
      <path
        d="M1.5 4.5L3.5 6.5L7.5 2.5"
        stroke={C.gold}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
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

  const navBg = scrolled ? "rgba(10,20,9,0.97)" : C.dark;
  const navBorder = `0.5px solid rgba(200,168,75,${scrolled ? 0.2 : 0.08})`;

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: navBg,
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: navBorder,
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
          <span style={{
            fontSize: 15, fontWeight: 500, color: C.white,
            fontFamily: "Georgia, serif", letterSpacing: "0.03em",
          }}>
            Dover Top Shop
          </span>
        </div>

        {/* Desktop nav links */}
        <div className="nav-links-desktop" style={{ display: "flex", gap: 28 }}>
          {["about", "menu", "reviews", "contact"].map((id) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              onMouseEnter={e => e.target.style.color = C.gold}
              onMouseLeave={e => e.target.style.color = C.whiteFade + "0.5)"}
              style={{
                background: "none", border: "none", cursor: "pointer",
                fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
                color: C.whiteFade + "0.5)", fontFamily: "inherit",
                transition: "color 0.2s",
              }}
            >
              {id}
            </button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* Call CTA */}
          <a
            href="tel:+61362926020"
            style={{
              background: C.gold, color: C.dark,
              padding: "8px 18px", borderRadius: 2,
              fontSize: 11, fontWeight: 600, letterSpacing: "0.08em",
              textTransform: "uppercase", textDecoration: "none",
              display: "inline-block",
            }}
          >
            Call Now
          </a>

          {/* Hamburger — shown on mobile via CSS */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger-btn"
            style={{
              background: "none", border: "none", cursor: "pointer",
              display: "none", flexDirection: "column", gap: 5, padding: 4,
            }}
          >
            <span style={{ width: 22, height: 1.5, background: menuOpen ? C.gold : C.white, display: "block", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(4px,4px)" : "none" }} />
            <span style={{ width: 22, height: 1.5, background: menuOpen ? C.gold : C.white, display: "block", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ width: 22, height: 1.5, background: menuOpen ? C.gold : C.white, display: "block", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(4px,-4px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Mobile dropdown menu */}
      <div style={{
        position: "fixed", top: 60, left: 0, right: 0, zIndex: 99,
        background: "rgba(10,20,9,0.98)", backdropFilter: "blur(16px)",
        borderBottom: "0.5px solid rgba(200,168,75,0.15)",
        padding: menuOpen ? "20px 24px 24px" : "0 24px",
        maxHeight: menuOpen ? 300 : 0, overflow: "hidden",
        transition: "max-height 0.35s ease, padding 0.3s ease",
      }}>
        {["about", "menu", "reviews", "contact"].map((id) => (
          <button
            key={id}
            onClick={() => scrollTo(id)}
            style={{
              display: "block", background: "none", border: "none", cursor: "pointer",
              fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase",
              color: C.whiteFade + "0.7)", fontFamily: "inherit",
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

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section
      className="hero-section"
      style={{
        background: C.dark, paddingTop: 60,
        minHeight: "100vh", display: "flex", alignItems: "center",
      }}
    >
      <div
        className="hero-grid"
        style={{
          maxWidth: 1100, margin: "0 auto",
          padding: "60px 24px",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 48, alignItems: "center",
        }}
      >
        {/* Left — text */}
        <div style={{ animation: "fadeUp 0.8s ease both" }}>
          {/* Eyebrow */}
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

          <p style={{
            fontSize: 14, color: C.whiteFade + "0.55)", lineHeight: 1.75,
            marginBottom: 28, maxWidth: 380,
          }}>
            Local seafood, all-day breakfast, and artisan coffee, crafted with care
            at the bottom of the world.
          </p>

          {/* Buttons */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36 }}>
            <button
              onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                background: C.gold, color: C.dark, border: "none",
                padding: "12px 26px", borderRadius: 2,
                fontSize: 12, fontWeight: 600, letterSpacing: "0.08em",
                textTransform: "uppercase", cursor: "pointer",
              }}
            >
              View Menu
            </button>
            <a
              href="tel:+61362926020"
              style={{
                background: "transparent", color: C.white,
                border: "1px solid rgba(245,240,232,0.22)",
                padding: "12px 26px", borderRadius: 2,
                fontSize: 12, letterSpacing: "0.08em",
                textTransform: "uppercase", textDecoration: "none",
                display: "inline-block",
              }}
            >
              Call to Order
            </a>
          </div>

          {/* Stats */}
          <div style={{
            display: "flex", gap: 32,
            paddingTop: 28, borderTop: "0.5px solid rgba(245,240,232,0.1)",
          }}>
            {[["4.5", "Star Rating"], ["182", "Reviews"], ["07:30", "Opens Daily"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontSize: 22, fontWeight: 500, color: C.white, fontFamily: "Georgia, serif" }}>
                  {num}
                </div>
                <div style={{ fontSize: 11, color: C.whiteFade + "0.35)", letterSpacing: "0.06em", marginTop: 2 }}>
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — hero photo */}
        <div
          className="hero-image"
          style={{ borderRadius: 2, overflow: "hidden", height: 460, animation: "fadeUp 0.8s 0.15s ease both" }}
        >
       <img
  src={photo0}
  alt="Food at Dover Top Shop"
  style={{
    width: "100%",
    height: "clamp(260px, 45vw, 460px)",
    objectFit: "cover"
  }}
/>
        </div>
      </div>
    </section>
  );
}

// ─── GOLD STRIP ───────────────────────────────────────────────────────────────
function Strip() {
  return (
    <div style={{
      background: C.gold, padding: "13px 24px",
      overflowX: "auto", whiteSpace: "nowrap",
    }}>
      <div style={{
        display: "flex", gap: 0, justifyContent: "center",
        minWidth: "max-content", margin: "0 auto",
      }}>
        {STRIP_ITEMS.map((item, i) => (
          <span key={item} style={{ display: "inline-flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 12, color: C.dark, fontWeight: 600, letterSpacing: "0.05em" }}>
              {item}
            </span>
            {i < STRIP_ITEMS.length - 1 && (
              <span style={{
                width: 4, height: 4, background: "rgba(10,20,9,0.35)",
                borderRadius: "50%", display: "inline-block", marginRight: 16,
              }} />
            )}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── PHOTO MOSAIC (responsive) ────────────────────────────────────────────────
function PhotoMosaic() {
  return (
    <>
      {/* Desktop: 2-col grid */}
      <div
        className="photo-mosaic-desktop"
        style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gridTemplateRows: "200px 200px", gap: 10 }}
      >
        <img src={photo1} alt="Cafe interior" style={{ width: "100%", height: "100%", objectFit: "cover", gridRow: "1 / span 2", borderRadius: 6 }} />
        <img src={photo2} alt="Food"          style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }} />
        <img src={photo3} alt="Coffee"        style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 6 }} />
      </div>

      {/* Mobile: horizontal scroll strip */}
      <div
        className="photo-mosaic-mobile"
        style={{
          display: "none", gap: 10,
          overflowX: "auto", WebkitOverflowScrolling: "touch",
          scrollSnapType: "x mandatory", paddingBottom: 4,
        }}
      >
        {[photo1, photo2, photo3].map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`Gallery ${i + 1}`}
            style={{
              flexShrink: 0, width: "72vw", maxWidth: 260, height: 160,
              objectFit: "cover", borderRadius: 6, scrollSnapAlign: "start",
            }}
          />
        ))}
      </div>
    </>
  );
}

// ─── ABOUT ────────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ background: C.cream, padding: "72px 24px" }}>
      <div
        className="about-grid"
        style={{
          maxWidth: 1000, margin: "0 auto",
          display: "grid", gridTemplateColumns: "1fr 1fr",
          gap: 52, alignItems: "center",
        }}
      >
        {/* Text */}
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 24, height: 1, background: C.gold }} />
            <span style={{ fontSize: 11, letterSpacing: "0.18em", color: "#8a6e2f", textTransform: "uppercase" }}>
              Our Story
            </span>
          </div>

          <h2 style={{
            fontSize: "clamp(22px,3.5vw,30px)", fontWeight: 500, color: C.text,
            lineHeight: 1.3, marginBottom: 18, fontFamily: "Georgia, serif",
          }}>
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

          {/* Feature checklist */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            {FEATURES.map((f) => (
              <div
                key={f}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  fontSize: 12, color: C.text,
                  padding: "7px 0",
                  borderBottom: "0.5px solid rgba(26,46,22,0.08)",
                }}
              >
                <div style={{
                  width: 18, height: 18, background: C.text, borderRadius: "50%",
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
                }}>
                  <CheckIcon />
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>

        {/* Photos */}
        <PhotoMosaic />
      </div>
    </section>
  );
}

// ─── MENU ─────────────────────────────────────────────────────────────────────
function Menu() {
  const [active, setActive] = useState("All");
  const filtered = active === "All" ? MENU_ITEMS : MENU_ITEMS.filter(i => i.category === active);

  return (
    <section id="menu" style={{ background: C.dark, padding: "72px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 24, height: 1, background: C.gold }} />
            <span style={{ fontSize: 11, letterSpacing: "0.18em", color: "rgba(200,168,75,0.7)", textTransform: "uppercase" }}>
              What we serve
            </span>
            <div style={{ width: 24, height: 1, background: C.gold }} />
          </div>
          <h2 style={{ fontSize: "clamp(22px,3.5vw,30px)", fontWeight: 500, color: C.white, fontFamily: "Georgia, serif", marginBottom: 6 }}>
            Our Menu
          </h2>
          <p style={{ fontSize: 13, color: C.whiteFade + "0.35)" }}>
            Fresh ingredients · Cooked to order · All day
          </p>
        </div>

        {/* Category tabs */}
        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 28, flexWrap: "wrap" }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              style={{
                padding: "6px 16px", borderRadius: 2,
                fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase",
                cursor: "pointer", fontFamily: "inherit",
                transition: "all 0.2s",
                background: active === cat ? C.gold : "rgba(245,240,232,0.06)",
                color:      active === cat ? C.dark : C.whiteFade + "0.45)",
                border:     active === cat ? `0.5px solid ${C.gold}` : "0.5px solid rgba(245,240,232,0.1)",
                fontWeight: active === cat ? 600 : 400,
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 1,
          background: "rgba(245,240,232,0.06)",
          borderRadius: 2, overflow: "hidden",
        }}>
          {filtered.map((item, i) => (
            <div
              key={i}
              onMouseEnter={e => e.currentTarget.style.background = C.darkLight}
              onMouseLeave={e => e.currentTarget.style.background = C.darkMid}
              style={{
                background: C.darkMid, padding: "20px 18px",
                display: "flex", flexDirection: "column", gap: 5,
                transition: "background 0.2s",
              }}
            >
              <div style={{ fontSize: 10, letterSpacing: "0.15em", color: C.gold, textTransform: "uppercase" }}>
                {item.category}
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: C.white }}>
                {item.name}
              </div>
              <div style={{ fontSize: 12, color: C.whiteFade + "0.4)", lineHeight: 1.5, flex: 1 }}>
                {item.desc}
              </div>
              <div style={{ fontSize: 14, fontWeight: 500, color: C.gold, marginTop: 8 }}>
                {item.price}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

// ─── REVIEWS ──────────────────────────────────────────────────────────────────
function Reviews() {
  return (
    <section id="reviews" style={{ background: C.cream, padding: "72px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 24, height: 1, background: C.gold }} />
            <span style={{ fontSize: 11, letterSpacing: "0.18em", color: "#8a6e2f", textTransform: "uppercase" }}>
              What people say
            </span>
            <div style={{ width: 24, height: 1, background: C.gold }} />
          </div>
          <h2 style={{ fontSize: "clamp(22px,3.5vw,30px)", fontWeight: 500, color: C.text, fontFamily: "Georgia, serif", marginBottom: 6 }}>
            Loved by locals &amp; visitors
          </h2>
          <p style={{ fontSize: 13, color: "#8a6e2f" }}>4.5 stars across 182 Google reviews</p>
        </div>

        {/* Review cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {REVIEWS.map((r, i) => (
            <div
              key={i}
              style={{
                background: "white",
                border: "0.5px solid rgba(26,46,22,0.1)",
                borderRadius: 2, padding: 22,
              }}
            >
              <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
                {Array.from({ length: r.stars }).map((_, j) => <StarIcon key={j} />)}
              </div>
              <p style={{ fontSize: 13, color: C.textMid, lineHeight: 1.7, fontStyle: "italic", marginBottom: 14 }}>
                "{r.text}"
              </p>
              <div style={{ fontSize: 13, fontWeight: 500, color: C.text }}>{r.name}</div>
              <div style={{ fontSize: 11, color: C.textLight, marginTop: 2 }}>{r.location}</div>
            </div>
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
      <h2 style={{
        fontFamily: "Georgia, serif", fontSize: "clamp(22px,3.5vw,30px)",
        fontWeight: 500, color: C.dark, marginBottom: 10,
      }}>
        Visit Dover Top Shop Today
      </h2>
      <p style={{ fontSize: 14, color: "rgba(10,20,9,0.65)", marginBottom: 24 }}>
        Fresh food, great coffee, and friendly service waiting for you on the Huon Highway.
      </p>
      <a
        href="tel:+61362926020"
        style={{
          background: C.dark, color: C.white,
          padding: "13px 28px", borderRadius: 2,
          fontSize: 12, fontWeight: 600, letterSpacing: "0.08em",
          textTransform: "uppercase", textDecoration: "none",
          display: "inline-block",
        }}
      >
        📞 Call Now — +61 3 6292 6020
      </a>
    </div>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <>
      {/* Google Map embed */}
      <iframe
        title="Dover Top Shop Location"
        src="https://maps.google.com/maps?q=Dover%20Top%20Shop%2C%206979%20Huon%20Hwy%2C%20Dover%20TAS&t=&z=14&ie=UTF8&iwloc=&output=embed"
        width="100%"
        height="260"
        style={{ border: 0, display: "block" }}
        loading="lazy"
      />

      {/* Footer */}
      <footer
        id="contact"
        style={{ background: "#080f08", padding: "52px 24px 24px" }}
      >
        <div style={{ maxWidth: 1000, margin: "0 auto" }}>

          {/* Footer columns */}
          <div
            className="footer-grid"
            style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 36, marginBottom: 40 }}
          >
            {/* Brand */}
            <div>
              <div style={{ fontSize: 18, fontWeight: 500, color: C.white, fontFamily: "Georgia, serif", marginBottom: 10 }}>
                Dover Top Shop
              </div>
              <p style={{ fontSize: 12, color: C.whiteFade + "0.35)", lineHeight: 1.75 }}>
                Fresh food, great coffee &amp; local seafood at the bottom of the world.
                On the Huon Highway, hard to miss.
              </p>
            </div>

            {/* Hours */}
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", color: C.gold, textTransform: "uppercase", marginBottom: 12 }}>
                Hours
              </div>
              {[["Mon – Thu", "07:30 – 15:00"], ["Fri – Sun", "07:30 – 16:00"]].map(([day, time]) => (
                <div key={day} style={{ fontSize: 12, color: C.whiteFade + "0.45)", marginBottom: 5 }}>
                  <span style={{ color: C.whiteFade + "0.25)", marginRight: 6 }}>{day}</span>{time}
                </div>
              ))}
              <div style={{ fontSize: 11, color: C.whiteFade + "0.18)", marginTop: 6 }}>
                Hours may vary — call ahead
              </div>
            </div>

            {/* Contact */}
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", color: C.gold, textTransform: "uppercase", marginBottom: 12 }}>
                Contact
              </div>
              {[
                ["6979 Huon Hwy, Dover TAS 7117", null],
                ["+61 3 6292 6020",               "tel:+61362926020"],
                ["topshop6979@gmail.com",          "mailto:topshop6979@gmail.com"],
              ].map(([text, href]) =>
                href ? (
                  <a
                    key={text}
                    href={href}
                    onMouseEnter={e => e.target.style.color = C.gold}
                    onMouseLeave={e => e.target.style.color = C.whiteFade + "0.45)"}
                    style={{ display: "block", fontSize: 12, color: C.whiteFade + "0.45)", marginBottom: 5, textDecoration: "none" }}
                  >
                    {text}
                  </a>
                ) : (
                  <p key={text} style={{ fontSize: 12, color: C.whiteFade + "0.45)", marginBottom: 5 }}>
                    {text}
                  </p>
                )
              )}
            </div>

            {/* Links */}
            <div>
              <div style={{ fontSize: 10, letterSpacing: "0.18em", color: C.gold, textTransform: "uppercase", marginBottom: 12 }}>
                Follow
              </div>
              {[
                ["Facebook Page",  "https://www.facebook.com/people/Top-Shop-Cafe/100055149624000/"],
                ["Order Online",   "https://dover-top-shop.sumupstore.com/"],
                ["Google Reviews", "https://g.co/kgs/dover-top-shop"],
              ].map(([text, href]) => (
                <a
                  key={text}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  onMouseEnter={e => e.target.style.color = C.gold}
                  onMouseLeave={e => e.target.style.color = C.whiteFade + "0.45)"}
                  style={{ display: "block", fontSize: 12, color: C.whiteFade + "0.45)", marginBottom: 5, textDecoration: "none" }}
                >
                  {text} →
                </a>
              ))}
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{
            borderTop: "0.5px solid rgba(245,240,232,0.08)",
            paddingTop: 18,
            display: "flex", justifyContent: "space-between",
            flexWrap: "wrap", gap: 8,
          }}>
            <span style={{ fontSize: 11, color: C.whiteFade + "0.2)" }}>
              © 2025 Dover Top Shop Café. All rights reserved.
            </span>
            <span style={{ fontSize: 11, color: C.whiteFade + "0.2)" }}>
              Website by Faran Khan
            </span>
          </div>

        </div>
      </footer>
    </>
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

        /* Reset */
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body {
          font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
          -webkit-font-smoothing: antialiased;
        }
        img { display: block; }
        button { font-family: inherit; }

        /* Hide mobile photo strip scrollbar */
        .photo-mosaic-mobile::-webkit-scrollbar { display: none; }
        .photo-mosaic-mobile { -ms-overflow-style: none; scrollbar-width: none; }

        /* ── Responsive breakpoints ── */
        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .hamburger-btn     { display: flex !important; }

          .hero-grid  { grid-template-columns: 1fr !important; gap: 32px !important; padding: 40px 20px 48px !important; }
          .hero-image { height: 260px !important; }

          .about-grid { grid-template-columns: 1fr !important; }

          .photo-mosaic-desktop { display: none !important; }
          .photo-mosaic-mobile  { display: flex !important; }

          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
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
    </>
  );
}