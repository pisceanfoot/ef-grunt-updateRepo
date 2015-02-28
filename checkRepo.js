var sysPath = require('path');
var colors = require('colors/safe');
var config = require('./config');
var repoSetting = require('./repoSetting');
var repoHelp = require('./repoHelp');

module.exports = function(grunt){
	grunt.registerTask('check', function(){
    // check all branch that has not merged into /develop
    var repoArray = repoHelp(config, repoSetting.checkRepo);
    
    for(var selectRepoIndex in repoArray){
      var selectRepo = repoArray[selectRepoIndex];

      var templateConfig = {
        gitcheckout:{
          specific:{
            options:{
              verbose: true,
              cwd:selectRepo.path,
              branch: 'develop'
            }
          },
        },
        shell: {
            specific: {
                options: {
                  stdout: false,
                  execOptions: {
                    cwd: selectRepo.path
                  },
                  callback: function shellCallBack (err, stdout, stderr, cb) {
                    if(stdout && stdout.trim()){
                      console.log("--------------------------");
                      console.log(colors.cyan.bold(stdout));
                      console.log("--------------------------");
                    }
                    cb();
                  }
              },
              command: [
                  'git branch -r --no-merged | grep "team/specialdeals/develop"',
                  'git branch -r --no-merged | grep "team/russian/develop"'
                  ].join('&&')
          }
        }
      };

      var gruntConfig = {
        gitcheckout:{},
        shell:{}
      }

      var taskName = sysPath.basename(selectRepo.path);

      gruntConfig.gitcheckout['task_' + selectRepo.project  + '_' + taskName]= templateConfig.gitcheckout.specific;
      gruntConfig.shell['task_' + selectRepo.project  + '_' + taskName] = templateConfig.shell.specific;
      
      grunt.config.merge(gruntConfig);

      grunt.task.run('gitcheckout:task_' + selectRepo.project  + '_' + taskName, 'shell:task_' + selectRepo.project  + '_' + taskName);
    }
  });
};