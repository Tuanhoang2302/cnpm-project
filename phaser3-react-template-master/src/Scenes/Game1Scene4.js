import 'phaser'
import Ball from '../gameObject/Ball';
import DisplayBox from '../helper/DisplayBox';
import FdInFdOut from '../helper/FdInFdOut';
import Block from '../gameObject/Block';

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

export default class Game1Scene4 extends Phaser.Scene
{
    constructor(){
        super('Scene4');
        //this.theNumber = Math.floor(Math.random() * (3 - 1 + 1) + 1);
        this.theNumber = 2;
        this.Index = 0;
        this.ball = null;
        this.lastBall = null;
        this.box = null;
        this.fade = null;
        this.numberOfQuestion = 2;
        this.orderQuestion = 1;

        this.block;
        this.inputForm;
        this.bubble = {
            contentArr : [],
            graphicArr : [],
          }

        this.isDisplayBlock = true;
        this.isDisplayText = true;
        this.isMoving = false;
        this.isDisplayQuestion = false;
        this.isDisplayResult = false;
        this.isBallMove = false;
    }

    preload(){
        this.load.html('answerform', 'src/assets/text/answerform.html');
        this.load.image('dayChau', 'src/assets/arrBlock.png');
        this.load.image('ball', 'src/assets/ball.png');
        this.load.image('ballHolder', 'src/assets/thanh.png');
    }

    create(){
        //console.log(theNumber);
        
        this.cameras.main.fadeIn(1500);
        var ballHolder = this.add.image(630, 25, 'ballHolder');
        this.ball = new Ball();
        this.fade = new FdInFdOut(this);

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
       
        setTimeout(() => {
            this.DisplayText();
        }, 1000);

        setTimeout(() => {
            this.BlockMove();
        }, 3000);
        
        this.DisplayQuestion();
        //DisplayResult();
        //BallMove();
    }

    DisplayText(){
        if(this.isDisplayText){
            this.box.displayBubbleBox(BUBBLE.STARTPOSX, BUBBLE.STARTPOSY + 150 * (this.Index), BUBBLE.WIDTH, BUBBLE.HEIGHT, 
                '10 blocks', BUBBLE.FONTTEXT, this.bubble.graphicArr, this.bubble.contentArr, this.fade);  

            this.isDisplayText = false;

            if(this.Index < this.theNumber - 1){
                this.isMoving = true;
            }else{
                this.isDisplayQuestion = true;
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
                    this.isDisplayText = true;
                    this.isDisplayBlock = true;
                }
            }
        }
    }

    DisplayQuestion(){
        if(this.isDisplayQuestion){
            if(this.orderQuestion == 1){
                this.box.displayBubbleBox(300, 560, 500, 80, 'How many bar are there?', 40, this.bubble.graphicArr, this.bubble.contentArr, this.fade);
                setTimeout(() => {
                    this.inputForm = this.add.dom(960, 600).createFromCache('answerform');
                }, 1000);
                
            }
            
            this.isDisplayQuestion = false;
        }
    }
}