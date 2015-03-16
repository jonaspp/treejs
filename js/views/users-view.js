define(["fw/template", "fw/logger", "fw/view-support", "fw/states", "fw/command", "models/users", "fw/modal"], function(tmp, logger, viewSupport, states, cmd, users, modal) {

	var UsersView = viewSupport.extend({

		onNewClick : function(evt) 
		{
			states.go("users/new");
		},

		onSaveClick : function(evt) 
		{
			var user 		= {};
			user.id			= $("#form-id").val();
			user.cpf 		= $("#form-cpf").val();
			user.nome 		= $("#form-nome").val();
			user.email 		= $("#form-email").val();
			user.perfil 	= $("#form-perfil").val();
			user.pwd 		= $("#form-pwd").val();
			users.save(user);
			
			states.go("users");
		},

		onBackClick : function(evt) 
		{
			states.go("users");
		},

		onCleanClick : function(evt) 
		{
			$("form")[0].reset();
		},

		onDeleteClick : function(evt, id) 
		{
			var user = this.data.get(id);

			if(user != undefined)
			{
				var title = "Exclusão de Usuário";
				var message = 'Você deseja excluir o usuário "' + user.nome + '"?';
				
				modal.prompt(title, message,
					function(evt)
					{
						users.delete(user);
					});
			}
		},

		onEditClick : function(evt, id) 
		{
			states.go("users/" + id);
		},

		initialize: function()
		{
			var that = this;

			this.state = "#users";
			this.template = "users/template-users";
			
			this.addState("new", "users/template-user-edit");
			this.modelState("id", "users/template-user-edit");

			users.attach(function(model)
			{
				that.data = model;
				that.invalidate(model);
			});
		},

		preRender: function()
		{
			var that = this;
			this.data = users.fetch();
		}
	});	

	return UsersView;
});