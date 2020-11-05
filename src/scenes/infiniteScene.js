class infiniteScene extends Phaser.Scene {

    constructor(){
        super("infiniteScene");
    }

    
    levelGenerator(difficulty,level){
        switch(level){
            //cada caso representaria el tipo de nivel. EL parametro level lo recibiría desde el servidor de java. (Difficulty es provisional, se me ha ocurrido que sea un parametro que vaya aumentando 
            // según pasa el tiempo para qu elos niveles se vayan modificando)
            case 1:
                
                break;
            case 2:
                break;
            
            
        }
    }
   

    preload(){
        //assets load
    }

    create() {
        
        //Elementos del juego. Aqui solo habria que pintarlos , ya que la parte de físicas la calcula el servidor de java

        var playerShape = this.add.ellipse(500,500,20,50,0x990000);
        var playerShape2 = this.add.ellipse(500,500,20,50,0xffffff);

        var playerPhysics = this.physics.add.existing(playerShape, 0);
        var playerPhysics2 = this.physics.add.existing(playerShape2, 0);

        //playerPhysics.body.setAllowGravity(false);

        var staticFloorForm = this.add.rectangle(960,1030,1920,100, 0x990000);

        var floorPhysics = this.physics.add.existing(staticFloorForm, 1);

        var floorCollider = this.physics.add.collider(playerShape,staticFloorForm,()=>{});
        var floorCollider2 = this.physics.add.collider(playerShape2,staticFloorForm,()=>{});

        //variable de la cámara que sigue al jugador

        var cameraMain = this.cameras.main;
        cameraMain.setSize(1920,540);

        var camera2 = this.cameras.add(0,540, 1920, 540);

        cameraMain.startFollow(playerShape);
        camera2.startFollow(playerShape2);

        //Variables de control y teclas

        var keyMovement = this.input.keyboard.addKeys('A,D,right,left');

        var pressedA = false;
        var pressedD = false;

        var pressedRight = false;
        var pressedLeft = false;


        //Codigo de "teclas" para el movimiento. Habria que cambiar el codigo de dentro por el mensaje que se enviará al servidor para decir que movimientio ha realizado el personaje

        keyMovement.D.on('down', function(e) {
          
            pressedD = true;
            console.log(pressedD);
            playerPhysics.body.setVelocityX(100);

        });

        keyMovement.A.on('down', function(e) {
            
            pressedA = true;
            console.log(pressedA);
            playerPhysics.body.setVelocityX(-100);
            
            
        });

        keyMovement.D.on('up', function(e){
            pressedD = false;
            console.log(pressedD)
            if(!pressedA){
                playerPhysics.body.setVelocityX(0);
            }else{
                playerPhysics.body.setVelocityX(-100);
            }
        });

        keyMovement.A.on('up', function(e){
                pressedA = false;
                console.log(pressedA);
                if(!pressedD){
                    playerPhysics.body.setVelocityX(0);

                }else{
                    playerPhysics.body.setVelocityX(100);
                }
        });

        //Player 2
        keyMovement.right.on('down', function(e) {

            pressedRight = true;
            console.log(pressedRight);
            playerPhysics2.body.setVelocityX(100);

        });

        keyMovement.left.on('down', function(e) {

            pressedLeft = true;
            console.log(pressedLeft);
            playerPhysics2.body.setVelocityX(-100);


        });

        keyMovement.right.on('up', function(e){
            pressedRight = false;
            console.log(pressedRight)
            if(!pressedLeft){
                playerPhysics2.body.setVelocityX(0);
            }else{
                playerPhysics2.body.setVelocityX(-100);
            }
        });

        keyMovement.left.on('up', function(e){
            pressedLeft = false;
            console.log(pressedLeft);
            if(!pressedRight){
                playerPhysics2.body.setVelocityX(0);

            }else{
                playerPhysics2.body.setVelocityX(100);
            }
        });
        

    }

    update(){
        
       /* if (passedlevelcounter)
        updatinglevels = 2;
        */

    }

}