import 'phaser'
import FdInFdOut from '../helper/FdInFdOut';
import MessageBox from  '../helper/MessageBox';
import DisplayBox from '../helper/DisplayBox';
import CheckInputText from '../helper/CheckInputText';
import {boxDisappear} from '../helper/CheckInputText'
import Ball from '../gameObject/Ball';
import DragManager from '../helper/DragManager';

const RANGEBOX= {
    X : 270,
    Y: 150,
};

const RANGEAPPLE= {
    X : 43,
    Y: 43,
};

const APPLE = {
    initPosX : 185,
    initPosY : 260, 
}

const BOX = {
    initPosX : APPLE.initPosX + 270 - 185, 
    initPosY : APPLE.initPosY + 200 - 177,
}

const QUESTION = {
    X: APPLE.initPosX + 15,
    Y : APPLE.initPosY - 160
}

const INPUT = {
    X: QUESTION.X + 650,
    Y :QUESTION.Y + 10
}

const MESSAGE = {
    X : INPUT.X,
    Y : INPUT.Y + 60,
    WIDTH : 200,
    HEIGHT : 50,
    FONTTEXT : 20,
  }

const RESULTTXT = {
    X:INPUT.X - 30,
    Y:QUESTION.Y - 12,
}

const SUGGEST = {
    X: APPLE.initPosX + 15,
    Y: APPLE.initPosY - 100
}
export var CountAppleEachBox4 = [0, 0, 0, 0 , 0 ,0];
export var isWannaReset10 = [false];
export var spaceValid4 = [];
export default class Scene3 extends Phaser.Scene
{
    constructor(){
        super('Scene3');
        
    }

    preload(){
        this.load.html('answerform', 'src/assets/text/answerform.html')
        this.load.image('apple', 'src/assets/TaoNho.png');
        this.load.image('box', 'src/assets/TaoHolder1.png');
        this.load.image('appleInBox', 'src/assets/TaoInBox.png');
        this.load.image('ball', 'src/assets/ball.png');
        this.load.image('ballHolder', 'src/assets/thanh.png');
        this.load.image('AHold', 'src/assets/AHold.png');
    }

    create(){
        this.ReCreate();
        this.CreateBox();
        this.CreatePosHolder();
        this.CreateApplePhysics();
        this.CreateGameFunction();
    }
   
    update(){
        isWannaReset10[0] = this.isWannaReset[0];
        this.DragAndDrop();
        this.DisplayAppleInBox();
        //this.DisplayQuestion();
        this.DisplayResult();
        this.WannaReset();
        this.BallMove();
    }

    DragAndDrop(){
        for(var i = 0; i < this.appleArr.length; i++){
            this.distance[i] = Phaser.Math.Distance.Between(this.appleArr[i].x, this.appleArr[i].y, this.initApplePosX[i], this.initApplePosY[i]);
            if (this.distance[i] < 4)
            {
              this.appleArr[i].body.reset(this.initApplePosX[i], this.initApplePosY[i]);
            }
        }
    }

    CheckCompletedBox(){
        for(var i = 0;i < 6; i++){
            if(CountAppleEachBox4[i] == 10){
                this.isDisplayBox = true;
                this.boxCompleted++;
                return i;
            }
        }
        return -1;
    }

    DisplayAppleInBox(){
        if(this.isDisplayAppleInBox){
        if(this.boxCompleted < 3){
            this.boxIndex = this.CheckCompletedBox();
        }else{
            this.isDisplayQuestion = true;
            this.isDisplayAppleInBox = false;
        }
        if(this.isDisplayBox){
            var x = this.boxIndex % 3;
            var y = this.boxIndex / 3;
            CountAppleEachBox4[this.boxIndex] = 11;

            for(var i = 0; i < this.appleArr.length; i++){
                if(this.appleArr[i].x > APPLE.initPosX - 20 + RANGEBOX.X * x && this.appleArr[i].x < APPLE.initPosX  + RANGEBOX.X * x + RANGEAPPLE.X * 5 &&
                    this.appleArr[i].y > APPLE.initPosY - 120 + RANGEBOX.Y * y && this.appleArr[i].y < APPLE.initPosY + RANGEBOX.Y * y + RANGEAPPLE.Y * 2){
                    this.appleArr[i].setAlpha(0);
                    
                    for(var j = (this.boxIndex) * 10; j < (this.boxIndex + 1) * 10; j++){
                        this.Holder[j].setAlpha(0);
                    }
                    this.fade.FdIn(this.box[this.boxIndex])
                    this.fade.FdOut(this.appleInBox[this.boxIndex]);
                    
                }
            }
        }
    }
    }

    DisplayQuestion(){
        if(this.isDisplayQuestion){
            this.firstQuestion.setAlpha(0);
            this.suggest.setAlpha(0);
            var text = this.add.text(QUESTION.X , QUESTION.Y, 'How many apples are there:', { fontFamily: 'Arial', fontSize: 45, color: '#000000', align: 'center', wordWrap: { width: 700 }});
            this.inputForm = this.add.dom(INPUT.X, INPUT.Y).createFromCache('answerform');
            this.inputText.push(this.inputForm.getChildByName('answerform'));
            this.inputText[0].focus();
            this.isDisplayResult = true;
            this.isDisplayQuestion = false;
        }
    }

    DisplayResult(){
        if(this.isDisplayResult){
            
            this.checkInput.check(null, null,this.inputText[0], this.isRightResult, this.isWannaReset, 30);
            if(boxDisappear[0] && this.boxCompleted < 3){
                //var
                this.suggest.setAlpha(0);
                this.suggest1.setAlpha(1);
                this.inputForm.setAlpha(0);
                console.log(this.inputText[0].value);
                if(this.showWrongAnswer){
                    this.wrongAnswer = this.add.text(RESULTTXT.X , RESULTTXT.Y, this.inputText[0].value.toString(), { fontFamily: 'Arial', fontSize: 60, color: '#FF0000', align: 'center', wordWrap: { width: 30 }});
                    this.showWrongAnswer = false;
                }
                if(this.wrongAnswer.x < RESULTTXT.X + 100){
                    this.wrongAnswer.x +=3;
                }else{
                
                    boxDisappear[0] = false;
                }
            }

            if(this.boxCompleted == 3 && boxDisappear[0]){
                if(this.displayInputAgain){
                    this.inputText[0].value = '';
                    this.inputText[0].focus();
                    this.inputForm.setAlpha(1);
                    this.displayInputAgain = false;
                }
                
                if(boxDisappear[0]){
                    for(var k = 0; k < 6; k++){
                        if(CountAppleEachBox4[k] != 11){              
                            var x = k % 3;
                            var y = k / 3;
                            for(var j = (k) * 10; j < (k + 1) * 10; j++){
                                this.Holder[j].setAlpha(0);
                            }
                            this.fade.FdIn(this.box[k]);                      
                        }
                        //this.fade.FdIn(this.box[i]);
                    }
                    boxDisappear[0] = false;
                }
            }
            if(this.isRightResult[0]){
                this.inputForm.destroy();
                var text = this.add.text(RESULTTXT.X , RESULTTXT.Y, '30', { fontFamily: 'Arial', fontSize: 60, color: '#000000', align: 'center', wordWrap: { width: 30 }});
                this.isTimeDelayBallMove = true;
                this.isDisplayResult = false;
            }
        }
    }

    WannaReset(){
        if(this.isWannaReset[0]){
          if(this.isBallMove){
                
            }
        }
    }

    BallMove(){
        this.TimeDelayBallMove();
        if(this.isWannaReset[0] == false){
        if(this.isBallMove){
            console.log(this.lastBall.x);
            if(this.lastBall.x < 620){
                this.lastBall.x += 3;        
            }else{
                //this.scene.start('Scene2v2');
                this.isBallMove = false;
            }
        }
    }
    }

    TimeDelayBallMove(){
        if(this.isTimeDelayBallMove){
            this.time.addEvent({
                delay: 1300,
                callback: ()=>{
                    this.isBallMove = true;
                },
                repeat: 0,
            })
            this.isTimeDelayBallMove = false;
        }
    }

    CreateBox(){
        for(j = 0; j < 2; j++){
            for(var i = 0; i < 3; i++){
                this.appleInBox.push(this.add.image(BOX.initPosX + RANGEBOX.X * i, BOX.initPosY + RANGEBOX.Y * j, 'appleInBox'));
                this.appleInBox[j * 3 + i].setAlpha(0);
            }
        }
        
        //this.box = this.add.image(BOX.initPosX, BOX.initPosY, 'box');
        for(var j = 0 ; j < 2; j++){
            for(var i = 0 ; i < 3; i++){
                this.box.push(this.add.image(BOX.initPosX + RANGEBOX.X * i, BOX.initPosY + RANGEBOX.Y * j, 'box'));
                this.box[i].setAlpha(1);
            }
        }
    }

    CreateApplePhysics(){
        for(var j = 0; j < 2; j++){
            for(var i = 0; i < 5; i++){
                if(j == 0 && i == 2){
                    continue;
                }
                else{
                    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * i, APPLE.initPosY + RANGEAPPLE.Y * j, 'apple'));
                    CountAppleEachBox4[0]++;
                }
            }
        }
        for(var j = 0; j < 2; j++){
            for(var i = 0; i < 5; i++){
                if((j == 0 && i == 2) || (j == 0 && i == 4)){
                    continue;
                }
                else{
                    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * i + RANGEBOX.X, APPLE.initPosY + RANGEAPPLE.Y * j, 'apple'));
                    CountAppleEachBox4[1]++;
                }
            }
        }
        for(var j = 0; j < 2; j++){
            for(var i = 0; i < 5; i++){
                if((j == 1 && i == 1) || (j == 1 && i == 3)){
                    continue;
                }
                else{
                    this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * i + RANGEBOX.X * 2, APPLE.initPosY + RANGEAPPLE.Y * j, 'apple'));
                    CountAppleEachBox4[2]++;
                }
            }
        }
        this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * 1, APPLE.initPosY + RANGEBOX.Y, 'apple'));
        CountAppleEachBox4[3]++;
        this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * 3, APPLE.initPosY + RANGEBOX.Y, 'apple'));
        CountAppleEachBox4[3]++;
        this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * 3, APPLE.initPosY + RANGEAPPLE.Y * 1 + RANGEBOX.Y, 'apple'));
        CountAppleEachBox4[3]++;
        this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * 2 + RANGEBOX.X * 1, APPLE.initPosY + RANGEAPPLE.Y * 1 + RANGEBOX.Y, 'apple'));
        CountAppleEachBox4[4]++;
        this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * 4 + RANGEBOX.X * 1, APPLE.initPosY + RANGEAPPLE.Y * 1 + RANGEBOX.Y, 'apple'));
        CountAppleEachBox4[4]++;

        for(var i = 0;i < this.appleArr.length; i++){
            this.appleArr[i].body.debugShowBody = false;
        }
    }

    CreatePosHolder(){
        for(var m = 0; m < 2; m++){
            for(var n = 0; n < 3; n++){
                for(var j = 0; j < 2; j++){
                    for(var i = 0; i < 5; i++){
                        var temp = this.add.image(APPLE.initPosX + RANGEAPPLE.X * i + RANGEBOX.X * n, APPLE.initPosY + RANGEAPPLE.Y * j + RANGEBOX.Y * m, 'AHold');
                        this.Holder.push(temp);
                    }
                }
            }
        }
    }

    CreateGameFunction(){
        this.input.on('pointerdown', function(pointer){
            var touchX = pointer.x;
            var touchY = pointer.y;
            console.log(touchX);
            console.log(touchY);
             
        });
        var ballHolder = this.add.image(540, 30, 'ballHolder');
        this.ball = new Ball();
        this.ball.create(this, 770, 29);
        this.ball.create(this, 740, 29);
        this.ball.create(this, 710, 29);
        this.ball.create(this, 680, 29);
        this.ball.create(this, 650, 29);
        for(var i = 0; i < 1; i++){
            this.lastBall = this.ball.create(this, 310 + 30 * i, 29);    
        }
        this.firstQuestion = this.add.text(QUESTION.X +50, QUESTION.Y, 'How many apples are there?', { fontFamily: 'Arial', fontSize: 45, color: '#000000', align: 'center', wordWrap: { width: 700 }});
        this.suggest = this.add.text(SUGGEST.X + 120, SUGGEST.Y, 'You can fill up the boxes', { fontFamily: 'Arial', fontSize: 30, color: '#808080', align: 'center', wordWrap: { width: 700 }});
        this.suggest1 = this.add.text(SUGGEST.X + 180, SUGGEST.Y, 'Fill in the boxes', { fontFamily: 'Arial', fontSize: 30, color: '#000000', align: 'center', wordWrap: { width: 700 }});
        this.checkInput = new CheckInputText(this);
        this.boxDisplay = new DisplayBox(this);
        this.boxDisplay.displayMessageBox(MESSAGE.X, MESSAGE.Y, MESSAGE.WIDTH, MESSAGE.HEIGHT,
            'There are 30 blocks', MESSAGE.FONTTEXT, this.msg.graphicArr, this.msg.ContentArr);
        for(var i = 0; i < this.appleArr.length; i++){
            this.initApplePosX.push(this.appleArr[i].x);
            this.initApplePosY.push(this.appleArr[i].y);
            this.distance.push(0);
        }
        var dragManager = new DragManager(this, this.appleArr, this.Holder, this.initApplePosX, this.initApplePosY, 4);
        dragManager.dragApple();
        this.fade = new FdInFdOut(this) 

        for(var i = 0; i < this.Holder.length; i++){
            if((i >= 0 && i < 30) || i == 31 || i == 33 || i == 38 || i == 47 || i == 49){
                spaceValid4[i] = false;
            }else{
                spaceValid4[i] = true;
            }
        }
        spaceValid4[2] = true;
        spaceValid4[12] = true;
        spaceValid4[14] = true;
        spaceValid4[26] = true;
        spaceValid4[28] = true;

        this.firstQuestion.setAlpha(0);
        this.suggest.setAlpha(1);
        this.suggest1.setAlpha(0);
        var text = this.add.text(QUESTION.X , QUESTION.Y, 'How many apples are there:', { fontFamily: 'Arial', fontSize: 45, color: '#000000', align: 'center', wordWrap: { width: 700 }});
        this.inputForm = this.add.dom(INPUT.X, INPUT.Y).createFromCache('answerform');
        this.inputText.push(this.inputForm.getChildByName('answerform'));

        var line = this.add.line(0, 0, 0, 50, 2500, 50, 0xd3d3d3);
    }

    
    ReCreate(){
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
        this.inputForm = null;
        this.inputText = [];
        this.isDisplayResult = true;
        this.isRightResult = [false];
        this.isWannaReset = [false];
        this.isTimeDelayBallMove = false;
        this.msg = {
            graphicArr : [],
            ContentArr : [],
        }
        this.suggest = null;
        this.suggest1 = null;
        this.ball = null;
        this.lastBall = null;
        this.isBallMove = null;
        this.firstQuestion = null;
        this.suggest = null;
        this.checkInput = null;
        this.boxDisplay = null;
        this.fade = null;
        CountAppleEachBox4 = [0, 0, 0, 0 , 0 ,0]
        isWannaReset10 = [false]
        spaceValid4 = []
        this.showWrongAnswer = true;
        this.wrongAnswer = null;
        this.displayInputAgain = true;;
    }
}