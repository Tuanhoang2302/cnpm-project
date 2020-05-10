
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

// export var CountAppleEachBox2 = [0, 0, 0, 0, 0, 0];
// export var spaceValid2 = [];

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

export default class Scene2v3 extends Phaser.Scene {
  constructor() {
    super('Scene2v3');
  }

  preload() {
    this.load.html('question5', 'src/InputForm/Scene2.html');
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
    this.CreateBox();
    this.CreatePosHolder();
    this.CreateApplePhysics();
    this.CreateGameFunction();
    this.CreateHTMlForm();
    this.CreateLanguage();
  }

  update() {
    this.DragAndDrop();
    this.DisplayAppleInBox();
    this.DisplayQuestion();
    this.CheckResult();
    this.ResetScene();
    this.MoveBall();
  }


  // ---------------------------------------------------------
  DragAndDrop() {
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

  DisplayAppleInBox() {
    Scne2.DisplayAppleInBox(this);
  }

  DisplayQuestion() {
    Scne2.DisplayQuestion(this);
  }

  CheckResult() {
    Scne2.CheckResult(this, 30);
  }

  ResetScene() {
    Scne2.ResetScene(this, 'Scene2v3');
  }

  MoveBall() {
    Scne2.MoveBall(this, 'Scene2v3', 395);
  }


  // ----------------------------------------------------------
  CreateHTMlForm() {
    this.question = this.add.dom(500, 165).createFromCache('question5');
    document.getElementById('layout_question0').style.marginLeft = '220px';
    document.getElementById('layout_question1').style.marginLeft = '200px';
    document.getElementById('layout_question1').style.marginTop = '30px';
    document.getElementById('input1').onkeyup = function () {
      Check_SubAnswer1(30);
    };
    document.getElementById('input2').onkeyup = function () {
      Check_SubAnswer2();
    };
  }

  CreateApplePhysics() {
    this.appleArr.push(this.physics.add.image(APPLE.initPosX, APPLE.initPosY, 'apple'));
    this.CountAppleEachBox[0]++;
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * 2 + RANGEBOX.X, APPLE.initPosY, 'apple'));
    this.CountAppleEachBox[1]++;
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * 3 + RANGEBOX.X, APPLE.initPosY + RANGEAPPLE.Y, 'apple'));
    this.CountAppleEachBox[1]++;
    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * 1 + RANGEBOX.X * 2, APPLE.initPosY + RANGEAPPLE.Y, 'apple'));
    this.CountAppleEachBox[2]++;

    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 5; i++) {
        if (j == 0 && i == 2) {
          continue;
        } else {
          this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * i, APPLE.initPosY + RANGEAPPLE.Y * j + RANGEBOX.Y, 'apple'));
          this.CountAppleEachBox[3]++;
        }
      }
    }
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 5; i++) {
        if ((j == 1 && i == 4) || (i == 0 && j == 0)) {
          continue;
        } else {
          this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * i + RANGEBOX.X, APPLE.initPosY + RANGEAPPLE.Y * j + RANGEBOX.Y, 'apple'));
          this.CountAppleEachBox[4]++;
        }
      }
    }
    for (let j = 0; j < 2; j++) {
      for (let i = 0; i < 5; i++) {
        if ((j == 1 && i == 3)) {
          continue;
        } else {
          this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * i + RANGEBOX.X * 2, APPLE.initPosY + RANGEAPPLE.Y * j + RANGEBOX.Y, 'apple'));
          this.CountAppleEachBox[5]++;
        }
      }
    }

    for (let i = 0; i < this.appleArr.length; i++) {
      this.appleArr[i].body.debugShowBody = false;
    }
  }

  CreatePosHolder() {
    Scne2.CreatePosHolder(this);
  }

  CreateBox() {
    Scne2.CreateBox(this);
  }

  CreateGameFunction() {
    for (let i = 0; i < this.appleArr.length; i++) {
      this.initApplePosX.push(this.appleArr[i].x);
      this.initApplePosY.push(this.appleArr[i].y);
      this.distance.push(0);
    }
    const dragManager = new DragManager(this, this.appleArr, this.Holder, this.initApplePosX, this.initApplePosY, 2, this.CountAppleEachBox, this.spaceValid3);
    dragManager.dragApple();
    this.fade = new FdInFdOut(this);

    for (let i = 0; i < this.Holder.length; i++) {
      if ((i >= 30 && i < 40) || (i >= 40 && i < 50) || (i >= 50 && i < 60) || i == 0 || i == 12 || i == 18 || i == 26) {
        this.spaceValid3[i] = false;
      } else {
        this.spaceValid3[i] = true;
      }
    }
    this.spaceValid3[32] = true;
    this.spaceValid3[40] = true;
    this.spaceValid3[49] = true;
    this.spaceValid3[58] = true;
  }

  CreateLanguage() {
    Scne2.CreateLanguage();
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
    this.ball = document.getElementById(`ball${2}`);
    this.isBallMove = null;
    this.fade = null;
    this.CountAppleEachBox = [0, 0, 0, 0, 0, 0];
    this.spaceValid3 = [];
    this.question = null;
    this.isCheckResult = false;
    this.isResetScene = false;
    this.m = 0;
    this.totalBox = 3;
  }
}
