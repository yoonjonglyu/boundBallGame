const ball = new DrawBall;
const paddle = new DrawPaddle;
let over = false;

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
    if((ball.x + ball.moveX) > (ball.canvas.width - ball.ballRadius) || (ball.x + ball.moveX) < ball.ballRadius){
        ball.moveX = -ball.moveX + ballRandom;
        ball.colorIndex++;
    }
    // y 반전
    if(ball.y + ball.moveY < ball.ballRadius){
        ball.moveY = -ball.moveY + ballRandom;
        ball.colorIndex++;
    } else if (ball.y + ball.moveY > ball.canvas.height - (ball.ballRadius/ 2)){
        if((ball.x + ball.ballRadius - 2) > paddle.x && (ball.x - ball.ballRadius + 2) < (paddle.x + paddle.width)){
            ball.moveY = -ball.moveY + ballRandom;
        } else {
            if(over === false){
                over = true;
                alert("게임 오버.");
            }

        }

        ball.colorIndex++;
    }

    ball.x = ball.x + ball.moveX;
    ball.y = ball.y + ball.moveY;
}

function getPaddle () {
    const paddleSpeed = 8;
    paddle.drawPaddle();

    if(paddle.rightMove && paddle.x < (ball.canvas.width - paddle.width)){
        paddle.x += paddleSpeed;
    }
    else if (paddle.leftMove && paddle.x > 0){
    paddle.x -= paddleSpeed;
    }
}

function draw () {
    liveBall();
    getPaddle ();
    requestAnimationFrame(draw);
}

(function init (){
    draw ();
    paddle.keyEvent();
    paddle.mouseEvent();

})();