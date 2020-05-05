var  hien =0;
var bor=0;
var theend=0;
function OutputQuestion1_1Scene1(id){
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
    function OutputQuestion1_2Scene1(id){
        if ( document.getElementById('number2').value!="")
        {
            var y= document.getElementById('number2').value%10;
    document.getElementById('number2').value=y;
    if (y==0)
    {
      
        document.getElementById('tbao').style.display="none";
        
        document.getElementById("answer1").style.border='0px';
         document.getElementById('question2').style.display="flex";
         document.getElementById('number2').style.color="black";
         document.getElementById(id).focus();
    }
    else{
        
        document.getElementById('tbao').style.display="flex";
        document.getElementById('number2').style.color="red";
    }
        }
    
    }
    function OutputQuestion2Scene1(){
       if (document.getElementById('number3').value!="")
       {
          
        var z= document.getElementById('number3').value%10;
        document.getElementById('number3').value=z;
        if (z==1)
        {
            numberqu=1;
            document.getElementById('border').style.display="none";
            document.getElementById('number3').style.color="black";
         document.getElementById("answer2").style.border='0px';
        }
        else {
            numberqu=-2;
         document.getElementById('number3').style.color="red";
            document.getElementById('border').style.display="flex";
        }
       }
        
    }
   
function OutputQuestion1_1Scene2(){
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
function OutputQuestion1_2Scene2()
{
    if ( document.getElementById('nu2').value!="")
    {
        var y= document.getElementById('nu2').value%10;
document.getElementById('nu2').value=y;
    }
if (y==0)
   {
    document.getElementById('c1').style.border='0px';
     document.getElementById('q2').style.display="flex";
     document.getElementById('nu3').focus();
     document.getElementById('nu2').style.color="black";
      hien =1;
     
   }
else{
    chuyenman=-2;
    document.getElementById('nu2').style.color="red";
    }
}

function OutputQuestion2Scene2(){
    if (document.getElementById('nu3').value!="")
    {
     var z= document.getElementById('nu3').value%10;
     document.getElementById('nu3').value=z;
     if (z==sohop)
     {
         bor=0;
        document.getElementById("nu3").style.border='0px';
         document.getElementById('yeucau').innerHTML="How many apples are there: ";
        theend=1;
         document.getElementById('c2').style.display="flex";
         document.getElementById('nu4').focus();
         document.getElementById('nu3').style.color="black";
         
     }
     else {
         chuyenman=-2;
         bor=1;
        document.getElementById('nu3').style.color="red";
     }
    }
     
 }
 function OutputQuestion3_1Scene2(){
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
 function OutputQuestion3_2Scene2(){
    if (document.getElementById('nu5').value!="")
    {
     var z= document.getElementById('nu5').value%10;
     document.getElementById('nu5').value=z;
     if (z==0)
     {
        
        document.getElementById('hint').style.display="none";
        document.getElementById('nu5').style.color="black";
        document.getElementById('c2').style.border='0px';
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
function OutputQuestion1_1Scene4(){
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
function OutputQuestion1_2Scene4()
{
    if (document.getElementById('nu10').value!="")
    {
     var z= document.getElementById('nu10').value%10;
     document.getElementById('nu10').value=z;
     if (z==0)
     {
         
         document.getElementById('nu10').style.color="black";
         document.getElementById('viet0').style.display="none";
         document.getElementById('c3').style.border='0px';
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
function PlayAudio(play){
    document.getElementById(play).play();
}
