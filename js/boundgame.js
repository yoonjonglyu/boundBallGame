const ball = new BallInfo;
const paddle = new PaddleInfo;
const brick = new BrickInfo;
const userRank = new UserRanks;
const stage = new StageInfo;
const items = new ItemInfo;


/**
 * @function liveBall
 * @description 공 속도 나 튕김등을 제어하면서 지속적으로 움직이는 공을 그린다
 */
function liveBall () {
    const ballSpeedLimit = (((ball.canvas.width + ball.canvas.height) / 250) + stage.ballSpeed);
    const ballRandom = Math.random() * (Math.random() * ballSpeedLimit);

    if(items.ballReactive){
        if((ball.ballRadius + ballRandom) < items.maxRadius / 2){
            items.minRadius = ballRandom;
        } else if((ball.ballRadius - (ball.ballRadius / 2)) > 0) {
            items.minRadius = - (ball.ballRadius / 2);
        }

        ball.ballRadius += items.minRadius;
    } else {
        ball.ballRadius = (ball.basicRadius - stage.ballRadius);
    }

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

    if(items.ballControl === false){
        ball.x += ball.moveX;
        ball.y += ball.moveY;
    } else {
        ball.x = (paddle.x + (paddle.width / 2));
        ball.y = (ball.canvas.height - 30);
    }
}
/**
 * @function getPaddle
 * @description 공을 받아 칠 채를 그리고 이벤트에 따라 이동시킨다
 */
function getPaddle () {
    const paddleSpeed = (paddle.canvas.width / 110);

    if(items.paddleCount === 0){
        paddle.width = items.paddleBasicWidth;
    } else {
        paddle.width = (paddle.canvas.width * 2);
    }

    if(paddle.rightMove && paddle.x < (ball.canvas.width - paddle.width)){
        paddle.x += paddleSpeed;
    }
    else if (paddle.leftMove && paddle.x > 0){
    paddle.x -= paddleSpeed;
    }

    paddle.drawPaddle();
}
/**
 * @function checkGameOver
 * @description 공이 아래 선 위치에 도착했을때 채(paddle)의 위치를 비교해서 공을 튀기거나 실패에 대한 처리를 한다
 * @param {Float} ballRandom 
 */
function checkGameOver (ballRandom) {
    const init = () => {
        items.initItem();
        ball.initBall();
        paddle.initPaddle();
    };
    if((ball.x + ball.ballRadius - 2) > paddle.x && (ball.x - ball.ballRadius + 2) < (paddle.x + paddle.width)){
        ball.moveY = -ball.moveY + ballRandom;
        if(items.paddleCount > 0){
            items.paddleCount++;
        }
    } else {
        init();
        
        if((userRank.life - 1) < 0){  
            alert("게임 오버.");
            let userName = prompt('랭킹에 등록할 이름을 입력해주세요. \n공백은 포함되지 않습니다.', 'ex : 김막걸리');
            if(userName !== null){
                userName = userName.split(' ').join('');
                userRank.ranks = `${userName} ${userRank.score}`;
            }

            paddle.canvasRender = false;
            stage.initStage();
            userRank.initGame();
        } else {
            userRank.life--;
        }
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
            const item = Math.floor(Math.random() * 18);

            brick.box[c][r] = {x: 0, y: 0, status: 1, item : item};
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

                setItems(brick.box[c][r].item);
                brick.drawBricks();
            }
        }
    }
}
/**
 * @function setItems
 * @description get 해온 벽돌의 아이템 여부에 맞게 벽돌 색깔을 변경한다
 * @param {int} item item index
 */
function setItems (item) {
    if(items.items.length >= item){
        brick.blockIndex = item;
    } else {
        brick.blockIndex = 0;
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
                if((ball.x + ball.ballRadius) > state.x && (ball.x - ball.ballRadius) < (state.x + brick.width) && (ball.y + ball.ballRadius) > state.y && (ball.y - ball.ballRadius) < (state.y + brick.height)) {
                    if(items.penetrateCount === 0){
                        ball.moveY = -ball.moveY;
                    } else {
                        items.penetrateCount++;
                    }
                    checkItem(state.item);

                    brick.colorIndex++;
                    state.status = 0;
                    userRank.score += (1 + stage.stageLevel);
                }
            }
        }
    }
}
/**
 * @function checkBrick
 * @description 남은 벽돌이 있는지 검사하고 없을 시 새로 벽돌을 생성해준다
 */
async function checkBrick () {
    let check = brick.box;
    check = await (check.map((array) => array.filter((obj) => obj.status === 1))).filter((array) => array.length > 0);
    if(check.length === 0){
        getBrick();
        stage.stageLevel++;
    }
}
/**
 * @function checkItem 
 * @description 벽돌이 격파 될때 해당 벽돌이 보유한 아이템이 있는지 확인하고 있으면 효과를 적용시켜준다
 * @param {Int} item item index 
 */
function checkItem (item) {
    switch (item){
        case 1: 
            items.paddleBasicWidth += (paddle.canvas.width / 30);;
            break;
        case 2:
            items.paddleCount = 1;
            if(items.paddleCount === 0){
                items.paddleBasicWidth = paddle.width;
            }
            break;
        case 3:
            items.penetrateCount = 1;
            break;
        case 4:
            if(items.ballReactive === false){
                items.minRadius = ball.ballRadius;
                items.maxRadius = (ball.ballRadius * 5)
            }
            items.ballReactive = true;
            break;
        case 5:
            items.ballControl = true;
            break;
        default:
            break;
    } 
}

/**
 * @function draw
 * @description canvas내용물을 request 애니메이션을 통해서 지속적으로 그린다
 */
function draw () {
    setStage();
    liveBall();
    getPaddle();
    checkBrick()
    drawBrick();
    crashBrick();

    if(paddle.canvasRender === true){
        requestAnimationFrame(draw);
    } else {
        readyGame();
    }
}
/** 
 * @function readyGame
 * @description 게임 시작 전 대기화면 및 게임 시작 이벤트를 관리한다
 */
function readyGame () {
    stage.clearCanvas();
    stage.drawReady();
    getStage();
    getScore();
    getBrick();

    const readyEvent = (e) => {
        stage.canvas.removeEventListener("click", readyEvent);

        paddle.canvasRender = true;
        requestAnimationFrame(draw); 
    };
    
    stage.canvas.addEventListener("click", readyEvent);
}


/**
 * @function getScore
 * @description 점수와 기회를 그린다
 */
function getScore () {
    userRank.getScore();
    userRank.getLife();
}
/**
 * @function getStage
 * @description 스테이지 정보 가져오기
 */
function getStage () {
    stage.getStage();
}
/**
 * @function setStage
 * @description 게임에 스테이지 난이도 적용하기
 */
function setStage () {
    const stageData = stage.stages[stage.stageLevel];
    stage.ballSpeed = stageData.speed;
    stage.ballRadius = stageData.radius;
}


/**
 * @function init
 * @description 즉시 실행함수 이벤트 리스닝 등 1회성 함수들과 draw 함수의 실행을 담당한다
 */
(function init (){
    paddle.keyEvent();
    paddle.mouseEvent();
    userRank.ranksEvent();
    stage.stageEvent();
    items.itemEvent();
    items.getControl();
    readyGame();
})();