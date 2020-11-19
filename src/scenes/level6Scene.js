class level6Scene extends Phaser.Scene {
    constructor() {
        super("level6Scene");
    }

    init(data) {
        this.level = "level6Scene";
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
        var iniYL = 650;
        var playerShape = this.add.sprite(iniXL, iniYL, 'light6').setScale(0.8, 0.8);
        var playerPhysics = this.physics.add.existing(playerShape, 0);
        playerPhysics.body.setSize(80, 120);

        var iniXS = 300;
        var iniYS = 2090;
        var playerShape2 = this.add.sprite(iniXS, iniYS, 'shadow6').setScale(0.8, 0.8);
        var playerPhysics2 = this.physics.add.existing(playerShape2, 0);
        playerPhysics2.body.setSize(80, 120);

        playerShape.setDepth(10);
        playerShape2.setDepth(10);

        //TILEMAP
        this.map = this.add.tilemap('map6');
        var tileset = this.map.addTilesetImage('tileset', 'tiles');
        var walls = this.map.createStaticLayer('Pared', tileset, 0, 0);
        this.map.createStaticLayer('Suelo', tileset, 0, 0);
        this.map.createStaticLayer('Suelo2', tileset, 0, 0);
        var walls2 = this.map.createStaticLayer('Obstaculos', tileset, 0, 0);
        this.map.createStaticLayer('Pinchos', tileset, 0, 0);

        walls.setCollision([12, 14, 20]);

        this.physics.add.collider(walls, playerShape);
        this.physics.add.collider(walls, playerShape2);
        this.physics.add.collider(walls2, playerShape);
        this.physics.add.collider(walls2, playerShape2);

        //CÁMARAS
        var cameraMain = this.cameras.main;
        cameraMain.setSize(1920, 540);

        var camera2 = this.cameras.add(0, 540, 1920, 540);

        cameraMain.startFollow(playerShape);
        camera2.startFollow(playerShape2);

        cameraMain.setBounds(0, 0, 4032, 1440);
        camera2.setBounds(0, 1440, 4032, 1440);

        var displaceY = 1440;
        //ANDAMIOS
        var andl = new Scaffold(this, 300, 935, 'andamio', 350, 500, 20, 80);
        andl.addCollide(this, playerShape); //Inicio superior

        var andd = new Scaffold(this, 300, 935 + displaceY, 'andamio', 350, 500, 20, 80);
        andd.addCollide(this, playerShape2);    //Inicio inferior

        var andl2 = new Scaffold(this, 3750, 935, 'andamio', 350, 500, 20, 80);
        andl2.addCollide(this, playerShape);

        var andd2 = new Scaffold(this, 3750, 935 + displaceY, 'andamio', 350, 500, 20, 80);
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

        //Superior
        var spikesUp1 = new Spike(this, 2000, 1210, 3800, 100, 0xff0000, hp);
        spikesUp1.setAlpha(0);
        spikesUp1.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikesUp2 = new Spike(this, 2000, 90, 3800, 100, 0xff0000, hp);
        spikesUp2.setAlpha(0);
        spikesUp2.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes1 = new Spike(this, 740, 370, 150, 600, 0xff0000, hp);
        spikes1.setAlpha(0);
        spikes1.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes2 = new Spike(this, 1125, 230, 150, 300, 0xff0000, hp);
        spikes2.setAlpha(0);
        spikes2.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes3 = new Spike(this, 1510, 325, 150, 500, 0xff0000, hp);
        spikes3.setAlpha(0);
        spikes3.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes4 = new Spike(this, 1895, 375, 150, 600, 0xff0000, hp);
        spikes4.setAlpha(0);
        spikes4.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);
        //Symmetry
        var spikes5 = new Spike(this, 2185, 375, 150, 600, 0xff0000, hp);
        spikes5.setAlpha(0);
        spikes5.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes6 = new Spike(this, 2570, 325, 150, 500, 0xff0000, hp);
        spikes6.setAlpha(0);
        spikes6.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes7 = new Spike(this, 2955, 275, 150, 400, 0xff0000, hp);
        spikes7.setAlpha(0);
        spikes7.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes8 = new Spike(this, 3340, 370, 150, 600, 0xff0000, hp);
        spikes8.setAlpha(0);
        spikes8.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        //
        var spikes9 = new Spike(this, 1125, 1000, 150, 500, 0xff0000, hp);
        spikes9.setAlpha(0);
        spikes9.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes10 = new Spike(this, 1510, 1040, 150, 400, 0xff0000, hp);
        spikes10.setAlpha(0);
        spikes10.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes11 = new Spike(this, 1895, 1090, 150, 300, 0xff0000, hp);
        spikes11.setAlpha(0);
        spikes11.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes12 = new Spike(this, 2185, 1090, 150, 300, 0xff0000, hp);
        spikes12.setAlpha(0);
        spikes12.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes13 = new Spike(this, 2570, 1040, 150, 400, 0xff0000, hp);
        spikes13.setAlpha(0);
        spikes13.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes14 = new Spike(this, 2955, 1000, 150, 500, 0xff0000, hp);
        spikes14.setAlpha(0);
        spikes14.addPlayerCollide(this, playerShape, playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        //Inferior

        var spikesDown1 = new Spike(this, 2000, 1210 + displaceY, 3800, 100, 0xff0000, hp);
        spikesDown1.setAlpha(0);
        spikesDown1.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS);

        var spikesDown2 = new Spike(this, 2000, 90 + displaceY, 3800, 100, 0xff0000, hp);
        spikesDown2.setAlpha(0);
        spikesDown2.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS);

        var spikes1d = new Spike(this, 740, 370 + displaceY, 150, 600, 0xff0000, hp);
        spikes1d.setAlpha(0);
        spikes1d.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS);

        var spikes2d = new Spike(this, 1125, 230 + displaceY, 150, 300, 0xff0000, hp);
        spikes2d.setAlpha(0);
        spikes2d.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS);

        var spikes3d = new Spike(this, 1510, 325 + displaceY, 150, 500, 0xff0000, hp);
        spikes3d.setAlpha(0);
        spikes3d.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS);

        var spikes4d = new Spike(this, 1895, 375 + displaceY, 150, 600, 0xff0000, hp);
        spikes4d.setAlpha(0);
        spikes4d.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS);
        //Symmetry
        var spikes5d = new Spike(this, 2185, 375 + displaceY, 150, 600, 0xff0000, hp);
        spikes5d.setAlpha(0);
        spikes5d.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS);

        var spikes6d = new Spike(this, 2570, 325 + displaceY, 150, 500, 0xff0000, hp);
        spikes6d.setAlpha(0);
        spikes6d.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS);

        var spikes7d = new Spike(this, 2955, 275 + displaceY, 150, 400, 0xff0000, hp);
        spikes7d.setAlpha(0);
        spikes7d.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS);

        var spikes8d = new Spike(this, 3340, 370 + displaceY, 150, 600, 0xff0000, hp);
        spikes8d.setAlpha(0);
        spikes8d.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXL, iniXS, iniYS);

        //
        var spikes9d = new Spike(this, 1125, 1000 + displaceY, 150, 500, 0xff0000, hp);
        spikes9d.setAlpha(0);
        spikes9d.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS);

        var spikes10d = new Spike(this, 1510, 1040 + displaceY, 150, 400, 0xff0000, hp);
        spikes10d.setAlpha(0);
        spikes10d.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS);

        var spikes11d = new Spike(this, 1895, 1090 + displaceY, 150, 300, 0xff0000, hp);
        spikes11d.setAlpha(0);
        spikes11d.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS);

        var spikes12d = new Spike(this, 2185, 1090 + displaceY, 150, 300, 0xff0000, hp);
        spikes12d.setAlpha(0);
        spikes12d.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS);

        var spikes13d = new Spike(this, 2570, 1040 + displaceY, 150, 400, 0xff0000, hp);
        spikes13d.setAlpha(0);
        spikes13d.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS);

        var spikes14d = new Spike(this, 2955, 1000 + displaceY, 150, 500, 0xff0000, hp);
        spikes14d.setAlpha(0);
        spikes14d.addPlayerCollide(this, playerShape2, playerShape, this.English, iniXS, iniYS);

        //SUELO
        //J Superior
        var floor1 = this.add.rectangle(2000, 1258, 3800, 100, 0xff0000);
        floor1.setAlpha(0);
        this.physics.add.existing(floor1, 1);
        this.physics.add.collider(playerShape, floor1);

        var floor2 = this.add.rectangle(2000, 1258 + displaceY, 3800, 100, 0xff0000);
        floor2.setAlpha(0);
        this.physics.add.existing(floor2, 1);
        this.physics.add.collider(playerShape2, floor2);


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
                    } else {
                        this.playerPhysics2.body.setVelocityX(-175);
                        this.playerShape2.flipX = true;
                    }
                } else if (this.keyMovement.D.isUp) {
                    if (this.playerProta) {
                        this.playerPhysics.body.setVelocityX(0);
                    } else {
                        this.playerPhysics2.body.setVelocityX(0);
                    }
                }
                /////////////////////////////////////////
                /////////////////////////////////////////
                if (this.keyMovement.D.isDown) {
                    if (this.playerProta) {
                        this.playerPhysics.body.setVelocityX(175);
                        this.playerShape.flipX = false;
                    } else {
                        this.playerPhysics2.body.setVelocityX(175);
                        this.playerShape2.flipX = false;
                    }
                } else if (this.keyMovement.A.isUp) {
                    if (this.playerProta) {
                        this.playerPhysics.body.setVelocityX(0);
                    } else {
                        this.playerPhysics2.body.setVelocityX(0);
                    }
                }
                ///////////////////////////////////////////
                //////////////////////////////////////////
        
                if (this.keyMovement.W.isDown) {
                    if (this.canJump) {
                        if (this.playerProta) {
                            if (this.physics.world.gravity.y > 0) {
                                this.playerPhysics.body.setVelocityY(-200);
                            } else {
                                this.playerPhysics.body.setVelocityY(200);
                            }
                        } else {
                            if (this.physics.world.gravity.y > 0) {
                                this.playerPhysics2.body.setVelocityY(-200);
                            } else {
                                this.playerPhysics2.body.setVelocityY(200);
                            }
                        }
                    }
                    this.canJump = false;
                }
        
                if (this.keyMovement.W.isUp) {
                    this.canJump = true;
                }
                

                if (this.keyMovement.J.isDown) {
                    if (!this.playerProta) {
                        this.playerPhysics.body.setVelocityX(-175);
                        this.playerShape.flipX = true;
                    } else {
                        this.playerPhysics2.body.setVelocityX(-175);
                        this.playerShape2.flipX = true;
                    }
                } else if (this.keyMovement.L.isUp) {
                    if (!this.playerProta) {
                        this.playerPhysics.body.setVelocityX(0);
                    } else {
                        this.playerPhysics2.body.setVelocityX(0);
                    }
                }
                /////////////////////////////////////////
                /////////////////////////////////////////
                if (this.keyMovement.L.isDown) {
                    if (!this.playerProta) {
                        this.playerPhysics.body.setVelocityX(175);
                        this.playerShape.flipX = false;
                    } else {
                        this.playerPhysics2.body.setVelocityX(175);
                        this.playerShape2.flipX = false;
                    }
                } else if (this.keyMovement.J.isUp) {
                    if (!this.playerProta) {
                        this.playerPhysics.body.setVelocityX(0);
                    } else {
                        this.playerPhysics2.body.setVelocityX(0);
                    }
                }
                ///////////////////////////////////////////
                //////////////////////////////////////////
        
                if (this.keyMovement.I.isDown) {
                    if (this.canJump2) {
                        if (!this.playerProta) {
                            if (this.physics.world.gravity.y > 0) {
                                this.playerPhysics.body.setVelocityY(-200);
                            } else {
                                this.playerPhysics.body.setVelocityY(200);
                            }
                        } else {
                            if (this.physics.world.gravity.y > 0) {
                                this.playerPhysics2.body.setVelocityY(-200);
                            } else {
                                this.playerPhysics2.body.setVelocityY(200);
                            }
                        }
                    }
                    this.canJump2 = false;
                }
        
                if (this.keyMovement.I.isUp) {
                    this.canJump2 = true;
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
                    this.playerPhysics.body.setVelocityX(0);
                    this.playerPhysics2.body.setVelocityX(0);
                    this.lastDown = false;
                } else if (this.keyMovement.SPACE.isDown) {
                    this.lastDown = true;
                }
        
                if (this.keyMovement.A.isDown) {
                    if (this.playerProta) {
                        this.playerPhysics.body.setVelocityX(-175);
                        this.playerShape.flipX = true;
                    } else {
                        this.playerPhysics2.body.setVelocityX(-175);
                        this.playerShape2.flipX = true;
                    }
                } else if (this.keyMovement.D.isUp) {
                    if (this.playerProta) {
                        this.playerPhysics.body.setVelocityX(0);
                    } else {
                        this.playerPhysics2.body.setVelocityX(0);
                    }
                }
                /////////////////////////////////////////
                /////////////////////////////////////////
                if (this.keyMovement.D.isDown) {
                    if (this.playerProta) {
                        this.playerPhysics.body.setVelocityX(175);
                        this.playerShape.flipX = false;
                    } else {
                        this.playerPhysics2.body.setVelocityX(175);
                        this.playerShape2.flipX = false;
                    }
                } else if (this.keyMovement.A.isUp) {
                    if (this.playerProta) {
                        this.playerPhysics.body.setVelocityX(0);
                    } else {
                        this.playerPhysics2.body.setVelocityX(0);
                    }
                }
                ///////////////////////////////////////////
                //////////////////////////////////////////
        
                if (this.keyMovement.W.isDown) {
                    if (this.canJump) {
                        if (this.playerProta) {
                            if (this.physics.world.gravity.y > 0) {
                                this.playerPhysics.body.setVelocityY(-200);
                            } else {
                                this.playerPhysics.body.setVelocityY(200);
                            }
                        } else {
                            if (this.physics.world.gravity.y > 0) {
                                this.playerPhysics2.body.setVelocityY(-200);
                            } else {
                                this.playerPhysics2.body.setVelocityY(200);
                            }
                        }
                    }
                    this.canJump = false;
                }
        
                if (this.keyMovement.W.isUp) {
                    this.canJump = true;
                }
        
                if (this.keyMovement.ESC.isDown) {
                    this.keyMovement.ESC.isDown = false;
                    this.scene.pause();
                    this.scene.launch('pauseScene', { level: this.level, am: this.am, english: this.English });
                }
            }
        }

        //Codigo de "teclas" para el movimiento. Habria que cambiar el codigo de dentro por el mensaje que se enviará al servidor para decir que movimiento ha realizado el personaje


        //Meta
        var goal = this.add.rectangle(3750, 1125, 300, 5000, 0x000000);
        goal.setAlpha(0);
        var goalPhysics = this.physics.add.existing(goal, 1);
        this.physics.add.overlap(playerPhysics, goalPhysics);
        this.physics.add.overlap(playerPhysics2, goalPhysics);

        this.playerShape = playerShape;
        this.playerShape2 = playerShape2;
        this.playerPhysics = playerPhysics;
        this.playerPhysics2 = playerPhysics2;
        this.goal = goal;

        this.canJump = true;
        this.canJump2 = true;
    }
    update() {

        this.hearts.setPosition(this.playerShape.x, this.playerShape.y - 75);
        this.hearts2.setPosition(this.playerShape2.x, this.playerShape2.y - 75);

        if (this.physics.world.overlap(this.playerPhysics, this.goal) && this.physics.world.overlap(this.playerPhysics2, this.goal)) {
            this.sound.add("diamondFX", { volume: 1, loop: false }).play();
            this.scene.start("level7Scene", { english: this.English, am: this.am, device: this.device });
        }

        this.runningFunc();
    }
}