class Player {
    constructor(w, h, ctx, keys, game) {
        this.id = 0;
        this.canvasW = w;
        this.canvasH = h;
        this.ctx = ctx;
        this.keys = keys;
        this.x = 100;
        this.y = 0;
        this.game = game;

        this.gun = new Gun(this.x, this.y, this.img, this.ctx, this);

        this.img = new Image();
        this.img.src = "./images/canon.png";

        // número de imágenes diferentes
        //sprites será igual que frames
        this.sprites = {
            base: 1,
            emptyCanon: 1,
            firingCanon: 4,
            flyingBullet: 3,
            wrongTarget: 1
        };
        // spriteIndex será igual a frameIndex
        this.spritesIndex = {
            base: 0,
            emptyCanon: 1,
            firingCanon: 2,
            flyingBullet: 3,
            wrongTarget: 4
        };

        this.frames = 1;
        this.frameIndex = 10;
        this.frameHeight = 24;
        this.playerLeft = 1;
        this.playerRight = 5;

        // medidas los sprites a representar en el canvas
        this.base = {
            width: 26,
            height: 23
        };
        this.canon = {
            width: 79,
            height: 23
        };
        this.projectile = {
            width: 26,
            height: 28
        };

        document.onkeydown = event => {
            switch (event.keyCode) {
                case this.keys.TOP_KEY:
                    this.gun.rotateGunUp();
                    break;
                case this.keys.DOWN_KEY:
                    this.gun.rotateGunDown();
                    break;
                case this.keys.SPACE:
                    this.powerLoad();
                    break;
            }
        };

        document.onkeyup = event => {
            switch (event.keyCode) {
                case this.keys.SPACE:
                    this.gun.shoot();
                    break;
            }
        };
    }

    powerLoad() {
        this.gun.powerGun += 10;
        document.querySelector("#powergun").innerHTML = `Power: ${
      this.gun.powerGun
    }`;
    }

    draw(framesCounter) {
        this.drawBackBase();
        this.gun.draw();
        this.drawFrontBase();
        // this.animateImg(framesCounter);
    }

    drawBackBase() {
        this.ctx.drawImage(
            this.img,
            0,
            this.spritesIndex.base * this.playerLeft * this.frameHeight,
            this.base.width,
            this.base.height,
            this.x + 8,
            this.canvasH - this.base.height,
            this.base.width,
            this.base.height
        );
    }
    drawFrontBase() {
        this.ctx.drawImage(
            this.img,
            0,
            this.spritesIndex.base * this.playerLeft * this.frameHeight,
            this.base.width,
            this.base.height,
            this.x,
            this.canvasH - this.base.height,
            this.base.width,
            this.base.height
        );
    }

    // animateImg(framesCounter) {
    //     // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
    //     if (framesCounter % 6 === 0) {
    //         this.img.frameIndex += 1;

    //         // Si el frame es el último, se vuelve al primero
    //         if (this.img.frameIndex > 2) this.img.frameIndex = 0;
    //     }
    // }
}