class level1Scene extends Phaser.Scene{
    constructor(){
        super("level1Scene");
    }

    init(data){
        this.level = "level1Scene";
        this.English = data.english;
        this.lastDown = false;
        this.am = data.am;
        this.device = data.device;
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

        var iniXL = 300;
        var iniYL = 875;
        var playerShape = this.add.sprite(iniXL, iniYL, 'light');
        playerShape.setDepth(10);
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

        var iniXS = 300;
        var iniYS = 2300;
        var playerShape2 = this.add.sprite(iniXS, iniYS, 'shadow');
        playerShape2.setDepth(10);
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


        var playerPhysics = this.physics.add.existing(playerShape, 0);
        //playerPhysics.body.setGravityY(-400);
        var playerPhysics2 = this.physics.add.existing(playerShape2, 0);

        this.map = this.add.tilemap('map1');
        var tileset = this.map.addTilesetImage('tileset', 'tiles');

        var bg = this.add.sprite(200, 0, 'bg1');
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

        var mpl = new MovingPlatform(this, 600, 925, 'woodP'); //1
        mpl.addPlayerCollide(this, playerShape);
        mpl.setMovement(this, 200, 0);

        var mpd = new MovingPlatform(this, 600, 925+displaceY, 'woodP');
        mpd.setAlpha(0);
        mpd.addPlayerCollide(this, playerShape2);
        mpd.setMovement(this, 200, 0);

        var mpl2 = new MovingPlatform(this, 1200, 1225, 'woodP');   //2
        mpl2.setAlpha(0);
        mpl2.addPlayerCollide(this, playerShape);
        mpl2.setMovement(this, 0, -400);

        var mpd2 = new MovingPlatform(this, 1200, 1225+displaceY, 'woodP');
        mpd2.addPlayerCollide(this, playerShape2);
        mpd2.setMovement(this, 0, -400);

        var mpl3 = new MovingPlatform(this, 2900, 400, 'woodP');  //8
        mpl3.scale(2, 2);
        mpl3.setAlpha(0);
        mpl3.addPlayerCollide(this, playerShape);
        mpl3.setMovement(this, 0, 400);

        var mpd3 = new MovingPlatform(this, 2900, 400+displaceY, 'woodP');
        mpd3.scale(2, 2);
        mpd3.addPlayerCollide(this, playerShape2);
        mpd3.setMovement(this, 0, 400);

        //Estáticas
        var spl = new StaticPlatform(this, 1400, 425, 'woodP');    //3
        spl.addPlayerCollide(this, playerShape);

        var spd = new StaticPlatform(this, 1400, 425+displaceY, 'woodP');
        spd.setAlpha(0);
        spd.addPlayerCollide(this, playerShape2);

        var spl2 = new StaticPlatform(this, 1600, 1200, 'woodP');  //4
        spl2.setAlpha(0);
        spl2.addPlayerCollide(this, playerShape);

        var spd2 = new StaticPlatform(this, 1600, 1200+displaceY, 'woodP');
        spd2.addPlayerCollide(this, playerShape2);

        var spl3 = new StaticPlatform(this, 1900, 1150, 'woodP');  //5
        spl3.addPlayerCollide(this, playerShape);

        var spd3 = new StaticPlatform(this, 1900, 1150+displaceY, 'woodP');
        spd3.setAlpha(0);
        spd3.addPlayerCollide(this, playerShape2);

        var spl4 = new StaticPlatform(this, 2200, 1110, 'woodP');  //6
        spl4.setAlpha(0);
        spl4.addPlayerCollide(this, playerShape);

        var spd4 = new StaticPlatform(this, 2200, 1110+displaceY, 'woodP');
        spd4.addPlayerCollide(this, playerShape2);

        var spl5 = new StaticPlatform(this, 2500, 1070, 'woodP');  //7
        spl5.addPlayerCollide(this, playerShape);

        var spd5 = new StaticPlatform(this, 2500, 1070+displaceY, 'woodP');
        spd5.setAlpha(0);
        spd5.addPlayerCollide(this, playerShape2);

        var spl6 = new StaticPlatform(this, 3200, 500, 'woodP');   //9
        spl6.addPlayerCollide(this, playerShape);

        var spd6 = new StaticPlatform(this, 3200, 500 + displaceY, 'woodP');
        spd6.setAlpha(0);
        spd6.addPlayerCollide(this, playerShape2);

        //VIDA + PINCHOS
        var hp = new Life(this, this.English, playerShape, playerShape2);

        var spikesUp = new Spike(this, 2000, 1380, 3800, 100, 0xff0000, hp);
        spikesUp.setAlpha(0);
        spikesUp.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikesUpR = new Spike(this, 3160, 92, 800, 100, 0xff0000, hp);
        spikesUpR.setAlpha(0);
        spikesUpR.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikesDown = new Spike(this, 2000, 1380+displaceY, 3800, 100, 0xff0000, hp);
        spikesDown.setAlpha(0);
        spikesDown.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS, iniXL, iniYL);

        var spikesDownR = new Spike(this, 3160, 92+displaceY, 800, 100, 0xff0000, hp);
        spikesDownR.setAlpha(0);
        spikesDownR.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS, iniXL, iniYL);

        //CONTROL Y MOVIMIENTO
        this.keyMovement = this.input.keyboard.addKeys('A, D, W, ESC, SPACE');
        this.playerProta = true;

        //Meta
        var goal = this.add.rectangle(3750, 1125, 300, 5000, 0x000000);
        goal.setAlpha(0);
        var goalPhysics = this.physics.add.existing(goal, 1);
        this.physics.add.overlap(playerPhysics,goalPhysics);
        this.physics.add.overlap(playerPhysics2,goalPhysics);

        this.playerShape = playerShape;
        this.playerShape2 = playerShape2;
        this.playerPhysics = playerPhysics;
        this.playerPhysics2 = playerPhysics2;
        this.goal = goal;
    }
    update(){
        if (this.physics.world.overlap(this.playerPhysics,this.goal) && this.physics.world.overlap(this.playerPhysics2,this.goal)){
            this.sound.add("diamondFX", { volume: 1, loop: false }).play();
            this.scene.start("level2Scene", {english: this.English, am: this.am});
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