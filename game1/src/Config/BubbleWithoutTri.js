export default class BubbleWithoutTri
{
    
    constructor(scene, x, y, width, height){
        this.x =x;
        this.y =y;
        //this.bubble = bubble;

        this.createBox = function(){
        var bubbleWidth = width;
        var bubbleHeight = height;
        
        var bubble = scene.add.graphics({x: x, y: y});
        //  Bubble shadow
        bubble.fillStyle(0x222222, 0.5);
        bubble.fillRoundedRect(6, 6, bubbleWidth, bubbleHeight, 16);

        //  Bubble color
        bubble.fillStyle(0xffffff, 1);

        //  Bubble outline line style
        bubble.lineStyle(4, 0x565656, 1);

        //  Bubble shape and outline
        bubble.strokeRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);
        bubble.fillRoundedRect(0, 0, bubbleWidth, bubbleHeight, 16);

    
        }

        
    }


}