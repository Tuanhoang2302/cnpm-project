
export default class CheckInputText
{
    constructor(scene, inputText1, groupChau, inputText2){
        this.check1 = function(distance) {
            if(inputText1.value == 0){
                //bubble.clear();
              }
              if(inputText1.value < 10 && inputText1.value != 1 && inputText1.value != 0){
              
                //pp.stop();
                //bubble.clear();
              }else if(inputText1.value > 10){
                var donvi = inputText1.value % 10; 
                var chuc = (inputText1.value - donvi) / 10;
                inputText1.value = donvi;
              }else if(inputText1.value == 10){
                scene.time.addEvent({
                  delay: 1000,
                  callback: ()=>{
                    scene.physics.moveTo(groupChau[0], 200, 300, 200);
                    //scene.physics.moveTo(groupChau[1], 200, 300, 200);
                  },
                  loop: true
                  })
              
                if (distance < 4)
                {
                  groupChau[0].body.reset(200, 300);
                  //groupChau[1].body.reset(200, 300);
                }
                inputText2.focus();
                
              }
          this.checkEnd = function (distance0, distance1) {
            inputText1.remove();
          }
        }
    }
}