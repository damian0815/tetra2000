window.onload function() {

    var state = {
        preload: function() {
            game.load.image('logo', 'title.png');
        },
        create: function() {
            var logo = game.add.sprite(game.world.centerX, game.world.centerY, 'logo');
            logo.anchor.setTo(0.5, 0.5);

        },
        update: function() {

        }
    }


    var game = new Phaser.Game(
        160,
        144,
        Phaser.AUTO,
        'game',
        state
    )
};
