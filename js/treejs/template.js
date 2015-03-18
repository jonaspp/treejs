define(['treejs/logger'], function(logger)
{
	return {
		initialize : function(root)
		{
			this.root = root;
			this.partials = [];
		},
		load : function(partial, async, callback)
		{
			var that = this;
			var url = this.root + '/' + partial + ".html";
			$.ajax({
			    url: url,
			    success: function(data)
			    {
			    	that.add(data, partial);
			      	if(callback != undefined)
		      		{
		      			callback();
		      		}
			    },
			    error: function(data)
			    {
			    	logger.error(data);
			    },
			    dataType: "HTML",
			    async: async
			});
		},
		add : function(html, partial)
		{
			this.partials[partial] = "LOADED";
			$("body").append(html);
		},	
		render : function(name, partial, data)
		{
			if(this.partials[partial] == undefined)
			{
				this.load(partial, false);
			}

			var source   = $("#" + name).html();
	        var template = Handlebars.compile(source)(data);
	        return template;
		} 
	};
});