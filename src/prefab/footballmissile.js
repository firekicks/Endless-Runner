//missile prefab

class Rocket extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        //add object to existing scene displayList and updateList
        scene.add.existing(this);
        
       
    
    }





}