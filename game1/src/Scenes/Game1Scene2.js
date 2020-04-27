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
        
        this.load.html('question', 'src/InputForm/scene2.html'); 
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
        this.block =(new Block()).createArrayBlock(this, BLOCK.X, BLOCK.Y);
        this.Create_Language();
        
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

        if(this.isChekingAnswer == true && this.input_Index <= this.subquestion_TotalNumber){
            
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
                this.isMoveBlock = true;
                this.isChekingAnswer = false;
                this.input_Index++;
            }
            //this.is_input_Cheking = false;
        }
    }

    Move_Block_and_Display_NextSubQuestion(){

        if(this.isMoveBlock){
            if(this.input_Index <= this.subquestion_TotalNumber){
                var start_posY_block = BLOCK.Y + RANGEBLOCK * (this.input_Index - 2);
                var destination_posY_block = BLOCK.Y + RANGEBLOCK * (this.input_Index - 1);
                if(this.block.y == start_posY_block) {
                    var new_block = (new Block()).createArrayBlock(this, BLOCK.X, start_posY_block);
                }
                if(this.block.y < destination_posY_block){
                    this.block.y += 3;
                }else{
                    this.isDisplaySubQuestion = true;
                    this.isMoveBlock = false;
                }
            }else{
                this.isDisplaySubQuestion = true;
                this.isMoveBlock = false;
            }   
        }

        if(this.isDisplaySubQuestion){
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
                this.isDisplayLastQuestion = true;
            }
            this.isChekingAnswer = true;
            this.isDisplaySubQuestion = false;
            
        }   
    }

    Display_LastQuestion(){
        if(this.isDisplayLastQuestion){
            $(document).ready(function(){
                $("#layout_lastquestion").delay(200).fadeIn();
            });
            this.isDisplayLastQuestion = false   
        }
    }

    Display_LastResult(){
        if(isDisplayLastResult){
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
                isDisplayLastResult = false;
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
                        this.scene.start('Scene2');
                    },
                    repeat: 0
                })
            }else{
 
                this.isMoveBall = true;
            }
        }
    }

    Move_Ball(){
        if(this.isMoveBall){
            if(this.ball_Last.x < 740){
                this.ball_Last.x +=3;
            }else{    
                this.time.addEvent({
                    delay: 2000,
                    callback: ()=>{
                        //window.location.href = 'https://example.com/'
                        this.scene.start('Scene3');
                    },
                repeat:0
                })
            }
        }
    }

//---------------------------------------------------------------------------------------------------

    Create_Ball(){
        var ballHolder = this.add.image(540, 30, 'ballHolder');
        this.ball_Last = (function(scene){
            var ball = new Ball();
            ball.create(scene, 770, 29);
            for(var i = 0; i < 4; i++){
                var temp = ball.create(scene, 310 + 30 * i, 29);    
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

    Create_Language(){
        if(window.location.hash == "#vietnam"){

            var question = document.getElementsByClassName("question");
            console.log(question.length);
            
            var word_end_question = document.getElementsByClassName("word_end_question")
            var thought = document.getElementsByClassName("result");
            for(var i = 0;i < question.length; i++){
                question[i].innerHTML = "Hình bên có ";
                word_end_question[i].innerHTML = " khối"
                thought[i].innerHTML = "Hình bên có 10 khối."
            }
            document.getElementById("lastques").innerHTML = "Tổng số khối bên trên?"
             
        }
    }


    ReCreate(){
        this.fade = null;
        this.ball_Last = null;
        this.subquestion_TotalNumber = Math.floor(Math.random() * (3 - 1 + 1) + 1);
        this.input_Index = 1;
        this.question_Index = 1;
        this.question_Sub = null;
        this.input_Value_arr = [];
        this.block = null;
        this.isMoveBlock = false;
        this.isDisplaySubQuestion = false;
        this.isChekingAnswer = true;
        this.isWannaReset = false;
        this.isResetScene = false;
        this.isDisplayLastQuestion = false;
        this.isMoveBall = false;
        isDisplayLastResult = false;
        subquestion_TotalNumber = this.subquestion_TotalNumber;
        pos = [0, 0, 0, 0];
        isWannaReset2[0] = false;
        
    }
  
};
var subquestion_TotalNumber;
export var isDisplayLastResult = false;
var pos = [0, 0, 0, 0];

window.Click_Button = function Click_Button(){
   document.getElementById("button").style.display = "none";
    
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
    isDisplayLastResult = true;
}
