CREATE DATABASE libreriaAguinagalde6;
USE libreriaAguinagalde6;


CREATE TABLE socios(
    id_socio INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR (50),
    apellido VARCHAR (50),
    telefono VARCHAR (50),
    dni VARCHAR (50),
    email VARCHAR (50),
    fecha_nacimiento DATE,
    fecha_alta DATE
);
    
CREATE TABLE empleados(
    id_empleado INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR (50),
    apellido VARCHAR (50),
    cargo INT
);

CREATE TABLE cargos(
    id_cargo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    cargo VARCHAR (50)
);

CREATE TABLE libros(
    id_libro INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    isbn VARCHAR (50),
    titulo VARCHAR (50),
    resena VARCHAR (200),
    autor INT,
    genero INT,
    subgenero INT,
    id_autor INT,
    id_genero INT,
    FOREIGN KEY (id_autor) REFERENCES autores(id_autor),
    FOREIGN KEY (id_genero) REFERENCES generos(id_genero)    
);

CREATE TABLE autores(
    id_autor INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR (50),
    apellido VARCHAR (50)
);
/*
CREATE TABLE ejemplares(
    id_ejemplar INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    estado VARCHAR (100),
    prestado BOOLEAN
);
*/
CREATE TABLE generos(
    id_genero INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR (50)
);
CREATE TABLE subgeneros(
    id_subgenero INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_genero INT,
    nombre VARCHAR (50)
);

CREATE TABLE prestamos(
    id_prestamo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_libro_prestamo INT,
    id_ejemplar INT,
    id_socio_prestamo INT,
    id_empleado_prestamo INT,
    fecharetiro DATE,
    id_extension INT,
    FOREIGN KEY (id_socio_prestamo) REFERENCES socios(id_socio),
    FOREIGN KEY (id_libro_prestamo) REFERENCES libros(id_libro)
);