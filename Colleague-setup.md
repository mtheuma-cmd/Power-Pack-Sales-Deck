# Work on the Interactive Power Pack sales deck

This is a Vite + React + TypeScript project. Colleagues edit the same GitHub repository in Cursor. There is no standalone file that contains the whole app.

## 1. Get access

Ask Matthew to add your GitHub username as a collaborator on:

https://github.com/mtheuma-cmd/Power-Pack-Sales-Deck

Accept the GitHub invite in your email.

## 2. Open it in Cursor

1. Install [Cursor](https://cursor.com/download) and sign in.
2. In Cursor: **File → Clone Repo** (or Command Palette → “Git: Clone”).
3. Paste:

```
https://github.com/mtheuma-cmd/Power-Pack-Sales-Deck.git
```

4. Choose a local folder, then open the cloned project.
5. Optional: open `Interactive Power Pack SD.code-workspace` from the project root so the workspace name matches the deck.

## 3. Run it locally

You need Node.js 20+ and npm.

```bash
npm install
npm run dev
```

- Sales deck: `http://127.0.0.1:5173/`
- Design system: `http://127.0.0.1:5173/design-system`

## 4. What to edit

| Task | File |
| --- | --- |
| Slide copy | `src/decks/promo-tools-deck.ts` |
| Slide layouts | `src/deck/templates/index.tsx` and `templates.css` |
| Mobile / player behaviour | `src/deck/DeckPlayer.tsx` |
| Design-system page | `src/pages/DesignSystemPage.tsx` |

Do not commit `node_modules`, `dist`, credentials, or secrets.

## 5. View without cloning

The hosted deck (view-only) is:

https://mtheuma-cmd.github.io/Power-Pack-Sales-Deck/

GitHub Pages deploys from `main` after a push.

## 6. Share your changes

Create a branch, commit, push, and open a pull request against `main`. If GitHub asks for a verified commit, run `1auth --secure-my-git` on your machine (Playson 1Password signing).
