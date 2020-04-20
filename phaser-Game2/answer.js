

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
     document.getElementById('tbao').style.display="flex";
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
      
        document.getElementById('tbao').style.display="none";
         var child = document.getElementById("answer1");
         child.remove();
         document.getElementById("ques1").innerHTML="How many apples are in the box: 10";
         document.getElementById('question2').style.display="flex";
         document.getElementById('number3').focus();
    }
    else{
        numberqu=-2;//da bi sai
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
            if (numberqu==0)// chua sai cau nao
            {
                numberqu=1
            }
            else numberqu=-1;
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

   
   