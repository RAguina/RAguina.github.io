const app = require('./config/server'); //Configuracion del server

require('./app/routes/libros')(app); //Rutas

app.listen(app.get('port'),()=>{
    console.log('Activo en el puerto ',app.get('port'));
});