var checkRepo = require('./checkRepo');
var updateRepo = require('./updateRepo');


module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
  });

  grunt.loadNpmTasks('grunt-git');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('default', ['shell']);

  checkRepo(grunt);
  updateRepo(grunt);
};
