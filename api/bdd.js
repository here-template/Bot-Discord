const {yellow, redBright, blackBright} = require("cli-color");
const mysql = require("mysql");

function connectionPool() {
	const pool = mysql.createPool({
		//toutes les données suivantes sont à rentrée dans le fichier .ENV oue en variable environment
		host: process.env.HOST, // Adresse de la base de donnée
		port: process.env.PORT, // Port de la base de donnée
		user: process.env.LOGINUSER, // Nom d'utilisateur de la base de donnée
		password: process.env.PASSWORD, // Mot de passe de la base de donnée
		database: process.env.DATABASE, // Nom de la base de donnée
		connectionLimit: 30, // Nombre de connections simultanés
		charset: "utf8mb4"
	});
	// Envoie le retour d'un message en fonction de l'etat de la base de donnée
	//ici, il faut configurer le test sur une table que vous avez
	pool.query("SELECT test FROM test WHERE test = 'good_start'", function (err) { // Test de connection à la base de donnée (bien vérifier le wiki)
		if (err) {
			console.log(redBright("Erreur connection base de données.\n" + err));
			console.log(redBright.bold(">> Shutdown ! <<"));
			pool.destroy();//shutdown de la connection
			const {client} = require("../index.js");
			return client.destroy(); // Shutdown le bot si erreur de connection
		}
		console.log(blackBright("Connection à la base de données réussite !"));
	});
	return pool;
}

//démarrage de la connection
const bddPool = connectionPool();
module.exports.pool = bddPool;

/**
 * @param {string} re - requete mysql que on veut executer
 */
module.exports.query = async (re) => {
	if (!re) {
		console.log("requête MySQL vide !");
		return false;
	}
	const pool = await require("./bdd.js").pool;
	try {
		const result = new Promise((resolve, reject) => {
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
