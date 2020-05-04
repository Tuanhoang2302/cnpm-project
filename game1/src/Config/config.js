import 'phaser';
import FadePlugin from '../../node_modules/phaser3-rex-plugins/plugins/fade-plugin.js';

// tạo khung cho game
export default {

  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1080,
  height: 680,
  backgroundColor: '0xffffff',
  scale: {

    // autoCenter: Phaser.Scale.CENTER_HORIZONTALLY,
  },

  // cái này dùng để enable cái dom trong bootGame
  dom: {
    createContainer: true,
  },

  // cái này dùng để enable physics function
  physics: {
    default: 'arcade',
    arcade: {

      debug: true,
    },
  },

  // cái này dùng để enable audio function
  audio: {
    disableWebAudio: true,
  },

  plugins: {
    global: [{
      key: 'rexFade',
      plugin: FadePlugin,
      start: true,
    }],
  },
};
