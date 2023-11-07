class Instruction extends Phaser.Scene {
    constructor(){
        super("instructionScene");
    }

    create() {
        this.background = this.add.tileSprite(0, 0, 640, 480, 'background').setOrigin(0, 0);
    
        let instructionConfig = {
            fontFamily: 'Georgia', 
            fontSize: '16px', 
            backgroundColor: 'transparent',
            color: 'orange',
            align: 'center',
            padding: {
                top: 5, 
                bottom: 5,
            },
            fixedWidth: 0
        };
        const mssg = `SpaceFootballRun is an endless runner where the football player is running while avoiding football missiles! 
       
        Your goal is to run and avoid the missiles!

        Use the space bar to jump. Good Luck!!
        `;
    
        this.add.text(game.config.width/2, 200, instruction , instructionConfig).setOrigin(0.5);
        this.add.text(game.config.width/2, 300, 'Click <- to go back to menu' , instructionConfig).setOrigin(0.5);
        
    
    
    }


    update(){
        this.background.tilePositionX -= 2;
    }




}