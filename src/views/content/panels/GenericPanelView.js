define(function(require, exports, module) {
    var View            = require('famous/core/View');
    var Surface         = require('famous/core/Surface');
    var Transform       = require('famous/core/Transform');
    var StateModifier   = require('famous/modifiers/StateModifier');
    var Scrollview      = require("famous/views/Scrollview");

    function GenericPanelView() {
        View.apply(this, arguments);
    }

    GenericPanelView.prototype = Object.create(View.prototype);
    GenericPanelView.prototype.constructor = GenericPanelView;

    GenericPanelView.prototype.ticketScrollView = new Scrollview();
    GenericPanelView.prototype.adminScrollView = new Scrollview();
    GenericPanelView.prototype.reportScrollView = new Scrollview();
    GenericPanelView.prototype.settingScrollView = new Scrollview();
    GenericPanelView.prototype.mapScrollView = new Scrollview();

    GenericPanelView.DEFAULT_OPTIONS = {
    };

    module.exports = GenericPanelView;
});
