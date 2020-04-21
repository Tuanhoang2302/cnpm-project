import 'phaser';
import BubbleBox from '../helper/BubbleBox';
import CheckInputText from '../helper/CheckInputText';
import FdInFdOut from '../helper/FdInFdOut';
import MessageBox from  '../helper/MessageBox';
import DisplayBox from '../helper/DisplayBox';
import Ball from '../gameObject/Ball';
import Block from '../gameObject/Block';

export var isWannaReset2 = [false];
export var m = 0;

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
    }

    update(){
        this.Check_AnswerOfSubQuestion();
        this.Move_Block_and_Display_NextSubQuestion();
        this.Display_LastQuestion();
        
    }

//--------------------------------------------------------------------------------------------------

    Check_AnswerOfSubQuestion(){

        if(this.is_Cheking_Answer == true && this.input_Index < 4){
            
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
            if(this.input_Index < 4){
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
            if(this.input_Index == 2){
                $(document).ready(function(){
                    $("#layout_question2").delay(200).fadeIn();
                });    
            }else if(this.input_Index == 3){
                $(document).ready(function(){
                    $("#layout_question3").delay(200).fadeIn();
                });
            }
            if(this.input_Index == 4){
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
        this.question_TotalNumber = 3;
        this.input_Index = 1;
        this.question_Index = 1;
        this.question_Sub = null;
        this.input_Value_arr = [];
        this.block = null;
        this.is_Move_Block = false;
        this.is_Display_SubQuestion = false;
        this.is_Cheking_Answer = true;
        this.isWannaReset = false;
        this.is_Display_LastQuestion = false;
    }
  
};
