/* eslint-disable eqeqeq */
/* eslint-disable func-names */
/* eslint-disable vars-on-top */
/* eslint-disable block-scoped-var */
/* eslint-disable no-var */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import 'phaser';
import Ball from '../gameObject/Ball';
import Block from '../gameObject/Block';
import Game1Scene2 from './Game1Scene2';

// export var isWannaReset3 = [false];

const BLOCK = {
  X: 250,
  Y: 140,
};

var Scene2;
export default class Game1Scene3 extends Phaser.Scene {
  // hello = 2;
  constructor() {
    super('Scene3');
  }

  preload() {
    this.load.html('question2', 'src/InputForm/scene3.html');
    this.load.html('return', 'src/assets/text/return.html');
    this.load.image('button', 'src/assets/next.png');
    this.load.image('dayChau', 'src/assets/arrBlock.png');
    this.load.image('ballHolder', 'src/assets/thanh.png');
    this.load.image('ball', 'src/assets/ball.png');
  }

  create() {
    Scene2 = new Game1Scene2();
    this.ReCreate();
    this.CreateBall();
    this.CreateQuestionAndInput();
    this.block = new Block().createArrayBlock(this, BLOCK.X, BLOCK.Y);
    this.CreateLanguage();
  }

  update() {
    // isWannaReset3[0] = this.isWannaReset
    this.CheckAnswerOfSubQuestion();
    this.Move_Block_and_Display_NextSubQuestion();
    this.DisplayLastQuestion();
    this.DisplayLastResult();
    this.ResetScene();
    this.MoveBall();
  }

  //-------------------------------------------------------------------------------------------

  // eslint-disable-next-line class-methods-use-this
  CheckAnswerOfSubQuestion() {
    Scene2.CheckAnswerOfSubQuestion(this);
  }

  // eslint-disable-next-line camelcase
  Move_Block_and_Display_NextSubQuestion() {
    Scene2.MoveBlock(this);
    Scene2.DisplayNextSubQuestion(this);
  }

  DisplayLastQuestion() {
    if (this.isDisplayLastQuestion) {
      $(document).ready(() => {
        $('#layout_lastquestion').delay(200).fadeIn();
      });
      setTimeout(() => {
        document.getElementById('input7').focus();
      }, 300);
      isDisplayLastResult = true;
      this.isDisplayLastQuestion = false;
    }
  }

  DisplayLastResult() {
    if (isDisplayLastResult) {
      this.CheckAnswerOfLastQuestion();
    }
  }

  CheckAnswerOfLastQuestion() {
    const inputCurrentValue1 = document.getElementById(
      `input${(4 * 2 - 1).toString()}`,
    ).value;
    const inputCurrentValue2 = document.getElementById(
      `input${(4 * 2).toString()}`,
    ).value;

    if (
      (inputCurrentValue1 !== ''
        && inputCurrentValue1 != subquestionTotalNumber)
      || (inputCurrentValue2 !== '' && inputCurrentValue2 !== '0')
    ) {
      this.isWannaReset = true;
    }
    if (inputCurrentValue2 !== '' && inputCurrentValue2 === '0') {
      const textResult = document.createElement('div');
      textResult.appendChild(
        document.createTextNode((subquestionTotalNumber * 10).toString()),
      );
      const layoutQuestion = document.getElementById('layout_lastquestion');
      textResult.style.cssText = 'display: inline-block; font-size:60px; margin-left: 20px';
      layoutQuestion.replaceChild(
        textResult,
        document.getElementById(`answer${4}`),
      );
      isDisplayLastResult = false;
      this.isResetScene = true;
    }
    // this.is_input_Cheking = false;
  }

  ResetScene() {
    Scene2.ResetScene(this, 'Scene3');
  }

  MoveBall() {
    Scene2.MoveBall(this, 'Scene4', 710);
  }

  //---------------------------------------------------------------------------------------------

  CreateBall() {
    this.add.image(540, 30, 'ballHolder');
    this.ball_Last = (function (scene) {
      const ball = new Ball();
      ball.create(scene, 770, 29);
      ball.create(scene, 740, 29);
      for (let i = 0; i < 3; i++) {
        var temp = ball.create(scene, 310 + 30 * i, 29);
      }
      return temp;
    }(this));
  }

  CreateQuestionAndInput() {
    this.question_TotalNumber = 3;
    this.input_Index = 1;
    this.question_Sub = this.add.dom(750, 150).createFromCache('question2');
    for (let i = 1; i <= this.question_TotalNumber; i++) {
      const tmp = document.getElementById(`input${(i * 2).toString()}`);
      this.input_Value_arr.push(tmp.value);
    }
    document.getElementById('input1').focus();
  }

  // eslint-disable-next-line class-methods-use-this
  CreateLanguage() {
    if (window.location.hash === '#vietnam') {
      const question = document.getElementsByClassName('question');
      // eslint-disable-next-line camelcase
      const word_end_question = document.getElementsByClassName(
        'word_end_question',
      );
      const thought = document.getElementsByClassName('result');
      for (let i = 0; i < question.length; i++) {
        question[i].innerHTML = 'Hình bên có ';
        word_end_question[i].innerHTML = 'khối';
        thought[i].innerHTML = 'Hình bên có 10 khối.';
      }
      document.getElementById('lastques').innerHTML = 'Tổng số khối bên trên:';
    }
  }

  ReCreate() {
    this.fade = null;
    this.ball_Last = null;
    this.subquestionTotalNumber = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    subquestionTotalNumber = this.subquestionTotalNumber;
    this.input_Index = 1;
    this.questionIndex = 1;
    this.question_Sub = null;
    this.input_Value_arr = [];
    this.block = null;
    this.isMoveBlock = false;
    this.isDisplaySubQuestion = false;
    this.isChekingAnswer = true;
    this.isWannaReset = false;
    this.isResetScene = false;
    this.isDisplayLastQuestion = false;
    this.isMoveBall = false;
    isDisplayLastResult = false;
    // isWannaReset3[0] = false;
  }
}
let subquestionTotalNumber;
var isDisplayLastResult = false;

// eslint-disable-next-line max-len
// eslint-disable-next-line camelcase
window.Check_LastAnswer1 = function Check_LastAnswer1(
  questionIndex,
  aI,
  desiredResult,
  sceneName,
) {
  if (sceneName === 'Scene3') {
    // eslint-disable-next-line no-param-reassign
    desiredResult = subquestionTotalNumber * 10;
  }
  if (document.getElementById(`input${questionIndex}`).value !== '') {
    var x = document.getElementById(`input${questionIndex}`).value % 10;
    document.getElementById(`input${questionIndex}`).value = x;
    if (x == desiredResult / 10) {
      document.getElementById(`input${questionIndex}`).style.color = 'black';
      document.getElementById(`input${(questionIndex + 1).toString()}`).focus();
    } else {
      document.getElementById(`input${questionIndex}`).style.color = 'red';
    }
  }
};

// eslint-disable-next-line max-len
// eslint-disable-next-line camelcase
window.Check_LastAnswer2 = function Check_LastAnswer2(questionIndex) {
  if (document.getElementById(`input${questionIndex}`).value != '') {
    var y = document.getElementById(`input${questionIndex}`).value % 10;
    document.getElementById(`input${questionIndex}`).value = y;
    if (y != 0) {
      document.getElementById(`input${questionIndex}`).style.color = 'red';
    }
  }
};
