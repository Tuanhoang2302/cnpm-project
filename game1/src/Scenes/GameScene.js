/* eslint-disable import/no-named-as-default */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-duplicates */
/* eslint-disable no-undef */
/* eslint-disable no-plusplus */

// import config from '../Config/config';
import DragManager from '../helper/DragManager';
import { spaceValid } from '../helper/DragManager';
import BubbleBox from '../helper/BubbleBox';
import Audio from '../helper/Audio';
import Ball from '../gameObject/Ball';
import Block from '../gameObject/Block';

let ball;
let lastBall;
const distance = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const initBlockPosX = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const initBlockPosY = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
const blockArr = [];
const holderArr = [];
const numberOfBox = 10;

export default class GameScene extends Phaser.Scene {
  constructor() {
    // đặt tên cho scene
    super('Game');
  }

  // load những thứ sẽ dùng trong game như ảnh, âm thanh...
  preload() {
    // load ảnh từ máy tính (nhớ là phải đúng tên đường dẫn đấy)
    this.load.image('ball', 'src/assets/ball.png');
    this.load.image('Block', 'src/assets/Block.png');
    this.load.image('Chau', 'src/assets/nen.png');
    this.load.image('loa', 'src/assets/loa.png');
    this.load.audio('thanh', 'src/assets/flower.mp3');
    this.load.image('ballHolder', 'src/assets/thanh.png');
  }

  create() {
    this.add.image(540, 30, 'ballHolder');
    ball = new Ball();
    for (let i = 0; i < 5; i++) {
      lastBall = ball.create(this, 267 + 30 * i, 29);
    }

    const bb = this.add.graphics({ x: 500, y: 250 });
    const bubbleBox = new BubbleBox(this, 250, 50, '      “Move the Blocks”', bb, 20);
    bubbleBox.createBox();

    // add ảnh
    const loa = this.add.sprite(510, 255, 'loa').setOrigin(0, 0);
    // add âm thanh
    const amthanh = this.sound.add('thanh');

    // push phần tử vào mảng, cái này tí dùng vòng lặp cho code gọn
    for (let i = 0; i < 10; i++) {
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
    for (let i = 0; i < blockArr.length; i++) {
      blockArr[i].body.debugShowBody = false;
    }

    for (let i = 0; i < numberOfBox; i++) {
      initBlockPosX[i] = blockArr[i].x;
      initBlockPosY[i] = blockArr[i].y;
    }

    // setScale
    loa.setScale(0.055, 0.055);

    // tạo chức năng drag and drop
    // eslint-disable-next-line max-len
    const dragManager = new DragManager(this, blockArr, holderArr, initBlockPosX, initBlockPosY, numberOfBox);
    dragManager.dragHoa();

    // tạo chức năng phát âm thanh
    const aud = new Audio(this, loa, amthanh);
    aud.playAudio();

    // cái này là để test keyboard input thôi đừng để ý
    this.cursorKeys = this.input.keyboard.createCursorKeys();

    const line = this.add.graphics();
    line.lineBetween(0, 60, 1280, 60);
  }

  update() {
    this.ReturnInitPos();
    this.ChangeScene();
  }

  ChangeScene() {
    if (this.checkEnd()) {
      if (lastBall.x < 812) {
        lastBall.x += 3;
      } else {
        this.time.addEvent({
          delay: 1500,
          callback: () => {
            this.scene.start('Scene2');
          },
          loop: true,
        });
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  ReturnInitPos() {
    for (let i = 0; i < numberOfBox; i++) {
      // eslint-disable-next-line max-len
      distance[i] = Phaser.Math.Distance.Between(blockArr[i].x, blockArr[i].y, initBlockPosX[i], initBlockPosY[i]);
      if (distance[i] < 4) {
        blockArr[i].body.reset(initBlockPosX[i], initBlockPosY[i]);
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  checkEnd() {
    for (let i = 0; i < numberOfBox; i++) {
      if (spaceValid[i] === true) {
        return false;
      }
    }
    return true;
  }
}
