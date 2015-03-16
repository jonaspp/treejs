define(['fw/logger'], function(logger)
{
	var MyRouter = Backbone.Router.extend({
		routes: {
			"*x": "routeMe"
		},
		routeMe: function(data) {
			var partial = (data ? '#'+data : null);
			if(partial == null)
			{
				partial = "__default__";
			}
			
			var partialArray = partial.split("/");
			logger.debug(partial);
			this.callback(partialArray);
		}
	});

	return {
		
		initialize : function()
		{
			this.router = new MyRouter();
			this.router.callback = this.onStateChanged;
			Backbone.history.start({pushState: false, root: "/"});
		},
		
		go : function(partial)
		{
			if(partial == undefined)
			{
				partial = window.location.hash;
				partial = partial.substring(1);
			}
			Backbone.history.navigate(partial, {trigger: true});
		},
		
		current : function()
		{
			return window.location.hash;
		},

		is : function(st)
		{
			return st == window.location.hash;
		},

		isAt : function(st)
		{
			var x = window.location.hash;
			var parts = x.split('/');
			if(parts.length > 0)
			{
				var c = parts[0];
				return st == c;
			}
			return st == window.location.hash;
		}
	};
});