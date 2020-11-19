class endScene extends Phaser.Scene{

    constructor(){
        super("endScene");
    }

    init(data){
        this.English = data.english;
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
            screen = this.add.sprite(960, 540, 'storyEndEN');
            this.add.sprite(1620, 980, 'continue').play('loop1', false);

            screen.setInteractive().on('pointerup',()=>{
                this.scene.start("credits", {english: this.English, am: this.am});
            });

        } else {
            screen = this.add.sprite(960, 540, 'storyEndES');
            this.add.sprite(1620, 980, 'continuar').play('loop2', false);

            screen.setInteractive().on('pointerup',()=>{
                this.scene.start("credits", {english: this.English, am: this.am});
            });
        }

        //Audio Manager

        if(this.am==null){
            this.am = new AudioManager();
        }
        this.am.bgMusic.stop();
        this.am.bgMusicPlaying = false;
        
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