window.Check_SubAnswer1 = function Check_SubAnswer1(desiredResult) {
  if (document.getElementById('input1').value != '') {
    const x = document.getElementById('input1').value % 10;
    document.getElementById('input1').value = x;
    if (x == desiredResult / 10) {
      document.getElementById('input1').style.color = 'black';
      document.getElementById('input2').focus();
    } else {
      document.getElementById('input1').style.color = 'red';
    }
  }
}

window.Check_SubAnswer2 = function Check_SubAnswer2() {
  if (document.getElementById('input2').value != '') {
    const y = document.getElementById('input2').value % 10;
    document.getElementById('input2').value = y;
    if (y == 0) {
      // document.getElementById("ques" + answer_index).innerHTML="There are 10";
      document.getElementById('input2').style.color = 'black';
    } else {
      document.getElementById('input2').style.color = 'red';
    }
  }
}
