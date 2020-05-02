/* eslint-disable func-names */
export default class Audio {
  constructor(scene, loa, amthanh) {
    this.playAudio = function () {
      loa.setInteractive();
      loa.on('pointerdown', () => {
        amthanh.play();
      });
    };
  }
}
