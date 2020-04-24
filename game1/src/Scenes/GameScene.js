import 'phaser';
import { AUTO } from 'phaser';
//import config from '../Config/config';
import DragManager from '../helper/DragManager';
import {spaceValid} from '../helper/DragManager';
import BubbleBox from '../helper/BubbleBox';
import Audio from '../helper/Audio';
import Ball from '../gameObject/Ball';
import Block from '../gameObject/Block';

var wall;
var ball;
var lastBall;
var distance = [0,0,0,0,0,0,0,0,0,0];;
var initBlockPosX = [0,0,0,0,0,0,0,0,0,0];
var initBlockPosY = [0,0,0,0,0,0,0,0,0,0];
var blockArr = [];
var holderArr = [];
var numberOfBox = 10;
var cursorKeys;

export default class GameScene extends Phaser.Scene {
  constructor () {
    // đặt tên cho scene 
    super('Game');
  }

// load những thứ sẽ dùng trong game như ảnh, âm thanh...
preload ()
{
    // load ảnh từ máy tính (nhớ là phải đúng tên đường dẫn đấy)
    this.load.image('ball', 'src/assets/ball.png');  
    this.load.image('Block', 'src/assets/Block.png');
    this.load.image('Chau', 'src/assets/nen.png');
    this.load.image('loa', 'src/assets/loa.png');
    this.load.audio('thanh', 'src/assets/flower.mp3');
    this.load.image('ballHolder', 'src/assets/thanh.png')
}

create ()
{
    this.cameras.main.fadeIn(1500);
    var ballHolder = this.add.image(540, 16, 'ballHolder');
    ball = new Ball();
    for(var i = 0; i < 5; i++){
      lastBall = ball.create(this, 310 + 30 * i, 15);
    }

    var bb = this.add.graphics({ x: 500, y: 250 });
    var bubbleBox = new BubbleBox(this, 250, 50, '      “Move the flowers”', bb, 20);
    bubbleBox.createBox();

    // add ảnh 
    var loa =  this.add.sprite(510, 255, 'loa').setOrigin(0,0);
    // add âm thanh
    var amthanh = this.sound.add('thanh');
    
    //push phần tử vào mảng, cái này tí dùng vòng lặp cho code gọn
    for(var i = 0; i < 10; i++){
      holderArr.push(this.add.image(100 + i * 70, 200, 'Chau'));
    }
    
    blockArr.push((new Block()).createABlock(this, 900, 600));
    blockArr.push((new Block()).createABlock(this, 200, 500));
    blockArr.push((new Block()).createABlock(this, 300, 400));
    blockArr.push((new Block()).createABlock(this, 500, 500));
    blockArr.push((new Block()).createABlock(this, 300, 500));
    blockArr.push((new Block()).createABlock(this, 600, 400));
    blockArr.push((new Block()).createABlock(this, 800, 500));
    blockArr.push((new Block()).createABlock(this, 200, 600));
    blockArr.push((new Block()).createABlock(this, 500, 600));
    blockArr.push((new Block()).createABlock(this, 400, 600));
    
    for(var i = 0; i < numberOfBox; i++){
      initBlockPosX[i] = blockArr[i].x;
      initBlockPosY[i] = blockArr[i].y;
    }

    //setScale
    loa.setScale(0.055, 0.055);

    // tạo chức năng drag and drop
    var dragManager = new DragManager(this, blockArr, holderArr, initBlockPosX, initBlockPosY, numberOfBox);
    dragManager.dragHoa();

    // tạo chức năng phát âm thanh
    var aud = new Audio(this, loa, amthanh);
    aud.playAudio();

    // cái này là để test keyboard input thôi đừng để ý
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    var line = this.add.graphics();
    line.lineBetween(0, 50, 1280, 50);
}

update ()
{  
  
    this.DropAndDrag();
    this.ChangeScene();
}

ChangeScene(){
  if(this.checkEnd()){ 
    if(lastBall.x < 770){
      console.log(ball.x);
      lastBall.x +=3;
    }else{    
      this.time.addEvent({
          delay: 1500,
          callback: ()=>{
              this.scene.start('Scene2');
          },
      loop: true
      })
  }
  }
}

DropAndDrag(){
  for(var i = 0; i < numberOfBox; i++){
    distance[i] = Phaser.Math.Distance.Between(blockArr[i].x, blockArr[i].y, initBlockPosX[i], initBlockPosY[i]);
    if (distance[i] < 4)
    {
      blockArr[i].body.reset(initBlockPosX[i], initBlockPosY[i]);
      
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