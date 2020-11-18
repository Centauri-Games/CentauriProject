class level8Scene extends Phaser.Scene{
    constructor(){
        super("level8Scene");
    }

    init(data){
        this.level = "level8Scene";
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
            this.am.bgMusic = this.bgMusic;
            this.am.bgMusicPlaying = true;
        }

        this.sound.add("portalFX", { volume: 0.5, loop: true }).play();

        var bg = this.add.sprite(960,540,'bg4');
        bg.setScrollFactor(0);

        //JUGADORES
        var iniXL = 300;
        var iniYL = 675;
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
        var iniYS = 2100;
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

        var displaceY = 1440;

        //ZONA FINAL
        var nextLevel1 = this.add.zone(1900,800,100,100);  //NEXT LEVEL
        var nextLevel2 = this.add.zone(1900,800+displaceY,100,100);  //NEXT LEVEL
        this.physics.add.existing(nextLevel1, 1);
        this.physics.add.existing(nextLevel2, 1);

        this.physics.add.overlap(playerPhysics,nextLevel1);

        this.physics.add.overlap(playerPhysics2,nextLevel2);

        //TILEMAP
        this.map = this.add.tilemap('map8');
        var tileset = this.map.addTilesetImage('tileset', 'tiles');
        var walls = this.map.createStaticLayer('Pared', tileset, 0,0);
        this.map.createStaticLayer('Suelo',tileset,0,0);
        this.map.createStaticLayer('Suelo2',tileset,0,0);

        walls.setCollision([12,13,14,19,20,21]);

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
        var andl = new Scaffold(this, 300, 935, 'andamio', 350, 500, 20, 80);
        andl.addCollide(this, playerShape); //Inicio superior

        var andd = new Scaffold(this, 300, 935+displaceY, 'andamio', 350, 500, 20, 80);
        andd.addCollide(this, playerShape2);    //Inicio inferior

        var andl2 = new Scaffold(this, 3750, 935, 'andamio', 350, 500, 20, 80);
        andl2.addCollide(this, playerShape);

        var andd2 = new Scaffold(this, 3750, 935+displaceY, 'andamio', 350, 500, 20, 80);
        andd2.addCollide(this, playerShape2);

        //VIDA + PINCHOS
        //Sprite vida
        this.anims.create({
            key: '2hp',
            frames: this.anims.generateFrameNumbers('heart', {start: 0, end: 1}),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: '1hp',
            frames: this.anims.generateFrameNumbers('heart', {start: 1, end: 2}),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: '0hp',
            frames: this.anims.generateFrameNumbers('heart', {start: 2, end: 3}),
            frameRate: 10,
            repeat: 0
        });

        this.hearts = this.add.sprite(0,0, 'heart');
        this.hearts2 = this.add.sprite(0,0, 'heart');

        cameraMain.ignore(this.hearts2);
        camera2.ignore(this.hearts);

        var hp = new Life(this, iniXL, iniYL, this.English, this.hearts, this.hearts2);

        //SUELO
        var floor1 = this.add.rectangle(2000, 1265, 3800, 100, 0xff0000);
        floor1.setAlpha(0);
        this.physics.add.existing(floor1, 1);
        this.physics.add.collider(playerShape, floor1);

        var floor2 = this.add.rectangle(2000, 1265+displaceY, 3800, 100, 0xff0000);
        floor2.setAlpha(0);
        this.physics.add.existing(floor2, 1);
        this.physics.add.collider(playerShape2, floor2);

        //PLATAFORMAS
        var mp1 = new MovingPlatform(this, 1500, 800, 'blueP');
        mp1.addPlayerCollide(this, playerShape);
        mp1.setMovement(this, 0, 200);

        var mp2 = new MovingPlatform(this, 2300, 800, 'blueP');
        mp2.addPlayerCollide(this, playerShape);
        mp2.setMovement(this, 0, 200);

        var mp3 = new MovingPlatform(this, 1500, 800+displaceY, 'blueP');
        mp3.addPlayerCollide(this, playerShape2);
        mp3.setMovement(this, 0, 200);

        var mp4 = new MovingPlatform(this, 2300, 800+displaceY, 'blueP');
        mp4.addPlayerCollide(this, playerShape2);
        mp4.setMovement(this, 0, 200);

        var portal1 = this.add.sprite(1900, 800, 'portalR').setDepth(15);
        portal1.setScale(2,2);
        this.physics.add.existing(portal1,1);
        this.physics.add.collider(playerShape, portal1, function(){
            playerShape.setPosition(portal1.x, portal1.y);
            playerPhysics.body.setImmovable(true);
            playerPhysics.body.moves =false;
        });

        var portal2 = this.add.sprite(1900, 800+displaceY, 'portalR').setDepth(15);
        portal2.setScale(2,2);
        this.physics.add.existing(portal2,1);
        this.physics.add.collider(playerShape2, portal2, function(){
            playerShape2.setPosition(portal2.x, portal2.y);
            playerPhysics2.body.setImmovable(true);
            playerPhysics2.body.moves =false;
        })

        //CONTROL Y MOVIMIENTO
        if(this.device == "mobile"){
           

            var keyMovement = {"A": {"isUp": true, "isDown" : false}, 
                            "D" :{"isUp": true, "isDown" : false}, 
                            "W" : {"isUp": true, "isDown" : false}, 
                            "ESC" : {"isUp": true, "isDown" : false}, 
                            "SPACE" : {"isUp": true, "isDown" : false}};

           

            var right = this.add.sprite(1770,400,'rightIcon').setInteractive();
            right.setScrollFactor(0,0);
            right.setScale(1.6);
            right.on('pointerout',function(){
                
                keyMovement.D.isUp = true;
                keyMovement.D.isDown = false;
            });
            right.on('pointerdown',function(){
                keyMovement.D.isDown = true;
                keyMovement.D.isUp = false;
            });
            cameraMain.ignore(right);
            ///////////////////////////////////
            let left = this.add.sprite(150,400,'leftIcon').setInteractive();
            left.setScale(1.6);
            left.setScrollFactor(0,0);
            left.on('pointerout',function(){
                keyMovement.A.isUp = true;
                keyMovement.A.isDown = false;
            });
            left.on('pointerover',function(){
                keyMovement.A.isDown = true;
                keyMovement.A.isUp = false;
            });
            cameraMain.ignore(left);
            ////////////////////////////////////
            let jump  = this.add.sprite(1820,250,'jumpIcon').setInteractive();
            jump.setScrollFactor(0,0);
            jump.on('pointerout',function(){
                keyMovement.W.isUp = true;
                keyMovement.W.isDown = false;
            });
            jump.on('pointerover',function(){
                keyMovement.W.isDown = true;
                keyMovement.W.isUp = false;
            });
            cameraMain.ignore(jump);
            ///////////////////////////////////////
            let jump2  = this.add.sprite(100,250,'jumpIcon').setInteractive();
            jump2.setScrollFactor(0,0);
            jump2.on('pointerout',function(){
                keyMovement.W.isUp = true;
                keyMovement.W.isDown = false;
            });
            jump2.on('pointerover',function(){
                keyMovement.W.isDown = true;
                keyMovement.W.isUp = false;
            });
            cameraMain.ignore(jump2);
            //////////////////////////////
            let swap = this.add.sprite(120,120,'swapIcon').setInteractive();
            swap.setScale(1.35);
            swap.setScrollFactor(0,0);
            swap.on('pointerout',function(){
                keyMovement.SPACE.isUp = true;
                keyMovement.SPACE.isDown = false;
            });
            swap.on('pointerover',function(){
                keyMovement.SPACE.isDown = true;
                keyMovement.SPACE.isUp = false;
            });
            camera2.ignore(swap);
            /////////////////////////////////////
            let pause = this.add.sprite(1800,120,'pauseIcon').setInteractive();
            pause.setScale(1.5);
            pause.setScrollFactor(0,0);
            pause.on('pointerout',function(){
                keyMovement.ESC.isUp = true;
                keyMovement.ESC.isDown = false;
            });
            pause.on('pointerover',function(){
                keyMovement.ESC.isDown = true;
                keyMovement.ESC.isUp = false;
            });
            camera2.ignore(pause);

            this.keyMovement = keyMovement;
            
        }else{
            this.keyMovement = this.input.keyboard.addKeys('A, D, W, ESC, SPACE');
        }
        
        this.playerProta = true;

        this.nextLevel1 = nextLevel1;
        this.nextLevel2 = nextLevel2;
        this.playerShape = playerShape;
        this.playerShape2 = playerShape2;
        this.playerPhysics = playerPhysics;
        this.playerPhysics2 = playerPhysics2;
    }
    update() {

        this.hearts.setPosition(this.playerShape.x, this.playerShape.y-55);
        this.hearts2.setPosition(this.playerShape2.x, this.playerShape2.y-55);

        if (this.physics.world.overlap(this.playerPhysics2, this.nextLevel2) && this.physics.world.overlap(this.playerPhysics, this.nextLevel1)){
            this.sound.add("diamondFX", { volume: 1, loop: false }).play();
            this.scene.start("level9Scene", {english: this.English, am: this.am});
        }

        if (this.keyMovement.SPACE.isUp && this.lastDown){
            this.playerProta = !this.playerProta;
            this.playerShape.anims.play('stopL', false);
            this.playerPhysics.body.setVelocityX(0);
            this.playerShape2.anims.play('stopS', false);
            this.playerPhysics2.body.setVelocityX(0);
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
            this.keyMovement.ESC.isDown = false;
            this.scene.pause();
            this.scene.launch('pauseScene', {level: this.level, am: this.am, english: this.English, am: this.am});
        }
    }
}