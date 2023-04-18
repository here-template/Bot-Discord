const clc = require("cli-color");
const mysql = require("mysql");
const config = require("./../index").client.config;

async function connectionPool(msg = true) {
	let pool = mysql.createPool({
		host: config.bdd.host, // Adresse de la base de donnée
		port: config.bdd.port ? config.bdd.port : 3306, // Port de la base de donnée
		user: config.bdd.user, // Nom d'utilisateur de la base de donnée
		password: config.bdd.password, // Mot de passe de la base de donnée
		database: config.bdd.database, // Nom de la base de donnée
		connectionLimit: 30, // Nombre de connections simultanés
	});
	// Envoie le retour d'un message en fonction de l'etat de la base de donnée
	pool.query("SELECT name FROM media WHERE name = 'good_start'", function (err, result) { // Test de connection à la base de donnée
		if (err) {
			console.log(clc.redBright("Erreur connection base de données.\n" + err));
			console.log(clc.redBright.bold(">> Shutdown ! <<"));
			const client = require("../index").client; // On récupère le client
			return client.destroy(); // Shutdown le bot si erreur de connection
		}
		if (msg) {
			console.log(clc.blackBright("Connection à la base de données réussite !"));
		}
	});
	return pool;
}

// Avec sa plus besoin de test dans index.js
const bddPool = connectionPool(true);

module.exports.pool = bddPool;

/**
 * @param {string} re - requete mysql que on veut executer
 */
module.exports.query = async (re) => {
	if (re === undefined) {
		console.log("requete vide");
		return false;
	}
	let pool = await require("./bdd.js").pool;
	try {
		let result = new Promise((resolve, reject) => {
			pool.query(re, function (err, result_query) {
				if (err) return reject(err);
				return resolve(result_query); //renvoi boolean, si @id à un compte ou pas
			});
		});
		return result;
	} catch (error) {
		console.log("Mysql error dans query()");
		return result;
	}
};
