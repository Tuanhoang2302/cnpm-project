import 'phaser';
import FadeOutDestroy from '../../node_modules/phaser3-rex-plugins/plugins/fade-out-destroy';
import FadePlugin from '../../node_modules/phaser3-rex-plugins/plugins/fade-plugin.js';
import BubbleBox from '../helper/BubbleBox';
import CheckInputText from '../helper/CheckInputText';

var Index;
var returnbtn;
var checkInput;
var cursorKeys;
var quoteArr = [];
var inputTextArr = [];
var elementArr = [];
var dayChau = [];

var bubble4;
var bb4;
var rsltPanelGrphic = [];
var resultPanel = [];

var button;
var msggraphic = [];
var messageBox = [];

var isDisplayResult = false;
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
    this.cameras.main.fadeIn(1000);

    //cái này kiểu tạo 1 form có sẵn từ file html khác ý, ở đay file html dùng tên là nameform và name attribute của nó là nameform(xem trong file nameform.html)
    Index = 0;
    
    for(var i = 0; i < 3; i++){
      var element = this.add.dom(975, 147 + 150 * i).createFromCache('nameform');
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

    this.displayBubbleBox(830,115, 270, 65, 'There are          flowers', 20);
    
    for(var i = 0; i < 4; i++){
        msggraphic.push(this.add.graphics({ x: 900, y: 190 + 150 * i}));
        messageBox.push(new BubbleBox(this, 200, 50, '', msggraphic[i], 20));
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
    console.log(inputTextArr[1].value);
    
    if(Index <= 1){
      this.MoveArrayOfBlock(Index, 300 + 150 * Index, 150 + 150 * Index);
    }
    this.DisplayQuestion();
    //this.TotalOfFlower();
    
  }

  MoveArrayOfBlock(index, des, initPosY){
    if(isStayCheck[index]){    
      checkInput.check(messageBox[index],inputTextArr[index]);
      if(isMoving[0]){
        if(dayChau[index].y == initPosY){
          elementArr[index].destroy();
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
          Index++;
          this.displayBubbleBox(830, 115 + ((Index) * 150), 270, 65, 'There are          flowers', 20);
          
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

  displayBubbleBox(x, y, bubbleWidth, bubbleHeight, qoute, sizeFont){
    var bbgraphic = this.add.graphics({ x: x, y: y});
    var bubbleBox = new BubbleBox(this, bubbleWidth, bubbleHeight, '', bbgraphic, 20);
    bubbleBox.createBox();
    bbgraphic.setAlpha(0);

    var bubblePadding = 10;
    var content = this.add.text(0, 0, qoute, { fontFamily: 'Arial', fontSize: sizeFont, color: '#000000', align: 'center', wordWrap: { width: bubbleWidth - (bubblePadding * 2) } });
    var b = content.getBounds();
    content.setPosition(bbgraphic.x + (bubbleWidth / 2) - (b.width / 2), bbgraphic.y + (bubbleHeight / 2) - (b.height / 2));
    content.setAlpha(0);
    this.FdOut(bbgraphic, content);
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
      this.TotalOfFlower();
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

  DisplayQuestion(){
    if(isStayCheck[2]){
      checkInput.check(messageBox[2],inputTextArr[2]);
      if(isMoving[0]){
        elementArr[2].destroy();
        var txt = this.add.text(960, 130 + 150 * 2, '10', { fontFamily: 'Arial', fontSize: 30, color: '#000000'}); 
        this.displayBubbleBox(300, 550, 500, 100, 'Total number of flowers?', 40);
        this.FdOut(button);
        isMoving[0] = false;
        isStayCheck[2] = false;
        isDisplayResult = true;
      }  
    }
  }

  TotalOfFlower(){
    if(isDisplayResult){
      for(var i = 0; i < 3; i++){
        this.FdIn(bbgraphic[i], txt);
        this.FdIn(button);
      }
    }
  }
  
};
