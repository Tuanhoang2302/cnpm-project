var  hien =0;
var bor=0;
function myFunction1(id){
    if (document.getElementById('number1').value!="")
    {
        var x= document.getElementById('number1').value%10;
    document.getElementById('number1').value=x;
    if (x==1)
    {
      
        document.getElementById('number1').style.color="black";
        document.getElementById(id).focus();
     
    }
    else {
        
        document.getElementById('number1').style.color="red";  
     document.getElementById('tbao').style.display="flex";
    }
    }
    
    }
    function myFunction2(id){
        if ( document.getElementById('number2').value!="")
        {
            var y= document.getElementById('number2').value%10;
    document.getElementById('number2').value=y;
    if (y==0)
    {
      
        document.getElementById('tbao').style.display="none";
         var child = document.getElementById("answer1");
         child.remove();
         document.getElementById("ques1").innerHTML="How many apples are in the box: 10";
         document.getElementById('question2').style.display="flex";
         document.getElementById(id).focus();
    }
    else{
        
        document.getElementById('tbao').style.display="flex";
        document.getElementById('number2').style.color="red";
    }
        }
    
    }
    function myFunction3(){
       if (document.getElementById('number3').value!="")
       {
          
        var z= document.getElementById('number3').value%10;
        document.getElementById('number3').value=z;
        if (z==1)
        {
            numberqu=1;
            document.getElementById('border').style.display="none";
            var child = document.getElementById("answer2");
         child.remove();
         document.getElementById("ques2").innerHTML="Total number of boxes: 1";
        }
        else {
            numberqu=-2;
         document.getElementById('number3').style.color="red";
            document.getElementById('border').style.display="flex";
        }
       }
        
    }
   
function myFunction4(){
    if (document.getElementById('nu1').value!=""&&document.getElementById('nu1').value>='0'&&document.getElementById('nu1').value<='9')
    {
        var x= document.getElementById('nu1').value%10;
        document.getElementById('nu1').value=x;
    }
    if (x==1)
    {
        document.getElementById('change').style.backgroundColor="#ffffff";
        document.getElementById('nu1').style.color="black";
        document.getElementById('nu2').focus();
     
    }
    else {
        chuyenman=-2;
        document.getElementById('change').style.backgroundColor="#ffd000";
        document.getElementById('nu1').style.color="red";  
    }
    

}
function myFunction5()
{
    if ( document.getElementById('nu2').value!="")
    {
        var y= document.getElementById('nu2').value%10;
document.getElementById('nu2').value=y;
    }
if (y==0)
   {
     var child = document.getElementById("c1");
     child.remove();
     document.getElementById('boxtext').innerHTML="box: 10";
     document.getElementById('q2').style.display="flex";
     document.getElementById('nu3').focus();
      hien =1;
     
   }
else{
    chuyenman=-2;
    document.getElementById('nu2').style.color="red";
    }
}

function myFunction6(){
    if (document.getElementById('nu3').value!="")
    {
     var z= document.getElementById('nu3').value%10;
     document.getElementById('nu3').value=z;
     if (z==sohop)
     {
         bor=0;
         var child = document.getElementById("nu3");
         child.remove();
         document.getElementById("text2").innerHTML="Total number of boxes: "+sohop;
         document.getElementById('yeucau').innerHTML="How many apples are there: ";
         document.getElementById('c2').style.display="flex";
         document.getElementById('nu4').focus();
         
     }
     else {
         chuyenman=-2;// da tung bi sai
         bor=1;
        document.getElementById('nu3').style.color="red";
     }
    }
     
 }
 function myFunction7(){
    if (document.getElementById('nu4').value!="")
    {
     var z= document.getElementById('nu4').value%10;
     document.getElementById('nu4').value=z;
     if (z==sohop)
     {
         bor=0;
         document.getElementById('nu4').style.color="black";
         document.getElementById('nu5').focus();
     }
     else {
         chuyenman=-2;
         bor=1;
        document.getElementById('nu4').style.color="red";
     }
    }
     
 }
 function myFunction8(){
    if (document.getElementById('nu5').value!="")
    {
     var z= document.getElementById('nu5').value%10;
     document.getElementById('nu5').value=z;
     if (z==0)
     {
        
        document.getElementById('hint').style.display="none";
        document.getElementById('nu5').style.color="black";
        var child = document.getElementById("c2");
        child.remove();
        document.getElementById('yeucau').innerHTML="How many apple are there: "+sohop+'0';
        if (chuyenman==0) chuyenman=1;
        else{
            chuyenman=-1;
            document.getElementById('yeucau').innerHTML="How many apple are there? ";
            

        } 
     }
     else {
         chuyenman=-2;
        document.getElementById('nu5').style.color="red";
        document.getElementById('hint').style.display="flex";

     }
    }
     
 }
function myFunction9(){
    if (document.getElementById('nu29').value!="")
    {
     var z= document.getElementById('nu29').value%10;
     document.getElementById('nu29').value=z;
     if (z==sohop)
     {
         bor=0;
         document.getElementById('nu10').focus();
         document.getElementById('nu29').style.color="black";
         document.getElementById('chidan').style.display="none";
     }
     else {
        bor=1;
        chuyenman=-2;
        document.getElementById('chidan').style.display="flex";
        document.getElementById('nu29').style.color="red";
     }
    }
}
function myFunction10()
{
    if (document.getElementById('nu10').value!="")
    {
     var z= document.getElementById('nu10').value%10;
     document.getElementById('nu10').value=z;
     if (z==0)
     {
         
         document.getElementById('nu10').style.color="black";
         document.getElementById('viet0').style.display="none";
         if (chuyenman==0) chuyenman=1;
         else chuyenman=-1;
     }
     else {
         chuyenman=-2;
        document.getElementById('viet0').style.display="flex";
        document.getElementById('nu10').style.color="red";
     }
    }
}
function howMany(){
    document.getElementById('Howmanyapple').play();
}
function manyApple(){
    document.getElementById('manyApple').play();
}
function Total(){
    document.getElementById('Total').play();
}
function onebox(){
    document.getElementById('onebox').play();
}
function manyBoxes(){
    document.getElementById('manyBoxes').play();
}
function vietso0(){
    document.getElementById('vietso0').play();
}
function count(){
    document.getElementById('count').play();
}

   
   