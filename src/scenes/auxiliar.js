
class StaticPlatform{

    /*constructor(scene, posX, posY, sizeX, sizeY, color){    //Sprite-less constructor
        this.staticPlatform = scene.add.rectangle(posX, posY, sizeX, sizeY, color);
        this.staticPlatformPhysics = scene.physics.add.existing(this.staticPlatform, 1);
    }*/

    constructor(scene, posX, posY, name){   //Sprite constructor
        this.staticPlatform = scene.add.sprite(posX, posY, name);
        this.staticPlatformPhysics = scene.physics.add.existing(this.staticPlatform, 1);
    }

    addPlayerCollide(scene, playerShape){   //Player collider
        scene.physics.add.collider(playerShape,this.staticPlatform);
    }

    setAlpha(value){
        this.staticPlatform.setAlpha(value);
    }

    rotate(angle){
        this.staticPlatform.setRotation(angle);
    }

    scale(sizeX, sizeY){
        this.staticPlatform.setScale(sizeX, sizeY);
    }
}

class MovingPlatform{
    constructor(scene, posX, posY, name){   //Sprite constructor
        this.movingPlatform = scene.add.sprite(posX, posY, name);
        this.movingPlatformPhysics = scene.physics.add.existing(this.movingPlatform, 0);
        this.movingPlatformPhysics.body.setAllowGravity(false);
        this.movingPlatformPhysics.body.setImmovable(true);
    }

    addPlayerCollide(scene, playerShape){   //Player collider
        scene.physics.add.collider(playerShape,this.movingPlatform);
    }

    setAlpha(value){
        this.movingPlatform.setAlpha(value);
    }

    setMovement(scene, displaceX, displaceY, playerPhysics){   //Set movement - Basic linear movement
        scene.tweens.timeline({
            targets: this.movingPlatformPhysics.body.velocity,
            loop: -1,
            tweens: [
                { x:displaceX, y:displaceY, duration: 2000, ease: 'Stepped' },
                { x:0, y:0, duration: 2000, ease: 'Stepped' },
                { x:-displaceX, y:-displaceY, duration: 2000, ease: 'Stepped' },
                { x:0, y:0, duration: 2000, ease: 'Stepped' }
            ],
        });
    }

    rotate(angle){
        this.movingPlatform.setRotation(angle);
    }

    scale(sizeX, sizeY){
        this.movingPlatform.setScale(sizeX, sizeY);
    }
}

class DropPlatform{
    constructor(scene, posX, posY, name){   //Sprite constructor
        this.dropPlatform = scene.add.sprite(posX, posY, name);
        this.dropPlatformPhysics = scene.physics.add.existing(this.dropPlatform, 0);
        this.dropPlatformPhysics.body.setAllowGravity(false);
        this.dropPlatformPhysics.body.setImmovable(true);
    }

    addWorldCollider(scene, object){
        scene.physics.add.collider(this.dropPlatform, object);
    }

    addPlayerCollide(scene, playerShape){   //Player collider
        scene.physics.add.collider(playerShape, this.dropPlatform, function(){
            if(this.dropPlatformPhysics.body.allowGravity === false) {
                this.dropPlatformPhysics.body.setImmovable(false);
                this.dropPlatformPhysics.body.setAllowGravity(true);
            }
        }, null, this);
    }

    rotate(angle){
        this.dropPlatform.setRotation(angle);
    }
}

class Mirror{

    constructor(scene, posX, posY, name){
        this.mirror = scene.add.sprite(posX, posY, name);
        this.mirrorPhysics = scene.physics.add.existing(this.mirror, 0);
        this.mirrorPosition = 0;
        this.mirrorPhysics.body.setAllowGravity(false);

        scene.anims.create({
            key: 'pos1',
            frames: scene.anims.generateFrameNumbers('mirror', { start: 0, end: 1 }),
            frameRate: 10,
            repeat: 0
        });

        scene.anims.create({
            key: 'pos2',
            frames: scene.anims.generateFrameNumbers('mirror', { start: 1, end: 2 }),
            frameRate: 10,
            repeat: 0
        });

        scene.anims.create({
            key: 'pos3',
            frames: scene.anims.generateFrameNumbers('mirror', { start: 2, end: 3 }),
            frameRate: 10,
            repeat: 0
        });

        scene.anims.create({
            key: 'pos4',
            frames: scene.anims.generateFrameNumbers('mirror', { start: 3, end: 4 }),
            frameRate: 10,
            repeat: 0
        });

        scene.anims.create({
            key: 'pos5',
            frames: scene.anims.generateFrameNumbers('mirror', { start: 4, end: 5 }),
            frameRate: 10,
            repeat: 0
        });

        scene.anims.create({
            key: 'pos6',
            frames: scene.anims.generateFrameNumbers('mirror', { start: 5, end: 6 }),
            frameRate: 10,
            repeat: 0
        });

        scene.anims.create({
            key: 'pos7',
            frames: scene.anims.generateFrameNumbers('mirror', { start: 6, end: 7 }),
            frameRate: 10,
            repeat: 0
        });

        scene.anims.create({
            key: 'pos0',
            frames: scene.anims.generateFrameNumbers('mirror', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: 0
        });
    }

    getMirrorPhysics(){
        return this.mirrorPhysics;
    }
}

class GravitySwitch{
    constructor(scene, onX, onY, offX, offY, nameOn, nameOff){
        this.upsideDown = false;

        this.switchOn = scene.add.sprite(onX, onY, nameOn);
        scene.physics.add.existing(this.switchOn, 1);
        scene.anims.create({
            key: 'offUp',
            frames: scene.anims.generateFrameNumbers(nameOn, {start: 0, end: 0}),
            frameRate: 10,
            repeat: 0
        });
        scene.anims.create({
            key: 'onUp',
            frames: scene.anims.generateFrameNumbers(nameOn, {start: 0, end: 2}),
            frameRate: 10,
            repeat: 0
        });

        this.switchOff = scene.add.sprite(offX, offY, nameOff);
        scene.physics.add.existing(this.switchOff, 1);
        this.switchOff.setRotation(Math.PI);
        scene.anims.create({
            key: 'offDown',
            frames: scene.anims.generateFrameNumbers(nameOff, {start: 0, end: 0}),
            frameRate: 10,
            repeat: 0
        });
        scene.anims.create({
            key: 'onDown',
            frames: scene.anims.generateFrameNumbers(nameOff, {start: 0, end: 2}),
            frameRate: 10,
            repeat: 0
        });
    }

    addTrigger(scene, playerShape, playerShape2, playerPhysics, playerPhysics2){
        scene.physics.add.collider(playerShape, this.switchOn, function(){
            this.switchOn.anims.play('onUp', false);
            this.switchOff.anims.play('offDown', false);
            this.upsideDown = true;
            playerShape.flipY = true;
            playerShape2.flipY = true;
            playerPhysics.body.setGravityY(-400);
            playerPhysics2.body.setGravityY(-400);
        }, null, this);

        scene.physics.add.collider(playerShape, this.switchOff, function(){
            this.switchOff.anims.play('onDown', false);
            this.switchOn.anims.play('offUp', false);
            this.upsideDown = false;
            playerShape.flipY = false;
            playerShape2.flipY = false;
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

    addPlayerCollide(scene, playerShape, playerShape2, eng, startX, startY, startX2, startY2){
        scene.physics.add.collider(playerShape, this.spikes, function(){
            if (this.hp.getHP() > 0){
                this.hp.takeDamage();
                playerShape.setPosition(startX, startY);
            } else {
                scene.scene.start('gameOverScene', {english: eng});
                this.hp.resetDamage();
                playerShape.setPosition(startX, startY);
                playerShape2.setPosition(startX2, startY2);
            }
        }, null, this);
    }

    setAlpha(value){
        this.spikes.setAlpha(value);
    }
}

class Life{

    constructor(scene, english){
        this.lifes = 3;
        this.lifesText = scene.add.text(0, 300, 'Vidas: ' + this.lifes, {font: '32px'});
        this.english = english;
        if (this.english){
            this.lifesText.setText('Lives: ' + this.lifes);
        }
    }

    getHP(){
        return this.lifes;
    }

    takeDamage(){
        this.lifes--;
        this.lifesText.setText('Vidas: ' + this.lifes);
        if (this.english){
            this.lifesText.setText('Lives: ' + this.lifes);
        }
    }

    resetDamage(){
        this.lifes = 3;
        this.lifesText.setText('Vidas: ' + this.lifes);
        if (this.english){
            this.lifesText.setText('Lives: ' + this.lifes);
        }
    }
}

class Box{

    constructor(scene, destX, destY, boxX, boxY, sizeX, sizeY, name){
        this.startX = boxX;
        this.startY = boxY;

        this.dest = scene.add.rectangle(destX, destY, sizeX, sizeY, 0x000000);
        this.dest.setFillStyle(0xffff00, 0);
        this.dest.setStrokeStyle(3, 0xffff00, 1);
        scene.physics.add.existing(this.dest, 1);

        this.box = scene.add.sprite(boxX, boxY, name);
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

    addResetCollide(scene, object){
        scene.physics.add.collider(this.box, object);/*, function(){
            this.box.setPosition(this.startX, this.startY);
        }, null, this);*/
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

    constructor(scene, enterX, enterY, exitX, exitY, nameEnter, nameExit){
        this.tpEnter = scene.add.sprite(enterX, enterY, nameEnter);
        this.tpExit = scene.add.sprite(exitX,exitY, nameExit);
        this.tpEnter.setDepth(8);
        this.tpExit.setDepth(8);
        this.tpPhysics = scene.physics.add.existing(this.tpEnter, 1);
    }

    addCollide(scene, object){
        scene.physics.add.collider(object, this.tpEnter, function(){
            object.setPosition(this.tpExit.x, this.tpExit.y);
        }, null, this);
    }

    setScale(factorX, factorY){
        this.tpEnter.setScale(factorX, factorY);
        this.tpPhysics.setScale(factorX, factorY);
        this.tpExit.setScale(factorX, factorY);
    }
}

class Scaffold{
    constructor(scene, posX, posY, nameEnter, sizeX, sizeY, offX, offY){
        this.and = scene.add.sprite(posX, posY, nameEnter);
        this.andPhysics = scene.physics.add.existing(this.and, 1);
        this.andPhysics.body.setSize(sizeX, sizeY);
        this.andPhysics.body.setOffset(offX, offY);
    }

    addCollide(scene, object){
        scene.physics.add.collider(object, this.and);
    }

    rotate(angle){
        this.and.setRotation(angle);
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