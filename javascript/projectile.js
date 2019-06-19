class Projectile {
    constructor(angle, velocity, gun) {
        this.ctx = gun.ctx;
        this.gun = gun;
        this.game = this.gun.player.game;
        // this.x = this.gun.x + 18;
        // this.y = this.gun.player.canvasH - this.gun.player.base.height / 2;
        // this.angle = (Math.PI * (90 - angle)) / 180;
        // this.timeInAir = 0;

        // this.windYVelocity =
        //     Math.sin((this.game.windAngle * Math.PI) / 180) * this.game.windSpeed;
        // this.windXVelocity =
        //     Math.cos((this.game.windAngle * Math.PI) / 180) * this.game.windSpeed;
        // this.yVelocity = Math.sin(this.angle) * velocity + this.windYVelocity;
        // this.xVelocity = Math.cos(this.angle) * velocity + this.windXVelocity;

        this.x = 0;
        this.y = 0;
        this.angle = angle;
        this.xMax = Math.cos(this.angle) * this.gun.powerGun;
        this.yMax = Math.sin(this.angle) * this.gun.powerGun;
    }

    updateProjectile() {
        // var gravity = 15 * this.timeInAir;
        // this.y += this.yVelocity - gravity;
        // this.x += this.xVelocity;
        // console.log("==============");
        // console.log(`x = ${this.x}`);
        // console.log(`y = ${this.y}`);

        //USANDO JUGADOR DE LA IZQ!!!

        this.x += 10;
        if (this.x <= this.xMax) {
            this.y -= 10;
        } else {
            this.y += 10;
        }
    }

    draw() {
        this.ctx.save();
        this.ctx.translate(
            this.gun.x + 18,
            this.game.canvasHeight - this.gun.player.base.height / 2
        );
        this.ctx.fillStyle = "black";
        this.ctx.beginPath();
        this.ctx.arc(
            this.x,
            this.y,
            this.gun.player.projectile.height / 4,
            2 * Math.PI,
            false
        );
        this.ctx.fill();
        this.ctx.restore();
    }

    fire() {
        window.requestAnimationFrame(this.bothMovement.bind(this));
    }

    bothMovement() {
        if (this.checkCollision()) {
            //     this.proj.remove();
            //     if (this.gun.tank.hp === 0) {
            //         this.gun.tank.game.endGame();
            //     } else if (this.gun.tank.enemyTank.hp === 0) {
            //         this.gun.tank.game.endGame();
            //     } else {
            //         this.gun.tank.game.counter = 0;
            //     }
            this.game.gameOver();
        } else {
            this.updateProjectile();
            this.draw();
            this.timeInAir += 1 / 60;
            window.requestAnimationFrame(this.bothMovement.bind(this));
        }
    }

    checkCollision() {
        return (
            this.x > this.game.canvasWidth ||
            this.x < -1000 ||
            this.y > this.gun.player.projectile.height
        );
    }
}