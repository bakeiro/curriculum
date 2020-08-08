module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-replace');

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
    }
  });

  grunt.registerTask('buildSite', function(locale_lang) {

    console.log(`building ${locale_lang} site...`);

    // build dictionary
    let dictionary_words_es = grunt.file.readJSON(`src/lang/${locale_lang}-words.json`);
    let new_config = {};
    
    for (key in dictionary_words_es) {
      //let temp_pattern = new RegExp(key, 'g');
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

  grunt.registerTask('default', ['buildSite:es', 'buildSite:en']);
};