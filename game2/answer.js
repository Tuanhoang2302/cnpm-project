
/*eslint-disable no-unused-vars*/
/*eslint-disable no-undef*/
var hien = 0;
var hintRedBorder = 0;
var theend = 0;
var readyPlayGame = false;
var chuyenman = 0;
var sohop = 1;
function checkOutput(id, number) {
    var x = document.getElementById(id).value % 10;
    document.getElementById(id).value = x;
    if (x == number) {
        return true;
    }
}
// change para to run next  function in phaser Game 
function changeNumber(x, y) {
    if (x == 'chuyenman') {
        if (y == 1) {
            if (chuyenman == 0)
                chuyenman = 1;
            else
                chuyenman = -1;
        }
        else
            chuyenman = -2;
    }
}
function backGround(color) {
    document.getElementById('change').style.backgroundColor = color;
}
function Text(text, id) {
    document.getElementById(id).innerHTML = text;
}

function OuputScene(focus, hint, element, border, trueOutput, Change, next) {

    if (document.getElementById(element).value != "") {
        if (trueOutput == "") {
            trueOutput = this.sohop;
        }
        if (checkOutput(element, trueOutput) == true) {

            if (border != ''){ // delete border to appear answer question
                document.getElementById(border).style.border = '0px';
                document.getElementById(border).style.bottom = '0px';
            }
            if (next != ""){ // Appear next question 
                document.getElementById(next).style.display = 'flex';
            }
            if (hint != ""){ // Appear hint for users
                document.getElementById(hint).style.display = 'none';
            }
            this.ifChange(Change, element);
            if (focus != "") {
                document.getElementById(focus).focus();
            }
            if (element == 'number3' || element == 'nu5' || element == 'nu10') {
                $('#' + element).prop('disabled', true);
            }
        }
        else {
            document.getElementById(element).style.color = "red";
            if (hint != '') {
                document.getElementById(hint).style.display = "flex";
            }
            if (element == 'nu1') {
                this.backGround('#ffd000');
            }
            if (element == 'nu3' || element == 'nu4' || element == 'nu29') {
                this.hintRedBorder = 1;
            }
            if (chuyenman == -1) {
                this.Text('How many apple are there? ', 'yeucau')
            }
            if (Change != "") {
                changeNumber(Change, -1);
            }
        }
    }
}
// chỉ một số hàm cần thay đổi sang màn chơi khác  nên cần xét trường hợp riêng biệt
function ifChange(Change, element) {
    if (Change != "" && (element == 'number3' || element == 'nu5' || element == 'nu10')) {
        changeNumber(Change, 1);
    }
    if (element == 'nu1'){
        this.backGround('#ffffff');
    } 
    document.getElementById(element).style.color = "black";
    if (element == 'nu3') {
        this.Text('How many apples are there: ', 'yeucau');
        theend = 1;
    }
    if (element == 'nu2') hien = 1;
    this.hintRedBorder = 0;
}

function OverStart() {
    var start = document.getElementById('button_start');
    var ciSmall = document.getElementById('CircleRound');
    var ciBig = document.getElementById('CircleRoundall');
    start.style.backgroundPositionY = '-112px';
    start.style.top = '-405px';
    start.style.right = '-135px';
    start.style.lineHeight = '111px';
    ciSmall.style.width = '260px';
    ciSmall.style.height = '260px';
    ciSmall.style.top = '-215px';
    ciSmall.style.right = '-53px';
    ciBig.style.width = '364px';
    ciBig.style.height = '364px';

}
function OutStart() {
    var start = document.getElementById('button_start');
    var ciSmall = document.getElementById('CircleRound');
    var ciBig = document.getElementById('CircleRoundall');
    start.style.backgroundPositionY = '10px';
    start.style.top = '-383px';
    start.style.right = '-112px';
    start.style.lineHeight = '133px';
    ciSmall.style.width = '250px';
    ciSmall.style.height = '250px';
    ciSmall.style.top = '-191px';
    ciSmall.style.right = '-40px';

    ciBig.style.width = '330px';
    ciBig.style.height = '330px';

}
function Start() {
    document.getElementById('start').style.display = 'none';
    document.getElementById('phaserGame').style.filter = 'blur(0px)';
    readyPlayGame = true;

}
function PlayAudio(play) {
    document.getElementById(play).play();
}
