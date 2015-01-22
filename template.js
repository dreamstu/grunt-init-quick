/*
 * grunt-init-quick
 * https://gruntjs.com/
 *
 * Copyright (c) 2015 "QuickJs" dreamstu, contributors
 * Licensed under the MIT license.
 */

'use strict';

var $extend = function (target, source) {
    for (var p in source) {
        if (source.hasOwnProperty(p)) {
            target[p] = source[p];
        }
    }
    return target;
};

// Basic template description.
exports.description = 'Create a QuickJs plugin, including QUnit unit tests.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '_Project name_ should not contain "quick" or "js" and ' +
  'should be a unique ID not already in use at plugins.quickjs.org.\n _Project ' +
  'title_ should be a human-readable title, and doesn\'t need to contain ' +
  'the word "Quick", although it may.\n For example, a plugin titled "Awesome ' +
  'Plugin" might have the name "awesome-plugin".' +
  '\n\n'+
  'For more information, please see the following documentation:' +
  '\n\n'+
  'Naming Your Plugin      http://plugins.quickjs.org/docs/names/\n' +
  'Publishing Your Plugin  http://plugins.quickjs.org/docs/publish/\n' +
  'Package Manifest        http://plugins.quickjs.org/docs/package-manifest/';

// Template-specific notes to be displayed after question prompts.
exports.after = 'You should now install project dependencies with _npm ' +
  'install_. After that, you may execute project tasks with _grunt_. For ' +
  'more information about installing and configuring Grunt, please see ' +
  'the Getting Started guide:' +
  '\n\n' +
  'http://gruntjs.com/getting-started';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template.
exports.template = function(grunt, init, done) {

  init.process({type: 'jquery'}, [
    // Prompt for these values.
    init.prompt('name'),
    init.prompt('title', function(value, data, done) {
      // Fix Quick capitalization.
      value = value.replace(/jquery/gi, 'Quick');
      done(null, value);
    }),
    init.prompt('description', 'The best QuickJs plugin ever.'),
    init.prompt('version'),
    init.prompt('repository'),
    init.prompt('homepage'),
    init.prompt('bugs'),
    init.prompt('licenses', 'MIT'),
    init.prompt('author_name'),
    init.prompt('author_email'),
    init.prompt('author_url'),
    init.prompt('seajs_version','2.2.1')
  ], function(err, props) {
    // A few additional properties.

    props.keywords = [];

    // Files to copy (and process).
    var files = init.filesToCopy(props);

    // Add properly-named license files.
    init.addLicenseFiles(files, props.licenses);

    // Actually copy (and process) files.
    init.copyAndProcess(files, props, {noProcess: 'libs/**'});

    // Generate package.json file, used by npm and grunt.
    init.writePackageJSON('package.json',$extend({
      name: 'quick-plugin',
      version: '0.0.0-ignored',
      npm_test: 'grunt qunit',
      // TODO: pull from grunt's package.json
      node_version: '>= 0.8.0',
      devDependencies: {
        'grunt-quick-transport': '~0.1.0',
        'grunt-cmd-concat': '~0.2.7',
        'grunt-contrib-clean': '~0.4.0',
        'grunt-contrib-uglify': '~0.2.0',
        'grunt-contrib-copy': '~0.7.0',
        'grunt-contrib-watch': '~0.4.0',
        'load-grunt-tasks': '^0.4.0',
        'time-grunt': '^0.4.0'
      }
    },props), function(pkg, props) {
      // The QuickJs site needs the "bugs" value as a string.
      if ('bugs' in props) { pkg.bugs = props.bugs; }
      return pkg;
    });

    // All done!
    done();
  });

};
