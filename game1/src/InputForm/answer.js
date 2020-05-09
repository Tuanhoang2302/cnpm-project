/* eslint-disable no-unused-vars */
/* eslint-disable no-param-reassign */

let Scene3_index = 0;
const result = 0;
function Check_SubAnswer1(question_index, answer_index, desiredResult, sceneName) {
  if (document.getElementById(`input${question_index}`).value != '') {
    const x = document.getElementById(`input${question_index}`).value % 10;
    document.getElementById(`input${question_index}`).value = x;
    if (x == desiredResult / 10) {
      if (answer_index < 4) {
        document.getElementById(`thought${answer_index}`).style.display = 'none';
      }
      document.getElementById(`input${question_index}`).style.color = 'black';
      document.getElementById(`input${(question_index + 1).toString()}`).focus();
    } else {
      document.getElementById(`input${question_index}`).style.color = 'red';
      if (answer_index < 4) {
        document.getElementById(`thought${answer_index}`).style.display = 'flex';
      }
    }
  }
}

function Check_SubAnswer2(question_index, answer_index, desiredResult, sceneName) {
  if (document.getElementById(`input${question_index}`).value != '') {
    const y = document.getElementById(`input${question_index}`).value % 10;
    document.getElementById(`input${question_index}`).value = y;
    if (y == 0) {
      // document.getElementById("ques" + answer_index).innerHTML="There are 10";
      if (answer_index < 4) {
        document.getElementById(`thought${answer_index}`).style.display = 'none';
      }
    } else {
      if (answer_index < 4) {
        document.getElementById(`thought${answer_index}`).style.display = 'flex';
      }

      document.getElementById(`input${question_index}`).style.color = 'red';
    }
  }
}

function Check_QuestionScene4(totalBlock, border, isDisplayQuestion2, isWannaReset) {
  if (document.getElementById('inputScene4').value !== '') {
    const y = document.getElementById('inputScene4').value % 10;
    document.getElementById('inputScene4').value = '';
    document.getElementById('inputScene4').value = y;
    if (document.getElementById('inputScene4').value == totalBlock) {
      for (let i = 0; i < totalBlock; i++) {
        border[i].setVisible(0);
      }
      const textResult = document.createElement('div');
      textResult.appendChild(document.createTextNode((totalBlock).toString()));
      const layoutQuestion = document.getElementById('layout_lastquestion');
      textResult.style.cssText = 'display: inline-block; font-size:60px; margin-left: 20px';
      layoutQuestion.replaceChild(textResult, document.getElementById('answer1'));
      isDisplayQuestion2[0] = true;
    } else {
      for (let i = 0; i < totalBlock; i++) {
        border[i].setVisible(1);
      }
      document.getElementById('inputScene4').style.color = 'red';
      isWannaReset[0] = true;
    }
  }
};


function Check_QuestionScene4v1(totalBlock, border, isDisplayQuestion2, isWannaReset) {
  if (document.getElementById('inputScene4v1').value !== '') {
    const y = document.getElementById('inputScene4v1').value % 10;
    document.getElementById('inputScene4v1').value = '';
    document.getElementById('inputScene4v1').value = y;
    if (document.getElementById('inputScene4v1').value == totalBlock) {
      for (let i = 0; i < totalBlock; i++) {
        border[i].setVisible(0);
      }
      document.getElementById('inputScene4v1').style.color = 'black';
      document.getElementById('inputScene4v2').focus();
    } else {
      for (let i = 0; i < totalBlock; i++) {
        border[i].setVisible(1);
      }
      document.getElementById('inputScene4v1').style.color = 'red';
      isWannaReset[0] = true;
    }
  }
};

function Check_QuestionScene4v2(totalBlock, border, isResetScene, isWannaReset) {
  if (document.getElementById('inputScene4v2').value !== '') {
    if (document.getElementById('inputScene4v2').value % 10 == 0) {
      for (let i = 0; i < totalBlock; i++) {
        border[i].setVisible(0);
      }
      const textResult = document.createElement('div');
      textResult.appendChild(document.createTextNode((totalBlock * 10).toString()));
      const layoutQuestion = document.getElementById('layout_lastquestion2');
      textResult.style.cssText = 'display: inline-block; font-size:60px; margin-left: 20px';
      layoutQuestion.replaceChild(textResult, document.getElementById('answer2'));
      isResetScene[0] = true;
    } else {
      for (let i = 0; i < totalBlock; i++) {
        border[i].setVisible(1);
      }
      document.getElementById('inputScene4v2').style.color = 'red';
      isWannaReset[0] = true;
    }
  }
};