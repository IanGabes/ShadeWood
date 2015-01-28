Bear = function(){
	this.sprite = game.load.spritesheet('bear', 'img/bear_fullSpriteSheet.png',496,369);
}


Bear.prototype = {
	create: function(x,y){
		this.sprite = spriteLayer.create(x, y, 'bear');
        this.sprite.animations.add('bear',[0,1],7,true);
        this.sprite.animations.add('bearevilidle',[4,5],7,true);
        this.sprite.animations.add('beargoodidle',[8,9],7,true);
        this.sprite.animations.add('beargoodattack',[28,29,30,31,28],7,true);
        this.sprite.animations.add('bearevilattack',[24,25,26,27,24],7,true);
        this.sprite.anchor.setTo(.5,1);
        this.sprite.animations.play('bear',6,true);
	},

	update: function(){
		//TO DOs
	}
}