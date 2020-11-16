class infiniteScene extends Phaser.Scene {
    constructor(){
        super("infiniteScene");
    }

    init(data){
        this.English = data.english;
        this.am = data.am;
        this.device = data.device;
    }

    levelGenerator(level){
        switch(level){

            case 1:
                this.actualLevel = 1;
                this.generateLevel1();
                break;
            case 2:
                this.actualLevel = 2;
                this.generateLevel2();
                break;
            case 3:
                this.actualLevel = 3;
                this.generateLevel3();
                break;
            case 4:
                this.actualLevel = 4;
                this.generateLevel4();
                break;
            case 5:
                this.actualLevel = 5;
                this.generateLevel5();
                break;
            case 6:
                this.actualLevel = 6;
                this.generateLevel6();
                break;
            case 7:
                this.actualLevel = 7;
                this.generateLevel7();
                break;
            case 8:
                this.actualLevel = 8;
                //this.generateLevel8();
                break;
            case 9:
                this.actualLevel = 9;
                //this.generateLevel9();
                break;
            case 10:
                this.actualLevel = 10;
                //this.generateLevel10();
                break;
        }
    }

    generateLevel1(levelDisplace){
        var iniXL = 300 +levelDisplace;
        var iniYL = 875;

        //Inicio jugador 2
        var iniXS = 300+levelDisplace;
        var iniYS = 2300;

        this.playerShape.setPosition(iniXL, iniYL);
        this.playerShape2.setPosition(iniXS, iniYS);

        this.cameraMain.setBounds(levelDisplace,0,4032,1440);
        this.camera2.setBounds(levelDisplace,1440,4032, 1440);

        //Tilemap
        var map = this.add.tilemap('map1');
        var tileset = map.addTilesetImage('tileset', 'tiles');

        //Fondo
        this.bg = this.add.sprite(200, 0, 'bg1');
        this.bg.setScrollFactor(0);
        this.bg.setDepth(-2);

        var ground = map.createStaticLayer('Suelo',tileset,levelDisplace,0);
        var walls = map.createStaticLayer('Pared', tileset, levelDisplace,0);
        var spikes = map.createStaticLayer('Pinchos',tileset,levelDisplace,0);

        ground.setCollision([58]);
        walls.setCollision([37,44]);

        this.physics.add.collider(ground, this.playerShape);
        this.physics.add.collider(ground, this.playerShape2);
        this.physics.add.collider(walls, this.playerShape);
        this.physics.add.collider(walls, this.playerShape2);

        //ANDAMIOS
        var andl = new Scaffold(this, 300+levelDisplace, 1125, 'andamio', 350, 80, 20, 80);
        andl.addCollide(this, this.playerShape); //Inicio superior

        var andd = new Scaffold(this, 300+levelDisplace, 2570, 'andamio', 350, 80, 20, 80);
        andd.addCollide(this, this.playerShape2);    //Inicio inferior

        var andl2 = new Scaffold(this, 3750+levelDisplace, 1125, 'andamio', 350, 80, 20, 80);
        andl2.addCollide(this, this.playerShape);

        var andd2 = new Scaffold(this, 3750+levelDisplace, 2570, 'andamio', 350, 80, 20, 80);
        andd2.addCollide(this, this.playerShape2);

        //PLATAFORMAS
        //Móviles
        var displaceY = 1445;

        var mpl = new MovingPlatform(this, 600+levelDisplace, 925, 'woodP'); //1
        mpl.addPlayerCollide(this, this.playerShape);
        mpl.setMovement(this, 200, 0);

        var mpd = new MovingPlatform(this, 600+levelDisplace, 925+displaceY, 'woodP');
        mpd.setAlpha(0);
        mpd.addPlayerCollide(this, this.playerShape2);
        mpd.setMovement(this, 200, 0);

        var mpl2 = new MovingPlatform(this, 1200+levelDisplace, 1225, 'woodP');   //2
        mpl2.setAlpha(0);
        mpl2.addPlayerCollide(this, this.playerShape);
        mpl2.setMovement(this, 0, -400);

        var mpd2 = new MovingPlatform(this, 1200+levelDisplace, 1225+displaceY, 'woodP');
        mpd2.addPlayerCollide(this, this.playerShape2);
        mpd2.setMovement(this, 0, -400);

        var mpl3 = new MovingPlatform(this, 2900+levelDisplace, 400, 'woodP');  //8
        mpl3.scale(2, 2);
        mpl3.setAlpha(0);
        mpl3.addPlayerCollide(this, this.playerShape);
        mpl3.setMovement(this, 0, 400);

        var mpd3 = new MovingPlatform(this, 2900+levelDisplace, 400+displaceY, 'woodP');
        mpd3.scale(2, 2);
        mpd3.addPlayerCollide(this, this.playerShape2);
        mpd3.setMovement(this, 0, 400);

        //Estáticas
        var spl = new StaticPlatform(this, 1400+levelDisplace, 425, 'woodP');    //3
        spl.addPlayerCollide(this, this.playerShape);

        var spd = new StaticPlatform(this, 1400+levelDisplace, 425+displaceY, 'woodP');
        spd.setAlpha(0);
        spd.addPlayerCollide(this, this.playerShape2);

        var spl2 = new StaticPlatform(this, 1600+levelDisplace, 1200, 'woodP');  //4
        spl2.setAlpha(0);
        spl2.addPlayerCollide(this, this.playerShape);

        var spd2 = new StaticPlatform(this, 1600+levelDisplace, 1200+displaceY, 'woodP');
        spd2.addPlayerCollide(this, this.playerShape2);

        var spl3 = new StaticPlatform(this, 1900+levelDisplace, 1150, 'woodP');  //5
        spl3.addPlayerCollide(this, this.playerShape);

        var spd3 = new StaticPlatform(this, 1900+levelDisplace, 1150+displaceY, 'woodP');
        spd3.setAlpha(0);
        spd3.addPlayerCollide(this, this.playerShape2);

        var spl4 = new StaticPlatform(this, 2200+levelDisplace, 1110, 'woodP');  //6
        spl4.setAlpha(0);
        spl4.addPlayerCollide(this, this.playerShape);

        var spd4 = new StaticPlatform(this, 2200+levelDisplace, 1110+displaceY, 'woodP');
        spd4.addPlayerCollide(this, this.playerShape2);

        var spl5 = new StaticPlatform(this, 2500+levelDisplace, 1070, 'woodP');  //7
        spl5.addPlayerCollide(this, this.playerShape);

        var spd5 = new StaticPlatform(this, 2500+levelDisplace, 1070+displaceY, 'woodP');
        spd5.setAlpha(0);
        spd5.addPlayerCollide(this, this.playerShape2);

        var spl6 = new StaticPlatform(this, 3200+levelDisplace, 500, 'woodP');   //9
        spl6.addPlayerCollide(this, this.playerShape);

        var spd6 = new StaticPlatform(this, 3200+levelDisplace, 500 + displaceY, 'woodP');
        spd6.setAlpha(0);
        spd6.addPlayerCollide(this, this.playerShape2);

        //PINCHOS
        var spikesUp = new Spike(this, 2000+levelDisplace, 1380, 3800, 100, 0xff0000, this.hp);
        spikesUp.setAlpha(0);
        spikesUp.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikesUpR = new Spike(this, 3160+levelDisplace, 92, 800, 100, 0xff0000, this.hp);
        spikesUpR.setAlpha(0);
        spikesUpR.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikesDown = new Spike(this, 2000+levelDisplace, 1380+displaceY, 3800, 100, 0xff0000, this.hp);
        spikesDown.setAlpha(0);
        spikesDown.addPlayerCollide(this, this.playerShape2, this.playerShape, this.English, iniXS, iniYS, iniXL, iniYL);

        var spikesDownR = new Spike(this, 3160+levelDisplace, 92+displaceY, 800, 100, 0xff0000, this.hp);
        spikesDownR.setAlpha(0);
        spikesDownR.addPlayerCollide(this, this.playerShape2, this.playerShape, this.English, iniXS, iniYS, iniXL, iniYL);
    }

    generateLevel2(levelDisplace){

        this.bg = this.add.sprite(960,540,'bg2');
        this.bg.setScrollFactor(0);
        this.bg.setDepth(-2);

        var iniXL = 300+levelDisplace;
        var iniYL = 1350;

        var iniXS = 300+levelDisplace;
        var iniYS = 2300;

        this.playerShape.setPosition(iniXL, iniYL);
        this.playerShape2.setPosition(iniXS, iniYS);

        var map = this.add.tilemap('map2');
        var tileset = map.addTilesetImage('tileset', 'tiles');

        var ground = map.createStaticLayer('Suelo',tileset,levelDisplace,0);
        var ground2 = map.createStaticLayer('Suelo2',tileset,levelDisplace,0);
        var walls = map.createStaticLayer('Pared', tileset, levelDisplace,0);
        map.createStaticLayer('Pinchos',tileset,levelDisplace,0);

        ground.setCollision([29,30]);
        ground2.setCollision([58, 3221225530]);
        walls.setCollision([37,44]);

        this.physics.add.collider(ground2, this.playerShape);
        this.physics.add.collider(ground2, this.playerShape2);
        this.physics.add.collider(walls, this.playerShape);
        this.physics.add.collider(walls, this.playerShape2);


        //ANDAMIOS
        var andd = new Scaffold(this, 300+levelDisplace, 2570, 'andamio', 350, 80, 20, 80);
        andd.addCollide(this, this.playerShape2);    //Inicio inferior

        var andd2 = new Scaffold(this, 3750+levelDisplace, 2570, 'andamio', 350, 80, 20, 80);
        andd2.addCollide(this, this.playerShape2);   //Final inferior

        //CÁMARAS
        this.cameraMain.setBounds(levelDisplace,0,4032,1440);
        this.camera2.setBounds(levelDisplace,1440,4032, 1440);

        //Techo inferior/Suelo superior
        var floorDownl = this.add.rectangle(2000+levelDisplace, 1440, 4000, 100, 0x000000);
        floorDownl.setAlpha(0);
        this.physics.add.existing(floorDownl, 1);
        this.physics.add.collider(this.playerShape, floorDownl);

        //Techo superior
        var floorUpl = this.add.rectangle(2000+levelDisplace, 527, 4000, 100, 0x000000);
        floorUpl.setAlpha(0);
        this.physics.add.existing(floorUpl, 1);
        this.physics.add.collider(this.playerShape, floorUpl);

        var floorUpl2 = this.add.rectangle(3600+levelDisplace, 623, 2000, 100, 0x000000);
        floorUpl2.setAlpha(0);
        this.physics.add.existing(floorUpl2, 1);
        this.physics.add.collider(this.playerShape, floorUpl2);

        var floorUpl3 = this.add.rectangle(3984+levelDisplace, 719, 2000, 100, 0x000000);
        floorUpl3.setAlpha(0);
        this.physics.add.existing(floorUpl3, 1);
        this.physics.add.collider(this.playerShape, floorUpl3);

        var floorUpl4 = this.add.rectangle(3950+levelDisplace, 815, 1000, 100, 0x000000);
        floorUpl4.setAlpha(0);
        this.physics.add.existing(floorUpl4, 1);
        this.physics.add.collider(this.playerShape, floorUpl4);

        var floorUpl5 = this.add.rectangle(450+levelDisplace, 623, 2000, 100, 0x000000);
        floorUpl5.setAlpha(0);
        this.physics.add.existing(floorUpl5, 1);
        this.physics.add.collider(this.playerShape, floorUpl5);

        var floorUpl6 = this.add.rectangle(66+levelDisplace, 719, 2000, 100, 0x000000);
        floorUpl6.setAlpha(0);
        this.physics.add.existing(floorUpl6, 1);
        this.physics.add.collider(this.playerShape, floorUpl6);

        var floorUpl7 = this.add.rectangle(100+levelDisplace, 815, 1000, 100, 0x000000);
        floorUpl7.setAlpha(0);
        this.physics.add.existing(floorUpl7, 1);
        this.physics.add.collider(this.playerShape, floorUpl7);


        //PLATAFORMAS
        var sp = new StaticPlatform(this, 600+levelDisplace, 2600, 'blueP');
        sp.addPlayerCollide(this, this.playerShape2);

        var sp2 = new StaticPlatform(this, 800+levelDisplace, 1700, 'blueP');
        sp2.rotate(Math.PI);
        sp2.addPlayerCollide(this, this.playerShape2);

        var sp3 = new StaticPlatform(this, 1100+levelDisplace, 2750, 'blueP');
        sp3.addPlayerCollide(this, this.playerShape2);

        var sp4 = new StaticPlatform(this, 1400+levelDisplace, 2750, 'blueP');
        sp4.addPlayerCollide(this, this.playerShape2);

        var sp5 = new StaticPlatform(this, 1600+levelDisplace, 2400, 'blueP');
        sp5.rotate(Math.PI);
        sp5.addPlayerCollide(this, this.playerShape2);

        var sp6 = new StaticPlatform(this, 1800+levelDisplace, 1800, 'blueP');
        sp6.rotate(Math.PI);
        sp6.addPlayerCollide(this, this.playerShape2);

        var sp7 = new StaticPlatform(this, 2000+levelDisplace, 2700, 'blueP');
        sp7.addPlayerCollide(this, this.playerShape2);

        var sp8 = new StaticPlatform(this, 2200+levelDisplace, 1800, 'blueP');
        sp8.rotate(Math.PI);
        sp8.addPlayerCollide(this, this.playerShape2);

        var sp9 = new StaticPlatform(this, 2400+levelDisplace, 2700, 'blueP');
        sp9.addPlayerCollide(this, this.playerShape2);

        var sp10 = new StaticPlatform(this, 2700+levelDisplace, 2750, 'blueP');
        sp10.addPlayerCollide(this, this.playerShape2);

        var sp11 = new StaticPlatform(this, 2900+levelDisplace, 1700, 'blueP');
        sp11.rotate(Math.PI);
        sp11.addPlayerCollide(this, this.playerShape2);

        var sp12 = new StaticPlatform(this, 3250+levelDisplace, 2200, 'blueP');
        sp12.addPlayerCollide(this, this.playerShape2);

        //PINCHOS
        var spikesupd = new Spike(this, 2000+levelDisplace, 1560, 4000, 100, 0xff0000, this.hp);
        spikesupd.setAlpha(0);
        spikesupd.addPlayerCollide(this, this.playerShape2, this.playerShape, this.English, iniXS, iniYS, iniXL, iniYL);

        var spikesdownd = new Spike(this, 2000+levelDisplace, 2830, 4000, 100, 0xff0000, this.hp);
        spikesdownd.setAlpha(0);
        spikesdownd.addPlayerCollide(this, this.playerShape2, this.playerShape, this.English, iniXS, iniYS, iniXL, iniYL);

        var spikesupl = new Spike(this, 1970+levelDisplace, 580, 100, 50, 0xff0000, this.hp);
        spikesupl.setAlpha(0);
        spikesupl.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXS, iniYS);

        var spikesdownl = new Spike(this, 2110+levelDisplace, 1425, 100, 100, 0xff0000, this.hp);
        spikesdownl.setAlpha(0);
        spikesdownl.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXS, iniYS);

        //CAMBIO DE GRAVEDAD
        var gravity = new GravitySwitch(this, 2500+levelDisplace, 1440, 1700+levelDisplace, 560, 'greenButton', 'redButton');
        gravity.addTrigger(this, this.playerShape, this.playerShape2, this.playerPhysics, this.playerPhysics2);


        //Meta
        this.goal.setPosition(3750+levelDisplace, 1125);
    }

    generateLevel3(levelDisplace){
        this.bg = this.add.sprite(960,540,'bg1');
        this.bg.setScrollFactor(0);
        this.bg.setDepth(-2);

        var iniXL = 300+levelDisplace;
        var iniYL = 875;

        var iniXS = 300+levelDisplace;
        var iniYS = 2300;

        this.playerShape.setPosition(iniXL, iniYL);
        this.playerShape2.setPosition(iniXS, iniYS);

        //TILEMAP
        var map = this.add.tilemap('map3');
        var tileset = map.addTilesetImage('tileset', 'tiles');
        var ground = map.createStaticLayer('Suelo',tileset,levelDisplace,0);
        var walls = map.createStaticLayer('Pared', tileset, levelDisplace,0);
        map.createStaticLayer('Pinchos',tileset,levelDisplace,0);
        map.createStaticLayer('Plataformas',tileset,levelDisplace,0);

        ground.setCollision([58]);
        walls.setCollision([30,36,37,38,43,44,45]);

        this.physics.add.collider(walls, this.playerShape);
        this.physics.add.collider(walls, this.playerShape2);

        //CÁMARAS
        this.cameraMain.setBounds(levelDisplace,0,4032,1440);
        this.camera2.setBounds(levelDisplace,1440,4032, 1440);

        //ANDAMIOS
        var andl = new Scaffold(this, 300+levelDisplace, 1125, 'andamio', 350, 80, 20, 80);
        andl.addCollide(this, this.playerShape); //Inicio superior

        var andd = new Scaffold(this, 300+levelDisplace, 2570, 'andamio', 350, 80, 20, 80);
        andd.addCollide(this, this.playerShape2);    //Inicio inferior

        var andl2 = new Scaffold(this, 3750+levelDisplace, 1125, 'andamio', 350, 80, 20, 80);
        andl2.addCollide(this, this.playerShape);

        var andd2 = new Scaffold(this, 3750+levelDisplace, 2570, 'andamio', 350, 80, 20, 80);
        andd2.addCollide(this, this.playerShape2);

        //VIDA + PINCHOS
        var displaceY = 1440;

        var spikesUp = new Spike(this, 2000+levelDisplace, 1380, 3800, 100, 0xff0000, this.hp);
        spikesUp.setAlpha(0);
        spikesUp.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikesDown = new Spike(this, 2000+levelDisplace, 1380+displaceY, 3800, 100, 0xff0000, this.hp);
        spikesDown.setAlpha(0);
        spikesDown.addPlayerCollide(this, this.playerShape2, this.playerShape, this.English, iniXS, iniYS, iniXL, iniYL);

        //SUELO y PLATAFORMAS
        //J Superior
        var floor1 = this.add.rectangle(725+levelDisplace, 950, 200, 80, 0x000000);
        floor1.setAlpha(0);
        this.physics.add.existing(floor1, 1);
        this.physics.add.collider(this.playerShape, floor1);

        var floor2 = this.add.rectangle(1050+levelDisplace, 950, 80, 80, 0x000000);
        floor2.setAlpha(0);
        this.physics.add.existing(floor2, 1);
        this.physics.add.collider(this.playerShape, floor2);

        var floor3 = this.add.rectangle(1400+levelDisplace, 950, 200, 80, 0x000000);
        floor3.setAlpha(0);
        this.physics.add.existing(floor3, 1);
        this.physics.add.collider(this.playerShape, floor3);

        var floor4 = this.add.rectangle(725+levelDisplace, 1235, 400, 80, 0x000000);
        floor4.setAlpha(0);
        this.physics.add.existing(floor4, 1);
        this.physics.add.collider(this.playerShape, floor4);

        var floor5 = this.add.rectangle(1400+levelDisplace, 1235, 400, 80, 0x000000);
        floor5.setAlpha(0);
        this.physics.add.existing(floor5, 1);
        this.physics.add.collider(this.playerShape, floor5);

        var floor6 = this.add.rectangle(2100+levelDisplace, 1235, 700, 80, 0x000000);
        floor6.setAlpha(0);
        this.physics.add.existing(floor6, 1);
        this.physics.add.collider(this.playerShape, floor6);

        var floor7 = this.add.rectangle(2450+levelDisplace, 1165, 100, 80, 0x000000);
        floor7.setAlpha(0);
        this.physics.add.existing(floor7, 1);
        this.physics.add.collider(this.playerShape, floor7);

        var floor8 = this.add.rectangle(2600+levelDisplace, 1075, 200, 80, 0x000000);
        floor8.setAlpha(0);
        this.physics.add.existing(floor8, 1);
        this.physics.add.collider(this.playerShape, floor8);

        var floor9 = this.add.rectangle(2790+levelDisplace, 980, 200, 80, 0x000000);
        floor9.setAlpha(0);
        this.physics.add.existing(floor9, 1);
        this.physics.add.collider(this.playerShape, floor9);

        var floor10 = this.add.rectangle(2945+levelDisplace, 790, 120, 80, 0x000000);
        floor10.setAlpha(0);
        this.physics.add.existing(floor10, 1);
        this.physics.add.collider(this.playerShape, floor10);

        var sp = new StaticPlatform(this, 1050+levelDisplace, 1125, 'woodP');
        sp.addPlayerCollide(this, this.playerShape);

        var mp1 = new MovingPlatform(this, 3100+levelDisplace, 790, 'woodP'); //Plataforma final
        mp1.addPlayerCollide(this, this.playerShape);
        mp1.setMovement(this, 200, 0);

        //J Inferior

        var mp2 = new MovingPlatform(this, 700+levelDisplace, 2400, 'woodP'); //Plataforma 1
        mp2.addPlayerCollide(this, this.playerShape2);
        mp2.setMovement(this, 0, 150, this.playerPhysics2);

        var sp2 = new StaticPlatform(this, 1200+levelDisplace, 2700, 'woodP');
        sp2.addPlayerCollide(this, this.playerShape2);

        var mp3 = new MovingPlatform(this, 1500+levelDisplace, 2700, 'woodP'); //Plataforma 2
        mp3.addPlayerCollide(this, this.playerShape2);
        mp3.setMovement(this, 0, -300, this.playerPhysics2);

        var floor11 = this.add.rectangle(1920+levelDisplace, 2015, 500, 80, 0x000000);
        floor11.setAlpha(0);
        this.physics.add.existing(floor11, 1);
        this.physics.add.collider(this.playerShape2, floor11);

        var floor12 = this.add.rectangle(2400+levelDisplace, 2200, 300, 80, 0x000000);
        floor12.setAlpha(0);
        this.physics.add.existing(floor12, 1);
        this.physics.add.collider(this.playerShape2, floor12);

        var floor13 = this.add.rectangle(2820+levelDisplace, 2110, 200, 80, 0x000000);
        floor13.setAlpha(0);
        this.physics.add.existing(floor13, 1);
        this.physics.add.collider(this.playerShape2, floor13);

        this.physics.add.collider(this.playerShape, floor13);
        this.physics.add.collider(this.playerShape, floor12);

        var floor14 = this.add.rectangle(3070+levelDisplace, 2675, 300, 80, 0x000000);
        floor14.setAlpha(0);
        this.physics.add.existing(floor14, 1);
        this.physics.add.collider(this.playerShape2, floor14);

        var mp4 = new MovingPlatform(this, 3400+levelDisplace, 2200, 'woodP'); //Plataforma 2
        mp4.addPlayerCollide(this, this.playerShape2);
        mp4.setMovement(this, 0, 200);

        var mp5 = new MovingPlatform(this, 3100+levelDisplace, 2400, 'woodP'); //Plataforma 2
        mp5.addPlayerCollide(this, this.playerShape2);
        mp5.setMovement(this, 0, -200);

        //PORTALES

        var portal1 = new Teleport(this, 1050+levelDisplace, 1300, 1000, 2300, 'portalA', 'portalR');
        portal1.setScale(1.5,1.5);
        portal1.rotateExit(Math.PI);

        var portal2 = new Teleport(this, 2600+levelDisplace, 2750, 2855, 550, 'portalA', 'portalR');
        portal2.setScale(1.5,1.5);
        portal2.rotateExit(Math.PI);


        //CAJAS

        var box1 = new Box(this, 1000+levelDisplace, 2775, 850, 1100, 50, 50, 'caja');
        box1.addPlayerCollide(this, this.playerShape);
        box1.addPlayerCollide(this, this.playerShape2);
        box1.addWorldCollide(this, floor4);

        portal1.addCollide(this, box1.getBox());

        var box2 = new Box(this,2855+levelDisplace,915,2520, 1600, 50, 50, 'caja');
        box2.addPlayerCollide(this, this.playerShape);
        box2.addPlayerCollide(this, this.playerShape2);
        box2.addWorldCollide(this, floor12);

        portal2.addCollide(this, box2.getBox());

        var box3 = new Box(this,2855+levelDisplace,865,2400, 1600, 50, 50, 'caja');
        box3.addPlayerCollide(this, this.playerShape);
        box3.addPlayerCollide(this, this.playerShape2);
        box3.addWorldCollide(this, floor12);

        portal2.addCollide(this, box3.getBox());

        var box4 = new Box(this,2805+levelDisplace,915,2805,915, 50, 50, 'caja');
        box4.addPlayerCollide(this, this.playerShape);
        box4.addResetCollide(this, spikesUp);
        box4.addResetCollide(this, spikesDown);

        portal2.addCollide(this, box4.getBox());

        //Meta
        this.goal.setPosition(3750+levelDisplace, 1125);
    }

    generateLevel4(levelDisplace){
        this.bg = this.add.sprite(960,540,'bg3');
        this.bg.setDepth(-2);
        this.bg.setScrollFactor(0);

        var iniXL = 300+levelDisplace;
        var iniYL = 875;

        var iniXS = 300+levelDisplace;
        var iniYS = 2300;

        this.playerShape.setPosition(iniXL, iniYL);
        this.playerShape2.setPosition(iniXS, iniYS);
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
        var map = this.add.tilemap('map4');
        var tileset = map.addTilesetImage('tileset', 'tiles');
        var walls = map.createStaticLayer('Pared', tileset, levelDisplace,0);
        map.createStaticLayer('Suelo',tileset,levelDisplace,0);
        map.createStaticLayer('Suelo2',tileset,levelDisplace,0);

        walls.setCollision([10,15,16,17]);

        this.physics.add.collider(walls, this.playerShape);
        this.physics.add.collider(walls, this.playerShape2);

        //CÁMARAS
        this.cameraMain.setBounds(levelDisplace,0,4032,1440);
        this.camera2.setBounds(levelDisplace,1440,4032, 1440);

        //ANDAMIOS
        var andl = new Scaffold(this, 300+levelDisplace, 1125, 'andamio', 350, 500, 20, 80);
        andl.addCollide(this, this.playerShape); //Inicio superior

        var andd = new Scaffold(this, 300+levelDisplace, 2570, 'andamio', 350, 500, 20, 80);
        andd.addCollide(this, this.playerShape2);    //Inicio inferior

        var andl2 = new Scaffold(this, 3350+levelDisplace, 1125, 'andamio', 350, 500, 20, 80);
        andl2.addCollide(this, this.playerShape);

        var andd2 = new Scaffold(this, 3350+levelDisplace, 2570, 'andamio', 350, 500, 20, 80);
        andd2.addCollide(this, this.playerShape2);

        var displaceY = 1440;

        //SUELO
        //J Superior
        var floor1 = this.add.rectangle(2000+levelDisplace, 1450, 3800, 100, 0xff0000);
        floor1.setAlpha(0);
        this.physics.add.existing(floor1, 1);
        this.physics.add.collider(this.playerShape, floor1);

        var floor2 = this.add.rectangle(2000+levelDisplace, 1450+displaceY, 3800, 100, 0xff0000);
        floor2.setAlpha(0);
        this.physics.add.existing(floor2, 1);
        this.physics.add.collider(this.playerShape2, floor2);

        var floor3 = this.add.rectangle(3750+levelDisplace, 975, 500, 100, 0xff0000);
        floor3.setAlpha(0);
        this.physics.add.existing(floor3, 1);
        this.physics.add.collider(this.playerShape, floor3);

        var floor4 = this.add.rectangle(3750+levelDisplace, 975+displaceY, 500, 100, 0xff0000);
        floor4.setAlpha(0);
        this.physics.add.existing(floor4, 1);
        this.physics.add.collider(this.playerShape2, floor4);

        //PLATAFORMAS
        var mp1 = new MovingPlatform(this, 800+levelDisplace, 950, 'blueP'); //Plataforma recorrido medio
        mp1.addPlayerCollide(this, this.playerShape);
        mp1.setMovementTime(this, 330, 0, 6000);

        var mp2 = new MovingPlatform(this, 600+levelDisplace, 950, 'blueP');
        mp2.addPlayerCollide(this, this.playerShape);
        mp2.setMovement(this, 0, 200);

        var mp3 = new MovingPlatform(this, 3000+levelDisplace, 950, 'blueP');
        mp3.addPlayerCollide(this, this.playerShape);
        mp3.setMovement(this, 0, 200);

        var mp4 = new MovingPlatform(this, 800+levelDisplace, 950+displaceY, 'blueP'); //Plataforma recorrido medio
        mp4.addPlayerCollide(this, this.playerShape2);
        mp4.setMovementTime(this, 330, 0, 6000);

        var mp5 = new MovingPlatform(this, 600+levelDisplace, 950+displaceY, 'blueP');
        mp5.addPlayerCollide(this, this.playerShape2);
        mp5.setMovement(this, 0, 200);

        var mp6 = new MovingPlatform(this, 3000+levelDisplace, 950+displaceY, 'blueP');
        mp6.addPlayerCollide(this, this.playerShape2);
        mp6.setMovement(this, 0, 200);

        //ESPEJOS


        var mirror1 = new Mirror(this, 1000+levelDisplace, 1370, 'mirror');
        mirror1.mirror.setDepth(11);
        this.setInteractiveMirror(mirror1, 7);

        var mirror2 = new Mirror(this, 1500+levelDisplace, 1370, 'mirror');
        mirror2.mirror.setDepth(11);
        this.setInteractiveMirror(mirror2, 5);

        var mirror3 = new Mirror(this, 2000+levelDisplace, 1370, 'mirror');
        mirror3.mirror.setDepth(11);
        this.setInteractiveMirror(mirror3, 7);

        var mirror4 = new Mirror(this, 2500+levelDisplace, 1370, 'mirror');
        mirror4.mirror.setDepth(11);
        this.setInteractiveMirror(mirror4, 5);

        var mirror5 = new Mirror(this, 1500+levelDisplace, 700, 'mirror');    //Techo
        mirror5.rotate(Math.PI);
        mirror5.mirror.setDepth(-1);
        this.setInteractiveMirror(mirror5, 6);

        //Inferiores
        var mirror6 = new Mirror(this, 1400+levelDisplace, 1370+displaceY, 'mirror');
        mirror6.mirror.setDepth(11);
        this.setInteractiveMirror(mirror6, 7);

        var mirror7 = new Mirror(this, 1900+levelDisplace, 1050+displaceY, 'mirror');
        mirror7.rotate(Math.PI/2);
        mirror7.mirror.setDepth(11);
        this.setInteractiveMirror(mirror7, 7);

        var mirror8 = new Mirror(this, 2200+levelDisplace, 700+displaceY, 'mirror');   //Techo
        mirror8.mirror.setDepth(-1);
        mirror8.rotate(Math.PI);
        this.setInteractiveMirror(mirror8, 6);

        var mirror9 = new Mirror(this, 2500+levelDisplace, 1370+displaceY, 'mirror');
        mirror9.mirror.setDepth(11);
        this.setInteractiveMirror(mirror9, 5);

        var diam = this.add.sprite(1900+levelDisplace, 1370+displaceY, 'diamond').setDepth(13);
        this.add.sprite(1370+levelDisplace, 750+displaceY, 'blueP').setRotation(Math.PI/2);
        this.add.sprite(1840+levelDisplace, 1050+displaceY, 'blueP').setScale(1.2,1.2).setRotation(Math.PI/2);
        var laser = this.add.sprite(1400+levelDisplace, 760+displaceY, 'laser');
        laser.setRotation(Math.PI/2);
        laser.setDepth(13);
        laser.setScale(1.3,1.3);

        var portal1D = this.add.sprite(1700+levelDisplace, 760+displaceY, 'portalA').setDepth(13);
        var portal2D = this.add.sprite(2700+levelDisplace, 760+displaceY, 'portalR').setDepth(13);
        var portal1U = this.add.sprite(1000+levelDisplace, 800, 'portalR').setDepth(13);
        var portal2U = this.add.sprite(2000+levelDisplace, 800, 'portalA').setDepth(13);


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
        var doorUp = new Door(this, 3625+levelDisplace, 850, 'laserDoor');
        doorUp.scale(1.25,1.25);
        doorUp.addPlayerCollide(this.playerShape);
        var doorDown = new Door(this, 3625+levelDisplace, 850+displaceY, 'laserDoor');
        doorDown.scale(1.25,1.25);
        doorDown.addPlayerCollide(this.playerShape2);
        mirror7.addDoors(doorUp, doorDown);

        //Meta
        this.goal.setPosition(3750+levelDisplace, 1125);
    }

    generateLevel5(levelDisplace){
        this.bg = this.add.sprite(960,540,'bg3');
        this.bg.setDepth(-2);
        this.bg.setScrollFactor(0);

        var iniXL = 300+levelDisplace;
        var iniYL = 875;

        var iniXS = 300+levelDisplace;
        var iniYS = 2300;

        this.playerShape.setPosition(iniXL, iniYL);
        this.playerShape2.setPosition(iniXS, iniYS);

        //TILEMAP
        var map = this.add.tilemap('map5');
        var tileset = map.addTilesetImage('tileset', 'tiles');
        var walls = map.createStaticLayer('Pared', tileset, levelDisplace,0);
        map.createStaticLayer('Pinchos',tileset,levelDisplace,0);
        map.createStaticLayer('Suelo',tileset,levelDisplace,0);
        map.createStaticLayer('Suelo2',tileset,levelDisplace,0);

        walls.setCollision([8,10,15,16,17]);

        this.physics.add.collider(walls, this.playerShape);
        this.physics.add.collider(walls, this.playerShape2);

        //CÁMARAS
        this.cameraMain.setBounds(levelDisplace,0,4032,1440);
        this.camera2.setBounds(levelDisplace,1440,4032, 1440);

        //ANDAMIOS
        var andl = new Scaffold(this, 300+levelDisplace, 1125, 'andamio', 350, 500, 20, 80);
        andl.addCollide(this, this.playerShape); //Inicio superior

        var andd = new Scaffold(this, 300+levelDisplace, 2570, 'andamio', 350, 500, 20, 80);
        andd.addCollide(this, this.playerShape2);    //Inicio inferior

        var andl2 = new Scaffold(this, 3750+levelDisplace, 1125, 'andamio', 350, 80, 20, 80);
        andl2.addCollide(this, this.playerShape);

        var andd2 = new Scaffold(this, 3750+levelDisplace, 2570, 'andamio', 350, 80, 20, 80);
        andd2.addCollide(this, this.playerShape2);

        var displaceY = 1440;

        //PINCHOS
        var spikesUp = new Spike(this, 2000+levelDisplace, 1400, 3800, 100, 0xff0000, this.hp);
        spikesUp.setAlpha(0);
        spikesUp.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikesDown = new Spike(this, 2000+levelDisplace, 1400+displaceY, 3800, 100, 0xff0000, this.hp);
        spikesDown.setAlpha(0);
        spikesDown.addPlayerCollide(this, this.playerShape2, this.playerShape, this.English, iniXS, iniYS, iniXL, iniYL);


        //DROP PLATFORMS
        var dualPlat1 = new DualDropPlatform(this, 600+levelDisplace, 1100, 600+levelDisplace, 2540, 'blueP');
        dualPlat1.addPlayerCollide(this, this.playerShape, 5);
        dualPlat1.addPlayerCollide(this, this.playerShape2, 5);

        var dualPlat2 = new DualDropPlatform(this, 900+levelDisplace, 1100, 900+levelDisplace, 2540, 'blueP');
        dualPlat2.addPlayerCollide(this, this.playerShape, 5);
        dualPlat2.addPlayerCollide(this, this.playerShape2, 5);

        var dualPlat3 = new DualDropPlatform(this, 1200+levelDisplace, 1300, 1200+levelDisplace, 2740, 'blueP');
        dualPlat3.addPlayerCollide(this, this.playerShape, 5);
        dualPlat3.addPlayerCollide(this, this.playerShape2, 5);

        var dualPlat4 = new DualDropPlatform(this, 1500+levelDisplace, 1250, 1500+levelDisplace, 2690, 'blueP');
        dualPlat4.addPlayerCollide(this, this.playerShape, 5);
        dualPlat4.addPlayerCollide(this, this.playerShape2, 5);

        var dualPlat5 = new DualDropPlatform(this, 1800+levelDisplace, 1200, 1800+levelDisplace, 2640, 'blueP');
        dualPlat5.addPlayerCollide(this, this.playerShape, 5);
        dualPlat5.addPlayerCollide(this, this.playerShape2, 5);

        var dualPlat6 = new DualDropPlatform(this, 2100+levelDisplace, 1150, 2100+levelDisplace, 2590, 'blueP');
        dualPlat6.addPlayerCollide(this, this.playerShape, 5);
        dualPlat6.addPlayerCollide(this, this.playerShape2, 5);

        var dualPlat7 = new DualDropPlatform(this, 2400+levelDisplace, 1225, 2400+levelDisplace, 2665, 'blueP');
        dualPlat7.addPlayerCollide(this, this.playerShape, 5);
        dualPlat7.addPlayerCollide(this, this.playerShape2, 5);

        var dualPlat8 = new DualDropPlatform(this, 2700+levelDisplace, 1200, 2700+levelDisplace, 2640, 'blueP');
        dualPlat8.addPlayerCollide(this, this.playerShape, 5);
        dualPlat8.addPlayerCollide(this, this.playerShape2, 5);

        var dualPlat9 = new DualDropPlatform(this, 3000+levelDisplace, 1150, 3000+levelDisplace, 2590, 'blueP');
        dualPlat9.addPlayerCollide(this, this.playerShape, 5);
        dualPlat9.addPlayerCollide(this, this.playerShape2, 5);

        var dualPlat10 = new DualDropPlatform(this, 3300+levelDisplace, 1100, 3300+levelDisplace, 2540, 'blueP');
        dualPlat10.addPlayerCollide(this, this.playerShape, 5);
        dualPlat10.addPlayerCollide(this, this.playerShape2, 5);

        var dualPlat10 = new DualDropPlatform(this, 3450+levelDisplace, 1025, 3450+levelDisplace, 2465, 'blueP');
        dualPlat10.addPlayerCollide(this, this.playerShape, 5);
        dualPlat10.addPlayerCollide(this, this.playerShape2, 5);

        var limitL = this.add.rectangle(2000+levelDisplace, 1500, 4000, 100, 0x000000);
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

        //Meta
        this.goal.setPosition(3750+levelDisplace, 1125);
    }

    generateLevel6(levelDisplace){
        this.bg = this.add.sprite(960,540,'bg4');
        this.bg.setDepth(-2);
        this.bg.setScrollFactor(0);

        var iniXL = 300+levelDisplace;
        var iniYL = 650;

        var iniXS = 300+levelDisplace;
        var iniYS = 2090;

        this.playerShape.setPosition(iniXL, iniYL);
        this.playerShape2.setPosition(iniXS, iniYS);

        //TILEMAP
        var map = this.add.tilemap('map6');
        var tileset = map.addTilesetImage('tileset', 'tiles');
        var walls = map.createStaticLayer('Pared', tileset, levelDisplace,0);
        map.createStaticLayer('Suelo',tileset,levelDisplace,0);
        map.createStaticLayer('Suelo2',tileset,levelDisplace,0);
        var walls2 = map.createStaticLayer('Obstaculos', tileset, levelDisplace,0);
        map.createStaticLayer('Pinchos', tileset, levelDisplace,0);

        walls.setCollision([12,14,20]);

        this.physics.add.collider(walls, this.playerShape);
        this.physics.add.collider(walls, this.playerShape2);
        this.physics.add.collider(walls2, this.playerShape);
        this.physics.add.collider(walls2, this.playerShape2);

        //CÁMARAS
        this.cameraMain.setBounds(levelDisplace,0,4032,1440);
        this.camera2.setBounds(levelDisplace,1440,4032, 1440);

        var displaceY = 1440;
        //ANDAMIOS
        var andl = new Scaffold(this, 300+levelDisplace, 935, 'andamio', 350, 500, 20, 80);
        andl.addCollide(this, this.playerShape); //Inicio superior

        var andd = new Scaffold(this, 300+levelDisplace, 935+displaceY, 'andamio', 350, 500, 20, 80);
        andd.addCollide(this, this.playerShape2);    //Inicio inferior

        var andl2 = new Scaffold(this, 3750+levelDisplace, 935, 'andamio', 350, 500, 20, 80);
        andl2.addCollide(this, this.playerShape);

        var andd2 = new Scaffold(this, 3750+levelDisplace, 935+displaceY, 'andamio', 350, 500, 20, 80);
        andd2.addCollide(this, this.playerShape2);

        //Superior
        var spikesUp1 = new Spike(this, 2000+levelDisplace, 1210, 3800, 100, 0xff0000, this.hp);
        spikesUp1.setAlpha(0);
        spikesUp1.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikesUp2 = new Spike(this, 2000+levelDisplace, 90, 3800, 100, 0xff0000, this.hp);
        spikesUp2.setAlpha(0);
        spikesUp2.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes1 = new Spike(this, 740+levelDisplace, 370, 150, 600, 0xff0000, this.hp);
        spikes1.setAlpha(0);
        spikes1.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes2 = new Spike(this, 1125+levelDisplace, 230, 150, 300, 0xff0000, this.hp);
        spikes2.setAlpha(0);
        spikes2.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes3 = new Spike(this, 1510+levelDisplace, 325, 150, 500, 0xff0000, this.hp);
        spikes3.setAlpha(0);
        spikes3.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes4 = new Spike(this, 1895+levelDisplace, 375, 150, 600, 0xff0000, this.hp);
        spikes4.setAlpha(0);
        spikes4.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);
        //Symmetry
        var spikes5 = new Spike(this, 2185+levelDisplace, 375, 150, 600, 0xff0000, this.hp);
        spikes5.setAlpha(0);
        spikes5.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes6 = new Spike(this, 2570+levelDisplace, 325, 150, 500, 0xff0000, this.hp);
        spikes6.setAlpha(0);
        spikes6.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes7 = new Spike(this, 2955+levelDisplace, 275, 150, 400, 0xff0000, this.hp);
        spikes7.setAlpha(0);
        spikes7.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes8 = new Spike(this, 3340+levelDisplace, 370, 150, 600, 0xff0000, this.hp);
        spikes8.setAlpha(0);
        spikes8.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        //
        var spikes9 = new Spike(this, 1125+levelDisplace, 1000, 150, 500, 0xff0000, this.hp);
        spikes9.setAlpha(0);
        spikes9.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes10 = new Spike(this, 1510+levelDisplace, 1040, 150, 400, 0xff0000, this.hp);
        spikes10.setAlpha(0);
        spikes10.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes11 = new Spike(this, 1895+levelDisplace, 1090, 150, 300, 0xff0000, this.hp);
        spikes11.setAlpha(0);
        spikes11.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes12 = new Spike(this, 2185+levelDisplace, 1090, 150, 300, 0xff0000, this.hp);
        spikes12.setAlpha(0);
        spikes12.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes13 = new Spike(this, 2570+levelDisplace, 1040, 150, 400, 0xff0000, this.hp);
        spikes13.setAlpha(0);
        spikes13.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes14 = new Spike(this, 2955+levelDisplace, 1000, 150, 500, 0xff0000, this.hp);
        spikes14.setAlpha(0);
        spikes14.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        //Inferior

        var spikesDown1 = new Spike(this, 2000+levelDisplace, 1210+displaceY, 3800, 100, 0xff0000, this.hp);
        spikesDown1.setAlpha(0);
        spikesDown1.addPlayerCollide(this, this.playerShape2, this.playerShape, this.English, iniXS, iniYS, iniXL, iniYL);

        var spikesDown2 = new Spike(this, 2000+levelDisplace, 90+displaceY, 3800, 100, 0xff0000, this.hp);
        spikesDown2.setAlpha(0);
        spikesDown2.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes1d = new Spike(this, 740+levelDisplace, 370+displaceY, 150, 600, 0xff0000, this.hp);
        spikes1d.setAlpha(0);
        spikes1d.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes2d = new Spike(this, 1125+levelDisplace, 230+displaceY, 150, 300, 0xff0000, this.hp);
        spikes2d.setAlpha(0);
        spikes2d.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes3d = new Spike(this, 1510+levelDisplace, 325+displaceY, 150, 500, 0xff0000, this.hp);
        spikes3d.setAlpha(0);
        spikes3d.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes4d = new Spike(this, 1895+levelDisplace, 375+displaceY, 150, 600, 0xff0000, this.hp);
        spikes4d.setAlpha(0);
        spikes4d.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);
        //Symmetry
        var spikes5d = new Spike(this, 2185+levelDisplace, 375+displaceY, 150, 600, 0xff0000, this.hp);
        spikes5d.setAlpha(0);
        spikes5d.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes6d = new Spike(this, 2570+levelDisplace, 325+displaceY, 150, 500, 0xff0000, this.hp);
        spikes6d.setAlpha(0);
        spikes6d.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes7d = new Spike(this, 2955+levelDisplace, 275+displaceY, 150, 400, 0xff0000, this.hp);
        spikes7d.setAlpha(0);
        spikes7d.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes8d = new Spike(this, 3340+levelDisplace, 370+displaceY, 150, 600, 0xff0000, this.hp);
        spikes8d.setAlpha(0);
        spikes8d.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        //
        var spikes9d = new Spike(this, 1125+levelDisplace, 1000+displaceY, 150, 500, 0xff0000, this.hp);
        spikes9d.setAlpha(0);
        spikes9d.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes10d = new Spike(this, 1510+levelDisplace, 1040+displaceY, 150, 400, 0xff0000, this.hp);
        spikes10d.setAlpha(0);
        spikes10d.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes11d = new Spike(this, 1895+levelDisplace, 1090+displaceY, 150, 300, 0xff0000, this.hp);
        spikes11d.setAlpha(0);
        spikes11d.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes12d = new Spike(this, 2185+levelDisplace, 1090+displaceY, 150, 300, 0xff0000, this.hp);
        spikes12d.setAlpha(0);
        spikes12d.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes13d = new Spike(this, 2570+levelDisplace, 1040+displaceY, 150, 400, 0xff0000, this.hp);
        spikes13d.setAlpha(0);
        spikes13d.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        var spikes14d = new Spike(this, 2955+levelDisplace, 1000+displaceY, 150, 500, 0xff0000, this.hp);
        spikes14d.setAlpha(0);
        spikes14d.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXL, iniYL);

        //SUELO
        //J Superior
        var floor1 = this.add.rectangle(2000+levelDisplace, 1258, 3800, 100, 0xff0000);
        floor1.setAlpha(0);
        this.physics.add.existing(floor1, 1);
        this.physics.add.collider(this.playerShape, floor1);

        var floor2 = this.add.rectangle(2000+levelDisplace, 1258+displaceY, 3800, 100, 0xff0000);
        floor2.setAlpha(0);
        this.physics.add.existing(floor2, 1);
        this.physics.add.collider(this.playerShape2, floor2);

        //Meta
        this.goal.setPosition(3750+levelDisplace, 1125);
    }

    generateLevel7(levelDisplace){

        this.bg = this.add.sprite(960,540,'bg4');
        this.bg.setDepth(-2);
        this.bg.setScrollFactor(0);

        var iniXL = 300+levelDisplace;
        var iniYL = 685;

        var iniXS = 300+levelDisplace;
        var iniYS = 2110;

        this.playerShape.setPosition(iniXL, iniYL);
        this.playerShape2.setPosition(iniXS, iniYS);

        //TILEMAP
        var map = this.add.tilemap('map7');
        var tileset = map.addTilesetImage('tileset', 'tiles');
        var walls = map.createStaticLayer('Pared', tileset, levelDisplace, 0);
        map.createStaticLayer('Suelo', tileset, levelDisplace, 0);
        map.createStaticLayer('Suelo2', tileset, levelDisplace, 0);
        map.createStaticLayer('Pinchos', tileset, levelDisplace, 0);

        walls.setCollision([12, 13, 19, 20]);

        this.physics.add.collider(walls, this.playerShape);
        this.physics.add.collider(walls, this.playerShape2);

        //CÁMARAS
        this.cameraMain.setBounds(levelDisplace, 0, 4032, 1440);
        this.camera2.setBounds(levelDisplace, 1440, 4032, 1440);

        //ANDAMIOS
        var andl = new Scaffold(this, 300+levelDisplace, 935, 'andamio', 350, 500, 20, 80);
        andl.addCollide(this, this.playerShape); //Inicio superior

        var andd = new Scaffold(this, 300+levelDisplace, 2375, 'andamio', 350, 500, 20, 80);
        andd.addCollide(this, this.playerShape2);    //Inicio inferior

        var andl2 = new Scaffold(this, 3750+levelDisplace, 935, 'andamio', 350, 500, 20, 80);
        andl2.addCollide(this, this.playerShape);

        var andd2 = new Scaffold(this, 3750+levelDisplace, 2375, 'andamio', 350, 500, 20, 80);
        andd2.addCollide(this, this.playerShape2);

        var displaceY = 1440;

        var spikesl = new Spike(this, 2900+levelDisplace, 1195, 3800, 100, 0xff0000, this.hp);
        spikesl.setAlpha(0);
        spikesl.addPlayerCollide(this, this.playerShape, this.playerShape2, this.English, iniXL, iniYL, iniXS, iniYS);
        var spikesd = new Spike(this, 2258+levelDisplace, 1199 + displaceY, 384, 96, 0xff0000, this.hp);
        spikesd.setAlpha(0);
        spikesd.addPlayerCollide(this, this.playerShape2, this.playerShape, this.English, iniXS, iniYS, iniXL, iniYL);

        //PLATAFORMAS
        //Móviles
        var mpl = new MovingPlatform(this, 650+levelDisplace, 1200, 'woodP');
        mpl.addPlayerCollide(this, this.playerShape);
        mpl.setMovement(this, 0, -325);
        var mpl2 = new MovingPlatform(this, 2258+levelDisplace, 1000, 'woodP');
        mpl2.addPlayerCollide(this, this.playerShape);
        this.mpl2 = mpl2;

        var mpl3 = new MovingPlatform(this, 3400+levelDisplace, 1175 + displaceY, 'woodP');
        mpl3.addPlayerCollide(this, this.playerShape2);
        mpl3.setMovement(this, 0, -175);

        var mpl4 = new MovingPlatform(this, 3400+levelDisplace, 1100, 'woodP');
        mpl4.addPlayerCollide(this, this.playerShape);
        mpl4.setMovement(this, 0, -175);

        //SUELO
        //J Superior
        var floor1L = this.add.rectangle(2000+levelDisplace, 1295, 3800, 100, 0xff0000);
        floor1L.setAlpha(0);
        this.physics.add.existing(floor1L, 1);
        this.physics.add.collider(this.playerShape, floor1L);

        var floor2L = this.add.rectangle(2000+levelDisplace, 1295, 3800, 100, 0xff0000);
        floor2L.setAlpha(0);
        this.physics.add.existing(floor2L, 1);
        this.physics.add.collider(this.playerShape, floor2L);

        var floor3L = this.add.rectangle(1778+levelDisplace, 670, 2016, 192, 0xff0000);
        floor3L.setAlpha(0);
        this.physics.add.existing(floor3L, 1);
        this.physics.add.collider(this.playerShape, floor3L);

        //J Inferior
        var floor1S = this.add.rectangle(2000+levelDisplace, 1295 + displaceY, 3800, 100, 0xff0000);
        floor1S.setAlpha(0);
        this.physics.add.existing(floor1S, 1);
        this.physics.add.collider(this.playerShape2, floor1S);

        var floor2S = this.add.rectangle(1010+levelDisplace, 1199 + displaceY, 96, 96, 0xff0000);
        floor2S.setAlpha(0);
        this.physics.add.existing(floor2S, 1);
        this.physics.add.collider(this.playerShape2, floor2S);

        var floor3S = this.add.rectangle(1202+levelDisplace, 1103 + displaceY, 288, 96, 0xff0000);
        floor3S.setAlpha(0);
        this.physics.add.existing(floor3S, 1);
        this.physics.add.collider(this.playerShape2, floor3S);

        var floor4S = this.add.rectangle(1442+levelDisplace, 1007 + displaceY, 192, 96, 0xff0000);
        floor4S.setAlpha(0);
        this.physics.add.existing(floor4S, 1);
        this.physics.add.collider(this.playerShape2, floor4S);

        var floor5S = this.add.rectangle(1682+levelDisplace, 911 + displaceY, 288, 96, 0xff0000);
        floor5S.setAlpha(0);
        this.physics.add.existing(floor5S, 1);
        this.physics.add.collider(this.playerShape2, floor5S);

        var floor6S = this.add.rectangle(1874+levelDisplace, 815 + displaceY, 96, 96, 0xff0000);
        floor6S.setAlpha(0);
        this.physics.add.existing(floor6S, 1);
        this.physics.add.collider(this.playerShape2, floor6S);

        var floor7S = this.add.rectangle(1970+levelDisplace, 719 + displaceY, 96, 96, 0xff0000);
        floor7S.setAlpha(0);
        this.physics.add.existing(floor7S, 1);
        this.physics.add.collider(this.playerShape2, floor7S);

        var floor8S = this.add.rectangle(2546+levelDisplace, 719 + displaceY, 96, 96, 0xff0000);
        floor8S.setAlpha(0);
        this.physics.add.existing(floor8S, 1);
        this.physics.add.collider(this.playerShape2, floor8S);
        this.sc = this;

        //PUERTA
        var doorStart = this.add.sprite(1500+levelDisplace, 360, 'doorStart');
        doorStart.setScale(0.5, 0.5);
        doorStart.setDepth(100);
        var doorButton = new Button(this, 500+levelDisplace, 1150 + displaceY, 1550+levelDisplace, 350, 'greenButton', 'door');
        doorButton.addCollideDoor(this, this.playerShape);
        doorButton.addCollideButton(this, this.playerShape2);

        //BOTÓN QUE ACTIVA EL PUENTE
        var bridgeButton = this.add.sprite(2300+levelDisplace, 490, 'redButton');

        this.physics.add.existing(bridgeButton, 1);
        this.anims.create({
            key: 'pressedR',
            frames: this.anims.generateFrameNumbers('redButton', {start: 0, end: 2}),
            frameRate: 10
        });
        var bridge = this.add.sprite(2258+levelDisplace, 719 + displaceY, 'bridge');
        var bridgePhysics = this.physics.add.existing(bridge, 1);
        bridgePhysics.body.setSize(480, 66);
        this.anims.create({
            key: 'activated',
            frames: this.anims.generateFrameNumbers('bridge', {start: 0, end: 4}),
            frameRate: 10
        });
        this.physics.add.collider(this.playerShape, bridgeButton, function(){
            bridge.anims.play('activated', false);
            bridgeButton.anims.play('pressedR', false);
            this.sc.sound.add("door1FX", { volume: 1, loop: false }).play();
            this.physics.add.collider(this.playerShape2, bridge);
        }, null, this);

        //PALANCAS QUE MUEVEN LA PLATAFORMA
        var leverLeft = this.add.sprite(2690+levelDisplace, 1179 + displaceY, 'lever');
        this.physics.add.existing(leverLeft, 1);
        var leverRight = this.add.sprite(2930+levelDisplace, 1179 + displaceY, 'lever');
        this.physics.add.existing(leverRight, 1);
        leverRight.flipX = true;

        this.anims.create({
            key: 'unpull',
            frames: this.anims.generateFrameNumbers('lever', {start: 0, end: 0}),
            frameRate: 10
        });
        this.anims.create({
            key: 'pull',
            frames: this.anims.generateFrameNumbers('lever', {start: 3, end: 3}),
            frameRate: 10
        });

        this.physics.add.overlap(this.playerShape2, leverLeft, function(){
            leverLeft.anims.play('pull', false);
            leverRight.anims.play('unpull', false);
        }, null, this);
        this.physics.add.overlap(this.playerShape2, leverRight, function(){
            leverRight.anims.play('pull', false);
            leverLeft.anims.play('unpull', false);
        }, null, this);

        this.leverLeft = leverLeft;
        this.leverRight = leverRight;
        this.overlapped1 = false;
        this.overlapped2 = false;

        //Meta
        this.goal.setPosition(3750+levelDisplace, 1125);
    }

    preload(){
    }

    create() {
        //Reset música
        this.am.bgMusic.stop();
        this.am.bgMusicPlaying = false;

        //Audio Manager
        if (this.am.musicOn === true && this.am.bgMusicPlaying === false) {
            this.bgMusic = this.sound.add("ingameMS", { volume: 0.7, loop: true });
            this.bgMusic.play();
            this.am.bgMusicPlaying = true;
        }

        //Inicio jugador 1
        var iniXL = 300;
        var iniYL = 875;
        this.playerShape = this.add.sprite(iniXL, iniYL, 'light');
        this.playerShape.setDepth(10);
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

        //Inicio jugador 2
        var iniXS = 300;
        var iniYS = 2300;
        this.playerShape2 = this.add.sprite(iniXS, iniYS, 'shadow');
        this.playerShape2.setDepth(10);
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

        this.playerPhysics = this.physics.add.existing(this.playerShape, 0);
        this.playerPhysics2 = this.physics.add.existing(this.playerShape2, 0);


        //CÁMARAS
        this.cameraMain = this.cameras.main;
        this.cameraMain.setSize(1920,540);
        this.camera2 = this.cameras.add(0,540, 1920, 540);

        this.cameraMain.startFollow(this.playerShape);
        this.camera2.startFollow(this.playerShape2);

        //VIDA
        this.hp = new Life(this, this.English, this.playerShape, this.playerShape2);


        //CONTROL Y MOVIMIENTO
        this.keyMovement = this.input.keyboard.addKeys('A, D, W, ESC, SPACE');
        this.playerProta = true;

        //Meta
        this.goal = this.add.rectangle(3750, 1125, 300, 5000, 0x000000);
        this.goal.setAlpha(0);
        var goalPhysics = this.physics.add.existing(this.goal, 1);
        this.physics.add.overlap(this.playerPhysics,goalPhysics);
        this.physics.add.overlap(this.playerPhysics2,goalPhysics);

        this.actualLevel = 0;

        this.generateLevel1(0);
        this.generateLevel2(5000);
        this.generateLevel3(10000);
        this.generateLevel4(15000);
        this.generateLevel5(20000);
        this.generateLevel6(25000);

        this.actualLevel = 7;
        this.generateLevel7(30000);
    }

    update(){
        /* if (passedlevelcounter)
         updatinglevels = 2;
         */
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

        if(this.actualLevel == 7){
            if (this.physics.world.overlap(this.playerShape2, this.leverLeft)){
                this.mpl2.movingPlatformPhysics.body.setVelocityX(-100);
                if(!this.overlapped1){
                    this.sc.sound.add("leverFX", { volume: 1, loop: false }).play();
                    this.overlapped1=true;
                }

            } else if (this.physics.world.overlap(this.playerShape2, this.leverRight)){
                this.mpl2.movingPlatformPhysics.body.setVelocityX(100);
                if(!this.overlapped2){
                    this.sc.sound.add("leverFX", { volume: 1, loop: false }).play();
                    this.overlapped2=true;
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

    /*async syncLoadPhysics(playerShape,mode){
        
        return await this.physics.add.existing(playerShape, mode);
    }*/

    //Función para configurar espejo
    setInteractiveMirror(mirror, correctPosition){
        mirror.mirror.setInteractive().on('pointerup', function(){  //Ciclo del espejo
            mirror.mirrorPosition = (mirror.mirrorPosition +1)%8;
            this.scene.sound.add("mirrorFX", { volume: 1, loop: false }).play();

            switch(mirror.mirrorPosition){
                case 0:
                    mirror.mirror.anims.play('pos0', false);
                    break;
                case 1:
                    mirror.mirror.anims.play('pos1', false);
                    break;
                case 2:
                    mirror.mirror.anims.play('pos2', false);
                    break;
                case 3:
                    mirror.mirror.anims.play('pos3', false);
                    break;
                case 4:
                    mirror.mirror.anims.play('pos4', false);
                    break;
                case 5:
                    mirror.mirror.anims.play('pos5', false);
                    break;
                case 6:
                    mirror.mirror.anims.play('pos6', false);
                    break;
                case 7:
                    mirror.mirror.anims.play('pos7', true);
                    break;
                default:
            }
            if(mirror.mirrorPosition == correctPosition){
                mirror.setActive(true);
            }
            else{
                mirror.setActive(false);
            }

        });
    }
}