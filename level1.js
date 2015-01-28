Main.Level1 = function(){}

var spriteLayer, backgroundLayer;
var ghostLayer;
var lightsource;
var shadeIdol;
var floor;
var cursors, wasd, jumpButton;

var jumpTimer = 0;
var backdrop;
var mouse, bird, bear;
var treeline, leftSide;
var mGround, housefront;

Main.Level1.prototype ={
    preload: function(){
        
        this.game.load.spritesheet('floor', 'img/holdbg.png');
        this.game.load.spritesheet('light', 'img/lightsource2.png');
        this.game.load.spritesheet('bird', 'img/bird_fullSpriteSheet.png',170,170,20);

        this.game.load.image('mGround', 'img/l1mGround.png');
        this.game.load.image('housefront', 'img/background_house_interior_front.png');
        this.game.load.image('backdrop', 'img/backdrop.png');
        this.game.load.image('treeline', 'img/treeline.png');
        this.game.load.image('shadeIdol', 'img/shade_idol.png');
        girl = new Girl();
        ghost = new Ghost();
        mouse = new Mouse();
        deer = new Deer();
        bird = new Bird();
        bear = new Bear();
    },

    create: function(game){
        game.world.setBounds(0,0,3700,800);
        game.stage.backgroundColor='#163233';
        game.physics.arcade.gravity.y = 450;

        backdrop = game.add.sprite(0,0, 'backdrop');
        backdrop.fixedToCamera = true;
        treeline = game.add.tileSprite(-500,380,4840,500,'treeline');


        floor = game.add.tileSprite(0,680,3840,800,'floor');
        
        
        game.physics.enable(floor,Phaser.Physics.ARCADE);
        floor.body.immovable = true;
        floor.body.allowGravity = false;
        game.physics.enable(treeline, Phaser.Physics.ARCADE);
        treeline.body.allowGravity = false;
        mGround = game.add.sprite(0,0,'mGround');

        spriteLayer = game.add.group();
        spriteLayer.enableBody = true;
        spriteLayer.physicsBodyType = Phaser.Physics.ARCADE;            
        spriteLayer.collideWorldBounds = true;

        ghost.create(3500,600);
        girl.create(50,600);
        mouse.create(200,600);
        deer.create(400,500);
        bird.create(1000, 200);
        bear.create(800,300);
        ghost.sprite.animations.play('neophyte'); //ghost defaults to Idle Animation on create

        shadeIdol = spriteLayer.create(game.world.x = 3300, game.world.y=450,'shadeIdol');
        shadeIdol.enableBody = true;
        shadeIdol.body.moves = false;

        game.camera.follow(girl.sprite);

        housefront = game.add.sprite(-165,128,'housefront');


        
        
        
        bird.sprite.animations.play('bird');
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

    render: function ()
    {

    },

    update: function()
    {
        game.physics.arcade.collide(shadeIdol,floor);
        game.physics.arcade.collide(mouse.sprite,floor);
        game.physics.arcade.collide(mouse.sprite,leftSide);
        game.physics.arcade.collide(girl.sprite,leftSide);
        game.physics.arcade.collide(deer.sprite, floor);
        game.physics.arcade.collide(bear.sprite, floor);

        if(game.physics.arcade.collide(girl.sprite,floor))
        {
            girl.sprite.floored = true;
        } else {
            girl.sprite.floored = false;
        }

        if(game.physics.arcade.collide(girl.sprite, shadeIdol)){
            ghost.sprite.animations.play('transform',5,false);
            ghost.sprite.events.onAnimationComplete.addOnce(function(){
                this.game.state.start('level2', Main.Level2);
            }, this
            );
        }

        girl.update(wasd);
        mouse.update();   
        deer.update();         

        if(girl.sprite.floored && Math.abs(girl.sprite.body.acceleration.x) < 0.01) {
            girl.sprite.body.velocity.x *= .90;
        }
        if (girl.sprite.body.x >= 1280){
            
        }
    }
    };
