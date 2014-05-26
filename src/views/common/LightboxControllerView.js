define(function(require, exports, module) {
    var View          	= require('famous/core/View');
    var Surface       	= require('famous/core/Surface');
	var ContainerSurface = require('famous/surfaces/ContainerSurface');
    var Transform     	= require('famous/core/Transform');
    var StateModifier 	= require('famous/modifiers/StateModifier');
	var Lightbox      	= require('famous/views/Lightbox');

	var DoublyLinkedList = require('lib/DoublyLinkedList');
	
    function LightboxControllerView() {
        View.apply(this, arguments);
		
		this._pages = new DoublyLinkedList();
		this._currentPage = '';
		
		_createLightbox.call(this);
    }

    LightboxControllerView.prototype = Object.create(View.prototype);
    LightboxControllerView.prototype.constructor = LightboxControllerView;

    LightboxControllerView.DEFAULT_OPTIONS = {};

    function _createLightbox() {
        this._lightbox = new Lightbox();
        this.add(this._lightbox);
    }
	
	LightboxControllerView.prototype.AddPage = function AddPage(name, surface) {
	
		console.log('adding ' + name);
		this._pages.add(surface, name);
    }
	
	LightboxControllerView.prototype.RemovePage = function(name) {
		var index = this._pages.findIndexOfItem(name);
		this._pages.remove(index);
    }
	
	LightboxControllerView.prototype.ShowPage = function(name) {
		var surface = this._pages.findItem(name);
		
		if (surface) {  
		  this._lightbox.show(surface);
		  this._currentPage = name;
		}
    }
	
	LightboxControllerView.prototype.PrintPages = function() {
		console.log(this._pages);
    }
	
    module.exports = LightboxControllerView;
});
