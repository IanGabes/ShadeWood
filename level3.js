Main.Level3 = function(game){
    this.game = game;
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

        var tempghost, boss;

        var ghostFacing = "left";
        var girlFacing = 'right';
        var birdMaxX = 700;
        var birdMin = 300;
        var birdSpeed = 200;
        var treeline;
        var mGround, fGround;
        var enemyIndex;
Main.Level3.prototype=
{
        preload: function() 
        {
            game.load.spritesheet('girl', 'img/girl.png',146,164);
            game.load.spritesheet('ghost', 'img/ghost.png',200,300);
            game.load.spritesheet('floor', 'img/holdbg.png');
            
            game.load.spritesheet('mouse', 'img/mouse.png', 225, 113, 12);
            game.load.spritesheet('bird', 'img/bird_fullSpriteSheet.png',170,170,20);
            game.load.spritesheet('bear', 'img/bear_fullSpriteSheet.png',496,369);
            game.load.spritesheet('deer','img/deer_fullSpriteSheet.png',255,354);
            game.load.spritesheet('cat','img/cat.png',168,113);
            game.load.spritesheet('catAttack','img/cat_attack.png',169,117);

            game.load.image('mGround', 'img/mGround.png');
            game.load.image('fGround', 'img/foreground.png');
            game.load.image('backdrop', 'img/backdrop.png');
            game.load.image('treeline', 'img/treeline_long.png');

        },
        //Globals vars
        create: function() {
            //Current Game information
            game.world.setBounds(0,0,3840,800);
            game.stage.backgroundColor='#163233';
            game.physics.arcade.gravity.y = 450;


            backdrop = game.add.sprite(0,0, 'backdrop');
            backdrop.fixedToCamera = true;

            treeline = game.add.sprite(0,380,'treeline');
            game.physics.enable(treeline, Phaser.Physics.ARCADE);
            treeline.body.allowGravity = false;

            floor = game.add.tileSprite(0,680,3840,800,'floor');
            game.physics.enable(floor,Phaser.Physics.ARCADE);
            floor.body.immovable = true;
            floor.body.allowGravity = false;
            mGround = game.add.sprite(0,0,'mGround');
            //ADD OBJECTS TO THE STAGE, START ANIMATIONS
            //initialize sprite layer
            spriteLayer = game.add.group();
            spriteLayer.enableBody = true;
            spriteLayer.physicsBodyType = Phaser.Physics.ARCADE;            
            spriteLayer.collideWorldBounds = true;
            //floor of level init

            boss = spriteLayer.create(1600, game.world.centerY,'boss');
            boss.animations.add
            //ground tile loading and placement
            //bird init
            bird = spriteLayer.create(800, game.world.centerY, 'bird');
            bird.animations.add('bird', [0,1,2,3] ,1,true);
            bird.animations.add('birdevilidle', [4,5,6,7] ,8,true);
            bird.animations.add('birdgoodidle', [8,9,10,11] ,8,true);
            bird.animations.add('birdevilattack', [12,13,14,15] ,8,true);
            bird.animations.add('birdgoodattack', [16,17,18,19] ,8,true);
            bird.anchor.setTo(.5,1);
            bird.body.gravity.y=0;
            bird.body.allowGravity=false;
            bird.animations.play('bird');

            //cat init
            cat = spriteLayer.create(500, game.world.centerY - 400,'cat');
            cat.animations.add('cat',[0,1,2,3,4,5,6,7,8,9,10,11],6,true);
            cat.anchor.setTo(.5,1);
            cat.animations.play('cat',6,true);
            //cat.animations.add('catAttack', [0,1,2,3,4,5,6],6,true);
            //deer init
            deer = spriteLayer.create(1500, game.world.centerY, 'deer');
            deer.animations.add('deer',[12,13,14,15],6,true);
            deer.animations.add('deerevilidle',[16,17,18,19],6,true);
            deer.animations.add('deergoodidle',[20,21,22,23],6,true);
            deer.animations.add('deergoodattack',[28,29,30,31,28],6,true);
            deer.animations.add('deerevilattack',[24,25,26,27],6,true);
            deer.anchor.setTo(.5,1);
            deer.animations.play('deer',8,true);
            //bear init
            bear = spriteLayer.create(1000, game.world.centerY, 'bear');
            bear.animations.add('bear',[0,1],7,true);
            bear.animations.add('bearevilidle',[4,5],7,true);
            bear.animations.add('beargoodidle',[8,9],7,true);
            bear.animations.add('beargoodattack',[28,29,30,31,28],7,true);
            bear.animations.add('bearevilattack',[24,25,26,27,24],7,true);
            bear.anchor.setTo(.5,1);
            bear.animations.play('bear',6,true);
            //girl init
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
            game.physics.enable(ghost,Phaser.Physics.ARCADE);
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
            //ghost.scale.x=-1;

            //mouse init
            mouse = spriteLayer.create(300,100, 'mouse');
            mouse.scale.set(0.5,0.5);
            mouse.health=1;
            mouse.body.setSize(163,66,0,47);
            mouse.animations.add('nice',[0,1,2,3,2,1]);
            mouse.animations.add('angry',[4,5,6,7,6,5]);
            mouse.animations.add('ghost',[8]);
            mouse.animations.play('nice', 4, true);
            //girl in focus
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

            enemies[0] = mouse;
            enemies[1] = cat;
            enemies[2] = bear;
            enemies[3] = deer;
            enemies[4] = bird;
            

        },

        render: function()
        {

        },


        update: function()
        {
            game.physics.arcade.collide(mouse,floor);
            game.physics.arcade.collide(bear,floor);
            game.physics.arcade.collide(deer,floor);
            game.physics.arcade.collide(cat,floor);
            
            if(game.physics.arcade.collide(girl,floor))
            {
                girl.floored = true;
            } else {
                girl.floored = false;
            }
            //Ghost Movement Decision Tree
            if(game.input.keyboard.isDown(Phaser.Keyboard.P) && ghost.key == 'ghost'){
                for(i = 0; i < 5;i++)
                {
                   if(game.physics.arcade.intersects(ghost.body, enemies[i].body))
                   {
                        ghost.animations.play('possess', 6, false, true);
                        tempghost = ghost;
                        ghost = enemies[i];
                        ghost.loadTexture(enemies[i].key);
                        ghost.animations.play(enemies[i].key.concat("goodidle"));
                        enemyIndex=i;
                        break;
                    }
                }
            }
            else if(game.input.keyboard.isDown(Phaser.Keyboard.L) && (ghost.key !=  'ghost')){
                ghost.animations.play(ghost.key);
                var x =ghost.x;
                var y =ghost.y;
                ghost = tempghost;
                ghost.visible = true;
                ghost.alive = true;
                ghost.exists = true;
                ghost.loadTexture('ghost');
                ghost.animations.play('idle');
            }
            else if(game.input.keyboard.isDown(Phaser.Keyboard.M) && ghost.key != 'ghost'){
                ghost.animations.play(ghost.key.concat('goodattack'),6,false);
            }

            if(ghost.body.x <= game.camera.x){
                ghost.body.x = game.camera.x;
            }
            if (ghost.body.x >= game.camera.x + 1280 - ghost.body.width) {
                ghost.body.x = game.camera.x + 1280 - ghost.body.width;
            }
            if (ghost.body.y <= 0) {
                ghost.body.y = game.camera.y;
            }
            if (ghost.body.y >= 800 - ghost.body.height) {
                ghost.body.y = 800 - ghost.body.height;
            }
            if(cursors.left.isDown){
                ghost.x -= ghostSpeed;
                ghostFacing = 'left';
                ghost.scale.x=1;
            }
            if(cursors.right.isDown){
                ghost.x += ghostSpeed;
                ghostFacing = 'right';
                ghost.scale.x=-1;
            }
            if(cursors.up.isDown){
                ghost.y -= ghostSpeed;
                ghostFacing = 'up';
            }
            if(cursors.down.isDown){
                ghost.y +=ghostSpeed;
                ghostFacing = 'down';
            }

            var ghostDist = game.physics.arcade.distanceBetween(ghost,mouse);
            var dist = girl.body.x - mouse.body.x;




            //Bird
            bird.body.velocity.x=0;

            if(bird.body.x >=birdMaxX && birdSpeed > 0){
                birdSpeed = (-birdSpeed);
                bird.scale.x=1;
            }
            else if(bird.body.x <= birdMin && birdSpeed < 0){
                birdSpeed = (-birdSpeed);
                bird.scale.x=-1;
            }
            bird.body.velocity.x +=birdSpeed;




            //Girl movement decision tree
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
