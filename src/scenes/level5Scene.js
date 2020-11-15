class level5Scene extends Phaser.Scene{
    constructor(){
        super("level5Scene");
    }

    init(data){
        this.level = "level5Scene";
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

        var bg = this.add.sprite(960,540,'bg3');
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
        this.map = this.add.tilemap('map5');
        var tileset = this.map.addTilesetImage('tileset', 'tiles');
        var walls = this.map.createStaticLayer('Pared', tileset, 0,0);
        this.map.createStaticLayer('Pinchos',tileset,0,0);
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

        var andl2 = new Scaffold(this, 3750, 1125, 'andamio', 350, 80, 20, 80);
        andl2.addCollide(this, playerShape);

        var andd2 = new Scaffold(this, 3750, 2570, 'andamio', 350, 80, 20, 80);
        andd2.addCollide(this, playerShape2);

        //VIDA + PINCHOS
        var hp = new Life(this, this.English, playerShape, playerShape2);
        var displaceY = 1445;

        //PINCHOS
        var spikesUp = new Spike(this, 2000, 1400, 3800, 100, 0xff0000, hp);
        spikesUp.setAlpha(0);
        spikesUp.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikesDown = new Spike(this, 2000, 1400+displaceY, 3800, 100, 0xff0000, hp);
        spikesDown.setAlpha(0);
        spikesDown.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS, iniXL, iniYL);


        //DROP PLATFORMS
        var dualPlat1 = new DualDropPlatform(this, 600, 1100, 600, 2540, 'blueP');
        dualPlat1.addPlayerCollide(this, playerShape, 5);
        dualPlat1.addPlayerCollide(this, playerShape2, 5);

        var dualPlat2 = new DualDropPlatform(this, 900, 1100, 900, 2540, 'blueP');
        dualPlat2.addPlayerCollide(this, playerShape, 5);
        dualPlat2.addPlayerCollide(this, playerShape2, 5);

        var dualPlat3 = new DualDropPlatform(this, 1200, 1300, 1200, 2740, 'blueP');
        dualPlat3.addPlayerCollide(this, playerShape, 5);
        dualPlat3.addPlayerCollide(this, playerShape2, 5);

        var dualPlat4 = new DualDropPlatform(this, 1500, 1250, 1500, 2690, 'blueP');
        dualPlat4.addPlayerCollide(this, playerShape, 5);
        dualPlat4.addPlayerCollide(this, playerShape2, 5);

        var dualPlat5 = new DualDropPlatform(this, 1800, 1200, 1800, 2640, 'blueP');
        dualPlat5.addPlayerCollide(this, playerShape, 5);
        dualPlat5.addPlayerCollide(this, playerShape2, 5);

        var dualPlat6 = new DualDropPlatform(this, 2100, 1150, 2100, 2590, 'blueP');
        dualPlat6.addPlayerCollide(this, playerShape, 5);
        dualPlat6.addPlayerCollide(this, playerShape2, 5);

        var dualPlat7 = new DualDropPlatform(this, 2400, 1225, 2400, 2665, 'blueP');
        dualPlat7.addPlayerCollide(this, playerShape, 5);
        dualPlat7.addPlayerCollide(this, playerShape2, 5);

        var dualPlat8 = new DualDropPlatform(this, 2700, 1200, 2700, 2640, 'blueP');
        dualPlat8.addPlayerCollide(this, playerShape, 5);
        dualPlat8.addPlayerCollide(this, playerShape2, 5);

        var dualPlat9 = new DualDropPlatform(this, 3000, 1150, 3000, 2590, 'blueP');
        dualPlat9.addPlayerCollide(this, playerShape, 5);
        dualPlat9.addPlayerCollide(this, playerShape2, 5);

        var dualPlat10 = new DualDropPlatform(this, 3300, 1100, 3300, 2540, 'blueP');
        dualPlat10.addPlayerCollide(this, playerShape, 5);
        dualPlat10.addPlayerCollide(this, playerShape2, 5);

        var dualPlat10 = new DualDropPlatform(this, 3450, 1025, 3450, 2465, 'blueP');
        dualPlat10.addPlayerCollide(this, playerShape, 5);
        dualPlat10.addPlayerCollide(this, playerShape2, 5);

        var limitL = this.add.rectangle(2000, 1500, 4000, 100, 0x000000);
        this.physics.add.existing(limitL, 1);
        dualPlat1.addWorldCollider(this, limitL);
        dualPlat2.addWorldCollider(this, limitL);
        dualPlat3.addWorldCollider(this, limitL);
        dualPlat4.addWorldCollider(this, limitL);
        dualPlat5.addWorldCollider(this, limitL);
        dualPlat6.addWorldCollider(this, limitL);
        dualPlat7.addWorldCollider(this, limitL);
        dualPlat8.addWorldCollider(this, limitL);
        dualPlat9.addWorldCollider(this, limitL);
        dualPlat10.addWorldCollider(this, limitL);

        //CONTROL Y MOVIMIENTO
        this.keyMovement = this.input.keyboard.addKeys('A, D, W, SPACE');
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
    update() {
        if (this.physics.world.overlap(this.playerPhysics, this.goal) && this.physics.world.overlap(this.playerPhysics2, this.goal)){
            this.sound.add("diamondFX", { volume: 1, loop: false }).play();
            this.scene.start("level6Scene", {english: this.English, am: this.am});
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
    }
}