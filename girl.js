function Girl(){
	this.sprite = game.load.spritesheet('girl', 'img/girl.png',146,164);
	this.speed = 350;
}

Girl.prototype = {
	create: function(x, y) {
	    this.sprite = spriteLayer.create(x,y, 'girl');  
	    this.sprite.animations.add('girlmove', [6,7,8,9,10,11],0,true);   
	    this.sprite.animations.add('girlIdle', [0,1,2] ,4,true);
	    this.sprite.animations.add('girlsmack',[3,4,5] ,8,true);
	    this.sprite.anchor.setTo(.5,1);
	    this.sprite.animations.play('girlIdle');
	},

	update: function(wasd){
	    if(wasd.left.isDown)
	    {
	        this.sprite.body.velocity.x = -this.speed;
	        this.sprite.scale.x=-1;
	        this.sprite.animations.play('girlmove',8,true);
	        if(game.camera.x > 0 && game.camera.x <2560 && this.sprite.body.deltaX >.2)
	        {   
	            //treeline.body.velocity.x =- girlSpeed*.3;
	        }
	    }
	    else if(wasd.right.isDown){
	        this.sprite.body.velocity.x = this.speed;
	        this.sprite.scale.x=1;
	        this.sprite.animations.play('girlmove',8,true);
	        if(game.camera.x > 0 && game.camera.x < 2560 && this.sprite.body.deltaX >.2){
	            
	            //treeline.body.velocity.x =+ girlSpeed*.3;
	        }
	    }
	    else if(wasd.down.isDown)
	    {
	        this.sprite.body.velocity.y = +this.speed;
	        this.sprite.animations.play('girlsmack',12,true);
	    }
	    else
	    {
	        this.sprite.animations.play('girlIdle', 8,true);
	    }
	    if(!this.sprite.floored)
	    {
	        this.sprite.body.velocity.x *=.8
	    }
	    if(this.sprite.body.onFloor())
	    {
	        console.log(this.sprite.body.onFloor());
	    }
	    if (wasd.up.isDown && this.sprite.floored && game.time.now > jumpTimer)
	    {
	        //console.log("Jumping");
	        this.sprite.body.velocity.y = -300;
	        jumpTimer = game.time.now + 450;
	    }
	},
};