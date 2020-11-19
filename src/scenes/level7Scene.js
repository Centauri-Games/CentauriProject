class level7Scene extends Phaser.Scene {
    constructor() {
        super("level7Scene");
    }

    init(data) {
        this.level = "level7Scene";
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

        var bg = this.add.sprite(960, 540, 'bg4');
        bg.setDepth(-2);
        bg.setScrollFactor(0);

        //JUGADORES
        var iniXL = 300;
        var iniYL = 685;
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
        var iniYS = 2110;
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
        this.map = this.add.tilemap('map7');
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
        var andl = new Scaffold(this, 300, 935, 'andamio', 350, 500, 20, 80);
        andl.addCollide(this, playerShape); //Inicio superior

        var andd = new Scaffold(this, 300, 2375, 'andamio', 350, 500, 20, 80);
        andd.addCollide(this, playerShape2);    //Inicio inferior

        var andl2 = new Scaffold(this, 3750, 935, 'andamio', 350, 500, 20, 80);
        andl2.addCollide(this, playerShape);

        var andd2 = new Scaffold(this, 3750, 2375, 'andamio', 350, 500, 20, 80);
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
        var displaceY = 1440;

        var spikesl = new Spike(this, 2900, 1195, 3800, 100, 0xff0000, hp);
        spikesl.setAlpha(0);
        spikesl.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXS, iniYS);
        var spikesd = new Spike(this, 2258, 1199 + displaceY, 384, 96, 0xff0000, hp);
        spikesd.setAlpha(0);
        spikesd.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS, iniXL, iniYL);

        //PLATAFORMAS
        //Estáticas

        //Móviles
        var mpl = new MovingPlatform(this, 650, 1200, 'woodP');
        mpl.addPlayerCollide(this, playerShape);
        mpl.setMovement(this, 0, -325);
        var mpl2 = new MovingPlatform(this, 2258, 1000, 'woodP');
        mpl2.addPlayerCollide(this, playerShape);
        this.mpl2 = mpl2;

        var mpl3 = new MovingPlatform(this, 3400, 1175 + displaceY, 'woodP');
        mpl3.addPlayerCollide(this, playerShape2);
        mpl3.setMovement(this, 0, -175);

        var mpl4 = new MovingPlatform(this, 3400, 1100, 'woodP');
        mpl4.addPlayerCollide(this, playerShape);
        mpl4.setMovement(this, 0, -175);

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
        this.sc = this;

        //PUERTA
        var doorStart = this.add.sprite(1510, 389, 'doorStart');
        doorStart.setScale(0.4, 0.47);
        doorStart.setDepth(100);
        var doorButton = new Button(this, 500, 1150 + displaceY, 1550, 377, 'greenButton', 'door');
        doorButton.addCollideDoor(this, playerShape);
        doorButton.addCollideButton(this, playerShape2);

        //BOTÓN QUE ACTIVA EL PUENTE
        var bridgeButton = this.add.sprite(2300, 490, 'redButton');
        this.physics.add.existing(bridgeButton, 1);
        this.anims.create({
            key: 'pressedR',
            frames: this.anims.generateFrameNumbers('redButton', { start: 0, end: 2 }),
            frameRate: 10
        });
        var bridge = this.add.sprite(2258, 719 + displaceY, 'bridge');
        var bridgePhysics = this.physics.add.existing(bridge, 1);
        bridgePhysics.body.setSize(480, 66);
        this.anims.create({
            key: 'activated',
            frames: this.anims.generateFrameNumbers('bridge', { start: 0, end: 4 }),
            frameRate: 10
        });
        var activeButton = false;
        this.physics.add.collider(playerShape, bridgeButton, function () {
            if (!activeButton) {
                activeButton = true;
                bridge.anims.play('activated', false);
                bridgeButton.anims.play('pressedR', false);
                this.sc.sound.add("door1FX", { volume: 1, loop: false }).play();
                this.physics.add.collider(playerShape2, bridge);
            }
        }, null, this);

        //PALANCAS QUE MUEVEN LA PLATAFORMA
        var leverLeft = this.add.sprite(2690, 1179 + displaceY, 'lever');
        this.physics.add.existing(leverLeft, 1);
        var leverRight = this.add.sprite(2930, 1179 + displaceY, 'lever');
        this.physics.add.existing(leverRight, 1);
        leverRight.flipX = true;

        this.anims.create({
            key: 'unpull',
            frames: this.anims.generateFrameNumbers('lever', { start: 0, end: 0 }),
            frameRate: 10
        });
        this.anims.create({
            key: 'pull',
            frames: this.anims.generateFrameNumbers('lever', { start: 3, end: 3 }),
            frameRate: 10
        });

        this.physics.add.overlap(playerShape2, leverLeft, function () {
            leverLeft.anims.play('pull', false);
            leverRight.anims.play('unpull', false);
        }, null, this);
        this.physics.add.overlap(playerShape2, leverRight, function () {
            leverRight.anims.play('pull', false);
            leverLeft.anims.play('unpull', false);
        }, null, this);

        this.leverLeft = leverLeft;
        this.leverRight = leverRight;

        this.playerShape = playerShape;
        this.playerShape2 = playerShape2;

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
        
                if (this.physics.world.overlap(this.playerShape2, this.leverLeft)) {
                    this.mpl2.movingPlatformPhysics.body.setVelocityX(-100);
                    if (!this.overlapped1) {
                        this.sc.sound.add("leverFX", { volume: 1, loop: false }).play();
                        this.overlapped1 = true;
                    }
        
                } else if (this.physics.world.overlap(this.playerShape2, this.leverRight)) {
                    this.mpl2.movingPlatformPhysics.body.setVelocityX(100);
                    if (!this.overlapped2) {
                        this.sc.sound.add("leverFX", { volume: 1, loop: false }).play();
                        this.overlapped2 = true;
                    }
                } else {
                    this.mpl2.movingPlatformPhysics.body.setVelocityX(0);
                    this.leverLeft.anims.play('unpull', false);
                    this.leverRight.anims.play('unpull', false);
                    this.overlapped1 = false;
                    this.overlapped2 = false;
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

        this.overlapped1 = false;
        this.overlapped2 = false;
    }
    update() {

        this.hearts.setPosition(this.playerShape.x, this.playerShape.y - 55);
        this.hearts2.setPosition(this.playerShape2.x, this.playerShape2.y - 55);

        if (this.physics.world.overlap(this.playerPhysics, this.goal) && this.physics.world.overlap(this.playerPhysics2, this.goal)) {
            this.sound.add("diamondFX", { volume: 1, loop: false }).play();
            this.scene.start("level8Scene", { english: this.English, am: this.am, device: this.device });
        }

        this.runningFunc();
      
    }
}