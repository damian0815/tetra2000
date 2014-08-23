
function KofferPacken(game) {

	this.preload = function(){
		game.load.tilemap('map', 'assets/koffer_packen.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('koffer_packen', 'assets/koffer_packen.png' );

		// player
		game.load.image('tetra', '../../shared/assets/ld30_front_standing.png');
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
	} 

	this.update = function() {
		game.physics.arcade.collide(this.player, this.collisionLayer);

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

	this.render = function() {

	}


	return this;

};

