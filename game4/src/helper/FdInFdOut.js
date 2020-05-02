export default class FdInFdOut
{
    constructor(scene){
        this.FdIn = function(obj1, obj2){
            scene.tweens.add({
            targets: [obj1, obj2],
            alpha: 0,
             duration: 1000,
            ease: 'Power2'
            }, scene);
        }

        this.FdOut = function(obj1, obj2){
            scene.tweens.add({
            targets: [obj1, obj2],
            alpha: 1,
            duration: 1000,
            ease: 'Power2'
            }, scene);
        }
    }
}