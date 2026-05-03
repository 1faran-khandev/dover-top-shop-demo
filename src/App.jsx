import { useState, useEffect, useRef } from "react";

const COLORS = {
  dark: "#0a1409",
  darkMid: "#0f1a0e",
  darkLight: "#162212",
  gold: "#c8a84b",
  goldLight: "#d4b86a",
  goldPale: "#f0e4b8",
  cream: "#faf8f3",
  creamDark: "#f0ebe0",
  text: "#1a2e16",
  textMid: "#4a5248",
  textLight: "#8a9488",
};

const menuItems = [
  { category: "Breakfast", name: "Bacon & Eggs Roll", desc: "Turkish bread toasted, local favourite", price: "$9.50" },
  { category: "Breakfast", name: "All Day Breakfast", desc: "Eggs your way, bacon, toast & grilled tomato", price: "$13.00" },
  { category: "Breakfast", name: "Turkish Breakfast Roll", desc: "House special with fresh fillings", price: "$11.00" },
  { category: "Seafood", name: "Fish & Chips", desc: "Fresh local catch, golden battered", price: "$15.00" },
  { category: "Seafood", name: "Scallops", desc: "Local Tasmanian scallops, simply prepared", price: "$14.00" },
  { category: "Seafood", name: "Calamari", desc: "Tender rings, lightly crumbed", price: "$13.50" },
  { category: "Burgers", name: "Hamburger with the Lot", desc: "Old-fashioned classic — great value", price: "$13.00" },
  { category: "Burgers", name: "Chicken Schnitzel Burger", desc: "Crispy schnitzel, fresh bun, house sauce", price: "$13.50" },
  { category: "Coffee", name: "Botero Coffee", desc: "Cappuccino, latte, long black — premium roast", price: "From $4.50" },
  { category: "Coffee", name: "Hot Chocolate", desc: "Rich and creamy, made with real chocolate", price: "$5.00" },
  { category: "Snacks", name: "Potato Cakes", desc: "Golden and scrumptious — customer favourite", price: "$5.00" },
  { category: "Snacks", name: "Scones", desc: "Freshly baked with jam and cream", price: "$4.00" },
];

const reviews = [
  { name: "Mars & Frank", location: "Hobart, TAS", text: "The Turkish breakfast roll was absolutely delicious — we came all the way from Hobart and it was worth every kilometre. Friendly staff too!", stars: 5 },
  { name: "Peter W.", location: "Google Review", text: "Great old fashioned hamburger, well cooked and great value. The coffee was excellent too. A must-stop when driving through Dover.", stars: 5 },
  { name: "Sarah T.", location: "TripAdvisor", text: "Doesn't look much from the outside but inside is a gem. Tasty food at great prices and the staff couldn't be friendlier. We'll be back!", stars: 5 },
];

const categories = ["All", "Breakfast", "Seafood", "Burgers", "Coffee", "Snacks"];

function StarIcon({ size = 12, color = COLORS.gold }) {
  return (
    <svg width={size} height={size} viewBox="0 0 12 12" fill={color}>
      <polygon points="6,0.5 7.5,4.5 12,4.5 8.5,7 9.8,11.5 6,9 2.2,11.5 3.5,7 0,4.5 4.5,4.5" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
      <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke={COLORS.gold} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Navbar({ menuOpen, setMenuOpen }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <>
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? "rgba(10,20,9,0.97)" : COLORS.dark,
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: `0.5px solid rgba(200,168,75,${scrolled ? 0.2 : 0.08})`,
        padding: "0 24px", height: 60,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "background 0.3s, border-color 0.3s",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{
            width: 34, height: 34, background: COLORS.gold, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 12, fontWeight: 600, color: COLORS.dark, letterSpacing: "0.05em",
          }}>DT</div>
          <span style={{ fontSize: 15, fontWeight: 500, color: "#f5f0e8", fontFamily: "Georgia, serif", letterSpacing: "0.03em" }}>
            Dover Top Shop
          </span>
        </div>

        {/* Desktop links */}
        <div style={{ display: "flex", gap: 28 }} className="nav-links-desktop">
          {["about", "menu", "reviews", "contact"].map((id) => (
            <button key={id} onClick={() => scrollTo(id)} style={{
              background: "none", border: "none", cursor: "pointer",
              fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
              color: "rgba(245,240,232,0.5)", fontFamily: "inherit",
              transition: "color 0.2s",
            }}
              onMouseEnter={e => e.target.style.color = COLORS.gold}
              onMouseLeave={e => e.target.style.color = "rgba(245,240,232,0.5)"}
            >{id}</button>
          ))}
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="tel:+61362926020" style={{
            background: COLORS.gold, color: COLORS.dark, border: "none",
            padding: "8px 18px", borderRadius: 2, fontSize: 11, fontWeight: 600,
            letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
            textDecoration: "none", display: "inline-block",
          }}>Call Now</a>

          {/* Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger-btn"
            style={{
              background: "none", border: "none", cursor: "pointer",
              display: "none", flexDirection: "column", gap: 5, padding: 4,
            }}
          >
            <span style={{ width: 22, height: 1.5, background: menuOpen ? COLORS.gold : "#f5f0e8", display: "block", transition: "all 0.3s", transform: menuOpen ? "rotate(45deg) translate(4px, 4px)" : "none" }} />
            <span style={{ width: 22, height: 1.5, background: menuOpen ? COLORS.gold : "#f5f0e8", display: "block", transition: "all 0.3s", opacity: menuOpen ? 0 : 1 }} />
            <span style={{ width: 22, height: 1.5, background: menuOpen ? COLORS.gold : "#f5f0e8", display: "block", transition: "all 0.3s", transform: menuOpen ? "rotate(-45deg) translate(4px, -4px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div style={{
        position: "fixed", top: 60, left: 0, right: 0, zIndex: 99,
        background: "rgba(10,20,9,0.98)", backdropFilter: "blur(16px)",
        borderBottom: `0.5px solid rgba(200,168,75,0.15)`,
        padding: menuOpen ? "20px 24px 24px" : "0 24px",
        maxHeight: menuOpen ? 300 : 0, overflow: "hidden",
        transition: "max-height 0.35s ease, padding 0.3s ease",
      }} className="mobile-menu">
        {["about", "menu", "reviews", "contact"].map((id) => (
          <button key={id} onClick={() => scrollTo(id)} style={{
            display: "block", background: "none", border: "none", cursor: "pointer",
            fontSize: 13, letterSpacing: "0.12em", textTransform: "uppercase",
            color: "rgba(245,240,232,0.7)", fontFamily: "inherit",
            padding: "12px 0", width: "100%", textAlign: "left",
            borderBottom: "0.5px solid rgba(245,240,232,0.06)",
          }}>{id}</button>
        ))}
      </div>
    </>
  );
}

function Hero() {
  return (
    <section style={{ background: COLORS.dark, paddingTop: 60, minHeight: "100vh", display: "flex", alignItems: "center" }} className="hero-section">
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "60px 24px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center" }} className="hero-grid">
        <div style={{ animation: "fadeUp 0.8s ease both" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{ width: 32, height: 1, background: COLORS.gold }} />
            <span style={{ fontSize: 11, letterSpacing: "0.2em", color: COLORS.gold, textTransform: "uppercase" }}>
              Dover · Far South Tasmania
            </span>
          </div>
          <h1 style={{
            fontSize: "clamp(30px, 5vw, 46px)", fontWeight: 500, color: "#f5f0e8",
            lineHeight: 1.15, marginBottom: 18, fontFamily: "Georgia, serif",
          }}>
            Where the <span style={{ color: COLORS.gold }}>highway</span><br />meets great food
          </h1>
          <p style={{ fontSize: 14, color: "rgba(245,240,232,0.55)", lineHeight: 1.75, marginBottom: 28, maxWidth: 380 }}>
            Local seafood, all-day breakfast, and artisan coffee — crafted with care at the bottom of the world.
          </p>
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
            <button
              onClick={() => document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })}
              style={{
                background: COLORS.gold, color: COLORS.dark, border: "none",
                padding: "12px 26px", borderRadius: 2, fontSize: 12, fontWeight: 600,
                letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
              }}>View Menu</button>
            <a href="tel:+61362926020" style={{
              background: "transparent", color: "#f5f0e8",
              border: "1px solid rgba(245,240,232,0.22)",
              padding: "12px 26px", borderRadius: 2, fontSize: 12,
              letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
              textDecoration: "none", display: "inline-block",
            }}>Call to Order</a>
          </div>
          <div style={{ display: "flex", gap: 32, marginTop: 36, paddingTop: 28, borderTop: "0.5px solid rgba(245,240,232,0.1)" }}>
            {[["4.5", "Star Rating"], ["182", "Reviews"], ["07:30", "Opens Daily"]].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontSize: 22, fontWeight: 500, color: "#f5f0e8", fontFamily: "Georgia, serif" }}>{num}</div>
                <div style={{ fontSize: 11, color: "rgba(245,240,232,0.35)", letterSpacing: "0.06em", marginTop: 2 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ borderRadius: 2, overflow: "hidden", height: 460, animation: "fadeUp 0.8s 0.15s ease both" }} className="hero-image">
          <img
            src="src/assets/photo-0.jpg"
            alt="Food at Dover Top Shop"
            style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.85) saturate(1.1)" }}
          />
        </div>
      </div>
    </section>
  );
}

function Strip() {
  const items = ["Fresh Local Seafood", "All Day Breakfast", "Dine In & Takeaway", "Wheelchair Friendly", "Outdoor Seating", "Family Friendly"];
  return (
    <div style={{ background: COLORS.gold, padding: "13px 24px", overflowX: "auto", whiteSpace: "nowrap" }}>
      <div style={{ display: "flex", gap: 0, justifyContent: "center", minWidth: "max-content", margin: "0 auto" }}>
        {items.map((item, i) => (
          <span key={item} style={{ display: "inline-flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 12, color: COLORS.dark, fontWeight: 600, letterSpacing: "0.05em" }}>{item}</span>
            {i < items.length - 1 && <span style={{ width: 4, height: 4, background: "rgba(10,20,9,0.35)", borderRadius: "50%", display: "inline-block", marginRight: 16 }} />}
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" style={{ background: COLORS.cream, padding: "72px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 52, alignItems: "center" }} className="about-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 24, height: 1, background: COLORS.gold }} />
            <span style={{ fontSize: 11, letterSpacing: "0.18em", color: "#8a6e2f", textTransform: "uppercase" }}>Our Story</span>
          </div>
          <h2 style={{ fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 500, color: COLORS.text, lineHeight: 1.3, marginBottom: 18, fontFamily: "Georgia, serif" }}>
            A Dover landmark, loved by locals &amp; visitors
          </h2>
          <p style={{ fontSize: 13, color: COLORS.textMid, lineHeight: 1.8, marginBottom: 12 }}>
            Nestled at 6979 Huon Highway in the heart of Dover, we've been serving travellers and locals alike with honest, delicious food made with care. Whether you're passing through on a road trip or a regular who knows us by name — you're always welcome here.
          </p>
          <p style={{ fontSize: 13, color: COLORS.textMid, lineHeight: 1.8, marginBottom: 24 }}>
            From our famous Turkish breakfast rolls to fresh Tasmanian seafood and Botero coffee — every dish is made with local ingredients and a whole lot of love.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
            {["Fresh seafood daily", "All day breakfast", "Dine in & takeaway", "Wheelchair access", "Outdoor seating", "Family friendly"].map((f) => (
              <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: COLORS.text, padding: "7px 0", borderBottom: `0.5px solid rgba(26,46,22,0.08)` }}>
                <div style={{ width: 18, height: 18, background: COLORS.text, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <CheckIcon />
                </div>
                {f}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gridTemplateRows: "200px 200px", gap: 8 }} className="photo-mosaic">
          <img src="src/assets/photo-1.jpg" alt="Cafe interior" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2 }} />
          <img src="src/assets/photo-2.jpg" alt="Food" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2, gridRow: "1 / span 2", height: "100%" }} />
          <img src="src/assets/photo-3.jpg" alt="Coffee" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 2 }} />
        </div>
      </div>
    </section>
  );
}

function Menu() {
  const [activeCategory, setActiveCategory] = useState("All");
  const filtered = activeCategory === "All" ? menuItems : menuItems.filter(i => i.category === activeCategory);

  return (
    <section id="menu" style={{ background: COLORS.dark, padding: "72px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 24, height: 1, background: COLORS.gold }} />
            <span style={{ fontSize: 11, letterSpacing: "0.18em", color: "rgba(200,168,75,0.7)", textTransform: "uppercase" }}>What we serve</span>
            <div style={{ width: 24, height: 1, background: COLORS.gold }} />
          </div>
          <h2 style={{ fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 500, color: "#f5f0e8", fontFamily: "Georgia, serif", marginBottom: 6 }}>Our Menu</h2>
          <p style={{ fontSize: 13, color: "rgba(245,240,232,0.35)" }}>Fresh ingredients · Cooked to order · All day</p>
        </div>

        <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 28, flexWrap: "wrap" }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{
              padding: "6px 16px", borderRadius: 2, fontSize: 11,
              letterSpacing: "0.08em", textTransform: "uppercase", cursor: "pointer",
              background: activeCategory === cat ? COLORS.gold : "rgba(245,240,232,0.06)",
              color: activeCategory === cat ? COLORS.dark : "rgba(245,240,232,0.45)",
              border: activeCategory === cat ? `0.5px solid ${COLORS.gold}` : "0.5px solid rgba(245,240,232,0.1)",
              fontFamily: "inherit", fontWeight: activeCategory === cat ? 600 : 400,
              transition: "all 0.2s",
            }}>{cat}</button>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 1, background: "rgba(245,240,232,0.06)", borderRadius: 2, overflow: "hidden" }}>
          {filtered.map((item, i) => (
            <div key={i} style={{
              background: COLORS.darkMid, padding: "20px 18px",
              display: "flex", flexDirection: "column", gap: 5, transition: "background 0.2s",
              cursor: "default",
            }}
              onMouseEnter={e => e.currentTarget.style.background = COLORS.darkLight}
              onMouseLeave={e => e.currentTarget.style.background = COLORS.darkMid}
            >
              <div style={{ fontSize: 10, letterSpacing: "0.15em", color: COLORS.gold, textTransform: "uppercase" }}>{item.category}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: "#f5f0e8" }}>{item.name}</div>
              <div style={{ fontSize: 12, color: "rgba(245,240,232,0.4)", lineHeight: 1.5, flex: 1 }}>{item.desc}</div>
              <div style={{ fontSize: 14, fontWeight: 500, color: COLORS.gold, marginTop: 8 }}>{item.price}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Reviews() {
  return (
    <section id="reviews" style={{ background: COLORS.cream, padding: "72px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 10 }}>
            <div style={{ width: 24, height: 1, background: COLORS.gold }} />
            <span style={{ fontSize: 11, letterSpacing: "0.18em", color: "#8a6e2f", textTransform: "uppercase" }}>What people say</span>
            <div style={{ width: 24, height: 1, background: COLORS.gold }} />
          </div>
          <h2 style={{ fontSize: "clamp(22px, 3.5vw, 30px)", fontWeight: 500, color: COLORS.text, fontFamily: "Georgia, serif", marginBottom: 6 }}>Loved by locals &amp; visitors</h2>
          <p style={{ fontSize: 13, color: "#8a6e2f" }}>4.5 stars across 182 Google reviews</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 16 }}>
          {reviews.map((r, i) => (
            <div key={i} style={{ background: "white", border: "0.5px solid rgba(26,46,22,0.1)", borderRadius: 2, padding: 22 }}>
              <div style={{ display: "flex", gap: 3, marginBottom: 12 }}>
                {Array.from({ length: r.stars }).map((_, j) => <StarIcon key={j} />)}
              </div>
              <p style={{ fontSize: 13, color: COLORS.textMid, lineHeight: 1.7, fontStyle: "italic", marginBottom: 14 }}>"{r.text}"</p>
              <div style={{ fontSize: 13, fontWeight: 500, color: COLORS.text }}>{r.name}</div>
              <div style={{ fontSize: 11, color: COLORS.textLight, marginTop: 2 }}>{r.location}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" style={{ background: "#080f08", padding: "52px 24px 24px" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr 1fr 1fr", gap: 36, marginBottom: 40 }} className="footer-grid">
          <div>
            <div style={{ fontSize: 18, fontWeight: 500, color: "#f5f0e8", fontFamily: "Georgia, serif", marginBottom: 10 }}>Dover Top Shop</div>
            <p style={{ fontSize: 12, color: "rgba(245,240,232,0.35)", lineHeight: 1.75 }}>
              Fresh food, great coffee & local seafood at the bottom of the world. On the Huon Highway — hard to miss.
            </p>
          </div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.18em", color: COLORS.gold, textTransform: "uppercase", marginBottom: 12 }}>Hours</div>
            {[["Mon – Thu", "07:30 – 15:00"], ["Fri – Sun", "07:30 – 16:00"]].map(([day, time]) => (
              <div key={day} style={{ fontSize: 12, color: "rgba(245,240,232,0.45)", marginBottom: 5 }}>
                <span style={{ color: "rgba(245,240,232,0.25)", marginRight: 6 }}>{day}</span>{time}
              </div>
            ))}
            <div style={{ fontSize: 11, color: "rgba(245,240,232,0.18)", marginTop: 6 }}>Hours may vary — call ahead</div>
          </div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.18em", color: COLORS.gold, textTransform: "uppercase", marginBottom: 12 }}>Contact</div>
            {[
              ["6979 Huon Hwy, Dover TAS 7117", null],
              ["+61 3 6292 6020", "tel:+61362926020"],
              ["topshop6979@gmail.com", "mailto:topshop6979@gmail.com"],
            ].map(([text, href]) => href ? (
              <a key={text} href={href} style={{ display: "block", fontSize: 12, color: "rgba(245,240,232,0.45)", marginBottom: 5, textDecoration: "none" }}
                onMouseEnter={e => e.target.style.color = COLORS.gold}
                onMouseLeave={e => e.target.style.color = "rgba(245,240,232,0.45)"}
              >{text}</a>
            ) : (
              <p key={text} style={{ fontSize: 12, color: "rgba(245,240,232,0.45)", marginBottom: 5 }}>{text}</p>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 10, letterSpacing: "0.18em", color: COLORS.gold, textTransform: "uppercase", marginBottom: 12 }}>Follow</div>
            {[
              ["Facebook Page", "https://www.facebook.com/people/Top-Shop-Cafe/100055149624000/"],
              ["Order Online", "https://dover-top-shop.sumupstore.com/"],
            ].map(([text, href]) => (
              <a key={text} href={href} style={{ display: "block", fontSize: 12, color: "rgba(245,240,232,0.45)", marginBottom: 5, textDecoration: "none" }}
                onMouseEnter={e => e.target.style.color = COLORS.gold}
                onMouseLeave={e => e.target.style.color = "rgba(245,240,232,0.45)"}
              >{text} →</a>
            ))}
          </div>
        </div>
        <div style={{ borderTop: "0.5px solid rgba(245,240,232,0.08)", paddingTop: 18, display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: 11, color: "rgba(245,240,232,0.2)" }}>© 2025 Dover Top Shop Café</span>
          <span style={{ fontSize: 11, color: "rgba(245,240,232,0.2)" }}>Website by Faran Khan</span>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; }
        img { display: block; }
        button { font-family: inherit; }

        @media (max-width: 768px) {
          .nav-links-desktop { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 32px !important; padding: 40px 20px 48px !important; }
          .hero-image { height: 260px !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .photo-mosaic { height: 240px !important; grid-template-rows: 240px !important; }
          .photo-mosaic img:nth-child(1) { display: none; }
          .photo-mosaic img:nth-child(3) { display: none; }
          .footer-grid { grid-template-columns: 1fr 1fr !important; gap: 24px !important; }
        }

        @media (max-width: 480px) {
          .footer-grid { grid-template-columns: 1fr !important; }
          .hero-grid { padding: 32px 16px 40px !important; }
        }
      `}</style>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <Hero />
      <Strip />
      <About />
      <Menu />
      <Reviews />
      <Footer />
    </>
  );
}