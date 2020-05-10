
/* eslint-disable no-continue */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import FdInFdOut from '../helper/FdInFdOut';
import DragManager from '../helper/DragManager';
import Scene2 from './Scene2';

let Scne2;
const RANGEBOX = {
  X: 270,
  Y: 150,
};

const RANGEAPPLE = {
  X: 43,
  Y: 43,
};

const APPLE = {
  initPosX: 185,
  initPosY: 260,
};

const BOX = {
  initPosX: APPLE.initPosX + 270 - 185,
  initPosY: APPLE.initPosY + 200 - 177,
};

export default class Scene3 extends Phaser.Scene {
  constructor() {
    super('Scene3');
  }

  preload() {
    this.load.html('question6', 'src/InputForm/Scene3.html');
    this.load.image('apple', 'src/assets/TaoNho.png');
    this.load.image('box', 'src/assets/TaoHolder1.png');
    this.load.image('appleInBox', 'src/assets/TaoInBox.png');
    this.load.image('ball', 'src/assets/ball.png');
    this.load.image('ballHolder', 'src/assets/thanh.png');
    this.load.image('AHold', 'src/assets/AHold.png');
  }

  create() {
    Scne2 = new Scene2();
    this.ReCreate();
    this.CreateBox(this);
    this.CreatePosHolder(this);
    this.CreateApplePhysics();
    this.CreateGameFunction();
    this.CreateHTMlForm();
    this.CreateLanguage();
    this.add.line(0, 0, 0, 60, 2160, 60, '0xD3D3D3');
  }

  update() {
    this.CheckResult(this, 30);
    this.DragAndDrop(this);
    this.DisplayAppleInBox(this);
    this.DisplayQuestion(this);
    this.ResetScene(this, 'Scene3');
    this.MoveBall(this, 'Scene3', 395);
  }


  // ---------------------------------------------------------
  CheckResult(other, result) {
    if (other.isCheckResult) {
      const inputCurrentValue1 = document.getElementById('input1').value;
      const inputCurrentValue2 = document.getElementById('input2').value;

      if ((inputCurrentValue1 !== '' && inputCurrentValue1 != (result / 10))
           || (inputCurrentValue2 !== '' && inputCurrentValue2 !== '0')) {
        other.isWannaReset = true;
        if (this.notAgain) {
          if (window.location.hash !== '#vietnam') {
            document.getElementById('ques_gray').innerHTML = 'Fill in the boxes';
            document.getElementById('gray_comment').style.marginLeft = '450px';
          } else {
            document.getElementById('ques_gray').innerHTML = 'Hãy lấp đầy hộp táo';
            document.getElementById('gray_comment').style.marginLeft = '400px';
          }
          document.getElementById('answer0').style.display = 'none';
          this.wrongResult = document.getElementById('wrong_result');
          if (inputCurrentValue1 != result / 10) {
            this.wrongResult.innerHTML = (inputCurrentValue1 % 10).toString();
          } else if ((inputCurrentValue1 == result / 10) && inputCurrentValue2 !== '0') {
            this.wrongResult.innerHTML = (inputCurrentValue1 + inputCurrentValue2 % 10).toString();
          }

          this.wrongResult.style.color = 'red';
          if (this.k < 100) {
            this.k += 3;
            this.wrongResult.style.left = `${this.k}px`;
          } else {
            document.getElementById('input1').value = '';
            document.getElementById('input2').value = '';
            other.isCheckResult = false;
          }
        } else {
          for (let k = 0; k < 6; k++) {
            if (this.CountAppleEachBox[k] != 11) {
              for (let j = (k) * 10; j < (k + 1) * 10; j++) {
                this.Holder[j].setAlpha(0);
              }
              this.fade.FdIn(this.box[k]);
            }
          }
        }
      }
      if (inputCurrentValue2 !== '' && inputCurrentValue2 === '0') {
        const text10 = document.createElement('div');
        text10.appendChild(document.createTextNode(result.toString()));
        const layoutQuestion = document.getElementById('layout_question0');
        text10.style.cssText = 'display: inline-block; font-size:50px;';
        layoutQuestion.replaceChild(text10, document.getElementById('answer0'));
        other.isResetScene = true;
        other.isCheckResult = false;
      }
    }
  }

  DragAndDrop(other) {
    Scne2.DragAndDrop(this);
  }

  CheckCompletedBox() {
    for (let i = 0; i < 6; i++) {
      if (this.CountAppleEachBox[i] == 10) {
        this.isDisplayBox = true;
        this.boxCompleted++;
        return i;
      }
    }
    return -1;
  }

  DisplayAppleInBox(other) {
    Scne2.DisplayAppleInBox(this);
  }

  DisplayQuestion(other) {
    if (other.isDisplayQuestion) {
      // document.getElementById('').
      this.notAgain = false;
      document.getElementById('answer0').style.display = 'inline-block';
      document.getElementById('input1').focus();
      this.wrongResult.style.left = '50px';
      this.isCheckResult = true;
      other.isDisplayQuestion = false;
    }
  }

  ResetScene(other, scene) {
    Scne2.ResetScene(this, 'Scene3');
  }

  MoveBall(other, scene, destination) {
    if (other.isBallMove) {
      if (other.m < destination) {
        other.m += 3;
        other.ball.style.left = `${other.m}px`;
      } else {
        window.location.href = '../../testGit/complete/page/indexEnd.html';
      }
    }
  }


  // ----------------------------------------------------------
  CreateHTMlForm() {
    this.question = this.add.dom(500, 165).createFromCache('question6');
    document.getElementById('layout_question0').style.marginLeft = '220px';
    document.getElementById('input1').focus();
    document.getElementById('input1').onkeyup = function () {
      Check_SubAnswer1(30);
    };
    document.getElementById('input2').onkeyup = function () {
      Check_SubAnswer2();
    };
  }

  CreateApplePhysics() {
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 5; i++) {
        if (j == 0 && i == 2) {
          continue;
        } else {
          this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * i, APPLE.initPosY + RANGEAPPLE.Y * j, 'apple'));
          this.CountAppleEachBox[0]++;
        }
      }
    }
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 5; i++) {
        if ((j == 0 && i == 2) || (j == 0 && i == 4)) {
          continue;
        } else {
          this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * i + RANGEBOX.X, APPLE.initPosY + RANGEAPPLE.Y * j, 'apple'));
          this.CountAppleEachBox[1]++;
        }
      }
    }
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 5; i++) {
        if ((j == 1 && i == 1) || (j == 1 && i == 3)) {
          continue;
        } else {
          this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * i + RANGEBOX.X * 2, APPLE.initPosY + RANGEAPPLE.Y * j, 'apple'));
          this.CountAppleEachBox[2]++;
        }
      }
    }
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * 1, APPLE.initPosY + RANGEBOX.Y, 'apple'));
    this.CountAppleEachBox[3]++;
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * 3, APPLE.initPosY + RANGEBOX.Y, 'apple'));
    this.CountAppleEachBox[3]++;
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * 3, APPLE.initPosY + RANGEAPPLE.Y * 1 + RANGEBOX.Y, 'apple'));
    this.CountAppleEachBox[3]++;
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * 2 + RANGEBOX.X * 1, APPLE.initPosY + RANGEAPPLE.Y * 1 + RANGEBOX.Y, 'apple'));
    this.CountAppleEachBox[4]++;
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * 4 + RANGEBOX.X * 1, APPLE.initPosY + RANGEAPPLE.Y * 1 + RANGEBOX.Y, 'apple'));
    this.CountAppleEachBox[4]++;

    for (let i = 0; i < this.appleArr.length; i++) {
      this.appleArr[i].body.debugShowBody = false;
    }
  }

  CreatePosHolder(other) {
    Scne2.CreatePosHolder(this);
  }

  CreateBox(other) {
    Scne2.CreateBox(this);
  }

  CreateGameFunction() {
    for (let i = 0; i < this.appleArr.length; i++) {
      this.initApplePosX.push(this.appleArr[i].x);
      this.initApplePosY.push(this.appleArr[i].y);
      this.distance.push(0);
    }
    const dragManager = new DragManager(this, this.appleArr, this.Holder, this.initApplePosX, this.initApplePosY, 1, this.CountAppleEachBox, this.spaceValid1);
    dragManager.dragApple();
    this.fade = new FdInFdOut(this);

    for (let i = 0; i < this.Holder.length; i++) {
      if ((i >= 0 && i < 30) || i == 31 || i == 33 || i == 38 || i == 47 || i == 49) {
        this.spaceValid1[i] = false;
      } else {
        this.spaceValid1[i] = true;
      }
    }
    this.spaceValid1[2] = true;
    this.spaceValid1[12] = true;
    this.spaceValid1[14] = true;
    this.spaceValid1[26] = true;
    this.spaceValid1[28] = true;
  }

  CreateLanguage() {
    if (window.location.hash === '#vietnam') {
      const question0 = document.getElementById('ques0');
      const grayComment = document.getElementById('ques_gray');
      question0.innerHTML = 'Số quả táo ở bên dưới là? ';
      grayComment.innerHTML = 'Hãy lấp đầy hộp táo có thể.';
    }
  }

  ReCreate() {
    this.appleInBox = [];
    this.box = [];
    this.appleArr = [];
    this.Holder = [];
    this.initApplePosX = [];
    this.initApplePosY = [];
    this.distance = [];
    this.isDisplayBox = false;
    this.boxCompleted = 0;
    this.boxIndex = null;
    this.isDisplayAppleInBox = true;
    this.isDisplayQuestion = false;
    this.isDisplayResult = false;
    this.isWannaReset = false;
    this.isTimeDelayBallMove = false;
    this.ball = document.getElementById(`ball${1}`);
    this.isBallMove = null;
    this.fade = null;
    this.CountAppleEachBox = [0, 0, 0, 0, 0, 0];
    this.spaceValid1 = [];
    this.question = null;
    this.isCheckResult = true;
    this.isResetScene = false;
    this.m = 0;
    this.totalBox = 3;
    this.k = 0;
    this.wrongResult = null;
    this.notAgain = true;
  }
}
