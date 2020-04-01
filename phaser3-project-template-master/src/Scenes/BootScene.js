import 'phaser';
import { Render } from 'matter-js';
import BubbleBox from '../helper/BubbleBox';
 import {bubble} from '../helper/BubbleBox';
import {content} from '../helper/BubbleBox';
var element;
var bubbleBox;
var gg;
var inputText;

export default class BootScene extends Phaser.Scene {
  constructor () {
    super('Boot');
  }
 
  preload () {
    this.load.html('nameform', 'src/assets/text/nameform.html');  
    
  }
    
  create () {
     element = this.add.dom(600, 200).createFromCache('nameform');
     bubbleBox = new BubbleBox(this, 400, 200, 250, 50, 'this is wrong choice');
     bubbleBox.createBox();
     
  
      gg = this.add.text(100, 100, 'gg');
      
      this.tweens.add({
        targets: gg,
        alpha: 0.2,
        duration: 250,
        ease: 'Power3',
        yoyo: true
    });
  }

  update(){
    inputText = element.getChildByName('nameform');
  
      //bubble.clear();
      if(inputText.value == 0){
        //bubble.clear();
      }
      if(inputText.value < 10 && inputText.value != 1 && inputText.value != 0){
      
        //pp.stop();
        //bubble.clear();
      }else if(inputText.value > 10){
        var donvi = inputText.value % 10; 
        var chuc = (inputText.value - donvi) / 10;
        inputText.value = donvi;
      }else if(inputText.value == 10){
        console.log(inputText.value);
        bubble.clear();
      }

      
  }
};
