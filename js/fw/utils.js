define([], function(){
	
	return {

		isNumber: function (n) {
  			return !isNaN(parseFloat(n)) && isFinite(n);
		},

		isEmpty: function(str) {
			return (!str || 0 === str.length);
		},

		randomString: function(len) {
			return (Math.random() + 1).toString(36).substr(2, len);
		},

		backwardFindTag: function(target, tag) {
			if (target != undefined) 
			{
				if(target.tagName != tag)
				{
					return this.backwardFindTag(target.parentElement, tag);
				}
				else
				{
					return target;
				}
			};
	    }

	};

});