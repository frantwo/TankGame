class Game {
    canvas = undefined;
    ctx = undefined;
    fps = 60;
    scoreBoard = undefined;
    keys = {
        TOP_KEY: 38,
        DOWN_KEY: 40,
        SPACE: 32
    };

    init(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext("2d");

        ScoreBoard.init(this.ctx);

        this.start();
    }

    start() {
        this.fps = 60;
        this.reset();

        this.interval = setInterval(() => {
            this.clear();
            this.framesCounter++;
            // controlamos que frameCounter no sea superior a 1000
            if (this.framesCounter > 1000) {
                this.framesCounter = 0;
            }
            // controlamos la velocidad de generación de obstáculos
            // if (this.framesCounter % 50 === 0) {
            //     this.generateObstacle();
            // }
            // this.score += 0.01;

            this.moveAll();
            // this.drawAll();

            // eliminamos obstáculos fuera del canvas
            // this.clearObstacles();
            // if (this.isCollision()) {
            //     this.gameOver();
            // }
        }, 1000 / this.fps);
    }

    //reseteamos todos los elementos del juego para empezar en un estado limpio
    reset() {
        this.background = new Background(this.canvas.width, this.canvas.height, this.ctx);
        this.player = new Player(this.canvas.width, this.canvas.height, this.ctx, this.keys);
        this.scoreBoard = ScoreBoard;
        this.framesCounter = 0;
        this.obstacles = [];
        this.score = 0;
    }

    //limpieza de la pantalla
    clear() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    //mueve todos los objetos del escenario, el fondo, el jugador y los obstáculos
    moveAll() {
        // this.background.move();
        this.player.move();
        // this.obstacles.forEach(function(obstacle) {
        //     obstacle.move();
        // });
    }




    stop() {
        clearInterval(this.interval);
    }

    //fin del juego
    gameOver() {
        this.stop();
        if (confirm("GAME OVER. Play again?")) {
            this.reset();
            this.start();
        }
    }


    /*
        //chequea si ha sucedido una colisión
        isCollision() {
            // colisiones genéricas
            // (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
            // esto chequea que el personaje no estén en colisión con cualquier obstáculo
            return this.obstacles.some(obstacle => {
                return (
                    this.player.x + this.player.w >= obstacle.x &&
                    this.player.x < obstacle.x + obstacle.w &&
                    this.player.y + (this.player.h - 20) >= obstacle.y
                );
            });
        }

        //esto elimina los obstáculos del array que estén fuera de la pantalla
        clearObstacles() {
            this.obstacles = this.obstacles.filter(function(obstacle) {
                return obstacle.x >= 0;
            });
        }

        //generamos nuevos obstáculos
        generateObstacle() {
            this.obstacles.push(
                new Obstacle(this.canvas.width, this.player.y0, this.player.h, this.ctx)
            );
        }
    */



    //dibuja todos los assets del juego
    drawAll() {
        this.background.draw();
        this.player.draw(this.framesCounter);
        this.obstacles.forEach(function(obstacle) {
            obstacle.draw();
        });
        this.drawScore();
    }

    //pinta el marcador
    drawScore() {
        this.scoreBoard.update(this.score);
    }
};