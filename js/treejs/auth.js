define(['treejs/command', 'treejs/modal'], function(cmd, modal)
{
	return {
		initialize: function()
		{
			if(this.authRequired)
			{
				if(this.url == undefined)
				{
					throw "auth url undefined";
				}
				if(this.template == undefined)
				{
					throw "auth url undefined";
				}
			}
		},
		authenticate : function(user, pwd)
		{
			var that = this;
			cmd.execute(this.url, {username: user, password: pwd}, function(data)
				{
					that.isAuthenticated = data.authenticated;
					that.sessionData = data.sessionData;
					if(data.authenticated)
					{
						that.authCallback(that.sessionData);
					}
					else
					{
						that.unauthCallback(data);
					}
				});
		},
		authorized : function(callback)
		{
			this.authCallback = callback;
		},
		unauthorized : function(callback)
		{
			this.unauthCallback = callback;
		},
		start : function(callback)
		{
			if(!this.authRequired)
			{
				return;
			}
			var login = modal.build(this.template);
			login.modal();
			callback(login);
		},
		is : function()
		{
			return this.isAuthenticated;
		},
		session : function()
		{
			return this.sessionData;
		}
	};
});