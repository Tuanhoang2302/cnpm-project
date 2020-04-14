import 'phaser';
import BubbleBox from '../helper/BubbleBox';
import CheckInputText from '../helper/CheckInputText';
import FdInFdOut from '../helper/FdInFdOut';
import MessageBox from  '../helper/MessageBox';
import DisplayBox from '../helper/DisplayBox';
import Ball from '../gameObject/Ball';
import Block from '../gameObject/Block';

const ELEMENT = {
  STARTPOSX : 975,
  STARTPOSY : 147
}

const BUBBLE = {
  STARTPOSX : 830,
  STARTPOSY : 115,
  WIDTH : 270,
  HEIGHT : 65,
  FONTTEXT : 20
}

const MESSAGE = {
  STARTPOSX : 900,
  STARTPOSY : 200,
  WIDTH : 200,
  HEIGHT : 50,
  FONTTEXT : 20,
}

const TXT = {
  STARTPOSX : 960,
  STARTPOSY : 130,
  FONTTEXT : 30
}

const BLOCK = {
  STARTPOSX : 370,
  STARTPOSY : 150
}

export var isWannaReset2 = [false];

export default class BootScene extends Phaser.Scene {
  //hello = 2;
  constructor () {
    super('Boot'); 
    this.checkInput = null;
    this.fade = null;
    this.box = null;
    this.button = null;
    this.theNumber = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    this.ball = null;
    this.lastBall = null;
    this.Index = 0;
    this.element = null;
    this.inputText = null;

    this.contentArr = [];
    this.txtArr = [];
    this.bbgraphicArr = [];
    this.inputTextArr = [];
    this.elementArr = [];
    this.dayChau = [];
    this.msggraphicArr = [];
    this.msgContentArr = [];

    this.intilizeCompleted = false;
    this.isDisplayResult = false;
    this.isStayCheck = [true, false, false];
    this.isMoving=[false];
    this.isWannaReset=[false];
    this.isPlayTilEnd = false;
  }
  preload () {
    this.load.html('nameform', 'src/assets/text/nameform.html');  
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

    var ballHolder = this.add.image(630, 25, 'ballHolder');

    this.ball = new Ball();
    this.ball.create(this, 860, 24);
    for(var i = 0; i < 4; i++){
      this.lastBall = this.ball.create(this, 400 + 30 * i, 24);    
    }
    
    for(var i = 0; i < this.theNumber; i++){
      this.element = this.add.dom(ELEMENT.STARTPOSX, ELEMENT.STARTPOSY + 150 * i).createFromCache('nameform');
      this.element.setAlpha(0);
      this.inputText = this.element.getChildByName('nameform');
      this.inputTextArr.push(this.inputText);
      this.elementArr.push(this.element);
    }

    this.time.addEvent({
        delay: 1300,
        callback: ()=>{
            this.elementArr[0].setAlpha(1);
            this.inputTextArr[0].focus();
            
        },
        loop: true
    })

    this.box = new DisplayBox(this);
    this.box.displayBubbleBox(BUBBLE.STARTPOSX, BUBBLE.STARTPOSY, BUBBLE.WIDTH, BUBBLE.HEIGHT, 
                        'There are          blocks', BUBBLE.FONTTEXT, this.bbgraphicArr, this.contentArr, this.fade);    
    for(var i = 0; i < this.theNumber; i++){
      this.box.displayMessageBox(MESSAGE.STARTPOSX, MESSAGE.STARTPOSY + 150 * i, MESSAGE.WIDTH, MESSAGE.HEIGHT,
                            'There are 10 blocks', MESSAGE.FONTTEXT, this.msggraphicArr, this.msgContentArr);
    }

    for(var i = 0; i < this.theNumber; i++){
        this.dayChau.push((new Block()).createArrayBlock(this, BLOCK.STARTPOSX, BLOCK.STARTPOSY));
    }
          
    // CheckInputText để check xem số mình nhập vào có đúng 10 không
    this.checkInput = new CheckInputText(this);

    //set Interactive cho button
    this.button = this.add.sprite(950, 600, 'button').setInteractive();
    this.button.setScale(2, 2);
    this.button.setAlpha(0);
    this.ButtonEvent(this.button);

    var line = this.add.graphics();
    line.lineBetween(0, 70, 1280, 70);

    console.log(this.dayChau[0].y);
    
  }

  update(){
    //console.log(this.inputTextArr[0].value);
    //console.log(this.theNumber);
    isWannaReset2[0] = this.isWannaReset[0]; 
    if(this.theNumber != 1){
      if(this.Index <= this.theNumber - 2){
        console.log("hell");
        this.MoveArrayOfBlock(this.Index, 300 + 150 * this.Index, 150 + 150 * this.Index);
      }
    }
    this.DisplayQuestion();
    this.DisplayResult();
    this.WannaReset();
    //ball.isMovable(this,lastBall, isPlayTilEnd, isWannaReset, 'Scene3');
    this.BallMove();
  }







  MoveArrayOfBlock(index, des, initPosY){
    if(this.isStayCheck[index]){    
      //console.log(this.inputTextArr[0].value)
      this.checkInput.check(this.msggraphicArr[index], this.msgContentArr[index],this.inputTextArr[index], this.isMoving, this.isWannaReset, 10);
      if(this.isMoving[0]){
        if(this.dayChau[index].y == initPosY){
          this.elementArr[index].destroy();
          var txt = this.add.text(TXT.STARTPOSX, TXT.STARTPOSY + 150 * index, '10', { fontFamily: 'Arial', fontSize: TXT.FONTTEXT, color: '#000000'});  
          this.txtArr.push(txt);
        } 
        if(index == 0 && this.theNumber == 3){
          this.dayChau[index].y +=5;
          this.dayChau[index + 1].y += 5 ;
        }else{
          this.dayChau[index].y +=5;
        }
        
        if(this.dayChau[index].y == des){
          this.isStayCheck[index] = false;
          this.isStayCheck[index + 1] = true;
          this.isMoving[0] = false;
          this.Index++;
    
          this.box.displayBubbleBox(BUBBLE.STARTPOSX, BUBBLE.STARTPOSY + ((this.Index) * 150), BUBBLE.WIDTH, BUBBLE.HEIGHT, 
                              'There are          blocks', BUBBLE.FONTTEXT, this.bbgraphicArr, this.contentArr, this.fade);
          
          this.time.addEvent({
            delay: 1000,
            callback: ()=>{
              this.elementArr[this.Index].setAlpha(1);
              this.inputTextArr[this.Index].focus();
            },
            loop: true
          })
                 
        }
      }
    }
  }

  ButtonEvent(button){
    button.on('pointerover', function (event) {
      this.setTint(0xF5F5F5);
    });

    // còn ở ngoài tấm ảnh thì clear màu đó đi
    button.on('pointerout', function (event) {
      this.clearTint();
    });

    button.on('pointerdown', function (event) {
      this.TotalOfFlower();
      this.isDisplayResult = true;
    }, this);
  }

  DisplayQuestion(){
    if(this.isStayCheck[this.theNumber - 1]){
      this.checkInput.check(this.msggraphicArr[this.theNumber - 1], this.msgContentArr[this.theNumber - 1],this.inputTextArr[this.theNumber - 1], this.isMoving, this.isWannaReset, 10);
      if(this.isMoving[0]){
        this.elementArr[this.theNumber - 1].destroy();
        var txt = this.add.text(TXT.STARTPOSX, TXT.STARTPOSY + 150 * (this.theNumber - 1), '10', { fontFamily: 'Arial', fontSize: TXT.FONTTEXT, color: '#000000'}); 
        this.txtArr.push(txt);
        this.box.displayBubbleBox(300, 560, 500, 80, 'Total number of blocks?', 40, this.bbgraphicArr, this.contentArr, this.fade);
        this.fade.FdOut(this.button);
        this.isMoving[0] = false;
        this.isStayCheck[this.theNumber - 1] = false;
        this.isDisplayResult = true;
      }  
    }
  }

  DisplayResult(){
    //console.log(bbgraphicArr[0].y);
    if(this.isDisplayResult){
      if(this.intilizeCompleted){
        for(var i = this.theNumber + 1; i < this.theNumber * 2 + 1; i++){
          if(this.bbgraphicArr[i].y != 560){
            this.bbgraphicArr[i].y += 5;
            this.contentArr[i].y += 5;
          }
        }
        //console.log(bbgraphicArr[1].y);
        
        if(this.bbgraphicArr[this.theNumber + 1].y == 560){
          
          for(var i = this.theNumber + 1; i < this.theNumber * 2 + 1; i++){
            this.fade.FdIn(this.bbgraphicArr[i]);
          }
          this.box.displayBubbleBox(960, 560, 80, 80, (10 * this.theNumber).toString(), 40, this.bbgraphicArr, this.contentArr, this.fade);
          this.isDisplayResult = false;
          this.isPlayTilEnd = true;
        }
      }
    }
  }

  WannaReset(){
    if(this.isWannaReset[0]){
      if(this.isPlayTilEnd){
      this.time.addEvent({
        delay: 2000,
        callback: ()=>{
            //this.setVariabletoInitState();
            //this.ReCreate();
            this.scene.start('Reset');
        },
        loop: true
      })
    }
    }
  }

  TotalOfFlower(){
      for(var i = 0; i < this.theNumber; i++){
        this.fade.FdIn(this.bbgraphicArr[i], this.txtArr[i]);
        this.fade.FdIn(this.button, this.contentArr[i]);
        this.box.displayBubbleBox(960, 110 + 150 * i, 80, 80, '10', 40, this.bbgraphicArr, this.contentArr, this.fade);
      }
      this.time.addEvent({
        delay: 2000,
        callback: ()=>{
            this.intilizeCompleted = true;
        },
        loop: true
    })
  }

  BallMove(){
    if(this.isPlayTilEnd){
      if(this.isWannaReset[0] == false){
          
          if(this.lastBall.x < 830){
              //console.log(ball.x);
              this.lastBall.x +=3;
          }else{    
              this.time.addEvent({
                  delay: 2000,
                  callback: ()=>{
                      this.scene.start('Scene3');
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
    this.button = null;
    this.theNumber = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    this.ball = null;
    this.lastBall = null;
    this.Index = 0;
    this.element = null;
    this.inputText = null;
    isWannaReset2 = [false];
    
    this.contentArr = [];
    this.txtArr = [];
    this.bbgraphicArr = [];
    this.inputTextArr = [];
    this.elementArr = [];
    this.dayChau = [];
    this.msggraphicArr = [];
    this.msgContentArr = [];

    this.intilizeCompleted = false;
    this.isDisplayResult = false;
    this.isStayCheck = [true, false, false];
    this.isMoving=[false];
    this.isWannaReset=[false];
    this.isPlayTilEnd = false;
  }

  
};
