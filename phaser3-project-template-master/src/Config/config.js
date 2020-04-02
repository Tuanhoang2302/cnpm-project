import 'phaser';
 
export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1080,
  height: 720,
  //backgroundColor: "0xffffff",
  // scale: {
    
  //   autoCenter: Phaser.Scale.CENTER_BOTH
  // },  
  dom: {
      createContainer: true
  },
  physics: {
    default: "arcade",
    arcade: {
      
      debug: true
    }
  },
  audio: {
    disableWebAudio: true
  }
};