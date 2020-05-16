import 'phaser';

export default class Ball {
  constructor() {
    this.create = function (Scenee, PosX, PosY) {
      // Scenee.load.image('ball', 'src/assets/ball.png');
      const ball = Scenee.add.image(PosX, PosY, 'ball');
      ball.setScale(1.2);
      return ball;
    };
  }
}
