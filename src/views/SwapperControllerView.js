define(function(require, exports, module) {
    var View          	= require('famous/core/View');
    var Surface       	= require('famous/core/Surface');
	var ContainerSurface = require('famous/surfaces/ContainerSurface');
    var Transform     	= require('famous/core/Transform');
    var StateModifier 	= require('famous/modifiers/StateModifier');
	var EdgeSwapper   	= require('famous/views/EdgeSwapper');

	var DoublyLinkedList = require('views/content/DoublyLinkedList');
	
    function SwapperControllerView() {
        View.apply(this, arguments);
		
		this._pages = new DoublyLinkedList();
		this._currentPage = '';
		
		_createEdgeSwapper.call(this);
		
		/*var list = new DoublyLinkedList();
		list.add("red", "red");
		list.add("orange");
		list.add("yellow");

		alert(list.item(1));   //"orange"

		list.remove(1);

		alert(list.item(1));   //"yellow"*/
    }

    SwapperControllerView.prototype = Object.create(View.prototype);
    SwapperControllerView.prototype.constructor = SwapperControllerView;

    SwapperControllerView.DEFAULT_OPTIONS = {};

    function _createEdgeSwapper() {
        this._edgeswapper = new EdgeSwapper();
        this.add(this._edgeswapper);
    }
	
	SwapperControllerView.prototype.AddPage = function AddPage(name, myColor) {
	
		console.log('adding ' + name);
	
		var containerSurface = new ContainerSurface({
			size: [undefined, undefined]
		});
	
		var contentSurface = new Surface({
			content: "<br><br>Test (TM)",
			size: [undefined, undefined],
			properties: {
				color: myColor
			}
		});
	
		containerSurface.add(contentSurface);
		
		this._pages.add(containerSurface, name);
		
		var downMod = new StateModifier({
		  transform: Transform.translate(0, 0, 0)
		});

		var rightMod = new StateModifier({
		  transform: Transform.translate(80, 0, 0)
		});

		var rightMod2 = new StateModifier({
		  transform: Transform.translate(160, 0, 0)
		});
		
		var leftSurface = new Surface({
		  size: [80, 30],
		  content: '<<',
		  properties: {
			color: 'white',
			textAlign: 'center',
			fontSize: '26px',
			backgroundColor: '#FA5C4F'
		  }
		});
		
		leftSurface.on('click', function() {
			var previousNode = this._pages.getPreviousItem();
            if (previousNode != null) {
                this.ShowPage(previousNode.nodeName);
            }
		}.bind(this));
		
		var rightSurface = new Surface({
		  size: [80, 30],
		  content: '>>',
		  properties: {
			color: 'white',
			textAlign: 'center',
			fontSize: '26px',
			backgroundColor: '#404040'
		  }
		});

		rightSurface.on('click', function() {
			var nextNode = this._pages.getNextItem();
            if (nextNode != null) {
                this.ShowPage(nextNode.nodeName);
            }
		}.bind(this));	
	
		var closeSurface = new Surface({
		  size: [30, 30],
		  content: 'X',
		  properties: {
			color: 'white',
			textAlign: 'center',
			fontSize: '26px',
			backgroundColor: '#FA5C4F'
		  }
		});

		closeSurface.on('click', function() {
		}.bind(this));	
		
		var node = containerSurface.add(downMod);
		node.add(leftSurface);
		node.add(rightMod).add(rightSurface);
		node.add(rightMod2).add(closeSurface);
    }
	
	SwapperControllerView.prototype.RemovePage = function(name) {
	
		var index = this._pages.findIndexOfItem(name);
		this._pages.remove(index);
    }
	
	/*SwapperControllerView.prototype.GetPage = function(name) {
        var surface = this._pages[name];
		return surface;
    }*/
	
	SwapperControllerView.prototype.ShowPage = function(name) {
		var surface = this._pages.findItem(name);
		
		if (surface) {  
		  this._edgeswapper.show(surface);
		  this._currentPage = name;
		}
    }
	
	SwapperControllerView.prototype.PrintPages = function(name) {
		console.log(this._pages);
    }
	
    module.exports = SwapperControllerView;
});