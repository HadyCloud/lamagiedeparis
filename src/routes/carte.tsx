import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Ornament, SectionHead, useReveal, Arch } from "@/components/brand";
import catBrioches from "@/assets/cat-brioches.jpg";
import catPancakesSales from "@/assets/cat-pancakes-sales.jpg";
import catPancakesSucres from "@/assets/cat-pancakes-sucres.jpg";
import catDouceurs from "@/assets/cat-douceurs.jpg";
import catChaudes from "@/assets/cat-chaudes.jpg";
import catGlacees from "@/assets/cat-glacees.jpg";
import sigSaumon from "@/assets/sig-saumon.jpg";
import sigDubai from "@/assets/sig-dubai.jpg";
import dishBriocheTruffe from "@/assets/dish-brioche-truffe.jpg";
import dishBriocheFromage from "@/assets/dish-brioche-fromage-tresse.jpg";
import dishPancakesSaumon from "@/assets/dish-pancakes-saumon.jpg";
import dishPancakesFruits from "@/assets/dish-pancakes-fruits.jpg";

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
  name: string;
  desc?: string;
  price: string;
  img?: string;
  signature?: boolean;
  glutenFree?: boolean;
  vegetarian?: boolean;
  lactoseFree?: boolean;
};
type Category = { id: string; roman: string; label: string; kind: "food" | "drink"; img: string; dishes: Dish[]; note?: string };

const CATEGORIES: Category[] = [
  {
    id: "brioches",
    roman: "I.",
    label: "Brioches Toastées",
    kind: "food",
    img: catBrioches,
    dishes: [
      { name: "Brioche Toastée au Saumon", desc: "Écrasé d'avocat, saumon fumé, pousses d'épinards, roquette, œuf poché de plein air, sauce hollandaise, brioche maison chaude.", price: "19,90 €", img: sigSaumon, signature: true, glutenFree: false, vegetarian: false, lactoseFree: false },
      { name: "Brioche Toastée à la Truffe", desc: "Écrasé d'avocat, champignons poêlés à la truffe, pousses d'épinards, roquette, œuf poché plein air, sauce hollandaise, brioche maison chaude.", price: "19,90 €", img: dishBriocheTruffe, glutenFree: false, vegetarian: true, lactoseFree: false },
      { name: "Brioche Toastée aux Crevettes", desc: "Écrasé d'avocat, crevettes, ciboulette, aneth, citron, sauce blanche maison, vinaigrette au yuzu, œuf poché plein air, brioche maison chaude.", price: "16,50 €", glutenFree: false, vegetarian: false, lactoseFree: false },
      { name: "Brioche Toastée Poulet", desc: "Écrasé d'avocat, filet de poulet rôti, pesto, tomates séchées, pousses d'épinards, roquette, sauce hollandaise à la truffe.", price: "16,50 €", glutenFree: false, vegetarian: false, lactoseFree: false },
      { name: "Brioche Toastée Fromage Tressé", desc: "Écrasé d'avocat, pesto, fromage tressé, tomates cerises et confites, œuf poché de plein air, pousses d'épinard, roquette, sauce hollandaise.", price: "14,90 €", img: dishBriocheFromage, glutenFree: false, vegetarian: true, lactoseFree: false },
      { name: "Brioche Toastée au Houmous", desc: "Purée de pois chiches, citron, curcuma, poivre sauvage, grenade, tomates confites, concombre, brioche maison chaude.", price: "14,90 €", glutenFree: false, vegetarian: true, lactoseFree: false },
      { name: "Brioche Toastée au Labneh", desc: "Écrasé d'avocat, labneh, tomates cerises, concombre, menthe, roquette, huile d'olive, paprika, œuf poché plein air.", price: "13,90 €", glutenFree: false, vegetarian: true, lactoseFree: false },
    ],
  },
  {
    id: "pancakes-sales",
    roman: "II.",
    label: "Pancakes Salés",
    kind: "food",
    img: catPancakesSales,
    dishes: [
      { name: "Pancakes Saumon", desc: "Écrasé d'avocat, sirop d'érable, saumon fumé, épinards frais, œuf poché de plein air.", price: "18,90 €", img: dishPancakesSaumon, glutenFree: false, vegetarian: false, lactoseFree: false },
      { name: "Pancakes Crevettes", desc: "Écrasé d'avocat, crevettes, ciboulette, citron, mayo, pousses d'épinards, roquette, vinaigrette au yuzu, œuf poché plein air.", price: "18,90 €", glutenFree: false, vegetarian: false, lactoseFree: false },
      { name: "Pancakes Labneh", desc: "Écrasé d'avocat, labneh, tomates cerises, concombre, menthe, roquette, huile d'olive, paprika, œuf poché plein air.", price: "13,90 €", glutenFree: false, vegetarian: true, lactoseFree: false },
    ],
    note: "Suppléments : purée d'avocat +3 € · crevettes ou saumon +4 € · œuf poché +1,50 €",
  },
  {
    id: "pancakes-sucres",
    roman: "III.",
    label: "Pancakes Sucrés",
    kind: "food",
    img: catPancakesSucres,
    dishes: [
      { name: "Pancakes Dubaï", desc: "Crème pistache maison, coulis de chocolat Valrhona, pistaches et kunafa grillés.", price: "2p 13,90 € · 3p 15,50 €", img: sigDubai, signature: true, glutenFree: false, vegetarian: true, lactoseFree: false },
      { name: "Pancakes Fruits Frais", desc: "Sirop d'érable, fruits frais de saison, noix de pécan torréfiées, crème fouettée à la vanille de Madagascar.", price: "2p 15 € · 3p 16,50 €", img: dishPancakesFruits, glutenFree: false, vegetarian: true, lactoseFree: false },
      { name: "Pancakes Crème Noisettes", desc: "Crème noisette gourmande, crème fouettée à la vanille de Madagascar.", price: "2p 13 € · 3p 14,50 €", glutenFree: false, vegetarian: true, lactoseFree: false },
    ],
  },
  {
    id: "douceurs",
    roman: "IV.",
    label: "Douceurs & Glaces Maison",
    kind: "food",
    img: catDouceurs,
    dishes: [
      { name: "Cookie Chocolat au Lait & Fleur de Sel", desc: "Avec noix de pécan.", price: "3,50 €", glutenFree: false, vegetarian: true, lactoseFree: false },
      { name: "Cookie Pistache & Chocolat au Lait", desc: "Le plus gourmand de nos cookies.", price: "4,00 €", glutenFree: false, vegetarian: true, lactoseFree: false },
      { name: "Cookie Chocolat Noir & Fleur de Sel", desc: "Intense et fondant.", price: "3,50 €", glutenFree: false, vegetarian: true, lactoseFree: false },
      { name: "Croissant", desc: "Pur beurre, doré au four.", price: "2,00 €", glutenFree: false, vegetarian: true, lactoseFree: false },
      { name: "Glace Maison (1 boule)", desc: "Disponible uniquement en été. Extra pistache +1,50 €.", price: "3,50 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { name: "Glace Maison (2 boules)", desc: "Disponible uniquement en été.", price: "7,00 €", glutenFree: true, vegetarian: true, lactoseFree: false },
    ],
  },
  {
    id: "chaudes",
    roman: "V.",
    label: "Boissons Chaudes",
    kind: "drink",
    img: catChaudes,
    dishes: [
      { name: "Espresso", price: "2,50 €", glutenFree: true, vegetarian: true, lactoseFree: true },
      { name: "Double Espresso", price: "3,00 €", glutenFree: true, vegetarian: true, lactoseFree: true },
      { name: "Cappuccino", price: "5,50 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { name: "Café Latte", price: "5,00 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { name: "Flat White (double espresso)", price: "4,00 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { name: "Café Mocha au Chocolat", price: "7,00 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { name: "Chaï Latte", price: "5,50 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { name: "Matcha Latte", price: "5,00 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { name: "Matcha Latte au Sésame Noir", price: "6,00 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { name: "Matcha Latte au Collagène & Sésame Noir", price: "6,50 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { name: "Chocolat Chaud", price: "6,50 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { name: "Chocolat Viennois", price: "7,00 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { name: "Thé & Infusions", desc: "Vert Sencha, noir Earl Grey, noir Breakfast, vert à la menthe, rooibos vahiné.", price: "5,00 €", glutenFree: true, vegetarian: true, lactoseFree: true },
    ],
  },
  {
    id: "glacees",
    roman: "VI.",
    label: "Versions Glacées & Fraîches",
    kind: "drink",
    img: catGlacees,
    dishes: [
      { name: "Iced Matcha Latte Fraise", desc: "Le latte signature de la maison.", price: "6,00 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { name: "Iced Café Latte", price: "5,00 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { name: "Iced Américano", price: "4,00 €", glutenFree: true, vegetarian: true, lactoseFree: true },
      { name: "Iced Chaï Latte", price: "5,50 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { name: "Iced Matcha Latte", price: "5,50 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { name: "Chocolat Glacé", price: "6,00 €", glutenFree: true, vegetarian: true, lactoseFree: false },
      { name: "Thé Glacé Pêche", price: "5,00 €", glutenFree: true, vegetarian: true, lactoseFree: true },
      { name: "Virgin Mojito", price: "5,50 €", glutenFree: true, vegetarian: true, lactoseFree: true },
      { name: "Virgin Mojito Fraise", price: "6,00 €", glutenFree: true, vegetarian: true, lactoseFree: true },
      { name: "Jus d'Orange Pressé", price: "6,00 €", glutenFree: true, vegetarian: true, lactoseFree: true },
      { name: "Jus d'Orange, Hibiscus, Fleur d'Oranger", price: "5,50 €", glutenFree: true, vegetarian: true, lactoseFree: true },
      { name: "Jus de Grenade Bio", desc: "Sans sucres ajoutés.", price: "5,50 €", glutenFree: true, vegetarian: true, lactoseFree: true },
    ],
    note: "Suppléments boissons : double shot +0,50 € · lait végétal +0,50 € · sirop caramel, vanille ou noisette +0,50 €",
  },
];

function CartePage() {
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

  return (
    <div ref={ref} className="bg-damask">
      {/* Header */}
      <section className="pt-20 pb-16 px-5 sm:px-8 text-center hairline-b">
        <SectionHead
          eyebrow="La Carte"
          title={<>Tout est <em>fait maison</em>.</>}
        >
          <p>Chaque plat est une petite sculpture, composée sur place avec des produits choisis chaque matin.</p>
        </SectionHead>
      </section>

      <section className="mx-auto max-w-7xl px-5 sm:px-8 py-16">
        {/* Mobile horizontal photo scroller */}
        <div
          className="md:hidden -mx-5 px-5 flex gap-4 overflow-x-auto pb-4 hairline-b"
          role="tablist"
          aria-label="Catégories"
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
                  {c.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="grid md:grid-cols-[260px_1fr] gap-10 lg:gap-16 mt-10 md:mt-0">
          {/* Desktop left rail */}
          <aside className="hidden md:block sticky top-28 self-start" role="tablist" aria-label="Catégories">
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
                          {c.label}
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
                <h2 className="display italic text-4xl sm:text-5xl text-[color:var(--cream)]">{current.label}</h2>
              </div>
              <div className="flex flex-wrap gap-2 shrink-0">
                {(
                  [
                    { key: "glutenFree", label: "Sans gluten" },
                    { key: "vegetarian", label: "Végétarien" },
                    { key: "lactoseFree", label: "Sans lactose" },
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
                {anyFilterActive
                  ? "Aucun plat ne correspond à ces filtres dans cette catégorie. Essayez une autre catégorie ou retirez un filtre."
                  : "Aucun plat dans cette catégorie pour le moment."}
              </p>
            ) : current.kind === "food" ? (
              <div className="mt-12 grid sm:grid-cols-2 gap-x-10 gap-y-12">
                {dishes.map((d) => (
                  <article key={d.name} className="rise flex gap-5 items-start">
                    {d.img ? (
                      <div className="w-24 sm:w-28 shrink-0">
                        <Arch src={d.img} alt={d.name} className="aspect-[3/4]" thin />
                      </div>
                    ) : null}
                    <div className="flex-1 min-w-0 pt-1">
                      {d.signature ? (
                        <div className="eyebrow text-[0.6rem] mb-1">Signature</div>
                      ) : null}
                      <div className="leader">
                        <span className="dish font-[family-name:var(--font-display)] italic text-xl leading-tight">{d.name}</span>
                        <span className="dots" aria-hidden />
                        <span className="price">{d.price}</span>
                      </div>
                      {d.desc ? (
                        <p className="mt-2 text-[color:var(--cream)]/70 text-sm italic">{d.desc}</p>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="mt-12 grid sm:grid-cols-2 gap-x-14 gap-y-5">
                {dishes.map((d) => (
                  <div key={d.name} className="rise">
                    <div className="leader">
                      <span className="dish font-[family-name:var(--font-display)] italic text-xl">{d.name}</span>
                      <span className="dots" aria-hidden />
                      <span className="price">{d.price}</span>
                    </div>
                    {d.desc ? (
                      <p className="mt-1 text-[color:var(--cream)]/60 text-xs italic">{d.desc}</p>
                    ) : null}
                  </div>
                ))}
              </div>
            )}

            {current.note ? (
              <p className="mt-10 text-xs text-[color:var(--gold-light)]/80 italic">{current.note}</p>
            ) : null}

            <p className="mt-16 text-xs text-[color:var(--cream)]/50 italic border-t border-[color:var(--gold)]/25 pt-6">
              Allergènes : la liste des allergènes présents dans nos plats est disponible sur demande.
              Tous nos plats sont préparés sur place ; des traces peuvent subsister. Prix service compris.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}