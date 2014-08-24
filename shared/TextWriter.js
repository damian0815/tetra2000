


function TextWriter( game, text, leftEdge, topEdge, fontSize="32px", fillColor="#ffffff", shadowColor="#444444" ) {

	this.words = text.split(" ");
	this.currentText = "";

	var width = game.width-2*leftEdge;
	leftEdge += game.camera.x;
	var style = { wordWrap: true, wordWrapWidth: width, font: fontSize+" emulatorregular", fill:shadowColor };
	this.textShadow = game.add.text( leftEdge+1, topEdge+1, '', style );
	var style2 = { wordWrap: true, wordWrapWidth: width, font: fontSize+" emulatorregular", fill:fillColor };
	this.text = game.add.text( leftEdge, topEdge, '', style2 );

	this.updateText = function() {

		// update the visual text by adding the next word
		if ( this.words.length>0 ) {
			// build new string
			var word = this.words[0];
			var text = this.currentText + word + " ";
			this.text.setText(text);
			this.textShadow.setText(text);

			// update local vars
			this.words.shift();
			this.currentText = text;

			// set next timer
			var duration = word.length/256;
			game.time.events.add(Phaser.Timer.SECOND*Math.sqrt(duration), updateText, this);
		}

	}

	this.updateText();

}


