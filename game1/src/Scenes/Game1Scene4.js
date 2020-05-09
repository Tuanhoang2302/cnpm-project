/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable eqeqeq */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import 'phaser';
import FdInFdOut from '../helper/FdInFdOut';
import Block from '../gameObject/Block';
import Game1Scene2 from './Game1Scene2';

const BLOCK = {
  X: 250,
  Y: 120,
};
var Scene2;
const RANGEBLOCK = 90;
// export var isWannaReset4 = [false];
export default class Game1Scene4 extends Phaser.Scene {
  constructor() {
    super('Scene4');
    this.isDisplayQuestion2 = [false];
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
    Scene2 = new Game1Scene2();
    this.Recreate(this);
    this.CreateBall();
    this.CreateBorder();
    this.CreateTextAndBlock(this, 'question3');
    this.CreateLanguage();
    this.CreateCheckInput();
  }

  update() {
    this.Move_Block_and_Display_NextQuestion(this);
    this.DisplayQuestion1(this);
    // eslint-disable-next-line prefer-destructuring
    this.isDisplayQuestion2[0] = isDisplayQuestion2[0];
    this.DisplayQuestion2(this);
    this.ResetScene(this);
    this.MoveBall();
  }

  //------------------------------------------------------------------------------------

  // eslint-disable-next-line camelcase
  Move_Block_and_Display_NextQuestion(other) {
    if (other.isMovingBlock) {
      const startPosYBlock = BLOCK.Y + RANGEBLOCK * (other.currentBlock - 1);
      const destination = BLOCK.Y + RANGEBLOCK * other.currentBlock;
      if (other.block.y === startPosYBlock) {
        (new Block()).createArrayBlock(other, BLOCK.X, startPosYBlock);
      }
      if (other.block.y < destination) {
        other.block.y += 3;
      } else {
        other.currentBlock++;
        other.isDisplayNextText = true;
        other.isMovingBlock = false;
      }
    }

    if (other.isDisplayNextText) {
      if (other.currentBlock === 2) {
        $(document).ready(() => {
          $('#layout_question2').delay(500).fadeIn();
        });
      } else if (other.currentBlock === 3) {
        $(document).ready(() => {
          $('#layout_question3').delay(500).fadeIn();
        });
      } else if (other.currentBlock === 4) {
        $(document).ready(() => {
          $('#layout_question4').delay(500).fadeIn();
        });
      }

      if (other.currentBlock < other.totalBlock) {
        other.time.addEvent({
          delay: 1000,
          callback: () => {
            other.isMovingBlock = true;
          },
          repeat: 0,
        });
      } else {
        other.isDisplayQuestion1 = true;
      }
      other.isDisplayNextText = false;
    }
  }

  DisplayQuestion1(other) {
    if (other.isDisplayQuestion1) {
      $(document).ready(() => {
        $('#layout_lastquestion').delay(1000).fadeIn();
      });
      setTimeout(() => {
        document.getElementById('inputScene4').focus();
      }, 1100);
      other.isDisplayQuestion1 = false;
    }
  }

  DisplayQuestion2(other) {
    if (other.isDisplayQuestion2[0]) {
      $(document).ready(() => {
        $('#layout_lastquestion2').delay(1000).fadeIn();
      });
      setTimeout(() => {
        document.getElementById('inputScene4v1').focus();
      }, 1100);
      isDisplayQuestion2[0] = false;
      other.isDisplayQuestion2[0] = false;
    }
  }

  ResetScene(other) {
    if (isResetScene[0]) {
      if (isWannaReset[0]) {
        other.time.addEvent({
          delay: 1000,
          callback: () => {
            other.scene.start('Scene4');
          },
          repeat: 0,
        });
      } else {
        other.isMoveBall = true;
      }
    }
  }

  MoveBall() {
    Scene2.MoveBall(this, 'Scene5', 680);
  }


  //------------------------------------------------------------------------------------
  CreateCheckInput() {
    document.getElementById('inputScene4').focus();
    document.getElementById('inputScene4').onkeyup = function () {
      Check_QuestionScene4(totalBlock, border, isDisplayQuestion2, isWannaReset);
    };
    document.getElementById('inputScene4v1').onkeyup = function () {
      Check_QuestionScene4v1(totalBlock, border, isDisplayQuestion2, isWannaReset);
    };
    document.getElementById('inputScene4v2').onkeyup = function () {
      Check_QuestionScene4v2(totalBlock, border, isResetScene, isWannaReset);
    };
  }

  CreateBall() {
    Scene2.CreateBall(this, 2);
  }

  CreateBorder() {
    for (let i = 0; i < this.totalBlock; i++) {
      border.push(this.add.image(BLOCK.X, BLOCK.Y + RANGEBLOCK * i, 'border'));
      border[i].setVisible(0);
    }
  }

  CreateTextAndBlock(other, htmlFrame) {
    other.block = (new Block()).createArrayBlock(other, BLOCK.X, BLOCK.Y);
    other.question_Sub = other.add.dom(750, 130).createFromCache(htmlFrame);
    other.block.setAlpha(0);
    other.fade = new FdInFdOut(other);
    other.fade.FdOut(other.block);
    $(document).ready(() => {
      $('#layout_question1').hide();
      $('#layout_question1').delay(1000).fadeIn();
    });
    other.time.addEvent({
      delay: 2000,
      callback: () => {
        other.isMovingBlock = true;
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

  Recreate(other) {
    other.ball_Last = null;
    other.block = null;
    other.fade = null;
    other.isMovingBlock = false;
    other.isDisplayNextText = false;
    other.currentBlock = 1;
    other.isDisplayQuestion1 = false;
    isDisplayQuestion2 = [false];
    other.isDisplayQuestion2 = [false];
    totalBlock = Math.floor(Math.random() * (4 - 2 + 1) + 2);
    other.totalBlock = totalBlock;
    border = [];
    isResetScene = [false];
    isWannaReset = [false];
    other.isMoveBall = false;
  }
}

var totalBlock = Math.floor(Math.random() * (4 - 2 + 1) + 2);
var border = [];
var isDisplayQuestion2 = [false];
var isResetScene = [false];
var isWannaReset = [false];
