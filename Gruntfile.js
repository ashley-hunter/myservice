module.exports = function(grunt) {

    grunt.initConfig({
        jekyll: {
            build: {
                options: {
                    serve: false,
                    incremental: true,
                    watch: false,
                    config: '_config.yml',
                    bundleExec: true
                }
            },
            serve: {
                options: {
                    serve: true,
                    incremental: true,
                    watch: true,
                    baseurl: '/documentation',
                    config: '_config.yml',
                    open_url: true,
                    bundleExec: true
                }
            }
        },
        buildcontrol: {
            options: {
                dir: '.',
                commit: true,
                push: true,
                message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
            },
            pages: {
                options: {
                    remote: 'git@github.com:ashley-hunter/myservice.git',
                    login: '',
                    token: '',
                    branch: 'gh-pages'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-build-control');
    grunt.loadNpmTasks('grunt-jekyll');

    grunt.registerTask('default', ['jekyll:build']);

    grunt.registerTask('build', ['jekyll:build']);
    grunt.registerTask('serve', ['jekyll:serve']);

    grunt.registerTask('publish', ['buildcontrol:pages']);
};