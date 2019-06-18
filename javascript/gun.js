class Gun {
    constructor(x, y, img, ctx, player) {
        this.x = x;
        this.y = y;
        this.angle = 0;
        this.img = img;
        this.ctx = ctx;
        this.player = player;
    }

    rotateGunUp() {
        if (Math.abs(this.angle) != 180) {
            this.angle -= 10;
        }
    }

    rotateGunDown() {
        if (this.angle != 0) {
            this.angle += 10;
        }
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(
            this.x + 18,
            this.player.canvasH - this.player.base.height / 2
        );
        this.ctx.rotate((this.angle * Math.PI) / 180);

        this.ctx.drawImage(
            this.player.img,
            0,
            this.player.spritesIndex.emptyCanon *
            this.player.playerLeft *
            this.player.frameHeight,
            this.player.canon.width,
            this.player.canon.height,
            0, -this.player.base.height / 2,
            this.player.canon.width,
            this.player.canon.height
        );
        this.ctx.restore();
    }

    shoot() {
        var angle = this.angle;
        this.angle = 0;
        // this.gun.style.transform = `rotate(${this.angle}deg)`
        // $(`#gun-${this.tank.id}`).append('<div id="projectile" style="bottom: 1px; left: 4px;"></div>')
        var projectile = new Projectile(angle, 15, this);
        projectile.fire();
    }
}