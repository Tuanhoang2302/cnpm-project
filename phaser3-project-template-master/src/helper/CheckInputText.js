
import {isMoving} from '../Scenes/BootScene';

export default class CheckInputText
{
    constructor(scene){
    
        this.check = function(messageBox,inputText) {
            
            if(inputText.value == 0 || inputText.value == 1){
                messageBox.bubble.setVisible(false);
              }
              if(inputText.value < 10 && inputText.value != 1 && inputText.value != 0){
                messageBox.bubble.setVisible(true);
              }else if(inputText.value > 10){
                var donvi = inputText.value % 10; 
                var chuc = (inputText.value - donvi) / 10;
                inputText.value = donvi;
              }else if(inputText.value == 10){
                isMoving[0] =true;

                scene.time.addEvent({
                  delay: 3000,
                  callback: ()=>{
                    
            
                      
                  },
                  loop: true
                  });
              
              
              }
          this.checkEnd = function (distance0, distance1) {
            inputText1.remove();
          }
        }
    }
}