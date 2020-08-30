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
    constructor(canvas, ctx){
        this.canvas = document.querySelector('#gameBoard');
        this.ctx = this.canvas.getContext('2d');
    }

    setCanvas (target) {
        this.canvas = document.querySelector(target);
        this.ctx = this.canvas.getContext('2d');
    }
}
/**
 * @class DrawBall
 * @extends Canvas
 * @description 캔버스 2d 공그리기
 * @constructor x, y, ballRadius, color, colorIndex
 */
class DrawBall extends Canvas {
  constructor(x, y, ballRadius, color, colorIndex){
      super();
      this.x = this.canvas.width / 2;
      this.y = this.canvas.height - 30;
      this.ballRadius = 13;
      this.color = [
          "red","blue","green","lightblue","darkblue","#6a2c70","#e23e57",
          "#3490de","#ffd460","#edb1f1","#cabbe9","#62d2a2","#fc5c9c",
          "#ffebb7","#fdffab","#f47c7c"
      ];
      this.colorIndex = 0;
  }

  drawBall () {
    this.ctx.beginPath();
    this.ctx.arc(this.x,this.y,this.ballRadius,0,Math.PI*2);
    this.ctx.fillStyle = this.color[this.colorIndex];
    this.ctx.fill();
    this.ctx.closePath();
  }
}
// 벽돌에 관한 클래스
class DrawBrick {

}

// 패들에 관한 클래스
class DrawPaddle {

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