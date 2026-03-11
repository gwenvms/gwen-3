"use client";

import { useState, useEffect, useRef } from "react";
import JSZip from "jszip";
import { saveAs } from "file-saver";

type Category = "all" | "concert" | "auto" | "autre";

const photos = [
  // Concert
  { cat: "concert" as const, label: "Baby Neelou — Gruntfest 2024", src: "" },
  { cat: "concert" as const, label: "BenPLG — Gruntfest 2024", src: "" },
  { cat: "concert" as const, label: "BenPLG — Gruntfest 2024 #2", src: "" },
  { cat: "concert" as const, label: "Chapeaux Des Roues 2025", src: "" },
  { cat: "concert" as const, label: "Concert Tyke 2025", src: "" },
  { cat: "concert" as const, label: "DeeleeS — Gruntfest 2024", src: "" },
  { cat: "concert" as const, label: "Realo — Gruntfest 2024", src: "" },
  { cat: "concert" as const, label: "Wallace Cleaver — Gruntfest 2024", src: "" },
  { cat: "concert" as const, label: "Wallace Cleaver LR", src: "" },
  { cat: "concert" as const, label: "Realo & DeeleeS — Toulouse 2025", src: "" },
  { cat: "concert" as const, label: "Realo — Toulouse 2025", src: "" },
  { cat: "concert" as const, label: "Realo — Toulouse 2025 #2", src: "" },
  { cat: "concert" as const, label: "Realo — Toulouse 2025 #3", src: "" },
  { cat: "concert" as const, label: "Realo — Toulouse 2025 #4", src: "" },
  { cat: "concert" as const, label: "Realo — Toulouse 2025 #5", src: "" },
  { cat: "concert" as const, label: "Recklessboise — Le Bikini 2025", src: "" },
  { cat: "concert" as const, label: "Rouhnaa — Tours 2024", src: "" },
  { cat: "concert" as const, label: "Toothpick — Gruntfest 2025", src: "" },
  { cat: "concert" as const, label: "Toothpick — Gruntfest 2025 #2", src: "" },
  { cat: "concert" as const, label: "DeeleeS — Toulouse 2025", src: "" },
  { cat: "concert" as const, label: "Durty — Gruntfest 2025", src: "" },
  { cat: "concert" as const, label: "Futur Prince — Gruntfest 2025", src: "" },
  { cat: "concert" as const, label: "Les Chatouilleurs 2026", src: "" },
  { cat: "concert" as const, label: "Notinbed — Le Bikini 2025", src: "" },
  // Auto
  { cat: "auto" as const, label: "499P — 24h Le Mans 2025", src: "" },
  { cat: "auto" as const, label: "500 Ferrari — Contre Le Cancer 2024", src: "" },
  { cat: "auto" as const, label: "500 Ferraris — Contre Le Cancer 2024", src: "" },
  { cat: "auto" as const, label: "500 Ferrari — Contre Le Cancer 2025", src: "" },
  { cat: "auto" as const, label: "500 Ferrari — Contre Le Cancer 2025 #2", src: "" },
  { cat: "auto" as const, label: "500 Ferrari — Contre Le Cancer 2025 #3", src: "" },
  { cat: "auto" as const, label: "500 Ferrari — Contre Le Cancer 2025 #4", src: "" },
  { cat: "auto" as const, label: "500 Ferrari — Contre Le Cancer 2025 #5", src: "" },
  { cat: "auto" as const, label: "LAF — 500 Ferrari Contre Le Cancer 2024", src: "" },
  { cat: "auto" as const, label: "LAF 2024", src: "" },
  { cat: "auto" as const, label: "24h Le Mans 2025", src: "" },
  { cat: "auto" as const, label: "300SL — 500 Ferrari Contre Le Cancer 2025", src: "" },
  { cat: "auto" as const, label: "BMW — 24h Le Mans 2025", src: "" },
  { cat: "auto" as const, label: "F1 — 500 Ferrari Contre Le Cancer", src: "" },
  // Autre
  { cat: "autre" as const, label: "Portrait 2025", src: "" },
  { cat: "autre" as const, label: "Portrait 2026", src: "" },
  { cat: "autre" as const, label: "Portrait 2026 #3", src: "" },
];

export default function Home() {
  const [filter, setFilter] = useState<Category>("all");
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownloadAll = async () => {
    const photosWithSrc = filtered.filter((p) => p.src);
    if (photosWithSrc.length === 0) return;
    setDownloading(true);
    try {
      const zip = new JSZip();
      await Promise.all(
        photosWithSrc.map(async (photo, i) => {
          const res = await fetch(photo.src);
          const blob = await res.blob();
          const ext = blob.type.split("/")[1] || "jpg";
          const safeName = photo.label.replace(/[^a-z0-9\-_]/gi, "_");
          zip.file(`${String(i + 1).padStart(2, "0")}_${safeName}.${ext}`, blob);
        })
      );
      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, `gwen_photos_${filter}.zip`);
    } finally {
      setDownloading(false);
    }
  };

  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    let ringX = 0;
    let ringY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.transform = `translate(${ringX}px, ${ringY}px)`;
      rafId = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove);
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  const filtered = filter === "all" ? photos : photos.filter((p) => p.cat === filter);

  return (
    <main
      style={{
        background: "#0a0a0a",
        color: "#e8e4df",
        fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
        fontWeight: 300,
        overflowX: "hidden",
        cursor: "none",
      }}
    >
      {/* Custom cursor */}
      <div
        ref={cursorRingRef}
        style={{
          position: "fixed",
          top: "-16px",
          left: "-16px",
          width: "32px",
          height: "32px",
          borderRadius: "50%",
          border: "1px solid rgba(192,57,43,0.6)",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />
      <div
        ref={cursorDotRef}
        style={{
          position: "fixed",
          top: "-2.5px",
          left: "-2.5px",
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: "#c0392b",
          pointerEvents: "none",
          zIndex: 9999,
        }}
      />

      {/* Lightbox */}
      {lightboxSrc !== null && (
        <div
          onClick={() => setLightboxSrc(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(10,10,10,0.97)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            onClick={() => setLightboxSrc(null)}
            style={{
              position: "fixed",
              top: "2rem",
              right: "3rem",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "#6a6560",
              cursor: "pointer",
            }}
          >
            Fermer ×
          </span>
          {lightboxSrc && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={lightboxSrc}
              alt=""
              style={{ maxWidth: "90vw", maxHeight: "90vh", objectFit: "contain" }}
            />
          )}
        </div>
      )}

      {/* Nav */}
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "2rem 4rem",
        }}
      >
        <a
          href="#hero"
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "1.4rem",
            fontWeight: 300,
            fontStyle: "italic",
            color: "#e8e4df",
            textDecoration: "none",
          }}
        >
          gwen <span style={{ color: "#c0392b" }}>♡</span>
        </a>
        <ul style={{ display: "flex", gap: "3rem", listStyle: "none" }}>
          {[
            { href: "#galerie", label: "my art" },
            { href: "#about", label: "À propos" },
            { href: "#socials", label: "Contact" },
          ].map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                style={{
                  fontSize: "0.65rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "#e8e4df",
                  textDecoration: "none",
                }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Hero */}
      <section
        id="hero"
        style={{
          height: "100vh",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "0 4rem 5rem",
          }}
        >
          <p
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#6a6560",
              marginBottom: "1.5rem",
            }}
          >
            Photographie — Automobile &amp; Concerts
          </p>
          <h1
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "clamp(3rem, 6vw, 6rem)",
              fontWeight: 300,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
            }}
          >
            L1VE
            <br />
            <em style={{ fontStyle: "italic", color: "#c0392b" }}>SH0TS</em>
          </h1>
          <p
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "2rem",
              fontStyle: "italic",
              color: "#c0392b",
              marginTop: "1rem",
            }}
          >
            gwen &lt;3
          </p>
          <p
            style={{
              marginTop: "1.5rem",
              fontSize: "0.8rem",
              color: "#6a6560",
              maxWidth: "340px",
              lineHeight: 1.8,
            }}
          >
            Photographe amatrice depuis 3 ans, je me passionne pour capturer les instants et les
            émotions, transformant chaque cliché en souvenir unique. Les concerts sont mon terrain
            de jeu préféré, où chaque lumière, chaque note et chaque mouvement devient une histoire
            à raconter à travers mon objectif.
          </p>
        </div>
        <div
          style={{
            position: "relative",
            overflow: "hidden",
            background: "#1a1a18",
          }}
        />
      </section>

      {/* Galerie */}
      <section id="galerie" style={{ padding: "8rem 4rem" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: "4rem",
            borderTop: "1px solid #1a1a18",
            paddingTop: "2rem",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 300,
              letterSpacing: "-0.02em",
            }}
          >
            my art
          </h2>
          <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
            <span
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.2em",
                color: "#6a6560",
                textTransform: "uppercase",
              }}
            >
              {filtered.length} photos
            </span>
            <button
              onClick={handleDownloadAll}
              disabled={downloading || filtered.filter((p) => p.src).length === 0}
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: "0.6rem",
                fontWeight: 300,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "0.5rem 1.4rem",
                border: "1px solid #c0392b",
                background: "transparent",
                color: downloading ? "#6a6560" : "#c0392b",
                cursor: downloading ? "default" : "pointer",
                transition: "all 0.2s",
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              {downloading ? "Préparation…" : "Télécharger tout"}
            </button>
          </div>
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "3rem", flexWrap: "wrap" }}>
          {(["all", "concert", "auto", "autre"] as Category[]).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              style={{
                fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                fontSize: "0.6rem",
                fontWeight: 300,
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                padding: "0.5rem 1.2rem",
                border: `1px solid ${filter === cat ? "#e8e4df" : "#1a1a18"}`,
                background: filter === cat ? "#e8e4df" : "transparent",
                color: filter === cat ? "#0a0a0a" : "#6a6560",
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            >
              {cat === "all" ? "Tout" : cat === "concert" ? "Concert" : cat === "auto" ? "Automobile" : "Autre"}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridAutoRows: "260px",
            gap: "12px",
          }}
        >
          {filtered.map((photo, i) => (
            <PhotoCard
              key={`${photo.cat}-${i}`}
              label={photo.label}
              src={photo.src}
              onOpen={setLightboxSrc}
            />
          ))}
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        style={{
          padding: "8rem 4rem",
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "6rem",
          alignItems: "center",
          background: "#1a1a18",
        }}
      >
        <div
          style={{
            aspectRatio: "4/5",
            background: "#2a2a28",
            position: "relative",
            overflow: "hidden",
          }}
        />
        <div>
          <p
            style={{
              fontSize: "0.6rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "#6a6560",
              marginBottom: "1.5rem",
            }}
          >
            À propos
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display), Georgia, serif",
              fontSize: "clamp(2.5rem, 4vw, 4rem)",
              fontWeight: 300,
              lineHeight: 1.1,
              marginBottom: "2.5rem",
            }}
          >
            Bonjour,
            <br />
            je suis <em style={{ fontStyle: "italic", color: "#c0392b" }}>gwen ♡</em>
          </h2>
          <p
            style={{
              fontSize: "0.85rem",
              lineHeight: 2,
              color: "#6a6560",
              marginBottom: "3rem",
            }}
          >
            Passionnée par la vitesse et la musique, je capture ces instants où l&apos;adrénaline
            se fige dans une image. Des circuits aux salles de concerts, mon objectif traque la
            lumière, le mouvement, et l&apos;émotion brute.
            <br />
            <br />
            Chaque photo est une histoire — celle d&apos;un moteur qui rugit, d&apos;un musicien
            qui vibre, d&apos;un moment qui ne reviendra jamais.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "2rem",
              borderTop: "1px solid #2a2a28",
              paddingTop: "2.5rem",
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontSize: "2.5rem",
                  fontWeight: 300,
                  lineHeight: 1,
                }}
              >
                43<span style={{ color: "#c0392b" }}>+</span>
              </div>
              <div
                style={{
                  fontSize: "0.55rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#6a6560",
                  marginTop: "0.4rem",
                }}
              >
                Photos
              </div>
            </div>
            <div>
              <div
                style={{
                  fontFamily: "var(--font-display), Georgia, serif",
                  fontSize: "2.5rem",
                  fontWeight: 300,
                  lineHeight: 1,
                }}
              >
                ∞
              </div>
              <div
                style={{
                  fontSize: "0.55rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#6a6560",
                  marginTop: "0.4rem",
                }}
              >
                Instants capturés
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Socials */}
      <section
        id="socials"
        style={{
          padding: "6rem 4rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "3rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display), Georgia, serif",
            fontSize: "0.7rem",
            letterSpacing: "0.3em",
            textTransform: "uppercase",
            color: "#6a6560",
          }}
        >
          Retrouvez-moi sur
        </p>
        <div style={{ display: "flex", gap: "4rem", alignItems: "center" }}>
          <a
            href="https://www.instagram.com/gwen.vms/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.8rem",
              textDecoration: "none",
              color: "#e8e4df",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <rect x="2" y="2" width="20" height="20" rx="5" />
              <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
            <span style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Instagram
            </span>
          </a>
          <div style={{ width: "1px", height: "40px", background: "#1a1a18" }} />
          <a
            href="mailto:g.martineau07@gmail.com"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "0.8rem",
              textDecoration: "none",
              color: "#e8e4df",
            }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
              <polyline points="22,6 12,13 2,6" />
            </svg>
            <span style={{ fontSize: "0.55rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>
              Email
            </span>
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: "2rem 4rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid #1a1a18",
        }}
      >
        <p style={{ fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#6a6560" }}>
          © 2026 <span style={{ color: "#c0392b" }}>gwen ♡</span>
        </p>
        <p style={{ fontSize: "0.55rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#6a6560" }}>
          gwen &lt;3
        </p>
      </footer>
    </main>
  );
}

function PhotoCard({
  label,
  src,
  onOpen,
}: {
  label: string;
  src: string;
  onOpen: (src: string) => void;
}) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => src && onOpen(src)}
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#1a1a18",
        cursor: src ? "pointer" : "default",
      }}
    >
      {src && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={label}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            display: "block",
            transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
            transform: hovered ? "scale(1.04)" : "scale(1)",
          }}
        />
      )}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: hovered ? "rgba(10,10,10,0.55)" : "rgba(10,10,10,0)",
          transition: "background 0.3s ease",
        }}
      />
    </div>
  );
}
