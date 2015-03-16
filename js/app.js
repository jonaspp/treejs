require(['fw/engine', 'fw/template', 'fw/app-view', 'views/home-view', 'views/users-view'], 
  function(eng, tmp, AppView, HomeView, UsersView)
{

  var config = {
    templateRoot: "layout",
    authRequired: false,
    autoLogin: {user: "admin", password: "admin"},
    authUrl: "Login",
    authTemplate: "main/template-modal-login"
  };

  eng.register(HomeView,         "#home", true);
  eng.register(UsersView,        "#users");

  eng.start(AppView, config);
});