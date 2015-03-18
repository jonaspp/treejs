define([], function () {
	
	function _getPrototype(sheet) {
		var cols = _getCols(sheet);
		var prototype = {};
		for(var i = 0; i < cols.length; i++)
		{
			var cell = cols.charAt(i) + "1";
			var value = sheet[cell].v;
			prototype[cell] = value;
		}
		return prototype;
	}
	
	function _endOfSheet(sheet) {
		return sheet["!range"].e.r;
	}
			
	function _read(file, callback) {
		var reader  = new FileReader();
		if(file == undefined)
		{
			callback(null);
		}
		else
		{
			reader.onload = function(e)
			{
				var data       = e.target.result;
				var wb 	 	   = XLS.read(data, {type:'binary'});
				if(callback != undefined)
				{
					callback(wb);
				}
			};		
			reader.readAsBinaryString(file);
		}
	}
	
	function _getCols(sheet) {
		var size = sheet["!range"].e.c;
		var cols = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
		return cols.substring(0, size);
	}

	var result = {
		sheetByIndex : function(file, index, callback) {
			_read(file, function(wb){
				var sheet = null;
				if(wb != undefined)
				{
					var name  = wb.SheetNames[index];
					sheet = wb.Sheets[name];
				}
				if(callback != undefined)
				{
					callback(sheet);
				}
			});
		},
		
		toPlainObject : function(sheet) {
			var type 		= _getPrototype(sheet);
			var rowsLength 	= _endOfSheet(sheet);
			var cols 		= _getCols(sheet);
			
			var list = [];
			
			for(var i = 2; i <= rowsLength; i++)
			{
				var obj = {};
				for(var j = 0; j < cols.length; j++)
				{
					var refName		= cols.charAt(j) + "1";
					var fieldName 	= type[refName];
					var refValue	= cols.charAt(j) + i;
					var cell		= sheet[refValue];
					var value		= null;
					if(cell != undefined)
					{
						value = cell.v;
					}					
					obj[fieldName]	= value;
				}
				list.push(obj);
			}
			return list;
		}
	};
	
	return result;
});