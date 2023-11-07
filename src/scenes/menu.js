class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        this.load.image('background', './assets/background.png');
        this.load.audio('backgroundmusic', './assets/backgroundmusic.mp3')
    }


    create() {
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

       //add music, set volume, play it
       this.backgroundmusic = this.sound.add('backgroundmusic', {volume: 0.4});   
       this.backgroundmusic.loop = true; 
       this.backgroundmusic.play();
        
        // Menu configuration
        let menuConfig = {
            fontFamily: 'Georgia', 
            fontSize: '28px', 
            backgroundColor: 'transparent',
            color: 'green ',
            align: 'right',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 0
        };
        this.add.text(game.config.width/2, game.config.height/2.5 - borderUISize - borderPadding, 'WELCOME TO SPACE FOOTBALL RUN!', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/2.1, 'Press H for instructions', menuConfig).setOrigin(0.5);
        menuConfig.color = 'red';
        this.add.text(game.config.width/2, game.config.height/1.68, 'Press -> to start game', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.4, 'Press C for credits', menuConfig).setOrigin(0.5);

        //define keys
      //  keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        //keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        //keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
    }

    
    update(){
        this.background.tilePositionX -= 2; 
    }
}

