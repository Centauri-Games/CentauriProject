class level10Scene extends Phaser.Scene{
    constructor(){
        super("level10Scene");
    }

    init(data){
        this.level = "level10Scene";
        this.English = data.english;
    }

    preload(){
        this.load.image('bg', 'assets/backgrounds/factory.png');
    }
    create(){
        var nextLevel = this.add.zone(1970,0,10,1920);
        
        this.add.sprite(960,540,'bg');

        var playerPhysics;
        var playerPhysics2;

        this.physics.add.overlap(playerPhysics,nextLevel,function(){
            if (this.physics.world.overlap(playerPhysics2,nextLevel)){
                
            }
        });

        this.physics.add.overlap(playerPhysics2,nextLevel,function(){
            if (this.physics.world.overlap(playerPhysics,nextLevel)){
               
            }
        });
    }
    update(){
        
    }
}