define(['treejs/logger', 'treejs/modal'], function(logger, modal)
{
	return {
		query: function(cmd, data)
		{
			var response;
			this._execute(false, cmd, data, function(res){
				response = res;
			});
			return response;
		},

		execute: function(cmd, data, callback)
		{
			this._execute(true, cmd, data, callback);
		},

		_execute: function(async, cmd, data, callback)
		{
			var params = {args:data};
			var stringJSON = JSON.stringify(params);
			$.ajax({
				url: cmd,
				data: {data: stringJSON},
				success: function(data)
				{
					if(data.error)
					{
						modal.errorMessage(data);
					}
					if(callback != undefined)
					{
						callback(data);
					}
				},
				error: function(data)
				{
					logger.error("Error executing command '" + cmd + "'\r\n" + data.responseText);
				},
				dataType: "JSON",
				async: async
			});
		}
	}
});