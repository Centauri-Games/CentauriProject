class level9Scene extends Phaser.Scene {
    constructor() {
        super("level9Scene");
    }

    init(data) {
        this.level = "level9Scene";
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
            this.bgMusic = this.sound.add("ingameMS1", { volume: 0.7, loop: true });
            this.am.bgMusic = this.bgMusic;
            this.bgMusic.play();
            this.am.bgMusicPlaying = true;
        }

        var bg = this.add.sprite(960, 540, 'bg2');
        bg.setScrollFactor(0);

        //JUGADORES
        var iniXL = 300;
        var iniYL = 2600;
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
        var iniYS = 2600;
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
        this.map = this.add.tilemap('map9');
        var tileset = this.map.addTilesetImage('tileset', 'tiles');
        var walls = this.map.createStaticLayer('Pared', tileset, 0, 0);
        this.map.createStaticLayer('Suelo', tileset, 0, 0);

        walls.setCollision([12, 13, 19, 20]);

        this.physics.add.collider(walls, playerShape);
        this.physics.add.collider(walls, playerShape2);

        //CÁMARAS
        var cameraMain = this.cameras.main;
        cameraMain.setSize(1920, 540);
        var camera2 = this.cameras.add(0, 540, 1920, 540);

        cameraMain.setBounds(0, 0, 4032, 3072);
        camera2.setBounds(0, 0, 4032, 3072);

        cameraMain.startFollow(playerShape);
        camera2.startFollow(playerShape2);

        //VIDA
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

        //SUELO
        var floor1 = this.add.rectangle(1700, 2700, 3800, 100, 0xff0000);
        floor1.setAlpha(0);
        this.physics.add.existing(floor1, 1);
        this.physics.add.collider(playerShape, floor1);
        this.physics.add.collider(playerShape2, floor1);

        var floor2 = this.add.rectangle(3760, 2325, 600, 100, 0xff0000);
        floor2.setAlpha(0);
        this.physics.add.existing(floor2, 1);
        this.physics.add.collider(playerShape, floor2);
        this.physics.add.collider(playerShape2, floor2);

        var floor3 = this.add.rectangle(3760, 1475, 600, 100, 0xff0000);
        floor3.setAlpha(0);
        this.physics.add.existing(floor3, 1);
        this.physics.add.collider(playerShape, floor3);
        this.physics.add.collider(playerShape2, floor3);

        var floor4 = this.add.rectangle(2705, 1275, 800, 100, 0xff0000);
        floor4.setAlpha(0);
        this.physics.add.existing(floor4, 1);
        this.physics.add.collider(playerShape, floor4);
        this.physics.add.collider(playerShape2, floor4);

        var floor5 = this.add.rectangle(1300, 1275, 1100, 100, 0xff0000);
        floor5.setAlpha(0);
        this.physics.add.existing(floor5, 1);
        this.physics.add.collider(playerShape, floor5);
        this.physics.add.collider(playerShape2, floor5);

        var floor6 = this.add.rectangle(1800, 1950, 1100, 100, 0xff0000);
        floor6.setAlpha(0);
        this.physics.add.existing(floor6, 1);
        this.physics.add.collider(playerShape, floor6);
        this.physics.add.collider(playerShape2, floor6);

        //PORTAL
        var nextLevel = this.add.zone(400, 1400, 100, 100);
        this.physics.add.existing(nextLevel, 1);
        this.physics.add.overlap(nextLevel, playerPhysics);
        this.physics.add.overlap(nextLevel, playerPhysics2);

        var portal1 = this.add.sprite(400, 1400, 'portalA').setDepth(15);
        portal1.setScale(3, 3);
        this.physics.add.existing(portal1, 1);
        this.physics.add.collider(playerShape, portal1, function () {
            playerShape.setPosition(portal1.x, portal1.y);
            playerPhysics.body.setImmovable(true);
            playerPhysics.body.moves = false;
        });
        this.physics.add.collider(playerShape2, portal1, function () {
            playerShape2.setPosition(portal1.x, portal1.y);
            playerPhysics2.body.setImmovable(true);
            playerPhysics2.body.moves = false;
        });

        //ANIMACIONES PLACAS
        //Green
        this.anims.create({
            key: 'pressG',
            frames: this.anims.generateFrameNumbers('pressureGreen', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'releaseG',
            frames: this.anims.generateFrameNumbers('pressureGreen', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: 0
        });
        //Yellow
        this.anims.create({
            key: 'pressY',
            frames: this.anims.generateFrameNumbers('pressureYellow', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'releaseY',
            frames: this.anims.generateFrameNumbers('pressureYellow', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: 0
        });
        //Pink
        this.anims.create({
            key: 'pressP',
            frames: this.anims.generateFrameNumbers('pressurePink', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'releaseP',
            frames: this.anims.generateFrameNumbers('pressurePink', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'pressB',
            frames: this.anims.generateFrameNumbers('pressureBlue', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'releaseB',
            frames: this.anims.generateFrameNumbers('pressureBlue', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: 0
        });

        this.anims.create({
            key: 'openp',
            frames: this.anims.generateFrameNumbers('pinkDoor', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'closep',
            frames: this.anims.generateFrameNumbers('pinkDoor', { start: 5, end: 0 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'openb',
            frames: this.anims.generateFrameNumbers('blueDoor', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'closeb',
            frames: this.anims.generateFrameNumbers('blueDoor', { start: 5, end: 0 }),
            frameRate: 10,
            repeat: 0
        });

        //PLATAFORMAS

        //Estáticas
        var sp1 = new StaticPlatform(this, 1100, 2600, 'woodP');
        var sp2 = new StaticPlatform(this, 1200, 2525, 'woodP');
        var sp3 = new StaticPlatform(this, 1300, 2475, 'woodP');
        var sp4 = new StaticPlatform(this, 1400, 2425, 'woodP');
        var sp5 = new StaticPlatform(this, 1500, 2475, 'woodP');
        var sp6 = new StaticPlatform(this, 1600, 2525, 'woodP');
        var sp7 = new StaticPlatform(this, 1700, 2600, 'woodP');

        sp1.addPlayerCollide(this, playerShape);
        sp2.addPlayerCollide(this, playerShape);
        sp3.addPlayerCollide(this, playerShape);
        sp4.addPlayerCollide(this, playerShape);
        sp5.addPlayerCollide(this, playerShape);
        sp6.addPlayerCollide(this, playerShape);
        sp7.addPlayerCollide(this, playerShape);
        sp1.addPlayerCollide(this, playerShape2);
        sp2.addPlayerCollide(this, playerShape2);
        sp3.addPlayerCollide(this, playerShape2);
        sp4.addPlayerCollide(this, playerShape2);
        sp5.addPlayerCollide(this, playerShape2);
        sp6.addPlayerCollide(this, playerShape2);
        sp7.addPlayerCollide(this, playerShape2);

        var mp1 = new MovingPlatform(this, 3100, 2350, 'greenP'); //Plataforma verde
        mp1.addPlayerCollide(this, playerShape);
        mp1.addPlayerCollide(this, playerShape2);

        var mp2 = new MovingPlatform(this, 3350, 2300, 'yellowP'); //Plataforma amarilla
        mp2.addPlayerCollide(this, playerShape);
        mp2.addPlayerCollide(this, playerShape2);

        var mp3 = new MovingPlatform(this, 2050, 1850, 'pinkP'); //Plataforma rosa
        mp3.addPlayerCollide(this, playerShape);
        mp3.addPlayerCollide(this, playerShape2);

        //PUERTAS
        var pinkDoor = new Door(this, 800, 2448, 'pinkDoor');
        pinkDoor.addPlayerCollide(playerShape);
        pinkDoor.addPlayerCollide(playerShape2);
        var blueDoor = new Door(this, 800, 1008, 'blueDoor');
        blueDoor.addPlayerCollide(playerShape2);
        blueDoor.addPlayerCollide(playerShape);


        //PLACAS
        var p1 = new pressurePlate(this, 400, 2650, 'pressurePink', playerShape, playerShape2); //Pink door button
        p1.addPlayerCollide(playerShape);
        p1.addPlayerCollide(playerShape2);
        p1.addAttach(pinkDoor);

        var p2 = new pressurePlate(this, 600, 2650, 'pressureGreen', playerShape, playerShape2); //Pink door button
        p2.addPlayerCollide(playerShape);
        p2.addPlayerCollide(playerShape2);
        p2.addAttach(mp1);

        var p3 = new pressurePlate(this, 3600, 2270, 'pressureYellow', playerShape, playerShape2); //Yellow platform
        p3.addPlayerCollide(playerShape);
        p3.addPlayerCollide(playerShape2);
        p3.addAttach(mp2);

        var p4 = new pressurePlate(this, 3800, 2270, 'pressurePink', playerShape, playerShape2); //Pink door
        p4.addPlayerCollide(playerShape);
        p4.addPlayerCollide(playerShape2);
        p4.addAttach(pinkDoor);

        var p5 = new pressurePlate(this, 2900, 1215, 'pressureYellow', playerShape, playerShape2); //Yellow platform
        p5.addPlayerCollide(playerShape);
        p5.addPlayerCollide(playerShape2);
        p5.addAttach(mp2);

        var p6 = new pressurePlate(this, 1800, 1215, 'pressurePink', playerShape, playerShape2); //Pink platform 1
        p6.addPlayerCollide(playerShape);
        p6.addPlayerCollide(playerShape2);
        p6.addAttach(mp3);

        var p7 = new pressurePlate(this, 1600, 1895, 'pressurePink', playerShape, playerShape2); //Pink platform 2
        p7.addPlayerCollide(playerShape);
        p7.addPlayerCollide(playerShape2);
        p7.addAttach(mp3);

        var p8 = new pressurePlate(this, 1200, 1215, 'pressureBlue', playerShape, playerShape2); //Blue door
        p8.addPlayerCollide(playerShape);
        p8.addPlayerCollide(playerShape2);
        p8.addAttach(blueDoor);


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
                        if (this.playerPhysics.body.touching.down || this.playerPhysics.body.touching.up) {
                            if (this.physics.world.gravity.y > 0) {
                                this.playerPhysics.body.setVelocityY(-250);
                            } else {
                                this.playerPhysics.body.setVelocityY(250);
                            }
                            this.playerShape.anims.play('jumpL', false);
                        }
                    } else {
                        if (this.playerPhysics2.body.touching.down || this.playerPhysics2.body.touching.up) {
                            if (this.physics.world.gravity.y > 0) {
                                this.playerPhysics2.body.setVelocityY(-250);
                            } else {
                                this.playerPhysics2.body.setVelocityY(250);
                            }
                            this.playerShape2.anims.play('jumpS', false);
                        }
                    }
                }


                if (this.keyMovement.J.isDown) {
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
                        if (this.playerPhysics.body.touching.down || this.playerPhysics.body.touching.up) {
                            if (this.physics.world.gravity.y > 0) {
                                this.playerPhysics.body.setVelocityY(-250);
                            } else {
                                this.playerPhysics.body.setVelocityY(250);
                            }
                            this.playerShape.anims.play('jumpL', false);
                        }
                    } else {
                        if (this.playerPhysics2.body.touching.down || this.playerPhysics2.body.touching.up) {
                            if (this.physics.world.gravity.y > 0) {
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
                        if (this.playerPhysics.body.touching.down || this.playerPhysics.body.touching.up) {
                            if (this.physics.world.gravity.y > 0) {
                                this.playerPhysics.body.setVelocityY(-250);
                            } else {
                                this.playerPhysics.body.setVelocityY(250);
                            }
                            this.playerShape.anims.play('jumpL', false);
                        }
                    } else {
                        if (this.playerPhysics2.body.touching.down || this.playerPhysics2.body.touching.up) {
                            if (this.physics.world.gravity.y > 0) {
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
                    this.scene.launch('pauseScene', { level: this.level, am: this.am, english: this.English });
                }
            }
        }

        this.nextLevel = nextLevel;
        this.playerShape = playerShape;
        this.playerShape2 = playerShape2;
        this.playerPhysics = playerPhysics;
        this.playerPhysics2 = playerPhysics2;

        this.p1 = p1;
        this.p2 = p2;
        this.p3 = p3;
        this.p4 = p4;
        this.p5 = p5;
        this.p6 = p6;
        this.p7 = p7;
        this.p8 = p8;

        this.mp1 = mp1;
        this.mp2 = mp2;
        this.mp3 = mp3;

    }
    update() {

        this.hearts.setPosition(this.playerShape.x, this.playerShape.y - 55);
        this.hearts2.setPosition(this.playerShape2.x, this.playerShape2.y - 55);

        //Puerta rosa - placa 1
        if (this.physics.world.overlap(this.p1.player1, this.p1.plate) || this.physics.world.overlap(this.p1.player2, this.p1.plate)
            || this.physics.world.overlap(this.p4.player1, this.p4.plate) || this.physics.world.overlap(this.p4.player2, this.p4.plate)) {
            this.p1.press();
            this.p4.press();
        } else {
            this.p1.release();
            this.p4.release();
        }

        //Plataforma Verde
        if (this.physics.world.overlap(this.p2.player1, this.p2.plate) || this.physics.world.overlap(this.p2.player2, this.p2.plate)) {
            this.p2.press();
            if (this.mp1.movingPlatformPhysics.body.x > 900)
                this.mp1.movingPlatformPhysics.body.setVelocityX(-200);
            else
                this.mp1.movingPlatformPhysics.body.setVelocityX(0);
        } else {
            this.p2.release();
            if (this.mp1.movingPlatformPhysics.body.x < 3100)
                if (this.mp1.movingPlatformPhysics.body.x < 1650)
                    this.mp1.movingPlatformPhysics.body.setVelocityX(75);
                else
                    this.mp1.movingPlatformPhysics.body.setVelocityX(200);
            else
                this.mp1.movingPlatformPhysics.body.setVelocityX(0);

        }

        //Plataforma Amarilla
        if (this.physics.world.overlap(this.p3.player1, this.p3.plate) || this.physics.world.overlap(this.p3.player2, this.p3.plate)) {
            this.p3.press();
            if (this.mp2.movingPlatformPhysics.body.y > 1100)
                this.mp2.movingPlatformPhysics.body.setVelocityY(-200);
            else
                this.mp2.movingPlatformPhysics.body.setVelocityY(0);
        } else if (this.physics.world.overlap(this.p5.player1, this.p5.plate) || this.physics.world.overlap(this.p5.player2, this.p5.plate)) {
            this.p5.press();
            if (this.mp2.movingPlatformPhysics.body.y > 1100)
                this.mp2.movingPlatformPhysics.body.setVelocityY(-200);
            else
                this.mp2.movingPlatformPhysics.body.setVelocityY(0);
        } else {
            this.p3.release();
            this.p5.release();
            if (this.mp2.movingPlatformPhysics.body.y < 2300)
                this.mp2.movingPlatformPhysics.body.setVelocityY(200);
            else
                this.mp2.movingPlatformPhysics.body.setVelocityY(0);

        }

        //Plataforma Rosa
        if (this.physics.world.overlap(this.p6.player1, this.p6.plate) || this.physics.world.overlap(this.p6.player2, this.p6.plate)) {
            this.p6.press();
            if (this.mp3.movingPlatformPhysics.body.y > 1200)
                this.mp3.movingPlatformPhysics.body.setVelocityY(-200);
            else
                this.mp3.movingPlatformPhysics.body.setVelocityY(0);
        } else if (this.physics.world.overlap(this.p7.player1, this.p7.plate) || this.physics.world.overlap(this.p7.player2, this.p7.plate)) {
            this.p7.press();
            if (this.mp3.movingPlatformPhysics.body.y > 1200)
                this.mp3.movingPlatformPhysics.body.setVelocityY(-200);
            else
                this.mp3.movingPlatformPhysics.body.setVelocityY(0);
        } else {
            this.p6.release();
            this.p7.release();
            if (this.mp3.movingPlatformPhysics.body.y < 1850)
                this.mp3.movingPlatformPhysics.body.setVelocityY(200);
            else
                this.mp3.movingPlatformPhysics.body.setVelocityY(0);

        }

        //Puerta azul
        if (this.physics.world.overlap(this.p8.player1, this.p8.plate) && this.physics.world.overlap(this.p8.player2, this.p8.plate)) {
            this.p8.press();
        }

        //Final nivel
        if (this.physics.world.overlap(this.playerPhysics, this.nextLevel) && this.physics.world.overlap(this.playerPhysics2, this.nextLevel)) {
            this.sound.add("diamondFX", { volume: 1, loop: false }).play();
            this.scene.start("level10Scene", { english: this.English, am: this.am, device: this.device });
        }

        this.runningFunc();
    }
}