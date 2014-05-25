define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function FooterMenuView() {
        View.apply(this, arguments);
    }

    FooterMenuView.prototype = Object.create(View.prototype);
    FooterMenuView.prototype.constructor = FooterMenuView;

    FooterMenuView.DEFAULT_OPTIONS = {};

    module.exports = FooterMenuView;
});
