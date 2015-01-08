var path = require('path');

function getRepo (config, repo) {
	var workspace = config.workspace;

	var pathArray = [];
	for(key in repo){
		if(repo[key] && repo[key].length){
			for(var r in repo[key]){
				var tempRepo = repo[key][r];

				var data = {};
				data.project = key;

				if( typeof(tempRepo) == 'string'){
					data.name = tempRepo;
				}else{
					data.name = Object.keys(tempRepo)[0];					
					data.options = tempRepo[data.name];
				}

				if(config.flat){
					data.path = path.join(workspace, data.name);
				}else{
					data.path = path.join(workspace, key, data.name);
				}
				
				pathArray.push(data);
			}
		}
	}

	return pathArray;
}

module.exports = getRepo;