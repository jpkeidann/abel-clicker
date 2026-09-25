let ESTR = {
    setas: {
        id: 1,
        quantidade: 0,
        preco: 10,
        APS: 0.05,
        img: './img/estruturas/seta.png',
        w: 200,
        h: 150,
        y: 100 ,
        x: window.innerWidth * 0.09,
        ybase: 100,
        texto: 'Comprar setas:',
    },
    agua_oxigenada: {
        id: 2,
        quantidade: 0,
        preco: 70,
        APS: 0.5,
        img: './img/estruturas/agua_oxigenada.png',
        w: 200,
        h: 200,
        y: 350,
        x: window.innerWidth * 0.09,
        ybase: 350,
        texto: 'Comprar Água Oxigenada:',
    }
}

let UPGR = {
    setas: {
        preco: 100,
        img: './img/upgrades/seta.jpg',
        w: 200,
        h: 150,
        y: 100,
        x: window.innerWidth * 0.8,
        ybase: 100,
        texto: 'MAIS setas',
        efeito: () => {
            estruturasPresentes[estruturasPresentes.findIndex(est => est.id == 1)].APS *= 2
        },
    },
    agua_oxigenada: {
        preco: 100,
        img: './img/upgrades/seta.jpg',
        w: 200,
        h: 150,
        y: 100,
        x: window.innerWidth * 0.8,
        ybase: 100,
        texto: 'MAIS setas',
        efeito: () => alert('funcao de upgrade de agua'),
    },
}

let estruturasPresentes = []
let upgradesPresentes = []

let abeus = 0
let canvas = document.getElementById('canvas')
let divAbel = document.getElementById('abel')
let des = canvas.getContext('2d')

function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    estruturasPresentes.forEach(estr => {
        estr.x = window.innerWidth * 0.09
    });
    upgradesPresentes.forEach(upg =>{
        upg.x = window.innerWidth * 0.8
    });
}

window.addEventListener('resize', () => {
    resizeCanvas()
    des.imageSmoothingEnabled = false;
    des.webkitImageSmoothingEnabled = false;
    des.mozImageSmoothingEnabled = false
})

resizeCanvas()

// =============== SCROLL DE UPGRADES ================

let estScrollY = 0;

function scrollEst() {
    const estX = 0;
    const estY = 0;
    let estHeight = window.innerHeight;
    let estWidth = window.innerWidth * 0.3;
    
    estruturasPresentes.forEach((est) => {
        est.des_upgrade(des, est.texto)
        est.y = est.ybase - scrollY;
    });
    
    des.strokeStyle = "#000";
    des.lineWidth = 2;
    des.strokeRect(estX, estY, estWidth, estHeight);
}

window.addEventListener("wheel", (event) => {
    const estX = 0;
    const estY = 0;
    let estHeight = window.innerHeight;
    let estWidth = window.innerWidth * 0.3;
    if (event.x <= estX + estWidth && event.x >= estX  && event.y <= estY + estHeight && event.y >= estY) {
        let maxScroll = 400 * estruturasPresentes.length;
        scrollY += event.deltaY;
        
        const limiteMaximo = maxScroll - estHeight;
        scrollY = Math.max(0, Math.min(scrollY, limiteMaximo));
    }
});

let upgScrollY = 0;

function scrollUpg() {
    const upgX = window.innerWidth * 0.7;
    const upgY = 0;
    let upgHeight = window.innerHeight;
    let upgWidth = window.innerWidth * 0.3;

    upgradesPresentes.forEach((upg) => {
        upg.des_upgrade(des, upg.texto)
        upg.y = upg.ybase - upgScrollY;
    });

    des.strokeStyle = "#000";
    des.lineWidth = 2;
    des.strokeRect(upgX, upgY, upgWidth, upgHeight);
}

window.addEventListener("wheel", (event) => {
    const upgX = window.innerWidth * 0.7;
    const upgY = 0;
    let upgHeight = window.innerHeight;
    let upgWidth = window.innerWidth * 0.3;
    if (event.x <= upgX + upgWidth && event.x >= upgX  && event.y <= upgY + upgHeight && event.y >= upgY) {
        let maxScroll = 400 * upgradesPresentes.length;
        upgScrollY += event.deltaY;

        const limiteMaximo = maxScroll - upgHeight;
        upgScrollY = Math.max(0, Math.min(upgScrollY, limiteMaximo));
    }
});

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

async function cliqueAbel() {
    const velgyro = 10
    for (let i = 0; i < 5; i++) {
        HAbel += velgyro
        WAbel += velgyro
        await esperar(10)
    }
    for (let i = 0; i < 5; i++) {
        HAbel -= velgyro
        WAbel -= velgyro
        await esperar(10)
    }
}

// =================== TEXTOS NA TELA ===========================

function desQtdeAbel() {
    des.fillStyle = "rgb(255, 255, 255)";
    des.font = "bold 52px dekko";
    des.textAlign = "center";
    des.fillText(`Abéus: ${abeus.toFixed(1)}`, canvas.width / 2, canvas.height * 0.1);
    des.font = "bold 24px dekko";
    des.fillText(`Abéus por segundo: ${conferirAPS().toFixed(1)}`, canvas.width / 2, canvas.height * 0.15);
}

// =================== RECONHECIMENTO DE CLIQUE =========================

let poderClique = 1

canvas.addEventListener('click', (e) => {
    const tam = 300
    const hitboxX = (canvas.width / 2) - (tam / 2)
    const hitboxy = (canvas.height / 2) - (tam / 2)

    const mouseX = e.x
    const mousey = e.y

    if (mouseX > hitboxX && mouseX < (hitboxX + tam) && mousey > hitboxy && mousey < (hitboxy + tam)) {
        abeus += poderClique
        cliqueAbel()
    }

    estruturasPresentes.forEach(est => {
        if (mouseX > est.x && mouseX < (est.x + est.w) && mousey > est.y && mousey < (est.y + est.h)) {
            if (abeus >= est.preco) {
                est.quantidade += 1
                abeus -= est.preco
                est.preco = Math.floor(est.preco * 1.3)
            } else {
                alert('consiga mais abeus')
            }
        }
    });

    upgradesPresentes.forEach(upg => {
        if (mouseX > upg.x && mouseX < (upg.x + upg.w) && mousey > upg.y && mousey < (upg.y + upg.h)) {
            if (abeus >= upg.preco) {
                upgradesPresentes = upgradesPresentes.filter(upgrade => upgrade !== upg);
                abeus -= upg.preco
                upg.preco = Math.floor(upg.preco * 1.3)
                upg.efeito();
            } else {
                alert('consiga mais abeus')
            }
        }
    });
})

// =================== CONFERIR ABEUS =======================

let setasAtv = true
let aguaAtv = true
function confESTR() {
    if (setasAtv) {
        const setaupg = new Estruturas(ESTR.setas.id, ESTR.setas.quantidade, ESTR.setas.preco, ESTR.setas.APS, ESTR.setas.img, ESTR.setas.w, ESTR.setas.h, ESTR.setas.x, ESTR.setas.y, ESTR.setas.ybase, ESTR.setas.texto)
        estruturasPresentes.push(setaupg)
        setasAtv = false
    }
    if (aguaAtv && abeus > 20) {
        const aguaupg = new Estruturas(ESTR.agua_oxigenada.id, ESTR.agua_oxigenada.quantidade, ESTR.agua_oxigenada.preco, ESTR.agua_oxigenada.APS, ESTR.agua_oxigenada.img, ESTR.agua_oxigenada.w, ESTR.agua_oxigenada.h, ESTR.agua_oxigenada.x, ESTR.agua_oxigenada.y, ESTR.agua_oxigenada.ybase, ESTR.agua_oxigenada.texto)
        estruturasPresentes.push(aguaupg)
        aguaAtv = false
    }
}

let setaUpg1 = true
let aguaUpg1 = true
function confUPG() {
    if (setaUpg1 && abeus > 30) {
        const setaupg = new Upgrades(UPGR.setas.preco, UPGR.setas.img, UPGR.setas.w, UPGR.setas.h, UPGR.setas.x, UPGR.setas.y, UPGR.setas.ybase, UPGR.setas.texto , UPGR.setas.efeito)
        upgradesPresentes.push(setaupg)
        setaUpg1 = false
    }
    if (aguaUpg1 && abeus > 250) {
        const aguaupg = new Upgrades(UPGR.agua_oxigenada.preco, UPGR.agua_oxigenada.img, UPGR.agua_oxigenada.w, UPGR.agua_oxigenada.h, UPGR.agua_oxigenada.x, UPGR.agua_oxigenada.y, UPGR.agua_oxigenada.ybase, UPGR.agua_oxigenada.texto, UPGR.agua_oxigenada.efeito)
        upgradesPresentes.push(aguaupg)
        aguaUpg1 = false
    }
}

// -------- conferir aps -------

function conferirAPS() {
    let aps = 0
    estruturasPresentes.forEach(est => {
        aps += (est.APS * est.quantidade * 10)
    })
    return aps
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
    confESTR()
    confUPG()
}

function desenha() {
    desAbel(quantoGirar(),)
    desQtdeAbel()
    scrollEst()
    scrollUpg()
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

    atualizar(deltaTime)
    desenha()

    requestAnimationFrame(main)
}

requestAnimationFrame((tempo) => main(tempo))

APS()