import { useEffect, useState } from "react";
import { DeckPlayer } from "./deck/DeckPlayer";
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

function withBase(path: string) {
  const base = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const trimmed = path.replace(/^\//, "");
  return trimmed ? `${base}${trimmed}` : base;
}

export default function App() {
  const pathname = usePathname();
  const isDocs = pathname.replace(/\/$/, "").endsWith("design-system");

  return (
    <>
      <nav className="app-nav" aria-label="Main navigation">
        <a className="app-nav__brand" href={withBase("/")}>
          PLAYSON / SALES DECKS
        </a>
        <div className="app-nav__links">
          <a className="app-nav__link" href={withBase("/")} aria-current={!isDocs ? "page" : undefined}>
            Promo Tools deck
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
      {isDocs ? <DesignSystemPage /> : <DeckPlayer deck={deck} />}
    </>
  );
}
