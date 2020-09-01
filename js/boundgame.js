const ball = new DrawBall;
const paddle = new DrawPaddle;
const brick = new DrawBrick;
const score = new DrawScore;
let over = false;

/**
 * @function liveBall
 * @description 공 속도 나 튕김등을 제어하면서 지속적으로 움직이는 공을 그린다
 */
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
/**
 * @function getPaddle
 * @description 공을 받아 칠 채를 그리고 이벤트에 따라 이동시킨다
 */
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
/**
 * @function checkGameOver
 * @description 공이 아래 선 위치에 도착했을때 채(paddle)의 위치를 비교해서 공을 튀기거나 실패에 대한 처리를 한다
 * @param {Float} ballRandom 
 */
function checkGameOver (ballRandom) {
    const init = () => {
        ball.initBall();
        paddle.initPaddle();
    };
    if((ball.x + ball.ballRadius - 2) > paddle.x && (ball.x - ball.ballRadius + 2) < (paddle.x + paddle.width)){
        ball.moveY = -ball.moveY + ballRandom;
    } else {
        if((score.life - 1) < 0){
            alert("게임 오버.");
            getBrick();
            score.initGame();
        } else {
            score.life--;
        }
        init();
    }

    ball.colorIndex++;
}
/**
 * @function getBrick
 * @description 벽돌 규격에 맞게 벽돌 2차원 배열을 생성한다
 */
function getBrick () {
    for(let c = 0; c < brick.column; c++){
        brick.box[c] = [];
        for(let r = 0; r < brick.row; r++){
          brick.box[c][r] = {x: 0 ,y: 0, status: 1};
        }
    }
}
/**
 * @function drawBrick
 * @description get 해온 벽돌 배열 상태에 맞게 벽돌을 그린다
 */
function drawBrick () {
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
/**
 * @function crashBrick
 * @description 공과 벽돌사이의 충돌을 감지하고 충돌 이벤트를 발생 시킨다
 */
function crashBrick () {
    for(let c = 0; c < brick.column; c++) {
        for(let r = 0; r < brick.row; r++) {
            const state = brick.box[c][r];
            if(state.status === 1) {
                if(ball.x > state.x && ball.x < (state.x + brick.width) && ball.y > state.y && ball.y < (state.y + brick.height)) {
                    ball.moveY = -ball.moveY;
                    brick.colorIndex++;
                    state.status = 0;
                    score.score++;
                }
            }
        }
    }
}
/**
 * @function checkBrick
 * @description 남은 벽돌이 있는지 검사하고 없을 시 새로 벽돌을 생성해준다.
 */
async function checkBrick () {
    let check = brick.box;
    check = await (check.map((array) => array.filter((obj) => obj.status === 1))).filter((array) => array.length > 0);
    if(check.length === 0){
        getBrick();
    }
}
/**
 * @function drawScore
 * @description 점수와 기회를 그린다
 */
function drawScore () {
    score.drawScore();
    score.drawLife();
}
/**
 * @function draw
 * @description canvas내용물을 request 애니메이션을 통해서 지속적으로 그린다
 */
function draw () {
    liveBall();
    getPaddle ();
    checkBrick ()
    drawBrick();
    crashBrick();
    requestAnimationFrame(draw);
}
/**
 * @function init
 * @description 즉시 실행함수 이벤트 리스닝 등 1회성 함수들과 draw 함수의 실행을 담당한다
 */
(function init (){
    paddle.keyEvent();
    paddle.mouseEvent();
    getBrick();
    drawScore();
    draw();
})();