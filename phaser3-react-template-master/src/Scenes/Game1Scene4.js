import 'phaser'
import Ball from '../gameObject/Ball';

export default class Game1Scene4 extends Phaser.Scene
{
    constructor(){
        super('Scene4');
        this.ball = null;
        this.lastBall = null;
        this.box = null;
    }

    preload(){
        this.load.image('dayChau', 'src/assets/arrBlock.png');
        this.load.image('ball', 'src/assets/ball.png');
        this.load.image('ballHolder', 'src/assets/thanh.png');
    }

    create(){
        this.cameras.main.fadeIn(1500);
        var ballHolder = this.add.image(630, 25, 'ballHolder');
        this.ball = new Ball();
        this.ball.create(this, 860, 24);
        this.ball.create(this, 830, 24);
        this.ball.create(this, 800, 24);
        for(var i = 0; i < 2; i++){
            this.lastBall = this.ball.create(this, 400 + 30 * i, 24);    
        }
        //this.box = new DisplayBox(this);
    
    }

    update(){

    }
}