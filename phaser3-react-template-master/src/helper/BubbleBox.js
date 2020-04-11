
export var content;

// cái này chủ yếu là kĩ thuật dùng graphic, mọi người có thể tự tìm hiểu
export default class BublleBox
{
    quote ;
    constructor(scene, width, height, quote, bubble, sizeFont){
        this.bubble = bubble;
        this.sizeFont = sizeFont;
        this.quote = quote;

        this.createBox = function(){
        var bubbleWidth = width;
        var bubbleHeight = height;
        var bubblePadding = 10;
        var arrowHeight = bubbleHeight / 4;

        
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

        content = scene.add.text(0, 0, quote, { fontFamily: 'Arial', fontSize: sizeFont, color: '#000000', align: 'center', wordWrap: { width: bubbleWidth - (bubblePadding * 2) } });

        var b = content.getBounds();

        content.setPosition(bubble.x + (bubbleWidth / 2) - (b.width / 2), bubble.y + (bubbleHeight / 2) - (b.height / 2));
        
        
        }

        this.createText = function(txt){
            var bubbleWidth = width;
            var bubbleHeight = height;
            var bubblePadding = 10;
            content = scene.add.text(0, 0, txt, { fontFamily: 'Arial', fontSize: sizeFont, color: '#000000', align: 'center', wordWrap: { width: bubbleWidth - (bubblePadding * 2) } });

            var b = content.getBounds();

            content.setPosition(bubble.x + (bubbleWidth / 2) - (b.width / 2), bubble.y + (bubbleHeight / 2) - (b.height / 2));
        }
    }

}