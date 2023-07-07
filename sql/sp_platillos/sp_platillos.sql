-- SP ******************************[LISTAR PLATILLOS]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´listar_platillos´ $$
CREATE PROCEDURE listar_platillos()
BEGIN
    SELECT p.id_platillo, p.nombre, p.descripcion, p.precio, p.foto, p.id_categoria, c.categoria
  	FROM platillos AS p
  	INNER JOIN categorias AS c ON p.id_categoria = c.id_categoria;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[INSERTAR PLATILLO]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´insertar_platillo´ $$
CREATE PROCEDURE insertar_platillo(
  IN nombre_param VARCHAR(255),
  IN descripcion_param VARCHAR(255),
  IN precio_param DECIMAL(10, 2),
  IN foto_param VARCHAR(255),
  IN id_categoria_param INT
)
BEGIN
  INSERT INTO platillos(nombre, descripcion, precio, foto, id_categoria)
  VALUES(nombre_param, descripcion_param, precio_param, foto_param, id_categoria_param);
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[BUSCAR PLATILLO]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´buscar_platillo´ $$
CREATE PROCEDURE buscar_platillo(
  IN id_platillo_param INT
)
BEGIN
    SELECT p.id_platillo, p.nombre, p.descripcion, p.precio, p.foto, p.id_categoria, c.categoria
  	FROM platillos AS p
  	INNER JOIN categorias AS c ON p.id_categoria = c.id_categoria
    WHERE p.id_platillo = id_platillo_param;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[EDITAR PLATILLO]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´editar_platillo´ $$
CREATE PROCEDURE editar_platillo(
  IN id_platillo_param INT,
  IN nombre_param VARCHAR(255),
  IN precio_param DECIMAL(10, 2),
  IN descripcion_param VARCHAR(255),
  IN id_categoria_param INT,
  IN foto_param VARCHAR(255)
)
BEGIN
    UPDATE platillos SET nombre = nombre_param, precio = precio_param, descripcion = descripcion_param, id_categoria = id_categoria_param, foto = foto_param
    WHERE id_platillo = id_platillo_param;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[ELIMINAR PLATILLO]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´eliminar_platillo´ $$
CREATE PROCEDURE eliminar_platillo(
  IN id_platillo_param INT
)
BEGIN
    DELETE FROM platillos 
    WHERE id_platillo = id_platillo_param;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"
