import 'phaser';
import { AUTO } from 'phaser';
import config from '../Config/config';
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
    this.load.image('wall', 'src/assets/wall.png');
    this.load.image('ball', 'src/assets/ball.png');  
    this.load.image('Hoa', 'src/assets/hoa.png');
    this.load.image('Chau', 'src/assets/chau.png');
    this.load.image('loa', 'src/assets/loa.png');
    this.load.audio('thanh', 'src/assets/flower.mp3');
}

create ()
{
    // add graphic cho 1 object 
    var bb = this.add.graphics({ x: 500, y: 250 });

    var bubbleBox = new BubbleBox(this, 500, 250, 250, 50, '      “Move the flowers”', bb);
    bubbleBox.createBox();

    // add ảnh 
    var loa =  this.add.sprite(510, 255, 'loa').setOrigin(0,0);
    // add âm thanh
    var amthanh = this.sound.add('thanh');

    // làm cho object có khả năng tương tác thực (như va chạm, trọng lực)
    wall = this.physics.add.image(700, 50, 'wall');
    ball = this.physics.add.image(300, 50, 'ball');

    //push phần tử vào mảng, cái này tí dùng vòng lặp cho code gọn
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

    // tạo chức năng drag and drop
    var dragManager = new DragManager(this, groupHoa, groupChau, initHoaPosX, initHoaPosY, numberOfBox);
    dragManager.dragHoa();

    // tạo chức năng phát âm thanh
    var aud = new Audio(this, loa, amthanh);
    aud.playAudio();

    // cái này là để test keyboard input thôi đừng để ý
    this.cursorKeys = this.input.keyboard.createCursorKeys();
  
}

update ()
{  
    //Move ball when game is end
    if(this.checkEnd()){ 

        // tạo chuyển động cho quả bóng và cho va chạm với tường, các thành phần trong hàm tí giải thích sau
        this.physics.world.collide(wall.setImmovable(), ball.setVelocity(100, 0).setBounce(0).setCollideWorldBounds(true),
        function () {
          
        });
        
        //Change scene
        if((wall.x - ball.x) < 28){

            //Chuyển scene mới
            this.scene.start('Boot');
        }
    }
      
    
    //move flower back to its init position
    for(var i = 0; i < numberOfBox; i++){
      // hàm tính khoảng cách
      distance[i] = Phaser.Math.Distance.Between(groupHoa[i].x, groupHoa[i].y, initHoaPosX[i], initHoaPosY[i]);
      if (distance[i] < 4)
      {
        /*khi mà khoảng cách trên bé hơn 4 thì cho hoa đấy về vị trí ban đầu luôn, 
        nếu k có hàm này thì hình sẽ bị giật do object vẫn còn vận tốc, xóa thử đi để test xem
        */
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