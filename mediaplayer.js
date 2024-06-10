const pantalla = document.getElementById("pantalla");
const evtPlay  = document.getElementById("play-button");
const evtPause = document.getElementById("pause-button");
const evtStop  = document.getElementById("stop-button");

evtPlay.addEventListener("click",  () =>  actualizar( mediaPlayer, evento["play"]));
evtPause.addEventListener("click", () =>  actualizar( mediaPlayer, evento["pause"]));
evtStop.addEventListener("click",  () =>  actualizar( mediaPlayer, evento["stop"]));

const evento = {
  "play":  {cargaUtil: 'play'},
  "pause": {cargaUtil: 'pause'},
  "stop":  {cargaUtil: 'stop'}
};

const mediaPlayer = {
  estadoActual: "WAITING",
  contexto: {
    pantalla:  "", 
  },
  estados: {
   "WAITING": {
     play:   "PLAY"
    },
   "PLAY": {
     pause:  "PAUSE",
     stop:   "STOP", 
    },
   "PAUSE": {
     play: "PLAY",
     stop: "STOP",
    },
    "STOP": {
     play:   "PLAY"
    }
  }
}

function transicion(mediaPlayer, evento, depurar){
  const estado           = mediaPlayer.estadoActual;
  const entrada          = evento.cargaUtil;
  const estadoSiguiente  = mediaPlayer.estados[estado][entrada];

  if(estadoSiguiente) {
    if(depurar) print(estado,entrada,estadoSiguiente);

    mediaPlayer.estadoActual = estadoSiguiente;    

    switch(estadoSiguiente) {
      case "WAITING":
        mediaPlayer.contexto.pantalla = "WAITING";
        break;
      case "PLAY": 
        mediaPlayer.contexto.pantalla = "PLAY";
        break;

      case "PAUSE": 
        mediaPlayer.contexto.pantalla = "PAUSE";
        break;

      case "STOP": 
        mediaPlayer.contexto.pantalla = "STOP";
        break;
       }  
  }

   return mediaPlayer;
}

function actualizar(mediaPlayer, evento) {
   let n = transicion(mediaPlayer, evento, true);
   pantalla.textContent = n.contexto.pantalla; 
}

function print(estadoActual,entrada,estadoSiguiente) {
    const totalElementosCeldaEstado = 30;
    const rellenoCeldaEstado = " ".repeat(Math.ceil( (totalElementosCeldaEstado - estadoActual.length)/2) );
    const totalElementosCeldaEntrada = 10;
    const rellenoCeldaEntrada = " ".repeat(Math.ceil((totalElementosCeldaEntrada - entrada.length)/2));
    const cadenaEstadoActual = `${rellenoCeldaEstado}${estadoActual}${rellenoCeldaEstado}`;
    const cadenaEntrada = `${rellenoCeldaEntrada}${entrada}${rellenoCeldaEntrada}`;
    const cadenaEstadoSiguiente = `${rellenoCeldaEstado}${estadoSiguiente}${rellenoCeldaEstado}`;
    console.log(`|${cadenaEstadoActual}|${cadenaEntrada}|${cadenaEstadoSiguiente}|`);
}

/* `digraph G {${nodos.join('\n')} ${flechas.join('\n')}}`; */
function generarDigraph(objetoEstados) {
  const nodos = [];
  const flechas = [];
  for (const estado in objetoEstados) {
    nodos.push(`"${estado}"`);
    for (const transicion in objetoEstados[estado]) {
      const destino = objetoEstados[estado][transicion];
      flechas.push(`"${estado}" -> "${destino}" [label="${transicion}"];`);
    }
  }

  const dot = `digraph G {
    ${flechas.join('\n')}
  }`;

  return dot;
}



const dotGraph = generarDigraph(mediaPlayer.estados);
console.log(dotGraph); 


