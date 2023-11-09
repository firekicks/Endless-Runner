//missile prefab
class Missile extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        //add object to existing scene displayList and updateList
        scene.add.existing(this);

        if(this.x <= 0 - this.width) {
            this.x = game.config.width; 
            //randomize spawn/direction 
            this.y = Math.floor(Phaser.Math.Between(borderUISize*12 + borderPadding*6, borderUISize*7 + borderPadding*9));
        }
    }
    reset() {
        //this.x = Math.floor(Math.random()); 
        this.x = game.config.width; 
        this.y = Math.floor(Phaser.Math.Between(borderUISize*12 + borderPadding*6, borderUISize*7 + borderPadding*9));


    }
}

