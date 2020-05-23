/*eslint-disable no-undef*/
export default function Language(){
    if(window.location.hash == "#vietnam"){
           
        document.getElementById('yeucau').innerHTML="Có tất cả bao nhiêu quả táo ?";
        
        document.getElementById('change').innerHTML="một";
        document.getElementById('boxtext').innerHTML="hộp :";
        document.getElementById('childtext').innerHTML="Có bao nhiêu táo trong "
         document.getElementById('text2').innerHTML="Có bao nhiêu hộp :";
        if (theend==1)
        {
            document.getElementById('yeucau').innerHTML="Có tất cả bao nhiêu quả táo :";
        }
       var Vietso0= document.getElementsByClassName('Vietso0');
      
       for (let i =0; i< Vietso0.length; i++)
       {
           Vietso0[i].innerHTML="Viết số 0";
       }
    }
}