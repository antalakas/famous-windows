define(function(require, exports, module) {
    var View            = require('famous/core/View');
    var Surface         = require('famous/core/Surface');
    var Transform       = require('famous/core/Transform');
    var ContainerSurface = require('famous/surfaces/ContainerSurface');
    var StateModifier   = require('famous/modifiers/StateModifier');
    var GridLayout      = require("famous/views/GridLayout");
    var ViewSequence    = require('famous/core/ViewSequence');
    var HeaderFooter    = require('famous/views/HeaderFooterLayout');

    var SwapperControllerView = require('views/common/SwapperControllerView');

    function MainView() {
        View.apply(this, arguments);

        _createLayout.call(this);

        _createHeader.call(this);
        _createBody.call(this);
    }

    MainView.prototype = Object.create(View.prototype);
    MainView.prototype.constructor = MainView;

    MainView.DEFAULT_OPTIONS = {
        headerSize: 300,
        layoutDirection: 0
    };

    function _createLayout() {
        this.layout = new HeaderFooter({
            headerSize: this.options.headerSize,
            direction: this.options.layoutDirection
        });

        this.add(this.layout);
    }

    function _createHeader() {
        var backgroundSurface = new Surface({
            content: "Test (TM)",
            properties: {
                color: '#74CDAB',
                backgroundColor: '#2B3332'
            }
        });

        this.layout.header.add(backgroundSurface);
    }

    function _createBody() {

        this.bodySurface = new SwapperControllerView();

        this.bodySurface.AddPage('Alpha', 'red');
        this.bodySurface.AddPage('Beta', 'green');
        this.bodySurface.AddPage('Gamma', 'blue');

        this.layout.content.add(this.bodySurface);

        this.bodySurface.PrintPages();

        this.bodySurface.ShowPage('Beta');
    }

    MainView.prototype.ShowPreviousPage = function(name) {
        var previousNode = this.bodySurface._pages.getPreviousItem();
        if (previousNode != null) {
            this.bodySurface.ShowPage(previousNode.nodeName);
        }
    }

    MainView.prototype.ShowNextPage = function(name) {
        var nextNode = this.bodySurface._pages.getNextItem();
        if (nextNode != null) {
            this.bodySurface.ShowPage(nextNode.nodeName);
        }
    }

    module.exports = MainView;
});
