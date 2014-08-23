/*jslint browser:true*/
/*global Phaser:true, Tetra2000:true*/
Tetra2000 = {};

Tetra2000.Boot = function(game) {
    "use strict";

};

Tetra2000.Boot.prototype = {



    preload: function() {
        "use strict";

        this.load.image('start_button', 'assets/images/title.png', 96, 10);

        this.load.image('preloaderBackground',
            'assets/images/bg.jpg');
        this.load.image('preloaderBar',
            'assets/images/bar.png');

         this.game.load.audio('mainsong', ['assets/audio/mainmenu.mp3', 'assets/audio/mainmenu.ogg']);
    },

    create: function() {
        "use strict";

         var button;
        var song;


        song = this.game.add.audio('mainsong');




        this.game.stage.backgroundColor = '#ffffff';

        button = this.game.add.button(this.game.world.centerX - 52, this.game.world.centerY, 'start_button', actionOnClick, this, 0, 0, 0);



        this.game.input.maxPointers = 2;

        this.game.stage.disableVisibilityChange = true;

        if (this.game.device.desktop) {
            this.game.stage.scale.pageAlignHorizontally = true;
        } else {
            this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
            this.game.stage.scale.minWidth = 160;
            this.game.stage.scale.minHeight = 144;
            this.game.stage.scale.maxWidth = window.innerWidth;
            this.game.stage.scale.maxHeight = window.innerHeight;
            this.game.stage.scale.forceLandscape = true;
            this.game.stage.scale.pageAlignHorizontally = true;
            this.game.stage.scale.setScreenSize(true)

        }
    },



};


function actionOnClick() {

    this.game.state.start('Preloader');

}
