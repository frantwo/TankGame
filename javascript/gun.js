class Gun {
    constructor(x, y, img, ctx, player) {
        this.x = x;
        this.y = y;
        this.img = img;
        this.ctx = ctx;
        this.player = player;
    }

    move() {}

    draw() {
        this.ctx.drawImage(
            this.player.img,
            0,
            this.player.spritesIndex.emptyCanon *
            this.player.playerLeft *
            this.player.frameHeight,
            this.player.canon.width,
            this.player.canon.height,
            this.x + 18,
            this.player.canvasH - this.player.base.height,
            this.player.canon.width,
            this.player.canon.height
        );
    }
}