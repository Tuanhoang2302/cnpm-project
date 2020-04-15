import 'phaser'
import {isWannaReset2} from './BootScene';
import {isWannaReset3} from './Game1Scene3';
import {isWannaReset4} from './Game1Scene4';

export default class ResetScene extends Phaser.Scene
{
    constructor(){
        super('Reset');
    }

    preload(){
        this.load.image('dino', 'src/assets/dino.jpg');
        this.load.image('button', 'src/assets/next.png');
        this.load.image('yes', 'src/assets/yes.png');
        this.load.image('no', 'src/assets/no.png');
    }

    create(){
        this.cameras.main.fadeIn(1500);
        var dino = this.add.image(540, 180, 'dino');
        dino.setScale(0.7);
        var content = this.add.text(170, 350, 'You have made some mistakes this time.' + '\n\n' + 'Do you want to play again?', { fontFamily: 'Arial', fontSize: 40, color: '#000000', align: 'center', wordWrap: { width: 800 - (10 * 2) } });
        var buttonYes = this.add.sprite(800, 580, 'yes').setInteractive();
        buttonYes.setScale(1.2, 1.2);
        this.ButtonEvent(buttonYes, 1);

        var buttonNo = this.add.sprite(300, 580, 'no').setInteractive();
        buttonNo.setScale(1.25, 1.25);
        this.ButtonEvent(buttonNo, 0);
    }

    update(){

    }

    ButtonEvent(button, id){
      button.on('pointerover', function (event) {
        this.setTint(0xF5F5F5);
      });
  
      // còn ở ngoài tấm ảnh thì clear màu đó đi
      button.on('pointerout', function (event) {
        this.clearTint();
      });
      if(id == 1){
        button.on('pointerdown', function (event) {
          if(isWannaReset2[0]){  
            this.scene.start('Boot');
          } else if(isWannaReset3[0]){
            this.scene.start('Scene3');
          } else if(isWannaReset4[0]){
            this.scene.start('Scene4');
          }
        },  this);
      }else{
        button.on('pointerdown', function (event) {
          if(isWannaReset2[0]){  
            this.scene.start('Scene3');
          } else if(isWannaReset3[0]){
            this.scene.start('Scene4');
          } else if(isWannaReset4[0]){

          }
        },this);
      }
    }
}