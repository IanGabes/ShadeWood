function Ghost(){
	this.sprite = game.load.spritesheet('ghost', 'img/shade.png',200,300);

    this.speed = 4;
}

Ghost.prototype ={
	create: function(x, y){
       	this.sprite = spriteLayer.create(x, y, 'ghost');
        this.sprite.animations.add('idle', [0,1,2,3,4], 7, true);
        this.sprite.animations.add('possess',[1,2,3,4,5],6,true);
        this.sprite.animations.add('neophyte',[18,19,20,21],7,true);
        this.sprite.animations.add('transform',[26,27,28,29,30,31,32,33,34,0,1,2,3,4],9,true);
        this.sprite.anchor.setTo(.5,1);
        this.sprite.body.gravity.y = 0;
        this.sprite.body.allowGravity = false;
        this.sprite.animations.play('idle');
	},

	update: function(){
		if(game.input.keyboard.isDown(Phaser.Keyboard.P) && this.sprite.key == 'ghost'){
            //REDO ME
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.L) && (this.sprite.key !=  'ghost')){
            //REDO ME
        }
        else if(game.input.keyboard.isDown(Phaser.Keyboard.M) && this.sprite.key != 'ghost'){
            //REDO ME
        }

        if(this.sprite.body.x <= game.camera.x){
            this.sprite.body.x = game.camera.x;
        }
        if (this.sprite.body.x >= game.camera.x + 1280 - this.sprite.body.width) {
            this.sprite.body.x = game.camera.x + 1280 - this.sprite.body.width;
        }
        if (this.sprite.body.y <= 0) {
            this.sprite.body.y = game.camera.y;
        }
        if (this.sprite.body.y >= 800 - this.sprite.body.height) {
            this.sprite.body.y = 800 - this.sprite.body.height;
        }
        if(cursors.left.isDown){
            this.sprite.body.x -= speed;
            this.sprite.scale.x=1;
        }
        if(cursors.right.isDown){
            this.sprite.body.x += speed;
            this.sprite.scale.x=-1;
        }
        if(cursors.up.isDown){
            this.sprite.y -= speed;
        }
        if(cursors.down.isDown){
            this.sprite.y += speed;
        }
	}
}