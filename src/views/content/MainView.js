define(function(require, exports, module) {
    var View                = require('famous/core/View');
    var Surface             = require('famous/core/Surface');
    var Transform           = require('famous/core/Transform');
    var ContainerSurface    = require('famous/surfaces/ContainerSurface');
    var StateModifier       = require('famous/modifiers/StateModifier');
    var GridLayout          = require("famous/views/GridLayout");
    var ViewSequence        = require('famous/core/ViewSequence');
    var HeaderFooter        = require('famous/views/HeaderFooterLayout');
    var Scrollview          = require("famous/views/Scrollview");
    var Modifier            = require("famous/core/Modifier");
    var MouseSync           = require("famous/inputs/MouseSync");
    var RenderController    = require("famous/views/RenderController");

    var SwapperControllerView   = require('views/common/SwapperControllerView');
    var TicketPanelView         = require('views/content/panels/TicketPanelView');
    var AdminPanelView          = require('views/content/panels/AdminPanelView');
    var ReportPanelView         = require('views/content/panels/ReportPanelView');
    var SettingPanelView        = require('views/content/panels/SettingPanelView');
    var MapPanelView            = require('views/content/panels/MapPanelView');

    function MainView() {
        View.apply(this, arguments);

        this.renderController = new RenderController();
        this.ticketPanelView = new TicketPanelView();
        this.adminPanelView = new AdminPanelView();
        this.reportPanelView = new ReportPanelView();
        this.settingPanelView = new SettingPanelView();
        this.mapPanelView = new MapPanelView();

        _createLayout.call(this);

        _createHeaderRefactored.call(this);
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

    function _createHeaderRefactored() {
        this.layout.header.add(this.renderController);
        this.renderController.show(this.ticketPanelView);
    }

    function _createHeader() {

        var scrollview = new Scrollview();
        var surfaces = [];

        scrollview.sequenceFrom(surfaces);

        /*var position = [0, 0];
        var sync = new MouseSync();

        var temp1 = new ContainerSurface();

        var temp2 = new Surface({
             content: "Surface B",
             size: [undefined, 40],
             properties: {
                color: '#74CDAB',
                backgroundColor: "#2B3332",
                lineHeight: "30px",
                textAlign: "center"
             }
        });

        temp2.pipe(sync);

        sync.on('update', function(data){
            position[0] += data.delta[0];
            position[1] += data.delta[1];
        });

        sync.on("start", function() {
            temp2.setContent('now moving...');
        });

        sync.on("end", function() {
            position[0] = 0;
            position[1] = 0;
            temp2.setContent('Surface B');
        });

        var positionModifier = new Modifier({
            transform : function(){
                return Transform.translate(position[0], position[1], 0);
            }
        });

        temp1.add(positionModifier).add(temp2);

        temp1.pipe(scrollview);
        surfaces.push(temp1);*/

        for (var i = 0, temp; i < 20; i++) {
            temp = new Surface({
                 content: "Surface: " + (i + 1),
                 size: [undefined, 40],
                 properties: {
                    color: '#74CDAB',
                    backgroundColor: '#2B3332',
                    lineHeight: '30px',
                    textAlign: 'center',
                    cursor: 'pointer'
                 }
            });

            temp.pipe(scrollview);
            surfaces.push(temp);
        }

        /*
        var backgroundSurface = new Surface({
            content: "Test (TM)",
            properties: {
                color: '#74CDAB',
                backgroundColor: '#2B3332'
            }
        });*/

        var backingModifier = new StateModifier({
            transform: Transform.behind
        });

        this.layout.header.add(backingModifier).add(scrollview);
        //this.layout.header.add(scrollview);
    }

    MainView.prototype.StripMenuClicked = function(title) {

        if (title == 'menu 1') {
            this.renderController.show(this.ticketPanelView);
        }

        if (title == 'menu 2') {
            this.renderController.show(this.adminPanelView);
            
        }

        if (title == 'menu 3') {
            this.renderController.show(this.reportPanelView);
        }

        if (title == 'menu 4') {
            this.renderController.show(this.settingPanelView);
        }

        if (title == 'menu 5') {
            this.renderController.show(this.mapPanelView);
            
        }
    };

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