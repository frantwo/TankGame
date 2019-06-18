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

    init: function(canvasId) {
        this.canvas = document.getElementById(canvasId);
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
            this.keys
        );
        this.framesCounter = 0;
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