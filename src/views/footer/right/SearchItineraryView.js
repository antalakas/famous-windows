define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function SearchItineraryView() {
        View.apply(this, arguments);

        _createASurface.call(this);
    }

    SearchItineraryView.prototype = Object.create(View.prototype);
    SearchItineraryView.prototype.constructor = SearchItineraryView;

    SearchItineraryView.DEFAULT_OPTIONS = {};

    function _createASurface() {

        var mySurface = new Surface({
            content: "panel " + (2),
            size: [undefined, undefined],
            properties: {
                backgroundColor: "#8DCDC8",
                color: "#527472",
                lineHeight: '200px',
                textAlign: 'center'
            }
        });

        this.add(mySurface);

    }

    module.exports = SearchItineraryView;
});
