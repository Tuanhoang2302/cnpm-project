/*eslint-disable no-undef */
let element2;
let ball=[];
let speed = 3;
let appleLocation = [];
let hoptao=[];
let taoborder=[];
let  taomo=[];
var scene = 2;

import Focus from '../gameObject/Focus.js'
import Language from '../gameObject/LanguageScene2.js'
import Location from '../gameObject/SetLocation.js'
import Random from '../gameObject/randomNumber.js'

export default class Scene2 extends Phaser.Scene{
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
        var thanh = this.add.sprite(500,25,'thanh');
        thanh.setScale(0.8);
        
        element2= this.add.dom(310, 410).createFromCache('scene2');
        sohop=Random();

        appleLocation = Location(appleLocation,sohop);
        this.createApple();
        if (sohop<=6)
        {
            element2.setPosition(310,310);
            document.getElementById('ndung').style.top='-250px';
            document.getElementById('hint').style.top='-258px'
        }
        this.createball();
        
        
    }
    update(){
        this.up();
        
        if (chuyenman==1)
        {
            this.moveBall();
            this.time.delayedCall(2000, function() {
                this.scene.restart();
                scene +=1;
                if (scene==4)
                {
                    this.scene.start('Scene4');
                } 
              }, [], this);
             
        }
        //tuc la phai lam lai man nay
        if (chuyenman==-1)
        {
            this.time.delayedCall(1000, function() {
                this.scene.restart();
                scene=2;
              }, [], this);
            
        }
        if (chuyenman==-2)
        {
            this.resetball();
        }
        Language();
        Focus('#nu1');
    }
    createball()
    {
        for (let i = scene ; i<=6; i++)
        {
            ball[i]= this.add.sprite(280+26*(6-i), 25, 'ball');
        }
        for (let i = 1; i< scene; i++)
        {
            ball[i]=this.add.sprite(719-25*(i-1),25,'ball');
        }
    }
    resetball(){
        if (ball[2].x>384 &&scene == 3)
        {
            ball[2].x-=speed;
        }
    }
    resetCreate()
    {
        chuyenman=0;
        hien=0;
        hintRedBorder=0;
        this.hoptao=[];
        this.taoborder=[];
        this.taomo=[];
        this.sohop=0;
        theend=0;
        
    }


    moveBall(){
       
        //vị trí cần tới  tiếp theo của quả bóng
        if (scene==2)
        {
            if (ball[2].x<719-26)
        {
            ball[2].x+=speed;
        }
        }
        if (scene==3){
            if (ball[3].x<719-26*2)
        {
            ball[3].x+=speed;
        }
        }
        
        
    }
    up(){
        if (hien==1) 
        {
            for (let i = 1; i < sohop; i++)
            {
            taomo[i].destroy();
            }
        }
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
    createApple(){
        for (let i = 1; i <= sohop; i++)
        {
            let PostY= 180;
            if (i>=4&&i<=6) 
            {
                PostY = 300;
            }
            if (i>6&&i<=9) 
            {
                PostY =  420;
            }
            hoptao[i] = this.add.sprite(appleLocation[i], PostY, 'hoptao');
            taomo[i] = this.add.sprite(appleLocation[i], PostY, 'taomo');
            taoborder[i] = this.add.sprite(appleLocation[i], PostY,'taoborder');
        } 
        taomo[sohop].destroy();
    }
 }