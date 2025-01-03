# 🤖 Bot Discord.js v14

This repository contains a bot template for `discord.js@v14`. The bot is designed with a handler to easily create commands, buttons, selections and other fun interactions.

> **Note:** A new version is currently in development. It will be released in the coming weeks and will update the codebase, revamp the handler, and increase flexibility for beginner developers. Stay tuned for updates! 🚀

---

## 🛠️ Prerequisites

Before using this bot, make sure you have:

- **Node.js (min v18)**: To develop and run the script.
- **WebStorm IDEA (paid IDE)**: A recommended Javascript development environment for optimal compatibility with node.js and NPM. 🚀
- **Alternative Javascript development environment**: If you prefer using another Javascript development environment, make sure it is compatible with node.js and NPM.

## 🚀 Installation

1. Clone this repository to your local system.
2. Open the project in your development environment.
3. Edit `.env` and `config.json` with your informations
4. Install NPM package with `npm i` command
5. Start bot with `npm start`

## 🛠️ Build 

1. Build the project with `npm run build`
2. You can now run the bot with `node dist/index.js`
3. If you use prisma, be sure to run `npx prisma generate` before building and copy the `prisma` & node_modules folders to the `dist` folder
4. You can also get all content of the `dist` folder and put it in a zip file to deploy it on a server

---

## ⚙️ Included Sqlite native

This project includes Sqlite natively and exemples of usage in the commands. You can use it to store data, like user's money, server's settings, etc.

## 📜 Default commands available:

- ~~📚 **/help** Dynamically generates help message with existing commands~~ (in redev)
- ⛔ **/stop** Stops the bot *(admin command)*
- 🧪 **/test** Empty command for testing purposes *(devOnly command)*
- 🏓 **/ping** Displays bot latency (in ms)
- Example commands for various options

---

## 💡 Particularities :

- Admin category commands are not shown in /help and require being registered (Discord ID) in the `config.json` owner array 👑
- Commands marked as `devOnly: true` require being a developer to execute and should be registered in the `config.json` dev array 💻
- Configurations are cached in the client, accessible by `client.config`
- DB is cached in the client, accessible by `client.db`
- Cooldown is in seconds but resets on each bot restart; it's disabled for devOnly commands ⏱️
- You can launch the bot with `npm run dev`, in which case the bot restarts with each save you make, otherwise use `node index.js` or `npm run start`
- Buttons and commands can have categories: create a folder and place the file inside (see examples)
- Debug mode enabled by default, configuration in `.env`

## 🛠️ Command Options :

- ```userPermissions: [""]``` - Additional permissions required by the user *(default: ```sendMessages```)*
- ```botPermissions: [""]``` - Additional permissions required by the bot *(default: ```sendMessages```)*
- ```devOnly: true``` - *(default: ```false```)*
- ```cooldown: 2``` - Time (in seconds) between 2 executions of the command, in seconds *(default: ```0s```)*
- ```mp: true``` - If true, the command can be executed in DMs; if false, it can only be executed on a server *(default: ```false```)*

## 🛠️ Command Group :

- Allows you to group multiple commands under the same name, e.g., `/music on` and `/music off`
- To do this, create a folder for the sub-commands and place the files inside like normal commands (they do not have access to command options explained above)
- add ```subCommande: true``` as a parameter
- and add another command file (this one without code, so no `runInteraction` function), with:
  - The same name as the folder
  - The parameter: ```commandeGroupe: true```
  - And the parameter ```category: category```, the category you want the command to be in (leave "" if you want no category)
  - It's in this command file that you can put command options

---

## 🤝 Contribution

Contributions are welcome! If you want to improve this bot or add new features, feel free to submit a pull request.

## ⚖️ License

This project is licensed under MIT - see the [LICENSE](https://github.com/here-template/Bot-Discord/blob/main/LICENSE) link for more details. 📜