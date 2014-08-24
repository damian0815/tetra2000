
var BusFahrt = function(game) {

	this.game = game;



	return this;

}

BusFahrt.prototype.preload = function() {

	this.game.load.image('busf-inner', 'assets/bus.png');
	this.game.load.image('busf-rollingHills', 'assets/rollingHills.png');
	this.game.load.image('busf-street', 'assets/streetInFrontOfTheBus.png');
	this.game.load.image('busf-streetLine', 'assets/streetMiddleLineWhite.png');

}

BusFahrt.prototype.create = function() {

	this.hills = this.game.add.sprite(0,0,'busf-rollingHills');
	this.hills.scale.x = 1.5;
	this.street = this.game.add.sprite(0,0,'busf-street');
	this.streetLine = this.game.add.sprite(114,0,'busf-streetLine');
	this.inner = this.game.add.sprite(0,0,'busf-inner');

	this.innerPhase = 0;
	this.hillsPhase = 0;
	this.streetLinePos = 0;
}

BusFahrt.prototype.update = function() {

	
	// hills
	var dx = Math.sin(this.hillsPhase*0.3);
	var dy = Math.cos(this.hillsPhase*0.4);
	this.hillsPhase += 0.5;
	this.hills.x = -10+dx*0.5;
	this.hills.y = -20+dy*0.5;

	// street
	this.street.x = dx;
	this.street.y = dy;
	this.streetLinePos += 1;
	if ( this.streetLinePos > 72 ) {
		this.streetLinePos = 0;
	}
	this.streetLine.x = 114+dx;
	this.streetLine.y = this.streetLinePos+dy;


	dx = Math.sin(this.innerPhase*0.35);
	dy = Math.sin(this.innerPhase*0.43);
	this.inner.x = dx;
	this.inner.y = dy;
	this.innerPhase += 0.3;



}



