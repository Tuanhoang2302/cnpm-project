import 'phaser';
export var isDisplayBorder = [false];
export var boxDisappear = [false];
export default class CheckInputText
{
    constructor(scene){
    
        this.check = function(msggraphicArr, msgContentArr,inputText, isRightAnswer, isWannaReset, desiredResult) {
            if(desiredResult >= 10){
              //console.log(inputText.value);
              
            if(inputText.value == 0 || inputText.value == (desiredResult / 10)){
                //messageBox.bubble.setVisible(false);
                isDisplayBorder[0] = false;
                boxDisappear[0] = false;
                if(msggraphicArr != null && msgContentArr != null){
                    msggraphicArr.setAlpha(0);
                    msgContentArr.setAlpha(0);
                }
              }
              if(inputText.value < 10 && inputText.value != desiredResult / 10 && inputText.value != 0){
                //messageBox.bubble.setVisible(true);
                isDisplayBorder[0] = true;
                boxDisappear[0] = true;
                if(msggraphicArr != null && msgContentArr != null){
                  msggraphicArr.setAlpha(1);
                  msgContentArr.setAlpha(1);
                }
                isWannaReset[0] = true;
              }else if(inputText.value > 10 && inputText.value != desiredResult){
                var donvi = inputText.value % 10; 
                var chuc = (inputText.value - donvi) / 10;
                inputText.value = donvi;
              }else if(inputText.value == desiredResult){
                isDisplayBorder[0] = false;
                isRightAnswer[0] =true;
                boxDisappear[0] = false;         
              
              }
            }
            
            else{
              //console.log(inputText.value);
              //console.log(desiredResult);
              
              if(inputText.value == 0){
                //messageBox.bubble.setVisible(false);
                isDisplayBorder[0] = false;
                if(msggraphicArr != null && msgContentArr != null){
                    msggraphicArr.setAlpha(0);
                    msgContentArr.setAlpha(0);
                }
              }
              if(inputText.value != desiredResult && inputText.value != 0){
                //messageBox.bubble.setVisible(true);
                isDisplayBorder[0] = true;
                if(msggraphicArr != null && msgContentArr != null){
                  msggraphicArr.setAlpha(1);
                  msgContentArr.setAlpha(1);
                }
                isWannaReset[0] = true;
              }
              if(inputText.value > 10){
                var donvi = inputText.value % 10; 
                inputText.value = donvi;
              }else if(inputText.value == desiredResult){
                isDisplayBorder[0] = false;
                isRightAnswer[0] =true;         
              
              }
            }
          this.checkEnd = function (distance0, distance1) {
            inputText1.remove();
          }
        }
    }
}