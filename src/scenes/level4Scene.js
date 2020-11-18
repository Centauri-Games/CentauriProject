class level4Scene extends Phaser.Scene{
    constructor(){
        super("level4Scene");
    }

    init(data){
        this.level = "level4Scene";
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

        var bg = this.add.sprite(960,540,'bg3');
        bg.setDepth(-2);
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

        this.anims.create({
            key: 'openl',
            frames: this.anims.generateFrameNumbers('pinkDoor', { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        });
        this.anims.create({
            key: 'closel',
            frames: this.anims.generateFrameNumbers('pinkDoor', { start: 5, end: 0 }),
            frameRate: 10,
            repeat: 0
        });


        //TILEMAP
        this.map = this.add.tilemap('map4');
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
        var displaceY = 1445;

        //SUELO
        //J Superior
        var floor1 = this.add.rectangle(2000, 1450, 3800, 100, 0xff0000);
        floor1.setAlpha(0);
        this.physics.add.existing(floor1, 1);
        this.physics.add.collider(playerShape, floor1);

        var floor2 = this.add.rectangle(2000, 1450+displaceY, 3800, 100, 0xff0000);
        floor2.setAlpha(0);
        this.physics.add.existing(floor2, 1);
        this.physics.add.collider(playerShape2, floor2);

        var floor3 = this.add.rectangle(3750, 975, 500, 100, 0xff0000);
        floor3.setAlpha(0);
        this.physics.add.existing(floor3, 1);
        this.physics.add.collider(playerShape, floor3);

        var floor4 = this.add.rectangle(3750, 975+displaceY, 500, 100, 0xff0000);
        floor4.setAlpha(0);
        this.physics.add.existing(floor4, 1);
        this.physics.add.collider(playerShape2, floor4);

        var displaceY = 1440;

        //PLATAFORMAS
        var mp1 = new MovingPlatform(this, 800, 950, 'blueP'); //Plataforma recorrido medio
        mp1.addPlayerCollide(this, playerShape);
        mp1.setMovementTime(this, 330, 0, 6000);

        var mp2 = new MovingPlatform(this, 600, 950, 'blueP');
        mp2.addPlayerCollide(this, playerShape);
        mp2.setMovement(this, 0, 200);

        var mp3 = new MovingPlatform(this, 3000, 950, 'blueP');
        mp3.addPlayerCollide(this, playerShape);
        mp3.setMovement(this, 0, 200);

        var mp4 = new MovingPlatform(this, 800, 950+displaceY, 'blueP'); //Plataforma recorrido medio
        mp4.addPlayerCollide(this, playerShape2);
        mp4.setMovementTime(this, 330, 0, 6000);

        var mp5 = new MovingPlatform(this, 600, 950+displaceY, 'blueP');
        mp5.addPlayerCollide(this, playerShape2);
        mp5.setMovement(this, 0, 200);

        var mp6 = new MovingPlatform(this, 3000, 950+displaceY, 'blueP');
        mp6.addPlayerCollide(this, playerShape2);
        mp6.setMovement(this, 0, 200);

        //ESPEJOS


        var mirror1 = new Mirror(this, 1000, 1370, 'mirror');
        mirror1.mirror.setDepth(11);
        this.setInteractiveMirror(mirror1, 7);

        var mirror2 = new Mirror(this, 1500, 1370, 'mirror');
        mirror2.mirror.setDepth(11);
        this.setInteractiveMirror(mirror2, 5);

        var mirror3 = new Mirror(this, 2000, 1370, 'mirror');
        mirror3.mirror.setDepth(11);
        this.setInteractiveMirror(mirror3, 7);

        var mirror4 = new Mirror(this, 2500, 1370, 'mirror');
        mirror4.mirror.setDepth(11);
        this.setInteractiveMirror(mirror4, 5);

        var mirror5 = new Mirror(this, 1500, 700, 'mirror');    //Techo
        mirror5.rotate(Math.PI);
        mirror5.mirror.setDepth(-1);
        this.setInteractiveMirror(mirror5, 6);

        //Inferiores
        var mirror6 = new Mirror(this, 1400, 1370+displaceY, 'mirror');
        mirror6.mirror.setDepth(11);
        this.setInteractiveMirror(mirror6, 7);

        var mirror7 = new Mirror(this, 1900, 1050+displaceY, 'mirror');
        mirror7.rotate(Math.PI/2);
        mirror7.mirror.setDepth(11);
        this.setInteractiveMirror(mirror7, 7);

        var mirror8 = new Mirror(this, 2200, 700+displaceY, 'mirror');   //Techo
        mirror8.mirror.setDepth(-1);
        mirror8.rotate(Math.PI);
        this.setInteractiveMirror(mirror8, 6);

        var mirror9 = new Mirror(this, 2500, 1370+displaceY, 'mirror');
        mirror9.mirror.setDepth(11);
        this.setInteractiveMirror(mirror9, 5);

        var diam = this.add.sprite(1900, 1370+displaceY, 'diamond').setDepth(13);
        this.add.sprite(1370, 750+displaceY, 'blueP').setRotation(Math.PI/2);
        this.add.sprite(1840, 1050+displaceY, 'blueP').setScale(1.2,1.2).setRotation(Math.PI/2);
        var laser = this.add.sprite(1400, 760+displaceY, 'laser');
        laser.setRotation(Math.PI/2);
        laser.setDepth(13);
        laser.setScale(1.3,1.3);

        var portal1D = this.add.sprite(1700, 760+displaceY, 'portalA').setDepth(13);
        var portal2D = this.add.sprite(2700, 760+displaceY, 'portalR').setDepth(13);
        var portal1U = this.add.sprite(1000, 800, 'portalR').setDepth(13);
        var portal2U = this.add.sprite(2000, 800, 'portalA').setDepth(13);


        var laser1 = this.add.line(0,0, laser.x+10, laser.y, mirror6.mirror.x, mirror6.mirror.y-10, 0xff0000).setOrigin(0,0);
        laser1.setDepth(12);

        var laser2 = this.add.line(0,0, mirror6.mirror.x, mirror6.mirror.y-10, portal1D.x, portal1D.y, 0xff0000).setOrigin(0,0);
        laser2.setDepth(12);
        mirror6.addObject(laser2);

        var laser3 = this.add.line(0,0, portal1U.x, portal1U.y, mirror2.mirror.x, mirror2.mirror.y-10, 0xff0000).setOrigin(0,0);
        laser3.setDepth(12);
        mirror6.addObject(laser3);
        mirror6.addNext(mirror2);
        mirror2.addPrevious(mirror6);

        var laser4 = this.add.line(0,0, mirror2.mirror.x, mirror2.mirror.y-10, mirror1.mirror.x, mirror1.mirror.y-10, 0xff0000).setOrigin(0,0);
        laser4.setDepth(12);
        mirror2.addObject(laser4);
        mirror2.addNext(mirror1);
        mirror1.addPrevious(mirror2);

        var laser5 = this.add.line(0,0, mirror1.mirror.x, mirror1.mirror.y-10, mirror5.mirror.x, mirror5.mirror.y+12, 0xff0000).setOrigin(0,0);
        laser5.setDepth(12);
        mirror1.addObject(laser5);
        mirror1.addNext(mirror5);
        mirror5.addPrevious(mirror1);

        var laser6 = this.add.line(0,0, mirror5.mirror.x, mirror5.mirror.y+12, mirror3.mirror.x, mirror3.mirror.y-10, 0xff0000).setOrigin(0,0);
        laser6.setDepth(12);
        mirror5.addObject(laser6);
        mirror5.addNext(mirror3);
        mirror3.addPrevious(mirror5);

        var laser7 = this.add.line(0,0, mirror3.mirror.x, mirror3.mirror.y-10, mirror4.mirror.x, mirror4.mirror.y-10, 0xff0000).setOrigin(0,0);
        laser7.setDepth(12);
        mirror3.addObject(laser7);
        mirror3.addNext(mirror4);
        mirror4.addPrevious(mirror3);

        var laser8 = this.add.line(0,0, mirror4.mirror.x, mirror4.mirror.y-10, portal2U.x, portal2U.y, 0xff0000).setOrigin(0,0);
        laser8.setDepth(12);
        mirror4.addObject(laser8);

        var laser9 = this.add.line(0,0, portal2D.x, portal2D.y, mirror9.mirror.x, mirror9.mirror.y-10, 0xff0000).setOrigin(0,0);
        laser9.setDepth(12);
        mirror4.addObject(laser9);
        mirror4.addNext(mirror9);
        mirror9.addPrevious(mirror4);

        var laser10 = this.add.line(0,0, mirror9.mirror.x, mirror9.mirror.y-10, mirror8.mirror.x, mirror8.mirror.y+12, 0xff0000).setOrigin(0,0);
        laser10.setDepth(12);
        mirror9.addObject(laser10);
        mirror9.addNext(mirror8);
        mirror8.addPrevious(mirror9);

        var laser11 = this.add.line(0,0, mirror8.mirror.x, mirror8.mirror.y+12, mirror7.mirror.x+12, mirror7.mirror.y, 0xff0000).setOrigin(0,0);
        laser11.setDepth(12);
        mirror8.addObject(laser11);
        mirror8.addNext(mirror7);
        mirror7.addPrevious(mirror8);

        var laser12 = this.add.line(0,0, mirror7.mirror.x+12, mirror7.mirror.y, diam.x, diam.y, 0xff0000).setOrigin(0,0);
        laser12.setDepth(12);
        mirror7.addObject(laser12);


        laser2.setAlpha(0);
        laser3.setAlpha(0);
        laser4.setAlpha(0);
        laser5.setAlpha(0);
        laser6.setAlpha(0);
        laser7.setAlpha(0);
        laser8.setAlpha(0);
        laser9.setAlpha(0);
        laser10.setAlpha(0);
        laser11.setAlpha(0);
        laser12.setAlpha(0);

        //PUERTAS
        var doorUp = new Door(this, 3625, 850, 'laserDoor');
        doorUp.scale(1.25,1.25);
        doorUp.addPlayerCollide(playerShape);
        var doorDown = new Door(this, 3625, 850+displaceY, 'laserDoor');
        doorDown.scale(1.25,1.25);
        doorDown.addPlayerCollide(playerShape2);

        mirror7.addDoors(doorUp, doorDown);
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
    update() {

        this.hearts.setPosition(this.playerShape.x, this.playerShape.y-55);
        this.hearts2.setPosition(this.playerShape2.x, this.playerShape2.y-55);

        if (this.physics.world.overlap(this.playerPhysics, this.goal) && this.physics.world.overlap(this.playerPhysics2, this.goal)){
            this.sound.add("diamondFX", { volume: 1, loop: false }).play();
            this.scene.start("level5Scene", {english: this.English, am: this.am, device: this.device});
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

    //Función para configurar espejo
    setInteractiveMirror(mirror, correctPosition){
        mirror.mirror.setInteractive().on('pointerup', function(){  //Ciclo del espejo
            mirror.mirrorPosition = (mirror.mirrorPosition +1)%8;
            this.scene.sound.add("mirrorFX", { volume: 1, loop: false }).play();

            switch(mirror.mirrorPosition){
                case 0:
                    mirror.mirror.anims.play('pos0', false);
                    console.log("pos 0");
                    break;
                case 1:
                    mirror.mirror.anims.play('pos1', false);
                    console.log("pos 1");
                    break;
                case 2:
                    mirror.mirror.anims.play('pos2', false);
                    console.log("pos 2");
                    break;
                case 3:
                    mirror.mirror.anims.play('pos3', false);
                    console.log("pos 3");
                    break;
                case 4:
                    mirror.mirror.anims.play('pos4', false);
                    console.log("pos 4");
                    break;
                case 5:
                    mirror.mirror.anims.play('pos5', false);
                    console.log("pos 5");
                    break;
                case 6:
                    mirror.mirror.anims.play('pos6', false);
                    console.log("pos 6");
                    break;
                case 7:
                    mirror.mirror.anims.play('pos7', true);
                    console.log("pos 7");
                    break;
                default:
            }
            if(mirror.mirrorPosition == correctPosition){
                console.log("Posicion correcta");
                mirror.setActive(true);
            }
            else{
                mirror.setActive(false);
            }

        });
    }
}