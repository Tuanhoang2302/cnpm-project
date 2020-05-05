id: // cai can focus toi
output:// phan nhap dau tien
outputTrue:// ket  qua tra ve dung
change:// cac yeu to tac dong toi
show:// thanh phan se hien len  
hide:// thanh phan nen bi an di
function AnswerTheQuestion(id, output, outputTrue, show, hide)
{
    if (document.getElementById(output).value!="")
    {
        var x= document.getElementById(output).value%10;
    document.getElementById(output).value=x;
    if (x==outputTrue)
    {
        document.getElementById(output).style.color="black";
        document.getElementById(hide).style.display="none";
        document.getElementById(id).focus();
    }
    else {
        document.getElementById(output).style.color="red";  
     document.getElementById(show).style.display="flex";
    }
    }
}

// man nay se thay cho manf 1-1 1
