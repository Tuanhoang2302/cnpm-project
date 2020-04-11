import 'phaser';
import FadeOutDestroy from '../../node_modules/phaser3-rex-plugins/plugins/fade-out-destroy';
import FadePlugin from '../../node_modules/phaser3-rex-plugins/plugins/fade-plugin.js';
import BubbleBox from '../helper/BubbleBox';
import CheckInputText from '../helper/CheckInputText';


var element = [];
var returnbtn;
var bubbleBox = [];
var inputText = [];
var cursorKeys;
var checkInput;
var dayChau = [];
var bb4;
var bubble4;
var bbgraphic = [];
var button;
var msggraphic = [];
var messageBox = [];
var isChangeScene = false;

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
        element.push(this.add.dom(975, 147 + 150 * i).createFromCache('nameform'));
        element[i].setAlpha(0);
        inputText.push(element[i].getChildByName('nameform'));
    }
    
    // create button
    returnbtn = this.add.dom(100, 100).createFromCache('return');
    
    // tạo thời gian delay 
    this.time.addEvent({
        delay: 2000,
        callback: ()=>{
            element[0].setAlpha(1);
            
        },
        loop: true
    })
    //element[0].setAlpha(1);
    //create bubble Box
    for(var i = 0; i < 3; i++){
        bbgraphic.push(this.add.graphics({ x: 830, y: 115 + 150 * i }));
        bubbleBox.push(new BubbleBox(this, 270, 65, 'There are          flowers', bbgraphic[i], 20));
        bubbleBox[i].createBox();
        if(i > 0){
          bbgraphic[i].setAlpha(0);          
        }
    }
    bb4 = this.add.graphics({x: 300, y: 550});
    bubble4 = new BubbleBox(this, 500, 100, 'Total number of flowers?', bb4, 40);
    bubble4.createBox();
    bb4.setAlpha(0);
    
    for(var i = 0; i < 4; i++){
        msggraphic.push(this.add.graphics({ x: 900, y: 190 + 150 * i}));
        messageBox.push(new BubbleBox(this, 200, 50, 'you are wrong', msggraphic[i], 20));
        messageBox[i].createBox();
        msggraphic[i].setVisible(false);
    }
    
    for(var i = 0; i < 3; i++){
        dayChau.push(this.add.image(320, 150 , 'dayChau'));
        dayChau[i].setScale(0.6);
    }
    
    this.cursorKeys = this.input.keyboard.createCursorKeys();
      
    // CheckInputText để check xem số mình nhập vào có đúng 10 không
    checkInput = new CheckInputText(this);

    //set Interactive cho button
    button = this.add.sprite(950, 600, 'button').setInteractive();
    button.setScale(0.5, 0.7);
    button.setAlpha(0);
    this.ButtonEvent(button);

    var line = this.add.graphics();
    line.lineBetween(0, 70, 1280, 70);
  }

  update(){

    this.MoveArrayOfBlock(0, 300, 150);
    this.MoveArrayOfBlock(1, 450, 300);
    
    if(isStayCheck[2]){
      checkInput.check(messageBox[2],inputText[2]);
      if(isMoving[0]){
        element[2].destroy();
        var txt = this.add.text(960, 130 + 150 * 2, '10', { fontFamily: 'Arial', fontSize: 30, color: '#000000'});
        this.FdOut(bb4, button);
        isMoving[0] = false;
        isStayCheck[2] = false;
      }
      
    }
    if(this.cursorKeys.right.isDown){
      checkInput.checkEnd(distance0, distance1);
    }
  }

  MoveArrayOfBlock(index, des, initPosY){
    if(isStayCheck[index]){    
        checkInput.check(messageBox[index],inputText[index]);
        if(isMoving[0]){
          if(dayChau[index].y == initPosY){
            element[index].destroy();
            var txt = this.add.text(960, 130 + 150 * index, '10', { fontFamily: 'Arial', fontSize: 30, color: '#000000'});
            
          } 
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

                this.FdOut(bbgraphic[index + 1]);
                this.time.addEvent({
                    delay: 1000,
                    callback: ()=>{
                        element[index + 1].setAlpha(1);
                        
                    },
                    loop: true
                })  

            }
        }
    }
  }

  ButtonEvent(button){
    button.on('pointerover', function (event) {
      this.setTint(0xff0000);
    });

    // còn ở ngoài tấm ảnh thì clear màu đó đi
    button.on('pointerout', function (event) {
      this.clearTint();
    });

    button.on('pointerdown', function (event) {
        
    }, this);
  }

  FdIn(obj1, obj2){
    this.tweens.add({
      targets: [obj1, obj2],
      alpha: 0,
      duration: 1000,
      ease: 'Power2'
    }, this);
  }

  FdOut(obj1, obj2){
    this.tweens.add({
      targets: [obj1, obj2],
      alpha: 1,
      duration: 1000,
      ease: 'Power2'
    }, this);
  }
  
};
