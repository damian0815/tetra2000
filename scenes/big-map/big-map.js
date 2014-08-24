
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

    // riesenrad is special
	this.riesenrad = this.game.add.sprite(43*16, 5*16, 'big-map-riesenrad');
	
	
	// load player sprite
	this.player = this.game.add.sprite(32, this.game.world.height-16, 'tetra');
	// 'buildings' map layer is just the bus haltestelle- in front
	this.map.createLayer('buildings');

	

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
	this.playerIsAllowedOnRiesenrad = true;
	this.playerOnRiesenrad = false;
	this.game.physics.enable(this.riesenrad, Phaser.Physics.ARCADE);
	this.riesenrad.body.moves = false;

// place tetra next to the riesenrad for testing
  /*
   this.player.x = 46 * 16;
   this.player.y = 14 * 16;
  */
   
   
    


}

BigMap.prototype.startRiesenrad = function( player, riesenrad ) {

	if ( !this.playerOnRiesenrad && this.playerIsAllowedOnRiesenrad) {
	
	    var riesenRadBase = this.riesenrad.y + this.riesenrad.height;
	    var riesenRadCenterX = this.riesenrad.x + this.riesenrad.width/2.;
	
	    var dx = this.player.x - riesenRadCenterX;
	    var dy = this.player.y - riesenRadBase;
	    var tetraDistFromRiesenrad = Math.sqrt(dx*dx + dy*dy);
	    
	    if(tetraDistFromRiesenrad < 70){
			console.log("riesenrad started");
	    	this.riesenradAngle = 0;
			this.playerOnRiesenrad = true;
		}
		
	}

}

BigMap.prototype.updateRiesenrad = function() {

	/*
	if(!this.playerOnRiesenrad){
		 return;
	}
	*/

	var cx = this.riesenrad.x + this.riesenrad.width/2.;
	var cy = this.riesenrad.y + this.riesenrad.height/2.;
	// console.log('cx: ' + cx + ' cy: ' + cy);

	var x = cx + this.riesenrad.width/2. * Math.sin( this.riesenradAngle * Math.PI/180);
	var y = cy + this.riesenrad.height/2. * Math.cos( this.riesenradAngle * Math.PI/180);

	if(this.riesenradAngle < 359){
	   this.riesenradAngle += 0.5;
	  //  console.log("this.riesenradAngle: " + this.riesenradAngle);
	   this.player.x = x-8;
	  this.player.y = y-8;
  
	}else{
	   this.playerOnRiesenrad = false;
	   this.playerIsAllowedOnRiesenrad = false;
	   this.player.x = x-8;
	   this.player.y = y;
	   this.game.time.events.add(Phaser.Timer.SECOND, function(){ this.playerIsAllowedOnRiesenrad = true;} , this);
	}

 

}

BigMap.prototype.update = function() {
 
   
    
	// when touching the riesenrad, go on a spin
	this.physics.arcade.overlap(this.player, this.riesenrad, BigMap.prototype.startRiesenrad, null, this);
	if ( this.playerOnRiesenrad ) {
		this.updateRiesenrad();
	} else {
		this.physics.arcade.collide(this.player, this.riesenrad);
	}

	// don't walk through buildings
	this.physics.arcade.collide(this.player, this.buildingGroup);

	// update movement
	if(! this.playerOnRiesenrad){
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


}



