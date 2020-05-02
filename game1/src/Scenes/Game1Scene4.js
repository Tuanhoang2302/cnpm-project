/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import 'phaser';
import Ball from '../gameObject/Ball';
import FdInFdOut from '../helper/FdInFdOut';
import Block from '../gameObject/Block';


const BLOCK = {
  X: 250,
  Y: 120,
};

const RANGEBLOCK = 90;
// export var isWannaReset4 = [false];
export default class Game1Scene4 extends Phaser.Scene {
  constructor() {
    super('Scene4');
  }

  preload() {
    this.load.html('question3', 'src/InputForm/scene4.html');
    this.load.image('border', 'src/assets/border.png');
    this.load.html('return', 'src/assets/text/return.html');
    this.load.image('button', 'src/assets/next.png');
    this.load.image('dayChau', 'src/assets/arrBlock.png');
    this.load.image('ballHolder', 'src/assets/thanh.png');
    this.load.image('ball', 'src/assets/ball.png');
  }

  create() {
    this.Recreate();
    this.CreateBall();
    this.CreateBorder();
    this.CreateTextAndBlock();
    this.CreateLanguage();
  }

  update() {
    this.Move_Block_and_Display_NextQuestion();
    this.DisplayQuestion1();
    this.DisplayQuestion2();
    this.ResetScene();
    this.MoveBall();
  }

  //------------------------------------------------------------------------------------

  // eslint-disable-next-line camelcase
  Move_Block_and_Display_NextQuestion() {
    if (this.isMovingBlock) {
      const startPosYBlock = BLOCK.Y + RANGEBLOCK * (this.currentBlock - 1);
      const destination = BLOCK.Y + RANGEBLOCK * this.currentBlock;
      if (this.block.y === startPosYBlock) {
        (new Block()).createArrayBlock(this, BLOCK.X, startPosYBlock);
      }
      if (this.block.y < destination) {
        this.block.y += 3;
      } else {
        this.currentBlock++;
        this.isDisplayNextText = true;
        this.isMovingBlock = false;
      }
    }

    if (this.isDisplayNextText) {
      if (this.currentBlock === 2) {
        $(document).ready(() => {
          $('#layout_question2').delay(500).fadeIn();
        });
      } else if (this.currentBlock === 3) {
        $(document).ready(() => {
          $('#layout_question3').delay(500).fadeIn();
        });
      } else if (this.currentBlock === 4) {
        $(document).ready(() => {
          $('#layout_question4').delay(500).fadeIn();
        });
      }

      if (this.currentBlock < totalBlock) {
        this.time.addEvent({
          delay: 1000,
          callback: () => {
            this.isMovingBlock = true;
          },
          repeat: 0,
        });
      } else {
        this.isDisplayQuestion1 = true;
      }
      this.isDisplayNextText = false;
    }
  }

  DisplayQuestion1() {
    if (this.isDisplayQuestion1) {
      $(document).ready(() => {
        $('#layout_lastquestion').delay(1000).fadeIn();
      });
      setTimeout(() => {
        document.getElementById('inputScene4').focus();
      }, 1100);
      this.isDisplayQuestion1 = false;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  DisplayQuestion2() {
    if (isDisplayQuestion2) {
      $(document).ready(() => {
        $('#layout_lastquestion2').delay(1000).fadeIn();
      });
      setTimeout(() => {
        document.getElementById('inputScene4v1').focus();
      }, 1100);
      isDisplayQuestion2 = false;
    }
  }

  ResetScene() {
    if (isResetScene) {
      if (isWannaReset) {
        this.time.addEvent({
          delay: 1000,
          callback: () => {
            this.scene.start('Scene4');
          },
          repeat: 0,
        });
      } else {
        this.is_Move_Ball = true;
      }
    }
  }

  MoveBall() {
    if (this.is_Move_Ball) {
      if (this.ball_Last.x < 680) {
        this.ball_Last.x += 3;
      } else {
        this.time.addEvent({
          delay: 2000,
          callback: () => {
            this.scene.start('Scene5');
          },
          repeat: 0,
        });
      }
    }
  }


  //------------------------------------------------------------------------------------

  CreateBall() {
    this.add.image(540, 30, 'ballHolder');
    // eslint-disable-next-line func-names
    this.ball_Last = (function (scene) {
      const ball = new Ball();
      ball.create(scene, 770, 29);
      ball.create(scene, 740, 29);
      ball.create(scene, 710, 29);
      for (let i = 0; i < 2; i++) {
        var temp = ball.create(scene, 310 + 30 * i, 29);
      }
      // eslint-disable-next-line block-scoped-var
      return temp;
    }(this));
  }

  CreateBorder() {
    for (let i = 0; i < totalBlock; i++) {
      border.push(this.add.image(BLOCK.X, BLOCK.Y + RANGEBLOCK * i, 'border'));
      border[i].setVisible(0);
    }
  }

  CreateTextAndBlock() {
    this.block = (new Block()).createArrayBlock(this, BLOCK.X, BLOCK.Y);
    this.question_Sub = this.add.dom(750, 130).createFromCache('question3');
    this.block.setAlpha(0);
    this.fade = new FdInFdOut(this);
    this.fade.FdOut(this.block);
    $(document).ready(() => {
      $('#layout_question1').hide();
      $('#layout_question1').delay(1000).fadeIn();
    });
    this.time.addEvent({
      delay: 2000,
      callback: () => {
        this.isMovingBlock = true;
      },
      repeat: 0,
    });
    const m = document.getElementsByClassName('layout_question');
    for (let i = 1; i < m.length; i++) {
      m[i].style.padding = '35px 0 0 0';
      m[i].style.margin = '0 0 0 10px';
    }
    m[1].style.bottom = '7px';
  }

  // eslint-disable-next-line class-methods-use-this
  CreateLanguage() {
    if (window.location.hash == '#vietnam') {
      const question = document.getElementsByClassName('question');
      for (let i = 0; i < question.length; i++) {
        question[i].innerHTML = 'Hình bên có 10 khối';
      }
      document.getElementById('lastques').innerHTML = 'Tổng số thanh bên trên:';
      document.getElementById('lastques2').innerHTML = 'Tổng số khối bên trên:';
    }
  }

  Recreate() {
    this.ball_Last = null;
    this.block = null;
    this.fade = null;
    this.isMovingBlock = false;
    this.isDisplayNextText = false;
    this.currentBlock = 1;
    this.isDisplayQuestion1 = false;
    isDisplayQuestion2 = false;
    totalBlock = Math.floor(Math.random() * (4 - 2 + 1) + 2);
    border = [];
    isResetScene = false;
    isWannaReset = false;
    this.is_Move_Ball = false;
  }
}

var totalBlock = Math.floor(Math.random() * (4 - 2 + 1) + 2);
var border = [];
var isDisplayQuestion2 = false;
var isResetScene = false;
var isWannaReset = false;

// eslint-disable-next-line camelcase
window.Check_QuestionScene4 = function Check_QuestionScene4() {
  if (document.getElementById('inputScene4').value !== '') {
    const y = document.getElementById('inputScene4').value % 10;
    document.getElementById('inputScene4').value = '';
    document.getElementById('inputScene4').value = y;
    if (document.getElementById('inputScene4').value == totalBlock) {
      for (let i = 0; i < totalBlock; i++) {
        border[i].setVisible(0);
      }
      const textResult = document.createElement('div');
      textResult.appendChild(document.createTextNode((totalBlock).toString()));
      const layoutQuestion = document.getElementById('layout_lastquestion');
      textResult.style.cssText = 'display: inline-block; font-size:60px; margin-left: 20px';
      layoutQuestion.replaceChild(textResult, document.getElementById('answer1'));
      isDisplayQuestion2 = true;
    } else {
      for (let i = 0; i < totalBlock; i++) {
        border[i].setVisible(1);
      }
      document.getElementById('inputScene4').style.color = 'red';
      isWannaReset = true;
    }
  }
};

// eslint-disable-next-line camelcase
window.Check_QuestionScene4v1 = function Check_QuestionScene4v1() {
  if (document.getElementById('inputScene4v1').value !== '') {
    const y = document.getElementById('inputScene4v1').value % 10;
    document.getElementById('inputScene4v1').value = '';
    document.getElementById('inputScene4v1').value = y;
    if (document.getElementById('inputScene4v1').value == totalBlock) {
      for (let i = 0; i < totalBlock; i++) {
        border[i].setVisible(0);
      }
      document.getElementById('inputScene4v1').style.color = 'black';
      document.getElementById('inputScene4v2').focus();
    } else {
      for (let i = 0; i < totalBlock; i++) {
        border[i].setVisible(1);
      }
      document.getElementById('inputScene4v1').style.color = 'red';
      isWannaReset = true;
    }
  }
};

// eslint-disable-next-line camelcase
window.Check_QuestionScene4v2 = function Check_QuestionScene4v2() {
  if (document.getElementById('inputScene4v2').value !== '') {
    if (document.getElementById('inputScene4v2').value == 0) {
      for (let i = 0; i < totalBlock; i++) {
        border[i].setVisible(0);
      }
      const textResult = document.createElement('div');
      textResult.appendChild(document.createTextNode((totalBlock * 10).toString()));
      const layoutQuestion = document.getElementById('layout_lastquestion2');
      textResult.style.cssText = 'display: inline-block; font-size:60px; margin-left: 20px';
      layoutQuestion.replaceChild(textResult, document.getElementById('answer2'));
      isResetScene = true;
    } else {
      for (let i = 0; i < totalBlock; i++) {
        border[i].setVisible(1);
      }
      document.getElementById('inputScene4v2').style.color = 'red';
      isWannaReset = true;
    }
  }
};
