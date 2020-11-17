class selectLevel extends Phaser.Scene{
    constructor(){
        super("selectLevel");
    }

    init(data){
        this.English = data.english;
        this.online = data.online;
        this.am = data.am;
        this.device = data.device;
    }

    preload(){
        this.load.image('levelSelect', 'assets/screens/SeleccionNivel.png');
        this.load.image('screen', 'assets/UI/FullScreen.png');
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
            if (this.online){
                this.scene.start("matchmakingScene", {level : 1, am: this.am,device : this.device});
            } else {
                this.scene.start("level1Scene", {english: this.English, am: this.am, device: this.device});
            }
        });
        lvl1.setAlpha(0.25);

        var lvl2 = this.add.rectangle(610,380,200,200,0x550055).setInteractive().on("pointerup",()=>{
            if (this.online){
                this.scene.start("matchmakingScene", {level : 2, am: this.am, device : this.device});
            } else {
                this.scene.start("level2Scene", {english: this.English, am: this.am, device : this.device});
            }
        });
        lvl2.setAlpha(0.25);

        var lvl3 = this.add.rectangle(950,380,200,200,0x550055).setInteractive().on("pointerup",()=>{
            if (this.online){
                this.scene.start("matchmakingScene", {level : 3, am: this.am, device : this.device});
            } else {
                this.scene.start("level3Scene", {english: this.English, am: this.am, device : this.device});
            }
        });
        lvl3.setAlpha(0.25);

        var lvl4 = this.add.rectangle(1290,380,200,200,0x550055).setInteractive().on("pointerup",()=>{
            if (this.online){
                this.scene.start("matchmakingScene", {level : 4, am: this.am, device : this.device});
            } else {
                this.scene.start("level4Scene", {english: this.English, am: this.am, device : this.device});
            }
        });
        lvl4.setAlpha(0.25);

        var lvl5 = this.add.rectangle(1625,380,200,200,0x550055).setInteractive().on("pointerup",()=>{
            if (this.online){
                this.scene.start("matchmakingScene", {level : 5, am: this.am, device : this.device});
            } else {
                this.scene.start("level5Scene", {english: this.English, am: this.am, device : this.device});
            }
        });
        lvl5.setAlpha(0.25);

        var lvl6 = this.add.rectangle(275,700,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            if (this.online){
                this.scene.start("matchmakingScene", {level : 6, am: this.am, device : this.device});
            } else {
                this.scene.start("level6Scene", {english: this.English, am: this.am, device : this.device});
            }
        });
        lvl6.setAlpha(0.25);

        var lvl7 = this.add.rectangle(610,700,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            if (this.online){
                this.scene.start("matchmakingScene", {level : 7, am: this.am, device : this.device});
            } else {
                this.scene.start("level7Scene", {english: this.English, am: this.am, device : this.device});
            }
        });
        lvl7.setAlpha(0.25);

        var lvl8 = this.add.rectangle(950,700,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            if (this.online){
                this.scene.start("matchmakingScene", {level : 8, am: this.am, device : this.device});
            } else {
                this.scene.start("level8Scene", {english: this.English, am: this.am, device : this.device});
            }
        });
        lvl8.setAlpha(0.25);

        var lvl9 = this.add.rectangle(1290,700,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            if (this.online){
                this.scene.start("matchmakingScene", {level : 9, am: this.am, device : this.device});
            } else {
                this.scene.start("level9Scene", {english: this.English, am: this.am, device : this.device});
            }
        });
        lvl9.setAlpha(0.25);

        var lvl10 = this.add.rectangle(1625,700,200,200,0xffff00).setInteractive().on("pointerup",()=>{
            if (this.online){
                this.scene.start("matchmakingScene", {level : 10, am: this.am, device : this.device});
            } else {
                this.scene.start("level10Scene", {english: this.English, am: this.am, device : this.device});
            }
        });
        lvl10.setAlpha(0.25);
    }
}