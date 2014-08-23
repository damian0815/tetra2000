


function TextWriter( game, text, leftEdge, topEdge ) {

	this.words = text.split(" ");
	this.currentText = "";

	this.text = game.add.text( leftEdge, topEdge, '', { wordWrap: true, wordWrapWidth: game.width-2*leftEdge, font: "32px emulatorregular", fill: "#ffffff" } );
	this.updateText = function() {
	
		// update the visual text by adding the next word
		if ( this.words.length>0 ) {
			var word = this.words[0];
			var text = this.currentText + word + " ";
			this.words.shift();
			this.text.setText(text);
			this.currentText = text;

			var duration = word.length/256;
			game.time.events.add(Phaser.Timer.SECOND*Math.sqrt(duration), updateText, this);
		}

	}

	this.updateText();

}


