module.exports = function (grunt) {

    'use strict';

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            version: '<%= pkg.version %>',
            banner: '// Jenga: fuck z-indexes\n' +
            '// ----------------------------------\n' +
            '// v<%= pkg.version %>\n' +
            '//\n' +
            '// Copyright (c)<%= grunt.template.today("yyyy") %> Jason Strimpel\n' +
            '// Distributed under MIT license\n'
        },
        preprocess: {
            global: {
                files: {
                    'dist/jenga.js': 'src/jenga.global.js'
                }
            },
            amd: {
                files: {
                    'dist/jenga.amd.js': 'src/jenga.amd.js'
                }
            },
            plugin: {
                files: {
                    'dist/jenga.plugin.js': 'src/jenga.plugin.js'
                }
            }
        },
        concat: {
            options: {
                banner: "<%= meta.banner %>"
            },
            global: {
                src: 'dist/jenga.js',
                dest: 'dist/jenga.js'
            },
            amd: {
                src: 'dist/jenga.amd.js',
                dest: 'dist/jenga.amd.js'
            },
            plugin: {
                src: 'dist/jenga.plugin.js',
                dest: 'dist/jenga.plugin.js'
            }
        },
        mocha_phantomjs: {
            all: ['test/**/*.html']
        }
    });

    grunt.loadNpmTasks('grunt-preprocess');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-mocha-phantomjs');

    grunt.registerTask('test', ['mocha_phantomjs']);
    grunt.registerTask('default', [
        'preprocess:global', 'concat:global', 'preprocess:amd', 'concat:amd', 'preprocess:plugin', 'concat:plugin'
    ]);
};