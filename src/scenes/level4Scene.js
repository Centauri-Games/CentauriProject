class level4Scene extends Phaser.Scene{
    constructor(){
        super("level4Scene");
    }

    init(data){
        this.level = "level4Scene";
        this.English = data.english;
    }

    preload(){
        this.load.image('bg', 'assets/backgrounds/space.png');

        this.load.spritesheet('light', 'assets/players/steps_light.png', {
            frameWidth: 65,
            frameHeight: 80
        });
        this.load.spritesheet('shadow', 'assets/players/steps_shadow.png', {
            frameWidth: 65,
            frameHeight: 80
        });
        this.load.image('andamio', 'assets/sprites/andamio.png');
        this.load.image('tiles', 'assets/tileset/Tilemap.png')
        this.load.tilemapTiledJSON('map','assets/levels/level4.json');
    }
    create(){
        var bg = this.add.sprite(960,540,'bg');
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
            frames: this.anims.generateFrameNumbers('light', {start: 3, end: 3}),
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
            frames: this.anims.generateFrameNumbers('shadow', {start: 3, end: 3}),
            frameRate: 10,
            repeat: -1
        });
        var playerPhysics2 = this.physics.add.existing(playerShape2, 0);

        playerShape.setDepth(10);
        playerShape2.setDepth(10);

        var nextLevel = this.add.zone(1970,0,10,1920);  //NEXT LEVEL

        this.physics.add.overlap(playerPhysics,nextLevel,function(){
            if (this.physics.world.overlap(playerPhysics2,nextLevel)){
                this.scene.start("level4Scene");
            }
        });

        this.physics.add.overlap(playerPhysics2,nextLevel,function(){
            if (this.physics.world.overlap(playerPhysics,nextLevel)){
                this.scene.start("level4Scene");
            }
        });

        //TILEMAP
        this.map = this.add.tilemap('map');
        var tileset = this.map.addTilesetImage('tileset', 'tiles');
        var walls = this.map.createStaticLayer('Pared', tileset, 0,0);
        this.map.createStaticLayer('Suelo',tileset,0,0);
        this.map.createStaticLayer('Suelo2',tileset,0,0);

        walls.setCollision([10,15,16,17]);

        this.physics.add.collider(walls, playerShape);
        this.physics.add.collider(walls, playerShape2);

        //CÁMARAS
        var cameraMain = this.cameras.main;
        cameraMain.setSize(1920,540);

        var camera2 = this.cameras.add(0,540, 1920, 540);

        cameraMain.startFollow(playerShape);
        camera2.startFollow(playerShape2);

        cameraMain.setBounds(0,0,4032,1440);
        camera2.setBounds(0,1440,4032, 1440);

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
        var displaceY = 1445;

        //SUELO y PLATAFORMAS
        //J Superior
        var floor1 = this.add.rectangle(2000, 1450, 3800, 100, 0xff0000);
        floor1.setAlpha(0);
        this.physics.add.existing(floor1, 1);
        this.physics.add.collider(playerShape, floor1);

        var floor2 = this.add.rectangle(2000, 1450+displaceY, 3800, 100, 0xff0000);
        floor2.setAlpha(0);
        this.physics.add.existing(floor2, 1);
        this.physics.add.collider(playerShape2, floor2);


        //ESPEJOS
        /*Rellenar*/



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
                playerShape.flipX = false;
                if (playerPhysics.body.velocity.y < 0 || (playerPhysics.body.velocity.y > 0 && !playerPhysics.body.touching.down)){
                    playerShape.anims.play('jumpL', false);
                } else {
                    playerShape.anims.play('runL', true);
                }
            } else {
                playerPhysics2.body.setVelocityX(100);
                playerShape2.flipX = false;
                if (playerPhysics2.body.velocity.y < 0 || (playerPhysics2.body.velocity.y > 0 && !playerPhysics2.body.touching.down)){
                    playerShape2.anims.play('jumpS', false);
                } else {
                    playerShape2.anims.play('runS', true);
                }
            }
        });

        keyMovement.A.on('down', function(e) {
            pressedA = true;
            if (playerProta){
                playerPhysics.body.setVelocityX(-100);
                playerShape.flipX = true;
                if (playerPhysics.body.velocity.y < 0 || (playerPhysics.body.velocity.y > 0 && !playerPhysics.body.touching.down)){
                    playerShape.anims.play('jumpL', false);
                } else {
                    playerShape.anims.play('runL', true);
                }
            } else {
                playerPhysics2.body.setVelocityX(-100);
                playerShape2.flipX = true;
                if (playerPhysics2.body.velocity.y < 0 || (playerPhysics2.body.velocity.y > 0 && !playerPhysics2.body.touching.down)){
                    playerShape2.anims.play('jumpS', false);
                } else {
                    playerShape2.anims.play('runS', true);
                }
            }
        });

        keyMovement.W.on('down', function(e) {
            pressedW = true;
            if (playerProta){
                if (playerPhysics.body.touching.down){
                    playerPhysics.body.setVelocityY(-200);
                    playerShape.anims.play('jumpL', false);
                }
            } else {
                if (playerPhysics2.body.touching.down){
                    playerPhysics2.body.setVelocityY(-200);
                    playerShape2.anims.play('jumpS', false);
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
                    playerShape.anims.play('stopL', false);
                } else {
                    playerPhysics.body.setVelocityX(-100);
                    playerShape.flipX = true;
                    if (playerPhysics.body.velocity.y < 0 || (playerPhysics.body.velocity.y > 0 && !playerPhysics.body.touching.down)){
                        playerShape.anims.play('jumpL', false);
                    } else {
                        playerShape.anims.play('runL', true);
                    }
                }
            } else {
                if (!pressedA){
                    playerPhysics2.body.setVelocityX(0);
                    playerShape2.anims.play('stopS', false);
                } else {
                    playerPhysics2.body.setVelocityX(-100);
                    playerShape2.flipX = true;
                    if (playerPhysics2.body.velocity.y < 0 || (playerPhysics2.body.velocity.y > 0 && !playerPhysics2.body.touching.down)){
                        playerShape2.anims.play('jumpS', false);
                    } else {
                        playerShape2.anims.play('runS', true);
                    }
                }
            }
        });

        keyMovement.A.on('up', function(e) {
            pressedA = false;
            if (playerProta) {
                if (!pressedD) {
                    playerPhysics.body.setVelocityX(0);
                    playerShape.anims.play('stopL', false);
                } else {
                    playerPhysics.body.setVelocityX(100);
                    playerShape.flipX = false;
                    if (playerPhysics.body.velocity.y < 0 || (playerPhysics.body.velocity.y > 0 && !playerPhysics.body.touching.down)){
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
                    playerPhysics2.body.setVelocityX(-100);
                    playerShape2.flipX = false;
                    if (playerPhysics2.body.velocity.y < 0 || (playerPhysics2.body.velocity.y > 0 && !playerPhysics2.body.touching.down)){
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