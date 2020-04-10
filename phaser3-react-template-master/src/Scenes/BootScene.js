import 'phaser';

import BubbleBox from '../helper/BubbleBox';
import CheckInputText from '../helper/CheckInputText';
import BackgroundGame from '../Config/BackgroundGame';

var element = [];
var returnbtn;
var bubbleBox = [];
var inputText = [];
var cursorKeys;
var checkInput;
var dayChau = [];
var messageBox = [];
var isCreated = false;
var bb4;
var bbgraphic = [];
var msggraphic = [];
var m;
export var isStayCheck = [true, false, false];
export var isMoving=[false];

export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }
 
  preload () {
    this.load.html('nameform', 'src/assets/text/nameform.html');  
    this.load.html('return', 'src/assets/text/return.html');  
    //this.load.image('Chau', 'src/assets/chau.png');
    this.load.image('button', 'src/assets/button.png');
    this.load.image('dayChau', 'src/assets/dayChau.png');
  }
    
  create () {
    
    // tạo hiệu ứng chuyển cảnh
    this.cameras.main.fadeIn(2000);

    //cái này kiểu tạo 1 form có sẵn từ file html khác ý, ở đay file html dùng tên là nameform và name attribute của nó là nameform(xem trong file nameform.html)
    for(var i = 0; i < 3; i++){
        element.push(this.add.dom(965, 145 + 150 * i).createFromCache('nameform'));
        element[i].setVisible(false);
        inputText.push(element[i].getChildByName('nameform'));
    }
    
    // create button
    returnbtn = this.add.dom(100, 100).createFromCache('return');
    
    // tạo thời gian delay 
    this.time.addEvent({
        delay: 2000,
        callback: ()=>{
            element[0].setVisible(true);
            //element2.setVisible(true);
        },
        loop: true
    })
    
    //create bubble Box
    for(var i = 0; i < 3; i++){
        bbgraphic.push(this.add.graphics({ x: 830, y: 120 + 150 * i }));
        bubbleBox.push(new BubbleBox(this, 250, 50, 'There are          flowers', bbgraphic[i], 20));
        bubbleBox[i].createBox();
        if(i > 0){
          bbgraphic[i].setVisible(false);          
        }
    }
    
    for(var i = 0; i < 4; i++){
        msggraphic.push(this.add.graphics({ x: 770, y: 170 + 150 * i}));
        messageBox.push(new BubbleBox(this, 250, 50, 'you are wrong', msggraphic[i], 20));
        messageBox[i].createBox();
        msggraphic[i].setVisible(false);
    }
    
    for(var i = 0; i < 3; i++){
        dayChau.push(this.add.image(320, 150, 'dayChau'));
        dayChau[i].setScale(0.6);
    }
    
    this.cursorKeys = this.input.keyboard.createCursorKeys();
      
    // CheckInputText để check xem số mình nhập vào có đúng 10 không
    checkInput = new CheckInputText(this);

    //set Interactive cho button
    var button = this.add.sprite(700, 600, 'button').setInteractive();
    button.setScale(0.5, 0.5);

    /*
        tạo button event 
        nhớ là phải cho ảnh set Interactive thì mới dùng được 
    */
    //nếu con trỏ chuột ở trên tâm ảnh thì set màu đỏ
    button.on('pointerover', function (event) {
      this.setTint(0xff0000);
    });

    // còn ở ngoài tấm ảnh thì clear màu đó đi
    button.on('pointerout', function (event) {
      this.clearTint();
    });

    button.on('pointerdown', function (event) {
        bbgraphic[0].setVisible(false);
        element[0].destroy();
        
    });

    var line = this.add.graphics();
    line.lineBetween(0, 70, 1280, 70);
  }

  update(){
    
    this.MoveArrayOfBlock(0, 300);
    this.MoveArrayOfBlock(1, 450);
    
    if(isStayCheck[2]){
      checkInput.check(messageBox[2],inputText[2]);
      if(isMoving[0]){
        this.time.addEvent({
          delay: 1000,
          callback: ()=>{
            //bb4.setVisible(true);
            isMoving[0]= false;
              
          },
          loop: true
          });
      }
      
    }
    if(this.cursorKeys.right.isDown){
      checkInput.checkEnd(distance0, distance1);
    }
  }

  MoveArrayOfBlock(index, des){
    if(isStayCheck[index]){    
        checkInput.check(messageBox[index],inputText[index]);
        if(isMoving[0]){
            if(index == 0){
                dayChau[index].y +=2;
                dayChau[index + 1].y += 2 ;
            }else{
                dayChau[index].y +=2;
            }
            if(dayChau[index].y == des){
                isStayCheck[index] = false;
                isStayCheck[index + 1] = true;
                isMoving[0] = false;
          
                bbgraphic[index + 1].setVisible(true);
                element[index + 1].setVisible(true);

            }
        }
    }
  }

  
};
