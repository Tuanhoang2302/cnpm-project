import 'phaser'
import Ball from '../gameObject/Ball';
import DisplayBox from '../helper/DisplayBox';
import FdInFdOut from '../helper/FdInFdOut';
import Block from '../gameObject/Block';
import CheckInputText from '../helper/CheckInputText';
import {isDisplayBorder} from '../helper/CheckInputText';

const BLOCK = {
    STARTPOSX : 250,
    STARTPOSY : 120
}

const BUBBLE = {
    STARTPOSX : 600,
    STARTPOSY : 85,
    WIDTH : 270,
    HEIGHT : 65,
    FONTTEXT : 40
}

export var isWannaReset4 = [false];
export default class Game1Scene4 extends Phaser.Scene
{
    constructor(){
        super('Scene4');
        //this.theNumber = Math.floor(Math.random() * (3 - 2 + 1) + 2);
        this.theNumber = 3;
        this.Index = 0;
        this.ball = null;
        this.lastBall = null;
        this.box = null;
        this.fade = null;
        this.orderQuestion = 1;
        this.checkInput = null;
        this.scene5 = false;
        this.border = [];

        this.block;
        this.inputForm;
        this.inputText;
        this.bubble = {
            contentArr : [],
            graphicArr : [],
        }

        this.isDisplayBlock = true;
        this.isDisplayText = true;
        this.isMoving = false;
        this.isDisplayQuestion = [false];
        this.isDisplayResult = false;
        this.isPlayTilEnd = false;
        this.isWannaReset=[false];
        this.isBallMove = false;
        this.isDisplayNextQuestion = [false];
        
    }

    preload(){
        this.load.html('answerform', 'src/assets/text/answerform.html');
        this.load.image('dayChau', 'src/assets/arrBlock.png');
        this.load.image('ball', 'src/assets/ball.png');
        this.load.image('ballHolder', 'src/assets/thanh.png');
        this.load.image('border', 'src/assets/border.png');
    }

    create(){
        //console.log(theNumber);
        this.ReCreate();
        this.cameras.main.fadeIn(1500);
        var ballHolder = this.add.image(540, 16, 'ballHolder');
        this.ball = new Ball();
        this.fade = new FdInFdOut(this);
        this.checkInput = new CheckInputText(this);

        this.ball.create(this, 770, 15);
        this.ball.create(this, 740, 15);
        this.ball.create(this, 710, 15);
        for(var i = 0; i < 2; i++){
            this.lastBall = this.ball.create(this, 310 + 30 * i, 15);    
        }
        this.box = new DisplayBox(this);

        
        this.block = (new Block()).createArrayBlock(this, BLOCK.STARTPOSX, BLOCK.STARTPOSY);
        for(var i = 0; i < this.theNumber; i++){
            this.border.push(this.add.image(BLOCK.STARTPOSX, BLOCK.STARTPOSY * (i+ 1), 'border'));
            this.border[i].setVisible(0);
        }
        
        var line = this.add.graphics();
        line.lineBetween(0, 50, 1280, 50);         
    }

    update(){
        //console.log(this.inputText.value);
        isWannaReset4[0] = this.isWannaReset[0];
        setTimeout(() => {
            this.DisplayText();
        }, 1000);

        setTimeout(() => {
            this.BlockMove();
        }, 2000);
        
        setTimeout(() => {
            this.DisplayQuestion();
        }, 5000);
        
        setTimeout(() => {
            this.DisplayResult();
        }, 6050);

        this.WannaReset();

        setTimeout(() => {
           this.BallMove() 
        }, 7100);
        
    }






    DisplayText(){
        if(this.isDisplayText){
            this.box.displayBubbleBox(BUBBLE.STARTPOSX, BUBBLE.STARTPOSY + 120 * (this.Index), BUBBLE.WIDTH, BUBBLE.HEIGHT, 
                '10 blocks', BUBBLE.FONTTEXT, this.bubble.graphicArr, this.bubble.contentArr, this.fade);  

            this.isDisplayText = false;

            if(this.Index < this.theNumber - 1){
                setTimeout(() => {
                    this.isMoving = true;
                }, 1000);
                //this.isMoving = true;
            }else{
                this.isDisplayQuestion[0] = true;
            }
        }
    }

    BlockMove(){
        if(this.isMoving){
            if(this.isDisplayBlock){
                var newBlock = (new Block()).createArrayBlock(this, BLOCK.STARTPOSX, BLOCK.STARTPOSY * (this.Index + 1));
                this.isDisplayBlockByReplace = false;
            }

            if(this.block.y != BLOCK.STARTPOSY * (this.Index + 2)){
                this.block.y += 5;
            }else{
                this.isMoving = false;
                if(this.Index < this.theNumber - 1){
                    this.Index++;
                    this.isDisplayBlock = true;
                   
                    this.isDisplayText = true;
                }
            }
        }
    }

    DisplayQuestion(){
        if(this.isDisplayQuestion[0]){
            this.add.image(BLOCK.STARTPOSX, BLOCK.STARTPOSY * this.theNumber, 'dayChau');
            if(this.orderQuestion == 1){
                this.AddQuesTion(100, 440, 850, 480, 'How many bars are there in total?');
            }else if(this.orderQuestion == 2){
                //this.box.displayBubbleBox(300, 680, 500, 80, 'How many blocks are there?', 40, this.bubble.graphicArr, this.bubble.contentArr, this.fade);
                this.AddQuesTion(100, 570, 850, 610, 'How many blocks are there?');
            }
        }
    }

    DisplayResult(){
        if(this.isDisplayResult){
           if(this.orderQuestion == 1){
                this.AddResult(770, 440, this.theNumber);
           }else{
               this.AddResult(770, 570, this.theNumber * 10);
           }
        }
    }

    WannaReset(){
        if(this.isPlayTilEnd){
            if(this.isWannaReset[0]){
                this.time.addEvent({
                    delay: 1300,
                    callback: ()=>{
                        this.scene.start('Reset');     
                    },
                    loop: true
                })
            }
        }
    }

    BallMove(){
        if(this.isWannaReset[0] == false){
            if(this.isBallMove){
                if(this.lastBall.x < 680){
                    this.lastBall.x +=3;
                }else{
                    this.isBallMove = false;
                }
            }
        }
    }



    AddQuesTion(BubblePosX, BubblePosY, inputFormPosX, inputFormPosY, txt){
        this.box.displayBubbleBox(BubblePosX, BubblePosY, 600, 80, txt, 35, this.bubble.graphicArr, this.bubble.contentArr, this.fade);
        setTimeout(() => {
            this.inputForm = this.add.dom(inputFormPosX, inputFormPosY).createFromCache('answerform');
            this.inputText = this.inputForm.getChildByName('answerform');
            this.inputText.focus();
        }, 1000);
        this.isDisplayQuestion[0] = false;
        this.isDisplayResult = true;
    }

    AddResult(ResultPosX, ResultPosY, desiredResult){
        this.checkInput.check(null, null, this.inputText, this.isDisplayNextQuestion, this.isWannaReset, desiredResult);
        if(isDisplayBorder[0]){
            for(var i = 0; i < this.theNumber; i++){
                this.border[i].setVisible(1);
            }
        }else{
            for(var i = 0; i < this.theNumber; i++){
                this.border[i].setVisible(0);
            }
        }
        if(this.isDisplayNextQuestion[0]){    
            this.inputForm.destroy();
            //this.box.displayBubbleBox(ResultPosX, ResultPosY, 80, 80, (desiredResult).toString(), 40, this.bubble.graphicArr, this.bubble.contentArr, this.fade);

            if(this.orderQuestion == 1){
                this.box.displayBubbleBox(ResultPosX, ResultPosY, 270, 80, (desiredResult).toString() + " = " + (desiredResult).toString() + " tens", 40, this.bubble.graphicArr, this.bubble.contentArr, this.fade);
                setTimeout(() => {
                    this.isDisplayQuestion[0] = true;  
                    this.isDisplayNextQuestion[0] = false;
                }, 1000);
            }else{
                this.box.displayBubbleBox(ResultPosX, ResultPosY, 80, 80, (desiredResult).toString(), 40, this.bubble.graphicArr, this.bubble.contentArr, this.fade);
                this.isPlayTilEnd = true;
                this.isDisplayQuestion[0] = false;
                this.isBallMove = true;
            }
            this.orderQuestion++;
            this.isDisplayResult = false;  
        }
    }

    ReCreate(){
        //this.theNumber = Math.floor(Math.random() * (3 - 2 + 1) + 2);
        this.theNumber = 3;
        this.Index = 0;
        this.ball = null;
        this.lastBall = null;
        this.box = null;
        this.fade = null;
        this.orderQuestion = 1;
        this.checkInput = null;
        this.border = [];

        this.block;
        this.inputForm;
        this.inputText;
        this.bubble = {
            contentArr : [],
            graphicArr : [],
        }

        this.isDisplayBlock = true;
        this.isDisplayText = true;
        this.isMoving = false;
        this.isDisplayQuestion = [false];
        this.isDisplayResult = false;
        this.isPlayTilEnd = false;
        this.isWannaReset=[false];
        this.isBallMove = false;
        this.isDisplayNextQuestion = [false];

    }
}