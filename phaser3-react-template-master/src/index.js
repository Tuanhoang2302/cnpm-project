import 'phaser';
import config from './Config/config';
import GameScene from './Scenes/GameScene';
import BootScene from './Scenes/BootScene';
import {so} from './Scenes/GameScene';

import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";

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

ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
