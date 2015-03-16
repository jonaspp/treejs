define(['fw/template'], function(tmp) {

	var MenuView = Backbone.View.extend({
	  render: function() {
	    var html = tmp.render("template-menu", "main")
	    $(this.el).html(html);
	  }
	});

	return MenuView;

});