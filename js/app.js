require(['treejs/engine', 'views/home-view', 'views/users-view', 'views/about-view'], 
  function(eng, homeView, usersView, aboutView)
{

  var config = {
    templateRoot: "layout",
    authRequired: false,
    autoLogin: {user: "admin", password: "admin"},
    authUrl: "Login",
    authTemplate: "main/template-modal-login"
  };

  eng.first(homeView,     "#home");
  eng.register(usersView, "#users");
  eng.register(aboutView, "#about");

  eng.start(config);
  
});