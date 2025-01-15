# Base de bot Discord.js v14 (Node 18.12.1) 🤖

---

## 🛠️ Fonctionnalités :

### 🛠️ Handler :

- Commandes (et sous-commandes) ⚔️
- Buttons 🔘
- Events 🎉
- Selects 🔍
- Modals 🖼️

---

## 📜 Commandes disponibles :

- **/help** 📚 - Génère dynamiquement le message d'aide avec les commandes existantes
- **/stop** ⛔ - Permet d'arrêter le bot *(commande admin)*
- **/test** 🧪 - Une commande vide pour vos tests *(commande admin)*
- **/ping** 🏓 - Donne la latence du bot (en ms)
- et des commandes d'exemple des différentes options

---

## 💡 Particularités :

- Les commandes de la catégorie admin ne sont pas affichées dans le /help et nécessitent d'être inscrites (id Discord)
  dans le tableau owner de `config.json` 👑
- Les commandes marquées comme `devOnly: true` nécessitent d'être développeur pour être exécutées, inscrites dans le
  tableau dev de `config.json` 💻
- Les configs sont mises dans le cache du client, pour y accéder : `client.config`
- Le cooldown est en seconde, mais attention il se réinitialise à chaque redémarrage du bot, il est désactivé pour les
  commandes en devOnly ⏱️
- Vous pouvez lancer le bot avec `npm run dev`, dans ce cas, le bot se redémarre à chaque sauvegarde que vous faites,
  sinon utiliser `node index.js` ou `npm run start`
- Les buttons et les commandes peuvent avoir des catégories : créer un dossier et ranger le fichier dedans (allez voir
  les exemples)
- Mode debug activé par défaut, configuration dans `.ENV`

---

## 🛠️ Options de commande :

- ```userPermissions: [""],``` - Les permissions supplémentaires nécessaires à l'utilisateur *(par
  défaut: ```sendMessages```)*
- ```botPermissions: [""],``` - Les permissions supplémentaires nécessaires au bot *(par défaut: ```sendMessages```)*
- ```devOnly: true,``` - *(par défaut: false)*
- ```cooldown: t,``` - t= les temps entre 2 exécutions de la commande, en seconde *(par défaut: ```0s```)*
- ```mp: true,``` - Si true, la commande peut être exécutée en MP, si false elle peut être exécutée que sur un serveur *(
  par défaut: ```false```)*

---

## 🛠️ Groupe de commandes :

- Permet de mettre plusieurs commandes sous le même nom, ex : `/musique on` et `/musique off`
- Pour cela, il faut (dans un dossier) mettre les fichiers des sous-commandes, comme des commandes normales (elles n'ont pas
  accès aux options de commande expliquées plus haut)
- et rajouter ```subCommande: true,``` au paramètre
- et rajouter un autre fichier de commande (celui-ci sans code, donc pas de fonction `runInteraction`), avec :
    - Le même nom que le dossier
    - Le paramètre : ```commandeGroupe: true,```
    - Et le paramètre ```category: categorie,```, la catégorie dans laquelle vous voulez que la commande soit
      (laissez "", si vous ne voulez aucune catégorie)
    - C'est dans cet fichier de commande que vous pouvez mettre les options de commandes

---

## 🚀 Installation :

1. Faites un fork du repository ou téléchargez la dernière release (et la dézippez)
2. Ouvrez le dossier du projet
3. Installez les librairies avec `npm i`
4. Mettez le token de votre bot dans le fichier `.env`
5. Configurez le bot (admin/développeur) dans le fichier `config.json`
6. Exécutez `npm run start` et le bot se met en ligne

---

## 🧑‍💻 Contributeurs :
- Youritch Owner/Dev
- Cleboost Owner/Dev
- Peut-être toi ? 😉
