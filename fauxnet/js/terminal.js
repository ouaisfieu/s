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
