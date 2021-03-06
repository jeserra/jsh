var fs = require('fs'),
	url = require('url'),
	data = require("./../data.json"),
	config = require("./../config.json");
	filePath = "./data.json";

module.exports = {

	get: function(req, res, next) {
		var resource = req.params.resource,
			itemArg = req.params[0] || req.query.id || null,
			items;

		if (data[resource] && !itemArg) {
			return returnAll(data[resource], req, res);
		} else if (data[resource] && itemArg) {
			items = data[resource];
			return returnSingle(items, itemArg, res);
		} else if (!data[resource] && !itemArg) {
			return returnAll(data.unknown, req, res);
		} else if (!data[resource] && itemArg) {
			items = data.unknown;
			return returnSingle(items, itemArg, res);
		}
	},

	post: function(req, res, next) {
		var id = req.body.id || (Math.ceil(Math.random() * 1000)).toString().substring(0, 3),
			returnData = req.body,
			resource = req.params.resource;

		returnData.id = Number(id);
		returnData.createdAt = new Date().toISOString();

		console.log("Original: " + data[resource].length)
		data[resource].push(returnData);
		console.log("Despues: " + data[resource].length);

		console.log("Element created:");
		console.log(returnData);
		console.log("-----------------------------");

	    fs.writeFile(filePath, JSON.stringify(data), function () {
        	return res.status(201).send(returnData);
	    });
	},

	put: function(req, res, next) {
		var returnData = req.body;
		returnData.updatedAt = new Date().toISOString();

		var resource = req.params.resource,
			targetID = returnData.id;

		if(targetID !== null){

			for(var i=0; i<data[resource].length; i++){
				if(targetID == data[resource][i].id){

					console.log("Element edited:");
					console.log(data[resource][i]);
					data[resource][i] = returnData;
					console.log("-----------------------------");
					console.log("New information:");
					console.log(data[resource][i]);

				    fs.writeFile(filePath, JSON.stringify(data), function () {
				    	console.log("Edited has been completed");
				    });
					break;
				}
			}
		}

		return res.status(200).send(returnData);
	},

	patch: function(req, res, next) {
		var returnData = req.body;
		returnData.updatedAt = new Date().toISOString();
		return res.status(200).send(returnData);
	},

	delete: function(req, res, next) {
		var resource = req.params.resource,
			itemArg = req.params[0] || req.query.id || null;

		if(itemArg !== null){

			for(var i=0; i<data[resource].length; i++){
				if(itemArg == data[resource][i].id){
					console.log("Element deleted:");
					console.log(data[resource][i]);
					console.log("-----------------------------");
					data[resource].splice(i, 1);

				    fs.writeFile(filePath, JSON.stringify(data), function () {
				    	console.log("Deleten has been completed");
				    });					
					break;
				}
			}			
		}
		return res.status(204).send({});
	},

	login: function(req, res, next) {
		if (req.body.username || req.body.email) {
			if (req.body.password) {
				return res.status(200).send({
					token: config.token
				});
			} else {
				return res.status(400).send({
					error: "Missing password"
				});
			}
		} else {
			return res.status(400).send({
				error: "Missing email or username"
			});
		}
	},

	register: function(req, res, next) {
		if (req.body.username || req.body.email) {
			if (req.body.password) {
				return res.status(201).send({
					token: config.token
				});
			} else {
				return res.status(400).send({
					error: "Missing password"
				});
			}
		} else {
			return res.status(400).send({
				error: "Missing email or username"
			});
		}
	},

	logout: function(req, res, next) {
		return res.status(200).send({});
	}

};

function returnAll(items, req, res) {
	var page = parseInt(req.query.page, 10) || 1,
		//pageSize = parseInt(req.query.per_page, 10) || config.pagination.page_size,
		pageSize = 100,
		offset = (page - 1) * pageSize,
		paginatedItems = items.slice(offset, offset + pageSize);
	return res.status(200).send({
		page: page,
		per_page: pageSize,
		total: items.length,
		total_pages: Math.ceil(items.length / pageSize),
		data: paginatedItems
	});
}

function returnSingle(items, itemArg, res) {
	var singleItem = items.filter(function(item) {
		return item.id == itemArg;
	});
	if (singleItem.length) {
		return res.status(200).send({
			data: singleItem[0]
		});
	}
	return res.status(404).send({});
}
