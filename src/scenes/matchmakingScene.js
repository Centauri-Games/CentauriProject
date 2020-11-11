class matchmakingScene extends Phaser.Scene{
    constructor(){
        super("matchmakingScene");

    }

    init(data){
        this.level = data.level;
        
    }

    preload(){

    }

    create(){
        console.log(this.level);
    }

    update(){
       
    }
}