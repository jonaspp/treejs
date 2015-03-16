define(['fw/logger', 'fw/template', 'fw/states', 'fw/auth', 'fw/session'], 
  function(logger, tmp, states, auth, session)
{
	Handlebars.registerHelper('selected', function(x, y) {
  		return x == y ? ' selected' : '';
	});

	Handlebars.registerHelper('session', function(expression) {
		var arr = expression.split(".");
		var r = session;
		for(var i = 0; i < arr.length; i++)
		{
			var e = arr[i];
			r = r[e];
		}
		return r;
	});

	Handlebars.registerHelper('auth', function(options) {
		if(session.sessionData.user.admin)
		{
			return options.fn(this);
		}
		return "";
	});
	Handlebars.registerHelper('keyValue', function(object, key) {

    if (arguments.length < 3)
        throw new Error("Handlerbars Helper 'keyValue' needs 2 parameters");

    return object[key];
});

	return {
		register : function(view, key, defaultView)
		{
			if(defaultView)
			{
				key = "__default__";
			}
			if(this.children == undefined)
			{
				this.children = [];
			}
			var v = new view();
			this.children[key] = v;
			return v;
		},
		start : function(AppView, config)
		{
			var that = this;
			var mainView = null;

			states.onStateChanged = function(partials) {
				var p1 = partials[0];	
				var view = that.children[p1];
				if(view == undefined)
				{
					logger.debug("No view is registerd for '" + p1 + "'");
					return;
				}
				mainView.renderView(view, partials);
			};

			tmp.initialize(config.templateRoot);

			if(config.authRequired)
			{
				auth.authRequired = true;
				auth.url = config.authUrl;
				auth.template = config.authTemplate;
				auth.autoLogin = config.autoLogin;
				auth.initialize();

				auth.start(function(loginScreen){
					auth.unauthorized(function(data){
						$("#feedback", loginScreen).text(data.message);
					});
					auth.authorized(function(data){
						session.save(data);
						loginScreen.modal('hide');					
						mainView = new AppView();
						states.initialize();
						states.go();
					});
					$("#login-button", loginScreen).click(function(evt){
						var user = $("#login-username", loginScreen).val();
						var pwd = $("#login-password", loginScreen).val();
						auth.authenticate(user, pwd);
					});
					if(auth.autoLogin)
					{
						auth.authenticate(auth.autoLogin.user, auth.autoLogin.password);
					}
				});
			}
			else
			{
				mainView = new AppView();
				states.initialize();
				states.go();
			}			
		}
	}
});