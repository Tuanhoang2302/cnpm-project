import 'phaser';
// var check = true;

let index = 0;
let spaceIndex;
// let spaceValid;
// var CountAppleEachBox;
const APPLE = {
  initPosX: 185,
  initPosY: 260,
};
const RANGEAPPLE = {
  X: 43,
  Y: 43,
};
const RANGEBOX = {
  X: 270,
  Y: 150,
};

let firstBoxIndex;
let lastBoxIndex;
let currentBoxIndex;
export default class DragManager {
  constructor(scene, blockArr, holderArr, initGgPosX, initGgPosY, order, CountAppleEachBox, spaceValid) {
    // dragHoa là 1 function
    this.dragApple = function () {
      for (let i = 0; i < blockArr.length; i++) {
        blockArr[i].setInteractive();
        scene.input.setDraggable(blockArr[i]);
      }

      // nhớ là set Draggable ở phía trên mới dùng được dragstart, drag, dragend này nhé
      scene.input.on('dragstart', function (pointer, gameObject, dragX, dragY) {
        firstBoxIndex = this.FindTheBox(gameObject);

        for (var i = 0; i < holderArr.length; i++) {
          if (Math.abs(gameObject.x - holderArr[i].x) < 20 && Math.abs(gameObject.y - holderArr[i].y) < 20) {
            spaceIndex = i;
          }
        }

        for (var i = 0; i < blockArr.length; i++) {
          // Game object ở đây là đối tượng mà mình drag
          if (gameObject.x == initGgPosX[i] && gameObject.y == initGgPosY[i]) {
            index = i;
            // console.log(index);
          }
        }
      }, this);

      // console.log(index);

      scene.input.on('drag', (pointer, gameObject, dragX, dragY) => {
        gameObject.x = dragX;
        gameObject.y = dragY;

        for (let i = 0; i < holderArr.length; i++) {
          if (Math.abs(gameObject.x - holderArr[i].x) < 20 && Math.abs(gameObject.y - holderArr[i].y) < 20) {
            if (spaceValid[i]) {
              holderArr[i].setTint(0xFF0000);
            }
          } else {
            holderArr[i].setTint(0xffffff);
          }
        }
      });

      scene.input.on('dragend', (pointer, gameObject) => {
        let check = true;
        for (let i = 0; i < holderArr.length; i++) {
          if (Math.abs(gameObject.x - holderArr[i].x) < 20 && Math.abs(gameObject.y - holderArr[i].y) < 20) {
            if (spaceValid[i]) {
              gameObject.x = holderArr[i].x;
              gameObject.y = holderArr[i].y;
              initGgPosX[index] = holderArr[i].x;
              initGgPosY[index] = holderArr[i].y;

              if (gameObject.x > APPLE.initPosX - 20 && gameObject.x < APPLE.initPosX + RANGEAPPLE.X * 5
                                && gameObject.y > APPLE.initPosY - 20 && gameObject.y < APPLE.initPosY + RANGEAPPLE.Y * 2) {
                lastBoxIndex = 0;
              } else if (gameObject.x > APPLE.initPosX + RANGEBOX.X - 20 && gameObject.x < APPLE.initPosX + RANGEBOX.X + RANGEAPPLE.X * 5
                                    && gameObject.y > APPLE.initPosY - 20 && gameObject.y < APPLE.initPosY + RANGEAPPLE.Y * 2) {
                lastBoxIndex = 1;
              } else if (gameObject.x > APPLE.initPosX + RANGEBOX.X * 2 - 20 && gameObject.x < APPLE.initPosX + RANGEBOX.X * 2 + RANGEAPPLE.X * 5
                                    && gameObject.y > APPLE.initPosY - 20 && gameObject.y < APPLE.initPosY + RANGEAPPLE.Y * 2) {
                lastBoxIndex = 2;
              } else if (gameObject.x > APPLE.initPosX - 20 && gameObject.x < APPLE.initPosX + RANGEAPPLE.X * 5
                                    && gameObject.y > APPLE.initPosY + RANGEBOX.Y - 20 && gameObject.y < APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y * 2) {
                lastBoxIndex = 3;
              } else if (gameObject.x > APPLE.initPosX + RANGEBOX.X - 20 && gameObject.x < APPLE.initPosX + RANGEBOX.X + RANGEAPPLE.X * 5
                                    && gameObject.y > APPLE.initPosY + RANGEBOX.Y - 20 && gameObject.y < APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y * 2) {
                lastBoxIndex = 4;
              } else if (gameObject.x > APPLE.initPosX + RANGEBOX.X * 2 - 20 && gameObject.x < APPLE.initPosX + RANGEBOX.X * 2 + RANGEAPPLE.X * 5
                                    && gameObject.y > APPLE.initPosY + RANGEBOX.Y - 20 && gameObject.y < APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y * 2) {
                lastBoxIndex = 5;
              }

              CountAppleEachBox[firstBoxIndex]--;
              CountAppleEachBox[lastBoxIndex]++;
              console.log(CountAppleEachBox[lastBoxIndex]);

              spaceValid[spaceIndex] = true;
              spaceValid[i] = false;
              check = false;
              holderArr[i].setTint(0xffffff);
              // hàm disable cái tính chất interactive của object
              // scene.input.disable(gameObject);
              break;
            } else {
              holderArr[i].setTint(0xffffff);
              // hàm di chuyển 1 object, nhớ là phải set object ở dạng physics mới dùng được hàm này
              scene.physics.moveTo(gameObject, initGgPosX[index], initGgPosY[index], 400);
            }
          }
        }
        // console.log(check);
        if (check) {
          scene.physics.moveTo(gameObject, initGgPosX[index], initGgPosY[index], 400);
        }
      }, scene);
    };
  }

  FindTheBox(gameObject) {
    if (gameObject.x > APPLE.initPosX - 20 && gameObject.x < APPLE.initPosX + RANGEAPPLE.X * 5
            && gameObject.y > APPLE.initPosY - 20 && gameObject.y < APPLE.initPosY + RANGEAPPLE.Y * 2) {
      currentBoxIndex = 0;
    } else if (gameObject.x > APPLE.initPosX + RANGEBOX.X - 20 && gameObject.x < APPLE.initPosX + RANGEBOX.X + RANGEAPPLE.X * 5
                && gameObject.y > APPLE.initPosY - 20 && gameObject.y < APPLE.initPosY + RANGEAPPLE.Y * 2) {
      currentBoxIndex = 1;
    } else if (gameObject.x > APPLE.initPosX + RANGEBOX.X * 2 - 20 && gameObject.x < APPLE.initPosX + RANGEBOX.X * 2 + RANGEAPPLE.X * 5
                && gameObject.y > APPLE.initPosY - 20 && gameObject.y < APPLE.initPosY + RANGEAPPLE.Y * 2) {
      currentBoxIndex = 2;
    } else if (gameObject.x > APPLE.initPosX - 20 && gameObject.x < APPLE.initPosX + RANGEAPPLE.X * 5
                && gameObject.y > APPLE.initPosY + RANGEBOX.Y - 20 && gameObject.y < APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y * 2) {
      currentBoxIndex = 3;
    } else if (gameObject.x > APPLE.initPosX + RANGEBOX.X - 20 && gameObject.x < APPLE.initPosX + RANGEBOX.X + RANGEAPPLE.X * 5
                && gameObject.y > APPLE.initPosY + RANGEBOX.Y - 20 && gameObject.y < APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y * 2) {
      currentBoxIndex = 4;
    } else if (gameObject.x > APPLE.initPosX + RANGEBOX.X - 20 && gameObject.x < APPLE.initPosX + RANGEBOX.X + RANGEAPPLE.X * 5
                && gameObject.y > APPLE.initPosY + RANGEBOX.Y - 20 && gameObject.y < APPLE.initPosY + RANGEBOX.Y + RANGEAPPLE.Y * 2) {
      currentBoxIndex = 5;
    }
    return currentBoxIndex;
  }
}
