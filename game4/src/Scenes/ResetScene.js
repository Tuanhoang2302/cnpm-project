import 'phaser'
import {isWannaReset1 } from './Scene1';
import {isWannaReset2 } from './Scene1_2';
import {isWannaReset3 } from './Scene1_3';
import {isWannaReset4 } from './Scene1_4';
import {isWannaReset5 } from './Scene1_5';
import {isWannaReset6 } from './Scene1_6';
import {isWannaReset7 } from './Scene2';
import {isWannaReset8 } from './Scene2_2';
import {isWannaReset9 } from './Scene2_3';
import {isWannaReset10 } from './Scene3';
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
            if(isWannaReset1[0]){
                isWannaReset1[0] = false;
                this.scene.start('Scene1v2');
            }else if(isWannaReset2[0]){
                isWannaReset2[0] = false
                this.scene.start('Scene1v3');
            }else if(isWannaReset3[0]){
                isWannaReset3[0] = false
                this.scene.start('Scene1');
            }else if(isWannaReset4[0]){
              isWannaReset4[0] = false
              this.scene.start('Scene1v5');
            }else if(isWannaReset5[0]){
              isWannaReset5[0] = false
              this.scene.start('Scene1v6');
            }else if(isWannaReset6[0]){
              isWannaReset6[0] = false
              this.scene.start('Scene1v4');
            }else if(isWannaReset7[0]){
              isWannaReset7[0] = false;
              this.scene.start('Scene2');
            }else if(isWannaReset8[0]){
              isWannaReset8[0] = false;
              this.scene.start('Scene2v2');
            }else if(isWannaReset9[0]){
              isWannaReset9[0] = false;
              this.scene.start('Scene2v3');
            }else if(isWannaReset10[0]){
              isWannaReset10[0] = false;
              this.scene.start('Scene3');
            }
        },  this);
      }else{
        button.on('pointerdown', function (event) {
          if(isWannaReset1[0]){
            isWannaReset1[0] = false;
            this.scene.start('Scene1v5');
        }else if(isWannaReset2[0]){
            isWannaReset2[0] = false
            this.scene.start('Scene1v6');
        }else if(isWannaReset3[0]){
            isWannaReset3[0] = false
            this.scene.start('Scene1v4');
        }else if(isWannaReset4[0]){
          isWannaReset4[0] = false
          this.scene.start('Scene2');
        }else if(isWannaReset5[0]){
          isWannaReset5[0] = false
          this.scene.start('Scene2');
        }else if(isWannaReset6[0]){
          isWannaReset6[0] = false
          this.scene.start('Scene2');
        }else if(isWannaReset7[0]){
          isWannaReset7[0] = false
          this.scene.start('Scene2v2');
        }else if(isWannaReset8[0]){
          isWannaReset8[0] = false
          this.scene.start('Scene2v3');
        }else if(isWannaReset9[0]){
          isWannaReset9[0] = false
          this.scene.start('Scene3');
        }
        },this);
      }
    }
}