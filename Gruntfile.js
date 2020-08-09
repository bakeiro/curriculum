module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-replace');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.initConfig({
    replace: {
      dist: {
        options: {
          patterns: [
            {
              json: {
                "a": "b"
              }
            }
          ]
        },
        files: [
          {
            expand: true, src: ['src/index.html'], dest: 'dist/'
          }
        ] 
      }
    },
    concat: {
      js: {
        src: ['src/www/js/Jquery.min.js', 'src/www/js/materialize.min.js'],
        dest: 'dist/build_script.js'
      },
      css: {
        src: ['src/www/css/materialize.min.css', 'src/www/css/styles.css', 'src/www/css/font-awesome.css'],
        dest: 'dist/build_styles.css'
      }
    }
  });

  grunt.registerTask('buildSite', function(locale_lang) {

    // build dictionary
    let dictionary_words_es = grunt.file.readJSON(`src/lang/${locale_lang}-words.json`);
    let new_config = {};
    
    for (key in dictionary_words_es) {
      let temp_pattern = `${key}`;
      new_config[temp_pattern] = dictionary_words_es[key];
    }

    let new_config_array = [{json: new_config}];    
    grunt.config.set('replace.dist.options.patterns', new_config_array);
    
    // dist path
    let dist_path = `dist/${locale_lang}/`;
    if (locale_lang === 'es') {
      dist_path = `dist/`;
    }

    let dist_path_array = [{expand: true, src: ['src/index.html'], dest: dist_path}];
    grunt.config.set('replace.dist.files', dist_path_array);

    grunt.task.run('replace:dist');
  });

  grunt.registerTask('default', ['buildSite:es', 'buildSite:en', 'concat']);
};