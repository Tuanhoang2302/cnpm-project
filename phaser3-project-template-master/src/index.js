import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import {so} from './Scenes/GameScene';

class Game extends Phaser.Game {
  constructor () {
    // add cái config vào game
    super(config);

    // add scene vào game
    this.scene.add('Game', GameScene);
    this.scene.add('Boot', BootScene);
    this.scene.start('Boot');
    
  }
}

// tạo game 
export var game = new Game();



// mở cái đầu và nên đọc code theo thứ tự sau
/*
config.js -> index.js -> GameScene.js -> dragManager.js -> bubbleBox.js -> Bootscene.js -> CheckInputText.js
*/