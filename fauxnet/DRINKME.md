OK, on va faire trois choses d’un coup :

1. **Réparer et améliorer le terminal (vrai pseudo-shell interactif)**
2. **Rendre la navigation ultra claire** (on ne se perd plus, on peut toujours revenir)
3. **Te donner un tuto “débutant total” pour reconstruire le tout et le publier sur GitHub Pages**

Je te donne directement **le nouveau code** prêt à coller, puis le **tutoriel** en dessous.

---

## 1. Navigation claire : barre commune + page “tout-en-un”

### 1.1. Barre de navigation à réutiliser partout

Ajoute ce bloc dans **toutes tes pages** juste après `<body>` (index, browser, console, terminal, etc.) :

```html
<body>
  <nav class="global-nav">
    <a href="index.html" class="brand">FAUXNET<span>.corp</span></a>
    <div class="nav-links">
      <a href="workspace.html">Espace intégral</a>
      <a href="browser.html">Navigateur</a>
      <a href="console.html">Console</a>
      <a href="terminal.html?theme=unix&user=invite">Terminal</a>
    </div>
  </nav>
  <!-- le reste de ta page ici -->
```

Et ajoute ce CSS dans `css/style.css` :

```css
.global-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.6rem 1.2rem;
  background: rgba(5, 6, 15, 0.96);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.global-nav .brand {
  color: #ffffff;
  font-weight: 700;
  text-decoration: none;
  letter-spacing: 0.04em;
}

.global-nav .brand span {
  color: var(--accent);
}

.global-nav .nav-links a {
  color: var(--muted);
  text-decoration: none;
  margin-left: 1rem;
  font-size: 0.9rem;
}

.global-nav .nav-links a:hover {
  color: var(--accent);
}
```

> Résultat : tu as **toujours un chemin pour revenir à l’accueil** ou changer d’outil sans te perdre.

---

### 1.2. Une page “workspace” avec onglets pour tout intégrer

Crée un fichier `workspace.html` (la “super page” qui rassemble Navigateur / Console / Terminal en onglets) :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>FAUXNET // Espace intégral</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <nav class="global-nav">
    <a href="index.html" class="brand">FAUXNET<span>.corp</span></a>
    <div class="nav-links">
      <a href="workspace.html">Espace intégral</a>
      <a href="browser.html">Navigateur</a>
      <a href="console.html">Console</a>
      <a href="terminal.html?theme=unix&user=invite">Terminal</a>
    </div>
  </nav>

  <main class="layout-center">
    <div class="card card-large workspace-card">
      <h1>Espace intégral</h1>
      <p class="subtitle">
        Navigateur, console et terminal réunis dans une seule fenêtre.
      </p>

      <div class="workspace-tabs">
        <button class="wtab active" data-view="view-browser">Navigateur</button>
        <button class="wtab" data-view="view-console">Console</button>
        <button class="wtab" data-view="view-terminal">Terminal</button>
      </div>

      <div class="workspace-views">
        <section id="view-browser" class="workspace-view active">
          <iframe src="browser.html" title="Navigateur FAUXNET"></iframe>
        </section>
        <section id="view-console" class="workspace-view">
          <iframe src="console.html" title="Console FAUXNET"></iframe>
        </section>
        <section id="view-terminal" class="workspace-view">
          <iframe src="terminal.html?theme=unix&user=invite"
                  title="Terminal FAUXNET"></iframe>
        </section>
      </div>
    </div>
  </main>

  <script>
    const wtabs = document.querySelectorAll(".wtab");
    const views = document.querySelectorAll(".workspace-view");

    wtabs.forEach(tab => {
      tab.addEventListener("click", () => {
        const viewId = tab.dataset.view;
        wtabs.forEach(t => t.classList.remove("active"));
        views.forEach(v => v.classList.remove("active"));
        tab.classList.add("active");
        document.getElementById(viewId).classList.add("active");
      });
    });
  </script>
</body>
</html>
```

Ajoute ce CSS dans `style.css` :

```css
.workspace-card {
  height: 80vh;
  display: flex;
  flex-direction: column;
}

.workspace-tabs {
  display: inline-flex;
  gap: 0.4rem;
  margin: 1rem 0;
  background: rgba(255, 255, 255, 0.03);
  padding: 0.25rem;
  border-radius: 999px;
}

.wtab {
  border: none;
  background: transparent;
  color: var(--muted);
  padding: 0.35rem 1rem;
  border-radius: 999px;
  font-size: 0.85rem;
  cursor: pointer;
}

.wtab.active {
  background: rgba(255, 255, 255, 0.12);
  color: var(--text);
}

.workspace-views {
  position: relative;
  flex: 1;
}

.workspace-view {
  position: absolute;
  inset: 0;
  border-radius: 14px;
  overflow: hidden;
  display: none;
}

.workspace-view.active {
  display: block;
}

.workspace-view iframe {
  width: 100%;
  height: 100%;
  border: none;
}
```

> Maintenant tu as une **page unique avec des onglets** qui intègrent le navigateur, la console et le terminal.

---

## 2. Corriger le terminal : pseudo-shell interactif

On va transformer le terminal en **vrai petit shell** : prompt, commandes, historique.

### 2.1. `terminal.html`

Remplace ton fichier par celui-ci :

```html
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8" />
  <title>FAUXNET // Terminal</title>
  <link rel="stylesheet" href="css/style.css" />
</head>
<body>
  <nav class="global-nav">
    <a href="index.html" class="brand">FAUXNET<span>.corp</span></a>
    <div class="nav-links">
      <a href="workspace.html">Espace intégral</a>
      <a href="browser.html">Navigateur</a>
      <a href="console.html">Console</a>
      <a href="terminal.html?theme=unix&user=invite">Terminal</a>
    </div>
  </nav>

  <div class="terminal-screen">
    <pre id="term-output"></pre>
    <div class="term-input-row">
      <span id="term-prompt" class="term-prompt"></span>
      <input id="term-input" type="text" autocomplete="off" />
    </div>
  </div>

  <script src="js/terminal.js"></script>
</body>
</html>
```

Ajoute ces styles à `style.css` (complètent ceux déjà présents) :

```css
.terminal-screen {
  height: calc(100vh - 3rem);
  margin: 1rem;
  padding: 0.7rem 0.8rem;
  font-family: var(--mono);
  font-size: 0.9rem;
  background: #020308;
  color: #00ff9d;
  border-radius: 10px;
  box-shadow: var(--shadow);
  display: flex;
  flex-direction: column;
}

#term-output {
  flex: 1;
  overflow-y: auto;
  white-space: pre-wrap;
}

.term-input-row {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  margin-top: 0.4rem;
}

.term-prompt {
  color: #00ff9d;
}
#term-input {
  flex: 1;
  background: transparent;
  border: none;
  outline: none;
  color: #00ff9d;
  font-family: var(--mono);
}
```

### 2.2. Nouveau `js/terminal.js`

Remplace entièrement ton ancien `terminal.js` par ceci :

```js
document.addEventListener("DOMContentLoaded", () => {
  const out = document.getElementById("term-output");
  const input = document.getElementById("term-input");
  const promptSpan = document.getElementById("term-prompt");

  function getParams() {
    const params = new URLSearchParams(window.location.search);
    return {
      theme: params.get("theme") || "unix",
      user: params.get("user") || "user"
    };
  }

  const state = {
    history: [],
    historyIndex: -1
  };

  function applyTheme(theme) {
    const screen = document.querySelector(".terminal-screen");
    switch (theme) {
      case "dos":
        screen.style.backgroundColor = "#000000";
        screen.style.color = "#00ff00";
        break;
      case "matrix":
        screen.style.backgroundColor = "#020c08";
        screen.style.color = "#7bffb5";
        screen.style.textShadow = "0 0 6px #00ff9d";
        break;
      default: // unix
        screen.style.backgroundColor = "#020308";
        screen.style.color = "#00ff9d";
    }
  }

  function println(text = "") {
    out.textContent += text + "\n";
    out.scrollTop = out.scrollHeight;
  }

  function handleCommand(cmd) {
    const [command, ...parts] = cmd.trim().split(/\s+/);
    const arg = parts.join(" ");

    switch ((command || "").toLowerCase()) {
      case "":
        return;
      case "help":
        println("Commandes disponibles :");
        println("  help         - affiche cette aide");
        println("  clear        - efface l'écran");
        println("  whoami       - affiche l'utilisateur courant");
        println("  theme [nom]  - change de thème (unix, dos, matrix)");
        println("  echo [txt]   - répète le texte");
        println("  exit         - retour au portail FAUXNET");
        break;
      case "clear":
        out.textContent = "";
        break;
      case "whoami":
        println(params.user + "@fauxnet");
        break;
      case "theme":
        if (!arg) {
          println("Thèmes disponibles : unix, dos, matrix");
        } else {
          applyTheme(arg);
          println("Thème appliqué : " + arg);
        }
        break;
      case "echo":
        println(arg);
        break;
      case "exit":
        window.location.href = "index.html";
        break;
      default:
        println(`Commande inconnue : ${command}`);
        println("Tape 'help' pour la liste des commandes.");
    }
  }

  const params = getParams();
  applyTheme(params.theme);
  promptSpan.textContent = `${params.user}@fauxnet:~$`;

  // message de démarrage
  println("FAUXNET shell v0.0.2");
  println("Filtre cognitif initialisé.");
  println("Tape 'help' pour les commandes disponibles.\n");

  input.focus();

  input.addEventListener("keydown", e => {
    if (e.key === "Enter") {
      const value = input.value;
      println(`${promptSpan.textContent} ${value}`);
      state.history.push(value);
      state.historyIndex = state.history.length;
      handleCommand(value);
      input.value = "";
    } else if (e.key === "ArrowUp") {
      if (state.historyIndex > 0) {
        state.historyIndex--;
        input.value = state.history[state.historyIndex] || "";
        setTimeout(() => input.setSelectionRange(input.value.length, input.value.length), 0);
      }
    } else if (e.key === "ArrowDown") {
      if (state.historyIndex < state.history.length - 1) {
        state.historyIndex++;
        input.value = state.history[state.historyIndex] || "";
      } else {
        state.historyIndex = state.history.length;
        input.value = "";
      }
    }
  });
});
```

> Là, tu as un terminal **réellement utilisable** :
> `help`, `clear`, `whoami`, `theme matrix`, `exit`, etc.

---

## 3. Tutoriel grand public : tout reconstruire et publier sur GitHub

### 3.1. Reconstituer le faux Internet sur son ordinateur

1. **Créer un dossier de projet**

   * Sur ton ordinateur, crée un dossier :
     `FAUXNET` (par exemple sur le Bureau).

2. **Créer la structure** (tu peux le faire à la main)

   Dans `FAUXNET`, crée :

   ```text
   FAUXNET/
   ├─ index.html
   ├─ browser.html
   ├─ console.html
   ├─ terminal.html
   ├─ workspace.html
   ├─ css/
   │  └─ style.css
   ├─ js/
   │  ├─ browser.js
   │  ├─ console.js
   │  └─ terminal.js
   └─ sites/
      ├─ corp-search.html
      ├─ corp-news.html   (tu peux dupliquer le search pour commencer)
      └─ corp-social.html (pareil)
   ```

3. **Éditer les fichiers**

   * Installe un éditeur de code si tu n’en as pas :

     * VS Code, Sublime Text, Notepad++, peu importe.
   * Ouvre le dossier `FAUXNET` dans ton éditeur.
   * Copie/colle :

     * le contenu des fichiers que je t’ai donné (index, browser, console, terminal, workspace, style.css, browser.js, console.js, terminal.js, corp-search.html).
   * Pour `corp-news.html` et `corp-social.html`, tu peux partir de `corp-search.html` et changer le contenu texte.

4. **Tester en local**

   * Double-clique sur `index.html` → ça s’ouvre dans ton navigateur.
   * Clique sur :

     * “Espace intégral” pour voir les onglets intégrés,
     * ou “Navigateur”, “Console”, “Terminal” pour y accéder séparément.

Tout fonctionne **hors-ligne**, donc parfait pour :

* clé USB,
* présentation,
* mini-expo dystopique 😏

---

### 3.2. Mettre le site sur GitHub Pages (gratuit)

#### Étape A – Créer un compte GitHub (si besoin)

1. Va sur GitHub (github.com).
2. Clique sur **Sign up** (s’inscrire).
3. Choisis :

   * un **pseudo** (username),
   * une adresse mail,
   * un mot de passe.
4. Valide ton compte (mail de confirmation).

#### Étape B – Créer un nouveau dépôt

1. Une fois connecté, clique sur ton avatar → **Your repositories** → **New** (ou bouton “New repository” sur la page d’accueil).
2. Remplis :

   * Repository name : par ex. `fauxnet`
   * Public : **Public** (obligatoire pour GitHub Pages gratuit)
3. Tu peux laisser le reste par défaut.
4. Clique sur **Create repository**.

#### Étape C – Uploader les fichiers

Il y a plusieurs méthodes, la plus simple sans Git en ligne de commande :

1. Dans ton dépôt `fauxnet` sur GitHub, clique sur **Add file** → **Upload files**.
2. Ouvre ton dossier `FAUXNET` sur ton ordi, **sélectionne tout** (les fichiers + les dossiers `css`, `js`, `sites`) et glisse-dépose dans GitHub.
3. Descends, mets un petit message de commit (par exemple “initial commit”) et clique sur **Commit changes**.

Tu as maintenant ton faux Internet stocké sur GitHub.

#### Étape D – Activer GitHub Pages

1. Va dans ton dépôt `fauxnet` sur GitHub.
2. Clique sur l’onglet **Settings**.
3. Dans le menu de gauche, trouve **Pages** (ou “Code and automation” → “Pages”).
4. Section **Source** :

   * Choisis **Deploy from a branch**.
   * En dessous, sélectionne la branche **main** et le dossier **/ (root)**.
5. Clique sur **Save**.

GitHub va construire ton site. Après un petit moment, tu verras une URL du style :

> `https://ton-pseudo.github.io/fauxnet/`

C’est ton **faux Internet public**.

#### Étape E – Vérifier

* Ouvre l’URL fournie par GitHub Pages dans ton navigateur.
* Tu dois voir ton `index.html` -> le portail FAUXNET.
* Tu peux le partager avec ton cercle de confiance.

---

Si tu veux, au prochain tour, je peux :

* te donner des versions plus “propagande/dystopie” pour `corp-news.html` et `corp-social.html`,
* ou ajouter des **“glitches” cachés** dans l’interface qui laissent fuiter la critique des corpos.
