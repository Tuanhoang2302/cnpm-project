var border = 0;
var display_on = 0;


function myFunction1() {
    document.getElementById('answer2').focus();
    document.getElementById('number1-of-question2').focus();
    if (document.getElementById('number1-of-question2').value != "") {
        var x = document.getElementById('number1-of-question2').value % 10;
        document.getElementById('number1-of-question2').value = x;
    }
    if (x == 1) {
        document.getElementById('change').style.backgroundColor = "#ffffff";
        document.getElementById('number1-of-question2').style.color = "black";
        document.getElementById('number2-of-question2').focus();

    } else {
        switch_scene = -2;
        document.getElementById('change').style.backgroundColor = "#ffd000";
        document.getElementById('number1-of-question2').style.color = "red";
    }

}

function myFunction2() {
    if (document.getElementById('number2-of-question2').value != "") {
        var x = document.getElementById('number2-of-question2').value % 10;
        document.getElementById('number2-of-question2').value = x;
    }
    if (x == 0) {
        var child = document.getElementById("answer2");
        child.remove();
        document.getElementById('boxtext').innerHTML = "bar: 10";
        document.getElementById('question3').style.display = "flex";
        document.getElementById('answer3').focus();
        display_on = 1;
        document.getElementById('suggestion2').style.display = "none";

    } else {
        switch_scene = -2;
        document.getElementById('number2-of-question2').style.color = "red";
        document.getElementById('suggestion2').style.display = "flex";

    }
}

function myFunction3() {
    document.getElementById('answer3').focus();
    if (document.getElementById('answer3').value != "") {
        var x = document.getElementById('answer3').value % 10;
        document.getElementById('answer3').value = x;
        if (x == number_of_bar) {
            border = 0;
            var child = document.getElementById("answer3");
            child.remove();
            document.getElementById("text3").innerHTML = "How many bars: " + number_of_bar;
            document.getElementById('text1').innerHTML = "How many blocks are there: ";
            document.getElementById('answer1').style.display = "flex";
            document.getElementById('number1-of-question1').focus();

        } else {
            switch_scene = -2;
            border = 1;
            document.getElementById('answer3').style.color = "red";
            document.getElementById('text1').innerHTML = "How many blocks are there: ";
        }
    }

}

function myFunction4() {
    if (document.getElementById('number1-of-question1').value != "") {
        var x = document.getElementById('number1-of-question1').value % 10;
        document.getElementById('number1-of-question1').value = x;
        if (x == number_of_bar) {
            border = 0;
            document.getElementById('number1-of-question1').style.color = "black";
            document.getElementById('number2-of-question1').focus();
        } else {
            switch_scene = -2;
            border = 1;
            document.getElementById('number1-of-question1').style.color = "red";

        }
    }

}

function myFunction5() {
    if (document.getElementById('number2-of-question1').value != "") {
        var x = document.getElementById('number2-of-question1').value % 10;
        document.getElementById('number2-of-question1').value = x;
        if (x == 0) {

            document.getElementById('suggestion1').style.display = "none";
            document.getElementById('number2-of-question1').style.color = "black";
            var child = document.getElementById("answer1");
            child.remove();
            document.getElementById('suggestion1').style.display = "none";
            document.getElementById('text1').innerHTML = "How many blocks are there: " + number_of_bar + '0';
            if (switch_scene == 0) switch_scene = 1;
            if (switch_scene == -2) switch_scene = -1;

        } else {
            switch_scene = -2;
            document.getElementById('number2-of-question1').style.color = "red";
            document.getElementById('suggestion1').style.display = "flex";

        }
    }

}

function myFunction6() {
    document.getElementById('How-many-blocks-are-there').play();
}

function myFunction7() {
    document.getElementById('How-many-blocks-in-one-bar').play();
}

function myFunction8() {
    document.getElementById('How-many-bars').play();
}

function myFunction9() {

    document.getElementById('Write0').play();
}

function myFunction10() {
    document.getElementById('answer').focus();
    document.getElementById('number1-of-question').focus();
    if (document.getElementById('number1-of-question').value != "") {
        var x = document.getElementById('number1-of-question').value % 10;
        document.getElementById('number1-of-question').value = x;
        if (x == number_of_bar) {
            document.getElementById('suggestion4').style.display = "none";
            border = 0;
            document.getElementById('number1-of-question').style.color = "black";
            document.getElementById('number2-of-question').focus();
        } else {
            switch_scene = -2;
            border = 1;
            document.getElementById('number1-of-question').style.color = "red";
            document.getElementById('suggestion4').style.display = "flex";

        }
    }

}

function myFunction11() {
    if (document.getElementById('number2-of-question').value != "") {
        var x = document.getElementById('number2-of-question').value % 10;
        document.getElementById('number2-of-question').value = x;
        if (x == 0) {

            document.getElementById('suggestion3').style.display = "none";
            document.getElementById('number2-of-question').style.color = "black";
            var child = document.getElementById("answer");
            child.remove();
            document.getElementById('suggestion3').style.display = "none";
            document.getElementById('text').innerHTML = "How many blocks are there: " + number_of_bar + '0';
            if (switch_scene == 0) switch_scene = 1;
            if (switch_scene == -2) switch_scene = -1;

        } else {
            switch_scene = -2;
            document.getElementById('number2-of-question').style.color = "red";
            document.getElementById('suggestion3').style.display = "flex";

        }
    }
}

function myFunction12() {
    document.getElementById('How-many-bars-are-there').play();
}