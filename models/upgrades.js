class Upgrades{
    constructor(preco, img, w, h, x, y, ybase, texto , efeito) {
        this.preco = preco
        this.img = new Image()
        this.img.src = img
        this.x = x
        this.y = y
        this.ybase = ybase
        this.w = w
        this.h = h
        this.texto = texto
        this.efeito = efeito
    }

    des_upgrade(des) {
        des.font = 'bold 28px dekko'
        des.drawImage(this.img, this.x, this.y, this.w, this.h)

        des.fillStyle = "black";
        des.fillRect(this.x , this.y - 60, this.w, 60);
        des.fillStyle = "white";
        des.fillText(this.texto, this.x + (this.w / 2), this.y - 35, this.w, this.h)
        des.fillText(this.preco, this.x + (this.w / 2), this.y - 5, this.w, this.h)
    }
}