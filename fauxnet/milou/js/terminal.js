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
