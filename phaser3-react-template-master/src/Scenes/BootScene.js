import 'phaser';
import FadeOutDestroy from '../../node_modules/phaser3-rex-plugins/plugins/fade-out-destroy';
import FadePlugin from '../../node_modules/phaser3-rex-plugins/plugins/fade-plugin.js';
import BubbleBox from '../helper/BubbleBox';
import CheckInputText from '../helper/CheckInputText';
import FdInFdOut from '../helper/FdInFdOut';
import MessageBox from  '../helper/MessageBox';
import DisplayBox from '../helper/DisplayBox';

var Index;
var returnbtn;
var checkInput;
var cursorKeys;
var fade;
var box;
var button;
var theNumber = Math.floor(Math.random() * (3 - 1 + 1) + 1);

var contentArr = [];
var txtArr = [];
var bbgraphicArr = [];
var quoteArr = [];
var inputTextArr = [];
var elementArr = [];
var dayChau = [];
var msggraphicArr = [];
var msgContentArr = [];

var intilizeCompleted = false;
var isDisplayResult = false;
var isChangeScene = false;
export var isStayCheck = [true, false, false];
export var isMoving=[false];

const elementStartPoxX = 975;
const elementStartPoxY = 147;

const BubbleStartPosX = 830;
const BubbleStartPosY = 115;
const BublleWidth = 270;
const BublleHeight = 65;
const fontTextBubble = 20;

const MessageStartPosX = 900;
const MessageStartPosY = 200;
const MessageWidth = 200;
const MessageHeight = 50;
const fontTextMessage = 20;

const txtStartPosX = 960;
const txtStartPosY = 130;
const txtFont = 30;

const BlockStartPosX = 320;
const BlockStartPosY = 150;

export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }
 
  preload () {
    this.load.html('nameform', 'src/assets/text/nameform.html');  
    this.load.html('return', 'src/assets/text/return.html');  
    //this.load.image('Chau', 'src/assets/chau.png');
    this.load.image('button', 'src/assets/next.png');
    this.load.image('dayChau', 'src/assets/arrBlock.png');
  }
    

  create () {
    console.log(theNumber);
    
    // tạo hiệu ứng chuyển cảnh
    this.cameras.main.fadeIn(1000);
    fade = new FdInFdOut(this);
    box = new DisplayBox(this);
    //cái này kiểu tạo 1 form có sẵn từ file html khác ý, ở đay file html dùng tên là nameform và name attribute của nó là nameform(xem trong file nameform.html)
    Index = 0;
    
    for(var i = 0; i < theNumber; i++){
      var element = this.add.dom(elementStartPoxX, elementStartPoxY + 150 * i).createFromCache('nameform');
      element.setAlpha(0);
      var inputText = element.getChildByName('nameform');
      inputTextArr.push(inputText);
      elementArr.push(element);
    }

    this.time.addEvent({
        delay: 1000,
        callback: ()=>{
            elementArr[0].setAlpha(1);
            inputTextArr[0].focus();
            
        },
        loop: true
    })

    box.displayBubbleBox(BubbleStartPosX, BubbleStartPosY, BublleWidth, BublleHeight, 'There are          flowers', fontTextBubble, bbgraphicArr, contentArr, fade);
    
    for(var i = 0; i < theNumber; i++){
      box.displayMessageBox(MessageStartPosX, MessageStartPosY + 150 * i, MessageWidth, MessageHeight, 'There are 10 blocks', fontTextMessage, msggraphicArr, msgContentArr);
    }

    for(var i = 0; i < theNumber; i++){
        dayChau.push(this.add.image(BlockStartPosX, BlockStartPosY, 'dayChau'));
    }
    
    this.cursorKeys = this.input.keyboard.createCursorKeys();
      
    // CheckInputText để check xem số mình nhập vào có đúng 10 không
    checkInput = new CheckInputText(this);

    //set Interactive cho button
    button = this.add.sprite(950, 600, 'button').setInteractive();
    button.setScale(1.5, 1.5);
    button.setAlpha(0);
    this.ButtonEvent(button);

    var line = this.add.graphics();
    line.lineBetween(0, 70, 1280, 70);
    

  }

  update(){
    console.log(Index);
    
    if(theNumber == 3){
      if(Index <= 1){
        this.MoveArrayOfBlock(Index, 300 + 150 * Index, 150 + 150 * Index);
      }
    }else if(theNumber == 2){
      if(Index <= 0)
        this.MoveArrayOfBlock(Index, 300 + 150 * Index, 150 + 150 * Index);
    }
    this.DisplayQuestion();
    this.DisplayResult();
    
  }

  MoveArrayOfBlock(index, des, initPosY){
    if(isStayCheck[index]){    
      checkInput.check(msggraphicArr[index], msgContentArr[index],inputTextArr[index]);
      if(isMoving[0]){
        if(dayChau[index].y == initPosY){
          elementArr[index].destroy();
          var txt = this.add.text(txtStartPosX, txtStartPosY + 150 * index, '10', { fontFamily: 'Arial', fontSize: txtFont, color: '#000000'});  
          txtArr.push(txt);
        } 
        if(index == 0 && theNumber == 3){
          dayChau[index].y +=2;
          dayChau[index + 1].y += 2 ;
        }else{
          dayChau[index].y +=2;
        }

        if(dayChau[index].y == des){
          isStayCheck[index] = false;
          isStayCheck[index + 1] = true;
          isMoving[0] = false;
          Index++;
    
          box.displayBubbleBox(BubbleStartPosX, BubbleStartPosY + ((Index) * 150), BublleWidth, BublleHeight, 'There are          flowers', fontTextBubble, bbgraphicArr, contentArr, fade);
          
          this.time.addEvent({
            delay: 1000,
            callback: ()=>{
              elementArr[Index].setAlpha(1);
              inputTextArr[Index].focus();
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
      isDisplayResult = true;
    }, this);
  }


  DisplayQuestion(){
    if(isStayCheck[theNumber - 1]){
      checkInput.check(msggraphicArr[theNumber - 1], msgContentArr[theNumber - 1],inputTextArr[theNumber - 1]);
      if(isMoving[0]){
        elementArr[theNumber - 1].destroy();
        var txt = this.add.text(txtStartPosX, txtStartPosY + 150 * (theNumber - 1), '10', { fontFamily: 'Arial', fontSize: txtFont, color: '#000000'}); 
        txtArr.push(txt);
        box.displayBubbleBox(300, 560, 500, 80, 'Total number of flowers?', 40, bbgraphicArr, contentArr, fade);
        fade.FdOut(button);
        isMoving[0] = false;
        isStayCheck[theNumber - 1] = false;
        isDisplayResult = true;
      }  
    }
  }

  DisplayResult(){
    if(isDisplayResult){
      if(intilizeCompleted){
        for(var i = theNumber + 1; i < theNumber * 2 + 1; i++){
          if(bbgraphicArr[i].y != 560){
            bbgraphicArr[i].y += 2;
            contentArr[i].y += 2;
          }
        }

        if(bbgraphicArr[0].y == 560){
          console.log("hello");
          
          for(var i = theNumber + 1; i < theNumber * 2 + 1; i++){
            fade.FdIn(bbgraphicArr[i]);
          }
          box.displayBubbleBox(960, 560, 80, 80, '30', 40, bbgraphicArr, contentArr, fade);
          isDisplayResult = false;
        }
      }
    }
  }

  TotalOfFlower(){
      for(var i = 0; i < theNumber; i++){
        fade.FdIn(bbgraphicArr[i], txtArr[i]);
        fade.FdIn(button, contentArr[i]);
        box.displayBubbleBox(960, 110 + 150 * i, 80, 80, '10', 40, bbgraphicArr, contentArr, fade);
      }
      this.time.addEvent({
        delay: 2000,
        callback: ()=>{
            intilizeCompleted = true;
        },
        loop: true
    })
  }
  
};
