var Page = Backbone.View.extend({
	events:{
		'click .back':'back',
	},
	back: function(event){
		event.preventDefault();
		window.history.back();
	}
});

var Pane = Page.extend({
	initialize: function() {
		this.render();
	},
	render:function(){
		this.$el.show();
		this.center_content();
		this.$el.hide();
	},
	center_content: function(){
		/* Adds margin to center content container */
		var available_space = $(window).height();
		available_space -= $('.navbar:first').height();
		available_space -= this.$('.content').outerHeight();
		available_space -= this.$('.actions').outerHeight();

		if(available_space > 0){
			this.$('.content').css({
				'margin-top': available_space/2 + $('.navbar:first').height(),
				'margin-bottom': available_space/2,
			});
		}else{
			this.$('.content').css({
				'margin-top': $('.navbar:first').height(),
				'margin-bottom': '0px',
			});
		}
	},
	enter: function(){
		this.$el.show();
		if(this.$el.hasClass("pane-why")) $('.navbar:not(.pane .navbar)').hide();
	},
	exit: function(){
		this.$el.hide();
		if(this.$el.hasClass("pane-why")) $('.navbar:not(.pane .navbar)').show();
	},
});

var Workspace = Backbone.Router.extend({
	routes:{
		":path?:args":"page",
		"*path":"page", // gotta catch em all
	},
	initialize: function(){
		new Page({
			el:$('.navbar:first'),
		});
	},
	page: function(path,args){
		if(args){
			alert(args)
			if(args.indexOf('pump')) this.device = 'pump';
			if(args.indexOf('shots')) this.device = 'shots';
			if(args.indexOf('high')) this.bloodSugar = 'high';
			if(args.indexOf('low')) this.bloodSugar = 'low';
			if(args.indexOf('small')) this.ketones = 'small';
			if(args.indexOf('large')) this.ketones = 'large';
		}
		var router = this;
		if(router.currentPane) router.currentPane.exit();
		router.currentPane = false;

		if(path){
			var matchedPages = $("#"+path);
		}else{
			var matchedPages = $('.pane:first');
		}
		if(matchedPages.length > 1){
			// filter
		}
		router.currentPane = new Pane({
			el:matchedPages[0],
		});
		router.currentPane.enter();
	}
});
var workspace = new Workspace();
Backbone.history.start();