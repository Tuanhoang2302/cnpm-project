var index = 0;
//var check = true;
export var spaceValid = [true, true,true, true,true, true,true, true,true, true];
export default class DragManager{
    constructor(scene, group, groupCam, initGgPosX, initGgPosY, numberOfBox){
        // dragHoa là 1 function 
        this.dragHoa = function(){

            for(var i = 0; i < numberOfBox; i++){
                group[i].setInteractive();
                scene.input.setDraggable(group[i]);
            }
            // nhớ là set Draggable ở phía trên mới dùng được dragstart, drag, dragend này nhé
            scene.input.on('dragstart', function(pointer, gameObject, dragX, dragY){
                for(var i = 0; i < numberOfBox; i++){
                    // Game object ở đây là đối tượng mà mình drag
                    if(gameObject.x == initGgPosX[i] && gameObject.y == initGgPosY[i]){
                        index = i;
                        //console.log(index);
                    }
                }
            });

            //console.log(index);
            
            scene.input.on('drag', function(pointer, gameObject, dragX, dragY){
                gameObject.x = dragX;
                gameObject.y = dragY;
                
                for(var i = 0; i < numberOfBox; i++){
                    if(Phaser.Math.Distance.Between(gameObject.x, gameObject.y, groupCam[i].x, groupCam[i].y) < 50 ){
                        if(spaceValid[i] == true){
                            groupCam[i].setTint(0xffff00, 0xffff00, 0xff0000, 0xff0000);
                        }
                            //console.log(i);
                            
                    }else{
                        groupCam[i].setTint(0xffffff);
                    }
                }                 
            });

            scene.input.on('dragend', function(pointer, gameObject){
                
                var check = true;
                for(var i = 0; i < numberOfBox; i++){
                   
                    if(Phaser.Math.Distance.Between(gameObject.x, gameObject.y, groupCam[i].x, groupCam[i].y) < 50){
                        if(spaceValid[i]){
                            gameObject.x = groupCam[i].x;
                            gameObject.y = groupCam[i].y - 18;
                            check = false;
                            spaceValid[i] = false;
                            groupCam[i].setTint(0xffffff);
                            //hàm disable cái tính chất interactive của object
                            scene.input.disable(gameObject);
                            break;
                        }else{
                            groupCam[i].setTint(0xffffff);
                            // hàm di chuyển 1 object, nhớ là phải set object ở dạng physics mới dùng được hàm này
                            scene.physics.moveTo(gameObject, initGgPosX[index], initGgPosY[index], 400);
                        }
                    }else{
                        
                    }
                }
                //console.log(check);
                if(check){
                    scene.physics.moveTo(gameObject, initGgPosX[index], initGgPosY[index], 400);
                }

            }, scene);
            
        }
    }

}