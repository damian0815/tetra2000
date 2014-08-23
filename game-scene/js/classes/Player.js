/*global Phaser:true, Reminiscence:true*/
var Player = function (game, ps, d) {
    "use strict";

    this.debug = d;

    Phaser.Sprite.call(this,
                       game,
                       ps.x + 17,
                       ps.y - 32,
                       'player');
    this.anchor.setTo(0.5,
                      0.5);

    this.body.collideWorldBounds = true;
    this.body.gravity.y = 3500;
    this.body.setSize(26, 62, 0, 0);

    this.runSpeed = 350;
    this.jumpHeight = 725;

    this.arrowKeys = game.input.keyboard.createCursorKeys();
    this.leftKey = game.input.keyboard.addKey(Phaser.Keyboard.A);
    this.rightKey = game.input.keyboard.addKey(Phaser.Keyboard.D);
    this.upKey = game.input.keyboard.addKey(Phaser.Keyboard.W);
    this.jumpButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    this.interactButton = game.input.keyboard.addKey(Phaser.Keyboard.E);
    this.jumpTimer = 0;
    this.jumpCount = 0;
    this.jumpLimit = 1;
    this.jumpPressed = false;
    this.isJumping = false;
    this.touchStartPos = {x: 0, y: 0};

    this.climbEnabled = false;

    this.money = 0;
    this.quests = [];

    game.add.existing(this);
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function () {
    "use strict";

    this.body.velocity.x = 0;

    if (this.body.touching.down) {
        this.isJumping = false;
        this.jumpCount = 0;
    }

    if (this.arrowKeys.left.isDown || this.leftKey.isDown) {
        this.body.velocity.x = -this.runSpeed;
    } else if (this.arrowKeys.right.isDown || this.rightKey.isDown) {
        this.body.velocity.x = this.runSpeed;
    }

    if (this.climbEnabled) {
        if (this.arrowKeys.up.isDown || this.upKey.isDown) {
            this.body.velocity.y = -350;
            this.runSpeed = 175;
        } else {
            this.runSpeed = 350;
        }
    } else {
        this.runSpeed = 350;
    }

    if (this.game.input.pointer1.justPressed()) {
        this.touchStartPos = {x: this.game.input.pointer1.x, y: this.game.input.pointer1.y};
    }

    if (this.game.input.pointer1.isDown) {
        if (this.game.input.pointer1.x < this.touchStartPos.x) {
            this.body.velocity.x = -this.runSpeed;
        } else if (this.game.input.x > this.touchStartPos.x) {
            this.body.velocity.x = this.runSpeed;
        } else {
            this.body.velocity.x = 0;
        }
    }

    if (this.jumpButton.isDown || this.game.input.pointer2.isDown) {
        if (this.jumpPressed) {
            if (this.body.touching.down && this.game.time.now > this.jumpTimer) {
                this.body.velocity.y = -this.jumpHeight;
                this.jumpTimer = this.game.time.now + 250;
                this.jumpPressed = false;
                this.isJumping = true;
                this.jumpCount += 1;
            } else if (this.jumpCount < this.jumpLimit && this.game.time.now > this.jumpTimer) {
                this.body.velocity.y = -this.jumpHeight;
                this.jumpTimer = this.game.time.now + 250;
                this.jumpPressed = false;
                this.isJumping = true;
                this.jumpCount += 1;
            }
        }
    } else {
        this.jumpPressed = true;
    }
};
