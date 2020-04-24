import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import {so} from './Scenes/GameScene';
import Game1Scene2 from './Scenes/Game1Scene2';
import Game1Scene3 from './Scenes/Game1Scene3';
import ResetScene from './Scenes/ResetScene';
import Game1Scene4 from './Scenes/Game1Scene4';
import Game1Scene5 from './Scenes/Game1Scene5';

import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";

class Game extends Phaser.Game {
  constructor () {
    // add cái config vào game
    super(config);

    // add scene vào game
    this.scene.add('Boot', BootScene);
    this.scene.add('Game', GameScene);
    //this.scene.add('Boot', BootScene);
    this.scene.add('Scene2', Game1Scene2);
    this.scene.add('Scene3', Game1Scene3);
    this.scene.add('Scene4', Game1Scene4);
    this.scene.add('Scene5', Game1Scene5);
    this.scene.add('Reset', ResetScene);
    this.scene.start('Scene5');
    
  }
}

// tạo game 
export var game = new Game();


ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
