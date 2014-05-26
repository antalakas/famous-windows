define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Transform     = require('famous/core/Transform');
    var HeaderFooter    = require('famous/views/HeaderFooterLayout');
    var StateModifier = require('famous/modifiers/StateModifier');
    var ImageSurface    = require('famous/surfaces/ImageSurface');

    var SwapperControllerView = require('views/common/SwapperControllerView');

    function ReservationView() {
        View.apply(this, arguments);

        _createLayout.call(this);
        _createBody.call(this);
        _createHeader.call(this);

        _setListeners.call(this);
    }

    ReservationView.prototype = Object.create(View.prototype);
    ReservationView.prototype.constructor = ReservationView;

    ReservationView.DEFAULT_OPTIONS = {
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
                backgroundColor: '#534C46'
            }
        });

        this.hamburgerSurface = new ImageSurface({
            size: [32, 32],
            content : 'img/hamburger.png',
            properties: {
                cursor: 'pointer'
            }
        });

		this.rewindSurface = new ImageSurface({
            size: [17, 17],
            content : 'img/menu-icons/rewind.png',
            properties: {
                cursor: 'pointer'
            }
        });

        this.rewindSurface.on('click', function() {
            var previousNode = this.bodySurface._pages.getPreviousItem();
            if (previousNode != null) {
                this.bodySurface.ShowPage(previousNode.nodeName);
            }
        }.bind(this));

		this.forwardSurface = new ImageSurface({
            size: [17, 17],
            content : 'img/menu-icons/forward.png',
            properties: {
                cursor: 'pointer'
            }
        });

        this.forwardSurface.on('click', function() {
            var nextNode = this.bodySurface._pages.getNextItem();
            if (nextNode != null) {
                this.bodySurface.ShowPage(nextNode.nodeName);
            }
        }.bind(this));

		this.removeSurface = new ImageSurface({
            size: [20, 20],
            content : 'img/menu-icons/remove.png',
            properties: {
                cursor: 'pointer'
            }
        });
		
        var backgroundModifier = new StateModifier({
            transform : Transform.behind
        });

        var hamburgerModifier = new StateModifier({
            origin: [0, 0.5],
            align : [0, 0.5]
        });

		var rewindModifier = new StateModifier({
            transform: Transform.translate(44, 8, 0)
        });
		
		var forwardModifier = new StateModifier({
			transform: Transform.translate(80, 8, 0)
        });
		
		var removeModifier = new StateModifier({
            transform: Transform.translate(110, 6, 0)
        });
		
        this.layout.header.add(backgroundModifier).add(backgroundSurface);
        this.layout.header.add(hamburgerModifier).add(this.hamburgerSurface);
		this.layout.header.add(rewindModifier).add(this.rewindSurface);
		this.layout.header.add(forwardModifier).add(this.forwardSurface);
		this.layout.header.add(removeModifier).add(this.removeSurface);
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

    function _setListeners() {
        this.hamburgerSurface.on('click', function() {
            this._eventOutput.emit('menuToggle');
        }.bind(this));

        this.bodySurface.pipe(this._eventOutput);
    }

    function _createASurface() {

        var mySurface = new Surface({
            content: "panel " + (2),
            size: [undefined, undefined],
            properties: {
                backgroundColor: "hsl(" + (2 * 360 / 8) + ", 100%, 50%)",
                color: "#404040",
                lineHeight: '200px',
                textAlign: 'center'
            }
        });

        this.add(mySurface);

    }

    module.exports = ReservationView;
});
