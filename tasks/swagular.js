/*
 * grunt-swagular
 * https://github.com/stevenup7/grunt-swagular
 *
 * Copyright (c) 2014 Derek Pavao, Steven Upritchard
 * Licensed under the MIT license.
 */

'use strict';
var request = require('request');


module.exports = function(grunt) {

    // Please see the Grunt documentation for more information regarding task
    // creation: http://gruntjs.com/creating-tasks

    grunt.registerMultiTask('swagular', 'Generate Angular resources based on SwaggerUI', function() {
        // Merge task-specific and/or target-specific options with these defaults.
        var options = this.options({
            server: '',
            path: ', '
        });
        var done = this.async();

        grunt.log.writeln(this.options().server);

        var apiDef = {};

        var get_endpoint = function(options, endpoint) {

            request(options.server + options.path + endpoint.path, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var endpointDef = JSON.parse(body);
                    console.log(endpointDef);
                    endpointDef.apis.forEach(function (api){
                        console.log(" ");
                        console.log(api.path);
                        api.operations.forEach(function(operation) {
                            console.log(operation.method);
                            console.log(operation);
                        });
                    });
                } else {
                    grunt.log("bad bad all bad");
                }
            });
        };

        var get_swagger = function (options) {
            request(options.server + options.path, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var apis = JSON.parse(body).apis;
                    Object.keys(apis).forEach(function (endpoint) {
                        get_endpoint(options, apis[endpoint]);
                    });
                } else {
                    grunt.log("bad bad all bad");
                }
            });
        };

        get_swagger(options);


        //  // Iterate over all specified file groups.
        //  this.files.forEach(function(f) {
        //      grunt.log.writeln("this is the beginning");
        //      // Concat specified files.
        //      var src = f.src.filter(function(filepath) {
        //          // Warn on and remove invalid source files (if nonull was set).
        //          if (!grunt.file.exists(filepath)) {
        //              grunt.log.warn('Source file "' + filepath + '" not found.');
        //              return false;
        //          } else {
        //              return true;
        //          }
        //      }).map(function(filepath) {
        //          // Read file source.
        //          return grunt.file.read(filepath);
        //      }).join(grunt.util.normalizelf(options.separator));

        //      // Handle options.
        //      src += options.punctuation;

        //      // Write the destination file.
        //      grunt.file.write(f.dest, src);

        //      // Print a success message.
        //      grunt.log.writeln('File "' + f.dest + '" created.');
        //  });
    });

};
