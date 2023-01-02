# Base de bot discord.js v14

 ## Fonctionalité :
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