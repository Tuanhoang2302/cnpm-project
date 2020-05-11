var bar = [];
var barwithborder = [];
var number_of_bar;
var ball = [];
var switch_scene = 0;
var element1;
var bar_unclear = [];
var display_on;
var speed = 4;
var ball_bar;
class Scene3 extends Phaser.Scene {
    constructor() {
        super("Scene3");
    }

    preload() {
        this.load.html('Scene3', './Scene1.html');
        this.load.image('bar', './images/onebar.png');
        this.load.image('barwithborder', './barwithborder.png');
        this.load.image('ball_bar', './thanh.png');
        this.load.image('ball', './ball.png');
        this.load.image('bar_unclear', './bar_unclear.png');

    }
    create() {
        this.resetCreate();
        ball_bar = this.add.image(500, 25, 'ball_bar');
        ball_bar.setScale(0.8);
        this.createBar();
        element1 = this.add.dom(0, 0).createFromCache('Scene3');
        this.createBall();

    }
    createBall() {
        for (var i = 6; i >= 3; i--) {
            ball[i] = this.add.image(280 + (6 - i) * 26, 25, 'ball');
        }
        ball[1] = this.add.image(719, 25, 'ball');
        ball[2] = this.add.image(719 - 26, 25, 'ball');
    }
    moveBall() {
        if (ball[3].x < 719 - 26 * 2) {
            ball[3].x += speed;
        }
    }
    removeBall() {
        if (ball[2].x > 280 + 4 * 26) ball[2].x -= speed;
    }

    createBar() {
        number_of_bar = Math.floor(Math.random() * 10);
        while (number_of_bar < 3 || number_of_bar > 7) {
            number_of_bar = Math.floor(Math.random() * 10);
        }

        if (number_of_bar % 2 == 0) {
            for (var i = 1; i <= number_of_bar; i++) {
                bar[i] = this.add.image(config.width / 2 + 18 - (number_of_bar - 1) * 36 + (i - 1) * 2 * 36, 275, 'bar');
            }

        }
        if (number_of_bar % 2 == 1) {
            for (var i = 1; i <= number_of_bar; i++) {
                bar[i] = this.add.image(config.width / 2 - 18 - (number_of_bar - 1) * 36 + (i - 1) * 2 * 36, 275, 'bar');
            }

        }
        for (var i = 1; i < number_of_bar; i++) {
            bar_unclear[i] = this.add.image(bar[i].x, bar[i].y, 'bar_unclear');
            barwithborder[i] = this.add.image(bar[i].x - 2, bar[i].y, 'barwithborder').setAlpha(0);
            barwithborder[number_of_bar] = this.add.image(bar[number_of_bar].x, bar[number_of_bar].y, 'barwithborder').setAlpha(0);
        }
    }
    up() {
        if (display_on == 1) {
            for (var i = 1; i < number_of_bar; i++) {
                bar_unclear[i].destroy();
            }
        }
        if (border == 1) {
            for (var i = 1; i <= number_of_bar; i++) {
                barwithborder[i].setAlpha(1);
            }
        } else {
            for (var i = 1; i <= number_of_bar; i++) {
                barwithborder[i].setAlpha(0);
            }
        }

    }
    resetCreate() {
        this.bar = [];
        this.bar_unclear = [];
        this.barwithborder = [];
        this.number_of_bar = 0;
        switch_scene = 0;
        border = 0;
        display_on = 0;

    }
    update() {
        this.up();
        if (switch_scene == 1) {
            this.moveBall();
            this.time.delayedCall(1000, function() {
                this.scene.start('Scene4');
            }, [], this);
        }
        if (switch_scene == -1) {
            this.removeBall();
            this.time.delayedCall(1000, function() {
                this.scene.start('Scene2');
            }, [], this);
        }

    }
}