import BubbleWithoutTri from '../Config/BubbleWithoutTri';

var theNumber = 2;
const BlockStartPosX = 370;
const BlockStartPosY = 150;

var blockArr = [];
export default class Game1Scene3 extends Phaser.Scene {
    constructor () {
      super('Scene3');
    }
   
    preload () {
        this.load.image('dayChau', 'src/assets/arrBlock.png');
    }
      
    create () {
        this.cameras.main.fadeIn(2000);

        for(var i = 0; i < theNumber; i++){
          blockArr.push(this.add.image(BlockStartPosX, BlockStartPosY, 'dayChau'));
      }
        
    }

    update() {
        
    }
}