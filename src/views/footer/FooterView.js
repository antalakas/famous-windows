define(function(require, exports, module) {
    var View          = require('famous/core/View');
    var Surface       = require('famous/core/Surface');
    var Modifier        = require('famous/core/Modifier');
    var Transform     = require('famous/core/Transform');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Transitionable  = require('famous/transitions/Transitionable');

    var FooterGridView = require('views/footer/FooterGridView');
    var MenuView      = require('views/menu/MenuView');
    var StripData     = require('data/StripData');

    function FooterView() {
        View.apply(this, arguments);

        this.menuToggle = false;
        this.pageViewPos = new Transitionable(0);

        _createFooterGridView.call(this);
        _createMenuView.call(this);

        _setListeners.call(this);
    }

    FooterView.prototype = Object.create(View.prototype);
    FooterView.prototype.constructor = FooterView;

    FooterView.DEFAULT_OPTIONS = {
        openPosition: 276,
        transition: {
            duration: 300,
            curve: 'easeOut'
        }
    };

    function _createFooterGridView() {

        this.footerGridView = new FooterGridView();
        this.footerGridModifier = new Modifier({
            transform: function() {
                return Transform.translate(this.pageViewPos.get(), 0, 0);
            }.bind(this)
        });

        this._add(this.footerGridModifier).add(this.footerGridView);
    }

    function _createMenuView() {
        this.menuView = new MenuView({ stripData: StripData });

        var menuModifier = new StateModifier({
            transform: Transform.behind
        });

        this.add(menuModifier).add(this.menuView);
    }

    function _setListeners() {
        this.footerGridView.on('menuToggle', this.toggleMenu.bind(this));
    }

    FooterView.prototype.toggleMenu = function() {
        if(this.menuToggle) {
            this.slideLeft();
        } else {
            this.slideRight();
            this.menuView.animateStrips();
        }
    };

    FooterView.prototype.slideLeft = function() {
        this.pageViewPos.set(0, this.options.transition, function() {
            this.menuToggle = false;
        }.bind(this));
    };

    FooterView.prototype.slideRight = function() {
        this.pageViewPos.set(this.options.openPosition, this.options.transition, function() {
            this.menuToggle = true;
        }.bind(this));
    };

    module.exports = FooterView;
});
