define(function(require, exports, module) {
    var View            = require('famous/core/View');
    var Surface         = require('famous/core/Surface');
    var Transform       = require('famous/core/Transform');
    var StateModifier   = require('famous/modifiers/StateModifier');
    var HeaderFooter    = require('famous/views/HeaderFooterLayout');
    var ImageSurface    = require('famous/surfaces/ImageSurface');

	var SwapperControllerView = require('views/SwapperControllerView');
    var FooterView = require('views/footer/FooterView');
	
    function PageView() {
        View.apply(this, arguments);

        _createBacking.call(this);
        _createLayout.call(this);
        _createBody.call(this);
        _createHeader.call(this);
		_createFooter.call(this);

        _setListeners.call(this);
    }

    PageView.prototype = Object.create(View.prototype);
    PageView.prototype.constructor = PageView;

    PageView.DEFAULT_OPTIONS = {
        headerSize: 44,
		footerSize: 352
    };

    function _createBacking() {
        var backing = new Surface({
            properties: {
                backgroundColor: '#2B3332',
                boxShadow: '0 0 20px rgba(0,0,0,0.5)'
            }
        });

        this.add(backing);
    }

    function _createLayout() {
        this.layout = new HeaderFooter({
            headerSize: this.options.headerSize,
			footerSize: this.options.footerSize
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
            size: [44, 44],
            content : 'img/hamburger.png'
        });

		this.rewindSurface = new ImageSurface({
            size: [24, 24],
            content : 'img/menu-icons/rewind.png'
        });

        this.rewindSurface.on('click', function() {
            var previousNode = this.bodySurface._pages.getPreviousItem();
            if (previousNode != null) {
                this.bodySurface.ShowPage(previousNode.nodeName);
            }
        }.bind(this));

		this.forwardSurface = new ImageSurface({
            size: [24, 24],
            content : 'img/menu-icons/forward.png'
        });

        this.forwardSurface.on('click', function() {
            var nextNode = this.bodySurface._pages.getNextItem();
            if (nextNode != null) {
                this.bodySurface.ShowPage(nextNode.nodeName);
            }
        }.bind(this));

		this.removeSurface = new ImageSurface({
            size: [28, 28],
            content : 'img/menu-icons/remove.png'
        });
		
        //var searchSurface = new ImageSurface({
        //    size: [232, 44],
        //    content : 'img/search.png'
        //});

        var iconSurface = new ImageSurface({
            size: [44, 44],
            content : 'img/waterline-logo.png'
        });

        var backgroundModifier = new StateModifier({
            transform : Transform.behind
        });

        var hamburgerModifier = new StateModifier({
            origin: [0, 0.5],
            align : [0, 0.5]
        });

		var rewindModifier = new StateModifier({
            transform: Transform.translate(44, 10, 0)
        });
		
		var forwardModifier = new StateModifier({
			transform: Transform.translate(80, 10, 0)
        });
		
		var removeModifier = new StateModifier({
            transform: Transform.translate(110, 8, 0)
        });

        var searchModifier = new StateModifier({
            origin: [0.5, 0.5],
            align : [0.5, 0.5]
        });

        var iconModifier = new StateModifier({
            origin: [1, 0.5],
            align : [1, 0.5]
        });

        this.layout.header.add(backgroundModifier).add(backgroundSurface);
        this.layout.header.add(hamburgerModifier).add(this.hamburgerSurface);
		this.layout.header.add(rewindModifier).add(this.rewindSurface);
		this.layout.header.add(forwardModifier).add(this.forwardSurface);
		this.layout.header.add(removeModifier).add(this.removeSurface);
        //this.layout.header.add(searchModifier).add(searchSurface);
        this.layout.header.add(iconModifier).add(iconSurface);
    }

    function _createBody() {
	
		this.bodySurface = new SwapperControllerView();
		
		this.bodySurface.AddPage('Alpha', 'red');
		this.bodySurface.AddPage('Beta', 'green');
		this.bodySurface.AddPage('Gamma', 'blue');
		
		this.layout.content.add(this.bodySurface);
		
		this.bodySurface.PrintPages();
		
		this.bodySurface.ShowPage('Beta');
		
        //this.bodySurface = new Surface({
        //    size : [undefined, undefined],
        //    content : 'Test (TM)',
		//	classes: ["page-style"]
        //});

        //this.layout.content.add(this.bodySurface);
    }

	function _createFooter() {

        this.footerView = new FooterView();
        this.layout.footer.add(this.footerView);

		/*var backgroundSurface = new Surface({
            content : 'Test (TM)',
			classes: ["footer-style"]
		});
		
		var backgroundModifier = new StateModifier({
            transform : Transform.behind
        });
		
		this.layout.footer.add(backgroundSurface);*/
	}
	
    function _setListeners() {
        this.hamburgerSurface.on('click', function() {
            this._eventOutput.emit('menuToggle');
        }.bind(this));

        this.bodySurface.pipe(this._eventOutput);
    }

    module.exports = PageView;
});
