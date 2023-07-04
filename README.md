# Base de bot discord.js v14 (node 18.12.1)

## Fonctionalités :

- **Handler :**
    - Commande
    - Button
    - Event
    - Select
    - Modal

- **Vérification des permissions discord pour les commandes !**

- **Commandes Administrateur**

- **Commandes "en développement"**

- **Commandes avec cooldown**

- **Commandes données :**
    - /help *génère dynamiquement le message d'aide avec les commandes existantes*
    - /stop *permet d'arreter le bot* (command admin)
    - /test
    - /ping

- **Particularité :**
- Les commandes de la catégorie admin ne sont pas affichées dans le /help et nécessitent d'être inscrit (id discord)
  dans le tableau owner de config.js
- Les commandes marquées comme `devOnly: true`, nécessite d'être développeur pour être exécuté, inscrit dans le tableur
  dev de config.js
- Les configs sont mis dans le cache du client, pour y accéder : `client.config`
- Le cooldown est en seconde, mais attention il se reset à chaque redémarage de bot, il est désactivé pour les commandes
  en devOnly
- Vous pouvez lancer le bot avec *npm run dev*, dans ce cas le bot se redémare à chaque save que vous faites, sinon
  utiliser *node index.js* ou *npm run start*

## Options de commandes :

- ```userPermissions: [""],``` les permissions supplémentaires nécessaires à l'utilisateur *(par
  défaut: ```sendMessages```)*
- ```botPermissions: [""],``` les permissions supplémentaires nécessaires au bot *(par défaut: ```sendMessages```)*
- ```devOnly: true,``` *(par défaut: false)*
- ```cooldown: t,``` t= les temps entre 2 executions de la commande, en seconde *(par défaut: ```0s```)*

## Instalation :

- Faire un fork du reposite
- Ouvrir le dossier du project
- Installer les librairies `npm i`
- Mettre le token de votre bot dans le fichier `.env`
- Exécuter `npm run start` et le bot se met en ligne
