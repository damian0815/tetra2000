
var BigMap = function(game) {

	this.game = game;


}


BigMap.prototype.preload = function() {

	this.game.load.tilemap('big-map', 'assets/big_map_vs2.json', null, Phaser.Tilemap.TILED_JSON);
	this.game.load.image('big-map-sidewalk', 'assets/sidewalk.png');
	this.game.load.image('big-map-grass', 'assets/grass.png');
	this.game.load.image('big-map-bus_station', 'assets/bus_station.png');
	this.game.load.image('big-map-street', 'assets/street.png');

	// player
	this.game.load.image('tetra', '../../shared/assets/ld30_front_standing.png');


	// buildings
	this.game.load.image('big-map-schoenbrunn', 'assets/schoenbrunn.png');
	this.game.load.image('big-map-stephansdom', 'assets/stephansdom.png');
	this.game.load.image('big-map-riesenrad', 'assets/riesenrad.png');
	this.game.load.image('big-map-magistrat', 'assets/magistrat.png');


}

BigMap.prototype.create = function() {
	
	this.map = this.game.add.tilemap('big-map');
	// attach tiles
	this.map.addTilesetImage('sidewalk', 'big-map-sidewalk');
	this.map.addTilesetImage('grass', 'big-map-grass');
	this.map.addTilesetImage('bus_station', 'big-map-bus_station');
	this.map.addTilesetImage('street', 'big-map-street');

	var grassLayer = this.map.createLayer('grass');
	// resize the world bounds to match the layer
	grassLayer.resizeWorld();

	this.map.createLayer('sidewalk');

	// load buildings
	this.buildingGroup = this.game.add.group();
	this.buildingGroup.enableBody = true;
	var sprite = this.buildingGroup.create(49*16, 41*16, 'big-map-schoenbrunn');
	sprite.body.moves = false;
	sprite = this.buildingGroup.create(31*16, 16*16, 'big-map-stephansdom');
	sprite.body.moves = false;
	sprite = this.buildingGroup.create(2*16, 1*16, 'big-map-magistrat');
	sprite.body.moves = false;

	// load player sprite
	this.player = this.game.add.sprite(32, this.game.world.height-16, 'tetra');
	// 'buildings' map layer is just the bus haltestelle- in front
	this.map.createLayer('buildings');

	// riesenrad is special
	this.riesenrad = this.game.add.sprite(43*16, 5*16, 'big-map-riesenrad');

	// camera follow
	this.game.camera.follow(this.player);

	// move
	this.cursors = this.game.input.keyboard.createCursorKeys();

	// physics
	this.game.physics.startSystem(Phaser.Physics.ARCADE);
	this.game.physics.enable(this.player, Phaser.Physics.ARCADE);
	this.player.body.setSize(16,16,0,4);
	this.player.body.collideWorldBounds = true;

	// riesenrad
	this.playerOnRiesenrad = false;
	this.game.physics.enable(this.riesenrad, Phaser.Physics.ARCADE);



}

BigMap.prototype.startRiesenrad = function( player, riesenrad ) {

	if ( !this.playerOnRiesenrad ) {
		this.riesenradAngle = 0;
		this.playerOnRiesenrad = true;
		console.log('on riesenrad');
	}

}

BigMap.prototype.updateRiesenrad = function() {


}

BigMap.prototype.update = function() {

	// when touching the riesenrad, go on a spin
	this.physics.arcade.overlap(this.player, this.riesenrad, BigMap.prototype.startRiesenrad, null, this);
	if ( this.playerOnRiesenrad ) {
		this.updateRiesenrad();
	}

	// don't walk through buildings
	this.physics.arcade.collide(this.player, this.buildingGroup);

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



