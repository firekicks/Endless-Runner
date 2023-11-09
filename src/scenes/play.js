class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.audio('gamemusic', './assets/gamemusic.mp3')
        this.load.audio('explosion','./assets/explosion.wav');
        this.load.audio('jump','./assets/jump.mp3');

        this.load.image('footballmissile', './assets/footballmissile.png');

        this.load.spritesheet('footballplayer', './assets/footballplayer.png', {frameHeight: 66, frameWidth: 69});

    }

    create() {
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

        // Stop background music from the Menu scene
        this.sound.stopByKey('backgroundmusic');

        // Add and play game music 
        this.gameMusic = this.sound.add('gamemusic', { volume: 0.25, loop: true });
        this.gameMusic.play();

        this.player = this.physics.add.sprite(100, this.sys.game.config.height / 2, 'footballplayer');
        this.player.setCollideWorldBounds(true); 

        this.player.y -= 10
        this.createAnimations('playerRun', 'footballplayer', 0, 3, -1, 10);
        this.player.play('playerRun');
        this.player.destroyed = false; 
        


        //jump
        this.createAnimations('jump', 'player', 2, 2, -1, 10);
        this.jumpAudio = this.sound.add('jump', {volume: 0.5});
        keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        


    } 
    createAnimations(animKey, spriteKey, startFrame, endFrame, loopTimes, frameRate) {
        return this.anims.create({
          key: animKey,
          frames: this.anims.generateFrameNumbers(spriteKey, { start: startFrame, end: endFrame }),
          frameRate: frameRate,
          repeat: loopTimes,
        });
      }

    update() {
        this.background.tilePositionX -= 2;

        if (Phaser.Input.Keyboard.JustDown(keySpace) && this.player.body.onFloor()) {
        this.player.setVelocityY(-160);
        this.player.play('jump');

        // Initialize jumpAudio if it's not already initialized
        if (!this.jumpAudio.isPlaying) {
            this.jumpAudio.play();
        }
    }
        
    } 
}