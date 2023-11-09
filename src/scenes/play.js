class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }
    preload(){
        this.load.audio('gamemusic', './assets/gamemusic.mp3')
        this.load.audio('explosion','./assets/explosion.wav');
        this.load.audio('jump','./assets/jump.mp3');

        this.load.image('rocket','./assets/rocket.png');
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

    this.player = this.physics.add.sprite(100, this.sys.game.config.height / 2, 'footballplayer');
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


} 






    
createAnimations(animKey, spriteKey, startFrame, endFrame, loopTimes, frameRate) {
    return this.anims.create({
        key: animKey,
        frames: this.anims.generateFrameNumbers(spriteKey, { start: startFrame, end: endFrame }),
        frameRate: frameRate,
        repeat: loopTimes,
        });
    }

    checkCollision(player, rocket) {
        //simple AABB checking 
       if(player.x < rocket.x + rocket.width && player.x + 5 > rocket.x && player.y < rocket.y + 70 && 40 + player.y > rocket.y){
           return true;
       }
       else{
           return false; 
       }

   }
   rocketExplode(rocket){
    const emitter = this.add.particles(400, 250, 'explosion', {
        lifespan: 4000,
        speed: { min: 150, max: 250 },
        scale: { start: 0.8, end: 0 },
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

    
   }

updateScore() {
    this.playerScore++; // Increment the player's score
    this.scoreValue.setText(this.playerScore.toString()); // Update the text to reflect the new score
}


update() {
    this.background.tilePositionX -= 2;
    this.ground.tilePositionX -=2;
       
    if (Phaser.Input.Keyboard.JustDown(keySpace) && this.player.body.onFloor()) {
        this.player.setVelocityY(-100);
        this.player.play('jump');
    
        if (!this.jumpAudio.isPlaying) {
            this.jumpAudio.play();
        }
        } else if (this.player.body.onFloor()) {
            // When the player is on the floor and the jump key is not pressed, continue with the running animation.
            this.player.play('playerRun', true);
        }
    }
}