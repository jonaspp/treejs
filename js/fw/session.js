define([], function(){
	return {
		save: function(data)
		{
			this.sessionData = data;
		},
		data: function()
		{
			return this.sessionData;
		}
	}
});