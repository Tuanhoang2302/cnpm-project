import 'phaser';
import { Render } from 'matter-js';
import BubbleBox from '../helper/BubbleBox';
import CheckInputText from '../helper/CheckInputText';

var element1;
var element2;
var element3;
var bubbleBox1, bubbleBox2, bubbleBox3, bubbleBox4;
var inputText1;
var inputText2;
var inputText3;
var cursorKeys;
var checkInput;
var dayChau, dayChau1, dayChau2, dayChau3;
var messageBox3;
var messageBox1;
var messageBox2;
var isCreated = false;
var bb1, bb2, bb3, bb4;
var msg1, msg2, msg3;
var m;
export var isStayCheck = [true, false, false];
export var isMoving=[false];

export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }
 
  preload () {
    this.load.html('nameform', 'src/assets/text/nameform.html');  
    this.load.image('Chau', 'src/assets/chau.png');
    this.load.image('button', 'src/assets/button.png');
    this.load.image('dayChau', 'src/assets/dayChau.png');
  }
    
  create () {
    // tạo hiệu ứng chuyển cảnh
    this.cameras.main.fadeIn(2000);

    //cái này kiểu tạo 1 form có sẵn từ file html khác ý, ở đay file html dùng tên là nameform và name attribute của nó là nameform(xem trong file nameform.html)
    element1 = this.add.dom(865, 145).createFromCache('nameform');
    element2 = this.add.dom(865, 295).createFromCache('nameform');
    element3 = this.add.dom(865, 445).createFromCache('nameform');

    inputText1 = element1.getChildByName('nameform');
    inputText2 = element2.getChildByName('nameform');
    inputText3 = element3.getChildByName('nameform');
    element1.setVisible(false);
    element2.setVisible(false);
    element3.setVisible(false);

    // tạo thời gian delay 
    this.time.addEvent({
      delay: 2000,
      callback: ()=>{
        element1.setVisible(true);
        //element2.setVisible(true);
      },
      loop: true
      })

      bb1 = this.add.graphics({ x: 730, y: 120 });
      bubbleBox1 = new BubbleBox(this, 730, 120, 250, 50, 'There are          flowers', bb1);
      bubbleBox1.createBox();

      bb2 = this.add.graphics({ x: 730, y: 270 });
      bubbleBox2 = new BubbleBox(this, 730, 270, 250, 50, 'There are          flowers', bb2);
      bubbleBox2.createBox();
      bb2.setVisible(false);

      bb3 = this.add.graphics({ x: 730, y: 420 });
      bubbleBox3 = new BubbleBox(this, 730, 420, 250, 50, 'There are          flowers', bb3);
      bubbleBox3.createBox();
      bb3.setVisible(false);

      bb4 = this.add.graphics({ x: 730, y: 600 });
      bubbleBox4 = new BubbleBox(this, 730, 420, 250, 50, 'There are          flowers', bb4);
      bubbleBox4.createBox();
      bb4.setVisible(false);

      msg1 = this.add.graphics({ x: 770, y: 170 });
      messageBox1 = new BubbleBox(this, 770, 170, 250, 50, 'you are wrong', msg1);
      messageBox1.createBox();
      msg1.setVisible(false);

      msg2 = this.add.graphics({ x: 770, y: 320 });
      messageBox2 = new BubbleBox(this, 770, 320, 250, 50, 'you are wrong', msg2);
      messageBox2.createBox();
      msg2.setVisible(false);

      msg3 = this.add.graphics({ x: 770, y: 470 });
      messageBox3 = new BubbleBox(this, 770, 470, 250, 50, 'you are wrong', msg3);
      messageBox3.createBox();
      msg3.setVisible(false);
      
      
      dayChau = this.add.image(320, 150, 'dayChau');
      dayChau.setScale(0.6);
      //dayChau.destroy();
      dayChau1 = this.add.image(320, 150, 'dayChau');
      dayChau1.setScale(0.6);
      dayChau2 = this.add.image(320, 150, 'dayChau');
      dayChau2.setScale(0.6);
      
      
      //dayChau3.setVisible(false);
      //groupChau.push(this.physics.add.image(200, 100, 'Chau'));
       
      this.cursorKeys = this.input.keyboard.createCursorKeys();
      
    // CheckInputText để check xem số mình nhập vào có đúng 10 không
    checkInput = new CheckInputText(this);

    //set Interactive cho button
    var button = this.add.sprite(800, 800, 'button').setInteractive();

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

  }

  update(){
    
    if(isStayCheck[0]){    
      checkInput.check(messageBox1,inputText1);
      if(isMoving[0]){
        dayChau.y +=1;
        dayChau1.y += 1 ;
        if(dayChau.y == 300){
          isStayCheck[0] = false;
          isStayCheck[1] = true;
          isMoving[0] = false;
          bb2.setVisible(true);
          element2.setVisible(true);
          //element1.destroy();
        }
      }
    }
    
    
    if(isStayCheck[1]){    
      //console.log(dayChau.y);

      checkInput.check(messageBox2,inputText2);
      if(isMoving[0]){
        dayChau1.y +=1;
        console.log(dayChau1.y);
        if(dayChau1.y == 450){
          isStayCheck[1] = false;
          isStayCheck[2] = true;
          isMoving[0] = false;
          
          bb3.setVisible(true);
          element3.setVisible(true);

        }
      }
    }
    //console.log(isMoving);
    
    if(isStayCheck[2]){
      checkInput.check(messageBox3,inputText3);
      if(isMoving[0]){
        this.time.addEvent({
          delay: 1000,
          callback: ()=>{
            bb4.setVisible(true);
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
};
