import 'phaser';
import config from './Config/config';
import Scene1 from './Scenes/Scene1';
import Scene1v2 from './Scenes/Scene1_2';
import Scene1v3 from './Scenes/Scene1_3';
import Scene1v4 from './Scenes/Scene1_4';
import Scene1v5 from './Scenes/Scene1_5';
import Scene1v6 from './Scenes/Scene1_6';
import Scene2 from './Scenes/Scene2';
import Scene2v2 from './Scenes/Scene2_2';
import Scene2v3 from './Scenes/Scene2_3';
import Scene3 from './Scenes/Scene3';
import ResetScene from './Scenes/ResetScene';

import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App.jsx";

class Game extends Phaser.Game {
  constructor () {
    // add cái config vào game
    super(config);

    // add scene vào game
    this.scene.add('Reset', ResetScene);
    this.scene.add('Scene1', Scene1);
    this.scene.add('Scene1v2', Scene1v2);
    this.scene.add('Scene1v3', Scene1v3);
    this.scene.add('Scene1v4', Scene1v4);
    this.scene.add('Scene1v5', Scene1v5);
    this.scene.add('Scene1v6', Scene1v6);
    this.scene.add('Scene2', Scene2);
    this.scene.add('Scene2v2', Scene2v2);
    this.scene.add('Scene2v3', Scene2v3);
    this.scene.add('Scene3', Scene3);
    this.scene.start('Scene3');
  }
}

// tạo game 
export var game = new Game();


ReactDOM.render(
  <App />,
  document.getElementById("root") || document.createElement("div")
);
