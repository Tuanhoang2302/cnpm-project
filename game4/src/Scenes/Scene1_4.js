import 'phaser'
import FdInFdOut from '../helper/FdInFdOut';
import MessageBox from  '../helper/MessageBox';
import DisplayBox from '../helper/DisplayBox';
import CheckInputText from '../helper/CheckInputText';
import {boxDisappear} from '../helper/CheckInputText'
import Ball from '../gameObject/Ball';
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

export var isWannaReset4 = [false];

export default class Scene1v4 extends Phaser.Scene
{
    constructor(){
        super('Scene1v4');
        
    }

    preload(){
        this.load.html('answerform', 'src/assets/text/answerform.html')
        this.load.image('apple', 'src/assets/TaoNho.png');
        this.load.image('box', 'src/assets/TaoHolder1.png');
        this.load.image('appleInBox', 'src/assets/TaoInBox.png');
        this.load.image('ball', 'src/assets/ball.png');
        this.load.image('ballHolder', 'src/assets/thanh.png');
    }
    create(){
        this.ReCreate();
        this.firstQuestion = this.add.text(QUESTION.X +50, QUESTION.Y, 'How many apples are there?', { fontFamily: 'Arial', fontSize: 45, color: '#000000', align: 'center', wordWrap: { width: 700 }});
        this.checkInput = new CheckInputText(this);
        this.boxDisplay = new DisplayBox(this);
        this.boxDisplay.displayMessageBox(MESSAGE.X, MESSAGE.Y, MESSAGE.WIDTH, MESSAGE.HEIGHT,
            'There are 30 blocks', MESSAGE.FONTTEXT, this.msg.graphicArr, this.msg.ContentArr);
        this.fade = new FdInFdOut(this)   
        var ballHolder = this.add.image(540, 16, 'ballHolder');
        this.ball = new Ball();
        this.ball.create(this, 770, 30);
        for(var i = 0; i < 5; i++){
            this.lastBall = this.ball.create(this, 310 + 30 * i, 29);    
        }

        this.CreateBox();
        this.CreateAppleStatic();
        this.CreateApplePhysics();
        this.CreateDestination();

        var line = this.add.line(0, 0, 0, 50, 2500, 50, 0xd3d3d3);
    }
    update(){
        isWannaReset4[0] = this.isWannaReset[0];
        this.MoveApple();
        this.DisplayBox();
        this.DisplayQuestion();
        this.DisplayResult();
        this.WannaReset();
        this.BallMove();
    }



    DisplayQuestion(){
        if(this.isDisplayQuestion){
            this.firstQuestion.setAlpha(0);
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
            this.checkInput.check(this.msg.graphicArr[0], this.msg.ContentArr[0],this.inputText[0], this.isRightResult, this.isWannaReset, 30);
            if(boxDisappear[0]){
                for(var i = 3; i < 6; i++){
                    this.fade.FdIn(this.box[i]);
                }
                boxDisappear[0] = false;
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
                this.scene.start('Reset');
            }
        }
    }

    BallMove(){
        this.TimeDelayBallMove();
        if(this.isWannaReset[0] == false){
        if(this.isBallMove){
            console.log(this.lastBall.x);
            if(this.lastBall.x < 740){
                this.lastBall.x += 3;        
            }else{
                this.scene.start('Scene2');
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

    MoveApple(){
        this.TimeDelayApple(this.repeatTime);
        if(this.isMoveApple){            
            this.physics.moveTo(this.appleArr[this.Index], this.destinationPosX[this.Index], this.destinationPosY[this.Index], 300);
            var distance = Phaser.Math.Distance.Between(this.appleArr[this.Index].x, this.appleArr[this.Index].y, this.destinationPosX[this.Index], this.destinationPosY[this.Index]);
            
            if (distance < 4)
            {
                this.appleArr[this.Index].body.reset(this.destinationPosX[this.Index], this.destinationPosY[this.Index]);
                if(this.Index == 3){
                    //this.isDisplayBox = true;
                    this.repeatTime = 3;
                    this.isTimeDelayBox = true;
                    this.completedFillBox++;
                    
                }else if(this.Index == 7){
                    this.repeatTime = 2;
                    this.isTimeDelayBox = true;
                    this.completedFillBox++;
                }else if(this.Index == 10){
                    this.isTimeDelayBox = true;
                    this.completedFillBox++;
                }
                this.isMoveApple = false;
                //this.Index++;
            }                   
        }       
    }

    TimeDelayApple(repeatTime){
        if(this.isTimeDelayApple){
            this.time.addEvent({
                delay: 1300,
                callback: ()=>{
                    this.isMoveApple = true;
                    this.Index++;
                },
                repeat: repeatTime,
            })
            this.isTimeDelayApple = false;
        }
    }

    DisplayBox(){
        this.TimeDelayBox();
        if(this.isDisplayBox){
            for(var i = 0; i <= this.Index; i++){
                this.appleArr[i].destroy();
            }
            for(var i = 0; i < this.completedFillBox * 10; i++){
                this.appleArrStatic[i].setVisible(0);
            }
            this.fade.FdIn(this.box[this.completedFillBox - 1]);
            this.fade.FdOut(this.appleInBox[this.completedFillBox - 1]);
            //this.appleInBox.setAlpha(1);
            if(this.completedFillBox < 3){
                //this.isMoveApple = true;
                this.isTimeDelayApple = true;
            }else{
                this.isDisplayQuestion = true;
            }
            this.isDisplayBox = false;
        }
    }

    TimeDelayBox(){
        if(this.isTimeDelayBox){
            this.time.addEvent({
                delay: 1000,
                callback: ()=>{
                    this.isDisplayBox = true;
                },
                repeat: 0,
            })
            this.isTimeDelayBox = false;
        }
    }



    CreateAppleStatic(){
        for(var k = 0 ;k < 3; k++){
            for(var i = 0; i < 2; i++){
                for(var j = 0; j < 5; j++){               
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

    CreateApplePhysics(){
        this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X, APPLE.initPosY + RANGEBOX.Y , 'apple'));
        this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * 3, APPLE.initPosY + RANGEBOX.Y , 'apple'));
        this.appleArr.push(this.physics.add.image(APPLE.initPosX, APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y, 'apple'));
        this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEAPPLE.X * 4, APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y, 'apple'));
        this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEBOX.X, APPLE.initPosY + RANGEBOX.Y, 'apple'));
        this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEBOX.X + RANGEAPPLE.X * 4, APPLE.initPosY + RANGEBOX.Y, 'apple'));
        this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEBOX.X + RANGEAPPLE.X, APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y, 'apple'));
        this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEBOX.X * 2 + RANGEAPPLE.X * 2, APPLE.initPosY + RANGEBOX.Y, 'apple'));
        this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEBOX.X * 2, APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y, 'apple'));
        this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEBOX.X * 2 + RANGEAPPLE.X * 2, APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y, 'apple'));
        this.appleArr.push(this.physics.add.image(APPLE.initPosX + RANGEBOX.X * 2 + RANGEAPPLE.X * 4, APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y, 'apple'));

        for(var i = 0;i < this.appleArr.length; i++){
            this.appleArr[i].body.debugShowBody = false;
        }
    }

    CreateDestination(){
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
        this.destinationPosY.push(APPLE.initPosY );
        this.destinationPosY.push(APPLE.initPosY + RANGEAPPLE.Y);
        this.destinationPosY.push(APPLE.initPosY + RANGEAPPLE.Y);
    }

    CreateBox(){
        for(var i = 0; i < 3; i++){
            this.appleInBox.push(this.add.image(BOX.initPosX + RANGEBOX.X * i, BOX.initPosY, 'appleInBox'));
            this.appleInBox[i].setAlpha(0);
        }
        
        //this.box = this.add.image(BOX.initPosX, BOX.initPosY, 'box');
        for(var j = 0 ; j < 2; j++){
            for(var i = 0 ; i < 3; i++){
                this.box.push(this.add.image(BOX.initPosX + RANGEBOX.X * i, BOX.initPosY + RANGEBOX.Y * j, 'box'));
                this.box[i].setAlpha(1);
            }
        }
    }

    ReCreate(){
        this.appleArr = [];
        this.destinationPosX = [];
        this.destinationPosY = [];
        this.isMoveApple = false;
        this.Index = -1;
        this.isTimeDelayApple = true;
        this.isTimeDelayBox = false;
        this.isDisplayBox = false;
        this.fade = null;
        this.appleInBox = [];
        this.box = [];
        this.completedFillBox= 0;
        this.appleArrStatic = [];
        this.repeatTime = 3;
        this.isDisplayText = false;
        //this.question;
        this.isDisplayQuestion = false;
        this.inputForm = null;
        this.inputText = [];
        this.isDisplayResult = false;
        this.isRightResult = [false];
        this.isWannaReset = [false];
        this.checkInput = null;
        this.boxDisplay = null;
        this.isBallMove = false;
        this.isTimeDelayBallMove = false;
        this.ball = null;
        this.lastBall = null;
        this.firstQuestion = null;

        this.msg = {
            graphicArr : [],
            ContentArr : [],
        }
    }
    
}