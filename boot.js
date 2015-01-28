var Main = {};

Main.Boot = function (game) 
{
	this.game = game;
};

Main.Boot.prototype = 
{

preload: function () 
{
	//***
	//***
},

create: function () 
{
	// this.game.stage.enableOrientationCheck(true, false, 'orientation');
	this.game.state.start('preloader',Main.Preloader);
},


}