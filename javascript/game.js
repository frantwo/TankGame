var Game = {
    canvas: undefined,
    canvasWidth: 1024,
    canvasHeight: 600,
    ctx: undefined,
    fps: 60,
    scoreBoard: undefined,
    keys: {
        TOP_KEY: 38,
        DOWN_KEY: 40,
        SPACE: 32
    },

    turn: 0,
    background: undefined,
    player: undefined,
    windAngle: Math.round(Math.random() * 360),
    windSpeed: Math.round(Math.random() * 5),

    init: function(canvasId) {
        /** @type HTMLCanvasElement */
        this.canvas = document.getElementById(canvasId);
        /** @type CanvasRenderingContext2D */
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;

        this.start();
    },

    start: function(canvasId) {
        this.fps = 60;
        this.reset();

        this.interval = setInterval(() => {
            this.clear();
            this.framesCounter++;
            // controlamos que frameCounter no sea superior a 1000
            if (this.framesCounter > 1000) {
                this.framesCounter = 0;
            }
            this.drawAll();

            // //x=0 y= positiva
            // this.ctx.fillStyle = "blue";
            // this.ctx.beginPath();
            // this.ctx.rect(100, 100, 5, -100);
            // this.ctx.closePath();
            // this.ctx.fill();

            // //x=positiva y = 0
            // this.ctx.fillStyle = "white";
            // this.ctx.beginPath();
            // this.ctx.rect(100, 100, 100, 5);
            // this.ctx.closePath();
            // this.ctx.fill();

            // //x=0 y=negativa
            // this.ctx.fillStyle = "red";
            // this.ctx.beginPath();
            // this.ctx.rect(100, 100, 5, 100);
            // this.ctx.closePath();
            // this.ctx.fill();

            // //x=negativa y = 0
            // this.ctx.fillStyle = "yellow";
            // this.ctx.beginPath();
            // this.ctx.rect(100, 100, -100, 5);
            // this.ctx.closePath();
            // this.ctx.fill();
        }, 1000 / this.fps);
    },

    //reseteamos todos los elementos del juego para empezar en un estado limpio
    reset: function() {
        this.background = new Background(
            this.canvas.width,
            this.canvas.height,
            this.ctx
        );
        this.player = new Player(
            this.canvas.width,
            this.canvas.height,
            this.ctx,
            this.keys,
            this
        );
        this.framesCounter = 0;
        document.querySelector("#angle").innerHTML = "Angle: 0";
        document.querySelector("#powergun").innerHTML = "Power: 0";
    },

    //limpieza de la pantalla
    clear: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    stop: function() {
        clearInterval(this.interval);
    },

    //fin del juego
    gameOver: function() {
        this.stop();
        if (confirm("GAME OVER. Play again?")) {
            this.reset();
            this.start();
        }
    },

    //dibuja todos los assets del juego
    drawAll: function() {
        this.background.draw();
        this.player.draw(this.framesCounter);
    }
};