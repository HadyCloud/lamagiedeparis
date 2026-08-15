import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav, Footer, Ticker } from "@/components/brand";

function NotFoundComponent() {
  return (
    <div className="min-h-screen bg-damask-deep flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="eyebrow">Introuvable</div>
        <h1 className="display italic text-7xl mt-4 text-[color:var(--cream)]">404</h1>
        <p className="mt-4 text-[color:var(--cream)]/70">
          Cette page n'existe plus. Retournons au salon.
        </p>
        <Link to="/" className="btn btn-gold mt-8 inline-flex">Retour à l'accueil</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="min-h-screen bg-damask-deep flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="eyebrow">Une contrariété</div>
        <h1 className="display italic text-4xl mt-4 text-[color:var(--cream)]">Cette page n'a pas su se présenter</h1>
        <p className="mt-4 text-[color:var(--cream)]/70">
          Rafraîchissez la page ou revenez à l'accueil.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn btn-gold"
          >
            Réessayer
          </button>
          <a href="/" className="btn btn-outline">Accueil</a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { name: "theme-color", content: "#37070F" },
      { title: "La Magie de Paris, brunch et café de spécialité, Paris 7ᵉ" },
      { name: "description", content: "Un salon de brunch entre Damas et Paris, chaque plat composé comme une sculpture. Ouvert tous les jours de 9h à 17h, sans réservation. 15 rue Dupont des Loges, Paris 7ᵉ." },
      { name: "author", content: "La Magie de Paris" },
      { property: "og:site_name", content: "La Magie de Paris" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", type: "image/x-icon" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400;1,500;1,600&family=Cinzel:wght@400;500;600&family=EB+Garamond:ital,wght@0,400;0,500;1,400&display=swap" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Restaurant",
          name: "La Magie de Paris",
          image: "https://id-preview--965de17b-78f7-4c72-978c-61f060cc7bcc.lovable.app/",
          servesCuisine: ["Brunch", "Café de spécialité", "Français"],
          priceRange: "€€",
          address: {
            "@type": "PostalAddress",
            streetAddress: "15 rue Dupont des Loges",
            postalCode: "75007",
            addressLocality: "Paris",
            addressCountry: "FR",
          },
          telephone: "+33698751886",
          email: "Lamagiedeparis7@gmail.com",
          openingHours: "Mo-Su 09:00-17:00",
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "4.9",
            reviewCount: "787",
          },
          sameAs: [
            "https://instagram.com/lamagiedeparis7",
            "https://tiktok.com/@lamagiedeparis7",
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <Ticker />
      <Nav />
      <main>
        <Outlet />
      </main>
      <Footer />
    </QueryClientProvider>
  );
}
