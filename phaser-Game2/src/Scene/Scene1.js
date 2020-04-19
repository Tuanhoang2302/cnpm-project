        
    var initPosX=[];    
    var initPosY=[];
    var number =10;
   var height= 75;
   var width= 75;
   var apple=[];
   var khay;
   var hold=[];
   var check=[0,0,0,0,0,0,0,0,0,0];
   var rect=[];
   var rectangle;
   var element;
   var total;
   var numberqu=0;
class Scene1 extends Phaser.Scene {
    constructor() {
        super("Scene1");
        
    }
    
    preload() {
        this.load.image('rect','src/Assets/rect.png')
        this.load.html('body','answer.html');
       this.load.image('apple','src/Assets/apple.png');
       this.load.image('khay','src/Assets/khay.png');
    }
    create() {
        
        khay = this.add.sprite(300,280,'khay');
        apple[1]=this.add.sprite(580,300,'apple');
        apple[2]= this.add.sprite(620,380,'apple');
        apple[3]= this.add.sprite(700,320,'apple');
        apple[5]= this.add.sprite(690,250,'apple');
        apple[6]= this.add.sprite(720,400,'apple');
        apple[7]= this.add.sprite(620,220,'apple');
        apple[8]= this.add.sprite(800,200,'apple');
        apple[9]= this.add.sprite(790,310,'apple');
        apple[10]= this.add.sprite(800,390,'apple');
        apple[4]= this.add.sprite(710,160,'apple');
        
        this.createHold();
        for (var i =1; i<= 10; i++)
        {
            apple[i].setInteractive();
            this.input.setDraggable(apple[i]);
            rect[i] = this.add.sprite(initPosX[i]+5,initPosY[i]-5,'rect').setAlpha(0);
        }
        element= this.add.dom(700, 450).createFromCache('body').setAlpha(0);
    }
    update(){
        this.DragAndDrop();
        for  (var i =1; i<= number; i++)
        {
            if (apple[i].input.enabled==false) check[i]=1;
        }
        var full=0;
        for (var i = 1; i<=number; i++)
        {
            if (check[i]==true) full++;
        }
        if (full==10) 
        {
          element.setAlpha(1);
          if (numberqu==1)
          {
            this.cameras.main.fade(2000);
            this.scene.start('Scene2');
          }
            
         
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
            for (var i =1; i<= number; i++)
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
        this.input.on('dragleave', function (pointer, gameObject, dropZone) {
            for (var i =1; i<= number; i++)
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
            for (var i =1; i<= number; i++)
            {
               rect[i].setAlpha(0);
            }
        });
    }
    // tao vi tri cac o chua tao
    createHold(){
      

        for (var i =1; i <=number; i++)
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
        for (var i = 1; i<= 10;i++){
            
            hold[i] = this.add.zone(initPosX[i], initPosY[i], width, height).setRectangleDropZone(width, height);
        }
        
    }
   
}
