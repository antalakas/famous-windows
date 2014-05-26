define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var HeaderFooter  = require('famous/views/HeaderFooterLayout');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ImageSurface  = require('famous/surfaces/ImageSurface');

    var LightboxControllerView = require('views/common/LightboxControllerView');

    function MultiView() {
        View.apply(this, arguments);

        //_createASurface.call(this);
        _createLayout.call(this);
        _createBody.call(this);
        _createHeader.call(this);

    }

    MultiView.prototype = Object.create(View.prototype);
    MultiView.prototype.constructor = MultiView;

    MultiView.DEFAULT_OPTIONS = {
        headerSize: 32
    };

    function _createLayout() {
        this.layout = new HeaderFooter({
            headerSize: this.options.headerSize
        });

        var layoutModifier = new StateModifier({
            transform: Transform.translate(0, 0, 0.1)
        });

        this.add(layoutModifier).add(this.layout);
    }

    function _createHeader() {

        var backgroundSurface = new Surface({
            properties: {
                backgroundColor: '#2B3332'
            }
        });

        var backgroundModifier = new StateModifier({
            transform : Transform.behind
        });

        this.layout.header.add(backgroundModifier).add(backgroundSurface);

        _createMenuItem.call(this, 'Menu Item 1', 5);
        _createSeparatorItem.call(this, 85);
        _createMenuItem.call(this, 'Menu Item 2', 90);
        _createSeparatorItem.call(this, 170);
        _createMenuItem.call(this, 'Menu Item 3', 175);
    }

    function _createMenuItem(menuItemText, position) {

        var menuItem = new Surface({
            content: menuItemText,
            size: [true, undefined],
            properties: {
                color: "#74CDAB",
                cursor: 'pointer'
            }
        });

        var menuItemModifier = new StateModifier({
            transform: Transform.translate(position, 8, 0)
        });

        this.layout.header.add(menuItemModifier).add(menuItem);

        menuItem.on('click', function(e) {

            if (e.currentTarget.innerText == 'Menu Item 1') {
                this.bodySurface.ShowPage('slide1');
            }

            if (e.currentTarget.innerText == 'Menu Item 2') {
                this.bodySurface.ShowPage('slide2');
            }

            if (e.currentTarget.innerText == 'Menu Item 3') {
                this.bodySurface.ShowPage('slide3');
            }

        }.bind(this));
    }

    function _createSeparatorItem(position) {

        var separatorItem = new Surface({
            content: ' | ',
            size: [true, undefined],
            properties: {
                color: "#74CDAB"
            }
        });

        var separatorItemModifier = new StateModifier({
            transform: Transform.translate(position, 8, 0)
        });

        this.layout.header.add(separatorItemModifier).add(separatorItem);
    }

    function _createBody() {
    
        this.bodySurface = new LightboxControllerView();

        var slide1 = _createASurface.call(this, 1);
        this.bodySurface.AddPage('slide1', slide1);
        var slide2 = _createASurface.call(this, 2);
        this.bodySurface.AddPage('slide2', slide2);
        var slide3 = _createASurface.call(this, 3);
        this.bodySurface.AddPage('slide3', slide3);
        
        this.layout.content.add(this.bodySurface);    

        this.bodySurface.ShowPage('slide2');
    }

    function _setListeners() {
        this.hamburgerSurface.on('click', function() {
            this._eventOutput.emit('menuToggle');
        }.bind(this));

        this.bodySurface.pipe(this._eventOutput);
    }

    function _createASurface(pageCount) {

        var mySurface = new Surface({
            content: "panel " + (pageCount),
            size: [undefined, undefined],
            properties: {
                backgroundColor: "#8DCDC8",
                color: "#527472",
                lineHeight: '200px',
                textAlign: 'center'
            }
        });

        return mySurface;
    }

    module.exports = MultiView;
});
