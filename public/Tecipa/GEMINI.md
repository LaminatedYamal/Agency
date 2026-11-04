# Tecipa Development Rules & Guidelines

## 1. Scripts, MIME Types & Vite Build Rules (CRITICAL)
- **NEVER use `type="module"` in `Tecipa/index.html`**:
  - Always keep script tags as standard classic scripts:
    ```html
    <script src="./js/app.js?v=4.6"></script>
    <script src="./js/quote-scheduler.js?v=4.6"></script>
    ```
- **Why this is strictly required**:
  - On Windows, Python's built-in `http.server` looks up `.js` file extensions in the Windows Registry, where it is frequently registered as `Content-Type: text/plain`.
  - When scripts have `type="module"`, Chrome/Edge/Firefox enforce **strict MIME type checking** per HTML specifications and immediately block execution with:
    > `Failed to load module script: Expected a JavaScript module script but the server responded with a MIME type of "text/plain". Strict MIME type checking is enforced for module scripts per HTML spec.`
  - This kills the entire interactive napkin configurator and breaks all button click interactions on localhost.
  - Classic `<script src="...">` tags do **NOT** enforce strict MIME checking, allowing Python's `http.server` to serve scripts on localhost without any browser blocking.
- **How Vite / GitHub Pages Production is Handled**:
  - In `vite.config.js`, the `copy-tecipa-scripts` build plugin automatically copies `Tecipa/js/app.js` and `Tecipa/js/quote-scheduler.js` into `dist/Tecipa/js/` upon `closeBundle()`.
  - This ensures GitHub Pages receives both scripts at the exact expected path `./js/app.js` without requiring `type="module"` or breaking local development.

## 2. Product Catalog Ground Truth
- The product catalog across the entire website consists of **exactly 6 products**:
  1. **Hotelaria & Restauração** (4 products):
     - *Guardanapos Personalizados*
     - *Toalhetes Individuais*
     - *Toalhetes "Chemin de Table"*
     - *Toalha de Base*
  2. **Aviação Civil** (1 product):
     - *Tray Mats para Aviação Civil*
  3. **Limpeza Industrial** (1 product):
     - *Rolos para Limpeza Industrial*
  4. **Todos os Produtos**: exactly the 6 products in the order above.
- **NEVER fabricate products** (no Oshibori, no Headrest covers, no Bobinas, no Panos Técnicos, no Desengordurantes, etc.).

## 3. Design & Brand Standards
- **Brand Blue**: `#453E9B` strictly across all primary buttons, active states, accents, and borders.
- **Border Radius**: Strict `0px` (`border-radius: 0 !important;`) on all buttons, cards, pills, modal dialogs, and drawers.
- **Bilingualism**: All dynamic text, tags, units, and form labels must maintain full Portuguese (`PT`) and English (`EN`) dictionary support in `js/app.js`.
