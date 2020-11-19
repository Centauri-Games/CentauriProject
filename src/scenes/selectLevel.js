class selectLevel extends Phaser.Scene{
    constructor(){
        super("selectLevel");
    }

    init(data){
        this.English = data.english;
        this.coop = data.coop;
        this.am = data.am;
        this.device = data.device;
    }

    preload(){
    }

    create(){
        this.add.sprite(960, 540, 'levelSelect');

        var bText = this.add.text(125,125,"Atrás",{font : "48px"}).setInteractive().on("pointerup",()=>{
            this.scene.start("selectMode", {english: this.English, am: this.am});
        });
        bText.setAlpha(0.01);

        var fullScreen = this.add.image(1875, 50, 'screen').setScale(0.2).setInteractive().on('pointerup',()=>{
            if (this.scale.isFullscreen){
                this.scale.stopFullscreen();
            } else {
                this.scale.startFullscreen();
            }
        });
        fullScreen.setAlpha(0.01);

        var lvl1 = this.add.rectangle(275,380,200,200,0x550055).setInteractive().on("pointerup",()=>{
           
                this.scene.start("storyScene", {english: this.English, am: this.am, device: this.device,coop : this.coop});
            
        });
        lvl1.setAlpha(0.25);

        var lvl2 = this.add.rectangle(610,380,200,200,0x550055).setInteractive().on("pointerup",()=>{
         
                this.scene.start("level2Scene", {english: this.English, am: this.am, device : this.device,coop : this.coop});
            
        });
        lvl2.setAlpha(0.25);

        var lvl3 = this.add.rectangle(950,380,200,200,0x550055).setInteractive().on("pointerup",()=>{
            
                this.scene.start("level3Scene", {english: this.English, am: this.am, device : this.device,coop : this.coop});
            
        });
        lvl3.setAlpha(0.25);

        var lvl4 = this.add.rectangle(1290,380,200,200,0x550055).setInteractive().on("pointerup",()=>{
          
                this.scene.start("level4Scene", {english: this.English, am: this.am, device : this.device,coop : this.coop});
            
        });
        lvl4.setAlpha(0.25);

        var lvl5 = this.add.rectangle(1625,380,200,200,0x550055).setInteractive().on("pointerup",()=>{
            
                this.scene.start("level5Scene", {english: this.English, am: this.am, device : this.device,coop : this.coop});
            
        });
        lvl5.setAlpha(0.25);

        var lvl6 = this.add.rectangle(275,700,200,200,0xffff00).setInteractive().on("pointerup",()=>{
           
                this.scene.start("level6Scene", {english: this.English, am: this.am, device : this.device,coop : this.coop});
            
        });
        lvl6.setAlpha(0.25);

        var lvl7 = this.add.rectangle(610,700,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            
                this.scene.start("level7Scene", {english: this.English, am: this.am, device : this.device,coop : this.coop});
            
        });
        lvl7.setAlpha(0.25);

        var lvl8 = this.add.rectangle(950,700,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            
                this.scene.start("level8Scene", {english: this.English, am: this.am, device : this.device,coop : this.coop});
            
        });
        lvl8.setAlpha(0.25);

        var lvl9 = this.add.rectangle(1290,700,200,200,0xffff00).setInteractive().on("pointerup",()=>{
           
                this.scene.start("level9Scene", {english: this.English, am: this.am, device : this.device,coop : this.coop});
            
        });
        lvl9.setAlpha(0.25);

        var lvl10 = this.add.rectangle(1625,700,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            
                this.scene.start("level10Scene", {english: this.English, am: this.am, device : this.device,coop : this.coop});
           
        });
        lvl10.setAlpha(0.25);

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
}