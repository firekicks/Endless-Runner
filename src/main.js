/*
Atri Mehta
Football Run
Took me roughly 30 hours to complete the game.

Tilts:
I'm very proud of the physics and animations I added. The physics was really difficult in terms of making the ground a collider
so the player sprite knows where the ground is. Messing around with the gravity and the sizing of the sprite was a little difficult
but with the help of Nate I was able to get it.

I'm also really proud of the hard, even if it does not look like it. I can not draw anything to save my life so being able to mess around 
on pixelart was fun. I made all the designs while suffering from every possible symptom of COVID was a challenge.
Overall this assignment challenged me and I learned so much and had a blast developing it!







*/
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {y:100},
            debug: false
        }
    },
    scene: [Menu, Instruction, Credit, Play]
}

let game = new Phaser.Game(config);

//keyboard
let keySpace, keyRIGHT, keyLEFT, keyI, keyC, keyP, keyR; 


// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;