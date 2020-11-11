class level2Scene extends Phaser.Scene{
    constructor(){
        super("level2Scene");
    }

    preload(){
        this.load.image('bg', 'assets/backgrounds/space.png');

        this.load.image('plataforma', 'assets/sprites/plataforma.png');
        this.load.image('andamio', 'assets/sprites/andamio.png');
        this.load.image('light', 'assets/players/light.png');
        this.load.image('shadow', 'assets/players/shadow.png');

        this.load.image('tiles', 'assets/tileset/Tilemap.png')
        this.load.tilemapTiledJSON('map','assets/levels/level2.json');
    }
    create(){
        var bg = this.add.sprite(960,540,'bg');
        bg.setScrollFactor(0);

        var iniXL = 300;
        var iniYL = 200;
        var playerShape = this.add.sprite(iniXL, iniYL, 'light');
        var iniXS = 300;
        var iniYS = 2300;
        var playerShape2 = this.add.sprite(iniXS, iniYS, 'shadow');

        var playerPhysics = this.physics.add.existing(playerShape, 0);
        var playerPhysics2 = this.physics.add.existing(playerShape2, 0);

        playerShape.setDepth(10);
        playerShape2.setDepth(10);

        this.map = this.add.tilemap('map');
        var tileset = this.map.addTilesetImage('tileset', 'tiles');

        var ground = this.map.createStaticLayer('Suelo',tileset,0,0);
        var ground2 = this.map.createStaticLayer('Suelo2',tileset,0,0);
        var walls = this.map.createStaticLayer('Pared', tileset, 0,0);
        var spikes = this.map.createStaticLayer('Pinchos',tileset,0,0);


        ground.setCollision([29,30]);
        ground2.setCollision([58, 3221225530]);
        walls.setCollision([37,38,44,45]);

        this.physics.add.collider(ground2, playerShape);
        this.physics.add.collider(ground2, playerShape2);
        this.physics.add.collider(walls, playerShape);
        this.physics.add.collider(walls, playerShape2);

        //FALTA PONER EL COLLIDER DE LAS SPIKES Y CAMBIAR PINCHOS Y PLATAFORMAS//

        //ANDAMIOS
        var andd = new Scaffold(this, 300, 2570, 'andamio', 350, 80, 20, 80);
        andd.addCollide(this, playerShape2);    //Inicio inferior

        var andd2 = new Scaffold(this, 3750, 2570, 'andamio', 350, 80, 20, 80);
        andd2.addCollide(this, playerShape2);   //Final inferior

        //CÁMARAS
        var cameraMain = this.cameras.main;
        cameraMain.setSize(1920,540);

        var camera2 = this.cameras.add(0,540, 1920, 540);

        cameraMain.startFollow(playerShape);
        camera2.startFollow(playerShape2);

        cameraMain.setBounds(0,0,4032,1440);
        camera2.setBounds(0,1440,4032, 1440);

        //Suelo superior
        var floorUp = this.add.rectangle(2000, 1440, 4000, 100, 0x000000);
        floorUp.setAlpha(0);
        this.physics.add.existing(floorUp, 1);
        this.physics.add.collider(playerShape, floorUp);
        //this.physics.add.collider(playerShape2, limit);
        //LÍMITES JUGADORES
        /*

        var limit2 = this.add.rectangle(1600, 0, 3000, 100, 0x000000);
        this.physics.add.existing(limit2, 1);
        this.physics.add.collider(playerShape, limit2);*/

        //PLATAFORMAS
        var sp = new StaticPlatform(this, 500, 1800, 'plataforma');
        sp.addPlayerCollide(this, playerShape2);

        var sp2 = new StaticPlatform(this, 700, 900, 'plataforma');
        sp2.rotate(Math.PI);
        sp2.addPlayerCollide(this, playerShape2);

        var sp3 = new StaticPlatform(this, 900, 2200, 'plataforma');
        sp3.addPlayerCollide(this, playerShape2);

        var sp4 = new StaticPlatform(this, 1200, 2200, 'plataforma');
        sp4.addPlayerCollide(this, playerShape2);

        var sp5 = new StaticPlatform(this, 1400, 1600, 'plataforma');
        sp5.rotate(Math.PI);
        sp5.addPlayerCollide(this, playerShape2);

        var sp6 = new StaticPlatform(this, 1600, 1000, 'plataforma');
        sp6.rotate(Math.PI);
        sp6.scale(0.75, 0.75);
        sp6.addPlayerCollide(this, playerShape2);

        var sp7 = new StaticPlatform(this, 1800, 1900, 'plataforma');
        sp7.scale(0.75, 0.75);
        sp7.addPlayerCollide(this, playerShape2);

        var sp8 = new StaticPlatform(this, 2000, 1000, 'plataforma');
        sp8.rotate(Math.PI);
        sp8.scale(0.75, 0.75);
        sp8.addPlayerCollide(this, playerShape2);

        var sp9 = new StaticPlatform(this, 2200, 1900, 'plataforma');
        sp9.scale(0.75, 0.75);
        sp9.addPlayerCollide(this, playerShape2);

        var sp10 = new StaticPlatform(this, 2400, 2100, 'plataforma');
        sp10.addPlayerCollide(this, playerShape2);

        var sp11 = new StaticPlatform(this, 2600, 900, 'plataforma');
        sp11.rotate(Math.PI);
        sp11.scale(0.75, 0.75);
        sp11.addPlayerCollide(this, playerShape2);

        //VIDA + PINCHOS
        var hp = new Life(this, this.English, playerShape, playerShape2);

        //PINCHOS
        /*
        var spikesupd = new Spike(this, 1600, 775, 3000, 100, 0xff0000, hp);
        spikesupd.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS, iniXL, iniYL);

        var spikesdownd = new Spike(this, 1600, 2500, 3000, 100, 0xff0000, hp);
        spikesdownd.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS, iniXL, iniYL);

        var spikesupl = new Spike(this, 1750, 50, 100, 25, 0xff0000, hp);
        spikesupl.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS, iniXL, iniYL);

        var spikesdownl = new Spike(this, 1750, 650, 100, 25, 0xff0000, hp);
        spikesdownl.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS, iniXL, iniYL);*/

        //CAMBIO DE GRAVEDAD
        var gravity = new GravitySwitch(this, 2000, 625, 1500, 75, 50, 50, 0x00ff00, 0x0000ff);
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