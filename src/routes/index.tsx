import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Arch, Ornament, SectionHead, Stars, BUSINESS, useReveal } from "@/components/brand";
import hero from "@/assets/hero.jpg";
import sigFruits from "@/assets/sig-fruits.jpg";
import sigPancakesSaumon from "@/assets/sig-pancakes-saumon.jpg";
import sigBriochePoulet from "@/assets/sig-brioche-poulet.jpg";
import story from "@/assets/story.jpg";
import cravingSale from "@/assets/craving-sale.jpg";
import cravingSucre from "@/assets/craving-sucre.jpg";
import cravingCoffee from "@/assets/craving-coffee.jpg";
import cravingFraicheurs from "@/assets/craving-fraicheurs.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "La Magie de Paris, brunch parisien et café de spécialité à deux pas de la Tour Eiffel" },
      { name: "description", content: "Un salon né entre Damas et Paris, dans le 7ᵉ arrondissement. Brioches toastées, pancakes maison, café de spécialité, tous les jours de 9h à 17h." },
      { property: "og:title", content: "La Magie de Paris, salon de brunch à deux pas de la Tour Eiffel" },
      { property: "og:description", content: "Chaque plat est composé comme une petite sculpture, entre héritage syrien et élégance parisienne. Ouvert tous les jours, sans réservation." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

const CRAVINGS = [
  { n: "I", img: cravingSale, title: "Salé", cat: "pancakes-sales" },
  { n: "II", img: cravingSucre, title: "Sucré", cat: "pancakes-sucres" },
  { n: "III", img: cravingCoffee, title: "Coffee", cat: "chaudes" },
  { n: "IV", img: cravingFraicheurs, title: "Fraîcheurs", cat: "glacees" },
];

const SIGNATURE_DISHES = [
  { img: sigPancakesSaumon, name: "Pancakes Saumon", price: "18,90 €", startRotate: -6 },
  { img: sigFruits, name: "Pancakes Fruits Frais", price: "2p 15 € · 3p 16,50 €", startRotate: 0 },
  { img: sigBriochePoulet, name: "Brioche Toastée Poulet", price: "16,50 €", startRotate: 6 },
];

function Index() {
  const ref = useReveal();
  const sigRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!sigRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const dishes = gsap.utils.toArray<HTMLElement>(".sig-dish-arch");
      dishes.forEach((el, i) => {
        gsap.set(el, {
          opacity: 0,
          scale: 0.72,
          rotate: SIGNATURE_DISHES[i]?.startRotate ?? 0,
          transformOrigin: "50% 60%",
        });
      });
      gsap.set(".sig-glow", { opacity: 0 });
      gsap
        .timeline({
          scrollTrigger: { trigger: sigRef.current, start: "top top", end: "bottom bottom", scrub: 0.35 },
        })
        .to(".sig-glow", { opacity: 1, duration: 0.3 })
        .to(dishes, { opacity: 1, scale: 1, rotate: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" }, "<");
    }, sigRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={ref} className="bg-damask">
      {/* ---------- HERO ---------- */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          poster={hero}
          aria-label="Le salon La Magie de Paris, un intérieur ancien aux dorures et au velours grenat"
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/clip_hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--garnet-deep)]/80 via-[color:var(--garnet-deep)]/55 to-[color:var(--garnet-deep)]/90" />
        {/* inner gold frame */}
        <div className="absolute inset-4 sm:inset-8 border border-[color:var(--gold)]/40 pointer-events-none" />
        <div className="absolute inset-6 sm:inset-10 border border-[color:var(--gold)]/20 pointer-events-none" />

        <div className="relative z-10 text-center px-6 max-w-4xl">
          <div className="eyebrow">Depuis 2022 · Paris 7ᵉ</div>
          <h1 className="display italic mt-6 text-5xl sm:text-7xl md:text-8xl text-[color:var(--cream)]">
            La Magie<br /><span className="text-[color:var(--gold)]">de Paris</span>
          </h1>
          <Ornament className="mt-8" />
          <p className="mt-6 text-lg sm:text-xl text-[color:var(--cream)]/85 max-w-xl mx-auto font-[family-name:var(--font-body)] italic">
            Un salon où chaque plat se dresse comme une sculpture, entre les salons de Damas et les cafés parisiens.
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link to="/carte" className="btn btn-gold">Découvrir la carte</Link>
            <Link to="/infos" className="btn btn-outline">Nous trouver</Link>
          </div>
        </div>

        <div className="absolute bottom-6 left-0 right-0 text-center eyebrow text-[color:var(--gold)]/70">
          Tous les jours, de 9h à 17h, sans réservation
        </div>
      </section>

      {/* ---------- LA MAISON ---------- */}
      <section className="py-24 sm:py-32 px-5 sm:px-8">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-14 md:gap-24 items-center">
          <div className="rise order-2 md:order-1">
            <div className="eyebrow">La Maison</div>
            <h2 className="display italic mt-4 text-5xl sm:text-6xl text-[color:var(--cream)]">
              Entre Damas<br />et Paris.
            </h2>
            <Ornament className="mt-6 justify-start" />
            <div className="mt-6 space-y-4 text-[color:var(--cream)]/80 leading-relaxed">
              <p>
                Ici s'entremêlent le souvenir des salons de Damas et l'esprit des cafés du 7ᵉ arrondissement. Velours grenat, dorures anciennes, marbre veiné : un décor de conte pour prendre le temps, comme autrefois.
              </p>
              <p>
                Rien n'est laissé au hasard. Le chef compose chaque plat un par un, comme on façonnerait une sculpture, avec des produits choisis chaque matin et un café de spécialité torréfié en petits lots.
              </p>
            </div>
            <div className="mt-10 flex items-center gap-5">
              <Link to="/infos" className="btn btn-gold">Notre histoire</Link>
              <span className="eyebrow">Sans réservation</span>
            </div>
          </div>
          <div className="rise order-1 md:order-2 relative">
            <Arch src={story} alt="Détail du salon, miroir doré, marbre, chandelles" className="aspect-[4/5] max-w-md mx-auto" />
            {/* rating badge */}
            <div className="absolute -bottom-6 -left-2 sm:left-6 bg-[color:var(--garnet-deep)] border border-[color:var(--gold)] px-5 py-4 shadow-2xl">
              <div className="flex items-center gap-3">
                <Stars />
                <div className="text-left">
                  <div className="font-[family-name:var(--font-display)] italic text-2xl text-[color:var(--gold-light)] leading-none">4,9<span className="text-[color:var(--cream)]/60 text-lg">/5</span></div>
                  <div className="eyebrow text-[0.6rem] mt-1">787 avis Google</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- LE PLAT SIGNATURE, 3 plats, pin + reveal au scroll ---------- */}
      <section ref={sigRef} className="relative bg-damask-deep hairline hairline-b" style={{ height: "165vh" }}>
        <div className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-5 sm:px-8">
          <div
            className="sig-glow pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(circle at 50% 42%, rgba(201,162,75,0.2), transparent 55%)" }}
            aria-hidden
          />
          <SectionHead eyebrow="Le Plat Signature" title={<>Trois créations, <em>une seule table</em>.</>} />
          <div className="relative mt-10 sm:mt-16 grid grid-cols-3 gap-3 sm:gap-8 md:gap-12 max-w-5xl w-full">
            {SIGNATURE_DISHES.map((d) => (
              <div key={d.name} className="text-center">
                <Arch src={d.img} alt={d.name} className="sig-dish-arch aspect-[3/4]" />
                <h3 className="display italic mt-3 sm:mt-4 text-sm sm:text-xl md:text-2xl text-[color:var(--cream)] leading-tight">
                  {d.name}
                </h3>
                <div className="mt-1 font-[family-name:var(--font-label)] text-[color:var(--gold)] tracking-[0.1em] sm:tracking-[0.15em] text-[0.65rem] sm:text-sm">
                  {d.price}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- À VOTRE GOÛT, 4 catégories ---------- */}
      <section className="py-24 sm:py-32 px-5 sm:px-8">
        <SectionHead
          eyebrow="À votre goût"
          title={<>Quatre envies, <em>une seule adresse</em>.</>}
        >
          <p>Salé, sucré, café : chaque envie a sa page dans la carte.</p>
        </SectionHead>
        <div className="mx-auto max-w-7xl mt-16 grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-10">
          {CRAVINGS.map((c) => (
            <Link key={c.cat} to="/carte" search={{ cat: c.cat }} className="rise group relative block">
              <span
                aria-hidden
                className="pointer-events-none select-none absolute -top-8 -left-2 z-10 display italic text-7xl leading-none text-transparent [-webkit-text-stroke:1px_var(--gold-40)]"
              >
                {c.n}
              </span>
              <Arch src={c.img} alt={c.title} className="aspect-[3/4]" />
              <div className="mt-5 text-center">
                <h3 className="display italic text-xl sm:text-2xl text-[color:var(--cream)] group-hover:text-[color:var(--gold-light)] transition-colors">
                  {c.title}
                </h3>
                <div className="mt-3 inline-flex items-center gap-1 font-[family-name:var(--font-label)] text-[color:var(--gold)] group-hover:text-[color:var(--gold-light)] tracking-[0.15em] text-xs uppercase transition-colors">
                  Découvrir <span aria-hidden>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-14">
          <Link to="/carte" className="btn btn-outline">Voir toute la carte →</Link>
        </div>
      </section>

      {/* ---------- LE SALON ---------- */}
      <section className="py-24 sm:py-32 px-5 sm:px-8">
        <SectionHead eyebrow="Le Salon" title={<>Une <em>ambiance</em> feutrée</>}>
          <p>Velours, dorures, marbre veiné, chandelles : un salon comme on n'en fait plus.</p>
        </SectionHead>
        <div className="mx-auto max-w-5xl mt-16 grid grid-cols-3 gap-5 sm:gap-8 md:gap-12">
          {([
            { src: "/assets/clip_ambiance.mp4", label: "L'ambiance", desc: "Un décor où chaque détail raconte une autre époque." },
            { src: "/assets/clip_plats.mp4",   label: "Les assiettes", desc: "Chaque assiette est dressée comme une sculpture, sur une porcelaine d'un autre temps." },
            { src: "/assets/clip_cafe.mp4",    label: "Le café",      desc: "Torréfié en petits lots, servi avec le soin d'un rituel." },
          ] as const).map((v) => (
            <div key={v.src} className="rise flex flex-col items-center">
              <div className="arch aspect-[9/16] w-full" style={{ background: "var(--garnet-black, var(--garnet-deep))" }}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: "100%", height: "100%", objectFit: "contain", background: "var(--garnet-deep)", display: "block" }}
                >
                  <source src={v.src} type="video/mp4" />
                </video>
              </div>
              <h3 className="display italic mt-4 text-xl sm:text-2xl text-[color:var(--cream)] text-center">{v.label}</h3>
              <p className="mt-2 text-[color:var(--cream)]/65 text-sm text-center hidden sm:block">{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------- REVIEWS (cream) ---------- */}
      <section className="py-24 sm:py-32 bg-[color:var(--cream)] text-[color:var(--ink)]">
        <div className="text-center px-5">
          <div className="eyebrow !text-[color:var(--garnet-mid)]">Ils en parlent</div>
          <h2 className="display italic mt-4 text-5xl sm:text-6xl text-[color:var(--ink)]">
            4,9<span className="text-[color:var(--garnet-mid)]">/5</span> sur <em>787 avis</em>
          </h2>
          <div className="ornament mt-6 !text-[color:var(--garnet-mid)]" style={{ color: "var(--garnet-mid)" }}>
            <span aria-hidden>✦</span>
          </div>
        </div>
        <div className="mt-16 overflow-hidden">
          <div className="reviews-track">
            {[
              { name: "Camille R.", body: "Le décor est à couper le souffle. On se croit dans un conte parisien. La brioche saumon est divine." },
              { name: "Sofia K.", body: "Le meilleur cappuccino du 7ᵉ, et un accueil d'une gentillesse rare. Un incontournable." },
              { name: "Louis M.", body: "Les pancakes Dubaï sont une révélation. J'y retourne dès demain matin." },
              { name: "Inès B.", body: "Un salon magnifique, feutré, tout est fait maison. Coup de cœur." },
              { name: "Théo D.", body: "Ambiance velours et dorures, café de spécialité impeccable. Bravo." },
              { name: "Nour A.", body: "Comme un salon de Damas transporté à Paris. Merveilleux." },
            ].concat([
              { name: "Camille R.", body: "Le décor est à couper le souffle. On se croit dans un conte parisien. La brioche saumon est divine." },
              { name: "Sofia K.", body: "Le meilleur cappuccino du 7ᵉ, et un accueil d'une gentillesse rare. Un incontournable." },
              { name: "Louis M.", body: "Les pancakes Dubaï sont une révélation. J'y retourne dès demain matin." },
            ]).map((r, i) => (
              <figure key={i} className="w-[320px] sm:w-[380px] shrink-0 border-t border-b border-[color:var(--garnet-mid)]/25 py-8 px-2">
                <Stars />
                <blockquote className="mt-3 display italic text-xl text-[color:var(--ink)] leading-snug">
                  « {r.body} »
                </blockquote>
                <figcaption className="mt-4 eyebrow !text-[color:var(--garnet-mid)]">{r.name}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- ADDRESS + MAP ---------- */}
      <section className="find damask">
        <div className="shead">
          <span className="eyebrow">Nous trouver</span>
          <h2>Un salon au cœur du 7ᵉ</h2>
          <Ornament />
        </div>
        <div className="find-in">
          <div className="find-map">
            <span className="pin"><i />Paris 7ᵉ · Tour Eiffel</span>
            <iframe
              title="Plan, La Magie de Paris"
              src="https://www.openstreetmap.org/export/embed.html?bbox=2.29545%2C48.85548%2C2.31045%2C48.86248&layer=mapnik&marker=48.85898%2C2.30295"
              loading="lazy"
            />
          </div>
          <div className="find-card">
            <span className="eyebrow">La Magie de Paris</span>
            <h2>À deux pas de<br />la Tour Eiffel.</h2>
            <span className="find-badge"><i />{BUSINESS.metro}</span>
            <div className="find-rows">
              <div className="find-row"><span className="k">Adresse</span><span className="v">{BUSINESS.address}</span></div>
              <div className="find-row"><span className="k">Horaires</span><span className="v">{BUSINESS.hours}<br />Sans réservation</span></div>
              <div className="find-row"><span className="k">Téléphone</span><span className="v"><a href={BUSINESS.phoneHref}>{BUSINESS.phone}</a></span></div>
            </div>
            <a className="btn btn-gold" href="https://maps.google.com/?q=15+Rue+Dupont+des+Loges,+75007+Paris" target="_blank" rel="noreferrer">Itinéraire →</a>
          </div>
        </div>
      </section>

    </div>
  );
}
