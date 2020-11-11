class level1Scene extends Phaser.Scene{
    constructor(){
        super("level1Scene");
    }

    init(data){
        this.English = data.english;
    }

    preload(){
        this.load.image('bg', 'assets/backgrounds/factory.png');

        this.load.image('plataforma', 'assets/sprites/plataforma.png');
        this.load.image('andamio', 'assets/sprites/andamio.png');
        this.load.image('light', 'assets/players/light.png');
        this.load.image('shadow', 'assets/players/shadow.png');

        this.load.image('tiles', 'assets/tileset/Tilemap.png')
        this.load.tilemapTiledJSON('map','assets/levels/level1.json');
    }
    create(){

        var iniXL = 300;
        var iniYL = 875;
        var playerShape = this.add.sprite(iniXL, iniYL, 'light');
        playerShape.setDepth(10);
        var iniXS = 300;
        var iniYS = 2300;
        var playerShape2 = this.add.sprite(iniXS, iniYS, 'shadow');
        playerShape2.setDepth(10);

        var playerPhysics = this.physics.add.existing(playerShape, 0);
        //playerPhysics.body.setGravityY(-400);
        var playerPhysics2 = this.physics.add.existing(playerShape2, 0);

        this.map = this.add.tilemap('map');
        var tileset = this.map.addTilesetImage('tileset', 'tiles');

        var bg = this.add.sprite(200, 0, 'bg');
        bg.setScrollFactor(0);

        var ground = this.map.createStaticLayer('Suelo',tileset,0,0);
        var walls = this.map.createStaticLayer('Pared', tileset, 0,0);
        var spikes = this.map.createStaticLayer('Pinchos',tileset,0,0);


        ground.setCollision([58]);
        walls.setCollision([37,44]);

        this.physics.add.collider(ground, playerShape);
        this.physics.add.collider(ground, playerShape2);
        this.physics.add.collider(walls, playerShape);
        this.physics.add.collider(walls, playerShape2);

        //ANDAMIOS
        var andl = new Scaffold(this, 300, 1125, 'andamio', 350, 80, 20, 80);
        andl.addCollide(this, playerShape); //Inicio superior

        var andd = new Scaffold(this, 300, 2570, 'andamio', 350, 80, 20, 80);
        andd.addCollide(this, playerShape2);    //Inicio inferior

        var andl2 = new Scaffold(this, 3750, 1125, 'andamio', 350, 80, 20, 80);
        andl2.addCollide(this, playerShape);

        var andd2 = new Scaffold(this, 3750, 2570, 'andamio', 350, 80, 20, 80);
        andd2.addCollide(this, playerShape2);


        //COLOCAR BIEN //
        var nextLevel = this.add.zone(1970,0,10,1920);

        this.physics.add.overlap(playerPhysics,nextLevel,function(){
            if (this.physics.world.overlap(playerPhysics2,nextLevel)){
                this.scene.start("level2Scene");
            }
        });

        this.physics.add.overlap(playerPhysics2,nextLevel,function(){
            if (this.physics.world.overlap(playerPhysics,nextLevel)){
                this.scene.start("level2Scene");
            }
        });



        //CÁMARAS
        var cameraMain = this.cameras.main;
        cameraMain.setSize(1920,540);
        cameraMain.setBounds(0,0,4032,1440);

        var camera2 = this.cameras.add(0,540, 1920, 540);
        camera2.setBounds(0,1440,4032, 1440);

        cameraMain.startFollow(playerShape);
        camera2.startFollow(playerShape2);

        //PLATAFORMAS
        //Móviles
        var displaceY = 1445;

        var mpl = new MovingPlatform(this, 600, 925, 'plataforma'); //1
        mpl.addPlayerCollide(this, playerShape);
        mpl.setMovement(this, 200, 0, playerPhysics);

        var mpd = new MovingPlatform(this, 600, 925+displaceY, 'plataforma');
        mpd.setAlpha(0);
        mpd.addPlayerCollide(this, playerShape2);
        mpd.setMovement(this, 200, 0, playerPhysics2);

        var mpl2 = new MovingPlatform(this, 1200, 1225, 'plataforma');   //2
        mpl2.setAlpha(0);
        mpl2.addPlayerCollide(this, playerShape);
        mpl2.setMovement(this, 0, -400, playerPhysics);

        var mpd2 = new MovingPlatform(this, 1200, 1225+displaceY, 'plataforma');
        mpd2.addPlayerCollide(this, playerShape2);
        mpd2.setMovement(this, 0, -400, playerPhysics2);

        var mpl3 = new MovingPlatform(this, 2900, 400, 'plataforma');  //8
        mpl3.scale(2, 2);
        mpl3.setAlpha(0);
        mpl3.addPlayerCollide(this, playerShape);
        mpl3.setMovement(this, 0, 400, playerPhysics);

        var mpd3 = new MovingPlatform(this, 2900, 400+displaceY, 'plataforma');
        mpd3.scale(2, 2);
        mpd3.addPlayerCollide(this, playerShape2);
        mpd3.setMovement(this, 0, 400, playerPhysics2);

        //Estáticas
        var spl = new StaticPlatform(this, 1400, 425, 'plataforma');    //3
        spl.addPlayerCollide(this, playerShape);

        var spd = new StaticPlatform(this, 1400, 425+displaceY, 'plataforma');
        spd.setAlpha(0);
        spd.addPlayerCollide(this, playerShape2);

        var spl2 = new StaticPlatform(this, 1600, 1200, 'plataforma');  //4
        spl2.setAlpha(0);
        spl2.addPlayerCollide(this, playerShape);

        var spd2 = new StaticPlatform(this, 1600, 1200+displaceY, 'plataforma');
        spd2.addPlayerCollide(this, playerShape2);

        var spl3 = new StaticPlatform(this, 1900, 1150, 'plataforma');  //5
        spl3.addPlayerCollide(this, playerShape);

        var spd3 = new StaticPlatform(this, 1900, 1150+displaceY, 'plataforma');
        spd3.setAlpha(0);
        spd3.addPlayerCollide(this, playerShape2);

        var spl4 = new StaticPlatform(this, 2200, 1110, 'plataforma');  //6
        spl4.setAlpha(0);
        spl4.addPlayerCollide(this, playerShape);

        var spd4 = new StaticPlatform(this, 2200, 1110+displaceY, 'plataforma');
        spd4.addPlayerCollide(this, playerShape2);

        var spl5 = new StaticPlatform(this, 2500, 1070, 'plataforma');  //7
        spl5.addPlayerCollide(this, playerShape);

        var spd5 = new StaticPlatform(this, 2500, 1070+displaceY, 'plataforma');
        spd5.setAlpha(0);
        spd5.addPlayerCollide(this, playerShape2);

        var spl6 = new StaticPlatform(this, 3200, 500, 'plataforma');   //9
        spl6.addPlayerCollide(this, playerShape);

        var spd6 = new StaticPlatform(this, 3200, 500 + displaceY, 'plataforma');
        spd6.setAlpha(0);
        spd6.addPlayerCollide(this, playerShape2);

        //VIDA + PINCHOS
        var hp = new Life(this, this.English, playerShape, playerShape2);

        var spikesUp = new Spike(this, 2000, 1380, 3800, 100, 0xff0000, hp);
        spikesUp.setAlpha(0);
        spikesUp.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikesDown = new Spike(this, 2000, 1380+displaceY, 3800, 100, 0xff0000, hp);
        spikesDown.setAlpha(0);
        spikesDown.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS, iniXL, iniYL);

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
                if (playerPhysics.body.touching.down){
                    playerPhysics.body.setVelocityY(-200);
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