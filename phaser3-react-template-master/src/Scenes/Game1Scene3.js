import BubbleWithoutTri from '../Config/BubbleWithoutTri';

export default class Game1Scene3 extends Phaser.Scene {
    constructor () {
      super('Scene3');
    }
   
    preload () {
        
    }
      
    create () {
        this.cameras.main.fadeIn(2000);
        var bubbleResult = new BubbleWithoutTri(this, 200, 200, 250, 70);
        bubbleResult.createBox();
    }

    update() {

    }
}