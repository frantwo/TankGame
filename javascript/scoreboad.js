//este literal mantiene el marcador del juego con su puntuación
var ScoreBoard = {
    ctx: undefined,
    init: function(ctx) {
        ctx.font = "30px sans-serif";
        this.ctx = ctx;
    },
    update: function(scorePlayerA, scorePlayerB) {
        this.ctx.fillStyle = "green";
        this.ctx.fillText(Math.floor(scorePlayerA), 50, 50);
        this.ctx.fillText(Math.floor(scorePlayerB), 200, 50);
    }
};