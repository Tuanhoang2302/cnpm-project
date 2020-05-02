/* eslint-disable block-scoped-var */
/* eslint-disable vars-on-top */
/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-var */
/* eslint-disable no-plusplus */
/* eslint-disable no-use-before-define */
/* eslint-disable no-undef */
import 'phaser';
import Ball from '../gameObject/Ball';
import Block from '../gameObject/Block';

export const isWannaReset2 = [false];

const BLOCK = {
  X: 250,
  Y: 140,
};

const RANGEBLOCK = 150;
export var isDisplayLastResult = false;
var pos = [0, 0, 0, 0];
export default class Game1Scene2 extends Phaser.Scene {
  constructor() {
    super('Scene2');
  }

  preload() {
    this.load.html('question', 'src/InputForm/scene2.html');
    this.load.html('return', 'src/assets/text/return.html');
    this.load.image('button', 'src/assets/next.png');
    this.load.image('dayChau', 'src/assets/arrBlock.png');
    this.load.image('ballHolder', 'src/assets/thanh.png');
    this.load.image('ball', 'src/assets/ball.png');
  }

  create() {
    this.ReCreate();
    this.CreateBall();
    this.CreateQuestionAndInput();
    this.block = (new Block()).createArrayBlock(this, BLOCK.X, BLOCK.Y);
    this.CreateLanguage();
  }

  update() {
    isWannaReset2[0] = this.isWannaReset;
    this.CheckAnswerOfSubQuestion();
    this.MoveBlockandDisplayNextSubQuestion();
    this.DisplayLastQuestion();
    this.DisplayLastResult();
    this.ResetScene();
    this.MoveBall();
  }

  //------------------------------------------------------------------------------------------------

  CheckAnswerOfSubQuestion() {
    if (this.isChekingAnswer === true && this.input_Index <= this.subquestionTotalNumber) {
      const inputCurrentValue1 = document.getElementById(`input${(this.input_Index * 2 - 1).toString()}`).value;
      const inputCurrentValue2 = document.getElementById(`input${(this.input_Index * 2).toString()}`).value;

      if ((inputCurrentValue1 !== '' && inputCurrentValue1 !== '1')
         || (inputCurrentValue2 !== '' && inputCurrentValue2 !== '0')) {
        this.isWannaReset = true;
      }
      if (inputCurrentValue2 !== '' && inputCurrentValue2 === '0') {
        const text10 = document.createElement('div');
        text10.appendChild(document.createTextNode('10'));
        const layoutQuestion = document.getElementById(`layout_question${this.input_Index}`);
        text10.style.cssText = 'display: inline-block; font-size:45px;';
        layoutQuestion.replaceChild(text10, document.getElementById(`answer${this.input_Index}`));
        this.isMoveBlock = true;
        this.isChekingAnswer = false;
        this.input_Index += 1;
      }
    }
  }

  MoveBlockandDisplayNextSubQuestion() {
    if (this.isMoveBlock) {
      if (this.input_Index <= this.subquestionTotalNumber) {
        const startPosYBlock = BLOCK.Y + RANGEBLOCK * (this.input_Index - 2);
        const destinationPosYBlock = BLOCK.Y + RANGEBLOCK * (this.input_Index - 1);
        if (this.block.y === startPosYBlock) {
          (new Block()).createArrayBlock(this, BLOCK.X, startPosYBlock);
        }
        if (this.block.y < destinationPosYBlock) {
          this.block.y += 3;
        } else {
          this.isDisplaySubQuestion = true;
          this.isMoveBlock = false;
        }
      } else {
        this.isDisplaySubQuestion = true;
        this.isMoveBlock = false;
      }
    }

    if (this.isDisplaySubQuestion) {
      if (this.input_Index === 2 && this.subquestionTotalNumber > 1) {
        $(document).ready(() => {
          $('#layout_question2').delay(200).fadeIn();
        });
        setTimeout(() => {
          document.getElementById('input3').focus();
        }, 300);
      } else if (this.input_Index === 3 && this.subquestionTotalNumber > 2) {
        $(document).ready(() => {
          $('#layout_question3').delay(200).fadeIn();
        });
        setTimeout(() => {
          document.getElementById('input5').focus();
        }, 300);
      }
      if (this.input_Index > this.subquestionTotalNumber) {
        this.isDisplayLastQuestion = true;
      }
      this.isFocus = true;
      this.isChekingAnswer = true;
      this.isDisplaySubQuestion = false;
    }
  }

  DisplayLastQuestion() {
    if (this.isDisplayLastQuestion) {
      $(document).ready(() => {
        $('#layout_lastquestion').delay(200).fadeIn();
      });
      this.isDisplayLastQuestion = false;
    }
  }

  DisplayLastResult() {
    if (isDisplayLastResult) {
      const desEnd = (RANGEBLOCK - 20) * (subquestionTotalNumber - 1 + 1)
                      + 20 * (subquestionTotalNumber - 1);
      for (let i = 1; i <= subquestionTotalNumber; i += 1) {
        const body = document.getElementById(`panelresult${i}`);
        const destination = (RANGEBLOCK - 20) * (subquestionTotalNumber - i + 1)
                             + 20 * (subquestionTotalNumber - i);
        if (pos[i] !== destination) {
          pos[i] += 2;
          body.style.top = `${pos[i]}px`;
        }
      }
      if (pos[1] === desEnd) {
        for (let i = 1; i <= subquestionTotalNumber; i++) {
          if (i !== subquestionTotalNumber) {
            document.getElementById(`panelresult${i}`).style.border = '0px';
          }
          document.getElementById(`panelresult${i}`).style.display = 'none';
        }
        document.getElementById('layout_lastquestion').style.display = 'none';
        document.getElementById(`panelresult${subquestionTotalNumber}`).innerText = (subquestionTotalNumber * 10).toString();
        $(document).ready(() => {
          for (let i = 1; i <= subquestionTotalNumber; i++) {
            $(`#panelresult${i}`).delay(200).fadeIn();
          }
          $('#layout_lastquestion').delay(200).fadeIn();
        });
        isDisplayLastResult = false;
        this.isResetScene = true;
      }
    }
  }

  ResetScene() {
    if (this.isResetScene) {
      if (this.isWannaReset) {
        this.time.addEvent({
          delay: 1000,
          callback: () => {
            this.scene.start('Scene2');
          },
          repeat: 0,
        });
      } else {
        this.isMoveBall = true;
      }
    }
  }

  MoveBall() {
    if (this.isMoveBall) {
      if (this.ball_Last.x < 740) {
        this.ball_Last.x += 3;
      } else {
        this.time.addEvent({
          delay: 2000,
          callback: () => {
            // window.location.href = 'https://example.com/'
            this.scene.start('Scene3');
          },
          repeat: 0,
        });
      }
    }
  }

  //-----------------------------------------------------------------------------------------------

  CreateBall() {
    this.add.image(540, 30, 'ballHolder');
    this.ball_Last = (function (scene) {
      const ball = new Ball();
      ball.create(scene, 770, 29);
      for (let i = 0; i < 4; i++) {
        var temp = ball.create(scene, 310 + 30 * i, 29);
      }
      return temp;
    }(this));
  }

  CreateQuestionAndInput() {
    this.question_TotalNumber = 3;
    this.input_Index = 1;
    this.question_Sub = this.add.dom(750, 150).createFromCache('question');
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
      console.log(question.length);

      const wordendquestion = document.getElementsByClassName('word_end_question');
      const thought = document.getElementsByClassName('result');
      for (let i = 0; i < question.length; i++) {
        question[i].innerHTML = 'Hình bên có ';
        wordendquestion[i].innerHTML = ' khối';
        thought[i].innerHTML = 'Hình bên có 10 khối.';
      }
      document.getElementById('lastques').innerHTML = 'Tổng số khối bên trên?';
    }
  }


  ReCreate() {
    this.fade = null;
    this.ball_Last = null;
    this.subquestionTotalNumber = Math.floor(Math.random() * (3 - 3 + 1) + 3);
    this.input_Index = 1;
    this.question_Index = 1;
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
    subquestionTotalNumber = this.subquestionTotalNumber;
    pos = [0, 0, 0, 0];
    isWannaReset2[0] = false;
  }
}
let subquestionTotalNumber;

// eslint-disable-next-line camelcase
window.Click_Button = function Click_Button() {
  document.getElementById('button').style.display = 'none';

  for (let i = 1; i <= subquestionTotalNumber; i++) {
    const resultPanel = document.createElement('div');

    resultPanel.id = `panelresult${(i).toString()}`;
    const body = document.getElementById('body');
    const text = document.createTextNode('10');
    resultPanel.appendChild(text);
    resultPanel.style.cssText = 'display:none; position: relative;border-radius: 25px; background: #FFFFFF; padding: 20px;width: 40px;height: 40px; font-size:35px; align-text:center; border: 1px solid; box-shadow: 5px 10px #d3d3d3';
    const beReplaced = document.getElementById(`layout_question${i}`);
    body.replaceChild(resultPanel, beReplaced);
  }

  document.getElementById('layout_lastquestion').style.display = 'none';
  // document.getElementById('layout_lastquestion').style.position = "absolute";
  $(document).ready(() => {
    for (let i = 1; i <= subquestionTotalNumber; i++) {
      $(`#panelresult${i}`).delay(200).fadeIn();
    }
    $('#layout_lastquestion').delay(200).fadeIn();
  });
  isDisplayLastResult = true;
};
