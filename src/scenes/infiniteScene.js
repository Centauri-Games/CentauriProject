class infiniteScene extends Phaser.Scene {
    constructor(){
        super("infiniteScene");
    }

    init(data){
        this.English = data.english;
        this.am = data.am;
        this.device = data.device;
    }

    levelGenerator(){

        //Generar numero aleatorio diferente al anterior nivel
        var level;
        do {
            level = Math.floor((Math.random() * 10) + 1);
        }while(level == this.actualLevel)
        this.levelDisplace = this.levelCounter * 5000;

        this.initialTime = this.totalTime - Math.floor(this.levelCounter/3) *30;    //Cada 3 niveles, el tiempo disminuye
        if(this.initialTime < 60)   //El tiempo minimo es 1 min
            this.initialTime = 60;

        if(this.actualLevel == 6){  //Si el ultimo nivel fue el 6, reset a sprites normales
            this.playerShape.setTexture("light").setScale(1,1);
            this.playerPhysics.body.setSize(65, 80);
            this.playerShape2.setTexture("shadow").setScale(1,1);
            this.playerPhysics2.body.setSize(65, 80);
        }

        level = 10;
        this.hp.resetDamage();  //Resetea las vidas para el siguiente nivel

        switch(level) {
            case 1:
                this.actualLevel = 1;
                this.generateLevel1(this.levelDisplace);
                this.levelCounter++;
                break;
            case 2:
                this.actualLevel = 2;
                this.generateLevel2(this.levelDisplace);
                this.levelCounter++;
                break;
            case 3:
                this.actualLevel = 3;
                this.generateLevel3(this.levelDisplace);
                this.levelCounter++;
                break;
            case 4:
                this.actualLevel = 4;
                this.generateLevel4(this.levelDisplace);
                this.levelCounter++;
                break;
            case 5:
                this.actualLevel = 5;
                this.generateLevel5(this.levelDisplace);
                this.levelCounter++;
                break;
            case 6:
                this.actualLevel = 6;
                this.generateLevel6(this.levelDisplace);
                this.levelCounter++;
                break;
            case 7:
                this.actualLevel = 7;
                this.generateLevel7(this.levelDisplace);
                this.levelCounter++;
                break;
            case 8:
                this.actualLevel = 8;
                this.generateLevel8(this.levelDisplace);
                this.levelCounter++;
                break;
            case 9:
                this.actualLevel = 9;
                this.generateLevel9(this.levelDisplace);
                this.levelCounter++;
                break;
            case 10:
                this.actualLevel = 10;
                this.generateLevel10(this.levelDisplace);
                this.levelCounter++;
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

        var spl7 = new StaticPlatform(this, 3200 +levelDisplace, 200, 'woodP');
        spl7.rotate(Math.PI);
        spl7.addPlayerCollide(this, this.playerShape);

        var spd7 = new StaticPlatform(this, 3200+levelDisplace, 200+displaceY, 'woodP');
        spd7.rotate(Math.PI);
        spd7.addPlayerCollide(this, this.playerShape2);

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

        //Meta
        this.goal1 = this.add.rectangle(3800+levelDisplace, 1125, 300, 5000, 0x000000);
        this.goal1.setAlpha(0);
        var goalPhysics = this.physics.add.existing(this.goal1, 1);
        this.physics.add.overlap(this.playerPhysics,goalPhysics);
        this.physics.add.overlap(this.playerPhysics2,goalPhysics);
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
        this.goal2 = this.add.rectangle(3800+levelDisplace, 1125, 300, 5000, 0x000000);
        this.goal2.setAlpha(0);
        var goalPhysics = this.physics.add.existing(this.goal2, 1);
        this.physics.add.overlap(this.playerPhysics,goalPhysics);
        this.physics.add.overlap(this.playerPhysics2,goalPhysics);
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
        this.goal3 = this.add.rectangle(3800+levelDisplace, 1125, 300, 5000, 0x000000);
        this.goal3.setAlpha(0);
        var goalPhysics = this.physics.add.existing(this.goal3, 1);
        this.physics.add.overlap(this.playerPhysics,goalPhysics);
        this.physics.add.overlap(this.playerPhysics2,goalPhysics);
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

    generateLevel8(levelDisplace){
        this.bg = this.add.sprite(960,540,'bg4');
        this.bg.setDepth(-2);
        this.bg.setScrollFactor(0);

        var iniXL = 300+levelDisplace;
        var iniYL = 675;

        var iniXS = 300+levelDisplace;
        var iniYS = 2100;

        this.playerShape.setPosition(iniXL, iniYL);
        this.playerShape2.setPosition(iniXS, iniYS);

        var displaceY = 1440;

        //ZONA FINAL
        var nextLevel1 = this.add.zone(1900+levelDisplace,800,100,100);  //NEXT LEVEL
        var nextLevel2 = this.add.zone(1900+levelDisplace,800+displaceY,100,100);  //NEXT LEVEL
        this.physics.add.existing(nextLevel1, 1);
        this.physics.add.existing(nextLevel2, 1);

        this.physics.add.overlap(this.playerPhysics,nextLevel1);
        this.physics.add.overlap(this.playerPhysics2,nextLevel2);

        //TILEMAP
        var map = this.add.tilemap('map8');
        var tileset = map.addTilesetImage('tileset', 'tiles');
        var walls = map.createStaticLayer('Pared', tileset, levelDisplace,0);
        map.createStaticLayer('Suelo',tileset,levelDisplace,0);
        map.createStaticLayer('Suelo2',tileset,levelDisplace,0);

        walls.setCollision([12,13,14,19,20,21]);

        this.physics.add.collider(walls, this.playerShape);
        this.physics.add.collider(walls, this.playerShape2);

        //CÁMARAS
        this.cameraMain.setBounds(levelDisplace,0,4032,1440);
        this.camera2.setBounds(levelDisplace,1440,4032, 1440);


        //ANDAMIOS
        var andl = new Scaffold(this, 300+levelDisplace, 935, 'andamio', 350, 500, 20, 80);
        andl.addCollide(this, this.playerShape); //Inicio superior

        var andd = new Scaffold(this, 300+levelDisplace, 935+displaceY, 'andamio', 350, 500, 20, 80);
        andd.addCollide(this, this.playerShape2);    //Inicio inferior

        var andl2 = new Scaffold(this, 3750+levelDisplace, 935, 'andamio', 350, 500, 20, 80);
        andl2.addCollide(this, this.playerShape);

        var andd2 = new Scaffold(this, 3750+levelDisplace, 935+displaceY, 'andamio', 350, 500, 20, 80);
        andd2.addCollide(this, this.playerShape2);


        //SUELO
        var floor1 = this.add.rectangle(2000+levelDisplace, 1265, 3800, 100, 0xff0000);
        floor1.setAlpha(0);
        this.physics.add.existing(floor1, 1);
        this.physics.add.collider(this.playerShape, floor1);

        var floor2 = this.add.rectangle(2000+levelDisplace, 1265+displaceY, 3800, 100, 0xff0000);
        floor2.setAlpha(0);
        this.physics.add.existing(floor2, 1);
        this.physics.add.collider(this.playerShape2, floor2);

        //PLATAFORMAS
        var mp1 = new MovingPlatform(this, 1500+levelDisplace, 800, 'blueP');
        mp1.addPlayerCollide(this, this.playerShape);
        mp1.setMovement(this, 0, 200);

        var mp2 = new MovingPlatform(this, 2300+levelDisplace, 800, 'blueP');
        mp2.addPlayerCollide(this, this.playerShape);
        mp2.setMovement(this, 0, 200);

        var mp3 = new MovingPlatform(this, 1500+levelDisplace, 800+displaceY, 'blueP');
        mp3.addPlayerCollide(this, this.playerShape2);
        mp3.setMovement(this, 0, 200);

        var mp4 = new MovingPlatform(this, 2300+levelDisplace, 800+displaceY, 'blueP');
        mp4.addPlayerCollide(this, this.playerShape2);
        mp4.setMovement(this, 0, 200);

        var portal1 = this.add.sprite(1900+levelDisplace, 800, 'portalR').setDepth(15);
        portal1.setScale(2,2);
        this.physics.add.existing(portal1,1);

        var playerShape = this.playerShape;
        var playerPhysics = this.playerPhysics;
        this.physics.add.collider(this.playerShape, portal1, function(){
            playerShape.setPosition(portal1.x, portal1.y);
            playerPhysics.body.setImmovable(true);
            playerPhysics.body.moves =false;
        });

        var playerShape2 = this.playerShape2;
        var playerPhysics2 = this.playerPhysics2;
        var portal2 = this.add.sprite(1900+levelDisplace, 800+displaceY, 'portalR').setDepth(15);
        portal2.setScale(2,2);
        this.physics.add.existing(portal2,1);
        this.physics.add.collider(this.playerShape2, portal2, function(){
            playerShape2.setPosition(portal2.x, portal2.y);
            playerPhysics2.body.setImmovable(true);
            playerPhysics2.body.moves =false;
        })

        this.nextLevel1 = nextLevel1;
        this.nextLevel2 = nextLevel2;
    }

    preload(){
      
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
        this.goal4 = this.add.rectangle(3800+levelDisplace, 1125, 300, 5000, 0x000000);
        this.goal4.setAlpha(0);
        var goalPhysics = this.physics.add.existing(this.goal4, 1);
        this.physics.add.overlap(this.playerPhysics,goalPhysics);
        this.physics.add.overlap(this.playerPhysics2,goalPhysics);
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
        this.goal5 = this.add.rectangle(3800+levelDisplace, 1125, 300, 5000, 0x000000);
        this.goal5.setAlpha(0);
        var goalPhysics = this.physics.add.existing(this.goal5, 1);
        this.physics.add.overlap(this.playerPhysics,goalPhysics);
        this.physics.add.overlap(this.playerPhysics2,goalPhysics);
    }

    generateLevel6(levelDisplace){
        this.bg = this.add.sprite(960,540,'bg4');
        this.bg.setDepth(-2);
        this.bg.setScrollFactor(0);

        var iniXL = 3600+levelDisplace;
        var iniYL = 650;

        var iniXS = 3600+levelDisplace;
        var iniYS = 2090;

        this.playerShape.setTexture("light6").setScale(0.8,0.8);
        this.playerShape2.setTexture("shadow6").setScale(0.8,0.8);
        this.playerPhysics.body.setSize(80, 120);
        this.playerPhysics2.body.setSize(80, 120);

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
        this.goal6 = this.add.rectangle(3750+levelDisplace, 1125, 300, 5000, 0x000000);
        this.goal6.setAlpha(0);
        var goalPhysics = this.physics.add.existing(this.goal6, 1);
        this.physics.add.overlap(this.playerPhysics,goalPhysics);
        this.physics.add.overlap(this.playerPhysics2,goalPhysics);

        this.canJump = true;
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
        this.goal7 = this.add.rectangle(3800+levelDisplace, 1125, 300, 5000, 0x000000);
        this.goal7.setAlpha(0);
        var goalPhysics = this.physics.add.existing(this.goal7, 1);
        this.physics.add.overlap(this.playerPhysics,goalPhysics);
        this.physics.add.overlap(this.playerPhysics2,goalPhysics);
    }

    generateLevel8(levelDisplace){
        this.bg = this.add.sprite(960,540,'bg4');
        this.bg.setDepth(-2);
        this.bg.setScrollFactor(0);

        var iniXL = 300+levelDisplace;
        var iniYL = 675;

        var iniXS = 300+levelDisplace;
        var iniYS = 2100;

        this.playerShape.setPosition(iniXL, iniYL);
        this.playerShape2.setPosition(iniXS, iniYS);

        var displaceY = 1440;

        //ZONA FINAL
        var nextLevel1 = this.add.zone(1900+levelDisplace,800,100,100);  //NEXT LEVEL
        var nextLevel2 = this.add.zone(1900+levelDisplace,800+displaceY,100,100);  //NEXT LEVEL
        this.physics.add.existing(nextLevel1, 1);
        this.physics.add.existing(nextLevel2, 1);

        this.physics.add.overlap(this.playerPhysics,nextLevel1);
        this.physics.add.overlap(this.playerPhysics2,nextLevel2);

        //TILEMAP
        var map = this.add.tilemap('map8');
        var tileset = map.addTilesetImage('tileset', 'tiles');
        var walls = map.createStaticLayer('Pared', tileset, levelDisplace,0);
        map.createStaticLayer('Suelo',tileset,levelDisplace,0);
        map.createStaticLayer('Suelo2',tileset,levelDisplace,0);

        walls.setCollision([12,13,14,19,20,21]);

        this.physics.add.collider(walls, this.playerShape);
        this.physics.add.collider(walls, this.playerShape2);

        //CÁMARAS
        this.cameraMain.setBounds(levelDisplace,0,4032,1440);
        this.camera2.setBounds(levelDisplace,1440,4032, 1440);


        //ANDAMIOS
        var andl = new Scaffold(this, 300+levelDisplace, 935, 'andamio', 350, 500, 20, 80);
        andl.addCollide(this, this.playerShape); //Inicio superior

        var andd = new Scaffold(this, 300+levelDisplace, 935+displaceY, 'andamio', 350, 500, 20, 80);
        andd.addCollide(this, this.playerShape2);    //Inicio inferior

        var andl2 = new Scaffold(this, 3750+levelDisplace, 935, 'andamio', 350, 500, 20, 80);
        andl2.addCollide(this, this.playerShape);

        var andd2 = new Scaffold(this, 3750+levelDisplace, 935+displaceY, 'andamio', 350, 500, 20, 80);
        andd2.addCollide(this, this.playerShape2);


        //SUELO
        var floor1 = this.add.rectangle(2000+levelDisplace, 1265, 3800, 100, 0xff0000);
        floor1.setAlpha(0);
        this.physics.add.existing(floor1, 1);
        this.physics.add.collider(this.playerShape, floor1);

        var floor2 = this.add.rectangle(2000+levelDisplace, 1265+displaceY, 3800, 100, 0xff0000);
        floor2.setAlpha(0);
        this.physics.add.existing(floor2, 1);
        this.physics.add.collider(this.playerShape2, floor2);

        //PLATAFORMAS
        var mp1 = new MovingPlatform(this, 1500+levelDisplace, 800, 'blueP');
        mp1.addPlayerCollide(this, this.playerShape);
        mp1.setMovement(this, 0, 200);

        var mp2 = new MovingPlatform(this, 2300+levelDisplace, 800, 'blueP');
        mp2.addPlayerCollide(this, this.playerShape);
        mp2.setMovement(this, 0, 200);

        var mp3 = new MovingPlatform(this, 1500+levelDisplace, 800+displaceY, 'blueP');
        mp3.addPlayerCollide(this, this.playerShape2);
        mp3.setMovement(this, 0, 200);

        var mp4 = new MovingPlatform(this, 2300+levelDisplace, 800+displaceY, 'blueP');
        mp4.addPlayerCollide(this, this.playerShape2);
        mp4.setMovement(this, 0, 200);

        var portal1 = this.add.sprite(1900+levelDisplace, 800, 'portalR').setDepth(15);
        portal1.setScale(2,2);
        this.physics.add.existing(portal1,1);

        var playerShape = this.playerShape;
        var playerPhysics = this.playerPhysics;
        this.physics.add.collider(this.playerShape, portal1, function(){
            playerShape.setPosition(portal1.x, portal1.y);
            playerPhysics.body.setImmovable(true);
            playerPhysics.body.moves =false;
        });

        var playerShape2 = this.playerShape2;
        var playerPhysics2 = this.playerPhysics2;
        var portal2 = this.add.sprite(1900+levelDisplace, 800+displaceY, 'portalR').setDepth(15);
        portal2.setScale(2,2);
        this.physics.add.existing(portal2,1);
        this.physics.add.collider(this.playerShape2, portal2, function(){
            playerShape2.setPosition(portal2.x, portal2.y);
            playerPhysics2.body.setImmovable(true);
            playerPhysics2.body.moves =false;
        })

        this.nextLevel1 = nextLevel1;
        this.nextLevel2 = nextLevel2;
    }

    generateLevel9(levelDisplace){
        this.bg = this.add.sprite(960,540,'bg2');
        this.bg.setDepth(-2);
        this.bg.setScrollFactor(0);

        var iniXL = 300+levelDisplace;
        var iniYL = 2600;

        var iniXS = 300+levelDisplace;
        var iniYS = 2600;

        this.playerShape.setPosition(iniXL, iniYL);
        this.playerShape2.setPosition(iniXS, iniYS);

        //TILEMAP
        var map = this.add.tilemap('map9');
        var tileset = map.addTilesetImage('tileset', 'tiles');
        var walls = map.createStaticLayer('Pared', tileset, levelDisplace,0);
        map.createStaticLayer('Suelo',tileset,levelDisplace,0);

        walls.setCollision([12,13,19,20]);

        this.physics.add.collider(walls, this.playerShape);
        this.physics.add.collider(walls, this.playerShape2);

        //CÁMARAS
        this.cameraMain.setBounds(levelDisplace,0,4032, 3072);
        this.camera2.setBounds(levelDisplace,0,4032, 3072);

        //SUELO
        var floor1 = this.add.rectangle(1700+levelDisplace, 2700, 3800, 100, 0xff0000);
        floor1.setAlpha(0);
        this.physics.add.existing(floor1, 1);
        this.physics.add.collider(this.playerShape, floor1);
        this.physics.add.collider(this.playerShape2, floor1);

        var floor2 = this.add.rectangle(3760+levelDisplace, 2325, 600, 100, 0xff0000);
        floor2.setAlpha(0);
        this.physics.add.existing(floor2, 1);
        this.physics.add.collider(this.playerShape, floor2);
        this.physics.add.collider(this.playerShape2, floor2);

        var floor3 = this.add.rectangle(3760+levelDisplace, 1475, 600, 100, 0xff0000);
        floor3.setAlpha(0);
        this.physics.add.existing(floor3, 1);
        this.physics.add.collider(this.playerShape, floor3);
        this.physics.add.collider(this.playerShape2, floor3);

        var floor4 = this.add.rectangle(2705+levelDisplace, 1275, 800, 100, 0xff0000);
        floor4.setAlpha(0);
        this.physics.add.existing(floor4, 1);
        this.physics.add.collider(this.playerShape, floor4);
        this.physics.add.collider(this.playerShape2, floor4);

        var floor5 = this.add.rectangle(1300+levelDisplace, 1275, 1100, 100, 0xff0000);
        floor5.setAlpha(0);
        this.physics.add.existing(floor5, 1);
        this.physics.add.collider(this.playerShape, floor5);
        this.physics.add.collider(this.playerShape2, floor5);

        var floor6 = this.add.rectangle(1800+levelDisplace, 1950, 1100, 100, 0xff0000);
        floor6.setAlpha(0);
        this.physics.add.existing(floor6, 1);
        this.physics.add.collider(this.playerShape, floor6);
        this.physics.add.collider(this.playerShape2, floor6);

        //PORTAL
        var nextLevel = this.add.zone(400+levelDisplace,1400,100,100);
        this.physics.add.existing(nextLevel, 1);
        this.physics.add.overlap(nextLevel, this.playerPhysics);
        this.physics.add.overlap(nextLevel, this.playerPhysics2);

        var portal1 = this.add.sprite(400+levelDisplace, 1400, 'portalA').setDepth(15);
        portal1.setScale(3,3);
        this.physics.add.existing(portal1,1);

        var playerShape = this.playerShape;
        var playerPhysics = this.playerPhysics;
        var playerShape2 = this.playerShape2;
        var playerPhysics2 = this.playerPhysics2;

        this.physics.add.collider(this.playerShape, portal1, function(){
            playerShape.setPosition(portal1.x, portal1.y);
            playerPhysics.body.setImmovable(true);
            playerPhysics.body.moves =false;
        });
        this.physics.add.collider(this.playerShape2, portal1, function(){
            playerShape2.setPosition(portal1.x, portal1.y);
            playerPhysics2.body.setImmovable(true);
            playerPhysics2.body.moves =false;
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
        var sp1 = new StaticPlatform(this, 1100+levelDisplace, 2600, 'woodP');
        var sp2 = new StaticPlatform(this, 1200+levelDisplace, 2525, 'woodP');
        var sp3 = new StaticPlatform(this, 1300+levelDisplace, 2475, 'woodP');
        var sp4 = new StaticPlatform(this, 1400+levelDisplace, 2425, 'woodP');
        var sp5 = new StaticPlatform(this, 1500+levelDisplace, 2475, 'woodP');
        var sp6 = new StaticPlatform(this, 1600+levelDisplace, 2525, 'woodP');
        var sp7 = new StaticPlatform(this, 1700+levelDisplace, 2600, 'woodP');

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

        var mp1 = new MovingPlatform(this, 3100+levelDisplace, 2350, 'greenP'); //Plataforma verde
        mp1.addPlayerCollide(this, playerShape);
        mp1.addPlayerCollide(this, playerShape2);

        var mp2 = new MovingPlatform(this, 3350+levelDisplace, 2300, 'yellowP'); //Plataforma amarilla
        mp2.addPlayerCollide(this, playerShape);
        mp2.addPlayerCollide(this, playerShape2);

        var mp3 = new MovingPlatform(this, 2050+levelDisplace, 1850, 'pinkP'); //Plataforma rosa
        mp3.addPlayerCollide(this, playerShape);
        mp3.addPlayerCollide(this, playerShape2);

        //PUERTAS
        var pinkDoor = new Door(this, 800+levelDisplace, 2448, 'pinkDoor');
        pinkDoor.addPlayerCollide(playerShape);
        pinkDoor.addPlayerCollide(playerShape2);
        var blueDoor = new Door(this, 800+levelDisplace, 1008, 'blueDoor');
        blueDoor.addPlayerCollide(playerShape2);
        blueDoor.addPlayerCollide(playerShape);


        //PLACAS
        var p1 = new pressurePlate(this, 400+levelDisplace, 2650, 'pressurePink', playerShape, playerShape2); //Pink door button
        p1.addPlayerCollide(playerShape);
        p1.addPlayerCollide(playerShape2);
        p1.addAttach(pinkDoor);

        var p2 = new pressurePlate(this, 600+levelDisplace, 2650, 'pressureGreen', playerShape, playerShape2); //Pink door button
        p2.addPlayerCollide(playerShape);
        p2.addPlayerCollide(playerShape2);
        p2.addAttach(mp1);

        var p3 = new pressurePlate(this, 3600+levelDisplace, 2270, 'pressureYellow', playerShape, playerShape2); //Yellow platform
        p3.addPlayerCollide(playerShape);
        p3.addPlayerCollide(playerShape2);
        p3.addAttach(mp2);

        var p4 = new pressurePlate(this, 3800+levelDisplace, 2270, 'pressurePink', playerShape, playerShape2); //Pink door
        p4.addPlayerCollide(playerShape);
        p4.addPlayerCollide(playerShape2);
        p4.addAttach(pinkDoor);

        var p5 = new pressurePlate(this, 2900+levelDisplace, 1215, 'pressureYellow', playerShape, playerShape2); //Yellow platform
        p5.addPlayerCollide(playerShape);
        p5.addPlayerCollide(playerShape2);
        p5.addAttach(mp2);

        var p6 = new pressurePlate(this, 1800+levelDisplace, 1215, 'pressurePink', playerShape, playerShape2); //Pink platform 1
        p6.addPlayerCollide(playerShape);
        p6.addPlayerCollide(playerShape2);
        p6.addAttach(mp3);

        var p7 = new pressurePlate(this, 1600+levelDisplace, 1895, 'pressurePink', playerShape, playerShape2); //Pink platform 2
        p7.addPlayerCollide(playerShape);
        p7.addPlayerCollide(playerShape2);
        p7.addAttach(mp3);

        var p8 = new pressurePlate(this, 1200+levelDisplace, 1215, 'pressureBlue', playerShape, playerShape2); //Blue door
        p8.addPlayerCollide(playerShape);
        p8.addPlayerCollide(playerShape2);
        p8.addAttach(blueDoor);

        this.nextLevel = nextLevel;

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

    generateLevel10(levelDisplace){
        this.bg = this.add.sprite(960,540,'bg4');
        this.bg.setDepth(-2);
        this.bg.setScrollFactor(0);

        var iniXL = 300+levelDisplace;
        var iniYL = 875;

        var iniXS = 300+levelDisplace;
        var iniYS = 2300;

        this.playerShape.setPosition(iniXL, iniYL);
        this.playerShape2.setPosition(iniXS, iniYS);

        //TILEMAP
        var map = this.add.tilemap('map10');
        var tileset = map.addTilesetImage('tileset', 'tiles');
        var walls = map.createStaticLayer('Pared', tileset, levelDisplace,0);
        map.createStaticLayer('Suelo',tileset,levelDisplace,0);
        map.createStaticLayer('Suelo2',tileset,levelDisplace,0);
        map.createStaticLayer('Pinchos',tileset,levelDisplace,0);

        walls.setCollision([12,13]);

        this.physics.add.collider(walls, this.playerShape);
        this.physics.add.collider(walls, this.playerShape2);

        //CÁMARAS
        this.cameraMain.setBounds(levelDisplace,0,4032, 1440);
        this.camera2.setBounds(levelDisplace,0,4032, 2880);


        //ANDAMIOS
        var andl = new Scaffold(this, 300+levelDisplace, 1125, 'andamio', 350, 500, 20, 80);
        andl.addCollide(this, this.playerShape); //Inicio superior

        var andd = new Scaffold(this, 300+levelDisplace, 2570, 'andamio', 350, 500, 20, 80);
        andd.addCollide(this, this.playerShape2);    //Inicio inferior

        var andl2 = new Scaffold(this, 3750+levelDisplace, 1125, 'andamio', 350, 500, 20, 80);
        andl2.addCollide(this, this.playerShape);

        var andd2 = new Scaffold(this, 3750+levelDisplace, 2570, 'andamio', 350, 500, 20, 80);
        andd2.addCollide(this, this.playerShape2);

        var displaceY = 1440;

        var spikesD = new Spike(this, 1295+levelDisplace, 1200 + displaceY, 480, 100, 0xff0000, this.hp);
        spikesD.setAlpha(0);
        spikesD.addPlayerCollide(this, this.playerShape2, this.playerShape, this.English, iniXS, iniYS);

        var spikes2D = new Spike(this, 3023+levelDisplace, 1488 + displaceY, 864, 100, 0xff0000, this.hp);
        spikes2D.setAlpha(0);
        spikes2D.addPlayerCollide(this, this.playerShape2, this.playerShape, this.English, iniXS, iniYS);

        var spikes3D = new Spike(this, 1500+levelDisplace, 850 + displaceY, 480, 100, 0xff0000, this.hp);
        spikes3D.setAlpha(0);
        spikes3D.addPlayerCollide(this, this.playerShape2, this.playerShape, this.English, iniXS, iniYS);

        //PLATAFORMAS
        //Móviles
        var mpd = new MovingPlatform(this, 2000+levelDisplace, 2800, 'woodP');
        mpd.addPlayerCollide(this, this.playerShape2);
        mpd.setMovement(this, 0, -400);

        var mpd2 = new MovingPlatform(this, 3550+levelDisplace, 500 + displaceY, 'woodP');
        mpd2.addPlayerCollide(this, this.playerShape2);
        mpd2.setMovement(this, 0, -100);

        var mpd3 = new MovingPlatform(this, 675+levelDisplace, 800 + displaceY, 'woodP');
        mpd3.addPlayerCollide(this, this.playerShape2);
        mpd3.setMovement(this, 0, -200);

        //Estáticas
        var spl = new StaticPlatform(this, 600+levelDisplace, 1350, 'woodP');
        spl.addPlayerCollide(this, this.playerShape);

        var spl2 = new StaticPlatform(this, 850+levelDisplace, 1250, 'woodP');
        spl2.addPlayerCollide(this, this.playerShape);

        var spl3 = new StaticPlatform(this, 3455+levelDisplace, 1000, 'woodP');
        spl3.addPlayerCollide(this, this.playerShape);

        var spl4 = new StaticPlatform(this, 3050+levelDisplace, 500, 'woodP');
        spl4.addPlayerCollide(this, this.playerShape);


        //SUELO
        //J Superior
        var floor1L = this.add.rectangle(2000+levelDisplace, 1488, 3800, 100, 0xff0000);
        floor1L.setAlpha(0);
        this.physics.add.existing(floor1L, 1);
        this.physics.add.collider(this.playerShape, floor1L);

        var floor2L = this.add.rectangle(1295+levelDisplace, 1200, 672, 100, 0xff0000);
        floor2L.setAlpha(0);
        this.physics.add.existing(floor2L, 1);
        this.physics.add.collider(this.playerShape, floor2L);

        var floor3L = this.add.rectangle(1727+levelDisplace, 1104, 192, 100, 0xff0000);
        floor3L.setAlpha(0);
        this.physics.add.existing(floor3L, 1);
        this.physics.add.collider(this.playerShape, floor3L);

        var floor4L = this.add.rectangle(2015+levelDisplace, 1008, 384, 100, 0xff0000);
        floor4L.setAlpha(0);
        this.physics.add.existing(floor4L, 1);
        this.physics.add.collider(this.playerShape, floor4L);

        var floor5L = this.add.rectangle(2687+levelDisplace, 1200, 960, 100, 0xff0000);
        floor5L.setAlpha(0);
        this.physics.add.existing(floor5L, 1);
        this.physics.add.collider(this.playerShape, floor5L);

        var floor6L = this.add.rectangle(3359+levelDisplace, 1104, 384, 100, 0xff0000);
        floor6L.setAlpha(0);
        this.physics.add.existing(floor6L, 1);
        this.physics.add.collider(this.playerShape, floor6L);

        var floor7L = this.add.rectangle(719+levelDisplace, 912, 96, 100, 0xff0000);
        floor7L.setAlpha(0);
        this.physics.add.existing(floor7L, 1);
        this.physics.add.collider(this.playerShape, floor7L);

        var floor8L = this.add.rectangle(815+levelDisplace, 816, 96, 100, 0xff0000);
        floor8L.setAlpha(0);
        this.physics.add.existing(floor8L, 1);
        this.physics.add.collider(this.playerShape, floor8L);

        var floor9L = this.add.rectangle(911+levelDisplace, 720, 96, 100, 0xff0000);
        floor9L.setAlpha(0);
        this.physics.add.existing(floor9L, 1);
        this.physics.add.collider(this.playerShape, floor9L);

        var floor10L = this.add.rectangle(1103+levelDisplace, 624, 288, 100, 0xff0000);
        floor10L.setAlpha(0);
        this.physics.add.existing(floor10L, 1);
        this.physics.add.collider(this.playerShape, floor10L);

        var floor11L = this.add.rectangle(1439+levelDisplace, 528, 384, 100, 0xff0000);
        floor11L.setAlpha(0);
        this.physics.add.existing(floor11L, 1);
        this.physics.add.collider(this.playerShape, floor11L);

        var floor12L = this.add.rectangle(2303+levelDisplace, 432, 1344, 100, 0xff0000);
        floor12L.setAlpha(0);
        this.physics.add.existing(floor12L, 1);
        this.physics.add.collider(this.playerShape, floor12L);

        var floor13L = this.add.rectangle(3455+levelDisplace, 624, 960, 100, 0xff0000);
        floor13L.setAlpha(0);
        this.physics.add.existing(floor13L, 1);
        this.physics.add.collider(this.playerShape, floor13L);

        //J Inferior
        var floor1D = this.add.rectangle(2000+levelDisplace, 1488 + displaceY, 3800, 100, 0xff0000);
        floor1D.setAlpha(0);
        this.physics.add.existing(floor1D, 1);
        this.physics.add.collider(this.playerShape2, floor1D);

        var floor3D = this.add.rectangle(2303+levelDisplace, 1104 + displaceY, 384, 100, 0xff0000);
        floor3D.setAlpha(0);
        this.physics.add.existing(floor3D, 1);
        this.physics.add.collider(this.playerShape2, floor3D);

        var floor4D = this.add.rectangle(2447+levelDisplace, 672 + displaceY, 672, 196, 0xff0000);
        floor4D.setAlpha(0);
        this.physics.add.existing(floor4D, 1);
        this.physics.add.collider(this.playerShape2, floor4D);

        var floor5D = this.add.rectangle(3263+levelDisplace, 672 + displaceY, 576, 196, 0xff0000);  //Central derechoa
        floor5D.setAlpha(0);
        this.physics.add.existing(floor5D, 1);
        this.physics.add.collider(this.playerShape2, floor5D);

        var floor6D = this.add.rectangle(863+levelDisplace, 912 + displaceY, 384, 100, 0xff0000);
        floor6D.setAlpha(0);
        this.physics.add.existing(floor6D, 1);
        this.physics.add.collider(this.playerShape2, floor6D);

        var floor7D = this.add.rectangle(3090+levelDisplace, 1000 + displaceY, 800, 100, 0xff0000);
        floor7D.setAlpha(0);
        this.physics.add.existing(floor7D, 1);
        this.physics.add.collider(this.playerShape2, floor7D);

        //Meta
        var goal = this.add.rectangle(3800+levelDisplace, 1125, 300, 500, 0x000000);
        goal.setAlpha(0);
        var goalPhysics = this.physics.add.existing(goal, 1);
        this.physics.add.overlap(this.playerPhysics,goalPhysics);
        this.goal10 = goal;

        var goal2 = this.add.rectangle(3750+levelDisplace, 1125 + displaceY, 300, 500, 0x000000);
        goal2.setAlpha(0);
        var goalPhysics2 = this.physics.add.existing(goal2, 1);
        this.physics.add.overlap(this.playerPhysics2,goalPhysics2);
        this.goal102 = goal2;
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
        if(this.device == "mobile"){


            var keyMovement = {
                "A": { "isUp": true, "isDown": false },
                "D": { "isUp": true, "isDown": false },
                "W": { "isUp": true, "isDown": false },
                "ESC": { "isUp": true, "isDown": false },
                "SPACE": { "isUp": true, "isDown": false }
            };



            var right = this.add.sprite(1800, 430, 'rightIcon').setInteractive();
            right.setScrollFactor(0, 0);
            right.setScale(0.4);
            right.on('pointerout', function () {

                keyMovement.D.isUp = true;
                keyMovement.D.isDown = false;
            });
            right.on('pointerdown', function () {
                keyMovement.D.isDown = true;
                keyMovement.D.isUp = false;
            });
            cameraMain.ignore(right);
            ///////////////////////////////////
            let left = this.add.sprite(120, 430, 'leftIcon').setInteractive();
            left.setScale(0.4);
            left.setScrollFactor(0, 0);
            left.on('pointerout', function () {
                keyMovement.A.isUp = true;
                keyMovement.A.isDown = false;
            });
            left.on('pointerover', function () {
                keyMovement.A.isDown = true;
                keyMovement.A.isUp = false;
            });
            cameraMain.ignore(left);
            ////////////////////////////////////
            let jump = this.add.sprite(1820, 250, 'jumpIcon').setInteractive();
            jump.setScale(0.3);
            jump.setScrollFactor(0, 0);
            jump.on('pointerout', function () {
                keyMovement.W.isUp = true;
                keyMovement.W.isDown = false;
            });
            jump.on('pointerover', function () {
                keyMovement.W.isDown = true;
                keyMovement.W.isUp = false;
            });
            cameraMain.ignore(jump);
            ///////////////////////////////////////
            let jump2 = this.add.sprite(100, 250, 'jumpIcon').setInteractive();
            jump2.setScale(0.3);
            jump2.setScrollFactor(0, 0);
            jump2.on('pointerout', function () {
                keyMovement.W.isUp = true;
                keyMovement.W.isDown = false;
            });
            jump2.on('pointerover', function () {
                keyMovement.W.isDown = true;
                keyMovement.W.isUp = false;
            });
            cameraMain.ignore(jump2);
            //////////////////////////////
            let swap = this.add.sprite(120, 120, 'swapIcon').setInteractive();
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
            let pause = this.add.sprite(1800, 120, 'pauseIcon').setInteractive();
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

            this.keyMovement = keyMovement;

        }else{
            this.keyMovement = this.input.keyboard.addKeys('A, D, W, ESC, SPACE');
        }
        this.playerProta = true;

        this.actualLevel = 0;
        this.levelCounter = 0;
        this.levelGenerator();

        //Timer
        this.totalTime = 3*60;
        this.initialTime = 3*60;    //3 minutos de cuenta atrás
        this.timerText = this.add.text(iniXL, iniYL, this.formatTime(this.initialTime),{fill: '#ffffff' });
        this.timerText2 = this.add.text(iniXL, iniYL, this.formatTime(this.initialTime),{fill: '#ffffff' });
        this.timedEvent = this.time.addEvent({ delay: 1000, callback: this.updateTimer, callbackScope: this, loop: true });

        this.cameraMain.ignore(this.timerText2);
        this.camera2.ignore(this.timerText);

    }
    formatTime(seconds){
        var minutes = Math.floor(seconds/60);
        var partInSeconds = seconds%60;
        partInSeconds = partInSeconds.toString();
        return `${minutes}:${partInSeconds}`;
    }

    updateTimer()
    {
        this.initialTime -= 1;
        this.timerText.setText(this.formatTime(this.initialTime));
        this.timerText2.setText(this.formatTime(this.initialTime));
        if(this.initialTime == 0){
            this.scene.start("gameOverScene", {english: this.English,level : this.level, am: this.am});
        }
    }


    update(){
        this.timerText.setPosition(this.playerShape.x - 20, this.playerShape.y - 75);
        this.timerText2.setPosition(this.playerShape2.x - 20, this.playerShape2.y - 75);
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
                    if(this.actualLevel !=6)
                        this.playerShape.anims.play('jumpL', false);
                } else {
                    if(this.actualLevel !=6)
                        this.playerShape.anims.play('runL', true);
                }
            } else {
                this.playerPhysics2.body.setVelocityX(-175);
                this.playerShape2.flipX = true;
                if (this.playerPhysics2.body.velocity.y < 0 || (this.playerPhysics2.body.velocity.y > 0 && !this.playerPhysics2.body.touching.down)){
                    if(this.actualLevel !=6)
                        this.playerShape2.anims.play('jumpS', false);
                } else {
                    if(this.actualLevel !=6)
                        this.playerShape2.anims.play('runS', true);
                }
            }
        } else if (this.keyMovement.D.isUp){
            if (this.playerProta) {
                this.playerPhysics.body.setVelocityX(0);
                if(this.actualLevel !=6)
                    this.playerShape.anims.play('stopL', false);
            } else {
                this.playerPhysics2.body.setVelocityX(0);
                if(this.actualLevel !=6)
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
                    if(this.actualLevel !=6)
                        this.playerShape.anims.play('jumpL', false);
                } else {
                    if(this.actualLevel !=6)
                        this.playerShape.anims.play('runL', true);
                }
            } else {
                this.playerPhysics2.body.setVelocityX(175);
                this.playerShape2.flipX = false;
                if (this.playerPhysics2.body.velocity.y < 0 || (this.playerPhysics2.body.velocity.y > 0 && !this.playerPhysics2.body.touching.down)){
                    if(this.actualLevel !=6)
                        this.playerShape2.anims.play('jumpS', false);
                } else {
                    if(this.actualLevel !=6)
                        this.playerShape2.anims.play('runS', true);
                }
            }
        } else if(this.keyMovement.A.isUp) {
            if (this.playerProta) {
                this.playerPhysics.body.setVelocityX(0);
                if(this.actualLevel !=6)
                    this.playerShape.anims.play('stopL', false);
            } else {
                this.playerPhysics2.body.setVelocityX(0);
                if(this.actualLevel !=6)
                    this.playerShape2.anims.play('stopS', false);
            }
        }
        ///////////////////////////////////////////
        //////////////////////////////////////////
        if (this.keyMovement.ESC.isDown) {
            this.bgMusic.stop();
            this.scene.switch('pauseScene', {level: this.level, english: this.English, am: this.am});
        }

        //Meta
        if(this.actualLevel == 1){
            if (this.physics.world.overlap(this.playerPhysics,this.goal1) && this.physics.world.overlap(this.playerPhysics2,this.goal1)){
                this.sound.add("diamondFX", { volume: 1, loop: false }).play();
                console.log("completed");
                this.levelGenerator();
            }

            if (this.keyMovement.W.isDown) {
                if (this.playerProta) {
                    if(!this.physics.world.overlap(this.playerPhysics,this.goal1)) {
                        if (this.playerPhysics.body.touching.down && this.physics.world.gravity.y > 0) {
                            this.playerPhysics.body.setVelocityY(-250);
                            this.playerShape.anims.play('jumpL', false);
                        } else if (this.playerPhysics.body.touching.up && this.physics.world.gravity.y < 0) {
                            this.playerPhysics.body.setVelocityY(250);
                            this.playerShape.anims.play('jumpL', false);
                        }
                    }
                } else {
                    if(!this.physics.world.overlap(this.playerPhysics2,this.goal1)) {
                        if (this.playerPhysics2.body.touching.down && this.physics.world.gravity.y > 0) {
                            this.playerPhysics2.body.setVelocityY(-250);
                            this.playerShape.anims.play('jumpL', false);
                        } else if (this.playerPhysics2.body.touching.up && this.physics.world.gravity.y < 0) {
                            this.playerPhysics2.body.setVelocityY(250);
                            this.playerShape.anims.play('jumpL', false);
                        }
                    }
                }
            }
        }
        else if(this.actualLevel == 2){
            if (this.physics.world.overlap(this.playerPhysics,this.goal2) && this.physics.world.overlap(this.playerPhysics2,this.goal2)){
                this.sound.add("diamondFX", { volume: 1, loop: false }).play();
                console.log("completed");
                this.levelGenerator();
            }

            if (this.keyMovement.W.isDown) {
                if (this.playerProta) {
                    if(!this.physics.world.overlap(this.playerPhysics,this.goal2)) {
                        if (this.playerPhysics.body.touching.down && this.physics.world.gravity.y > 0) {
                            this.playerPhysics.body.setVelocityY(-250);
                            this.playerShape.anims.play('jumpL', false);
                        } else if (this.playerPhysics.body.touching.up && this.physics.world.gravity.y < 0) {
                            this.playerPhysics.body.setVelocityY(250);
                            this.playerShape.anims.play('jumpL', false);
                        }
                    }
                } else {
                    if(!this.physics.world.overlap(this.playerPhysics2,this.goal2)) {
                        if (this.playerPhysics2.body.touching.down && this.physics.world.gravity.y > 0) {
                            this.playerPhysics2.body.setVelocityY(-250);
                            this.playerShape.anims.play('jumpL', false);
                        } else if (this.playerPhysics2.body.touching.up && this.physics.world.gravity.y < 0) {
                            this.playerPhysics2.body.setVelocityY(250);
                            this.playerShape.anims.play('jumpL', false);
                        }
                    }
                }
            }
        }
        else if(this.actualLevel == 3){
            if (this.physics.world.overlap(this.playerPhysics,this.goal3) && this.physics.world.overlap(this.playerPhysics2,this.goal3)){
                this.sound.add("diamondFX", { volume: 1, loop: false }).play();
                console.log("completed");
                this.levelGenerator();
            }

            if (this.keyMovement.W.isDown) {
                if (this.playerProta) {
                    if(!this.physics.world.overlap(this.playerPhysics,this.goal3)) {
                        if (this.playerPhysics.body.touching.down && this.physics.world.gravity.y > 0) {
                            this.playerPhysics.body.setVelocityY(-250);
                            this.playerShape.anims.play('jumpL', false);
                        } else if (this.playerPhysics.body.touching.up && this.physics.world.gravity.y < 0) {
                            this.playerPhysics.body.setVelocityY(250);
                            this.playerShape.anims.play('jumpL', false);
                        }
                    }
                } else {
                    if(!this.physics.world.overlap(this.playerPhysics2,this.goal3)) {
                        if (this.playerPhysics2.body.touching.down && this.physics.world.gravity.y > 0) {
                            this.playerPhysics2.body.setVelocityY(-250);
                            this.playerShape.anims.play('jumpL', false);
                        } else if (this.playerPhysics2.body.touching.up && this.physics.world.gravity.y < 0) {
                            this.playerPhysics2.body.setVelocityY(250);
                            this.playerShape.anims.play('jumpL', false);
                        }
                    }
                }
            }
        }
        else if(this.actualLevel == 4){
            if (this.physics.world.overlap(this.playerPhysics,this.goal4) && this.physics.world.overlap(this.playerPhysics2,this.goal4)){
                this.sound.add("diamondFX", { volume: 1, loop: false }).play();
                console.log("completed");
                this.levelGenerator();
            }

            if (this.keyMovement.W.isDown) {
                if (this.playerProta) {
                    if(!this.physics.world.overlap(this.playerPhysics,this.goal4)) {
                        if (this.playerPhysics.body.touching.down && this.physics.world.gravity.y > 0) {
                            this.playerPhysics.body.setVelocityY(-250);
                            this.playerShape.anims.play('jumpL', false);
                        } else if (this.playerPhysics.body.touching.up && this.physics.world.gravity.y < 0) {
                            this.playerPhysics.body.setVelocityY(250);
                            this.playerShape.anims.play('jumpL', false);
                        }
                    }
                } else {
                    if(!this.physics.world.overlap(this.playerPhysics2,this.goal4)) {
                        if (this.playerPhysics2.body.touching.down && this.physics.world.gravity.y > 0) {
                            this.playerPhysics2.body.setVelocityY(-250);
                            this.playerShape.anims.play('jumpL', false);
                        } else if (this.playerPhysics2.body.touching.up && this.physics.world.gravity.y < 0) {
                            this.playerPhysics2.body.setVelocityY(250);
                            this.playerShape.anims.play('jumpL', false);
                        }
                    }
                }
            }
        }
        else if(this.actualLevel == 5){
            if (this.physics.world.overlap(this.playerPhysics,this.goal5) && this.physics.world.overlap(this.playerPhysics2,this.goal5)){
                this.sound.add("diamondFX", { volume: 1, loop: false }).play();
                console.log("completed");
                this.levelGenerator();
            }

            if (this.keyMovement.W.isDown) {
                if (this.playerProta) {
                    if(!this.physics.world.overlap(this.playerPhysics,this.goal5)) {
                        if (this.playerPhysics.body.touching.down && this.physics.world.gravity.y > 0) {
                            this.playerPhysics.body.setVelocityY(-250);
                            this.playerShape.anims.play('jumpL', false);
                        } else if (this.playerPhysics.body.touching.up && this.physics.world.gravity.y < 0) {
                            this.playerPhysics.body.setVelocityY(250);
                            this.playerShape.anims.play('jumpL', false);
                        }
                    }
                } else {
                    if(!this.physics.world.overlap(this.playerPhysics2,this.goal5)) {
                        if (this.playerPhysics2.body.touching.down && this.physics.world.gravity.y > 0) {
                            this.playerPhysics2.body.setVelocityY(-250);
                            this.playerShape.anims.play('jumpL', false);
                        } else if (this.playerPhysics2.body.touching.up && this.physics.world.gravity.y < 0) {
                            this.playerPhysics2.body.setVelocityY(250);
                            this.playerShape.anims.play('jumpL', false);
                        }
                    }
                }
            }
        }
        else if(this.actualLevel == 6){
            if (this.physics.world.overlap(this.playerPhysics,this.goal6) && this.physics.world.overlap(this.playerPhysics2,this.goal6)){
                this.sound.add("diamondFX", { volume: 1, loop: false }).play();
                console.log("completed");
                this.levelGenerator();
            }

            if (this.keyMovement.W.isDown) {
                if(this.canJump) {
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

            if(this.keyMovement.W.isUp){
                this.canJump = true;
            }
        }
        else if(this.actualLevel == 7){
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

            if (this.keyMovement.W.isDown) {
                if (this.playerProta) {
                    if(!this.physics.world.overlap(this.playerPhysics,this.goal7)) {
                        if (this.playerPhysics.body.touching.down && this.physics.world.gravity.y > 0) {
                            this.playerPhysics.body.setVelocityY(-250);
                            this.playerShape.anims.play('jumpL', false);
                        } else if (this.playerPhysics.body.touching.up && this.physics.world.gravity.y < 0) {
                            this.playerPhysics.body.setVelocityY(250);
                            this.playerShape.anims.play('jumpL', false);
                        }
                    }
                } else {
                    if(!this.physics.world.overlap(this.playerPhysics2,this.goal7)) {
                        if (this.playerPhysics2.body.touching.down && this.physics.world.gravity.y > 0) {
                            this.playerPhysics2.body.setVelocityY(-250);
                            this.playerShape.anims.play('jumpL', false);
                        } else if (this.playerPhysics2.body.touching.up && this.physics.world.gravity.y < 0) {
                            this.playerPhysics2.body.setVelocityY(250);
                            this.playerShape.anims.play('jumpL', false);
                        }
                    }
                }
            }
        }
        else if(this.actualLevel == 8){
            if (this.physics.world.overlap(this.playerPhysics2, this.nextLevel2) && this.physics.world.overlap(this.playerPhysics, this.nextLevel1)){
                this.sound.add("diamondFX", { volume: 1, loop: false }).play();
                console.log("completed");
                this.levelGenerator();
            }

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
        else if(this.actualLevel ==9){
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
                if (this.mp1.movingPlatformPhysics.body.x > 900+this.levelDisplace)
                    this.mp1.movingPlatformPhysics.body.setVelocityX(-200);
                else
                    this.mp1.movingPlatformPhysics.body.setVelocityX(0);
            } else {
                this.p2.release();
                if (this.mp1.movingPlatformPhysics.body.x < 3100+this.levelDisplace)
                    if (this.mp1.movingPlatformPhysics.body.x < 1650+this.levelDisplace)
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
            if (this.physics.world.overlap(this.playerPhysics, this.nextLevel) && this.physics.world.overlap(this.playerPhysics2, this.nextLevel)){
                this.sound.add("diamondFX", { volume: 1, loop: false }).play();
                console.log("completed");
                this.levelGenerator();
            }
        }

        else if(this.actualLevel == 10){
            if (this.physics.world.overlap(this.playerPhysics,this.goal10) && this.physics.world.overlap(this.playerPhysics2,this.goal102)){
                this.sound.add("diamondFX", { volume: 1, loop: false }).play();
                console.log("completed");
                this.levelGenerator();
            }

            if (this.keyMovement.W.isDown) {
                if (this.playerProta) {
                    if(!this.physics.world.overlap(this.playerPhysics,this.goal10)) {
                        if (this.playerPhysics.body.touching.down && this.physics.world.gravity.y > 0) {
                            this.playerPhysics.body.setVelocityY(-250);
                            this.playerShape.anims.play('jumpL', false);
                        } else if (this.playerPhysics.body.touching.up && this.physics.world.gravity.y < 0) {
                            this.playerPhysics.body.setVelocityY(250);
                            this.playerShape.anims.play('jumpL', false);
                        }
                    }
                } else {
                    if(!this.physics.world.overlap(this.playerPhysics2,this.goal102)) {
                        if (this.playerPhysics2.body.touching.down && this.physics.world.gravity.y > 0) {
                            this.playerPhysics2.body.setVelocityY(-250);
                            this.playerShape.anims.play('jumpL', false);
                        } else if (this.playerPhysics2.body.touching.up && this.physics.world.gravity.y < 0) {
                            this.playerPhysics2.body.setVelocityY(250);
                            this.playerShape.anims.play('jumpL', false);
                        }
                    }
                }
            }
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