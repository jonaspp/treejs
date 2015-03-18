define(['treejs/template', 'treejs/utils'], function(tmp, utils){
	return {
		alert: function(title, message) {

			var template = "main/template-modal";
			
			var id = this._makeId();

			var data = {
				id		: id,
				title	: title,
				body	: message
			};
			var modal = this.build(template, data);
			modal.modal();
		},

		errorMessage: function(data) {

			var title = "Ops! Encontramos uma falha!";
			var message = "Um erro não esperado foi encontrado no lado do servidor: \r\n" + data.errorMessage;
			this.alert(title, message);
		},

		build: function(template, data) {

			if(data == undefined || data.id == undefined)
			{
				if(data == undefined)
				{
					data = {};
				}
				data.id = this._makeId();
			}

			var id = data.id;
			var templateParts = template.split("/");
			var templateA = templateParts[0];
			var templateB = templateParts[1];

			var html = tmp.render(templateB, templateA, data);

			$("body").append(html);

			var modal = $("#" + id);

			modal.on("hidden.bs.modal", function(){
				modal.remove();
			});

			return modal;
		},

		prompt: function(title, message, yesCallback, noCallback) {

			var id = this._makeId();
			var template = "main/template-modal-prompt";
			var data = {
				id		: id,
				title	: title,
				body	: message
			};

			var modal = this.build(template, data);

			modal.modal();
			
			if(yesCallback != undefined)
			{
				$("button.yes", modal).click(yesCallback);
			}
			if(noCallback != undefined)
			{
				$("button.no", modal).click(noCallback);
			}
		},

		_makeId: function()
		{
			return "modal-" + utils.randomString();
		}
	};
});