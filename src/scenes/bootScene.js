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
        this.load.spritesheet('shadow', 'assets/players/Erebos.png', {
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
        this.load.image('español', 'assets/UI/Espana.png');
        this.load.image('english', 'assets/UI/UK.png');

        //Interfaz Móvil

        this.load.image('rightIcon', 'assets/UI/rightIcon.png');
        this.load.image('leftIcon', 'assets/UI/leftIcon.png');
        this.load.image('jumpIcon', 'assets/UI/jumpIcon.png');
        this.load.image('swapIcon', 'assets/UI/swapIcon.png');
        this.load.image('pauseIcon', 'assets/UI/pauseIcon.png');

        //Music
        this.load.audio('menuMS', 'assets/sounds/music/menu.wav');
        this.load.audio('creditsMS', 'assets/sounds/music/credits.wav');
        this.load.audio('ingameMS1', 'assets/sounds/music/ingame1.wav');
        this.load.audio('ingameMS2', 'assets/sounds/music/ingame2.wav');

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

        this.load.spritesheet('pressToStart', 'assets/screens/Presstostart.png', {
            frameWidth: 1920,
            frameHeight: 1080
        });

        this.load.spritesheet('heart', 'assets/sprites/hearts.png', {
            frameWidth: 72,
            frameHeight: 20
        });

        this.load.image('story1ES', 'assets/story/story1ES.png');
        this.load.image('story2ES', 'assets/story/story2ES.png');
        this.load.image('story3ES', 'assets/story/story3ES.png');
        this.load.image('story4ES', 'assets/story/story4ES.png');
        this.load.image('story5ES', 'assets/story/story5ES.png');
        this.load.image('storyEndES', 'assets/story/storyEndES.png');

        this.load.image('story1EN', 'assets/story/story1EN.png');
        this.load.image('story2EN', 'assets/story/story2EN.png');
        this.load.image('story3EN', 'assets/story/story3EN.png');
        this.load.image('story4EN', 'assets/story/story4EN.png');
        this.load.image('story5EN', 'assets/story/story5EN.png');
        this.load.image('storyEndEN', 'assets/story/storyEndEN.png');

        this.load.spritesheet('continue', 'assets/story/continue.png', {
            frameWidth: 502,
            frameHeight: 68
        });

        this.load.spritesheet('continuar', 'assets/story/continuar.png', {
            frameWidth: 502,
            frameHeight: 68
        });

        this.load.image('menu', 'assets/screens/Menu.png');
        this.load.image('menuEnglish', 'assets/screens/MenuIngles.png');
        this.load.image('screen', 'assets/UI/FullScreen.png');
        this.load.image('settings', 'assets/UI/Settings.png');
        this.load.image('howToPlay', 'assets/screens/Controles.png');
        this.load.image('howToPlayEnglish', 'assets/screens/ControlesIngles.png');
        this.load.image('howToPlayMB', 'assets/screens/ControlesMovil.png');
        this.load.image('howToPlayMBEnglish', 'assets/screens/ControlesMovilIngles.png');
        this.load.image('credit', 'assets/screens/Contacto.png');
        this.load.image('creditEnglish', 'assets/screens/ContactoIngles.png');
        this.load.image('gameOver', 'assets/screens/GameOver.png');
        this.load.image('gameOverEnglish', 'assets/screens/GameOverIngles.png');
        this.load.image('pause', 'assets/screens/Pausa.png');
        this.load.image('pauseEnglish', 'assets/screens/PausaIngles.png');
        this.load.image('rankES', 'assets/screens/Puntuaciones.png');
        this.load.image('rankEN', 'assets/screens/PuntuacionesIngles.png');
        this.load.image('levelSelect', 'assets/screens/SeleccionNivel.png');
        this.load.image('screen', 'assets/UI/FullScreen.png');
        this.load.image('mode', 'assets/screens/SeleccionModo.png');
        this.load.image('modeEnglish', 'assets/screens/SeleccionModoIngles.png');
        this.load.image('screen', 'assets/UI/FullScreen.png');
        this.load.image('language', 'assets/screens/SeleccionIdioma.png');
        this.load.image('languageEnglish', 'assets/screens/SeleccionIdiomaIngles.png');


        this.load.bitmapFont('agency', 'assets/font/agency_0.png', 'assets/font/agency.xml');

    }

    create(){
        this.am = new AudioManager();

        this.anims.create({
            key: 'starting',
            frames: this.anims.generateFrameNumbers('pressToStart', { start: 0, end: 5 }),
            frameRate: 6,
            repeat: -1
        });

        var screen = this.add.sprite(960, 540,'pressToStart');
        screen.anims.play('starting',true);

        screen.setInteractive().on('pointerup',()=>{
            this.scene.start("menuScene", {english: this.English, am: this.am});
        });
    }

    update(){
    }
}