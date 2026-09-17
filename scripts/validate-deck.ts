import { deck } from "../src/decks/sample-deck";
import { validateDeck } from "../src/deck/schema";

const errors = validateDeck(deck);

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Valid deck: ${deck.meta.title} (${deck.slides.length} slides)`);
