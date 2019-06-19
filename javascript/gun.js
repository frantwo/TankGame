class Gun {
    constructor(x, y, img, ctx, player) {
        this.x = x;
        this.y = y;
        this.angle = (player.id == 1) ? 0 : -180;
        this.img = img;
        this.ctx = ctx;
        this.player = player;
        this.powerGun = 0;
    }

    rotateGunUp() {
        if (Math.abs(this.angle) != 180) {
            this.angle -= 10;
        }
        document.querySelector("#angle").innerHTML = "Angle:" + this.angle;
    }

    rotateGunDown() {
        if (this.angle != 0) {
            this.angle += 10;
        }
        document.querySelector("#angle").innerHTML = "Angle:" + this.angle;
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(
            this.x + (this.player.id == 1 ? 18 : -18),
            this.player.canvasH - this.player.base.height / 2
        );
        this.ctx.rotate((this.angle * Math.PI) / 180);


        this.ctx.drawImage(
            this.player.img,
            0,
            (this.player.spritesIndex.emptyCanon + (this.player.id == 1 ? this.player.playerLeft : this.player.playerRight)) * this.player.frameHeight,
            this.player.canon.width,
            this.player.frameHeight,
            0, -this.player.base.height / 2,
            this.player.canon.width,
            this.player.frameHeight
        );
        this.ctx.restore();
    }

    shoot() {
        //por si queremos devolver el cañon a su posición original
        //var angle = this.angle;
        //this.angle = 0;
        // var projectile = new Projectile(angle, 15, this);

        var projectile = new Projectile(Math.abs(this.angle), 15, this);
        projectile.fire();
    }
}