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
