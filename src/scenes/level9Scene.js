class level9Scene extends Phaser.Scene{
    constructor(){
        super("level9Scene");
    }

    init(data){
        this.level = "level9Scene";
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

        this.physics.add.overlap(playerPhysics1,nextLevel,function(){
            if (this.physics.world.overlap(playerPhysics2,nextLevel)){
                this.scene.start("level10Scene");
            }
        });

        this.physics.add.overlap(playerPhysics2,nextLevel,function(){
            if (this.physics.world.overlap(playerPhysics,nextLevel)){
                this.scene.start("level10Scene");
            }
        });
    
    }
    update(){
        
    }
}