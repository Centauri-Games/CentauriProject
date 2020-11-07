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

        //SUELO
        var staticFloorForm = this.add.rectangle(960,1030,1920,100, 0x990000);
        var floorPhysics = this.physics.add.existing(staticFloorForm, 1);
        var floorCollider = this.physics.add.collider(playerShape,staticFloorForm);
        var floorCollider2 = this.physics.add.collider(playerShape2,staticFloorForm);

        var staticFloor2Form = this.add.rectangle(960,0,1920,100, 0x990000);
        var floor2Physics = this.physics.add.existing(staticFloor2Form, 1);
        var floor2Collider = this.physics.add.collider(playerShape,staticFloor2Form);
        var floor2Collider2 = this.physics.add.collider(playerShape2,staticFloor2Form);

        //CÁMARAS
        var cameraMain = this.cameras.main;
        cameraMain.setSize(1920,540);

        var camera2 = this.cameras.add(0,540, 1920, 540);

        cameraMain.startFollow(playerShape);
        camera2.startFollow(playerShape2);

        //VIDA + PINCHOS
        var hp = new Life(this);
        var spikes = new Spike(this, 1050, 970, 100, 25, 0xff0000, hp);
        spikes.addPlayerCollide(this, playerShape);
        spikes.addPlayerCollide(this, playerShape2);

        //CAJA
        var box = new Box(this, 300, 950, 400, 500, 50, 50, 0xffff00);
        box.addPlayerCollide(this, playerShape);
        box.addPlayerCollide(this, playerShape2);
        box.addWorldCollide(this, staticFloorForm);

        //TELETRANSPORTE

        var tp = new Teleport(this,-50, 1200, 900, 900, 150, 50, 0x0000ff, 0xff0000);
        tp.addCollide(this, playerShape);
        tp.addCollide(this, playerShape2);
        tp.addCollide(this, box.getBox());

        //PLATAFORMAS
        //Estática
        var sp = new StaticPlatform(this, 700, 920, 100, 40, 0xffffff);
        //=new StaticPlatform(this, 700, 920, spriteName);
        sp.addPlayerCollide(this, playerShape);
        sp.addPlayerCollide(this, playerShape2);

        //Móvil
        var mp = new MovingPlatform(this, 1200, 920, 100, 40, 0xffffff);
        mp.addPlayerCollide(this, playerShape);
        mp.addPlayerCollide(this, playerShape2);
        mp.setMovement(this, 200, 0);

        //Drop
        var dp = new DropPlatform(this, 1600, 920, 100, 40, 0x555555);
        dp.addPlayerCollide(this, playerShape);
        dp.addPlayerCollide(this, playerShape2);
        dp.addWorldCollider(this, staticFloorForm);

        //MIRROR
        var mirror = new Mirror(this, 600, 950, 20, 20, 0x39caa9);

        mirror.mirror.setInteractive().on('pointerup', function(){  //Ciclo del espejo
            mirror.mirrorPhysics.setRotation(mirror.mirror.rotation+(Math.PI/3));
            mirror.mirrorPosition = (mirror.mirrorPosition +1)%6;

            if(mirror.mirrorPosition ==0){ //Cambiar if por switch case para dibujar el rayo en las distintas posiciones
                console.log("Posicion correcta");
            }
            else{
                console.log("Posicion incorrecta");
            }

        });

        //CAMBIO DE GRAVEDAD
        var gravity = new GravitySwitch(this, 200, 970, 700, 60, 50, 25, 0x00ff00, 0x0000ff);
        gravity.addTrigger(this, playerShape, playerPhysics, playerPhysics2);


        //CONTROL Y MOVIMIENTO
        var keyMovement = this.input.keyboard.addKeys('A, D, W, right, left, up');

        var pressedA = false;
        var pressedD = false;
        var pressedW = false;

        var pressedRight = false;
        var pressedLeft = false;
        var pressedUp = false;

        //Codigo de "teclas" para el movimiento. Habria que cambiar el codigo de dentro por el mensaje que se enviará al servidor para decir que movimiento ha realizado el personaje

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

        keyMovement.W.on('down', function(e) {
            pressedW = true;
            console.log(pressedW);
            if (playerPhysics.body.touching.down && !gravity.getUpsideDown()){
                playerPhysics.body.setVelocityY(-200);
            }
            if (playerPhysics.body.touching.up && gravity.getUpsideDown()){
                playerPhysics.body.setVelocityY(200);
            }
        });

        keyMovement.D.on('up', function(e){
            pressedD = false;
            console.log(pressedD)
            if (!pressedA){
                playerPhysics.body.setVelocityX(0);
            } else {
                playerPhysics.body.setVelocityX(-100);
            }
        });

        keyMovement.A.on('up', function(e){
            pressedA = false;
            console.log(pressedA);
            if (!pressedD){
                playerPhysics.body.setVelocityX(0);
            } else {
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

        keyMovement.up.on('down', function(e) {
            pressedUp = true;
            console.log(pressedUp);
            if (playerPhysics2.body.touching.down && !gravity.getUpsideDown()){
                playerPhysics2.body.setVelocityY(-200);
            }
            if (playerPhysics2.body.touching.up && gravity.getUpsideDown()){
                playerPhysics2.body.setVelocityY(200);
            }
        });

        keyMovement.right.on('up', function(e){
            pressedRight = false;
            console.log(pressedRight)
            if (!pressedLeft){
                playerPhysics2.body.setVelocityX(0);
            } else {
                playerPhysics2.body.setVelocityX(-100);
            }
        });

        keyMovement.left.on('up', function(e){
            pressedLeft = false;
            console.log(pressedLeft);
            if (!pressedRight){
                playerPhysics2.body.setVelocityX(0);
            } else{
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