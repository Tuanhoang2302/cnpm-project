var index = 0;
//var check = true;
export var spaceValid = [true, true];
export default class DragManager{
    constructor(scene, group, groupCam, initGgPosX, initGgPosY, numberOfBox){
        
        this.dragHoa = function(){

            
            for(var i = 0; i < numberOfBox; i++){
                group[i].setInteractive();
                scene.input.setDraggable(group[i]);
            }
            scene.input.on('dragstart', function(pointer, gameObject, dragX, dragY){
                for(var i = 0; i < numberOfBox; i++){
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
                        groupCam[i].setTint(0xffff00, 0xffff00, 0xff0000, 0xff0000);
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
                            gameObject.y = groupCam[i].y;
                            check = false;
                            spaceValid[i] = false;
                            groupCam[i].setTint(0xffffff);
                            scene.input.disable(gameObject);
                            break;
                        }else{
                            groupCam[i].setTint(0xffffff);
                            scene.physics.moveTo(gameObject, initGgPosX[index], initGgPosY[index], 200);
                        }
                    }else{
                        
                    }
                }
                //console.log(check);
                if(check){
                    scene.physics.moveTo(gameObject, initGgPosX[index], initGgPosY[index], 200);
                }

            }, scene);
            
        }
    }

}