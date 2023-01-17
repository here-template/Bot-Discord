# Base de bot discord.js v14 (node 18.12.1)

 ## Fonctionalités :
 - **Handler :** 
   - Commande
   - Button
   - Event
   - Select

 - **Vérification des permissions discord !**

 - **Commandes Administrateur**

 - **Commandes "en développement"**

 - **Commandes avec cooldown**

 - **Commande donné :**
   - /help *automatique*
   - /stop
   - /test
   - /ping

 - **Particularité :**
  - les commandes de la categorie admin ne sont pas affichés dans le /help et nessecite d'être inscrit (id discord) dans le tableu owner de config.js
  - les commande marqué comme devOnly: true, nessecite d'être devellopeur pour être executer, inscrit dans le tableur dev de config.js
  - les configs sont mis dans le cache du clien, pour y acceder : client.config
  - le cooldown est en seconde, mais attention il se reset à chaque redémarage de bot, il est désactivé pour si la commande est en devOnly
  - vous pouvez lancer le bot avec *npm run dev*, dans ce cas le bot se redémare à chaque save que vous faite, sinon utiliser *node index.js*

 ## Options de commandes :
  - ```userPermissions: [""],``` les permissions supplémentaire nessecaire à l'utilisateur *(par defaut: send message)*
  - ```botPermissions: [""],``` les permissions supplémentaire nessecaire au bot *(par defaut: send message)*
  - ```devOnly: true,``` *(par défaut: false)*
  - ```cooldown: t,``` t= les temps entre 2 executions de la commande, en seconde *(par défaut: 0s)*