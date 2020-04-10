import 'phaser';
 

// tạo khung cho game
export default {
  
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1280,
  height: 780,
  //backgroundColor: "0xffffff",
   scale: {
    
     //autoCenter: Phaser.Scale.CENTER_BOTH,
     autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
     
   },  

  // cái này dùng để enable cái dom trong bootGame
  dom: {
      createContainer: true
  },

  // cái này dùng để enable physics function
  physics: {
    default: "arcade",
    arcade: {
      
      debug: true
    }
  },

  // cái này dùng để enable audio function
  audio: {
    disableWebAudio: true
  }
};