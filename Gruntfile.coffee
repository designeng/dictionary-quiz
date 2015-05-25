module.exports = (grunt) ->

    indexPath = "client/index.html"

    grunt.initConfig
        nodemon:
            dev:
                script: 'server.js'
                watch: ['app/*']

        watch:
            coffee_app:
                files: ['client/coffee/**/**.coffee']
                tasks: ["coffee-compile-app"]
            coffee_jasmine:
                files: ['test/jasmine/coffee/**/**.coffee']
                tasks: ["coffee-compile-jasmine"]
            js_requireConfig:
                files: ["client/js/requireConfig.js", "client/js/main.js", "test/jasmine/js/SpecRunner.js", "test/jasmine/js/SpecIndex.js"]
                tasks: ["concat:main", "concat:jasmine"]
            js:
                files: ["client/js/**/**.js", "test/jasmine/js/**/**.js"]
                options:
                    livereload: true

        coffee:
            app:
                options: {
                    bare: true
                }
                files: [
                    expand: true
                    cwd: 'client/coffee'
                    src: ['**/*.coffee']
                    dest: 'client/js'
                    ext: '.js'
                ]
            jasmine:
                options: {
                    bare: true
                }
                files: [
                    expand: true
                    cwd: 'test/jasmine/coffee'
                    src: ['**/*.coffee']
                    dest: 'test/jasmine/js'
                    ext: '.js'
                ]

        cjsx:
            app:
                options:
                    bare: true
                files: [
                    expand: true
                    cwd: 'client/coffee'
                    src: ['**/*.coffee']
                    dest: 'client/js'
                    ext: '.js'
                ]

        concat:
            main:
                src: ["client/js/requireConfig.js", "client/js/main.js"]
                dest: "client/js/supermain.js"
            jasmine:
                src: ["client/js/requireConfig.js", "test/jasmine/js/SpecRunner.js"]
                dest: "test/jasmine/js/superSpecRunner.js"

        copy:
            app:
                expand: true
                src: ["client/js/**"]
                dest: "build"

        requirejs:
            compile:
                options:
                    baseUrl: "client/js/"
                    mainConfigFile: "client/js/requireConfig.js"
                    name: "main"
                    out: "client/build/main.js"

        dataMainAttr:
            dev:
                from: /build\/main/g
                to: "js/supermain"
                indexPath: indexPath
            prod:
                from: /js\/supermain/g
                to: "build/main"
                indexPath: indexPath

    grunt.loadNpmTasks "grunt-contrib-watch"
    grunt.loadNpmTasks "grunt-contrib-coffee"
    grunt.loadNpmTasks "grunt-coffee-react"
    grunt.loadNpmTasks "grunt-contrib-connect"
    grunt.loadNpmTasks "grunt-contrib-concat"
    grunt.loadNpmTasks "grunt-contrib-copy"
    grunt.loadNpmTasks "grunt-newer"
    grunt.loadNpmTasks "grunt-contrib-requirejs"

    # grunt.registerTask "default", ["connect:server", "watch"]
    grunt.registerTask "build", ["dataMainAttr:prod", "requirejs:compile", "default"]

    grunt.registerMultiTask "dataMainAttr", "changes data-main attribute in index.html", (env) ->
        done = @async()
        grunt.log.write "Start rewrite index..."
        content = grunt.file.read @.data.indexPath, {encoding: "utf-8"}
        content = content.replace @.data.from, @.data.to
        grunt.file.write @.data.indexPath, content
        done()

    # compilation
    grunt.registerTask "coffee-compile-app", ["newer:cjsx:app"]

    grunt.loadNpmTasks "grunt-nodemon"

    # TODO: nodemon does not watch .coffee - open issue
    grunt.registerTask "default", ["nodemon"]
    # compile coffee separately (use concurency?)
    grunt.registerTask "compile", ["dataMainAttr:dev", "watch"]
