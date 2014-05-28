define(function(require, exports, module) {
    var View            = require('famous/core/View');
    var Surface         = require('famous/core/Surface');
    var Transform       = require('famous/core/Transform');
    var StateModifier   = require('famous/modifiers/StateModifier');
    var Scrollview      = require("famous/views/Scrollview");

    var GenericPanelView = require('views/content/panels/GenericPanelView');

    function ReportPanelView() {
        GenericPanelView.apply(this, arguments);

        _createSequence.call(this);
    }

    ReportPanelView.prototype = Object.create(GenericPanelView.prototype);
    ReportPanelView.prototype.constructor = ReportPanelView;

    ReportPanelView.DEFAULT_OPTIONS = {
    };

    function _createSequence() {

        var surfaces = [];

        this.reportScrollView.sequenceFrom(surfaces);

        for (var i = 40, temp; i < 60; i++) {
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

            temp.pipe(this.reportScrollView);
            surfaces.push(temp);
        }

        var backingModifier = new StateModifier({
            transform: Transform.behind
        });

        this.add(backingModifier).add(this.reportScrollView);
    }


    module.exports = ReportPanelView;
});