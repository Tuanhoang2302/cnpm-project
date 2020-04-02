import 'phaser';
import { AUTO } from 'phaser';
import config from '../Config/config';
import DragManager from '../helper/DragManager';
import {spaceValid} from '../helper/DragManager';
import BubbleBox from '../helper/BubbleBox';
import {bubble} from '../helper/BubbleBox';
import Audio from '../helper/Audio';


var wall;
var ball;
var distance = [0,0,0,0,0,0,0,0,0,0];;
var initHoaPosX = [0,0,0,0,0,0,0,0,0,0];
var initHoaPosY = [0,0,0,0,0,0,0,0,0,0];
var groupHoa = [];
var groupChau = [];
var numberOfBox = 10;
var cursorKeys;
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }
preload ()
{
    this.load.image('wall', 'src/assets/wall.png');
    this.load.image('ball', 'src/assets/ball.png');  
    this.load.image('Hoa', 'src/assets/hoa.png');
    this.load.image('Chau', 'src/assets/chau.png');
    this.load.image('loa', 'src/assets/loa.png');
    this.load.audio('thanh', 'src/assets/flower.mp3');
}

create ()
{
    var bubbleBox = new BubbleBox(this, 500, 250, 250, 50, '      “Move the flowers”');
    bubbleBox.createBox();
    var loa =  this.add.sprite(510, 255, 'loa').setOrigin(0,0);
    var amthanh = this.sound.add('thanh');
    wall = this.physics.add.image(700, 50, 'wall');
    ball = this.physics.add.image(300, 50, 'ball');

    groupChau.push(this.add.image(100, 200, 'Chau'));
    groupChau.push(this.add.image(170, 200, 'Chau'));
    groupChau.push(this.add.image(240, 200, 'Chau'));
    groupChau.push(this.add.image(310, 200, 'Chau'));
    groupChau.push(this.add.image(380, 200, 'Chau'));
    groupChau.push(this.add.image(450, 200, 'Chau'));
    groupChau.push(this.add.image(520, 200, 'Chau'));
    groupChau.push(this.add.image(590, 200, 'Chau'));
    groupChau.push(this.add.image(660, 200, 'Chau'));
    groupChau.push(this.add.image(730, 200, 'Chau'));

    groupHoa.push(this.physics.add.image(900, 600, 'Hoa'));
    groupHoa.push(this.physics.add.image(200, 500, 'Hoa'));
    groupHoa.push(this.physics.add.image(300, 400, 'Hoa'));
    groupHoa.push(this.physics.add.image(500, 500, 'Hoa'));
    groupHoa.push(this.physics.add.image(300, 500, 'Hoa'));
    groupHoa.push(this.physics.add.image(600, 400, 'Hoa'));
    groupHoa.push(this.physics.add.image(800, 500, 'Hoa'));
    groupHoa.push(this.physics.add.image(200, 600, 'Hoa'));
    groupHoa.push(this.physics.add.image(500, 600, 'Hoa'));
    groupHoa.push(this.physics.add.image(400, 600, 'Hoa'));

    
    for(var i = 0; i < numberOfBox; i++){
      initHoaPosX[i] = groupHoa[i].x;
      initHoaPosY[i] = groupHoa[i].y;
    }

    //setScale
    for(var i = 0; i < numberOfBox; i++){
      groupHoa[i].setScale(0.12, 0.12);
      groupChau[i].setScale(0.3, 0.3);
    }
    wall.setScale(0.5, 0.5);
    ball.setScale(0.07,0.07);
    loa.setScale(0.055, 0.055);

    var dragManager = new DragManager(this, groupHoa, groupChau, initHoaPosX, initHoaPosY, numberOfBox);
    dragManager.dragHoa();
    var aud = new Audio(this, loa, amthanh);
    aud.playAudio();
    this.cursorKeys = this.input.keyboard.createCursorKeys();
    //this.cameras.main.fadeOut(2000);
    //this.cameras.main.fadeIn(2000);
        //this.cameras.main.fadeOut(2000);
  
}

update ()
{  
    //Move ball when game is end
    if(this.checkEnd()){ 
        this.physics.world.collide(wall.setImmovable(), ball.setVelocity(100, 0).setBounce(0).setCollideWorldBounds(true),
        function () {
          
        });
        
        //Change scene
        if((wall.x - ball.x) < 28){
            this.scene.start('Boot');
        }
    }

    //if(this.cursorKeys.right.isDown)
      
    
    //move flower back to its init position
    for(var i = 0; i < numberOfBox; i++){
      distance[i] = Phaser.Math.Distance.Between(groupHoa[i].x, groupHoa[i].y, initHoaPosX[i], initHoaPosY[i]);
      if (distance[i] < 4)
      {
        groupHoa[i].body.reset(initHoaPosX[i], initHoaPosY[i]);
        
      }
    }
    
}

checkEnd(){
  for(var i = 0; i < numberOfBox; i++){
      if(spaceValid[i] == true){
        return false;
      }
  }
  return true;
}

};