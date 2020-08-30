const ball = new DrawBall;

function liveBall () {
    const ballSpeedLimit = 5;
    const ballRandom = Math.random() * (Math.random() * ballSpeedLimit) ;
    
    // ball 변화 주기
    if(ball.moveX > 0 && ball.moveX < ballSpeedLimit){
        ball.moveX = ball.moveX + ballRandom;
    } else if(ball.moveX < 0 && ball.moveX > -ballSpeedLimit) {
        ball.moveX = ball.moveX - ballRandom;
    } else {
        if(ball.moveX > 0){
            ball.moveX = ballSpeedLimit - ballRandom;
        } else {
            ball.moveX = -ballSpeedLimit + ballRandom;
        }
    }
    if(ball.moveY > 0 && ball.moveY < ballSpeedLimit){
        ball.moveY = ball.moveY + ballRandom;
    } else if(ball.moveY < 0 && ball.moveY > -ballSpeedLimit){
        ball.moveY = ball.moveY - ballRandom;
    } else {
        if(ball.moveY > 0){
            ball.moveY = ballSpeedLimit - ballRandom;
        } else {
            ball.moveY = -ballSpeedLimit + ballRandom;
        }
    }
    
    // x 반전
    if(ball.x + ball.moveX > ball.canvas.width - ball.ballRadius || ball.x + ball.moveX < ball.ballRadius){
        ball.moveX = -ball.moveX + ballRandom;
    }
    // y 반전
    if(ball.y + ball.moveY> ball.canvas.height - ball.ballRadius || ball.y + ball.moveY  < ball.ballRadius){
        ball.moveY = -ball.moveY + ballRandom;
    } 

    ball.x = ball.x + ball.moveX;
    ball.y = ball.y + ball.moveY;
}
(function init (){
    liveBall();
    requestAnimationFrame(init);
})();