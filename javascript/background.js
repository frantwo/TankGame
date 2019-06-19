//esta función mantiene el fondo del juego
class Background {
    constructor(w, h, ctx, backgroundImg) {
        this.ctx = ctx;
        this.img = backgroundImg;
        this.h = h;
        this.w = w;

        this.x = 0;
        this.y = 0;
    }

    draw() {
        this.ctx.drawImage(this.img, this.x, this.y, this.w, this.h);
    }
}