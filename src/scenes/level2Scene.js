class level2Scene extends Phaser.Scene{
    constructor(){
        super("level2Scene");
    }

    preload(){
        this.load.image('bg', 'assets/backgrounds/factory.png');

        this.load.image('plataforma', 'assets/sprites/plataforma.png');
        this.load.image('andamio', 'assets/sprites/andamio.png');
        this.load.image('light', 'assets/players/light.png');
        this.load.image('shadow', 'assets/players/shadow.png');
    }
    create(){
        this.add.sprite(960,540,'bg');
        var iniXL = 200;
        var iniYL = 200;
        var playerShape = this.add.sprite(iniXL, iniYL, 'light');
        var iniXS = 200;
        var iniYS = 1200;
        var playerShape2 = this.add.sprite(iniXS, iniYS, 'shadow');

        var playerPhysics = this.physics.add.existing(playerShape, 0);
        var playerPhysics2 = this.physics.add.existing(playerShape2, 0);

        //ANDAMIOS
        var andl = new Scaffold(this, 200, 500, 'andamio', 280, 50, 20, 50);
        andl.addCollide(this, playerShape);

        var andd = new Scaffold(this, 200, 1500, 'andamio', 280, 50, 20, 50);
        andd.addCollide(this, playerShape2);

        //CÁMARAS
        var cameraMain = this.cameras.main;
        cameraMain.setSize(1920,540);

        var camera2 = this.cameras.add(0,540, 1920, 540);

        cameraMain.startFollow(playerShape);
        camera2.startFollow(playerShape2);

        //LÍMITE JUGADORES
        var limit = this.add.rectangle(1600, 700, 3000, 100, 0x000000);
        this.physics.add.existing(limit, 1);
        this.physics.add.collider(playerShape, limit);
        this.physics.add.collider(playerShape2, limit);

        //VIDA + PINCHOS
        var hp = new Life(this, this.English, playerShape, playerShape2);

        //Fondo de la pantalla
        var spikesl = new Spike(this, 1600, -700, 3000, 100, 0xff0000, hp);
        spikesl.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXS, iniYS);

        var spikesd = new Spike(this, 1600, 2100, 3000, 100, 0xff0000, hp);
        spikesd.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS, iniXL, iniYL);

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
                if (playerPhysics.body.touching.up){
                    playerPhysics.body.setVelocityY(200);
                }
            } else {
                if (playerPhysics2.body.touching.down){
                    playerPhysics2.body.setVelocityY(-200);
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

        var nextLevel = this.add.zone(1970,0,10,1920);

        this.physics.add.overlap(playerPhysics,nextLevel,function(){
            if (this.physics.world.overlap(playerPhysics2,nextLevel)){
                this.scene.start("level3Scene");
            }
        });

        this.physics.add.overlap(playerPhysics2,nextLevel,function(){
            if (this.physics.world.overlap(playerPhysics,nextLevel)){
                this.scene.start("level3Scene");
            }
        });
    }
    update(){
        
    }
}