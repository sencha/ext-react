/*
 * Copyright (c) 2012-2014. Sencha Inc.
 */

//@require uglify.js

var compressWithUglify = function(code) {
    var ast = UglifyJS.parse(code);
    var compressor = UglifyJS.Compressor({});
    ast.figure_out_scope();
    ast = ast.transform(compressor);
    var result = ast.print_to_string();
    return result;
}