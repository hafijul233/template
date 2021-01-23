"use strict";

module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '!dist/js/*.js',
                ]
            }
        },
        sass: {
            dist: {
                options: {style: 'expanded', sourceMap: true},
                files: [{dest: 'dist/css/style.css', src: 'src/scss/style.scss'},
                    {dest: 'dist/css/themes/danger.css', src: 'src/scss/themes/danger.scss'},
                    {dest: 'dist/css/themes/default.css', src: 'src/scss/themes/default.scss'},
                    {dest: 'dist/css/themes/info.css', src: 'src/scss/themes/info.scss'},
                    {dest: 'dist/css/themes/mono.css', src: 'src/scss/themes/mono.scss'},
                    {dest: 'dist/css/themes/primary.css', src: 'src/scss/themes/primary.scss'},
                    {dest: 'dist/css/themes/success.css', src: 'src/scss/themes/success.scss'},
                    {dest: 'dist/css/themes/warning.css', src: 'src/scss/themes/warning.scss'}
                ]
            }
        },
        watch: {
            src: {
                files: ['src/scss/style.scss'],
                tasks: ['sass:dist'],
                options: {
                    spawn: false,
                    livereload: 12344
                }
            }
        },
        connect: {
            server: {
                options: {
                    port: 9000,
                    hostname: '0.0.0.0',
                    base: '',
                    open: true
                }
            }
        },
        copy: {
            main: {
                files: [{
                    expand: true,
                    cwd: './node_modules',
                    src: ['**', '!**/.bin/**',
                        '!**/grunt/**',
                        '!**/grunt-contrib-connect/**',
                        '!**/grunt-contrib-copy/**',
                        '!**/grunt-contrib-jshint/**',
                        '!**/grunt-contrib-sass/**',
                        '!**/grunt-contrib-watch/**',
                        '!**/grunt-jscs/**',
                        '!**/jshint-stylish/**',
                        '!**/grunt-open/**'
                    ],
                    dest: 'vendors/',     // required when using cwd
                }]
            }
        },
    });

// Load all plugins.
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');

// Register all Tasks.
    grunt.registerTask('dist', ['copy']);
    grunt.registerTask('default', ['sass:dist', 'jshint:all', 'connect:server', 'watch:src']);
}
;