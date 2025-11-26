OK, on monte un faux “mini-Internet corpo” clef-USB friendly 😈

Je te propose d’abord **l’architecture globale**, puis je te donne **le HTML/CSS/JS d’une vraie maquette fonctionnelle** que tu peux déjà ouvrir dans un navigateur.

---

## 1. Architecture du faux Internet

Arborescence simple :

```text
fauxnet/
├─ index.html              ← page d’accueil / lanceur
├─ browser.html            ← faux navigateur web
├─ console.html            ← fausse console “corpo”
├─ terminal.html           ← faux terminal personnalisable via l’URL
├─ sites/
│  ├─ corp-search.html     ← faux moteur de recherche manipulé
│  ├─ corp-news.html       ← faux site d’info propagande
│  └─ corp-social.html     ← faux réseau social
├─ css/
│  └─ style.css            ← style commun à tout le “net”
└─ js/
   ├─ browser.js           ← logique du faux navigateur
   ├─ console.js           ← logique de la console
   └─ terminal.js          ← logique du terminal
```

Tout est **statique**, aucun backend, parfait pour une clé USB ou un hébergement genre GitHub Pages / Vercel.

---

## 2. Page d’accueil : `index.html`

C’est juste le hub qui propose d’ouvrir le faux navigateur, la console, le terminal.

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>FAUXNET // Portail</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body class="layout-center">
  <div class="card card-large">
    <h1>FAUXNET<span class="accent">.corp</span></h1>
    <p class="subtitle">Un Internet 100% contrôlé. Pour votre sécurité, bien sûr.</p>

    <div class="grid-buttons">
      <a class="btn primary" href="browser.html">Ouvrir le navigateur simulé</a>
      <a class="btn" href="console.html">Ouvrir la console corpo</a>
      <a class="btn" href="terminal.html?theme=unix&user=invite">Ouvrir le terminal</a>
    </div>

    <p class="small">
      Astuce : tout tourne hors-ligne. Si tu lis ceci sur une clé USB,
      tu viens déjà de quitter le vrai Internet.
    </p>
  </div>
</body>
</html>
```

---

## 3. Faux navigateur : `browser.html`

Cette page simule un navigateur avec :

* barre d’onglets
* barre d’adresse (affichage seulement)
* un “viewport” qui charge les sites du dossier `/sites` dans un `<iframe>`.

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>FAUXNET // Navigateur</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body class="browser-body">
  <div class="browser-window">
    <div class="browser-titlebar">
      <span class="dot red"></span>
      <span class="dot amber"></span>
      <span class="dot green"></span>
      <span class="browser-title">FAUXNAV 1.0 — propriété exclusive de MegaCorp</span>
    </div>

    <div class="browser-tabs">
      <button class="tab active" data-url="sites/corp-search.html">Search.corp</button>
      <button class="tab" data-url="sites/corp-news.html">News.corp</button>
      <button class="tab" data-url="sites/corp-social.html">Social.corp</button>
    </div>

    <div class="browser-urlbar">
      <span class="scheme">https://</span>
      <span id="address-text">search.corp</span>
      <span class="lock">🔒 100% sécurisé (promis)</span>
    </div>

    <div class="browser-main">
      <aside class="browser-sidebar">
        <h2>Favoris certifiés</h2>
        <ul>
          <li><button class="link" data-url="sites/corp-search.html" data-label="search.corp">
            🔍 Moteur officiel
          </button></li>
          <li><button class="link" data-url="sites/corp-news.html" data-label="news.corp">
            📰 Infos approuvées
          </button></li>
          <li><button class="link" data-url="sites/corp-social.html" data-label="social.corp">
            💬 Réseau unique
          </button></li>
        </ul>
        <p class="tiny">
          D’autres sites existent peut-être.<br>
          Leurs risques aussi.
        </p>
      </aside>

      <section class="browser-viewport">
        <iframe id="browser-frame"
                src="sites/corp-search.html"
                title="Fenêtre FAUXNET"></iframe>
      </section>
    </div>
  </div>

  <script src="js/browser.js"></script>
</body>
</html>
```

---

## 4. Console corpo : `console.html`

Une pseudo-console qui répond à quelques commandes de base
(et qui peut plus tard cacher des indices, “S”, etc.).

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>FAUXNET // Console corpo</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body class="console-body">
  <div class="console-wrap">
    <div class="console-header">
      <span>MEGACORP // Secure Console v0.1</span>
      <span class="status">STATUT : UTILISATEUR INVITÉ</span>
    </div>
    <div id="console-output" class="console-output"></div>
    <div class="console-input-row">
      <span class="prompt">&gt;</span>
      <input id="console-input"
             type="text"
             autocomplete="off"
             placeholder="help, sites, about, clear..." />
    </div>
  </div>
  <script src="js/console.js"></script>
</body>
</html>
```

---

## 5. Terminal paramétrable : `terminal.html`

Le même principe que la console, mais :

* style “terminal” plein écran,
* thème choisi par l’utilisateur via `?theme=unix|dos|matrix`,
* pseudo-user via `?user=nom`.

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>FAUXNET // Terminal</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body class="terminal-body">
  <div id="terminal" class="terminal-screen">
    <!-- contenu généré par JS -->
  </div>
  <script src="js/terminal.js"></script>
</body>
</html>
```

---

## 6. Exemples de faux sites

### `sites/corp-search.html` – moteur de recherche manipulé

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>search.corp</title>
  <link rel="stylesheet" href="../css/style.css" />
</head>
<body class="site-body">
  <header class="site-header">
    <h1>search<span class="accent">.corp</span></h1>
    <p>Le seul moteur dont vous avez besoin. Les autres sont dangereux.</p>
  </header>

  <main class="site-main">
    <form class="search-form" onsubmit="event.preventDefault(); showResult();">
      <input id="q" type="text" placeholder="Que souhaitez-vous penser aujourd'hui ?" />
      <button type="submit" class="btn primary">Rechercher</button>
    </form>
    <div id="results" class="results">
      <p class="muted">Tape une requête pour voir les résultats “optimisés”.</p>
    </div>
  </main>

  <script>
    function showResult() {
      const q = document.getElementById('q').value.trim() || 'votre question';
      const box = document.getElementById('results');
      box.innerHTML = `
        <h2>Résultats pour « ${q} »</h2>
        <ol>
          <li><strong>Article officiel :</strong> Pourquoi MegaCorp a déjà trouvé la meilleure réponse pour vous.</li>
          <li>Guide utilisateur : Comment éviter les sources non-certifiées qui nuisent à votre sérénité.</li>
          <li>FAQ : Vous n'avez pas besoin de plus d'informations pour prendre la bonne décision.</li>
        </ol>
        <p class="tiny">Affichage des résultats : 0,01s — Options de filtrage : désactivées par votre sécurité.</p>
      `;
    }
  </script>
</body>
</html>
```

Tu pourras facilement dupliquer ce fichier pour `corp-news.html`, `corp-social.html`, etc. en gardant le même CSS.

---

## 7. CSS commun : `css/style.css`

Voici un style minimal mais déjà “écran noir / néon corpo”.
Tu peux tout mettre dans un seul fichier pour simplifier la clé USB.

```css
/* Reset rapide */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

:root {
  --bg: #05060a;
  --bg-alt: #101321;
  --accent: #00e0ff;
  --accent-soft: rgba(0, 224, 255, 0.25);
  --danger: #ff3366;
  --text: #f5f7ff;
  --muted: #9ba3c3;
  --radius: 16px;
  --shadow: 0 18px 45px rgba(0, 0, 0, 0.65);
  --font: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
  --mono: "Fira Code", SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", monospace;
}

html, body {
  height: 100%;
  background: radial-gradient(circle at top, #141931 0, #05060a 50%);
  color: var(--text);
  font-family: var(--font);
}

/* Layouts génériques */

.layout-center {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
}

.card {
  background: linear-gradient(145deg, #101321, #070815);
  border-radius: var(--radius);
  padding: 2rem;
  box-shadow: var(--shadow);
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.card-large {
  max-width: 700px;
  width: 100%;
}

h1 {
  font-size: 2.4rem;
  margin-bottom: 0.5rem;
}

.accent {
  color: var(--accent);
}

.subtitle {
  color: var(--muted);
  margin-bottom: 1.5rem;
}

.grid-buttons {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.btn {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  gap: 0.4rem;
  padding: 0.7rem 1rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  color: var(--text);
  background: rgba(255, 255, 255, 0.02);
  text-decoration: none;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.15s ease-out;
}

.btn.primary {
  background: linear-gradient(135deg, var(--accent), #7b61ff);
  border-color: transparent;
  color: #02030a;
  font-weight: 600;
}

.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
}

.small {
  font-size: 0.8rem;
  color: var(--muted);
}

/* Faux navigateur */

.browser-body {
  padding: 2rem;
}

.browser-window {
  max-width: 1100px;
  margin: 0 auto;
  background: #05060a;
  border-radius: 20px;
  box-shadow: var(--shadow);
  border: 1px solid rgba(255, 255, 255, 0.12);
  overflow: hidden;
}

.browser-titlebar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.4rem 0.75rem;
  background: linear-gradient(90deg, #15192b, #05060a);
  font-size: 0.8rem;
  color: var(--muted);
}

.dot {
  width: 10px;
  height: 10px;
  border-radius: 999px;
  display: inline-block;
}

.dot.red { background: #ff5f57; }
.dot.amber { background: #febc2e; }
.dot.green { background: #28c840; }

.browser-tabs {
  display: flex;
  gap: 0.4rem;
  padding: 0.4rem;
  background: #0b0e19;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.tab {
  background: transparent;
  border-radius: 999px;
  border: none;
  padding: 0.35rem 0.9rem;
  font-size: 0.8rem;
  color: var(--muted);
  cursor: pointer;
}

.tab.active {
  background: rgba(255, 255, 255, 0.06);
  color: var(--text);
}

.browser-urlbar {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.4rem 0.8rem;
  font-size: 0.8rem;
  background: #070a13;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.scheme {
  color: var(--muted);
}

.lock {
  margin-left: auto;
  color: #58ff9a;
}

.browser-main {
  display: grid;
  grid-template-columns: 230px minmax(0, 1fr);
  min-height: 540px;
}

.browser-sidebar {
  background: #05060f;
  padding: 0.9rem;
  border-right: 1px solid rgba(255, 255, 255, 0.05);
}

.browser-sidebar h2 {
  font-size: 0.9rem;
  margin-bottom: 0.5rem;
}

.browser-sidebar ul {
  list-style: none;
  margin-bottom: 0.75rem;
}

.link {
  display: block;
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  color: var(--text);
  padding: 0.4rem 0.3rem;
  font-size: 0.85rem;
  border-radius: 6px;
  cursor: pointer;
}

.link:hover {
  background: rgba(255, 255, 255, 0.06);
}

.tiny {
  font-size: 0.7rem;
  color: var(--muted);
}

.browser-viewport {
  background: #05060a;
}

.browser-viewport iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* Sites internes */

.site-body {
  background: #05060a;
  color: var(--text);
  font-family: var(--font);
  padding: 1.5rem;
}

.site-header h1 {
  font-size: 1.8rem;
}

.site-header p {
  color: var(--muted);
  margin-top: 0.4rem;
}

.site-main {
  margin-top: 1.5rem;
}

.search-form {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.search-form input {
  flex: 1;
  padding: 0.6rem 0.8rem;
  border-radius: 999px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background: rgba(0, 0, 0, 0.4);
  color: var(--text);
}

.results {
  font-size: 0.9rem;
}

.muted {
  color: var(--muted);
}

/* Console */

.console-body, .terminal-body {
  height: 100%;
  background: #02040a;
}

.console-wrap {
  max-width: 900px;
  margin: 2rem auto;
  border-radius: 14px;
  background: #05060f;
  border: 1px solid rgba(0, 224, 255, 0.3);
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
  height: calc(100vh - 4rem);
}

.console-header {
  padding: 0.6rem 0.9rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--muted);
}

.console-output {
  flex: 1;
  padding: 0.7rem 0.9rem;
  font-family: var(--mono);
  font-size: 0.85rem;
  overflow-y: auto;
  white-space: pre-wrap;
}

.console-input-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.6rem 0.9rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.prompt {
  font-family: var(--mono);
  color: var(--accent);
}

#console-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: var(--text);
  font-family: var(--mono);
}

/* Terminal */

.terminal-screen {
  height: 100vh;
  padding: 0.9rem;
  font-family: var(--mono);
  font-size: 0.9rem;
  background: #020308;
  color: #00ff9d;
  overflow-y: auto;
}
```

---

## 8. JS du navigateur : `js/browser.js`

Pour que les tabs et les liens latéraux changent l’iframe + la barre d’adresse :

```js
const frame = document.getElementById("browser-frame");
const addressText = document.getElementById("address-text");

function setActiveUrl(url, label) {
  if (frame) frame.src = url;
  if (addressText) addressText.textContent = label || url;

  document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
  document.querySelectorAll(`.tab[data-url="${url}"]`).forEach(t => t.classList.add("active"));
}

document.querySelectorAll(".tab").forEach(tab => {
  tab.addEventListener("click", () => {
    const url = tab.dataset.url;
    const label = tab.textContent.trim();
    setActiveUrl(url, label);
  });
});

document.querySelectorAll(".link").forEach(link => {
  link.addEventListener("click", () => {
    const url = link.dataset.url;
    const label = link.dataset.label || url;
    setActiveUrl(url, label);
  });
});
```

---

## 9. JS de la console : `js/console.js`

Maquette avec quelques commandes simples : `help`, `sites`, `about`, `clear`.

```js
const out = document.getElementById("console-output");
const input = document.getElementById("console-input");

function println(text = "") {
  out.innerText += text + "\n";
  out.scrollTop = out.scrollHeight;
}

function handleCommand(cmd) {
  const [command, ...rest] = cmd.trim().split(/\s+/);
  const arg = rest.join(" ");

  switch (command.toLowerCase()) {
    case "":
      return;
    case "help":
      println("Commandes disponibles :");
      println("  help          - affiche cette aide");
      println("  sites         - liste des domaines autorisés");
      println("  about         - à propos de MegaCorp");
      println("  clear         - efface l'écran");
      println("  echo [texte]  - répète le texte");
      break;
    case "sites":
      println("Sites autorisés sur FAUXNET :");
      println("  https://search.corp   - moteur de recherche officiel");
      println("  https://news.corp     - actualité validée");
      println("  https://social.corp   - réseau social unique");
      println("");
      println("Tout autre domaine est classé : menace cognitive.");
      break;
    case "about":
      println("MegaCorp™ contrôle l'information pour votre sécurité mentale.");
      println("Devise interne : 'Moins vous en savez, mieux vous dormez.'");
      break;
    case "clear":
      out.innerText = "";
      break;
    case "echo":
      println(arg);
      break;
    default:
      println(`Commande inconnue : ${command}`);
      println("Tape 'help' pour la liste des commandes.");
  }
}

println("Console MegaCorp connectée.");
println("Tape 'help' pour commencer.\n");

input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const value = input.value;
    println("> " + value);
    handleCommand(value);
    input.value = "";
  }
});
```

---

## 10. JS du terminal : `js/terminal.js`

Terminal très simple, thème choisi via l’URL :

* `?theme=unix` → vert
* `?theme=dos` → vert sur noir façon DOS
* `?theme=matrix` → vert flashy, texte plus dense

```js
const term = document.getElementById("terminal");

function getParams() {
  const params = new URLSearchParams(window.location.search);
  return {
    theme: params.get("theme") || "unix",
    user: params.get("user") || "user"
  };
}

function applyTheme(theme) {
  switch (theme) {
    case "dos":
      term.style.backgroundColor = "#000000";
      term.style.color = "#00ff00";
      break;
    case "matrix":
      term.style.backgroundColor = "#020c08";
      term.style.color = "#7bffb5";
      term.style.textShadow = "0 0 8px #00ff9d";
      break;
    default: // unix
      term.style.backgroundColor = "#020308";
      term.style.color = "#00ff9d";
  }
}

function boot() {
  const { theme, user } = getParams();
  applyTheme(theme);

  const lines = [
    "Boot FAUXNET shell v0.0.1",
    "Initialisation des modules de conformité...",
    "Chargement du pare-feu cognitif...[OK]",
    "",
    `Connecté en tant que ${user}@fauxnet`,
    "",
    "Rappel : toute idée non approuvée sera automatiquement oubliée.",
    "",
    "Ce terminal est pour l'apparence uniquement.",
    "Tape 'help' si tu crois encore que ça changera quelque chose."
  ];

  term.innerText = lines.join("\n");
}

boot();
```

---

## 11. Et maintenant ?

Tu peux :

1. **Copier l’ensemble des fichiers** dans un dossier `fauxnet/`.
2. Ouvrir `index.html` dans ton navigateur → tu as déjà un faux “mini-Internet corpo” offline.
3. Dupliquer les pages dans `/sites` pour rajouter :

   * une banque,
   * un portail RH absurde,
   * un “bien-être au travail” toxique, etc.

Si tu veux, au prochain tour je peux :

* enrichir les 2 autres sites (`corp-news`, `corp-social`),
* ou ajouter une **page “mission” cachée** dans un site, qui donne des instructions IRL à poster sur le net pour “S”.
