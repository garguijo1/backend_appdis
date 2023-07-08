const reservacionesServices = require('../../servicios/reservasService.js');

const service = new reservacionesServices();

function generarNumeroAleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  let numerosAleatorios = [];
  
  while (numerosAleatorios.length < 2000) {
    let numeroAleatorio = generarNumeroAleatorio(45, 6570);
    if (!numerosAleatorios.includes(numeroAleatorio)) {
      numerosAleatorios.push(numeroAleatorio);
    }
  }

  numerosAleatorios.forEach(n => {
        let nplatillos = generarNumeroAleatorio(1,5);
        let platillos_agregados = [];
        let x = 0;
        while( x < nplatillos){
            let id_platillo = generarNumeroAleatorio(3,64);
            if(!platillos_agregados.includes(id_platillo)){
                let reservacion_platillo = {};
                platillos_agregados.push(id_platillo);
                reservacion_platillo.id_platillo = id_platillo;
                reservacion_platillo.id_reservacion = n;
                reservacion_platillo.cantidad = generarNumeroAleatorio(1,3);
                console.log(reservacion_platillo);
                service.addPlatillo(reservacion_platillo);
                x++;
            }
           
        }
  })
  
