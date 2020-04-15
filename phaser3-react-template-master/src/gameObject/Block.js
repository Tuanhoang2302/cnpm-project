import 'phaser'

export default class Block
{
    constructor () {       
        this.createABlock = function(Scenee, PosX, PosY){
            //Scenee.load.image('Block', 'src/assets/Block.png');
            var block = Scenee.physics.add.image(PosX, PosY, 'Block');
            return block;
        }

        this.createArrayBlock = function(Scenee, PosX, PosY){
            //Scenee.load.image('dayChau', 'src/assets/arrBlock.png');
            var block = Scenee.add.image(PosX, PosY, 'dayChau');
            return block;
        }
    }
}