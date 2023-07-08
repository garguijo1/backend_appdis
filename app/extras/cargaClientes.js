let numeros = [];
for (let i = 0; i < 50; i++) {
  let numero = Math.floor(Math.random() * 90000000) + 10000000;
  numeros.push('9' + numero.toString());
}
//console.log(numeros);

let documentos = [];
for (let i = 0; i < 50; i++) {
  let documento = Math.floor(Math.random() * 90000000) + 10000000;
  documentos.push(documento.toString());
}
//console.log(documentos);

let nombres = [
    ['Juan', 'Lopez'],
    ['Maria', 'Garcia'],
    ['Pedro', 'Martinez'],
    ['Ana', 'Fernandez'],
    ['Luis', 'Gonzalez'],
    ['Sofia', 'Perez'],
    ['Carlos', 'Sanchez'],
    ['Laura', 'Rodriguez'],
    ['Javier', 'Gomez'],
    ['Isabel', 'Diaz'],
    ['Miguel', 'Ruiz'],
    ['Carmen', 'Alvarez'],
    ['Antonio', 'Romero'],
    ['Elena', 'Santos'],
    ['Rafael', 'Castro'],
    ['Beatriz', 'Jimenez'],
    ['David', 'Moreno'],
    ['Natalia', 'Hernandez'],
    ['Diego', 'Torres'],
    ['Alicia', 'Vazquez'],
    ['Manuel', 'Navarro'],
    ['Marta', 'Ortega'],
    ['Jorge', 'Iglesias'],
    ['Cristina', 'Serrano'],
    ['Francisco', 'Molina'],
    ['Silvia', 'Ramirez'],
    ['Pablo', 'Saez'],
    ['Raquel', 'Vega'],
    ['Alejandro', 'Ramos'],
    ['Lucia', 'Blanco'],
    ['Fernando', 'Cruz'],
    ['Julia', 'Morales'],
    ['Adrian', 'Garrido'],
    ['Eva', 'Esteban'],
    ['Ruben', 'Nunez'],
    ['Patricia', 'Prieto'],
    ['Guillermo', 'Calvo'],
    ['Olga', 'Gallego'],
    ['Santiago', 'Ibanez'],
    ['Lorena', 'Lopez'],
    ['Victor', 'Mendez'],
    ['Nerea', 'Cortes'],
    ['Alberto', 'Soria'],
    ['Sara', 'Vidal'],
    ['Ignacio', 'Vargas'],
    ['Ainhoa', 'Aguilar'],
    ['Jose', 'Cano'],
    ['Marina', 'Carrasco']
];

console.log(typeof nombres);

let usuarios = [];

let consulta = `
    INSERT INTO clientes (
        usuario, 
        pass, 
        nombre, 
        telefono, 
        dni, 
        correo, 
        id_rol
    ) VALUES `;

for (let i = 0; i < 50; i++) {
    let usuario = {};
    if(nombres[i]){
        usuario.nombre = nombres[i][0] + ' ' + nombres[i][1];
        usuario.user = (nombres[i][0].substring(0,1) + nombres[i][1]).toLowerCase();
        usuario.correo = usuario.user + '@gmail.com';
        usuario.telefono = numeros[i];
        usuario.dni = documentos[i];
        let value = `(
            '${usuario.user}',
            '6ca13d52ca70c883e0f0bb101e425a89e8624de51db2d2392593af6a84118090',
            '${usuario.nombre}',
            '${usuario.telefono}',
            '${usuario.dni}',
            '${usuario.correo}',
            2
        )`;
        if(i < 48){
            value = value + ','
        }else{
            value = value + ';'
        }
        consulta += value;
        usuarios.push(usuario);
    }
}

console.log(consulta);