# Base de bot discord.js v14 (node 18.12.1)

## Fonctionalités :

### Handler :

- Commandes (et sub commandes)
- Button
- Events
- Selects
- Modals

### Commandes données :

- **/help** *génère dynamiquement le message d'aide avec les commandes existantes*
- **/stop** *permet d'arrêter le bot* (commande admin)
- **/test** *une commande vide pour vos tests* (commande admin)
- **/ping** *donne la latence du bot* (en ms)
- et des commandes d'exemple des différentes options

### Particularité :

- Les commandes de la catégorie admin ne sont pas affichées dans le /help et nécessitent d'être inscrit (id discord)
  dans le tableau owner de config.js
- Les commandes marquées comme `devOnly: true`, nécessite d'être développeur pour être exécuté, inscrit dans le tableur
  dev de config.js
- Les configs sont mis dans le cache du client, pour y accéder : `client.config`
- Le cooldown est en seconde, mais attention il se reset à chaque redémarage de bot, il est désactivé pour les commandes
  en devOnly
- Vous pouvez lancer le bot avec `npm run dev`, dans ce cas le bot se redémare à chaque save que vous faites, sinon
  utiliser `node index.ts` ou `npm run start`
- Les buttons et les commandes peuvent avoir des catégories : créer un dossier et rangé le fichier dedans (allez voir
  les exemples)
- Mode debug activé par défaut, configuration dans `.ENV`

## Options de commandes :

- ```userPermissions: [""],``` les permissions supplémentaires nécessaires à l'utilisateur *(par
  défaut: ```sendMessages```)*
- ```botPermissions: [""],``` les permissions supplémentaires nécessaires au bot *(par défaut: ```sendMessages```)*
- ```devOnly: true,``` *(par défaut: false)*
- ```cooldown: t,``` t= les temps entre 2 executions de la commande, en seconde *(par défaut: ```0s```)*
- ```mp: true,``` Si true, la commande peut être execute en mp, si false elle peut etre executer que sur un serveur *(
  par défaut: ```false```)*

### Groupe de commandes :

- permet de mettre plusieurs commande sous le même nom, ex : `/musique on` et `/musique off`
- Pour cela il faut (dans un dossier) mettre les fichier des sous commande, comme des commane normale (elles on pas
  accès aux options de commande expliqué plus haut)
- et rajouter ```subCommande: true,``` au parametre
- et rajouter un autre fichier de commande (celui ci sans code, donc pas de fonction runInteraction), avec :
    - le même nom que le dossier
    - le prametre : ```commandeGroupe: true,```
    - et le parametre ```category: categorie,```, categorie est la categorie auque vous voullez que la commande soit
      dedans (laisser "", si vous ne voulez aucune categorie)
    - c'est dans cet fichier de commande que vous pouvez mettre les options de commandes

## Installation :

- Faire un fork du reposite ou télécharger la derniere release (et la de-zip)
- Ouvrir le dossier du project
- Installez les librairies `npm i`
- Mettre le token de votre bot dans le fichier `.env`
- Configurez le bot (admin/devellopeur) dans le fichier `config.json`
- Exécuter `npm run start` et le bot se met en ligne

  
## Contributeurs :
- Youritch Owner/Dev
- Cleboost Owner/Dev
- Toi peux etre ?
