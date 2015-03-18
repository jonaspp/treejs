define(['treejs/view-support', 'treejs/modal'], function(viewSupport, modal) {

	var aboutView = viewSupport.extend({

    onModalClick : function(evt)
    {
      modal.alert("This is a popup!", "Hello, fell free to colaborate with the project!");
    },

    initialize: function()
    {
      this.state = "";
      this.template = "main/template-about"; 
    },

	});

	return aboutView;
});