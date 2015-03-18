define(function () {

	var result = {
			
			enabled: true,
			DEBUG: 0,
			INFO: 1,
			WARN: 2,
			ERROR: 3,
			level: 0,
		
			debug: function(message) {
				if(this.enabled &&  this.level <= this.DEBUG)
				{
					console.log("[DEBUG] " + message);
				}
			},
		
			info: function(message) {
				if(this.enabled &&  this.level <= this.INFO)
				{
					console.log("[INFO] " + message);
				}
			},
		
			warn: function(message) {
				if(this.enabled &&  this.level <= this.WARN)
				{
					console.log("[WARN] " + message);
				}
			},
		
			error: function(message) {
				if(this.enabled &&  this.level <= this.ERROR)
				{
					console.error("[ERROR] " + message);
				}
			}
		};
	
	return result;
	
});