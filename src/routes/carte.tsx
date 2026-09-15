import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Ornament, SectionHead, useReveal, Arch, BUSINESS } from "@/components/brand";
import catBrioches from "@/assets/cat-brioches.png";
import catPancakesSales from "@/assets/cat-pancakes-sales.png";
import catPancakesSucres from "@/assets/cat-pancakes-sucres.png";
import catCookiesDouceurs from "@/assets/cat-cookies-douceurs.jpg";
import catChaudes from "@/assets/cat-chaudes.jpg";
import catFraiches from "@/assets/cat-fraiches.jpg";
import catGlacees from "@/assets/cat-glacees.jpg";
import briocheHoumous from "@/assets/brioche-houmous.png";
import briocheSaumon from "@/assets/brioche-saumon.png";
import briocheCrevettes from "@/assets/brioche-crevettes.png";
import briocheFromageTresse from "@/assets/brioche-fromage-tresse.png";
import briochePoulet from "@/assets/brioche-poulet.png";
import briocheTruffe from "@/assets/brioche-truffe.png";
import briocheLabneh from "@/assets/brioche-labneh.png";
import pancakesSaumon from "@/assets/pancakes-saumon.png";
import pancakesCrevettes from "@/assets/pancakes-crevettes.png";
import pancakesLabneh from "@/assets/pancakes-labneh.png";
import pancakesNoisette from "@/assets/pancakes-noisette.png";
import pancakesFruitsFrais from "@/assets/pancakes-fruits-frais.png";
import pancakesDubai from "@/assets/pancakes-dubai.png";

export const Route = createFileRoute("/carte")({
  validateSearch: (search: Record<string, unknown>): { cat?: string } => ({
    cat: typeof search.cat === "string" ? search.cat : undefined,
  }),
  head: () => ({
    meta: [
      { title: "La Carte, La Magie de Paris" },
      { name: "description", content: "Brioches toastées, pancakes salés et sucrés, douceurs maison et café de spécialité. Chaque plat est composé sur place, avec des produits choisis chaque matin." },
      { property: "og:title", content: "La Carte, La Magie de Paris" },
      { property: "og:description", content: "La carte complète du salon, entre héritage syrien et tradition parisienne." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/carte" },
    ],
    links: [{ rel: "canonical", href: "/carte" }],
  }),
  component: CartePage,
});

type Dish = {
  key: string;
  price: string;
  img?: string;
  signature?: boolean;
  glutenFree?: boolean;
  vegetarian?: boolean;
  lactoseFree?: boolean;
};
type Category = { id: string; roman: string; kind: "food" | "drink"; img: string; dishes: Dish[]; noteKey?: string };

const CATEGORIES: Category[] = [
  {
    id: "brioches",
    roman: "I.",
    kind: "food",
    img: catBrioches,
    dishes: [
      { key: "houmous", price: "14,90 €", img: briocheHoumous, glutenFree: false, vegetarian: true, lactoseFree: false },
      { key: "saumon", price: "14,90 €", img: briocheSaumon, signature: true, glutenFree: false, vegetarian: false, lactoseFree: false },
      { key: "crevettes", price: "18,90 €", img: briocheCrevettes, glutenFree: false, vegetarian: false, lactoseFree: false },
      { key: "fromageTresse", price: "14,90 €", img: briocheFromageTresse, glutenFree: false, vegetarian: true, lactoseFree: false },
      { key: "poulet", price: "16,50 €", img: briochePoulet, glutenFree: false, vegetarian: false, lactoseFree: false },
      { key: "truffe", price: "18,90 €", img: briocheTruffe, glutenFree: false, vegetarian: true, lactoseFree: false },
      { key: "labneh", price: "13,90 €", img: briocheLabneh, glutenFree: false, vegetarian: true, lactoseFree: false },
    ],
  },
  {
    id: "pancakes-sales",
    roman: "II.",
    kind: "food",
    img: catPancakesSales,
    dishes: [
      { key: "saumon", price: "2p 13,90 € · 3p 15,50 €", img: pancakesSaumon, glutenFree: false, vegetarian: false, lactoseFree: false },
      { key: "crevettes", price: "18,90 €", img: pancakesCrevettes, glutenFree: false, vegetarian: false, lactoseFree: false },
      { key: "labneh", price: "13,90 €", img: pancakesLabneh, glutenFree: false, vegetarian: true, lactoseFree: false },
    ],
    noteKey: "pancakes-sales",
  },
  {
    id: "pancakes-sucres",
    roman: "III.",
    kind: "food",
    img: catPancakesSucres,
    dishes: [
      { key: "cremeNoisette", price: "2p 13,00 € · 3p 14,50 €", img: pancakesNoisette, glutenFree: false, vegetarian: true, lactoseFree: false },
      { key: "fruitsFrais", price: "2p 13,00 € · 3p 14,50 €", img: pancakesFruitsFrais, glutenFree: false, vegetarian: true, lactoseFree: false },
      { key: "dubai", price: "2p 15,00 € · 3p 16,50 €", img: pancakesDubai, signature: true, glutenFree: false, vegetarian: true, lactoseFree: false },
    ],
  },
  {
    id: "cookies",
    roman: "IV.",
    kind: "food",
    img: catCookiesDouceurs,
    dishes: [
      { key: "pecan", price: "4,00 €", glutenFree: false, vegetarian: true, lactoseFree: false },
      { key: "pistache", price: "4,00 €", glutenFree: false, vegetarian: true, lactoseFree: false },
      { key: "chocoBlancNoir", price: "3,50 €", glutenFree: false, vegetarian: true, lactoseFree: false },
      { key: "croissant", price: "2,00 €", glutenFree: false, vegetarian: true, lactoseFree: false },
    ],
  },
  {
    id: "chaudes",
    roman: "V.",
    kind: "drink",
    img: catChaudes,
    dishes: [
      { key: "espresso", price: "2,50 €", glutenFree: true, vegetarian: true, lactoseFree: true },
      { key: "doubleEspresso", price: "4,00 €", glutenFree: true, vegetarian: true, lactoseFree: true },
      { key: "americano", price: "4,00 €", glutenFree: true, vegetarian: true, lactoseFree: true },
      { key: "macchiato", price: "3,00 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { key: "flatWhite", price: "5,50 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { key: "latte", price: "5,00 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { key: "cappuccino", price: "4,50 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { key: "chaiLatteCafe", price: "5,50 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { key: "chaiLatte", price: "5,00 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { key: "matchaLatte", price: "5,50 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { key: "matchaLatteSesame", price: "6,00 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { key: "matchaLatteCollagene", price: "6,50 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { key: "mochaChocolat", price: "7,00 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { key: "chocolatViennois", price: "7,00 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { key: "chocolatChaud", price: "4,50 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { key: "theInfusions", price: "5,00 €", glutenFree: true, vegetarian: true, lactoseFree: true },
    ],
    noteKey: "chaudesGlacees",
  },
  {
    id: "fraiches",
    roman: "VI.",
    kind: "drink",
    img: catFraiches,
    dishes: [
      { key: "virginMojito", price: "5,50 €", glutenFree: true, vegetarian: true, lactoseFree: true },
      { key: "virginMojitoFraise", price: "6,00 €", glutenFree: true, vegetarian: true, lactoseFree: true },
      { key: "jusOrangeHibiscus", price: "6,00 €", glutenFree: true, vegetarian: true, lactoseFree: true },
      { key: "jusGrenadeBio", price: "6,00 €", glutenFree: true, vegetarian: true, lactoseFree: true },
      { key: "jusOrangePresse", price: "5,50 €", glutenFree: true, vegetarian: true, lactoseFree: true },
      { key: "eauMinerale", price: "2,50 €", glutenFree: true, vegetarian: true, lactoseFree: true },
      { key: "eauGazeuse", price: "4,00 €", glutenFree: true, vegetarian: true, lactoseFree: true },
      { key: "cocaCola", price: "3,50 €", glutenFree: true, vegetarian: true, lactoseFree: true },
    ],
  },
  {
    id: "glacees",
    roman: "VII.",
    kind: "drink",
    img: catGlacees,
    dishes: [
      { key: "matchaLatteGlace", price: "5,00 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { key: "matchaLatteGlaceFraise", price: "6,00 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { key: "matchaLatteGlaceSesame", price: "6,00 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { key: "matchaLatteGlaceCollagene", price: "6,50 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { key: "theGlacePeche", price: "5,00 €", glutenFree: true, vegetarian: true, lactoseFree: true },
      { key: "americanoGlace", price: "4,00 €", glutenFree: true, vegetarian: true, lactoseFree: true },
      { key: "flatWhiteGlace", price: "5,50 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { key: "latteGlace", price: "5,00 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { key: "chaiLatteCafeGlace", price: "5,50 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { key: "chaiLatteGlace", price: "5,00 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { key: "chocolatGlace", price: "7,00 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { key: "mochaChocolatGlace", price: "7,00 €", glutenFree: true, vegetarian: true, lactoseFree: false },
    ],
    noteKey: "chaudesGlacees",
  },
];

function CartePage() {
  const { t } = useTranslation();
  const { cat } = Route.useSearch();
  const initial = CATEGORIES.some((c) => c.id === cat) ? (cat as string) : CATEGORIES[0].id;
  const [active, setActive] = useState<string>(initial);
  const [filters, setFilters] = useState({ glutenFree: false, vegetarian: false, lactoseFree: false });
  const current = CATEGORIES.find((c) => c.id === active)!;
  const dishes = current.dishes.filter((d) => {
    if (filters.glutenFree && !d.glutenFree) return false;
    if (filters.vegetarian && !d.vegetarian) return false;
    if (filters.lactoseFree && !d.lactoseFree) return false;
    return true;
  });
  const anyFilterActive = filters.glutenFree || filters.vegetarian || filters.lactoseFree;
  const ref = useReveal();
  const dishName = (categoryId: string, key: string) => t(`carte.dishes.${categoryId}.${key}.name`);
  const dishDesc = (categoryId: string, key: string) => t(`carte.dishes.${categoryId}.${key}.desc`, { defaultValue: "" });

  return (
    <div ref={ref} className="bg-damask">
      {/* Header */}
      <section className="pt-20 pb-16 px-5 sm:px-8 text-center hairline-b">
        <SectionHead
          eyebrow={t("carte.header.eyebrow")}
          title={<>{t("carte.header.titlePre")}<em>{t("carte.header.titleEm")}</em>{t("carte.header.titlePost")}</>}
        >
          <p>{t("carte.header.subtitle")}</p>
        </SectionHead>
        <a
          href={BUSINESS.googleReviewUrl}
          target="_blank"
          rel="noreferrer"
          className="btn btn-outline mt-8 inline-flex"
        >
          {t("common.reviewButton")}
        </a>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        {/* Mobile horizontal photo scroller — sticky so it stays reachable while the dishes below scroll */}
        <div
          className="md:hidden sticky top-[77px] z-30 -mx-5 px-5 py-3 flex gap-4 overflow-x-auto bg-[color:var(--garnet)] hairline-b"
          role="tablist"
          aria-label={t("carte.categoriesLabel")}
        >
          {CATEGORIES.map((c) => {
            const isActive = c.id === active;
            return (
              <button
                key={c.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(c.id)}
                className={`flex flex-col items-center gap-2 w-20 shrink-0 rounded-md px-2 py-2 border transition-colors duration-300 ${
                  isActive
                    ? "cat-active border-[color:var(--gold)] bg-[color:var(--gold-15)]"
                    : "border-transparent"
                }`}
              >
                <div className="cat-circle">
                  <img src={c.img} alt="" loading="lazy" />
                </div>
                <span className="cat-label font-[family-name:var(--font-label)] uppercase tracking-[0.2em] text-[0.6rem] text-[color:var(--cream)]/70 text-center leading-tight">
                  {t(`carte.categoryLabels.${c.id}`)}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-[260px_1fr] gap-10 lg:gap-16 mt-10 md:mt-0">
          {/* Desktop left rail */}
          <aside className="hidden md:block sticky top-28 self-start" role="tablist" aria-label={t("carte.categoriesLabel")}>
            <ul className="flex flex-col gap-3">
              {CATEGORIES.map((c) => {
                const isActive = c.id === active;
                return (
                  <li key={c.id}>
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => setActive(c.id)}
                      className={`flex items-center gap-4 group text-left w-full rounded-md px-4 py-3 border transition-colors duration-300 ${
                        isActive
                          ? "cat-active border-[color:var(--gold)] bg-[color:var(--gold-15)]"
                          : "border-transparent hover:border-[color:var(--gold-40)]"
                      }`}
                    >
                      <div className="cat-circle">
                        <img src={c.img} alt="" loading="lazy" />
                      </div>
                      <div>
                        <div className="font-[family-name:var(--font-label)] text-[color:var(--gold)] text-xs tracking-[0.2em]">{c.roman}</div>
                        <div className="cat-label font-[family-name:var(--font-display)] italic text-2xl text-[color:var(--cream)] group-hover:text-[color:var(--gold-light)] transition-colors">
                          {t(`carte.categoryLabels.${c.id}`)}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Content */}
          <div>
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <div className="flex items-baseline gap-4">
                <span className="font-[family-name:var(--font-label)] text-[color:var(--gold)] tracking-[0.25em]">{current.roman}</span>
                <h2 className="display italic text-4xl sm:text-5xl text-[color:var(--cream)]">{t(`carte.categoryLabels.${current.id}`)}</h2>
              </div>
              <div className="flex flex-wrap gap-2 shrink-0">
                {(
                  [
                    { key: "glutenFree", label: t("carte.filters.glutenFree") },
                    { key: "vegetarian", label: t("carte.filters.vegetarian") },
                    { key: "lactoseFree", label: t("carte.filters.lactoseFree") },
                  ] as const
                ).map((f) => {
                  const on = filters[f.key];
                  return (
                    <button
                      key={f.key}
                      type="button"
                      onClick={() => setFilters((prev) => ({ ...prev, [f.key]: !prev[f.key] }))}
                      aria-pressed={on}
                      className={`rounded-full border px-2.5 py-1 font-[family-name:var(--font-label)] text-[0.55rem] uppercase tracking-[0.1em] transition-colors ${
                        on
                          ? "border-[color:var(--gold)] bg-[color:var(--gold-15)] text-[color:var(--gold-light)]"
                          : "border-[color:var(--gold)]/40 text-[color:var(--cream)]/70 hover:border-[color:var(--gold)]"
                      }`}
                    >
                      {f.label}
                    </button>
                  );
                })}
              </div>
            </div>
            <Ornament className="mt-6 justify-start" />

            {dishes.length === 0 ? (
              <p className="mt-12 text-[color:var(--cream)]/60 italic">
                {anyFilterActive ? t("carte.empty.filtered") : t("carte.empty.none")}
              </p>
            ) : current.kind === "food" ? (
              <div className="mt-12 grid sm:grid-cols-2 gap-x-10 gap-y-12">
                {dishes.map((d) => {
                  const name = dishName(current.id, d.key);
                  const desc = dishDesc(current.id, d.key);
                  return (
                    <article key={d.key} className="rise flex gap-5 items-start">
                      {d.img ? (
                        <div className="w-24 sm:w-28 shrink-0">
                          <Arch src={d.img} alt={name} className="aspect-[3/4]" thin />
                        </div>
                      ) : null}
                      <div className="flex-1 min-w-0 pt-1">
                        {d.signature ? (
                          <div className="eyebrow text-[0.6rem] mb-1">{t("common.signature")}</div>
                        ) : null}
                        <div className="leader">
                          <span className="dish font-[family-name:var(--font-display)] italic text-xl leading-tight">{name}</span>
                          <span className="dots" aria-hidden />
                          <span className="price">{d.price}</span>
                        </div>
                        {desc ? (
                          <p className="mt-2 text-[color:var(--cream)]/70 text-sm italic">{desc}</p>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="mt-12 grid sm:grid-cols-2 gap-x-14 gap-y-5">
                {dishes.map((d) => {
                  const name = dishName(current.id, d.key);
                  const desc = dishDesc(current.id, d.key);
                  return (
                    <div key={d.key} className="rise">
                      <div className="leader">
                        <span className="dish font-[family-name:var(--font-display)] italic text-xl">{name}</span>
                        <span className="dots" aria-hidden />
                        <span className="price">{d.price}</span>
                      </div>
                      {desc ? (
                        <p className="mt-1 text-[color:var(--cream)]/60 text-xs italic">{desc}</p>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            )}

            {current.noteKey ? (
              <p className="mt-10 text-xs text-[color:var(--gold-light)]/80 italic">{t(`carte.notes.${current.noteKey}`)}</p>
            ) : null}

            <p className="mt-16 text-xs text-[color:var(--cream)]/50 italic border-t border-[color:var(--gold)]/25 pt-6">
              {t("carte.allergens")}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}