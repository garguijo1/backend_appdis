-- SP ******************************[LISTAR SEDES]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´listar_sedes´ $$
CREATE PROCEDURE listar_sedes()
BEGIN
    SELECT * FROM sedes;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[INSERTAR SEDE]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´insertar_sede´ $$
CREATE PROCEDURE insertar_sede(
  	IN psede VARCHAR(100),
	IN pubicacion VARCHAR(250),
	IN pmesas INT
)
BEGIN
  INSERT INTO sedes(sede, ubicacion, mesas)
  VALUES(psede, pubicacion, pmesas);
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[BUSCAR SEDE]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´buscar_sede´ $$
CREATE PROCEDURE buscar_sede(
  IN id_sede_param INT
)
BEGIN
    SELECT * FROM sedes
    WHERE p.id_sede = id_sede_param;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[EDITAR SEDE]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´editar_sede´ $$
CREATE PROCEDURE editar_sede(
  	IN id_sede_param INT,
	IN psede VARCHAR(100),
	IN pubicacion VARCHAR(250),
	IN pmesas INT,
)
BEGIN
    UPDATE sedes SET sede=psede, ubicacion=pubicacion, mesas=pmesas
    WHERE id_sede = id_sede_param;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[ELIMINAR SEDE]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´eliminar_sede´ $$
CREATE PROCEDURE eliminar_sede(
  IN id_sede_param INT
)
BEGIN
    DELETE FROM sedes 
    WHERE id_sede = id_sede_param;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"
