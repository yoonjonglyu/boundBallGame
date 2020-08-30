(function init (){
    const ball = new DrawBall;
    ball.drawBall();
    setInterval(() => { ball.x++ }, 1000);
    setInterval(() => { ball.y++ }, 1000);
})();