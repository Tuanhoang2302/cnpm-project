/* eslint-disable no-param-reassign */
/* eslint-disable class-methods-use-this */
/* eslint-disable consistent-return */
/* eslint-disable camelcase */
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

export const BLOCK = {
  X: 250,
  Y: 140,
};

export const RANGEBLOCK = 150;
var isDisplayLastResult = false;
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
    this.CreateBall(this, 0);
    this.CreateQuestionAndInput(this);
    this.CreateBlock(this);
    this.CreateLanguage();
  }

  update() {
    this.CheckAnswerOfSubQuestion(this);
    this.MoveBlock(this);
    this.DisplayNextSubQuestion(this);
    this.DisplayLastQuestion(this);
    this.DisplayLastResult(this);
    this.ResetScene(this, 'Scene2');
    this.MoveBall(this, 'Scene3', 740);
  }

  //------------------------------------------------------------------------------------------------

  CheckAnswerOfSubQuestion(other) {
    if (other.isChekingAnswer === true && other.input_Index <= other.subquestionTotalNumber) {
      const inputCurrentValue1 = document.getElementById(`input${(other.input_Index * 2 - 1).toString()}`).value;
      const inputCurrentValue2 = document.getElementById(`input${(other.input_Index * 2).toString()}`).value;

      if ((inputCurrentValue1 !== '' && inputCurrentValue1 !== '1')
         || (inputCurrentValue2 !== '' && inputCurrentValue2 !== '0')) {
        other.isWannaReset = true;
      }
      if (inputCurrentValue2 !== '' && inputCurrentValue2 === '0') {
        const text10 = document.createElement('div');
        text10.appendChild(document.createTextNode('10'));
        const layoutQuestion = document.getElementById(`layout_question${other.input_Index}`);
        text10.style.cssText = 'display: inline-block; font-size:45px;';
        layoutQuestion.replaceChild(text10, document.getElementById(`answer${other.input_Index}`));
        other.isMoveBlock = true;
        other.isChekingAnswer = false;
        other.input_Index += 1;
      }
    }
  }

  MoveBlock(other) {
    if (other.isMoveBlock) {
      const startPosYBlock = BLOCK.Y + RANGEBLOCK * (other.input_Index - 2);
      const destinationPosYBlock = BLOCK.Y + RANGEBLOCK * (other.input_Index - 1);
      if (other.input_Index <= other.subquestionTotalNumber) {
        if (other.block.y === startPosYBlock) {
          (new Block()).createArrayBlock(other, BLOCK.X, startPosYBlock);
        }
        if (other.block.y < destinationPosYBlock) {
          other.block.y += 3;
        } else {
          other.isDisplaySubQuestion = true;
          other.isMoveBlock = false;
        }
      } else {
        other.isDisplaySubQuestion = true;
        other.isMoveBlock = false;
      }
    }
    return 10;
  }

  DisplayNextSubQuestion(other) {
    if (other.isDisplaySubQuestion) {
      if (other.input_Index === 2 && other.subquestionTotalNumber > 1) {
        $(document).ready(() => {
          $('#layout_question2').delay(200).fadeIn();
        });
        setTimeout(() => {
          document.getElementById('input3').focus();
        }, 300);
      } else if (other.input_Index === 3 && other.subquestionTotalNumber > 2) {
        $(document).ready(() => {
          $('#layout_question3').delay(200).fadeIn();
        });
        setTimeout(() => {
          document.getElementById('input5').focus();
        }, 300);
      }
      if (other.input_Index > other.subquestionTotalNumber) {
        other.isDisplayLastQuestion = true;
      }
      other.isChekingAnswer = true;
      other.isDisplaySubQuestion = false;
    }
  }

  DisplayLastQuestion(other) {
    if (other.isDisplayLastQuestion) {
      $(document).ready(() => {
        $('#layout_lastquestion').delay(200).fadeIn();
      });
      other.isDisplayLastQuestion = false;
    }
  }

  DisplayLastResult(other) {
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
        other.isResetScene = true;
      }
    }
  }

  ResetScene(other, scene) {
    if (other.isResetScene) {
      if (other.isWannaReset) {
        other.time.addEvent({
          delay: 1000,
          callback: () => {
            other.scene.start(scene);
          },
          repeat: 0,
        });
      } else {
        other.isMoveBall = true;
      }
    }
  }

  MoveBall(other, scene, destination) {
    if (other.isMoveBall) {
      if (other.ball_Last.x < destination) {
        other.ball_Last.x += 3;
      } else {
        other.time.addEvent({
          delay: 2000,
          callback: () => {
            other.question_Sub.destroy();
            other.scene.start(scene);
          },
          repeat: 0,
        });
      }
    }
  }

  //-----------------------------------------------------------------------------------------------

  CreateBlock(other) {
    other.block = (new Block()).createArrayBlock(other, BLOCK.X, BLOCK.Y);
  }

  CreateBall(other, index) {
    other.add.image(540, 30, 'ballHolder');
    other.ball_Last = (function (scene) {
      const ball = new Ball();
      for (let i = 0; i <= index; i++) {
        ball.create(scene, 770 - i * 30, 29);
      }
      for (let i = 0; i < 4 - index; i++) {
        var temp = ball.create(scene, 310 + 30 * i, 29);
      }
      return temp;
    }(other));
  }

  CreateQuestionAndInput(other) {
    other.question_TotalNumber = 3;
    other.input_Index = 1;
    other.question_Sub = other.add.dom(750, 150).createFromCache('question');
    for (let i = 1; i <= other.question_TotalNumber; i++) {
      const tmp = document.getElementById(`input${(i * 2).toString()}`);
      other.input_Value_arr.push(tmp.value);
    }
    document.getElementById('input1').focus();
  }

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
    // other.subquestionTotalNumber = Math.floor(Math.random() * (3 - 2 + 1) + 2);
    this.subquestionTotalNumber = 3;
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
