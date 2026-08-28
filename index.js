let estruturas = {
    setas: {
        quantidade: 0,
        preco: 10,
        APS: 0.1
    }
}


let canvas = document.getElementById('canvas')
let divAbel = document.getElementById('abel')
let des = canvas.getContext('2d')

function resizeCanvas() {
    canvas.width = window.innerWidth * 0.33
    canvas.height = window.innerHeight
}

window.addEventListener('resize', () => {
    resizeCanvas()
    des.imageSmoothingEnabled = false;
    des.webkitImageSmoothingEnabled = false;
    des.mozImageSmoothingEnabled = false
})

resizeCanvas()

// =================== ANIMAÇÂO ABEL ========================

const imgAbel = new Image(); // não sei o porque, mas se eu tirar essas 2 linhas de código o jogo quebra, então vou deixar assim 
imgAbel.src = "./img/abel.png";

let WAbel = canvas.width * 0.60 // se for alterar o valor, muda também no atualizar
let HAbel = canvas.height * 0.30
let XAbel = (canvas.width / 2) - (WAbel / 2)
let YAbel = (canvas.height / 2) - (HAbel / 2)

var angleInDegrees = 0;

var image = document.createElement("img");
image.onload = function () {
    des.drawImage(image, canvas.width / 2 - image.width / 2, canvas.height / 2 - image.width / 2);
}
image.src = "./img/abel.png";

function desAbel(degrees) {
    des.save();
    des.translate(canvas.width / 2, canvas.height / 2);
    des.rotate(degrees * Math.PI / 180);
    des.drawImage(image, -WAbel / 2, -HAbel / 2 , WAbel, YAbel);
    des.restore();
}

let RAbel = 0
let direcaoAbel = true
function quantoGirar(){
    console.log(direcaoAbel)
    const velGyro = 0.5
    if(RAbel > 50){
        direcaoAbel = false
    }else if(RAbel < -50){
        direcaoAbel = true
    }
    if(direcaoAbel === true){
        RAbel += velGyro
    }else if(direcaoAbel === false){
        RAbel -= velGyro
    }
    return RAbel
}

let aumentarAbel = true
function tamanhoAbel(){
    // WAbel = canvas.width * 0.60
    // HAbel = canvas.height * 0.30
    XAbel = (canvas.width / 2) - (WAbel / 2)
    YAbel = (canvas.height / 2) - (HAbel / 2)
    const velGyro = 1
    if(WAbel > 50){
        aumentarAbel = false
    }else if(WAbel < -50){
        aumentarAbel = true
    }
    if(aumentarAbel === true){
        WAbel += velGyro
    }else if(aumentarAbel === false){
        WAbel -= velGyro
    }
    if(YAbel > 50){
        aumentarAbel = false
    }else if(YAbel < -50){
        aumentarAbel = true
    }
    if(direcaoAbel === true){
        YAbel += velGyro
    }else if(aumentarAbel === false){
        YAbel -= velGyro
    }
}

// =================== ATUALIZAÇÕES DE TELA ========================

function atualizar(deltaTime) {
    tamanhoAbel()
}


function desenha() {
    desAbel(quantoGirar(),)
}

let ultimoTempo = 0

function calcularDeltaTime(tempoAtual) {
    let deltaTime = tempoAtual - ultimoTempo;

    if (!ultimoTempo) {
        deltaTime = 0;
    }

    ultimoTempo = tempoAtual;

    if (deltaTime > 100) {
    } deltaTime = 16;

    return deltaTime;
}

function main(tempoAtual) {
    let deltaTime = calcularDeltaTime(tempoAtual);

    des.clearRect(0, 0, canvas.width, canvas.height);

    desenha()
    atualizar(deltaTime)

    requestAnimationFrame(main)
}

requestAnimationFrame((tempo) => main(tempo))