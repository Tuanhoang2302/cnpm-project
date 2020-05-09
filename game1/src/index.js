import 'phaser';
import Phaser from "phaser";
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import {so} from './Scenes/GameScene';
import Game1Scene2 from './Scenes/Game1Scene2';
import Game1Scene3 from './Scenes/Game1Scene3';
import Game1Scene4 from './Scenes/Game1Scene4';
import Game1Scene5 from './Scenes/Game1Scene5';
import TestScene from './Scenes/TestScene';
import TestScene3 from './Scenes/TestScene3';

class Game extends Phaser.Game {
  constructor() {
    // add cái config vào game
    super(config);

    // add scene vào game
    this.scene.add('Game', GameScene);
    // this.scene.add('Boot', BootScene);
    this.scene.add('Scene2', Game1Scene2);
    this.scene.add('Scene3', Game1Scene3);
    this.scene.add('Scene4', Game1Scene4);
    this.scene.add('Scene5', Game1Scene5);
    this.scene.add('test', TestScene);
    this.scene.add('test3', TestScene3);
    this.scene.start('Scene5');
  }
}

export var game = new Game();
