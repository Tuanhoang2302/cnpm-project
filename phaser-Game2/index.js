var config = {
    type: Phaser.AUTO,
    parent:'phaserGame',
    width: 900,
    height:600,
   backgroundColor: '#ffffff',
    scene: [Scene1, Scene2],
    dom:{
        createContainer:true
    }
}
var game = new Phaser.Game(config);