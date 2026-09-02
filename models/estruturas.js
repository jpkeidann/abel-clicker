class Estruturas{
    constructor(quantidade,preco,APS,img,w,h,x,y,texto){
        this.quantidade = quantidade
        this.preco = preco
        this.APS = APS
        this.img = new Image()
        this.img.src = img

        this.x = x 
        this.y = y 
        this.w = w 
        this.h = h
        this.texto = texto
    }

    des_upgrade(des){
        des.font = 'bold 28px JacquardaBastarda9'
        des.drawImage(this.img, this.x ,this.y,this.w,this.h)
        des.fontSize
        des.fillText(this.texto,this.x + (this.w / 2),this.y + 30,this.w,this.h)
        des.fillText(this.preco,this.x + (this.w / 2),this.y + 60,this.w ,this.h)
    }
}