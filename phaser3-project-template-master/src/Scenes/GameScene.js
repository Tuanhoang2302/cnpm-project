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
var distance = [0, 0];
var initHoaPosX = [0, 0];
var initHoaPosY = [0, 0];
var groupHoa = [];
var groupChau = [];
var numberOfBox = 2;

export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }
preload ()
{
    this.load.image('wall', 'src/assets/logo.png');
    this.load.image('ball', 'src/assets/hoa.png');  
    this.load.image('Hoa', 'src/assets/hoa.png');
    this.load.image('Chau', 'src/assets/chau.png');
    this.load.image('loa', 'src/assets/loa.png');
    this.load.audio('thanh', 'src/assets/pp.mp3');
}

create ()
{
    var bubbleBox = new BubbleBox(this, 400, 200, 250, 50, '    “Move the blocks”');
    bubbleBox.createBox();
    
    wall = this.physics.add.image(500, 100, 'wall');
    ball = this.physics.add.image(200, 100, 'ball');
    var loa =  this.add.sprite(425, 224, 'loa').setOrigin(0,0);
    var amthanh = this.sound.add('thanh');

    groupChau.push(this.add.image(500, 300, 'Chau'));
    groupChau.push(this.add.image(500, 500, 'Chau'));
    groupHoa.push(this.physics.add.image(200, 300, 'Hoa'));
    groupHoa.push(this.physics.add.image(200, 500, 'Hoa'));
    
    
    for(var i = 0; i < numberOfBox; i++){
      initHoaPosX[i] = groupHoa[i].x;
      initHoaPosY[i] = groupHoa[i].y;
    }

    //setScale
    for(var i = 0; i < numberOfBox; i++){
      groupHoa[i].setScale(0.1, 0.1);
      groupChau[i].setScale(0.3, 0.3);
    }
    wall.setScale(0.5, 0.5);
    ball.setScale(0.3,0.3);
    loa.setScale(0.055, 0.055);

    var dragManager = new DragManager(this, groupHoa, groupChau, initHoaPosX, initHoaPosY, numberOfBox);
    dragManager.dragHoa();
    var aud = new Audio(this, loa, amthanh);
    aud.playAudio();
  
}

update ()
{  
    //Move ball when game is end
    if(this.checkEnd()){ 
        this.physics.world.collide(wall.setImmovable(), ball.setVelocity(100, 0).setBounce(0).setCollideWorldBounds(true),
        function () {
          
        });

    //Change scene
    if(ball.x > 300){
        this.scene.start('Boot');
      }
    }
    
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