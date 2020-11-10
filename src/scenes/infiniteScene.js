class infiniteScene extends Phaser.Scene {
    constructor(){
        super("infiniteScene");
    }

    init(data){
        this.English = data.english;
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

        this.load.spritesheet('mirror', 'assets/sprites/espejo.png', {
            frameWidth: 104,
            frameHeight: 128
        });

        this.load.image('caja', 'assets/sprites/caja.png');
        this.load.image('plataforma', 'assets/sprites/plataforma.png');
        this.load.image('portalA', 'assets/sprites/portalAzul.png');
        this.load.image('portalR', 'assets/sprites/portalRojo.png');
        this.load.image('andamio', 'assets/sprites/andamio.png');
        this.load.image('light', 'assets/players/light.png');
        this.load.image('shadow', 'assets/players/shadow.png');

    }

    create() {
        //Elementos del juego. Aqui solo habria que pintarlos , ya que la parte de físicas la calcula el servidor de java
        console.log("Escena");
        console.log(this);
        var iniX = 500;
        var iniY = 500;
        var playerShape = this.add.sprite(iniX, iniY, 'light');
        var playerShape2 = this.add.sprite(iniX, iniY, 'shadow');

        var playerPhysics = this.physics.add.existing(playerShape, 0);
        var playerPhysics2 = this.physics.add.existing(playerShape2, 0);

        //SUELO
        var staticFloorForm = this.add.rectangle(960,1030,1920,100, 0x990000);
        this.physics.add.existing(staticFloorForm, 1);
        this.physics.add.collider(playerShape,staticFloorForm);
        this.physics.add.collider(playerShape2,staticFloorForm);

        var staticFloor2Form = this.add.rectangle(960,0,1920,100, 0x990000);
        this.physics.add.existing(staticFloor2Form, 1);
        this.physics.add.collider(playerShape,staticFloor2Form);
        this.physics.add.collider(playerShape2,staticFloor2Form);

        //ANDAMIO
        var and = this.add.sprite(900, 800, 'andamio');
        var andPhysics = this.physics.add.existing(and, 1);
        andPhysics.body.setSize(280, 50);
        andPhysics.body.setOffset(20, 50);
        this.physics.add.collider(playerShape, and);
        this.physics.add.collider(playerShape2, and);

        //CÁMARAS
        var cameraMain = this.cameras.main;
        cameraMain.setSize(1920,540);

        var camera2 = this.cameras.add(0,540, 1920, 540);

        cameraMain.startFollow(playerShape);
        camera2.startFollow(playerShape2);

        //VIDA + PINCHOS
        var hp = new Life(this, this.English, playerShape, playerShape2);
        var spikes = new Spike(this, 1050, 970, 100, 25, 0xff0000, hp);
        spikes.addPlayerCollide(this, playerShape, playerShape2, this.English, iniX, iniY, iniX, iniY);
        spikes.addPlayerCollide(this, playerShape2, playerShape, this.English, iniX, iniY, iniX, iniY);

        //CAJA
        var box = new Box(this, 300, 950, 400, 500, 50, 50, 'caja');
        box.addPlayerCollide(this, playerShape);
        box.addPlayerCollide(this, playerShape2);
        box.addWorldCollide(this, staticFloorForm);

        //TELETRANSPORTE
        var tp = new Teleport(this,-50, 1200, 900, 400, 'portalA', 'portalR');
        tp.addCollide(this, playerShape);
        tp.addCollide(this, playerShape2);
        tp.addCollide(this, box.getBox());

        //PLATAFORMAS
        //Estática
        var sp = new StaticPlatform(this, 700, 920, 'plataforma');
        sp.addPlayerCollide(this, playerShape);
        sp.addPlayerCollide(this, playerShape2);

        //Móvil
        var mp = new MovingPlatform(this, 1200, 920, 'plataforma');
        mp.addPlayerCollide(this, playerShape);
        mp.addPlayerCollide(this, playerShape2);
        mp.setMovement(this, 200, 0);

        //Drop
        var dp = new DropPlatform(this, 1600, 920, 'plataforma');
        dp.addPlayerCollide(this, playerShape);
        dp.addPlayerCollide(this, playerShape2);
        dp.addWorldCollider(this, staticFloorForm);

        //MIRROR

        var mirror = new Mirror(this, 600, 950, 'mirror');

        mirror.mirror.setInteractive().on('pointerup', function(){  //Ciclo del espejo
            mirror.mirrorPosition = (mirror.mirrorPosition +1)%8;

            switch(mirror.mirrorPosition){
                case 0:
                    mirror.mirror.anims.play('pos0', false);
                    console.log("pos 0");
                    break;
                case 1:
                    mirror.mirror.anims.play('pos1', false);
                    console.log("pos 1");
                    break;
                case 2:
                    mirror.mirror.anims.play('pos2', false);
                    console.log("pos 2");
                    break;
                case 3:
                    mirror.mirror.anims.play('pos3', false);
                    console.log("pos 3");
                    break;
                case 4:
                    mirror.mirror.anims.play('pos4', false);
                    console.log("pos 4");
                    break;
                case 5:
                    mirror.mirror.anims.play('pos5', false);
                    console.log("pos 5");
                    break;
                case 6:
                    mirror.mirror.anims.play('pos6', false);
                    console.log("pos 6");
                    break;
                case 7:
                    mirror.mirror.anims.play('pos7', true);
                    console.log("posicion correcta");
                    break;
                default:
            }

        });

        //CAMBIO DE GRAVEDAD
        var gravity = new GravitySwitch(this, 200, 970, 700, 60, 50, 25, 0x00ff00, 0x0000ff);
        gravity.addTrigger(this, playerShape, playerPhysics, playerPhysics2);


        //CONTROL Y MOVIMIENTO
        var keyMovement = this.input.keyboard.addKeys('A, D, W, SPACE');

        var pressedA = false;
        var pressedD = false;
        var pressedW = false;

        var playerProta = true;

        //Codigo de "teclas" para el movimiento. Habria que cambiar el codigo de dentro por el mensaje que se enviará al servidor para decir que movimiento ha realizado el personaje

        keyMovement.D.on('down', function(e) {
            pressedD = true;
            if (playerProta){
                playerPhysics.body.setVelocityX(100);
            } else {
                playerPhysics2.body.setVelocityX(100);
            }
        });

        keyMovement.A.on('down', function(e) {
            pressedA = true;
            if (playerProta){
                playerPhysics.body.setVelocityX(-100);
            } else {
                playerPhysics2.body.setVelocityX(-100);
            }
        });

        keyMovement.W.on('down', function(e) {
            pressedW = true;
            if (playerProta){
                if (playerPhysics.body.touching.down && !gravity.getUpsideDown()){
                    playerPhysics.body.setVelocityY(-200);
                }
                if (playerPhysics.body.touching.up && gravity.getUpsideDown()){
                    playerPhysics.body.setVelocityY(200);
                }
            } else {
                if (playerPhysics2.body.touching.down && !gravity.getUpsideDown()){
                    playerPhysics2.body.setVelocityY(-200);
                }
                if (playerPhysics2.body.touching.up && gravity.getUpsideDown()){
                    playerPhysics2.body.setVelocityY(200);
                }
            }
        });

        keyMovement.SPACE.on('down', function(e){
            playerProta = !playerProta;
        });

        keyMovement.D.on('up', function(e){
            pressedD = false;
            if (playerProta){
                if (!pressedA){
                    playerPhysics.body.setVelocityX(0);
                } else {
                    playerPhysics.body.setVelocityX(-100);
                }
            } else {
                if (!pressedA){
                    playerPhysics2.body.setVelocityX(0);
                } else {
                    playerPhysics2.body.setVelocityX(-100);
                }
            }
        });

        keyMovement.A.on('up', function(e) {
            pressedA = false;
            if (playerProta) {
                if (!pressedD) {
                    playerPhysics.body.setVelocityX(0);
                } else {
                    playerPhysics.body.setVelocityX(100);
                }
            } else {
                if (!pressedD) {
                    playerPhysics2.body.setVelocityX(0);
                } else {
                    playerPhysics2.body.setVelocityX(-100);
                }
            }
        });

        console.log("fisicas");
        console.log(playerPhysics);
        console.log(playerPhysics2);
    }

    update(){
       /* if (passedlevelcounter)
        updatinglevels = 2;
        */
    }

    /*async syncLoadPhysics(playerShape,mode){
        
        return await this.physics.add.existing(playerShape, mode);
    }*/
}