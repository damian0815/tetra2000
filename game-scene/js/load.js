var load_state = {
    preload: function() {
        this.game.stage.backgroundColor = '#71c5cf';
        this.game.load.image('title', 'assets/images/title.png');

    },

    create: function() {
        // When all assets are loaded, go to the 'menu' state
        this.game.state.start('menu');
    }
};
