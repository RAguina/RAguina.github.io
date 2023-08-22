const dbConnection = require('../../config/dbConnection');

module.exports = app =>{
const conexion = dbConnection();
//********************************************************************************* */
app.get('/', (req,res)=>{
    res.render('carga.ejs', {            
    }) 
});
//***************       SOCIOS      ********************************************** */
app.get('/socios', (req,res)=>{
    conexion.query('SELECT * FROM socios', (err, result)=>{
        res.render('socios.ejs', {
            socios: result
        });
    });
});
//********************************************************************************* */
app.post('/agregar_socio', (req,res)=> {   
           
    const nombre = req.body.nombre;  
    const apellido = req.body.apellido;  
    const dni = req.body.dni;  
    const telefono = req.body.telefono;  
    const email = req.body.email;  
    const fecha_alta = new Date();
    const fecha_nacimiento = req.body.fecha_nacimiento || null;  
          
    const query = 'INSERT INTO socios (nombre, apellido, dni, telefono, email, fecha_nacimiento, fecha_alta) values (?, ?, ?, ?, ?, ?, ?)';        
 
     conexion.query(query, [nombre, apellido, dni, telefono, email, fecha_nacimiento, fecha_alta], (err, result) => {
        if(err) {
            console.error('Error al agregar registro: ', err);
            res.status(500).send('Error al agregar el registro');
        } else {
            console.log('Registros agregados correctamente');
            
            res.redirect('/socios');
        }
    })       
});
//********************************************************************************* */
app.get('/borrar_socio/:id', (req, res)=> {
    const id= req.params.id;

     // Eliminar de prestamos el socio
     const queryPrestamos = 'DELETE FROM prestamos WHERE id_socio_prestamo = ?';

     conexion.query(queryPrestamos, [id], (err, result) => {
         if(err) {
             console.error('Error al eliminar préstamos: ', err);
             res.status(500).send('Error al eliminar préstamos');
         } else {
             console.log('Préstamos eliminados correctamente');

    const query = 'DELETE FROM socios WHERE id_socio = ?';

    conexion.query(query, [id], (err, result)=>{
        if(err) {
            console.error('Error al editar registro: ', err);
            res.status(500).send('Error al editar registro');
        } else {
            console.log('Registros editado correctamente');
            res.redirect('/socios');
            
            }
         }) 
        }
     })
});
//********************************************************************************* */
app.get('/editar_socio/:id', (req,res)=>{
    const id = req.params.id;
   
    const query='SELECT * FROM socios WHERE id_socio = ?';
    conexion.query(query,[id],(err,result)=>{
        if(err){
            console.error('Error al editar el registro: ', err);
            res.status(500).send('Error al editar el registro');
        }else{
            console.log('Registro editado correctamente');
            res.render('editar_socio',{
            socio:result[0]
            });
        }
    });
});
//********************************************************************************* */
app.post('/editar_socio/:id', (req,res)=> {    
   
    const id = req.params.id;
    const nombre = req.body.editar_socio_nombre;  
    const apellido = req.body.editar_socio_apellido;  
    const dni = req.body.editar_socio_dni;  
    const telefono = req.body.editar_socio_telefono;  
    const email = req.body.editar_socio_email;  
    //const nacimiento = req.body.nacimiento;  
      
    
    const query = 'UPDATE socios SET nombre = ?, apellido = ?, dni = ?, telefono = ?, email = ?  WHERE id_socio = ?';

    conexion.query(query, [nombre, apellido, dni, telefono, email, id], (err, result) => {
        if(err) {
            console.error('Error al editar registro: ', err);
            res.status(500).send('Error al editar el registro');
        } else {
            console.log('Registros editado correctamente');
            res.redirect('/socios');
        }
    })
    
});
//***************       EMPLEADOS      ********************************************** */
app.get('/empleados', (req,res)=>{
    conexion.query('SELECT * FROM empleados', (err, result)=> {
        if (err) {
            console.log('Error al consultar los empleados', err);
            res.status(500).send('Error al consultar los empleados');
        } else {
            const cargos = conexion.query('SELECT * FROM cargos', (err, result2)=> {
                if (err) {
                    console.log('Error al consultar los cargos', err);
                    res.status(500).send('Error al consultar los cargos');
                } else {
                    res.render('empleados.ejs', {
                        empleados: result,
                        cargos: result2
                    });
                }
            });
        }
    });
});
//********************************************************************************* */
app.post('/agregar_empleado', (req,res)=> {   
    console.log(req.body);   
   
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const cargo = req.body.cargo;

    const query = 'INSERT INTO empleados (nombre, apellido, cargo) values (?, ?, ?)';
    

    conexion.query(query, [nombre, apellido, cargo], (err, result) => {
        if(err) {
            console.error('Error al agregar registro: ', err);
            res.status(500).send('Error al agregar el registro');
        } else {
            console.log('Registros agregados correctamente');
            res.redirect('/empleados');
        }
    })
    
});
//********************************************************************************* */
app.get('/editar_empleados/:id', (req,res)=>{
    const id = req.params.id;
    conexion.query('SELECT * FROM empleados WHERE id_empleado = ?', [id], (err, result)=> {
        if (err) {
            console.log('Error al consultar los empleados', err);
            res.status(500).send('Error al consultar los empleados');
        } else {
            const cargos = conexion.query('SELECT * FROM cargos', (err, result2)=> {
                if (err) {
                    console.log('Error al consultar los cargos', err);
                    res.status(500).send('Error al consultar los cargos');
                } else {
                    res.render('editar_empleados.ejs', {
                        empleado: result[0],
                        cargos: result2
                    });
                }
            });
        }
    });
});
//********************************************************************************* */
/*PROBANDO
app.get('/editar_empleados/:id', (req,res)=>{
    conexion.query('SELECT * FROM empleados', (err, result)=> {
        if (err) {
            console.log('Error al consultar los empleados', err);
            res.status(500).send('Error al consultar los empleados');
        } else {
            const cargos = conexion.query('SELECT * FROM cargos', (err, result2)=> {
                if (err) {
                    console.log('Error al consultar los cargos', err);
                    res.status(500).send('Error al consultar los cargos');
                } else {
                    res.render('editar_empleados.ejs', {
                        empleados: result[0],
                        cargos: result2
                    });
                }
            });
        }
    });
});
*/
/*PROBANDO2
app.get('/editar_empleados/:id', (req,res)=>{
    const id = req.params.id;
   
    const query='SELECT * FROM empleados WHERE id_empleado = ?';
    conexion.query(query,[id],(err,result)=>{
        if(err){
            console.error('Error al editar el registro: ', err);
            res.status(500).send('Error al editar el registro');
        }else{
            console.log('Registro editado correctamente');
            res.render('editar_empleados',{
            empleado:result[0]
            });
        }
    });
});
*/
app.post('/editar_empleados/:id', (req,res)=> {   
    const id = req.params.id;
    const nombre = req.body.editar_empleado_nombre;
    const apellido = req.body.editar_empleado_apellido;
    const cargo = req.body.editar_empleado_cargo;

    
    const query = 'UPDATE empleados SET nombre = ?, apellido = ?, cargo = ? WHERE id_empleado = ?';

    conexion.query(query, [id,nombre,apellido,cargo], (err, result) => {
        if(err) {
            console.error('Error al editar registro: ', err);
            res.status(500).send('Error al editar el registro');
        } else {
            console.log('Registros editado correctamente');
            res.redirect('/editar_empleados');
        }
    })
    
});
//********************************************************************************* */
app.get('/borrar_empleado/:id', (req, res)=> {
    const id= req.params.id;
    const query = 'DELETE FROM empleados WHERE id_empleado = ?';

    conexion.query(query, [id], (err, result)=>{
        if(err) {
            console.error('Error al editar registro: ', err);
            res.status(500).send('Error al editar el registro');
        } else {
            console.log('Registros editado correctamente');
            res.redirect('/empleados');
            
        }
    }) 
});
//*****************             CARGOS             ******************************** */
app.get('/cargos', (req,res)=>{
    conexion.query('SELECT * FROM cargos', (err, result)=>{
        console.log(result);
        res.render('cargos.ejs', {
            cargos: result
        });
    });
});
//********************************************************************************* */
app.get('/borrar_cargo/:id', (req, res)=> {
    const id= req.params.id;
    const query = 'DELETE FROM cargos WHERE id_cargo = ?';

    conexion.query(query, [id], (err, result)=>{
        if(err) {
            console.error('Error al editar registro: ', err);
            res.status(500).send('Error al editar registro');
        } else {
            console.log('Registros editado correctamente');
            res.redirect('/cargos');
        }
    }) 
});
//********************************************************************************* */
app.post('/agregar_cargo', (req,res)=> {    
    const nombre = req.body.nombre;        
    const query = 'INSERT INTO cargos (cargo) values (?)';    

    conexion.query(query, [nombre], (err, result) => {
        if(err) {
            console.error('Error al agregar registro: ', err);
            res.status(500).send('Error al agregar el registro');
        } else {
            console.log('Registros agregados correctamente');
            res.redirect('/cargos');
        }
    })
    
});
//********************************************************************************* */
app.get('/editar_cargo/:id', (req,res)=>{
    const id = req.params.id;
   
    const query='SELECT * FROM cargos WHERE id_cargo = ?';
    conexion.query(query,[id],(err,result)=>{
        if(err){
            console.error('Error al editar el registro: ', err);
            res.status(500).send('Error al editar el registro');
        }else{
            console.log('Registro editado correctamente');
            res.render('editar_cargo',{
            cargo:result[0]
            });
        }
    });
});
//********************************************************************************* */
app.post('/editar_cargo', (req,res)=> {   
    const id = req.body.id;
    const nombre = req.body.editar_cargo_nombre;
    
    const query = 'UPDATE cargos SET cargo = ? WHERE id_cargo = ?';

    conexion.query(query, [nombre, id], (err, result) => {
        if(err) {
            console.error('Error al editar registro: ', err);
            res.status(500).send('Error al editar el registro');
        } else {
            console.log('Registros editado correctamente');
            res.redirect('/cargos');
        }
    })

});
//***************       LIBROS      ********************************************** */
app.get('/libros', (req, res) => {
    conexion.query('SELECT * FROM libros', (err, result) => {
        if (err) {
            console.log('Error al consultar los libros: ', err);
            res.status(500).send('Error al consultar los libros');
        } else {
            const autores = conexion.query('SELECT * FROM autores', (err, result2) => {
                if (err) {
                    console.log('Error al consultar los autores: ', err);
                    res.status(500).send('Error al consultar los autores');
                } else {
                    const generos = conexion.query('SELECT * FROM generos', (err, result3) => {
                        if (err) {
                            console.log('Error al consultar los generos: ', err);
                            res.status(500).send('Error al consultar los generos');
                        } else {
                            res.render('libros.ejs', {
                                libros: result,
                                autores: result2,
                                generos: result3
                            });
                        }
                    });
                }
            });
        }
    });
});
//********************************************************************************* */
app.post('/agregar_libro', (req,res)=> {
    const titulo = req.body.titulo; 
    const isbn = req.body.isbn;
    const resena = req.body.resena;
    const idautor = req.body.autor;
    const idgenero = req.body.genero;       
 
    const query = 'INSERT INTO libros (titulo, isbn, resena, autor, genero) values (?, ?, ?, ?, ?)';    
    console.log("Probando");
    conexion.query(query, [titulo, isbn, resena, idautor, idgenero], (err, result) => {
        if(err) {
            console.error('Error al agregar registro: ', err);
            res.status(500).send('Error al agregar el registro');
        } else {
            console.log('Registros agregados correctamente');
            res.redirect('/libros');
        }
    })        
});
//********************************************************************************* */
app.get('/borrar_libro/:id', (req, res)=> {
    const id= req.params.id;
    const query = 'DELETE FROM libros WHERE id_libro = ?';

    conexion.query(query, [id], (err, result)=>{
        if(err) {
            console.error('Error al editar registro: ', err);
            res.status(500).send('Error al editar registro');
        } else {
            console.log('Registros editado correctamente');
            res.redirect('/libros');
            
        }
    }) 
});
//********************************************************************************* */
app.get('/editar_libros/:id', (req,res)=>{
    const id = req.params.id;
   
    const query='SELECT * FROM libros WHERE id_libro = ?';
    conexion.query(query,[id],(err,result)=>{
        if(err){
            console.error('Error al editar el registro de libros: ', err);
            res.status(500).send('Error al editar el registro de libros');
        }else{
            const autores = conexion.query('SELECT * FROM autores',(err,result2)=>{
            if(err){
                console.error('Error al consultar autores: ', err);
                res.status(500).send('Error al consultar autores');
            }else{
                const generos = conexion.query('SELECT * FROM generos', (err,result3)=>{
                    if(err){
                        console.error('Error al consultar genero: ', err);
                        res.status(500).send('Error al consultar genero');
                    }else{
                        console.log('Registro editado correctamente');
                        res.render('editar_libros',{
                        libro:result[0],
                        autores: result2,
                        generos: result3
                        });
                    }
            });
            }; 
            });
            }
        });

    });

app.post('/editar_libros/:id', (req,res)=> {   
    const id = req.params.id;
    const titulo = req.body.editar_libro_titulo;
    const isbn = req.body.editar_libro_isbn;
    const resena = req.body.editar_libro_resena;
    const autor = req.body.editar_libro_autor;
    const genero = req.body.editar_libro_generoliterario;
    const ejemplares = req.body.editar_libro_ejemplares;
    
    const query = 'UPDATE libros SET titulo = ?, isbn = ?, resena = ?, autor = ?, genero = ?, ejemplares =? WHERE id_libro = ?';

    conexion.query(query, [titulo, isbn, resena, autor, genero, id], (err, result) => {
        if(err) {
            console.error('Error al editar registro: ', err);
            res.status(500).send('Error al editar el registro');
        } else {
            console.log('Registros editado correctamente');
            res.redirect('/libros');
        }
    })
    
});
//***************       AUTORES      ********************************************** */
app.get('/autores', (req,res)=>{
    conexion.query('SELECT * FROM autores', (err, result)=> {
        if (err) throw err;
        res.render('autores.ejs', {
            autores: result
        });                   
    });
});
//*********************************************************************************
app.post('/agregar_autor', (req,res)=> {
    const nombre = req.body.nombre;  
    const apellido = req.body.apellido; 

    const query = 'INSERT INTO autores (nombre, apellido) values (?, ?)';    

    conexion.query(query, [nombre, apellido], (err, result) => {
        if(err) {
            console.error('Error al agregar registro: ', err);
            res.status(500).send('Error al agregar el registro');
        } else {
            console.log('Registros agregados correctamente');
            res.redirect('/autores');
        }
    })        
});
//********************************************************************************* */
app.get('/borrar_autor/:id', (req, res)=> {
    const id= req.params.id;
    const query = 'DELETE FROM autores WHERE id_autor = ?';

    conexion.query(query, [id], (err, result)=>{
        if(err) {
            console.error('Error al editar registro: ', err);
            res.status(500).send('Error al editar registro');
        } else {
            console.log('Registros editado correctamente');
            res.redirect('/autores');
            
        }
    }) 
});
//********************************************************************************* */
app.post('/editar_autor', (req,res)=> {   
    const id = req.body.id;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    
    const query = 'UPDATE autores SET nombre = ?, apellido = ? WHERE id_autor = ?';

    conexion.query(query, [nombre, apellido, id], (err, result) => {
        if(err) {
            console.error('Error al editar registro: ', err);
            res.status(500).send('Error al editar el registro');
        } else {
            console.log('Registros editado correctamente');
            res.redirect('/autores');
        }
    })
    
});
//***************       GENEROS      ********************************************** */
app.get('/generos', (req,res)=>{
    conexion.query('SELECT * FROM generos', (err, result)=>{
        res.render('generos.ejs', {
            generos: result
        });
    });
});
app.post('/agregar_genero', (req,res)=> {   
    const nombre = req.body.nombre;  

    const query = 'INSERT INTO generos (nombre) values (?)';    

    conexion.query(query, [nombre], (err, result) => {
        if(err) {
            console.error('Error al agregar registro: ', err);
            res.status(500).send('Error al agregar el registro');
        } else {
            console.log('Registros agregados correctamente');
            res.redirect('/generos');
        }
    })        
});
//********************************************************************************* */
app.get('/borrar_genero/:id', (req, res)=> {
    const id= req.params.id;
    const query = 'DELETE FROM generos WHERE id_genero = ?';

    conexion.query(query, [id], (err, result)=>{
        if(err) {
            console.error('Error al editar registro: ', err);
            res.status(500).send('Error al editar registro');
        } else {
            console.log('Registros editado correctamente');
            res.redirect('/generos');
            
        }
    }) 
});
//********************************************************************************* */
app.post('/editar_genero', (req,res)=> {   
    const id = req.body.id;
    const nombre = req.body.nombre;
    
    const query = 'UPDATE generos SET nombre = ? WHERE id_genero = ?';

    conexion.query(query, [nombre, id], (err, result) => {
        if(err) {
            console.error('Error al editar registro: ', err);
            res.status(500).send('Error al editar el registro');
        } else {
            console.log('Registros editado correctamente');
            res.redirect('/generos');
        }
    })
    
});
//***************       PRESTAMOS      ********************************************** */
app.get('/form_prestamo', (req, res) => {
    conexion.query('SELECT * FROM empleados', (err, result) => {
        if (err) {
            console.log('Error al consultar los empleados: ', err);
            res.status(500).send('Error al consultar los empleados');
        } else {
            const result2 = conexion.query('SELECT * FROM libros', (err, result2) => {
                if (err) {
                    console.log('Error al consultar los libros: ', err);
                    res.status(500).send('Error al consultar los libros');
                } else {
                    const result3 = conexion.query('SELECT * FROM socios', (err, result3) => {
                        if (err) {
                            console.log('Error al consultar los socios: ', err);
                            res.status(500).send('Error al consultar los socios');
                        } else {
                            res.render('form_prestamo.ejs', {
                                empleados: result,
                                libros: result2,
                                socios: result3
                            });
                        }
                    });
                }
            });
        }
    });
});
//********************************************************************************* */
app.get('/prestamos', (req,res)=>{
    conexion.query('SELECT prestamos.id_prestamo, prestamos.id_libro_prestamo, prestamos.id_socio_prestamo, prestamos.id_empleado_prestamo, prestamos.fecharetiro, libros.titulo, libros.autor, socios.nombre AS socio_nombre, socios.apellido AS socio_apellido, empleados.nombre AS empleado_nombre, empleados.apellido AS empleado_apellido FROM prestamos INNER JOIN libros ON prestamos.id_libro_prestamo = libros.id_libro INNER JOIN socios ON prestamos.id_socio_prestamo = socios.id_socio INNER JOIN empleados ON prestamos.id_empleado_prestamo = empleados.id_empleado', (err, result)=> {
        if (err) throw err;
        conexion.query('SELECT * FROM autores', (err, result2)=> {
            if (err) throw err;  
                conexion.query('SELECT * FROM empleados', (err, result3)=> {
                    if (err) throw err;
                    conexion.query('SELECT * FROM libros', (err, result4)=> {
                        if (err) throw err;      
                            conexion.query('SELECT * FROM socios', (err, result5)=> {
                                if (err) throw err;                
                                res.render('prestamos.ejs', {
                                    prestamos: result,
                                    autores: result2,
                                    empleados: result3,
                                    libros: result4,
                                    socios: result5
                                });         
                            });            
                    });                           
                          
                });              
                  
        });
               
    });
});
//********************************************************************************* */
app.post('/agregar_prestamo', (req,res)=> {   
         
       
    const empleado = req.body.id_empleado_prestamo;  
    const libro = req.body.id_libro_prestamo;  
    const socio = req.body.id_socio_prestamo;  
    const fecha = req.body.fecha;                
    console.log("probando agregar_prestamo");
    const query = 'INSERT INTO prestamos (id_empleado_prestamo, id_libro_prestamo, id_socio_prestamo, fecharetiro) values (?, ?, ?, ?)';        
    
    conexion.query(query, [empleado, libro, socio, fecha], (err, result) => {
         console.log(result);
        if(err) {
            console.error('Error al agregar registro: ', err);
            res.status(500).send('Error al agregar el registro');
        } else {
            console.log('Registros agregados correctamente');
            res.redirect('/prestamos');
        }
    })       
});
//********************************************************************************* */
app.get('/editar_prestamo/:id', (req, res) => {
    const id = req.params.id;
   
    const query = 'SELECT * FROM prestamos WHERE id_prestamo = ?';
    conexion.query(query, [id], (err, result) => {
        if (err) {
            console.error('Error al editar el registro: ', err);
            res.status(500).send('Error al editar el registro');
        } else {
            const queryLibros = 'SELECT libros.*, autores.id_autor, autores.nombre FROM libros LEFT JOIN autores ON libros.id_autor = autores.id_autor';
            conexion.query(queryLibros, (err, result2) => {
                if (err) {
                    console.error('Error al obtener los libros: ', err);
                    res.status(500).send('Error al obtener los libros');
                } else {
                    console.log('Registro editado correctamenteasdasdasdsa');
                    console.log(result2);

                    res.render('editar_prestamo', {
                        prestamo: result[0],
                        libros: result2
                    });
                }
            });
        }
    });
});
//********************************************************************************* */
app.post('/editar_prestamo/:id', (req,res)=> {           

    const id = req.params.id;
    const empleado = req.body.id_empleado_prestamo_editar;
    const libro = req.body.id_libro_prestamo_editar;
    const socio = req.body.id_socio_prestamo_editar;
    const fecha = req.body.fecha;
    
    const query = 'UPDATE prestamos SET id_empleado_prestamo = ?, id_libro_prestamo = ? , id_socio_prestamo = ? , fecharetiro = ?  WHERE id_prestamo = ?';

    conexion.query(query, [empleado, libro, socio, fecha, id], (err, result) => {
        if(err) {
            console.error('Error al editar registro: ', err);
            res.status(500).send('Error al editar el registro');
        } else {
            console.log('Registros editado correctamente');
            res.redirect('/prestamos');
        }
    })
    
});
//********************************************************************************* */
app.get('/devolucion/:id', (req, res)=> {
    const id= req.params.id;
    const query = 'DELETE FROM prestamos WHERE id_prestamo = ?';

    conexion.query(query, [id], (err, result)=>{
        if(err) {
            console.error('Error al editar registro: ', err);
            res.status(500).send('Error al editar registro');
        } else {
            console.log('Registros editado correctamente');
            res.redirect('/prestamos');
            
        }
    }) 
});

}

