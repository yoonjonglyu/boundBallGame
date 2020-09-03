/**
 * boundBall.js v1.0.0 (https://github.com/yoonjonglyu/boundBallGame)
 * Copyright 2020 ISA
 * MIT (https://github.com/yoonjonglyu/boundBallGame/blob/master/LICENSE)
 */

/**
 * @class Canvas
 * @description 캔버스 기본 설정 셋팅하기
 * @constructor canvas, ctx, canvasRender
 */
class Canvas {
    constructor () {
        this.canvas = document.querySelector('#gameBoard');
        this.canvasWidth = this.canvas.offsetWidth;
        this.canvasHeight = this.canvas.offsetHeight;
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.ctx = this.canvas.getContext('2d');
        this._canvasRender = false;
    }
    // canvasRender getter setter
    get canvasRender () {
        return this._canvasRender;
    }
    set canvasRender (value){
        if(typeof value === "boolean"){
            this._canvasRender = value;
        }
    }
    setCanvas (target) {
        this.canvas = document.querySelector(target);
        this.ctx = this.canvas.getContext('2d');
    }

    clearCanvas () {
        this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);
    }
}
/**
 * @class BallInfo
 * @extends Canvas
 * @description 캔버스 2d 공그리기
 * @constructor x, y, basicRadius, ballRadius, color, colorIndex
 */
class BallInfo extends Canvas {
  constructor () {
      super();
      this._x = (this.canvas.width / 2);
      this._y = (this.canvas.height - 30);
      this._basicRadius = (this.canvas.width / 70);
      this._ballRadius = (this.canvas.width / 70);
      this.color = [
          "red","blue","green","lightblue","darkblue","#6a2c70","#e23e57",
          "#3490de","#ffd460","#edb1f1","#cabbe9","#62d2a2","#fc5c9c",
          "#ffebb7","#fdffab","#f47c7c"
      ];
      this._colorIndex = 0;
      this.moveX = 2;
      this.moveY = 3;
  }
  // x getter setter
  get x () {
      return this._x;
  }
  set x (value){
      this._x = value;
      this.drawBall();
  }
  // y getter setter
  get y () {
      return this._y;
  }
  set y (value) {
      this._y = value;
      this.drawBall();
  }
  // ball radius getter setter
  get ballRadius () {
      return this._ballRadius;
  }
  set ballRadius (value) {
      this._ballRadius = value;
      this.drawBall();
  }
  // basic radius getter
  get basicRadius () {
      return this._basicRadius;
  }
  // color index getter setter
  get colorIndex () {
      return this._colorIndex;
  }
  set colorIndex (value) {
      if(this.color.length - 1 >= value){
          this._colorIndex = value;
      } else {
          this._colorIndex = 0;
      }
      this.drawBall();
  }

  // draw ball
  drawBall () {
    this.clearCanvas();
    this.ctx.beginPath();
    this.ctx.arc(this._x, this._y, this._ballRadius, 0, (Math.PI * 2));
    this.ctx.fillStyle = this.color[this.colorIndex];
    this.ctx.fill();
    this.ctx.closePath();
  }

  initBall (){
    this.x = (this.canvas.width / 2);
    this.y = (this.canvas.height - 30);
    this.ballRadius = (this.canvas.width / 70);
    this.colorIndex = 0;
    this.moveX = 2;
    this.moveY = 3;
  }
}
/**
 * @class BrickInfo
 * @extends Canvas
 * @description 캔버스 2d 벽돌 그리기
 * @constructor box, padding, row, column, x, y, width, height, offsetX, offsetY, color, colorIndex
 */
class BrickInfo extends Canvas{
    constructor () {
        super();
        this._box = [];
        this.padding = ((this.canvas.width + this.canvas.height) / 100);
        this._row = 5;
        this._column = 6;
        this._x = 0;
        this._y = 0;
        this._width = (this.canvas.width / 8);
        this._height = (this.canvas.height / 17);
        this._offsetX = ((this.canvas.width  - ((this._width + this.padding) * this._column)) / 2);
        this._offsetY = ((this.canvas.height  - ((this._height + this.padding) * this._row)) / 6);
        this.color = [
            "red","blue","green","lightblue","darkblue","#6a2c70","#e23e57",
            "#3490de","#ffd460","#edb1f1","#cabbe9","#62d2a2","#fc5c9c",
            "#ffebb7","#fdffab","#f47c7c"
        ];
        this._colorIndex = 0;
        this.blockColor =[
            "#eaeaea", "#e84545", "#903749", "#f08a5d", "#ff2e63", "#9896f1", "#07689f"
        ];
        this._blockIndex = 0;
    }
    // box getter setter
    get box () {
        return this._box;
    }
    set box (value) {
        this._box = value;
    }
    // x getter setter
    get x () {
        return this._x;
    }
    set x (value) {
        this._x = value;
    }
    // y getter setter
    get y () {
        return this._y;
    }
    set y (value) {
        this._y = value;
    }
    // width getter setter
    get width () {
        return this._width;
    }
    set width (value) {
        this._width = value;
    }
    // height getter setter
    get height () {
        return this._height;
    }
    set height (value) {
        this._height = value;
    }
    // color index getter setter
    get colorIndex () {
        return this._colorIndex;
    }
    set colorIndex (value) {
        if(this.color.length > value){
            this._colorIndex = value;
        } else {
            this._colorIndex = 0;
        }
    }
    // block index getter setter
    get blockIndex () {
        return this._blockIndex;
    }
    set blockIndex (value) {
        if(this.blockColor.length > value){
            this._blockIndex = value;
        } else {
            this._colorIndex = 0;
        }
    }
    // offsetX getter setter
    get offsetX () {
        return this._offsetX;
    }
    set offsetX (value) {
        this._offsetX = value;
    }
    // offsetY getter setter
    get offsetY () {
        return this._offsetY;
    }
    set offsetY (value) {
        this._offsetY = value;
    }
    // row getter setter
    get row () {
        return this._row;
    }
    set row (value) {
        this._row = value;
    }
    // column getter setter
    get column () {
        return this._column;
    }
    set column (value) {
        this._column = value;
    }

    // draw Bricks
    drawBricks () {
        this.ctx.beginPath();
        this.ctx.rect(this.x,this.y,this.width,this.height);
        this.ctx.fillStyle = this.blockColor[this.blockIndex];
        this.ctx.strokeStyle = this.color[this.colorIndex];
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();
    }
}
/**
 * @class PaddleInfo
 * @extends Canvas
 * @description 캔버스 2d 채 만들기
 * @constructor width, height, x, leftMove, rightMove
 */
class PaddleInfo extends Canvas{
    constructor () {
        super();
        this._width = (this.canvas.width / 8);
        this._height = (this.canvas.height / 20);
        this._x = ((this.canvas.width - this.width) / 2);
        this.leftMove = false;
        this.rightMove = false;
    }
    // width getter setter
    get width () {
        return this._width;
    }
    set width (value) {
        this._width = value;
        this.drawPaddle();
    }
    // height getter setter
    get height () {
        return this._height;
    }
    set height (value) {
        this._height = value;
        this.drawPaddle();
    }
    // x getter setter
    get x () {
        return this._x;
    }
    set x (value) {
        this._x = value;
        this.drawPaddle();
    }

    // draw paddle
    drawPaddle () {
        this.ctx.beginPath();
        this.ctx.rect(this._x, (this.canvas.height - this._height), this._width ,this._height);
        this.ctx.fillStyle ="#61105e";
        this.ctx.fill();
        this.ctx.closePath();
    }
    
    keyEvent () {
        document.addEventListener("keydown", (e) => {
            if(e.keyCode == 39){
                this.rightMove = true;
              }
              else if(e.keyCode == 37){
                this.leftMove = true;
              }
        });
        document.addEventListener("keyup", (e) => {
            if(e.keyCode == 39){
                this.rightMove = false;
              }
              else if(e.keyCode == 37){
                this.leftMove = false;
              }
        });
    }
    mouseEvent () {
        document.addEventListener("mousemove", (e) => {
            const relativeX = e.clientX - this.canvas.offsetLeft;
            if(e.target.id === "gameBoard" && this.canvasRender === true){
                if(relativeX > 0 && relativeX < this.canvas.width){
                    this.x = relativeX - (this.width / 2);
                }
            }
        });
    }

    initPaddle () {
        this.width = (this.canvas.width / 8);
        this.height = (this.canvas.height / 20);
        this.x = ((this.canvas.width - this.width) / 2);
    }
}

/**
 * @class UserRanks
 * @extends Canvas
 * @description 공튀기기 게임 랭킹 시스템
 * @constructor score, life, scoreElement, lifeElement, ranks
 */
class UserRanks extends Canvas{
    constructor () {
        super();
        this._score = 0;
        this._life = 3;
        this.scoreElement = document.querySelector('#score');
        this.lifeElement = document.querySelector('#life');
        this._ranks = JSON.parse(localStorage.getItem('boundBallRanks')) !== null ? JSON.parse(localStorage.getItem('boundBallRanks')) : [];
    }
    // score getter setter
    get score () {
        return this._score;
    }
    set score (value) {
        this._score = value;
        this.getScore();
    }
    // lift getter setter
    get life () {
        return this._life;
    }
    set life (value) {
        this._life = value;
        this.getLife();
    }
    // ranks getter setter
    get ranks () {
        return this._ranks;
    }
    set ranks (value) {
        const state = value.split(' ');
        const ranks = {
            name : state[0],
            score : state[1]
        };

        this._ranks.push(ranks);
        localStorage.setItem('boundBallRanks', JSON.stringify(this.ranks));
    }

    // get score
    getScore () {
        this.scoreElement.innerText = `점수 : ${this.score}`;
    }
    // get life
    getLife () {
        this.lifeElement.innerText = `기회 : ${this.life}`;
    }


    ranksEvent () {
        const ranksModal = document.querySelector('#ranksModal');
        const ranksButton = document.querySelector('#ranks');
        const ranksBody = document.querySelector('#ranksBody');

        ranksButton.addEventListener('click', (e) => {
            const view = ranksBody.querySelectorAll('tr');
            if(view.length > 0){
                view.forEach((dom) => dom.remove());
            }
            for(let int = 0; int < this.ranks.length; int++){
                const state = this.ranks[int];
                
                const ranks = document.createElement('tr');
                if(int % 2 === 0){
                    ranks.className = "table-secondary";
                } else {
                    ranks.className = "table-light";
                }
                ranks.innerHTML = `<th scope="row" colspan="2">${state.name} 님</th><td colspan="2">${state.score} 점</td>`;
    
                ranksBody.appendChild(ranks);
            }
            
            ranksModal.style.display = "block";
        });
        ranksModal.addEventListener('click', (e) => {
            if(e.target.dataset.dismiss === "modal" || e.target.parentElement.dataset.dismiss === "modal"){
                ranksModal.style.display = "none";
            }
        });
    }
    initGame () {
        this.score = 0;
        this.life = 3;
    }
}
/**
 * @class ItemInfo
 * @extends Canvas
 * @description 공튀기기 게임 아이템
 * @constructor 
 */
class ItemInfo extends Canvas{
    constructor () {
        super();
        this._items = [
            {
                name : "paddle 너비 증가(패시브)",
                color : "#e84545",
                description : "paddle 너비를 조금 늘려준다. 공을 놓치면 초기화. (중복적용가능)"
            },
            {
                name : "paddle 너비 증가(액티브)",
                color : "#903749",
                description : "paddle 너비를 최대로 늘려준다. 공을 10번 받아치면 효력을 상실한다. (중복적용불가)"
            },
            {
                name : "공 크기 증가 (패시브)",
                color: "#f08a5d",
                description : "공 크기를 조금 키워준다. 공을 놓치면 초기화. (중복적용가능)"
            },
            {
                name : "벽돌 관통(액티브)",
                color: "#ff2e63",
                description : "공이 벽돌과 충돌해도 튕기지 않게 된다. 벽돌을 10개 부수면 효력을 상실한다. (중복적용불가)"
            },
            {
                name : "변화구(패시브)",
                color: "#9896f1",
                description : "공의 크기가 지속적으로 커졌다 작아졌다 한다. 공을 놓치면 초기화. (중복적용불가)"
            },
            {
                name : "귀환 (액티브)",
                color: "#07689f",
                description : "공이 즉시 paddle 위로 이동하고, 한번 space바를 통해서 원할때 공을 튕길 수 있다. (중복적용불가)"
            }
        ];

        this._paddleCount = 0;
        this._ballCount = 0;
        this._ballRadius = 0;
        this._penetrateCount = 0;
        this._ballReactive = false;
        this._minRadius = 0;
        this._ballControl = false;
    }
    // items getter
    get items () {
        return this._items;
    }
    // paddle count getter setter
    get paddleCount () {
        return this._paddleCount;
    }
    set paddleCount (value) {
        if(typeof value === "boolean"){
            this._paddleCount = value;
        }
    }
    // ball count getter setter
    get ballCount () {
        return this._ballCount;
    }
    set ballCount (value) {
        this._ballCount = value;
    }
    // ball radius getter setter
    get ballRadius () {
        return this._ballRadius;
    }
    set ballRadius (value) {
        this.ballRadius = value;
    }
    // penetrate count getter setter
    get penetrateCount () {
        return this._penetrateCount;
    }
    set penetrateCount (value) {
        this._penetrateCount = value;
    }
    // ball reactive getter setter
    get ballReactive () {
        return this._ballReactive;
    }
    set ballReactive (value) {
        if(typeof value === "boolean"){
            this._ballReactive = value;
        }
    }
    // min radius getter setter
    get minRadius () {
        return this._minRadius;
    }
    set minRadius (value) {
        this._minRadius = value;
    }
    // ball control getter setter
    get ballControl () {
        return this._ballControl;
    }
    set ballControl (value) {
        if(typeof value === "boolean"){
            this._ballControl = value;
        }
    }

    itemEvent () {
        const itemsModal = document.querySelector('#itemsModal');
        const itemsButton = document.querySelector('#items');
        const itemsBody = document.querySelector('#itemsBody');

        itemsButton.addEventListener('click', (e) => {
            const view = itemsBody.querySelectorAll('h4');
            if(view.length > 0){
                view.forEach((dom) => dom.remove());
            }
            for(let int = 0; int < this.items.length; int++){
                const state = this.items[int];

                const items = document.createElement('div');
                
                items.className = "card mb-3";
                items.style.maxWidth =  "20rem";
                items.style.backgroundColor = state.color;

                items.innerHTML = `
                    <div class="card-header">${state.name}</div>
                    <div class="card-body">
                        <p class="card-text">${state.description}</p>
                    </div>
                `;
    
                itemsBody.appendChild(items);
            }
            
            itemsModal.style.display = "block";
        });
        itemsModal.addEventListener('click', (e) => {
            if(e.target.dataset.dismiss === "modal" || e.target.parentElement.dataset.dismiss === "modal"){
                itemsModal.style.display = "none";
            }
        });
    }
}
/**
 * @class StageInfo
 * @extends Canvas
 * @description 공튀기기 게임 스테이지 & 난이도
 * @constructor stages, stageLevel, ballSpeed, ballRadius, stageElement
 */
class StageInfo extends Canvas {
    constructor () {
        super();
        this._stages = [
            {level : 1, speed : 0, radius : 0}, {level : 2, speed : 1, radius : 1}, {level : 3, speed : 2, radius : 2}, {level : 4, speed : 3, radius : 3}, {level : 5, speed : 4, radius : 4}
        ];
        this._stageLevel = 0;
        this._ballSpeed = 0;
        this._ballRadius = 0;
        this.stageElement = document.querySelector('#stage');
    }
    // stages getter
    get stages () {
        return this._stages;
    }
    // stage level getter setter
    get stageLevel () {
        return this._stageLevel;
    }
    set stageLevel (value) {
        if(this.stages.length > value){
            this._stageLevel = value;
            this.getStage();
        }
    }
    // ball speed getter setter
    get ballSpeed () {
        return this._ballSpeed;
    }
    set ballSpeed (value) {
        this._ballSpeed = value;
    }
    // ball radius getter setter
    get ballRadius () {
        return this._ballRadius;
    }
    set ballRadius (value) {
        this._ballRadius = value;
    }

    // get stage
    getStage () {
        this.stageElement.innerText = `스테이지 : ${(this.stageLevel + 1)}`;
    }
    // draw ready
    drawReady () {
        this.ctx.beginPath();
        this.ctx.rect(10, 10, (this.canvas.width - 20), (this.canvas.height - 20));
        this.ctx.fillStyle = "lightblue";
        this.ctx.strokeStyle = "#eaeaea";
        this.ctx.fill();
        this.ctx.stroke();
        this.ctx.closePath();

        this.ctx.font = "1.5em 나눔고딕";
        this.ctx.fillStyle = "#ff2e63"
        this.ctx.fillText("시작하기 CLICK!",((this.canvas.width / 2) - 78), (this.canvas.height / 2));
        this.ctx.font = "1em 나눔고딕";
        this.ctx.fillStyle = "#ff2e63"
        this.ctx.fillText("↓↓ 스테이지, 아이템, 랭킹 ↓↓",((this.canvas.width / 2) - 98), ((this.canvas.height / 2) + 48));
    }
    
    stageEvent () {
        const stageModal = document.querySelector('#stagesModal');
        const stageButton = document.querySelector('#stages');
        const stageBody = document.querySelector('#stagesBody');

        stageButton.addEventListener('click', (e) => {
            const views = stageBody.querySelectorAll('tr');
            if(views.length > 0){
                views.forEach((dom) => dom.remove());
            }
            for(let int = 0; int < this.stages.length; int++){
                const state = this.stages[int];

                const stage = document.createElement('tr');
                stage.className = "table-info";

                stage.innerHTML = `<th scope="row" colspan="3" data-level="${state.level}" >Stage : ${state.level} 레벨`;

                stageBody.appendChild(stage);
            }
            
            stageModal.style.display = "block";
        });

        stageModal.addEventListener('click', (e) => {
            if(e.target.dataset.dismiss === "modal" || e.target.parentElement.dataset.dismiss === "modal"){
                stageModal.style.display = "none";
            } else if (e.target.dataset.level){
                this.stageLevel = (parseInt(e.target.dataset.level) - 1);
            }
        });
    }

    initStage () {
        this.stageLevel = 0;
        this.ballSpeed = 0;
        this.ballRadius = 0;
    }
}