-- SP ******************************[LISTAR CLIENTES]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´listar_clientes´ $$
CREATE PROCEDURE listar_clientes()
BEGIN
    SELECT id_cliente, usuario, nombre, telefono, correo 
    FROM clientes
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[INSERTAR CLIENTE]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´insertar_cliente´ $$
CREATE PROCEDURE insertar_cliente(
  	IN pusuario VARCHAR(100),
  	IN ppass VARCHAR(256),
  	IN pnombre VARCHAR(100),
  	IN ptelefono VARCHAR(15),
  	IN pdni VARCHAR(15),
	IN pcorreo VARCHAR(200),
	IN pid_rol INT
)
BEGIN
  INSERT INTO clientes(nombre, pass, nombre, telefono, dni, correo, id_rol)
  VALUES(pnombre, ppass, pnombre, ptelefono, pdni, pcorreo, pid_rol);
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[BUSCAR CLIENTE]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´buscar_cliente´ $$
CREATE PROCEDURE buscar_cliente(
  IN pid_cliente INT
)
BEGIN
    SELECT id_cliente, usuario, nombre, telefono, correo 
    FROM clientes
    WHERE id_cliente = pid_cliente;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[EDITAR CLIENTE]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´editar_cliente´ $$
CREATE PROCEDURE editar_cliente(
 	IN pid_cliente INT,
	IN pusuario VARCHAR(100),
  	IN ppass VARCHAR(256),
  	IN pnombre VARCHAR(100),
  	IN ptelefono VARCHAR(15),
  	IN pdni VARCHAR(15),
	IN pcorreo VARCHAR(200),
	IN pid_rol INT
)
BEGIN
    UPDATE clientes SET usuario=pusuario, pass=ppass, nombre=pnombre, telefono=ptelefono, dni=pdni, correo=pcorreo, id_rol=pid_rol
    WHERE id_cliente = pid_cliente;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[ELIMINAR CLIENTE]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´eliminar_cliente´ $$
CREATE PROCEDURE eliminar_cliente(
  IN pid_cliente INT
)
BEGIN
    DELETE FROM clientes 
    WHERE id_cliente = pid_cliente;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"
