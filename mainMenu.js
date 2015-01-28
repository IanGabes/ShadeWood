Main.MainMenu = function (game) {
	this.game = game;

}
	var space;
Main.Preloader.prototype = 
{

	preload: function () 
    {
    	this.game.load.spritesheet('space', 'img/pressspace.png',375,40)
    	this.game.load.image('menu', 'img/titlescreen.png');
    },
    create: function () 
    {
    	
    	
    	this.game.add.sprite(0,0, 'menu');
    	space = this.game.add.sprite(310,710,'space');
    	space.animations.add('space',[0,1,2,3,4,5,5,4,3,2,1,0],6,true);
		space.animations.play('space');

    },
    update: function ()
    {
	   	if (this.game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR))
	   	{
			this.game.state.start('level1', Main.Level1);
    	}

    }

}