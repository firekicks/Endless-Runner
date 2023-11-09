class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.audio('gamemusic', './assets/gamemusic.mp3')
        this.load.audio('explosion','./assets/explosion.wav');
        this.load.audio('jump','./assets/jump.mp3');
        this.load.audio('shot', './assets/rocket_shot.wav')

        this.load.image('rocket','./assets/rocket.png');
        this.load.image('particle','./assets/particle.png');
        this.load.image('ground','./assets/ground.png');

        this.load.spritesheet('footballplayer', './assets/footballplayer.png', {frameHeight: 66, frameWidth: 69});

    }

create() {
    this.gameOver = false; 

    this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);

    // Stop background music from the Menu scene
    this.sound.stopByKey('backgroundmusic');

    // Add and play game music 
    this.gameMusic = this.sound.add('gamemusic', { volume: 0.25, loop: true });
    this.gameMusic.play();

    this.ground = this.physics.add.staticImage(200, 450, 'ground').setScale(2).refreshBody();

    this.player = this.physics.add.sprite(50, this.sys.game.config.height / 2, 'footballplayer');
    this.player.setCollideWorldBounds(true); 

        
    this.createAnimations('playerRun', 'footballplayer', 0, 3, -1, 10);
    this.player.play('playerRun');
    this.player.destroyed = false; 
        


    //jump
    this.createAnimations('jump', 'footballplayer', 2, 2, -1, 10);
    this.jumpAudio = this.sound.add('jump', {volume: 0.5});
    keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    this.physics.add.collider(this.player, this.ground);
        
    this.playerScore = 0;

    this.scoreText = this.add.text(30, 50, 'Score: ', {
        fontSize: '30px',
        fill: '#ffffff',
        fontFamily: '"Georgia"',
        strokeThickness: 10,
        stroke: 'black',
        });
  
    let scoreConfig = {
        fontSize: '30px',
        fill: '#ffffff',
        fontFamily: '"Georgia"',
        strokeThickness: 5,
        stroke: 'black',
    };
  
  
  
    this.timer = this.time.addEvent({delay: 1000, callback: this.updateScore, callbackScope: this, loop: true });
    this.scoreValue = this.add.text(140, 50, this.playerScore, scoreConfig);

    this.rocket = new Rocket(this, game.config.width, borderUISize*9 + borderPadding*6, 'rocket').setScale(0.5);
    
    this.rocketAudio = this.sound.add('shot', {volume: 0.5});
    this.explodeAudio = this.sound.add('explosion', {volume: 0.5});
    keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);

    this.restartPrompt = this.add.text(this.sys.game.config.width / 2, this.sys.game.config.height / 2, 'GAME OVER! Press R to Restart', {
        fontSize: '28px',
        fill: '#FFFFFF',
        fontFamily: '"Georgia"',
        strokeThickness: 5,
        stroke: 'black',
        align: 'center'
    }).setOrigin(0.5).setVisible(false);


} 
    
createAnimations(animKey, spriteKey, startFrame, endFrame, loopTimes, frameRate) {
    return this.anims.create({
        key: animKey,
        frames: this.anims.generateFrameNumbers(spriteKey, { start: startFrame, end: endFrame }),
        frameRate: frameRate,
        repeat: loopTimes,
        });
    }



   rocketExplode(rocket){
    const emitter = this.add.particles(400, 250, 'particle', {
        lifespan: 4000,
        speed: { min: 180, max: 220 },
        scale: { start: 0.1, end: 0 },
        gravityX: rocket.x,
        gravityY: rocket.y,
        blendMode: 'ADD',
        emitting: false
    });
    //temporarily hide ship 
    rocket.alpha = 0; 
    //create explosion
    emitter.explode(16);
    
    rocket.reset(); //reset position of ship
    rocket.alpha = 1;  //make ship visible
    this.explodeAudio.play(); 

}
checkCollision(player, rocket) {
    // AABB checking 
    if (player.x < rocket.x + rocket.width && player.x + 5 > rocket.x && player.y < rocket.y + 70 && 40 + player.y > rocket.y) {
        this.endGame();
        return true;
    } else {
        return false; 
    }
}
endGame() {
    this.gameOver = true;
    this.physics.pause(); 
    this.player.setTint(0xff0000); 
    this.restartPrompt.setVisible(true); 
}

updateScore() {
    if (this.gameOver) { 
        return; 
    }
    this.playerScore++; 
    this.scoreValue.setText(this.playerScore.toString()); 
}



update() {
    this.background.tilePositionX -= 2;
    this.ground.tilePositionX -=2;

    if(this.gameOver && Phaser.Input.Keyboard.JustDown(keyR)){
        this.scene.restart(); 
    }
       
    if (!this.gameOver) { // Check if the game is not over
        if (Phaser.Input.Keyboard.JustDown(keySpace) && this.player.body.onFloor()) {
            this.player.setVelocityY(-100);
            this.player.play('jump');

            if (!this.jumpAudio.isPlaying) {
                this.jumpAudio.play();
            }
        } else if (this.player.body.onFloor()) {
            this.player.play('playerRun', true);
        }

        if (this.rocket) {
            this.rocket.update();
        }

        if(this.checkCollision(this.player, this.rocket)){
            this.rocketExplode(this.rocket);
            this.gameOver = true;
            }
        }
    }
}