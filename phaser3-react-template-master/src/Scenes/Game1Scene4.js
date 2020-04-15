import 'phaser'
import Ball from '../gameObject/Ball';
import DisplayBox from '../helper/DisplayBox';
import FdInFdOut from '../helper/FdInFdOut';
import Block from '../gameObject/Block';
import CheckInputText from '../helper/CheckInputText';

const BLOCK = {
    STARTPOSX : 370,
    STARTPOSY : 150
}

const BUBBLE = {
    STARTPOSX : 830,
    STARTPOSY : 115,
    WIDTH : 270,
    HEIGHT : 65,
    FONTTEXT : 40
}

export var isWannaReset4 = [false];
export default class Game1Scene4 extends Phaser.Scene
{
    constructor(){
        super('Scene4');
        this.theNumber = Math.floor(Math.random() * (3 - 2 + 1) + 2);
        //this.theNumber = 3;
        this.Index = 0;
        this.ball = null;
        this.lastBall = null;
        this.box = null;
        this.fade = null;
        this.orderQuestion = 1;
        this.checkInput = null;

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
    }

    create(){
        //console.log(theNumber);
        this.ReCreate();
        this.cameras.main.fadeIn(1500);
        var ballHolder = this.add.image(630, 25, 'ballHolder');
        this.ball = new Ball();
        this.fade = new FdInFdOut(this);
        this.checkInput = new CheckInputText(this);

        this.ball.create(this, 860, 24);
        this.ball.create(this, 830, 24);
        this.ball.create(this, 800, 24);
        for(var i = 0; i < 2; i++){
            this.lastBall = this.ball.create(this, 400 + 30 * i, 24);    
        }
        this.box = new DisplayBox(this);

        
        this.block = (new Block()).createArrayBlock(this, BLOCK.STARTPOSX, BLOCK.STARTPOSY);
        

        var line = this.add.graphics();
        line.lineBetween(0, 70, 1280, 70);

                
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
        }, 4000);
        
        setTimeout(() => {
            this.DisplayResult();
        }, 5050);

        this.WannaReset();

        setTimeout(() => {
           this.BallMove() 
        }, 7100);
        
    }




    

    DisplayText(){
        if(this.isDisplayText){
            this.box.displayBubbleBox(BUBBLE.STARTPOSX, BUBBLE.STARTPOSY + 150 * (this.Index), BUBBLE.WIDTH, BUBBLE.HEIGHT, 
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
            if(this.orderQuestion == 1){
                this.AddQuesTion(200, 540, 960, 580, 'How many bars are there?');
            }else if(this.orderQuestion == 2){
                //this.box.displayBubbleBox(300, 680, 500, 80, 'How many blocks are there?', 40, this.bubble.graphicArr, this.bubble.contentArr, this.fade);
                this.AddQuesTion(200, 680, 960, 720, 'How many blocks are there?');
            }
            
            this.isDisplayQuestion[0] = false;
        }
    }

    DisplayResult(){
        if(this.isDisplayResult){
           if(this.orderQuestion == 1){
                this.AddResult(900, 540, this.theNumber);
           }else{
               this.AddResult(900, 680, this.theNumber * 10);
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
                    //this.scene.start('Reset'); 
            }
        }
    }

    BallMove(){
        if(this.isWannaReset[0] == false){
            if(this.isBallMove){
                if(this.lastBall.x < 770){
                    this.lastBall.x +=3;
                }else{
                    this.isBallMove = false;
                }
            }
        }
    }



    AddQuesTion(BubblePosX, BubblePosY, inputFormPosX, inputFormPosY, txt){
        this.box.displayBubbleBox(BubblePosX, BubblePosY, 550, 80, txt, 40, this.bubble.graphicArr, this.bubble.contentArr, this.fade);
        setTimeout(() => {
            this.inputForm = this.add.dom(inputFormPosX, inputFormPosY).createFromCache('answerform');
            this.inputText = this.inputForm.getChildByName('answerform');
            this.inputText.focus();
        }, 1000);                  
        this.isDisplayResult = true;
    }

    AddResult(ResultPosX, ResultPosY, desiredResult){
        this.checkInput.check(null, null, this.inputText, this.isDisplayNextQuestion, this.isWannaReset, desiredResult);
        if(this.isDisplayNextQuestion[0]){    
            this.inputForm.destroy();
            //this.box.displayBubbleBox(ResultPosX, ResultPosY, 80, 80, (desiredResult).toString(), 40, this.bubble.graphicArr, this.bubble.contentArr, this.fade);

            if(this.orderQuestion == 1){
                this.box.displayBubbleBox(ResultPosX, ResultPosY, 270, 80, (desiredResult).toString() + " = " + (desiredResult).toString() + " tens", 40, this.bubble.graphicArr, this.bubble.contentArr, this.fade);
                this.isDisplayQuestion[0] = true;  
                this.isDisplayNextQuestion[0] = false;
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
        this.theNumber = Math.floor(Math.random() * (3 - 2 + 1) + 2);
        //this.theNumber = 3;
        this.Index = 0;
        this.ball = null;
        this.lastBall = null;
        this.box = null;
        this.fade = null;
        this.orderQuestion = 1;
        this.checkInput = null;

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