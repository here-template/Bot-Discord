const fs = require("fs");

module.exports = (client) => {
    fs.readdirSync('./interactions/select').forEach(dir => {
        const files = fs.readdirSync(`./interactions/select/`).filter(file => file.endsWith('.js'));
        if (!files || files.length <= 0);
        files.forEach(file => {
            const select = require(`../interactions/select/${file}`)
            if (select) {
                client.select.set(select.name, select)
            };
        });
    });
};