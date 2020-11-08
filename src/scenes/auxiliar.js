
class StaticPlatform{

    constructor(scene, posX, posY, sizeX, sizeY, color){    //Sprite-less constructor
        this.staticPlatform = scene.add.rectangle(posX, posY, sizeX, sizeY, color);
        this.staticPlatformPhysics = scene.physics.add.existing(this.staticPlatform, 1);
    }

    /*constructor(scene, posX, posY, name){   //Sprite constructor
        this.staticPlatform = scene.add.sprite(posX, posY, name);
        this.staticPlatformPhysics = scene.physics.add.existing(this.staticPlatform, 1);
    }*/

    addPlayerCollide(scene, playerShape){   //Player collider
        scene.physics.add.collider(playerShape,this.staticPlatform);
    }
}

class MovingPlatform{

    constructor(scene, posX, posY, sizeX, sizeY, color){    //Sprite-less constructor
        this.movingPlatform = scene.add.rectangle(posX, posY, sizeX, sizeY, color);
        this.movingPlatformPhysics = scene.physics.add.existing(this.movingPlatform, 0);
        this.movingPlatformPhysics.body.setAllowGravity(false);
        this.movingPlatformPhysics.body.setImmovable(true);
    }

    /*constructor(scene, posX, posY, name){   //Sprite constructor
        this.staticPlatform = scene.add.sprite(posX, posY, name);
        this.movingPlatformPhysics = scene.physics.add.existing(this.movingPlatform, 0);
        this.movingPlatformPhysics.body.setAllowGravity(false);
        this.movingPlatformPhysics.body.setImmovable(true);
    }*/

    addPlayerCollide(scene, playerShape){   //Player collider
        scene.physics.add.collider(playerShape,this.movingPlatform);
    }

    setMovement(scene, displaceX, displaceY){   //Set movement - Basic linear movement
        scene.tweens.timeline({
            targets: this.movingPlatformPhysics.body.velocity,
            loop: -1,
            tweens: [
                { x:displaceX, y:displaceY, duration: 2000, ease: 'Stepped' },
                { x:0, y:0, duration: 2000, ease: 'Stepped' },
                { x:-displaceX, y:-displaceY, duration: 2000, ease: 'Stepped' },
                { x:0, y:0, duration: 2000, ease: 'Stepped' }
            ]
        });
    }
}

class DropPlatform{

    constructor(scene, posX, posY, sizeX, sizeY, color){    //Sprite-less constructor
        this.dropPlatform = scene.add.rectangle(posX, posY, sizeX, sizeY, color);
        this.dropPlatformPhysics = scene.physics.add.existing(this.dropPlatform, 0);
        this.dropPlatformPhysics.body.setAllowGravity(false);
        this.dropPlatformPhysics.body.setImmovable(true);
    }

    /*constructor(scene, posX, posY, name){   //Sprite constructor
        this.dropPlatform = scene.add.sprite(posX, posY, name);
        this.dropPlatformPhysics = scene.physics.add.existing(this.dropPlatform, 0);
        this.dropPlatformPhysics.body.setAllowGravity(false);
        this.dropPlatformPhysics.body.setImmovable(true);
    }*/

    addWorldCollider(scene, object){
        scene.physics.add.collider(this.dropPlatform, object);
    }
    addPlayerCollide(scene, playerShape){   //Player collider
        scene.physics.add.collider(playerShape, this.dropPlatform, function(){
            if(this.dropPlatformPhysics.body.allowGravity == false) {
                this.dropPlatformPhysics.body.setImmovable(false);
                this.dropPlatformPhysics.body.setAllowGravity(true);
            }
        }, null, this);
    }
}

class Mirror{

    constructor(scene, posX, posY, sizeX, sizeY, color){
        this.mirror = scene.add.rectangle(posX, posY, sizeX, sizeY, color);
        this.mirrorPhysics = scene.physics.add.existing(this.mirror, 0);
        this.mirrorPosition = 0;
        this.mirrorPhysics.body.setAllowGravity(false);
    }

    getMirrorPhysics(){
        return this.mirrorPhysics;
    }
}

class GravitySwitch{

    constructor(scene, onX, onY, offX, offY, sizeX, sizeY, color, color2){

        this.upsideDown = false;
        this.switchOn = scene.add.rectangle(onX, onY, sizeX, sizeY, color);
        scene.physics.add.existing(this.switchOn, 1);
        this.switchOff = scene.add.rectangle(offX, offY, sizeX, sizeY, color2);
        scene.physics.add.existing(this.switchOff, 1);
    }

    addTrigger(scene, playerShape, playerPhysics, playerPhysics2){
        scene.physics.add.collider(playerShape, this.switchOn, function(){
            this.switchOn.setFillStyle(0x0000ff, 1);
            this.switchOff.setFillStyle(0x00ff00, 1);
            this.upsideDown = true;
            playerPhysics.body.setGravityY(-400);
            playerPhysics2.body.setGravityY(-400);
        }, null, this);

        scene.physics.add.collider(playerShape, this.switchOff, function(){
            this.switchOn.setFillStyle(0x00ff00, 1);
            this.switchOff.setFillStyle(0x0000ff, 1);
            this.upsideDown = false;
            playerPhysics.body.setGravityY(0);
            playerPhysics2.body.setGravityY(0);
        }, null, this);
    }

    getUpsideDown(){
        return this.upsideDown;
    }
}

class Spike{

    constructor(scene, posX, posY, sizeX, sizeY, color, hp){
        this.spikes = scene.add.rectangle(posX, posY, sizeX, sizeY, color);
        scene.physics.add.existing(this.spikes, 1);

        this.hp = hp;
    }

    addPlayerCollide(scene, playerShape){
        scene.physics.add.collider(playerShape, this.spikes, function(){
            if (this.hp.getHP() > 0){
                this.hp.takeDamage();
                playerShape.setPosition(500, 500);
            } else {
                scene.scene.start('gameOverScene');
            }
        }, null, this);
    }
}

class Life{

    constructor(scene){
        this.lifes = 3;
        this.lifesText = scene.add.text(1000, 1000, 'Vidas: 3', {font: '32px'});
    }

    getHP(){
        return this.lifes;
    }

    takeDamage(){
        this.lifes--;
        this.lifesText.setText('Vidas: ' + this.lifes);
    }
}

class Box{

    constructor(scene, destX, destY, boxX, boxY, sizeX, sizeY, color){

        this.dest = scene.add.rectangle(destX, destY, sizeX, sizeY, 0x000000);
        this.dest.setFillStyle(color, 0);
        this.dest.setStrokeStyle(3, color, 1);
        scene.physics.add.existing(this.dest, 1);

        this.box = scene.add.rectangle(boxX, boxY, sizeX, sizeY, color);
        this.boxPhysics = scene.physics.add.existing(this.box, 0);

        scene.physics.add.collider(this.box,this.dest,function(){
            this.box.setPosition(this.dest.x, this.dest.y);
            this.boxPhysics.body.setImmovable(true);
            this.boxPhysics.body.setAllowGravity(false);
        },null,this);
    }

    getBox(){
        return this.box;
    }
    addPlayerCollide(scene, playerShape){
        scene.physics.add.collider(playerShape,this.box,function(){
            this.box.body.setDragX(100);//FRICCIÓN
        },null,this);
    }

    addWorldCollide(scene, object){
        scene.physics.add.collider(this.box,object);
    }
}

class Teleport{

    constructor(scene, enterX, enterY, exitX, exitY, sizeX, sizeY, color, color2){
        this.tpEnter = scene.add.ellipse(enterX, enterY, sizeX, sizeY,color);
        this.tpExit = scene.add.ellipse(exitX,exitY, sizeX,sizeY,color2);
        this.tpPhysics = scene.physics.add.existing(this.tpEnter, 1);
    }

    addCollide(scene, object){
        scene.physics.add.collider(object, this.tpEnter, function(){
            object.setPosition(this.tpExit.x, this.tpExit.y);
        }, null, this);
    }
}

class Button{

    constructor(scene, buttonX, buttonY, doorX, doorY, color, color2){
        this.button = scene.add.rectangle(buttonX, buttonY, 100, 100, color);
        scene.add.physics.existing(this.button, 1);

        this.door = scene.add.rectangle(doorX, doorY,100, 200, color2);
        scene.add.physics.existing(this.door, 1);
    }

    addCollideDoor(scene, playerShape){
        this.doorCollider = scene.physics.add.collider(playerShape, this.door);
    }

    addCollideButton(scene, playerShape){
        scene.physics.add.collider(playerShape, this.button, function(){
            scene.world.physics.removeCollider(this.doorCollider);
            this.door.setFillStyle(this.door.color, 0);
            this.dest.setStrokeStyle(3, this.door.color, 1);
        }, null, this);
    }
}