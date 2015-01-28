Deer = function()
{
    this.deer = game.load.spritesheet('deer','img/deer_fullSpriteSheet.png',420,595);
}
Deer.prototype={

    create: function(x,y){
        this.sprite = spriteLayer.create(x, y, 'deer');
        this.sprite.animations.add('deer',[12,13,14,15],6,true);
        this.sprite.animations.add('deerevilidle',[16,17,18,19],6,true);
        this.sprite.animations.add('deergoodidle',[20,21,22,23],6,true);
        this.sprite.animations.add('deergoodattack',[28,29,30,31,28],6,true);
        this.sprite.animations.add('deerevilattack',[24,25,26,27],6,true);
        this.sprite.anchor.setTo(.5,.5);
        this.sprite.animations.play('deer',8,true);
        this.sprite.scale.x = .5;
        this.sprite.scale.y = .5;
    },

    update: function(){
        //TO DO
    }
}