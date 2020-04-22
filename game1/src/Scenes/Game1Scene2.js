import 'phaser';
import BubbleBox from '../helper/BubbleBox';
import CheckInputText from '../helper/CheckInputText';
import FdInFdOut from '../helper/FdInFdOut';
import MessageBox from  '../helper/MessageBox';
import DisplayBox from '../helper/DisplayBox';
import Ball from '../gameObject/Ball';
import Block from '../gameObject/Block';

export var isWannaReset2 = [false];

var BLOCK = {
    X:250,
    Y:140
}

var RANGEBLOCK = 150;

export default class Game1Scene2 extends Phaser.Scene {
  //hello = 2;
    constructor () {
        super('Scene2'); 
    
    }
    preload () {
        var txt =  'src/InputForm/answer' +(3).toString() +'.html'; 
        this.load.html('question', txt); 
        this.load.html('return', 'src/assets/text/return.html');  
    //this.load.image('Chau', 'src/assets/chau.png');
        this.load.image('button', 'src/assets/next.png');
        this.load.image('dayChau', 'src/assets/arrBlock.png');
        this.load.image('ballHolder', 'src/assets/thanh.png');
        this.load.image('ball', 'src/assets/ball.png');
    }
    
    create () {
        this.ReCreate();
        this.Create_Ball();
        this.Create_QuestionAndInput();
        
        this.fade = new FdInFdOut(this)
        this.block =(new Block()).createArrayBlock(this, BLOCK.X, BLOCK.Y);
        this.input.on('pointerdown', function(pointer){
            var touchX = pointer.x;
            var touchY = pointer.y;
            console.log(touchX);
            console.log(touchY);
            
            
            // ...
         });
    }

    update(){
        isWannaReset2[0] = this.isWannaReset;
        this.Check_AnswerOfSubQuestion();
        this.Move_Block_and_Display_NextSubQuestion();
        this.Display_LastQuestion();
        this.Display_LastResult();
        this.Reset_Scene();
        this.Move_Ball();
    }

//--------------------------------------------------------------------------------------------------

    Check_AnswerOfSubQuestion(){

        if(this.is_Cheking_Answer == true && this.input_Index <= this.subquestion_TotalNumber){
            
            var input_currentValue1 = document.getElementById("input" + (this.input_Index * 2 - 1).toString()).value;
            var input_currentValue2 = document.getElementById("input" + (this.input_Index * 2).toString()).value;

            if((input_currentValue1 != "" && input_currentValue1 != 1) || 
               (input_currentValue2 != "" && input_currentValue2 != 0)){
                this.isWannaReset = true;
            }
            if(input_currentValue2 != "" && input_currentValue2 == 0){
                document.getElementById("answer" + this.input_Index).remove();
                document.getElementById("ques" + this.input_Index).innerHTML="There are 10";
                this.is_Move_Block = true;
                this.is_Cheking_Answer = false;
                this.input_Index++;
            }
            //this.is_input_Cheking = false;
        }
    }

    Move_Block_and_Display_NextSubQuestion(){

        if(this.is_Move_Block){
            if(this.input_Index <= this.subquestion_TotalNumber){
                var start_posY_block = BLOCK.Y + RANGEBLOCK * (this.input_Index - 2);
                var destination_posY_block = BLOCK.Y + RANGEBLOCK * (this.input_Index - 1);
                if(this.block.y == start_posY_block) {
                    var new_block = (new Block()).createArrayBlock(this, BLOCK.X, start_posY_block);
                }
                if(this.block.y < destination_posY_block){
                    this.block.y += 3;
                }else{
                    this.is_Display_SubQuestion = true;
                    this.is_Move_Block = false;
                }
            }else{
                this.is_Display_SubQuestion = true;
                this.is_Move_Block = false;
            }   
        }

        if(this.is_Display_SubQuestion){
            if(this.input_Index == 2 && this.subquestion_TotalNumber > 1){
                $(document).ready(function(){
                    $("#layout_question2").delay(200).fadeIn();
                });    
            }else if(this.input_Index == 3 && this.subquestion_TotalNumber > 2){
                $(document).ready(function(){
                    $("#layout_question3").delay(200).fadeIn();
                });
            }
            if(this.input_Index > this.subquestion_TotalNumber){
                this.is_Display_LastQuestion = true;
            }
            this.is_Cheking_Answer = true;
            this.is_Display_SubQuestion = false;
            
        }   
    }

    Display_LastQuestion(){
        if(this.is_Display_LastQuestion){
            $(document).ready(function(){
                $("#layout_lastquestion").delay(200).fadeIn();
            });
            this.is_Display_LastQuestion = false   
        }
    }

    Display_LastResult(){
        if(is_Display_LastResult){
            var desEnd = (RANGEBLOCK -20) * (subquestion_TotalNumber - 1 + 1) + 20 * (subquestion_TotalNumber - 1)
            for(var i = 1; i <= subquestion_TotalNumber; i++){
                var body = document.getElementById('panelresult' + i);
                var destination = (RANGEBLOCK -20) * (subquestion_TotalNumber - i + 1) + 20 * (subquestion_TotalNumber - i) 
                if(pos[i] != destination){
                    pos[i] += 2;
                    body.style.top = pos[i] + "px";
                
                }
        
            }
            if(pos[1] == desEnd){
                for(var i = 1;i <=subquestion_TotalNumber ; i++){
                    if(i != subquestion_TotalNumber){
                        document.getElementById('panelresult' + i).style.border = "0px";
                    }
                    document.getElementById('panelresult' + i).style.display ="none";
                }
                document.getElementById('layout_lastquestion').style.display =  "none";
                document.getElementById('panelresult' + subquestion_TotalNumber).innerText = (subquestion_TotalNumber * 10).toString();
                $(document).ready(function(){  
                    for(var i = 1; i <= subquestion_TotalNumber; i++){
                        $("#panelresult" + i).delay(200).fadeIn();  
                    }
                    $("#layout_lastquestion").delay(200).fadeIn(); 
                });
                is_Display_LastResult = false;
                this.isResetScene = true;
            }
            
        }
    }

    Reset_Scene(){
        if(this.isResetScene){
            if(this.isWannaReset){
                this.time.addEvent({
                    delay: 1000,
                    callback: ()=>{
                        //this.scene.start('Reset');
                    },
                    repeat: 0
                })
            }else{
                console.log("fds");
                
                this.is_Move_Ball = true;
            }
        }
    }

    Move_Ball(){
        if(this.is_Move_Ball){
            if(this.ball_Last < 740){
                this.ball_Last +=3;
            }else{    
                this.time.addEvent({
                    delay: 2000,
                    callback: ()=>{
                        this.scene.start('Scene3');
                    },
                repeat:0
                })
            }
        }
    }

//---------------------------------------------------------------------------------------------------

    Create_Ball(){
        var ballHolder = this.add.image(540, 16, 'ballHolder');
        this.ball_Last = (function(scene){
            var ball = new Ball();
            ball.create(scene, 770, 15);
            for(var i = 0; i < 4; i++){
                var temp = ball.create(scene, 310 + 30 * i, 15);    
            }
            return temp;
        })(this);
    }

    Create_QuestionAndInput(){
        this.question_TotalNumber = 3;
        this.input_Index = 1;
        this.question_Sub = this.add.dom(750, 150).createFromCache('question');
        for(var i = 1; i <= this.question_TotalNumber; i++){
            var tmp = document.getElementById("input" + (i * 2).toString());
            this.input_Value_arr.push(tmp.value);
            
        }
    }

    ReCreate(){
        this.fade = null;
        this.ball_Last = null;
        this.subquestion_TotalNumber = 3;
        this.input_Index = 1;
        this.question_Index = 1;
        this.question_Sub = null;
        this.input_Value_arr = [];
        this.block = null;
        this.is_Move_Block = false;
        this.is_Display_SubQuestion = false;
        this.is_Cheking_Answer = true;
        this.isWannaReset = false;
        this.isResetScene = false;
        this.is_Display_LastQuestion = false;
        this.is_Move_Ball = false;
        is_Display_LastResult = false;
        subquestion_TotalNumber = this.subquestion_TotalNumber;
        pos = [0, 0, 0, 0];
    }
  
};
var subquestion_TotalNumber;
var is_Display_LastResult = false;
var pos = [0, 0, 0, 0];

window.Click_Button = function Click_Button(){
    $(document).ready(function(){
        $("#button").delay(200).fadeOut();
    }); 
    
    for(var i = 1; i <= subquestion_TotalNumber; i++){
        var resultPanel = document.createElement('div')
        
        resultPanel.id = 'panelresult' + (i).toString();
        var body = document.getElementById('body');
        var text = document.createTextNode("10")
        resultPanel.appendChild(text);
        resultPanel.style.cssText = 'display:none; position: relative;border-radius: 25px; background: #FFFFFF; padding: 20px;width: 40px;height: 40px; font-size:35px; align-text:center; border: 1px solid; box-shadow: 5px 10px #d3d3d3';
        var beReplaced = document.getElementById('layout_question' + i);
        body.replaceChild(resultPanel, beReplaced);
    }

    document.getElementById('layout_lastquestion').style.display = "none";
    //document.getElementById('layout_lastquestion').style.position = "absolute";
    $(document).ready(function(){  
        for(var i = 1; i <= subquestion_TotalNumber; i++){
            $("#panelresult" + i).delay(200).fadeIn();
        }
        $("#layout_lastquestion").delay(200).fadeIn();
    }); 
    is_Display_LastResult = true;
}
