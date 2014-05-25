define(function(require, exports, module) {
    var View            = require('famous/core/View');
    var Surface         = require('famous/core/Surface');
    var Transform       = require('famous/core/Transform');
    var ContainerSurface = require('famous/surfaces/ContainerSurface');    
    var StateModifier   = require('famous/modifiers/StateModifier');
    var GridLayout      = require("famous/views/GridLayout");
    var ViewSequence       = require('famous/core/ViewSequence');
    var HeaderFooter    = require('famous/views/HeaderFooterLayout');

    var ReservationView = require('views/footer/ReservationView');
    var SearchItineraryView = require('views/footer/SearchItineraryView');

    function FooterGridView() {
        View.apply(this, arguments);

        _createBacking.call(this);
        _createLayout.call(this);
        _createGrid.call(this);
        _createFooter.call(this);

        _setListeners.call(this);
    }

    FooterGridView.prototype = Object.create(View.prototype);
    FooterGridView.prototype.constructor = FooterGridView;

    FooterGridView.DEFAULT_OPTIONS = {
        footerSize: 44
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
            footerSize: this.options.footerSize
        });

        var layoutModifier = new StateModifier({
            transform: Transform.translate(0, 0, 0.1)
        });

        this.add(layoutModifier).add(this.layout);
    }

    function _createGrid() {

        var grid = new GridLayout({
            dimensions: [2, 1]
        });

        var viewSequence = new ViewSequence();
        grid.sequenceFrom(viewSequence);

        this.reservationView = new ReservationView({
            size: [undefined, undefined]
        });

        viewSequence.push(this.reservationView);

        this.searchItineraryView = new SearchItineraryView({
            size: [undefined, undefined]
        });

        viewSequence.push(this.searchItineraryView);

        this.layout.content.add(grid);
    }

    function _createFooter() {
        var backgroundSurface = new Surface({
            content: "Test (TM)",
            properties: {
                color: '#74CDAB',
                backgroundColor: '#2B3332'
            }
        });

        var layoutModifier = new StateModifier({
            transform: Transform.behind
        });

        this.layout.footer.add(layoutModifier).add(backgroundSurface);
    }

    // event bubbling
    function _setListeners() {
        this.reservationView.on('menuToggle', function() {
            this._eventOutput.emit('menuToggle');
        }.bind(this));

        this.reservationView.pipe(this._eventOutput);
    }

    module.exports = FooterGridView;
});
