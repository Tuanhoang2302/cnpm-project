import 'phaser';
import { AUTO } from 'phaser';
import config from '../Config/config';
import DragManager from '../helper/DragManager';
import {spaceValid} from '../helper/DragManager';
import BubbleBox from '../helper/BubbleBox';

var wall;
var sprite;
var gg;
var gg1;
var cam;
var cam1;
var cursorKey;
var isMoving;
var distance = [0, 0];
var initGgPosX = [0, 0];
var initGgPosY = [0, 0];
var groupGG = [];
var groupCam = [];
var element;
var numberOfBox = 2;
 
export default class GameScene extends Phaser.Scene {
  constructor () {
    super('Game');
  }
preload ()
{
    //this.load.html('rectangle', 'src/assets/text/rectangle.html'); 
    this.load.html('nameform', 'src/assets/text/nameform.html');  
    this.load.image('bg', 'src/assets/logo.png');
    this.load.image('girl', 'src/assets/hoa.png');
    this.load.image('gg', 'src/assets/hoa.png');
    this.load.image('gg1', 'src/assets/hoa.png');
    this.load.image('cam', 'src/assets/chau.png');
    this.load.image('cam1', 'src/assets/chau.png');
    this.load.image('loa', 'src/assets/loa.png');
}

create ()
{

    var bubbleBox = new BubbleBox(this, 400, 200, 250, 50, '    “Move the blocks”');
    bubbleBox.createBox();
    //element = this.add.dom(600, 200).createFromCache('nameform');
    wall = this.physics.add.image(500, 100, 'bg');
    sprite = this.physics.add.image(200, 100, 'girl');
    cam = this.add.image(500, 300, 'cam');
    cam1 = this.add.image(500, 500, 'cam');
    gg = this.physics.add.image(200, 300, 'gg');
    gg1 = this.physics.add.image(200, 500, 'gg1');
    var loa =  this.add.image(425, 224, 'loa');
    groupGG.push(gg);
    groupGG.push(gg1);
    groupCam.push(cam);
    groupCam.push(cam1);
      
    for(var i = 0; i < numberOfBox; i++){
      initGgPosX[i] = groupGG[i].x;
      initGgPosY[i] = groupGG[i].y;
      
    }
    //cam = this.add.image(500, 300, 'cam');

    wall.setScale(0.5, 0.5);
    sprite.setScale(0.3,0.3);
    gg.setScale(0.1, 0.1);
    gg1.setScale(0.1, 0.1);
    cam.setScale(0.3, 0.3);
    cam1.setScale(0.3, 0.3);
    loa.setScale(0.055, 0.055);

    this.cursorKey = this.input.keyboard.createCursorKeys();

    var dragManager = new DragManager(this, gg, groupGG, cam, groupCam, initGgPosX, initGgPosY);
    dragManager.dragGai();

    

}

update ()
{
    if(this.cursorKey.right.isDown){
      isMoving = true;
    }
      if(isMoving){
      //sprite.setVelocity(100, 0).setBounce(0).setCollideWorldBounds(true);
      
      this.physics.world.collide(wall.setImmovable(), sprite.setVelocity(100, 0).setBounce(0).setCollideWorldBounds(true),
       function () {
          
      });
    }
    
    for(var i = 0; i < numberOfBox; i++){
      distance[i] = Phaser.Math.Distance.Between(groupGG[i].x, groupGG[i].y, initGgPosX[i], initGgPosY[i]);
      if (distance[i] < 4)
      {
        groupGG[i].body.reset(initGgPosX[i], initGgPosY[i]);
        
      }
    }
    if(this.checkEnd()){
      //console.log(1);
      this.scene.start('Boot');
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