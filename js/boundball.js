/**
 * boundBall.js v1.0.0 (https://github.com/yoonjonglyu/boundBallGame)
 * Copyright 2020 ISA
 * MIT (https://github.com/yoonjonglyu/boundBallGame/blob/master/LICENSE)
 */

/**
 * @class Canvas
 * @description 캔버스 기본 설정 셋팅하기
 * @constructor canvas, ctx
 */
class Canvas {
    constructor () {
        this.canvas = document.querySelector('#gameBoard');
        this.canvasWidth = this.canvas.offsetWidth;
        this.canvasHeight = this.canvas.offsetHeight;
        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;
        this.ctx = this.canvas.getContext('2d');
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
 * @class DrawBall
 * @extends Canvas
 * @description 캔버스 2d 공그리기
 * @constructor x, y, ballRadius, color, colorIndex
 */
class DrawBall extends Canvas {
  constructor () {
      super();
      this._x = this.canvas.width / 2;
      this._y = this.canvas.height - 30;
      this._ballRadius = 13;
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
}
// 벽돌에 관한 클래스
class DrawBrick {

}

// 패들에 관한 클래스
class DrawPaddle extends Canvas{
    constructor () {
        super();
        this._width = this.canvas.width / 8;
        this._height = this.canvas.height / 20;
        this._x = (this.canvas.width - this.width) / 2;
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

    // drawPaddle
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
        document.addEventListener('mousemove', (e) => {
            const relativeX = e.clientX - this.canvas.offsetLeft;
            if(e.target.id === "gameBoard"){
                if(relativeX > 0 && relativeX < this.canvas.width){
                    this.x = relativeX - (this.width / 2);
                }
            }
        });
    }
}

// 점수에 관한 클래스
class DrawScore {

}

// 아이템에 관한 클래스
class MakeItem {

}

// 스테이지에 관한 클래스
class stageInfo {
    
}