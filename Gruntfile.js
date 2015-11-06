module.exports = function(grunt) {
	require('load-grunt-tasks')(grunt); // npm install --save-dev load-grunt-tasks

	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		'uglify': {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'dist/socket-event.js',
				dest: 'dist/socket-event.min.js'
			}
		},
		'babel': {
			// options: {
			// 	sourceMap: true
			// },
			dist: {
				files: {
					'dist/socket-event.js': 'src/socket-event-es6.js'
				}
			}
		},
		'watch': {
			files: ['src/socket-event-es6.js'],
			tasks: ['babel', 'uglify']
		}
	});


	grunt.loadNpmTasks('grunt-contrib-watch');

	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask('default', ['babel', 'uglify']);

};
