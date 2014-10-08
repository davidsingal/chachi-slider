module.exports = function(grunt) {

  'use strict';

  require('load-grunt-tasks')(grunt);
  require('time-grunt')(grunt);

  grunt.initConfig({

    connect: {
      server: {
        options: {
          port: 8000
        }
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      files: [
        '*.js',
        'src/*.js'
      ]
    },

    watch: {
      options: {
        spawn: false
      },
      scripts: {
        files: '<%= jshint.files %>',
        tasks: ['jshint']
      }
    }

  });

  grunt.registerTask('default', [
    'jshint',
    'connect:server',
    'watch'
  ]);

};
