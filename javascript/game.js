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
    playerOne: undefined,
    playerTwo: undefined,
    currentPlayer: undefined,
    windAngle: Math.round(Math.random() * 360),
    windSpeed: Math.round(Math.random() * 5),
    img: undefined,
    backgroundImg: undefined,
    turnPlayer: 1,

    init: function(canvasId) {
        /** @type HTMLCanvasElement */
        this.canvas = document.getElementById(canvasId);
        /** @type CanvasRenderingContext2D */
        this.ctx = this.canvas.getContext("2d");
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;

        //cargo todas las imágenes al inicio para no sobre cargar el navegador
        this.img = new Image();
        this.img.src = "./images/canon.png";
        this.backgroundImg = new Image();
        this.backgroundImg.src = "./images/paisaje02.jpg";
        this.img.onload = () => {
            this.backgroundImg.onload = () => {
                this.start();
            };
        };
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
            if (this.turnPlayer == this.playerOne.id) {
                this.currentPlayer = this.playerOne
            } else {
                this.currentPlayer = this.playerTwo
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
            this.ctx,
            this.backgroundImg
        );
        this.playerOne = new Player(
            100,
            0,
            1,
            this.canvas.width,
            this.canvas.height,
            this.ctx,
            this.keys,
            this
        );
        // this.playerTwo = new Player(
        //     this.canvasWidth - 100,
        //     0,
        //     2,
        //     this.canvas.width,
        //     this.canvas.height,
        //     this.ctx,
        //     this.keys,
        //     this
        // );
        this.framesCounter = 0;
        document.querySelector("#angle").innerHTML = "Angle: 0";
        document.querySelector("#powergun").innerHTML = "Power: 0";
        if (this.turnPlayer == 1) {
            document.querySelector("#points_player_A").innerHTML = "FIRE!";
            document.querySelector("#points_player_A").classList.replace(".turnOff", ".TurnOn");
            document.querySelector("#points_player_B").innerHTML = "PRAY...";
            document.querySelector("#points_player_B").classList.replace(".turnOn", ".TurnOff");
        } else {
            document.querySelector("#points_player_A").innerHTML = "PRAY...";
            document.querySelector("#points_player_A").classList.replace(".turnOn", ".TurnOff");
            document.querySelector("#points_player_B").innerHTML = "FIRE!";
            document.querySelector("#points_player_B").classList.replace(".turnOff", ".TurnOn");
        }
    },

    //limpieza de la pantalla
    clear: function() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },

    stop: function() {
        clearInterval(this.interval);
    },

    changeTurn: function() {

    },

    //fin del juego
    gameOver: function() {
        this.stop();
        if (confirm("GAME OVER. Play again?")) {
            this.start();
        }
    },

    //dibuja todos los assets del juego
    drawAll: function() {
        this.background.draw();
        this.currentPlayer.draw(this.framesCounter);
    }
};