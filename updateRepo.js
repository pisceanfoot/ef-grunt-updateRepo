var sysPath = require('path');
var colors = require('colors/safe');
var config = require('./config');
var repoSetting = require('./repoSetting');
var repoHelp = require('./repoHelp');

module.exports = function(grunt){
	grunt.registerTask('update', function(){
	    var repoArray = repoHelp(config, repoSetting.updateRepo);
	    
	    for(var selectRepoIndex in repoArray){
	    	
	    	var selectRepo = repoArray[selectRepoIndex];
	     	var templateConfig = {
		        gitpull:{
		          specific:{
		            options:{
		              verbose: false,
		              cwd: selectRepo.path,
		              branch: (selectRepo.options && selectRepo.options.branch) || 'develop',
		              consoleCallback: function (err, result) {
		              	if(result.stdout == 'Already up-to-date.'){
		              		console.log(colors.yellow.bold(result.stdout));
		              		return;
		              	}

		              	grunt.config.set('grunt.msbuild.run', true);
		              	console.log(colors.yellow.bold("run task:" + this.name + "_" + this.nameArgs));
		              }
		            }
		          },
		        },
		        shell: {
		            specific: {
		                options: {
		                  stdout: true,
		                  execOptions: {
		                    cwd: selectRepo.path,
		                    maxBuffer: 0
		                  }
		              },
		              command: function(){
		              	var appendArg = "-1";
		              	if(selectRepo.options && selectRepo.options.legacy){
		              		appendArg = "";
		              	}

		              	return 'powershell.exe -ExecutionPolicy Unrestricted .\\build-me.ps1 -RunDebugBuild ' + appendArg;
		              }
		          }
		        }
		   };

		   var gruntConfig = {
        		gitpull:{},
        		shell:{}
      		}

      		var taskName = sysPath.basename(selectRepo.path);
      		gruntConfig.gitpull['task_' + taskName]= templateConfig.gitpull.specific;
      		gruntConfig.shell['task_' + taskName]= templateConfig.shell.specific;
      		grunt.config.merge(gruntConfig);

      		grunt.task.run('gitpull:task_' + taskName);

      		grunt.task.registerTask('build:task_' + taskName, function(){
      			var currentTaskName = this.name.substring(6);
      			this.requires('gitpull:' + currentTaskName);

      			var run = grunt.config.get('grunt.msbuild.run');
      			grunt.config.set('grunt.msbuild.run', false);
      			
      			if(run){
      				grunt.task.run('shell:' + currentTaskName);
      			}else{
      				console.log(colors.yellow.bold("nothing to build, exit..."));
      			}
      		});
      		grunt.task.run('build:task_' + taskName);
		}
    });
};