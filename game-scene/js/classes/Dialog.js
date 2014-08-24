/*global Phaser:true, player:true*/
function setCharAt(str, index, chr) {
    "use strict";

    if (index > str.length - 1) { return str; }
    return str.substr(0, index) + chr + str.substr(index + 1);
}

var Dialog = function (game, npc) {
    "use strict";
    this.game = game;

    var message = '', font = {fill: 'white', font: '9px Montserrat', align: 'left', wordWrap: true, wordWrapWidth: 78}, createTween;
    this.text = null;

    this.dialogBackground = game.add.sprite(10, 30, 'dialogBackground');
    this.dialogBackground.width = 600;
    this.dialogBackground.height = 0;
    this.dialogBackground.fixedToCamera = true;

    if (!player.quests[npc.id]) {
        player.quests[npc.id] = '00';
    }

    switch (npc.questType) {
    case 'collect':
        if (player.quests[npc.id].charAt(0) === '1' && player.quests[npc.id].charAt(1) !== '1') {
            if (player[npc.questItem] > npc.questAmount) {
                player[npc.questItem] -= npc.questAmount;
                player.quests[npc.id] = setCharAt(player.quests[npc.id], 1, '1');
            }
        }
        break;
    }

    if (npc.questType !== 'none') {
        if (player.quests[npc.id].charAt(0) !== '1' && message.length < 1) {
            message = npc.name + ': ' + npc.questAccept;
            player.quests[npc.id] = setCharAt(player.quests[npc.id], 0, '1');
        } else if (player.quests[npc.id].charAt(1) !== '1' && message.length < 1) {
            message = npc.name + ': ' + npc.questProgress;
        } else {
            message = npc.name + ': ' + npc.questComplete;
        }
    } else {
        message = npc.name + ': ' + npc.message;
    }
    createTween = game.add.tween(this.dialogBackground).to({height: 140},
                                                                100,
                                                                Phaser.Easing.Linear.None,
                                                                true,
                                                                0,
                                                                0,
                                                                false);
    createTween.onComplete.add(function () {
        this.text = game.add.text(10, 10, message, font);
        this.dialogBackground.addChild(this.text, 0, 0);
    }, this);
};
Dialog.prototype.constructor = Dialog;

Dialog.prototype.update = function () {
    "use strict";

};

Dialog.prototype.destroy = function () {
    "use strict";

    var destroyTween = this.game.add.tween(this.text).to({alpha: 0},
                                                         150,
                                                         Phaser.Easing.Linear.None,
                                                         true,
                                                         0,
                                                         0,
                                                         false);
    destroyTween.onComplete.add(function () {
        destroyTween = this.game.add.tween(this.dialogBackground).to({alpha: 0, height: 0},
                                                                     150,
                                                                     Phaser.Easing.Linear.None,
                                                                     true,
                                                                     0,
                                                                     0,
                                                                     false);
        destroyTween.onComplete.add(function () {
            this.dialogBackground.destroy();
            this.text = null;
            this.dialogBackground = null;
        }, this);
        this.text.destroy();
        this.game = null;
    }, this);
};
