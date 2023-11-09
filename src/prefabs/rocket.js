class Rocket extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);
        //add object to existing scene
        scene.add.existing(this);
    }

    update() {
        this.x -= 5; 
        //console.log(this.x);
        //wrap around from left edge to right edge
        if(this.x <= 0 - this.width) {
            this.x = game.config.width; 
            this.y = Math.floor(Phaser.Math.Between(borderUISize*12 + borderPadding*6, borderUISize*7 + borderPadding*9));  
        }
    }

    //position reset
    reset() {
        //this.x = Math.floor(Math.random()); 
        this.x = game.config.width; 
        this.y = Math.floor(Phaser.Math.Between(borderUISize*12 + borderPadding*6, borderUISize*7 + borderPadding*9));

    }
}