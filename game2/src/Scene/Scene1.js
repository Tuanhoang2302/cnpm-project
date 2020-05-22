
import Focus from '../gameObject/Focus.js'
/*eslint-disable no-undef */
    let initPosX=[];   
    let initPosY=[];
    const number =10;   
   const height= 75;     // height, width:chiều cao, độ rộng của 1 ô trong hộp
   const width= 75;
   let apple=[];
   let khay;
   let hold=[]; 
   let rect=[];  // tạo hiệu ứng khi đặt táo vào trong ô
   let element;
   let hint,loa;
   var ball=[];
   var  speed=3;
   var full=0; //số lượng quả  táo đã vào đúng vị trí trong hộp
   let music;
export default class Scene1 extends Phaser.Scene {
    constructor() {
        super("Scene1");
        
    }
    
    preload() {
        this.load.image('thanh','src/Assets/thanh.png');
        this.load.image('loadai','src/Assets/loadai.png');
        this.load.image('rect','src/Assets/rect.png')
        this.load.html('body','scene1.html');
        this.load.image('ball','src/Assets/ball.png');
       this.load.image('apple','src/Assets/apple.png');
       this.load.image('khay','src/Assets/khay.png');
       this.load.audio('moveapple','src/Assets/moveapple.mp3');
    }
    create() {
        music=this.sound.add('moveapple');
        let thanh = this.add.sprite(500,25,'thanh');
        thanh.setScale(0.8);
        hint= this.add.text(340,60,'Move the apples',{ font: '40px Arial',color:'#000000' }).setInteractive();
        loa=this.add.sprite(305,80,'loadai').setInteractive();
        loa.setScale(0.4);
        khay = this.add.sprite(300,280,'khay');
        
        this.createBall();

        this.createHold();
        this.createApple();

        element= this.add.dom(700, 450).createFromCache('body').setAlpha(0);
        this.resetCreate();
    }
    update(){
        if (readyPlayGame==true)
        {
            this.DragAndDrop();
           
        for  (let i =1; i<= number; i++)
        {
            if (apple[i].input.enabled==false) full++;
        }
        if (full<number) full=0;
        else 
        {
          element.setAlpha(1);
           if (chuyenman==1||chuyenman==-1){
            
            this.moveBall();
            this.time.delayedCall(2000, function() {
             this.scene.start('Scene2');
           }, [], this);
           }
        }
       this.Audio();
      this.Language();
     //let focus=new Focus('#number1');
     Focus('#number1');
        }
        
    }
    createBall()
    {
        for (let i = 1; i<=6; i++)
        {
            ball[i]= this.add.sprite(280+26*(6-i), 25, 'ball');
        }
    }
    createApple()
    {
        apple[1]=this.add.sprite(580,300,'apple');
        apple[2]= this.add.sprite(620,380,'apple');
        apple[3]= this.add.sprite(720,320,'apple');
        apple[5]= this.add.sprite(760,250,'apple');
        apple[6]= this.add.sprite(720,390,'apple');
        apple[7]= this.add.sprite(620,220,'apple');
        apple[8]= this.add.sprite(850,200,'apple');
        apple[9]= this.add.sprite(860,310,'apple');
        apple[10]= this.add.sprite(840,390,'apple');
        apple[4]= this.add.sprite(710,160,'apple');
        for (let i =1; i<= number; i++)
        {
            apple[i].setInteractive();
            this.input.setDraggable(apple[i]);
            rect[i] = this.add.sprite(initPosX[i]+5,initPosY[i]-5,'rect').setAlpha(0);
        }
    }
    
    Language(){
        if(window.location.hash == "#vietnam"){
            hint.setText('Di chuyển những quả táo');
            document.getElementById('Countaplle').innerHTML="Đếm số táo";
            document.getElementById('ques1').innerHTML="Có bao nhiêu quả táo trong hộp :";
            document.getElementById('ques2').innerHTML="Tổng số hộp : ";
        }
    }
    Audio()
    {
            
        loa.on('pointerdown', function () {

            music.play();

        });
        hint.on('pointerdown', function () {

            music.play();

        });

    }
    moveBall(){
        // 719 là vị trí cần tới của quả bóng 
        if (ball[1].x<719)
        {
            ball[1].x+=speed;
        }
        
    }
    DragAndDrop(){
        this.input.on('dragstart', function (pointer, gameObject) {
          
            this.children.bringToTop(gameObject);

        },this);

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {

            gameObject.x = dragX;
            gameObject.y = dragY;

        });
        this.input.on('dragenter', function (pointer, gameObject, dropZone) {
            for (let i =1; i<= number; i++)
            {
               if (rect[i].x-5==dropZone.x)
               {
                   if (rect[i].y+5==dropZone.y)
                   {
                       rect[i].setAlpha(0.5)
                   }
               }
            }
        });
        this.input.on('dragleave', function () {
            for (let i =1; i<= number; i++)
            {
               rect[i].setAlpha(0);
            }
        });
        this.input.on('drop',function(pointer,gameObject,dropZone){
            
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
            gameObject.input.enabled=false;
            dropZone.input.enabled=false;
            
        });
        this.input.on('dragend', function (pointer, gameObject, dropped) {

            if (!dropped)
            {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
            for (let i =1; i<= number; i++)
            {
               rect[i].setAlpha(0);
            }
        });
    }
    createHold(){
       
        for (let i =1; i <=number; i++)
        {
            if (i>5) 
            {
                initPosY[i]  = khay.y + height/2 + 5;
            }
            else initPosY[i] = khay.y - height/2 - 5;
            if (i%6<=3)
            {
                initPosX[i] = khay.x - (3-i%5)*width - 5*(1+2*(2-i%5));
            }
            else 
            {
                initPosX[i] = khay.x + (i%5-3)*width + 5*(5-(5-i%5)*2);
            }
            if(i%5==0)
            {
                initPosX[i] = khay.x + 2*width + 5*5;
            }
                        
        }
        for (let i = 1; i<= 10;i++){
            
            hold[i] = this.add.zone(initPosX[i], initPosY[i], width, height).setRectangleDropZone(width, height);
        }
        
    }
    resetCreate(){
        element.setAlpha(0);
        this.full=0;
        this.chuyenman=0;
        this.sohop=0;
    }
    
}
