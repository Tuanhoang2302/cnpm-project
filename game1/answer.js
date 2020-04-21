

function myFunction1(){
    if (document.getElementById('number1').value!="")
    {
        var x= document.getElementById('number1').value%10;
    document.getElementById('number1').value=x;
        if (x==1)
        {
      
            document.getElementById('number1').style.color="black";
            document.getElementById('number2').focus();
     
        }
        else {
            numberqu=-2;// ddax bij sai
            document.getElementById('number1').style.color="red";  
            //document.getElementById('tbao').style.display="flex";
        }

    }
    
}

function myFunction2(){
    if ( document.getElementById('number2').value!="")
    {
        var y= document.getElementById('number2').value%10;
        document.getElementById('number2').value=y;
        if (y==0)
        {
      
            //document.getElementById('tbao').style.display="none";
            var child = document.getElementById("answer1");
            child.remove();
            document.getElementById("ques1").innerHTML="How many apples are in the box: 10";
            //document.getElementById('question2').style.display="flex";
            //document.getElementById('number3').focus();
        }
        else{
            console.log("sdf");
            
            //document.getElementById('tbao').style.display="flex";
            document.getElementById('number2').style.color="red";
        }
    }
    
}
   
   
   