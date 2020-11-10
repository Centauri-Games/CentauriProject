class level1Scene extends Phaser.Scene{
    constructor(){
        super("level1Scene");
    }

    preload(){
        this.load.image('bg', 'assets/backgrounds/factory.png');

        this.load.image('caja', 'assets/sprites/caja.png');
        this.load.image('plataforma', 'assets/sprites/plataforma.png');
        this.load.image('portalA', 'assets/sprites/portalAzul.png');
        this.load.image('portalR', 'assets/sprites/portalRojo.png');
        this.load.image('andamio', 'assets/sprites/andamio.png');
        this.load.image('light', 'assets/players/light.png');
        this.load.image('shadow', 'assets/players/shadow.png');
    }
    create(){
        this.add.sprite(960, 540, 'bg');
        var playerShape = this.add.sprite(200, 200, 'light');
        var playerShape2 = this.add.sprite(200, 1200, 'shadow');

        var playerPhysics = this.physics.add.existing(playerShape, 0);
        playerPhysics.body.setGravityY(-400);
        var playerPhysics2 = this.physics.add.existing(playerShape2, 0);

        var and = new Scaffold(this, 200, -100, 'andamio', 280, 50, 20, 350);
        and.rotate(Math.PI);
        and.addCollide(this, playerShape);

        var and2 = new Scaffold(this, 200, 1500, 'andamio', 280, 50, 20, 50);
        and2.addCollide(this, playerShape2);

        //CÁMARAS
        var cameraMain = this.cameras.main;
        cameraMain.setSize(1920,540);

        var camera2 = this.cameras.add(0,540, 1920, 540);

        cameraMain.startFollow(playerShape);
        camera2.startFollow(playerShape2);

        //PLATAFORMAS
        //Móvil
        var mp = new MovingPlatform(this, 400, 0, 'plataforma');
        mp.rotate(Math.PI);
        mp.addPlayerCollide(this, playerShape);
        mp.setMovement(this, 200, 0);

        var mp2 = new MovingPlatform(this, 400, 1400, 'plataforma');
        mp2.setAlpha(0);
        mp2.addPlayerCollide(this, playerShape2);
        mp2.setMovement(this, 200, 0);

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
    }
    update(){
        
    }
}