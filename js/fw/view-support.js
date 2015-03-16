define(["fw/template", "fw/logger", "fw/states", "fw/utils"], function(tmp, logger, states, utils) {

	var ViewSupport = Backbone.View.extend({

		render: function(template, modelField, id) 
		{
			this._preRender();
			this._render(template, modelField, id);
			this._postRender();
		},

		_preRender: function() 
		{
			if(this.lateRender)
			{
				this.lateRender = false;
				return;
			}

			if(this.preRender != undefined)
			{
				this.preRender();
			}
		},

		_postRender: function() 
		{		
			if(this.postRender != undefined)
			{
				this.postRender();
			}
		},

		_render: function(template, modelField, id) 
		{
			if(template == undefined)
			{
				if(!states.isAt(this.state))
				{
					return;
				}

				template = this.template;
				if(template == undefined)
				{
					throw "template undefined ";
				}
			}

			var el = this.el;
			if(el == undefined)
			{
				throw "element undefined";
			}

			if(modelField != undefined && id != undefined)
			{
				var data = this.data.get(id);
			}
			else
			{
				var data = this.data;
			}

			var templateParts = template.split("/");
			var templateA = templateParts[0];
			var templateB = templateParts[1];
			var html = tmp.render(templateB, templateA, data)

			$(el).html(html);
		},

		addState: function(state, template)
		{
			var states = this._getStates();
			states[state] = template;
		},

		invalidate: function(data)
		{	
			if(data != undefined)
			{
				this.data = data;
			}
			this._render();
		},

		modelState: function(field, template)
		{
			this.modelStateTemplate = template;
			this.modelStateField = field;
		},

		_getStates: function()
		{
			if(this._states == undefined)
			{
				this._states = [];	
			}
			return this._states;
		},

		_stateFor: function(state)
		{			
			var states = this._getStates();
			return states[state];
		},

		_stateChanged: function(data)
		{
			if(this.stateChanged != undefined)
			{
				this.stateChanged(data);
			}

			if(data.length > 0)
			{
				var state = data[1];
				var tmp = this._stateFor(data[1]);
				var number = utils.isNumber(state);

				if(number)
				{
					this.render(this.modelStateTemplate, this.modelStateField, state);
				}
				else if(tmp != undefined)
				{
					this.render(tmp);
				}
			}
		}

	});

	return ViewSupport;
});