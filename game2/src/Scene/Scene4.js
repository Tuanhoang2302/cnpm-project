var ball=[];
var hoptao=[];
var sohop;
var bor=0;
var chuyenman=0;
class Scene4  extends Phaser.Scene{
    constructor()
    {
        super('Scene4');
    }
    preload(){
        this.load.html('scene4','scene4.html');
        this.load.image('thanh','src/Assets/thanh.png');
        this.load.image('ball','src/Assets/ball.png');
        this.load.image('hoptao','src/Assets/hoptao.png');
        this.load.image('ball','src/Assets/ball.png');
        this.load.image('taoborder','src/Assets/taoborder.png');
    }   
    create(){
        this.resetCreate();
        thanh = this.add.sprite(500,25,'thanh');
        thanh.setScale(0.8);
        this.createApple();
        var  element3= this.add.dom(500, 100).createFromCache('scene4');
        this.createball();
       
    }
    update()
    {
        this.up();
        if (chuyenman==1)
        {
            this.moveBall();
            this.time.delayedCall(2000, function() {
                this.scene.start('Scene5');
              }, [], this);
        }
        //tuc la phai lam lai man nay
        if (chuyenman==-1)
        {
                this.scene.restart();
        }
        this.Language();
    }
    Language(){
        if(window.location.hash == "#vietnam"){
        document.getElementById('baitap').innerHTML="Có tất cả bao nhiêu quả táo :";
        document.getElementsByClassName('texthint')[0].innerHTML="Có bao nhiêu hộp ?";
        document.getElementsByClassName('V0')[0].innerHTML="Viết số 0";
            }
    }
    resetCreate()
    {
        chuyenman=0;
        this.sohop=0;
        this.ball=[];
        this.bor=0;
        this.hoptao=[];
    }
    moveBall(){
        if (ball[4].x<719-26*3)
        {
            ball[4].x+=speed;
        }
        
    }
    up(){
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
    createball(){
        ball[6]=this.add.sprite(280,25,'ball');
        ball[5]=this.add.sprite(280+26,25,'ball');
        ball[4]=this.add.sprite(280+26*2,25,'ball');
        ball[3]=this.add.sprite(719-26*2,25,'ball');
        ball[2]=this.add.sprite(719-26,25,'ball');
        ball[1]=this.add.sprite(719,25,'ball');
    }
    createApple(){
        // sohop= Math.floor(Math.random()*10);
        // while (sohop<=3){
        //     sohop=Math.floor(Math.random()*10);
        // } 
        sohop=7;
        if (sohop>=4&&sohop<=6)
        {
           
            for (var i = 1; i<=3; i++)
            {
                hoptao[i]=this.add.sprite(90 +30 + (2*i-1)* widthH/2 + 50*(i-1),270,'hoptao');
            }
            for (var i = 4; i<= sohop; i++)
            {
                var distance= (widthSce - widthH*(sohop-3) - (sohop-1-3)*50 - 90*2)/2; 
                hoptao[i]=this.add.sprite(90 + distance + (2*(i-3)-1)* widthH/2 + 50*(i-1-3),390,'hoptao');
            }
        }
        else 
        {
            for (var i = 1; i<=3; i++)
            {
                hoptao[i]=this.add.sprite(90 +30 + (2*i-1)* widthH/2 + 50*(i-1),270,'hoptao');
            }
               
            for (var i = 4; i<=6; i++)
            {
                hoptao[i]=this.add.sprite(90 +30 + (2*(i-3)-1)* widthH/2 + 50*(i-3-1),390,'hoptao');
                
            }
            for (var i = 7; i<=sohop; i++)
            {
                var distance= (widthSce - widthH*(sohop-6) - (sohop-1-6)*50 - 90*2)/2; 
                hoptao[i]=this.add.sprite(90 + distance + (2*(i-6)-1)* widthH/2 + 50*(i-1-6),510,'hoptao');
                
            }
        }
        for (var i = 1; i <= sohop; i++)
        {
            taoborder[i]=  this.add.sprite(hoptao[i].x-1, hoptao[i].y,'taoborder').setAlpha(0);
        }
    }
}