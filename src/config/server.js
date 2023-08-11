const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

//const __dirname = dirname(fileURLToPath(import.meta.url)); //Forma dinamica de obtener la ruta absoluta
	
app.set('port',process.env.PORT || 3000);
//setting
app.set('view engine','ejs');
app.set('views', path.join(__dirname, '../app/views'));

	//Middleware
//app.use(express.text());
app.use(bodyParser.urlencoded({extended:false}));
module.exports=app;