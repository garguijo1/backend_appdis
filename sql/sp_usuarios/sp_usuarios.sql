-- SP ******************************[LISTAR USUARIOS]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´listar_usuarios´ $$
CREATE PROCEDURE listar_usuarios()
BEGIN
    	SELECT *
	FROM usuarios
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[INSERTAR USUARIO]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´insertar_usuario´ $$
CREATE PROCEDURE insertar_usuario(
  	IN pusuario VARCHAR(100),
	IN ppass VARCHAR(256),
	IN pnombre VARCHAR(100),
	IN papellido VARCHAR(100),
	IN pid_rol INT,
	IN pid_sede INT,
	IN pcreated_at DATE
)
BEGIN
  INSERT INTO usuarios(usuario,pass,nombre,apellido,id_rol,id_sede,estado,created_at)
  VALUES(pusuario,ppass,pnombre,papellido,pid_rol,pid_sede,1,pcreated_at);
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[BUSCAR USUARIO]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´buscar_usuario´ $$
CREATE PROCEDURE buscar_usuario(
  IN pid_usuario INT
)
BEGIN
    SELECT * FROM usuarios WHERE id_usuario =  pid_usuario;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[EDITAR USUARIO]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´editar_usuario´ $$
CREATE PROCEDURE editar_usuario(
  	IN pid_usuario INT,
	IN pusuario VARCHAR(100),
	IN ppass VARCHAR(256),
	IN pnombre VARCHAR(100),
	IN papellido VARCHAR(100),
	IN pid_rol INT,
	IN pid_sede INT,
	IN pcreated_at DATE
)
BEGIN
    UPDATE usuarios SET usuario=pusuario, pass=ppass, nombre=pnombre, apellido=papellido, id_rol=pid_rol, id_sede=pid_sede, created_at=pcreated_at
    WHERE id_usuario = pid_usuario;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"


-- SP ******************************[ELIMINAR USUARIO]******************************
DELIMITER $$ -- CAMBIANDO EL DELIMITADOR POR "$$"
DROP PROCEDURE IF EXISTS ´eliminar_usuario´ $$
CREATE PROCEDURE eliminar_usuario(
  IN id_usuario_param INT
)
BEGIN
    DELETE FROM usuarios 
    WHERE id_usuario = id_usuario_param;
END$$
DELIMITER ; -- EL DELIMITADOR VUELVE A SER ";"
