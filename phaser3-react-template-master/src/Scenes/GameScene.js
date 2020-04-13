import 'phaser';
import { AUTO } from 'phaser';
//import config from '../Config/config';
import DragManager from '../helper/DragManager';
import {spaceValid} from '../helper/DragManager';
import BubbleBox from '../helper/BubbleBox';
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
    // đặt tên cho scene 
    super('Game');
  }

// load những thứ sẽ dùng trong game như ảnh, âm thanh...
preload ()
{
    // load ảnh từ máy tính (nhớ là phải đúng tên đường dẫn đấy)
    this.load.image('ball', 'src/assets/ball.png');  
    this.load.image('Hoa', 'src/assets/Block.png');
    this.load.image('Chau', 'src/assets/nen.png');
    this.load.image('loa', 'src/assets/loa.png');
    this.load.audio('thanh', 'src/assets/flower.mp3');
    this.load.image('ballHolder', 'src/assets/thanh.png')
}

create ()
{
  var ballHolder = this.add.image(630, 28, 'ballHolder');
    //this.scene.start('Boot')

    var bb = this.add.graphics({ x: 500, y: 250 });
    var bubbleBox = new BubbleBox(this, 250, 50, '      “Move the flowers”', bb, 20);
    bubbleBox.createBox();

    // add ảnh 
    var loa =  this.add.sprite(510, 255, 'loa').setOrigin(0,0);
    // add âm thanh
    var amthanh = this.sound.add('thanh');

    // làm cho object có khả năng tương tác thực (như va chạm, trọng lực)
    
    for(var i = 0; i < 5; i++){
      ball = this.add.image(400 + 30 * i, 27, 'ball');
      ball.setScale(1.2);
    }

    //push phần tử vào mảng, cái này tí dùng vòng lặp cho code gọn
    for(var i = 0; i < 10; i++){
      groupChau.push(this.add.image(100 + i * 70, 200, 'Chau'));
    }
    
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
    //ball.setScale(1.2);
    loa.setScale(0.055, 0.055);

    // tạo chức năng drag and drop
    var dragManager = new DragManager(this, groupHoa, groupChau, initHoaPosX, initHoaPosY, numberOfBox);
    dragManager.dragHoa();

    // tạo chức năng phát âm thanh
    var aud = new Audio(this, loa, amthanh);
    aud.playAudio();

    // cái này là để test keyboard input thôi đừng để ý
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    var line = this.add.graphics();
    line.lineBetween(0, 70, 1280, 70);
}

update ()
{  
    this.DropAndDrag();
    this.ChangeScene();
}

ChangeScene(){
  if(this.checkEnd()){ 
    this.time.addEvent({
      delay: 1000,
      callback: ()=>{
        this.scene.start('Boot');
      },
      loop: true
    })
  }
}

DropAndDrag(){
  for(var i = 0; i < numberOfBox; i++){
    // hàm tính khoảng cách
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