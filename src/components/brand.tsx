import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import logo from "@/assets/logo.jpg";

export const BUSINESS = {
  name: "La Magie de Paris",
  tagline: "Salon de brunch & café de spécialité",
  address: "15 rue Dupont des Loges, 75007 Paris",
  metro: "École Militaire, ligne 8",
  hours: "Tous les jours, de 9h à 17h",
  phone: "06 98 75 18 86",
  phoneHref: "tel:+33698751886",
  email: "Lamagiedeparis7@gmail.com",
  instagram: "@lamagiedeparis7",
  instagramUrl: "https://instagram.com/lamagiedeparis7",
  tiktok: "@lamagiedeparis7",
  tiktokUrl: "https://tiktok.com/@lamagiedeparis7",
  rating: "4,9/5",
  reviewCount: "787",
  googleMapsUrl: "https://www.google.com/maps?cid=6117942293730300755",
  googleReviewUrl: "https://search.google.com/local/writereview?placeid=ChIJIfMK1nlv5kcRUxMiFhpM51Q",
};

/* ---------- Eyebrow + title block ---------- */
export function SectionHead({
  eyebrow,
  title,
  align = "center",
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  align?: "center" | "left";
  children?: ReactNode;
}) {
  return (
    <div className={align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-2xl"}>
      <div className={align === "center" ? "eyebrow" : "eyebrow"}>{eyebrow}</div>
      <h2 className="display mt-4 text-4xl sm:text-5xl md:text-6xl text-[color:var(--cream)]">
        {title}
      </h2>
      <Ornament className={align === "center" ? "mt-6" : "mt-6"} />
      {children ? <div className="mt-6 text-[color:var(--cream)]/80">{children}</div> : null}
    </div>
  );
}

export function Ornament({ className = "" }: { className?: string }) {
  return (
    <div className={`ornament ${className}`}>
      <span aria-hidden>✦</span>
    </div>
  );
}

/* ---------- Arch frame ---------- */
export function Arch({
  src,
  alt,
  className = "",
  thin = false,
  eager = false,
  children,
}: {
  src?: string;
  alt?: string;
  className?: string;
  thin?: boolean;
  eager?: boolean;
  children?: ReactNode;
}) {
  return (
    <div className={`${thin ? "arch-thin" : "arch"} ${className}`}>
      {src ? (
        <img
          src={src}
          alt={alt ?? ""}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
        />
      ) : null}
      {children}
    </div>
  );
}

/* ---------- Ticker ---------- */
export function Ticker() {
  const items = [
    "La Magie de Paris",
    "Brunch fait maison",
    "Café de spécialité",
    "Sans réservation",
    "9h à 17h",
  ];
  const row = items.flatMap((t, i) => [
    <span key={`t-${i}`}>{t}</span>,
    <span key={`s-${i}`} aria-hidden className="text-[color:var(--gold)]/70">✦</span>,
  ]);
  return (
    <div className="ticker" aria-hidden>
      <div className="ticker-track">
        {row}
        {row}
      </div>
    </div>
  );
}

/* ---------- Nav ---------- */
export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 20);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);
  const linkCls =
    "font-[family-name:var(--font-label)] text-[0.72rem] uppercase tracking-[0.3em] text-[color:var(--cream)] hover:text-[color:var(--gold-light)] transition-colors";
  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-sm transition-colors ${
        scrolled ? "bg-[color:var(--garnet-deep)]/85" : "bg-[color:var(--garnet-deep)]/50"
      } hairline-b`}
    >
      <nav
        aria-label="Navigation principale"
        className="mx-auto max-w-7xl px-5 sm:px-8 py-4 flex items-center justify-between gap-6"
      >
        <Link to="/" className="flex items-center gap-3 group" aria-label="Retour à l'accueil, La Magie de Paris">
          <LogoMark className="h-9" />
          <span className="display italic text-xl sm:text-2xl text-[color:var(--cream)] leading-none">
            La Magie <span className="text-[color:var(--gold)]">de Paris</span>
          </span>
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className={linkCls}>Accueil</Link>
          <Link to="/carte" className={linkCls}>La Carte</Link>
          <Link to="/infos" className={linkCls}>Infos</Link>
        </div>
        <button
          type="button"
          className="md:hidden text-[color:var(--gold)] p-2 -mr-2"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            {open ? (
              <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
            ) : (
              <>
                <path d="M4 7h16" strokeLinecap="round" />
                <path d="M4 12h16" strokeLinecap="round" />
                <path d="M4 17h16" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </nav>
      {open ? (
        <div className="md:hidden hairline-b bg-[color:var(--garnet-deep)]">
          <div className="mx-auto max-w-7xl px-5 py-5 flex flex-col gap-5">
            <Link to="/" className={linkCls} onClick={() => setOpen(false)}>Accueil</Link>
            <Link to="/carte" className={linkCls} onClick={() => setOpen(false)}>La Carte</Link>
            <Link to="/infos" className={linkCls} onClick={() => setOpen(false)}>Infos</Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer className="bg-[color:var(--garnet-deep)] hairline-b border-t text-[color:var(--cream)]/80 mt-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <LogoMark className="h-10" />
            <span className="display italic text-2xl text-[color:var(--cream)]">
              La Magie <span className="text-[color:var(--gold)]">de Paris</span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-[color:var(--cream)]/70 font-[family-name:var(--font-body)]">
            Un salon entre Damas et Paris, où chaque plat est composé à la main, tous les jours, sans réservation.
          </p>
          <Ornament className="mt-6 justify-start" />
        </div>
        <div>
          <div className="eyebrow">Adresse</div>
          <p className="mt-4">{BUSINESS.address}</p>
          <p className="mt-1 text-[color:var(--cream)]/60">{BUSINESS.metro}</p>
          <p className="mt-3">{BUSINESS.hours}</p>
        </div>
        <div>
          <div className="eyebrow">Contact</div>
          <p className="mt-4">
            <a href={BUSINESS.phoneHref} className="hover:text-[color:var(--gold-light)]">
              {BUSINESS.phone}
            </a>
          </p>
          <p className="mt-1">
            <a href={`mailto:${BUSINESS.email}`} className="hover:text-[color:var(--gold-light)] break-all">
              {BUSINESS.email}
            </a>
          </p>
          <div className="mt-4 flex gap-4">
            <a href={BUSINESS.instagramUrl} className="hover:text-[color:var(--gold-light)]" aria-label="Instagram">
              Instagram
            </a>
            <a href={BUSINESS.tiktokUrl} className="hover:text-[color:var(--gold-light)]" aria-label="TikTok">
              TikTok
            </a>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-6 hairline flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-[color:var(--cream)]/50 font-[family-name:var(--font-label)] uppercase tracking-[0.25em]">
        <span>© {new Date().getFullYear()} La Magie de Paris</span>
        <span>Paris · 7ᵉ arrondissement</span>
      </div>
    </footer>
  );
}

/* ---------- Logo mark ---------- */
export function LogoMark({ className = "" }: { className?: string }) {
  return (
    <span className={`logo-plaque ${className}`} aria-hidden>
      <img src={logo} alt="" className="block h-full w-auto rounded-[1px]" />
    </span>
  );
}

/* ---------- Reveal on scroll ---------- */
export function useReveal() {
  const ref = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15 },
    );
    const observeNew = () => el.querySelectorAll(".rise:not(.in)").forEach((n) => io.observe(n));
    observeNew();
    // Category switches (and other client-side re-renders) mount new .rise nodes
    // after this effect has already run once, so watch for them and reveal too.
    const mo = new MutationObserver(observeNew);
    mo.observe(el, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);
  return ref;
}

/* ---------- Star rating ---------- */
export function Stars({ value = 5 }: { value?: number }) {
  return (
    <span aria-label={`${value} étoiles`} className="text-[color:var(--gold)] tracking-[0.15em]">
      {"★".repeat(value)}
    </span>
  );
}