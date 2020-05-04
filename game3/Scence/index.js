var config = {
    type: Phaser.AUTO,
    parent: 'phaserGame',
    width: 1000,
    height: 620,
    backgroundColor: '#ffffff',
    scene: [Scene1, Scene2, Scene3, Scene4, Scene5, Scene6],
    dom: {
        createContainer: true
    }

}
var game = new Phaser.Game(config);