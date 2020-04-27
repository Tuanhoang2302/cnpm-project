import 'phaser'
import Ball from '../gameObject/Ball';
import DisplayBox from '../helper/DisplayBox';
import FdInFdOut from '../helper/FdInFdOut';
import Block from '../gameObject/Block';
import CheckInputText from '../helper/CheckInputText';
import {isDisplayBorder} from '../helper/CheckInputText';

var BLOCK = {
    X:250,
    Y:120
}

const RANGEBLOCK = 90;
export var isWannaReset4 = [false];
export default class Game1Scene5 extends Phaser.Scene
{
    constructor(){
        super('Scene5');
          
    }
    preload(){
        this.load.html('question4', 'src/InputForm/scene5.html');
        this.load.image('border', 'src/assets/border.png');
        this.load.html('return', 'src/assets/text/return.html');  
        this.load.image('button', 'src/assets/next.png');
        this.load.image('dayChau', 'src/assets/arrBlock.png');
        this.load.image('ballHolder', 'src/assets/thanh.png');
        this.load.image('ball', 'src/assets/ball.png');
    }
    
    create(){
        this.Recreate();
        this.CreateBall();
        this.CreateBorder();
        this.Create_TextAndBlock();
        this.Create_Language();
        
    }

    update(){
        this.Move_Block_and_Display_NextQuestion();
        this.Display_Question1();
        this.Display_Question2();
        this.Reset_Scene();
        this.Move_Ball();
    }

//------------------------------------------------------------------------------------

    Move_Block_and_Display_NextQuestion(){
        if(this.isMovingBlock){
            var start_posY_block = BLOCK.Y + RANGEBLOCK * (this.currentBlock - 1);
            var destination = BLOCK.Y + RANGEBLOCK * this.currentBlock;
            if(this.block.y == start_posY_block) {
                var new_block = (new Block()).createArrayBlock(this, BLOCK.X, start_posY_block);
            }
            if(this.block.y < destination){
                this.block.y += 3;
            }else{
                this.currentBlock++;
                this.isDisplayNextText = true;
                this.isMovingBlock = false;
            }
        }

        if(this.isDisplayNextText){
            if(this.currentBlock == 2){
                $(document).ready(function(){
                    $("#layout_question2").delay(500).fadeIn();
                });
            }else if(this.currentBlock == 3){
                $(document).ready(function(){
                    $("#layout_question3").delay(500).fadeIn();
                });
            }else if(this.currentBlock == 4){
                $(document).ready(function(){
                    $("#layout_question4").delay(500).fadeIn();
                });
            }

            if(this.currentBlock < total_block){
                this.time.addEvent({
                    delay: 1000,
                    callback: ()=>{
                        this.isMovingBlock = true;
                    },
                    repeat: 0
                })
            }else{
 
                this.isDisplayQuestion1 = true;
            }
            this.isDisplayNextText = false;
        }
    }

    Display_Question1(){
        if(this.isDisplayQuestion1){   
            $(document).ready(function(){
                $("#layout_lastquestion").delay(1000).fadeIn();
            });
            setTimeout(() => {
                document.getElementById("inputScene4").focus();
            }, 1100);
            this.isDisplayQuestion1 = false;
        }
    }

    Display_Question2(){
        if(isDisplayQuestion2){
            $(document).ready(function(){
                $("#layout_lastquestion2").delay(1000).fadeIn();
            });
            setTimeout(() => {
                document.getElementById("inputScene4v1").focus();
            }, 1100);
            isDisplayQuestion2 = false;
        }
    }

    Reset_Scene(){
        if(isResetScene){
            if(isWannaReset){
                this.time.addEvent({
                    delay: 1000,
                    callback: ()=>{
                        this.scene.start('Scene5');
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
            if(this.ball_Last.x < 650){
                this.ball_Last.x +=3;
            }else{    
                this.time.addEvent({
                    delay: 2000,
                    callback: ()=>{
                        this.scene.start('Scene5');
                    },
                repeat:0
                })
            }
        }
    }
    

//------------------------------------------------------------------------------------

    CreateBall(){
        var ballHolder = this.add.image(540, 30, 'ballHolder');
        this.ball_Last = (function(scene){
            var ball = new Ball();
            ball.create(scene, 770, 29);
            ball.create(scene, 740, 29);
            ball.create(scene, 710, 29);
            ball.create(scene, 680, 29);
            for(var i = 0; i < 1; i++){
                var temp = ball.create(scene, 310 + 30 * i, 29);    
            }
            return temp;
        })(this);
    }

    CreateBorder(){
        for(var i = 0; i < total_block; i++){
            border.push(this.add.image(BLOCK.X, BLOCK.Y + RANGEBLOCK * i, 'border'));
            border[i].setVisible(0);
        }
    }

    Create_TextAndBlock(){
        this.block =(new Block()).createArrayBlock(this, BLOCK.X, BLOCK.Y);
        this.question_Sub = this.add.dom(750, 130).createFromCache('question4');
        this.block.setAlpha(0);
        this.fade = new FdInFdOut(this);
        this.fade.FdOut(this.block);
        $(document).ready(function(){
            $("#layout_question1").hide();
            $("#layout_question1").delay(1000).fadeIn();
        });
        this.time.addEvent({
            delay: 2000,
            callback: ()=>{
                this.isMovingBlock = true;
            },
            repeat: 0
        })
        var m = document.getElementsByClassName("layout_question");
        for(var i = 1 ; i < m.length; i++){
            m[i].style.padding = '35px 0 0 0'
            m[i].style.margin = '0 0 0 10px'
        }
        m[1].style.bottom = "7px"
    }

    Create_Language(){
        if(window.location.hash == "#vietnam"){

            var question = document.getElementsByClassName("question");
            for(var i = 0;i < question.length; i++){
                question[i].innerHTML = "Hình bên có 10 khối";
            }
            document.getElementById("lastques").innerHTML = "Tổng số thanh bên trên:"
            document.getElementById("lastques2").innerHTML = "Tổng số khối bên trên:"
             
        }
    }

    Recreate(){
        this.ball_Last = null;
        this.block = null;
        this.fade = null;
        this.isMovingBlock = false;
        this.isDisplayNextText = false;
        this.currentBlock = 1;
        this.isDisplayQuestion1 = false;
        isDisplayQuestion2 = false;
        total_block = Math.floor(Math.random() * (4 - 2 + 1) + 2);
        border = [];
        isResetScene = false;
        isWannaReset = false;
        this.is_Move_Ball = false;
    }
}

var total_block = Math.floor(Math.random() * (4 - 2 + 1) + 2);
var border = []
var isDisplayQuestion2 = false
var isResetScene =false
var isWannaReset = false;
window.Check_QuestionScene5 = function Check_QuestionScene5(){
    if ( document.getElementById('inputScene4').value!="")
    {
            var y = document.getElementById('inputScene4').value % 10;
            document.getElementById('inputScene4').value = "";
            document.getElementById('inputScene4').value = y;
        if (document.getElementById('inputScene4').value ==total_block)
        {
            for(var i = 0; i < total_block; i++){
                border[i].setVisible(0);
            }
            var textResult = document.createElement("div")
            textResult.appendChild(document.createTextNode((total_block).toString()));
            var layout_question = document.getElementById("layout_lastquestion");
            textResult.style.cssText = 'display: inline-block; font-size:60px; margin-left: 20px'
            layout_question.replaceChild(textResult,document.getElementById("answer1"))
            isDisplayQuestion2 = true;
        }
        else{
            console.log(border[0]);
            
            for(var i = 0; i < total_block; i++){
                border[i].setVisible(1);
            }
            document.getElementById('inputScene4').style.color="red";
            isWannaReset = true;
        }
    } 
}

window.Check_QuestionScene5v1 = function Check_QuestionScene5v1(){
    if ( document.getElementById('inputScene4v1').value!="")
    {
            var y = document.getElementById('inputScene4v1').value % 10;
            document.getElementById('inputScene4v1').value = "";
            document.getElementById('inputScene4v1').value = y;
        if (document.getElementById('inputScene4v1').value == total_block)
        {
            for(var i = 0; i < total_block; i++){
                border[i].setVisible(0);
            }
            document.getElementById('inputScene4v1').style.color="black";
            document.getElementById('inputScene4v2').focus();
        }
        else{
            for(var i = 0; i < total_block; i++){
                border[i].setVisible(1);
            }
            document.getElementById('inputScene4v1').style.color="red";
            isWannaReset = true;
        }
    }
}

window.Check_QuestionScene5v2 = function Check_QuestionScene5v2(){
    if ( document.getElementById('inputScene4v2').value!="")
    {
        if (document.getElementById('inputScene4v2').value == 0)
        {
            for(var i = 0; i < total_block; i++){
                border[i].setVisible(0);
            }
            var textResult = document.createElement("div")
            textResult.appendChild(document.createTextNode((total_block * 10).toString()));
            var layout_question = document.getElementById("layout_lastquestion2");
            textResult.style.cssText = 'display: inline-block; font-size:60px; margin-left: 20px'
            layout_question.replaceChild(textResult,document.getElementById("answer2"))
            isResetScene = true;
        }
        else{
            for(var i = 0; i < total_block; i++){
                border[i].setVisible(1);
            }
            document.getElementById('inputScene4v2').style.color="red";
            isWannaReset = true;
            
        }
    }
}