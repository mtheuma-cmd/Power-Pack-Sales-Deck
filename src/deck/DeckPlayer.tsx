import { useCallback, useEffect, useLayoutEffect, useRef, useState, type CSSProperties } from "react";
import { slide as slideSize } from "../design-system/tokens";
import type { DeckData } from "./schema";
import { SlideTemplate } from "./templates";
import "./deck-player.css";

const mobileSlideSize = { width: 390, height: 844 };
const mobileMediaQuery = "(max-width: 700px)";

const editableTextSelector = [
  "h1",
  "h2",
  "h3",
  "p",
  "strong",
  "small",
  "span",
  "a",
  "li",
  "th",
  "td",
  "button",
].join(",");

function isPdfExportRequest() {
  return new URLSearchParams(window.location.search).has("export-pdf");
}

function indexFromHash(deck: DeckData) {
  const id = new URLSearchParams(window.location.hash.replace(/^#/, "")).get("slide");
  const index = deck.slides.findIndex((slide) => slide.id === id);
  return index >= 0 ? index : 0;
}

function draggableElements(viewport: HTMLDivElement | null) {
  if (!viewport) return [];
  return Array.from(viewport.querySelectorAll<HTMLElement>("[data-draggable]"));
}

function editableTextElements(viewport: HTMLDivElement | null) {
  if (!viewport) return [];

  const candidates = Array.from(
    viewport.querySelectorAll<HTMLElement>(`.slide__content ${editableTextSelector}`),
  ).filter((element) => {
    const hasDirectText = Array.from(element.childNodes).some(
      (node) => node.nodeType === Node.TEXT_NODE && node.textContent?.trim(),
    );
    return hasDirectText || (element.childElementCount === 0 && element.textContent?.trim());
  }).filter((element) => !element.closest("[data-slide-jump]"));

  return candidates.filter(
    (element) => !candidates.some((parent) => parent !== element && parent.contains(element)),
  );
}

export function DeckPlayer({ deck }: { deck: DeckData }) {
  const [index, setIndex] = useState(() => indexFromHash(deck));
  const [scale, setScale] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [editRevision, setEditRevision] = useState(0);
  const isPdfExport = isPdfExportRequest();
  const [isMobile, setIsMobile] = useState(
    () => !isPdfExport && window.matchMedia(mobileMediaQuery).matches,
  );
  const viewportRef = useRef<HTMLDivElement>(null);
  const editsRef = useRef(new Map<string, string[]>());
  const positionsRef = useRef(new Map<string, Record<string, { left: number; top: number }>>());
  const current = deck.slides[index];

  const goTo = useCallback(
    (next: number) => {
      const bounded = Math.max(0, Math.min(next, deck.slides.length - 1));
      setIndex(bounded);
      const params = new URLSearchParams(window.location.hash.replace(/^#/, ""));
      params.set("slide", deck.slides[bounded].id);
      window.history.replaceState(null, "", `#${params.toString()}`);
    },
    [deck.slides],
  );

  useEffect(() => {
    const syncFromHash = () => setIndex(indexFromHash(deck));
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [deck]);

  useEffect(() => {
    if (isPdfExport) {
      setIsMobile(false);
      return;
    }

    const query = window.matchMedia(mobileMediaQuery);
    const updateMobile = () => setIsMobile(query.matches);
    query.addEventListener("change", updateMobile);
    updateMobile();
    return () => query.removeEventListener("change", updateMobile);
  }, [isPdfExport]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const updateScale = () => {
      const rect = viewport.getBoundingClientRect();
      const dimensions = isMobile ? mobileSlideSize : slideSize;
      setScale(Math.min(rect.width / dimensions.width, rect.height / dimensions.height));
    };

    const observer = new ResizeObserver(updateScale);
    observer.observe(viewport);
    updateScale();
    return () => observer.disconnect();
  }, [isMobile]);

  useLayoutEffect(() => {
    const viewport = viewportRef.current;
    const content = viewport?.querySelector<HTMLElement>(".slide__content");
    if (!viewport || !content) return;

    const clearFit = () => {
      content.style.removeProperty("--mobile-content-fit");
      content.style.removeProperty("--mobile-content-width");
      content.style.removeProperty("--mobile-content-height");
    };

    clearFit();
    if (!isMobile) return;

    let frame = 0;
    const fitContent = () => {
      clearFit();

      frame = window.requestAnimationFrame(() => {
        const widthRatio = mobileSlideSize.width / Math.max(content.scrollWidth, mobileSlideSize.width);
        const heightRatio = mobileSlideSize.height / Math.max(content.scrollHeight, mobileSlideSize.height);
        const fit = Math.min(1, widthRatio, heightRatio);

        if (fit >= 0.995) return;

        content.style.setProperty("--mobile-content-fit", fit.toFixed(4));
        content.style.setProperty("--mobile-content-width", `${mobileSlideSize.width / fit}px`);
        content.style.setProperty("--mobile-content-height", `${mobileSlideSize.height / fit}px`);
      });
    };

    fitContent();
    void document.fonts.ready.then(fitContent);

    const images = Array.from(content.querySelectorAll("img"));
    images.forEach((image) => {
      if (!image.complete) image.addEventListener("load", fitContent, { once: true });
    });

    return () => {
      window.cancelAnimationFrame(frame);
      images.forEach((image) => image.removeEventListener("load", fitContent));
      clearFit();
    };
  }, [current, editRevision, isMobile]);

  useEffect(() => {
    if (!current) return;

    const elements = editableTextElements(viewportRef.current);
    const savedText = editsRef.current.get(current.id);

    if (savedText) {
      elements.forEach((element, elementIndex) => {
        if (savedText[elementIndex] !== undefined) {
          element.textContent = savedText[elementIndex];
        }
      });
    }

    elements.forEach((element) => {
      element.contentEditable = isEditing ? "true" : "false";
      element.spellcheck = isEditing;
      element.toggleAttribute("data-editable-text", isEditing);
    });

    const savedPositions = positionsRef.current.get(current.id);
    draggableElements(viewportRef.current).forEach((element) => {
      const id = element.dataset.draggable;
      const position = id ? savedPositions?.[id] : undefined;
      if (position) {
        element.style.left = `${position.left}px`;
        element.style.top = `${position.top}px`;
        element.style.right = "auto";
      }
    });
  }, [current, editRevision, isEditing]);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || !isEditing || !current) return;

    const drag = {
      element: null as HTMLElement | null,
      offsetX: 0,
      offsetY: 0,
    };

    const slidePoint = (event: PointerEvent) => {
      const slide = viewport.querySelector<HTMLElement>(".slide");
      if (!slide) return null;
      const rect = slide.getBoundingClientRect();
      return {
        x: ((event.clientX - rect.left) / rect.width) * slideSize.width,
        y: ((event.clientY - rect.top) / rect.height) * slideSize.height,
      };
    };

    const endDrag = (event?: PointerEvent) => {
      if (!drag.element) return;
      const id = drag.element.dataset.draggable;
      if (id) {
        const saved = positionsRef.current.get(current.id) ?? {};
        saved[id] = {
          left: Number.parseFloat(drag.element.style.left),
          top: Number.parseFloat(drag.element.style.top),
        };
        positionsRef.current.set(current.id, saved);
      }
      drag.element.classList.remove("is-dragging");
      if (event && drag.element.hasPointerCapture(event.pointerId)) {
        drag.element.releasePointerCapture(event.pointerId);
      }
      drag.element = null;
    };

    const onPointerDown = (event: PointerEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const element = target.closest<HTMLElement>("[data-draggable]");
      if (!element || !viewport.contains(element)) return;

      const point = slidePoint(event);
      if (!point) return;

      event.preventDefault();
      event.stopPropagation();
      drag.element = element;
      drag.offsetX = point.x - element.offsetLeft;
      drag.offsetY = point.y - element.offsetTop;
      element.classList.add("is-dragging");
      element.setPointerCapture(event.pointerId);
    };

    const onPointerMove = (event: PointerEvent) => {
      if (!drag.element) return;
      if (event.buttons === 0) {
        endDrag(event);
        return;
      }
      const point = slidePoint(event);
      if (!point) return;

      const width = drag.element.offsetWidth;
      const height = drag.element.offsetHeight;
      const left = Math.min(Math.max(point.x - drag.offsetX, 0), slideSize.width - width);
      const top = Math.min(Math.max(point.y - drag.offsetY, 0), slideSize.height - height);
      drag.element.style.left = `${left}px`;
      drag.element.style.top = `${top}px`;
      drag.element.style.right = "auto";
    };

    viewport.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", endDrag);
    window.addEventListener("pointercancel", endDrag);
    return () => {
      viewport.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", endDrag);
      window.removeEventListener("pointercancel", endDrag);
    };
  }, [current, isEditing]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.isContentEditable) return;

      if (["ArrowRight", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        goTo(index + 1);
      }
      if (["ArrowLeft", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goTo(index - 1);
      }
      if (event.key === "Home") goTo(0);
      if (event.key === "End") goTo(deck.slides.length - 1);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [deck.slides.length, goTo, index]);

  useEffect(() => {
    if (!isPdfExport) return;

    document.title = `${deck.meta.title} - Sales Deck`;
    document.documentElement.classList.add("pdf-export");
  }, [deck.meta.title, isPdfExport]);

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await document.documentElement.requestFullscreen();
    }
  };

  if (!current) return null;

  const saveCurrentEdits = () => {
    if (!isEditing) return;
    const text = editableTextElements(viewportRef.current).map(
      (element) => element.textContent ?? "",
    );
    editsRef.current.set(current.id, text);
  };

  const resetCurrentSlide = () => {
    editsRef.current.delete(current.id);
    positionsRef.current.delete(current.id);
    setEditRevision((revision) => revision + 1);
  };

  return (
    <main
      className={`slide-stage ${isMobile ? "is-mobile" : ""}`}
      aria-label={`${deck.meta.title} presentation`}
    >
      <div
        className={`slide-viewport ${isEditing ? "is-editing" : ""} ${isMobile ? "is-mobile" : ""}`}
        ref={viewportRef}
        onInput={saveCurrentEdits}
        style={{ "--slide-scale": scale } as CSSProperties}
      >
        <SlideTemplate
          key={`${current.id}-${editRevision}`}
          slide={current}
          meta={deck.meta}
          onGoToSlide={
            isEditing
              ? undefined
              : (slideNumber) => goTo(slideNumber - 1)
          }
          slideNumber={index + 1}
          slideCount={deck.slides.length}
        />
      </div>
      {isPdfExport && (
        <div className="print-deck" aria-hidden="true">
          {deck.slides.map((slide, slideIndex) => (
            <div className="print-deck__page" key={slide.id}>
              <SlideTemplate
                slide={slide}
                meta={deck.meta}
                slideNumber={slideIndex + 1}
                slideCount={deck.slides.length}
              />
            </div>
          ))}
        </div>
      )}
      <nav className="deck-controls" aria-label="Slide controls">
        <button onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Previous slide">
          ←
        </button>
        <span aria-live="polite">
          {index + 1} / {deck.slides.length}
        </span>
        <button
          onClick={() => goTo(index + 1)}
          disabled={index === deck.slides.length - 1}
          aria-label="Next slide"
        >
          →
        </button>
        <button onClick={toggleFullscreen} aria-label="Toggle fullscreen">
          ⛶
        </button>
        <button
          className={`deck-controls__text-button ${isEditing ? "is-active" : ""}`}
          type="button"
          aria-pressed={isEditing}
          onClick={() => setIsEditing((editing) => !editing)}
        >
          {isEditing ? "Done" : "Edit text"}
        </button>
        {isEditing && (
          <button
            className="deck-controls__text-button"
            type="button"
            onClick={resetCurrentSlide}
          >
            Reset slide
          </button>
        )}
      </nav>
    </main>
  );
}
