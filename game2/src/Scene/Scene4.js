/*eslint-disable no-undef */
/*eslint-disable no-unused-vars */
var ball=[];
var hoptao=[];
var speed=3;
var taoborder=[];
var appleLocation = [];
var scene = 4;
import Focus from '../gameObject/Focus.js'
import Random from '../gameObject/randomNumber.js'
import Location from '../gameObject/SetLocation.js'
export default class Scene4  extends Phaser.Scene{
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
         var  thanh = this.add.sprite(500,25,'thanh');
        thanh.setScale(0.8);
        sohop=Random();

        appleLocation = Location(appleLocation,sohop);
        this.createApple();
        let element3 = this.add.dom(500, 100).createFromCache('scene4');
        this.createball();
       
    }
    update()
    {
  
        this.up();
        if (chuyenman==1)
        {
            this.moveBall();
            this.time.delayedCall(2000, function() {
                if (scene<6)
                {
                    this.scene.restart();
                    scene +=1;
                }
              }, [], this);
             
        }

        if (chuyenman==-1)
        {
            this.time.delayedCall(1000, function() {
                this.scene.restart();
                if (scene>4){
                    scene-=1;
                }
              }, [], this);
        }
        if (chuyenman==-2&&scene>4)
        {
            this.resetball();
        }
        this.Language();
        Focus('#nu29');
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
        hintRedBorder=0;
        this.hoptao=[];
    }
    moveBall(){
        if (ball[scene].x<719-26*(scene-1))
        {
            ball[scene].x+=speed;
        }
    }
    resetball()
    {
        
        if (ball[scene-1].x>280+26*(6-scene+1))
        {
            ball[scene-1].x-=speed;
        }
    }
    up(){
      
        if (hintRedBorder==1)
        {
            
            for (let i = 1; i <=sohop; i++)
            {
              taoborder[i].setAlpha(1);
            }
        }
        else 
        {
            for (let i = 1; i <= sohop; i++)
            {
              taoborder[i].setAlpha(0);
            }
        }
    }
    createball(){
        for (let i = scene ; i<=6; i++)
        {
            ball[i]= this.add.sprite(280+26*(6-i), 25, 'ball');
        }
        for (let i = 1; i< scene; i++)
        {
            ball[i]=this.add.sprite(719-25*(i-1),25,'ball');
        }
    }
    createApple(){
        for (let i = 1; i <= sohop; i++)
        {
            let PostY= 270;
            if (i>=4&&i<=6) 
            {
                PostY = 390;
            }
            if (i>6&&i<=9) 
            {
                PostY =  510;
            }
            hoptao[i] = this.add.sprite(appleLocation[i], PostY, 'hoptao');
            taoborder[i] = this.add.sprite(appleLocation[i], PostY,'taoborder');
        } 
}
}