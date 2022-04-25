const botonGrabar = document.getElementById("record_b");
const botonParar = document.getElementById("stop_b");
const areaTexto = document.getElementById("texto");
const copyArea = document.getElementById("clipBoard");
const copyDiscord = document.getElementById("discord");

let startSound = new Audio();
startSound.src = "sonidos/start.mp3";

let stopSound = new Audio();
stopSound.src = "sonidos/stop.mp3";

let copy = new Audio();
copy.src = "sonidos/popUp.mp3";

let Reconocimiento = window.webkitSpeechRecognition || window.SpeechRecognition;
let recognition = new Reconocimiento();

recognition.lang = "es-ES";
recognition.continuous = true;

//RESULTADOS EN PANTALLA

const body = document.querySelector('body');
let colorGuardado;
let color;

const dibujarPantalla = function(frase){


    console.log(`frase dentro de Dibujar pantalla tiene el valor de ${frase}`);
    
    console.log(`antes del switch es ${color}`);

    const fraseMin = frase.toLowerCase();

    //Pintamos segun el color

    if(fraseMin.includes("rojo")){
        color = "#FF0000";
    }
    if(fraseMin.includes("azul")){
        color = "#0000FF";
    }
    if(fraseMin.includes("amarillo")){
        color = "#FFFF00";
    }
    if(fraseMin.includes("verde")){
        color = "#008000";
    }
    if(fraseMin.includes("naranja")){
        color = "#FF9800";
    }
    
    console.log(`despues del switch es ${color}`);

    body.style.backgroundColor = color;
    body.style.backgroundColor = window.innerWidth;
    body.style.backgroundColor = window.innerHeight;
    }

//EVENTO

recognition.onstart = function(){
    console.log("El microfono esta funcionando");
}

recognition.onresult = function(event){
    const results = event.results;
    const frases = results[results.length-1][0].transcript;
    dibujarPantalla(frases);
    areaTexto.textContent = frases;
}

copyArea.addEventListener('click', () => {
    let textToCopy = document.getElementById('texto').innerText;
    let aviso = document.getElementById('copyAlert');
    copy.play();
    if(navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy)
        .then(() => {
            aviso.style.visibility = "visible";
            setTimeout(()=>{
                aviso.style.visibility = "hidden";
            },2000)
        })
    } else {
        console.log('Browser Not compatible');
    }
})

copyDiscord.addEventListener('click', () => {
    let aviso = document.getElementById('copyAlert2');
    copy.play();
    if(navigator.clipboard) {
        navigator.clipboard.writeText("StratusK#4209")
        .then(() => {
            aviso.style.visibility = "visible";
            setTimeout(()=>{
                aviso.style.visibility = "hidden";
            },2000)
        })
    } else {
        console.log('Browser Not compatible');
    }
})

botonGrabar.addEventListener("click",() =>{
    recognition.start();
    startSound.play();
});

botonParar.addEventListener("click",() =>{
    recognition.stop();
    stopSound.play()
});