class level3Scene extends Phaser.Scene{
    constructor(){
        super("level3Scene");
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
                this.scene.start("level4Scene");
            }
        });

        this.physics.add.overlap(playerPhysics2,nextLevel,function(){
            if (this.physics.world.overlap(playerPhysics,nextLevel)){
                this.scene.start("level4Scene");
            }
        });
    }
    update(){
        
    }
}