
function BusStation(game) {

	this.preload = function(){
		game.load.tilemap('bus-map', 'assets/bus_station.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('bus_station', 'assets/busfun.png' );

		// player
		game.load.image('tetra', '../../shared/assets/ld30_front_standing.png');

	}

	this.create = function() {
		this.map = game.add.tilemap('bus-map');
		// attach the tiles image to the map
		this.map.addTilesetImage('bus_station', 'bus_station');

		this.collisionLayer = this.map.createLayer('collision');
		var bgLayer = this.map.createLayer('Tile Layer 1');
		// resize the world bounds to match the layer
		bgLayer.resizeWorld();
		//this.collisionLayer.debug = true;

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

		// check for map collisions
		game.physics.arcade.collide(this.player, this.collisionLayer);

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


	return this;
};


