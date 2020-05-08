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
    this.isDisplayQuestion2 = false;
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
  }

  update() {
    this.Move_Block_and_Display_NextQuestion(this);
    this.DisplayQuestion1(this);
    this.isDisplayQuestion2 = isDisplayQuestion2;
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
    if (other.isDisplayQuestion2) {
      $(document).ready(() => {
        $('#layout_lastquestion2').delay(1000).fadeIn();
      });
      setTimeout(() => {
        document.getElementById('inputScene4v1').focus();
      }, 1100);
      isDisplayQuestion2 = false;
      other.isDisplayQuestion2 = false;
    }
  }

  ResetScene(other) {
    if (isResetScene) {
      if (isWannaReset) {
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
    isDisplayQuestion2 = false;
    other.isDisplayQuestion2 = false;
    totalBlock = Math.floor(Math.random() * (4 - 2 + 1) + 2);
    other.totalBlock = totalBlock;
    border = [];
    isResetScene = false;
    isWannaReset = false;
    other.isMoveBall = false;
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
    if (document.getElementById('inputScene4v2').value % 10 == 0) {
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
