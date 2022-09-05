const botonMascotaJugador = document.getElementById("boton-mascota")
const sectionSeleccionarAtaque = document.getElementById('seleccionar-ataque')
const botonFuego = document.getElementById('boton-fuego')
const botonAgua = document.getElementById('boton-agua')
const botonTierra = document.getElementById('boton-tierra')
const botonReiniciar = document.getElementById('boton-reiniciar')



const seleccionarMascotaSection = document.getElementById('seleccionar-mascota')

const spanMascotaJugador = document.getElementById('mascota-jugador')


const spanMascotaEnemigo = document.getElementById('mascota-enemigo')


const spanVidasJugador = document.getElementById('vidas-jugador')
const spanVidasEnemigo = document.getElementById('vidas-enemigo')


const sectionMensajes = document.getElementById('resultado')
const ataquesDelJugador = document.getElementById('ataques-del-jugador')
const ataquesDelEnemigo = document.getElementById('ataques-del-enemigo')
const contenedorTarjetas = document.getElementById('contenedorTarjetas')

let mokepones = []
let ataqueJugador
let ataqueEnemigo
let opcionDeMokepones ='';
let inputHipodoge
let inputCapipepo
let inputRatigueya
let mascotaJugador
let vidasJugador = 3
let vidasEnemigo = 3

class Mokepon {
    constructor(nombre, foto, vida) {

        this.nombre = nombre
        this.foto = foto
        this.vida = vida
        this.ataques = []
    }
}

let hipodoge = new Mokepon('Hipodoge', './mokepones/hipodoge-removebg-preview.png', 5)

let capipepo = new Mokepon('Capipepo', './mokepones/capipepo-removebg-preview-removebg-preview.png', 5)

let ratigueya = new Mokepon('Ratigueya', './mokepones/ratigueya-removebg-preview.png', 5)

hipodoge.ataques.push(
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'}
)

capipepo.ataques.push(
    { nombre: '🌱', id: 'boton-agua'},
    { nombre: '🌱', id: 'boton-agua'},
    { nombre: '🌱', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-fuego'},
    { nombre: '🔥', id: 'boton-tierra'}
)

ratigueya.ataques.push(
    { nombre: '🔥', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-agua'},
    { nombre: '🔥', id: 'boton-agua'},
    { nombre: '💧', id: 'boton-fuego'},
    { nombre: '🌱', id: 'boton-tierra'}
)

mokepones.push(hipodoge, capipepo, ratigueya)



function iniciarJuego() {

    sectionReiniciar.style.display = 'none';

    sectionSeleccionarAtaque.style.display = 'none'

    mokepones.forEach((mokepon, i) => {
        opcionDeMokepones = `
        <input type="radio" name="mascota" id="${mokepon.nombre}"/>
        <label class="tarjeta-de-mokepon" for="${mokepon.nombre}">
            <p class="tarjeta-de-mokepon-name">${mokepon.nombre}</p>
            <img src="${mokepon.foto}" alt="${mokepon.nombre}">
        </label>
        `
    contenedorTarjetas.innerHTML += opcionDeMokepones

    inputHipodoge = document.getElementById('Hipodoge')
    inputCapipepo = document.getElementById('Capipepo')
    inputRatigueya = document.getElementById('Ratigueya')

    })


    botonMascotaJugador.addEventListener('click', seleccionarMascotaJugador)

    botonFuego.addEventListener('click', ataqueFuego)

    botonAgua.addEventListener('click', ataqueAgua)

    botonTierra.addEventListener('click', ataqueTierra)

    // botonReiniciar.style.display = 'none'

    botonReiniciar.addEventListener('click' , reiniciarJuego)
}


function seleccionarMascotaJugador() {

    seleccionarMascotaSection.style.display = 'none'

    sectionSeleccionarAtaque.style.display = 'flex'


    if (inputHipodoge?.checked){
        spanMascotaJugador.innerHTML = inputHipodoge.id
        mascotaJugador = inputHipodoge.id
    } else if (inputCapipepo?.checked) {
        spanMascotaJugador.innerHTML = inputCapipepo.id
        mascotaJugador = inputCapipepo.id
    } else if (inputRatigueya?.checked) {
        spanMascotaJugador.innerHTML = inputRatigueya.id
        mascotaJugador = inputRatigueya.id
    } else {
        alert("No has seleccionado una mascota")

        return;
    }

    extraerAtaques(mascotaJugador)
    seleccionarMascotaEnemigo()

}

    function extraerAtaques(mascotaJugador) {
        let ataques
        for (let i = 0; i <mokepones.length; i++) {
            if (mascotaJugador === mokepones[i].nombre) {
                ataques = mokepones[i].ataques
            }

        }

    }

    function seleccionarMascotaEnemigo() {
        let mascotaAleatorio = aleatorio(0, mokepones.length -1)

        spanMascotaEnemigo.innerHTML = mokepones[mascotaAleatorio].nombre

    }

    function ataqueFuego() {
        ataqueJugador = 'FUEGO'
        ataqueAleatorioEnemigo()
    }
    function ataqueAgua() {
        ataqueJugador = 'AGUA'
        ataqueAleatorioEnemigo()
    }
    function ataqueTierra() {
        ataqueJugador = 'TIERRA'
        ataqueAleatorioEnemigo()
    }

    function ataqueAleatorioEnemigo() {
       let ataqueAleatorio = aleatorio(1,3)

       if (ataqueAleatorio == 1) {
        ataqueEnemigo = 'FUEGO'
       } else if (ataqueAleatorio == 2) {
        ataqueEnemigo = 'AGUA'
       } else if (ataqueAleatorio == 3) {
        ataqueEnemigo = 'TIERRA'
       }
       combate()

    }

    function combate() {

 if(ataqueEnemigo == ataqueJugador) {
    crearMensaje("EMPATE")
} else if(ataqueJugador == 'FUEGO' && ataqueEnemigo == 'TIERRA') {
    crearMensaje("GANASTE")
    vidasEnemigo--
    spanVidasEnemigo.innerHTML = vidasEnemigo
} else if(ataqueJugador == 'AGUA' && ataqueEnemigo == 'FUEGO') {
    crearMensaje("GANASTE")
    vidasEnemigo--
    spanVidasEnemigo.innerHTML = vidasEnemigo
} else if(ataqueJugador == 'TIERRA' && ataqueEnemigo == 'AGUA') {
    crearMensaje("GANASTE")
    vidasEnemigo--
    spanVidasEnemigo.innerHTML = vidasEnemigo
} else {
    crearMensaje("PERDISTE")
    vidasJugador--
    spanVidasJugador.innerHTML = vidasJugador
}

    revisarVidas()
}
function revisarVidas() {
    if (vidasEnemigo == 0) {
        crearMensajeFinal("¡FELICIDADES! ¡GANASTE!")
    } else if (vidasJugador == 0) {
        crearMensajeFinal("Perdiste. Suerte la proxima vez")
    }
}


    function crearMensaje(resultado) {


        let nuevoAtaqueDelJugador = document.createElement('p')
        let nuevoAtaqueDelEnemigo = document.createElement('p')

        sectionMensajes.innerHTML=resultado
        nuevoAtaqueDelJugador.innerHTML=ataqueJugador
        nuevoAtaqueDelEnemigo.innerHTML=ataqueEnemigo

        ataquesDelJugador.appendChild(nuevoAtaqueDelJugador)
        ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo)

       // let parrafo = document.createElement('p')
        //parrafo.innerHTML= 'Tu mascota ataco con' + ataqueJugador + ', la mascota del enemigo atacó con' + ataqueEnemigo + '-' + resultado


    }


    function crearMensajeFinal(resultadoFinal) {


        let parrafo = document.createElement('p')
        sectionMensajes.innerHTML= resultadoFinal


        botonFuego.disabled = true
        botonAgua.disabled = true
        botonTierra.disabled = true

        sectionReiniciar.style.display = 'block'
    }

    function reiniciarJuego() {
        location.reload()
    }

function aleatorio(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

window.addEventListener("load" , iniciarJuego)


