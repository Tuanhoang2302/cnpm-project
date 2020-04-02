import 'phaser';
import { Render } from 'matter-js';
import BubbleBox from '../helper/BubbleBox';
 import {bubble} from '../helper/BubbleBox';
import CheckInputText from '../helper/CheckInputText';

var element1;
var element2;
var bubbleBox;
var inputText1;
var inputText2;
var groupChau = [];
var cursorKeys;
var checkInput;

export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }
 
  preload () {
    this.load.html('nameform', 'src/assets/text/nameform.html');  
    this.load.image('Chau', 'src/assets/chau.png');
    this.load.image('button', 'src/assets/button.png');
  }
    
  create () {
    this.cameras.main.fadeIn(2000);
    
    element1 = this.add.dom(600, 200).createFromCache('nameform');
    element2 = this.add.dom(300, 200).createFromCache('nameform');
    element1.setVisible(false);
    element2.setVisible(false);
    this.time.addEvent({
      delay: 2000,
      callback: ()=>{
        //element1.setVisible(true);
        //element2.setVisible(true);
      },
      loop: true
      })
     //bubbleBox = new BubbleBox(this, 400, 200, 250, 50, 'this is wrong choice');
     //bubbleBox.createBox();
     groupChau.push(this.physics.add.image(200,100, 'Chau'));
      groupChau.push(this.physics.add.image(200, 100, 'Chau'));
      //groupChau.push(this.physics.add.image(200, 100, 'Chau'));
      for(var i = 0; i < 2;i++){
        groupChau[i].setScale(0.3);
      }
     
      this.cursorKeys = this.input.keyboard.createCursorKeys();
      
      
    inputText1 = element1.getChildByName('nameform');
    inputText2 = element2.getChildByName('nameform');
    checkInput = new CheckInputText(this, inputText1, groupChau, inputText2);
    var sprite = this.add.sprite(800, 800, 'button').setInteractive();
    sprite.on('pointerover', function (event) {

      this.setTint(0xff0000);

  });

  sprite.on('pointerout', function (event) {

      this.clearTint();

  });

  }

  update(){
    var distance = Phaser.Math.Distance.Between(groupChau[0].x, groupChau[0].y, 200, 300);
    checkInput.check1(distance);
    var distance0 = Phaser.Math.Distance.Between(groupChau[0].x, groupChau[0].y, 200, 500);
    var distance1 = Phaser.Math.Distance.Between(groupChau[1].x, groupChau[1].y, 200, 500);
    if(this.cursorKeys.right.isDown){
      checkInput.checkEnd(distance0, distance1);
    }
  }
};
