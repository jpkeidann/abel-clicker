let estruturas = {
    setas:{
        quantidade: 0,
        preco: 10,
        APS: 0.1
    }
}

let canvas = document.getElementById('canvas')
let des = canvas.getContext('2d')

function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

window.addEventListener('resize', () => {
    resizeCanvas()
    // des.imageSmoothingEnabled = false;
    // des.webkitImageSmoothingEnabled = false;
    // des.mozImageSmoothingEnabled = false
})

resizeCanvas()

// =================== ATUALIZAÇÕES DE TELA ========================

function atualizar(){

}

function desenha(){

}

let ultimoTempo = 0

function calcularDeltaTime(tempoAtual) {
    let deltaTime = tempoAtual - ultimoTempo;

    if (!ultimoTempo){
        deltaTime = 0;
    } 
        
    ultimoTempo = tempoAtual;

    if (deltaTime > 100){
    } deltaTime = 16;
        
    return deltaTime;
}

function main(tempoAtual){
    let deltaTime = calcularDeltaTime(tempoAtual);

    desenha()
    atualizar()

    requestAnimationFrame(main())
}

requestAnimationFrame((tempo) => main(tempo))