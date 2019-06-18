class Projectile {
    constructor(angle, velocity, gun) {
        this.ctx = gun.ctx;
        this.gun = gun;
        this.game = this.gun.player.game;
        this.relLeft = parseInt(this.gun.x + 18, 10);
        this.bottom = parseInt(
            this.gun.player.canvasH - this.gun.player.canon.height,
            10
        );
        this.angle = (Math.PI * (90 - angle)) / 180;
        this.timeInAir = 0;

        this.windYVelocity =
            Math.sin((this.game.windAngle * Math.PI) / 180) * this.game.windSpeed;
        this.windXVelocity =
            Math.cos((this.game.windAngle * Math.PI) / 180) * this.game.windSpeed;
        this.yVelocity = Math.sin(this.angle) * velocity + this.windYVelocity;
        this.xVelocity = Math.cos(this.angle) * velocity + this.windXVelocity;
        this.absLeft = this.gun.x + 18 + this.gun.player.canon.width / 2;
        this.absRight = this.absLeft + this.gun.player.canon.width;
    }

    draw() {
        this.ctx.fillStyle = "black";
        this.ctx.beginPath();
        this.ctx.arc(
            this.bottom,
            this.relLeft,
            this.gun.player.projectile.height / 2,
            2 * Math.PI,
            false
        );
        this.ctx.fill();
    }

    fire() {
        window.requestAnimationFrame(this.bothMovement.bind(this));
    }

    updateProjectile() {
        var gravity = 15 * this.timeInAir;
        this.bottom += this.yVelocity - gravity;
        this.relLeft += this.xVelocity;
        this.absLeft = this.gun.x + 18 + this.gun.player.canon.width / 2;
        this.absRight = this.absLeft + this.gun.player.canon.width;
    }

    // checkCollision() {
    //     return (
    //         this.hitTank(this.gun.tank.enemyTank) ||
    //         this.hitTank(this.gun.tank) ||
    //         this.relLeft < -1000 ||
    //         this.relLeft > 1000 ||
    //         this.bottom < -20
    //     );
    // }

    // hitTank(tank) {
    //     if (
    //         (this.absLeft <= tank.absLeft &&
    //             this.absLeft >= tank.absRight &&
    //             this.bottom <= 0) ||
    //         (this.absRight <= tank.absRight &&
    //             this.absRight >= tank.absLeft &&
    //             this.bottom <= 0)
    //     ) {
    //         $(".result").html("HIT");
    //         $(".result").css({ background: "red" });
    //         setTimeout(function() {
    //             $(".result").html("");
    //         }, 2000);
    //         // this.flashHP(tank);
    //         tank.hp -= 1;
    //         $(`p#tank-${tank.id}-health`).html(`HP: ${tank.hp}`);
    //         return true;
    //     } else {
    //         if (this.bottom < 0) {
    //             $(".result").html("MISS");
    //             $(".result").css({ background: "green" });
    //             setTimeout(function() {
    //                 $(".result").html("");
    //             }, 2000);
    //         }
    //         return false;
    //     }
    // }

    bothMovement() {
        // if (this.checkCollision()) {
        //     this.proj.remove();
        //     if (this.gun.tank.hp === 0) {
        //         this.gun.tank.game.endGame();
        //     } else if (this.gun.tank.enemyTank.hp === 0) {
        //         this.gun.tank.game.endGame();
        //     } else {
        //         this.gun.tank.game.counter = 0;
        //     }
        // } else {
        this.updateProjectile();
        this.draw();
        // this.proj.style.bottom = `${this.bottom}px`;
        // this.proj.style.left = `${this.relLeft}px`;
        this.timeInAir += 1 / 60;
        window.requestAnimationFrame(this.bothMovement.bind(this));
        // }
    }

    // flashHP(tank) {
    //     var color;
    //     if (tank.id === 1) {
    //         color = "yellow";
    //     } else if (tank.id === 2) {
    //         color = "purple";
    //     }
    //     $(`#player-${tank.id}-status`).css({ background: "red" });
    //     setTimeout(function() {
    //         $(`#player-${tank.id}-status`).css({ background: color });
    //         $(".result").css({ background: color });
    //     }, 500);
    //     setTimeout(function() {
    //         $(`#player-${tank.id}-status`).css({ background: "red" });
    //         $(".result").css({ background: "red" });
    //     }, 1000);
    //     setTimeout(function() {
    //         $(`#player-${tank.id}-status`).css({ background: color });
    //         $(".result").css({ background: color });
    //     }, 1500);
    // }
}