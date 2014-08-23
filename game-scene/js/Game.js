/*global Phaser:true, Tetra2000:true, Player:true, Dialog:true*/
Tetra2000.Game = function (game) {
    "use strict";

    this.game = game;
    this.debug = false;
};
var player, map, mapName, mapNameContainer, spawns, exits, backgroundObjects, backgroundImage, backgroundLayer, layerSeparator, foregroundLayer, coins, npcs, ladders, fpsContainer, fpsText, fadeIn, fadeTween, moneyText, moneyContainer;

Tetra2000.Game.prototype = {

    create: function () {
        "use strict";

        this.fontSmall = {font: '16px Montserrat', align: 'left', fill: 'white'};
        this.font = {font: '24px Montserrat', align: 'left', fill: 'white'};
        spawns = this.game.add.group();
        exits = this.game.add.group();
        backgroundObjects = this.game.add.group();
        layerSeparator = this.game.add.sprite(0, 0, 'fade');

        this.dialog = null;
        this.dialogCount = 0;

        this.game.add.text(-1000, -1000, 'bringinthefont', this.font);

        moneyText = this.game.add.text(0, 0, '$0', this.fontSmall);

        fpsText = this.game.add.text(0, 0, this.game.time.fps.toString(), this.fontSmall);

        moneyContainer = this.game.add.sprite(10, 5);
        moneyContainer.fixedToCamera = true;
        moneyContainer.addChild(moneyText);

        fpsContainer = this.game.add.sprite(this.game.camera.width - 22, this.game.camera.height - 17);
        fpsContainer.fixedToCamera = true;
        fpsContainer.addChild(fpsText);

        if (this.debug) { fpsContainer.alpha = 1; } else { fpsContainer.alpha = 0; }

        fadeIn = this.game.add.sprite(this.game.camera.x, this.game.camera.y, 'fade');
        fadeIn.fixedToCamera = true;

        fadeTween = this.game.add.tween(fadeIn).to({alpha: 0}, 250, Phaser.Easing.Linear.None, true, 0, 0, false);

        this.loadLevel(player, {next: 0});

        var playerStart = spawns.getFirstAlive();
        player = new Player(this.game, playerStart, this.debug);
    },

    update: function () {
        "use strict";

        if (player) {
            moneyText.setText('$' + player.money.toString());
        } else {
            moneyText.setText('$0');
        }
        fpsText.setText(this.game.time.fps.toString());

        this.game.camera.follow(player);

        if (backgroundImage !== null) {
            backgroundImage.x = this.game.camera.x * 0.5;
            backgroundImage.y = (this.game.camera.y * 0.5) - 250;
        }

        this.game.physics.collide(player, foregroundLayer);
        this.game.physics.collide(player, exits, this.loadLevel, null, this);
        this.game.physics.collide(player, coins, this.addMoney, null, this);

        if (this.game.physics.overlap(player, ladders)) {
            player.climbEnabled = true;
        } else {
            player.climbEnabled = false;
        }

        npcs.forEach(function (i) {
            if (this.game.physics.distanceBetween(player, i) < 150) {
                if (this.dialogCount === 0) {
                    this.dialog = null;
                    this.dialog = new Dialog(this.game, i);
                    this.dialogCount += 1;
                }
            } else if (this.dialogCount > 0 && this.dialog.text !== null) {
                this.dialogCount -= 1;
                this.dialog.destroy();
            }
        }, this);

    },

    loadLevel: function (p, i) {
        "use strict";

        if (layerSeparator) { layerSeparator.destroy(); }
        if (backgroundImage) { backgroundImage.destroy(); }
        if (foregroundLayer) { foregroundLayer.destroy(); }
        if (backgroundLayer) { backgroundLayer.destroy(); }
        if (backgroundObjects) { backgroundObjects.removeAll(); }

        if (mapNameContainer) { mapNameContainer.destroy(); }
        if (mapName) { mapName.destroy(); }

        if (spawns) { spawns.removeAll(); }
        if (exits) { exits.removeAll(); }
        if (coins) { coins.destroy(true); }
        if (ladders) { ladders.destroy(true); }
        if (npcs) { npcs.destroy(true); }
        if (backgroundObjects) { backgroundObjects.removeAll(); }
        if (map) { map.destroy(); }

        map = this.game.add.tilemap('level' + i.next);
        map.addTilesetImage('tiles', 'tiles');
        map.setCollisionBetween(4, 4, 'Tile Layer 1');
        map.setCollisionBetween(17, 32, 'Tile Layer 1');
        map.createFromObjects('Object Layer 1', 7, null, 0, true, true, backgroundObjects);
        switch (backgroundObjects.getFirstAlive().env) {
        case 'indoor1':
            backgroundImage = this.game.add.sprite(0, -50, 'indoorBackground');
            break;
        }

        backgroundLayer = map.createLayer('Background');
        layerSeparator = this.game.add.sprite(0, 0, 'fade');
        layerSeparator.fixedToCamera = true;
        layerSeparator.alpha = 0.5;

        foregroundLayer = map.createLayer('Tile Layer 1');

        map.createFromObjects('Object Layer 1', 1, 'player', 0, true, true, spawns);

        mapName = this.game.add.text(0, 0, spawns.getFirstAlive().name, this.font);

        mapNameContainer = this.game.add.sprite(5, this.game.camera.height - 30);
        mapNameContainer.fixedToCamera = true;
        mapNameContainer.addChild(mapName);

        map.createFromObjects('Object Layer 1', 2, 'player', 0, true, true, exits);
        exits.forEach(function (j) {
            j.alpha = 0;
        });

        ladders = this.game.add.group();
        map.createFromObjects('Object Layer 1', 8, 'ladder', 0, true, true, ladders);

        coins = this.game.add.group();
        map.createFromObjects('Object Layer 1', 5, 'coin', 0, true, true, coins);

        coins.forEach(function (i) {
            i.animations.add('spin');
            i.animations.play('spin',
                              12,
                              true);
        });

        npcs = this.game.add.group();
        map.createFromObjects('Object Layer 1', 6, 'player', 0, true, true, npcs);

        if (this.debug === true) {
            foregroundLayer.debug = true;
        }

        spawns.forEach(function (j) {
            j.alpha = 0;
            if (i.source === j.source) {
                player.x = j.x + 17;
                player.y = j.y - 48;
            }
        });

        foregroundLayer.resizeWorld();

        if (player) { player.bringToTop(); }
        mapNameContainer.bringToTop();
        fadeIn.bringToTop();
        moneyContainer.bringToTop();
        fpsContainer.bringToTop();

        fadeIn.alpha = 1;
        fadeTween.start();
    },

    render: function () {
        "use strict";

        //this.game.debug.renderSpriteBody(player);
    },

    addMoney: function (p, i) {
        "use strict";
        p.money += Number(i.amount);
        i.destroy();
    },

    setClimbable: function (p, i) {
        player.setClimbEnabled('true');
    },

    quitGame: function (pointer) {
        "use strict";

        this.game.state.start('MainMenu');
    }
};
