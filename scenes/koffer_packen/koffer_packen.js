
var Koffer = function(game, imageName) {

	// koffer logo
	this.sprite = game.add.sprite(0, 0, imageName);
	// items in the koffer
	this.items = Array();

	// callback called when player picks up an item
	this.addItem = function( item ) {

		console.log('items: '+this.items);

		var itemX = (1+this.items.length)*(16+4);
		item.x = itemX;
		item.y = 0;

		this.items.push(item);
	}


	return this;

}



var Cat = function(game, imageName) {


	this.sprite = game.add.sprite(game.width/2, game.height-16, imageName);
	this.sprite.anchor.setTo(.5,0);

	this.targetPosition = { x:this.sprite.x, y:this.sprite.y };
	this.moving = false;

	this.setNewTarget();

	return this;


}

Cat.prototype.update = function() {
	if ( this.moving ) {
		var deltaX = this.targetPosition.x-this.sprite.x; 
		var deltaY = this.targetPosition.y-this.sprite.y;
		if ( Math.abs(deltaX)>0 || Math.abs(deltaY)>0 ) {
			this.sprite.x += Math.max(Math.min(deltaX,1),-1);
			this.sprite.y += Math.max(Math.min(deltaY,1),-1);
		} else {
			this.moving = false;
			// set a new target after a random delay
			var secondsUntilMove = game.rnd.realInRange(0,1);
			// use a squared random to make it look better
			secondsUntilMove*=secondsUntilMove;
			secondsUntilMove*=5;
			secondsUntilMove+=1;
			game.time.events.add(Phaser.Timer.SECOND*secondsUntilMove, Cat.prototype.setNewTarget, this);
		}
	} 

}


Cat.prototype.setNewTarget = function() {
		this.targetPosition.x = game.rnd.integerInRange( 32, game.width-32 );
		this.targetPosition.y = game.rnd.integerInRange( game.height-40, game.height-8 );
		if ( this.targetPosition.x > this.sprite.x ) {
			this.sprite.scale.x = -1;
		} else {
			this.sprite.scale.x = 1;
		}
		this.moving = true;
	}


function KofferPacken(game) {

	this.preload = function(){
		game.load.tilemap('map', 'assets/koffer_packen.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('koffer_packen', 'assets/koffer_packen.png' );

		// player
		game.load.image('tetra', '../../shared/assets/ld30_front_standing.png');


		// items
		game.load.image('pictureframe', 'assets/koffer_packen_pictureframe.png');
		game.load.image('flowerpot', 'assets/koffer_packen_flowerpot.png');
		game.load.image('suitcase', 'assets/koffer_packen_suitcase.png');
		game.load.image('teddy', 'assets/koffer_packen_teddy.png');
		game.load.image('cat', 'assets/koffer_packen_cat.png');

	}

	this.create = function() {
		this.map = game.add.tilemap('map');
		// attach the tiles image to the map
		this.map.addTilesetImage('koffer_packen', 'koffer_packen');

		var bgLayer = this.map.createLayer('Tile Layer 1');
		// resize the world bounds to match the layer
		bgLayer.resizeWorld();
		this.collisionLayer = this.map.createLayer('collision');

		// load player sprite
		this.player = game.add.sprite(16, bgLayer.height-16, 'tetra');

		// move
		this.cursors = game.input.keyboard.createCursorKeys();

		// physics
		game.physics.startSystem(Phaser.Physics.ARCADE);
		game.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.player.body.setSize(16,16,0,4);
		this.player.body.collideWorldBounds = true;

		this.map.setCollision([ 106 ], true, this.collisionLayer);

		// suitcase
		this.koffer = new Koffer(game, 'suitcase');

		this.kofferGroup = game.add.group();
		this.kofferGroup.enableBody = true;
		this.kofferGroup.create(200, bgLayer.height-32, 'suitcase');




		// collectible objects
		this.items = game.add.group();
		this.items.enableBody = true;
		this.items.create(80, bgLayer.height-40, 'flowerpot');
		this.items.create(100, bgLayer.height-32, 'teddy');
		this.items.create(128, bgLayer.height-40, 'pictureframe');

		this.carriedItem = null;


		// cat
		this.cat = new Cat(game, 'cat');

	} 

	this.update = function() {


		this.cat.update();

		// check for map collisions
		game.physics.arcade.collide(this.player, this.collisionLayer);

		// check for item collect
		game.physics.arcade.overlap(this.player, this.items, collectItem, null, this);
		game.physics.arcade.overlap(this.player, this.kofferGroup, dropInKoffer, null, this);

		// update carried item
		if ( this.carriedItem ) {
			this.carriedItem.x = this.player.x - 16;
			this.carriedItem.y = this.player.y;
		}
		// update movement
		this.player.body.velocity.x = 0;
		this.player.body.velocity.y = 0;
		if ( this.cursors.left.isDown ) {
			this.player.body.velocity.x = -150;
		}
		else if ( this.cursors.right.isDown ) {
			this.player.body.velocity.x = 150;
		}
		else if ( this.cursors.up.isDown ) {
			this.player.body.velocity.y = -150;
		}
		else if ( this.cursors.down.isDown ) {
			this.player.body.velocity.y = 150;
		}

	}

	this.collectItem = function( player, item ) {
		if ( this.carriedItem == null ) {
			this.carriedItem = item;
		} 
	}

	this.dropInKoffer = function( player, item ) {
		if ( this.carriedItem != null ) {
			this.koffer.addItem(this.carriedItem);
			this.carriedItem = null;
		}
	}

	return this;

};

