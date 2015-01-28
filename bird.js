Bird = function(){
	this.sprite = game.load.spritesheet('bird', 'img/bird_fullSpriteSheet.png',170,170,20);
}

Bird.prototype = {
	create: function(x,y){
        this.sprite = spriteLayer.create(x, y, 'bird');
        this.sprite.animations.add('bird', [0,1,2,3] ,1,true);
        this.sprite.animations.add('birdevilidle', [4,5,6,7] ,8,true);
        this.sprite.animations.add('birdgoodidle', [8,9,10,11] ,8,true);
        this.sprite.animations.add('birdevilattack', [12,13,14,15] ,8,true);
        this.sprite.animations.add('birdgoodattack', [16,17,18,19] ,8,true);
        this.sprite.anchor.setTo(.5,1);
        this.sprite.body.gravity.y=0;
        this.sprite.body.allowGravity=false;
        this.sprite.animations.play('bird',6,true);
	},

	update: function(){
		//TO DO
	}

}