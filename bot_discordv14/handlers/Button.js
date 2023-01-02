const fs = require("fs");

module.exports = (client) => {
  fs.readdirSync("./interactions/").forEach((dir) => {
    const files = fs
      .readdirSync(`./interactions/button/`)
      .filter((file) => file.endsWith(".js"));
    if (!files || files.length <= 0);
    files.forEach((file) => {
      const button = require(`../interactions/button/${file}`);
      if (button) {
        client.btn.set(button.name, button);
      }
    });
  });
};