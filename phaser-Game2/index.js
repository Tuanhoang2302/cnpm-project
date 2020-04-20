var config = {
    type: Phaser.AUTO,
    parent:'phaserGame',
    width: 1024,
    height:650,
  backgroundColor: '#ffffff',
    scene: [Scene1, Scene2],
    dom:{
        createContainer:true
    }
    
}
var game = new Phaser.Game(config);