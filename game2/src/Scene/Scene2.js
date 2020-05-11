
var hoptao=[];
var  taomo=[];
var taoborder=[];
var sohop;
var element2;
var load=0;
var widthSce=1024, heigthSce= 650;
var widthH=228, heigthH=96 ;
var ball=[];
var chuyenman=0;

class Scene2 extends Phaser.Scene{
    constructor(){
        super("Scene2");
    }
    preload(){
        this.load.html('scene2','scene2.html');
        this.load.image('loadai','src/Assets/loadai.png');
        this.load.image('ball','src/Assets/ball.png');
        this.load.image('hoptao','src/Assets/hoptao.png');
        this.load.image('taoborder','src/Assets/taoborder.png');
        this.load.image('taomo','src/Assets/taomo.png');
        this.load.image('thanh','src/Assets/thanh.png');
        this.load.image('ball','src/Assets/ball.png');
    }   
    create(){
        this.resetCreate();
        thanh = this.add.sprite(500,25,'thanh');
        thanh.setScale(0.8);
        this.createApple();
        element2= this.add.dom(310, 410).createFromCache('scene2');
        if (sohop<=6)
        {
            element2.setPosition(310,310);
            document.getElementById('ndung').style.top='-250px';
        }
        
        this.createball();
    }
    update(){
        this.up();
        if (chuyenman==1)
        {
            this.moveBall();
            this.time.delayedCall(2000, function() {
                this.scene.start('Scene3');
              }, [], this);
        }
        //tuc la phai lam lai man nay
        if (chuyenman==-1)
        {
            this.scene.restart();
        }
        this.Language();
        this.Focus();
    }
    Focus()
    {
            $(document).ready(function () {
                var  value = $('#nu1').val();
                if (!value)
                {  
                    $('#nu1').focus();
                }
           })
    }
    Language(){
        if(window.location.hash == "#vietnam"){
           
            document.getElementById('yeucau').innerHTML="Có tất cả bao nhiêu quả táo ?";
            
            document.getElementById('change').innerHTML="một";
            document.getElementById('boxtext').innerHTML="hộp :";
            // document.getElementById('text').innerHTML="Có bao nhiêu quả táo trong";
            document.getElementById('childtext').innerHTML="Có bao nhiêu táo trong "
             document.getElementById('text2').innerHTML="Có bao nhiêu hộp :";
            if (theend==1)
            {
                document.getElementById('yeucau').innerHTML="Có tất cả bao nhiêu quả táo :";
            }
           var v00= document.getElementsByClassName('Vietso0');
          
           for (var i =0; i< v00.length; i++)
           {
               v00[i].innerHTML="Viết số 0";
           }
        }
    }
    resetCreate()
    {
        chuyenman=0;
        hien=0;
        bor=0;
        this.hoptao=[];
        this.taoborder=[];
        this.taomo=[];
        this.sohop=0;
        theend=0;
        
    }
    createball(){
        ball[6]=this.add.sprite(280,25,'ball');
        ball[5]=this.add.sprite(280+26,25,'ball');
        ball[4]=this.add.sprite(280+26*2,25,'ball');
        ball[3]=this.add.sprite(280+26*3,25,'ball');
        ball[2]=this.add.sprite(280+26*4,25,'ball');
        ball[1]=this.add.sprite(719,25,'ball');
    }

    moveBall(){
        if (ball[2].x<719-26)
        {
            ball[2].x+=speed;
        }
        
    }
    up(){
        if (hien==1) 
        {
            for (var i = 1; i < sohop; i++)
            {
            taomo[i].destroy();
            }
        }
        if (bor==1)
        {
            for (var i = 1; i <=sohop; i++)
            {
              taoborder[i].setAlpha(1);
            }
        }
        else 
        {
            for (var i = 1; i <= sohop; i++)
            {
              taoborder[i].setAlpha(0);
            }
        }
    }
    createApple(){
        // sohop= Math.floor(Math.random()*10);
        // while (sohop<=3){
        //     sohop=Math.floor(Math.random()*10);
        // } 
         sohop=8;
        if (sohop>=4&&sohop<=6)
        {
           
            for (var i = 1; i<=3; i++)
            {
                hoptao[i]=this.add.sprite(90 +30 + (2*i-1)* widthH/2 + 50*(i-1),180,'hoptao');
            }
            for (var i = 4; i<= sohop; i++)
            {
                var distance= (widthSce - widthH*(sohop-3) - (sohop-1-3)*50 - 90*2)/2; 
                hoptao[i]=this.add.sprite(90 + distance + (2*(i-3)-1)* widthH/2 + 50*(i-1-3),300,'hoptao');
            }
        }
        else 
        {
            for (var i = 1; i<=3; i++)
            {
                hoptao[i]=this.add.sprite(90 +30 + (2*i-1)* widthH/2 + 50*(i-1),180,'hoptao');
            }
               
            for (var i = 4; i<=6; i++)
            {
                hoptao[i]=this.add.sprite(90 +30 + (2*(i-3)-1)* widthH/2 + 50*(i-3-1),300,'hoptao');
                
            }
            for (var i = 7; i<=sohop; i++)
            {
                var distance= (widthSce - widthH*(sohop-6) - (sohop-1-6)*50 - 90*2)/2; 
                hoptao[i]=this.add.sprite(90 + distance + (2*(i-6)-1)* widthH/2 + 50*(i-1-6),420,'hoptao');
                
            }
        }
        for (var i = 1; i < sohop; i++)
        {
            taomo[i]= this.add.sprite(hoptao[i].x-1, hoptao[i].y,'taomo');
            taoborder[i]=  this.add.sprite(hoptao[i].x-1, hoptao[i].y,'taoborder').setAlpha(0);
            taoborder[sohop]=  this.add.sprite(hoptao[sohop].x-1, hoptao[sohop].y,'taoborder').setAlpha(0);
        }
    }
 }