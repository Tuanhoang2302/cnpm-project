
function Check_SubAnswer1(question_index, answer_index){
    if (document.getElementById('input' + question_index).value!="")
    {
        
        var x= document.getElementById('input' + question_index).value%10;
        document.getElementById('input' + question_index).value=x;
        if (x==1)
        {
            document.getElementById('thought' + answer_index).style.display = "none";
            document.getElementById('input' + question_index).style.color="black";
            document.getElementById('input' + (question_index + 1).toString()).focus();
     
        }
        else {
            document.getElementById('input' + question_index).style.color="red";  
            
            document.getElementById('thought' + answer_index).style.display = "flex";
            
        }

    }
    
}

function Check_SubAnswer2(question_index, answer_index){
    if ( document.getElementById('input' + question_index).value!="")
    {
        var y= document.getElementById('input' + question_index).value%10;
        document.getElementById('input' + question_index).value=y;
        if (y==0)
        {
            //document.getElementById("ques" + answer_index).innerHTML="There are 10";
            document.getElementById('thought' + answer_index).style.display = "none";
        }
        else{
            document.getElementById('thought' + answer_index).style.display = "flex";
            document.getElementById('input' + question_index).style.color="red";
        }
    }
    
}
   
   
   