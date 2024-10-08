const fs = require('node:fs');

const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
packageJson.main = 'index.js';
packageJson.scripts = {
    'start': 'node .',
    'db': 'prisma db push'
};

fs.writeFileSync('./dist/package.json', JSON.stringify(packageJson, null, 2));

fs.cpSync('prisma/', 'dist/prisma/', { recursive: true, filter: (src) => !src.endsWith('.db') });
fs.copyFileSync('.env', 'dist/.env');
fs.copyFileSync('config.json', 'dist/config.json');

const needFolder = ['interactions/context/message', 'interactions/context/user', 'interactions/buttons', 'interactions/commands', 'interactions/modals', 'interactions/selects'];
needFolder.forEach((folder) => {
    if (!fs.existsSync(`dist/${folder}`)) fs.mkdirSync(`dist/${folder}`, {recursive: true});
});


/*
    This script will be executed after the build command.
    It will copy the prisma folder, the .env file, the config folder and create the needed folders for the interactions
    It will also modify the package.json file to have the right main file and scripts
*/