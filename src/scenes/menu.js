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
       //music will not restart between the scenes 
       if (!this.sound.get('backgroundmusic')) {
        this.backgroundmusic = this.sound.add('backgroundmusic', { volume: 0.1, loop: true });
        this.backgroundmusic.play();
        }
        
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
        this.add.text(game.config.width/2, game.config.height/2.15 - borderUISize - borderPadding, 'WELCOME TO FOOTBALL RUN!', menuConfig).setOrigin(0.5);

        this.add.text(game.config.width/2, game.config.height/2, 'Press I for Instructions', menuConfig).setOrigin(0.5);
        menuConfig.color = 'red';
        this.add.text(game.config.width/2, game.config.height/1.68, 'Press P to Play', menuConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, game.config.height/1.4, 'Press C for credits', menuConfig).setOrigin(0.5);

        //define keys
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        keyC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
    }

    
    update(){
        this.background.tilePositionX -= 2; 

        if (Phaser.Input.Keyboard.JustDown(keyI)) {
             this.scene.start("instructionScene");    
        }

        if (Phaser.Input.Keyboard.JustDown(keyC)){
            this.scene.start("creditScene")
        }

        if (Phaser.Input.Keyboard.JustDown(keyP)){
            this.scene.start("playScene")
        }

    }
}

