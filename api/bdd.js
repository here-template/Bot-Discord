const {yellow, redBright, blackBright} = require("cli-color");
const mysql = require("mysql");
const config = require("../config.json");

async function connectionPool(msg = true) {
	let pool = mysql.createPool({
		host: config.bdd.host, // Adresse de la base de donnée
		port: config.bdd.port, // Port de la base de donnée
		user: config.bdd.user, // Nom d'utilisateur de la base de donnée
		password: config.bdd.password, // Mot de passe de la base de donnée
		database: config.bdd.database, // Nom de la base de donnée
		connectionLimit: 30, // Nombre de connections simultanés
	});
	// Envoie le retour d'un message en fonction de l'etat de la base de donnée
	pool.query("SELECT test FROM test WHERE test = 'good_start'", function (err) { // Test de connection à la base de donnée (bien vérifier le wiki)
		if (err) {
			console.log(redBright("Erreur connection base de données.\n" + err));
			console.log(redBright.bold(">> Shutdown ! <<"));
			const client = require("../index").client;
			return client.destroy(); // Shutdown le bot si erreur de connection
		}
		if (msg) {
			console.log(blackBright("Connection à la base de données réussite !"));
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
		console.log("requête MySQL vide !");
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
		if (process.env.DEBUG === "true") {
			console.log(yellow(`> Requête MySQL : "${re}"`));
			console.table(await result);
		}
		return result;
	} catch (error) {
		console.log(redBright("Mysql error dans query()"));
		return result;
	}
};
