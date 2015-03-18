define(["treejs/command", "treejs/utils", "treejs/logger"], function(cmd, utils, logger)
{
	var collection = function(){
		this.initialize = function(){
			this.listeners = [];
			this.collection = [];
			if(this.fetchUrl == undefined)
			{
				logger.warn("fetchUrl undefined for " + this.name);
			}
			if(this.saveUrl == undefined)
			{
				logger.warn("saveUrl undefined for " + this.name);
			}
			if(this.deleteUrl == undefined)
			{
				logger.warn("deleteUrl undefined for " + this.name);
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
			for(var i in this.collection)
			{
				if(this.collection[i][this.key] == single.id)
				{
					this.collection[i] = single;
					return;
				}
			}
			this.collection.push(single);
		};
		this.remove = function(single){
			for(var i in this.collection)
			{
				if(this.collection[i][this.key] == single.id)
				{
					this.collection.splice(i, 1);
				}
			}
		};
		this.fetch = function(){
			if(this.fetchUrl != undefined)
			{
				var data = cmd.query(this.fetchUrl, {});
				this.collection = data.collection;
			}
			return this;
		};
		this.asArray = function(){
			if(this.collection != undefined)
			{
				return this.collection;
			}
			return this.fetch().collection;
		};
		this.save = function(single, async){
			
			if(utils.isEmpty(single.id))
			{
				single.id = utils.randomString(8);
			}

			if(this.saveUrl != undefined)
			{
				if(async)
				{
					var that = this;
					cmd.execute(this.saveUrl, single, function(data){
						if(!data.error)
						{
							single.id = data.id;
							that.set(single);
						}
						that._notify();
					});
				}
				else
				{
					var data = cmd.query(this.saveUrl, single);
					if(!data.error)
					{
						single.id = data.id;
						this._notify();
					}
					return data;
				}
			}
			else
			{				
				this.set(single);
				this._notify();
				return single; 
			}		
		};
		this.delete = function(single, async){
			if(this.saveUrl != undefined)
			{
				if(async)
				{
					var that = this;
					cmd.execute(this.deleteUrl, single, function(){
						that.remove(single);
						that._notify();
					});
				}
				else
				{
					var r = cmd.query(this.deleteUrl, single);
					this.remove(single);
					this._notify();
					return r;
				}	

			}
			else
			{
				this.remove(single);
				this._notify();
				return single;				
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