module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-replace');

  grunt.initConfig({
    replace: {
      dist: {
        options: {
          patterns: [
            {
              json: {"a": "b"}
            }
          ]
        },
        files: {
          expand: true, src: ['src/index.html'], dest: 'build/'
        }
      }
    }
  });

  grunt.registerTask('buildSite', function(locale_lang) {

    console.log(`building ${locale_lang} site...`);

    let dictionary_words_es = grunt.file.readJSON(`src/lang/${locale_lang}-words.json`);
    let new_config = {};
    
    for (key in dictionary_words_es) {
      let temp_pattern = new RegExp(key, 'g');
      new_config[temp_pattern] = dictionary_words_es[key];
    }

    let new_config_array = [{json: new_config}];
    
    console.log(grunt.config.get('replace.dist.options.patterns'));
    grunt.config.set('replace.dist.options.patterns', new_config_array);
    console.log(grunt.config.get('replace.dist.options.patterns'));
    
    let dist_path = `build/${locale_lang}/`;
    if (locale_lang === 'es') {
      dist_path = `build/`;
    }

    //grunt.config.set('replace.dist.files.dest', dist_path);

    grunt.task.run('replace:dist');
  });

  grunt.registerTask('default', ['buildSite:es']);
};