import BubbleBox from './BubbleBox';
import MessageBox from './MessageBox';

export default class DisplayBox{
    constructor(scene){
        this.displayBubbleBox = function(x, y, bubbleWidth, bubbleHeight, qoute, sizeFont, graphicArr, contentArr, fade){
            var bbgraphic = scene.add.graphics({ x: x, y: y});
            var bubbleBox = new BubbleBox(scene, bubbleWidth, bubbleHeight, '', bbgraphic, 20);
            bubbleBox.createBox();
            bbgraphic.setAlpha(0);
            graphicArr.push(bbgraphic);

            var bubblePadding = 10;
            var content = scene.add.text(0, 0, qoute, { fontFamily: 'Arial', fontSize: sizeFont, color: '#000000', align: 'center', wordWrap: { width: bubbleWidth - (bubblePadding * 2) } });
            var b = content.getBounds();
            content.setPosition(bbgraphic.x + (bubbleWidth / 2) - (b.width / 2), bbgraphic.y + (bubbleHeight / 2) - (b.height / 2));
            content.setAlpha(0);
            contentArr.push(content);
            fade.FdOut(bbgraphic, content);
        }

        this.displayMessageBox = function(x, y, bubbleWidth, bubbleHeight, qoute, sizeFont, msgGraphicArr, msgContentArr){
            var bbgraphic = scene.add.graphics({ x: x, y: y});
            var bubbleBox = new MessageBox(scene, bubbleWidth, bubbleHeight, '', bbgraphic, 20);
            bubbleBox.createBox();
            bbgraphic.setAlpha(0);
            msgGraphicArr.push(bbgraphic);

            var bubblePadding = 10;
            var content = scene.add.text(0, 0, qoute, { fontFamily: 'Arial', fontSize: sizeFont, color: '#000000', align: 'center', wordWrap: { width: bubbleWidth - (bubblePadding * 2) } });
            var b = content.getBounds();
            content.setPosition(bbgraphic.x + (bubbleWidth / 2) - (b.width / 2), bbgraphic.y + (bubbleHeight / 2) - (b.height / 2));
            content.setAlpha(0);
            msgContentArr.push(content);
            //fade.FdOut(bbgraphic, content);
        }
    }
}