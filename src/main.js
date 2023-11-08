let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 480,
    scene: [Menu, Instruction, Credit]
}

let game = new Phaser.Game(config);

//keyboard
let keySpace, keyRIGHT, keyLEFT, keyI, keyC, keyP; 


// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;