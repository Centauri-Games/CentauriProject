class level10Scene extends Phaser.Scene{
    constructor(){
        super("level10Scene");
    }

    init(data){
        this.level = "level10Scene";
        this.English = data.english;
        this.lastDown = false;
        this.am = data.am;
    }

    preload(){
    }
    create(){

        //Reset música
        this.am.bgMusic.stop();
        this.am.bgMusicPlaying = false;

        //Audio Manager
        if (this.am.musicOn === true && this.am.bgMusicPlaying === false) {
            this.bgMusic = this.sound.add("ingameMS", { volume: 0.7, loop: true });
            this.bgMusic.play();
            this.am.bgMusicPlaying = true;
        }

        var bg = this.add.sprite(960,540,'bg4');
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

        //TILEMAP
        this.map = this.add.tilemap('map10');
        var tileset = this.map.addTilesetImage('tileset', 'tiles');
        var walls = this.map.createStaticLayer('Pared', tileset, 0,0);
        this.map.createStaticLayer('Suelo',tileset,0,0);
        this.map.createStaticLayer('Suelo2',tileset,0,0);

        walls.setCollision([12,13]);

        this.physics.add.collider(walls, playerShape);
        this.physics.add.collider(walls, playerShape2);

        //CÁMARAS
        var cameraMain = this.cameras.main;
        cameraMain.setSize(1920,540);
        var camera2 = this.cameras.add(0,540, 1920, 540);

        cameraMain.setBounds(0,0,4032, 1440);
        camera2.setBounds(0,0,4032, 2880);

        cameraMain.startFollow(playerShape);
        camera2.startFollow(playerShape2);

        //ANDAMIOS
        var andl = new Scaffold(this, 300, 1125, 'andamio', 350, 500, 20, 80);
        andl.addCollide(this, playerShape); //Inicio superior

        var andd = new Scaffold(this, 300, 2570, 'andamio', 350, 500, 20, 80);
        andd.addCollide(this, playerShape2);    //Inicio inferior

        var andl2 = new Scaffold(this, 3750, 1125, 'andamio', 350, 500, 20, 80);
        andl2.addCollide(this, playerShape);

        var andd2 = new Scaffold(this, 3750, 2570, 'andamio', 350, 500, 20, 80);
        andd2.addCollide(this, playerShape2);


        //VIDA + PINCHOS
        var hp = new Life(this, this.English, playerShape, playerShape2);
        var displaceY = 1440;

        var spikesD = new Spike(this, 1295, 1200 + displaceY, 480, 100, 0xff0000, hp);
        spikesD.setAlpha(0);
        spikesD.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS);

        //PLATAFORMAS
        //Móviles
        var mpd = new MovingPlatform(this, 2000, 2800, 'woodP');
        mpd.addPlayerCollide(this, playerShape2);
        mpd.setMovement(this, 0, -400);

        var mpd2 = new MovingPlatform(this, 3550, 500 + displaceY, 'woodP');
        mpd2.addPlayerCollide(this, playerShape2);
        mpd2.setMovement(this, 0, -100);

        var mpd3 = new MovingPlatform(this, 700, 775 + displaceY, 'woodP');
        mpd3.addPlayerCollide(this, playerShape2);
        mpd3.setMovement(this, 0, -200);

        //Estáticas
        var spl = new StaticPlatform(this, 500, 1350, 'woodP');
        spl.addPlayerCollide(this, playerShape);

        var spl2 = new StaticPlatform(this, 800, 1250, 'woodP');
        spl2.addPlayerCollide(this, playerShape);

        var spl3 = new StaticPlatform(this, 3455, 1000, 'woodP');
        spl3.addPlayerCollide(this, playerShape);

        //SUELO
        //J Superior
        var floor1L = this.add.rectangle(2000, 1488, 3800, 100, 0xff0000);
        floor1L.setAlpha(0);
        this.physics.add.existing(floor1L, 1);
        this.physics.add.collider(playerShape, floor1L);

        var floor2L = this.add.rectangle(1295, 1200, 672, 100, 0xff0000);
        floor2L.setAlpha(0);
        this.physics.add.existing(floor2L, 1);
        this.physics.add.collider(playerShape, floor2L);

        var floor3L = this.add.rectangle(1727, 1104, 192, 100, 0xff0000);
        floor3L.setAlpha(0);
        this.physics.add.existing(floor3L, 1);
        this.physics.add.collider(playerShape, floor3L);

        var floor4L = this.add.rectangle(2015, 1008, 384, 100, 0xff0000);
        floor4L.setAlpha(0);
        this.physics.add.existing(floor4L, 1);
        this.physics.add.collider(playerShape, floor4L);

        var floor5L = this.add.rectangle(2687, 1200, 960, 100, 0xff0000);
        floor5L.setAlpha(0);
        this.physics.add.existing(floor5L, 1);
        this.physics.add.collider(playerShape, floor5L);

        var floor6L = this.add.rectangle(3359, 1104, 384, 100, 0xff0000);
        floor6L.setAlpha(0);
        this.physics.add.existing(floor6L, 1);
        this.physics.add.collider(playerShape, floor6L);

        var floor7L = this.add.rectangle(719, 912, 96, 100, 0xff0000);
        floor7L.setAlpha(0);
        this.physics.add.existing(floor7L, 1);
        this.physics.add.collider(playerShape, floor7L);

        var floor8L = this.add.rectangle(815, 816, 96, 100, 0xff0000);
        floor8L.setAlpha(0);
        this.physics.add.existing(floor8L, 1);
        this.physics.add.collider(playerShape, floor8L);

        var floor9L = this.add.rectangle(911, 720, 96, 100, 0xff0000);
        floor9L.setAlpha(0);
        this.physics.add.existing(floor9L, 1);
        this.physics.add.collider(playerShape, floor9L);

        var floor10L = this.add.rectangle(1103, 624, 288, 100, 0xff0000);
        floor10L.setAlpha(0);
        this.physics.add.existing(floor10L, 1);
        this.physics.add.collider(playerShape, floor10L);

        var floor11L = this.add.rectangle(1439, 528, 384, 100, 0xff0000);
        floor11L.setAlpha(0);
        this.physics.add.existing(floor11L, 1);
        this.physics.add.collider(playerShape, floor11L);

        var floor12L = this.add.rectangle(2303, 432, 1344, 100, 0xff0000);
        floor12L.setAlpha(0);
        this.physics.add.existing(floor12L, 1);
        this.physics.add.collider(playerShape, floor12L);

        var floor13L = this.add.rectangle(3455, 624, 960, 100, 0xff0000);
        floor13L.setAlpha(0);
        this.physics.add.existing(floor13L, 1);
        this.physics.add.collider(playerShape, floor13L);

        //J Inferior
        var floor1D = this.add.rectangle(2000, 1488 + displaceY, 3800, 100, 0xff0000);
        floor1D.setAlpha(0);
        this.physics.add.existing(floor1D, 1);
        this.physics.add.collider(playerShape2, floor1D);

        var floor3D = this.add.rectangle(2303, 1104 + displaceY, 384, 100, 0xff0000);
        floor3D.setAlpha(0);
        this.physics.add.existing(floor3D, 1);
        this.physics.add.collider(playerShape2, floor3D);

        var floor4D = this.add.rectangle(2447, 672 + displaceY, 672, 196, 0xff0000);
        floor4D.setAlpha(0);
        this.physics.add.existing(floor4D, 1);
        this.physics.add.collider(playerShape2, floor4D);

        var floor5D = this.add.rectangle(3263, 672 + displaceY, 576, 196, 0xff0000);
        floor5D.setAlpha(0);
        this.physics.add.existing(floor5D, 1);
        this.physics.add.collider(playerShape2, floor5D);

        var floor6D = this.add.rectangle(863, 912 + displaceY, 384, 100, 0xff0000);
        floor6D.setAlpha(0);
        this.physics.add.existing(floor6D, 1);
        this.physics.add.collider(playerShape2, floor6D);

        //CONTROL Y MOVIMIENTO
        this.keyMovement = this.input.keyboard.addKeys('A, D, W, ESC, SPACE');
        this.playerProta = true;

        this.playerShape = playerShape;
        this.playerShape2 = playerShape2;
        this.playerPhysics = playerPhysics;
        this.playerPhysics2 = playerPhysics2;

        var goal = this.add.rectangle(3750, 1125, 300, 500, 0x000000);
        goal.setAlpha(0);
        var goalPhysics = this.physics.add.existing(goal, 1);
        this.physics.add.overlap(playerPhysics,goalPhysics);
        this.goal = goal;

        var goal2 = this.add.rectangle(3750, 1125 + displaceY, 300, 500, 0x000000);
        goal2.setAlpha(0);
        var goalPhysics2 = this.physics.add.existing(goal2, 1);
        this.physics.add.overlap(playerPhysics2,goalPhysics2);
        this.goal2 = goal2;
    }
    update(){
        if (this.physics.world.overlap(this.playerPhysics,this.goal) && this.physics.world.overlap(this.playerPhysics2,this.goal2)){
            this.sound.add("diamondFX", { volume: 1, loop: false }).play();
            this.scene.start("menuScene", {english: this.English, am: this.am});
        }

        if (this.keyMovement.SPACE.isUp && this.lastDown){
            this.playerProta = !this.playerProta;
            this.lastDown = false;
        } else if (this.keyMovement.SPACE.isDown){
            this.lastDown = true;
        }

        if (this.keyMovement.A.isDown) {
            if (this.playerProta){
                this.playerPhysics.body.setVelocityX(-175);
                this.playerShape.flipX = true;
                if (this.playerPhysics.body.velocity.y < 0 || (this.playerPhysics.body.velocity.y > 0 && !this.playerPhysics.body.touching.down)){
                    this.playerShape.anims.play('jumpL', false);
                } else {
                    this.playerShape.anims.play('runL', true);
                }
            } else {
                this.playerPhysics2.body.setVelocityX(-175);
                this.playerShape2.flipX = true;
                if (this.playerPhysics2.body.velocity.y < 0 || (this.playerPhysics2.body.velocity.y > 0 && !this.playerPhysics2.body.touching.down)){
                    this.playerShape2.anims.play('jumpS', false);
                } else {
                    this.playerShape2.anims.play('runS', true);
                }
            }
        } else if (this.keyMovement.D.isUp){
            if (this.playerProta) {
                this.playerPhysics.body.setVelocityX(0);
                this.playerShape.anims.play('stopL', false);
            } else {
                this.playerPhysics2.body.setVelocityX(0);
                this.playerShape2.anims.play('stopS', false);
            }
        }
        /////////////////////////////////////////
        /////////////////////////////////////////
        if (this.keyMovement.D.isDown) {
            if (this.playerProta){
                this.playerPhysics.body.setVelocityX(175);
                this.playerShape.flipX = false;
                if (this.playerPhysics.body.velocity.y < 0 || (this.playerPhysics.body.velocity.y > 0 && !this.playerPhysics.body.touching.down)){
                    this.playerShape.anims.play('jumpL', false);
                } else {
                    this.playerShape.anims.play('runL', true);
                }
            } else {
                this.playerPhysics2.body.setVelocityX(175);
                this.playerShape2.flipX = false;
                if (this.playerPhysics2.body.velocity.y < 0 || (this.playerPhysics2.body.velocity.y > 0 && !this.playerPhysics2.body.touching.down)){
                    this.playerShape2.anims.play('jumpS', false);
                } else {
                    this.playerShape2.anims.play('runS', true);
                }
            }
        } else if(this.keyMovement.A.isUp) {
            if (this.playerProta) {
                this.playerPhysics.body.setVelocityX(0);
                this.playerShape.anims.play('stopL', false);
            } else {
                this.playerPhysics2.body.setVelocityX(0);
                this.playerShape2.anims.play('stopS', false);
            }
        }
        ///////////////////////////////////////////
        //////////////////////////////////////////
        if (this.keyMovement.W.isDown) {
            if (this.playerProta) {
                if (this.playerPhysics.body.touching.down || this.playerPhysics.body.touching.up) {
                    if (this.physics.world.gravity.y > 0){
                        this.playerPhysics.body.setVelocityY(-250);
                    } else {
                        this.playerPhysics.body.setVelocityY(250);
                    }
                    this.playerShape.anims.play('jumpL', false);
                }
            } else {
                if (this.playerPhysics2.body.touching.down || this.playerPhysics2.body.touching.up) {
                    if (this.physics.world.gravity.y > 0){
                        this.playerPhysics2.body.setVelocityY(-250);
                    } else {
                        this.playerPhysics2.body.setVelocityY(250);
                    }
                    this.playerShape2.anims.play('jumpS', false);
                }
            }
        }
        if (this.keyMovement.ESC.isDown) {
            this.bgMusic.stop();
            this.scene.switch('pauseScene', {level: this.level, english: this.English, am: this.am});
        }
    }
}