define(function(require, exports, module) {
    var View            = require('famous/core/View');
    var Surface         = require('famous/core/Surface');
    var Transform       = require('famous/core/Transform');
    var StateModifier   = require('famous/modifiers/StateModifier');
    var Scrollview      = require("famous/views/Scrollview");

    var GenericPanelView = require('views/content/panels/GenericPanelView');

    function MapPanelView() {
        GenericPanelView.apply(this, arguments);

        _createSequence.call(this);
    }

    MapPanelView.prototype = Object.create(GenericPanelView.prototype);
    MapPanelView.prototype.constructor = MapPanelView;

    MapPanelView.DEFAULT_OPTIONS = {
    };

    function _createSequence() {

        var surfaces = [];

        this.mapScrollView.sequenceFrom(surfaces);

        for (var i = 80, temp; i < 100; i++) {
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

            temp.pipe(this.mapScrollView);
            surfaces.push(temp);
        }

        var backingModifier = new StateModifier({
            transform: Transform.behind
        });

        this.add(backingModifier).add(this.mapScrollView);
    }


    module.exports = MapPanelView;
});