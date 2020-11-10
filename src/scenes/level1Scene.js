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
    }
    create(){
        this.add.sprite(960, 540, 'bg');
        var iniXL = 200;
        var iniYL = 200;
        var playerShape = this.add.sprite(iniXL, iniYL, 'light');
        var iniXS = 200;
        var iniYS = 1200;
        var playerShape2 = this.add.sprite(iniXS, iniYS, 'shadow');

        var playerPhysics = this.physics.add.existing(playerShape, 0);
        playerPhysics.body.setGravityY(-400);
        var playerPhysics2 = this.physics.add.existing(playerShape2, 0);


        //ANDAMIOS
        var andl = new Scaffold(this, 200, -100, 'andamio', 280, 50, 20, 350);
        andl.rotate(Math.PI);
        andl.addCollide(this, playerShape);

        var andd = new Scaffold(this, 200, 1500, 'andamio', 280, 50, 20, 50);
        andd.addCollide(this, playerShape2);

        var andl2 = new Scaffold(this, 3100, -100, 'andamio', 280, 50, 20, 350);
        andl2.rotate(Math.PI);
        andl2.addCollide(this, playerShape);

        var andd2 = new Scaffold(this, 3100, 1500, 'andamio', 280, 50, 20, 50);
        andd2.addCollide(this, playerShape2);

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

        var camera2 = this.cameras.add(0,540, 1920, 540);

        cameraMain.startFollow(playerShape);
        camera2.startFollow(playerShape2);

        //LÍMITE JUGADORES
        var limit = this.add.rectangle(1600, 700, 3000, 100, 0x000000);
        this.physics.add.existing(limit, 1);
        this.physics.add.collider(playerShape, limit);
        this.physics.add.collider(playerShape2, limit);

        //PLATAFORMAS
        //Móviles
        var mpl = new MovingPlatform(this, 500, 0, 'plataforma');
        mpl.rotate(Math.PI);
        mpl.addPlayerCollide(this, playerShape);
        mpl.setMovement(this, 200, 0, playerPhysics);

        var mpd = new MovingPlatform(this, 500, 1400, 'plataforma');
        mpd.setAlpha(0);
        mpd.addPlayerCollide(this, playerShape2);
        mpd.setMovement(this, 200, 0, playerPhysics2);

        var mpl2 = new MovingPlatform(this, 1100, 300, 'plataforma');
        mpl2.setAlpha(0);
        mpl2.addPlayerCollide(this, playerShape);
        mpl2.setMovement(this, 0, -400, playerPhysics);

        var mpd2 = new MovingPlatform(this, 1100, 1100, 'plataforma');
        mpd2.addPlayerCollide(this, playerShape2);
        mpd2.setMovement(this, 0, 400, playerPhysics2);

        var mpl3 = new MovingPlatform(this, 2400, -630, 'plataforma');
        mpl3.scale(2, 2);
        mpl3.setAlpha(0);
        mpl3.addPlayerCollide(this, playerShape);
        mpl3.setMovement(this, 0, 400, playerPhysics);

        var mpd3 = new MovingPlatform(this, 2400, 2030, 'plataforma');
        mpd3.scale(2, 2);
        mpd3.addPlayerCollide(this, playerShape2);
        mpd3.setMovement(this, 0, -400, playerPhysics2);

        //Estáticas
        var spl = new StaticPlatform(this, 1300, 350, 'plataforma');
        spl.rotate(Math.PI);
        spl.addPlayerCollide(this, playerShape);

        var spd = new StaticPlatform(this, 1300, 1050, 'plataforma');
        spd.setAlpha(0);
        spd.addPlayerCollide(this, playerShape2);

        var spl2 = new StaticPlatform(this, 1500, -600, 'plataforma');
        spl2.setAlpha(0);
        spl2.addPlayerCollide(this, playerShape);

        var spd2 = new StaticPlatform(this, 1500, 2000, 'plataforma');
        spd2.addPlayerCollide(this, playerShape2);

        var spl3 = new StaticPlatform(this, 1800, -550, 'plataforma');
        spl3.rotate(Math.PI);
        spl3.addPlayerCollide(this, playerShape);

        var spd3 = new StaticPlatform(this, 1800, 1950, 'plataforma');
        spd3.setAlpha(0);
        spd3.addPlayerCollide(this, playerShape2);

        var spl4 = new StaticPlatform(this, 1950, -510, 'plataforma');
        spl4.setAlpha(0);
        spl4.addPlayerCollide(this, playerShape);

        var spd4 = new StaticPlatform(this, 1950, 1910, 'plataforma');
        spd4.addPlayerCollide(this, playerShape2);

        var spl5 = new StaticPlatform(this, 2100, -470, 'plataforma');
        spl5.rotate(Math.PI);
        spl5.addPlayerCollide(this, playerShape);

        var spd5 = new StaticPlatform(this, 2100, 1870, 'plataforma');
        spd5.setAlpha(0);
        spd5.addPlayerCollide(this, playerShape2);

        var spl6 = new StaticPlatform(this, 2750, 300, 'plataforma');
        spl6.rotate(Math.PI);
        spl6.addPlayerCollide(this, playerShape);

        var spd6 = new StaticPlatform(this, 2750, 1000, 'plataforma');
        spd6.setAlpha(0);
        spd6.addPlayerCollide(this, playerShape2);

        //VIDA + PINCHOS
        var hp = new Life(this, this.English, playerShape, playerShape2);

        //Fondo de la pantalla
        var spikesl = new Spike(this, 1600, -700, 3000, 100, 0xff0000, hp);
        spikesl.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXS, iniYS);

        var spikesd = new Spike(this, 1600, 2100, 3000, 100, 0xff0000, hp);
        spikesd.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS, iniXL, iniYL);

        //Encima de la segunda plataforma móvil vertical
        var spikesl2 = new Spike(this, 2400, 625, 276, 50, 0xff0000, hp);
        spikesl2.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikesd2 = new Spike(this, 2400, 775, 276, 50, 0xff0000, hp);
        spikesd2.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS, iniXL, iniYL);

        //Primer escalón
        var spikel = new Spike(this, 1850, -510, 40, 40, 0xff0000, hp);
        spikel.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXS, iniYS);

        var spiked = new Spike(this, 1850, 1910, 40, 40, 0xff0000, hp);
        spiked.setAlpha(0);
        spiked.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXS, iniYS);

        //Segundo escalón
        var spikel2 = new Spike(this, 2000, -470, 40, 40, 0xff0000, hp);
        spikel2.setAlpha(0);
        spikel2.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXS, iniYS);

        var spiked2 = new Spike(this, 2000, 1870, 40, 40, 0xff0000, hp);
        spiked2.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXS, iniYS);

        //Tercer escalón
        var spikel3 = new Spike(this, 2150, -430, 40, 40, 0xff0000, hp);
        spikel3.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXS, iniYS);

        var spiked3 = new Spike(this, 2150, 1830, 40, 40, 0xff0000, hp);
        spiked3.setAlpha(0);
        spiked3.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXS, iniYS);

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