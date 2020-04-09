export default class Audio
{
    constructor(scene, loa, amthanh){
        this.playAudio = function(){
            loa.setInteractive();
            loa.on('pointerdown', function (pointer) {
            amthanh.play();
            })

        }
    }
}