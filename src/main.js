let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu]
}

let game = new Phaser.Game(config);

//keyboard
let keySpace, keyRIGHT, keyLEFT; 


// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;