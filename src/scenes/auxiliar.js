
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
        //this.staticPlatformPhysics.body.setSize(sizeX, sizeY);
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
        scene.physics.add.collider(playerShape, this.movingPlatform, function(){
            if (!playerShape.locked){
                playerShape.locked = true;
                playerShape.lockedTo = this.movingPlatform;
                playerShape.body.velocity.y = 0;
            } else {
                if (playerShape.body.right < playerShape.lockedTo.body.x || playerShape.body.x < playerShape.lockedTo.body.right){
                    playerShape.locked = false;
                    playerShape.lockedTo = null;
                } else {
                    playerShape.x += playerShape.lockedTo.deltaX;
                    playerShape.y += playerShape.lockedTo.deltaY;
                }
            }
        }, null, this);
    }

    setAlpha(value){
        this.movingPlatform.setAlpha(value);
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
            ],
        });
    }

    setMovementTime(scene, displaceX, displaceY, time){   //Set movement - Basic linear movement
        scene.tweens.timeline({
            targets: this.movingPlatformPhysics.body.velocity,
            loop: -1,
            tweens: [
                { x:displaceX, y:displaceY, duration: time, ease: 'Stepped' },
                { x:0, y:0, duration: 2000, ease: 'Stepped' },
                { x:-displaceX, y:-displaceY, duration: time, ease: 'Stepped' },
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

class DualDropPlatform{ //DOUBLE DROP PLATFORM
    constructor(scene, pos1X, pos1Y, pos2X, pos2Y, name){   //Sprite constructor
        this.starting1X = pos1X;
        this.starting1Y = pos1Y;
        this.starting2X = pos2X;
        this.starting2Y = pos2Y;

        this.dropPlatform1 = scene.add.sprite(pos1X, pos1Y, name);
        this.dropPlatformPhysics1 = scene.physics.add.existing(this.dropPlatform1, 0);
        this.dropPlatformPhysics1.body.setAllowGravity(false);
        this.dropPlatformPhysics1.body.setImmovable(true);

        this.dropPlatform2 = scene.add.sprite(pos2X, pos2Y, name);
        this.dropPlatformPhysics2 = scene.physics.add.existing(this.dropPlatform2, 0);
        this.dropPlatformPhysics2.body.setAllowGravity(false);
        this.dropPlatformPhysics2.body.setImmovable(true);
    }

    addWorldCollider(scene, object){
        scene.physics.add.collider(this.dropPlatform1, object);
        scene.physics.add.collider(this.dropPlatform2, object);
    }

    resetPlatforms(scene, sec){
        scene.time.delayedCall(1000 * sec, function(){
            this.dropPlatformPhysics2.body.setAllowGravity(false);
            this.dropPlatform2.setPosition(this.starting2X, this.starting2Y);
            this.dropPlatformPhysics2.body.setImmovable(true);
            this.dropPlatformPhysics2.body.setVelocity(0, 0);

            this.dropPlatformPhysics1.body.setAllowGravity(false);
            this.dropPlatform1.setPosition(this.starting1X, this.starting1Y);
            this.dropPlatformPhysics1.body.setImmovable(true);
            this.dropPlatformPhysics1.body.setVelocity(0, 0);
        }, [], this);
    }

    addPlayerCollide(scene, playerShape, sec){   //Player collider
        scene.physics.add.collider(playerShape, this.dropPlatform1, function(){
            if(this.dropPlatformPhysics1.body.allowGravity === false) {
                scene.time.delayedCall(1500, function(){
                    this.dropPlatformPhysics1.body.setImmovable(false);
                    this.dropPlatformPhysics1.body.setAllowGravity(true);

                    this.dropPlatformPhysics2.body.setImmovable(false);
                    this.dropPlatformPhysics2.body.setAllowGravity(true);
                }, [], this);
            }
            this.resetPlatforms(scene, sec);
        }, null, this);

        scene.physics.add.collider(playerShape, this.dropPlatform2, function(){
            if(this.dropPlatformPhysics2.body.allowGravity === false) {
                scene.time.delayedCall(1500, function(){
                    this.dropPlatformPhysics2.body.setImmovable(false);
                    this.dropPlatformPhysics2.body.setAllowGravity(true);

                    this.dropPlatformPhysics1.body.setImmovable(false);
                    this.dropPlatformPhysics1.body.setAllowGravity(true);
                }, [], this);
            }
            this.resetPlatforms(scene, sec);
        }, null, this);
    }

    rotate(angle){
        this.dropPlatform1.setRotation(angle);
        this.dropPlatform2.setRotation(angle);
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

class pressurePlate{

    constructor(scene, posX, posY, name, player1, player2){
        this.scene = scene;
        this.plate = scene.add.sprite(posX,posY, name);
        this.platePhysics = scene.physics.add.existing(this.plate, 1);
        this.player1 = player1;
        this.player2 = player2;

        this.addPlayerCollide(player1);
        this.addPlayerCollide(player2);

        scene.anims.create({
            key: 'press',
            frames: scene.anims.generateFrameNumbers(name, { start: 1, end: 1 }),
            frameRate: 10,
            repeat: 0
        });

        scene.anims.create({
            key: 'release',
            frames: scene.anims.generateFrameNumbers(name, { start: 0, end: 0 }),
            frameRate: 10,
            repeat: 0
        });
    }
    addPlayerCollide(playerShape){   //Player collider
        this.scene.physics.add.overlap(playerShape,this.plate);
    }

    press(){
        this.plate.anims.play('press', false);
    }

    release(){
        this.plate.anims.play('release', false);
    }

}
class Door{
    constructor(scene, posX, posY, name){
        this.scene = scene;
        this.door = scene.add.sprite(posX,posY, name);
        this.doorPhysics = scene.physics.add.existing(this.door, 1);
        this.playerColliders = new Array(null,null);
        this.players = 0;

        scene.anims.create({
            key: 'open',
            frames: scene.anims.generateFrameNumbers(name, { start: 0, end: 5 }),
            frameRate: 10,
            repeat: 0
        });
    }

    scale(sX, sY){
        this.door.setScale(sX,sY);
    }
    open(){
        this.door.anims.play('open', false);
        var i;
        for(i=0; i<this.players; i++)
            this.scene.physics.world.removeCollider(this.playerColliders[i]);

        this.players =0;
    }

    addPlayerCollide(playerShape){   //Player collider
        this.playerColliders[this.players] = this.scene.physics.add.collider(playerShape,this.door);
        this.players++;
    }
}
class Mirror{

    constructor(scene, posX, posY, name){
        this.active = false;
        this.previous = null;
        this.next = null;
        this.correctPos = false;
        this.objectsList = new Array(null, null);
        this.doorList = new Array(null, null);
        this.objectCount = 0;
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

    addObject(object) {
        if (this.objectCount < 2) {
            this.objectsList[this.objectCount] = object;
            this.objectCount++;
        }
    }

    getMirrorPhysics(){
        return this.mirrorPhysics;
    }

    getActive(){
        return this.active;
    }

    addPrevious(prevMirror){
        this.previous = prevMirror;
    }

    addNext(nextMirror){
        this.next = nextMirror;
    }

    addDoors(door1, door2){
        this.doorList[0] = door1;
        this.doorList[1] = door2;
    }

    setActive(bool){
        this.correctPos = bool;
        if(this.previous != null) {
            if(this.previous.getActive()) {
                this.active = bool;
            }
            else{
                this.active = false;
            }
        }
        else{
            this.active = bool;
        }
        this.checkActive();
    }
    checkActive(){
        var i;
        if(this.active){
            if(this.previous != null) {
                if(this.previous.getActive()) {
                    for (i = 0; i < this.objectCount; i++) {
                        this.objectsList[i].setAlpha(100)
                    }
                    if(this.next == null) {
                        this.doorList[0].open();
                        this.doorList[1].open();
                    }
                }
            }else{
                for (i = 0; i < this.objectCount; i++) {
                    this.objectsList[i].setAlpha(100)
                }
            }
        }
        else{
            for(i=0; i<this.objectCount; i++){
                this.objectsList[i].setAlpha(0)
            }
        }

        if(this.next != null){
            this.next.setActive(this.next.correctPos);
        }
    }
    rotate(angle){
        this.mirror.setRotation(angle);
    }
    scale(sizeX, sizeY){
        this.mirror.setScale(sizeX, sizeY);
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
                scene.scene.start('gameOverScene', {english: eng,level : scene.level });
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

    rotateEnter(angle){
        this.tpEnter.setRotation(angle);
    }

    rotateExit(angle){
        this.tpExit.setRotation(angle);
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
    constructor(scene, buttonX, buttonY, doorX, doorY, nameB, nameD){
        this.button = scene.add.sprite(buttonX, buttonY, nameB);
        scene.physics.add.existing(this.button, 1);
        scene.anims.create({
            key: 'pressed',
            frames: scene.anims.generateFrameNumbers(nameB, {start: 0, end: 2}),
            frameRate: 10
        });

        this.door = scene.add.sprite(doorX, doorY, nameD);
        this.door.setScale(0.5, 0.445);
        scene.anims.create({
            key: 'open',
            frames: scene.anims.generateFrameNumbers(nameD, {start: 1, end: 1}),
            frameRate: 10
        });
        scene.physics.add.existing(this.door, 1);
    }

    addCollideDoor(scene, playerShape){
        this.doorCollider = scene.physics.add.collider(playerShape, this.door);
    }

    addCollideButton(scene, playerShape){
        scene.physics.add.collider(playerShape, this.button, function(){
            this.door.anims.play('open', false);
            this.button.anims.play('pressed', false);
            scene.physics.world.removeCollider(this.doorCollider);
        }, null, this);
    }
}