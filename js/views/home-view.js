define(['fw/command', 'fw/view-support', 'fw/modal', 'fw/auth', 'fw/states'], function(cmd, viewSupport, modal, auth, states) {

	var HomeView = viewSupport.extend({

    onStartClick : function(evt)
    {
      states.go("campaigns/new");
    },

    initialize: function()
    {
      this.state = "";
      this.template = "main/template-home"; 
    },

    preRender: function()
    {
      this.data = auth.sessionData;
    }

	});

	return HomeView;
});