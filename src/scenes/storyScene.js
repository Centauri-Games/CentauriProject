class storyScene extends Phaser.Scene{

    constructor(){
        super("storyScene");
    }

    init(data){
        this.English = data.english;
        this.device = data.device;
        this.am = data.am;
    }

    preload(){
    }

    create(){

        this.anims.create({
            key: 'loop1',
            frames: this.anims.generateFrameNumbers('continue', {start: 0, end: 2}),
            frameRate: 1,
            repeat: -1
        });

        this.anims.create({
            key: 'loop2',
            frames: this.anims.generateFrameNumbers('continuar', {start: 0, end: 2}),
            frameRate: 1,
            repeat: -1
        });

        var screen;
        var screenN = 0;
        if (this.English){
            screen = this.add.sprite(960, 540, 'story1EN');
            this.add.sprite(1620, 980, 'continue').play('loop1', false);

            screen.setInteractive().on('pointerup',()=>{
                switch (screenN) {
                    case 0:
                        screenN ++;
                        screen.setTexture('story2EN');
                        break;
                    case 1:
                        screenN ++;
                        screen.setTexture('story3EN');
                        break;
                    case 2:
                        screenN ++;
                        screen.setTexture('story4EN');
                        break;
                    case 3:
                        screenN ++;
                        screen.setTexture('story5EN');
                        break;
                    case 4:
                        screenN ++;
                        this.scene.start("level1Scene", {english: this.English, am: this.am, device: this.device});
                        break;
                }
            });
        } else {
            screen = this.add.sprite(960, 540, 'story1ES');
            this.add.sprite(1620, 980, 'continuar').play('loop2', false);

            screen.setInteractive().on('pointerup',()=>{
                switch (screenN) {
                    case 0:
                        screenN ++;
                        screen.setTexture('story2ES');
                        break;
                    case 1:
                        screenN ++;
                        screen.setTexture('story3ES');
                        break;
                    case 2:
                        screenN ++;
                        screen.setTexture('story4ES');
                        break;
                    case 3:
                        screenN ++;
                        screen.setTexture('story5ES');
                        break;
                    case 4:
                        this.scene.start("level1Scene", {english: this.English, am: this.am, device: this.device});
                        break;
                }

            });
        }

        //Audio Manager
        if(this.am==null){
            this.am = new AudioManager();
        }
        if (this.am.musicOn === true && this.am.bgMusicPlaying === false) {
            this.bgMusic = this.sound.add("menuMS", { volume: 0.5, loop: true });
            this.bgMusic.play();
            this.am.bgMusicPlaying = true;
            this.am.bgMusic = this.bgMusic; //Guarda la referencia a la musica sonando para después poder pararla
        }
    }

    update(){

    }


}