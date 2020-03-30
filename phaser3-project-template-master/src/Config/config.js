import 'phaser';
 
export default {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  x: 300, 
  y: 400,
  width: 800,
  height: 600,
  //backgroundColor: "0xffffff",
  
  dom: {
      createContainer: true
  },
  physics: {
    default: "arcade",
    arcade: {
      
      debug: true
    }
  }
};