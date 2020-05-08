var  hien =0;
var bor=0;
var theend=0;
function checkOutput(id, number)
{
   var x=document.getElementById(id).value % 10;
   document.getElementById(id).value=x;
   if (x==number) return true;
   else return false;
}
function  changeNumber(x,y)
{
    
    if (x=='numberqu')
    {
        if (y==1)
        this.numberqu=1;
    }
    if (x=='chuyenman')
    {
        if (y==1)
        {
            if (chuyenman==0) 
                chuyenman=1;
            else
                chuyenman=-1 ;
        }
        else 
            chuyenman=-2;
    }
}

function backGround(color)
{
    document.getElementById('change').style.backgroundColor=color;
}
function Text(text, id)
{
    document.getElementById(id).innerHTML=text;
}

function OuputScene(focus, hint, element, border, trueOutput,Change, next)
{
    
       if (document.getElementById(element).value !="")
       {
           if (trueOutput=="") trueOutput=this.sohop;
           if (checkOutput(element,trueOutput)==true)
           {
            if (border!='')
            {
                document.getElementById(border).style.border='0px';
            }
            if (next!="")
            {
                document.getElementById(next).style.display='flex';
            }
            if (hint!="")
            {
                document.getElementById(hint).style.display='none';
            }
            if (Change!=""&&(element=='number3'||element=='nu5'||element=='nu10'))
            {
                changeNumber(Change,1);
                
            }

            if (element=='nu1') this.backGround('#ffffff');
            document.getElementById(element).style.color = "black";
            if (element=='nu3') 
            {
                this.Text('How many apples are there: ','yeucau');
                theend=1;
            }
            if (element=='nu2') hien=1;
            if (element=='nu3'||element=='nu4' ||element=='nu29') bor=0;
            if (focus!="")
            document.getElementById(focus).focus();
           }
           else 
           {
            document.getElementById(element).style.color = "red";
            if (hint!='')
            {
                document.getElementById(hint).style.display = "flex";
            }
            if (element=='nu1') this.backGround('#ffd000'); 
            
            if (element=='nu3'||element=='nu4'||element=='nu29') bor=1;
            if (chuyenman==-1) this.Text('How many apple are there? ','yeucau')
            if (Change!="")
            {
                changeNumber(Change,-1);
            }
        }
           
           
        
       }
}

