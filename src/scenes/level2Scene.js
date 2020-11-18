class level2Scene extends Phaser.Scene{
    constructor(){
        super("level2Scene");
    }

    init(data){
        this.level = "level2Scene";
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
            this.bgMusic = this.sound.add("ingameMS2", { volume: 0.7, loop: true });
            this.bgMusic.play();
            this.am.bgMusic = this.bgMusic;
            this.am.bgMusicPlaying = true;
        }

        var bg = this.add.sprite(960,540,'bg2');
        bg.setScrollFactor(0);

        var iniXL = 300;
        var iniYL = 1350;
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

        this.map = this.add.tilemap('map2');
        var tileset = this.map.addTilesetImage('tileset', 'tiles');

        var ground = this.map.createStaticLayer('Suelo',tileset,0,0);
        var ground2 = this.map.createStaticLayer('Suelo2',tileset,0,0);
        var walls = this.map.createStaticLayer('Pared', tileset, 0,0);
        this.map.createStaticLayer('Pinchos',tileset,0,0);


        ground.setCollision([29,30]);
        ground2.setCollision([58, 3221225530]);
        walls.setCollision([37,44]);

        this.physics.add.collider(ground2, playerShape);
        this.physics.add.collider(ground2, playerShape2);
        this.physics.add.collider(walls, playerShape);
        this.physics.add.collider(walls, playerShape2);


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

        //Techo inferior/Suelo superior
        var floorDownl = this.add.rectangle(2000, 1440, 4000, 100, 0x000000);
        floorDownl.setAlpha(0);
        this.physics.add.existing(floorDownl, 1);
        this.physics.add.collider(playerShape, floorDownl);

        //Techo superior
        var floorUpl = this.add.rectangle(2000, 527, 4000, 100, 0x000000);
        floorUpl.setAlpha(0);
        this.physics.add.existing(floorUpl, 1);
        this.physics.add.collider(playerShape, floorUpl);

        var floorUpl2 = this.add.rectangle(3600, 623, 2000, 100, 0x000000);
        floorUpl2.setAlpha(0);
        this.physics.add.existing(floorUpl2, 1);
        this.physics.add.collider(playerShape, floorUpl2);

        var floorUpl3 = this.add.rectangle(3984, 719, 2000, 100, 0x000000);
        floorUpl3.setAlpha(0);
        this.physics.add.existing(floorUpl3, 1);
        this.physics.add.collider(playerShape, floorUpl3);

        var floorUpl4 = this.add.rectangle(4464, 815, 2000, 100, 0x000000);
        floorUpl4.setAlpha(0);
        this.physics.add.existing(floorUpl4, 1);
        this.physics.add.collider(playerShape, floorUpl4);

        var floorUpl5 = this.add.rectangle(450, 623, 2000, 100, 0x000000);
        floorUpl5.setAlpha(0);
        this.physics.add.existing(floorUpl5, 1);
        this.physics.add.collider(playerShape, floorUpl5);

        var floorUpl6 = this.add.rectangle(66, 719, 2000, 100, 0x000000);
        floorUpl6.setAlpha(0);
        this.physics.add.existing(floorUpl6, 1);
        this.physics.add.collider(playerShape, floorUpl6);

        var floorUpl7 = this.add.rectangle(-414, 815, 2000, 100, 0x000000);
        floorUpl7.setAlpha(0);
        this.physics.add.existing(floorUpl7, 1);
        this.physics.add.collider(playerShape, floorUpl7);
        //this.physics.add.collider(playerShape2, limit);
        //LÍMITES JUGADORES
        /*

        var limit2 = this.add.rectangle(1600, 0, 3000, 100, 0x000000);
        this.physics.add.existing(limit2, 1);
        this.physics.add.collider(playerShape, limit2);*/

        //PLATAFORMAS
        var sp = new StaticPlatform(this, 600, 2600, 'blueP');
        sp.addPlayerCollide(this, playerShape2);

        var sp2 = new StaticPlatform(this, 800, 1700, 'blueP');
        sp2.rotate(Math.PI);
        sp2.addPlayerCollide(this, playerShape2);

        var sp3 = new StaticPlatform(this, 1100, 2750, 'blueP');
        sp3.addPlayerCollide(this, playerShape2);

        var sp4 = new StaticPlatform(this, 1400, 2750, 'blueP');
        sp4.addPlayerCollide(this, playerShape2);

        var sp5 = new StaticPlatform(this, 1600, 2400, 'blueP');
        sp5.rotate(Math.PI);
        sp5.addPlayerCollide(this, playerShape2);

        var sp6 = new StaticPlatform(this, 1800, 1800, 'blueP');
        sp6.rotate(Math.PI);
        sp6.addPlayerCollide(this, playerShape2);

        var sp7 = new StaticPlatform(this, 2000, 2700, 'blueP');
        sp7.addPlayerCollide(this, playerShape2);

        var sp8 = new StaticPlatform(this, 2200, 1800, 'blueP');
        sp8.rotate(Math.PI);
        sp8.addPlayerCollide(this, playerShape2);

        var sp9 = new StaticPlatform(this, 2400, 2700, 'blueP');
        sp9.addPlayerCollide(this, playerShape2);

        var sp10 = new StaticPlatform(this, 2700, 2750, 'blueP');
        sp10.addPlayerCollide(this, playerShape2);

        var sp11 = new StaticPlatform(this, 2900, 1700, 'blueP');
        sp11.rotate(Math.PI);
        sp11.addPlayerCollide(this, playerShape2);

        var sp12 = new StaticPlatform(this, 3250, 2200, 'blueP');
        sp12.addPlayerCollide(this, playerShape2);

        //VIDA
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

        //PINCHOS
        var spikesupd = new Spike(this, 2000, 1560, 4000, 100, 0xff0000, hp);
        spikesupd.setAlpha(0);
        spikesupd.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS, iniXL, iniYL);

        var spikesdownd = new Spike(this, 2000, 2830, 4000, 100, 0xff0000, hp);
        spikesdownd.setAlpha(0);
        spikesdownd.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS, iniXL, iniYL);

        var spikesupl = new Spike(this, 1970, 580, 100, 50, 0xff0000, hp);
        spikesupl.setAlpha(0);
        spikesupl.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXS, iniYS);

        var spikesdownl = new Spike(this, 2110, 1425, 100, 100, 0xff0000, hp);
        spikesdownl.setAlpha(0);
        spikesdownl.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXS, iniYS);

        //CAMBIO DE GRAVEDAD
        var gravity = new GravitySwitch(this, 2500, 1440, 1700, 560, 'greenButton', 'redButton');
        gravity.addTrigger(this, playerShape, playerShape2, playerPhysics, playerPhysics2);

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

        //Meta
        var goal = this.add.rectangle(3800, 1125, 300, 5000, 0x000000);
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

        this.hearts.setPosition(this.playerShape.x, this.playerShape.y-55);
        this.hearts2.setPosition(this.playerShape2.x, this.playerShape2.y-55);

        if(this.physics.world.overlap(this.playerPhysics,this.goal) && this.physics.world.overlap(this.playerPhysics2,this.goal)){
            this.sound.add("diamondFX", { volume: 1, loop: false }).play();
            this.scene.start("level3Scene", {english: this.English, am: this.am, device: this.device});
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
                if(!this.physics.world.overlap(this.playerPhysics,this.goal)) {
                    if (this.playerPhysics.body.touching.down && this.physics.world.gravity.y > 0) {
                        this.playerPhysics.body.setVelocityY(-250);
                        this.playerShape.anims.play('jumpL', false);
                    } else if (this.playerPhysics.body.touching.up && this.physics.world.gravity.y < 0) {
                        this.playerPhysics.body.setVelocityY(250);
                        this.playerShape.anims.play('jumpL', false);
                    }
                }
            } else {
                if(!this.physics.world.overlap(this.playerPhysics2,this.goal)) {
                    if (this.playerPhysics2.body.touching.down && this.physics.world.gravity.y > 0) {
                        this.playerPhysics2.body.setVelocityY(-250);
                        this.playerShape2.anims.play('jumpS', false);
                    } else if (this.playerPhysics2.body.touching.up && this.physics.world.gravity.y < 0) {
                        this.playerPhysics2.body.setVelocityY(250);
                        this.playerShape2.anims.play('jumpS', false);
                    }
                }
            }
        }

        if (this.keyMovement.ESC.isDown) {
            this.keyMovement.ESC.isDown = false;
            this.scene.pause();
            this.scene.launch('pauseScene', {level: this.level, am: this.am, english: this.English});
        }
    }
}