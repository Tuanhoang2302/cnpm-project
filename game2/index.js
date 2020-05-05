var config = {
    type: Phaser.AUTO,
    parent:'phaserGame',
    width: 1024,
    height:650,
  backgroundColor: '#ffffff',
    scene: [Scene1,Scene2, Scene3, Scene4, Scene5, Scene6],
    dom:{
        createContainer:true
    },  
    audio: {
      disableWebAudio: true
  }
}
var game = new Phaser.Game(config);