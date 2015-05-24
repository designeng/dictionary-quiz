module.exports = (grunt) ->

    grunt.initConfig
        nodemon:
            dev:
                script: 'server.js'
                watch: ['app/*']

    grunt.loadNpmTasks "grunt-nodemon"

    grunt.registerTask "default", ["nodemon"]
