class matchmakingScene extends Phaser.Scene{
    constructor(){
        super("matchmakingScene");

    }

    init(data){
        this.level = data.level;
        this.am = data.am;
        this.device = data.device;
    }

    preload(){

    }

    create(){
        console.log(this.level);
    }

    update(){
       
    }
}