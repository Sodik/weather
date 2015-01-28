module.exports = function(grunt){
	grunt.initConfig({
		clean: {
			src: ['build/']
		},
		copy: {
		  main: {
		    src: 'src/**',
		    dest: 'dist/',
		  },
		},
		nodewebkit: {
			options: {
		        platforms: ['win','osx'],
		        buildDir: 'build/',
		    },
		    src: 'src/**'
		}
	});

	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-browserify');
	grunt.loadNpmTasks('grunt-node-webkit-builder');
	grunt.loadNpmTasks('grunt-contrib-copy');

	grunt.registerTask('default', ['clean', 'nodewebkit']);
}