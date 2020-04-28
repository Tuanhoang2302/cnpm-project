/* eslint-disable import/no-mutable-exports */
/* eslint-disable no-var */
import 'phaser';

let index = 0;
// var check = true;
export var spaceValid = [true, true, true, true, true, true, true, true, true, true];
export default class DragManager {
  constructor(scene, blockArr, holderArr, initGgPosX, initGgPosY, numberOfBox) {
    // dragHoa là 1 function
    this.dragHoa = function () {
      for (let i = 0; i < numberOfBox; i++) {
        blockArr[i].setInteractive();
        scene.input.setDraggable(blockArr[i]);
      }
      // nhớ là set Draggable ở phía trên mới dùng được dragstart, drag, dragend này nhé
      scene.input.on('dragstart', (pointer, gameObject, dragX, dragY) => {
        for (let i = 0; i < numberOfBox; i++) {
          // Game object ở đây là đối tượng mà mình drag
          if (gameObject.x == initGgPosX[i] && gameObject.y == initGgPosY[i]) {
            index = i;
            // console.log(index);
          }
        }
      });

      // console.log(index);

      scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        gameObject.x = dragX;
        gameObject.y = dragY;
        console.log('jfds');

        for (let i = 0; i < numberOfBox; i++) {
          if (Math.abs(gameObject.x - holderArr[i].x) < 30 && Math.abs(gameObject.y - holderArr[i].y) < 100) {
            if (spaceValid[i] == true) {
              holderArr[i].setTint(0xffff00, 0xffff00, 0xff0000, 0xff0000);
            }
            // console.log(i);
          } else {
            holderArr[i].setTint(0xffffff);
          }
        }
      });

      scene.input.on('dragend', (pointer, gameObject) => {
        let check = true;
        for (let i = 0; i < numberOfBox; i++) {
          if (Math.abs(gameObject.x - holderArr[i].x) < 30 && Math.abs(gameObject.y - holderArr[i].y) < 100) {
            if (spaceValid[i]) {
              gameObject.x = holderArr[i].x;
              gameObject.y = holderArr[i].y - 18;
              check = false;
              spaceValid[i] = false;
              holderArr[i].setTint(0xffffff);
              // hàm disable cái tính chất interactive của object
              scene.input.disable(gameObject);
              break;
            } else {
              holderArr[i].setTint(0xffffff);
              // hàm di chuyển 1 object, nhớ là phải set object ở dạng physics mới dùng được hàm này
              scene.physics.moveTo(gameObject, initGgPosX[index], initGgPosY[index], 400);
            }
          } else {

          }
        }
        // console.log(check);
        if (check) {
          scene.physics.moveTo(gameObject, initGgPosX[index], initGgPosY[index], 400);
        }
      }, scene);
    };
  }
}
