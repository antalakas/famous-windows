define(function(require, exports, module) {
    var View            = require('famous/core/View');
    var Surface         = require('famous/core/Surface');
    var Transform       = require('famous/core/Transform');
    var StateModifier   = require('famous/modifiers/StateModifier');
    var Scrollview      = require("famous/views/Scrollview");

    var GenericPanelView = require('views/content/panels/GenericPanelView');

    function SettingPanelView() {
        GenericPanelView.apply(this, arguments);

        _createSequence.call(this);
    }

    SettingPanelView.prototype = Object.create(GenericPanelView.prototype);
    SettingPanelView.prototype.constructor = SettingPanelView;

    SettingPanelView.DEFAULT_OPTIONS = {
    };

    function _createSequence() {

        var surfaces = [];

        this.settingScrollView.sequenceFrom(surfaces);

        for (var i = 60, temp; i < 80; i++) {
            temp = new Surface({
                 content: "Surface: " + (i + 1),
                 size: [undefined, 40],
                 properties: {
                    color: '#74CDAB',
                    backgroundColor: '#2B3332',
                    lineHeight: '30px',
                    textAlign: 'center',
                    cursor: 'pointer'
                 }
            });

            temp.pipe(this.settingScrollView);
            surfaces.push(temp);
        }

        var backingModifier = new StateModifier({
            transform: Transform.behind
        });

        this.add(backingModifier).add(this.settingScrollView);
    }


    module.exports = SettingPanelView;
});