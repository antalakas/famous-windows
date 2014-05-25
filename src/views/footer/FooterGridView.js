define(function(require, exports, module) {
    var View            = require('famous/core/View');
    var Surface         = require('famous/core/Surface');
    var Transform       = require('famous/core/Transform');
    var ContainerSurface = require('famous/surfaces/ContainerSurface');    
    var StateModifier   = require('famous/modifiers/StateModifier');
    var GridLayout      = require("famous/views/GridLayout");
    var ViewSequence       = require('famous/core/ViewSequence');

    var ReservationView = require('views/footer/ReservationView');
    var SearchItineraryView = require('views/footer/SearchItineraryView');

    function FooterGridView() {
        View.apply(this, arguments);

        _createBacking.call(this);
        _createGrid.call(this);

        _setListeners.call(this);
    }

    FooterGridView.prototype = Object.create(View.prototype);
    FooterGridView.prototype.constructor = FooterGridView;

    FooterGridView.DEFAULT_OPTIONS = {};

    function _createBacking() {
        var backing = new Surface({
            properties: {
                backgroundColor: 'black',
                boxShadow: '0 0 20px rgba(0,0,0,0.5)'
            }
        });

        this.add(backing);
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

        this.add(grid);
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
