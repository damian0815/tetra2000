module.exports = function(grunt) {

  grunt.initConfig({
    qunit: {
      all: ['www-root/*.html']
    },
    connect: {
      server: {
        options: {
          keepalive: true,
          port: 1337,
          base: 'www-root'
        }
      }
    }
  });
  // This plugin provides the "connect" task.
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-qunit');


  // A convenient task alias.
  grunt.registerTask('default', ['connect', 'qunit']);

}
