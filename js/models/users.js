define(["treejs/collection"], function(collection)
{
	var users = new collection();	
	users.name = "users";

	//users.fetchUrl 	= "api/users/get";
	//users.saveUrl 	= "api/users/save";
	//users.deleteUrl = "api/users/delete";
	
	users.key 		= "id";	
	users.initialize();
	return users;
});