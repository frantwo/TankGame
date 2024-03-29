class Projectile {
    constructor(angle, velocity, gun) {
        this.ctx = gun.ctx;
        this.gun = gun;
        this.game = this.gun.player.game;
        this.x = 0;
        this.y = 0;
        //this.angle = (Math.PI * (90 - angle)) / 180;
        this.angle = (Math.PI * angle) / 180;
        // this.x = this.gun.x + 18;
        // this.y = this.gun.player.canvasH - this.gun.player.base.height / 2;
        // this.angle = (Math.PI * (90 - angle)) / 180;
        this.timeInAir = 0;
        this.windYVelocity =
            Math.sin((this.game.windAngle * Math.PI) / 180) * this.game.windSpeed;
        this.windXVelocity =
            Math.cos((this.game.windAngle * Math.PI) / 180) * this.game.windSpeed;
        this.yVelocity = Math.sin(this.angle) * velocity + this.windYVelocity;
        this.xVelocity = Math.cos(this.angle) * velocity + this.windXVelocity;

        // this.xMax = Math.cos(this.angle) * this.gun.powerGun;
        // this.yMax = Math.sin(this.angle) * this.gun.powerGun;
    }

    updateProjectile() {
        var gravity = 9.8 * this.timeInAir;
        this.y -= this.yVelocity - gravity;
        this.x += this.xVelocity;
        // console.log("==============");
        // console.log(`x = ${this.x}`);
        // console.log(`y = ${this.y}`);

        //USANDO JUGADOR DE LA IZQ!!!

        // this.x += 10;
        // if (this.x <= this.xMax) {
        //     this.y -= 10;
        // } else {
        //     this.y += 10;
        // }
        // console.log(`X: ${this.x}  Y:${this.y}`);
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
        if (this.checkCollision() == "BOOM") {
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
        if (this.x > this.game.canvasWidth || this.x < -1000 || this.x > 1000) {
            return "MISS";
        } else {
            // if (this.game.currentPlayer.id == 2) {
            //     if (
            //         this.game.currentPlayer.canon.width + this.game.currentPlayer.x >
            //         this.x &&
            //         this.x > this.game.currentPlayer.x &&
            //         this.game.currentPlayer.y + this.game.currentPlayer.canon.height >
            //         Math.abs(this.y) &&
            //         Math.abs(this.y) > 0
            //     ) {
            //         return true;
            //     } else {
            //         return false;
            //     }
            // } else {
            //     if (
            //         this.game.currentPlayer.x + this.game.currentPlayer.canvasWidth >
            //         this.game.canvasWidth - Math.abs(this.x) &&
            //         this.game.canvasWidth - Math.abs(this.x) >
            //         this.game.currentPlayer.x &&
            //         this.game.currentPlayer.y + this.game.currentPlayer.canon.height >
            //         Math.abs(this.y) &&
            //         Math.abs(this.y) > 0
            //     ) {
            //         return true;
            //     } else {
            //         return false;
            //     }
            // }

            if (this.game.currentPlayer.id == 2) {
                // if (
                //     this.x >= this.game.currentPlayer.x + this.game.currentPlayer.width &&
                //     this.x <= this.game.currentPlayer.x &&
                //     Math.abs(this.y) >= 0 &&
                //     Math.abs(this.y) <= this.game.currentPlayer.height
                // ) {
                //     return "BOOM";
                // } else {
                //     return "MISS";
                // }

                let playerOneSupX =
                    this.game.canvasWidth - 228 - this.game.currentPlayer.width;
                let playerOneSupY = -this.game.currentPlayer.base.height;
                let playerOneInfX =
                    this.game.canvasWidth - 170 - this.game.currentPlayer.width;
                let playerOneInfY = 5;
                if (
                    this.x > playerOneSupX &&
                    this.y > playerOneSupY &&
                    this.x < playerOneInfX &&
                    this.y < playerOneInfY
                ) {
                    return "BOOM";
                } else {
                    return "MISS";
                }
            } else {
                // if (
                //     this.game.canvasWidth - Math.abs(this.x) <=
                //     this.game.currentPlayer.x + this.game.currentPlayer.width &&
                //     this.game.canvasWidth - Math.abs(this.x) >=
                //     this.game.currentPlayer.x &&
                //     Math.abs(this.y) >= 0 &&
                //     Math.abs(this.y) <= this.game.currentPlayer.height
                // ) {
                //     return "BOOM";
                // } else {
                //     return "MISS";
                // }

                let playerTwoSupX = -1024 + 15; //-15;
                let playerTwoSupY = -this.game.currentPlayer.base.height / 2;
                let playerTwoInfX = -1024 + 60; //60;
                let playerTwoInfY = 5;
                if (
                    this.x > playerTwoSupX &&
                    this.y > playerTwoSupY &&
                    this.x < playerTwoInfX &&
                    this.y < playerTwoInfY
                ) {
                    return "BOOM";
                } else {
                    return "MISS";
                }
            }
        }
    }
}