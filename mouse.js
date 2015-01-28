function Mouse(){
	this.sprite = game.load.spritesheet('mouse', 'img/mouse.png',225,113,12);
}

Mouse.prototype = {
	create: function(x,y){
	    this.sprite = spriteLayer.create(x,y, 'mouse');
        this.sprite.scale.set(0.5,0.5);
        this.sprite.anchor.setTo(.5,.5);
        this.sprite.health=1;
        
        this.sprite.animations.add('nice',[0,1,2,3,2,1]);
        this.sprite.animations.add('angry',[4,5,6,7,6,5]);
        this.sprite.animations.add('ghost',[8]);
        this.sprite.animations.play('nice', 4, true);
	},

	update: function()
	{
		//TO DO
	}
}