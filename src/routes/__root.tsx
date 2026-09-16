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
import { useTranslation } from "react-i18next";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { Nav, Footer, Ticker } from "@/components/brand";
import i18n, { applyDetectedLanguage } from "@/i18n";

function NotFoundComponent() {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen bg-damask-deep flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="eyebrow">{t("notFound.eyebrow")}</div>
        <h1 className="display italic text-7xl mt-4 text-[color:var(--cream)]">{t("notFound.title")}</h1>
        <p className="mt-4 text-[color:var(--cream)]/70">
          {t("notFound.text")}
        </p>
        <Link to="/" className="btn btn-gold mt-8 inline-flex">{t("notFound.cta")}</Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  const { t } = useTranslation();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="min-h-screen bg-damask-deep flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        <div className="eyebrow">{t("errorPage.eyebrow")}</div>
        <h1 className="display italic text-4xl mt-4 text-[color:var(--cream)]">{t("errorPage.title")}</h1>
        <p className="mt-4 text-[color:var(--cream)]/70">
          {t("errorPage.text")}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            onClick={() => { router.invalidate(); reset(); }}
            className="btn btn-gold"
          >
            {t("errorPage.retry")}
          </button>
          <a href="/" className="btn btn-outline">{t("errorPage.home")}</a>
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
      { name: "google", content: "notranslate" },
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
            reviewCount: "995",
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
    <html lang="fr" translate="no" className="notranslate">
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

  useEffect(() => {
    applyDetectedLanguage();
    const onChange = (lng: string) => {
      document.documentElement.lang = lng;
    };
    i18n.on("languageChanged", onChange);
    document.documentElement.lang = i18n.language;
    return () => {
      i18n.off("languageChanged", onChange);
    };
  }, []);

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
