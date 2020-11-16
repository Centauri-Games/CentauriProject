class matchmakingScene extends Phaser.Scene{
    constructor(){
        super("matchmakingScene");

    }

    init(data){
        this.level = data.level;
        this.am = data.am;
    }

    preload(){

    }

    create(){
        console.log(this.level);
    }

    update(){
       
    }
}