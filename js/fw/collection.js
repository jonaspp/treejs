define(["fw/command", "fw/utils"], function(cmd, utils)
{
	var collection = function(){
		this.initialize = function(){
			this.listeners = [];
			if(this.fetchUrl == undefined)
			{
				throw "fetchUrl undefined ";
			}
			if(this.saveUrl == undefined)
			{
				throw "saveUrl undefined ";
			}
			if(this.deleteUrl == undefined)
			{
				throw "deleteUrl undefined ";
			}
			if(this.key == undefined)
			{
				throw "key undefined ";
			}
		};
		this.get = function(id){
			for(var i in this.collection)
			{
				if(this.collection[i][this.key] == id)
				{
					return this.collection[i];
				}
			}
		};
		this.set = function(single){
			if(single.id == "-1")
			{
				this.collection.push(single);
				return;
			}
			for(var i in this.collection)
			{
				if(this.collection[i][this.key] == single.id)
				{
					this.collection[i] = single;
				}
			}
		};
		this.remove = function(single){
			if(single.id == "-1")
			{
				return;
			}
			for(var i in this.collection)
			{
				if(this.collection[i][this.key] == single.id)
				{
					this.collection.splice(i, 1);
				}
			}
		};
		this.fetch = function(){
			var data = cmd.query(this.fetchUrl, {});
			this.collection = data.collection;
			return this;
		};
		this.asArray = function(){
			if(this.collection != undefined)
			{
				return this.collection;
			}
			return this.fetch().collection;
		};
		this.save = function(single, async, callback){
			var that = this;
			if(utils.isEmpty(single.id))
			{
				single.id = "-1";
			}
			if(async)
			{
				var data = cmd.query(this.saveUrl, single);
				if(!data.error)
				{
					single.id = data.id;
					that.set(single);
					this._notify();
				}
				return data;
			}
			else
			{
				cmd.execute(this.saveUrl, single, function(data){
					if(!data.error)
					{
						single.id = data.id;
						that.set(single);
					}
					that._notify();
				});
			}			
		};
		this.delete = function(single, async, callback){
			var that = this;
			if(async)
			{
				var r = cmd.query(this.deleteUrl, single);
				this.remove(single);
				this._notify();
				return r;
			}
			else
			{
				cmd.execute(this.deleteUrl, single, function(){
					that.remove(single);
					that._notify();
				});
			}	
		};
		this.attach = function(callback) {
			if(!_.contains(this.listeners, callback))
			{
				this.listeners.push(callback);
			}
		};
		this._notify = function(){
			if(this.listeners != undefined)
			{
				for(var i in this.listeners)
				{
					this.listeners[i](this);
				}
			}
		}
		return this;
	};
	return collection;
});