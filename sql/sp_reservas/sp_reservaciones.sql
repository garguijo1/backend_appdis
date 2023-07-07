-- SP ******************************[LISTAR RESERVACIONES]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´listar_reservaciones´ $$
CREATE PROCEDURE listar_reservaciones()
BEGIN
    	SELECT r.id_reservacion,r.sillas,r.atendido,r.id_cliente,c.nombre,r.id_sede,s.sede,r.fecha 
	FROM reservaciones AS r 
	INNER JOIN sedes as s on s.id_sede = r.id_sede 
	INNER JOIN clientes AS c ON c.id_cliente = r.id_cliente;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[INSERTAR RESERVACION]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´insertar_reservacion´ $$
CREATE PROCEDURE insertar_reservacion(
  	IN psillas INT,
	IN pid_cliente INT,
	IN pid_sede INT,
	IN pfecha DATE,
	IN phora TIME
)
BEGIN
  INSERT INTO reservaciones(sillas,atendido,id_cliente,id_sede,fecha,hora,estado)
  VALUES(psillas,0,pid_cliente,pid_sede,pfecha,phora,1);
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[BUSCAR RESERVACION X ID RESERVA]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´buscar_reservacion_byIDreserva´ $$
CREATE PROCEDURE buscar_reservacion_byIDreserva(
  IN pid_reservacion INT
)
BEGIN
    	SELECT r.id_reservacion,r.sillas,r.atendido,s.sede,s.ubicacion,r.fecha
	FROM reservaciones as r 
	INNER JOIN sedes as s ON r.id_sede = s.id_sede 
	WHERE r.id_reservacion = pid_reservacion;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[BUSCAR RESERVACION X ID SEDE & RANGO FECHA]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´buscar_reservacion_byIDsedeFecha´ $$
CREATE PROCEDURE buscar_reservacion_byIDsedeFecha(
  	IN pid_sede INT,
	IN pfecha_desde DATE,
	IN pfecha_hasta DATE
)
BEGIN
    	SELECT r.id_reservacion, r.sillas,r.atendido,s.sede,s.ubicacion,r.fecha
	FROM reservaciones AS r
	INNER JOIN sedes AS s ON r.id_sede = s.id_sede
	WHERE r.id_sede = pid_sede AND r.fecha BETWEEN pfecha_desde AND pfecha_hasta;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[BUSCAR RESERVACION X ID CLIENTE]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´buscar_reservacion_byIDcliente´ $$
CREATE PROCEDURE buscar_reservacion_byIDcliente(
  	IN pid_cliente INT
)
BEGIN
    	SELECT r.id_reservacion,r.sillas,r.atendido,s.sede,s.ubicacion,r.fecha
	FROM reservaciones as r
	INNER JOIN sedes as s ON r.id_sede = s.id_sede
	WHERE r.id_cliente = pid_cliente;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[BUSCAR RESERVACION X ID SEDE]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´buscar_reservacion_byIDsede´ $$
CREATE PROCEDURE buscar_reservacion_byIDsede(
  	IN pid_sede INT
)
BEGIN
    	SELECT id_reservacion,sillas,atendido,fecha
	FROM reservaciones
	WHERE id_sede = pid_sede;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[ATENDER RESERVACION]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´atender_reservacion´ $$
CREATE PROCEDURE atender_reservacion(
  	IN pid_reservacion INT
)
BEGIN
    	UPDATE reservaciones SET atendido = 1 WHERE id_reservacion = pid_reservacion;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[CANCELAR RESERVACION]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´cancelar_reservacion´ $$
CREATE PROCEDURE cancelar_reservacion(
  	IN pid_reservacion INT
)
BEGIN
    	UPDATE reservaciones SET estado = 0 WHERE id_reservacion = pid_reservacion;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[VALIDAR HORARIO]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´validar_horario´ $$
CREATE PROCEDURE validar_horario(
  	IN pid_sede INT,
	IN pfecha DATE
)
BEGIN
    	SELECT COUNT(r.id_reservacion) AS cantidad, s.mesas
	FROM reservaciones as r
	INNER JOIN sedes AS s ON r.id_sede = s.id_sede
	WHERE r.fecha LIKE pfecha AND r.id_sede = pid_sede;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[ELIMINAR RESERVACION]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´eliminar_reservacion´ $$
CREATE PROCEDURE eliminar_reservacion(
  IN id_reservacion_param INT
)
BEGIN
    DELETE FROM reservaciones 
    WHERE id_reservacion = id_reservacion_param;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[LISTAR DETALLE RESERVACION X ID RESERVA]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´listar_detalleReservacion_byIDreserva´ $$
CREATE PROCEDURE listar_detalleReservacion_byIDreserva(
	IN pid_reservacion INT
)
BEGIN
    	SELECT rp.id_platillo, p.nombre,p.precio,p.foto,rp.cantidad
	FROM reservaciones_platillos AS rp
	INNER JOIN platillos AS p ON rp.id_platillo = p.id_platillo
	WHERE id_reservacion = pid_reservacion;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"