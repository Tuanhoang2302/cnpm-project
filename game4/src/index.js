import 'phaser';
import config from './Config/config';
import Scene1 from './Scenes/Scene1';
import Scene1v2 from './Scenes/Scene1_2';
import Scene1v3 from './Scenes/Scene1_3';

import Scene2 from './Scenes/Scene2';
import Scene2v2 from './Scenes/Scene2_2';
import Scene2v3 from './Scenes/Scene2_3';
import Scene3 from './Scenes/Scene3';
import Test1 from './Scenes/Test1';
import Test2 from './Scenes/Test2';

import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";

class Game extends Phaser.Game {
  constructor () {
    // add cái config vào game
    super(config);

    // add scene vào game
    this.scene.add('Scene1', Scene1);
    this.scene.add('Scene1v2', Scene1v2);
    this.scene.add('Scene1v3', Scene1v3);
    
    this.scene.add('Scene2', Scene2);
    this.scene.add('Scene2v2', Scene2v2);
    this.scene.add('Scene2v3', Scene2v3);
    this.scene.add('Scene3', Scene3);
    this.scene.add('Test1', Test1);
    this.scene.add('Test2', Test2);
    this.scene.start('Scene1');
  }
}

// tạo game 
export var game = new Game();


ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
