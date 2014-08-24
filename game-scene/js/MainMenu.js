/*global Phaser:true, Tetra2000:true*/
Tetra2000.MainMenu = function(game) {
  "use strict";

  this.music = null;
  this.playButton = null;
};

Tetra2000.MainMenu.prototype = {

  create: function() {
    "use strict";

    this.background = this.game.add.sprite(0,
      0);
    this.background.width = 800;
    this.background.height = 352;

    // add the fog shader to the game and add it to the background sprite
    this.filter = this.game.add.filter('Fog',
      800,
      600);
    this.background.filters = [this.filter];

    this.fadeIn = this.game.add.sprite(0, 0, 'fade');
    this.fadeIn.fixedToCamera = true;
    this.fadeTween = this.game.add.tween(this.fadeIn).to({
        alpha: 0
      },
      2000,
      Phaser.Easing.Linear.None,
      true,
      0,
      0,
      false);
    this.fadeTween.onComplete.add(function() {}, this);
  },

  update: function() {
    "use strict";

    this.filter.update();
  },

  startGame: function(pointer) {
    "use strict";

    this.music.stop();
    this.game.state.start('Game');
  }

};
