
/* eslint-disable no-continue */
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import FdInFdOut from '../helper/FdInFdOut';
import DragManager from '../helper/DragManager';

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

export default class Scene2 extends Phaser.Scene {
  constructor() {
    super('Scene2');
  }

  preload() {
    this.load.html('question3', 'src/InputForm/Scene2.html');
    this.load.image('apple', 'src/assets/TaoNho.png');
    this.load.image('box', 'src/assets/TaoHolder1.png');
    this.load.image('appleInBox', 'src/assets/TaoInBox.png');
    this.load.image('ball', 'src/assets/ball.png');
    this.load.image('ballHolder', 'src/assets/thanh.png');
    this.load.image('AHold', 'src/assets/AHold.png');
  }

  create() {
    this.ReCreate();
    this.CreateBox(this);
    this.CreatePosHolder(this);
    this.CreateApplePhysics();
    this.CreateGameFunction();
    this.CreateHTMlForm();
    this.CreateLanguage();
  }

  update() {
    this.DragAndDrop(this);
    this.DisplayAppleInBox(this);
    this.DisplayQuestion(this);
    this.CheckResult(this, 20);
    this.ResetScene(this, 'Scene2');
    this.MoveBall(this, 'Scene2v2', 395);
  }


  // ---------------------------------------------------------
  DragAndDrop(other) {
    for (let i = 0; i < other.appleArr.length; i++) {
      other.distance[i] = Phaser.Math.Distance.Between(other.appleArr[i].x, other.appleArr[i].y, other.initApplePosX[i], other.initApplePosY[i]);
      if (other.distance[i] < 4) {
        other.appleArr[i].body.reset(other.initApplePosX[i], other.initApplePosY[i]);
      }
    }
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
    if (other.isDisplayAppleInBox) {
      if (other.boxCompleted < other.totalBox) {
        other.boxIndex = other.CheckCompletedBox();
      } else {
        other.isDisplayQuestion = true;
        other.isDisplayAppleInBox = false;
      }
      if (other.isDisplayBox) {
        const x = other.boxIndex % 3;
        const y = other.boxIndex / 3;
        other.CountAppleEachBox[other.boxIndex] = 11;

        for (let i = 0; i < other.appleArr.length; i++) {
          if (other.appleArr[i].x > APPLE.initPosX - 20 + RANGEBOX.X * x && other.appleArr[i].x < APPLE.initPosX + RANGEBOX.X * x + RANGEAPPLE.X * 5
                    && other.appleArr[i].y > APPLE.initPosY - 110 + RANGEBOX.Y * y && other.appleArr[i].y < APPLE.initPosY + RANGEBOX.Y * y + RANGEAPPLE.Y * 2) {
            other.appleArr[i].setAlpha(0);

            for (let j = (other.boxIndex) * 10; j < (other.boxIndex + 1) * 10; j++) {
              other.Holder[j].setAlpha(0);
            }
            other.fade.FdIn(other.box[other.boxIndex]);
            other.fade.FdOut(other.appleInBox[other.boxIndex]);
          }
        }
      }
    }
  }

  DisplayQuestion(other) {
    if (other.isDisplayQuestion) {
      document.getElementById('layout_question0').style.display = 'none';
      document.getElementById('gray_comment').style.display = 'none';
      document.getElementById('layout_question1').style.display = 'inline-block';
      document.getElementById('input1').focus();
      other.isCheckResult = true;
      other.isDisplayQuestion = false;
    }
  }

  CheckResult(other, result) {
    if (other.isCheckResult) {
      const inputCurrentValue1 = document.getElementById('input1').value;
      const inputCurrentValue2 = document.getElementById('input2').value;

      if ((inputCurrentValue1 !== '' && inputCurrentValue1 != (result / 10))
           || (inputCurrentValue2 !== '' && inputCurrentValue2 !== '0')) {
        other.isWannaReset = true;
        for (let k = 0; k < 6; k++) {
          if (other.CountAppleEachBox[k] != 11) {
            for (let j = (k) * 10; j < (k + 1) * 10; j++) {
              other.Holder[j].setAlpha(0);
            }
            other.fade.FdIn(other.box[k]);
          }
        }
      }
      if (inputCurrentValue2 !== '' && inputCurrentValue2 === '0') {
        const text10 = document.createElement('div');
        text10.appendChild(document.createTextNode(result.toString()));
        const layoutQuestion = document.getElementById('layout_question1');
        text10.style.cssText = 'display: inline-block; font-size:50px;';
        layoutQuestion.replaceChild(text10, document.getElementById('answer1'));
        other.isResetScene = true;
        other.isCheckResult = false;
      }
    }
  }

  ResetScene(other, scene) {
    if (other.isResetScene) {
      if (other.isWannaReset) {
        other.time.delayedCall(1000, () => {
          other.scene.start(scene);
        }, [], other);
      } else {
        other.isBallMove = true;
      }
    }
  }

  MoveBall(other, scene, destination) {
    if (other.isBallMove) {
      if (other.m < destination) {
        other.m += 3;
        other.ball.style.left = `${other.m}px`;
      } else {
        other.time.addEvent({
          delay: 2000,
          callback: () => {
            other.question.destroy();
            other.scene.start(scene);
          },
          repeat: 0,
        });
      }
    }
  }


  // ----------------------------------------------------------
  CreateHTMlForm() {
    this.question = this.add.dom(500, 165).createFromCache('question3');
    document.getElementById('layout_question0').style.marginLeft = '220px';
    document.getElementById('layout_question1').style.marginLeft = '200px';
    document.getElementById('layout_question1').style.marginTop = '30px';
    document.getElementById('input1').onkeyup = function () {
      Check_SubAnswer1(20);
    };
    document.getElementById('input2').onkeyup = function () {
      Check_SubAnswer2();
    };
  }

  CreateApplePhysics() {
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * 2, APPLE.initPosY, 'apple'));
    this.CountAppleEachBox[0]++;

    for (let i = 0; i < 5; i++) {
      this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * i + RANGEBOX.X, APPLE.initPosY, 'apple'));
      this.CountAppleEachBox[1]++;
    }
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * 3 + RANGEBOX.X, APPLE.initPosY + RANGEAPPLE.Y, 'apple'));
    this.CountAppleEachBox[1]++;
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * 3 + RANGEBOX.X * 2, APPLE.initPosY, 'apple'));
    this.CountAppleEachBox[2]++;
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X, APPLE.initPosY + RANGEAPPLE.Y + RANGEBOX.Y, 'apple'));
    this.CountAppleEachBox[3]++;
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * 3, APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y, 'apple'));
    this.CountAppleEachBox[3]++;

    for (let i = 0; i < 2; i++) {
      for (let j = 0; j < 5; j++) {
        if (i == 0 && j == 2) {
          continue;
        } else {
          this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * j + RANGEBOX.X, APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y * i, 'apple'));
          this.CountAppleEachBox[4]++;
        }
      }
    }
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEBOX.X * 2 + RANGEAPPLE.X * 2, APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y, 'apple'));
    this.CountAppleEachBox[5]++;

    for (let i = 0; i < this.appleArr.length; i++) {
      this.appleArr[i].body.debugShowBody = false;
    }
  }

  CreatePosHolder(other) {
    for (let m = 0; m < 2; m++) {
      for (let n = 0; n < 3; n++) {
        for (let j = 0; j < 2; j++) {
          for (let i = 0; i < 5; i++) {
            const temp = other.add.image(APPLE.initPosX + RANGEAPPLE.X * i + RANGEBOX.X * n, APPLE.initPosY + RANGEAPPLE.Y * j + RANGEBOX.Y * m, 'AHold');
            other.Holder.push(temp);
          }
        }
      }
    }
  }

  CreateBox(other) {
    other.add.line(0, 0, 0, 60, 2160, 60, '0xD3D3D3');
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 3; i++) {
        other.appleInBox.push(other.add.image(BOX.initPosX + RANGEBOX.X * i, BOX.initPosY + RANGEBOX.Y * j, 'appleInBox'));
        other.appleInBox[j * 3 + i].setAlpha(0);
      }
    }

    // this.box = this.add.image(BOX.initPosX, BOX.initPosY, 'box');
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 3; i++) {
        other.box.push(other.add.image(BOX.initPosX + RANGEBOX.X * i, BOX.initPosY + RANGEBOX.Y * j, 'box'));
        other.box[i].setAlpha(1);
      }
    }
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
      if (i == 2 || (i >= 10 && i <= 14) || i == 18 || i == 23 || i == 36 || i == 38 || (i >= 40 && i <= 49) || i == 57) {
        this.spaceValid1[i] = false;
      } else {
        this.spaceValid1[i] = true;
      }
    }
    this.spaceValid1[42] = true;
  }

  CreateLanguage() {
    if (window.location.hash === '#vietnam') {
      const question0 = document.getElementById('ques0');
      const grayComment = document.getElementById('ques_gray');
      const question1 = document.getElementById('ques1');

      question0.innerHTML = 'Số quả táo ở bên dưới là? ';
      question1.innerHTML = 'Số quả táo ở bên dưới là: ';
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
    this.ball = document.getElementById(`ball${4}`);
    this.isBallMove = null;
    this.fade = null;
    this.CountAppleEachBox = [0, 0, 0, 0, 0, 0];
    this.spaceValid1 = [];
    this.question = null;
    this.isCheckResult = false;
    this.isResetScene = false;
    this.m = 0;
    this.totalBox = 2;
  }
}
