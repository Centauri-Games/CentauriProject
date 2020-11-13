class level7Scene extends Phaser.Scene{
    constructor(){
        super("level7Scene");
    }

    init(data){
        this.level = "level7Scene";
        this.English = data.english;
    }

    preload(){
        this.load.image('bg', 'assets/backgrounds/west.png');

        this.load.image('plataforma', 'assets/sprites/plataforma.png');
        this.load.image('diamond', 'assets/sprites/diamanteR.png');
        this.load.image('laser', 'assets/sprites/laser.png');

        this.load.spritesheet('light', 'assets/players/Hyperion.png', {
            frameWidth: 65,
            frameHeight: 80
        });
        this.load.spritesheet('shadow', 'assets/players/Érebos.png', {
            frameWidth: 65,
            frameHeight: 80
        });

        this.load.spritesheet('mirror', 'assets/sprites/espejo.png', {
            frameWidth: 104,
            frameHeight: 128
        });

        this.load.spritesheet('door', 'assets/sprites/puerta.png', {
            frameWidth: 140,
            frameHeight: 1004
        });

        this.load.spritesheet('greenButton', 'assets/sprites/botonVerde.png', {
            frameWidth: 59,
            frameHeight: 150
        });

        this.load.spritesheet('redButton', 'assets/sprites/botonRojo.png', {
            frameWidth: 59,
            frameHeight: 150
        });

        this.load.image('andamio', 'assets/sprites/andamio.png');

        this.load.image('portalA', 'assets/sprites/portalAzul.png');
        this.load.image('portalR', 'assets/sprites/portalRojo.png');
        this.load.image('doorStart', 'assets/sprites/borde_puerta.png');

        this.load.image('tiles', 'assets/tileset/Tilemap.png')
        this.load.tilemapTiledJSON('map','assets/levels/level7.json');
    }
    create() {
        var bg = this.add.sprite(960, 540, 'bg');
        bg.setDepth(-2);
        bg.setScrollFactor(0);

        //JUGADORES
        var iniXL = 300;
        var iniYL = 875;
        var playerShape = this.add.sprite(iniXL, iniYL, 'light');
        this.anims.create({
            key: 'stopL',
            frames: this.anims.generateFrameNumbers('light', {start: 0, end: 0}),
            frameRate: 10
        });
        this.anims.create({
            key: 'runL',
            frames: this.anims.generateFrameNumbers('light', {start: 1, end: 10}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jumpL',
            frames: this.anims.generateFrameNumbers('light', {start: 11, end: 11}),
            frameRate: 10,
            repeat: -1
        });
        var playerPhysics = this.physics.add.existing(playerShape, 0);

        var iniXS = 300;
        var iniYS = 2300;
        var playerShape2 = this.add.sprite(iniXS, iniYS, 'shadow');
        this.anims.create({
            key: 'stopS',
            frames: this.anims.generateFrameNumbers('shadow', {start: 0, end: 0}),
            frameRate: 10
        });
        this.anims.create({
            key: 'runS',
            frames: this.anims.generateFrameNumbers('shadow', {start: 1, end: 10}),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jumpS',
            frames: this.anims.generateFrameNumbers('shadow', {start: 11, end: 11}),
            frameRate: 10,
            repeat: -1
        });
        var playerPhysics2 = this.physics.add.existing(playerShape2, 0);

        playerShape.setDepth(10);
        playerShape2.setDepth(10);

        var nextLevel = this.add.zone(1970, 0, 10, 1920);  //NEXT LEVEL

        this.physics.add.overlap(playerPhysics, nextLevel, function () {
            if (this.physics.world.overlap(playerPhysics2, nextLevel)) {
                this.scene.start("level8Scene");
            }
        });

        this.physics.add.overlap(playerPhysics2, nextLevel, function () {
            if (this.physics.world.overlap(playerPhysics, nextLevel)) {
                this.scene.start("level8Scene");
            }
        });

        //TILEMAP
        this.map = this.add.tilemap('map');
        var tileset = this.map.addTilesetImage('tileset', 'tiles');
        var walls = this.map.createStaticLayer('Pared', tileset, 0, 0);
        this.map.createStaticLayer('Suelo', tileset, 0, 0);
        this.map.createStaticLayer('Suelo2', tileset, 0, 0);
        this.map.createStaticLayer('Pinchos', tileset, 0, 0);

        walls.setCollision([12, 13, 19, 20]);

        this.physics.add.collider(walls, playerShape);
        this.physics.add.collider(walls, playerShape2);

        //CÁMARAS
        var cameraMain = this.cameras.main;
        cameraMain.setSize(1920, 540);

        var camera2 = this.cameras.add(0, 540, 1920, 540);

        cameraMain.startFollow(playerShape);
        camera2.startFollow(playerShape2);

        cameraMain.setBounds(0, 0, 4032, 1440);
        camera2.setBounds(0, 1440, 4032, 1440);

        //ANDAMIOS
        var andl = new Scaffold(this, 300, 1125, 'andamio', 350, 500, 20, 80);
        andl.addCollide(this, playerShape); //Inicio superior

        var andd = new Scaffold(this, 300, 2570, 'andamio', 350, 500, 20, 80);
        andd.addCollide(this, playerShape2);    //Inicio inferior

        var andl2 = new Scaffold(this, 3350, 1125, 'andamio', 350, 500, 20, 80);
        andl2.addCollide(this, playerShape);

        var andd2 = new Scaffold(this, 3350, 2570, 'andamio', 350, 500, 20, 80);
        andd2.addCollide(this, playerShape2);

        //VIDA + PINCHOS
        var hp = new Life(this, this.English, playerShape, playerShape2);
        var displaceY = 1440;

        //*Añadir pinchos*/
        var spikesl = new Spike(this, 2900, 1195, 3800, 100, 0xff0000, hp);
        spikesl.setAlpha(0);
        spikesl.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXS, iniYS);
        var spikesd = new Spike(this, 2258, 1199 + displaceY, 384, 96, 0xff0000, hp);
        spikesd.setAlpha(0);
        spikesd.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS, iniXL, iniYL);

        //PLATAFORMAS
        //Estáticas
        var spd = new StaticPlatform(this, 2258, 1199 + displaceY, 'plataforma');
        spd.addPlayerCollide(this, playerShape2);

        //Móviles
        var mpl = new MovingPlatform(this, 650, 1150, 'plataforma');
        mpl.addPlayerCollide(this, playerShape);
        mpl.setMovement(this, 0, -250);

        //SUELO
        //J Superior
        var floor1L = this.add.rectangle(2000, 1295, 3800, 100, 0xff0000);
        floor1L.setAlpha(0);
        this.physics.add.existing(floor1L, 1);
        this.physics.add.collider(playerShape, floor1L);

        var floor2L = this.add.rectangle(2000, 1295, 3800, 100, 0xff0000);
        floor2L.setAlpha(0);
        this.physics.add.existing(floor2L, 1);
        this.physics.add.collider(playerShape, floor2L);

        var floor3L = this.add.rectangle(1778, 670, 2016, 192, 0xff0000);
        floor3L.setAlpha(0);
        this.physics.add.existing(floor3L, 1);
        this.physics.add.collider(playerShape, floor3L);

        var floor4L = this.add.rectangle(3750, 975, 500, 100, 0xff0000);
        floor4L.setAlpha(0);
        this.physics.add.existing(floor4L, 1);
        this.physics.add.collider(playerShape, floor4L);

        //J Inferior
        var floor1S = this.add.rectangle(2000, 1295 + displaceY, 3800, 100, 0xff0000);
        floor1S.setAlpha(0);
        this.physics.add.existing(floor1S, 1);
        this.physics.add.collider(playerShape2, floor1S);

        var floor2S = this.add.rectangle(1010, 1199 + displaceY, 96, 96, 0xff0000);
        floor2S.setAlpha(0);
        this.physics.add.existing(floor2S, 1);
        this.physics.add.collider(playerShape2, floor2S);

        var floor3S = this.add.rectangle(1202, 1103 + displaceY, 288, 96, 0xff0000);
        floor3S.setAlpha(0);
        this.physics.add.existing(floor3S, 1);
        this.physics.add.collider(playerShape2, floor3S);

        var floor4S = this.add.rectangle(1442, 1007 + displaceY, 192, 96, 0xff0000);
        floor4S.setAlpha(0);
        this.physics.add.existing(floor4S, 1);
        this.physics.add.collider(playerShape2, floor4S);

        var floor5S = this.add.rectangle(1682, 911 + displaceY, 288, 96, 0xff0000);
        floor5S.setAlpha(0);
        this.physics.add.existing(floor5S, 1);
        this.physics.add.collider(playerShape2, floor5S);

        var floor6S = this.add.rectangle(1874, 815 + displaceY, 96, 96, 0xff0000);
        floor6S.setAlpha(0);
        this.physics.add.existing(floor6S, 1);
        this.physics.add.collider(playerShape2, floor6S);

        var floor7S = this.add.rectangle(1970, 719 + displaceY, 96, 96, 0xff0000);
        floor7S.setAlpha(0);
        this.physics.add.existing(floor7S, 1);
        this.physics.add.collider(playerShape2, floor7S);

        var floor8S = this.add.rectangle(2546, 719 + displaceY, 96, 96, 0xff0000);
        floor8S.setAlpha(0);
        this.physics.add.existing(floor8S, 1);
        this.physics.add.collider(playerShape2, floor8S);

        var floor9S = this.add.rectangle(3750, 975 + displaceY, 500, 100, 0xff0000);
        floor9S.setAlpha(0);
        this.physics.add.existing(floor9S, 1);
        this.physics.add.collider(playerShape2, floor9S);

        //PUERTA
        var doorStart = this.add.sprite(1500, 360, 'doorStart');
        doorStart.setScale(0.5, 0.5);
        doorStart.setDepth(100);
        var doorButton = new Button(this, 650, 1150 + displaceY, 1550, 350, 'greenButton', 'door');
        doorButton.addCollideDoor(this, playerShape);
        doorButton.addCollideButton(this, playerShape2);

        //BOTÓN QUE SUBE LA PLATAFORMA


        //CONTROL Y MOVIMIENTO
        var keyMovement = this.input.keyboard.addKeys('A, D, W, SPACE');

        var pressedA = false;
        var pressedD = false;
        var pressedW = false;

        var playerProta = true;

        //Codigo de "teclas" para el movimiento. Habria que cambiar el codigo de dentro por el mensaje que se enviará al servidor para decir que movimiento ha realizado el personaje

        keyMovement.D.on('down', function (e) {
            pressedD = true;
            if (playerProta) {
                playerPhysics.body.setVelocityX(175);
                playerShape.flipX = false;
                if (playerPhysics.body.velocity.y < 0 || (playerPhysics.body.velocity.y > 0 && !playerPhysics.body.touching.down)) {
                    playerShape.anims.play('jumpL', false);
                } else {
                    playerShape.anims.play('runL', true);
                }
            } else {
                playerPhysics2.body.setVelocityX(175);
                playerShape2.flipX = false;
                if (playerPhysics2.body.velocity.y < 0 || (playerPhysics2.body.velocity.y > 0 && !playerPhysics2.body.touching.down)) {
                    playerShape2.anims.play('jumpS', false);
                } else {
                    playerShape2.anims.play('runS', true);
                }
            }
        });

        keyMovement.A.on('down', function (e) {
            pressedA = true;
            if (playerProta) {
                playerPhysics.body.setVelocityX(-175);
                playerShape.flipX = true;
                if (playerPhysics.body.velocity.y < 0 || (playerPhysics.body.velocity.y > 0 && !playerPhysics.body.touching.down)) {
                    playerShape.anims.play('jumpL', false);
                } else {
                    playerShape.anims.play('runL', true);
                }
            } else {
                playerPhysics2.body.setVelocityX(-175);
                playerShape2.flipX = true;
                if (playerPhysics2.body.velocity.y < 0 || (playerPhysics2.body.velocity.y > 0 && !playerPhysics2.body.touching.down)) {
                    playerShape2.anims.play('jumpS', false);
                } else {
                    playerShape2.anims.play('runS', true);
                }
            }
        });

        keyMovement.W.on('down', function (e) {
            pressedW = true;
            if (playerProta) {
                if (playerPhysics.body.touching.down) {
                    playerPhysics.body.setVelocityY(-200);
                    playerShape.anims.play('jumpL', false);
                }
            } else {
                if (playerPhysics2.body.touching.down) {
                    playerPhysics2.body.setVelocityY(-200);
                    playerShape2.anims.play('jumpS', false);
                }
            }
        });

        keyMovement.SPACE.on('down', function (e) {
            playerProta = !playerProta;
        });

        keyMovement.D.on('up', function (e) {
            pressedD = false;
            if (playerProta) {
                if (!pressedA) {
                    playerPhysics.body.setVelocityX(0);
                    playerShape.anims.play('stopL', false);
                } else {
                    playerPhysics.body.setVelocityX(-175);
                    playerShape.flipX = true;
                    if (playerPhysics.body.velocity.y < 0 || (playerPhysics.body.velocity.y > 0 && !playerPhysics.body.touching.down)) {
                        playerShape.anims.play('jumpL', false);
                    } else {
                        playerShape.anims.play('runL', true);
                    }
                }
            } else {
                if (!pressedA) {
                    playerPhysics2.body.setVelocityX(0);
                    playerShape2.anims.play('stopS', false);
                } else {
                    playerPhysics2.body.setVelocityX(-175);
                    playerShape2.flipX = true;
                    if (playerPhysics2.body.velocity.y < 0 || (playerPhysics2.body.velocity.y > 0 && !playerPhysics2.body.touching.down)) {
                        playerShape2.anims.play('jumpS', false);
                    } else {
                        playerShape2.anims.play('runS', true);
                    }
                }
            }
        });

        keyMovement.A.on('up', function (e) {
            pressedA = false;
            if (playerProta) {
                if (!pressedD) {
                    playerPhysics.body.setVelocityX(0);
                    playerShape.anims.play('stopL', false);
                } else {
                    playerPhysics.body.setVelocityX(175);
                    playerShape.flipX = false;
                    if (playerPhysics.body.velocity.y < 0 || (playerPhysics.body.velocity.y > 0 && !playerPhysics.body.touching.down)) {
                        playerShape.anims.play('jumpL', false);
                    } else {
                        playerShape.anims.play('runL', true);
                    }
                }
            } else {
                if (!pressedD) {
                    playerPhysics2.body.setVelocityX(0);
                    playerShape2.anims.play('stopS', false);
                } else {
                    playerPhysics2.body.setVelocityX(-175);
                    playerShape2.flipX = false;
                    if (playerPhysics2.body.velocity.y < 0 || (playerPhysics2.body.velocity.y > 0 && !playerPhysics2.body.touching.down)) {
                        playerShape2.anims.play('jumpS', false);
                    } else {
                        playerShape2.anims.play('runS', true);
                    }
                }
            }
        });
    }
    update(){
        
    }
}