class level3Scene extends Phaser.Scene {
    constructor() {
        super("level3Scene");
    }

    init(data) {
        this.level = "level3Scene";
        this.English = data.english;
        this.lastDown = false;
        this.am = data.am;
        this.device = data.device;
        this.coop = data.coop;

    }

    preload() {
    }

    create() {

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

        var bg = this.add.sprite(960, 540, 'bg1');
        bg.setScrollFactor(0);

        //JUGADORES
        var iniXL = 300;
        var iniYL = 875;
        var playerShape = this.add.sprite(iniXL, iniYL, 'light');
        this.anims.create({
            key: 'stopL',
            frames: this.anims.generateFrameNumbers('light', { start: 0, end: 0 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'runL',
            frames: this.anims.generateFrameNumbers('light', { start: 1, end: 10 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jumpL',
            frames: this.anims.generateFrameNumbers('light', { start: 11, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        var playerPhysics = this.physics.add.existing(playerShape, 0);

        var iniXS = 300;
        var iniYS = 2300;
        var playerShape2 = this.add.sprite(iniXS, iniYS, 'shadow');
        this.anims.create({
            key: 'stopS',
            frames: this.anims.generateFrameNumbers('shadow', { start: 0, end: 0 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'runS',
            frames: this.anims.generateFrameNumbers('shadow', { start: 1, end: 10 }),
            frameRate: 10,
            repeat: -1
        });
        this.anims.create({
            key: 'jumpS',
            frames: this.anims.generateFrameNumbers('shadow', { start: 11, end: 11 }),
            frameRate: 10,
            repeat: -1
        });
        var playerPhysics2 = this.physics.add.existing(playerShape2, 0);

        playerShape.setDepth(10);
        playerShape2.setDepth(10);


        //TILEMAP
        this.map = this.add.tilemap('map3');
        var tileset = this.map.addTilesetImage('tileset', 'tiles');
        var ground = this.map.createStaticLayer('Suelo', tileset, 0, 0);
        var walls = this.map.createStaticLayer('Pared', tileset, 0, 0);
        this.map.createStaticLayer('Pinchos', tileset, 0, 0);
        this.map.createStaticLayer('Plataformas', tileset, 0, 0);

        ground.setCollision([58]);
        walls.setCollision([30, 36, 37, 38, 43, 44, 45]);

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
        var andl = new Scaffold(this, 300, 1125, 'andamio', 350, 80, 20, 80);
        andl.addCollide(this, playerShape); //Inicio superior

        var andd = new Scaffold(this, 300, 2570, 'andamio', 350, 80, 20, 80);
        andd.addCollide(this, playerShape2);    //Inicio inferior

        var andl2 = new Scaffold(this, 3750, 1125, 'andamio', 350, 80, 20, 80);
        andl2.addCollide(this, playerShape);

        var andd2 = new Scaffold(this, 3750, 2570, 'andamio', 350, 80, 20, 80);
        andd2.addCollide(this, playerShape2);

        //VIDA + PINCHOS
        //Sprite vida
        this.anims.create({
            key: '2hp',
            frames: this.anims.generateFrameNumbers('heart', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: '1hp',
            frames: this.anims.generateFrameNumbers('heart', { start: 1, end: 2 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: '0hp',
            frames: this.anims.generateFrameNumbers('heart', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: 0
        });

        this.hearts = this.add.sprite(0, 0, 'heart');
        this.hearts2 = this.add.sprite(0, 0, 'heart');

        cameraMain.ignore(this.hearts2);
        camera2.ignore(this.hearts);

        var hp = new Life(this, iniXL, iniYL, this.English, this.hearts, this.hearts2);
        var displaceY = 1445;

        var spikesUp = new Spike(this, 2000, 1380, 3800, 100, 0xff0000, hp);
        spikesUp.setAlpha(0);
        spikesUp.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikesDown = new Spike(this, 2000, 1380 + displaceY, 3800, 100, 0xff0000, hp);
        spikesDown.setAlpha(0);
        spikesDown.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS, iniXL, iniYL);

        //SUELO y PLATAFORMAS
        //J Superior
        var floor1 = this.add.rectangle(725, 950, 200, 80, 0x000000);
        floor1.setAlpha(0);
        this.physics.add.existing(floor1, 1);
        this.physics.add.collider(playerShape, floor1);

        var floor2 = this.add.rectangle(1050, 950, 80, 80, 0x000000);
        floor2.setAlpha(0);
        this.physics.add.existing(floor2, 1);
        this.physics.add.collider(playerShape, floor2);

        var floor3 = this.add.rectangle(1400, 950, 200, 80, 0x000000);
        floor3.setAlpha(0);
        this.physics.add.existing(floor3, 1);
        this.physics.add.collider(playerShape, floor3);

        var floor4 = this.add.rectangle(725, 1235, 400, 80, 0x000000);
        floor4.setAlpha(0);
        this.physics.add.existing(floor4, 1);
        this.physics.add.collider(playerShape, floor4);

        var floor5 = this.add.rectangle(1400, 1235, 400, 80, 0x000000);
        floor5.setAlpha(0);
        this.physics.add.existing(floor5, 1);
        this.physics.add.collider(playerShape, floor5);

        var floor6 = this.add.rectangle(2100, 1235, 700, 80, 0x000000);
        floor6.setAlpha(0);
        this.physics.add.existing(floor6, 1);
        this.physics.add.collider(playerShape, floor6);

        var floor7 = this.add.rectangle(2450, 1165, 100, 80, 0x000000);
        floor7.setAlpha(0);
        this.physics.add.existing(floor7, 1);
        this.physics.add.collider(playerShape, floor7);

        var floor8 = this.add.rectangle(2600, 1075, 200, 80, 0x000000);
        floor8.setAlpha(0);
        this.physics.add.existing(floor8, 1);
        this.physics.add.collider(playerShape, floor8);

        var floor9 = this.add.rectangle(2790, 980, 200, 80, 0x000000);
        floor9.setAlpha(0);
        this.physics.add.existing(floor9, 1);
        this.physics.add.collider(playerShape, floor9);

        var floor10 = this.add.rectangle(2945, 790, 120, 80, 0x000000);
        floor10.setAlpha(0);
        this.physics.add.existing(floor10, 1);
        this.physics.add.collider(playerShape, floor10);

        var sp = new StaticPlatform(this, 1050, 1125, 'woodP');
        sp.addPlayerCollide(this, playerShape);

        var mp1 = new MovingPlatform(this, 3100, 790, 'woodP'); //Plataforma final
        mp1.addPlayerCollide(this, playerShape);
        mp1.setMovement(this, 200, 0, playerPhysics);

        //J Inferior

        var mp2 = new MovingPlatform(this, 600, 2400, 'woodP'); //Plataforma 1
        mp2.addPlayerCollide(this, playerShape2);
        mp2.setMovement(this, 0, 150, playerPhysics2);

        var sp2 = new StaticPlatform(this, 1200, 2700, 'woodP');
        sp2.addPlayerCollide(this, playerShape2);

        var mp3 = new MovingPlatform(this, 1500, 2700, 'woodP'); //Plataforma 2
        mp3.addPlayerCollide(this, playerShape2);
        mp3.setMovement(this, 0, -325, playerPhysics2);

        var floor11 = this.add.rectangle(1920, 2015, 500, 80, 0x000000);
        floor11.setAlpha(0);
        this.physics.add.existing(floor11, 1);
        this.physics.add.collider(playerShape2, floor11);

        var floor12 = this.add.rectangle(2400, 2200, 300, 80, 0x000000);
        floor12.setAlpha(0);
        this.physics.add.existing(floor12, 1);
        this.physics.add.collider(playerShape2, floor12);

        var floor13 = this.add.rectangle(2820, 2110, 200, 80, 0x000000);
        floor13.setAlpha(0);
        this.physics.add.existing(floor13, 1);
        this.physics.add.collider(playerShape2, floor13);

        this.physics.add.collider(playerShape, floor13);
        this.physics.add.collider(playerShape, floor12);

        var floor14 = this.add.rectangle(3070, 2675, 300, 80, 0x000000);
        floor14.setAlpha(0);
        this.physics.add.existing(floor14, 1);
        this.physics.add.collider(playerShape2, floor14);

        var mp4 = new MovingPlatform(this, 3400, 2200, 'woodP'); //Plataforma 2
        mp4.addPlayerCollide(this, playerShape2);
        mp4.setMovement(this, 0, 200, playerPhysics2);

        var mp5 = new MovingPlatform(this, 3100, 2400, 'woodP'); //Plataforma 2
        mp5.addPlayerCollide(this, playerShape2);
        mp5.setMovement(this, 0, -200, playerPhysics2);

        //PORTALES

        var portal1 = new Teleport(this, 1050, 1300, 1000, 2300, 'portalA', 'portalR');
        portal1.setScale(1.5, 1.5);
        portal1.rotateExit(Math.PI);

        var portal2 = new Teleport(this, 2600, 2750, 2855, 550, 'portalA', 'portalR');
        portal2.setScale(1.5, 1.5);
        portal2.rotateExit(Math.PI);


        //CAJAS

        var box1 = new Box(this, 1000, 2775, 850, 1100, 50, 50, 'caja');
        box1.addPlayerCollide(this, playerShape);
        box1.addPlayerCollide(this, playerShape2);
        box1.addWorldCollide(this, floor4);

        portal1.addCollide(this, box1.getBox());

        var box2 = new Box(this, 2855, 915, 2520, 1600, 50, 50, 'caja');
        box2.addPlayerCollide(this, playerShape);
        box2.addPlayerCollide(this, playerShape2);
        box2.addWorldCollide(this, floor12);

        portal2.addCollide(this, box2.getBox());

        var box3 = new Box(this, 2855, 865, 2400, 1600, 50, 50, 'caja');
        box3.addPlayerCollide(this, playerShape);
        box3.addPlayerCollide(this, playerShape2);
        box3.addWorldCollide(this, floor12);

        portal2.addCollide(this, box3.getBox());

        var box4 = new Box(this, 2805, 915, 2805, 915, 50, 50, 'caja');
        box4.addPlayerCollide(this, playerShape);
        box4.addResetCollide(this, spikesUp);
        box4.addResetCollide(this, spikesDown);

        portal2.addCollide(this, box4.getBox());



        //CONTROL Y MOVIMIENTO
        //CONTROL Y MOVIMIENTO
        if (this.device == "mobile") {


            var keyMovement = {
                "A": { "isUp": true, "isDown": false },
                "D": { "isUp": true, "isDown": false },
                "W": { "isUp": true, "isDown": false },
                "ESC": { "isUp": true, "isDown": false },
                "SPACE": { "isUp": true, "isDown": false },
                "L": { "isUp": true, "isDown": false },
                "J": { "isUp": true, "isDown": false },
                "I": { "isUp": true, "isDown": false }
            };

            let right;
            let left;
            let right2;
            let left2;
            let jumpr;
            let jumpl;
            let pause;
            let swap;


            pause = this.add.sprite(1800, 120, 'pauseIcon').setInteractive();
            pause.input.hitArea.setTo(700, 246, 476, 437);
            pause.setScale(0.45);
            pause.setScrollFactor(0, 0);
            pause.on('pointerout', function () {
                keyMovement.ESC.isUp = true;
                keyMovement.ESC.isDown = false;
            });
            pause.on('pointerover', function () {
                keyMovement.ESC.isDown = true;
                keyMovement.ESC.isUp = false;
            });
            camera2.ignore(pause);


            if (this.coop) {
                jumpr = this.add.sprite(1580, 450, 'jumpIcon').setInteractive();
                jumpr.alpha = 0.7;
                jumpr.input.hitArea.setTo(700, 246, 476, 437);
                jumpr.setScale(0.3);
                jumpr.setScrollFactor(0, 0);
                jumpr.on('pointerout', function () {
                    jumpr.alpha = 0.7;
                    keyMovement.I.isUp = true;
                    keyMovement.I.isDown = false;
                });
                jumpr.on('pointerover', function () {
                    jumpr.alpha = 1;
                    keyMovement.I.isDown = true;
                    keyMovement.I.isUp = false;
                });
                cameraMain.ignore(jumpr);
                ///////////////////////////////////////
                jumpl = this.add.sprite(350, 450, 'jumpIcon').setInteractive();
                jumpl.alpha = 0.7;
                jumpl.input.hitArea.setTo(700, 246, 476, 437);
                jumpl.setScale(0.3);
                jumpl.setScrollFactor(0, 0);
                jumpl.on('pointerout', function () {
                    jumpl.alpha = 0.7;
                    keyMovement.W.isUp = true;
                    keyMovement.W.isDown = false;
                });
                jumpl.on('pointerover', function () {
                    jumpl.alpha = 1;
                    keyMovement.W.isDown = true;
                    keyMovement.W.isUp = false;
                });
                cameraMain.ignore(jumpl);

                right = this.add.sprite(600, 450, 'rightIcon').setInteractive();
                right.alpha = 0.7;
                right.input.hitArea.setTo(700, 246, 476, 437);
                right.setScrollFactor(0, 0);
                right.setScale(0.4);
                right.on('pointerout', function () {
                    right.alpha = 0.7;
                    keyMovement.D.isUp = true;
                    keyMovement.D.isDown = false;
                });
                right.on('pointerover', function () {
                    right.alpha = 1;
                    keyMovement.D.isDown = true;
                    keyMovement.D.isUp = false;
                });
                cameraMain.ignore(right);
                ///////////////////////////////////
                left = this.add.sprite(100, 450, 'leftIcon').setInteractive();
                left.alpha = 0.7;
                left.input.hitArea.setTo(700, 246, 476, 437);
                left.setScale(0.4);
                left.setScrollFactor(0, 0);
                left.on('pointerout', function () {
                    left.alpha = 0.7;
                    keyMovement.A.isUp = true;
                    keyMovement.A.isDown = false;
                });
                left.on('pointerover', function () {
                    left.alpha = 1;
                    keyMovement.A.isDown = true;
                    keyMovement.A.isUp = false;
                });
                cameraMain.ignore(left);

                ////////////////////////////

                right2 = this.add.sprite(1830, 450, 'rightIcon').setInteractive();
                right2.alpha = 0.7;
                right2.input.hitArea.setTo(700, 246, 476, 437);
                right2.setScrollFactor(0, 0);
                right2.setScale(0.4);
                right2.on('pointerout', function () {
                    right2.alpha = 0.7;
                    keyMovement.L.isUp = true;
                    keyMovement.L.isDown = false;
                });
                right2.on('pointerover', function () {
                    right2.alpha = 1;
                    keyMovement.L.isDown = true;
                    keyMovement.L.isUp = false;
                });
                cameraMain.ignore(right2);
                ///////////////////////////////////
                left2 = this.add.sprite(1330, 450, 'leftIcon').setInteractive();
                left2.alpha = 0.7;
                left2.input.hitArea.setTo(700, 246, 476, 437);
                left2.setScale(0.4);
                left2.setScrollFactor(0, 0);
                left2.on('pointerout', function () {
                    left2.alpha = 0.7;
                    keyMovement.J.isUp = true;
                    keyMovement.J.isDown = false;
                });
                left2.on('pointerover', function () {
                    left2.alpha = 1;
                    keyMovement.J.isDown = true;
                    keyMovement.J.isUp = false;
                });
                cameraMain.ignore(left2);

            } else {


                right = this.add.sprite(1830, 450, 'rightIcon').setInteractive();
                right.alpha = 0.7;
                right.input.hitArea.setTo(700, 246, 476, 437);
                right.setScrollFactor(0, 0);
                right.setScale(0.4);
                right.on('pointerout', function () {
                    right.alpha = 0.7;
                    keyMovement.D.isUp = true;
                    keyMovement.D.isDown = false;
                });
                right.on('pointerover', function () {
                    right.alpha = 1;
                    keyMovement.D.isDown = true;
                    keyMovement.D.isUp = false;
                });
                cameraMain.ignore(right);
                ///////////////////////////////////
                left = this.add.sprite(100, 450, 'leftIcon').setInteractive();
                left.alpha = 0.7;
                left.input.hitArea.setTo(700, 246, 476, 437);
                left.setScale(0.4);
                left.setScrollFactor(0, 0);
                left.on('pointerout', function () {
                    left.alpha = 0.7;
                    keyMovement.A.isUp = true;
                    keyMovement.A.isDown = false;
                });
                left.on('pointerover', function () {
                    left.alpha = 1;
                    keyMovement.A.isDown = true;
                    keyMovement.A.isUp = false;
                });
                cameraMain.ignore(left);
                ////////////////////////////////////
                jumpr = this.add.sprite(1820, 250, 'jumpIcon').setInteractive();
                jumpr.alpha = 0.7;
                jumpr.input.hitArea.setTo(700, 246, 476, 437);
                jumpr.setScale(0.3);
                jumpr.setScrollFactor(0, 0);
                jumpr.on('pointerout', function () {
                    jumpr.alpha = 0.7;
                    keyMovement.W.isUp = true;
                    keyMovement.W.isDown = false;
                });
                jumpr.on('pointerover', function () {
                    jumpr.alpha = 1;
                    keyMovement.W.isDown = true;
                    keyMovement.W.isUp = false;
                });
                cameraMain.ignore(jumpr);
                ///////////////////////////////////////
                jumpl = this.add.sprite(100, 250, 'jumpIcon').setInteractive();
                jumpl.alpha = 0.7;
                jumpl.input.hitArea.setTo(700, 246, 476, 437);
                jumpl.setScale(0.3);
                jumpl.setScrollFactor(0, 0);
                jumpl.on('pointerout', function () {
                    jumpl.alpha = 0.7;
                    keyMovement.W.isUp = true;
                    keyMovement.W.isDown = false;
                });
                jumpl.on('pointerover', function () {
                    jumpl.alpha = 1;
                    keyMovement.W.isDown = true;
                    keyMovement.W.isUp = false;
                });
                cameraMain.ignore(jumpl);
                //////////////////////////////
                swap = this.add.sprite(120, 120, 'swapIcon').setInteractive();
                swap.input.hitArea.setTo(700, 246, 476, 437);
                swap.setScale(0.35);
                swap.setScrollFactor(0, 0);
                swap.on('pointerout', function () {
                    keyMovement.SPACE.isUp = true;
                    keyMovement.SPACE.isDown = false;
                });
                swap.on('pointerover', function () {
                    keyMovement.SPACE.isDown = true;
                    keyMovement.SPACE.isUp = false;
                });
                camera2.ignore(swap);
                /////////////////////////////////////


            }
            this.keyMovement = keyMovement;

        } else {
            this.keyMovement = this.input.keyboard.addKeys('A, D, W, ESC, SPACE, J , L, I ');
        }
        this.playerProta = true;

        if (this.coop) {
            this.runningFunc = function () {
               
        
                if (this.keyMovement.A.isDown) {
                    if (this.playerProta) {
                        this.playerPhysics.body.setVelocityX(-175);
                        this.playerShape.flipX = true;
                        if (this.playerPhysics.body.velocity.y < 0 || (this.playerPhysics.body.velocity.y > 0 && !this.playerPhysics.body.touching.down)) {
                            this.playerShape.anims.play('jumpL', false);
                        } else {
                            this.playerShape.anims.play('runL', true);
                        }
                    } else {
                        this.playerPhysics2.body.setVelocityX(-175);
                        this.playerShape2.flipX = true;
                        if (this.playerPhysics2.body.velocity.y < 0 || (this.playerPhysics2.body.velocity.y > 0 && !this.playerPhysics2.body.touching.down)) {
                            this.playerShape2.anims.play('jumpS', false);
                        } else {
                            this.playerShape2.anims.play('runS', true);
                        }
                    }
                } else if (this.keyMovement.D.isUp) {
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
                    if (this.playerProta) {
                        this.playerPhysics.body.setVelocityX(175);
                        this.playerShape.flipX = false;
                        if (this.playerPhysics.body.velocity.y < 0 || (this.playerPhysics.body.velocity.y > 0 && !this.playerPhysics.body.touching.down)) {
                            this.playerShape.anims.play('jumpL', false);
                        } else {
                            this.playerShape.anims.play('runL', true);
                        }
                    } else {
                        this.playerPhysics2.body.setVelocityX(175);
                        this.playerShape2.flipX = false;
                        if (this.playerPhysics2.body.velocity.y < 0 || (this.playerPhysics2.body.velocity.y > 0 && !this.playerPhysics2.body.touching.down)) {
                            this.playerShape2.anims.play('jumpS', false);
                        } else {
                            this.playerShape2.anims.play('runS', true);
                        }
                    }
                } else if (this.keyMovement.A.isUp) {
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
                        if (!this.physics.world.overlap(this.playerPhysics, this.goal)) {
                            if (this.playerPhysics.body.touching.down && this.physics.world.gravity.y > 0) {
                                this.playerPhysics.body.setVelocityY(-250);
                                this.playerShape.anims.play('jumpL', false);
                            } else if (this.playerPhysics.body.touching.up && this.physics.world.gravity.y < 0) {
                                this.playerPhysics.body.setVelocityY(250);
                                this.playerShape.anims.play('jumpL', false);
                            }
                        }
                    } else {
                        if (!this.physics.world.overlap(this.playerPhysics2, this.goal)) {
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
        


                if (this.keyMovement.J.isDown) {
                    if (!this.playerProta) {
                        this.playerPhysics.body.setVelocityX(-175);
                        this.playerShape.flipX = true;
                        if (this.playerPhysics.body.velocity.y < 0 || (this.playerPhysics.body.velocity.y > 0 && !this.playerPhysics.body.touching.down)) {
                            this.playerShape.anims.play('jumpL', false);
                        } else {
                            this.playerShape.anims.play('runL', true);
                        }
                    } else {
                        this.playerPhysics2.body.setVelocityX(-175);
                        this.playerShape2.flipX = true;
                        if (this.playerPhysics2.body.velocity.y < 0 || (this.playerPhysics2.body.velocity.y > 0 && !this.playerPhysics2.body.touching.down)) {
                            this.playerShape2.anims.play('jumpS', false);
                        } else {
                            this.playerShape2.anims.play('runS', true);
                        }
                    }
                } else if (this.keyMovement.L.isUp) {
                    if (!this.playerProta) {
                        this.playerPhysics.body.setVelocityX(0);
                        this.playerShape.anims.play('stopL', false);
                    } else {
                        this.playerPhysics2.body.setVelocityX(0);
                        this.playerShape2.anims.play('stopS', false);
                    }
                }
                /////////////////////////////////////////
                /////////////////////////////////////////
                if (this.keyMovement.L.isDown) {
                    if (!this.playerProta) {
                        this.playerPhysics.body.setVelocityX(175);
                        this.playerShape.flipX = false;
                        if (this.playerPhysics.body.velocity.y < 0 || (this.playerPhysics.body.velocity.y > 0 && !this.playerPhysics.body.touching.down)) {
                            this.playerShape.anims.play('jumpL', false);
                        } else {
                            this.playerShape.anims.play('runL', true);
                        }
                    } else {
                        this.playerPhysics2.body.setVelocityX(175);
                        this.playerShape2.flipX = false;
                        if (this.playerPhysics2.body.velocity.y < 0 || (this.playerPhysics2.body.velocity.y > 0 && !this.playerPhysics2.body.touching.down)) {
                            this.playerShape2.anims.play('jumpS', false);
                        } else {
                            this.playerShape2.anims.play('runS', true);
                        }
                    }
                } else if (this.keyMovement.J.isUp) {
                    if (!this.playerProta) {
                        this.playerPhysics.body.setVelocityX(0);
                        this.playerShape.anims.play('stopL', false);
                    } else {
                        this.playerPhysics2.body.setVelocityX(0);
                        this.playerShape2.anims.play('stopS', false);
                    }
                }
                ///////////////////////////////////////////
                //////////////////////////////////////////
                if (this.keyMovement.I.isDown) {
                    if (!this.playerProta) {
                        if (!this.physics.world.overlap(this.playerPhysics, this.goal)) {
                            if (this.playerPhysics.body.touching.down && this.physics.world.gravity.y > 0) {
                                this.playerPhysics.body.setVelocityY(-250);
                                this.playerShape.anims.play('jumpL', false);
                            } else if (this.playerPhysics.body.touching.up && this.physics.world.gravity.y < 0) {
                                this.playerPhysics.body.setVelocityY(250);
                                this.playerShape.anims.play('jumpL', false);
                            }
                        }
                    } else {
                        if (!this.physics.world.overlap(this.playerPhysics2, this.goal)) {
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
                    this.scene.launch('pauseScene', { level: this.level, am: this.am, english: this.English });
                }
            }
            this.playerProta = Math.floor(Math.random() * 2);
        } else {
            this.runningFunc = function () {
                if (this.keyMovement.SPACE.isUp && this.lastDown) {
                    this.playerProta = !this.playerProta;
                    this.playerShape.anims.play('stopL', false);
                    this.playerPhysics.body.setVelocityX(0);
                    this.playerShape2.anims.play('stopS', false);
                    this.playerPhysics2.body.setVelocityX(0);
                    this.lastDown = false;
                } else if (this.keyMovement.SPACE.isDown) {
                    this.lastDown = true;
                }
        
                if (this.keyMovement.A.isDown) {
                    if (this.playerProta) {
                        this.playerPhysics.body.setVelocityX(-175);
                        this.playerShape.flipX = true;
                        if (this.playerPhysics.body.velocity.y < 0 || (this.playerPhysics.body.velocity.y > 0 && !this.playerPhysics.body.touching.down)) {
                            this.playerShape.anims.play('jumpL', false);
                        } else {
                            this.playerShape.anims.play('runL', true);
                        }
                    } else {
                        this.playerPhysics2.body.setVelocityX(-175);
                        this.playerShape2.flipX = true;
                        if (this.playerPhysics2.body.velocity.y < 0 || (this.playerPhysics2.body.velocity.y > 0 && !this.playerPhysics2.body.touching.down)) {
                            this.playerShape2.anims.play('jumpS', false);
                        } else {
                            this.playerShape2.anims.play('runS', true);
                        }
                    }
                } else if (this.keyMovement.D.isUp) {
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
                    if (this.playerProta) {
                        this.playerPhysics.body.setVelocityX(175);
                        this.playerShape.flipX = false;
                        if (this.playerPhysics.body.velocity.y < 0 || (this.playerPhysics.body.velocity.y > 0 && !this.playerPhysics.body.touching.down)) {
                            this.playerShape.anims.play('jumpL', false);
                        } else {
                            this.playerShape.anims.play('runL', true);
                        }
                    } else {
                        this.playerPhysics2.body.setVelocityX(175);
                        this.playerShape2.flipX = false;
                        if (this.playerPhysics2.body.velocity.y < 0 || (this.playerPhysics2.body.velocity.y > 0 && !this.playerPhysics2.body.touching.down)) {
                            this.playerShape2.anims.play('jumpS', false);
                        } else {
                            this.playerShape2.anims.play('runS', true);
                        }
                    }
                } else if (this.keyMovement.A.isUp) {
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
                        if (!this.physics.world.overlap(this.playerPhysics, this.goal)) {
                            if (this.playerPhysics.body.touching.down && this.physics.world.gravity.y > 0) {
                                this.playerPhysics.body.setVelocityY(-250);
                                this.playerShape.anims.play('jumpL', false);
                            } else if (this.playerPhysics.body.touching.up && this.physics.world.gravity.y < 0) {
                                this.playerPhysics.body.setVelocityY(250);
                                this.playerShape.anims.play('jumpL', false);
                            }
                        }
                    } else {
                        if (!this.physics.world.overlap(this.playerPhysics2, this.goal)) {
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
                    this.scene.launch('pauseScene', { level: this.level, am: this.am, english: this.English });
                }
            }
        }

        //Meta
        var goal = this.add.rectangle(3800, 1125, 300, 5000, 0x000000);
        goal.setAlpha(0);
        var goalPhysics = this.physics.add.existing(goal, 1);
        this.physics.add.overlap(playerPhysics, goalPhysics);
        this.physics.add.overlap(playerPhysics2, goalPhysics);

        this.playerShape = playerShape;
        this.playerShape2 = playerShape2;
        this.playerPhysics = playerPhysics;
        this.playerPhysics2 = playerPhysics2;
        this.goal = goal;
    }
    update() {

        this.hearts.setPosition(this.playerShape.x, this.playerShape.y - 55);
        this.hearts2.setPosition(this.playerShape2.x, this.playerShape2.y - 55);

        if (this.physics.world.overlap(this.playerPhysics, this.goal) && this.physics.world.overlap(this.playerPhysics2, this.goal)) {
            this.sound.add("diamondFX", { volume: 1, loop: false }).play();
            this.scene.start("level4Scene", { english: this.English, am: this.am, device: this.device });
        }

        this.runningFunc();
    }
}