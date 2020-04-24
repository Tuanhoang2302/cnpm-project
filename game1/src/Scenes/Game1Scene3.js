import 'phaser';
import BubbleBox from '../helper/BubbleBox';
import CheckInputText from '../helper/CheckInputText';
import FdInFdOut from '../helper/FdInFdOut';
import MessageBox from  '../helper/MessageBox';
import DisplayBox from '../helper/DisplayBox';
import Ball from '../gameObject/Ball';
import Block from '../gameObject/Block';

export var isWannaReset3 = [false];

var BLOCK = {
    X:250,
    Y:140
}

var RANGEBLOCK = 150;

export default class Game1Scene3 extends Phaser.Scene {
  //hello = 2;
    constructor () {
        super('Scene3'); 
    
    }
    preload () {
        this.load.html('question2', 'src/InputForm/scene3.html');
       
        this.load.html('return', 'src/assets/text/return.html');  
        this.load.image('button', 'src/assets/next.png');
        this.load.image('dayChau', 'src/assets/arrBlock.png');
        this.load.image('ballHolder', 'src/assets/thanh.png');
        this.load.image('ball', 'src/assets/ball.png');
    }
    
    create () {
        this.ReCreate();
        this.Create_Ball();
        this.Create_QuestionAndInput();
        this.block =(new Block()).createArrayBlock(this, BLOCK.X, BLOCK.Y);
        this.Create_Language();
        
    }

    update(){
        isWannaReset3[0] = this.isWannaReset;
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
                var text10 =document.createElement("div")
                text10.appendChild(document.createTextNode("10"));
                var layout_question = document.getElementById("layout_question" + this.input_Index);
                text10.style.cssText = 'display: inline-block; font-size:45px;'
                layout_question.replaceChild(text10,document.getElementById("answer" + this.input_Index))
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
            is_Display_LastResult = true;
            this.is_Display_LastQuestion = false   
        }
    }

    Display_LastResult(){
        if(is_Display_LastResult){        
            this.Check_AnswerOfLastQuestion();
        }
    }

    Check_AnswerOfLastQuestion(){ 

      var input_currentValue1 = document.getElementById("input" + (/*input_Index =*/4 * 2 - 1).toString()).value;
      var input_currentValue2 = document.getElementById("input" + (/*input_Index =*/4 * 2).toString()).value;

      if((input_currentValue1 != "" && input_currentValue1 != subquestion_TotalNumber) || 
          (input_currentValue2 != "" && input_currentValue2 != 0)){
          this.isWannaReset = true;
      }
        if(input_currentValue2 != "" && input_currentValue2 == 0){
            var textResult =document.createElement("div")
            textResult.appendChild(document.createTextNode((subquestion_TotalNumber * 10).toString()));
            var layout_question = document.getElementById("layout_lastquestion");
            textResult.style.cssText = 'display: inline-block; font-size:60px; margin-left: 20px'
            layout_question.replaceChild(textResult,document.getElementById("answer" + /*input_Index =*/4))
            is_Display_LastResult = false;
            this.isResetScene = true
        }
        //this.is_input_Cheking = false;
    
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
                this.is_Move_Ball = true;
            }
        }
    }

    Move_Ball(){
        if(this.is_Move_Ball){
            if(this.ball_Last.x < 710){
                this.ball_Last.x +=3;
            }else{    
                this.time.addEvent({
                    delay: 2000,
                    callback: ()=>{
                        this.scene.start('Scene4');
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
            ball.create(scene, 740, 15);
            for(var i = 0; i < 3; i++){
                var temp = ball.create(scene, 310 + 30 * i, 15);    
            }
            return temp;
        })(this);
    }

    Create_QuestionAndInput(){
        this.question_TotalNumber = 3;
        this.input_Index = 1;
        this.question_Sub = this.add.dom(750, 150).createFromCache('question2');
        for(var i = 1; i <= this.question_TotalNumber; i++){
            var tmp = document.getElementById("input" + (i * 2).toString());
            this.input_Value_arr.push(tmp.value);
            
        }
    }

    Create_Language(){
        if(window.location.hash == "#vietnam"){

            var question = document.getElementsByClassName("question");
            var word_end_question = document.getElementsByClassName("word_end_question")
            var thought = document.getElementsByClassName("result");
            for(var i = 0;i < question.length; i++){
                question[i].innerHTML = "Có tất cả ";
                word_end_question[i].innerHTML = "khối"
                thought[i].innerHTML = "Có tất cả 10 khối."
            }
            document.getElementById("lastques").innerHTML = "Tổng số khối bên trên:"
             
        }
    }


    ReCreate(){
        this.fade = null;
        this.ball_Last = null;
        this.subquestion_TotalNumber = 2;
        subquestion_TotalNumber =2;
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
        pos = [0, 0, 0, 0];
        isWannaReset3[0] = false;
        
    }
  
};
var subquestion_TotalNumber =2;
var is_Display_LastResult = false;
var pos = [0, 0, 0, 0];


