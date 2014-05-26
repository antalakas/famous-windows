define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');

    function CustomerView() {
        View.apply(this, arguments);
    }

    CustomerView.prototype = Object.create(View.prototype);
    CustomerView.prototype.constructor = CustomerView;

    CustomerView.DEFAULT_OPTIONS = {};

    module.exports = CustomerView;
});
