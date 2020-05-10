/* eslint-disable max-len */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
import FdInFdOut from '../helper/FdInFdOut';
import Scene1, { isBallChange, setChange } from './Scene1';
import Scene1v2 from './Scene1_2';

let Scne1;
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

export default class Scene1v3 extends Phaser.Scene {
  constructor() {
    super('Scene1v3');
  }

  preload() {
    this.load.html('question2', 'src/InputForm/Scene1.html');
    this.load.image('apple', 'src/assets/TaoNho.png');
    this.load.image('box', 'src/assets/TaoHolder1.png');
    this.load.image('appleInBox', 'src/assets/TaoInBox.png');
  }

  create() {
    Scne1 = new Scene1();
    Scne2 = new Scene1v2();
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
    this.MoveApple();
    this.DisplayBox();
    this.DisplayQuestion();
    this.CheckResult();
    this.ResetScene();
    this.MoveBall();
  }

  MoveApple() {
    Scne2.MoveApple(this);
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
    Scne1.ResetScene(this, 'Scene1');
  }

  MoveBall() {
    Scne1.MoveBall(this, 'Scene1', '395');
    setChange(true);
  }

  // ---------------------------------------------------------
  CreateInputForm() {
    Scne1.CreateInputForm(this, 'question2', 20);
  }

  CreateAppleStatic() {
    for (let k = 0; k < 3; k++) {
      for (let i = 0; i < 2; i++) {
        for (let j = 0; j < 5; j++) {
          this.appleArrStatic.push(this.add.image(APPLE.initPosX + RANGEAPPLE.X * j + RANGEBOX.X * k, APPLE.initPosY + RANGEAPPLE.Y * i, 'apple'));
        }
      }
    }
    for (let i = 20; i < 30; i++) {
      this.appleArrStatic[i].setVisible(0);
    }

    this.appleArrStatic[1].setVisible(0);
    this.appleArrStatic[5].setVisible(0);
    this.appleArrStatic[3].setVisible(0);
    this.appleArrStatic[11].setVisible(0);
    this.appleArrStatic[14].setVisible(0);
    this.appleArrStatic[17].setVisible(0);
    this.appleArrStatic[19].setVisible(0);
  }

  CreateApplePhysics() {
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X, APPLE.initPosY + RANGEBOX.Y, 'apple'));
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * 4, APPLE.initPosY + RANGEBOX.Y, 'apple'));
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * 3, APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y, 'apple'));

    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEBOX.X + RANGEAPPLE.X, APPLE.initPosY + RANGEBOX.Y, 'apple'));
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEBOX.X, APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y, 'apple'));

    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEBOX.X * 2, APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y, 'apple'));
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEBOX.X * 2 + RANGEAPPLE.X * 2, APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y, 'apple'));

    for (let i = 0; i < this.appleArr.length; i++) {
      this.appleArr[i].body.debugShowBody = false;
    }
  }

  CreateDestination() {
    this.destinationPosX.push(APPLE.initPosX + RANGEAPPLE.X);
    this.destinationPosX.push(APPLE.initPosX + RANGEAPPLE.X * 3);
    this.destinationPosX.push(APPLE.initPosX);

    this.destinationPosX.push(APPLE.initPosX + RANGEAPPLE.X + RANGEBOX.X);
    this.destinationPosX.push(APPLE.initPosX + RANGEAPPLE.X * 4 + RANGEBOX.X);
    this.destinationPosX.push(APPLE.initPosX + RANGEAPPLE.X * 2 + RANGEBOX.X);
    this.destinationPosX.push(APPLE.initPosX + RANGEAPPLE.X * 4 + RANGEBOX.X);


    this.destinationPosY.push(APPLE.initPosY);
    this.destinationPosY.push(APPLE.initPosY);
    this.destinationPosY.push(APPLE.initPosY + RANGEAPPLE.Y);

    this.destinationPosY.push(APPLE.initPosY);
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
