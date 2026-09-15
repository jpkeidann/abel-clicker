let ESTR = {
    setas: {
        quantidade: 0,
        preco: 10,
        APS: 0.10,
        img: './img/upgrades/seta.png',
        w: 200,
        h: 150,
        y: 100,
        x: 100,
        texto: 'Comprar setas:',
    },
    agua_oxigenada: {
        quantidade: 0,
        preco: 100,
        APS: 0.5,
        img: './img/upgrades/agua_oxigenada.png',
        w: 200,
        h: 200,
        y: 350,
        x: 100,
        texto: 'Comprar Água Oxigenada:',
    }
}

let estruturasPresentes = []

let abeus = 0
let canvas = document.getElementById('canvas')
let divAbel = document.getElementById('abel')
let des = canvas.getContext('2d')

function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

window.addEventListener('resize', () => {
    resizeCanvas()
    des.imageSmoothingEnabled = false;
    des.webkitImageSmoothingEnabled = false;
    des.mozImageSmoothingEnabled = false
})

resizeCanvas()

// =================== ANIMAÇÃO ABEL ========================

const imgAbel = new Image(); // não sei o porque, mas se eu tirar essas 2 linhas de código o jogo quebra, então vou deixar assim 
imgAbel.src = "./img/abel.png";

let WAbel = canvas.width * 0.2
let HAbel = canvas.height * 0.2
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
    des.drawImage(image, -WAbel / 2, -HAbel / 2, WAbel, HAbel);
    des.restore();
}

let RAbel = 0
let direcaoAbel = true
function quantoGirar() {
    const velGyro = 0.2
    if (RAbel > 50) {
        direcaoAbel = false
    } else if (RAbel < -50) {
        direcaoAbel = true
    }
    if (direcaoAbel === true) {
        RAbel += velGyro
    } else if (direcaoAbel === false) {
        RAbel -= velGyro
    }
    return RAbel
}

let aumentarXAbel = true
let aumentarHAbel = true
function tamanhoAbel() {
    const velGyro = 0.5
    if (WAbel > 225) {
        aumentarXAbel = false
    } else if (WAbel < 175) {
        aumentarXAbel = true
    }
    if (aumentarXAbel === true) {
        WAbel += velGyro
    } else if (aumentarXAbel === false) {
        WAbel -= velGyro
    }
    if (HAbel > 225) {
        aumentarHAbel = false
    } else if (HAbel < 175) {
        aumentarHAbel = true
    }
    if (aumentarHAbel === true) {
        HAbel += velGyro
    } else if (aumentarHAbel === false) {
        HAbel -= velGyro
    }
}

const esperar = (ms) => new Promise(resolve => setTimeout(resolve, ms));

async function cliqueAbel(){
    const velgyro = 10
    for(let i = 0 ; i < 5 ; i++){
        HAbel += velgyro 
        WAbel += velgyro 
        await esperar(10)
    }
    for(let i = 0 ; i < 5 ; i++){
        HAbel -= velgyro
        WAbel -= velgyro
        await esperar(10)
    }
}

// =================== TEXTOS NA TELA ===========================

function desQtdeAbel() {
    des.fillStyle = "rgb(255, 255, 255)";
    des.font = "bold 52px Jacquard12";
    des.textAlign = "center";
    des.fillText(`Abéus: ${abeus.toFixed(1)}`, canvas.width / 2, canvas.height * 0.1);
}

// =================== RECONHECIMENTO DE CLIQUE =========================


canvas.addEventListener('click', (e) => {
    const tam = 300
    const hitboxX = (canvas.width / 2) - (tam / 2)
    const hitboxy = (canvas.height / 2) - (tam / 2)

    const mouseX = e.x
    const mousey = e.y
    
    if (mouseX > hitboxX && mouseX < (hitboxX + tam) && mousey > hitboxy && mousey < (hitboxy + tam)) {
        abeus += 1
        cliqueAbel()
    }

    estruturasPresentes.forEach(est => {
        if(mouseX > est.x && mouseX < (est.x + est.w) && mousey > est.y && mousey < (est.y + est.h)){
            if(abeus >= est.preco){
                est.quantidade += 1
                abeus -= est.preco
                est.preco = Math.floor(est.preco * 1.3)
            }else{
                alert('consiga mais abeus')
            }
        }
    });
})

// =================== CONFERIR ABEUS =======================

let setasAtv = true
let aguaAtv = true
function confAbel(){
    if(setasAtv){
        const setaupg = new Estruturas(ESTR.setas.quantidade,ESTR.setas.preco,ESTR.setas.APS,ESTR.setas.img,ESTR.setas.w,ESTR.setas.h,ESTR.setas.x,ESTR.setas.y,ESTR.setas.texto)
        estruturasPresentes.push(setaupg)
        setasAtv = false
        console.log(estruturasPresentes)
    }
    if(aguaAtv){
        const aguaupg = new Estruturas(ESTR.agua_oxigenada.quantidade,ESTR.agua_oxigenada.preco,ESTR.agua_oxigenada.APS,ESTR.agua_oxigenada.img,ESTR.agua_oxigenada.w,ESTR.agua_oxigenada.h,ESTR.agua_oxigenada.x,ESTR.agua_oxigenada.y,ESTR.agua_oxigenada.texto)
        estruturasPresentes.push(aguaupg)
        aguaAtv = false
        console.log(estruturasPresentes)
    }
}

// ==================== ADICIONAR APS =======================

async function APS() {
    estruturasPresentes.forEach(est => {
        abeus += est.APS * est.quantidade
    });
    await esperar(100)
    APS()
}

// =================== ATUALIZAÇÕES DE TELA ========================

function atualizar(deltaTime) {
    tamanhoAbel()
    confAbel()
}
 
function desenha() {
    desAbel(quantoGirar(),)
    desQtdeAbel()
    estruturasPresentes.forEach(est =>{
        est.des_upgrade(des,est.texto)
    })
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

APS()