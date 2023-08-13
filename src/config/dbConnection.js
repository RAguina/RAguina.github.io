const mysql=require('mysql2');

module.exports = () => {
	return mysql.createConnection({
		host: 'localhost',
		user: 'root',
		insecureAuth : true,
		password: 'root',
		database: 'libreriaAguinagalde6'
	});
}