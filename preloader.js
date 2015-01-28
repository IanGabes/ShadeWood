Main.Preloader = function (game) 
{
    this.game = game;
};

Main.Preloader.prototype = 
{
    loaderFull: Phaser.Sprite,
    loaderEmpty: Phaser.Sprite,
    test:Phaser.Sprite,

    preload: function () 
    {

        this.load.onFileComplete.add(this.fileLoaded, this);
    },
    create: function () 
    {        
        this.game.state.start('mainMenu', Main.MainMenu);
    },
    fileLoaded: function (progress) 
    {
       // console.log(this.loaderFull.crop.width);
        this.loaderEmpty.crop.left = (135 / 100) * progress;
        this.loaderFull.crop.width = (135 / 100) * progress;
    }
}