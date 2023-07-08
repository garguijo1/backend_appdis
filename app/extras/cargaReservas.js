const reservacionesServices = require('./../servicios/reservasService.js');

const service = new reservacionesServices();

let listaDias = [];

for (let mes = 0; mes < 12; mes++) {
  for (let dia = 1; dia <= 31; dia++) {
    let fecha = new Date(2023, mes, dia);
    let fechastr = `2023-${mes+1}-${dia}`;
    
    if (fecha.getMonth() === mes) {
      listaDias.push(fechastr);
    }
  }
}

let horarios = [
    '16:00:00',
    '17:00:00',
    '18:00:00',
    '19:00:00',
    '20:00:00',
    '21:00:00'
]

function generarNumeroAleatorio(desde, hasta) {
    return Math.floor(Math.random() * hasta) + desde;
}

listaDias.forEach( l => {
    let reserva = {};
    horarios.forEach(h => {
        for (let i = 0; i < 3 ;i++) {
            let reserva = {};
            reserva.sillas = generarNumeroAleatorio(1,5);
            reserva.id_cliente = generarNumeroAleatorio(1,60);
            reserva.id_sede = generarNumeroAleatorio(1,3);
            reserva.fecha = l;
            reserva.hora = h;

            service.create(reserva);
        }
    });
})


console.log(listaDias);
  

  