/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import FdInFdOut from '../helper/FdInFdOut';
import Scene1, { isBallChange, setChange } from './Scene1';

let Scne1;

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

export default class Scene1v2 extends Phaser.Scene {
  constructor() {
    super('Scene1v2');
  }

  preload() {
    this.load.html('question1', 'src/InputForm/Scene1.html');
    this.load.image('apple', 'src/assets/TaoNho.png');
    this.load.image('box', 'src/assets/TaoHolder1.png');
    this.load.image('appleInBox', 'src/assets/TaoInBox.png');
  }

  create() {
    Scne1 = new Scene1();
    this.ReCreate();
    if (isBallChange) {
      this.ball = document.getElementById(`ball${5}`);
    }
    this.CreateBox();
    this.CreateAppleStatic();
    this.CreateApplePhysics();
    this.CreateDestination();
    this.CreateInputForm();
    this.CreateLanguage();
  }

  update() {
    this.MoveApple(this);
    this.DisplayBox();
    this.DisplayQuestion();
    this.CheckResult();
    this.ResetScene();
    this.MoveBall();
  }

  MoveApple(other) {
    other.TimeDelayApple(other, other.repeatTime);
    if (other.isMoveApple) {
      other.physics.moveTo(other.appleArr[other.Index], other.destinationPosX[other.Index], other.destinationPosY[other.Index], 300);
      const distance = Phaser.Math.Distance.Between(other.appleArr[other.Index].x, other.appleArr[other.Index].y, other.destinationPosX[other.Index], other.destinationPosY[other.Index]);

      if (distance < 4) {
        other.appleArr[other.Index].body.reset(other.destinationPosX[other.Index], other.destinationPosY[other.Index]);
        if (other.Index == 2) {
          // this.isDisplayBox = true;
          other.repeatTime = 3;
          other.isTimeDelayBox = true;
          other.completedFillBox++;
        } else if (other.Index == 6) {
          other.isTimeDelayBox = true;
          other.completedFillBox++;
        }
        other.isMoveApple = false;
        // this.Index++;
      }
    }
  }

  TimeDelayApple() {
    Scne1.TimeDelayApple(this, this.repeatTime);
  }

  DisplayBox() {
    Scne1.DisplayBox(this);
  }

  TimeDelayBox() {
    Scne1.TimeDelayBox(this);
  }

  DisplayQuestion() {
    Scne1.DisplayQuestion(this);
  }

  CheckResult() {
    Scne1.CheckResult(this, 20);
  }

  ResetScene() {
    Scne1.ResetScene(this, 'Scene1v3');
  }

  MoveBall() {
    Scne1.MoveBall(this, 'Scene1v3', '395');
    setChange(true);
  }

  // ---------------------------------------------------------
  CreateInputForm() {
    Scne1.CreateInputForm(this, 'question1', 20);
  }

  CreateAppleStatic() {
    for (let k = 0; k < 2; k++) {
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 5; j++) {
          this.appleArrStatic.push(this.add.image(APPLE.initPosX + RANGEAPPLE.X * j, APPLE.initPosY + RANGEAPPLE.Y * i + RANGEBOX.Y * k, 'apple'));
        }
      }
    }

    this.appleArrStatic[1].setVisible(0);
    this.appleArrStatic[3].setVisible(0);
    this.appleArrStatic[7].setVisible(0);
    this.appleArrStatic[12].setVisible(0);
    this.appleArrStatic[15].setVisible(0);
    this.appleArrStatic[18].setVisible(0);
    this.appleArrStatic[19].setVisible(0);
  }

  CreateApplePhysics() {
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X + RANGEBOX.X, APPLE.initPosY, 'apple'));
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * 4 + RANGEBOX.X, APPLE.initPosY, 'apple'));
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEBOX.X, APPLE.initPosY + RANGEAPPLE.Y, 'apple'));
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * 3 + RANGEBOX.X, APPLE.initPosY + RANGEAPPLE.Y, 'apple'));

    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEBOX.X + RANGEAPPLE.X, APPLE.initPosY + RANGEBOX.Y, 'apple'));
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEBOX.X + RANGEAPPLE.X * 2, APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y, 'apple'));

    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEBOX.X * 2, APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y, 'apple'));
    for (let i = 0; i < this.appleArr.length; i++) {
      this.appleArr[i].body.debugShowBody = false;
    }
  }

  CreateDestination() {
    this.destinationPosX.push(APPLE.initPosX + RANGEAPPLE.X);
    this.destinationPosX.push(APPLE.initPosX + RANGEAPPLE.X * 3);
    this.destinationPosX.push(APPLE.initPosX + RANGEAPPLE.X * 2);

    this.destinationPosX.push(APPLE.initPosX + RANGEAPPLE.X * 2);
    this.destinationPosX.push(APPLE.initPosX);
    this.destinationPosX.push(APPLE.initPosX + RANGEAPPLE.X * 3);
    this.destinationPosX.push(APPLE.initPosX + RANGEAPPLE.X * 4);


    this.destinationPosY.push(APPLE.initPosY);
    this.destinationPosY.push(APPLE.initPosY);
    this.destinationPosY.push(APPLE.initPosY + RANGEAPPLE.Y);

    this.destinationPosY.push(APPLE.initPosY + RANGEBOX.Y);
    this.destinationPosY.push(APPLE.initPosY + RANGEAPPLE.Y + RANGEBOX.Y);
    this.destinationPosY.push(APPLE.initPosY + RANGEAPPLE.Y + RANGEBOX.Y);
    this.destinationPosY.push(APPLE.initPosY + RANGEAPPLE.Y + RANGEBOX.Y);
  }

  CreateBox() {
    for (let i = 0; i < 2; i++) {
      this.appleInBox.push(this.add.image(BOX.initPosX, BOX.initPosY + RANGEBOX.Y * i, 'appleInBox'));
      this.appleInBox[i].setAlpha(0);
    }

    // this.box = this.add.image(BOX.initPosX, BOX.initPosY, 'box');
    for (let j = 0; j < 3; j++) {
      for (let i = 0; i < 2; i++) {
        this.box.push(this.add.image(BOX.initPosX + RANGEBOX.X * j, BOX.initPosY + RANGEBOX.Y * i, 'box'));
        this.box[i].setAlpha(1);
      }
    }
  }

  CreateLanguage() {
    Scne1.CreateLanguage();
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
    this.repeatTime = 2;
    // this.question;
    this.isDisplayQuestion = false;
    this.isWannaReset = false;
    this.isBallMove = false;
    this.isTimeDelayBallMove = false;
    this.ball = document.getElementById(`ball${6}`);
    this.totalBox = 2;
  }
}
