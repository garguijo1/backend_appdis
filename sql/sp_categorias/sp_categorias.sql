-- SP ******************************[LISTAR CATEGORIAS]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´listar_categorias´ $$
CREATE PROCEDURE listar_categorias()
BEGIN
    select * from categorias;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[INSERTAR CATEGORIA]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´insertar_categoria´ $$
CREATE PROCEDURE insertar_categoria(
	IN pcategoria VARCHAR(100)
)
BEGIN
  INSERT INTO categorias(categoria)
  VALUES(pcategoria);
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[BUSCAR CATEGORIA]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´buscar_categoria´ $$
CREATE PROCEDURE buscar_categoria(
  IN pid_categoria INT
)
BEGIN
    SELECT * from categorias
    WHERE id_categoria = pid_categoria;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[EDITAR CATEGORIA]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´editar_categoria´ $$
CREATE PROCEDURE editar_categoria(
  	IN pid_categoria INT,
	IN pcategoria VARCHAR(100)
)
BEGIN
    UPDATE categorias SET categoria=pcategoria
    WHERE id_categoria = pid_categoria;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[ELIMINAR CATEGORIA]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´eliminar_categoria´ $$
CREATE PROCEDURE eliminar_categoria(
  IN id_categoria_param INT
)
BEGIN
    DELETE FROM categorias 
    WHERE id_categoria = id_categoria_param;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"
