class Player {
    constructor(w, h, ctx, keys) {
        this.canvasW = w;
        this.canvasH = h;
        this.ctx = ctx;
        this.keys = keys;
        this.x = this.canvasW * 0.08;
        this.y = 0;

        this.img = new Image();
        this.img.src = "images/canon.png";

        // número de imágenes diferentes
        //sprites será igual que frames
        this.sprites = {
                base = 1,
                emptyCanon = 1,
                firingCanon = 4,
                flyingBullet = 3,
                wrongTarget = 1,
            }
            // spriteIndex será igual a frameIndex
        this.spritesIndex = {
            base = 0,
            emptyCanon = 1,
            firingCanon = 2,
            flyingBullet = 3,
            wrongTarget = 6,
            forPlayerB = 7,
        };

        this.img.frames = 1;
        this.img.frameIndex = 14;

        // medidas los sprites a representar en el canvas
        this.widthBase = 26;
        this.heigthBase = 23;
        this.widthCanon = 79;
        this.heigthCanon = 23;
        this.widthBullet = 26;
        this.heightBullet = 18;

        this.bullets = [];

        this.setListeners();
    }

    setListeners() {
        document.onkeydown = function(event) {
            switch (event.keyCode) {
                case this.keys.TOP_KEY:

                    break;
                case this.keys.DOWN_KEY:

                    break;

                case this.keys.SPACE:
                    this.shoot();
                    break;
            }
        };
    }

    move() {
        // Aumenta la velocidad en el eje y.
        var gravity = 0.4;

        // solo salta cuando el personaje está en el suelo
        if (this.y >= this.y0) {
            this.vy = 1;
            this.y = this.y0;
        } else {
            this.vy += gravity;
            this.y += this.vy;
        }
    }

    draw(framesCounter) {
        this.ctx.drawImage(
            this.img,
            this.img.frameIndex * Math.floor(this.img.width / this.img.frames),
            0,
            Math.floor(this.img.width / this.img.frames),
            this.img.height,
            this.x,
            this.y,
            this.w,
            this.h
        );

        this.animateImg(framesCounter);

        this.bullets = this.bullets.filter(bullet => {
            return bullet.x < this.canvasW;
        });

        this.bullets.forEach(function(bullet) {
            bullet.draw();
            bullet.move();
        });
    }



    shoot() {
        var bullet = new Bullet(
            this.x + this.w,
            this.y + this.h / 2,
            this.y0,
            this.h,
            this.ctx
        );

        this.bullets.push(bullet);
    }

    animateImg(framesCounter) {
        // se va cambiando el frame. Cuanto mayor es el módulo, mas lento se mueve el personaje
        if (framesCounter % 6 === 0) {
            this.img.frameIndex += 1;

            // Si el frame es el último, se vuelve al primero
            if (this.img.frameIndex > 2) this.img.frameIndex = 0;
        }
    }

}