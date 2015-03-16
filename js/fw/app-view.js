define(['fw/template', 'fw/command', 'fw/states', 'views/menu-view', 'fw/logger', 'fw/utils'], function(tmp, cmd, states, MenuView, logger, utils) {

  var AppView = Backbone.View.extend({

      el: $('#screen'),

      events: {
        "click .menu-link" : "menuClick",
        "click button" : "onButtonClick"
      },

      menuClick: function(evt){
        $("li.active a.menu-link").parent().removeClass("active");
        $(evt.target).parent().addClass("active");
      },

      onButtonClick : function(evt){
        var target = utils.backwardFindTag(evt.target, "BUTTON");
        var name = $(target).attr("data-action");
        var param = $(target).attr("data-param");
        
        if(name == undefined)
        {
          return;
        }

        name = name[0].toUpperCase() + name.substring(1);
        var handlerName = "on" + name + "Click";

        if(this.middleView[handlerName] != undefined)
        {
          this.middleView[handlerName](evt, param);
        }
        else
        {
          logger.debug("No handler for '" + handlerName + "'");
        }
      },

      initialize: function() {          
        this.topView = new MenuView();
        this.topView.el = "#top";
        this.renderContainer();
      },

      renderView: function(view, state) {
        this.middleView = view;
        this.middleView.el = "#middle";
        this.middleView.render();
        if(this.middleView._stateChanged != undefined)
        {
          this.middleView._stateChanged(state);
        }
      },

      invalidate: function() {
        this.valid = undefined;
        this.renderContainer();
        this.render();
      },

      renderContainer: function()
      {
        if(this.valid == undefined)
        {
          var html = tmp.render("template-screen", "main")
          $(this.el).html(html);
          this.valid = true;
        }
        this.topView.render();
        var currentState = states.current();
        if (currentState != "") 
        {
          $("li.active a.menu-link").parent().removeClass("active");
          $("a.menu-link").each(function(i, val) {
            var el = $(val);
            if(el.attr("href") == currentState)
            {
              el.parent().addClass("active");
            }
          });
        }
      },

      render: function() {
        this.middleView.render();
      }

  });

  return AppView;

});