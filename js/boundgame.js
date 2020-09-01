const ball = new DrawBall;
const paddle = new DrawPaddle;
const brick = new DrawBrick;
let over = false;

function liveBall () {
    const ballSpeedLimit = ((ball.canvas.width + ball.canvas.height) / 250);
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
        checkGameOver(ballRandom); 
    }

    ball.x += ball.moveX;
    ball.y += ball.moveY;
}

function getPaddle () {
    const paddleSpeed = (paddle.canvas.width / 110);
    paddle.drawPaddle();

    if(paddle.rightMove && paddle.x < (ball.canvas.width - paddle.width)){
        paddle.x += paddleSpeed;
    }
    else if (paddle.leftMove && paddle.x > 0){
    paddle.x -= paddleSpeed;
    }
}
function checkGameOver (ballRandom) {
    if((ball.x + ball.ballRadius - 2) > paddle.x && (ball.x - ball.ballRadius + 2) < (paddle.x + paddle.width)){
        ball.moveY = -ball.moveY + ballRandom;
    } else {
        if(over === false){
            over = true;
            alert("게임 오버.");
            location.reload();
        }

    }

    ball.colorIndex++;
}

function getBrick () {
    for(let c = 0; c < brick.column; c++){
        brick.box[c] = [];
        for(let r = 0; r < brick.row; r++){
          brick.box[c][r] = {x: 0 ,y: 0, status: 1};
        }
    }
}

function drawBirck () {
    for(let c = 0; c < brick.column; c++){
        for(let r = 0; r < brick.row; r++){
            if(brick.box[c][r].status === 1){
                brick.x = (c * (brick.width + brick.padding)) + brick.offsetX;
                brick.y = (r * (brick.height + brick.padding)) + brick.offsetY;
                brick.box[c][r].x = brick.x;
                brick.box[c][r].y = brick.y;

                brick.drawBricks();
            }
        }
    }
}
function crashBrick () {
    for(let c = 0; c < brick.column; c++) {
        for(let r = 0; r < brick.row; r++) {
            const state = brick.box[c][r];
            if(state.status === 1) {
                if(ball.x > state.x && ball.x < (state.x + brick.width) && ball.y > state.y && ball.y < (state.y + brick.height)) {
                    ball.moveY = -ball.moveY;
                    brick.colorIndex++;
                    state.status = 0;
                }
            }
        }
    }
}

function draw () {
    liveBall();
    getPaddle ();
    drawBirck();
    crashBrick ();
    requestAnimationFrame(draw);
}

(function init (){
    paddle.keyEvent();
    paddle.mouseEvent();
    getBrick();
    draw ();
})();