
/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import FdInFdOut from '../helper/FdInFdOut';

export var isBallChange = false;
export function setChange(Bool) {
  isBallChange = Bool;
}
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

export default class Scene1 extends Phaser.Scene {
  constructor() {
    super('Scene1');
  }

  preload() {
    this.load.html('question', 'src/InputForm/Scene1.html');
    this.load.image('apple', 'src/assets/TaoNho.png');
    this.load.image('box', 'src/assets/TaoHolder1.png');
    this.load.image('appleInBox', 'src/assets/TaoInBox.png');
  }

  create() {
    this.ReCreate();
    if (isBallChange) {
      this.ball = document.getElementById(`ball${5}`);
    }
    this.CreateBox();
    this.CreateAppleStatic();
    this.CreateApplePhysics();
    this.CreateDestination();
    this.CreateInputForm(this, 'question', 30);
    this.CreateLanguage();
  }

  update() {
    console.log(isBallChange);

    this.MoveApple(this);
    this.DisplayBox(this);
    this.DisplayQuestion(this);
    this.CheckResult(this, 30);
    this.ResetScene(this, 'Scene1v2');
    this.MoveBall(this, 'Scene1v2', 395);
  }

  MoveApple(other) {
    other.TimeDelayApple(other, other.repeatTime);
    if (other.isMoveApple) {
      other.physics.moveTo(other.appleArr[other.Index], other.destinationPosX[other.Index], other.destinationPosY[other.Index], 300);
      const distance = Phaser.Math.Distance.Between(other.appleArr[other.Index].x, other.appleArr[other.Index].y, other.destinationPosX[other.Index], other.destinationPosY[other.Index]);

      if (distance < 4) {
        other.appleArr[other.Index].body.reset(other.destinationPosX[other.Index], other.destinationPosY[other.Index]);
        if (other.Index == 3) {
          // other.isDisplayBox = true;
          other.repeatTime = 3;
          other.isTimeDelayBox = true;
          other.completedFillBox++;
        } else if (other.Index == 7) {
          other.repeatTime = 2;
          other.isTimeDelayBox = true;
          other.completedFillBox++;
        } else if (other.Index == 10) {
          other.isTimeDelayBox = true;
          other.completedFillBox++;
        }
        other.isMoveApple = false;
        // this.Index++;
      }
    }
  }

  TimeDelayApple(other, repeatTime) {
    if (other.isTimeDelayApple) {
      other.time.addEvent({
        delay: 1300,
        callback: () => {
          other.isMoveApple = true;
          other.Index++;
        },
        repeat: repeatTime,
      });
      other.isTimeDelayApple = false;
    }
  }

  DisplayBox(other) {
    other.TimeDelayBox(other);
    if (other.isDisplayBox) {
      for (let i = 0; i <= other.Index; i++) {
        other.appleArr[i].destroy();
      }
      for (let i = 0; i < other.completedFillBox * 10; i++) {
        other.appleArrStatic[i].setVisible(0);
      }
      other.fade.FdIn(other.box[other.completedFillBox - 1]);
      other.fade.FdOut(other.appleInBox[other.completedFillBox - 1]);
      // other.appleInBox.setAlpha(1);
      if (other.completedFillBox < other.totalBox) {
        // other.isMoveApple = true;
        other.isTimeDelayApple = true;
      } else {
        other.isDisplayQuestion = true;
      }
      other.isDisplayBox = false;
    }
  }

  TimeDelayBox(other) {
    if (other.isTimeDelayBox) {
      other.time.delayedCall(1000, () => {
        other.isDisplayBox = true;
      }, [], other);
      other.isTimeDelayBox = false;
    }
  }

  DisplayQuestion(other) {
    if (other.isDisplayQuestion) {
      document.getElementById('layout_question0').style.display = 'none';
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
        for (let i = other.totalBox; i < 6; i++) {
          other.fade.FdIn(other.box[i]);
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
            isBallChange = true;
            other.question.destroy();
            other.scene.start(scene);
          },
          repeat: 0,
        });
      }
    }
  }

  // ---------------------------------------------------------
  CreateInputForm(other, questionId, result) {
    other.add.line(0, 0, 0, 60, 2160, 60, '0xD3D3D3');
    other.question = other.add.dom(500, 150).createFromCache(questionId);
    document.getElementById('input1').focus();
    document.getElementById('input1').onkeyup = function () {
      Check_SubAnswer1(result);
    };
    document.getElementById('input2').onkeyup = function () {
      Check_SubAnswer2();
    };

    other.fade = new FdInFdOut(other);
  }

  CreateAppleStatic() {
    for (let k = 0; k < 3; k++) {
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 5; j++) {
          this.appleArrStatic.push(this.add.image(APPLE.initPosX + RANGEAPPLE.X * j + RANGEBOX.X * k, APPLE.initPosY + RANGEAPPLE.Y * i, 'apple'));
        }
      }
    }
    this.appleArrStatic[0].setVisible(0);
    this.appleArrStatic[2].setVisible(0);
    this.appleArrStatic[4].setVisible(0);
    this.appleArrStatic[8].setVisible(0);
    this.appleArrStatic[15].setVisible(0);
    this.appleArrStatic[16].setVisible(0);
    this.appleArrStatic[18].setVisible(0);
    this.appleArrStatic[19].setVisible(0);
    this.appleArrStatic[23].setVisible(0);
    this.appleArrStatic[27].setVisible(0);
    this.appleArrStatic[28].setVisible(0);
  }

  CreateApplePhysics() {
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X, APPLE.initPosY + RANGEBOX.Y, 'apple'));
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * 3, APPLE.initPosY + RANGEBOX.Y, 'apple'));
    this.appleArr.push(this.physics.add.image(APPLE.initPosX, APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y, 'apple'));
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * 4, APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y, 'apple'));
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEBOX.X, APPLE.initPosY + RANGEBOX.Y, 'apple'));
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEBOX.X + RANGEAPPLE.X * 4, APPLE.initPosY + RANGEBOX.Y, 'apple'));
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEBOX.X + RANGEAPPLE.X, APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y, 'apple'));
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEBOX.X * 2 + RANGEAPPLE.X * 2, APPLE.initPosY + RANGEBOX.Y, 'apple'));
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEBOX.X * 2, APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y, 'apple'));
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEBOX.X * 2 + RANGEAPPLE.X * 2, APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y, 'apple'));
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEBOX.X * 2 + RANGEAPPLE.X * 4, APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y, 'apple'));

    for (let i = 0; i < this.appleArr.length; i++) {
      this.appleArr[i].body.debugShowBody = false;
    }
  }

  CreateDestination() {
    this.destinationPosX.push(APPLE.initPosX);
    this.destinationPosX.push(APPLE.initPosX + RANGEAPPLE.X * 2);
    this.destinationPosX.push(APPLE.initPosX + RANGEAPPLE.X * 4);
    this.destinationPosX.push(APPLE.initPosX + RANGEAPPLE.X * 3);
    this.destinationPosX.push(APPLE.initPosX + RANGEBOX.X);
    this.destinationPosX.push(APPLE.initPosX + RANGEAPPLE.X + RANGEBOX.X);
    this.destinationPosX.push(APPLE.initPosX + RANGEAPPLE.X * 3 + RANGEBOX.X);
    this.destinationPosX.push(APPLE.initPosX + RANGEAPPLE.X * 4 + RANGEBOX.X);
    this.destinationPosX.push(APPLE.initPosX + RANGEAPPLE.X * 3 + RANGEBOX.X * 2);
    this.destinationPosX.push(APPLE.initPosX + RANGEAPPLE.X * 2 + RANGEBOX.X * 2);
    this.destinationPosX.push(APPLE.initPosX + RANGEAPPLE.X * 3 + RANGEBOX.X * 2);

    this.destinationPosY.push(APPLE.initPosY);
    this.destinationPosY.push(APPLE.initPosY);
    this.destinationPosY.push(APPLE.initPosY);
    this.destinationPosY.push(APPLE.initPosY + RANGEAPPLE.Y);
    this.destinationPosY.push(APPLE.initPosY + RANGEAPPLE.Y);
    this.destinationPosY.push(APPLE.initPosY + RANGEAPPLE.Y);
    this.destinationPosY.push(APPLE.initPosY + RANGEAPPLE.Y);
    this.destinationPosY.push(APPLE.initPosY + RANGEAPPLE.Y);
    this.destinationPosY.push(APPLE.initPosY);
    this.destinationPosY.push(APPLE.initPosY + RANGEAPPLE.Y);
    this.destinationPosY.push(APPLE.initPosY + RANGEAPPLE.Y);
  }

  CreateBox() {
    for (let i = 0; i < 3; i++) {
      this.appleInBox.push(this.add.image(BOX.initPosX + RANGEBOX.X * i, BOX.initPosY, 'appleInBox'));
      this.appleInBox[i].setAlpha(0);
    }

    // this.box = this.add.image(BOX.initPosX, BOX.initPosY, 'box');
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 3; i++) {
        this.box.push(this.add.image(BOX.initPosX + RANGEBOX.X * i, BOX.initPosY + RANGEBOX.Y * j, 'box'));
        this.box[i].setAlpha(1);
      }
    }
  }

  CreateLanguage() {
    if (window.location.hash === '#vietnam') {
      const question0 = document.getElementById('ques0');
      const question1 = document.getElementById('ques1');
      question0.innerHTML = 'Số quả táo bên dưới là? ';
      question1.innerHTML = 'Số quả táo bên dưới là: ';
    }
  }

  ReCreate() {
    this.question = null;
    this.m = 0;

    this.appleArr = [];
    this.destinationPosX = [];
    this.destinationPosY = [];
    this.isMoveApple = false;
    this.Index = -1;
    this.isTimeDelayApple = true;
    this.isTimeDelayBox = false;
    this.isDisplayBox = false;
    this.isCheckResult = false;
    this.isResetScene = false;
    this.fade = null;
    this.appleInBox = [];
    this.box = [];
    this.completedFillBox = 0;
    this.appleArrStatic = [];
    this.repeatTime = 3;
    // this.question;
    this.isDisplayQuestion = false;
    this.isWannaReset = false;
    this.isBallMove = false;
    this.isTimeDelayBallMove = false;
    this.ball = document.getElementById(`ball${6}`);
    this.totalBox = 3;
  }
}
