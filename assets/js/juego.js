// sintaxis Patron Modulo
const miModulo = (() => {
    // Javascript evalua de manera mas estricta mi codigo
    'use stric'
    // referencias en html 
    const botonPedir = document.querySelector('#btnpedir'),
          botonDetener = document.querySelector('#btndetener'),
          botonNuevo = document.querySelector('#btnnuevo'),
          tags = document.querySelectorAll('small'),
          divCartas = document.querySelectorAll('.divCartas');

    // constantes de juego
    let jugadores = [];

    let baraja = [];
    let carta;
    let cartaimg;
    // Preparando el juego
    const iniciarJuego = (numJugadores = 1) => {
        baraja = crearBaraja();
        for(let i = 0; i <= numJugadores; i++){
            jugadores.push(0);
        }
    };

    // Esta funcion cre un nuev deck barajead
    const crearBaraja = () => {
        let baraja = [];
        const letras = ['C', 'D', 'H', 'S'],
              especial = {11: 'A', 12: 'J', 13: 'K', 14: 'Q'};
        for(let i = 2; i <= 14; i++){
            for(letra of letras){
                s = (i > 10) ? especial[i] : i;
                baraja.push(s.toString() + letra)
            } 
        }
        return _.shuffle(baraja);
    }

    // Esta funcion devuelve una carta de la baraja
    const darCarta = (baraja) => {
        if (baraja.length === 0){
            throw 'Ya no hay mas cartas'
        }
        return carta = (baraja.length >= 1) ? baraja.pop() : null;;
    }

    // Dar valor a las cartas 
    const valorCarta = (carta) => {
        let valor = carta.substring(0, carta.length - 1);
        return (valor === 'A') ? 11:
                (isNaN(valor)) ? 10 : valor*1;
    }

    //Dibujar puntos 
    const dibujarPuntos = (jugador, tag) => {
        jugadores[jugador] += valorCarta(carta); 
        tag.innerText = jugadores[jugador];
    }
    // TURNO DE LA COMPUTADORA 

    const turnoComputadora = (puntosMin) => {
        do{
            carta = darCarta(baraja);
            dibujarPuntos(jugadores.length - 1, tags[1]);
            crearCarta(jugadores.length - 1);
            if(puntosMin > 21){
                break;
            }
        }
        while(jugadores[jugadores.length - 1] < 21 && jugadores[jugadores.length - 1] <= puntosMin);
        determinarGanador(puntosMin);        
    }

    // Se determina el ganador del juego 
    const determinarGanador = (puntosMin) => {
        setTimeout(()=>{
            if(jugadores[jugadores.length - 1] <= 21  && (jugadores[jugadores.length - 1] > puntosMin || puntosMin > 21)){
                // console.error('Perdiste');
                alert('Perdiste');
                nuevo();
            }else if(puntosMin <= 21 && (puntosMin > jugadores[jugadores.length - 1] || jugadores[jugadores.length - 1] > 21)){
                // console.error('Ganaste');
                alert('Ganaste');
                nuevo();
            }else if(jugadores[jugadores.length - 1] == puntosMin && puntosMin <= 21){
                // console.error('Empate');
                alert('Empate');
                nuevo();
            }else{
                // console.error('Ambos perdieron');
                alert('Nadie gano');
                nuevo();
            }
        }, 100);
    }

    const nuevo = () => {
        botonDetener.disabled = false;
        botonPedir.disabled = false;
        for(let i in jugadores){
            jugadores[i] = 0;
        }
        tags.forEach(tag => tag.innerText = 0);
        for(let divCarta of divCartas){
            divCarta.innerHTML = '';
        }
        baraja = crearBaraja();
    }

    // Crea la imagen en la baraja 
    const crearCarta = (jugador) => {
        cartaimg = document.createElement('img');
        cartaimg.src = `assets/cartas/${carta}.png`;
        cartaimg.classList.add('carta')
        divCartas[jugador].append(cartaimg);
    }

    iniciarJuego();
    
    // Eventos 
    botonPedir.addEventListener('click', () => {
        carta = darCarta(baraja);
        dibujarPuntos(0, tags[0]);
        crearCarta(0);
        if(jugadores[0] > 21){
            botonPedir.disabled = true;
            botonDetener.disabled = true;
            turnoComputadora(jugadores[0]);
            //alert('Perdiste');
        }
        else if(jugadores[0] === 21){
            botonPedir.disabled = true;
            botonDetener.disabled = true;
            //console.warn('21 puntos, GENIAL');
            turnoComputadora(jugadores[0]);
        }  
    });

    botonDetener.addEventListener('click', () => {
        botonPedir.disabled = true;
        botonDetener.disabled = true;
        turnoComputadora(jugadores[0]);
    });

    botonNuevo.addEventListener('click', () =>{
        nuevo();
    });

    //Para exportar las funciones qa las que quiero que tengan acceso los demas 
    return {
        iniciar: iniciarJuego
    }
})();




