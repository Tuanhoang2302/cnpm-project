/* eslint-disable block-scoped-var */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable eqeqeq */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import 'phaser';
import Game1Scene4 from './Game1Scene4';
import Game1Scene2 from './Game1Scene2';

const BLOCK = {
  X: 250,
  Y: 120,
};
var Scene4;
var Scene2;
const RANGEBLOCK = 90;
// export var isWannaReset4 = [false];
export default class Game1Scene5 extends Phaser.Scene {
  constructor() {
    super('Scene5');
    this.isDisplayQuestion2 = false;
  }

  preload() {
    this.load.html('question4', 'src/InputForm/scene5.html');
    this.load.image('border', 'src/assets/border.png');
    this.load.html('return', 'src/assets/text/return.html');
    this.load.image('button', 'src/assets/next.png');
    this.load.image('dayChau', 'src/assets/arrBlock.png');
    this.load.image('ballHolder', 'src/assets/thanh.png');
    this.load.image('ball', 'src/assets/ball.png');
  }

  create() {
    Scene4 = new Game1Scene4();
    Scene2 = new Game1Scene2();
    this.Recreate();
    this.CreateBall();
    this.CreateBorder();
    this.CreateTextAndBlock();
    this.CreateLanguage();
  }

  update() {
    this.Move_Block_and_Display_NextQuestion();
    this.DisplayQuestion1();
    this.isDisplayQuestion2 = isDisplayQuestion2;
    this.DisplayQuestion2();
    this.ResetScene();
    this.MoveBall();
  }

  //------------------------------------------------------------------------------------

  // eslint-disable-next-line camelcase
  Move_Block_and_Display_NextQuestion() {
    Scene4.Move_Block_and_Display_NextQuestion(this);
  }

  DisplayQuestion1() {
    Scene4.DisplayQuestion1(this);
  }

  DisplayQuestion2() {
    if (isDisplayQuestion2 == true) {
      Scene4.DisplayQuestion2(this);
      isDisplayQuestion2 = false;
    }
  }

  ResetScene() {
    if (isResetScene) {
      if (isWannaReset) {
        this.time.addEvent({
          delay: 1000,
          callback: () => {
            this.scene.start('Scene5');
          },
          repeat: 0,
        });
      } else {
        this.isMoveBall = true;
      }
    }
  }

  MoveBall() {
    Scene2.MoveBall(this, 'Scene5', 650);
  }


  //------------------------------------------------------------------------------------

  CreateBall() {
    Scene2.CreateBall(this, 3);
  }

  CreateBorder() {
    for (let i = 0; i < this.totalBlock; i++) {
      border.push(this.add.image(BLOCK.X, BLOCK.Y + RANGEBLOCK * i, 'border'));
      border[i].setVisible(0);
    }
  }

  CreateTextAndBlock() {
    Scene4.CreateTextAndBlock(this, 'question4');
  }

  CreateLanguage() {
    Scene4.CreateLanguage();
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
    this.totalBlock = totalBlock;
    border = [];
    isResetScene = false;
    isWannaReset = false;
    this.isMoveBall = false;
  }
}

var totalBlock = Math.floor(Math.random() * (4 - 2 + 1) + 2);
var border = [];
var isDisplayQuestion2 = false;
var isResetScene = false;
var isWannaReset = false;
// eslint-disable-next-line camelcase
window.Check_QuestionScene5 = function Check_QuestionScene5() {
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
window.Check_QuestionScene5v1 = function Check_QuestionScene5v1() {
  console.log('fdsfds');
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
window.Check_QuestionScene5v2 = function Check_QuestionScene5v2() {
  console.log('fds');

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
