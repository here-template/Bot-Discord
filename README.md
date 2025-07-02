# 🤖 Bot Discord.js v14

This repository contains a bot template for `discord.js@v14`. It use external handler (developped by cleboost `djs-core` ans some submodule). The bot is designed with a handler to easily create commands, buttons, selections and other fun interactions.

---

## 🛠️ Prerequisites

Before using this bot, make sure you have:

- **Node.js (min v18)**: To develop and run the script.
- **Javascript IDE**: A development environment to edit the code like Visual Studio Code (free), WebStorm (paid).

## 🚀 Installation

1. Clone this repository to your local system.
2. Open the project in your development environment.
4. Go to `src/` folder, it contains the main bot script.
3. Edit `.env` with your bot token.
4. Customize `config.ts` with your settings (optional).
4. Install NPM package with `pnpm i` command (you can use `npm i` or `yarn` but `pnpm` is recommended).
5. Start bot with `pnpm run start` (or `npm run start` or `yarn run start`).

## 🛠️ Build 

1. Build the project with `pnpm run build` (you can customize build options in build script in `package.json` for obfuscation, etc.)
2. You can now run the bot with `node dist/index.js`
3. If you use prisma, be sure to run `npx prisma generate` before building and copy the `prisma` & node_modules folders to the `dist` folder
4. You can also get all content of the `dist` folder and put it in a zip file to deploy it on a server

---

## ⚙️ Included Sqlite native

This project includes Sqlite natively and exemples of usage in the commands. You can use it to store data, like user's money, server's settings, etc.

## 📜 Default commands available:

- ~~📚 **/help** Dynamically generates help message with existing commands~~ (in redev)
- ~~⛔ **/stop** Stops the bot *(admin command)*~~
- ~~🧪 **/test** Empty command for testing purposes *(devOnly command)*~~
- 🏓 **/ping** Displays bot latency (in ms)
- 🛠️ **/middleware-demo** Interactive demonstration of middleware functionality
- Example commands for various options

---

## 🔧 Middleware System

This bot includes a comprehensive middleware system that allows you to intercept and process interactions before they reach their handlers. The middleware demo showcases:

### Available Middlewares
- **Analytics Middleware**: Logs and tracks interaction statistics
- **Cooldown Middleware**: Implements rate limiting to prevent spam
- **Command Middleware**: Validates permissions and blocks DM commands
- **Button Middleware**: Controls access to admin-only buttons
- **Modal Middleware**: Validates form submissions
- **Select Middleware**: Manages select menu permissions and validation

### Testing Middlewares
Use the `/middleware-demo` command to interactively test all middleware types:
- Try the normal and admin-only buttons
- Test the select menu with different permission levels
- Observe console logs showing middleware activity
- Experience cooldown protection by using commands quickly

### Extending Middlewares
The middleware system is easily extensible. Check `src/middlewares/` for examples and documentation on creating custom middlewares for:
- Database integration
- Advanced permission systems
- Content filtering
- Audit logging
- Custom validation logic

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

## 🛠️ SubCommand :

This projet allow you to create sub command like `/command subcommand`. To do it, you can check exemple in `src/interactions/commands/utils/handler.ts` and `src/interactions/commands/utils/handler/button.ts`
As you can see, you need to create the regitred command where you define name of your command, description, default permission, sub command. In subfolder with same name of your command, you can create subcommand. Subcommand files need to have same name of the subcommand.

---

## 🤝 Contribution

Contributions are welcome! If you want to improve this bot or add new features, feel free to submit a pull request.

## ⚖️ License

This project is licensed under MIT - see the [LICENSE](https://github.com/here-template/Bot-Discord/blob/main/LICENSE) link for more details. 📜