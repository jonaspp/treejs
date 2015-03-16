define(["fw/collection"], function(collection)
{
	var users = new collection();
	users.fetchUrl 	= "GetUsers";
	users.saveUrl 	= "SaveUser";
	users.deleteUrl = "DeleteUser";
	users.key 		= "id";	
	users.initialize();
	return users;
});