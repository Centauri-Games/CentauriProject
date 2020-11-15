class bootScene extends Phaser.Scene{
    constructor(){
        super("bootScene");
    }

    init(data){
        this.English = data.english;
    }

    preload(){

        //Backgrounds
        this.load.image('bg1', 'assets/backgrounds/factory.png');
        this.load.image('bg2', 'assets/backgrounds/space.png');
        this.load.image('bg3', 'assets/backgrounds/west.png');
        this.load.image('bg4', 'assets/backgrounds/jungle.png');

        //Tilemaps
        this.load.image('tiles', 'assets/tileset/Tilemap.png')
        this.load.tilemapTiledJSON('map1','assets/levels/level1.json');
        this.load.tilemapTiledJSON('map2','assets/levels/level2.json');
        this.load.tilemapTiledJSON('map3','assets/levels/level3.json');
        this.load.tilemapTiledJSON('map4','assets/levels/level4.json');
        this.load.tilemapTiledJSON('map5','assets/levels/level5.json');
        this.load.tilemapTiledJSON('map6','assets/levels/level6.json');
        this.load.tilemapTiledJSON('map7','assets/levels/level7.json');
        this.load.tilemapTiledJSON('map8','assets/levels/level8.json');
        this.load.tilemapTiledJSON('map9','assets/levels/level9.json');
        this.load.tilemapTiledJSON('map10','assets/levels/level10.json');

        //Player
        this.load.spritesheet('light', 'assets/players/Hyperion.png', { //Personajes
            frameWidth: 65,
            frameHeight: 80
        });
        this.load.spritesheet('shadow', 'assets/players/Érebos.png', {
            frameWidth: 65,
            frameHeight: 80
        });

        this.load.image('light6', 'assets/players/HyperionPlatform.png');   //Personajes con plataforma
        this.load.image('shadow6', 'assets/players/ErebosPlatform.png');

        //Sprites
        this.load.image('andamio', 'assets/sprites/andamio.png');   //Andamio

        this.load.spritesheet('pinkDoor', 'assets/sprites/pinkDoor.png', {  //Puerta laser rosa
            frameWidth: 112,
            frameHeight: 480
        });
        this.load.spritesheet('blueDoor', 'assets/sprites/blueDoor.png', {  //Puerta laser azul
            frameWidth: 112,
            frameHeight: 480
        });

        this.load.image('doorStart', 'assets/sprites/borde_puerta.png');    //Puerta estandar
        this.load.spritesheet('door', 'assets/sprites/puerta.png', {
            frameWidth: 140,
            frameHeight: 1004
        });

        this.load.spritesheet('greenButton', 'assets/sprites/botonVerde.png', { //Boton verde
            frameWidth: 59,
            frameHeight: 150
        });

        this.load.spritesheet('redButton', 'assets/sprites/botonRojo.png', {    //Boton rojo
            frameWidth: 59,
            frameHeight: 150
        });

        this.load.image('caja', 'assets/sprites/caja.png'); //Caja

        this.load.spritesheet('mirror', 'assets/sprites/espejo.png', {  //Espejo
            frameWidth: 104,
            frameHeight: 128
        });

        this.load.spritesheet('laserDoor', 'assets/sprites/laserDoor.png', {    //Puerta laser
            frameWidth: 64,
            frameHeight: 288
        });

        this.load.image('diamond', 'assets/sprites/diamanteR.png'); //Diamante
        this.load.image('laser', 'assets/sprites/laser.png');   //Laser
        this.load.image('portalA', 'assets/sprites/portalAzul.png');    //Portales
        this.load.image('portalR', 'assets/sprites/portalRojo.png');

        this.load.spritesheet('lever', 'assets/sprites/palanca.png', {  //Palanca
            frameWidth: 102,
            frameHeight: 122
        });

        this.load.spritesheet('bridge', 'assets/sprites/puente.png', {  //Puente
            frameWidth: 480,
            frameHeight: 96
        });

        this.load.image('woodP', 'assets/sprites/plataforma.png');   //Plataforma madera ----------
        this.load.image('blueP', 'assets/sprites/plataformaEspacioAzul.png');    //P espacio azul -----------
        this.load.image('greenP', 'assets/sprites/greenPlatform.png');  //P verde
        this.load.image('yellowP', 'assets/sprites/yellowPlatform.png');    //P amarilla
        this.load.image('pinkP', 'assets/sprites/pinkPlatform.png');    //P rosa

        //Pressure plates
        this.load.spritesheet('pressurePink', 'assets/sprites/pressurePink.png', {
            frameWidth: 82,
            frameHeight: 48
        });

        this.load.spritesheet('pressureBlue', 'assets/sprites/pressureBlue.png', {
            frameWidth: 82,
            frameHeight: 48
        });

        this.load.spritesheet('pressureYellow', 'assets/sprites/pressureYellow.png', {
            frameWidth: 82,
            frameHeight: 48
        });

        this.load.spritesheet('pressureGreen', 'assets/sprites/pressureGreen.png', {
            frameWidth: 82,
            frameHeight: 48
        });

        //Menús
        this.load.image('screen', 'assets/UI/FullScreen.png');  //Componentes de menus e interfaces
        this.load.image('settings', 'assets/UI/Settings.png');
        this.load.image('español', 'assets/UI/España.png');
        this.load.image('english', 'assets/UI/UK.png');

        //Music
        this.load.audio('menuMS', 'assets/sounds/music/menu.wav');
        this.load.audio('creditsMS', 'assets/sounds/music/credits.wav');
        this.load.audio('ingameMS', 'assets/sounds/music/ingame.mp3');

        this.load.audio('barrierFX', 'assets/sounds/effects/barrier.wav');
        this.load.audio('buttonFX', 'assets/sounds/effects/button.wav');
        this.load.audio('deathFX', 'assets/sounds/effects/death.wav');
        this.load.audio('diamondFX', 'assets/sounds/effects/diamond.wav');
        this.load.audio('door1FX', 'assets/sounds/effects/door1.wav');
        this.load.audio('door2FX', 'assets/sounds/effects/door2.wav');
        this.load.audio('electricFX', 'assets/sounds/effects/electric.wav');
        this.load.audio('laserFX', 'assets/sounds/effects/laser.wav');
        this.load.audio('leverFX', 'assets/sounds/effects/lever.wav');
        this.load.audio('mirrorFX', 'assets/sounds/effects/mirror.wav');
        this.load.audio('portalFX', 'assets/sounds/effects/portal.wav');

    }

    create(){
        this.am = new AudioManager();
        this.scene.start("menuScene", {english: this.English, am: this.am});
    }

    update(){
    }
}