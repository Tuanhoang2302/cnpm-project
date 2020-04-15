import 'phaser';
import BubbleBox from '../helper/BubbleBox';
import CheckInputText from '../helper/CheckInputText';
import FdInFdOut from '../helper/FdInFdOut';
import MessageBox from  '../helper/MessageBox';
import DisplayBox from '../helper/DisplayBox';
import Ball from '../gameObject/Ball';
import Block from '../gameObject/Block';

const INPUT = {
  STARTPOSX : 818,
  STARTPOSY : 120
}

const BUBBLE = {
  STARTPOSX : 600,
  STARTPOSY : 85,
  WIDTH : 400,
  HEIGHT : 65,
  FONTTEXT : 30
}

const MESSAGE = {
  STARTPOSX : 800,
  STARTPOSY : 170,
  WIDTH : 200,
  HEIGHT : 50,
  FONTTEXT : 20,
}

const TXT = {
  STARTPOSX : 800,
  STARTPOSY : 95,
  FONTTEXT : 40
}

const BLOCK = {
  STARTPOSX : 250,
  STARTPOSY : 120
}

export var isWannaReset3 = [false];

export default class Game1Scene3 extends Phaser.Scene {
  //hello = 2;
  constructor () {
    super('Scene3'); 
    this.checkInput = null;
    this.fade = null;
    this.box = null;
    this.button = null;
    this.theNumber = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    this.ball = null;
    this.lastBall = null;
    this.Index = 0;
    this.inputForm = null;
    this.inputText = null;

    this.block = [];
    this.txtArr = [];
    this.bubble = {
      contentArr : [],
      graphicArr : [],
    }
    this.Input = {
      TextArr : [],
      formArr : [],
    }
    this.msg = {
      graphicArr : [],
      contentArr : [],
    }

    this.intilizeCompleted = false;
    this.isDisplayResult = false;
    this.isStayCheck = [true, false, false];
    this.isMoving=[false];
    this.isWannaReset=[false];
    this.isPlayTilEnd = false;
  }
  preload () {
    this.load.html('nameform', 'src/assets/text/nameform.html');  
    this.load.html('answerform', 'src/assets/text/answerform.html');  
    this.load.html('return', 'src/assets/text/return.html');  
    //this.load.image('Chau', 'src/assets/chau.png');
    this.load.image('button', 'src/assets/next.png');
    this.load.image('dayChau', 'src/assets/arrBlock.png');
    this.load.image('ballHolder', 'src/assets/thanh.png');
    this.load.image('ball', 'src/assets/ball.png');
  }
    

  create () {
    this.ReCreate();

    // tạo hiệu ứng chuyển cảnh
    this.cameras.main.fadeIn(1500);
    this.fade = new FdInFdOut(this);

    var ballHolder = this.add.image(540, 16, 'ballHolder');

    this.ball = new Ball();
    this.ball.create(this, 770, 15);
    this.ball.create(this, 740, 15);
    for(var i = 0; i < 3; i++){
      this.lastBall = this.ball.create(this, 310 + 30 * i, 15);    
    }
    
    for(var i = 0; i < this.theNumber; i++){
      this.inputForm = this.add.dom(INPUT.STARTPOSX, INPUT.STARTPOSY + 120 * i).createFromCache('nameform');
      this.inputForm.setAlpha(0);
      this.inputText = this.inputForm.getChildByName('nameform');
      this.Input.TextArr.push(this.inputText);
      this.Input.formArr.push(this.inputForm);
    }
    this.inputForm = this.add.dom(840, 500).createFromCache('answerform');
    this.inputForm.setAlpha(0);
    this.inputText = this.inputForm.getChildByName('answerform');
    this.Input.TextArr.push(this.inputText);
    this.Input.formArr.push(this.inputForm);

    this.time.addEvent({
        delay: 1300,
        callback: ()=>{
            this.Input.formArr[0].setAlpha(1);
            this.Input.TextArr[0].focus();
            
        },
        loop: true
    })

    this.box = new DisplayBox(this);
    this.box.displayBubbleBox(BUBBLE.STARTPOSX, BUBBLE.STARTPOSY, BUBBLE.WIDTH, BUBBLE.HEIGHT, 
                        'There are         blocks', BUBBLE.FONTTEXT, this.bubble.graphicArr, this.bubble.contentArr, this.fade);    
    for(var i = 0; i < this.theNumber; i++){
      this.box.displayMessageBox(MESSAGE.STARTPOSX, MESSAGE.STARTPOSY + 120 * i, MESSAGE.WIDTH, MESSAGE.HEIGHT,
                            'There are 10 blocks', MESSAGE.FONTTEXT, this.msg.graphicArr, this.msg.contentArr);
    }
    this.box.displayMessageBox(950, 690, MESSAGE.WIDTH, MESSAGE.HEIGHT,
      "There are " + (10 * this.theNumber).toString() + " blocks", MESSAGE.FONTTEXT, this.msg.graphicArr, this.msg.contentArr);

    for(var i = 0; i < this.theNumber; i++){
        this.block.push((new Block()).createArrayBlock(this, BLOCK.STARTPOSX, BLOCK.STARTPOSY));
    }
      
    // CheckInputText để check xem số mình nhập vào có đúng 10 không
    this.checkInput = new CheckInputText(this);

    //set Interactive cho button
    var line = this.add.graphics();
    line.lineBetween(0, 50, 1280, 50);

    console.log(this.block[0].y);
    
  }

  update(){
    isWannaReset3[0] = this.isWannaReset[0];
    if(this.theNumber != 1){
      if(this.Index <= this.theNumber - 2){
        this.MoveArrayOfBlock(this.Index, BLOCK.STARTPOSY * 2 + BLOCK.STARTPOSY * this.Index, BLOCK.STARTPOSY + BLOCK.STARTPOSY * this.Index);
      }
    }
    this.DisplayQuestion();
    this.DisplayResult();
    this.WannaReset();
    this.BallMove();
  }







  MoveArrayOfBlock(index, des, initPosY){
    if(this.isStayCheck[index]){    
      //console.log(this.Input.TextArr[0].value)
      this.checkInput.check(this.msg.graphicArr[index], this.msg.contentArr[index],this.Input.TextArr[index], this.isMoving, this.isWannaReset, 10);
      if(this.isMoving[0]){
        if(this.block[index].y == initPosY){
          this.Input.formArr[index].destroy();
          var txt = this.add.text(TXT.STARTPOSX, TXT.STARTPOSY + 120 * index, '10', { fontFamily: 'Arial', fontSize: TXT.FONTTEXT, color: '#000000'});  
          this.txtArr.push(txt);
        } 
        if(index == 0 && this.theNumber == 3){
          this.block[index].y +=5;
          this.block[index + 1].y += 5 ;
        }else{
          this.block[index].y +=5;
        }
        
        if(this.block[index].y == des){
          this.isStayCheck[index] = false;
          this.isStayCheck[index + 1] = true;
          this.isMoving[0] = false;
          this.Index++;
    
          this.box.displayBubbleBox(BUBBLE.STARTPOSX, BUBBLE.STARTPOSY + ((this.Index) * 120), BUBBLE.WIDTH, BUBBLE.HEIGHT, 
                              'There are          blocks', BUBBLE.FONTTEXT, this.bubble.graphicArr, this.bubble.contentArr, this.fade);
          
          this.time.addEvent({
            delay: 1000,
            callback: ()=>{
              this.Input.formArr[this.Index].setAlpha(1);
              this.Input.TextArr[this.Index].focus();
            },
            loop: true
          })
                 
        }
      }
    }
  }

  DisplayQuestion(){
    if(this.isStayCheck[this.theNumber - 1]){
      this.checkInput.check(this.msg.graphicArr[this.theNumber - 1], this.msg.contentArr[this.theNumber - 1],this.Input.TextArr[this.theNumber - 1], this.isMoving, this.isWannaReset, 10);
      if(this.isMoving[0]){
        this.Input.formArr[this.theNumber - 1].destroy();
        var txt = this.add.text(TXT.STARTPOSX, TXT.STARTPOSY + 120 * (this.theNumber - 1), '10', { fontFamily: 'Arial', fontSize: TXT.FONTTEXT, color: '#000000'}); 
        this.txtArr.push(txt);

        this.box.displayBubbleBox(200, 460, 500, 80, 'Total number of blocks?', 40, this.bubble.graphicArr, this.bubble.contentArr, this.fade);

        this.isMoving[0] = false;
        this.isStayCheck[this.theNumber - 1] = false;
        this.isDisplayResult = true;
      }  
    }
  }

  DisplayResult(){
    //console.log(bubble.graphicArr[0].y);
    if(this.isDisplayResult){
      this.time.addEvent({
        delay: 1000,
        callback: ()=>{
          this.Input.formArr[this.theNumber].setAlpha(1);
          this.Input.TextArr[this.theNumber].focus();
        },
        loop: true
      })
      this.checkInput.check(this.msg.graphicArr[this.theNumber], this.msg.contentArr[this.theNumber],this.Input.TextArr[this.theNumber], this.isMoving, this.isWannaReset, (10 * this.theNumber));
      if(this.isMoving[0]){
        this.box.displayBubbleBox(780, 460, 80, 80, (10 * this.theNumber).toString(), 40, this.bubble.graphicArr, this.bubble.contentArr, this.fade);
        this.Input.formArr[this.theNumber].destroy();
        this.isDisplayResult = false;
        this.isPlayTilEnd = true;
      }
    }
  }

  WannaReset(){
    if(this.isWannaReset[0]){
      if(this.isPlayTilEnd){
      this.time.addEvent({
        delay: 2000,
        callback: ()=>{
            this.scene.start('Reset');
        },
        loop: true
      })
    }
    }
  }

  BallMove(){
    if(this.isPlayTilEnd){
      if(this.isWannaReset[0] == false){
          
          if(this.lastBall.x < 710){
              //console.log(ball.x);
              this.lastBall.x +=3;
          }else{    
              this.time.addEvent({
                  delay: 2000,
                  callback: ()=>{
                      this.scene.start('Scene4');
                      //isPlayTilEnd = false;
                      //this.scene.restart(false);
                  },
              loop: true
              })
          }
      }
  }
  }

  ReCreate(){
    this.checkInput = null;
    this.fade = null;
    this.box = null;
    this.theNumber = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    this.ball = null;
    this.lastBall = null;
    this.Index = 0;
    this.inputForm = null;
    this.inputText = null;
    isWannaReset3 = [false];
    
    this.bubble = {
      contentArr : [],
      graphicArr : [],
    }
    this.Input = {
      TextArr : [],
      formArr : [],
    }
    this.msg = {
      graphicArr : [],
      contentArr : [],
    }

    this.txtArr = [];
    this.block = [];

    this.intilizeCompleted = false;
    this.isDisplayResult = false;
    this.isStayCheck = [true, false, false];
    this.isMoving=[false];
    this.isWannaReset=[false];
    this.isPlayTilEnd = false;
  }

  
};