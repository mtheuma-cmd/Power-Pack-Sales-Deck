import { useEffect, useMemo, useState } from "react";
import { DeckPlayer } from "./deck/DeckPlayer";
import type { DeckData } from "./deck/schema";
import { deck } from "./decks/sample-deck";
import { DesignSystemPage } from "./pages/DesignSystemPage";

function usePathname() {
  const [pathname, setPathname] = useState(window.location.pathname);

  useEffect(() => {
    const update = () => setPathname(window.location.pathname);
    window.addEventListener("popstate", update);
    return () => window.removeEventListener("popstate", update);
  }, []);

  return pathname;
}

function readSection() {
  return new URLSearchParams(window.location.hash.replace(/^#/, "")).get("section");
}

function useDeckSection() {
  const [section, setSection] = useState(readSection);

  useEffect(() => {
    const update = () => setSection(readSection());
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);

  return section;
}

function withBase(path: string) {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const trimmed = path.replace(/^\//, "");
  return trimmed ? `${base}${trimmed}` : base;
}

function archivedDeck(source: DeckData): DeckData {
  return {
    ...source,
    slides: source.archivedSlides ?? [],
  };
}

export default function App() {
  const pathname = usePathname();
  const section = useDeckSection();
  const isDocs = pathname.replace(/\/$/, "").endsWith("design-system");
  const isArchive = section === "archive";
  const activeDeck = useMemo(
    () => (isArchive ? archivedDeck(deck) : deck),
    [isArchive],
  );

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const slideId = params.get("slide");
    if (!slideId || params.get("section") === "archive") return;
    if (deck.archivedSlides?.some((slide) => slide.id === slideId)) {
      params.set("section", "archive");
      window.location.hash = params.toString();
    }
  }, []);

  return (
    <>
      <nav className="app-nav" aria-label="Main navigation">
        <a className="app-nav__brand" href={withBase("/")}>
          PLAYSON / SALES DECKS
        </a>
        <div className="app-nav__links">
          <a
            className="app-nav__link"
            href={isDocs ? withBase("/") : "#slide=cover"}
            aria-current={!isDocs && !isArchive ? "page" : undefined}
          >
            Promo Tools deck
          </a>
          <a
            className="app-nav__link"
            href={isDocs ? `${withBase("/")}#section=archive` : "#section=archive"}
            aria-current={isArchive ? "page" : undefined}
          >
            Archived slides
          </a>
          <a
            className="app-nav__link"
            href={withBase("/design-system")}
            aria-current={isDocs ? "page" : undefined}
          >
            Design system
          </a>
        </div>
      </nav>
      {isDocs ? <DesignSystemPage /> : <DeckPlayer deck={activeDeck} />}
    </>
  );
}
