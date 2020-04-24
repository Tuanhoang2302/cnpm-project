
var Scene3_index = 0;

function Check_SubAnswer1(question_index, answer_index, desiredResult, sceneName){
    if (document.getElementById('input' + question_index).value!="")
    {
        var x= document.getElementById('input' + question_index).value%10;
        document.getElementById('input' + question_index).value=x;
        if (x==desiredResult / 10)
        {
            if(answer_index <4){
                document.getElementById('thought' + answer_index).style.display = "none";
            }
            document.getElementById('input' + question_index).style.color="black";
            document.getElementById('input' + (question_index + 1).toString()).focus();
            if(sceneName == 'Scene3'){
                Scene3_index++;
            }
     
        }
        else {
            document.getElementById('input' + question_index).style.color="red";  
            if(answer_index <4){
                document.getElementById('thought' + answer_index).style.display = "flex";
            }   
        }
    }    
}

function Check_SubAnswer2(question_index, answer_index, desiredResult, sceneName){
    if ( document.getElementById('input' + question_index).value!="")
    {
        
        var y= document.getElementById('input' + question_index).value%10;
        document.getElementById('input' + question_index).value=y;
        if (y==0)
        {
            //document.getElementById("ques" + answer_index).innerHTML="There are 10";
            if(answer_index < 4){
                document.getElementById('thought' + answer_index).style.display = "none";
            }
            
        }
        else{
            if(answer_index < 4){
                document.getElementById('thought' + answer_index).style.display = "flex";
            }
            
            document.getElementById('input' + question_index).style.color="red";
        }
    }
    
}
   
   
function Check_LastAnswer1(question_index, answer_index, desiredResult, sceneName){
    if(sceneName =="Scene3"){
        desiredResult = Scene3_index * 10;
    }
    if (document.getElementById('input' + question_index).value!="")
    {
        var x= document.getElementById('input' + question_index).value%10;
        document.getElementById('input' + question_index).value=x;
        if (x==desiredResult / 10)
        {
            document.getElementById('input' + question_index).style.color="black";
            document.getElementById('input' + (question_index + 1).toString()).focus();
     
        }
        else {
            document.getElementById('input' + question_index).style.color="red";  
            
        }
    }
}

function Check_LastAnswer2(question_index, answer_index, desiredResult, sceneName){
    if ( document.getElementById('input' + question_index).value!="")
    {
        var y= document.getElementById('input' + question_index).value%10;
        document.getElementById('input' + question_index).value=y;
        if (y==0)
        {

        }
        else{
            document.getElementById('input' + question_index).style.color="red";
        }
    }
    
}
   