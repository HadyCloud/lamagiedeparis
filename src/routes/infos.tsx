import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Arch, Ornament, SectionHead, BUSINESS, useReveal } from "@/components/brand";
import story from "@/assets/story.jpg";

export const Route = createFileRoute("/infos")({
  head: () => ({
    meta: [
      { title: "Infos pratiques, La Magie de Paris, Paris 7ᵉ" },
      { name: "description", content: "Adresse, horaires et contact de La Magie de Paris, 15 rue Dupont des Loges, 75007 Paris. Tous les jours de 9h à 17h, sans réservation." },
      { property: "og:title", content: "Infos pratiques, La Magie de Paris" },
      { property: "og:description", content: "Nous trouver, nous écrire, nous suivre : un salon à deux pas de la Tour Eiffel." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/infos" },
    ],
    links: [{ rel: "canonical", href: "/infos" }],
  }),
  component: InfosPage,
});

const FAQ = [
  { q: "Prenez-vous des réservations ?", a: "Non, nous fonctionnons sans réservation, tous les jours. En cas d'affluence, nous vous installons dès qu'une table se libère." },
  { q: "Quels sont vos horaires ?", a: "Tous les jours, de 9h à 17h. Le service est continu : vous pouvez venir déjeuner à toute heure." },
  { q: "Est-ce accessible en poussette ou en fauteuil roulant ?", a: "Le salon est de plain-pied et accueille poussettes et fauteuils. N'hésitez pas à nous prévenir à votre arrivée." },
  { q: "Proposez-vous des options végétariennes / sans gluten ?", a: "Oui, plusieurs plats sont naturellement végétariens. Pour les allergies et intolérances, demandez notre carte des allergènes à l'équipe." },
  { q: "Comment venir ?", a: "Métro École Militaire (ligne 8), à 3 minutes à pied. Nous sommes à quelques rues de la Tour Eiffel, dans le 7ᵉ." },
  { q: "Peut-on privatiser le salon ?", a: "Oui, pour des événements en soirée. Écrivez-nous à Lamagiedeparis7@gmail.com avec la date et le nombre d'invités." },
];

const IG_MEDIA: { src: string; type: "video" | "image" }[] = [
  { src: "/videos/ig/ig-1.mp4", type: "video" },
  { src: "/videos/ig/ig-2.mp4", type: "video" },
  { src: "/videos/ig/ig-3.mp4", type: "video" },
  { src: "/videos/ig/ig-4.mp4", type: "video" },
  { src: "/videos/ig/ig-5.mp4", type: "video" },
  { src: "/videos/ig/ig-6.jpg", type: "image" },
  { src: "/videos/ig/ig-7.mp4", type: "video" },
  { src: "/videos/ig/ig-8.mp4", type: "video" },
];

function InfosPage() {
  const ref = useReveal();
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div ref={ref} className="bg-damask">
      {/* Nous trouver, Adresse et accès */}
      <section className="find damask">
        <div className="shead">
          <span className="eyebrow">Nous trouver</span>
          <h2>Adresse &amp; accès</h2>
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
              <div className="find-row"><span className="k">Email</span><span className="v"><a href={`mailto:${BUSINESS.email}`}>{BUSINESS.email}</a></span></div>
              <div className="find-row"><span className="k">Réseaux</span><span className="v"><a href={BUSINESS.instagramUrl} target="_blank" rel="noreferrer">Instagram</a> · <a href={BUSINESS.tiktokUrl} target="_blank" rel="noreferrer">TikTok</a></span></div>
              <div className="find-row"><span className="k">Google</span><span className="v"><a href={BUSINESS.googleMapsUrl} target="_blank" rel="noreferrer">Voir la fiche</a></span></div>
            </div>
            <a className="btn btn-gold" href="https://maps.google.com/?q=15+Rue+Dupont+des+Loges,+75007+Paris" target="_blank" rel="noreferrer">Itinéraire →</a>
          </div>
        </div>
      </section>

      {/* À propos */}
      <section className="py-20 sm:py-28 px-5 sm:px-8 bg-damask-deep hairline hairline-b">
        <div className="mx-auto max-w-7xl grid md:grid-cols-2 gap-14 md:gap-24 items-center">
          <div className="rise">
            <Arch src={story} alt="Détail du salon La Magie de Paris" className="aspect-[4/5] max-w-md mx-auto" />
          </div>
          <div className="rise">
            <div className="eyebrow">À propos</div>
            <h2 className="display italic mt-4 text-5xl text-[color:var(--cream)]">Une histoire de <em>salon</em>.</h2>
            <Ornament className="mt-6 justify-start" />
            <div className="mt-6 space-y-4 text-[color:var(--cream)]/80 leading-relaxed">
              <p>
                Chaque matin, le chef choisit ses produits un par un, puis compose chaque plat comme une petite sculpture, posée avec soin sur une porcelaine ancienne.
              </p>
              <p>
                Rien n'est préparé à l'avance : les brioches sont toastées à la commande, les pancakes tournés au moment de servir, le café torréfié en petits lots. Une cuisine lente, dans un décor qui ne l'est pas moins.
              </p>
              <p className="italic text-[color:var(--gold-light)]">
                « Un salon où l'on prend le temps, plat après plat. »
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Instagram */}
      <section className="py-20 sm:py-28 px-5 sm:px-8">
        <SectionHead eyebrow={`Instagram, ${BUSINESS.instagram}`} title={<>Le salon <em>en images</em></>}>
          <p>
            Suivez-nous pour les nouveautés, les plats du jour et l'ambiance.
          </p>
        </SectionHead>
        <div className="mx-auto max-w-6xl mt-14 grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {IG_MEDIA.map((m, i) => (
            <a
              key={m.src}
              href={BUSINESS.instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="block group aspect-square overflow-hidden border border-[color:var(--gold)]/25 hover:border-[color:var(--gold)] transition-colors"
              aria-label={`Publication Instagram ${i + 1}`}
            >
              {m.type === "video" ? (
                <video
                  src={m.src}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <img
                  src={m.src}
                  alt=""
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              )}
            </a>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <a href={BUSINESS.instagramUrl} target="_blank" rel="noreferrer" className="btn btn-outline">Suivre sur Instagram</a>
          <a href={BUSINESS.tiktokUrl} target="_blank" rel="noreferrer" className="btn btn-outline">Suivre sur TikTok</a>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 sm:py-28 px-5 sm:px-8 bg-damask-deep hairline hairline-b">
        <SectionHead eyebrow="FAQ" title={<>Questions <em>fréquentes</em></>} />
        <div className="mx-auto max-w-3xl mt-14">
          {FAQ.map((f, i) => {
            const open = openIdx === i;
            return (
              <div key={i} className="border-t border-[color:var(--gold)]/30 last:border-b">
                <button
                  type="button"
                  aria-expanded={open}
                  onClick={() => setOpenIdx(open ? null : i)}
                  className="w-full flex items-center justify-between gap-6 py-6 text-left group"
                >
                  <span className="font-[family-name:var(--font-display)] italic text-xl sm:text-2xl text-[color:var(--cream)] group-hover:text-[color:var(--gold-light)] transition-colors">
                    {f.q}
                  </span>
                  <span
                    aria-hidden
                    className={`text-[color:var(--gold)] text-2xl transition-transform ${open ? "rotate-45" : ""}`}
                  >
                    +
                  </span>
                </button>
                <div
                  className={`grid transition-[grid-template-rows] duration-300 ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
                >
                  <div className="overflow-hidden">
                    <p className="pb-6 text-[color:var(--cream)]/75 max-w-2xl">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}