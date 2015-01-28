Main.Level2 = function(game)
{
    this.game - game
}
        
        var enemies = [];
        var ghost, girl, mouse, bird, bear, deer, cat;
        var floor;
        var cursors, wasd, jumpButton;
        var ghostSpeed = 350;
        var ghostSpeed = 4;
        var girlSpeed = 500;
        var jumpTimer = 0;
        var backdrop;

        var ghostFacing = "left";
        var girlFacing = 'right';
        var birdMaxX = 1400;
        var birdMin = 750;
        var birdSpeed = 200;
        var treeline;
        var mGround, fGround;
        var enemyIndex;

        var bg_a;
        var evol_a;
Main.Level2.prototype={

    preload:function () {
        this.game.load.spritesheet('girl', 'img/girl.png',146,164);
        this.game.load.spritesheet('ghost', 'img/ghost.png',200,300);
        this.game.load.spritesheet('floor', 'img/holdbg.png');

        this.game.load.image('mGround', 'img/lvl2_2.png');
        this.game.load.image('fGround', 'img/foreground.png');
        this.game.load.image('backdrop', 'img/backdrop.png');
        this.game.load.image('treeline', 'img/treeline_long.png');

        this.game.load.spritesheet('deer','img/deersized.png',217,280);
        this.game.load.audio('bgAudio', 'audio/Cyl7.mp3');
        this.game.load.spritesheet('fountain','img/checkpoint_spritesheet.png',200,200);
            
    },

    create: function(){
        game = this.game;
        game.world.setBounds(0,0,3840,800);
        game.stage.backgroundColor='#163233';
        game.physics.arcade.gravity.y = 450;
        
        // bg_a = game.add.audio('bgAudio');
        // evol_a = game.add.audio('evolSound');

        // bg_a.play();
        // bg_a.volume = 1;

        //floor.body.immovable = true;
        floor = game.add.tileSprite(0,740,3840,800,'floor');
        game.physics.enable(floor,Phaser.Physics.ARCADE);
        floor.body.immovable = true;
        floor.body.allowGravity = false;

        backdrop = game.add.sprite(0,0, 'backdrop');
        backdrop.fixedToCamera = true;
        treeline = game.add.sprite(0,380,'treeline');
        game.physics.enable(treeline, Phaser.Physics.ARCADE);
        treeline.body.allowGravity = false;

        mGround = game.add.sprite(0,0,'mGround');


        spriteLayer = game.add.group();
        spriteLayer.enableBody = true;
        spriteLayer.physicsBodyType = Phaser.Physics.ARCADE;            
        spriteLayer.collideWorldBounds = true;

        fountain = spriteLayer.create(3000,550,'fountain');
        game.physics.enable(fountain, Phaser.Physics.arcade);
        fountain.enableBody = true;
        fountain.body.moves = false;
        fountain.animations.add('idle',[0,1,2,3,4,5],10,true);
        fountain.animations.play('idle',10,true);


        enemies[0]=deer;

        girl = spriteLayer.create(game.world.x = 50,game.world.centerY, 'girl'); 
        girl.health=100;
        girl.body.setSize(64,138,34,26); 
        girl.animations.add('girlmove', [6,7,8,9,10,11],0,true);   
        girl.animations.add('girlIdle', [0,1,2] ,4,true);
        girl.animations.add('girlsmack',[3,4,5] ,8,true);
        girl.anchor.setTo(.5,1);      
        girl.animations.play('girlIdle');

        //ghost layer init
        ghost = game.add.sprite(400, 600, 'ghost');
        ghost.enableBody = true;
        game.physics.enable(ghost,Phaser.Physics.arcade);
        ghost.collideWorldBounds = true;
        //ghost.fixedToCamera = true;
        ghost.animations.add('idle', [8,7,6,5,4], 7, true);
        ghost.animations.add('possess',[17,16,15,14,13],6,false);
        ghost.animations.add('neophyte',[26,25,24,23],7,true);
        ghost.animations.add('transform',[35,34,33,32,31,30,29,28,27],9,true);
        ghost.animations.add('depossess'[13,14,15,16,17],6, false);
        ghost.anchor.setTo(.5,1);
        ghost.body.gravity.y = 0;
        ghost.body.allowGravity = false;
        ghost.animations.play('idle');

        game.camera.follow(girl);

         fGround = game.add.sprite(0,0, 'fGround');
        game.physics.enable(fGround, Phaser.Physics.ARCADE);
        fGround.body.allowGravity = false;
        //alias input systems to references
        cursors = game.input.keyboard.createCursorKeys();
        jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR); 
        wasd = {
            up: game.input.keyboard.addKey(Phaser.Keyboard.W),
            down: game.input.keyboard.addKey(Phaser.Keyboard.S),
            left: game.input.keyboard.addKey(Phaser.Keyboard.A),
            right: game.input.keyboard.addKey(Phaser.Keyboard.D),
            poss: game.input.keyboard.addKey(Phaser.Keyboard.L)
        };
    },

    render: function()
    {

    },














    update: function()
    {
        game.physics.arcade.collide(deer,floor);
        game.physics.arcade.collide(fountain,floor);

        if(game.physics.arcade.collide(girl, fountain)){
            this.game.state.start('level3', Main.Level3);
        }
        
        if(game.physics.arcade.collide(girl,floor))
        {
            girl.floored = true;
        } else {
            girl.floored = false;
        }








        fGround.body.velocity.x = 0;
        treeline.body.velocity.x=0;

        if(wasd.left.isDown){
            girl.body.velocity.x = -girlSpeed;
            girl.scale.x=-1;
            girl.animations.play('girlmove',8,true);
            if(game.camera.x > 0 && game.camera.x < 2560){
                fGround.body.velocity.x =+ girlSpeed*1.3
                treeline.body.velocity.x =- girlSpeed*0.3;
            }
        }
        else if(wasd.right.isDown){
            girl.body.velocity.x = girlSpeed;
            girl.scale.x=1;
            girl.animations.play('girlmove',8,true);
            if(game.camera.x > 0 && game.camera.x < 2560){
                fGround.body.velocity.x =- girlSpeed*1.3
                treeline.body.velocity.x =+ girlSpeed*0.3;
            }
        }
        else if(wasd.down.isDown)
        {
            girl.body.velocity.y = +girlSpeed;
            girl.animations.play('girlsmack',12,false);
        }
        else
        {
            girl.animations.play('girlIdle', 8,true);
        }
        if(!girl.floored)
        {
            girl.body.velocity.x *=.8
        }
        if(girl.body.onFloor())
        {
            console.log(girl.body.onFloor());
        }
        if (wasd.up.isDown && girl.floored && game.time.now > jumpTimer)
        {
            //console.log("Jumping");
            girl.body.velocity.y = -300;
            jumpTimer = game.time.now + 450;
        }
        if(girl.floored && Math.abs(girl.body.acceleration.x) < 0.01) {
            girl.body.velocity.x *= .90;
        }
        if(Math.abs(ghost.body.acceleration.x) < 0.01) {
            ghost.body.velocity.x *= .90;
        }
        if (girl.body.x >= 1280){
            
        }

    }
}













