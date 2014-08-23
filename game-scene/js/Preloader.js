/*global Phaser:true, Tetra2000:true*/
Tetra2000.Preloader = function (game) {
    "use strict";

    this.background = null;
    this.preloadBar = null;

    this.ready = false;
};

Tetra2000.Preloader.prototype = {

    preload: function () {
        "use strict";

        // Show the Preloader's background and loading bar.
        /*this.background = this.add.sprite(0,
                                          0,
                                          'preloaderBackground');*/
        this.preloadBar = this.add.sprite(300,
                                          400,
                                          'preloaderBar');
        this.load.setPreloadSprite(this.preloadBar);


        // Preload player sprite
        this.load.image('player',
                        'assets/images/player.png');

        // Preload indoor background
        this.load.image('indoorBackground', 'assets/images/indoorBackground.jpg');

        // Preload the fade
        this.load.image('fade', 'assets/images/fade.jpg');

        // Preload the Dialog background
        this.load.image('dialogBackground', 'assets/images/dialog.png');

        // Preload coin spritesheet
        this.load.spritesheet('coin',
                              'assets/images/coin.png',
                              32,
                              32,
                              9);
        this.load.image('ladder', 'assets/images/ladder.png');

        // Preload Montserrat bitmap font
        this.load.bitmapFont('monr',
                             'assets/fonts/main.png',
                             'assets/fonts/main.xml');

        // Preload level0 Tiled map
        this.load.tilemap('level0',
                          'assets/maps/level0.json',
                          null,
                          Phaser.Tilemap.TILED_JSON);

        // Preload level1 Tiled map
        this.load.tilemap('level1',
                          'assets/maps/level1.json',
                          null,
                          Phaser.Tilemap.TILED_JSON);

        // Preload level2 Tiled map
        this.load.tilemap('level2',
                          'assets/maps/level2.json',
                          null,
                          Phaser.Tilemap.TILED_JSON);

        // Preload tileset
        this.load.image('tiles',
                        'assets/images/tiles.png');

        // Preload fog shader script
        this.load.script('filter',
                         'src/filters/fog.js');
    },

    create: function () {
        "use strict";

        this.preloadBar.cropEnabled = false;
    },

    update: function () {
        "use strict";

        //if (this.cache.isSoundDecoded('titleMusic') && this.ready === false) {
        if (this.ready === false) {
            this.ready = true;
            this.game.state.start('Game');
        }
    }
};
