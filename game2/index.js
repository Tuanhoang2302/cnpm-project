/*eslint-disable no-undef */
import Scene1 from './src/Scene/Scene1.js';
import Scene2 from './src/Scene/Scene2.js';
// import Scene3 from './src/Scene/Scene3';
import Scene4 from './src/Scene/Scene4.js';
// import Scene5 from './src/Scene/Scene5';
// import Scene6 from './src/Scene/Scene6';
var config = {
  type: Phaser.AUTO,
  parent:'phaserGame',
  width: 1024,
  height:650,
backgroundColor: '#ffffff',
  dom:{
      createContainer:true
  },  
  audio: {
    disableWebAudio: true
}
}
class Game extends Phaser.Game{
  constructor(){
    super(config);
    this.scene.add('Scene1',Scene1);
    this.scene.add('Scene2',Scene2);
    // this.scene.add('Scene3',Scene3);
    this.scene.add('Scene4',Scene4);
    // this.scene.add('Scene5',Scene5);
    // this.scene.add('Scene6',Scene6);
    this.scene.start('Scene1');

  }
}
export var game = new Game();