
function BusStation(game) {

	this.preload = function(){
		game.load.tilemap('map', 'assets/bus_station.json', null, Phaser.Tilemap.TILED_JSON);
		game.load.image('bus_station', 'assets/busfun.png' );

		// player
		game.load.image('tetra', '../../shared/assets/ld30_front_standing.png');


		// items
		/*
		game.load.image('pictureframe',
		                'assets/koffer_packen_pictureframe.png');
		game.load.image('flowerpot', 'assets/koffer_packen_flowerpot.png');
		game.load.image('suitcase', 'assets/koffer_packen_suitcase.png');
		game.load.image('teddy', 'assets/koffer_packen_teddy.png');
		*/

		game.load.image('cat', 'assets/koffer_packen_cat.png');

	}

	this.create = function() {
		this.map = game.add.tilemap('map');
		// attach the tiles image to the map
		this.map.addTilesetImage('bus_station', 'bus_station');

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
		/*

		 */




		// collectible objects
		this.items = game.add.group();
		this.items.enableBody = true;



	}


	return this;
};


