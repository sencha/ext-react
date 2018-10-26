(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Fashion = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var Fashion = require('./src/export/Base.js');
var CssVariableManager = require('./src/export/css/CssVariableManager.js'),
    css = new CssVariableManager();

Fashion.apply(Fashion, {
    css: css,
    CssExport: CssVariableManager,
    ValueParser: require('./src/export/parse/ValueParser.js'),
    functions: {
        Color: require('./src/functions/Color.js'),
        Gradients: require('./src/functions/Gradients.js'),
        HSL: require('./src/functions/HSL.js'),
        Introspection: require('./src/functions/Introspection.js'),
        List: require('./src/functions/List.js'),
        Misc: require('./src/functions/Misc.js'),
        Numeric: require('./src/functions/Numeric.js'),
        Opacity: require('./src/functions/Opacity.js'),
        RGB: require('./src/functions/RGB.js'),
        Selectors: require('./src/functions/Selectors.js'),
        Text: require('./src/functions/Text.js'),
        Util: require('./src/functions/Util.js')
    },
    parse: {
        ast: {
            BaseNode: require('./src/parse/ast/BaseNode.js'),
            Nodes: require('./src/parse/ast/Nodes.js')
        },
        Scanner: require('./src/parse/Scanner.js'),
        Tokenizer: require('./src/parse/Tokenizer.js'),
        Parser: require('./src/parse/Parser.js')
    },
    processors: {
        CssVariables: require('./src/processors/CssVariables.js'),
        NameRegistrations: require('./src/processors/NameRegistrations.js'),
        DataInline: require('./src/processors/DataInline.js')
    },
    BaseSelector: require('./src/type/selectors/BaseSelector.js'),
    BaseSelectorList: require('./src/type/selectors/BaseSelectorList.js'),
    CompoundSelector: require('./src/type/selectors/CompoundSelector.js'),
    MultiPartSelector: require('./src/type/selectors/MultiPartSelector.js'),
    SelectorList: require('./src/type/selectors/SelectorList.js'),
    SelectorPart: require('./src/type/selectors/SelectorPart.js'),
    SelectorProperty: require('./src/type/selectors/SelectorProperty.js'),
    Type: require('./src/export/type/Type.js'),
    Bool: require('./src/export/type/Bool.js'),
    Literal: require('./src/export/type/Literal.js'),
    ParentheticalExpression: require('./src/export/type/ParentheticalExpression.js'),
    Text: require('./src/export/type/Text.js'),
    Numeric: require('./src/export/type/Numeric.js'),
    List: require('./src/export/type/List.js'),
    Map: require('./src/export/type/Map.js'),
    Color: require('./src/export/type/Color.js'),
    ColorRGBA: require('./src/export/type/ColorRGBA.js'),
    ColorHSLA: require('./src/export/type/ColorHSLA.js'),
    ColorStop: require('./src/export/type/ColorStop.js'),
    FunctionCall: require('./src/export/type/FunctionCall.js'),
    Declaration: require('./src/type/Declaration.js'),
    LinearGradient: require('./src/export/type/LinearGradient.js'),
    RadialGradient: require('./src/export/type/RadialGradient.js'),
    Ruleset: require('./src/type/Ruleset.js'),
    Statics: require('./src/export/type/Statics.js'),
    SourceBuilder: require('./src/type/SourceBuilder.js'),
    Types: require('./src/type/Types.js'),
    TypeVisitor: require('./src/type/TypeVisitor.js'),
    Builder: require('./src/Builder.js'),
    CompressedOutput: require('./src/CompressedOutput.js'),
    Context: require('./src/Context.js'),
    CSS: require('./src/CSS.js'),
    CssPostprocessor: require('./src/CssPostprocessor.js'),
    Env: require('./src/Env.js'),
    ExtendProcessor: require('./src/ExtendProcessor.js'),
    Output: require('./src/export/Output.js'),
    PlaceholderProcessor: require('./src/PlaceholderProcessor.js'),
    Preprocessor: require('./src/Preprocessor.js'),
    Ready: require('./src/Ready.js'),
    Runtime: require('./src/Runtime.js'),
    SassFile: require('./src/SassFile.js'),
    Transpiler: require('./src/Transpiler.js'),
    Visitor: require('./src/Visitor.js')

});

module.exports = Fashion;

},{"./src/Builder.js":4,"./src/CSS.js":5,"./src/CompressedOutput.js":6,"./src/Context.js":7,"./src/CssPostprocessor.js":8,"./src/Env.js":9,"./src/ExtendProcessor.js":10,"./src/PlaceholderProcessor.js":12,"./src/Preprocessor.js":13,"./src/Ready.js":14,"./src/Runtime.js":15,"./src/SassFile.js":16,"./src/Transpiler.js":17,"./src/Visitor.js":18,"./src/export/Base.js":19,"./src/export/Output.js":20,"./src/export/css/CssVariableManager.js":22,"./src/export/parse/ValueParser.js":23,"./src/export/type/Bool.js":24,"./src/export/type/Color.js":25,"./src/export/type/ColorHSLA.js":26,"./src/export/type/ColorRGBA.js":27,"./src/export/type/ColorStop.js":28,"./src/export/type/FunctionCall.js":29,"./src/export/type/LinearGradient.js":30,"./src/export/type/List.js":31,"./src/export/type/Literal.js":32,"./src/export/type/Map.js":33,"./src/export/type/Numeric.js":34,"./src/export/type/ParentheticalExpression.js":35,"./src/export/type/RadialGradient.js":36,"./src/export/type/Statics.js":38,"./src/export/type/Text.js":39,"./src/export/type/Type.js":40,"./src/functions/Color.js":43,"./src/functions/Gradients.js":44,"./src/functions/HSL.js":45,"./src/functions/Introspection.js":46,"./src/functions/List.js":47,"./src/functions/Misc.js":48,"./src/functions/Numeric.js":49,"./src/functions/Opacity.js":50,"./src/functions/RGB.js":51,"./src/functions/Selectors.js":52,"./src/functions/Text.js":53,"./src/functions/Util.js":54,"./src/parse/Parser.js":55,"./src/parse/Scanner.js":56,"./src/parse/Tokenizer.js":57,"./src/parse/ast/BaseNode.js":59,"./src/parse/ast/Nodes.js":60,"./src/processors/CssVariables.js":61,"./src/processors/DataInline.js":62,"./src/processors/NameRegistrations.js":64,"./src/type/Declaration.js":65,"./src/type/Ruleset.js":66,"./src/type/SourceBuilder.js":67,"./src/type/TypeVisitor.js":68,"./src/type/Types.js":69,"./src/type/selectors/BaseSelector.js":70,"./src/type/selectors/BaseSelectorList.js":71,"./src/type/selectors/CompoundSelector.js":72,"./src/type/selectors/MultiPartSelector.js":73,"./src/type/selectors/SelectorList.js":74,"./src/type/selectors/SelectorPart.js":75,"./src/type/selectors/SelectorProperty.js":76}],2:[function(require,module,exports){

},{}],3:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };

},{}],4:[function(require,module,exports){
"use strict";

var Fashion = require('./export/Base.js'),
    Base = Fashion.Base;

var Context = require('./Context.js');
var Preprocessor = require('./Preprocessor.js');
var Transpiler = require('./Transpiler.js');
var Env = require('./Env.js');
var SassFile = require('./SassFile.js');

var Parser = require('./parse/Parser.js');
var Scanner = require('./parse/Scanner.js');

class Builder extends Base {

    constructor(config) {
        super(config);

        this.scripts = {};
        Fashion.lastBuilder = this;
        this.context = new Context(this.context);

        this.context.libraries = this.context.libraries || {
                compass: "../lib/compass/stylesheets/",
                blueprint: "../lib/blueprint/stylesheets/"
            };
    }

    getContext() {
        return this.context;
    }

    compile(scss, file) {
        var context = this.getContext(),
            jsCode = context.convert(scss, file),
            fn = context.compile(jsCode),
            css = fn(context.runtime, {}, context.preprocessor.getDynamicsMap());
        return css;
    }


    createSetters(vars) {
        var setters = '',
            varName;
        if (typeof vars === 'string') {
            setters = vars;
        } else {
            for (varName in vars) {
                setters += varName + ": dynamic(" + vars[varName] + ");\n";
            }
        }
        return setters;
    }

    createVarsScope(vars) {
        var context = this.context,
            parser = new Parser(),
            preprocessor = new Preprocessor({
                runtime: context.runtime
            }),
            newContext = new Context({
                runtime: context.runtime,
                preprocessor: preprocessor
            }),
            setters = this.createSetters(vars),
            allVariables = Fashion.chain(context.getVariables()),
            setterAst, setterVariables, sortedAst, settersCode, settersFunc,
            newGlobals;


        setterAst = parser.parse(setters);
        preprocessor.preprocess(setterAst, true);
        preprocessor.loadPreprocessorCache(context.preprocessor);

        setterVariables = preprocessor.getVariables();
        Fashion.apply(allVariables, setterVariables);

        preprocessor.variables = allVariables;
        context.dynamicsMap = preprocessor.getDynamicsMap();
        sortedAst = preprocessor.getSortedDynamicAstNodes();

        settersCode = newContext.convert(sortedAst);
        newContext.runtime.setCaches(context.transpiler);
        settersFunc = newContext.compile(settersCode);

        // execute the generated fn to setup a global scope that
        // has all the parsed values;
        settersFunc(context.runtime, null, context.dynamicsMap);
        newGlobals = context.runtime.getGlobalScope();
        return newGlobals;
    }

    rebuildCss(vars) {
        var context = this.context,
            func = context.getFunc(),
            css;

        // now, re-executed the cached fn using the provided setters
        // as initial state
        css = func(context.runtime, vars, context.dynamicsMap);
        return css;
    }

    /**
        File can be of type string or object with following parameters:
        {
            path: '',                   // the path to the scss file to build
            split: 4095,                // the split threshold
            compress: false,            // whether to copress output
            variables: {                // global variable overrides
                '$base-color': ''
            }
        }
     * 
     */
    build(file, callback) {
        var me = this,
            context, sassFile, split, vars;

        if (typeof file !== 'string') {
            split = file.split;
            me.compressed = file.compress;
            vars = file.variables;
            file = file.path;
        }

        // reset some calculated path variables
        this._sassFileUiPath = null;
        this._sassFileSavePath = null;

        function onError(error) {
            Fashion.log("Build error for " + file);
            var message = (error.message || error) + "";
            callback && callback(["/* " + message + " */"], error);
        }
        
        context = me.getContext();
        try {
            sassFile = me.getSassFile(file);
            sassFile.invalidate();
            sassFile.onReady(function () {
                Fashion.log("Fashion build starting for " + file);

                try {
                    var ast = sassFile.getExpandedAst(),
                        converted = context.convert(ast),
                        func = context.compile(converted),
                        css = func(),
                        dynamics = context.dynamicsMap || context.preprocessor.getDynamicsMap();

                    if (vars) {
                        var scope = me.createVarsScope(vars);
                        context.dynamicsMap = dynamics;
                        css = me.rebuildCss(scope);
                    }

                    css.getText(function (cssContent, exportFn) {
                            Fashion.log("Fashion build complete for " + file);
                            callback && callback(cssContent, null, exportFn);
                        },
                        me.compressed,
                        me.indent,
                        me.skipComments,
                        split);

                } catch (error) {
                    onError(error);
                }
            });
        }
        catch (error) {
            onError(error);
        }
    }

    getSassFile(path, relPath, origSource, importer) {
        var scripts = this.scripts,
            isSaveFile = false,
            isUiFile = false,
            sassFileSavePath, sassFileUiPath, script, className;


        path = this.getSassFilePath(path, relPath);
        script = scripts[path];

        if (this.varSavePath) {
            sassFileSavePath = this._sassFileSavePath || this.getSassFilePath(this.varSavePath);
            this._sassFileSavePath = sassFileSavePath;
            isSaveFile = (path === sassFileSavePath);
        }

        if (this.srcSavePath) {
            sassFileUiPath = this._sassFileUiPath || this.getSassFilePath(this.srcSavePath);
            this._sassFileUiPath = sassFileUiPath;
            isUiFile = (path.indexOf(sassFileUiPath) === 0);
        }

        if (isUiFile) {
            className = path.replace(sassFileUiPath, '')
                .replace(/^\//g, '')
                .replace(/\//g, ".")
                .replace(/\.scss$/g, '');
        }

        if (!script) {
            script = new SassFile({
                path: path,
                builder: this,
                originalSource: origSource,
                importer: importer,
                isSaveFile: isSaveFile,
                isUiFile: isUiFile,
                jsClassName: className
            });
            scripts[path] = script;
        }
        return script;
    }

    getFsMap() {
        var map = this.fsMap,
            scripts = this.scripts,
            keys = Object.keys(scripts),
            len = keys.length,
            key, k, path, parts, p, plen, part, level, next;

        if (!map) {
            map = {
                files: {},
                root: true
            };
            this.fsMap = map;
        }

        for (k = 0; k < len; k++) {
            key = keys[k];
            path = key.replace(/\\/g, '/');
            parts = path.split('/');
            plen = parts.length;
            level = map;
            for (p = 0; p < plen - 1; p++) {
                part = parts[p];
                next = level.files[part];
                if (!next) {
                    next = {
                        fullName: level.fullName ? [level.fullName, part].join('/') : part,
                        files: {},
                        isDir: true
                    };
                    level.files[part] = next;
                }
                level = next;
            }
            part = parts[plen - 1];
            next = level.files[part];
            if (!next) {
                next = {
                    fullName: level.fullName ? [level.fullName, part].join('/') : part,
                    key: key,
                    isFile: true,
                    sassFile: scripts[key]
                };
                level.files[part] = next;
            }
            level.hasFile = true;
        }

        return map;
    }

    getSassFilePath(path, relPath) {
        if (relPath) {
            path = this.getPath(path, relPath);
        }

        path = path.replace(/\\/g, "/");
        path = this.resolveUrl(path);
        return path;
    }

    getParser() {
        return new Parser();
    }

    getPath(baseFile, relPath) {
        if (relPath) {
            var separatorIndex = relPath.indexOf('/'),
                libraryPaths = this.context.libraries,
                root, libpath;

            if (separatorIndex !== 0) { // not an absolute path
                if (separatorIndex === -1) {
                    // no path separator found e.g. "@import 'compass';"
                    root = relPath;
                } else {
                    // path separator found e.g. "@import 'compass/css3"
                    root = relPath.substring(0,
                        separatorIndex !== -1
                            ? separatorIndex
                            : relPath.length);
                }

                libpath = libraryPaths[root];

                if (libpath) {
                    return this.calcPath(libpath, relPath);
                }
            }
        }

        return this.calcPath(baseFile, relPath);
    }

    calcPath(baseFile, relPath) {
        var sep = baseFile.lastIndexOf("/"),
            path;

        if (sep > -1) {
            path = baseFile.substring(0, sep + 1) + relPath;
        } else {
            path = baseFile + "/" + relPath;
        }

        if (path.indexOf(".scss") === -1 && path.indexOf(".js") === -1) {
            path = path + ".scss";
        }

        return path;
    }

    getResolverEl() {
        if (!this.resolverEl) {
            this.resolverEl = document.createElement("a");
        }
        return this.resolverEl;
    }

    getCanonicalPath(path) {
        var parts = path.split('/'),
            out = [],
            part, p;
        for (p = 0; p < parts.length; p++) {
            part = parts[p];
            if (part == '.') {
                continue;
            } else if (part == '..') {
                if (out.length === 0) {
                    Fashion.raise("bad path for getCanonicalPath : " + path);
                }
                out.pop();
            } else {
                out.push(part);
            }
        }
        return out.join('/');
    }

    resolveUrl(path) {
        // firefox won't automatically convert \ chars to / chars
        // so need to do that here
        path = path.replace(/\\/g, "/");

        if (Env.isBrowser) {
            var resolverEl = this.getResolverEl();
            resolverEl.href = path;
            return resolverEl.href;
        } else {
            path = this.getCanonicalPath(path);
        }
        return path;
    }

    createStyleEl(href, content, before) {
        var head = document.getElementsByTagName('head')[0],
            base = document.createElement('base'),
            styleEl, ieMode;

        Fashion.log("Using base href : " + href);
        base.href = href;

        if (head.firstChild) {
            head.insertBefore(base, head.firstChild);
        } else {
            head.appendChild(base);
        }

        // IE hack to force re-processing of the href
        base.href = base.href;

        styleEl = document.createElement("style");
        styleEl.type = 'text/css';

        ieMode = ('styleSheet' in styleEl);

        if (ieMode) {
            if (before) {
                head.insertBefore(styleEl, before);
            } else {
                head.appendChild(styleEl);
            }
            styleEl.styleSheet.cssText = content;
        } else {
            styleEl.textContent = content;
            if (before) {
                head.insertBefore(styleEl, before);
            } else {
                head.appendChild(styleEl);
            }
        }
        head.removeChild(base);
        return styleEl
    }

    injectCss(cssPath, cssContent) {
        this.lastCssPath = cssPath;

        if (!Array.isArray(cssContent)) {
            cssContent = [cssContent];
        }

        cssPath = this.resolveUrl(cssPath);

        var me = this,
            currEls = me.styleEls || [],
            href = cssPath.substring(0, cssPath.lastIndexOf("/") + 1);

        me.styleEls = [];

        cssContent.forEach((content, idx) => {
            content += "\n/*# sourceURL=" + cssPath + "_" + idx + " */";
            var before = (currEls.length && currEls[0]) || null,
                styleEl = this.createStyleEl(href, content, before);
            me.styleEls.push(styleEl);
        });

        var head = document.getElementsByTagName('head')[0];

        currEls.forEach((el) => {
            head.removeChild(el);
        });

    }
}

Fashion.apply(Builder.prototype, {
    context: undefined,
    varSavePath: undefined,
    srcSavePath: undefined,
    sassNamespace: undefined
});

module.exports = Builder;
},{"./Context.js":7,"./Env.js":9,"./Preprocessor.js":13,"./SassFile.js":16,"./Transpiler.js":17,"./export/Base.js":19,"./parse/Parser.js":55,"./parse/Scanner.js":56}],5:[function(require,module,exports){
"use strict";

var Fashion = require('./export/Base.js'),
    Base = Fashion.Base;

var SourceBuilder = require('./type/SourceBuilder.js');
var CssPostprocessor = require('./CssPostprocessor.js');
var ExtendProcessor = require('./ExtendProcessor.js');
var PlaceholderProcessor = require('./PlaceholderProcessor.js');
var Ready = require('./Ready.js');

var Output = require('./export/Output.js');
var CompressedOutput = require('./CompressedOutput.js');

class CSS extends Base {
    constructor(config) {
        super(config);
        Fashion.apply(this, {
            css: [],
            extenders: [],
            outputs: []
        });
    }

    reset() {
        this.css = [];
    }

    resetOutputs() {
        this.outputs = [];
        this.output = null;
    }

    addRuleset(ruleset) {
        this.css.push(ruleset);
    }

    createOutput(compressed, indent, skipComments, split) {
        var output = compressed
            ? new CompressedOutput()
            : new Output();

        if (indent) {
            output.indentstr = indent;
        }

        if (!compressed && skipComments) {
            output.addComment = function (text) {
            };
            output.addCommentLn = function (text) {
                this.addln();
            }
        }

        if (split) {
            output.splitThreshold = split;
        }
        this.output = output;
        this.outputs.push(output);
        return output;
    }

    getOutputs() {
        var out = [];
        this.outputs.forEach((output) => {
            out.push(output.get().trim());
        });
        return out;
    }

    getText(callBack, compressed, indent, skipComments, split) {
        this.resetOutputs();
        var css = this.css,
            sourceBuilder = new SourceBuilder(),
            proc, extendProc, placeholderProc;

        proc = new CssPostprocessor({
            context: this.context
        });
        css = proc.process(css);

        extendProc = new ExtendProcessor();
        extendProc.context = this.context;
        extendProc.extendRulesets(css, this.extenders);

        placeholderProc = new PlaceholderProcessor();
        css = placeholderProc.processRulesets(css);

        // TODO: loop over all registered Type post-processors and allow
        // user defined transformations before css content generation


        // finally, hoist certain @-directives to the front.

        var hostDirectives = {
            '@charset': true,
            '@import': true
        };

        css.forEach((r, i) => r.index = i);

        css.sort((r1, r2) => {
            var d1 = !!hostDirectives[r1.atDirectiveName],
                d2 = !!hostDirectives[r2.atDirectiveName];

            if (d1 && !d2) {
                return -1;
            }

            if (d2 && !d1) {
                return 1;
            }

            if (d1 && d2) {
                if (r1.atDirectiveName != r2.atDirectiveName) {
                    if (r1.atDirectiveName === '@charset') {
                        return -1;
                    } else {
                        return 1;
                    }
                }
            }

            return r1.index - r2.index;
        });

        var me = this,
            processors = this.processors || [];

        function postProcess() {
            var proc = processors.shift(),
                ready;
            if (proc) {
                ready = new Ready();
                me.ready = ready;
                proc.execute(css, me);
                ready.onReady(function () {
                    postProcess();
                });
            } else {
                var output = me.createOutput(compressed, indent, skipComments, split);

                for (var c = 0; c < css.length; c++) {
                    var count = sourceBuilder.selectorCount,
                        len = output.output.length,
                        prevOutput = output.output,
                        newCount, newOutput;

                    sourceBuilder.toSource(css[c], output);
                    newCount = sourceBuilder.selectorCount;

                    if ((split > -1) && (newCount > split)) {
                        newOutput = me.createOutput(compressed, indent, skipComments, split);
                        newOutput.output = output.output.substring(len);
                        output.output = prevOutput;
                        sourceBuilder.selectorCount = newCount - count;
                        output = newOutput;
                    }
                }
                callBack(me.getOutputs(), me.exportFn);
            }
        }

        postProcess();
    }

    getJSON() {
        var ans = {};
        return ans;
    }
}

Fashion.apply(CSS.prototype, {
    css: undefined,
    extenders: undefined,
    outputs: undefined,
    output: undefined,
    processors: undefined,
    context: undefined,
    exportJs: undefined
});

module.exports = CSS;
},{"./CompressedOutput.js":6,"./CssPostprocessor.js":8,"./ExtendProcessor.js":10,"./PlaceholderProcessor.js":12,"./Ready.js":14,"./export/Base.js":19,"./export/Output.js":20,"./type/SourceBuilder.js":67}],6:[function(require,module,exports){
/*
 * Copyright (c) 2012-2016. Sencha Inc.
 */

'use strict';

var Fashion = require('./export/Base.js'),
    Output = require('./export/Output.js');

class CompressedOutput extends Output {

    constructor() {
        super();
    }

    space() {
    }

    addComment(text) {
    }

    indent() {
    }

    unindent() {
    }

    addln(ln) {
        super.add(ln || '');
    }

    addCommentLn(ln) {
    }

    indentln(ln) {
        this.addln(ln);
    }

    unindentln(ln) {
        this.addln(ln);
    }
}

Fashion.apply(CompressedOutput.prototype, {
    isCompressed: true
});

module.exports = CompressedOutput;
},{"./export/Base.js":19,"./export/Output.js":20}],7:[function(require,module,exports){
"use strict";

var Fashion = require('./export/Base.js'),
    Base = Fashion.Base;

var Runtime = require('./Runtime.js');
var Preprocessor = require('./Preprocessor.js');
var Transpiler = require('./Transpiler.js');
var Parser = require('./parse/Parser.js');
var Scanner = require('./parse/Scanner.js');

class Context extends Base {

    constructor(config) {
        super(config);
        this._fnMap = {};

        this.runtime = this.runtime || new Runtime({
                context: this
            });
        this.preprocessor = this.preprocessor || new Preprocessor({
                runtime: this.runtime
            });
        this.transpiler = this.transpiler || new Transpiler({
                preprocessor: this.preprocessor,
                symbols: config && config.symbols 
            });
    }

    convert(ast, file) {
        var node, parser, jsCode;

        var transpiler = this.transpiler;
        if (typeof ast === 'string') {
            parser = new Parser();
            node = parser.parse(ast, file);
        } else {
            node = ast;
        }

        this.preprocessor.preprocess(node);
        jsCode = this.transpiler.transpile(node);

        this.runtime.setCaches(this.transpiler);
        this.lastVariables = transpiler.variables;

        return jsCode;
    }

    getVariables() {
        return this.lastVariables;
    }

    compile(jsCode) {
        var me = this,
            fn = this.runtime.compile(jsCode);
        return me.func = function(rt, overrides, dyn) {
            return fn(rt || me.runtime, overrides, dyn || me.dynamicsMap || me.preprocessor.getDynamicsMap());
        };
    }

    getFunc() {
        return this.func;
    }

    run(code) {
        return this.runtime.run(code);
    }

    parseSelectors(selector) {
        var fn = this._fnMap[selector],
            runtime = this.runtime;

        if (!fn) {
            var parser = new Parser(),
                transpiler = new Transpiler(),
                ast, jsCode, parsedSelectors;

            parser.scanner = new Scanner(selector);
            parser.style = parser.scanner.style;
            ast = parser.parseSelectors();
            jsCode = transpiler.transpile(ast, true);
            jsCode = "return " + jsCode + ";";
            fn = runtime.createWrappedFn(jsCode);
            this._fnMap[selector] = fn;
        }

        parsedSelectors = runtime.callWrappedFn(fn, {});
        return parsedSelectors;
    }

    getConfig(name) {
        return this[name];
    }

    setConfig(name, value) {
        if (typeof name === 'string') {
            var prev = this[name];
            this[name] = value;
            return prev;
        }
        Fashion.apply(this, name);
        return null;
    }
}

Fashion.apply(Context.prototype, {
    runtime: undefined,
    _fn: undefined,
    preprocessor: undefined,
    transpiler: undefined,
    func: undefined
});

module.exports = Context;

},{"./Preprocessor.js":13,"./Runtime.js":15,"./Transpiler.js":17,"./export/Base.js":19,"./parse/Parser.js":55,"./parse/Scanner.js":56}],8:[function(require,module,exports){
(function (process){
"use strict";

var Fashion = require('./export/Base.js');
var TypeVisitor = require('./type/TypeVisitor.js');
var Declaration = require('./type/Declaration.js');
var Ruleset = require('./type/Ruleset.js');
var SelectorList = require('./type/selectors/SelectorList.js');
var MultiPartSelector = require('./type/selectors/MultiPartSelector.js');

var Types = require('./type/Types.js'),
    Literal = Types.Literal;


class CssPostprocessor extends TypeVisitor {
    constructor(cfg) {
        super(cfg);
    }

    selector(obj) {
        if (obj.selectorType === 'parent') {
            if (this.currentParentSelector) {
                obj.visitTarget = this.currentParentSelector;
                this.parentUsed = true;
            }
            else if (this.strictParentRef) {
                Fashion.raise("Base-level rules cannot contain the parent-selector-referencing character '&'.");
            }
        }
    }

    literal(obj) {
        if (obj.value === '&') {
            if (this.currentParentSelector) {
                obj.visitTarget = this.currentParentSelector;
            }
            else if (this.strictParentRef) {
                Fashion.raise("Base-level rules cannot contain the parent-selector-referencing character '&'.");
            }
        }
    }

    getSelectorArray(selectors, applyInterpolations) {

        if (selectors instanceof SelectorList) {
            if (applyInterpolations) {
                selectors.applyInterpolations();
            }
            selectors = selectors.items;
        } else {
            var str = selectors.toString();
            if (str.indexOf(',') > -1 && applyInterpolations) {
                return this.getSelectorArray(this.context.parseSelectors(str));
            }
            selectors = [selectors];
        }
        return selectors;
    }

    combineSelectors(parent, child) {
        var parentSelectors = this.getSelectorArray(parent.selectors),
            childSelectors = this.getSelectorArray(child.selectors),
            expandedSelectors = [],
            plen = parentSelectors.length,
            clen = childSelectors.length,
            p, c, parentSelector, childSelector;

        for (p = 0; p < plen; p++) {
            parentSelector = parentSelectors[p];
            this.currentParentSelector = parentSelector;

            for (c = 0; c < clen; c++) {
                childSelector = childSelectors[c].clone();
                this.parentUsed = false;
                this.visit(childSelector);
                if (!this.parentUsed) {
                    childSelector = new MultiPartSelector([parentSelector, childSelector]);
                }
                expandedSelectors.push(childSelector);
            }
        }

        this.currentParentSelector = null;

        if (expandedSelectors.length == 1) {
            expandedSelectors = expandedSelectors[0]
        } else {
            expandedSelectors = new SelectorList(expandedSelectors);
        }

        child.selectors = expandedSelectors;
    }

    combineMediaSelectors(parent, child) {
        var expanded = [],
            selectors = this.getSelectorArray(parent.selectors),
            items = this.getSelectorArray(child.selectors),
            parentSelector, nestedSelector;

        for (var s = 0; s < selectors.length; s++) {
            parentSelector = selectors[s];

            for (var n = 0; n < items.length; n++) {
                nestedSelector = items[n];

                if (n === 0) {
                    // remove the @media portion
                    nestedSelector.items = nestedSelector.items.slice(1);
                }

                this.currentParentSelector = parentSelector;
                this.parentUsed = false;
                this.visit(nestedSelector);
                this.parentUsed = false;

                var newSelector = new MultiPartSelector([
                    parentSelector,
                    new Literal('and'),
                    nestedSelector
                ]);

                newSelector.skipParentPrepend = child.isAtRoot();
                expanded.push(newSelector);
            }
        }

        if (expanded.length === 1) {
            expanded = expanded[0];
        } else {
            expanded = new SelectorList(expanded);
        }

        child.selectors = expanded;
    }

    declaration(obj) {
        var declWas = this.currDeclaration;
        this.currDeclaration = obj;
        obj.descend(this);
        this.currDeclaration = declWas;
    }

    ruleset(obj) {

        var prevMedia = this.prevMedia,
            prevAtRoot = this.prevAtRoot,
            prevAtRule = this.prevAtRule,
            prevPlain = this.prevPlain,
            atRoot = false,
            declaration = this.currDeclaration,
            parent, ns, d, decl, idx;


        if (obj.isNamespaced) {
            // first, process any nested namespaced rulesets
            this.visit(obj.declarations);

            if (declaration) {
                ns = declaration.property;
                parent = declaration.ruleset;
                idx = parent.getDeclarationIndex(declaration);

                if (idx === -1) {
                    idx = parent.declarations.length;
                }

                for (d = 0; d < obj.declarations.length; d++) {
                    decl = obj.declarations[d];
                    parent.addDeclaration(new Declaration({
                        property: ns + '-' + decl.property,
                        value: decl.value,
                        docs: decl.docs,
                        sourceInfo: decl.sourceInfo,
                        important: decl.important
                    }), d + idx);
                }
                // prevent this obj from generating css output
                obj.visitTarget = null;

                // if this is the immediate child of the declaration
                // then skip that as well during css gen
                if (obj.parentNode === declaration) {
                    parent.removeDeclaration(declaration);
                }
            }
            return false;
        }

        obj.selectors = this.getSelectorArray(obj.selectors, true);
        if (obj.selectors.length === 1) {
            obj.selectors = obj.selectors[0];
        } else {
            obj.selectors = new SelectorList(obj.selectors);
        }

        if (obj.isAtRule()) {
            this.prevAtRule = obj;

            if (prevPlain && obj.declarations.length) {
                var newRuleset = new Ruleset({
                    parent: obj,
                    declarations: obj.declarations,
                    selectors: prevPlain.selectors,
                    isMediaRoot: true
                });
                newRuleset.declarations.forEach((d) => d.ruleset = newRuleset);
                obj.declarations = [];
                obj.children.unshift(newRuleset);
            }

            if (!prevAtRule) {
                atRoot = true;
            }
        }

        if (obj.isMedia()) {
            if (prevMedia) {
                this.combineMediaSelectors(prevMedia, obj);
            }
            this.prevMedia = obj;
            atRoot = true;
        }
        else if (obj.isAtRoot()) {
            atRoot = true;
        }
        else if (!obj.isAtRule()) {
            if (prevPlain && !obj.isMediaRoot) {
                this.combineSelectors(prevPlain, obj);
            }
            this.prevPlain = obj;
            if (!prevAtRule) {
                atRoot = true;
            }
        }

        if (atRoot) {
            if (obj.parent) {
                obj.parent.removeChildRuleset(obj);
            }

            // we may want to exlude the ruleset from printing
            if (obj.isAtRule() || obj.declarations.length || obj.isAtDirective) {
                this.rootCss.push(obj);
            }
        }

        obj.descend(this);

        this.prevMedia = prevMedia;
        this.prevAtRoot = prevAtRoot;
        this.prevPlain = prevPlain;
        this.prevAtRule = prevAtRule;
        return false;
    }

    visitItem(obj) {
        var currParent = this.currParent;
        obj.parentNode = currParent;
        this.currParent = obj;
        super.visitItem(obj);
        this.currParent = currParent;
    }

    process(obj) {
        this.rootCss = [];
        this.visit(obj);
        return this.rootCss;
    }
}

Fashion.apply(CssPostprocessor.prototype, {
    currentParentSelector: null,
    parentUsed: null,
    rootCss: null,
    context: null,
    prevMedia: null,
    prevAtRule: null,
    prevAtRoot: null,
    prevPlain: null,
    currDeclaration: null,
    currParent: null,
    strictParentRef: false
});

module.exports = CssPostprocessor;
}).call(this,require('_process'))
},{"./export/Base.js":19,"./type/Declaration.js":65,"./type/Ruleset.js":66,"./type/TypeVisitor.js":68,"./type/Types.js":69,"./type/selectors/MultiPartSelector.js":73,"./type/selectors/SelectorList.js":74,"_process":3}],9:[function(require,module,exports){
(function (global){
/*
 * Copyright (c) 2012-2016. Sencha Inc.
 */

"use strict";

var Fashion = require('./export/Base.js');

var isNode = (function () {
    try {
        return Object.prototype.toString.call(global.process) === '[object process]';
    } catch (e) {
        return false;
    }
})();

var isPhantom = typeof phantom !== 'undefined';
var isRhino = typeof importPackage !== 'undefined';

var isBrowser = !(isNode || isRhino || isPhantom);

var canSetPrototype = (function () {
    var a = {x: 42},
        b = {};

    try {
        b.__proto__ = a;
    } catch (e) {
        // oh well...
    }

    return b.x === 42;
})();


var fs;

if (isNode || isPhantom) {
    fs = require('fs');
}

class Env {
    constructor() {
        Fashion.apply(this, {
            isNode: isNode,
            isPhantom: isPhantom,
            isRhino: isRhino,
            isBrowser: isBrowser,
            canSetPrototype: canSetPrototype,
            fs: fs
        });
    }


    exists(path) {
        var fs = this.fs;
        try {
            if (this.isRhino && !this.isPhantom) {
                return new java.io.File(path).exists();
            }
            if (this.isPhantom) {
                return fs.exists(path);
            }
            this.readFile(path);
            return true;
        } catch (e) {
            return false;
        }
    }

    join(dir, subpath) {
        return dir + "/" + subpath;
    }

    readFileRhino(file) {
        Fashion.raise("function 'Fashion.Env.readFileRhino' has no default implementation");
    }

    readFile(file) {
        if (this.isRhino) {
            return this.readFileRhino(file);
        }
        if (this.isNode) {
            return this.fs.readFileSync(file);
        }

        return this.doRequest({
            url: file,
            async: false,
            method: 'GET'
        });
    }

    loadFileRhino(file, success, error) {
        Fashion.raise("function 'Fashion.Env.readFileRhino' has no default implementation");
    }

    loadFile(file, success, error, options, retries) {
        if (this.isBrowser) {
            retries = retries || 0;
            this.doRequest(Fashion.merge({
                url: file,
                async: true,
                params: {
                    _dc: new Date().getTime()
                },
                onComplete: function (options, xhr) {
                    if (success) {
                        success(xhr.responseText, xhr);
                    }
                },
                onError: function () {
                    if (retries < 3) {
                        this.loadFile(file, success, error, options, retries + 1);
                    }
                    else {
                        error && error.apply(error, arguments);
                    }
                }
            }, options));
        } else if (this.isNode) {
            this.fs.readFile(file, 'utf-8', function (err, data) {
                if (err) {
                    if (error) {
                        error(err);
                    }
                } else {
                    if (data.charCodeAt(0) === 0xFEFF || data.charCodeAt(0) === 0xFFFE) {
                        data = data.substr(1);
                    }
                    success(data);
                }
            });
        } else if (this.isRhino) {
            this.loadFileRhino(file, success, error);
        }
    }

    doRequest(options) {
        var url = options.url,
            method = options.method || 'GET',
            data = options.data || null,
            async = options.async !== false,
            onComplete = options.onComplete,
            onError = options.onError,
            scope = options.scope || this,
            params = options.params,
            queryParams = [],
            arrayBufferSupported = false,
            queryParamStr, xhr, content, sep;

        if (params) {
            for (var name in params) {
                queryParams.push(name + "=" + params[name]);
            }

            queryParamStr = queryParams.join('&');

            if (queryParamStr !== '') {
                sep = url.indexOf('?') > -1 ? '&' : '?';
                url = url + sep + queryParamStr;
            }
        }

        if (typeof XMLHttpRequest !== 'undefined') {
            xhr = new XMLHttpRequest();
            arrayBufferSupported = typeof xhr.responseType === 'string';
        } else {
            xhr = new ActiveXObject('Microsoft.XMLHTTP');
        }

        //console.log("requesting url : " + url);

        xhr.open(method, url, async);
        if (async) {
            xhr.timeout = 5 * 1000;
        }

        if (options.binary) {
            if (arrayBufferSupported) {
                xhr.responseType = 'arraybuffer';
                xhr.getBinaryData = function () {
                    return new Uint8Array(this.response);
                };
            } else {
                xhr.overrideMimeType("text/plain; charset=x-user-defined");
                xhr.getBinaryData = function () {
                    return this.responseText;
                };
            }
        }

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                try {
                    if (xhr.status === 200) {
                        if (onComplete) {
                            onComplete.call(scope, options, xhr);
                        }
                    } else {
                        if (onError) {
                            onError.call(scope, options, xhr);
                        }
                    }
                } catch (err) {
                    Fashion.error((err.stack || err) + '');
                    if (onError) {
                        onError.call(scope, options, xhr, err);
                    }
                } finally {
                    //advanceRequestQueue();
                }
            }
        };

        xhr.onerror = onError;

        if (typeof data === "function") {
            data = data();
        }

        if (typeof data !== 'string') {
            data = JSON.stringify(data);
        }

        xhr.send(data);

        if (!async) {
            content = xhr.responseText;
            return content;
        }
    }
};

module.exports = new Env();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./export/Base.js":19,"fs":2}],10:[function(require,module,exports){
"use strict";

var Fashion = require('./export/Base.js');
var TypeVisitor = require('./type/TypeVisitor.js');

var SelectorList = require('./type/selectors/SelectorList.js');
var MultiPartSelector = require('./type/selectors/MultiPartSelector.js');
var CompoundSelector = require('./type/selectors/CompoundSelector.js');

var SourceBuilder = require('./type/SourceBuilder.js');

function pushApply (array, items) {
    for (var i = 0; i < items.length; i++) {
        var item = items[i];
        if (!!item) {
            array.push(item);
        }
    }
}

function joinArrays () {
    var arrays = arguments,
        out = [];
    for (var i = 0; i < arrays.length; i++) {
        var array = arrays[i];
        if (Array.isArray(array)) {
            pushApply(out, arrays[i]);
        }
        else if (!!array) {
            out.push(array);
        }
    }
    return out;
}

class ExtendProcessor extends TypeVisitor {
    constructor(cfg) {
        super(cfg);
    }

    mergeCompoundSelector(match, extendSelector, matchKeys, targetKeys) {
        var origCompoundSelector = this.currCompoundSelector, 
            compoundSelector = origCompoundSelector,
            multiPartSelector = this.currMultiPartSelector,
            items = [],
            newCompoundSelector, matchIndex;

        for (var i = 0; i < compoundSelector.items.length; i++) {
            var item = compoundSelector.items[i];
            while (item && item.visitTarget) {
                item = item.visitTarget;
            }
            if(item && item.$isFashionBaseSelectorList) {
                compoundSelector = this.context.parseSelectors(SourceBuilder.toSource(compoundSelector));
                multiPartSelector = null;
            }
        }
        
        
        // first, remove the matched component,
        for (var i = 0; i < compoundSelector.items.length; i++) {
            var item = compoundSelector.items[i];
            var hash = item.getHash();
            if (targetKeys) {
                if (!targetKeys.hasOwnProperty(hash)) {
                    items.push(item);
                } else {
                    matchIndex = i;
                    items.push(null);
                }
            }
            else {
                if (hash != match.getHash()) {
                    items.push(item);
                } else {
                    matchIndex = i;
                    items.push(null);
                }
            }
        }


        // then, if the extending selector is multi part,
        // merge this with the last component of that selector,
        if (extendSelector instanceof MultiPartSelector) {
            var newSelector = extendSelector.clone(),
                last = newSelector.last();
            if (last instanceof CompoundSelector) {
                last.setItems(joinArrays(items, last.items));
            }
            // we may have reprocessed the compound selector into being a multi part
            // selector, due to expansion of a visitTarget override added by a parent
            // selector reference (& selector operator)
            else if (compoundSelector.$isFashionMultiPartSelector) {
                last = new MultiPartSelector(joinArrays([last], items));
                newSelector.items[newSelector.items.length - 1] = last;
            } 
            else {
                last = new CompoundSelector(joinArrays([last], items));
                newSelector.items[newSelector.items.length - 1] = last;
            }
            newCompoundSelector = newSelector;
        }
        else if (extendSelector instanceof CompoundSelector) {
            items.splice.apply(items, [matchIndex, 1].concat(extendSelector.items));
        } else {
            items[matchIndex] = extendSelector;
        }

        newCompoundSelector = newCompoundSelector || new CompoundSelector(items);

        if (multiPartSelector) {
            var newItems = [];
            for (var i = 0; i < multiPartSelector.items.length; i++) {
                var item = multiPartSelector.items[i];
                if (item === origCompoundSelector) {
                    newItems.push(newCompoundSelector);
                } else {
                    newItems.push(item);
                }
            }
            this.newSelectors.push(new MultiPartSelector(newItems));
        } else {
            this.newSelectors.push(newCompoundSelector);
        }
    }


    mergeMultiPartSelector(match, extendSelector) {
        var multiPartSelector = this.currMultiPartSelector,
            items = multiPartSelector.items,
            len = items.length, i, item,
            before, after;

        for (i = 0; i < len; i++) {
            item = items[i];
            if (item.getHash() === match.getHash()) {
                before = items.slice(0, i);
                after = items.slice(i + 1);

                // if we're trying to insert a new multi-part selector,
                // we need to weave the prefix elements together
                if (extendSelector instanceof MultiPartSelector) {
                    var mpExtendSelector = extendSelector,
                        extendItems = mpExtendSelector.items,
                        elen = extendItems.length,
                        first = extendItems.slice(0, elen - 1),
                        last = extendItems.slice(elen - 1);

                    // weave the two sets of items together

                    this.newSelectors.push(new MultiPartSelector(
                        joinArrays(before, first, last, after)
                    ));

                    this.newSelectors.push(new MultiPartSelector(
                        joinArrays(first, before, last, after)
                    ));

                }
                else {
                    this.newSelectors.push(new MultiPartSelector(
                        joinArrays(before, extendSelector, after)
                    ));
                }
            }
        }
    }

    checkSelectorPart(obj) {
        if (obj.getHash() === this.currTargetHash) {
            if (this.currCompoundSelector) {
                for (var e = 0; e < this.extendSelectors.length; e++) {
                    var extendSelector = this.extendSelectors[e];
                    this.mergeCompoundSelector(obj, extendSelector);
                }
            }
            else if (this.currMultiPartSelector) {
                // need to weave together the current multi-part selector
                // with the various extending selectors;

                for (var e = 0; e < this.extendSelectors.length; e++) {
                    var extendSelector = this.extendSelectors[e];
                    this.mergeMultiPartSelector(obj, extendSelector);
                }
            }
            else {
                this.appendAllExtendSelectors();
            }
        }
    }

    appendAllExtendSelectors() {
        this.newSelectors.push.apply(this.newSelectors, this.extendSelectors);
    }

    getCompoundSelectorMap(compoundSelector) {
        var map = {},
            item;
        for (var i = 0; i < compoundSelector.items.length; i++) {
            item = compoundSelector.items[i];
            map[item.getHash()] = true;
        }
        return map;
    }

//--------------------------------------------------
// visitor methods

    literal(obj) {
        this.checkSelectorPart(obj);
    }

    selector(obj) {
        this.checkSelectorPart(obj);
    }

    compoundselector(obj) {
        var resetCompoundSelector = this.currCompoundSelector;
        this.currCompoundSelector = obj;
        if (obj.getHash() === this.currTargetHash) {
            this.appendAllExtendSelectors();
        }
        else if (this.currTarget instanceof CompoundSelector) {
            // need to check for a subset match

            var objMap = this.getCompoundSelectorMap(obj),
                targetMap = this.getCompoundSelectorMap(this.currTarget),
                objKeys = Object.keys(objMap),
                targetKeys = Object.keys(targetMap),
                subset = true,
                targetKey;

            for (var t = 0; t < targetKeys.length; t++) {
                targetKey = targetKeys[t];
                if (!objKeys.hasOwnProperty(targetKey)) {
                    subset = false;
                    break;
                }
            }
            if (subset) {
                for (var e = 0; e < this.extendSelectors.length; e++) {
                    var extendSelector = this.extendSelectors[e];
                    this.mergeCompoundSelector(obj, extendSelector, objKeys, targetKeys);
                }
            }
        }
        else {
            obj.descend(this);
        }
        this.currCompoundSelector = resetCompoundSelector;
        return false;
    }

    multipartselector(obj) {
        var resetMultiPartSelector = this.currMultiPartSelector;
        this.currMultiPartSelector = obj;
        if (obj.getHash() === this.currTargetHash) {
            this.appendAllExtendSelectors();
        }
        else {
            obj.descend(this);
        }
        this.currMultiPartSelector = resetMultiPartSelector;
        return false;
    }

//--------------------------------------------------

    extend(ruleset, targetSelector, extendSelectors) {
        var i, j, newSelector, hash;

        this.currTarget = targetSelector;
        this.currTargetHash = this.currTarget.getHash();
        this.newSelectors = [];
        this.extendSelectors = extendSelectors;

        if (ruleset.selectors) {
            if (ruleset.selectors.flatten) {
                ruleset.selectors.flatten();
            }
            this.visit(ruleset.selectors);
        }

        // now, add any newly created selectors to the ruleset
        if (this.newSelectors.length) {
            var selectors = ruleset.selectors,
                map = {};

            if (selectors instanceof SelectorList) {
                selectors = selectors.items;
            } else {
                selectors = [selectors];
            }

            for (i = 0; i < selectors.length; i++) {
                map[selectors[i].getHash()] = true;
            }

            for (i = 0; i < this.newSelectors.length; i++) {
                newSelector = this.newSelectors[i];
                hash = newSelector.getHash();
                if (!map.hasOwnProperty(hash)) {
                    selectors.push(newSelector);
                    map[hash] = true;
                }
            }

            for (i = 0; i < selectors.length; i++) {
                for (j = 0; j < selectors.length; j++) {
                    if (i != j && selectors[i] && selectors[j]) {
                        var comp = this.compareSelectors(selectors[i], selectors[j]);
                        if (comp !== 0) {
                            if (comp > 1) {
                                selectors[i] = null;
                            } else {
                                selectors[j] = null;
                            }
                        }
                    }
                }
            }


            var filteredSelectors = [];
            for (var i = 0; i < selectors.length; i++) {
                var selector = selectors[i];
                if (!!selector) {
                    filteredSelectors.push(selector);
                }
            }

            ruleset.selectors = new SelectorList(filteredSelectors);

        }

        for (var c = 0; c < ruleset.children.length; c++) {
            this.extend(ruleset.children[c], targetSelector, extendSelectors);
        }
    }

    /**
     * returns:
     *  1 == sel1 is subset of sel2
     * -1 == sel2 is subset of sel1
     *  0 == different
     */
    compareSelectors(sel1, sel2) {

        if (sel1 instanceof MultiPartSelector) {
            if (!(sel2 instanceof MultiPartSelector)) {
                sel2 = new MultiPartSelector([sel2]);
            }
            return this.isSuperSelector(sel1, sel2);
        } else if (sel2 instanceof MultiPartSelector) {
            sel1 = new MultiPartSelector([sel1]);
            return this.isSuperSelector(sel1, sel2);
        }

        if (sel1 instanceof CompoundSelector) {
            if (!(sel2 instanceof CompoundSelector)) {
                sel2 = new CompoundSelector([sel2]);
            }
            return this.isSubset(sel1, sel2);
        }
        else if (sel2 instanceof CompoundSelector) {
            sel1 = new CompoundSelector([sel1]);
            return this.isSubset(sel1, sel2);
        }

        var h1 = sel1.getHash(),
            h2 = sel2.getHash();

        if (h1 == h2) {
            return 1;
        }

        return 0;
    }


    /**
     * returns:
     *  1 == this isSuperSelector of other
     * -1 == other isSuperSelector of this
     *  0 == different
     */
    isSuperSelector(sel1, sel2) {
        var items = sel1.items,
            sItems = sel2.items,
            shortList = items,
            longList = sItems,
            res = 1,
            tmpRes;

        if (items.length > sItems.length) {
            shortList = sItems;
            longList = items;
            res = -1;
        }

        for (var i = 0; i < shortList.length; i++) {
            tmpRes = this.compareSelectors(shortList[i], longList[i]);
            var tmpRes;
            if (tmpRes === 0) {
                return 0;
            } else if (tmpRes !== res) {
                return 0;
            }
        }
        return res;
    }


    /**
     * returns:
     *  1 == this is subset of other
     * -1 == other is subset of this
     *  0 == different
     */
    isSubset(sel1, sel2) {
        var items = sel1.items,
            sItems = sel2.items,
            longItemMap = {},
            shortList = items,
            longList = sItems,
            item,
            res = 1;

        if (items.length > sItems.length) {
            shortList = sItems;
            longList = items;
            res = -1;
        }

        for (var i = 0; i < longList.length; i++) {
            item = longList[i];
            longItemMap[item.getHash()] = item;
        }

        for (var i = 0; i < shortList.length; i++) {
            item = shortList[i];
            if (!longItemMap[item.getHash()]) {
                return 0;
            }
        }

        return res;
    }

    extendRulesets(rulesets, extenders) {
        var i, j, k, e,
            iLen, jLen, kLen, eLen,
            extender, extend, ruleset,
            extendMap = {},
            extenderArray = [],
            keys, token, hash;

        iLen = extenders.length;
        kLen = rulesets.length;
        for (i = 0; i < iLen; i++) {
            extender = extenders[i];
            jLen = extender.extend.length;

            for (j = 0; j < jLen; j++) {
                extend = extender.extend[j];
                var extendSelectors = extender.selectors;
                if (extendSelectors instanceof SelectorList) {
                    extendSelectors.flatten();
                    extendSelectors = extendSelectors.items;
                } else {
                    if (extendSelectors.$isFashionMultiPartSelector || extendSelectors.$isFashionCompoundSelector) {
                        extendSelectors.flatten();
                    }
                    extendSelectors = [extendSelectors];
                }

                hash = extend.getHash();
                token = extendMap[hash];
                if (!token) {
                    token = {
                        selector: extend,
                        extenders: []
                    };
                    extendMap[hash] = token;
                    extenderArray.push(token);
                }
                token.extenders.push.apply(token.extenders, extendSelectors);
            }
        }

        eLen = extenderArray.length;
        for (k = 0; k < kLen; k++) {
            ruleset = rulesets[k];
            for (e = 0; e < eLen; e++) {
                token = extenderArray[e];
                this.extend(ruleset, token.selector, token.extenders);
            }
        }
    }
}

Fashion.apply(ExtendProcessor.prototype, {
    currTarget: null,
    currTargetHash: null,
    newSelectors: null,
    extendSelectors: null,
    currCompoundSelector: null,
    currMultiPartSelector: null
});

module.exports = ExtendProcessor;
},{"./export/Base.js":19,"./type/SourceBuilder.js":67,"./type/TypeVisitor.js":68,"./type/selectors/CompoundSelector.js":72,"./type/selectors/MultiPartSelector.js":73,"./type/selectors/SelectorList.js":74}],11:[function(require,module,exports){
"use strict";

function getJsName(name) {
    return name
        .replace(/\-/g, '_')
        .replace(/\//g, '_fs_')
        .replace(/\\/g, '_bs_');
}

class NameConverter {
    constructor() {
        this.variableNameMap = {};
    }

    convertName(name) {
        var map = this.variableNameMap,
            converted = map[name];

        if (converted === undefined) {
            converted = map[name] = getJsName(name);
        }
        return converted;
    }
}

var converter = new NameConverter();

module.exports = {
    NameConverter: NameConverter,
    getJsName: function (name) {
        return converter.convertName(name);
    }
};

},{}],12:[function(require,module,exports){
(function (process){
"use strict";

var Fashion = require('./export/Base.js');
var TypeVisitor = require('./type/TypeVisitor.js');

class PlaceholderProcessor extends TypeVisitor {
    constructor(cfg) {
        super(cfg);
    }

    literal(obj) {
        if (obj.getHash() === '%') {
            this.hasPlaceholder = true;
        }
    }

    selector(obj) {
        if (obj.selectorType === 'placeholder') {
            this.hasPlaceholder = true;
        }
    }

    selectorlist(obj) {
        var items = obj.items,
            len = items.length,
            i, item, newItems = [];

        for (i = 0; i < len; i++) {
            item = items[i];
            this.hasPlaceholder = false;
            this.visit(item);
            if (!this.hasPlaceholder) {
                newItems.push(item);
            }
        }
        obj.items = newItems;
        return false;
    }

    ruleset(obj) {
        this.hasPlaceholder = false;
        this.visit(obj.selectors);
        if (this.hasPlaceholder) {
            obj.selectors = null
        }
        this.visit(obj.children);
        return false;
    }

    process(css) {
        this.visit(css);
        if (!css.selectors || css.selectors.length === 0) {
            return;
        }
        this.outCss.push(css);
    }

    processRulesets(css) {
        this.outCss = [];
        for (var i = 0; i < css.length; i++) {
            this.process(css[i]);
        }
        return this.outCss;
    }
}

Fashion.apply(PlaceholderProcessor.prototype, {
    hasPlaceholder: false,
    outCss: null
});

module.exports = PlaceholderProcessor;
}).call(this,require('_process'))
},{"./export/Base.js":19,"./type/TypeVisitor.js":68,"_process":3}],13:[function(require,module,exports){
"use strict";

var Fashion = require('./export/Base.js'),
    Base = Fashion.Base;

var Visitor = require('./Visitor.js');

var regexes = {
    replaces: /^\s*?\/\/# fashion replaces\s+?(.*?)$/,
};

class SassVariableAttributes {
}

Fashion.apply(SassVariableAttributes.prototype, {
    global: false,
    "default": false,
    dynamic: false
});

class SassVariable extends Base {
    constructor(cfg) {
        super(cfg);
        this.references = this.references || [];
    }

    elevateDynamics(variables, elevator) {
        var me = this,
            dynamicWas = me.dynamic;

        me.dynamic = true;
        if (!dynamicWas) {
            if (this.enableElevationWarning) {
                Fashion.warn("Elevating variable '" + me.name + "' to dynamic", me.node);
                Fashion.warn("\tcaused by", elevator.node);
            }
            me.elevationCause = elevator;
            variables.push(me);
        }
        me.references.forEach((ref) => {
            var variable = me.map[ref];
            if (variable && !variable.dynamic) {
                variable.elevateDynamics(variables, me);
            }
        });
    }

    verify() {
        if (this.dynamic) {
            if (this.previous) {
                if (!this.previous.dynamic) {
                    Fashion.error([
                        'Cannot redefine ',
                        this.name,
                        ' as dynamic'
                    ].join(''));
                    Fashion.error('\tfrom ', this.previous.getNode());
                    Fashion.error('\t  at ', this.getNode());
                    this.preprocessor.errors += 1;
                    return false;
                }
            }
        }
        return true;
    }

    elevated() {
        return this.dynamic && !this.attributes.dynamic;
    }

    getNode() {
        var node = this.node;
        return node;
    }
}

Fashion.apply(SassVariable.prototype, {
    name: null,
    previous: null,
    node: null,
    dynamic: false,
    references: null,
    attributes: null,
    isGlobal: false,
    map: null,
    elevationCause: null,
    processed: false,
    preprocessor: null,
    enableElevationWarning: false,
    scope: undefined
});

class Preprocessor extends Visitor {
    constructor(cfg) {
        super(cfg);
        this.reset();
    }

    reset() {
        this.replacedVariable = null;
        this.variables = {};
        this.functions = [];
        this.currentVariable = null;
        this.functionDeclarations = {};
        this.mixinDeclarations = {};
        this.registeredDeclarations = null;
        this.replacesMap = {};
        this.currentScope = {
            variables: {},
            isGlobal: true
        };
    }

    handleFunc(node, collection) {
        var func = node.func || node.name,
            name = Fashion.getJsName(func.id || func.value),
            parameters = Preprocessor.getFunctionCallArgs(func);

        collection[name] = {
            parameters: parameters,
            ast: node,
            scope: this.currentScope
        };

        for (var i = 0; i < parameters.length; i++) {
            var param = parameters[i];
            name = Fashion.getJsName(param.name);
            this.currentScope.variables[name] = new SassVariable({
                name: name,
                node: param.arg,
                isGlobal: false,
                dynamic: false,
                map: this.currentScope.variables,
                preprocessor: this,
                enableElevationWarning: this.enableElevationWarning,
                scope: this.currentScope
            })
        }
    }

    Mixin(node) {
        var scopeWas = this.currentScope;
        this.currentScope = {
            prev: scopeWas,
            variables: {}
        };
        this.handleFunc(node, this.mixinDeclarations);
        node.descend(this);
        this.currentScope = scopeWas;
    }

    Function(node) {
        var isGlobal = this.nodeStack.length == 1;
        var scopeWas = this.currentScope;
        if (isGlobal) {
            this.functions.push(node);
        }

        this.currentScope = {
            prev: scopeWas,
            variables: {}
        };
        this.handleFunc(node, this.functionDeclarations);
        node.descend(this);
        this.currentScope = scopeWas;
    }

    getVariable (name) {
        var scope = this.currentScope,
            variable;
        while (scope) {
            variable = scope.variables[name];
            if (variable) {
                break;
            }
            scope = scope.prev;
        }
        return variable;
    }

    Variable(node) {
        if (this.currentVariable) {
            var refName = Fashion.getJsName(node.name),
                variable = this.getVariable(refName);

            if (!variable || variable.scope.isGlobal) {
                this.currentVariable.references.push(refName);
            }
        }
    }

    FunctionCall (node) {
        if (this.currentVariable) {
            node.descend(this);
            var id = Fashion.getJsName(node.id),
                entry = this.functionDeclarations[id];
            if (entry) {
                // re-visit the function body for this node, as that call will
                // possibly contain references to other global variables
                var scopeWas = this.currentScope;
                this.currentScope = entry.scope;
                this.visit(entry.ast.statements);
                this.currentScope = scopeWas;
            }
        }
    }

    Comment(comment) {
        var replaces = regexes.replaces,
            match = replaces.exec(comment);

        if (comment === '//# fashion warn -elevation') {
            this.enableElevationWarning = false;
        }
        else if (comment === '//# fashion warn +elevation') {
            this.enableElevationWarning = true;
        }
        else if (match) {
            this.replacedVariable = match[1];
        }
    }

    VariableAssignment(node) {
        var replaces = this.replacedVariable,
            replacesEntry = this.replacesMap[Fashion.getJsName(node.name)],
            origName = node.name,
            nodeName = (replacesEntry && replacesEntry.name) || origName,
            name = Fashion.getJsName(nodeName),
            currVariable = this.variables[name],
            varWas = this.currentVariable,
            bangGlobal = !!node.global,
            bangDynamic = !!node.dynamic,
            bangDefault = !!node.default,
            isGlobalVar = this.nodeStack.length === 1,
            variable, value, funcName;

        if (replacesEntry) {
            Fashion.warn("Using new variable " + replacesEntry.name + " for deprecated variable " + node.name, node);
        }

        node.name = nodeName;
        value = node.value;

        if (value.type === 'FunctionCall') {
            funcName = value.id || value.value;
            if (funcName === 'dynamic') {
                bangDynamic = true;
                value.visitTarget = value.args;
                if (value.args.items && value.args.items.length === 1) {
                    value.visitTarget = value.args.items[0];
                }
            }
        }

        variable = new SassVariable({
            name: name,
            nodeName: origName,
            node: node,
            previous: currVariable,
            attributes: {
                global: bangGlobal,
                "default": bangDefault,
                dynamic: bangDynamic
            },
            isGlobal: isGlobalVar,
            dynamic: (currVariable && currVariable.dynamic) || bangDynamic,
            map: this.variables,
            preprocessor: this,
            enableElevationWarning: this.enableElevationWarning,
            scope: this.currentScope,
            replaces: replaces || (currVariable && currVariable.replaces)
        });

        if (variable.replaces) {
            var replacesName = Fashion.getJsName(variable.replaces);
            var current = this.replacesMap[replacesName];
            if (current && variable.name != current.name) {
                Fashion.warn("Variable " + current.name + " already replaces variable " + variable.replaces, node);
            }
            this.replacesMap[replacesName] = variable;
        }

        this.replacedVariable = null;
        this.currentScope.variables[name] = variable;

        if (isGlobalVar || bangGlobal) {
            if (!!node.dynamic) {
                Fashion.warn("Use of !dynamic has been deprecated", node);
                Fashion.warn("Use dynamic() function instead.");
            }
            variable.verify();
            this.variables[name] = variable;
        }
        else {
            node.descend(this);
            return false;
        }

        this.currentVariable = variable;
        node.descend(this);
        this.currentVariable = varWas;
    }

    getRuntime() {
        return this.runtime;
    }

    getRegisteredFunctions() {
        if (!this.registeredFunctions) {
            this.registeredFunctions =
                (this.runtime && this.runtime.getRegisteredFunctions()) || {};
        }
        return this.registeredFunctions;
    }

    loadRegisteredFunctionArgs() {
        if (!this.registeredDeclarations) {
            var registered = this.getRegisteredFunctions(),
                funcArgsRx = this.funcArgsRx,
                paramsMap = {},
                name, func, src, params, match, args, i, argName;

            for (name in registered) {
                func = registered[name];
                if (Fashion.isFunction(func)) {
                    src = func + '';
                    params = [];
                    match = funcArgsRx.exec(src);
                    if (match && match[2]) {
                        args = (match[2] && match[2].split(/,/g)) || [];
                        for (i = 0; i < args.length; i++) {
                            argName = args[i].trim();
                            params.push({
                                name: argName,
                                position: i
                            });
                        }
                    }
                    paramsMap[name] = params;
                }
            }
            this.registeredDeclarations = paramsMap;
        }
    }

    preprocess(node, skipRegistrations) {
        this.reset();
        this.visit(node);
        if (!skipRegistrations) {
            this.loadRegisteredFunctionArgs();
        }
        if (this.errors) {
            Fashion.raise([
                'Encountered ',
                this.errors,
                ' error(s) during preprocessing.'
            ].join(''));
        }
    }

    getVariables() {
        return this.variables;
    }

    generateCycleError(stack, variables) {
        var referenceTrace = [],
            r, trace;
        for (r = 0; r < stack.length; r++) {
            trace = [
                stack[r],
                " => ",
                variables[stack[r]].node.file,
                ":",
                variables[stack[r]].node.lineNumber
            ].join('');
            referenceTrace.push(trace);
        }
        var msg = [
            "Variable Cycle detected in variable : ",
            referenceTrace.join('\n')
        ].join('\n');
        Fashion.error(msg);
        Fashion.raise(msg);
    }

    topoSort(variable, variables, sorted, processed, stack) {
        processed = processed || {};
        sorted = sorted || [];
        stack = stack || [];

        var me = this,
            name = variable.name,
            refs, ref, r, refVariable;

        function processRef (ref) {
            var refVariable = variables[ref];
            if (refVariable) {
                if (refVariable.dynamic || me.sortAllVariables) {
                    me.topoSort(refVariable, variables, sorted, processed, stack);
                    return true;
                }
            }
            return false;
        }

        if (processed[name] !== true) {
            stack.push(name);

            if (processed[name] === 'processing') {
                this.generateCycleError(stack, variables);
            }

            processed[name] = 'processing';
            refs = variable.references;
            for (r = 0; r < refs.length; r++) {
                ref = refs[r];
                if (!processRef(ref)) {
                    if (this.replacesMap[ref]) {
                        var entry = this.replacesMap[ref],
                            ref = Fashion.getJsName(entry.name);
                        processRef(ref);
                    }
                }
            }

            sorted.push(variable);
            processed[name] = true;
            stack.pop();
        }
    }

    getDynamics() {
        var variables = this.sortAllVariables
                ? this.currentScope.variables
                : this.variables,
            variableNames = Object.keys(variables),
            dynamics = [],
            sorted = [],
            variable, name, dynamic, d, n;


        // push the dynamic flag to all variables referenced
        for (n = 0; n < variableNames.length; n++) {
            name = variableNames[n];
            variable = variables[name];
            if (variable.dynamic) {
                variable.elevateDynamics(dynamics);
                dynamics.push(variable);
            }
        }

        for (d = 0; d < dynamics.length; d++) {
            dynamic = dynamics[d];
            this.topoSort(dynamic, variables, sorted);
        }
        return sorted;
    }

    getDynamicsMap() {
        var dynamicVariables = this.getDynamics(),
            map = {},
            i, variable;

        for (i = 0; i < dynamicVariables.length; i++) {
            variable = dynamicVariables[i];
            map[variable.name] = variable;
        }
        return map;
    }

    getSortedDynamicAstNodes() {
        var sortedVariables = this.getDynamics(),
            sortedAst = [], i;

        for (i = 0; i < sortedVariables.length; i++) {
            sortedAst.push(sortedVariables[i].getNode());
        }
        return sortedAst;
    }

    loadPreprocessorCache(preprocessor) {
        this.functionDeclarations = preprocessor.functionDeclarations;
        this.mixinDeclarations = preprocessor.mixinDeclarations;
        this.registeredDeclarations = preprocessor.registeredDeclarations;
        this.registeredFunctions = preprocessor.registeredFunctions;
        this.currentScope = preprocessor.currentScope;
    }

    static loadArgsArray(args) {
        if (args && (args.type === 'SelectorList' || args.type === 'List')) {
            args = args.items;
        }
        if (!Array.isArray(args)) {
            args = [args];
        }
        return args;
    }

    static getFunctionCallArgs(func) {
        var args = this.loadArgsArray(func.args),
            parameters = [],
            arg, a, param;

        for (a = 0; a < args.length; a++) {
            arg = args[a];
            if (arg) {
                param = {
                    name: arg.variable || arg.name,
                    value: arg,
                    position: a,
                    varArgs: arg.varArgs
                };
                parameters.push(param);
                if (arg.variable) {
                    if (arg.token) {
                        var scanner = arg.token.scanner,
                            style = scanner && scanner.style,
                            start = arg.token.startIdx,
                            end = arg.token.idx;
                        param.default = style.substring(start, end).trim();
                    }
                    else if (arg.type == 'List') {
                        var first = arg.items[0],
                            last = arg.items[arg.items.length - 1],
                            startTok = first && first.token,
                            endTok = last && last.token;
                        if (startTok && endTok) {
                            var style = startTok.scanner.style,
                                start = startTok.startIdx,
                                end = endTok.idx;
                            param.default = style.substring(start, end).trim();
                        }
                    }
                }
            }
        }

        return parameters;
    }
}

Fashion.apply(Preprocessor.prototype, {
    functionDeclarations: null,
    mixinDeclarations: null,
    registeredDeclarations: null,
    registeredFunctions: null,
    runtime: null,
    currentVariable: null,
    functions: null,
    variables: null,
    errors: 0,
    enableElevationWarning: true,
    funcArgsRx: /function\s*?(.*?)\((.*?)\)\s*?\{/,
    sortAllVariables: false
});

module.exports = Preprocessor;
},{"./Visitor.js":18,"./export/Base.js":19}],14:[function(require,module,exports){
"use strict";

class Ready {

    constructor() {
        this.blocks = 0;
        this.listeners = [];
    }

    block() {
        this.blocks++;
    }

    unblock() {
        if (this.blocks && !--this.blocks) {
            this.fireReady();
        }
    }

    fireReady() {
        for (var i = 0; i < this.listeners.length; i++) {
            var listener = this.listeners[i];
            listener();
            this.listeners[i] = null;
        }
        this.listeners = Fashion.filter(this.listeners, (l) => !!l);
    }

    onReady(callback) {
        if (!this.blocks) {
            callback();
        } else {
            this.listeners.push(callback);
        }
    }
}

module.exports = Ready;
},{}],15:[function(require,module,exports){
"use strict";

var Fashion = require('./export/Base.js'),
    Base = Fashion.Base;
var BaseRuntime = require('./export/Runtime.js');

var Type = require('./export/type/Type.js');
var List = require('./export/type/List.js');
var Bool = require('./export/type/Bool.js');

var Literal = require('./export/type/Literal.js'),
    Null = Literal.Null;

var Declaration = require('./type/Declaration.js');
var Ruleset = require('./type/Ruleset.js');
var CSS = require('./CSS.js');
var TypeVisitor = require('./type/TypeVisitor.js');
var Types = require('./type/Types.js');
var SelectorList = require('./type/selectors/SelectorList.js');

var ColorFunctions = require('./functions/Color.js');
var Gradients = require('./functions/Gradients.js');
var HSL = require('./functions/HSL.js');
var Introspection = require('./functions/Introspection.js');
var ListFunctions = require('./functions/List.js');
var Misc = require('./functions/Misc.js');
var Numeric = require('./functions/Numeric.js');
var Opacity = require('./functions/Opacity.js');
var RGB = require('./functions/RGB.js');
var Selectors = require('./functions/Selectors.js');
var Text = require('./functions/Text.js');
var Util = require('./functions/Util.js');
var NameRegistrations = require('./processors/NameRegistrations.js');
var DataInline = require('./processors/DataInline.js');
var CssVariables = require('./processors/CssVariables.js');

class Runtime extends BaseRuntime {
    constructor(config) {
        super(config);
        var me = this;

        me.deferredContent = [];
        
        ColorFunctions.init(me);
        Gradients.init(me);
        HSL.init(me);
        Introspection.init(me);
        ListFunctions.init(me);
        Misc.init(me);
        Numeric.init(me);
        Opacity.init(me);
        RGB.init(me);
        Selectors.init(me);
        Text.init(me);
        Util.init(me);
        NameRegistrations.init(me);
        DataInline.init(me);
        CssVariables.init(me);
    }

    ruleset(selectors, sourceInfo, docs, blockDocs, hasBlock) {
        var ruleset = this.openRuleset(selectors);
        ruleset.sourceInfo = sourceInfo;
        ruleset.docs = docs;
        ruleset.blockDocs = blockDocs;
        ruleset.hasBlock = hasBlock;
        return ruleset;
    }

    rulesetDone() {
        var current = this.closeRuleset();
        this.printRuleset(current);
        return current;
    }

    namespacedRuleset(ns) {
        var ruleset = this.openRuleset(new SelectorList([]));

        ruleset.isNamespaced = true;
        ruleset.parent.removeChildRuleset(ruleset);
        ruleset.parent = null;
        ns = ns.toString();

        this.rulesets.pop();
        this.declare(ns, ruleset);
        this.rulesets.push(ruleset);
    }

    declare(property, value, important, sourceInfo, docs) {
        var isNull = false;

        if (value.$isFashionList && value.items.length === 1) {
            value = value.items[0];
        }

        if (typeof value === 'undefined' || value === null || value === Null) {
            isNull = true;
        }

        //if (value && value.$isFashionLiteral && value.value === 'null') {
        //    isNull = true;
        //}

        if (!isNull || important) {
            this.getCurrentRuleset().addDeclaration(new Declaration({
                property: property,
                value: value,
                important: important,
                sourceInfo: sourceInfo,
                docs: docs
            }));
        }
    }

    extendSelector(selector) {
        var current = this.getCurrentRuleset();
        if (!current.extend) {
            this.extenders.push(current);
            current.extend = [];
        }
        current.extend.push(selector);
    }

    openRuleset(selectors) {
        var current = this.getCurrentRuleset(),
            ruleset = new Ruleset({
                selectors: selectors,
                parent: current
            });
        if (current) {
            current.addChildRuleset(ruleset);
        }
        this.rulesets.push(ruleset);
        return ruleset;
    }

    closeRuleset() {
        return this.rulesets.pop();
    }

    getCurrentRuleset() {
        var rulesets = this.rulesets;
        return rulesets[rulesets.length - 1];
    }

    getCurrentRulesets() {
        return this.rulesets;
    }

    addDirectiveRuleset(name, value) {
        this.printRuleset(new Ruleset({
            isAtDirective: true,
            atDirectiveName: name,
            atDirectiveValue: value
        }));
    }

    printRuleset(ruleset) {
        if (!ruleset.parent && !ruleset.isNamespaced) {
            this.css.addRuleset(ruleset);
        }
    }

    /**************** overrides ****************/
    reset() {
        super.reset();
        this.css = new CSS({context: this.context});
        this.css.processors = this.processors.slice();
        this.rulesets = [];
        this.extenders = [];
    }

    registerProcessor(proc) {
        this.processors.push(new TypeVisitor(proc));
    }

    compile(code) {
        var me = this,
            theFn = super.compile(code);

        this.fn = function(rt, overrides, dyn) {
            var runtime = rt || me;
            theFn(runtime, overrides, dyn);
            runtime.runDeferred();
            runtime.css.extenders = runtime.extenders;
            return runtime.css;
        };
        return this.fn;
    }

    defer (name, fn) {
        this.deferredContent.push({
            name: name,
            fn: fn
        });
    }
    
    runDeferred(name) {
        var deferred = this.deferredContent,
            newDeferred = [],
            d;
        while(deferred.length) {
            d = deferred.shift();
            if (!name || d.name === name) {
                d.fn();
            }
            else {
                newDeferred.push(d);
            }
        }
        this.deferredContent = newDeferred;
    }
    
}

Fashion.apply(Runtime, {
    uniqueScopesForGlobalRulesets: true,
    uniqueScopesForAllRulesets: true,
    allowSetScopedVariables: true,
    allowMultipleImports: true,
    allowNullDefaults: true,
    allowEmptyRulesets: false,
    fullExtendWeave: false,
    compactSuperSelectors: false
});

Fashion.apply(Runtime.prototype, {
    extenders: null,
    mixins: null,
    rulesets: null,
    css: null,
    types: Types,

    mediaTest: /@media/,
    keyframesTest: /@.*?keyframes/
});

module.exports = Runtime;
},{"./CSS.js":5,"./export/Base.js":19,"./export/Runtime.js":21,"./export/type/Bool.js":24,"./export/type/List.js":31,"./export/type/Literal.js":32,"./export/type/Type.js":40,"./functions/Color.js":43,"./functions/Gradients.js":44,"./functions/HSL.js":45,"./functions/Introspection.js":46,"./functions/List.js":47,"./functions/Misc.js":48,"./functions/Numeric.js":49,"./functions/Opacity.js":50,"./functions/RGB.js":51,"./functions/Selectors.js":52,"./functions/Text.js":53,"./functions/Util.js":54,"./processors/CssVariables.js":61,"./processors/DataInline.js":62,"./processors/NameRegistrations.js":64,"./type/Declaration.js":65,"./type/Ruleset.js":66,"./type/TypeVisitor.js":68,"./type/Types.js":69,"./type/selectors/SelectorList.js":74}],16:[function(require,module,exports){
(function (process){
"use strict";

var Fashion = require('./export/Base.js'),
    Base = Fashion.Base;

var Env = require('./Env.js');
var Visitor = require('./Visitor.js');
var Runtime = require('./Runtime.js');

Fashion.currentFile = undefined;

class SassFile extends Base {
    constructor(cfg) {
        super(cfg);
        this.readyListeners = [];
        this.state = 0;
        this.imports = {};
        this.importedBy = {};
        if (this.isJsExtension()) {
            this.loadExtension();
        } else {
            this.loadSass();
        }
    }

    getLoadPath() {
        var loadPath = this.loadPath;
        if (!loadPath) {
            loadPath = this.loadPath = this.path;
        }
        return loadPath;
    }

    loadExtension() {
        var me = this,
            loadPath = me.getLoadPath();

        if (me.state < 5) {
            me.state = 5;
            if (me.state < 9) {
                me.state = 9;

                if (typeof System !== 'undefined') {
                    try {
                        me.info("importing " + loadPath);
                        System.import(loadPath).then(function (extension) {
                            extension.init(me.builder.context.runtime);
                            me.state = 10;
                            me.content = '';
                            me.info("file " + loadPath + " is loaded");
                            me.checkImports();
                        }, function (err) {
                            me.error("file " + loadPath + " failed to load");
                            me.error((err.stack || err) + '');
                            me.checkImports();
                        });
                    } catch (err) {
                        me.error("file " + loadPath + " failed to load");
                        me.error(err);
                        me.error((err.stack || err) + '');
                        me.checkImports();
                    }
                }
                else {
                    try {
                        if (!/\.js$/.test(loadPath)) {
                            loadPath += '.js';
                        }
                        if (Env.isNode && loadPath.indexOf('/') !== 0 && loadPath.indexOf(':') !== 1) {
                            loadPath = process.cwd() + '/' + loadPath;
                        }
                        
                        // if (loadPath.indexOf('http') === 0) {
                        //     loadPath = loadPath.replace(/http(s)?:\/\/(.*?)(:\d{1,4})?\//, '')
                        // }

                        me.info("requiring " + loadPath);
                        delete require.cache[require.resolve(loadPath)];
                        var extension = require(loadPath);
                        extension.init(me.builder.context.runtime);
                        me.state = 10;
                        me.content = '';
                        me.info("file " + loadPath + " is loaded");
                        me.checkImports();
                    } catch (err) {
                        me.error("file " + loadPath + " failed to load");
                        me.error((err.stack || err) + '');
                        me.checkImports();
                    }
                }
            }
        }
    }

    loadSass() {
        var me = this,
            loadPath;

        if (me.state < 5) {
            me.state = 5;

            if (me.state < 10) {
                loadPath = me.getLoadPath();
                me.info("loading file " + loadPath);

                if (me.isSaveFile) {
                    me.state = 10;
                    me.content = '';
                    me.checkImports();
                    return;
                }

                Env.loadFile(loadPath, function (content) {
                    me.state = 10;
                    me.info("file " + loadPath + " is loaded");
                    me.content = content;
                    me.checkImports();
                }, function () {
                    var idx = loadPath.lastIndexOf('/'),
                        attempt = loadPath;

                    if (idx > -1) {
                        attempt = attempt.substring(0, idx + 1) + '_' + attempt.substring(idx + 1);
                    }

                    loadPath = me.loadPath = attempt;
                    me.info("retrying with " + loadPath);
                    Env.loadFile(loadPath, function (content) {
                        me.state = 10;
                        me.info("file " + loadPath + " is loaded");
                        me.content = content;
                        me.checkImports();
                    }, function () {
                        Fashion.error("failed to download path : " + loadPath);
                        me.content = "";
                        me.checkImports();
                    });
                });
            }
        }
    }

    getAst() {
        var me = this,
            ast = me.ast,
            content = me.content,
            loadPath = me.getLoadPath(),
            parser;

        if (me.isJsExtension()) {
            return undefined;
        }

        if (!ast && content) {
            parser = me.builder.getParser();
            me.debug("parsing file " + loadPath);
            try {
                ast = me.ast = parser.parse(content, loadPath);
            } catch (err) {
                Fashion.error("Error parsing file : " + loadPath + " => ");
                throw err;
                return undefined;
            }
        }

        return ast;
    }

    getSassFile(basePath, targetPath, origSource, importer) {
        return this.builder.getSassFile(basePath, targetPath, origSource, importer);
    }

    isJsExtension() {
        var loadPath = this.getLoadPath();
        return loadPath.indexOf(".js") > 0;
    }

    getImportSource(source) {
        var imports = [];
        if ((source.type === 'List' || source.type === 'SelectorList') && source.separator && source.separator.indexOf(',') === 0) {
            imports = source.items;
        } else {
            imports.push(source);
        }

        imports = Fashion.convert(imports, (source) => {
            if (source && source.type === 'MultiPartSelector' && source.items.length === 1) {
                source = source.items[0];
            }
            if (source && source.type === 'CompoundSelector' && source.items.length === 1) {
                source = source.items[0];
            }
            if (source && source.value) {
                return source.value;
            }
            return source;
        });

        imports = Fashion.filter(imports, (source) => {
            if (!source) {
                return false;
            }

            if (!source.indexOf) {
                return false;
            }

            var idx = source.indexOf('.css');
            if (idx > -1 && idx === (source.length - 4)) {
                return false;
            }

            idx = source.indexOf('http://');
            if (idx === 0) {
                return false;
            }

            idx = source.indexOf('//');
            if (idx === 0) {
                return false;
            }

            return true;
        });

        return imports;
    }

    trimComment(comment) {
        if (comment.indexOf('//#') === 0) {
            comment = comment.substring(3);
        }
        if (comment.indexOf('//') === 0) {
            comment = comment.substring(2);
        }
        if (comment.indexOf('/*') === 0) {
            comment = comment.substring(2, comment.length - 3);
        }
        return comment.trim();
    }

    
    dependsOn(path) {
        var me = this;
        if (me.imports[path]) {
            return true;
        }
        for (var loadPath in me.imports) {
            var dep = me.imports[loadPath];
            if (dep.dependsOn(path)) {
                return true;
            }
        }
        return false;
    }
    
    
    checkImports() {
        var me = this,
            loadPath = me.getLoadPath(),
            sassFiles = [],
            missing, i;

        if (me.state < 15) {
            me.info("checking Imports for file " + loadPath);
            me.state = 15;
            // normal scss file
            if (!me.isJsExtension()) {
                if (me.isUiFile) {
                    me.mixinCalls = [];
                }
                var vis = new Visitor({
                    skipBranching: true,

                    loadJsExtension (source) {
                        source = source.replace(/;$/, '')
                            .replace(/^'/, '')
                            .replace(/'$/, '')
                            .replace(/\.js$/, '')
                            .replace(/^js:\s*/, '');

                        if (source.indexOf(".") !== 0) {
                            source = "./" + source;
                        }

                        var sassFile = me.getSassFile(me.path, source + ".js", source, me);

                        if (sassFile === me) {
                            Fashion.raise("file " + loadPath + " should not import itself");
                        }

                        me.imports[sassFile.getLoadPath()] = sassFile;
                        sassFile.importedBy[loadPath] = me;
                        if (sassFile.state < 20) {
                            sassFiles.push(sassFile);
                        }
                    },

                    //Comment (comment) {
                    //    if (comment.indexOf('//#') === 0) {
                    //        comment = me.trimComment(comment);
                    //        if (comment.indexOf('@require ') === 0) {
                    //            comment = comment.replace('@require ', '');
                    //            this.loadJsExtension(comment);
                    //        }
                    //    }
                    //},

                    FunctionCall (node) {
                        var funcName = node.id || node.value;
                        var handlers = this;
                        if (funcName === 'require') {
                            var sources = me.getImportSource(node.args);
                            Fashion.warn("Use of 'require()' will be deprecated", node);
                            Fashion.warn("Use @import instead");
                            sources.forEach((source) => {
                                handlers.loadJsExtension(source);
                            });
                            node.visitTarget = null;
                        }
                    },

                    Require(node) {
                        var source = me.getImportSource(node.source)[0],
                            isGlobal = this.nodeStack.length == 1;

                        if (source.indexOf) {
                            if (!isGlobal) {
                                Fashion.raise('Cannot use require() "' + source + '" from non-file-scope location', node);
                            }

                            Fashion.warn("Use of '@require' has been deprecated", node);
                            Fashion.warn("Use @import instead");

                            delete node.visitTarget;
                            this.loadJsExtension(source);
                        }
                    },

                    Import(node) {
                        delete node.visitTarget;
                        delete node.nodeFiles;
                        var handlers = this,
                            source = me.getImportSource(node.source);

                        source.forEach((source) => {
                            if (/(^js[:])|(\.js$)/.test(source)) {
                                handlers.loadJsExtension(source);
                            } else {
                                var sassFile = me.getSassFile(me.path, source, source);

                                if (sassFile === me) {
                                    Fashion.raise("file " + loadPath + " should not import itself");
                                }

                                if (sassFile.dependsOn(loadPath)) {
                                    me.importError = new Error("Import cycle detected between " + me.getLoadPath() + " and " + sassFile.getLoadPath());
                                } else {
                                    me.imports[sassFile.getLoadPath()] = sassFile;
                                    sassFile.importedBy[loadPath] = me;
                                    if (sassFile.state < 20) {
                                        sassFiles.push(sassFile);
                                    }
                                }
                            }
                        });
                    },

                    Include (node) {
                        if (me.isUiFile) {
                            me.mixinCalls.push(node);
                        }
                    }
                });

                vis.visit(me.getAst());
            }
            // javascript extension file
            else if (Fashion && Env && Env.isRhino) {
                var content = me.content + "\n//# sourceURL=" + loadPath;
                eval(content);
            }

            // indicate that the state has passed out of checking imports
            me.state == 16;

            missing = sassFiles.length;

            if (!missing) {
                me.fireReady();
                return;
            }

            for (i = 0; i < sassFiles.length; i++) {
                sassFiles[i].onReady(function () {
                    missing--;
                    if (missing === 0) {
                        me.fireReady();
                    } else {
                        me.debug("file " + loadPath + " still waiting for " + missing + " other files");
                    }
                });
            }
        }
    }

    onReady(listener) {
        var me = this;
        if (me.state >= 20) {
            listener(me);
        } else {
            me.readyListeners.push(listener);
            if (me.state == 10) {
                me.checkImports();
            }
        }
    }

    fireReady() {
        var me = this;
        if (me.state < 20) {
            me.info("file " + me.getLoadPath() + " is ready");
            me.state = 20;
            var listener;
            while ((listener = me.readyListeners.shift()) != null) {
                listener(me);
            }
        }
    }

    getExpandedAst(stamp) {
        stamp = stamp || new Date().getTime();
        var me = this,
            ast = me.getAst();

        if (me.importError) {
            var err = me.importError;
            delete me.importError;
            throw err;
        }
        
        function addSourceInfo (vis) {
            if (vis.addSourceInfo) {
                vis.addSourceInfo(this.node);
            }
        }        
        
        function createCallStackScope (vis) {
            if (vis.createCallStackScope) {
                vis.createCallStackScope();
            }
        }
        
        function popCallStackScope (vis) {
            if (vis.popCallStackScope) {
                vis.popCallStackScope();
            }
        }
        
        if (me.imported != stamp) {
            me.imported = stamp;
            if (!me.isJsExtension()) {
                me.debug("expanding ast for file " + me.getLoadPath());
                var vis = new Visitor({
                    skipBranching: true,

                    Import(node) {
                        delete node.visitTarget;
                        var source = me.getImportSource(node.source),
                            visitTarget = [];

                        source.forEach((source) => {
                            if (source && source.indexOf && !/(^js[:])|(\.js$)/.test(source) && !node.skipSassImport) {
                                var sassFile = me.getSassFile(me.path, source);
                                sassFile.importing = true;
                                var importAst = sassFile.getExpandedAst(stamp);
                                if (me.builder.context.enableSymbols) {
                                    visitTarget.push({
                                        node: node,
                                        doVisit: addSourceInfo
                                    });
                                    visitTarget.push({
                                        doVisit: createCallStackScope
                                    });
                                }
                                visitTarget.push(importAst);
                                if (me.builder.context.enableSymbols) {
                                    visitTarget.push({
                                        doVisit: popCallStackScope
                                    });
                                }
                                sassFile.importing = false;
                            }
                        });

                        if (visitTarget.length) {
                            node.visitTarget = visitTarget;
                        }
                    }
                });
                me.expanding = true;
                vis.visit(ast);
                me.expanding = false;
                return ast;
            }
        }

        return Runtime.allowMultipleImports ? ast : undefined;
    }

    invalidate() {
        var me = this;
        if (me.state >= 10) {
            me.info("invalidating file " + me.getLoadPath());
            me.state = 0;
            delete me.ast;
            delete me.content;
            delete me.imported;
            for (var name in me.importedBy) {
                me.importedBy[name].unready();
            }
            var loadPath = me.getLoadPath();
            for (name in me.imports) {
                delete me.imports[name].importedBy[loadPath];
            }
            me.imports = {};
            if (me.isJsExtension()) {
                me.loadExtension();
            } else {
                me.loadSass();
            }
        }
    }

    unready() {
        this.state = 10;
        delete this.ast;
        for (var name in this.importedBy) {
            this.importedBy[name].unready();
        }
    }

    debug(message) {
        // Fashion.log(message);
    }

    info(message) {
        // Fashion.log(message);
    }

    error(message) {
        Fashion.error(message);
    }

    getCustomUIs () {
        var me = this,
            mixinMap = {},
            allUIs = {},
            calls = me.mixinCalls,
            separator = ', ',
            node, mixinName, include, args, arg, argName, argMap, uiMap;

        allUIs[me.jsClassName] = mixinMap;

        for (var i = 0; i < calls.length; i++) {
            node = calls[i];
            include = node.include;
            mixinName = include.id || include.value;
            uiMap = mixinMap[mixinName] || {};

            args = include.args;

            if (args.isFashionListAst) {
                args = args.items;
                separator = args.separator;
            }

            if (!Array.isArray(args)) {
                args = [args];
            }

            argMap = {};
            for (var a = 0; a < args.length; a++) {
                arg = args[a];
                argName = a;
                var value = arg.name || arg.value;
                if (arg.variable) {
                    argName = arg.variable;
                }
                if (!value) {
                    while(arg && arg.expr) {
                        arg = arg.expr;
                    }
                    var converter = function(item) {
                        item = (item && item.expr) || item;
                        if (item.isFashionListAst) {
                            var sep = item.separator || separator,
                                items = Fashion.convert(item.items, converter),
                                value = items.join(sep);
                            if (items.length > 1) {
                                value = '(' + value+ ')';
                            }
                            return value;
                        }
                        return item.name || item.value;
                    };
                    
                    if (arg.isFashionListAst) {
                        separator = arg.separator || separator;
                        value = converter(arg);
                    }
                    else {
                        value = arg.name || arg.value;
                    }
                }
                argMap[argName] = value;
            }

            if (argMap.$ui) {
                var tmp = {};
                tmp[argMap.$ui] = argMap;
                delete argMap.$ui;
                argMap = tmp;
            }

            Fashion.apply(uiMap, argMap);
            mixinMap[mixinName] = uiMap;
        }

        return allUIs;
    }
}

Fashion.apply(SassFile.prototype, {
    $isSassFile: true,
    expanding: false,
    readyListeners: null,
    state: null,
    imports: null,
    importedBy: null,
    loadPath: null,
    path: null,
    content: null,
    originalSource: null,
    ast: null,
    imported: null,
    importer: null,
    builder: null,
    isSaveFile: null,
    isUiFile: null,
    jsClassName: null,
    mixinCalls: null
});

module.exports = SassFile;
}).call(this,require('_process'))
},{"./Env.js":9,"./Runtime.js":15,"./Visitor.js":18,"./export/Base.js":19,"_process":3}],17:[function(require,module,exports){
"use strict";

var Fashion = require('./export/Base.js');
var Visitor = require('./Visitor.js');
var Preprocessor = require('./Preprocessor.js');
var Output = require('./export/Output.js');
var Parser = require('./parse/Parser.js');
var Scanner = require('./parse/Scanner.js');
var Color = require('./export/type/Color.js');

var Runtime = require('./Runtime.js');

var Nodes = require('./parse/ast/Nodes.js'),
    List = Nodes.List,
    SelectorList = Nodes.SelectorList,
    Constant = Nodes.Constant,
    FunctionCall = Nodes.FunctionCall,
    Variable = Nodes.Variable,
    VariableAssignment = Nodes.VariableAssignment;

class StringCache {
    constructor() {
        this.array = [];
        this.map = {};
    }

    addString(string) {
        var idx = this.map[string];
        if (typeof idx === 'undefined') {
            idx = this.array.length;
            this.array.push(string);
            this.map[string] = idx;
        }
        return idx;
    }

    get(id) {
        return this.array[id];
    }
}

class ObjCache {
    constructor() {
        this.array = [];
    }

    addObj(obj) {
        var idx = this.array.length;
        this.array.push(obj);
        return idx;
    }

    get(id) {
        return this.array[id];
    }
}


class Transpiler extends Visitor {
    reset() {
        this.output = new Output();
        this.currentScope = {
            __suffix: '',
            __isGlobal: true
        };
        this.globalScope = this.currentScope;
        this.globalVars = {};
        this.errors = 0;
        this.warnings = 0;
        this.stringCache = new StringCache();
        this.docCache = new ObjCache();
        this.nodeCache = new ObjCache();
    }

    createScope(parent) {
        parent = parent || this.currentScope;
        var scope = Fashion.chain(parent);
        scope.__suffix = scope.__suffix + '$';
        return scope;
    }

    getScopeName(name, scope) {
        //scope = scope || this.currentScope;
        //
        //if(scope.hasOwnProperty(name)) {
        //    return scope[name];
        //}

        return Fashion.getJsName(name);
    }

    getVariableName(node) {
        return node.variable || node.name || node.value || node;
    }

    handleInlineExpression(expr) {
        try {
            var outwas = this.output,
                output = new Output(),
                parser = this.inlineParser || (this.inlineParser = new Parser()),
                tree;

            if (this.isSelector) {
                parser.scanner = new Scanner(expr);
                tree = parser.parseSequence();
            } else {
                tree = parser.parse('$foobar: ' + expr + ';');
                tree = tree[0].value;
            }

            this.output = output;
            this.handleStatement(tree);
            this.output = outwas;

            return output.get().trim();
        } catch (error) {
            Fashion.log("failed to evaluate inline expression : " + expr);
            throw error;
        }
    }

    handleInlineExpressions(text, start, skipEscape) {
        text = text + '';
        start = start || 0;
        var out = [],
            level = 0,
            outwas, i, ch, ch2;

        outer: for (i = start; i < text.length; i++) {
            ch = text.charAt(i);
            ch2 = (i < text.length - 1)
                ? text.charAt(i + 1)
                : undefined;

            switch (ch) {
                case '\\':
                    if (!outwas && !skipEscape) {
                        out.push('\\\\');
                    } else {
                        out.push(ch);
                    }
                    break;
                case '"':
                    if (!outwas && !skipEscape) {
                        out.push('\\"');
                    } else {
                        out.push(ch);
                    }
                    break;
                case '#':
                    if (ch2 === '{') {
                        level++;
                        if (level < 2) {
                            outwas = out;
                            out = [];
                            i++;
                        } else {
                            out.push(ch);
                        }
                    } else {
                        out.push(ch);
                    }
                    break;
                case '}':
                    level--;
                    if (!level) {
                        outwas.push('" + __rt_unquote(');
                        outwas.push(this.handleInlineExpression(out.join('')));
                        outwas.push(') + "');
                        out = outwas;
                        outwas = undefined;
                    } else {
                        out.push(ch);
                    }
                    break;
                default:
                    out.push(ch);
                    break
            }
        }
        return out.join('');
    }

    
    addSourceInfo(item) {
        if (!this.symbols) {
            return;
        }
        item = item || this.nodeStack[this.nodeStack.length - 1];
        if (item && (item.lineNumber || item.file)) {
            this.output.add("__rt_pushSourceInfo([" + 
                "" + item.lineNumber + 
                ", '" + (item.file || "source-code") + "'])");
            this.output.add(';');
        }
    }
    
    createCallStackScope() {
        if (!this.symbols) {
            return;
        }
        this.output.addln("__rt_createCallStackScope();");
    }
    
    popCallStackScope() {
        if (!this.symbols) {
            return;
        }
        this.output.addln("__rt_popCallStackScope();");
    }
    
    handleStatements(statements) {
        if (this.symbols) {
            this.addSourceInfo();
        }
        this.visit(statements);
    }

    handleStatement(statement) {
        if (statement && statement.hasOwnProperty('visitTarget')) {
            statement = statement.visitTarget;
            if (statement && Array.isArray(statement)) {
                this.handleStatements(statement);
            }
        }
        if (statement) {
            if (statement instanceof Array) {
                statement = new List(null, statement, ',');
            }
            this.visit(statement);
        }
    }

    createDefaultScopeMap(args, isMixin) {
        args = this.loadArgsArray(args);
        var output = this.output,
            defaulted = 0,
            arg, a, varName, jsName, name;

        this.isSignatureDeclaration = true;
        this.generateGets = true;
        for (a = 0; a < args.length; a++) {
            arg = args[a];
            if (arg) {
                varName = (arg.variable || arg.name);
                name = varName;
                jsName = this.getScopeName(varName);
                this.currentScope[jsName] = {
                    name: jsName,
                    param: true
                };
                varName = jsName;
                if (arg.varArgs) {
                    output.addln(varName + ' = __rt_sliceArgs(arguments, ' +
                        (isMixin ? a + 1 : a) +
                        ');');
                    defaulted++;
                } else if (arg.type !== 'Variable' || arg.variable !== undefined) {
                    output.addln('var ' + varName + ' = ' + varName + ' || ');
                    this.handleStatement(arg);
                    output.add(';');
                    defaulted++;
                } else {
                    output.addln('var ' + varName + ' = ' + varName + ' || __Null;');
                }
                output.addln('__rt_set("' + jsName + '", ' + varName + ', true);');
            }
        }
        this.generateGets = false;
        this.isSignatureDeclaration = false;
        return defaulted;
    }

    getRegisteredDeclarationsMap(declaredParameters) {
        var map = {}, param;
        for (var d = 0; d < declaredParameters.length; d++) {
            param = declaredParameters[d];
            map[param.name] = param;
        }
        return map;
    }

    createCallArray(args, defaults, id, convertName, addComma) {
        args = this.loadArgsArray(args);
        if (defaults.parameters) {
            defaults = defaults.parameters;
        }

        var me = this,
            output = me.output,
            len = args.length > defaults.length ? args.length : defaults.length,
            declaredMap = me.getRegisteredDeclarationsMap(defaults),
            actual = new Array(len),
            arg, a, position;

        for (var a = 0; a < args.length; a++) {
            arg = args[a];
            position = a;
            if (arg && arg.variable) {
                var argName = arg.variable;

                if (convertName) {
                    if (argName.indexOf("$") == 0) {
                        argName = argName.substr(1);
                    }
                    argName = argName.replace(/\-/g, '_');
                }

                if (!declaredMap[argName]) {
                    var params = [];
                    for (var pName in declaredMap) {
                        params.push(pName);
                    }
                    Fashion.warn("function or mixin '" + id + "' had no parameter named " + argName + " : params were : " + params.join(", "));
                    // if a named parameter didn't match a parameter from the
                    // call signature, skip it and let the default value be used
                    continue;
                } else {
                    position = declaredMap[argName].position;
                }
            }
            actual[position] = arg;
        }

        for (a = 0; a < actual.length; a++) {
            arg = actual[a];
            if (addComma || (a > 0)) {
                output.add(',');
                output.space();
            }
            if (arg) {
                output.addln();
                if (arg.varArgs) {
                    output.add('__rt_applySpread(');
                    me.handleStatement(arg);
                    output.add(')');
                } else {
                    me.handleStatement(arg);
                }
            } else {
                output.addln("__udf");
            }
        }
        return actual.length;
    }

    escapeString(str) {
        return str && str.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
    }

    //<editor-fold desc="visitor methods">
    Each(statement) {

        if (statement.isMap) {

            var me = this,
                output = me.output,
                arg = statement.variable,
                names = statement.variable.items;

            me.eachCount = me.eachCount || 1;

            var jsNames = Fashion.convert(names, (name) => me.getScopeName(name)),
                jsItrName = '__each_itr_' + me.eachCount,
                jsListName = '__each__list';


            names.forEach((name, i) => this.currentScope[jsNames[i]] = jsNames[i]);

            output.addln("var " + jsListName + " = ");
            me.handleStatement(statement.list);
            output.add(";");
            output.addln("for(var " + jsItrName + " = 0; " + jsItrName + " < " + jsListName + ".items.length - 1; " + jsItrName + "+=2) {");
            output.indent();
            output.addln('__rt_set("' + jsNames[0] + '", ' + jsListName + ".items[" + jsItrName + "]);");
            output.addln('__rt_set("' + jsNames[1] + '", ' + jsListName + ".items[" + jsItrName + " + 1]);");
            me.handleStatements(statement.statements);
            output.unindentln("}");

        } else {
            var me = this,
                output = me.output,
                arg = statement.variable,
                name = me.getVariableName(arg),
                jsName = me.getScopeName(name),
                jsListName = jsName + "__list",
                jsItrName = jsName + "__itr";

            this.currentScope[jsItrName] = jsItrName;
            this.currentScope[jsListName] = jsListName;
            this.currentScope[jsName] = jsName;

            output.addln("var " + jsListName + " = ");
            me.handleStatement(statement.list);
            output.add(";");
            output.addln("for(var " + jsItrName + " = 0; " + jsItrName + " < " + jsListName + ".items.length; " + jsItrName + "++) {");
            output.indent();
            output.addln('__rt_set("' + jsName + '", ' + jsListName + ".items[" + jsItrName + "]);");
            me.handleStatements(statement.statements);
            output.unindentln("}");
        }


        return false;
    }

    For(statement) {
        var me = this,
            output = me.output,
            arg = statement.variable,
            name = me.getVariableName(arg),
            jsName = me.getScopeName(name),
            jsItrName = jsName + "__itr";

        this.currentScope[jsName] = jsName;
        output.addln('for(var ' + jsItrName + ' = __rt_unbox(');
        me.handleStatement(statement.start);
        output.add('), end = (__rt_unbox(');
        me.handleStatement(statement.end);
        output.add(')');
        if (!!statement.inclusive) {
            output.add(' + 1');
        }
        output.add('); ' + jsItrName + ' < end; '+ jsItrName + '++){');
        output.indent();
        output.addln('var ' + jsName + ' = ' + jsItrName);
        output.addln('__rt_set("' + jsName + '", ' + jsItrName + ', true);');
        me.handleStatements(statement.statements);
        output.unindentln('};');
        return false;
    }

    While(statement) {
        var output = this.output;
        output.addln("while(__rt_unbox(");
        this.handleStatement(statement.condition);
        output.add(")) {");
        output.indent();
        this.handleStatements(statement.statements);
        output.unindentln("};");
        return false;
    }

    Function(statement) {
        var me = this,
            output = me.output,
            func = statement.func,
            jsName = Fashion.getJsName(func.id || func.value);

        if (jsName === 'dynamic') {
            me.error("Cannot define function named 'dynamic'", statement);
        }

        if (jsName === 'require') {
            me.error("Cannot define function named 'require'", statement);
        }

        me.nestedDocs = true;

        var scopeWas = me.currentScope;
        me.currentScope = me.createScope();

        output.addln('function ' + jsName + '__fn(');
        var args = me.loadArgsArray(func.args || []);
        for (var i = 0; i < args.length; i++) {
            var arg = args[i];
            var varName = (arg.variable || arg.name);
            varName = me.getScopeName(varName);
            if (i > 0) {
                output.add(',');
                output.space();
            }
            output.add(varName);
        }
        output.add(') {');
        output.indent();
        // load the defaults
        output.addln('__rt_createScope(__rt_functions.' + jsName + ' && __rt_functions.' + jsName + '.createdScope);');
        if (this.symbols) {
            me.createCallStackScope();
        }
        if (this.symbols) {
            this.addSourceInfo();
        }
        me.createDefaultScopeMap(func.args);

        this.popScope = true;
        // Handle all the statements within this function
        if (statement.statements.length) {
            me.handleStatements(statement.statements);
        }
        me.currentScope = scopeWas;

        if (this.popScope) {
            if (this.symbols) {
                me.popCallStackScope();
            }
            output.addln("__rt_popScope();");
            this.popScope = false;
        }
        output.unindentln('};');
        output.addln('__rt_functions.' + jsName + ' = ' + jsName + '__fn;');
        output.addln('__rt_functions.' + jsName + '.createdScope = __rt_getCurrentScope();');

        me.nestedDocs = false;
        return false;
    }

    Ruleset(statement, fnName) {
        fnName = fnName || '__rt_ruleset';
        var me = this,
            output = me.output,
            isGlobal = me.nodeStack.length === 1,
            newScope = false,
            docIdx = -1,
            blockDocIdx = -1,
            hasBlock = !!statement.statements;

        output.addln(fnName + '(');
        this.isSelector = statement.selectors;
        this.handleStatement(statement.selectors);
        this.isSelector = null;

        if (statement.file) {
            var fileIdx = this.stringCache.addString(statement.file);
            output.add(",__rt_getString(" + fileIdx + ") + \":" + statement.lineNumber + "\"");
        } else {
            output.add(', null');
        }

        if (statement.docs && statement.docs.length) {
            docIdx = this.docCache.addObj(statement.docs);
            output.add(',__rt_getDocs(' + docIdx + ')');
        } else {
            output.add(', null');
        }

        if (statement.blockDocs && statement.blockDocs.length) {
            blockDocIdx = this.docCache.addObj(statement.blockDocs);
            output.add(',__rt_getDocs(' + blockDocIdx + ')');
        } else {
            output.add(', null');
        }

        output.add(', ' + hasBlock);
        output.add(");");

        if (isGlobal && Runtime.uniqueScopesForGlobalRulesets) {
            newScope = true;
        }

        if (Runtime.uniqueScopesForAllRulesets) {
            newScope = true;
        }

        if (newScope) {
            var scopeWas = me.currentScope;
            me.currentScope = me.createScope();
            output.addln("__rt_createScope();")
            me.handleStatements(statement.statements);
            output.addln("__rt_popScope();")
            me.currentScope = scopeWas;
        } else {
            me.handleStatements(statement.statements);
        }

        output.addln("__rt_rulesetDone();");
        me.nestedDocs = false;
    }

    Mixin(statement) {
        var me = this,
            output = me.output,
            name = statement.name,
            jsName = Fashion.getJsName(name.id || name.value),
            args, arg, varName, scopeWas, i;

        me.nestedDocs = true;
        me.processingMixin = true;

        scopeWas = me.currentScope;
        me.currentScope = me.createScope();

        output.addln('__rt.mixins.' + jsName + '= function(');
        args = me.loadArgsArray(name.args || []);
        output.add('$$content');
        for (i = 0; i < args.length; i++) {
            arg = args[i];
            varName = (arg.variable || arg.name);
            varName = me.getScopeName(varName);
            output.add(',');
            output.space();
            output.add(varName);
        }
        output.add(') {');

        output.indent();

        // load the defaults
        output.addln('__rt_createScope(__rt.mixins.' + jsName + ' && __rt.mixins.' + jsName + '.createdScope);');
        if (this.symbols) {
            me.createCallStackScope();
        }
        if (this.symbols) {
            this.addSourceInfo();
        }
        me.createDefaultScopeMap(name.args, true);
        me.handleStatements(statement.statements);
        me.currentScope = scopeWas;
        if (this.symbols) {
            me.popCallStackScope();
        }
        output.addln("__rt_popScope();")
        output.unindentln('};');
        output.addln('__rt.mixins.' + jsName + '.createdScope = __rt_getCurrentScope();');
        me.nestedDocs = false;
        me.processingMixin = false;
        return false;
    }

    Content(statement) {
        if (!this.processingMixin) {
            this.error("@content may only be used within a mixin declaration");
        }
        this.output.addln("$$content && $$content();");
        return false;
    }

    Include(statement) {
        var me = this,
            output = me.output,
            include = statement.include,
            id = include.id || include.value,
            jsId = Fashion.getJsName(id),
            args = me.loadArgsArray(include.args || []);

        if (this.symbols) {
            me.addSourceInfo();
            output.add(';');
            output.addln();
        }
        if (jsId == "fashion_defer_content") {
            output.addln("__rt.defer(");
            if (args[0]) {
                output.add("__rt.unbox(");
                me.handleStatement(args[0]);
                output.add(")");
            }
            else {
                output.add("null");
            }
            output.add(", ");
            output.addln('(function(scope) { return function(){');
            output.indent();
            output.addln("__rt_createScope(scope);");
            if (this.symbols) {
                me.createCallStackScope();
            }
            me.handleStatements(statement.content.statements);
            if (this.symbols) {
                me.popCallStackScope();
            }
            output.addln("__rt_popScope();");
            output.unindent();
            output.addln("}})(__rt_getCurrentScope())");
            output.add(");");
        }
        else if (jsId == 'fashion_inject_content') {
            output.addln("__rt.runDeferred(");
            if (args[0]) {
                output.add("__rt.unbox(");
                me.handleStatement(args[0]);
                output.add(")");
            }
            output.add(");");
        }
        else if (!me.mixinDeclarations[jsId]) {
            me.error("unknown definition for mixin named " + id + " : " + statement.file + ":" + statement.lineNumber);
        } else {
            output.addln('(__rt.mixins.' + jsId + ' || ' + jsId + '__mix).apply(__rt.mixins, __rt_applySpreadArgs([');
            output.indent();
            if (statement.content) {
                output.addln('(function(scope) { return function(){');
                output.indent();
                output.addln("__rt_createScope(scope);");
                if (this.symbols) {
                    me.createCallStackScope();
                }
                if (this.symbols) {
                    this.addSourceInfo();
                }
                me.handleStatements(statement.content.statements);
                if (this.symbols) {
                    me.popCallStackScope();
                }
                output.addln("__rt_popScope();");
                output.unindent();
                output.addln("}})(__rt_getCurrentScope())");
            } else {
                output.add('__udf');
            }
            me.createCallArray(args, me.mixinDeclarations[jsId], id, false, true);
            output.unindent();
            output.add('], "' + jsId + '"));');
        }
        return false;
    }

    Declaration(statement) {
        var me = this,
            output = me.output,
            namespacedRulesets = [],
            props = [],
            separator = ' ',
            docIdx = -1,
            val = statement.value,
            i, nsRuleset;

        if (val.type === 'List') {
            separator = val.separator;
            val = val.items;
        } else if (!Array.isArray(val)) {
            val = [val]
        }

        for (i = 0; i < val.length; i++) {
            var prop = val[i];
            if (prop.type !== 'Ruleset') {
                props.push(prop);
            } else {
                namespacedRulesets.push(prop);
            }
        }

        if (props.length) {
            if (this.symbols) {
                this.addSourceInfo();
            }
            output.addln('__rt_declare("' + me.handleInlineExpressions(statement.property) + '", ');
            if (statement.property === 'font') {
                me.isFontDecl = statement;
            }
            me.handleStatement(new List(null, props, separator));
            output.add(',');
            output.space();
            output.add(!!statement.important + '');

            if (statement.file) {
                var fileIdx = this.stringCache.addString(statement.file);
                output.add(",__rt_getString(" + fileIdx + ") + \":" + statement.lineNumber + "\"");
            } else {
                output.add(', null');
            }

            if (statement.docs && statement.docs.length) {
                docIdx = this.docCache.addObj(statement.docs);
                output.add(',__rt_getDocs(' + docIdx + ')');
            } else {
                output.add(', null');
            }

            output.add(');');
        }

        if (namespacedRulesets.length) {
            for (i = 0; i < namespacedRulesets.length; i++) {
                nsRuleset = namespacedRulesets[i];
                nsRuleset.selectors = new SelectorList({
                    items: [new Constant({
                        dataType: 'Literal',
                        value: statement.property
                    })],
                    separator: ', '
                });
                me.Ruleset(nsRuleset, '__rt_namespacedRuleset');
                delete nsRuleset.selectors;
            }
        }
        me.isFontDecl = undefined;
        return false;
    }

    VariableAssignment(statement) {
        var me = this,
            output = me.output,
            name = statement.name,
            bangGlobal = !!statement.global ? 1 : 0,
            bangDynamic = !!statement.dynamic ? 1 : 0,
            bangDefault = !!statement.default ? 1 : 0,
            isGlobalVar = me.nodeStack.length === 1 ? 1 : 0,
            jsName = me.getScopeName(name),
            exists = me.currentScope[jsName],
            createLocal = (!isGlobalVar && (!exists || !exists.param)) ? 1 : 0,
            variable = me.dynamicVariables[jsName],
            failDynamicAssignment = false,
            processed = me.processedVariables,
            isDynamic = false,
            replaceMap = this.preprocessor.replacesMap;


        if (this.symbols) {
            this.addSourceInfo();
        }
        
        if (bangDynamic && !isGlobalVar) {
            failDynamicAssignment = true;
        }

        if (!bangDynamic && variable && !isGlobalVar && (me.currentScope === me.globalScope)) {
            // cannot reassign dynamic vars inside control logic
            failDynamicAssignment = true;
        }

        if (bangGlobal && !bangDynamic && !isGlobalVar && variable) {
            // cannot reassign dynamic vars inside control logic using !global
            failDynamicAssignment = true;
        }

        if (failDynamicAssignment) {
            this.error(["Dynamic variable ",
                name,
                " can only be assigned at file scope "
            ].join(''));

            Fashion.error('  at ', statement);
            var v = variable;
            while (v && v.elevationCause) {
                Fashion.error([
                        '\t',
                        v.name,
                        ' elevated by ',
                        v.elevationCause.name,
                        ' at '
                    ].join(''),
                    v.elevationCause.getNode());
                v = v.elevationCause;
            }
        }

        if (isGlobalVar && variable && processed[jsName]) {
            return false;
        }

        if (variable) {
            if (!exists || (!exists.param && bangGlobal)) {
                isDynamic = true;
            }
        }

        if (exists) {
            if (bangGlobal) {
                createLocal = 0;
            }
            else if (!variable && Runtime.allowSetScopedVariables) {
                // do not allow re-assingments of dynamic variables
                // from a non-global scope
                createLocal = 0;
            }
        } else if (bangGlobal) {
            createLocal = 0;
        }

        if (createLocal) {
            me.currentScope[jsName] = {
                name: jsName
            };
        } else if (bangGlobal) {
            jsName = me.getScopeName(name, me.globalScope);
        }

        if (isGlobalVar) {
            me.globalScope[jsName] = jsName;
        }

        var setArgs = [];

        if (isDynamic) {
            output.addln('__rt_setDynamic("' + name + '", ');
            output.add('__rt_getGlobalDefault("' + jsName + '") || ');
            var idx = this.nodeCache.addObj(statement.value);
            setArgs.push(idx);
        }
        else if (bangGlobal) {
            output.addln('__rt_setGlobal("' + jsName + '", ');
            if (bangDefault) {
                output.add('__rt_getGlobalDefault("' + jsName + '") || ');
            }
            var idx = this.nodeCache.addObj(statement.value);
            setArgs.push(idx);
        }
        else if (createLocal) {
            output.addln('__rt_set("' + jsName + '", ');
            if (bangDefault) {
                output.add('__rt_getLocalDefault("' + jsName + '") || ');
            }
        }
        else {
            output.addln('__rt_setScoped("' + jsName + '", ');
            if (bangDefault) {
                output.add('__rt_getLocalDefault("' + jsName + '") || ');
            }
        }

        me.handleStatement(statement.value);
        if (setArgs.length) {
            output.add(', ' + setArgs.join(', '));
        }
        output.add(');');

        if (variable) {
            processed[jsName] = true;
        }

        if (variable && variable.replaces) {
            var assignment = new VariableAssignment(null, variable.replaces, new Variable(null, name));
            assignment.deprecatedAssignment = true;
            me.nodeStack.pop();
            me.handleStatement(assignment);
            me.nodeStack.push(statement);
        }

        return false;
    }

    If(statement) {
        var output = this.output;
        output.addln('if(__rt_unbox(');
        this.handleStatement(statement.condition);
        output.add(')) {');
        output.indent();
        this.handleStatements(statement.statements);
        output.unindentln('}');
        return false;
    }

    Else(statement) {
        var output = this.output;
        if (statement.condition) {
            output.addln('else if(__rt_unbox(');
            this.handleStatement(statement.condition);
            output.add(')) {');
            output.indent();
        }
        else {
            output.indentln('else {');
        }
        this.handleStatements(statement.statements);
        output.unindentln('}');
        return false;
    }

    Return(statement) {
        var isFunc = false,
            stack = this.nodeStack;
        for (var i = stack.length - 1; i >= 0; i--) {
            if (stack[i].type == 'Function') {
                isFunc = true;
                break;
            }
        }
        if (isFunc) {
            this.popScope = false;
            this.output.addln('var $$$r = ');
            this.handleStatement(statement.expr);
            this.output.add(';');
            if (this.symbols) {
                this.popCallStackScope();
            }
            this.output.addln("__rt_popScope();");
            this.output.addln('return $$$r;')
        } else {
            Fashion.warn('Ingnored @return => ', statement);
        }
        return false;
    }

    BinaryExpression(statement) {
        var me = this,
            output = me.output,
            suffix = '';

        if ((statement.operator == '-' || statement.operator == '+') && statement.left === undefined) {
            statement.left = new Constant({
                dataType: 'Number',
                value: 0
            });
        }

        var divider = ', ',
            prefix = '__rt';
        switch (statement.operator) {
            case '+':
            case '-':
            case '*':
            case '%':
            case '**':
            case '==':
            case '!=':
            case '>':
            case '<':
            case '>=':
            case '<=':
                divider = '.operate("' + statement.operator + '",';
                // output.add('__rt_operate("' + statement.operator + '", ');
                break;
            case 'and':
                output.add('__rt_and(');
                divider = '';
                prefix = '';
                break;
            case 'or':
                output.add('__rt_or(');
                divider = '';
                prefix = '';
                break;
            case '/':
                var doOperator = true,
                    isDeclaration = false,
                    isParenthetical = false,
                    isFunctionCall = false,
                    stack = this.nodeStack,
                    parent;
                for (var p = stack.length - 1; p >= 0; p--) {
                    parent = stack[p];

                    switch (parent.type) {
                        case 'Declaration':
                            isDeclaration = true;
                            break;
                        case 'ParentheticalExpression':
                            isParenthetical = true;
                            break;
                        case 'FunctionCall':
                            isFunctionCall = true;
                        default:
                            break;
                    }
                }

                doOperator = (!isDeclaration || !me.isFontDecl || isParenthetical || isFunctionCall);

                if (!doOperator) {
                    output.add('new __Literal(');
                    me.handleStatement(statement.left);
                    output.add(' + "/" + ');
                    me.handleStatement(statement.right);
                    output.add(')');
                    return false;
                } else {
                    divider = '.operate("' + statement.operator + '",';
                    // output.add('__rt_operate("' + statement.operator + '", ');
                }
                break;

            default:
                Fashion.log('Unrecognized binary expression operator: ' + statement.operator);
                break;
        }

        output.add(prefix);
        output.add(divider);
        me.handleStatement(statement.left);
        output.add(", ");
        me.handleStatement(statement.right);
        output.add(')');
        output.add(suffix);
        return false;
    }

    UnaryExpression(statement) {
        var output = this.output;
        switch (statement.operator) {
            case 'not':
                output.add('__rt_not(');
                this.handleStatement(statement.expr);
                output.add(')');
                break;

            default:
                Fashion.log('Unrecognized unary expression operator ' + statement.operator);
        }
        return false;
    }

    Variable(statement) {
        var name = statement.name,
            jsName = this.getScopeName(name);

        if (name == "$__filename") {
            this.output.add('new __Text("' + statement.file + '")');
            return;
        }
        else if (name == "$__dirname") {
            var fileName = statement.file.replace("\\", '/');
            var dirName = fileName.indexOf('/') > -1 
                ? statement.file.substring(0, fileName.lastIndexOf('/'))
                : statement.file;
            this.output.add('new __Text("' + dirName + '")');
            return;
        }
        
        if (!this.skipWarning && !(jsName in this.currentScope) && !(jsName in this.variables)) {
            this.warn([
                "Reference to undeclared variable ",
                name,
                " => ",
                statement.file,
                ":",
                statement.lineNumber
            ].join(''));
        }

        this.output.add('__rt_get("' + jsName + '")');
        return false;
    }

    Constant(statement) {
        var me = this,
            output = me.output,
            value = statement.value, regex;

        if (statement.jsonEncoded) {
            var tmp = JSON.parse(value);
            value = tmp.value;
            value = me.handleInlineExpressions(JSON.stringify(value), null, true);
        }
        else {
            value = me.handleInlineExpressions(value);
        }

        switch (statement.dataType) {
            case 'Length':
            case 'Time':
            case 'Angle':
                regex = /([0-9\.\-]+)([\w]+)$/i;
                value = value.match(regex);
                output.add('new __Numeric(' + value[1] + ', ' + '"' + value[2] + '")');
                break;

            case 'Number':
                var s = value + '';
                if (s.indexOf(".") === 0) {
                    s = '0' + s;
                }
                value = s;
                output.add('new __Numeric(' + value + ')');
                break;

            case 'Percentage':
                var s = value + '';
                if (s.indexOf(".") === 0) {
                    s = '0' + s;
                }
                value = s;
                output.add('new __Numeric(' + value.replace('%', '').replace(/\\/g, "") + ', "%")');
                break;

            case 'String':
                output.add('new __Text("' + value + '", "' + me.escapeString(statement.quoteChar) + '")');
                break;

            case 'Literal':
                if (me.booleans.hasOwnProperty(value.toLowerCase())) {
                    if (value.toLowerCase() === 'true') {
                        output.add('__True');
                    } else {
                        output.add('__False');
                    }
                }
                else if (me.colors.hasOwnProperty(value.toLowerCase())) {
                    output.add('__rt_color("' + value + '")');
                }
                else if (value == 'null') {
                    output.add('__Null');
                }
                else if (value == 'none') {
                    output.add('__None');
                }
                else {
                    if (statement.jsonEncoded) {
                        output.add('new __Literal(' + value + ')');
                    }
                    else {
                        output.add('new __Literal("' + value + '")');
                    }
                }
                break;

            case 'Color':
                output.add('__ColorRGBA.fromHex("' + value + '")');
                break;

            default:
                //Fashion.log(statement.dataType, value);
                output.add('"' + value + '"');
        }
        return false;
    }

    FunctionCall(statement) {
        var me = this,
            output = me.output,
            args = statement.args,
            id = statement.id || statement.value,
            jsId,
            reserved = {
                'if': true,
                'else': true
            };

        id = reserved[id] ? '__' + id : id;
        jsId = Fashion.getJsName(id);

        if (jsId === '__if') {
            var args = me.loadArgsArray(statement.args),
                skipWarning = this.skipWarning;

            output.add("(__rt_test(");
            me.handleStatement(args[0]);
            output.add(") ? ");

            this.skipWarning = true;

            me.handleStatement(args[1]);
            output.add(" : ");
            me.handleStatement(args[2]);
            output.add(")");

            this.skipWarning = skipWarning;
        }
        else if (me.functionDeclarations[jsId]) {
            output.add('__rt_box((__rt.functions.' + jsId + ' || ' + jsId + '__fn).apply(__rt.functions, __rt_applySpreadArgs([');
            output.indent();
            me.createCallArray(statement.args, me.functionDeclarations[jsId], id);
            output.unindent();
            output.add('])))');
        }
        else if (me.registeredDeclarations[jsId]) {
            output.add('__rt_box(__rt.registered.' + jsId + '.apply(__rt.registered, __rt_applySpreadArgs([');
            output.indent();
            me.createCallArray(statement.args, me.registeredDeclarations[jsId], id, true);
            output.unindent();
            output.add('])))');
        }
        else {
            args = this.loadArgsArray(args);
            output.add('new __FunctionCall("');
            output.add(me.handleInlineExpressions(id));
            output.add('", new __List([');
            output.indent();
            output.addln();
            for (var a = 0; a < args.length; a++) {
                var arg = args[a];
                me.handleStatement(arg);
                if (a < (args.length - 1)) {
                    output.add(',');
                    output.space();
                }
            }
            output.unindentln('], ","))');
        }
        return false;
    }

    Extend(statement) {
        this.output.addln('__rt_extendSelector(');
        this.handleStatement(statement.selector);
        this.output.add(');');
        return false;
    }

    ParentheticalExpression(statement) {
        if (this.isSelector) {
            this.output.addln('new __ParentheticalExpression(');
            this.handleStatement(statement.expr);
            this.output.add(')');
        } 
        else if (statement.expr) {
            this.handleStatement(statement.expr);
        }
        else {
            this.output.add("new __List([], ', ')");
        }
        return false;
    }

    List(statement) {
        var output = this.output,
            isMap = false;

        if (statement.items.length && statement.items[0].isKVP) {
            isMap = true;
        }

        if (!isMap) {
            output.add('new __List([');
            for (var i = 0; i < statement.items.length; i++) {
                var item = statement.items[i];
                this.handleStatement(item);
                if (i < (statement.items.length - 1)) {
                    output.add(',');
                    output.space();
                }
            }
            output.add('], "' + statement.separator + '")');
        } else {
            output.add('new __Map([');
            for (var i = 0; i < statement.items.length; i++) {
                var item = statement.items[i];
                this.handleStatement(item.variable);
                output.add(',');
                output.space();
                this.handleStatement(item);
                if (i < (statement.items.length - 1)) {
                    output.add(',');
                    output.space();
                }
            }
            output.add('])');
        }

        return false;
    }

    Warn(statement) {
        // ignore
        this.addSourceInfo();
        this.output.addln("__rt_warn(__rt_unbox(");
        this.handleStatement(statement.expr);
        this.output.add('));');
        return false;
    }

    Error(statement) {
        // ignore
        this.addSourceInfo();
        this.output.addln("__rt_error(__rt_unbox(");
        this.handleStatement(statement.expr);
        this.output.add('));');
        return false;
    }

    Debugger(statement) {
        this.output.addln("debugger;");
        return false;
    }

    Import(statement) {
        var me = this,
            output = me.output,
            source = statement.source;

        if ((source.type === 'List' || source.type === 'SelectorList') && source.separator && source.separator.indexOf(',') === 0) {
            source = source.items;
        } else {
            source = [source];
        }

        this.isSelector = statement.source;
        source.forEach((source) => {
            if (source && !/(^js[:])|(\.js$)/.test(source.value)) {
                output.addln('__rt_addDirectiveRuleset("@import", ');

                if (source.type === 'MultiPartSelector' && source.items.length === 1) {
                    source = source.items[0];
                }

                if (source && source.type === 'CompoundSelector' && source.items.length === 1) {
                    source = source.items[0];
                }

                if (!source.type || source.dataType === 'String' || source.dataType === 'Literal') {

                    if (!source.type) {
                        source = new Constant({
                            value: source,
                            dataType: 'String',
                            quoteChar: '"'
                        });
                    }

                    if (source.value.indexOf('http://') !== 0 &&
                        source.value.indexOf('//') !== 0) {
                        source = new FunctionCall(null, 'url',[
                            new FunctionCall(null, 'unquote',[
                                source
                            ])
                        ]);
                    }

                    this.handleStatement(source);
                } else {
                    this.handleStatement(source);
                }
                output.add(');');
            }
        });
        
        this.isSelector = null;

        return false;
    }

    Require(statement) {
        return false;
    }

    Assignment(statement) {
        this.output.addln('new __Literal(["');
        this.output.add(this.handleInlineExpressions(statement.id));
        this.output.add(statement.operator + '", ');
        this.handleStatement(statement.expr);
        this.output.add('].join(""))');
        return false;
    }

    Debug(statement) {
        this.output.addln("__rt_debug(__rt_unbox(");
        this.handleStatement(statement.expr);
        this.output.add("));");
    }

    Charset(statement) {
        //var output = this.output;
        //if (statement.charset) {
        //    output.addln('__rt_addDirectiveRuleset("@charset", \'');
        //    output.add('"' + statement.charset + '"');
        //    output.add('\');');
        //}
        return false;
    }

    SelectorPart(statement) {
        var output = this.output;
        output.add('new __SelectorPart(');
        this.handleStatement(statement.value);
        output.add(', "' + statement.selectorType + '")');
        return false;
    }

    CompoundSelector(statement) {
        var output = this.output;
        output.add('new __CompoundSelector([');
        for (var i = 0; i < statement.items.length; i++) {
            var item = statement.items[i];
            this.handleStatement(item);
            if (i < (statement.items.length - 1)) {
                output.add(',');
                output.space();
            }
        }
        output.add('], true)');
        return false;
    }

    MultiPartSelector(statement) {
        var output = this.output;
        output.add('new __MultiPartSelector([');
        for (var i = 0; i < statement.items.length; i++) {
            var item = statement.items[i];
            this.handleStatement(item);
            if (i < (statement.items.length - 1)) {
                output.add(',');
                output.space();
            }
        }
        output.add('])');
        return false;
    }

    SelectorList(statement) {
        var output = this.output;
        output.add('new __SelectorList([');
        for (var i = 0; i < statement.items.length; i++) {
            var item = statement.items[i];
            this.handleStatement(item);
            if (i < (statement.items.length - 1)) {
                output.add(',');
                output.space();
            }
        }
        output.add('])');
        return false;
    }

    SelectorProperty(statement) {
        var output = this.output;
        output.add('new __SelectorProperty(');
        this.handleStatement(statement.property);
        output.add(', ');
        this.handleStatement(statement.value);
        output.add(')');
        return false;
    }

    Default(statement) {
        this.warn('Unrecognized statement type: ' + statement.type + " , " + JSON.stringify(statement, null, 4));
    }

    //</editor-fold>

    error(message, data) {
        Fashion.error(message, data);
        this.errors++;
    }

    warn(message, data) {
        Fashion.warn(message, data);
        this.warnings++;
    }

    transpile(ast, disableGetter) {
        var me = this,
            preprocessor = this.preprocessor,
            sortedAst;

        me.reset();

        if (!preprocessor) {
            preprocessor = new Preprocessor();
            preprocessor.preprocess(ast);
        }

        this.preprocessor = preprocessor;

        me.functionDeclarations = preprocessor.functionDeclarations;
        me.mixinDeclarations = preprocessor.mixinDeclarations;
        me.registeredDeclarations = preprocessor.registeredDeclarations;

        me.variables = preprocessor.getVariables();
        me.dynamicVariables = preprocessor.getDynamicsMap();
        me.processedVariables = {};
        sortedAst = preprocessor.getSortedDynamicAstNodes();

        if (Array.isArray(ast)) {
            sortedAst.push.apply(sortedAst, ast);
        } else {
            sortedAst.push(ast);
        }

        me.nestedDocs = false;

        me.handleStatements(sortedAst);

        if (me.warnings) {
            Fashion.warn("Sass compilation encountered " + me.warnings + " warning(s)");
        }
        if (me.errors) {
            Fashion.raise("Sass compilation encountered " + me.errors + " error(s)");
        }
        return me.output.get().trim();
    }
}

Fashion.apply(Transpiler.prototype, {
    errors: 0,
    warnings: 0,

    preprocessor: undefined,
    output: undefined,
    currentScope: undefined,
    globalScope: undefined,
    globalVars: undefined,
    isSignatureDeclaration: undefined,
    nestedDocs: undefined,
    processingMixin: undefined,
    functionDeclarations: undefined,
    mixinDeclarations: undefined,
    registeredDeclarations: undefined,
    isFontDecl: undefined,
    isSelector: undefined,
    variables: undefined,
    dynamicVariables: undefined,

    stringCache: undefined,
    docCache: undefined,
    nodeCache: undefined,

    eachCount: undefined,
    popScope: undefined,
    generateGets: undefined,
    processedVariables: undefined,
    skipWarning: undefined,

    loadArgsArray: Preprocessor.loadArgsArray,
    colors: Color.map,
    booleans: {
        'true': true,
        'false': true
    },

    nativeCssMethods: {
        'url': true,
        'translate3d': true,
        'rotate': true,
        'scale': true,
        '-webkit-gradient': true,
        'from': true,
        'skew': true,
        'color-stop': true,
        'rect': true,
        'calc': true
    }
});

module.exports = Transpiler;
},{"./Preprocessor.js":13,"./Runtime.js":15,"./Visitor.js":18,"./export/Base.js":19,"./export/Output.js":20,"./export/type/Color.js":25,"./parse/Parser.js":55,"./parse/Scanner.js":56,"./parse/ast/Nodes.js":60}],18:[function(require,module,exports){
"use strict";

var Fashion = require('./export/Base.js'),
    Base = Fashion.Base;

class Visitor extends Base {

    constructor(config) {
        super(config);
        this.nodeStack = [];
    }

    visitComments(docs) {
        for (var d = 0; d < docs.length; d++) {
            this.Comment(docs[d]);
        }
    }

    visitItem(obj) {
        if (obj.docs && obj.docs.length) {
            this.visitComments(obj.docs);
        }
        obj.doVisit(this);
    }

    visit(obj) {
        while (obj && (obj.visitTarget !== undefined)) {
            obj = obj.visitTarget
        }
        if (obj) {
            if (Array.isArray(obj)) {
                for (var i = 0; i < obj.length; i++) {
                    this.visit(obj[i]);
                }
                return;
            }
            this.nodeStack.push(obj);
            this.visitItem(obj);
            this.nodeStack.pop();
        }
    }

    Comment(comment) {

    }

    /*
     visitEach (node, handlers) {
     this.visit(node.variable, handlers);
     this.visit(node.list, handlers);
     this.visit(node.statements, handlers);
     }

     visitFor (node, handlers) {
     this.visit(node.variable, handlers);
     this.visit(node.start, handlers);
     this.visit(node.end, handlers);
     this.visit(node.statements, handlers);
     }

     visitFunction (node, handlers) {
     this.visit(node.func, handlers);
     this.visit(node.statements, handlers);
     }

     visitRuleset (node, handlers) {
     this.visit(node.selectors, handlers);
     this.visit(node.statements, handlers);
     }

     visitMixin (node, handlers) {
     this.visit(node.name, handlers);
     this.visit(node.statements, handlers);
     }

     visitInclude (node, handlers) {
     this.visit(node.include, handlers);
     }

     visitDeclaration (node, handlers) {
     this.visit(node.property, handlers);
     this.visit(node.value, handlers);
     }

     visitVariableAssignment (node, handlers) {
     this.visit(node.value, handlers);
     }

     visitIf (node, handlers) {
     this.visit(node.condition, handlers);
     this.visit(node.statements, handlers);
     }

     visitElse (node, handlers) {
     this.visit(node.condition, handlers);
     this.visit(node.statements, handlers);
     }

     visitReturn (node, handlers) {
     this.visit(node.expr, handlers);
     }

     visitParenthetical (node, handlers) {
     this.visit(node.expr, handlers);
     }

     visitSelectorPart (node, handlers) {
     this.visit(node.value, handlers);
     }

     visitSelectorProperty(node, handlers) {
     this.visit(node.property, handlers);
     this.visit(node.value, handlers);
     }

     visitCompoundSelector(node, handlers) {
     this.visit(node.items, handlers);
     }

     visitMultiPartSelector(node, handlers) {
     this.visit(node.items, handlers);
     }

     visitSelectorList(node, handlers) {
     this.visit(node.items, handlers);
     }

     visitBinaryExpression (node, handlers) {
     this.visit(node.left, handlers);
     this.visit(node.right, handlers);
     }

     visitUnaryExpression (node, handlers) {
     this.visit(node.expr, handlers);
     }

     visitVariable (node, handlers) {
     // no child nodes to descend
     }

     visitConstant (node, handlers) {
     // no child nodes to descend
     }

     visitFunctionCall (node, handlers) {
     this.visit(node.args, handlers);
     }

     visitExtend (node, handlers) {
     // no child nodes to descend
     }

     visitList (node, handlers) {
     this.visit(node.items, handlers);
     }

     visitWarn (node, handlers) {
     // no child nodes to descend
     }

     visitImport (node, handlers) {
     this.visit(node.source, handlers);
     }

     visitRequire (node, handlers) {
     this.visit(node.source, handlers);
     }

     visitDebugger (node, handlers) {
     // no child nodes
     }
     */

    Each(obj) {
        obj.descend(this);
    }

    For(obj) {
        obj.descend(this);
    }

    While(obj) {
        obj.descend(this);
    }

    Charset(obj) {
        obj.descend(this);
    }

    Function(obj) {
        obj.descend(this);
    }

    Ruleset(obj) {
        obj.descend(this);
    }

    Mixin(obj) {
        obj.descend(this);
    }

    Block(obj) {
        obj.descend(this);
    }

    Include(obj) {
        obj.descend(this);
    }

    Declaration(obj) {
        obj.descend(this);
    }

    VariableAssignment(obj) {
        obj.descend(this);
    }

    Assignment(obj) {
        obj.descend(this);
    }

    If(obj) {
        obj.descend(this);
    }

    Else(obj) {
        obj.descend(this);
    }

    Return(obj) {
        obj.descend(this);
    }

    ParentheticalExpression(obj) {
        obj.descend(this);
    }

    SelectorPart(obj) {
        obj.descend(this);
    }

    SelectorProperty(obj) {
        obj.descend(this);
    }

    CompoundSelector(obj) {
        obj.descend(this);
    }

    MultiPartSelector(obj) {
        obj.descend(this);
    }

    SelectorList(obj) {
        obj.descend(this);
    }

    BinaryExpression(obj) {
        obj.descend(this);
    }

    UnaryExpression(obj) {
        obj.descend(this);
    }

    Variable(obj) {
        obj.descend(this);
    }

    Constant(obj) {
        obj.descend(this);
    }

    FunctionCall(obj) {
        obj.descend(this);
    }

    Extend(obj) {
        obj.descend(this);
    }

    List(obj) {
        obj.descend(this);
    }

    Warn(obj) {
        obj.descend(this);
    }

    Error(obj) {
        obj.descend(this);
    }

    Import(obj) {
        obj.descend(this);
    }

    Require(obj) {
        obj.descend(this);
    }

    Content(obj) {
        obj.descend(this);
    }

    Debugger(obj) {
        obj.descend(this);
    }

    Debug(obj) {
        obj.descend(this);
    }
}

Fashion.apply(Visitor.prototype, {
    nodeStack: null,
    skipBranching: false
});

module.exports = Visitor;
},{"./export/Base.js":19}],19:[function(require,module,exports){
/*
 * Copyright (c) 2012-2016. Sencha Inc.
 */

"use strict";

var NameConverter = require('./../NameConverter.js');

var debugging = {
    trace: false
};

class Base {
    constructor(config) {
        if (config) {
            merge(this, config);
        }
    }
}

class BaseSet {
    first() {
        return first(this.items);
    }

    last() {
        return last(this.items);
    }

    tail() {
        return tail(this.items);
    }
}

BaseSet.prototype.items = null;

function _chainFunc() {
}

function apply(target, source) {
    target = target || {};

    if (source) {
        for (var name in source) {
            target[name] = source[name];
        }
    }

    return target;
}

function merge(destination, object) {
    destination = destination || {};
    var key, value, sourceKey;

    if (object) {
        for (key in object) {
            value = object[key];
            if (value && value.constructor === Object) {
                sourceKey = destination[key];
                if (sourceKey && sourceKey.constructor === Object) {
                    merge(sourceKey, value);
                } else {
                    destination[key] = value;
                }
            } else {
                destination[key] = value;
            }
        }
    }

    return destination;
}

var chain = Object.create || function (Parent) {
        _chainFunc.prototype = Parent;
        return new _chainFunc();
    };

function createMessage(message, source) {
    if (source && source.isFashionScanner) {
        message += ': ' + source.currentFile + ':' + source.lineNumber;
    } else if (source) {
        message += ': ' + source.file + ':' + source.lineNumber;
    }

    return message;
}

function isFunction(obj) {
    return obj && typeof obj === 'function';
}

function trace(message, source) {
    if (debugging.trace) {
        console.log(createMessage('[DBG] ' + message, source));
    }
}

function debug(message, source) {
    console.log(createMessage('[DBG] ' + message, source));
}

function log(message, source) {
    console.log(createMessage('[LOG] ' + message, source));
}

function info(message, source) {
    console.log(createMessage('[INF] ' + message, source));
}

function warn(message, source) {
    console.log(createMessage('[WRN] ' + message, source));
}

function error(message, source) {
    console.log(createMessage('[ERR] ' + message, source));
}

function raise(message, extra) {
    if (Fashion.inspect) {
        debugger;
    }
    
    if (typeof message !== 'string') {
        extra = message;
        message = extra.message;
        delete extra.message;
    }
    
    var error = new Error(message);
    error.$isFashionError = true;
    throw apply(error, extra);
}

function raiseAt(message, source, stack) {
    var extra;

    if (source) {
        message = createMessage(message, source);

        if (source.isFashionScanner) {
            extra = {
                file: source.currentFile,
                lineNumber: source.lineNumber
            };
        } else {
            extra = {
                node: source,
                lineNumber: source.lineNumber,
                file: source.file
            };
        }
    }

    if (stack) {
        if (!extra) {
            extra = {};
        }
        extra.fashionStack = stack;
    }

    raise(message, extra);
}

function filter(array, func) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        if (func(item, i)) {
            result.push(item);
        }
    }
    return result;
}

function convert(array, func) {
    var converted = [];
    for (var i = 0; i < array.length; i++) {
        converted.push(func(array[i]));
    }
    return converted;
}

function first(array) {
    return array.length && array[0];
}

function last(array) {
    return array.length && array[array.length - 1];
}

function tail(array) {
    if (array.length > 2) {
        return array.slice(1);
    }
    return [];
}

function getAllKeys(obj, stop) {
    var keys = [],
        map = {},
        i, key, n, names;

    for (; obj && obj !== stop; obj = Object.getPrototypeOf(obj)) {
        names = Object.getOwnPropertyNames(obj);

        for (i = 0, n = names.length; i < n; ++i) {
            key = names[i];

            if (!map[key]) {
                map[key] = true;
                keys.push(key);
            }
        }

    }

    return keys;
}

function mixin(target, bases) {
    if (!Array.isArray(bases)) {
        bases = Array.prototype.slice.call(arguments, 1);
    }

    var proto = target.prototype;

    for (var b = 0; b < bases.length; b++) {
        var base = bases[b],
            baseProto = base.prototype;

        getAllKeys(baseProto, Base.prototype).forEach(function (name) {
            if (name in baseProto) {
                if (!(name in proto)) {
                    proto[name] = baseProto[name];
                }
            }
        });
    }
}

function flatten(array, level, output) {
    output = output || [];
    level = typeof level === 'undefined' ? 1000 : level;

    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        if (Array.isArray(item) && level) {
            flatten(item, level - 1, output);
        } else {
            output.push(item);
        }
    }
    return output;
}

module.exports = {
    EmptyArray: [],
    getJsName: NameConverter.getJsName,
    chain: chain,
    Base: Base,
    BaseSet: BaseSet,
    apply: apply,
    merge: merge,
    createMessage: createMessage,
    isFunction: isFunction,
    debugging: debugging,
    trace: trace,
    debug: debug,
    log: log,
    info: info,
    warn: warn,
    error: error,
    raise: raise,
    raiseAt: raiseAt,
    filter: filter,
    convert: convert,
    first: first,
    last: last,
    tail: tail,
    mixin: mixin,
    flatten: flatten
};



},{"./../NameConverter.js":11}],20:[function(require,module,exports){
/*
 * Copyright (c) 2012-2016. Sencha Inc.
 */

"use strict";

var Fashion = require('./Base.js'),
    Base = Fashion.Base;

class Output extends Base {

    constructor() {
        super();
        this.output = '';
    }

    space() {
        this.add(' ');
    }

    add(text) {
        this.output += text;
    }

    addComment(text) {
        this.output += text;
    }

    indent() {
        this.indentation += this.indentstr;
    }

    unindent() {
        this.indentation = this.indentation.substr(this.indentstr.length);
    }

    addln(ln) {
        this.output += '\n' + this.indentation + (ln || '');
    }

    addCommentLn(ln) {
        if (ln && ln.indexOf('//') === 0) {
            return;
        }
        this.addln(ln)
    }

    get() {
        return this.output;
    }

    indentln(ln) {
        this.addln(ln);
        this.indent();
    }

    unindentln(ln) {
        this.unindent();
        this.addln(ln);
    }

    reset() {
        this.indentation = '';
        this.output = '';
    }
}

Fashion.apply(Output.prototype, {
    indentation: '',
    output: '',
    isCompressed: false,
    indentstr: '    ',
    splitThreshold: 1000000,
    selectorCount: 0
});

module.exports = Output;
},{"./Base.js":19}],21:[function(require,module,exports){
"use strict";

var Fashion = require('./Base.js'),
    Base = Fashion.Base;

var Type = require('./type/Type.js');
var List = require('./type/List.js');
var Bool = require('./type/Bool.js');

var Color = require('./type/Color.js');
var ColorRGBA = require('./type/ColorRGBA.js');
var Text = require('./type/Text.js');

var Literal = require('./type/Literal.js');

var Statics = require('./type/Statics.js');
var TypeVisitor = require('./type/TypeVisitor.js');
var Types = require('./type/Types.js');

class Scope {
    constructor(prev) {
        this.prev = prev;
        this.map = {};
        this.sourceInfo = null;
    }

    get(name) {
        var map = this.map,
            prev = this,
            value;

        while (map) {
            value = map[name];
            if (value) {
                return value;
            }
            prev = prev.prev;
            map = prev && prev.map;
        }

        return value;
    }

    has(name) {
        //return name in this.map;
        var map = this.map,
            prev = this;

        while (map) {
            if (name in map) {
                return true;
            }
            prev = prev.prev;
            map = prev && prev.map;
        }

        return false;

    }

    put(name, value) {
        this.map[name] = value;
        return value;
    }

    addEntries(names) {
        if (this.prev) {
            this.prev.addEntries(names);
        }
        for (var name in this.map) {
            names[name] = this.map[name];
        }
    }

    getEntries(entries) {
        entries = entries || {};
        this.addEntries(entries);
        return entries;
    }
    
    getSourceInfo() {
        return this.sourceInfo;
    }
    
    getCallStack(stack) {
        stack = stack || [];
        if (this.sourceInfo) {
            stack.push(this.sourceInfo);
        }
        if (this.prev) {
            this.prev.getCallStack(stack);
        }
        return stack;
    }
}

Fashion.apply(Scope.prototype, {
    $isScope: true,
    map: undefined,
    prev: undefined,

    // placeholder used to track what to reset the _currentScope to,
    resetScope: undefined
});

class Runtime extends Base {
    constructor(config) {
        super(config);
        var me = this;
        me.mixins = {};
        me.functions = {};
        me.processors = [];
        me.registered = {
            runtime: me,
            box: Statics.boxType,
            unbox: Statics.unboxType,
            isArray: function (array) {
                return Array.isArray(array);
            },

            getRuntime: function () {
                return this.runtime;
            },

            handleArgs: function (args, keys) {
                var scope = {},
                    index = 0,
                    key;

                for (var a = 0; a < args.length; a++) {
                    var arg = args[a];
                    if (arg === undefined) {
                        continue;
                    }

                    // Named arguments
                    if (arg === true || arg === false) {
                        scope[keys[index]] = arg;
                        index++;
                    }
                    else if (arg.type === undefined) {
                        for (key in arg) {
                            scope[key.replace(/^\$/, '')] = arg[key];
                        }
                    }
                    // Required arguments
                    else {
                        key = keys[index];
                        if (key instanceof Array) {
                            key = key[0];
                            scope[key] = scope[key] || new List();
                            scope[key].add(arg);
                        }
                        else {
                            scope[key] = arg;
                            index++;
                        }
                    }
                }
                return scope;
            },

            sliceArgs: function (args, start, end) {
                return this.getRuntime().sliceArgs(args, start, end).items;
            },

            tailArgs: function (start, args) {
                var tail = Array.prototype.slice.call(args, start);

                if (tail.length == 1 && this.isArray(tail)) {
                    tail = tail[0];
                }

                return tail;
            }
        };
    }

    bool(value) {
        return new Bool(value);
    }

    color(name) {
        var rgb = Color.map[name],
            color = new ColorRGBA(rgb[0], rgb[1], rgb[2], rgb[3]);
        color.stringified = name;
        return color;
    }

    quote(value) {
        if (value.type === 'string') {
            return value;
        }

        return new Text(value.toString());
    }

    unquote(value) {
        if (value.$isFashionType) {
            return value.unquote();
        }
        return new Literal(value.toString());
    }

    not(expression) {
        return this.box(this.unbox(expression) == false);
    }
    
    operate(operation, left, right) {
        if (left == null || left.$isFashionNull) {
            if (operation != '==' && operation != '!=') {
                return Literal.Null;
            }
        }
        if (right == null || right .$isFashionNull) {
            if (operation != '==' && operation != '!=') {
                return Literal.Null;
            }
        }
        return left.operate(operation, right);
    }

    reset() {
        this._currentScope = null;
        this._currentCallStackScope = this.createCallStackScope();
        this._globalScope = this.createScope();
        this._dynamics = {};
    }

    run(code, metadata) {
        this.load(code);
        this.compile(code);
        return this.execute(metadata);
    }


    createTypesBlock (types) {
        types = types || this.types;
        var keys = Object.getOwnPropertyNames(types),
            buff = [],
            name;
        for (var i = 0; i < keys.length; i++) {
            name = keys[i];
            buff.push(name + ' = Types.' + name);
            buff.push("__" + name + ' = ' + name);
        }

        if (buff.length === 0) {
            return '';
        }
        return 'var ' + buff.join(',\n    ') + ';\n';
    }

    createMethodBlock (proto) {
        proto = proto || this.constructor.prototype;

        var buff = [],
            keys, name;

        while(proto) {
            keys = Object.getOwnPropertyNames(proto);
            for (var i = 0; i < keys.length; i++) {
                name = keys[i];
                if (typeof proto[name] === 'function') {
                    buff.push("__rt_" + name + ' = __rt.' + name + '.bind(__rt)');
                }
            }
            proto = Object.getPrototypeOf(proto);
        }

        if (buff.length === 0) {
            return '';
        }
        return 'var ' + buff.join(',\n    ') + ';\n';
    }

    createPropertyBlock() {
        var keys = Object.getOwnPropertyNames(this),
            buff = [],
            name;
        for (var i = 0; i < keys.length; i++) {
            name = keys[i];
            buff.push("__rt_" + name + ' = __rt.' + name);
        }
        
        if (buff.length === 0) {
            return '';
        }
        return 'var ' + buff.join(',\n    ') + ';\n';
    }

    createPrefixedFunctionBody(code) {
        code = this.createTypesBlock() +
            this.createMethodBlock() +
            this.createPropertyBlock() +
            code;
        return code;
    }

    createWrappedFn(code) {
        return new Function('Types', '__rt', '__gs', '__udf', '__dyn', this.createPrefixedFunctionBody(code));
    }

    callWrappedFn(fn, dynamics) {
        return fn(Fashion, this, this._globalScope, undefined, dynamics || {});
    }

    compile(code) {
        var me = this,
            theFn;

        //code = '"use strict";\n' + code;
        this.code = code;

        new Function();

        theFn = this.createWrappedFn(code);

        this.fn = function (rt, overrides, dyn) {
            var runtime = rt || me,
                dynamics = dyn || {};

            runtime.reset();

            if (overrides) {
                if (overrides.$isScope) {
                    runtime._globalScope = overrides;
                } else {
                    runtime._globalScope.map = overrides;
                }
            }

            if (dyn) {
                runtime._dynamics = dyn;
            }
            runtime._currentScope = runtime._globalScope;
            runtime._scopeStack = [runtime._currentScope];
            try {
                theFn(me.types, runtime, runtime._globalScope, undefined, dynamics);
            }
            catch (err) {
                Fashion.raiseAt(err.message || err, null, runtime.getCallStack());
            }

            return runtime._globalScope;
        };

        return this.fn;
    }

    execute(metadata) {
        return this.fn(this, metadata);
    }

    load(code) {
        this.code = code;
        return this;
    }

    registerProcessor(proc) {
        this.processors.push(new TypeVisitor(proc));
    }

    register(methods) {
        if (methods['dynamic']) {
            Fashion.error('Cannot register javascript function named "dynamic"');
            delete methods['dynamic'];
        }
        if (methods['require']) {
            Fashion.error('Cannot register javascript function named "require"');
            delete methods['require'];
        }
        Fashion.apply(this.registered, methods);
    }

    isRegistered(name) {
        name = this.reserved[name] ? '__' + name : name;
        return !!this.registered[name];
    }

    getGlobalScope() {
        return this._globalScope;
    }

    getCurrentScope() {
        return this._currentScope;
    }

    getRegisteredFunctions() {
        return this.registered;
    }

    getFunctions() {
        return this.functions;
    }

    getMixins() {
        return this.mixins;
    }

    createScope(scope) {
        var currScope = scope || this._currentScope,
            newScope = new Scope(currScope);
        return this.pushScope(newScope);
    }

    pushScope(scope) {
        scope.resetScope = this._currentScope;
        this._currentScope = scope;
        return scope;
    }

    popScope() {
        this._currentScope = this._currentScope.resetScope;
        return this._currentScope;
    }

    createCallStackScope(scope) {
        var currScope = scope || this._currentCallStackScope,
            newScope = new Scope(currScope);
        return this.pushCallStackScope(newScope);
    }

    pushCallStackScope(scope) {
        scope.resetScope = this._currentCallStackScope;
        this._currentCallStackScope = scope;
        return scope;
    }

    popCallStackScope() {
        this._currentCallStackScope = this._currentCallStackScope.resetScope;
        return this._currentCallStackScope;
    }

    getCallStack() {
        if (this._currentCallStackScope) {  
            return this._currentCallStackScope.getCallStack();
        }
        return null;
    }


    pushSourceInfo(info) {
        if (this._currentCallStackScope) {
            this._currentCallStackScope.sourceInfo = info;
        }
        return true;
    }
    
    getSourceInfo() {
        var stack = this._currentCallStackScope,
            info = stack && stack.sourceInfo;
        
        if (info && info.length) {
            return {
                lineNumber: info[0],
                file: info[1]
            };
        }
        return null;
    }

    get(name) {
        var scope = this.getScopeForName(name),
            res = scope.map[name];

        if (typeof res === 'undefined') {
            if (!(name in scope.map)) {
                Fashion.raiseAt('Reference to undeclared variable : ' + name, null, this.getCallStack());
            }
        }

        return this.box(res);
    }

    getScopeForName (jsName) {
        var scope = this._currentScope;
        while (scope) {
            if (jsName in scope.map) {
                return scope;
            }
            scope = scope.prev;
        }
        return this._currentScope;
    }

    getDefault(val) {
        if (val == null || typeof val === 'undefined') { // === null || undefined
            return undefined;
        }

        if (val.$isFashionNull) {
            if (this.constructor.allowNullDefaults) {
                return val;
            }
            return undefined;
        }

        return this.box(val);
    }

    getGlobalDefault(jsName) {
        var obj = this._globalScope.get(jsName);
        return this.getDefault(obj);
    }

    getLocalDefault(jsName) {
        var obj = this._currentScope.get(jsName);
        return this.getDefault(obj);
    }

    setGlobal(jsName, value, astNodeId) {
        var currScope = this._globalScope;

        if (!value || !value.$isFashionLiteral) {
            value = this.box(value);
        }

        value.ast = value.ast || this.getAstNode(astNodeId);
        currScope.map[jsName] = value;
        return value;
    }

    setDynamic(name, value, astNodeId) {
        var jsName = Fashion.getJsName(name),
            currScope = this._globalScope,
            newValue;

        if (!value || !value.$isFashionLiteral) {
            value = this.box(value);
        }

        value.ast = value.ast || this.getAstNode(astNodeId);

        if (value.$referenceName || value.$constant) {
            newValue = value.clone();
            newValue.$previousReference = value;
            value = newValue;
            value.ast = this.getAstNode(astNodeId);
        }
        else {
            value.$referenceName = name;
        }

        currScope.map[jsName] = value;
        return value;
    }

    setScoped (jsName, value) {
        var currScope = this.getScopeForName(jsName);

        if (!value || !value.$isFashionLiteral) {
            value = this.box(value);
        }

        currScope.map[jsName] = value;
        return value;
    }

    set (jsName, value) {
        var currScope = this._currentScope;

        if (!value || !value.$isFashionLiteral) {
            value = this.box(value);
        }

        currScope.map[jsName] = value;
        return value;
    }

    getDocs(id) {
        if (this.docCache) {
            return this.docCache.get(id);
        }
    }

    getString(id) {
        if (this.stringCache) {
            return this.stringCache.get(id);
        }
    }

    getAstNode(id) {
        if (this.nodeCache) {
            return this.nodeCache.get(id);
        }
    }

    applySpread(arg) {
        arg.spread = true;
        return arg;
    }

    sliceArgs(args, start, end) {
        start = start || 0;
        end = end || args.length;

        var filtered = [],
            newArgs = [],
            separator = ', ',
            spread, a, arg;

        for (a = start; a < end; a++) {
            arg = args[a];
            if (!arg) {
                if (!spread) {
                    filtered.push(arg);
                }
                continue;
            }
            if (arg.spread && arg.$isFashionList) {
                if (spread) {
                    filtered.push(spread);
                }
                spread = arg;
                separator = spread.separator || separator;
            } else {
                filtered.push(arg);
            }
        }

        for (a = 0; a < filtered.length; a++) {
            arg = filtered[a];
            separator = (arg && arg.splatSeparator) || separator;
            newArgs.push(filtered[a]);
        }

        if (spread) {
            newArgs.push.apply(newArgs, spread.items);
        }

        return new List(newArgs, separator);
    }

    applySpreadArgs(args, name) {
        var newArgs = [], 
            hadSpread = false,
            offset = 0,
            arg, a, item, i, items, key, map, defaults, proc, param, paramName;

        proc = this.context && this.context.preprocessor;
        if (proc) {
            defaults = proc.mixinDeclarations[name];
            
            if (defaults) {
                offset = 1;
            }
            else {
                defaults = proc.functionDeclarations[name]
            }

            defaults = defaults && defaults.parameters;
        }

        for (a = 0; a < args.length; a++) {
            arg = args[a];
            if (arg && arg.spread && arg.$isFashionMap && defaults) {
                items = arg.items;
                map = {};
                for (key in arg.map) {
                    map['$' + Fashion.getJsName(key)] = arg.map[key];
                }
                
                for (var p = 0; p < defaults.length; p++) {
                    param = defaults[p];
                    paramName = Fashion.getJsName(param.name);
                    if (paramName in map) {
                        newArgs.push(items[map[paramName]]);
                        delete map[paramName];
                    }
                    else if (!param.varArgs) {
                        newArgs.push(undefined);
                    }
                }
                for (key in map) {
                    item = items[map[key]];
                    newArgs.push(item);
                }                
                hadSpread = true;
            }
            else if (arg && arg.spread && arg.$isFashionList) {
                items = arg.getItems();
                for (i = 0; i < items.length; i++) {
                    item = items[i];
                    item && (item.splatSeparator = arg.separator);
                    newArgs.push(item);
                }
                hadSpread = true;
            } else if (arg || !hadSpread) {
                newArgs.push(arg);
            }
            // clear the flag indicating the spread argument
            // so subsequent calls using this same variable will not
            // be contaminated
            arg && (arg.spread = undefined);
        }
        
        var misisngParams = this.context && this.context.missingParameters;
        
        if (misisngParams && (misisngParams == 'error')) {
            if (defaults) {
                for (var d = 0; d < defaults.length; d++) {
                    if (!defaults[d].hasOwnProperty('default') && !defaults[d].varArgs) {
                        if (newArgs[d + offset] === undefined) {
                            Fashion.raiseAt("No value supplied for argument : " + defaults[d].name, null, this.getCallStack());
                        }
                    }
                }
            }
        }
        return newArgs;
    }

    warn(arg) {
        Fashion.warn(arg, this.getSourceInfo());
    }

    error(arg) {
        Fashion.raiseAt(arg, null, this.getCallStack());
    }

    debug() {
        Fashion.debug.apply(Fashion, arguments);
    }

    setCaches (transpiler) {
        this.docCache = transpiler.docCache;
        this.stringCache = transpiler.stringCache;
        this.nodeCache = transpiler.nodeCache;
    }

    copyRuntimeState (runtime) {
        this._dynamics = runtime._dynamics;
        this.registered = runtime.registered;
        this.functions = runtime.functions;
        this.mixins = runtime.mixins;
    }


    test (val) {
        val = this.unbox(val);
        if (val == null || val === false) {
            return false;
        }
        return true;
    }

    and (a, b) {
        if (this.test(a)) {
            return b;
        }
        return a;
    }

    or (a, b) {
        if (this.test(a)) {
            return a;
        }
        return b;
    }
}

Fashion.apply(Runtime.prototype, {
    box: Type.box,
    unbox: Type.unbox,
    Scope: Scope,

    isFashionRuntime: true,
    functions: null,
    code: null,
    fn: null,

    stringCache: null,
    docCache: null,
    types: Types,

    _globalScope: null,
    _currentScope: null,
    _dynamics: null,
    context: null,
    reserved: {
        'if': true,
        'else': true
    }
});

module.exports = Runtime;
},{"./Base.js":19,"./type/Bool.js":24,"./type/Color.js":25,"./type/ColorRGBA.js":27,"./type/List.js":31,"./type/Literal.js":32,"./type/Statics.js":38,"./type/Text.js":39,"./type/Type.js":40,"./type/TypeVisitor.js":41,"./type/Types.js":42}],22:[function(require,module,exports){
"use strict";

var Fashion = require('../Base.js');
var Runtime = require('../Runtime.js');
var ValueParser = require('../parse/ValueParser.js');
var SourceBuilder = require('../type/SourceBuilder.js');

class CssVariableManager {

    constructor () {
        this.reset();
    }

    reset () {
        this.initFns = [];
        this.calcFns = [];
        this.variableMap = {};
        this.runtime = null;
    }

    createRuntime () {
        return new Runtime();
    }

    getRuntime () {
        var me = this,
            rt = me.runtime;
        if (!rt) {
            rt = me.createRuntime();
            for(var i = 0; i < me.initFns.length; i++) {
                me.initFns[i](rt);
            }
            me.runtime = rt;
        }
        return rt;
    }

    calculate (vars) {
        var me = this,
            rt = me.getRuntime(),
            globals = {},
            parser = new ValueParser(),
            map = me.variableMap,
            key, scope, sb, name, names, jsName, value, wrapper;

        scope = new rt.Scope();
        for (name in vars) {
            key = Fashion.getJsName(name.replace(me.nameRe, ''));
            if (key.indexOf('$') !== 0) {
                key = '$' + key;
            }
            scope.put(key, parser.parse(vars[name]));
        }

        rt._globalScope = scope;
        rt._currentScope = scope;
        for (var i = 0; i < me.calcFns.length; i++) {
            me.calcFns[i](rt);
        }

        sb = new SourceBuilder();

        vars = {};
        for (name in map) {
            names = map[name];
            for (var i = 0; i < names.length; i++) {
                key = names[i];
                jsName = '$' + Fashion.getJsName(key);
                value = scope.get(jsName);
                if (value) {
                    if (value.$isWrapper) {
                        value = value.value;
                    }
                    vars[key] = sb.toSource(value);
                }
            }
        }

        return vars;
    }

    applyVariables (vars) {
        var me = this,
            map = me.variableMap;

        for (var selector in map) {
            var variables = map[selector];
            var els = document.querySelectorAll(selector);
            if (els) {
                for (var i = 0; i < els.length; i++) {
                    for (var j = 0; j < variables.length; j++) {
                        var varName = variables[j];
                        els[i].style.setProperty('--' + varName, vars[varName]);
                    }
                }
            }
        }
    }

    setVariables (vars) {
        this.applyVariables(this.calculate(vars));
    }

    register (init, calc, map) {
        if (init) {
            this.initFns.push(init);
        }

        if (calc) {
            this.calcFns.push(calc);
        }

        if (map) {
            var vars = this.variableMap;
            for (var name in map) {
                var curr = vars[name];
                if (!curr) {
                    vars[name] = map[name];
                }
                else {
                    curr.push.apply(curr, map[name]);
                }
            }
        }
    }

    buildName (name) {
        return name.replace(/^--/, '').replace(/^\$/, '');
    }

    buildJsName (name) {
        return Fashion.getJsName(name)
    }

    buildNames (names) {
        var out = {}, name;
        for (name in names) {
            out[name] = this.buildName(names[name]);
        }
        return out;
    }

    buildJsNames (names) {
        var out = {}, name;
        for (name in names) {
            out[name] = this.buildJsName(names[name]);
        }
        return out;
    }

    getVariables () {
        var me = this,
            map = me.variableMap,
            out = {};

        for (var selector in map) {
            var variables = map[selector];
            var els = document.querySelectorAll(selector);
            if (els) {
                for (var i = 0; i < els.length; i++) {
                    for (var j = 0; j < variables.length; j++) {
                        var varName = variables[j];
                        out[varName] = els[i].style.getPropertyValue('--' + varName);
                    }
                }
            }
        }
        return out;
}
}

Fashion.apply(CssVariableManager.prototype, {
    $isExport: true,
    nameRe: /^--/
});

module.exports = CssVariableManager;
},{"../Base.js":19,"../Runtime.js":21,"../parse/ValueParser.js":23,"../type/SourceBuilder.js":37}],23:[function(require,module,exports){
"use strict";

var Fashion = require('../Base.js');
var Type = require('../type/Type.js');
var Statics = require('../type/Statics.js');
var Types = require('../type/Types.js'),
    Color = Types.Color,
    Text = Types.Text,
    Numeric = Types.Numeric,
    List = Types.List,
    Bool = Types.Bool,
    Literal = Types.Literal,
    ColorRGBA = Types.ColorRGBA,
    ColorHSLA = Types.ColorHSLA,
    FunctionCall = Types.FunctionCall;

class Parser {

    constructor () {
        this.index = 0;
    }
    
    _advance () {
        var me = this,
            buff = '',
            str = me.str,
            len = str.length,
            isString = false,
            escaped = false,
            isParen = 0,
            ch;

        while(me.index < len) {
            ch = str[me.index];
            me.index++;

            // whitespace
            if (ch <= ' ') {
                if (!isString && !isParen) {
                    if (buff.length) {
                        break;
                    }
                    continue;
                }
            }

            // terminal char
            if (ch === ';' && !isString && !escaped) {
                break;
            }

            if (ch === '(') {
                isParen++;
            }

            if (ch === ')') {
                isParen && isParen--;
            }

            if (ch === ',' && !isString && !escaped && !isParen) {
                if (buff.length) {
                    me.index--;
                    break;
                }
                else {
                    return ch;
                }
            }

            if (ch === '\\') {
                if (isString) {
                    escaped = 1;
                    me.index++;
                    continue;
                }
            }

            if (ch === '"' || ch === "'") {
                if(!isString) {
                    isString = ch;
                }
                else if (isString === ch) {
                    isString = false;
                }
            }

            escaped = false;
            buff += ch;
        }

        return buff;
    }


    parseValue (token) {
        var rx = {
                number: /^(\d+)(px|pt|pc|cm|mm|in|em|rem|ex)?$/g,
                shortHexColor: /^#([A-Fa-f0-9]{3})$/,
                longHexColor: /^#([A-Fa-f0-9]{6})$/,
                functionCall: /^([A-Za-z0-9_]+)\((.*)\)$/,
                parenList: /^\((.*?)\)$/,

            },
            match, value;

        if (token[0] === '"' || token[0] === "'") {
            value = token = token.substring(1, token.length - 1);
            return new Text(value, token[0]);
        }

        if (token === 'true') {
            return new Bool(true);
        }

        if (token === 'false') {
            return new Bool(false);
        }

        if (token === 'null') {
            return Literal.Null;
        }

        if (token === 'none') {
            return Literal.None;
        }

        if (Fashion.Color.map[token]) {
            var rgb = Color.map[token],
                color = new ColorRGBA(rgb[0], rgb[1], rgb[2], rgb[3]);
            color.stringified = token;
            return color;
        }

        if (match = rx.number.exec(token)) {
            return new Numeric(parseFloat(match[1]), match[2]);
        }

        if (match = rx.shortHexColor.exec(token)) {
            return ColorRGBA.fromHex(match[1]);
        }

        if (match = rx.longHexColor.exec(token)) {
            return ColorRGBA.fromHex(match[1]);
        }

        if (match = rx.functionCall.exec(token)) {
            var name = match[1],
                args = this.parse(match[2]).items;
            if (name === 'hsla' || name === 'hsl') {
                return new ColorHSLA(
                    Type.unbox(args[0]),
                    Type.unbox(args[1]),
                    Type.unbox(args[2]),
                    Type.unbox(args[3]) || 1);
            }
            else if(name === 'rgba' || name === 'rgb') {
                return new ColorRGBA(
                    Type.unbox(args[0]),
                    Type.unbox(args[1]),
                    Type.unbox(args[2]),
                    Type.unbox(args[3]) || 1);
            }
            return new FunctionCall(name, args);
        }

        if (match = rx.parenList.exec(token)) {
            return new FunctionCall(this.parse(match[1]));
        }

        return new Fashion.Literal(token);
    }

    parse (str) {
        var me = this,
            tokens = [],
            values = [],
            csv = null,
            token;

        me.str = str;
        me.index = 0;

        while (token = me._advance()) {
            tokens.push(token);
        }


        for (var i = 0; i < tokens.length; i++) {
            token = tokens[i].trim();
            if (tokens[i+1] === ',') {
                csv = csv || [];
                csv.push(me.parseValue(token));
                i++;
            }
            else if (csv) {
                csv.push(me.parseValue(token));
                values.push(new List(csv, ', '));
                csv = null;
            }
            else {
                values.push(me.parseValue(token));
            }
        }

        if (values.length === 1) {
            return values[0];
        }

        return new List(values, ' ');
    }
}

// Fashion.apply(Parser.prototype, {
//     regex:
// });

module.exports = Parser;
},{"../Base.js":19,"../type/Statics.js":38,"../type/Type.js":40,"../type/Types.js":42}],24:[function(require,module,exports){
/*
 * Copyright (c) 2012-2016. Sencha Inc.
 */

"use strict";

var Fashion = require('../Base.js');
var Type = require('./Type.js');

class Bool extends Type {

    constructor(value) {
        super();
        this.value = !!value;
    }

    doVisit(visitor) {
        visitor.bool(this);
    }

    toString() {
        return this.value ? 'true' : 'false';
    }

    copy() {
        return new Bool(this.value);
    }
}

Fashion.apply(Bool.prototype, {
    type: 'bool',
    $isFashionBool: true,
    value: null
});

Bool.True = new Bool(true);
Bool.True.$constant = true;

Bool.False = new Bool(false);
Bool.False.$constant = true;

module.exports = Bool;

},{"../Base.js":19,"./Type.js":40}],25:[function(require,module,exports){
/*
 * Copyright (c) 2012-2016. Sencha Inc.
 */

"use strict";

var Fashion = require('../Base.js');
var Type = require('./Type.js');
var Bool = require('./Bool.js');
var Numeric = require('./Numeric.js');

class Color extends Type {
    constructor() {
        super()
    }

    toBoolean() {
        return Bool.True;
    }

    // These two references need to be left out of the comment section above
    // so as to prevent ordering issue during builds;
    getRGBA() {
        return this;
    }

    getHSLA() {
        return this;
    }

    static component(color, component) {
        var unit = Color.units[component],
            type = Color.types[component],
            prop = Color.comps[component],
            targetColor;

        if (type == 'hsla') {
            targetColor = color.getHSLA();
        } else {
            targetColor = color.getRGBA();
        }

        return new Numeric(targetColor[prop], unit);
    }

    static adjust(color, component, amount) {
        var hsl = color.getHSLA().copy(),
            prop = Color.comps[component],
            value = amount.value;

//    if (component === 'saturation' && hsl.s === 0)  {
//        return color.clone();
//    }
//
        hsl[prop] += value;

        hsl.h = Color.constrainDegrees(hsl.h);
        hsl.s = Color.constrainPercentage(hsl.s);
        hsl.l = Color.constrainPercentage(hsl.l);

        return hsl.getRGBA();
    }

    static constrainChannel(channel) {
        return Math.max(0, Math.min(channel, 255));
    }

    static constrainPercentage(per) {
        return Math.max(0, Math.min(per, 100));
    }

    static constrainDegrees(deg) {
        deg = deg % 360;
        return (deg < 0) ? (360 + deg) : deg;
    }

    static constrainAlpha(alpha) {
        if (alpha === undefined) {
            return 1;
        }
        return Math.max(0, Math.min(alpha, 1));
    }
}

Fashion.apply(Color, {
    units: {
        lightness: '%',
        saturation: '%',
        hue: 'deg'
    },

    types: {
        red: 'rgba',
        blue: 'rgba',
        green: 'rgba',
        alpha: 'rgba',
        hue: 'hsla',
        saturation: 'hsla',
        lightness: 'hsla'
    },

    comps: {
        red: 'r',
        green: 'g',
        blue: 'b',
        alpha: 'a',
        hue: 'h',
        saturation: 's',
        lightness: 'l'
    },

    map: {
        aliceblue: [240, 248, 255],
        antiquewhite: [250, 235, 215],
        aqua: [0, 255, 255],
        aquamarine: [127, 255, 212],
        azure: [240, 255, 255],
        beige: [245, 245, 220],
        bisque: [255, 228, 196],
        black: [0, 0, 0],
        blanchedalmond: [255, 235, 205],
        blue: [0, 0, 255],
        blueviolet: [138, 43, 226],
        brown: [165, 42, 42],
        burlywood: [222, 184, 135],
        cadetblue: [95, 158, 160],
        chartreuse: [127, 255, 0],
        chocolate: [210, 105, 30],
        coral: [255, 127, 80],
        cornflowerblue: [100, 149, 237],
        cornsilk: [255, 248, 220],
        crimson: [220, 20, 60],
        cyan: [0, 255, 255],
        darkblue: [0, 0, 139],
        darkcyan: [0, 139, 139],
        darkgoldenrod: [184, 132, 11],
        darkgray: [169, 169, 169],
        darkgreen: [0, 100, 0],
        darkgrey: [169, 169, 169],
        darkkhaki: [189, 183, 107],
        darkmagenta: [139, 0, 139],
        darkolivegreen: [85, 107, 47],
        darkorange: [255, 140, 0],
        darkorchid: [153, 50, 204],
        darkred: [139, 0, 0],
        darksalmon: [233, 150, 122],
        darkseagreen: [143, 188, 143],
        darkslateblue: [72, 61, 139],
        darkslategray: [47, 79, 79],
        darkslategrey: [47, 79, 79],
        darkturquoise: [0, 206, 209],
        darkviolet: [148, 0, 211],
        deeppink: [255, 20, 147],
        deepskyblue: [0, 191, 255],
        dimgray: [105, 105, 105],
        dimgrey: [105, 105, 105],
        dodgerblue: [30, 144, 255],
        firebrick: [178, 34, 34],
        floralwhite: [255, 255, 240],
        forestgreen: [34, 139, 34],
        fuchsia: [255, 0, 255],
        gainsboro: [220, 220, 220],
        ghostwhite: [248, 248, 255],
        gold: [255, 215, 0],
        goldenrod: [218, 165, 32],
        gray: [128, 128, 128],
        green: [0, 128, 0],
        greenyellow: [173, 255, 47],
        grey: [128, 128, 128],
        honeydew: [240, 255, 240],
        hotpink: [255, 105, 180],
        indianred: [205, 92, 92],
        indigo: [75, 0, 130],
        ivory: [255, 255, 240],
        khaki: [240, 230, 140],
        lavender: [230, 230, 250],
        lavenderblush: [255, 240, 245],
        lawngreen: [124, 252, 0],
        lemonchiffon: [255, 250, 205],
        lightblue: [173, 216, 230],
        lightcoral: [240, 128, 128],
        lightcyan: [224, 255, 255],
        lightgoldenrodyellow: [250, 250, 210],
        lightgray: [211, 211, 211],
        lightgreen: [144, 238, 144],
        lightgrey: [211, 211, 211],
        lightpink: [255, 182, 193],
        lightsalmon: [255, 160, 122],
        lightseagreen: [32, 178, 170],
        lightskyblue: [135, 206, 250],
        lightslategray: [119, 136, 153],
        lightslategrey: [119, 136, 153],
        lightsteelblue: [176, 196, 222],
        lightyellow: [255, 255, 224],
        lime: [0, 255, 0],
        limegreen: [50, 205, 50],
        linen: [250, 240, 230],
        magenta: [255, 0, 255],
        maroon: [128, 0, 0],
        mediumaquamarine: [102, 205, 170],
        mediumblue: [0, 0, 205],
        mediumorchid: [186, 85, 211],
        mediumpurple: [147, 112, 219],
        mediumseagreen: [60, 179, 113],
        mediumslateblue: [123, 104, 238],
        mediumspringgreen: [0, 250, 154],
        mediumturquoise: [72, 209, 204],
        mediumvioletred: [199, 21, 133],
        midnightblue: [25, 25, 112],
        mintcream: [245, 255, 250],
        mistyrose: [255, 228, 225],
        moccasin: [255, 228, 181],
        navajowhite: [255, 222, 173],
        navy: [0, 0, 128],
        oldlace: [253, 245, 230],
        olive: [128, 128, 0],
        olivedrab: [107, 142, 35],
        orange: [255, 165, 0],
        orangered: [255, 69, 0],
        orchid: [218, 112, 214],
        palegoldenrod: [238, 232, 170],
        palegreen: [152, 251, 152],
        paleturquoise: [175, 238, 238],
        palevioletred: [219, 112, 147],
        papayawhip: [255, 239, 213],
        peachpuff: [255, 218, 185],
        peru: [205, 133, 63],
        pink: [255, 192, 203],
        plum: [221, 160, 203],
        powderblue: [176, 224, 230],
        purple: [128, 0, 128],
        red: [255, 0, 0],
        rosybrown: [188, 143, 143],
        royalblue: [65, 105, 225],
        saddlebrown: [139, 69, 19],
        salmon: [250, 128, 114],
        sandybrown: [244, 164, 96],
        seagreen: [46, 139, 87],
        seashell: [255, 245, 238],
        sienna: [160, 82, 45],
        silver: [192, 192, 192],
        skyblue: [135, 206, 235],
        slateblue: [106, 90, 205],
        slategray: [119, 128, 144],
        slategrey: [119, 128, 144],
        snow: [255, 255, 250],
        springgreen: [0, 255, 127],
        steelblue: [70, 130, 180],
        tan: [210, 180, 140],
        teal: [0, 128, 128],
        thistle: [216, 191, 216],
        tomato: [255, 99, 71],
        turquoise: [64, 224, 208],
        violet: [238, 130, 238],
        wheat: [245, 222, 179],
        white: [255, 255, 255],
        whitesmoke: [245, 245, 245],
        yellow: [255, 255, 0],
        yellowgreen: [154, 205, 5],
        transparent: [0, 0, 0, 0]
    }
});

Fashion.apply(Color.prototype, {
    type: 'color',
    $isFashionColor: true,
    $isFashionRGBA: false,
    $isFashionHSLA: false,
    $canUnbox: false
});

module.exports = Color;

},{"../Base.js":19,"./Bool.js":24,"./Numeric.js":34,"./Type.js":40}],26:[function(require,module,exports){
/*
 * Copyright (c) 2012-2016. Sencha Inc.
 */

"use strict";

var Fashion = require('../Base.js');
var Color = require('./Color.js');
var ColorRGBA = require('./ColorRGBA.js');

class ColorHSLA extends Color {
    constructor(h, s, l, a) {
        super();
        this.h = Color.constrainDegrees(h);
        this.s = s;
        this.l = l;
        if (a !== undefined) {
            this.a = a;
        }
    }

    doVisit(visitor) {
        visitor.hsla(this);
    }

    operate(operation, right) {
        return this.getRGBA().operate(operation, right);
    }

    copy() {
        return new ColorHSLA(this.h, this.s, this.l, this.a);
    }

    getRGBA() {
        return ColorRGBA.fromHSLA(this);
    }

    toString() {
        return this.getRGBA().toString();
    }

    add(h, s, l, a) {
        return new ColorHSLA(
            Color.constrainDegrees(this.h + h),
            Color.constrainPercentage(this.s + s),
            Color.constrainPercentage(this.l + l),
            Color.constrainAlpha(this.a * a)
        );
    }

    subtract(h, s, l) {
        return this.add(-h, -s, -l);
    }

    adjustLightness(percent) {
        this.l = Color.constrainPercentage(this.l + percent);
        return this;
    }

    adjustHue(deg) {
        this.h = Color.constrainDegrees(this.h + deg);
        return this;
    }

    static fromRGBA(rgba) {
        if (rgba.$isFashionHSLA) {
            return rgba.clone();
        }

        var r = rgba.r / 255,
            g = rgba.g / 255,
            b = rgba.b / 255,
            a = rgba.a,
            max = Math.max(r, g, b),
            min = Math.min(r, g, b),
            delta = max - min,
            h = 0,
            s = 0,
            l = 0.5 * (max + min);

        // min==max means achromatic (hue is undefined)
        if (min != max) {
            s = (l < 0.5) ? delta / (max + min) : delta / (2 - max - min);
            if (r == max) {
                h = 60 * (g - b) / delta;
            } else if (g == max) {
                h = 120 + 60 * (b - r) / delta;
            } else {
                h = 240 + 60 * (r - g) / delta;
            }
            if (h < 0) {
                h += 360;
            }
            if (h >= 360) {
                h -= 360;
            }
        }

        return new ColorHSLA(
            Color.constrainDegrees(h),
            Color.constrainPercentage(s * 100),
            Color.constrainPercentage(l * 100),
            a
        );
    }
}

ColorRGBA.prototype.getHSLA = function () {
    return ColorHSLA.fromRGBA(this);
};

Fashion.apply(ColorHSLA.prototype, {
    type: 'hsla',
    $isFashionHSLA: true,
    h: null,
    s: null,
    l: null,
    a: 1
});

module.exports = ColorHSLA;

},{"../Base.js":19,"./Color.js":25,"./ColorRGBA.js":27}],27:[function(require,module,exports){
/*
 * Copyright (c) 2012-2016. Sencha Inc.
 */

"use strict";

var Fashion = require('../Base.js');
var Color = require('./Color.js');

function hex2(v) {
    var s = v.toString(16);
    if (s.length < 2) {
        s = '0' + s;
    }
    return s;
}

class ColorRGBA extends Color {
    constructor(r, g, b, a) {
        super();
        this.r = Math.min(0xff, Math.max(0, r));
        this.g = Math.min(0xff, Math.max(0, g));
        this.b = Math.min(0xff, Math.max(0, b));
        if (a !== undefined) {
            this.a = Math.min(1.0, Math.max(0.0, a));
        }
    }

    doVisit(visitor) {
        visitor.rgba(this);
    }

    copy() {
        return new ColorRGBA(this.r, this.g, this.b, this.a);
    }

    getHSLA() {
        return null;
    }

    stringify() {
        var me = this,
            round = Math.round,
            r = round(me.r),
            g = round(me.g),
            b = round(me.b),
            a = me.a,
            stringified = '';

        // If there is no transparency we will use hex value
        if (a === 1) {
            stringified = '#' + hex2(r) + hex2(g) + hex2(b);
        } else {
            // Else use rgba
            stringified = 'rgba(' + r + ', ' + g + ', ' + b + ', ' + a + ')';
        }

        stringified = stringified.toLowerCase();
        return stringified;
    }

    getCompressedValue(lowerVal) {
        var name = ColorRGBA.stringifiedMap[lowerVal],
            shortName = ColorRGBA.shortFormMap[lowerVal];

        if (name) {
            lowerVal = (lowerVal.length > name.length)
                ? name
                : lowerVal;
        }

        if (ColorRGBA.useShortValues && shortName) {
            lowerVal = (lowerVal.length > shortName.length)
                ? shortName
                : lowerVal;
        }

        return lowerVal;
    }

    toString() {
        if (!this.stringified) {
            this.stringified = this.getCompressedValue(this.stringify());
        }
        return this.stringified;
    }

    toIeHexStr() {
        var me = this,
            round = Math.round,
            r = round(me.r),
            g = round(me.g),
            b = round(me.b),
            a = round(0xff * me.a);

        return '#' + hex2(a) + hex2(r) + hex2(g) + hex2(b);
    }

    add(r, g, b, a) {
        return new ColorRGBA(
            this.r + r,
            this.g + g,
            this.b + b,
            this.a * a
        );
    }

    subtract(r, g, b) {
        return new ColorRGBA(
            this.r - r,
            this.g - g,
            this.b - b,
            this.a
        );
    }

    multiply(number) {
        return new ColorRGBA(
            this.r * number,
            this.g * number,
            this.b * number,
            this.a
        );
    }

    divide(number) {
        return new ColorRGBA(
            this.r / number,
            this.g / number,
            this.b / number,
            this.a
        );
    }

    static fromHex(value) {
        if (value.charAt(0) == '#') {
            value = value.substr(1);
        }

        var r, g, b;

        if (value.length === 3) {
            r = parseInt(value.charAt(0), 16);
            g = parseInt(value.charAt(1), 16);
            b = parseInt(value.charAt(2), 16);

            r = (r << 4) + r;
            g = (g << 4) + g;
            b = (b << 4) + b;
        } else {
            r = parseInt(value.substring(0, 2), 16);
            g = parseInt(value.substring(2, 4), 16);
            b = parseInt(value.substring(4, 6), 16);
        }

        var result = new ColorRGBA(r, g, b);
        if (ColorRGBA.preserveInputStrings) {
            result.stringified = "#" + value;
        }
        return result;
    }

    static fromHSLA(color) {
        if (color.$isFashionRGBA) {
            return color.clone();
        }

        var hsla = color,
            h = hsla.h / 360,
            s = hsla.s / 100,
            l = hsla.l / 100,
            a = hsla.a;

        var m2 = (l <= 0.5) ? (l * (s + 1)) : (l + s - l * s),
            m1 = l * 2 - m2;

        function hue(h) {
            if (h < 0) ++h;
            if (h > 1) --h;
            if (h * 6 < 1) return m1 + (m2 - m1) * h * 6;
            if (h * 2 < 1) return m2;
            if (h * 3 < 2) return m1 + (m2 - m1) * (2 / 3 - h) * 6;
            return m1;
        }

        var r = Color.constrainChannel(hue(h + 1 / 3) * 0xff),
            g = Color.constrainChannel(hue(h) * 0xff),
            b = Color.constrainChannel(hue(h - 1 / 3) * 0xff);

        return new ColorRGBA(r, g, b, a);
    }
}

Fashion.apply(ColorRGBA, {
    stringifiedMap: {
        'rgba(0, 0, 0, 0)': 'transparent'
    },

    shortFormMap: {},

    useShortValues: true,
    preserveInputStrings: false
});

Fashion.apply(ColorRGBA.prototype, {
    type: 'rgba',
    $isFashionRGBA: true,
    r: null,
    g: null,
    b: null,
    a: 1,
    stringified: null,

    "+.number": function (right) {
        var value = right.value,
            unit = right.unit;

        switch (unit) {
            case '%':
                return this.getHSLA().adjustLightness(value).getRGBA();
            case 'deg':
                return this.getHSLA().adjustHue(value).getRGBA();
            default:
                return this.add(value, value, value, 1);
        }
    },

    "+.rgba": function (right) {
        return this.add(right.r, right.g, right.b, right.a);
    },

    "+.hsla": function (right) {
        return this.getHSLA().add(right.h, right.s, right.l);
    },

    "-.number": function (right) {
        var value = right.value,
            unit = right.unit;
        switch (unit) {
            case '%':
                return this.getHSLA().adjustLightness(-value).getRGBA();
            case 'deg':
                return this.getHSLA().adjustHue(-value).getRGBA();
            default:
                return this.subtract(value, value, value);
        }
    },

    "-.rgba": function (right) {
        return this.subtract(right.r, right.g, right.b);
    },

    "-.hsla": function (right) {
        return this.getHSLA().subtract(right.h, right.s, right.l);
    },

    "*.number": function (right) {
        return this.multiply(right.value);
    },

    "/.number": function (right) {
        return this.divide(right.value);
    },

    "*.rgba": function (right) {
        return new ColorRGBA(
            this.r * right.r,
            this.g * right.g,
            this.b * right.b,
            this.a * right.a
        );
    },

    "/.rgba": function (right) {
        return new ColorRGBA(
            Math.floor(this.r / right.r),
            Math.floor(this.g / right.g),
            Math.floor(this.b / right.b),
            Math.floor(this.a / right.a)
        );
    }
});

module.exports = ColorRGBA;

(function (ColorRGBA, stringifiedMap, colorMap, shortMap) {
    var colorChars = [
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
            'a', 'b', 'c', 'd', 'e', 'f'
        ],
        names = Object.keys(colorMap),
        i;

    names.sort();
    for (i = 0; i < names.length; i++) {
        var name = names[i],
            val = colorMap[name],
            color = new ColorRGBA(val[0], val[1], val[2], val[3]),
            str = color.stringify();

        stringifiedMap[str] = name;
    }

    colorChars.forEach(function (short1) {
        var long1 = short1 + short1;
        colorChars.forEach(function (short2) {
            var long2 = short2 + short2;
            colorChars.forEach(function (short3) {
                var long3 = short3 + short3,
                    shortName = '#' + short1 + short2 + short3,
                    longName = '#' + long1 + long2 + long3;

                if (shortMap[longName]) {
                    var curr = shortMap[longName];
                    shortName = (curr.length > shortName.length) ? shortName : curr;
                    //if(curr.indexOf("#") === 0) {
                    //    short = (curr.length > short.length) ? short : curr;
                    //} else {
                    //    short = curr;
                    //}
                }
                shortMap[longName] = shortName;
            });
        });
    });

})(ColorRGBA, ColorRGBA.stringifiedMap, Color.map, ColorRGBA.shortFormMap);

},{"../Base.js":19,"./Color.js":25}],28:[function(require,module,exports){
/*
 * Copyright (c) 2012-2016. Sencha Inc.
 */

"use strict";

var Fashion = require('../Base.js');
var Type = require('./Type.js');
var Numeric = require('./Numeric.js');

class ColorStop extends Type {
    constructor(color, stop) {
        super();
        this.color = color;
        this.stop = stop;
    }

    doVisit(visitor) {
        visitor.colorstop(this);
    }

    descend(visitor) {
        visitor.visit(this.color);
        visitor.visit(this.stop);
    }

    toString() {
        var string = this.color.toString(),
            stop = this.stop;

        if (stop) {
            stop = stop.copy();
            string += ' ';
            if (!stop.unit) {
                stop.value *= 100;
                stop.unit = '%';
            }
            string += stop.toString();
        }

        return string;
    }

    toOriginalWebkitString() {
        var stop = this.stop;

        if (!stop) {
            stop = new Numeric(0, '%');
        }

        stop = stop.copy();
        if (!stop.unit) {
            stop.value *= 100;
            stop.unit = '%';
        }

        return 'color-stop(' + stop.toString() + ', ' + this.color.toString() + ')';
    }

    copy() {
        return new ColorStop(this.color && this.color.clone(), this.stop && this.stop.clone());
    }
}

Fashion.apply(ColorStop.prototype, {
    type: 'colorstop',
    $isFashionColorStop: true,
    $canUnbox: false,
    color: null,
    stop: null
});

module.exports = ColorStop;

},{"../Base.js":19,"./Numeric.js":34,"./Type.js":40}],29:[function(require,module,exports){
/*
 * Copyright (c) 2012-2016. Sencha Inc.
 */

"use strict";

var Fashion = require('../Base.js');
var Type = require('./Type.js');
var List = require('./List.js');

class FunctionCall extends Type {
    constructor(name, args) {
        super();
        this.name = name;
        if (Array.isArray(args)) {
            args = new List(args);
        }
        this.args = args;
    }

    toString() {
        var args = this.args,
            argsStr;
        if (Array.isArray(args)) {
            argsStr = args.join(', ');
        } else {
            argsStr = args.toString();
        }
        return this.name + "(" + argsStr + ')';
    }

    doVisit(visitor) {
        visitor.functioncall(this);
    }

    descend(visitor) {
        this.args && visitor.visit(this.args);
    }

    copy() {
        return new FunctionCall(this.name, this.args && this.args.copy());
    }
}

Fashion.apply(FunctionCall.prototype, {
    type: 'functioncall',
    $isFashionFunctionCall: true,
    $canUnbox: false,
    name: null,
    args: null
});

module.exports = FunctionCall;
},{"../Base.js":19,"./List.js":31,"./Type.js":40}],30:[function(require,module,exports){
/*
 * Copyright (c) 2012-2016. Sencha Inc.
 */

"use strict";

var Fashion = require('../Base.js');
var Type = require('./Type.js');

class LinearGradient extends Type {
    constructor(position, stops) {
        super();
        this.position = position;
        this.stops = stops;
    }

    doVisit(visitor) {
        visitor.lineargradient(this);
    }

    descend(visitor) {
        visitor.visit(this.position);
        visitor.visit(this.stops);
    }

    copy() {
        return new LinearGradient(this.position && this.position.clone(), this.stops && this.stops.clone());
    }

    gradientPoints(position) {

    }

    operate(operation, right) {
        switch (operation) {
            case "!=":
                if (right.type == 'literal' && (right.value == 'null' || right.value == 'none')) {
                    return true;
                }
            case "==":
                if (right.type == 'literal' && (right.value == 'null' || right.value == 'none')) {
                    return false;
                }
        }
        return super.operate(operation, right);
    }

    supports(prefix) {
        return !!(this.vendorPrefixes[prefix.toLowerCase()]);
    }

    toString() {
        var string = 'linear-gradient(';
        if (this.position) {
            string += (this.position + ', ');
        }
        return string + this.stops + ')';
    }

    toOriginalWebkitString() {
        // args = []
        // args << grad_point(position_or_angle || Sass::Script::String.new("top"))
        // args << linear_end_position(position_or_angle, color_stops)
        // args << grad_color_stops(color_stops)
        // args.each{|a| a.options = options}
        // Sass::Script::String.new("-webkit-gradient(linear, #{args.join(', ')})")
        //this.gradientPoints(this.position);
        var args = [],
            stops = this.stops.items,
            ln = stops.length,
            i;

        args.push('top');
        args.push('bottom');

        for (i = 0; i < ln; i++) {
            args.push(stops[i].toOriginalWebkitString());
        }

        return '-webkit-gradient(linear, ' + args.join(', ') + ')';
    }

    toPrefixedString(prefix) {
        if (prefix === 'owg') {
            return this.toOriginalWebkitString();
        }
        return prefix + this.toString();
    }
}

Fashion.apply(LinearGradient.prototype, {
    type: 'lineargradient',
    $isFashionLinearGradient: true,
    $canUnbox: false,
    position: null,
    stops: null,
    vendorPrefixes: {
        webkit: true,
        moz: true,
        svg: true,
        pie: true,
        css2: true,
        o: true,
        owg: true
    }
});

module.exports = LinearGradient;

},{"../Base.js":19,"./Type.js":40}],31:[function(require,module,exports){
/*
 * Copyright (c) 2012-2016. Sencha Inc.
 */

"use strict";

var Fashion = require('../Base.js');
var Type = require('./Type.js');

class List extends Type {
    constructor(items, separator) {
        super();
        this.items = items || [];
        this.separator = typeof separator === 'undefined' ? ' ' : separator;
    }

    doVisit(visitor) {
        visitor.list(this);
    }

    descend(visitor) {
        for (var i = 0; i < this.items.length; i++) {
            visitor.visit(this.items[i]);
        }
    }

    copy() {
        var items = this.items,
            len = items.length,
            newItems = [];
        for (var i = 0; i < len; i++) {
            newItems.push(items[i].clone());
        }
        return new List(newItems, this.separator);
    }

    clone(match, replace) {
        if (replace && this.matches(match)) {
            return replace.clone();
        }
        var items = this.items,
            len = items.length,
            newItems = [];

        for (var i = 0; i < len; i++) {
            var item = items[i];
            if (item) {
                newItems.push(item.clone(match, replace));
            }
            else {
                newItems.push(item);
            }
        }

        var copy = new List(newItems, this.separator);
        copy.$referenceName = this.$referenceName;
        copy.$referenceBase = this.$referenceBase;
        copy.$previousReference = this.$previousReference;
        return copy;
    }

    add(item) {
        return this.items.push(item);
    }

    get(index) {
        return this.items[index - 1] || null;
    }

    operate(operation, right) {
        switch (operation) {
            case '!=':
                if (right.$isFashionLiteral) {
                    if (right.value === 'null' || right.value === 'none') {
                        return true;
                    }
                }
                break;

            case '==':
                if (right.$isFashionLiteral) {
                    if (right.value === 'null' || right.value === 'none') {
                        return false;
                    }
                }
                break;
        }

        return super.operate(operation, right);
    }

    supports(prefix) {
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];

            if (item.supports(prefix)) {
                return true;
            }
        }

        return false;
    }

    toBoolean() {
        return !!this.items.length;
    }

    getItems() {
        return this.items;
        // return Fashion.filter(this.items, (item) => {
        //     var unboxed = Type.unbox(item);
        //     return unboxed !== null && unboxed !== undefined;
        // });
    }

    toString() {
        return this.items.join(this.separator);
    }

    unquote() {
        var items = [],
            item;
        for (var i = 0; i < this.items.length; i++) {
            item = this.items[i];
            if (item) {
                items.push(item.unquote());
            }
            else {
                items.push(item);
            }
        }
        return new List(items, this.separator);
    }

    toPrefixedString(prefix) {
        var items = [];
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item) {
                items.push(item.toPrefixedString(prefix));
            }
        }
        return items.join(this.separator);
    }

    //----------------------------------------------------------------------
    // Operations

    '==.list'(right) {
        var equals = this.separator == right.separator &&
            this.items.length == right.items.length;

        for (var i = 0; equals && i < this.items.length; ++i) {
            equals = this.items[i].operate("==", right.items[i]);
        }

        return equals;
    }
}

Fashion.apply(List.prototype, {
    type: 'list',
    $isFashionList: true,
    items: null,
    separator: null
});

module.exports = List;
},{"../Base.js":19,"./Type.js":40}],32:[function(require,module,exports){
/*
 * Copyright (c) 2012-2016. Sencha Inc.
 */

"use strict";

var Fashion = require('../Base.js');
var Type = require('./Type.js');
var Numeric = require('./Numeric.js');

class Literal extends Type {
    constructor(value) {
        super();
        this.value = value
    }

    doVisit(visitor) {
        visitor.literal(this);
    }

    _getHash() {
        return this.value;
    }

    toString() {
        return this.value || '';
    }
    
    toBoolean() {
        return this.value.length;
    }

    copy() {
        return new Literal(this.value);
    }

    '+'(right) {
        return new Literal(this.value + right.getHash());
    }

    '+.number'(right) {
        if (this.value === null) {
            return right;
        }
        return new Literal(this.value + right.toString());
    }

    '/'(right) {
        return new Literal(this.value + '/' + right.getHash());
    }

    '-'(right) {
        return new Literal(this.value + '-' + right.getHash());
    }

    '%'(right) {
        return new Literal(this.value + '%' + right.getHash());
    }

    static tryCoerce(obj) {
        if (obj.$isFashionNumber) {
            return undefined;
        }
        if (obj.$isFashionString) {
            return new Literal(obj.value);
        }
        if (obj.$isFashionLiteral) {
            return obj;
        }
        return new Literal(obj.getHash());
    }


    normalizeStart(startVal) {
        var start = Type.unbox(startVal) || 0;
        if (start > 0) {
            start = start - 1;
        }

        if (start < 0) {
            start = this.value.length + start;
        }

        if (start < 0) {
            start = 0;
        }

        return start;
    }

    normalizeEnd(endVal) {
        var end = Type.unbox(endVal) || -1;
        if (end > 0) {
            end = end - 1;
        }
        if (end < 0) {
            end = this.value.length + end;
        }

        if (end < 0) {
            end = 0;
        }

        if (end > 0) {
            end = end + 1;
        }
        return end;
    }

    slice(start, end) {
        start = this.normalizeStart(start);
        end = this.normalizeEnd(end);
        return new Literal(this.value.slice(start, end));
    }

    toUpperCase() {
        return new Literal(this.value.toUpperCase());
    }

    toLowerCase() {
        return new Literal(this.value.toLowerCase());
    }

    indexOf(str) {
        var idx = this.value.indexOf(str.value);
        if (idx === -1) {
            return undefined;
        }
        return new Numeric(idx + 1);
    }

    insert(str, startVal) {
        var start = Type.unbox(startVal) || 0,
            inserted = this.value;

        if (start > 0) {
            start = Math.min(start - 1, inserted.length);
        }
        if (start < 0) {
            start = inserted.length + start + 1;
            start = Math.max(start, 0);
        }

        inserted = inserted.substring(0, start) + str.value + inserted.substring(start);
        return new Literal(Literal.deEscape(inserted));
    }

    static deEscape(str) {
        var buff = '',
            i, ch;
        for (i = 0; i < str.length; i++) {
            ch = str.charAt(i);
            if (ch === '\\') {
                i++;
                ch = str.charAt(i);
            }
            buff += ch;
        }
        return buff;
    }

    toDisplayString() {
        var val = this.value;
        if (val === null) {
            return "null";
        }
        return this.toString();
    }
}

Fashion.apply(Literal.prototype, {
    type: 'literal',
    $isFashionLiteral: true,
    value: null
});

class FashionNull extends Literal {
    constructor (value) {
        super(value || null);
    }

    copy () {
        return new FashionNull(this.value);
    }
}

Fashion.apply(FashionNull.prototype, {
    $isFashionNull: true,
    $constant: true
});

FashionNull.prototype.$isFashionNull = true;

Literal.Null = new FashionNull(null);
Literal.None = new Literal('none');

module.exports = Literal;



},{"../Base.js":19,"./Numeric.js":34,"./Type.js":40}],33:[function(require,module,exports){
/*
 * Copyright (c) 2012-2016. Sencha Inc.
 */

"use strict";

var Fashion = require('../Base.js');
var List = require('./List.js');
var Type = require('./Type.js');
var Literal = require('./Literal.js'),
    Null = Literal.Null;

var Numeric = require('./Numeric.js');

class Map extends List {
    constructor(pairs) {
        super(pairs);
        this.map = {};
        if (pairs) {
            for (var i = 0; i < pairs.length - 1; i += 2) {
                var key = this.toKey(pairs[i]),
                    value = pairs[i + 1];
                this.map[key] = i + 1;
            }
        }
    }

    doVisit(visitor) {
        visitor.map(this);
    }

    descend(visitor) {
        for (var i = 0; i < this.items.length; i++) {
            visitor.visit(this.items[i]);
        }
    }

    get(key) {
        if (key instanceof Numeric) {
            key = Type.unbox(key);
        }

        if (typeof key === 'number') {
            return new List([
                this.items[(2 * key) - 2],
                this.items[(2 * key) - 1]
            ], ' ');
        }

        key = this.toKey(key);
        return this.items[this.map[key]] || Null;
    }

    getItems() {
        var values = [];
        for (var i = 0; i < this.items.length - 1; i += 2) {
            var key = this.toKey(this.items[i]);
            values.push(this.map[key]);
        }
        return values;
    }

    put(key, value) {
        var keyStr = this.toKey(key);
        if (!this.map.hasOwnProperty(keyStr)) {
            this.items.push(key, value);
            this.map[keyStr] = this.items.length - 1;
        } else {
            this.items[this.map[keyStr]] = value;
        }
    }

    toString() {
        var str = '',
            count = 0;
        for (var i = 0; i < this.items.length - 1; i += 2) {
            var key = this.toKey(this.items[i]),
                value = this.map[key];
            if (value) {
                if (count > 0) {
                    str += ', ';
                }
                str += key + ": " + value.toString();
                count++;
            }
        }
        return str;
    }

    toKey(key) {
        return this.unquoteKey(key).toString();
    }

    unquoteKey(string) {
        if (string.$isFashionType) {
            return string.unquote();
        }
        return string;
    }
    
    remove(key) {
        key = this.toKey(key);
        if (this.map[key]) {
            var idx = this.map[key];
            delete this.items[idx-1]; 
            delete this.items[idx]; 
            delete this.map[key];
        }
    }
    
    getKeys() {
        var keys = [];
        for (var i = 0; i < this.items.length; i+=2) {
            var k = this.items[i];
            if (k) {
                keys.push(k);
            }
        }
        return keys;
    }
    
    getValues() {
        var values = [];
        for (var i = 1; i < this.items.length; i+=2) {
            var v = this.items[i];
            if (v) {
                values.push(v);
            }
        }
        return values;
    }
    
    hasKey(key) {
        key = this.toKey(key);
        if (this.map.hasOwnProperty(key)) {
            return true;
        }
        return false;
    }
}

Fashion.apply(Map.prototype, {
    type: "map",
    $isFashionMap: true,
    $canUnbox: false,
    map: null
});

module.exports = Map;
},{"../Base.js":19,"./List.js":31,"./Literal.js":32,"./Numeric.js":34,"./Type.js":40}],34:[function(require,module,exports){
/*
 * Copyright (c) 2012-2016. Sencha Inc.
 */

"use strict";

var Fashion = require('../Base.js');
var Type = require('./Type.js');
var Bool = require('./Bool.js');
var Literal = require('./Literal.js');

class Numeric extends Type {
    constructor(value, unit, numeratorUnits, denominatorUnits) {
        super();
        this.value = value;
        this.unit = unit;
        if (unit && !numeratorUnits) {
            this.numeratorUnits = [unit];
        } else {
            this.numeratorUnits = numeratorUnits || [];
        }
        this.denominatorUnits = denominatorUnits || [];
    }

    doVisit(visitor) {
        visitor.number(this);
    }

    unitless() {
        if (this.numeratorUnits && this.numeratorUnits.length) {
            return false;
        }

        if (this.denominatorUnits && this.denominatorUnits.length) {
            return false;
        }

        return true;
    }

    getUnitStr() {
        this.normalizeUnits();
        var unitStr = this.numeratorUnits.join('*');
        if (this.denominatorUnits.length) {
            unitStr += '/' + this.denominatorUnits.join('*');
        }
        return unitStr;
    }

    _getHash() {
        return this.value;
    }

    stringify() {
        this.normalizeUnits();

        var value = this.value,
            valStr;

        // prevent 0.020000000000000004 type numbers in output
        valStr = (Math.round(value * 100000) / 100000) + '';
        //unitStr = valStr === '0' ? '' : this.getUnitStr();
        return valStr + this.getUnitStr();
    }

    toString() {
        return this.stringify();
    }

    toBoolean() {
        return this.unit ? true : !!this.value;
    }

    copy() {
        return new Numeric(this.value, this.unit);
    }

    '-.literal'(right) {
        if (this.value === 0 && this.unitless()) {
            return new Literal(['-', right.toString()].join(''));
        }
        return new Literal([this.toString(), '-', right.toString()].join(''));
    }

    '-.string'(right) {
        if (this.value === 0 && this.unitless()) {
            return new Literal(['-', right.toString()].join(''));
        }
        return new Literal([this.toString(), '-', right.toString()].join(''));
    }

    '-.number'(right) {
        var value = right.value;

        if (right.unit == '%' && right.unit !== this.unit) {
            value = this.value * (right.value / 100);
        }

        return new Numeric(this.value - value, this.unit || right.unit);
    }

    '+.literal'(right) {
        if (right.$isFashionString) {
            return new Literal([
                this.toString(),
                right.value
            ].join(''));
        }

        return new Literal([
            this.toString(),
            right.toString()
        ].join(''));
    }

    '+.number'(right) {
        var value = right.value;

        if (right.unit == '%' && right.unit !== this.unit) {
            value = this.value * (right.value / 100);
        }

        return new Numeric(this.value + value, this.unit || right.unit);
    }

    '/'(right) {
        return new Numeric(this.value / right.value,
            ((this.unit == right.unit) ? null : (this.unit || right.unit)));
    }

    '*'(right) {
        return new Numeric(this.value * right.value, this.unit || right.unit);
    }

    '%'(right) {
        return new Numeric(this.value % right.value, this.unit || right.unit);
    }

    '**'(right) {
        return new Numeric(Math.pow(this.value, right.value), this.unit || right.unit);
    }

    operate(operation, right) {
        var unit = this.unit || right.unit,
            normalized;

        if (right.$isFashionRGBA || right.$isFashionHSLA) {
            return new Literal(this + operation + right);
        }

        if (right.$isFashionNumber) {
            return this.numericOperate(operation, right);
        } else if (right.$isFashionLiteral) {
            normalized = this.tryCoerce(right);

            if (normalized) {
                return this.performOperation(operation, normalized);
            }
        }

        return super.operate(operation, right);
    }

    tryNormalize(other) {
        var value = other.value,
            unit = other.unit;

        if (other.$isFashionNumber) {
            switch (this.unit) {
                case 'mm':
                    switch (unit) {
                        case 'in':
                            return new Numeric(value * 25.4, 'mm');
                        case 'cm':
                            return new Numeric(value * 2.54, 'mm');
                    }
                    break;

                case 'cm':
                    switch (unit) {
                        case 'in':
                            return new Numeric(value * 2.54, 'cm');
                        case 'mm':
                            return new Numeric(value / 10, 'cm');
                    }
                    break;

                case 'in':
                    switch (unit) {
                        case 'mm':
                            return new Numeric(value / 25.4, 'in');
                        case 'cm':
                            return new Numeric(value / 2.54, 'in');
                    }
                    break;

                case 'ms':
                    switch (unit) {
                        case 's':
                            return new Numeric(value * 1000, 'ms');
                    }
                    break;

                case 's':
                    switch (unit) {
                        case 'ms':
                            return new Numeric(value / 1000, 's');
                    }
                    break;

                case 'Hz':
                    switch (unit) {
                        case 'kHz':
                            return new Numeric(value * 1000, 'Hz');
                    }
                    break;

                case 'kHz':
                    switch (unit) {
                        case 'Hz':
                            return new Numeric(value / 1000, 'kHz');
                    }
                    break;
                case '%':
                    switch (unit) {
                        default:
                            return new Numeric(value);
                    }
                default:
                    break;
            }
        }

        return undefined;
    }

    normalize(other) {
        var norm = this.tryNormalize(other);

        if (norm === undefined) {
            raise('Could not normalize ' + this + ' with ' + other);
        }

        return norm;
    }

    comparable(other) {
        var unit1 = this.unit,
            unit2 = other.unit;

        if (!other.$isFashionNumber) {
            return false;
        }

        return (
            (unit1 === unit2) ||
            (unit1 === 'mm' && (unit2 === 'in' || unit2 === 'cm')) ||
            (unit1 === 'cm' && (unit2 === 'in' || unit2 === 'mm')) ||
            (unit1 === 'in' && (unit2 === 'mm' || unit2 === 'cm')) ||
            (unit1 === 'ms' && unit2 === 's') ||
            (unit1 === 's' && unit2 === 'ms') ||
            (unit1 === 'Hz' && unit2 === 'kHz') ||
            (unit1 === 'kHz' && unit2 === 'Hz')
        );
    }

    //---------------------------------------------------------------

    normalizeUnits() {
        if (this.normalized) {
            return;
        }

        this.normalized = true;

        if (!this.unitless()) {
            var clean = this.removeCommonUnits(this.numeratorUnits, this.denominatorUnits),
                converted;

            //var num = [],
            //    den = [];
            //
            //for(var d = 0; d < clean.den.length; d++) {
            //    var dn = clean.den[d];
            //    if(this.convertable(dn)) {
            //        converted = false;
            //        for (var n = 0; n < clean.num.length; n++) {
            //            var nm = clean.num[n];
            //            if(this.convertable(nm)) {
            //                this.value = this.value / this.conversionFactor(dn, nm);
            //                converted = true;
            //            } else {
            //                num.push(nm);
            //            }
            //        }
            //        if(!converted) {
            //            den.push(dn);
            //        }
            //    }
            //}
            //
            //this.numeratorUnits = num;
            //this.denominatorUnits = den;

            clean.num = Fashion.filter(clean.num, function (val) {
                return !!val;
            });
            clean.den = Fashion.filter(clean.den, function (val) {
                return !!val;
            });
            this.numeratorUnits = clean.num;
            this.denominatorUnits = clean.den;
        }
    }

    numericOperate(operation, right) {
        this.normalizeUnits();
        right.normalizeUnits();

        var me = this,
            other = right,
            ops = Numeric.OPERATIONS,
            moreOps = Numeric.NON_COERCE_OPERATIONS,
            op = ops[operation],
            result;

        if (op) {
            try {
                if (me.unitless()) {
                    me = me.coerceUnits(other.numeratorUnits, other.denominatorUnits);
                } else {
                    other = other.coerceUnits(me.numeratorUnits, me.denominatorUnits);
                }
            } catch (e) {
                if (operation == '==') {
                    return Bool.False;
                }
                if (operation == '!=') {
                    return Bool.True;
                }
                throw e;
            }
        } else {
            op = moreOps[operation];
        }

        if (op) {
            result = op(me.value, other.value);
        }

        if (typeof result === 'number') {
            var units = this.computeUnits(me, other, operation);
            return new Numeric(result, (units.num.length ? units.num[0] : null), units.num, units.den);
        }

        return new Bool(result);
    }

    computeUnits(left, right, op) {
        switch (op) {
            case '*':
                return {
                    num: left.numeratorUnits.slice().concat(right.numeratorUnits),
                    den: left.denominatorUnits.slice().concat(right.denominatorUnits)
                };
            case '/':
                return {
                    num: left.numeratorUnits.slice().concat(right.denominatorUnits),
                    den: left.denominatorUnits.slice().concat(right.numeratorUnits)
                };
            default:
                return {
                    num: left.numeratorUnits,
                    den: left.denominatorUnits
                };
        }
    }

    coerceUnits(units, denominatorUnits) {
        var value = this.value;
        if (!this.unitless()) {
            value = value
                * this.coercionFactor(this.numeratorUnits, units)
                / this.coercionFactor(this.denominatorUnits, denominatorUnits);
        }
        return new Numeric(value, units && units[0], units, denominatorUnits);
    }

    coercionFactor(units, otherUnits) {
        var res = this.removeCommonUnits(units, otherUnits),
            fromUnits = res.num,
            toUnits = res.den;

        if (fromUnits.length !== toUnits.length || !this.convertable(fromUnits || toUnits)) {
            Fashion.raise('Incompatible units: ' + fromUnits.join('*') + ' and ' + toUnits.join('*'));
        }


        for (var i = 0; i < fromUnits.length; i++) {
            var fromUnit = fromUnits[i];
            for (var j = 0; j < toUnits.length; j++) {
                var toUnit = toUnits[j],
                    factor = this.conversionFactor(fromUnit, toUnit);

                if (factor !== null) {
                    return factor;
                }
            }
        }

        return 1;
    }

    conversionFactor(fromUnit, toUnit) {
        var cUnits = Numeric.CONVERTABLE_UNITS,
            cTable = Numeric.CONVERSION_TABLE,
            factor = null;

        if (cUnits[fromUnit]) {
            if (cUnits[toUnit]) {
                factor = cTable[cUnits[fromUnit]][cUnits[toUnit]];
            }
        }

        if (factor === null && cUnits[toUnit]) {
            if (cUnits[fromUnit]) {
                factor = 1.0 / cTable[cUnits[toUnit]][cUnits[fromUnit]];
            }
        }

        return factor;
    }

    convertable(units) {
        if (units && !Array.isArray(units)) {
            units = [units];
        }

        if (units && units.length) {
            var convertableUnits = Numeric.CONVERTABLE_UNITS;
            for (var i = 0; i < units.length; i++) {
                if (convertableUnits[units[i]] === undefined) {
                    return false;
                }
            }
        }
        return true;
    }

    removeCommonUnits(numUnits, denUnits) {
        var map = {},
            num = [],
            den = [],
            i, unit, unit;

        for (i = 0; i < numUnits.length; i++) {
            unit = numUnits[i];
            map[unit] = (map[unit] || 0) + 1;
        }

        for (i = 0; i < denUnits.length; i++) {
            unit = denUnits[i];
            map[unit] = (map[unit] || 0) - 1;
        }

        for (i = 0; i < numUnits.length; i++) {
            unit = numUnits[i];
            if (map[unit] > 0) {
                num.push(unit);
                map[unit]--;
            }
        }

        for (i = 0; i < denUnits.length; i++) {
            unit = denUnits[i];
            if (map[unit] < 0) {
                den.push(unit);
                map[unit]++;
            }
        }

        return {
            num: num,
            den: den
        };
    }

    static tryGetNumber(value) {
        if (/^\d*$/.test(value)) {
            value = parseFloat(value);
        }

        if (!isNaN(value)) {
            return new Numeric(value);
        }

        return undefined;
    }

    static tryCoerce(obj) {
        if (obj.$isFashionNumber) {
            return obj;
        }

        if (obj.$isFashionLiteral) {
            return this.tryGetNumber(obj.value);
        }

        return undefined;
    }
}

Fashion.apply(Numeric, {
    OPERATIONS: {
        '!=': (l, r) => l != r,
        '+': (l, r) => l + r,
        '-': (l, r) => l - r,
        '<=': (l, r) => l <= r,
        '<': (l, r) => l < r,
        '>': (l, r) => l > r,
        '>=': (l, r) => l >= r,
        '==': (l, r) => l == r,
        '%': (l, r) => Math.abs(l % r)
    },

    NON_COERCE_OPERATIONS: {
        '*': (l, r) => l * r,
        '**': (l, r) => Math.pow(l, r),
        '/': (l, r) => l / r
    },

    CONVERTABLE_UNITS: {
        'in': 0,
        'cm': 1,
        'pc': 2,
        'mm': 3,
        'pt': 4,
        'px': 5
    },

    CONVERSION_TABLE: [
        [1, 2.54, 6, 25.4, 72, 96],           // in
        [null, 1, 2.36220473, 10, 28.3464567, 37.795276],    // cm
        [null, null, 1, 4.23333333, 12, 16],           // pc
        [null, null, null, 1, 2.83464567, 3.7795276],    // mm
        [null, null, null, null, 1, 1.3333333],    // pt
        [null, null, null, null, null, 1]             // px
    ]
});

Fashion.apply(Numeric.prototype, {
    type: 'number',
    $isFashionNumber: true,
    value: undefined,
    unit: undefined,

    numeratorUnits: undefined,
    denominatorUnits: undefined,
    normalized: false
});

module.exports = Numeric;

},{"../Base.js":19,"./Bool.js":24,"./Literal.js":32,"./Type.js":40}],35:[function(require,module,exports){
/*
 * Copyright (c) 2012-2016. Sencha Inc.
 */

"use strict";

var Fashion = require('../Base.js');
var Type = require('./Type.js');

class ParentheticalExpression extends Type {
    constructor(value) {
        super();
        this.value = value;
    }

    toString() {
        return '(' + (this.value && this.value.toString()) + ')';
    }

    doVisit(visitor) {
        visitor.parenthetical(this);
    }
}

Fashion.apply(ParentheticalExpression.prototype, {
    value: null,
    type: 'parenthetical'
});

module.exports = ParentheticalExpression;
},{"../Base.js":19,"./Type.js":40}],36:[function(require,module,exports){
/*
 * Copyright (c) 2012-2016. Sencha Inc.
 */

"use strict";

var Fashion = require('../Base.js');
var Type = require('./Type.js');

class RadialGradient extends Type {
    constructor(position, shape, stops) {
        super();
        this.position = position;
        this.stops = stops;
        this.shape = shape;
    }

    doVisit(visitor) {
        visitor.radialgradient(this);
    }

    descend(visitor) {
        visitor.visit(this.position);
        visitor.visit(this.stops);
        visitor.visit(this.shape);
    }

    copy() {
        return new RadialGradient(this.position, this.shape, this.stops);
    }

    toString() {
        var string = 'radial-gradient(';

        if (this.position) {
            string += (this.position + ', ');
        }

        if (this.shape) {
            string += (this.shape + ', ');
        }

        return string + this.stops + ')';
    }

    toOriginalWebkitString() {
        var args = [],
            stops = this.stops.items,
            ln = stops.length,
            i;

        args.push('center 0%');
        args.push('center 100%');

        for (i = 0; i < ln; i++) {
            args.push(stops[i].toOriginalWebkitString());
        }

        return '-webkit-gradient(radial, ' + args.join(', ') + ')';
    }

    supports(prefix) {
        return ['owg', 'webkit'].indexOf(prefix.toLowerCase()) !== -1;
    }

    toPrefixedString(prefix) {
        if (prefix === 'owg') {
            return this.toOriginalWebkitString();
        }
        return prefix + this.toString();
    }

    gradientPoints(position) {
        //position = (position.type === 'list') ? position.clone() : new Fashion.List([position]);
        //console.log('gradientpoints', position);
    }
}

Fashion.apply(RadialGradient.prototype, {
    type: 'radialgradient',
    $isFashionRadialGradient: true,
    $canUnbox: false,
    position: null,
    stops: null,
    shape: null
});

module.exports = RadialGradient;
},{"../Base.js":19,"./Type.js":40}],37:[function(require,module,exports){
"use strict";

var Fashion = require('../Base.js');
var TypeVisitor = require('./TypeVisitor.js');
var Output = require('../Output.js');

class SourceBuilder extends TypeVisitor {
    constructor(cfg) {
        super(cfg);
        this.nullFound = false;
    }

    list(obj) {
        var output = this.output,
            items = obj.items,
            len = output.output.length,
            sep = obj.separator,
            sepLen = sep && sep.length,
            hasSpace = sep && sep.indexOf(' ') > -1,
            prev = output.output,
            delta;

        for (var i = 0; i < items.length; i++) {
            if (items[i] && !items[i].$isFashionNull) {
                this.visit(items[i]);
                delta = output.output.length - len;
                if (!delta && sepLen && i > 0) {
                    output.output = prev;
                }
                prev = output.output;
                if (i < items.length - 1) {
                    if (sepLen) {
                        output.add(sep);
                        if (!hasSpace) {
                            output.space();
                        }
                    }
                }
                len = output.output.length;
            }
            else {
                this.nullFound = true;
            }
        }
    }

    map(obj) {
        var output = this.output,
            items = obj.items,
            key, value;

        if (this.currDeclaration) {
            Fashion.raise('(' + obj.toString() + ") isn't a valid CSS value.");
        }

        for (var i = 0; i < items.length - 1; i += 2) {
            key = items[i];
            value = items[i + 1];
            if (key && value) {
                if (i > 0) {
                    output.add(',');
                    output.space();
                }

                this.visit(key);
                output.add(': ');
                //output.space();
                this.visit(value);
            }
        }
    }

    literal(obj) {
        obj.value && this.output.add(obj.value);
    }

    string(obj) {
        var output = this.output;
        output.add(obj.quoteChar);
        output.add(obj.value);
        output.add(obj.quoteChar);
    }

    functioncall(obj) {
        var output = this.output;
        output.add(obj.name);
        output.add('(');
        this.visit(obj.args);
        output.add(')');
    }

    parenthetical(obj) {
        this.output.add('(');
        this.visit(obj.value);
        this.output.add(')');
    }

    number(obj) {
        var val = obj.stringify();
        if (val.indexOf('.') === '.' && !this.output.isCompressed) {
            val = "0" + val;
        }
        this.output.add(val);
    }

    bool(obj) {
        this.output.add(obj.value ? 'true' : 'false');
    }

    hsla(obj) {
        this.output.add(obj.toString());
    }

    rgba(obj) {
        this.output.add(obj.toString());
    }

    colorstop(obj) {
        var output = this.output,
            stop = obj.stop;

        this.visit(obj.color);

        if (stop) {
            stop = stop.clone();
            output.add(' ');
            if (!stop.unit) {
                stop.value *= 100;
                stop.unit = '%';
            }
            this.visit(stop);
        }
    }

    lineargradient(obj) {
        var output = this.output;
        output.add("linear-gradient(");
        if (obj.position) {
            this.visit(obj.position);
            output.add(',');
            output.space();
        }
        this.visit(obj.stops);
        output.add(')');
    }

    radialgradient(obj) {
        var output = this.output;
        output.add("linear-gradient(");
        if (obj.position) {
            this.visit(obj.position);
            output.add(',');
            output.space();
        }
        if (obj.shape) {
            this.visit(obj.shape);
            output.add(',');
            output.space();
        }
        this.visit(obj.stops);
        output.add(')');
    }

    toSource(obj, output) {
        this.output = output || new Output();
        this.visit(obj);
        return this.output.get();
    }

    static toSource(obj, output) {
        var sb = new SourceBuilder();
        return sb.toSource(obj, output);
    }
}

Fashion.apply(SourceBuilder.prototype, {
    output: null
});

module.exports = SourceBuilder;
},{"../Base.js":19,"../Output.js":20,"./TypeVisitor.js":41}],38:[function(require,module,exports){
"use strict";

var Fashion = require('../Base.js');
var Type = require('./Type.js');
var Text = require('./Text.js');
var Numeric = require('./Numeric.js');

var Bool = require('./Bool.js'),
    True = Bool.True,
    False = Bool.False;

var Literal = require('./Literal.js'),
    Null = Literal.Null;

module.exports = {
    unboxType (expression) {
        var val = expression;
        if (val && val.$isFashionType && val.$canUnbox) {
            val = val.value;
            if (expression.$isFashionString || expression.$isFashionLiteral) {
                if (val === 'none' || val === 'null') {
                    val = null;
                }
            } else if (expression.$isFashionList) {
                val = expression.items;
            }
        }
        return val;
    },

    boxType(expression) {
        if (expression && expression.$isFashionType) {
            return expression;
        }

        if (expression == null) { // null || undefined
            return Null;
        }
        if (expression === true) {
            return True;
        }
        if (expression === false) {
            return False;
        }

        var typeOf = typeof expression;
        switch (typeOf) {
            case 'string':
                return new Text(expression);
            case 'number':
                return new Numeric(expression);
            default:
                break;
        }

        return expression;
    }

};

Fashion.apply(Type, {
    box: module.exports.boxType,
    unbox: module.exports.unboxType
});
},{"../Base.js":19,"./Bool.js":24,"./Literal.js":32,"./Numeric.js":34,"./Text.js":39,"./Type.js":40}],39:[function(require,module,exports){
/*
 * Copyright (c) 2012-2016. Sencha Inc.
 */

"use strict";

var Fashion = require('../Base.js');
var Literal = require('./Literal.js');

class Text extends Literal {
    constructor(value, quoteChar) {
        super(value);
        if (quoteChar !== undefined) {
            if (Text.preferDoubleQuotes && quoteChar === '') {
                this.quoteChar = '';
            }
            else {
                this.quoteChar = quoteChar;
            }
        }
    }

    doVisit(visitor) {
        visitor.string(this);
    }

    toString() {
        return this.quoteChar + this.value + this.quoteChar;
    }

    unquote() {
        return new Literal(this.value);
    }

    copy() {
        return new Text(this.value, this.quoteChar);
    }

    slice(start, end) {
        return new Text(super.slice(start, end).value, this.quoteChar);
    }

    toUpperCase() {
        return new Text(this.value.toUpperCase(), this.quoteChar);
    }

    toLowerCase() {
        return new Text(this.value.toLowerCase(), this.quoteChar);
    }

    insert(str, startVal) {
        return new Text(super.insert(str, startVal).value, this.quoteChar);
    }

    static tryCoerce(obj) {
        if (obj.$isFashionNumber) {
            return undefined;
        }
        if (obj.$isFashionLiteral) {
            return new Text(obj.value);
        }

        return new Text(obj.getHash());
    }
}

Text.preferDoubleQuotes = false;

Fashion.apply(Text.prototype, {
    type: 'string',
    $isFashionString: true,
    value: null,
    quoteChar: '"',

    '+' (right) {
        return new Text(this.value + right.getHash());
    },

    '+.number' (right) {
        return new Text(this.value + right.toString());
    },

    '/' (right) {
        return new Text(this.value + '/' + right.getHash());
    }
});

module.exports = Text;

},{"../Base.js":19,"./Literal.js":32}],40:[function(require,module,exports){
/*
 * Copyright (c) 2012-2016. Sencha Inc.
 */

"use strict";

var Fashion = require('../Base.js');

class Type {
    coerce(obj) {
        var converted = this.tryCoerce(obj);
        return converted || obj;
    }

    _getHash() {
        if (this.visitTarget) {
            return this.visitTarget.toString();
        }
        return this.toString();

    }

    getHash() {
        if (this._hash == null) {
            this._hash = this._getHash();
        }
        return this._hash;
    }

    tryCoerce(obj) {
        var me = this;

        if (me.constructor === obj.constructor) {
            return obj;
        }

        if (me.constructor.tryCoerce) {
            return me.constructor.tryCoerce(obj);
        }

        return undefined;
    }

    supports(prefix) {
        return false;
    }

    operate(operation, right) {
        return this.performOperation(operation, this.coerce(right));
    }

    performOperation(operation, right) {
        // check for <op>.<type> name for class-specific impl,
        // eg, ==.color or +.list
        var method = this[operation + "." + right.type] || this[operation];

        if (!method) {
            Fashion.raise("Failed to find method for operation " + operation + " on type " +
                right.type + " with value " + right + ".");

        }

        var res = method.call(this, right);

        if (!res || !res.$isFashionType) {
            res = Type.box(res);
        }

        return res;
    }

    '=='(right) {
        return this.getHash() === right.getHash();
    }

    '!='(right) {
        return this.getHash() !== right.getHash();
    }

    '>='(right) {
        return this.getHash() >= right.getHash();
    }

    '<='(right) {
        return this.getHash() <= right.getHash();
    }

    '>'(right) {
        return this.getHash() > right.getHash();
    }

    '<'(right) {
        return this.getHash() < right.getHash();
    }

    '+'(right) {
        return this.getHash() + right.getHash();
    }

    copy() {
        return this;
    }

    matches(match) {
        if (match && match == this.toString()) {
            return true;
        }
        return false;
    }

    clone(match, replace) {
        if (replace && this.matches(match)) {
            return replace.copy();
        }
        var copy = this.copy();
        copy.ast = this.ast;
        copy.$referenceName = this.$referenceName;
        copy.$referenceBase = this.$referenceBase;
        copy.$previousReference = this.$previousReference;
        return copy;
    }

    unquote() {
        return this;
    }

    toPrefixedString(prefix) {
        return this.toString();
    }

    doVisit(visitor) {
    }

    descend(visitoir) {
    }

    /**
     * A mechanism that enables searching upwards in the type tree for comments with a
     * particular control tag.  The search begins locally first on the specified node,
     * and continues upwards until either an enable or disable tag is specified, or the
     * the root of the tree is reached with no tags specified.
     *
     * By testing for both positive and negative matches locally, features can be enabled
     * or disabled at specific points, potentially overriding state set at a more
     * generic scope.  Ex:
     *
     *      //# fashion -ingline
     *      @font-face {
     *          src: url(foo.eot);
     *          src: url(foo.svg);
     *          //# fashion +inline
     *          src: url(foo.ttf);
     *      }
     *
     * @param tag The tag to search for.
     * @param prefix An optional prefix, such as 'fashion warn'.  Defaults to 'fashion'
     * @param enable A regex indicating a match for the enable state (+tag).
     * @param disable A regex indicating a match for the disable state (-tag)
     * @returns {any} true for enable | false for disable | null for unspecified
     */
    hasTag(tag, prefix, enable, disable) {
        prefix = prefix || "fashion";
        enable = enable || new RegExp('^\\s*//#\\s*' + prefix + '\\s*\\+?' + tag + "\s*$");
        disable = disable || new RegExp('^\\s*//#\\s*' + prefix + '\\s*\\-' + tag + '\\s*$');
        var docs = this.docs;
        if (docs && docs.length) {
            for (var d = 0; d < this.docs.length; d++) {
                var doc = docs[d];
                if (enable.test(doc)) {
                    return true;
                }
                if (disable.test(doc)) {
                    return false;
                }
            }
        }

        if (this.parentNode) {
            return this.parentNode.hasTag(tag, prefix, enable, disable);
        }

        return null;
    }

    toDisplayString() {
        return '[' + this.constructor.name + ' : ' + this.toString() + ']';
    }
}

Fashion.apply(Type.prototype, {
    visitTarget: undefined,
    $isFashionType: true,
    $canUnbox: true,

    $isFashionLiteral: false,
    $isFashionNumber: false,
    $isFashionString: false,
    $isFashionBool: false,

    $constant: false,

    /**
     * if this value is a global variable, this field will store the global
     * variable name by which this value is referenced.
     */
    $referenceName: undefined,

    $referenceBase: undefined,
    $previousReference: undefined,

    value: undefined,
    unit: undefined,
    parentNode: undefined,
    docs: undefined,
    ast: undefined
});

module.exports = Type;

},{"../Base.js":19}],41:[function(require,module,exports){
"use strict";

var Fashion = require('../Base.js');

class TypeVisitor {
    constructor(cfg) {
        if (cfg) {
            Fashion.apply(this, cfg);
        }
    }

    literal(obj) {
        obj.descend(this);
    }

    bool(obj) {
        obj.descend(this);
    }

    string(obj) {
        obj.descend(this);
    }

    number(obj) {
        obj.descend(this);
    }

    map(obj) {
        obj.descend(this);
    }

    functioncall(obj) {
        obj.descend(this);
    }

    parenthetical(obj) {
        obj.descend(this);
    }

    list(obj) {
        obj.descend(this);
    }

    hsla(obj) {
        obj.descend(this);
    }

    rgba(obj) {
        obj.descend(this);
    }

    colorstop(obj) {
        obj.descend(this);
    }

    lineargradient(obj) {
        obj.descend(this);
    }

    radialgradient(obj) {
        obj.descend(this);
    }

    visitItem(obj) {
        obj.doVisit(this);
    }

    visit(obj) {
        while (obj && (obj.visitTarget !== undefined)) {
            obj = obj.visitTarget
        }
        if (obj) {
            if (Array.isArray(obj)) {
                for (var i = 0; i < obj.length; i++) {
                    this.visit(obj[i]);
                }
            } else {
                this.visitItem(obj);
            }
        }
    }

    /**
     * this is an extension point for allowing overrides of the entry visit method
     * when called duing the post-processing mechanism in CSS.ts
     * @param obj
     */
    execute(obj, context) {
        this.visit(obj);
    }
}

TypeVisitor.prototype.context = null;

module.exports = TypeVisitor;

},{"../Base.js":19}],42:[function(require,module,exports){
"use strict";

var Bool = require('./Bool.js');
var Literal = require('./Literal.js');

var Types = {
    Bool: Bool,
    Literal: Literal,
    Text: require('./Text.js'),
    Numeric: require('./Numeric.js'),
    Color: require('./Color.js'),
    ColorRGBA: require('./ColorRGBA.js'),
    ColorHSLA: require('./ColorHSLA.js'),
    ColorStop: require('./ColorStop.js'),
    LinearGradient: require('./LinearGradient.js'),
    RadialGradient: require('./RadialGradient.js'),
    List: require('./List.js'),
    Map: require('./Map.js'),
    ParentheticalExpression: require('./ParentheticalExpression.js'),
    FunctionCall: require('./FunctionCall.js'),
    Null: Literal.Null,
    None: Literal.None,
    True: Bool.True,
    False: Bool.False
};

module.exports = Types;
},{"./Bool.js":24,"./Color.js":25,"./ColorHSLA.js":26,"./ColorRGBA.js":27,"./ColorStop.js":28,"./FunctionCall.js":29,"./LinearGradient.js":30,"./List.js":31,"./Literal.js":32,"./Map.js":33,"./Numeric.js":34,"./ParentheticalExpression.js":35,"./RadialGradient.js":36,"./Text.js":39}],43:[function(require,module,exports){
"use strict";

var Color = require('../export/type/Color.js');

module.exports = {
    init(runtime) {
        runtime.register({
            adjust_color: function (color, red, green, blue, hue, saturation, lightness, alpha) {
                var adjusted = color.getRGBA().copy(),
                    adjust = Color.adjust,
                    comps = Color.comps;

                red && (adjusted[comps.red] += red.value);
                blue && (adjusted[comps.blue] += blue.value);
                green && (adjusted[comps.green] += green.value);

                adjusted[comps.red] = Math.max(0, Math.min(adjusted[comps.red], 255));
                adjusted[comps.blue] = Math.max(0, Math.min(adjusted[comps.blue], 255));
                adjusted[comps.green] = Math.max(0, Math.min(adjusted[comps.green], 255));
                
                alpha && (adjusted[comps.alpha] = Math.max(0, Math.min(1, adjusted[comps.alpha] + alpha.value)));
                hue && (adjusted = adjust(adjusted, 'hue', hue));
                lightness && (adjusted = adjust(adjusted, 'lightness', lightness));
                saturation && (adjusted = adjust(adjusted, 'saturation', saturation));

                return adjusted;
            },

            scale_color: function () {
            },


            change_color: function (color, red, green, blue, hue, saturation, lightness, alpha) {
                var adjusted = color.getRGBA().clone(),
                    adjust = Color.adjust,
                    comps = Color.comps;

                red && (adjusted[comps.red] = red.value);
                blue && (adjusted[comps.blue] = blue.value);
                green && (adjusted[comps.green] = green.value);

                adjusted[comps.red] = Math.max(0, Math.min(adjusted[comps.red], 255));
                adjusted[comps.blue] = Math.max(0, Math.min(adjusted[comps.blue], 255));
                adjusted[comps.green] = Math.max(0, Math.min(adjusted[comps.green], 255));

                alpha && (adjusted[comps.alpha] = Math.max(0, Math.min(1, alpha.value)));
                hue && (adjusted = adjusted.getHSLA()) && (adjusted.h = hue.value);
                lightness && (adjusted = adjusted.getHSLA()) && (adjusted.l = lightness.value);
                saturation && (adjusted = adjusted.getHSLA()) && (adjusted.s = saturation.value);

                return adjusted;
            },

            // def ie_hex_str(color)
            //   assert_type color, :Color
            //   alpha = (color.alpha * 255).round
            //   alphastr = alpha.to_s(16).rjust(2, '0')
            //   Sass::Script::String.new("##{alphastr}#{color.send(:hex_str)[1..-1]}".upcase)
            // end
            ie_hex_str: function (color) {

                if (color.type !== 'hsla' && color.type !== 'rgba') {
                    throw color + ' is not a color for \'ie-hex-str\'';
                }
                return color.toIeHexStr();
            }
        });
    }
};

},{"../export/type/Color.js":25}],44:[function(require,module,exports){
"use strict";

var LinearGradient = require('../export/type/LinearGradient.js');
var RadialGradient = require('../export/type/RadialGradient.js');
var List = require('../export/type/List.js');
var ColorStop = require('../export/type/ColorStop.js');

module.exports = {
    init(runtime) {
        runtime.register({
            linear_gradient: function (position, stops) {
                stops = this.tailArgs(1, arguments);

                if (stops && stops.length === 1) {
                    stops = stops[0];
                }

                if (
                    (position.type === 'list' && (position.get(1).type === 'rgba' || position.get(1).type === 'hsla')) ||
                    position.type === 'hsla' ||
                    position.type === 'rgba'
                ) {
                    stops = this.color_stops.apply(this, arguments);
                    position = null;
                }
                else if (position.type == 'list' && position.get(1).type == 'colorstop') {
                    stops = position;
                    position = null;
                }
                else if (stops.type === 'hsla' || stops.type === 'rgba') {
                    stops = this.color_stops.call(this, new List([stops]));
                }
                else {
                    stops = this.color_stops.call(this, stops);
                }


                return new LinearGradient(position, stops);
            },

            radial_gradient: function (position, shape, stops) {
                stops = this.tailArgs(2, arguments);

                if (stops && stops.length === 1) {
                    stops = stops[0];
                }

                if (
                    (position.type === 'list' && (position.get(1).type === 'rgba' || position.get(1).type === 'hsla')) ||
                    position.type === 'hsla' ||
                    position.type === 'rgba'
                ) {
                    stops = this.color_stops.apply(this, arguments);
                    position = null;
                }
                else if (position.type == 'list' && position.get(1).type == 'colorstop') {
                    stops = position;
                    position = null;
                }
                else if (
                    (shape.type === 'list' && (shape.get(1).type === 'rgba' || shape.get(1).type === 'hsla')) ||
                    shape.type === 'hsla' ||
                    shape.type === 'rgba'
                ) {
                    stops = this.color_stops.apply(this, arguments);
                    shape = null;
                }
                else if (shape.type == 'list' && shape.get(1).type == 'colorstop') {
                    stops = shape;
                    shape = null;
                }
                else if (stops.type === 'hsla' || stops.type === 'rgba') {
                    stops = this.color_stops.call(this, new List([stops]));
                }
                else {
                    stops = this.color_stops.call(this, stops);
                }

                return new RadialGradient(position, shape, stops);
            },

            color_stops: function () {
                var args = this.tailArgs(0, arguments),
                    mapped = this.handleArgs(args && args.items || args, [['stops']]),
                    stops = mapped.stops.items,
                    ln = stops.length,
                    list = new List(null, ', '),
                    i, arg;

                for (i = 0; i < ln; i++) {
                    arg = stops[i];
                    if (arg.type === 'list') {
                        if (arg.items.length === 2) {
                            list.add(new ColorStop(arg.get(1), arg.get(2)));
                        } else {
                            list.items.push.apply(list.items, arg.items);
                        }
                    }
                    else if (arg.type === 'rgba' || arg.type === 'hsla') {
                        list.add(new ColorStop(arg));
                    }
                    else if (Array.isArray(arg)) {
                        list.items.push.apply(list.items, arg);
                    }
                    else {
                        list.add(arg);
                    }
                }
                return list;
            }
        });
    }

}

},{"../export/type/ColorStop.js":28,"../export/type/LinearGradient.js":30,"../export/type/List.js":31,"../export/type/RadialGradient.js":36}],45:[function(require,module,exports){
"use strict";

var Fashion = require('../export/Base.js');
var Color = require('../export/type/Color.js');
var ColorRGBA = require('../export/type/ColorRGBA.js');
var ColorHSLA = require('../export/type/ColorHSLA.js');
var Numeric = require('../export/type/Numeric.js');
var Literal = require('../export/type/Literal.js');

module.exports = {
    init(runtime) {
        runtime.register({
            hsla: function (hue, saturation, lightness, alpha) {
                if (arguments.length != 4) {
                    Fashion.raise('Wrong number of arguments (' + arguments.length + ' for 4) for \'hsla\'');
                }

                if (!hue.$isFashionNumber) {
                    Fashion.raise(hue + ' is not a number for \'hsla\'');
                }
                if (!saturation.$isFashionNumber) {
                    Fashion.raise(saturation + ' is not a number for \'hsla\'');
                }
                if (!lightness.$isFashionNumber) {
                    Fashion.raise(lightness + ' is not a number for \'hsla\'');
                }
                if (!alpha.$isFashionNumber) {
                    Fashion.raise(alpha + ' is not a number for \'hsla\'');
                }

                if (saturation.value !== Color.constrainPercentage(saturation.value)) {
                    Fashion.raise('Saturation ' + saturation + ' must be between 0% and 100% for \'hsla\'');
                }
                if (lightness.value !== Color.constrainPercentage(lightness.value)) {
                    Fashion.raise('Lightness ' + lightness + ' must be between 0% and 100% for \'hsla\'');
                }
                if (alpha.value !== Color.constrainAlpha(alpha.value)) {
                    Fashion.raise('Alpha channel ' + alpha + ' must be between 0 and 1 for \'hsla\'');
                }

                return new ColorHSLA(hue.value, saturation.value, lightness.value, alpha.value);
            },

            hsl: function (hue, saturation, lightness) {
                var len = arguments.length;
                if (len != 3) {
                    Fashion.raise('Wrong number of arguments (' + len + ' for 3) for \'hsl\'');
                }
                return this.hsla(hue, saturation, lightness, new Numeric(1));
            },

            hue: function (color) {
                if (color == null || color.$isFashionNull) {
                    return Literal.Null;
                }
                if (color.type !== 'hsla' && color.type !== 'rgba') {
                    Fashion.raise(color + ' is not a color for \'hue\'');
                }
                return Color.component(color, 'hue');
            },

            saturation: function (color) {
                if (color == null || color.$isFashionNull) {
                    return Literal.Null;
                }
                if (color.type !== 'hsla' && color.type !== 'rgba') {
                    Fashion.raise(color + ' is not a color for \'saturation\'');
                }
                return Color.component(color, 'saturation');
            },

            lightness: function (color) {
                if (color == null || color.$isFashionNull) {
                    return Literal.Null;
                }
                if (color.type !== 'hsla' && color.type !== 'rgba') {
                    Fashion.raise(color + ' is not a color for \'lightness\'');
                }
                return Color.component(color, 'lightness');
            },

            adjust_hue: function (color, degrees) {
                if (color == null || color.$isFashionNull) {
                    return Literal.Null;
                }
                if (color.type !== 'hsla' && color.type !== 'rgba') {
                    Fashion.raise(color + ' is not a color for \'adjust-hue\'');
                }
                if (degrees.type !== 'number') {
                    Fashion.raise(degrees + ' is not a number for \'adjust-hue\'');
                }
                //if (degrees.value < -360 || degrees.value > 360) {
                //    Fashion.raise('Amount ' + degrees + ' must be between 0deg and 360deg for \'adjust-hue\'');
                //}
                return Color.adjust(color, 'hue', degrees);
            },

            lighten: function (color, amount) {
                if (color == null || color.$isFashionNull) {
                    return Literal.Null;
                }
                if (color.type !== 'hsla' && color.type !== 'rgba') {
                    Fashion.raise(color + ' is not a color for \'lighten\'');
                }
                if (amount.type !== 'number') {
                    Fashion.raise(amount + ' is not a number for \'lighten\'');
                }
                if (amount.value !== Color.constrainPercentage(amount.value)) {
                    Fashion.raise('Amount ' + amount + ' must be between 0% and 100% for \'lighten\'');
                }

                return Color.adjust(color, 'lightness', amount);
            },

            darken: function (color, amount) {
                if (color == null || color.$isFashionNull) {
                    return Literal.Null;
                }
                if (color.type !== 'hsla' && color.type !== 'rgba') {
                    Fashion.raise(color + ' is not a color for \'darken\'');
                }
                if (amount.type !== 'number') {
                    Fashion.raise(amount + ' is not a number for \'darken\'');
                }

                if (amount.value !== Color.constrainPercentage(amount.value)) {
                    Fashion.raise('Amount ' + amount + ' must be between 0% and 100% for \'darken\'');
                }

                amount = amount.clone();
                amount.value *= -1;
                return Color.adjust(color, 'lightness', amount);
            },

            saturate: function (color, amount) {
                if (color == null || color.$isFashionNull) {
                    return Literal.Null;
                }
                if (!amount) {
                    return new Literal('saturate(' + color.toString() + ')');
                }
                if (color.type !== 'hsla' && color.type !== 'rgba') {
                    Fashion.raise(color + ' is not a color for \'saturate\'');
                }
                if (amount.type !== 'number') {
                    Fashion.raise(amount + ' is not a number for \'saturate\'');
                }
                if (amount.value !== Color.constrainPercentage(amount.value)) {
                    Fashion.raise('Amount ' + amount + ' must be between 0% and 100% for \'saturate\'');
                }

                return Color.adjust(color, 'saturation', amount);
            },

            desaturate: function (color, amount) {
                if (color == null || color.$isFashionNull) {
                    return Literal.Null;
                }
                if (color.type !== 'hsla' && color.type !== 'rgba') {
                    Fashion.raise(color + ' is not a color for \'desaturate\'');
                }
                if (amount.type !== 'number') {
                    Fashion.raise(amount + ' is not a number for \'desaturate\'');
                }
                if (amount.value !== Color.constrainPercentage(amount.value)) {
                    Fashion.raise('Amount ' + amount + ' must be between 0% and 100% for \'desaturate\'');
                }

                amount.value *= -1;
                return Color.adjust(color, 'saturation', amount);
            },

            grayscale: function (color) {
                if (color == null || color.$isFashionNull) {
                    return Literal.Null;
                }
                if (color.$isFashionNumber) {
                    return new Literal('grayscale(' + color.toString() + ')');
                }

                if (color.type !== 'hsla' && color.type !== 'rgba') {
                    Fashion.raise(color + ' is not a color for \'grayscale\'');
                }
                return this.desaturate(color, new Numeric(100, '%'));
            },

            complement: function (color) {
                if (color == null || color.$isFashionNull) {
                    return Literal.Null;
                }
                if (color.type !== 'hsla' && color.type !== 'rgba') {
                    Fashion.raise(color + ' is not a color for \'complement\'');
                }
                return this.adjust_hue(color, new Numeric(180, 'deg'));
            },

            invert: function (color) {
                if (color == null || color.$isFashionNull) {
                    return Literal.Null;
                }
                if (color.$isFashionNumber) {
                    return new Literal('invert(' + color.toString() + ')');
                }

                if (color.type !== 'hsla' && color.type !== 'rgba') {
                    Fashion.raise(color + ' is not a color for \'invert\'');
                }
                color = color.getRGBA();

                return new ColorRGBA(
                    255 - color.r,
                    255 - color.g,
                    255 - color.b,
                    color.a
                );
            }
        });
    }
}

},{"../export/Base.js":19,"../export/type/Color.js":25,"../export/type/ColorHSLA.js":26,"../export/type/ColorRGBA.js":27,"../export/type/Literal.js":32,"../export/type/Numeric.js":34}],46:[function(require,module,exports){
"use strict";

var Fashion = require('../export/Base.js');
var Literal = require('../export/type/Literal.js');
var Text = require('../export/type/Text.js');
var Bool = require('../export/type/Bool.js');

module.exports = {
    init(runtime) {
        runtime.register({
            type_of: function (value) {
                if (value === true || value === false) {
                    return new Literal('bool');
                }
                if (value === Literal.Null) {
                    return new Literal('null');
                }
                if (value.type == 'hsla' || value.type == 'rgba') {
                    return new Literal('color');
                }
                if (value.type == 'literal' || value.type == 'string') {
                    return new Literal('string');
                }
                return new Literal(value.type);
            },

            unit: function (number) {
                if (!number.$isFashionNumber) {
                    Fashion.raise(number + ' is not a number for \'unit\'');
                }
                return new Text(number.getUnitStr() || '');
            },

            unitless: function (number) {
                if (number.type != 'number') {
                    Fashion.raise(number + ' is not a number for \'unitless\'');
                }
                return new Bool(!number.unit);
            },

            strip_unit: function(a) {
                if (!a || !a.$isFashionNumber) {
                    var val = (a ? a.toDisplayString() : '[null]');
                    Fashion.raise(val + ' is not a number for \'strip-unit\'');
                }
                return new Fashion.Numeric(a.value);
            },

            comparable: function (number_1, number_2) {
                if (number_1.type != 'number') {
                    Fashion.raise(number_1 + ' is not a number for \'comparable\'');
                }
                if (number_2.type != 'number') {
                    Fashion.raise(number_2 + ' is not a number for \'comparable\'');
                }
                return new Bool(!!number_1.comparable(number_2));
            },

            variable_exists: function (name) {
                var nameStr = name;
                if (name.$isFashionString || name.$isFashionLiteral) {
                    nameStr = name.value;
                }
                nameStr = Fashion.getJsName(nameStr);
                if (nameStr.indexOf('$') !== 0) {
                    nameStr = "$" + nameStr;
                }
                var scope = this.getRuntime().getCurrentScope();
                return !!scope.get(nameStr);
            },

            global_variable_exists: function (name) {
                var nameStr = name;
                if (name.$isFashionString || name.$isFashionLiteral) {
                    nameStr = name.value;
                }
                nameStr = Fashion.getJsName(nameStr);
                if (nameStr.indexOf('$') !== 0) {
                    nameStr = "$" + nameStr;
                }
                var scope = this.getRuntime().getGlobalScope();
                return !!scope.get(nameStr);
            },

            function_exists: function (name) {
                var nameStr = name;
                if (name.$isFashionString || name.$isFashionLiteral) {
                    nameStr = name.value;
                }
                nameStr = Fashion.getJsName(nameStr);
                var extensions = this.getRuntime().getRegisteredFunctions(),
                    functions = this.getRuntime().getFunctions();

                return (nameStr in extensions) || (nameStr in functions);
            },

            mixin_exists: function (name) {
                var nameStr = name;
                if (name.$isFashionString || name.$isFashionLiteral) {
                    nameStr = name.value;
                }
                nameStr = Fashion.getJsName(nameStr);
                var mixins = this.getRuntime().getMixins();

                return (nameStr in mixins);
            },

            call: function (name) {
                if (!name || !name.$isFashionLiteral) {
                    Fashion.raise(name + ' is not a string or literal for \'call\'');
                }
                var args = this.sliceArgs(arguments, 1),
                    runtime = this.getRuntime(),
                    functions = runtime.getFunctions(),
                    extensions = runtime.getRegisteredFunctions(),
                    funcName = getJsName(name.value);

                if (functions[funcName]) {
                    return functions[funcName].apply(functions, args);
                }

                else if (extensions[funcName]) {
                    return extensions[funcName].apply(this, args);
                }
                return Literal.Null;
            }
        });
    }

}


},{"../export/Base.js":19,"../export/type/Bool.js":24,"../export/type/Literal.js":32,"../export/type/Text.js":39}],47:[function(require,module,exports){
"use strict";

var Fashion = require('../export/Base.js');
var Numeric = require('../export/type/Numeric.js');
var List = require('../export/type/List.js');

module.exports = {
    init(runtime) {
        runtime.register({
            length: function (list) {
                if (list.type !== 'list') {
                    return new Numeric(arguments.length);
                }
                return new Numeric(list.items.length);
            },

            nth: function (list, index) {
                if (list.type !== 'list') {
                    list = new List([list]);
                }

                if (index.type != 'number' || index.value.toFixed(0) != index.value) {
                    Fashion.raise('List index ' + index + ' must be an integer for \'nth\'');
                }

                var value = index.value;
                if (value < 0) {
                    value = Math.max(1, list.items.length + value + 1);
                }

                if (value === 0) {
                    Fashion.raise('List index ' + value + ' must be greater than or equal to 1 for \'nth\'');
                }

                if (value - 1 >= list.items.length) {
                    Fashion.raise('List index is ' + value + ' but list is only ' + list.items.length + ' item' + (list.items.length === 1 ? '' : 's') + ' long for \'nth\'');
                }

                return list.get(value);
            },

            first_value_of: function (list) {
                if (list.type !== 'list') {
                    list = new List([list]);
                }
                return this.nth(list, new Numeric(1));
            },

            last_value_of: function (list) {
                if (list.type !== 'list') {
                    list = new List(list);
                }
                return this.nth(list, new Numeric(list.items.length));
            },

            compact: function () {
                var list = arguments,
                    items, sep = ', ';

                if (list.type !== 'list') {
                    list = new List(list);
                }

                items = list.items;
                if (items.length == 1 && items[0].type == 'list') {
                    list = items[0];
                    items = list.items;
                    sep = list.separator;
                }

                list = new List(null, sep);
                for (var i = 0; i < items.length; i++) {
                    var item = items[i];
                    if (this.unbox(item)) {
                        list.add(item);
                    }
                }
                return list;
            },

            _compass_list_size: function () {
                var list = arguments;

                if (list.type !== 'list') {
                    list = new List(list);
                }
                return new Numeric(list.items.length);
            },

            join: function (list1, list2, separator) {
                if (list1.type !== 'list') {
                    list1 = new List([list1]);
                    list1.separator = null;
                }

                if (list2.type !== 'list') {
                    list2 = new List([list2]);
                    list2.separator = null;
                }

                if (!separator) {
                    separator = (list1.items.length && list1.separator) || (list2.items.length && list2.separator) || ' ';
                }

                if (separator.type === 'literal') {
                    switch (separator.value) {
                        case 'comma':
                            separator = ', ';
                            break;
                        case 'space':
                            separator = ' ';
                            break;
                        case 'auto':
                            separator = list1.separator || list2.separator || ' ';
                            break;
                        default:
                            Fashion.raise('Separator name must be space, comma, or auto for \'join\'');
                            break;
                    }
                }

                if (separator.type === 'string') {
                    separator = separator.value;
                }

                return new List(list1.items.concat(list2.items), separator);
            },

            append: function () {
                return this.join.apply(this, arguments);
            },

            box: function (list, index) {
                if (!(list instanceof List)) {
                    list = new List([list]);
                }

                list = list.items.slice();
                if (index >= list.length) {
                    switch (list.length) {
                        case 1:
                            list[1] = list[2] = list[3] = list[0];
                            break;
                        case 2:
                            list[2] = list[0];
                            list[3] = list[1];
                            break;
                        case 3:
                            list[3] = list[1];
                            break;
                    }
                }
                return list[index - 1];
            },

            zip: function () {
                var lists = this.sliceArgs(arguments),
                    output = [],
                    minLen = -1,
                    list;

                for (var i = 0; i < lists.length; i++) {
                    list = lists[i].items;
                    if (minLen === -1) {
                        minLen = list.length;
                    } else if (list.length < minLen) {
                        minLen = list.length;
                    }
                }

                for (var i = 0; i < minLen; i++) {
                    var newList = [];
                    for (var j = 0; j < lists.length; j++) {
                        newList.push(lists[j].items[i]);
                    }
                    output.push(new List(newList, ' '));
                }

                return new List(output, ', ');
            }
        });
    }

}

},{"../export/Base.js":19,"../export/type/List.js":31,"../export/type/Numeric.js":34}],48:[function(require,module,exports){
"use strict";

var Literal = require('../export/type/Literal.js');
var Bool = require('../export/type/Bool.js');

module.exports = {
    init(runtime) {
        runtime.register({
            __if: function (condition, if_true, if_false) {
                return this.unbox(condition) ? if_true : if_false;
            },

            theme_image: function (theme, file) {
                return new Literal('url("resources/images/' + theme.value + '/' + file.value + '")');
            },

            prefixed: function (prefix, items) {
                if (arguments.length > 2) {
                    items = Array.prototype.slice.call(arguments, 1);
                }

                prefix = this.unbox(prefix);

                if (prefix.indexOf("-") === 0) {
                    prefix = prefix.substring(1);
                }
                if (!Array.isArray(items)) {
                    if (items.supports && items.supports(prefix)) {
                        return Bool.True;
                    }
                } else {
                    var ln = items.length, i, arg;
                    for (i = 0; i < ln; i++) {
                        arg = items[i];
                        if (arg.supports && arg.supports(prefix)) {
                            return Bool.True;
                        }
                    }
                }

                return Bool.False;
            },

            _owg: function (value) {
                return new Literal(value.toPrefixedString('owg'));
            },

            _webkit: function (value) {
                return new Literal(value.toPrefixedString('-webkit-'));
            },

            _o: function (value) {
                return new Literal(value.toPrefixedString('-o-'));
            },

            _moz: function (value) {
                return new Literal(value.toPrefixedString('-moz-'));
            }
        });
    }

}

},{"../export/type/Bool.js":24,"../export/type/Literal.js":32}],49:[function(require,module,exports){
"use strict";

var Fashion = require('../export/Base.js');
var Numeric = require('../export/type/Numeric.js');
var Literal = require('../export/type/Literal.js');

module.exports = {
    init(runtime) {
        runtime.register({
            percentage: function (value) {
                if (value == null || value.$isFashionNull) {
                    return Literal.Null;
                }
                if (value.type != 'number' || value.getUnitStr()) {
                    Fashion.raise(value + ' is not a unitless number for \'percentage\'');
                }
                return new Numeric(value.value * 100, '%');
            },

            round: function (value) {
                if (value == null || value.$isFashionNull) {
                    return Literal.Null;
                }
                if (value.type !== 'number') {
                    Fashion.raise(value + ' is not a number for \'round\'');
                }
                return new Numeric(Math.round(value.value), value.unit);
            },

            ceil: function (value) {
                if (value == null || value.$isFashionNull) {
                    return Literal.Null;
                }
                if (value.type !== 'number') {
                    Fashion.raise(value + ' is not a number for \'ceil\'');
                }
                return new Numeric(Math.ceil(value.value), value.unit);
            },

            floor: function (value) {
                if (value == null || value.$isFashionNull) {
                    return Literal.Null;
                }
                if (value.type !== 'number') {
                    Fashion.raise(value + ' is not a number for \'floor\'');
                }
                return new Numeric(Math.floor(value.value), value.unit);
            },

            abs: function (value) {
                if (value == null || value.$isFashionNull) {
                    return Literal.Null;
                }
                if (value.type !== 'number') {
                    Fashion.raise(value + ' is not a number for \'abs\'');
                }
                return new Numeric(Math.abs(value.value), value.unit);
            },

            min: function () {
                var args = this.sliceArgs(arguments),
                    arg, i, min;

                for (i = 0; i < args.length; i++) {
                    arg = args[i];
                    if (arg == null || arg.$isFashionNull) {
                        return Literal.Null;
                    }
                    if (!arg || !arg.$isFashionNumber) {
                        Fashion.raise(arg + ' is not a number for \'min\'');
                    }

                    if (!min || this.unbox(arg.operate('<', min))) {
                        min = arg;
                    }
                }

                return min && min.copy();
            },

            max: function (a, b) {
                var args = this.sliceArgs(arguments),
                    arg, i, max;

                for (i = 0; i < args.length; i++) {
                    arg = args[i];
                    if (arg == null || arg.$isFashionNull) {
                        return Literal.Null;
                    }
                    if (!arg || !arg.$isFashionNumber) {
                        Fashion.raise(arg + ' is not a number for \'max\'');
                    }

                    if (!max || this.unbox(arg.operate('>', max))) {
                        max = arg;
                    }
                }

                return max && max.copy();
            }
        });
    }

};

},{"../export/Base.js":19,"../export/type/Literal.js":32,"../export/type/Numeric.js":34}],50:[function(require,module,exports){
"use strict";

var Fashion = require('../export/Base.js');
var Literal = require('../export/type/Literal.js');
var Color = require('../export/type/Color.js');
var Numeric = require('../export/type/Numeric.js');

module.exports = {
    init(runtime) {
        runtime.register({
            alpha: function (color) {
                if (color && color.$isFashionNumber) {
                    return new Literal('alpha(' + color.toString() + ')');
                }

                color = Array.isArray(color) ? color[0] : color;

                if (color && color.$isFashionLiteral) {
                    return color;
                }

                if (color.type !== 'hsla' && color.type !== 'rgba') {
                    Fashion.raise(color + ' is not a color for \'alpha\'');
                }
                return Color.component(color, 'alpha');
            },

            opacity: function (color) {
                if (color && color.$isFashionNumber) {
                    return new Literal('opacity(' + color.toString() + ')');
                }

                color = Array.isArray(color) ? color[0] : color;

                if (color && color.$isFashionLiteral) {
                    return color;
                }

                if (color.type !== 'hsla' && color.type !== 'rgba') {
                    Fashion.raise(color + ' is not a color for \'opacity\'');
                }
                return Color.component(color, 'alpha');
            },

            opacify: function (color, amount) {
                if (color.type !== 'hsla' && color.type !== 'rgba') {
                    Fashion.raise(color + ' is not a color for \'opacify\'');
                }
                if (amount.type !== 'number') {
                    Fashion.raise(amount + ' is not a number for \'opacify\'');
                }
                if (amount.unit == '%') {
                    if (amount.value !== Color.constrainPercentage(amount.value)) {
                        Fashion.raise('Amount ' + amount + ' must be between 0% and 100% for \'opacify\'');
                    }
                    amount = new Numeric(amount.value / 100);
                } else if (amount.value !== Color.constrainAlpha(amount.value)) {
                    Fashion.raise('Amount ' + amount + ' must be between 0 and 1 for \'opacify\'');
                }


                var rgba = color.getRGBA().clone();
                rgba.a = Math.min(((rgba.a * 100) + (amount.value * 100)) / 100, 1);
                return rgba;
            },

            transparentize: function (color, amount) {
                if (color.type !== 'hsla' && color.type !== 'rgba') {
                    Fashion.raise(color + ' is not a color for \'transparentize\'');
                }
                if (amount.type !== 'number') {
                    Fashion.raise(amount + ' is not a number for \'transparentize\'');
                }
                if (amount.unit == '%') {
                    if (amount.value !== Color.constrainPercentage(amount.value)) {
                        Fashion.raise('Amount ' + amount + ' must be between 0% and 100% for \'transparentize\'');
                    }
                    amount = new Numeric(amount.value / 100);
                } else if (amount.value !== Color.constrainAlpha(amount.value)) {
                    Fashion.raise('Amount ' + amount + ' must be between 0 and 1 for \'transparentize\'');
                }


                var rgba = color.getRGBA().clone();
                rgba.a = Math.max(((rgba.a * 100) - (amount.value * 100)) / 100, 0);
                return rgba;
            },

            fade_in: function (color, amount) {
                return this.opacify(color, amount);
            },

            fade_out: function (color, amount) {
                return this.transparentize(color, amount);
            }
        });
    }
};

},{"../export/Base.js":19,"../export/type/Color.js":25,"../export/type/Literal.js":32,"../export/type/Numeric.js":34}],51:[function(require,module,exports){
"use strict";

var Fashion = require('../export/Base.js');
var Literal = require('../export/type/Literal.js');
var Color = require('../export/type/Color.js');
var ColorRGBA = require('../export/type/ColorRGBA.js');
var Numeric = require('../export/type/Numeric.js');

module.exports = {
    init(runtime) {
        runtime.register({
            rgba: function (red, green, blue, alpha, color) {
                var colorInst;

                if (!!red && !!color) {
                    Fashion.raise("Unsupported arguments to RGBA");
                }

                if (color && !red) {
                    if (color.$isFashionColor) {
                        colorInst = color;
                    } else {
                        Fashion.raise("Unsupported arguments to RGBA");
                    }
                } else if (red && red.$isFashionColor) {
                    colorInst = red;
                }

                if (colorInst) {
                    alpha = green || alpha;
                    colorInst = colorInst.getRGBA();
                    red = new Numeric(colorInst.r);
                    green = new Numeric(colorInst.g);
                    blue = new Numeric(colorInst.b);
                }

                if (!red || !red.$isFashionNumber) {
                    if (red == null || red.$isFashionNull) {
                        return Literal.Null;
                    }
                    Fashion.raise(red + ' is not a number for \'rgba\' red');
                }
                if (!green || !green.$isFashionNumber) {
                    if (green == null || green.$isFashionNull) {
                        return Literal.Null;
                    }
                    Fashion.raise(green + ' is not a number for \'rgba\' green');
                }
                if (!blue || !blue.$isFashionNumber) {
                    if (blue == null || blue.$isFashionNull) {
                        return Literal.Null;
                    }
                    Fashion.raise(blue + ' is not a number for \'rgba\' blue');
                }
                if (!alpha || !alpha.$isFashionNumber) {
                    if (alpha == null || alpha.$isFashionNull) {
                        return Literal.Null;
                    }
                    Fashion.raise(alpha + ' is not a number for \'rgba\' alpha');
                }

                if (red.unit == '%') {
                    red = new Numeric(Color.constrainPercentage(red.value) / 100 * 255);
                } else if (red.value !== Color.constrainChannel(red.value)) {
                    Fashion.raise('Color value ' + red + ' must be between 0 and 255 inclusive for \'rgba\'');
                }

                if (green.unit == '%') {
                    green = new Numeric(Color.constrainPercentage(green.value) / 100 * 255);
                } else if (green.value !== Color.constrainChannel(green.value)) {
                    Fashion.raise('Color value ' + green + ' must be between 0 and 255 inclusive for \'rgba\'');
                }

                if (blue.unit == '%') {
                    blue = new Numeric(Color.constrainPercentage(blue.value) / 100 * 255);
                } else if (blue.value !== Color.constrainChannel(blue.value)) {
                    Fashion.raise('Color value ' + blue + ' must be between 0 and 255 inclusive for \'rgba\'');
                }

                if (alpha.unit == '%') {
                    alpha = new Numeric(Color.constrainPercentage(alpha.value) / 100);
                } else if (alpha.value !== Color.constrainAlpha(alpha.value)) {
                    Fashion.raise('Alpha channel ' + alpha + ' must be between 0 and 1 inclusive for \'rgba\'');
                }

                return new ColorRGBA(red.value, green.value, blue.value, alpha.value);
            },

            rgb: function (red, green, blue, color) {
                return this.rgba(red, green, blue, new Numeric(1), color);
            },

            red: function (color) {
                if (color == null || color.$isFashionNull) {
                    return Literal.Null;
                }
                if (color.type !== 'hsla' && color.type !== 'rgba') {
                    Fashion.raise(color + ' is not a color for \'red\'');
                }
                return Color.component(color, 'red');
            },

            green: function (color) {
                if (color == null || color.$isFashionNull) {
                    return Literal.Null;
                }
                if (color.type !== 'hsla' && color.type !== 'rgba') {
                    Fashion.raise(color + ' is not a color for \'green\'');
                }
                return Color.component(color, 'green');
            },

            blue: function (color) {
                if (color == null || color.$isFashionNull) {
                    return Literal.Null;
                }
                if (color.type !== 'hsla' && color.type !== 'rgba') {
                    Fashion.raise(color + ' is not a color for \'blue\'');
                }
                return Color.component(color, 'blue');
            },

            mix: function (color_1, color_2, weight) {
                if (color_1 == null || color_1.$isFashionNull) {
                    return Literal.Null;
                }
                if (color_2 == null || color_2.$isFashionNull) {
                    return Literal.Null;
                }
                
                weight = (weight !== undefined) ? weight : new Numeric(50, '%');

                if (color_1.type !== 'hsla' && color_1.type !== 'rgba') {
                    Fashion.raise('arg 1 ' + color_1 + ' is not a color for \'mix\'');
                }
                if (color_2.type !== 'hsla' && color_2.type !== 'rgba') {
                    Fashion.raise('arg 2 ' + color_2 + ' is not a color for \'mix\'');
                }
                if (weight.type !== 'number') {
                    Fashion.raise('arg 3 ' + weight + ' is not a number for \'mix\'');
                }
                if (weight.value !== Color.constrainPercentage(weight.value)) {
                    Fashion.raise('Weight ' + weight + ' must be between 0% and 100% for \'mix\'');
                }

                color_1 = color_1.getRGBA();
                color_2 = color_2.getRGBA();

                weight = weight.value / 100;

                var factor = (weight * 2) - 1,
                    alpha = color_1.a - color_2.a,
                    weight1 = (((factor * alpha == -1) ? factor : (factor + alpha) / (1 + factor * alpha)) + 1) / 2,
                    weight2 = 1 - weight1;

                return new ColorRGBA(
                    (weight1 * color_1.r) + (weight2 * color_2.r),
                    (weight1 * color_1.g) + (weight2 * color_2.g),
                    (weight1 * color_1.b) + (weight2 * color_2.b),
                    (weight * color_1.a) + ((1 - weight) * color_2.a)
                );
            }
        });
    }
};

},{"../export/Base.js":19,"../export/type/Color.js":25,"../export/type/ColorRGBA.js":27,"../export/type/Literal.js":32,"../export/type/Numeric.js":34}],52:[function(require,module,exports){
"use strict";

var Text = require('../export/type/Text.js');

module.exports = {
    init(runtime) {
        runtime.register({
            headers: function (from, to) {
                var fromVal, toVal,
                    headers = [], h;
                if (from.$isFashionLiteral && from.value == 'all') {
                    fromVal = 1;
                    toVal = 6;
                } else {
                    fromVal = this.unbox(from);
                    toVal = this.unbox(to);
                }
                for (h = fromVal; h < toVal + 1; h++) {
                    headers.push("h" + h);
                }
                return new Text(headers.join(", "));
            },

            headings: function (from, to) {
                return this.headers(from, to);
            }
        });
    }
};

},{"../export/type/Text.js":39}],53:[function(require,module,exports){
"use strict";

var Fashion = require('../export/Base.js');
var Text = require('../export/type/Text.js');
var Literal = require('../export/type/Literal.js');
var Numeric = require('../export/type/Numeric.js');

module.exports = {
    init(runtime) {
        runtime.register({
            quote: function (string) {
                if (!string.$isFashionString && !string.$isFashionLiteral) {
                    Fashion.raise(string + ' is not a string or literal for \'quote\'');
                }

                return new Text(string.value);
            },

            unquote: function (string) {
                //if (!string.$isFashionString && !string.$isFashionLiteral && !string.$isFashionColor) {
                //    Fashion.raise(string + ' is not a string or literal for \'unquote\'');
                //}

                if (string.$isFashionString) {
                    return new Literal(Literal.deEscape(string.value));
                }
                return string;
            },

            str_slice: function (string, start_at, end_at) {
                if (!string.$isFashionLiteral && !string.$isFashionString) {
                    Fashion.raise(string + ' is not a string or literal for \'str-slice\'');
                }
                return string.slice(start_at, end_at);
            },

            str_length: function (string) {
                if (!string.$isFashionLiteral && !string.$isFashionString) {
                    Fashion.raise(string + ' is not a string or literal for \'str-slice\'');
                }
                return new Numeric(string.value.length);
            },

            to_upper_case: function (string) {
                if (!string.$isFashionLiteral && !string.$isFashionString) {
                    Fashion.raise(string + ' is not a string or literal for \'to-lower-case\'');
                }
                return string.toUpperCase();
            },

            to_lower_case: function (string) {
                if (!string.$isFashionLiteral && !string.$isFashionString) {
                    Fashion.raise(string + ' is not a string or literal for \'to-lower-case\'');
                }
                return string.toLowerCase();
            },

            str_index: function (string, substring) {
                if (!string.$isFashionLiteral && !string.$isFashionString) {
                    Fashion.raise(string + ' is not a string or literal for \'str-insert\'');
                }
                if (!substring.$isFashionLiteral && !substring.$isFashionString) {
                    Fashion.raise(substring + ' is not a string or literal for \'str-insert\'');
                }
                return string.indexOf(substring);
            },

            str_insert: function (string, insert, index) {
                if (!string.$isFashionLiteral && !string.$isFashionString) {
                    Fashion.raise(string + ' is not a string or literal for \'str-insert\'');
                }
                if (!insert.$isFashionLiteral && !insert.$isFashionString) {
                    Fashion.raise(insert + ' is not a string or literal for \'str-insert\'');
                }
                return string.insert(insert, index);
            }

        });
    }
}

},{"../export/Base.js":19,"../export/type/Literal.js":32,"../export/type/Numeric.js":34,"../export/type/Text.js":39}],54:[function(require,module,exports){
"use strict";

var Map = require('../export/type/Map.js');
var Literal = require('../export/type/Literal.js');
var Text = require('../export/type/Text.js');
var List = require('../export/type/List.js');
var Bool = require('../export/type/Bool.js');
var Env = require('../Env.js');

module.exports = {
    init(runtime) {
        runtime.register({
            parsebox: function (list, num) {
                
                if (list == null || list.$isFashionNull) {
                    return Literal.Null;
                }
                
                var ret, size, actual = [], i, item;

                num = this.unbox(num);

                if (list.type === 'list') {
                    list = list.items;
                }

                if (!this.isArray(list)) {
                    list = [list];
                }

                size = list.length;

                for (i = 0; i < size; i++) {
                    actual.push(list[i]);
                }

                if (num >= size) {
                    if (size === 1) {
                        actual.push(list[0]);
                        actual.push(list[0]);
                        actual.push(list[0]);
                    } else if (size === 2) {
                        actual.push(list[0]);
                        actual.push(list[1]);
                    } else if (size === 3) {
                        actual.push(list[1]);
                    }
                }

                ret = actual[num - 1];
                return ret;
            },

            is_null: function (value) {
                if (value === Literal.Null) {
                    return true;
                }

                switch (value.type) {
                    case 'string':
                    case 'literal':
                        value = value.value;
                        return value == 'null' || value == 'none' || value === null;
                    default:
                        return false;
                }
            },

            file_join: function (value1, value2) {
                value1 = this.unbox(value1);
                value2 = this.unbox(value2);
                var joined = value1 ? value1 + '/' + value2 : value2;
                return new Text(joined, '');
            },

            theme_image_exists: function (directory, path) {
                // don't use this.unbox here, as we need the actual unquoted value
                directory = directory.value;
                path = path.value;
                var fullPath = Env.join(directory, path);

                if (Env.isBrowser) {
                    return true;
                }
                return Env.exists(fullPath);
            },

            map_create: function () {
                return new Map();
            },

            map_put: function (map, key, value) {
                map.put(key, value);
            },

            map_get: function (map, key) {
                return map.get(key);
            },

            map_merge: function (map1, map2) {
                var ret = new Fashion.Map(map1 && map1.items && [].concat(map1.items));

                if (map2) {
                    for (var items = map2.items, i = 0; i < items.length; i += 2) {
                        var key = items[i],
                            value = items[i+1];
                        if (key && value) {
                            ret.put(items[i], items[i+1]);
                        }
                    }
                }

                return ret;
            },
            
            map_remove: function(map, key) {
                if (map && map.$isFashionMap) {
                    map.remove(key);
                }
            },
            
            map_keys: function(map) {
                if (map && map.$isFashionMap) {
                    return new List(map.getKeys(), ', ');
                }
            },
            
            map_values: function(map){
                if (map && map.$isFashionMap) {
                    return new List(map.getValues(), ', ');
                }
            },
            
            map_has_key: function(map, key) {
                if (map && map.$isFashionMap) {
                    return map.hasKey(key) ? Bool.True : Bool.False;
                }
                return Bool.False;
            }

        });
    }
};

},{"../Env.js":9,"../export/type/Bool.js":24,"../export/type/List.js":31,"../export/type/Literal.js":32,"../export/type/Map.js":33,"../export/type/Text.js":39}],55:[function(require,module,exports){
"use strict";

var Fashion = require('../export/Base.js'),
    Base = Fashion.Base;

var Scanner = require('./Scanner.js'),
    EOF = Scanner.EOF;

var Nodes = require('../parse/ast/Nodes.js'),
    Each = Nodes.Each,
    For = Nodes.For,
    While = Nodes.While,
    Charset = Nodes.Charset,
    FunctionNode = Nodes.Function,
    Ruleset = Nodes.Ruleset,
    Mixin = Nodes.Mixin,
    Block = Nodes.Block,
    Include = Nodes.Include,
    Assignment = Nodes.Assignment,
    Declaration = Nodes.Declaration,
    VariableAssignment = Nodes.VariableAssignment,
    If = Nodes.If,
    Else = Nodes.Else,
    Return = Nodes.Return,
    Parenthetical = Nodes.Parenthetical,
    SelectorPart = Nodes.SelectorPart,
    SelectorProperty = Nodes.SelectorProperty,
    CompoundSelector = Nodes.CompoundSelector,
    MultiPartSelector = Nodes.MultiPartSelector,
    SelectorList = Nodes.SelectorList,
    BinaryExpression = Nodes.BinaryExpression,
    UnaryExpression = Nodes.UnaryExpression,
    Variable = Nodes.Variable,
    Literal = Nodes.Literal,
    Number = Nodes.Number,
    String = Nodes.String,
    Length = Nodes.Length,
    Time = Nodes.Time,
    Angle = Nodes.Angle,
    Percentage = Nodes.Percentage,
    Color = Nodes.Color,
    FunctionCall = Nodes.FunctionCall,
    Extend = Nodes.Extend,
    List = Nodes.List,
    Warn = Nodes.Warn,
    Error = Nodes.Error,
    Debug = Nodes.Debug,
    Import = Nodes.Import,
    Require = Nodes.Require,
    Content = Nodes.Content,
    Debugger = Nodes.Debugger;

function debug(message) {
    //console.log(message);
}

class Parser extends Base {
    constructor(lax) {
        super();
        this.lax = lax;
        Fashion.apply(this, {
            isSelector: false,
            isParenthetical: false,
            isSelectorPart: false
        });
    }

    nextValueIs (val, offset) {
        var next = this.scanner.peek(offset);
        return next && next.value === val;
    }
    
    // Constant ::= Number |
    //              String |
    //              Length |
    //              Time |
    //              Angle |
    //              Percentage |
    //              Color;
    parseConstant() {
        var scanner = this.scanner,
            t = scanner.peek();

        if (t !== EOF && t.isOperator) {
            return undefined;
        }

        if (t.isNumber) {
            t = scanner.next();
            if (t.value.indexOf('\\') > -1) {
                var t2 = scanner.peek();
                if (t2.isNumber) {
                    scanner.next();
                    return new Literal(t, t1.value + t2.value);
                }
            }
            return new Number(t);
        }

        if (t.isString) {
            t = scanner.next();
            return new String(t);
        }

        if (t.isLength) {
            t = scanner.next();
            return new Length(t);
        }

        if (t.isTime) {
            t = scanner.next();
            return new Time(t);
        }

        if (t.isAngle) {
            t = scanner.next();
            return new Angle(t);
        }

        if (t.isPercentage) {
            t = scanner.next();
            return new Percentage(t);
        }

        if (t.isHash) {
            t = scanner.next();
            return new Color(t);
        }
        return undefined;
    }

    // Stylesheet ::= Statement*
    parseStylesheet() {
        var stat, statements = [];

        while (true) {
            stat = this.parseStatement();
            if (!stat) {
                break;
            }
            statements.push(stat);
        }

        return statements;
    }

    // Statement ::= Documentation |
    //               VariableAssignment |
    //               Directive |
    //               Directive ';' |
    //               Ruleset
    parseStatement() {
        var me = this,
            scanner = me.scanner,
            t = scanner.peek(), stat;

        if (t === EOF) {
            return undefined;
        }
        if (t.isVariable) {
            return me.parseVariableAssignment();
        }
        if (t.isDirective && t.value[1] !== '-') {
            stat = me.parseDirective();
            t = scanner.peek();
            if (t !== EOF && t.isOperator && t.value === ';') {
                scanner.next();
            }
            return stat;
        }
        if (t.isIdent) {
            var start = t.startIdx,
                line = t.startLine,
                fn = me.parseFunctionCall();
            t = scanner.peek();
            if (!!fn && t.value === ';') {
                scanner.next();
                return fn;
            } else {
                scanner.lineNumber = line;
                scanner.setIndex(start);
            }
        }
        return me.parseRuleset();
    }

    // Directive ::= Charset |
    //               Debug |
    //               Each |
    //               For |
    //               Function |
    //               If |
    //               Else |
    //               Extend |
    //               Mixin |
    //               Import |
    //               Include |
    //               While |
    //               Return
    parseDirective() {
        var me = this,
            scanner = me.scanner,
            t = scanner.peek();

        if (t.value === '@charset') {
            return me.parseCharset();
        }
        if (t.value === '@debug') {
            return me.parseDebug();
        }
        if (t.value === '@each') {
            return me.parseEach();
        }
        if (t.value === '@for') {
            return me.parseFor();
        }
        if (t.value === '@function') {
            return me.parseFunction();
        }
        if (t.value === '@if') {
            return me.parseIf();
        }
        if (t.value === '@elseif') {
            return me.parseElse();
        }
        if (t.value === '@else') {
            return me.parseElse();
        }
        if (t.value === '@extend') {
            return me.parseExtend();
        }
        if (t.value === '@import') {
            return me.parseImport();
        }
        if (t.value === '@require') {
            return me.parseRequire();
        }
        if (t.value === '@debugger') {
            return me.parseDebugger();
        }
        if (t.value === '@content') {
            return me.parseContent();
        }
        if (t.value === '@mixin') {
            return me.parseMixin();
        }
        if (t.value === '@include') {
            return me.parseInclude();
        }
        if (t.value === '@return') {
            return me.parseReturn();
        }
        if (t.value === '@while') {
            return me.parseWhile();
        }
        if (t.value === '@warn') {
            return me.parseWarn();
        }
        if (t.value === '@error') {
            return me.parseError();
        }

        Fashion.raiseAt('Unknown directive ' + t.value, scanner);
    }

    // Function ::= '@function' FunctionCall '{' ScopedStatement* '}'
    parseFunction() {
        var me = this,
            scanner = me.scanner,
            t, func, statements;

        t = scanner.next();
        if (t !== EOF && t.isDirective && t.value === '@function') {
            func = me.parseFunctionCall(true);
            statements = me.parseBlock().statements;

            return new FunctionNode({
                func: func,
                statements: statements,
                lineNumber: t.lineNumber,
                docs: scanner.flushDocs(),
                token: t,
                file: scanner.currentFile
            });
        }
        return undefined;
    }

    // Charset ::= '@charset' String
    parseCharset() {
        var me = this,
            scanner = me.scanner,
            t, charset;

        t = scanner.next();
        if (t !== EOF && t.isDirective && t.value === '@charset') {
            t = scanner.next();
            if (t !== EOF && t.isString) {
                charset = t.value;
                return new Charset({
                    charset: charset,
                    lineNumber: t.lineNumber,
                    docs: scanner.flushDocs(),
                    token: t,
                    file: scanner.currentFile
                });
            }

            Fashion.raiseAt('Expected a string after @charset', scanner);
        }
        return undefined;
    }

    // Debug ::= '@debug' Expression
    parseDebug() {
        var me = this,
            scanner = me.scanner,
            t, expr;

        t = scanner.next();
        if (t !== EOF && t.isDirective && t.value === '@debug') {
            expr = me.parseExpression();
            if (expr) {
                return new Debug({
                    expr: expr,
                    lineNumber: t.lineNumber,
                    docs: scanner.flushDocs(),
                    token: t,
                    file: scanner.currentFile
                });
            }

            Fashion.raiseAt('Expected an expression after @debug', scanner);
        }
        return undefined;
    }

    // Warn ::= '@warn' Expression
    parseWarn() {
        var me = this,
            scanner = me.scanner,
            t, expr;

        t = scanner.next();

        if (t !== EOF && t.isDirective && t.value === '@warn') {
            expr = me.parseExpression();
            if (expr) {
                return new Warn({
                    expr: expr,
                    lineNumber: t.lineNumber,
                    docs: scanner.flushDocs(),
                    token: t,
                    file: scanner.currentFile
                });
            }

            Fashion.raiseAt('Expected an expression after @debug', scanner);
        }
        return undefined;
    }

    // Warn ::= '@error' Expression
    parseError() {
        var me = this,
            scanner = me.scanner,
            t, expr;

        t = scanner.next();

        if (t !== EOF && t.isDirective && t.value === '@error') {
            expr = me.parseExpression();
            if (expr) {
                return new Error({
                    expr: expr,
                    lineNumber: t.lineNumber,
                    docs: scanner.flushDocs(),
                    token: t,
                    file: scanner.currentFile
                });
            }

            Fashion.raiseAt('Expected an expression after @debug', scanner);
        }
        return undefined;
    }

    // Each ::= '@each' Variable 'in' Sequence '{' ScopedStatement* '}'
    parseEach() {
        var me = this,
            scanner = me.scanner,
            t, id, seq, statements = [], stat, isMap;

        t = scanner.next();
        if (t !== EOF && t.isDirective && t.value === '@each') {

            t = scanner.next();
            if (t === EOF || !t.isVariable) {
                Fashion.raiseAt('Expected variable name after @each', scanner);
            }
            id = t.value;

            t = scanner.next();
            if (t !== EOF && t.value === ',') {
                t = scanner.next();
                if (t === EOF || !t.isVariable) {
                    Fashion.raiseAt('Expected variable name after "," in @each', scanner);
                }
                id = new List(null, [id, t.value], ', ');
                isMap = true;
                t = scanner.next();
            }

            if (t === EOF || !t.isIdent || t.value !== 'in') {
                Fashion.raiseAt('Expected "in" after variable in @each', scanner);
            }

            seq = me.parseSequence();
            if (seq.items) {
                seq = seq.items;
            }
            if (!seq) {
                Fashion.raiseAt('Expected value sequence after "in" in @each', scanner);
            }

            scanner.expect('{');
            while (true) {
                debug("parsing each");
                t = scanner.peek();
                if (t !== EOF && t.isOperator && t.value === '}') {
                    break;
                }
                stat = me.parseScopedStatement();
                if (!stat) {
                    break;
                }
                statements.push(stat);
            }
            scanner.expect('}');

            return new Each({
                variable: id,
                list: seq,
                statements: statements,
                lineNumber: t.lineNumber,
                docs: scanner.flushDocs(),
                token: t,
                file: scanner.currentFile,
                isMap: isMap
            });
        }

        return undefined;
    }

    // For ::= '@for' Variable 'from' Expression 'to' Expression '{' ScopedStatement* '}' |
    //         '@for' Variable 'from' Expression 'through' Expression '{' ScopedStatement* '}' |
    parseFor() {
        var me = this,
            scanner = me.scanner,
            t, id, start, end, inclusive, statements = [],
            stat;

        t = scanner.next();
        if (t !== EOF && t.isDirective && t.value === '@for') {

            t = scanner.next();
            if (t === EOF || !t.isVariable) {
                Fashion.raiseAt('Expected variable name after @for', scanner);
            }
            id = t.value;

            t = scanner.next();
            if (t === EOF || !t.isIdent || t.value !== 'from') {
                Fashion.raiseAt('Expected "from" after variable in @for', scanner);
            }

            start = me.parseExpression();
            if (!start) {
                Fashion.raiseAt('Expected an expression after "from" in @for', scanner);
            }

            t = scanner.next();
            if (t === EOF || !t.isIdent ||
                (t.value !== 'to' && t.value !== 'through')) {
                Fashion.raiseAt('Expected "to" or "through" in @for', scanner);
            }
            inclusive = t.value === 'through';

            end = me.parseExpression();
            if (!end) {
                Fashion.raiseAt('Expected a terminating expression in @for', scanner);
            }

            scanner.expect('{');
            while (true) {
                debug("parse for");
                t = scanner.peek();
                if (t !== EOF && t.isOperator && t.value === '}') {
                    break;
                }
                stat = me.parseScopedStatement();
                if (!stat) {
                    break;
                }
                statements.push(stat);
            }
            scanner.expect('}');

            return new For({
                variable: id,
                start: start,
                end: end,
                inclusive: inclusive,
                statements: statements,
                docs: scanner.flushDocs(),
                token: t,
                file: scanner.currentFile
            });
        }

        return undefined;
    }

    // While ::= '@while' Expression '{' ScopedStatement* '}'
    parseWhile() {
        var me = this,
            scanner = me.scanner,
            t, condition, stat, statements = [];

        t = scanner.next();
        if (t !== EOF && t.isDirective && t.value === '@while') {
            condition = me.parseExpression();

            scanner.expect('{');
            while (true) {
                debug("parse while");
                t = scanner.peek();
                if (t !== EOF && t.isOperator && t.value === '}') {
                    break;
                }
                stat = me.parseScopedStatement();
                if (!stat) {
                    break;
                }
                statements.push(stat);
            }
            scanner.expect('}');

            return new While({
                condition: condition,
                statements: statements,
                lineNumber: t.lineNumber,
                docs: scanner.flushDocs(),
                token: t,
                file: scanner.currentFile
            });
        }
        return undefined;
    }

    // If ::= '@if' Expression '{' ScopedStatement* '}'
    parseIf() {
        var me = this,
            scanner = me.scanner,
            t, condition, stat, statements = [];

        t = scanner.next();
        if (t !== EOF && t.isDirective && t.value === '@if') {
            condition = me.parseSequence();

            scanner.expect('{');
            while (true) {
                debug("parse if");
                t = scanner.peek();
                if (t !== EOF && t.isOperator && t.value === '}') {
                    break;
                }
                stat = me.parseScopedStatement();
                if (!stat) {
                    break;
                }
                statements.push(stat);
            }
            scanner.expect('}');

            return new If({
                condition: condition,
                statements: statements,
                lineNumber: t.lineNumber,
                docs: scanner.flushDocs(),
                token: t,
                file: scanner.currentFile
            });
        }
        return undefined;
    }

    // Else ::= '@else'   Expression '{' ScopedStatement* '}' |
    //          '@else'   If |
    //          '@elseif' Expression '{' ScopedStatement* '}'
    parseElse() {
        var me = this,
            scanner = me.scanner,
            t, condition, stat, statements = [],
            isElseIf;

        t = scanner.next();
        if (t !== EOF && t.isDirective && (t.value === '@else' || t.value == '@elseif')) {
            isElseIf = t.value == '@elseif'

            t = scanner.peek();
            if (isElseIf) {
                condition = me.parseExpression();
            } else if (t.isIdent && t.value === 'if') {
                scanner.next();
                condition = me.parseExpression();
            }

            scanner.expect('{');
            while (true) {
                debug("parse else");
                t = scanner.peek();
                if (t !== EOF && t.isOperator && t.value === '}') {
                    break;
                }
                if (t === undefined || t === EOF) {
                    break;
                }

                stat = me.parseScopedStatement();
                if (stat) {
                    statements.push(stat);
                } else {
                    break;
                }
            }
            scanner.expect('}');

            return new Else({
                condition: condition,
                statements: statements,
                lineNumber: t.lineNumber,
                docs: scanner.flushDocs(),
                token: t,
                file: scanner.currentFile
            });
        }
        return undefined;
    }

    // Extend ::= '@extend' Selector
    parseExtend() {
        var me = this,
            scanner = me.scanner,
            t, selector;

        t = scanner.next();
        if (t !== EOF && t.isDirective && t.value === '@extend') {
            selector = me.parseSelectors();
            if (selector) {
                return new Extend({
                    selector: selector,
                    lineNumber: t.lineNumber,
                    docs: scanner.flushDocs(),
                    token: t,
                    file: scanner.currentFile
                });
            } else {
                Fashion.raiseAt('Expecting attribute name', scanner);
            }
        }
    }

    // Import ::= '@import' Argument
    parseImport() {
        var scanner = this.scanner,
            t = scanner.next(), expr,
            t2;

        if (t !== EOF && t.isDirective && t.value === '@import') {
            t = scanner.peek();
            t2 = scanner.peek(2);
            if (t.isString && t2.value == ';') {
                scanner.next();
                return new Import({
                    source: new Literal(t),
                    lineNumber: t.lineNumber,
                    docs: scanner.flushDocs(),
                    token: t,
                    file: scanner.currentFile
                });
            } else {
                expr = this.parseSelectorSequence();
                return new Import({
                    source: expr,
                    lineNumber: t.lineNumber,
                    docs: scanner.flushDocs(),
                    token: t,
                    file: scanner.currentFile
                });
            }
        }

        return undefined;
    }

    // Require ::= '@require' Argument
    parseRequire() {
        var scanner = this.scanner,
            t = scanner.next(), expr,
            t2;

        if (t !== EOF && t.isDirective && t.value === '@require') {
            t = scanner.peek();
            t2 = scanner.peek(2);
            if (t.isString && t2.value == ';') {
                scanner.next();
                return new Require({
                    source: new Literal(t),
                    lineNumber: t.lineNumber,
                    docs: scanner.flushDocs(),
                    token: t,
                    file: scanner.currentFile
                });
            } else {
                expr = this.parseSequence();
                return new Require({
                    source: expr,
                    lineNumber: t.lineNumber,
                    docs: scanner.flushDocs(),
                    token: t,
                    file: scanner.currentFile
                });
            }
        }

        return undefined;
    }

    parseDebugger() {
        var scanner = this.scanner,
            t = scanner.next();

        return new Debugger({
            lineNumber: t.lineNumber,
            docs: scanner.flushDocs(),
            token: t,
            file: scanner.currentFile
        });
    }

    parseContent() {
        var scanner = this.scanner,
            t = scanner.next();

        return new Content({
            type: "Content",
            lineNumber: t.lineNumber,
            docs: scanner.flushDocs(),
            token: t,
            file: scanner.currentFile
        });
    }

    // Mixin ::= '@mixin' FunctionCall '{' ScopedStatements* '}'
    parseMixin() {
        var scanner = this.scanner,
            t, stat, mixin;

        t = scanner.next();
        if (t !== EOF && t.isDirective && t.value === '@mixin') {

            mixin = new Mixin({
                name: this.parseFunctionCall(true),
                statements: [],
                docs: scanner.flushDocs(),
                token: t,
                file: scanner.currentFile
            });

            mixin.statements = this.parseBlock().statements;

            t = scanner.peek();
            if (t !== EOF && t.isOperator && t.value === ';') {
                scanner.next();
            }
        }
        return mixin;
    }

    // Include ::= '@include' Identifier
    parseInclude() {
        var scanner = this.scanner,
            t, inc, block;

        t = scanner.next();
        if (t !== EOF && t.isDirective && t.value === '@include') {
            inc = this.parseFunctionCall(true);
            if (this.nextValueIs('{')) {
                block = this.parseBlock();
            }
            return new Include({
                include: inc,
                lineNumber: t.lineNumber,
                docs: scanner.flushDocs(),
                token: t,
                file: scanner.currentFile,
                content: block
            });
        }
        return undefined;
    }

    parseBlock() {
        var scanner = this.scanner,
            t, stat, statements = [];

        t = scanner.peek();
        if (!t || t === EOF) {
            return undefined;
        }

        if (t.value === ';') {
            scanner.next();
            return undefined;
        }
        scanner.expect('{');
        while (true) {
            debug("parse block");
            t = scanner.peek();

            if (t === null || t === undefined) {
                break;
            }

            if (t.value === ';') {
                scanner.next();
                continue;
            }

            if (t === null || t === undefined) {
                break;
            }

            if (t !== EOF && t.isOperator && t.value === '}') {
                break;
            }

            stat = this.parseScopedStatement();
            if (stat) {
                statements.push(stat);
            } else {
                break;
            }
        }
        debug("done parsing block");
        scanner.expect('}');
        return new Block({
            statements: statements,
            docs: scanner.flushDocs(),
            token: t,
            file: scanner.currentFile
        });
    }

    // Return ::= '@return' Identifier
    parseReturn() {
        var scanner = this.scanner,
            t, expr;

        t = scanner.next();
        if (t !== EOF && t.isDirective && t.value === '@return') {
            expr = this.parseSequence();
            return new Return({
                expr: expr,
                lineNumber: t.lineNumber,
                docs: scanner.flushDocs(),
                token: t,
                file: scanner.currentFile
            });
        }
        return undefined;
    }

    // VariableAssignment ::= VariableName ':' Expression ';' |
    //                        VariableName ':' Expression !default ';'
    parseVariableAssignment() {
        var scanner = this.scanner,
            t, assignment, start, end;

        t = scanner.next();
        assignment = new VariableAssignment(t, t.value);

        try {
            scanner.expect(':');
            t = scanner.peek();
            start = t ? t.startIdx : -1;
            assignment.value = this.parseValue();
            t = scanner.peek();
            end = t ? t.startIdx : start;
            while (t !== EOF && t.isOperator && t.value === '!') {
                t = scanner.next();
                t = scanner.next();
                if (t.value === 'default') {
                    assignment['default'] = true;
                } else if (t.value === 'global') {
                    assignment['global'] = true;
                } else if (t.value === 'dynamic') {
                    assignment['dynamic'] = true;
                }
                end = t.startIdx;
                t = scanner.peek();
            }

            if (start > -1) {
                assignment.valueText = scanner.style.substring(start, end);
            }
            t = scanner.peek();
            if (t !== EOF && t.value === ';') {
                scanner.expect(';');
            }
        }
        catch (e) {
            if (!this.lax) {
                throw e;
            }
        }

        return assignment;
    }

    // Ruleset ::= Selectors '{' ScopedStatement* '}'
    parseRuleset() {
        var scanner = this.scanner,
            t, selectors, statements, block;

        t = scanner.peek();
        selectors = this.parseSelectors();
        block = this.parseBlock();
        statements = block && block.statements;

        return new Ruleset({
            selectors: selectors,
            statements: statements,
            blockDocs: block && block.docs,
            lineNumber: t.lineNumber,
            docs: ((selectors && selectors.docs) || []).concat(scanner.flushDocs() || []),
            token: t,
            file: scanner.currentFile
        });
    }

    // Selectors ::= Selector |
    //               Selectors ',' Selector
    parseSelectors() {
        var selectors = this.parseSelectorSequence();
        return selectors;
    }

    // Attempt to parse the incoming tokens as if they form a selector.
    // Returns the token right after the parse can't move anymore.
    tryParseSelectors() {
        var scanner = this.scanner,
            peek = scanner.peek(),
            index = peek.startIdx,
            line = peek.startLine,
            docs = scanner.docs,
            token;

        try {
            this.parseSelectors();
        } catch (e) {
            this.isSelector = false;
        }
        token = scanner.peek();
        scanner.lineNumber = line;
        scanner.setIndex(index);
        scanner.docs = docs;

        return token;
    }

    // ScopedStatement ::= Ruleset |
    //                     Declaration |
    //                     VariableAssignment |
    //                     Directive
    parseScopedStatement() {
        var me = this,
            scanner = me.scanner,
            t = scanner.peek(), stat;


        if (t.isHash || t.isClass) {
            return me.parseRuleset();
        }
        if (t !== EOF && t.isOperator && (t.value === '&' || t.value === '>' || t.value === '~' || t.value === ':' || t.value === '%')) {
            return me.parseRuleset();
        }
        if (t.isVariable) {
            return me.parseVariableAssignment();
        }
        if (t.isDirective) {
            stat = me.parseDirective();
            t = scanner.peek();
            if (t !== EOF && t.isOperator && t.value === ';') {
                scanner.next();
            }
            return stat;
        }

        // Handle things like '-webkit-foobar: value'
        if (t !== EOF && t.isOperator && t.value === '-') {
            return me.parseDeclaration();
        }

        // This could be Declaration or Ruleset
        if (t.isIdent ||
            t.isNumber ||
            t.isPercentage ||
            (t.isOperator && t.value !== '}')) {
            //var idx = t.idx;
            //if(scanner.style.charAt(idx) === ':') {
            //    if(scanner.style.charAt(idx+1) !== ' ') {
            //        return me.parseRuleset();
            //    }
            //}
            
            
            var idx = 1,
                skipRuleset = false,
                directive = false,
                tmp = scanner.peek(idx++);
            
            while(tmp && !tmp.isEOF && 
                tmp.value !== '{' && 
                tmp.value !== '}' && 
                tmp.value !== ';') {
                if (tmp.value.indexOf('@') === 0) {
                    directive = true;
                }
                if (tmp.value === ':') {
                    if (scanner.style.charAt(tmp.idx) === ' ' && !directive) {
                        skipRuleset = true;
                    }
                    if (this.nextValueIs('{', idx)) {
                        skipRuleset = true;
                    }
                }
                tmp = scanner.peek(idx++);
            }
            
            if (tmp && tmp.value === '{' && !skipRuleset) {
                return me.parseRuleset();
            }
            return me.parseDeclaration();
            
/*
            t = me.tryParseSelectors();
            if (t !== EOF && t.isOperator && t.value === '{') {
                //system.print('tryParse: treat as selector');
                return me.parseRuleset();
            }
            return me.parseDeclaration();
*/
        }

        return undefined;
    }

    // Declaration ::= Identifier ':' Value |
    //                 Identifier ':' Value '!important'
    parseDeclaration() {
        var me = this,
            scanner = me.scanner,
            t = scanner.next(),
            decl = new Declaration({
                property: '',
                docs: scanner.flushDocs(),
                lineNumber: scanner.lineNumber,
                token: t,
                file: scanner.currentFile
            });
        
        if (t !== EOF && t.isOperator && (t.value === '*' || t.value === '-')) {
            decl.property = t.value;
            t = scanner.next();

            // special case for property name like '-#{prefix}-box-shadow'
            if (t !== EOF && t.isHash) {
                t.type = 'ident';
            }
        }
        if (t !== EOF && t.isIdent) {
            decl.property += t.value;
            scanner.expect(':');

            t = scanner.peek();
            if (decl.property.indexOf('--') === 0) {
                var start = t.startIdx,
                    idx = start,
                    end = start,
                    brace = 0,
                    paren = 0,
                    bracket = 0,
                    quote = null,
                    ch;
                
                loop: for (idx = start; idx < scanner.style.length; idx++) {
                    ch = scanner.style.charAt(idx);
                    switch(ch) {
                        case '"':
                        case "'":
                            if (!quote) {
                                quote = ch;
                            }
                            else if (quote === ch) {
                                quote = null;
                            }
                            break;
                        case '{':
                            brace++;
                            break;
                        case '(':
                            paren++;
                            break;
                        case '[':
                            bracket++;
                            break;
                        case '}':
                            brace--;
                            break;
                        case ')':
                            paren--;
                            break;
                        case ']':
                            bracket--;
                            break;
                        case ';':
                            if (bracket === 0 &&
                                brace === 0 &&
                                paren === 0 &&
                                !quote) {
                                end = idx;
                                break loop;
                            }
                            break;
                        default:
                            break;
                    }
                }

                scanner.setIndex(end);
                var data = {
                    value: scanner.style.substring(start, end).trim()
                };
                decl.value = new Literal(t, JSON.stringify(data));
                decl.value.jsonEncoded = true;

            }
            //special hack for IE
            else if (decl.property === 'filter' || decl.property === '-ms-filter' || decl.property === '_filter') {
                decl.value = me.parseFilterValue();
            }
            else {
                decl.value = me.parseValue();
            }

            t = scanner.peek();
            if (t !== EOF) {
                if (t.isOperator && t.value === '!') {
                    scanner.next();
                    t = scanner.next();
                    if (t.isIdent && t.value === 'important') {
                        decl.important = true;
                    }
                }
            }
            t = scanner.peek();
            if (t !== EOF) {
                if (t.isOperator && t.value === ';') {
                    scanner.next();
                }
            }

            return decl;
        } else {
            var message = [
                'Property declaration: expected identifier but saw ',
                JSON.stringify(t),
                ' instead : ',
                scanner.lineNumber,
                ":",
                scanner.index - scanner.start
            ].join('');

            Fashion.error(message);
            Fashion.raiseAt(message, scanner);
        }
    }

    // Value ::= Sequence |
    //           Value Sequence
    parseValue() {
        var scanner = this.scanner,
            t, stat, statements = [], sequence,
            ruleset;

        sequence = this.parseSequence();

        t = scanner.peek();
        if (t !== EOF && t.isOperator && t.value == '{') {
            scanner.next();
            while ((stat = this.parseScopedStatement()) !== undefined) {
                statements.push(stat);
            }
            scanner.expect('}');
            ruleset = new Ruleset({
                statements: statements,
                selectors: [],
                lineNumber: t.lineNumber,
                docs: scanner.flushDocs(),
                token: t,
                file: scanner.currentFile
            });
        }

        if (ruleset) {
            if (sequence.items) {
                sequence.items.push(ruleset);
            } else if (sequence) {
                sequence = new List(null, [sequence, ruleset], ' ');
            } else {
                sequence = ruleset;
            }
        }

        return sequence;
    }

    parseFilterFunctionCall() {
        var scanner = this.scanner,
            t, peek, pos;

        t = scanner.peek();
        if (t === EOF) {
            return;
        }

        if (t.type == 'ident' && (t.value == 'progid' || t.value == 'chroma')) {
            pos = t.startIdx;
            while (true) {
                peek = scanner.peek();
                if (peek && peek.isOperator && peek.value === ')') {
                    t = scanner.next();
                    break;
                }
                if (peek && peek.value === ';') {
                    break;
                }
                t = scanner.next();
            }
            return new Literal(t, this.style.substring(pos, t.idx)
                .replace(/\r/g, '')
                .replace(/\n/g, '')
                .replace(/\s+/g, ' ')
                .trim());
        }
    }

    // Value ::= Sequence |
    //           Value Sequence
    parseFilterValue() {
        var scanner = this.scanner,
            t, args, value = [], pos, separator = ' ';

        while (true) {
            debug("parse filter value");
            t = scanner.peek();
            if (t.value == ',') {
                separator = ',';
                scanner.next();
                continue;
            }

            if (t === EOF) {
                break;
            }

            if (t.type == 'ident' && (t.value == 'progid' || t.value == 'chroma')) {
                value.push(this.parseFilterFunctionCall());
                continue;
            }

            if (t.isOperator) {
                if (t.value === ';' || t.value === '{' || t.value === '!' || t.value === '}') {
                    break;
                }
            }

            args = this.parseSequence();
            if (args.items) {
                separator = args.separator;
                args = args.items;
            } else {
                args = [args];
            }

            if (args.length === 0) {
                break;
            } else if (args.length === 1) {
                value.push(args[0]);
            } else {
                value.push.apply(value, args);
            }
        }

        if (value.length === 0) {
            return null;
        }

        // Simplify if there is only one value in the array
        while (value.length === 1) {
            value = value[0];
        }

        if (value.length) {
            value = new List(null, value, separator);
        }

        return value;
    }

    // Expression ::= Relational |
    //                Identifier '=' Relational
    parseExpression() {
        var scanner = this.scanner,
            id, t = scanner.peek();

        if (t.isIdent) {
            t = scanner.peek(2);
            if (t !== EOF && t.isOperator) {
                switch (t.value) {
                    case '=':
                    case '~=':
                    case '|=':
                    case '^=':
                    case '$=':
                    case '*=':
                        id = scanner.next().value;
                        scanner.expect(t.value);
                        return new Assignment({
                            id: id,
                            expr: this.parseRelational(),
                            operator: t.value,
                            lineNumber: t.lineNumber,
                            docs: scanner.flushDocs(),
                            token: t,
                            file: scanner.currentFile
                        });
                    default:
                        break;
                }
            }
        } else if (t !== EOF && t.isOperator && t.value === '!') {
            var t2 = scanner.peek(2);
            if (t2 && t2.value === 'important') {
                t = scanner.next();
                t = scanner.next();
                return new Literal(t, '!important');
            }
        }

        return this.parseDisjunction();
    }

    // Disjunction ::= Conjunction |
    //                 Disjunction 'or' Conjunction
    parseDisjunction() {
        var scanner = this.scanner,
            factor, or, t;

        or = this.parseConjunction();
        factor = or;
        while (true) {
            debug("parse disjunction");
            t = scanner.peek();
            if (t != EOF && t.isOperator && t.value === 'or' && !this.isSelector) {
                t = scanner.next();
                or = this.parseConjunction();
                if (!or) {
                    break;
                }
                factor = new BinaryExpression({
                    operator: 'or',
                    left: factor,
                    right: or,
                    docs: scanner.flushDocs(),
                    token: t,
                    file: scanner.currentFile
                });
            } else {
                break;
            }
        }
        return factor;
    }

    // Conjunction ::= LogicalAnd |
    //                 Conjunction 'and' LogicalAnd
    parseConjunction() {
        var scanner = this.scanner,
            or, and, t;

        and = this.parseComplement();
        or = and;
        while (true) {
            debug("parse conjunction");
            t = scanner.peek();
            if (t !== EOF && t.isOperator && t.value === 'and' && !this.isSelector) {
                t = scanner.next();
                and = this.parseComplement();
                if (!and) {
                    break;
                }
                or = new BinaryExpression({
                    operator: 'and',
                    left: or,
                    right: and,
                    docs: scanner.flushDocs(),
                    token: t,
                    file: scanner.currentFile
                });
            } else {
                break;
            }
        }
        return or;
    }

    // Complement ::= Primary |
    //                'not' Primary
    parseComplement() {
        var scanner = this.scanner,
            t;

        t = scanner.peek();
        if (t !== EOF && t.isOperator && t.value === 'not') {
            if (this.isSelectorParen) {
                scanner.next();
                return new Literal(t, 'not');
            }
            if (!this.isSelector) {
                scanner.next();
                return new UnaryExpression({
                    operator: 'not',
                    expr: this.parseRelational(),
                    lineNumber: t.lineNumber,
                    docs: scanner.flushDocs(),
                    token: t,
                    file: scanner.currentFile
                });
            }
        }

        return this.parseRelational();
    }

    // Relational ::= Additive |
    //                Relational '==' Additive |
    //                Relational '!=' Additive |
    //                Relational '<' Additive |
    //                Relational '>' Additive |
    //                Relational '<=' Comparison |
    //                Relational '>=' Comparison
    parseRelational() {
        var scanner = this.scanner,
            cmp, expr, t;

        cmp = this.parseAdditive();
        expr = cmp;

        while (true) {
            debug("parse relational");
            t = scanner.peek();
            if (t !== EOF && t.isOperator && (t.value === '==' || t.value === '!=' ||
                t.value === '<' || t.value === '<=' || t.value === '>=' ||
                (t.value === '>' && !this.isSelector))) {
                t = scanner.next();
                cmp = this.parseAdditive();
                if (!cmp) {
                    break;
                }
                expr = new BinaryExpression({
                    operator: t.value,
                    left: expr,
                    right: cmp,
                    docs: scanner.flushDocs(),
                    token: t,
                    file: scanner.currentFile
                });
            } else {
                break;
            }
        }

        return expr;
    }

    // Additive ::= Multiplicative |
    //              Additive '+' Multiplicative |
    //              Additive '-' Multiplicative
    parseAdditive() {
        var scanner = this.scanner,
            term, cmp, t;

        term = this.parseMultiplicative();
        cmp = term;

        while (true) {
            debug("parse additive");
            t = scanner.peek();
            if (t !== EOF && t.isOperator && (t.value === '+' || t.value === '-') && !this.isSelector) {
                t = scanner.next();
                term = this.parseMultiplicative();
                if (!term) {
                    break;
                }
                cmp = new BinaryExpression({
                    operator: t.value,
                    left: cmp,
                    right: term,
                    docs: scanner.flushDocs(),
                    token: t,
                    file: scanner.currentFile
                });
            } else {
                break;
            }
        }

        return cmp;
    }

    // Multiplicative ::= Disjunction |
    //                    Multiplicative '*' Disjunction |
    //                    Multiplicative '/' Disjunction |
    //                    Multiplicative '%' Disjunction
    parseMultiplicative() {
        var term, factor, t;

        factor = this.parsePrimary();
        term = factor;
        while (true) {
            debug("parse multiplicative");
            t = this.scanner.peek();
            if (t !== EOF && t.isOperator && (t.value === '*' || t.value === '/' || (t.value === '%' && !this.isSelector))) {
                t = this.scanner.next();
                factor = this.parsePrimary();
                if (!factor) {
                    break;
                }
                term = new BinaryExpression({
                    operator: t.value,
                    left: term,
                    right: factor,
                    docs: this.scanner.flushDocs()
                });
            } else {
                break;
            }
        }

        return term;
    }

    // Primary ::= '(' Value ')' |
    //             FunctionCall |
    //             Variable |
    //             Constant
    parsePrimary() {
        var scanner = this.scanner,
            t, t2, expr;

        t = scanner.peek();
        t2 = scanner.peek(2);

        if (t === EOF) {
            return undefined;
        }

        if (t !== EOF && t.isOperator && t.value === '(') {
            return this.parseParenthetical();
        }

        if (t.isIdent) {
            if (this.keywords[t.value]) {
                scanner.next();
                return new Literal(t);
            } else if (t.value === 'progid' && t2.value === ':') {
                return this.parseFilterFunctionCall();
            } else {
                return this.parseFunctionCall();
            }
        }

        if (t.isVariable) {
            t = scanner.next();
            if (t.negate) {
                return new BinaryExpression({
                    operator: '-',
                    right: new Variable(t, t.value),
                    docs: scanner.flushDocs(),
                    token: t,
                    file: scanner.currentFile
                });
            }
            return new Variable(t, t.value);
        }

        t = this.parseConstant();
        return t;
    }

    parseParenthetical() {
        var scanner = this.scanner,
            t = scanner.next(),
            selWas = this.isSelector,
            parWas = this.isParenthetical,
            selParWas = this.isSelectorParen,
            expr;

        if (parWas) {
            this.isSelector = false;
        }
        this.isParenthetical = true;
        this.isSelectorParen = selWas;

        expr = this.isSelector
            ? this.parseSelectorSequence(true)
            : this.parseSequence();

        this.isSelector = selWas;
        this.isParenthetical = parWas;
        this.isSelectorParen = selParWas;

        scanner.expect(')');
        if (expr && expr.isKVP) {
            expr = new List(null, [expr], ', ');
        }

        return new Parenthetical({
            expr: expr,
            lineNumber: t.lineNumber,
            docs: scanner.flushDocs(),
            token: t,
            file: scanner.currentFile
        })
    }


    // FunctionCall ::= Identifier '(' Arguments ')' |
    //                  Identifier '(' ')' |
    //                  Literal
    parseFunctionCall(allowSpaceBeforeParen) {
        var scanner = this.scanner,
            t = scanner.next(),
            id = t.value,
            start = t.idx, end, ch = '', prev, line,
            args = [],
            passThroughNames = {
                'expression': 1,
                'calc': 1,
                '-moz-calc': 1,
                '-webkit-calc': 1,
                '-ms-calc': 1
            },
            temp, twas;

        twas = t;
        t = scanner.peek();
        if (t !== EOF) {
            prev = scanner.style.charAt(start);
            if (t.isOperator && t.value === '(' && (prev !== ' ' || allowSpaceBeforeParen)) {
                scanner.next();
                t = scanner.peek();


                if (id in passThroughNames) {
                    // unquoted URL, e.g. url(http://foo.bar.com/baz.png)
                    // just consume everything until we get to ')'
                    start = t.startIdx;
                    end = start;
                    var parenCount = 0;
                    while (true) {
                        debug("parsing function call");
                        ch = scanner.style.charAt(end);
                        end += 1;
                        if (ch === '(') {
                            parenCount++;
                        }
                        if (!ch || !ch) {
                            end = start;
                            break;
                        }
                        if (ch === ')') {
                            if (parenCount === 0) {
                                break;
                            }
                            parenCount--;
                        }
                    }

                    debug("done parsing function call");
                    if (end != start) {
                        scanner.setIndex(end);
                        args.push(new Literal(null, scanner.style.substring(start, end - 1)));
                        return new FunctionCall(t, id, args);
                    }
                }

                else if ((id === 'url' || id === 'url-prefix') && t !== EOF && ((!t.isOperator || t.value === '/') && !t.isString)) {
                    // unquoted URL, e.g. url(http://foo.bar.com/baz.png)
                    // just consume everything until we get to ')'
                    start = t.startIdx;
                    end = start;
                    var tpl = 0, ch2;
                    while (true) {
                        ch = scanner.style.charAt(end);
                        ch2 = scanner.style.charAt(end + 1);

                        if (ch === '#' && ch2 === '{') {
                            tpl++;
                        }

                        if (ch === '}') {
                            if (tpl) {
                                tpl--;
                            } else {
                                end = start;
                                break;
                            }
                        }

                        if (ch === '(' || ch == "$") {
                            // if we detect an open paren, $, or an operator, this is probably
                            // an expression of some sort, so bail and defer
                            // to parseArguments
                            if (!tpl) {
                                end = start;
                                break;
                            }
                        }

                        if (ch === '+') {
                            if (!tpl &&
                                (scanner.style.indexOf("data:", start) != start) &&
                                (scanner.style.indexOf("http:", start) != start)) {
                                end = start;
                                break;
                            }
                        }

                        if (!ch || ch === ')') {
                            break;
                        }
                        if (!ch) {
                            end = start;
                            break;
                        }

                        end += 1;

                    }
                    if (end != start) {
                        scanner.setIndex(end);
                        args.push(new String(null, scanner.style.substring(start, end), ''));
                        scanner.next();
                        return new FunctionCall(t, id, args);
                    }
                }

                if (t !== EOF && (!t.isOperator || t.value !== ')')) {
                    temp = this.isSelector
                        ? this.parseSelectorSequence()
                        : this.parseArguments();
                } else {
                    temp = args;
                }

                t = scanner.peek();
                scanner.expect(')');

                return new FunctionCall(t, id, temp);
            }
        }

        return new Literal(twas, id);
    }

    parseSelectorPart() {
        var scanner = this.scanner,
            t;

        t = scanner.peek();

        if (t) {
            if (t.isClass) {
                t = scanner.next();
                return new SelectorPart({
                    selectorType: 'class',
                    value: new Literal(t)
                });
            } else if (t.isHash) {
                t = scanner.next();
                return new SelectorPart({
                    selectorType: 'id',
                    value: new Literal(t)
                });
            } else if (t.isOperator) {
                switch (t.value) {
                    case 'and':
                        scanner.next();
                        return new SelectorPart({
                            selectorType: 'and',
                            value: new Literal(t)
                        });
                        break;
                    case 'or':
                        scanner.next();
                        return new SelectorPart({
                            selectorType: 'or',
                            value: new Literal(t)
                        });
                        break;
                    case '*':
                        scanner.next();
                        return new SelectorPart({
                            selectorType: 'wildcard',
                            value: new Literal(t)
                        });
                        break;
                    case '!':
                        scanner.next();
                        return new SelectorPart({
                            selectorType: 'bang',
                            value: new Literal(t)
                        });
                        break;
                    case '|':
                        scanner.next();
                        return new SelectorPart({
                            selectorType: 'pipe',
                            value: new Literal(t)
                        });
                        break;
                    case '>':
                        scanner.next();
                        return new SelectorPart({
                            selectorType: 'direct',
                            value: new Literal(t)
                        });
                        break;
                    case '+':
                        scanner.next();
                        return new SelectorPart({
                            selectorType: 'after',
                            value: new Literal(t)
                        });
                        break;
                    case '~':
                        scanner.next();
                        return new SelectorPart({
                            selectorType: 'before',
                            value: new Literal(t)
                        });
                        break;
                    case '&':
                        scanner.next();
                        return new SelectorPart({
                            selectorType: 'parent',
                            value: new Literal(t)
                        });
                        break;
                    case '-':
                        scanner.next();
                        var expr = this.parseSelectorPart();
                        return new SelectorPart({
                            selectorType: 'dash',
                            value: expr
                        });
                        break;
                    case '%':
                        scanner.next();
                        var expr = this.parseSelectorPart();
                        return new SelectorPart({
                            selectorType: 'placeholder',
                            value: expr
                        });
                        break;
                    case '[':
                        scanner.next();
                        var expr = this.parseSelectorPart();
                        scanner.expect(']');
                        return new SelectorPart({
                            selectorType: 'attribute',
                            value: expr
                        });
                        break;
                    case ':' :
                        t = scanner.next();
                        var idx = t.idx;
                        t = scanner.peek();
                        if ((t !== EOF && t.value === '{') || scanner.style.charAt(idx) === ' ') {
                            // namespaced declaration
                            return undefined;
                        }
                        return new SelectorPart({
                            selectorType: 'pseudo',
                            value: this.parseSelectorPart()
                        });
                        break;
                    case 'not':
                        return new SelectorPart({
                            selectorType: 'not',
                            value: this.parseFunctionCall()
                        });
                    default:
                        break;
                }
            }
        }
        return this.parseExpression();
    }

    // Sequence ::= Expression |
    //              Sequence ',' Expression
    parseSequence() {
        var scanner = this.scanner,
            args = [],
            arg, t;

        while (true) {
            debug("parse sequence");
            arg = this.parseTuple();
            if (!arg) {
                break;
            }
            args.push(arg);
            t = scanner.peek();
            if (!t || t === EOF) {
                break;
            }

            if (t.value === ':') {
                scanner.next();
                arg = this.parseTuple();
                arg.variable = args.pop();
                arg.isKVP = true;
                args.push(arg);
                t = scanner.peek();
            }

            if (!t.isOperator || t.value !== ',') {
                break;
            }
            scanner.next();
        }

        if (args.length === 1) {
            if (args[0] == null) {
                debugger;
            }
            return args[0];
        }

        return new List(t, args, ', ');
    }

    // Sequence ::= Expression |
    //              Sequence ',' Expression
    parseSelectorSequence(isParenthetical) {
        var scanner = this.scanner,
            args = [],
            sequence = new SelectorList({
                items: args,
                separator: ', '
            }),
            arg, t, t2;

        while (true) {
            debug("parse sequence");
            arg = this.parseSelectorTuple();

            if (!arg) {
                break;
            }

            if (arg && (!arg.items || arg.items.length)) {
                args.push(arg);
            }

            t = scanner.peek();
            if (t === EOF) {
                break;
            }
            if (t.value === ':' && isParenthetical) {
                t2 = scanner.peek(2);
                if (t !== EOF && t.value !== '{' && t.value !== ';') {
                    scanner.next();
                    //var selWas = this.isSelector;
                    //this.isSelector = false;
                    arg = new SelectorProperty({
                        property: args.pop(),
                        value: this.parseSelectorTuple()
                    });
                    args.push(arg);
                    t = scanner.peek();
                    //this.isSelector = selWas;
                }
            }

            if (!t.isOperator || t.value !== ',') {
                break;
            }
            scanner.next();
        }

        if (args.length === 1) {
            return args[0];
        }

        return sequence;
    }

    parseSelectorTuple() {
        var scanner = this.scanner,
            separator = ' ',
            exprs = [], expr, t, idx, ch, startIdx, last, line,
            selectorWas = this.isSelector;

        this.isSelector = true;
        while (true) {
            debug("parse selector tuple");
            t = scanner.peek();
            if (t === EOF) {
                break;
            }
            idx = t.startIdx;
            line = t.startLine;
            last = exprs[exprs.length - 1];
            expr = this.parseSelectorPart();

            if (!expr) {
                scanner.lineNumber = line;
                scanner.setIndex(idx);
                break;
            }

            ch = scanner.style.charAt(idx);

            if (ch !== ' ' && ch !== '\t' && ch !== '\r' && ch !== '\n') {
                if (!last) {
                    exprs.push(expr);
                }
                else if (last.type !== 'CompoundSelector') {
                    last = new CompoundSelector({
                        separator: '',
                        items: [last, expr]
                    });
                    exprs[exprs.length - 1] = last;
                }
                else {
                    var items = last.items;
                    items.push(expr);
                }
            } else {
                exprs.push(expr);
            }
        }

        this.isSelector = selectorWas;

        if (exprs.length === 1) {
            return exprs[0];
        }

        return new MultiPartSelector({
            items: exprs,
            separator: separator
        });
    }

    parseTuple() {
        var scanner = this.scanner,
            separator = ' ',
            exprs = [],
            expr, t, idx, ch, last;

        while (true) {
            debug("parse tuple");
            t = scanner.peek();
            if (t === EOF) {
                break;
            }
            idx = t.startIdx;
            last = exprs[exprs.length - 1];
            expr = this.parseExpression();

            if (!expr) {
                //scanner.setIndex(idx);
                break;
            }

            ch = scanner.style.charAt(idx);

            if (ch !== ' ' && ch !== '\t' && ch !== '\r' && ch !== '\n') {
                if (!last) {
                    exprs.push(new List(null, [expr], ''));
                } else if (last.type !== 'List') {
                    last = new List(null, [exprs.pop(), expr], '');
                    exprs.push(last);
                } else {
                    var items = last.items;
                    items.push(expr);
                }
            } else {
                exprs.push(expr);
            }
        }

        if (exprs.length === 1) {
            exprs = exprs[0];
            if (exprs.items && exprs.items.length === 1) {
                return exprs.items[0];
            }
            return exprs;
        }

        if (exprs.length) {
            return new List(null, exprs, separator);
        }
    }

    // Arguments ::= Argument |
    //               Arguments ',' Argument
    parseArguments() {
        var scanner = this.scanner,
            args = [], arg, t;
        while (true) {
            debug("parse arguments");
            arg = this.parseArgument();
            if (!arg) {
                break;
            }
            args.push(arg);
            t = scanner.peek();
            if (t === EOF) {
                break;
            }
            if (!t.isOperator || t.value !== ',') {
                break;
            }
            scanner.next();
        }

        return new List(t, args, ', ');
    }

    parseVarArgs(expr) {
        var scanner = this.scanner,
            t, t2, t3;
        t = scanner.peek();
        if (t !== EOF && t.value === '.') {
            t2 = scanner.peek(2);
            t3 = scanner.peek(3);
            if (t2 && t2.value === '.') {
                if (t3 && t3.value === '.') {
                    expr.varArgs = true;
                    scanner.next();
                    scanner.next();
                    scanner.next();
                }
            }
        }
        return expr;
    }

    // Argument ::= Expression |
    //              Variable ':' Expression
    parseArgument() {
        var scanner = this.scanner,
            arg = [], expr, t, t2, t3;

        while (true) {
            debug("parse argument");
            t = scanner.peek();
            if (t === EOF) {
                break;
            }
            if (t.isVariable || t.isIdent) {
                t = scanner.peek(2);
                if (t !== EOF && t.isOperator && t.value === ':') {
                    t = scanner.next();
                    scanner.next();
                    expr = this.parseTuple();
                    if (expr) {
                        expr.variable = t.value;
                    }
                    arg.push(expr);
                    continue;
                }
            }
            expr = this.parseExpression();
            if (!expr) {
                break;
            }
            this.parseVarArgs(expr);
            arg.push(expr);
        }

        if (arg.length == 1) {
            return arg[0];
        }

        return new List(null, arg, ' ');
    }

    parse(content, file) {
        var me = this,
            scanner;

        me.scanner = scanner = new Scanner(content, file);
        me.style = scanner.style;

        var result = me.parseStylesheet();

        // null out the tokenizer to allow GC to kick in
        me.scanner = me.style = null;

        return result;
    }
}

Fashion.apply(Parser.prototype, {
    lax: false,
    keywords: {
        "no-repeat": true
    },
    scanner: undefined,
    style: undefined
});

module.exports = Parser;
},{"../export/Base.js":19,"../parse/ast/Nodes.js":60,"./Scanner.js":56}],56:[function(require,module,exports){
"use strict";

var Fashion = require('../export/Base.js'),
    Base = Fashion.Base;

var Tokens = require('./Tokens.js'),
    Operator = Tokens.Operator,
    Ident = Tokens.Ident,
    StringLiteral = Tokens.StringLiteral,
    Percentage = Tokens.Percentage,
    Length = Tokens.Length,
    Time = Tokens.Time,
    Angle = Tokens.Angle,
    NumberLiteral = Tokens.NumberLiteral,
    Class = Tokens.Class,
    Hash = Tokens.Hash,
    Variable = Tokens.Variable,
    Directive = Tokens.Directive,
    EOF = Tokens.EOF;

var _limit = 0xFF,
    _chars = new Array(_limit),
    // _EOF = new EOF(null);
    _EOF = null;

/*
    1 = alpha
    2 = digit
    4 = name
    8 = hex
 */
for (var c = 0; c < _limit; c++) {
    var ch = String.fromCharCode(c),
        mask = 0;

    if ((ch >= 'a' && ch <= 'z') ||
        (ch >= 'A' && ch <= 'Z')) {
        mask |= 1;
    }

    if ((ch >= '0') && (ch <= '9')) {
        mask |= 2;
    }

    if ((ch >= 'a' && ch <= 'z') ||
        (ch >= 'A' && ch <= 'Z') ||
        (ch >= '0' && ch <= '9') ||
        (ch === '-') || (ch === '_') ||
        (c >= 128 && c <= _limit && c !== 215 && c !== 247) ||
        ch === '\\') {
        mask |= 4;
    }

    if ((ch >= '0' && ch <= '9') ||
        (ch >= 'a' && ch <= 'f') ||
        (ch >= 'A' && ch <= 'F')) {
        mask |= 8;
    }

    _chars[c] = mask;
}

function isAlpha(ch) {
    return _chars[ch.charCodeAt(0)] & 1;
}

function isDigit(ch) {
    return _chars[ch.charCodeAt(0)] & 2;
}


// http://en.wikipedia.org/wiki/Latin-1
function isNameChar(ch) {
    return _chars[ch.charCodeAt(0)] & 4;
}

function isHexDigit(ch) {
    return _chars[ch.charCodeAt(0)] & 8;
}

// px, pt, pc, cm, mm, in, em, rem, ex, vw, vh, vmin, vmax
function isLength(unit) {
    var ch1 = unit.charAt(0).toLowerCase(),
        ch2 = unit.charAt(1).toLowerCase(),
        ch3 = unit.charAt(2).toLowerCase(),
        ch4 = unit.charAt(3).toLowerCase();

    if (ch1 === 'p') {
        return (ch2 === 'x' || ch2 === 't' || ch2 === 'c');
    }
    if (ch2 === 'm') {
        if (ch1 === 'c' || ch1 === 'm' || ch1 === 'e'){
            return 2;
        }
    }
    if (ch2 === 'x') {
        return ch1 === 'e';
    }
    if (ch3 === 'm') {
        if (ch1 === 'r' && ch2 === 'e') {
            // return the length of the unit
            return 3;
        }
    }
    if (ch1 === 'x' && isHexDigit(ch2)) {
        var len = 1;
        while (isHexDigit(unit[len])) {
            len++;
        }
        return len;
    }
    if (ch1 === 'v') {
        if (ch2 === 'w' || ch2 === 'h') {
            return 2;
        }
        if (ch2 === 'm') {
            if (ch3 === 'i' && ch4 === 'n') {
                return 4;
            }
            if (ch3 === 'a' && ch4 === 'x') {
                return 4;
            }
        }
    }
    return false;
}

// s, ms
function isTime(unit) {
    if (unit.length === 1) {
        return unit === 's';
    } else if (unit.length === 2) {
        return unit === 'ms';
    }
    return false;
}

// deg, rad
function isAngle(unit) {
    var ch = unit[0];
    if (ch === 'd' || ch === 'D') {
        return unit.toLowerCase() === 'deg';
    }
    if (ch === 'r' || ch === 'R') {
        return unit.toLowerCase() === 'rad';
    }
    return false;
}

function debug(message) {
    //console.log(message);
}

function info(message) {
    //console.log(message);
}



class Scanner extends Base {
    constructor(style, file) {
        super();
        this.style = style;
        this.lineNumber = this.style.length ? 1 : 0;
        this.currentFile = file || Fashion.currentFile;
        this.docs = [];
        this.tokenBuff = [];
    }


    next(advance) {
        var me = this,
            start = me.index,
            startLine = me.lineNumber,
            token = !advance && me.tokenBuff.shift();
        if (!token) {
            token = me._advance();
            if (token) {
                token.startIdx = start;
                token.startLine = startLine;
            }
        }
        return token;
    }
    
    // Get the next token and return it.
    // Loosely based on http://www.w3.org/TR/CSS2/grammar.html#scanner
    // TODO: nonascii, badcomments, escape
    _advance() {
        var me = this,
            style = me.style,
            length = style.length,
            ch, ch2, ch3, start, str, level, negate, charOffset, value;

        // Go past white space, block comment, and single-line comment
        while (true) {

            ch = style[me.index];

            // Skip white space or any other control characters
            while (me.index < length && (ch <= ' ' || ch >= 128)) {
                if (ch === '\n') {
                    me.lineNumber += 1;
                    me.start = me.index;
                }
                me.index += 1;
                ch = style[me.index];
            }

            ch2 = style[me.index + 1];

            // Block comment
            if (ch === '/' && ch2 === '*') {
                me.index += 1;
                start = me.index + 1;
                while (me.index < length) {
                    ch = style[me.index];
                    ch2 = style[me.index + 1];
                    if (ch === '\n') {
                        me.lineNumber += 1;
                        me.start = me.index;
                    }
                    if (ch === '*' && ch2 === '/') {
                        me.index += 2;
                        break;
                    }
                    me.index += 1;
                }
                me.docs.push(style.substring(start - 2, me.index));
                continue;
            }

            // Single-line comment
            if (ch === '/' && ch2 === '/') {
                me.index += 1;
                start = me.index;
                while (me.index < length) {
                    ch = style[me.index];
                    if (ch === '\r' || ch === '\n') {
                        break;
                    }
                    me.index += 1;
                }
                me.docs.push(style.substring(start - 1, me.index));
                continue;
            }

            break;
        }

        start = me.index;
        if (start >= length) {
            return _EOF;
        }

        ch = style[me.index];
        ch2 = style[me.index + 1];
        ch3 = style[me.index + 2];

        // Identifier
        if (
            (isNameChar(ch) && !isDigit(ch) && ch !== '-') ||
            (ch === '-' && isNameChar(ch2) && !isDigit(ch2)) ||
            (ch === '#' && ch2 === '{')
        ) {
            level = 0;
            me.index += 1;
            if (ch === '#' && ch2 === '{') {
                level += 1;
                me.index += 1;
            }
            if (ch === '\\') {
                // automatically consume the escaped character
                me.index += 1;
            }
            while (me.index < length) {
                ch = style[me.index];
                ch2 = style[me.index + 1];
                if (isNameChar(ch)) {
                    me.index += 1;
                    continue;
                }
                if (ch === '\\') {
                    me.index += 2;
                    continue;
                }
                if (ch == ">") {
                    me.index += 1;
                    //level += 1;
                    continue;
                }
                if (ch === '#' && ch2 === '{') {
                    level += 1;
                    me.index += 2;
                    continue;
                }
                if (level > 0) {
                    me.index += 1;
                    if (ch === '}') {
                        level -= 1;
                    }
                    continue;
                }
                break;
            }

            str = style.substring(start, me.index).toLowerCase();
            if (str === 'or' || str === 'and' || str === 'not') {
                return new Operator(me, str);
            }

            return new Ident(me, style.substring(start, me.index));
        }

        // String
        if ((ch === '\'' || ch === '"') ||
            (ch === '\\' && (ch2 === "'" || ch2 === '"'))) { // quotes may be escaped
            charOffset = (ch === '\\') ? 2 : 1;
            // quotes may be escaped.
            me.index += charOffset;
            start = me.index;
            var openCh = (ch === '\\') ? ch2 : ch;
            level = 0;
            var buff = '';
            while (me.index < length) {
                ch = style[me.index];
                me.index++;
                if (ch === '\\') {
                    ch2 = style[me.index];
                    if (ch2 === '\n' || ch2 === "\r") {
                        me.index++;
                        continue;
                    }
                    buff += ch;
                    ch = style[me.index];
                    me.index++;
                    if (!level && charOffset === 2 && openCh === style[me.index]) {
                        break;
                    }
                }
                else if (ch === '#') {
                    if (style[me.index] === '{') {
                        level++;
                    }
                }
                else if (ch === '}') {
                    if (level) {
                        level--;
                    }
                }
                else if (!level && ch === openCh) {
                    break;
                }
                buff += ch;
            }
            return new StringLiteral(me, buff, style[start - 1]);
        }

        // Number
        if (isDigit(ch) || (ch === '.' && isDigit(ch2)) || (ch === '-' && isDigit(ch2)) || (ch === '-' && ch2 === '.' && isDigit(ch3))) {
            if (ch === '-') {
                me.index += 1;
            }
            me.index += 1;

            while (me.index < length) {
                ch = style[me.index];
                if (ch < '0' || ch > '9') {
                    break;
                }
                me.index += 1;
            }

            if (ch === '\\') {
                me.index += 1;
                ch = style[me.index];
            }

            if (ch === '.') {
                me.index += 1;
                while (me.index < length) {
                    ch = style[me.index];
                    if (ch < '0' || ch > '9') {
                        break;
                    }
                    me.index += 1;
                }
            }

            // Percentage
            if (ch === '%') {
                me.index += 1;
                var pcnt = new Percentage(me, style.substring(start, me.index));
                pcnt.start = start;
                pcnt.end = me.index;
                return pcnt;
            }

            // Length
            if (ch !== ' ') {
                var unitLen = isLength(style.substr(me.index, 10));
                if (unitLen) {
                    me.index += (unitLen === true) ? 2 : unitLen;
                    return new Length(me, style.substring(start, me.index));
                }
                if (isTime(style.substr(me.index, 1))) {
                    me.index += 1;
                    return new Time(me, style.substring(start, me.index));
                }
                if (isTime(style.substr(me.index, 2))) {
                    me.index += 2;
                    return new Time(me, style.substring(start, me.index));
                }
                if (isAngle(style.substr(me.index, 3))) {
                    me.index += 3;
                    return new Angle(me, style.substring(start, me.index));
                }
            }

            return new NumberLiteral(me, style.substring(start, me.index));
        }

        // Class
        if (ch === '.') {
            level = 0;
            me.index += 1;
            ch = style[me.index];
            if (ch === '{') {
                level += 1;
                me.index += 1;
            }
            while (me.index < length) {
                ch = style[me.index];
                ch2 = style[me.index + 1];
                if (isNameChar(ch)) {
                    me.index += 1;
                    continue;
                }
                if (ch === '#' && ch2 === '{') {
                    level += 1;
                    me.index += 2;
                    continue;
                }
                if (level > 0) {
                    me.index += 1;
                    if (ch === '}') {
                        level -= 1;
                    }
                    continue;
                }
                break;
            }

            return new Class(me, style.substring(start, me.index));
        }

        // Hash
        if (ch === '#') {
            level = 0;
            me.index += 1;
            ch = style[me.index];
            if (ch === '{') {
                level += 1;
                me.index += 1;
            }
            while (me.index < length) {
                ch = style[me.index];
                ch2 = style[me.index + 1];
                if (isNameChar(ch)) {
                    me.index += 1;
                    continue;
                }
                if (ch === '#' && ch2 === '{') {
                    level += 1;
                    me.index += 2;
                    continue;
                }
                if (level > 0) {
                    me.index += 1;
                    if (ch === '}') {
                        level -= 1;
                    }
                    continue;
                }
                break;
            }

            return new Hash(me, style.substring(start, me.index));
        }

        // Variable
        if (ch === '$' || (ch === '-' && ch2 === '$')) {
            if (ch === '-') {
                negate = true;
                start += 1;
                me.index += 1;
            }

            me.index += 1;
            while (me.index < length) {
                ch = style[me.index];
                if (isNameChar(ch)) {
                    me.index += 1;
                } else {
                    break;
                }
            }
            return new Variable(me, style.substring(start, me.index), negate);
        }

        // Directive, e.g. @import
        if (ch === '@') {
            me.index += 1;
            while (me.index < length) {
                ch = style[me.index];
                if (!isAlpha(ch) && ch !== '-') {
                    break;
                }
                me.index += 1;
            }
            value = style.substring(start, me.index);
            // If the value is not a SASS directive, then treat it as an identifier
            // This prevents a parsing error on CSS @-rules like @font-face
            //                   id: "@",
            return me.directives[value]
                ? new Directive(me, value)
                : new Ident(me, value);
        }

        // Fallback to single-character or two-character operator
        me.index += 1;
        str = ch;
        if (ch === '=' && ch2 === '=') {
            str = '==';
            me.index += 1;
        }
        if (ch === '~' && ch2 === '=') {
            str = '~=';
            me.index += 1;
        }
        if (ch === '|' && ch2 === '=') {
            str = '|=';
            me.index += 1;
        }
        if (ch === '^' && ch2 === '=') {
            str = '^=';
            me.index += 1;
        }
        if (ch === '$' && ch2 === '=') {
            str = '$=';
            me.index += 1;
        }
        if (ch === '*' && ch2 === '=') {
            str = '*=';
            me.index += 1;
        }
        if (ch === '!' && ch2 === '=') {
            str = '!=';
            me.index += 1;
        }
        if (ch === '<' && ch2 === '=') {
            str = '<=';
            me.index += 1;
        }
        if (ch === '>' && ch2 === '=') {
            str = '>=';
            me.index += 1;
        }

        return new Operator(me, str);
    } // next()

    flushDocs() {
        if (this.docs.length > 0) {
            var docs = this.docs;
            this.docs = [];
            return docs;
        }
        return null;
    }

    // Lookahead the next token (without consuming it).
    peek(i) {
        var buff = this.tokenBuff,
            len = buff.length;

        i = i || 1;

        for (var x = len; x < i; x++) {
            buff.push(this.next(true));
        }

        return buff[i - 1] || _EOF;
    }

    setIndex(index) {
        this.index = index;
        this.tokenBuff = [];
    }


    // Check if the next token matches the expected operator.
    // If not, throw an exception.
    expect(op) {
        var token = this.next(),
            lineNo = this.lineNumber - 1,
            fileName = this.currentFile || "sass-content",
            message = [
                'Expected \'',
                op,
                '\' but saw \'',
                token ? token.value : '(null token)',
                '\'',
                ' => ',
                fileName,
                ':',
                lineNo + 1,
                ':',
                this.index - this.start + 1
            ].join('');

        if (!token) {
            Fashion.raise(message);
        }

        if (!token.isOperator || token.value !== op) {
            Fashion.raise(message);
        }
    }
}

Fashion.apply(Scanner.prototype, {
    isFashionScanner: true,

    // The list of SASS directives.  Everything else beginning with "@" will be
    // assumed to be a css @-rule, an treated as an identifier. e.g. @font-face
    // treated as a normal identifier with no special processing for now.
    directives: {
        "@charset": true,
        "@import": true,
        "@extend": true,
        "@debug": true,
        "@warn": true,
        "@error": true,
        "@if": true,
        "@else": true,
        "@for": true,
        "@each": true,
        "@while": true,
        "@mixin": true,
        "@include": true,
        "@function": true,
        "@return": true,
        "@debugger": true,
        "@elseif": true,
        "@content": true,
        "@require": true
    },
    index: 0,
    docs: undefined,
    start: undefined,
    style: undefined,

    currentFile: undefined,
    lineNumber: undefined
});

Scanner.EOF = _EOF;

module.exports = Scanner;

},{"../export/Base.js":19,"./Tokens.js":58}],57:[function(require,module,exports){
"use strict";

var Fashion = require('../export/Base.js'),
    Base = Fashion.Base;

var Scanner = require('./Scanner.js');

class Tokenizer extends Base {
    tokenize(config) {
        var scanner = new Scanner(config),
            tokens = this.tokens,
            token;

        if (!tokens) {
            this.tokens = tokens = [];

            while ((token = scanner.next()) !== undefined) {
                tokens.push(token);
            }
        }

        return tokens;
    }
}

Tokenizer.prototype.tokens = undefined;

module.exports = Tokenizer;

},{"../export/Base.js":19,"./Scanner.js":56}],58:[function(require,module,exports){
"use strict";

var Fashion = require('../export/Base.js');

class Token {
    constructor (scanner) {
        this.scanner = scanner;
        if (scanner) {
            this.idx = scanner.index;
            this.lineNumber = scanner.lineNumber;
            this.file = scanner.currentFile;
        }
    }
}

Fashion.apply(Token.prototype, {
    $isToken: true,
    lineNumber: undefined,
    file: undefined,
    idx: undefined,
    startIdx: undefined,
    startLine: undefined,
    value: undefined,
    start: undefined,
    end: undefined
});

class Operator extends Token {
    constructor (scanner, value) {
        super(scanner);
        this.value = value;
    }
}

Fashion.apply(Operator.prototype, {
    isOperator: true,
    type: 'operator'
});

class Ident extends Token {
    constructor (scanner, value) {
        super(scanner);
        this.value = value;
    }
}

Fashion.apply(Ident.prototype, {
    isIdent: true,
    type: 'ident'
});

class StringLiteral extends Token {
    constructor (scanner, value, quoteChar) {
        super(scanner);
        this.value = value;
        this.quoteChar = quoteChar;
    }
}

Fashion.apply(StringLiteral.prototype, {
    isString: true,
    type: 'string',
    quoteChar: undefined
});

class Percentage extends Token {
    constructor (scanner, value) {
        super(scanner);
        this.value = value;
    }
}

Fashion.apply(Percentage.prototype, {
    isPercentage: true,
    type: 'percentage'
});

class Length extends Token {
    constructor (scanner, value) {
        super(scanner);
        this.value = value;
    }
}

Fashion.apply(Length.prototype, {
    isLength: true,
    type: 'length'
});

class Time extends Token {
    constructor (scanner, value) {
        super(scanner);
        this.value = value;
    }
}

Fashion.apply(Time.prototype, {
    isTime: true,
    type: 'time'
});

class Angle extends Token {
    constructor (scanner, value) {
        super(scanner);
        this.value = value;
    }
}

Fashion.apply(Angle.prototype, {
    isAngle: true,
    type: 'angle'
});

class NumberLiteral extends Token {
    constructor (scanner, value) {
        super(scanner);
        this.value = value;
    }
}

Fashion.apply(NumberLiteral.prototype, {
    isNumber: true,
    type: 'number'
});

class Class extends Token {
    constructor (scanner, value) {
        super(scanner);
        this.value = value;
    }
}

Fashion.apply(Class.prototype, {
    isClass: true,
    type: 'class'
});

class Hash extends Token {
    constructor (scanner, value) {
        super(scanner);
        this.value = value;
    }
}

Fashion.apply(Hash.prototype, {
    isHash: true,
    type: 'hash'
});

class Variable extends Token {
    constructor (scanner, value, negate) {
        super(scanner);
        this.value = value;
        this.negate = negate;
    }
}

Fashion.apply(Variable.prototype, {
    isVariable: true,
    type: 'variable',
    negate: undefined
});

class Directive extends Token {
    constructor (scanner, value) {
        super(scanner);
        this.value = value;
    }
}

Fashion.apply(Directive.prototype, {
    isDirective: true,
    type: 'directive'
});

class EOF extends Token {
    constructor (scanner) {
        super(scanner);
        this.value = '';
    }
}

Fashion.apply(EOF.prototype, {
    isEOF: true,
    type: 'eof'
});

module.exports = {
    Token: Token,
    Operator: Operator,
    Ident: Ident,
    StringLiteral: StringLiteral,
    Percentage: Percentage,
    Length: Length,
    Time: Time,
    Angle: Angle,
    NumberLiteral: NumberLiteral,
    Class: Class,
    Hash: Hash,
    Variable: Variable,
    Directive: Directive,
    EOF: EOF
};
},{"../export/Base.js":19}],59:[function(require,module,exports){
"use strict";

var Fashion = require('../../export/Base.js');

class BaseNode {
    constructor(token, file, line, docs) {
        if (token) {
            if (!token.$isToken) {
                Fashion.apply(this, token);
            }
            else {
                this.token = token;
                this.lineNumber = token.lineNumber;
                this.file = token.file;
                var scanner = token.scanner;
                if (this.acceptsDocs) {
                    this.docs = scanner.flushDocs();
                }
            }
        }
    }

    doVisit(visitor) {
    }

    descend(visitor) {
    }
}

Fashion.apply(BaseNode.prototype, {
    visitTarget: undefined,
    docs: undefined,
    file: undefined,
    token: undefined,
    lienNumber: undefined,
    acceptsDocs: false
});

module.exports = BaseNode;
},{"../../export/Base.js":19}],60:[function(require,module,exports){
"use strict";

var Fashion = require('../../export/Base.js');
var BaseNode = require('./BaseNode.js');

class Each extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.Each(this);
    }

    descend(visitor) {
        visitor.visit(this.list);
        visitor.visit(this.statements);
    }
}

Fashion.apply(Each.prototype, {
    type: 'Each',
    variable: undefined,
    list: undefined,
    statements: undefined
});

class For extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.For(this);
    }

    descend(visitor) {
        visitor.visit(this.start);
        visitor.visit(this.end);
        visitor.visit(this.statements);
    }
}

Fashion.apply(For.prototype, {
    type: 'For',
    variable: undefined,
    start: undefined,
    end: undefined,
    statements: undefined
});

class While extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.While(this);
    }

    descend(visitor) {
        visitor.visit(this.condition);
        visitor.visit(this.statements);
    }
}

Fashion.apply(While.prototype, {
    type: 'While',
    condition: undefined,
    statements: undefined
});

class Charset extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.Charset(this);
    }
}

Fashion.apply(Charset.prototype, {
    type: 'Charset'
});

class FunctionNode extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.Function(this);
    }

    descend(visitor) {
        visitor.visit(this.func);
        visitor.visit(this.statements);
    }
}

Fashion.apply(FunctionNode.prototype, {
    type: 'Function',
    func: undefined,
    statements: undefined
});

class Ruleset extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.Ruleset(this);
    }

    descend(visitor) {
        visitor.visit(this.selectors);
        visitor.visit(this.statements);
    }
}

Fashion.apply(Ruleset.prototype, {
    type: 'Ruleset',
    selectors: undefined,
    statements: undefined,
    acceptsDocs: true
});

class Mixin extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.Mixin(this);
    }

    descend(visitor) {
        visitor.visit(this.name);
        visitor.visit(this.statements);
    }
}

Fashion.apply(Mixin.prototype, {
    type: 'Mixin',
    name: undefined,
    statements: undefined
});

class Block extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.Block(this);
    }

    descend(visitor) {
        visitor.visit(this.statements);
    }
}

Fashion.apply(Block.prototype, {
    type: 'Block',
    statements: undefined
});

class Include extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.Include(this);
    }

    descend(visitor) {
        visitor.visit(this.include);
        this.content && visitor.visit(this.content);
    }
}

Fashion.apply(Include.prototype, {
    type: 'Include',
    include: undefined,
    content: undefined
});

class Assignment extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.Assignment(this);
    }

    descend(visitor) {
        visitor.visit(this.expr);
    }
}

Fashion.apply(Assignment.prototype, {
    type: 'Assignment',
    expr: undefined
});

class Declaration extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.Declaration(this);
    }

    descend(visitor) {
        visitor.visit(this.value);
    }
}

Fashion.apply(Declaration.prototype, {
    type: 'Declaration',
    property: undefined,
    value: undefined,
    acceptsDocs: true
});

class VariableAssignment extends BaseNode {
    constructor(token, name, value) {
        super(token);
        this.name = name;
        this.value = value;
    }

    doVisit(visitor) {
        visitor.VariableAssignment(this);
    }

    descend(visitor) {
        visitor.visit(this.value);
    }
}

Fashion.apply(VariableAssignment.prototype, {
    type: 'VariableAssignment',
    name: undefined,
    value: undefined,
    valueText: undefined,
    acceptsDocs: true
});

class If extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.If(this);
    }

    descend(visitor) {
        visitor.visit(this.condition);
        visitor.visit(this.statements);
    }
}

Fashion.apply(If.prototype, {
    type: 'If',
    condition: undefined,
    statements: undefined
});

class Else extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.Else(this);
    }

    descend(visitor) {
        visitor.visit(this.condition);
        visitor.visit(this.statements);
    }
}

Fashion.apply(Else.prototype, {
    type: 'Else',
    condition: undefined,
    statements: undefined
});

class Return extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.Return(this);
    }

    descend(visitor) {
        visitor.visit(this.expr);
    }
}

Fashion.apply(Return.prototype, {
    type: 'Return',
    expr: undefined
});

class Parenthetical extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.ParentheticalExpression(this);
    }

    descend(visitor) {
        visitor.visit(this.expr);
    }
}

Fashion.apply(Parenthetical.prototype, {
    type: 'Parenthetical',
    expr: undefined
});

class SelectorPart extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.SelectorPart(this);
    }

    descend(visitor) {
        visitor.visit(this.value);
    }
}

Fashion.apply(SelectorPart.prototype, {
    type: 'SelectorPart',
    value: undefined
});

class SelectorProperty extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.SelectorProperty(this);
    }

    descend(visitor) {
        visitor.visit(this.property);
        visitor.visit(this.value);
    }
}

Fashion.apply(SelectorProperty.prototype, {
    type: 'SelectorProperty',
    property: undefined,
    value: undefined
});

class CompoundSelector extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.CompoundSelector(this);
    }

    descend(visitor) {
        visitor.visit(this.items);
    }
}

Fashion.apply(CompoundSelector.prototype, {
    type: 'CompoundSelector',
    items: undefined
});

class MultiPartSelector extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.MultiPartSelector(this);
    }

    descend(visitor) {
        visitor.visit(this.items);
    }
}

Fashion.apply(MultiPartSelector.prototype, {
    type: 'MultiPartSelector',
    items: undefined
});

class SelectorList extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.SelectorList(this);
    }

    descend(visitor) {
        visitor.visit(this.items);
    }
}

Fashion.apply(SelectorList.prototype, {
    type: 'SelectorList',
    items: undefined
});

class BinaryExpression extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.BinaryExpression(this);
    }

    descend(visitor) {
        visitor.visit(this.left);
        visitor.visit(this.right);
    }
}

Fashion.apply(BinaryExpression.prototype, {
    type: 'BinaryExpression',
    left: undefined,
    right: undefined
});

class UnaryExpression extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.UnaryExpression(this);
    }

    descend(visitor) {
        visitor.visit(this.expr);
    }
}

Fashion.apply(UnaryExpression.prototype, {
    type: 'UnaryExpression',
    expr: undefined
});

class Variable extends BaseNode {
    constructor(token, name) {
        super(token);
        this.name = name || token.value;
    }

    doVisit(visitor) {
        visitor.Variable(this);
    }
}

Fashion.apply(Variable.prototype, {
    type: 'Variable'
});

class Constant extends BaseNode {
    constructor(token, value) {
        super(token);
        this.value = value || token.value;
    }

    doVisit(visitor) {
        visitor.Constant(this);
    }
}

Fashion.apply(Constant.prototype, {
    type: 'Constant',
    value: undefined
});

class Literal extends Constant {
    constructor (token, value) {
        super(token, value);
    }
}

Fashion.apply(Literal.prototype, {
    dataType: 'Literal'
});

class Number extends Constant {
    constructor (token, value) {
        super(token, value);
    }
}

Fashion.apply(Number.prototype, {
    dataType: 'Number'
});

class String extends Constant {
    constructor (token, value, quoteChar) {
        super(token, value);
        this.quoteChar = quoteChar !== undefined ? quoteChar : token.quoteChar;
    }
}

Fashion.apply(String.prototype, {
    dataType: 'String',
    quoteChar: undefined
});

class Length extends Constant {
    constructor (token, value, quoteChar) {
        super(token, value);
    }
}

Fashion.apply(Length.prototype, {
    dataType: 'Length',
    quoteChar: undefined
});

class Time extends Constant {
    constructor (token, value, quoteChar) {
        super(token, value);
    }
}

Fashion.apply(Time.prototype, {
    dataType: 'Time',
    quoteChar: undefined
});

class Angle extends Constant {
    constructor (token, value, quoteChar) {
        super(token, value);
    }
}

Fashion.apply(Angle.prototype, {
    dataType: 'Angle',
    quoteChar: undefined
});

class Percentage extends Constant {
    constructor (token, value, quoteChar) {
        super(token, value);
    }
}

Fashion.apply(Percentage.prototype, {
    dataType: 'Percentage',
    quoteChar: undefined
});

class Color extends Constant {
    constructor (token, value, quoteChar) {
        super(token, value);
    }
}

Fashion.apply(Color.prototype, {
    dataType: 'Color',
    quoteChar: undefined
});

class FunctionCall extends BaseNode {
    constructor(token, id, args) {
        super(token);
        this.id = id;
        this.args = args;
    }

    doVisit(visitor) {
        visitor.FunctionCall(this);
    }

    descend(visitor) {
        visitor.visit(this.args);
    }
}

Fashion.apply(FunctionCall.prototype, {
    type: 'FunctionCall',
    id: undefined,
    args: undefined
});

class Extend extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.Extend(this);
    }
}

Fashion.apply(Extend.prototype, {
    type: 'Extend'
});

class List extends BaseNode {
    constructor(token, items, separator) {
        super(token);
        this.items = items;
        this.separator = separator;
    }

    doVisit(visitor) {
        visitor.List(this);
    }

    descend(visitor) {
        visitor.visit(this.items);
    }
}

Fashion.apply(List.prototype, {
    type: 'List',
    items: undefined,
    separator: undefined,
    isFashionListAst: true
});

class Warn extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.Warn(this);
    }
}

Fashion.apply(Warn.prototype, {
    type: 'Warn'
});

class Error extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.Error(this);
    }
}

Fashion.apply(Error.prototype, {
    type: 'Error'
});

class Debug extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.Debug(this);
    }

    descend(visitor) {
        visitor.visit(this.expr);
    }
}

Fashion.apply(Debug.prototype, {
    type: 'Debug',
    expr: undefined
});

class Import extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.Import(this);
    }
}

Fashion.apply(Import.prototype, {
    type: 'Import',
    source: undefined
});

class Require extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.Require(this);
    }

    descend(visitor) {
        visitor.visit(this.source);
    }
}

Fashion.apply(Require.prototype, {
    type: 'Require',
    source: undefined
});

class Content extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.Content(this);
    }
}

Fashion.apply(Content.prototype, {
    type: 'Content'
});

class Debugger extends BaseNode {
    constructor(cfg) {
        super(cfg);
    }

    doVisit(visitor) {
        visitor.Debugger(this);
    }
}

Fashion.apply(Debugger.prototype, {
    type: 'Debugger'
});

module.exports = {
    Each: Each,
    For: For,
    While: While,
    Charset: Charset,
    Function: FunctionNode,
    Ruleset: Ruleset,
    Mixin: Mixin,
    Block: Block,
    Include: Include,
    Assignment: Assignment,
    Declaration: Declaration,
    VariableAssignment: VariableAssignment,
    If: If,
    Else: Else,
    Return: Return,
    Parenthetical: Parenthetical,
    SelectorPart: SelectorPart,
    SelectorProperty: SelectorProperty,
    CompoundSelector: CompoundSelector,
    MultiPartSelector: MultiPartSelector,
    SelectorList: SelectorList,
    BinaryExpression: BinaryExpression,
    UnaryExpression: UnaryExpression,
    Variable: Variable,
    Constant: Constant,
    Literal: Literal,
    Number: Number,
    String: String,
    Length: Length,
    Time: Time,
    Angle: Angle,
    Percentage: Percentage,
    Color: Color,
    FunctionCall: FunctionCall,
    Extend: Extend,
    List: List,
    Warn: Warn,
    Error: Error,
    Debug: Debug,
    Import: Import,
    Require: Require,
    Content: Content,
    Debugger: Debugger
};
},{"../../export/Base.js":19,"./BaseNode.js":59}],61:[function(require,module,exports){
"use strict";

var Fashion = require('../export/Base.js');
var FunctionCall = require('../export/type/FunctionCall.js');
var Literal = require('../export/type/Literal.js');

var Declaration = require('../type/Declaration.js');
var Ruleset = require('../type/Ruleset.js');
var SelectorList = require('../type/selectors/SelectorList.js');

var Preprocessor = require('../Preprocessor.js');
var Nodes = require('../parse/ast/Nodes.js');
var ExportBuilder = require('./ExportBuilder.js');

module.exports = {
    init (runtime) {

        // helper functions for creating new exported css variables from extension functions
        runtime.register({
            create_css_variable: function (name, value, base) {
                while (base && base.$previousReference) {
                    base = base.$previousReference;
                }

                value.$referenceName = this.unbox(name);
                value.$referenceBase = base || value;
                return value;
            },

            name_of: function(refNode) {
                while (refNode && refNode.$referenceBase) {
                    refNode = refNode.$referenceBase;
                }
                return refNode && refNode.$referenceName;
            }
        });

        // detect css variable exports
        runtime.registerProcessor({
            enable: true,
            
            execute: function (obj, ctx) {
                var me = this,
                    config = runtime.context.getConfig('cssVars');
                if (config) {
                    Fashion.apply(this, config);
                }
                
                if (me.enable) {
                    me.ctx = ctx;
                    ctx.exportedVariables = {};
                    ctx.exportRuleset = new Ruleset({
                        selectors: new SelectorList([
                            new Literal('html')
                        ])
                    });


                    me.visit(obj);

                    if (me.export === 'all') {
                        me.exportAllGlobals(obj);
                    }
                }
            },

            exportAllGlobals: function(css) {
                var globals = runtime.getGlobalScope().getEntries(),
                    me = this,
                    exportRuleset = me.ctx.exportRuleset;

                for (var key in globals) {
                    var entry = globals[key],
                        value = entry;

                    if (value && value.ast && value.$referenceName) {
                        var name = value.$referenceName,
                            jsName = Fashion.getJsName(name.replace(/^--/g, '$')),
                            varName = name.replace(/^\$/, ''),
                            dynamics = runtime._dynamics;

                        if (dynamics[jsName] && !entry.exported && varName.indexOf('include-') !== 0) {
                            exportRuleset.addDeclaration(new Declaration({
                                property: '--' + varName,
                                value: new Literal('export')
                            }));
                            entry.exported = true;
                        }
                    }
                }

                this.visit(exportRuleset);
            },

            declaration: function (decl) {
                var name = decl.property,
                    val = decl.value,
                    exportedVariables = this.ctx.exportedVariables;

                if (name.indexOf('--') == 0) {
                    if (val && val.$isFashionLiteral) {
                        if (val.value && val.value.trim() === 'export') {
                            var jsName = Fashion.getJsName(name.replace(/^--/g, '$')),
                                globals = runtime.getGlobalScope(),
                                dynamics = runtime._dynamics,
                                variable = globals.get(jsName),
                                baseName = name.replace(/^--/g, ''),
                                key = Fashion.getJsName(baseName),
                                exported = exportedVariables[key] || {
                                    name: baseName,
                                    rulesets: []
                                };

                            if (variable) {
                                if (!dynamics[jsName]) {
                                    Fashion.log('cannot export ' + jsName + ' because it is not dynamic');
                                }
                                else {
                                    if (val) {
                                        val.visitTarget = variable.clone();
                                    }

                                    exported.declaration = decl;
                                    exported.variable = variable;
                                    variable.exported = true;
                                    exported.rulesets.push(decl.ruleset);
                                    exportedVariables[key] = exported;
                                }
                            }
                        }
                    }
                }
                this.visit(val);
            }
        });

        // update rulesets to include new declarations w/o css variable references
        runtime.registerProcessor({

            currDecl: null,
            referenceNodes: null,
            enable: true,

            execute: function (obj, ctx) {
                var me = this,
                    config = runtime.context.getConfig('cssVars');

                if (config) {
                    Fashion.apply(me, config);
                }

                if (me.enable) {
                    me.ctx = ctx;
                    me.visit(obj);
                    var exportedVariables = me.ctx.exportedVariables;
                    if (Object.getOwnPropertyNames(exportedVariables).length) {
                        var exportRuleset = me.ctx.exportRuleset,
                            builder = new ExportBuilder(exportRuleset);

                        builder.export = me.export;
                        var exportFn = builder.buildExportFunction(exportedVariables, runtime);

                        if (exportRuleset.declarations.length) {
                            obj.push(exportRuleset);
                            me.ctx.exportRuleset = new Ruleset({
                                selectors: new SelectorList([
                                    new Literal('html')
                                ])
                            });
                        }
                        if (exportFn) {
                            ctx.exportFn = exportFn;
                        }
                    }
                }
            },

            visitItem: function (item) {
                if (item.$referenceName) {
                    this.referenceNodes.push(item);
                }
                else {
                    item.doVisit(this);
                }
            },

            declaration: function (decl) {
                this.currDecl = decl;
                this.referenceNodes = [];

                var copy = decl.clone(),
                    refNodes = this.referenceNodes,
                    addNewDecl = false,
                    exportedVariables = this.ctx.exportedVariables;

                this.visit(copy.value);

                outer: for (var i = 0; i < refNodes.length; i++) {
                    var referenceNode = refNodes[i],
                        refNode = referenceNode,
                        refBase;

                    while (refNode) {
                        if (refNode.$referenceBase) {
                            refBase = refNode.$referenceBase;
                            break;
                        }
                        refNode = refNode.$previousReference;
                    }

                    if (refBase) {
                        // need to add the export declaration for this variable
                        var base = refBase,
                            baseName = base.$referenceName.replace(/^\$/, ''),
                            newName, exported, visitTarget, exDecl, keyName;

                        baseName = Fashion.getJsName(baseName);
                        newName = refNode.$referenceName.replace(/^\$/, '');
                        keyName = Fashion.getJsName(newName);

                        if (exportedVariables[baseName]) {
                            exported = exportedVariables[baseName];
                            exDecl = exported.declaration;
                        }
                        else {
                            exDecl = copy;
                        }

                        if (!exportedVariables[keyName]) {
                            var d = new Declaration({
                                property: '--' + newName,
                                value: refNode.clone()
                            });

                            exportedVariables[keyName] = {
                                declaration: d,
                                name: newName,
                                rulesets: [
                                    exDecl.ruleset
                                ],
                                variable: {
                                    $isWrapper: true,
                                    value: d.value
                                }
                            };

                            visitTarget = exDecl.visitTarget;
                            if (!visitTarget) {
                                exDecl.visitTarget = visitTarget = [
                                    // don't clone here, since we need to
                                    // preserve visitTargets
                                    new Declaration({
                                        property: exDecl.property,
                                        important: exDecl.important,
                                        sourceInfo: exDecl.sourceInfo,
                                        value: exDecl.value
                                    })
                                ];
                            }

                            visitTarget.push(d);
                        }
                    }

                    refNode = referenceNode;

                    inner: while (refNode) {
                        var refName = refNode.$referenceName.replace(/^\$/, '');
                        var keyName = Fashion.getJsName(refName);
                        if (exportedVariables[keyName]) {
                            referenceNode.visitTarget = new FunctionCall('var', [
                                new Literal('--' + refName)
                            ]);
                            addNewDecl = true;
                            break inner;
                        }
                        else if (refNode.$previousReference &&
                            refNode.$previousReference.$referenceName) {
                            refNode = refNode.$previousReference;
                        }
                        else {
                            refNode = null;
                        }
                    }
                }

                if (addNewDecl) {
                    decl.visitTarget = [decl.clone(), copy];
                }

                this.currDecl = null;
                this.referenceNodes = null;
            }
        });
    }
};

},{"../Preprocessor.js":13,"../export/Base.js":19,"../export/type/FunctionCall.js":29,"../export/type/Literal.js":32,"../parse/ast/Nodes.js":60,"../type/Declaration.js":65,"../type/Ruleset.js":66,"../type/selectors/SelectorList.js":74,"./ExportBuilder.js":63}],62:[function(require,module,exports){
"use strict";

var Fashion = require('../export/Base.js');
var Env = require('../Env.js');
var Literal = require('../export/type/Literal.js');
var FunctionCall = require('../export/type/FunctionCall.js');

module.exports = {
    init (runtime) {

        var mimeTypeMap = {
                otf: 'font-opentype',
                eot: 'application/vnd.ms-fontobject',
                ttf: 'font/truetype',
                svg: 'image/svg+xml',
                woff: 'application/x-font-woff',
                woff2: 'application/x-font-woff2',
                gif: 'image/gif',
                png: 'image/png'
            },
            report = false,
            excludes = [],
            includes = [],
            maxItemSize = -1;

        runtime.registerProcessor({

            getSourceFromCall (obj) {
                var args = obj.args,
                    source;

                if (args.items) {
                    args = args.items;
                }

                if (!Array.isArray(args)) {
                    args = [args];
                }

                if (args.length === 1) {
                    source = args[0];
                }

                if (source.value) {
                    source = source.value;
                } else {
                    source = source.toString();
                }

                return source;
            },

            getSubstring (source, char) {
                var idx = source.indexOf(char);
                if (idx > -1) {
                    source = source.substring(0, idx);
                }
                return source
            },

            detectExtension (source) {
                source = this.getSubstring(source, '#');
                source = this.getSubstring(source, '?');
                var idx = source.lastIndexOf('.'),
                    extension = source.substring(idx + 1);
                return extension;
            },

            detectMimeType (source) {
                var extension = this.detectExtension(source),
                    mapped = mimeTypeMap[extension];
                return mapped || 'application/octet-stream';
            },

            encodeBytes (bytes) {
                if (Env.isNode) {
                    return bytes.toString('base64');
                }
                var str = '';
                for (var i = 0; i < bytes.length; i++) {
                    str += String.fromCharCode(bytes[i]);
                }
                return btoa(str);
            },

            isMatch (source, filters) {
                for (var f = 0; f < filters.length; f++) {
                    if (filters[f].test(source)) {
                        return true;
                    }
                }
                return false;
            },

            isExcluded (source) {
                return this.isMatch(source, excludes);
            },

            isIncluded (source) {
                return this.isMatch(source, includes);
            },

            inlineUrl (obj, mimeType, charset) {
                var me = this,
                    context = me.context,
                    cache = context.cache || (context.cache = {}),
                    source = me.getSourceFromCall(obj),
                    url, queue, extension, inlineTag, inlineExtensionTag, skip;

                if (!source) {
                    return;
                }

                mimeType = mimeType || me.detectMimeType(source);
                charset = charset || "UTF-8";

                url = me.basePath + '/' + source;
                extension = this.detectExtension(url);
                inlineTag = obj.hasTag('inline');
                inlineExtensionTag = obj.hasTag('inline\\:' + extension);

                skip = false;

                if (this.isExcluded(source)) {
                    skip = true;
                } else if (this.isIncluded(source)) {
                    skip = false;
                } else if (inlineExtensionTag === false) {
                    skip = true;
                } else if (inlineExtensionTag === null && inlineTag === false) {
                    skip = true;
                }

                if (skip) {
                    return;
                }

                queue = cache[url] || function () {
                        var token = {
                            nodes: [],
                            url: url
                        };


                        function inlineData (bytes) {
                            var data, arg, optNode;

                            try {
                                // 'getBinaryData' method provided on xhr by doRequest
                                data = me.encodeBytes(bytes);
                                arg = new Literal(encodeURI([
                                    "data:",
                                    mimeType,
                                    charset ? ';charset=' + charset : '',
                                    ';base64',
                                    ',',
                                    data
                                ].join('')));
                                Fashion.debug("creating inline data node for : " + url);
                                optNode = new FunctionCall('url', [arg]);
                            } catch (e) {
                                Fashion.error(e);
                            }

                            if (maxItemSize > -1) {
                                if (arg.value.length > maxItemSize) {
                                    // if we exceeded the limit, disable the optimization node
                                    optNode = null;
                                }
                            }

                            if (optNode && report) {
                                var size = data.length,
                                    num = token.nodes.length;

                                Fashion.log(num + " * " + size + " bytes for " + url + ".");
                            }

                            // loop over all nodes in the nodes array
                            // using the visitTarget property to override
                            // the node and call context.ready.unblock()
                            for (var n = 0; n < token.nodes.length; n++) {
                                if (optNode) {
                                    var node = token.nodes[n];
                                    node.visitTarget = optNode;
                                }
                                context.ready.unblock();
                            }
                        }

                        if (!Env.isBrowser) {
                            var fs = Env.fs;
                            fs.readFile(url, function(err, data){
                                if (!err) {
                                    inlineData(data);
                                }
                                else {
                                    Fashion.error(err);
                                    context.ready.unblock();
                                }
                            });
                        }
                        else {
                            Env.doRequest({
                                url: url,
                                async: true,
                                binary: true,
                                params: {
                                    _dc: new Date().getTime()
                                },
                                onComplete (options, xhr) {
                                    try {
                                        inlineData(xhr.getBinaryData());
                                    } catch (err) {
                                        Fashion.error(err);
                                    }
                                },
                                onError (options, xhr) {
                                    for (var n = 0; n < token.nodes.length; n++) {
                                        context.ready.unblock();
                                    }
                                }
                            });
                        }


                        return token;
                    }();

                queue.nodes.push(obj);
                context.ready.block();

            },

            functioncall (obj) {
                var name = obj.name;
                if (name === 'url') {
                    if (this.fontFace) {
                        this.inlineUrl(obj);
                    }
                    else if (this.currDeclaration) {
                        var name = this.currDeclaration.property;
                        if (name === 'background-image') {
                            this.inlineUrl(obj);
                        }
                    }
                }
            },

            declaration (obj) {
                var declWas = this.declaration;
                this.currDeclaration = obj;
                obj.descend(this);
                this.currDeclaration = declWas
            },

            ruleset (obj) {
                var ffWas = this.fontFace,
                    rulesetWas = this.currRuleset;
                this.currRuleset = obj;
                if (obj.isAtRule()) {
                    if (obj.getFirstSelectorStr() === '@font-face') {
                        this.fontFace = obj;
                    }
                }
                obj.descend(this);
                this.currRuleset = rulesetWas;
                this.fontFace = ffWas;
            },

            execute (obj, ctx) {
                this.context = ctx;
                this.basePath = runtime.context.getConfig('basePath');
                var config = runtime.context.getConfig('inliner');
                if (config && config.enable) {
                    if (config.report) {
                        report = config.report;
                    }
                    if (config.excludes) {
                        for (var i = 0; i < config.excludes.length; i++) {
                            excludes.push(new RegExp(config.excludes[i]));
                        }
                    }
                    if (config.includes) {
                        for (var i = 0; i < config.includes.length; i++) {
                            includes.push(new RegExp(config.includes[i]));
                        }
                    }
                    maxItemSize = config.maxItemSize || -1;
                    this.visit(obj);
                }
            }
        });
    }
};
},{"../Env.js":9,"../export/Base.js":19,"../export/type/FunctionCall.js":29,"../export/type/Literal.js":32}],63:[function(require,module,exports){
"use strict";

var Fashion = require('../export/Base.js');
var Preprocessor = require('../Preprocessor.js');
var Nodes = require('../parse/ast/Nodes.js');
var ExportTypes = require('../export/type/Types.js');
var ExportRuntime = require('../export/Runtime.js');
var CssVariableManager = require('../export/css/CssVariableManager.js');

CssVariableManager = new CssVariableManager();

class IndexGenerator {
    constructor () {
        this.ids = [];
        this.index = 0;
    }

    _getIndexes (ids) {
        var len = ids.length || 1,
            chars = this.chars,
            clen = len == 1 ? chars.length - 10 : chars.length,
            out = [],
            prefix;

        for (var i = 0; i < len; i++) {
            for (var j = 0; j < clen; j++) {
                prefix = (ids[i] || '') + chars[j];
                if (prefix === 'as' || prefix === 'do' || prefix === 'if' || prefix === 'in') {
                    continue;
                }
                out.push(prefix);
            }
        }
        return out;
    }

    next () {
        var me = this;
        if (me.index < me.ids.length) {
            return me.ids[me.index++];
        }
        me.index = 0;
        me.ids = me._getIndexes(me.ids);
        return me.next();
    }
}

var chars = IndexGenerator.prototype.chars = ['_', '$'];
for (var i = 65; i < 91; i++){
    chars.push(String.fromCharCode(i));
    chars.push(String.fromCharCode(i + 32));
}
chars.push.call(chars, '0', '1', '2', '3', '4', '5', '6', '7', '8', '9');


class ExportBuilder {

    constructor (defaultRuleset) {
        this.defaultRuleset = defaultRuleset;
    }

    instrumentObject (registered, called, isFn) {
        var instrumented = {};

        Object.getOwnPropertyNames(registered).forEach(function(key){
            var fn = registered[key];
            instrumented[key] = function(){
                called[key] = {
                    func: fn,
                    isFn: isFn
                };
                return fn.apply(registered, arguments);
            };
        });

        return instrumented;
    }

    buildExportFn (variables) {
        var me = this,
            runtime = this.runtime,
            setterAst = me.createSettersAst(variables),
            preprocessor = new Preprocessor({
                runtime: runtime
            }),
            newContext = new runtime.context.constructor({
                preprocessor: preprocessor
            }),
            allVariables = Fashion.chain(runtime.context.preprocessor.variables),
            setterVariables, sortedAst, settersCode, settersFunc;


        preprocessor.enableElevationWarning = false;
        preprocessor.sortAllVariables = (this.export === 'all');
        preprocessor.loadPreprocessorCache(runtime.context.preprocessor);
        preprocessor.reset = function(){};
        preprocessor.preprocess(setterAst, true);

        setterVariables = preprocessor.getVariables();
        Fashion.apply(allVariables, setterVariables);

        preprocessor.variables = allVariables;
        newContext.dynamicsMap = preprocessor.getDynamicsMap();
        sortedAst = preprocessor.getSortedDynamicAstNodes();

        settersCode = newContext.transpiler.transpile(sortedAst);
        newContext.runtime.setCaches(newContext.transpiler);

        var origGet = runtime.constructor.prototype.get,
            origRegistered = runtime.registered,
            origFunctions = runtime.functions,
            registered = origRegistered,
            functions = origFunctions,
            called = {},
            read = {};

        runtime.registered = me.instrumentObject(registered, called, false);
        runtime.functions = me.instrumentObject(functions, called, true);
        runtime.constructor.prototype.get = function(name) {
            var result = origGet.apply(this, arguments);
            var jsName = Fashion.getJsName(name).replace(/^\$/, '');
            if (!variables[jsName]) {
                read[jsName] = {
                    name: jsName,
                    variable: result
                };
            }
            return result;
        };

        newContext.runtime.copyRuntimeState(runtime);
        settersFunc = newContext.compile(settersCode);

        // execute the generated fn to detect the needed functions using the
        // above instrumented objects
        settersFunc(newContext.runtime, null, newContext.dynamicsMap);

        runtime.registered = origRegistered;
        runtime.functions = origFunctions;
        runtime.constructor.prototype.get = origGet;

        var keys = Object.getOwnPropertyNames(read);
        if (keys.length) {
            for (var k = 0; k < keys.length; k++) {
                var key = keys[k];
                variables[key] = read[key];
            }
            return me.buildExportFn(variables);
        }

        var registered = [],
            functions = [];

        Object.getOwnPropertyNames(called).forEach(function(key){
            var value = called[key],
                func = called[key].func,
                fn = func + '';

            fn = fn.replace(/^.*?\(/g, ' function (');

            if (!value.isFn) {
                registered.push('    ' + key + ': ' + fn);
            }
            else {
                functions.push('    ' + key + ': ' + fn);
            }
        });

        
        var fnPrefix = [
            '(function(Fashion){',
            '\tvar __udf = undefined,',
            '\t    Types = Fashion.Types,',
            '\t    __strings = {},\n',
            '\t    __names = Fashion.css.buildNames(__strings),\n',
            '\t    __jsNames = Fashion.css.buildJsNames(__strings);\n'
        ].join('\n');

        fnPrefix += runtime.createTypesBlock(ExportTypes);
        
        var fnBody = fnPrefix + '\n\tFashion.css.register(function(__rt) {\n';
        fnBody += '__rt.register({\n';
        fnBody += registered.join(',\n');
        fnBody += '\n});\n';

        fnBody += runtime.createMethodBlock(ExportRuntime.prototype);
        fnBody += runtime.createPropertyBlock();
        fnBody += 'Fashion.apply(__rt.functions, {\n';
        fnBody += functions.join(',\n')
            .replace(/__rt\.registered/, '__rt_registered')
            .replace(/__rt\.functions/, '__rt_functions')
            .replace(/__rt\.mixins/, '__rt_mixins');
        fnBody += '\n});\n';
        fnBody += '},\n';

        fnBody += ' function(__rt) {\n';
        fnBody += runtime.createMethodBlock(ExportRuntime.prototype);
        fnBody += runtime.createPropertyBlock();
        fnBody += settersCode
            .replace(/__rt\.registered/, '__rt_registered')
            .replace(/__rt\.functions/, '__rt_functions')
            .replace(/__rt\.mixins/, '__rt_mixins') + '\n';
        fnBody += '},\n';

        return fnBody;
    }


    createSettersAst (exportedVariables) {
        var setters = [];

        Object.getOwnPropertyNames(exportedVariables).forEach(function(key){
            var exported = exportedVariables[key],
                value = exported.variable,
                ast;

            if (value.$isWrapper) {
                value = value.value;
            }

            ast = value.ast;

            if (ast) {
                setters.push(new Nodes.VariableAssignment(null, '$' + exported.name, ast));
            }
        });


        return setters;
    }

    buildExportFunction (exportedVariables, runtime) {
        var me = this,
            selectorMap = {},
            fnBody, keys, i, j, rs, selector,
            setters, setter, vars, variable, entry;

        me.runtime = runtime;
        fnBody = me.buildExportFn(exportedVariables);
        keys = Object.getOwnPropertyNames(exportedVariables);

        for (i = 0; i < keys.length; i++) {
            var key = keys[i],
                exported = exportedVariables[key],
                rulesets = exported.rulesets;

            if (!rulesets && me.defaultRuleset) {
                rulesets = [me.defaultRuleset];
            }

            for (j = 0; j < rulesets.length; j++) {
                rs = rulesets[j];
                selector = Fashion.SourceBuilder.toSource(rs.selectors);
                entry = selectorMap[selector] || (selectorMap[selector] = {
                    vars: [],
                    name: exported.name
                });
                entry.vars.push(exported);
            }
        }

        keys = Object.getOwnPropertyNames(selectorMap);

        fnBody += ' {\n';

        setters = [];

        for (i = 0; i < keys.length; i++) {
            setter = '';
            key = keys[i];
            entry = selectorMap[key];
            vars = entry.vars;
            setter +=  '\t' + JSON.stringify(key) + ': [\n';
            for (j = 0; j < vars.length; j++) {
                if (j > 0) {
                    setter += ',\n';
                }
                variable = vars[j];
                setter += '\t\t' + JSON.stringify(variable.name);
            }
            setter += '\n\t]';
            setters.push(setter);
        }

        fnBody += setters.join(',\n');
        fnBody += '});\n})(Fashion);';


        var keys = [],
            regex = /__rt_set\("(.+?)"/g,
            name, jsName, match;

        while (match = regex.exec(fnBody)) {
            keys.push(match[1]);
        }

        keys.sort(function(a, b){
            return a.length - b.length;
        });

        var strings = {},
            map = {},
            idGen = new IndexGenerator(),
            prefix;

        for (var i = 0; i < keys.length; i++) {
            key = keys[i];
            if (!map[key]) {
                map[key] = true;
                prefix = idGen.next();
                strings[prefix] = key;
                name = CssVariableManager.buildName(key);
                jsName = CssVariableManager.buildJsName(key);
                var keyRx = new RegExp('"\\' + key + '"|\'\\' + key + "'", 'g'),
                    nameRx = new RegExp('"' + name + '"|\'' + name + "'", 'g'),
                    jsNameRx = new RegExp('"\\' + jsName + '"|\'\\' + jsName + "'", 'g');

                fnBody = fnBody
                    .replace(keyRx, '__strings.' + prefix)
                    .replace(nameRx, '__names.' + prefix)
                    .replace(jsNameRx, '__jsNames.' + prefix);
            }
        }
        map = JSON.stringify(strings, null, 4);
        map = map.replace(/"(.*?)":(.*?)(,?)/g, '$1:$2$3');
        fnBody = fnBody.replace('__strings = {},', '__strings = ' + map + ',');


        return fnBody;
    }
}

module.exports = ExportBuilder;
},{"../Preprocessor.js":13,"../export/Base.js":19,"../export/Runtime.js":21,"../export/css/CssVariableManager.js":22,"../export/type/Types.js":42,"../parse/ast/Nodes.js":60}],64:[function(require,module,exports){
"use strict";

var SelectorList = require('../type/selectors/SelectorList.js');

module.exports = {
    init (runtime) {
        var selectorHooks = {},
            styleHooks = {},
            atRuleHooks = {},
            functionCallHooks = {},
            toPrune = [],
            registered = false;


        function register() {
            if (registered) {
                return;
            }
            registered = true;

            runtime.registerProcessor({
                runHooks (obj, hooks) {
                    if (hooks) {
                        for (var h = 0; h < hooks.length; h++) {
                            hooks[h].call(this, obj, this.context);
                        }
                    }
                },

                functioncall (obj) {
                    this.runHooks(obj, functionCallHooks[obj.name]);
                },

                declaration (obj) {
                    this.runHooks(obj, styleHooks[obj.property]);
                    obj.descend(this);
                },

                // process selectors for registered name watches
                ruleset (obj) {
                    let me = this;
                    me.currRuleset = obj;

                    let selectors = obj.selectors,
                        selectorsStr = selectors.toString(),
                        len = toPrune.length,
                        filter;

                    for (let i = 0; i < len; i++) {
                        filter = toPrune[i];
                        if (filter.test(selectorsStr)) {
                            if (selectors.$isFashionSelectorPart ||
                                selectors.$isFashionMultiPartSelector ||
                                selectors.$isFashionCompoundSelector) {
                                obj.selectors = null;
                            } else if (selectors.$isFashionSelectorList) {
                                selectors = selectors.items;
                                for (let j = selectors.length - 1; j >= 0; j--) {
                                    if (filter.test(selectors[j].toString())) {
                                        selectors.splice(j--,1);
                                    }
                                }
                                if (selectors.length == 0) {
                                    obj.selectors = null;
                                } else if (selectors.length == 1) {
                                    selectors = obj.selectors = selectors[0];
                                    selectorsStr = selectors.toString();
                                    continue;
                                } else {
                                    obj.selectors = new SelectorList(selectors);
                                }
                            }
                            break;
                        }
                    }

                    if (obj.selectors != null) {
                        me.visit(obj.selectors);

                        if (obj.isAtRule()) {
                            me.runHooks(obj, atRuleHooks[obj.getFirstSelectorStr()]);
                        }

                        me.visit(obj.declarations);
                        me.visit(obj.children);
                    }

                    me.currRuleset = null;
                },

                selector (obj) {
                    this.runHooks(this.currRuleset, selectorHooks[obj.toString()]);
                },

                execute (obj, ctx) {
                    this.context = ctx;
                    this.visit(obj);
                    this.context = null;
                }
            });
        }


        function registerHooks(map, obj) {
            register();
            var hooks;

            for (var key in obj) {
                hooks = map[key];
                if (!hooks) {
                    hooks = map[key] = [];
                }
                hooks.push(obj[key]);
            }
        }


        runtime.registerSelectorHooks = function (obj) {
            registerHooks(selectorHooks, obj);
        };

        runtime.registerAtRuleHook = function (obj) {
            registerHooks(atRuleHooks, obj);
        };

        runtime.registerStyleHooks = function (obj) {
            registerHooks(styleHooks, obj);
        };

        runtime.registerFunctionCallHooks = function (obj) {
            registerHooks(functionCallHooks, obj);
        };

        if (runtime.context.getConfig('prune') != null) {
            toPrune = runtime.context.getConfig('prune').map((s) => {
                s = s.replace(/[\-\[\]/{}()*+?.\\\^$|]/g, "\\$&");
                return new RegExp(`^${s}$|${s}\\b`);
            });
            register();
        }
    }
};
},{"../type/selectors/SelectorList.js":74}],65:[function(require,module,exports){
"use strict";

var Fashion = require('../export/Base.js');
var Type = require('./../export/type/Type.js');

class Declaration extends Type {
    constructor(cfg) {
        super();
        if (cfg) {
            Fashion.apply(this, cfg);
        }
    }

    doVisit(visitor) {
        visitor.declaration(this);
    }

    descend(visitor) {
        visitor.visit(this.value);
    }

    copy() {
        return new Declaration({
            property: this.property,
            important: this.important,
            sourceInfo: this.sourceInfo,
            value: this.value.clone()
        });
    }

    clone(match, replace) {
        if (replace && this.matches(match)) {
            return replace.clone()
        }
        return new Declaration({
            property: this.property,
            important: this.important,
            sourceInfo: this.sourceInfo,
            ruleset: this.ruleset,
            value: this.value.clone(match, replace)
        });
    }
}

Fashion.apply(Declaration.prototype, {
    type: 'declaration',
    $isFashionDeclaration: true,
    $canUnbox: false,
    property: null,
    value: null,
    important: null,
    sourceInfo: null,
    ruleset: null
});

module.exports = Declaration;

},{"../export/Base.js":19,"./../export/type/Type.js":40}],66:[function(require,module,exports){
"use strict";

var Fashion = require('../export/Base.js');
var Type = require('./../export/type/Type.js');
var MultiPartSelector = require('./selectors/MultiPartSelector.js');
var SelectorList = require('./selectors/SelectorList.js');

class Ruleset extends Type {
    constructor(cfg) {
        super();
        if (cfg) {
            Fashion.apply(this, cfg);
        }
        this.children = [];
        this.selectors = this.selectors || new SelectorList([]);
        this.declarations = this.declarations || [];
    }

    doVisit(visitor) {
        visitor.ruleset(this);
    }

    descend(visitor) {
        visitor.visit(this.selectors);
        visitor.visit(this.declarations);
        visitor.visit(this.children);
    }

    addDeclaration(declaration, index) {
        declaration.ruleset = this;
        if (typeof index === 'undefined') {
            this.declarations.push(declaration);
        } else {
            this.declarations.splice(index, 0, declaration);
        }
    }

    getDeclarationIndex(decl) {
        for (var i = 0; i < this.declarations.length; i++) {
            if (this.declarations[i] === decl) {
                return i;
            }
        }
        return -1;
    }

    removeDeclaration(decl) {
        this.declarations = Fashion.filter(this.declarations, (d) => d !== decl);
    }

    lastDeclaration() {
        return (this.declarations.length && this.declarations[this.declarations.length - 1]) || null
    }

    addChildRuleset(ruleset) {
        this.children.push(ruleset);
    }

    removeChildRuleset(child) {
        this.children = Fashion.filter(this.children, (item) => item !== child);
    }

    getFirstSelector() {
        // SelectorList -> MultiPartSelector -> CompoundSelector
        var selectors = this.selectors;
        if (selectors instanceof SelectorList) {
            selectors = selectors.items[0];
        }
        if (selectors instanceof MultiPartSelector) {
            selectors = selectors.items[0];
        }
        return selectors;
    }

    getFirstSelectorStr() {
        if (this._firstSelectorStr === undefined) {
            this._firstSelectorStr = this.getFirstSelector() + '';
        }
        return this._firstSelectorStr;
    }

    isAtRule() {
        return this.getFirstSelectorStr().indexOf('@') === 0;
    }

    isMedia() {
        return this.getFirstSelectorStr().indexOf('@media') === 0;
    }

    isKeyFrames() {
        return this.getFirstSelectorStr().indexOf('@keyframes') === 0 ||
            this.getFirstSelectorStr().indexOf('@-webkit-keyframes') === 0;
    }

    isPage() {
        return this.isAtRule() && this.getFirstSelectorStr().indexOf("@page") === 0;
    }

    isAtRoot() {
        return this.isAtRule() && this.getFirstSelectorStr().indexOf("@at-root") === 0;
    }

    isDirective() {
        return this.isAtRule() && !this.isMedia() &&
            this.declarations.length === 0 &&
            this.children.length === 0;
    }

    printAtRoot() {
        return this.isMedia() || this.isAtRoot();
    }
}

Fashion.apply(Ruleset.prototype, {
    type: 'ruleset',
    $isFashionRuleset: true,
    $canUnbox: false,

    declarations: null,
    selectors: null,
    sourceInfo: null,
    blockDocs: null,
    parent: null,
    isNamespaced: null,
    children: null,
    extend: null,

    isAtDirective: null,
    atDirectiveName: null,
    atDirectiveValue: null,
    isMediaRoot: null,
    hasBlock: null,
    _firstSelectorStr: undefined
});

module.exports = Ruleset;
},{"../export/Base.js":19,"./../export/type/Type.js":40,"./selectors/MultiPartSelector.js":73,"./selectors/SelectorList.js":74}],67:[function(require,module,exports){
"use strict";

var Fashion = require('../export/Base.js');
var TypeVisitor = require('./TypeVisitor.js');
var Output = require('../export/Output.js');
var BaseSourceBuilder = require('../export/type/SourceBuilder.js');

class SourceBuilder extends BaseSourceBuilder {
    constructor(cfg) {
        super(cfg);
        this.nullFound = false;
    }

    selectorlist(obj) {
        var items = obj.items,
            len = items.length,
            output = this.output,
            i;

        for (i = 0; i < len; i++) {
            this.visit(items[i]);
            if (i < len - 1) {
                output.add(',');
                output.addln();
                // we increment the selector count here, since
                // we actually want to skip one of the selectors in the
                // count, as all non-null ruleset.selectors values will
                // already have incremented the selector count by one
                // in the ruleset visitor method
                this.selectorCount++;
            }
        }
    }

    selectorproperty(obj) {
        this.visit(obj.property);
        this.output.add(': ');
        //this.output.space();
        this.visit(obj.value);
    }

    multipartselector(obj) {
        this.list(obj);
    }

    compoundselector(obj) {
        this.list(obj.sort());
    }

    selector(obj) {
        var parentSelector = obj.parent,
            output = this.output;

        switch (obj.selectorType) {
            case 'parent':
                if (parentSelector) {
                    this.visit(parent);
                    return false;
                }
                this.visit(obj.value);
                break;
            case 'placeholder':
                output.add('%');
                this.visit(obj.value);
                break;
            case 'dash':
                output.add('-');
                this.visit(obj.value);
                break;
            case 'attribute':
                output.add('[');
                this.visit(obj.value);
                output.add(']');
                break;
            case 'pseudo':
                output.add(':');
                this.visit(obj.value);
                break;
            default:
                this.visit(obj.value);
                break;
        }
    }

    declaration(obj) {
        var output = this.output,
            currDeclarationWas = this.currDeclaration,
            start = output.output,
            nullFoundWas = this.nullFound,
            prev;

        if (obj.docs && obj.docs.length) {
            for (var d = 0; d < obj.docs.length; d++) {
                output.addCommentLn(obj.docs[d]);
            }
        }

        this.currDeclaration = obj;

        output.addln();
        output.add(obj.property);
        output.add(":");
        output.space();
        prev = output.output.length;
        this.nullFound = false;
        this.visit(obj.value);
        if (this.nullFound || (output.output.length === prev && obj.property.indexOf('--') !== 0)) {
            output.output = start;
        }
        else {
            if (obj.important) {
                output.add(' !important');
            }
            if (output.isCompressed) {
                // for compressed output, don't need to print the ';'
                // char for the last ruleset
                if (!obj.ruleset || obj !== obj.ruleset.lastDeclaration()) {
                    output.add(';');
                }
            } else {
                output.add(';');
            }
        }
        this.nullFound = nullFoundWas;
        this.currDeclaration = currDeclarationWas;
    }

    ruleset(obj) {
        var output = this.output,
            start = output.output,
            emptyStart;

        if (obj.isAtDirective) {
            output.addln();
            output.add(obj.atDirectiveName);
            output.add(' ');
            if (obj.atDirectiveValue) {
                this.visit(obj.atDirectiveValue);
                output.add(';');
            }
            else {
                output.add('{}');
            }
            return;
        }

        if (obj.selectors) {
            output.addln();

            if (obj.sourceInfo) {
                output.addComment('/* ' + obj.sourceInfo + ' */');
                output.addln();
            }

            if (obj.docs && obj.docs.length) {
                for (var d = 0; d < obj.docs.length; d++) {
                    output.addCommentLn(obj.docs[d]);
                }
            }
            this.selectorCount++;

            this.visit(obj.selectors);

            if (obj.isAtRule() &&
                obj.declarations.length === 0 &&
                obj.children.length === 0 && !obj.hasBlock) {
                output.add(";");
                return;
            }

            output.space();
            output.add('{');
            output.indent();
            emptyStart = output.output.length;

            this.visit(obj.declarations);

            if (obj.isAtRule() && !obj.isAtRoot()) {
                this.visit(obj.children);
                output.unindent();
                output.addln('}');
            }

            else {
                output.unindent();
                if (output.output.length === emptyStart) {
                    output.output = start;
                }
                else {
                    output.addln('}');
                }
                this.visit(obj.children);
            }
        }
    }
    
    visit(obj) {
        if (obj == null || obj.$isFashionNull) {
            this.nullFound = true;
        }
        else {
            super.visit(obj);
        }
    }

}

SourceBuilder.toSource = function(obj, output) {
    var sb = new SourceBuilder();
    return sb.toSource(obj, output);
};

Fashion.apply(SourceBuilder.prototype, {
    output: null,
    selectorCount: 0,
    currDeclaration: null
});

module.exports = SourceBuilder;
},{"../export/Base.js":19,"../export/Output.js":20,"../export/type/SourceBuilder.js":37,"./TypeVisitor.js":68}],68:[function(require,module,exports){
"use strict";

var BaseTypeVisitor = require('../export/type/TypeVisitor.js');

class TypeVisitor extends BaseTypeVisitor {
    constructor(cfg) {
        super(cfg);
    }

    selector(obj) {
        obj.descend(this);
    }

    selectorproperty(obj) {
        obj.descend(this);
    }

    compoundselector(obj) {
        obj.descend(this);
    }

    multipartselector(obj) {
        obj.descend(this);
    }

    selectorlist(obj) {
        obj.descend(this);
    }

    declaration(obj) {
        obj.descend(this);
    }

    ruleset(obj) {
        obj.descend(this);
    }
}

TypeVisitor.prototype.context = null;

module.exports = TypeVisitor;

},{"../export/type/TypeVisitor.js":41}],69:[function(require,module,exports){
"use strict";

var Fashion = require('../export/Base.js');
var BaseTypes = require('../export/type/Types.js');

var Types = Fashion.apply(BaseTypes, {
    Ruleset: require('./Ruleset.js'),
    Declaration: require('./Declaration.js'),
    SelectorPart: require('./selectors/SelectorPart.js'),
    CompoundSelector: require('./selectors/CompoundSelector.js'),
    MultiPartSelector: require('./selectors/MultiPartSelector.js'),
    SelectorList: require('./selectors/SelectorList.js'),
    SelectorProperty: require('./selectors/SelectorProperty.js')
});

module.exports = Types;
},{"../export/Base.js":19,"../export/type/Types.js":42,"./Declaration.js":65,"./Ruleset.js":66,"./selectors/CompoundSelector.js":72,"./selectors/MultiPartSelector.js":73,"./selectors/SelectorList.js":74,"./selectors/SelectorPart.js":75,"./selectors/SelectorProperty.js":76}],70:[function(require,module,exports){
"use strict";

var Fashion = require('../../export/Base.js');
var Type = require('../../export/type/Type.js');

class BaseSelector extends Type {
    constructor() {
        super();
    }

    clone(match, replace) {
        if (match && match === this.toString()) {
            return replace.clone();
        }
        var cloned = super.clone();
        if (this.parent) {
            cloned.setParent(this.parent.clone(match, replace));
        }
        return cloned;
    }

    hasHash(hash) {
        return this.toString() === hash;
    }

    setParent(parent) {
        this.parent = parent;
    }
}

Fashion.apply(BaseSelector.prototype, {
    parent: null,
    position: null,
    $canUnbox: false,
    skipParentPrepend: null,
});

module.exports = BaseSelector;
},{"../../export/Base.js":19,"../../export/type/Type.js":40}],71:[function(require,module,exports){
"use strict";

var Fashion = require('../../export/Base.js');
var BaseSelector = require('./BaseSelector.js');

class BaseSelectorList extends BaseSelector {
    constructor(items, separator) {
        super();
        this.items = items;
        this.separator = separator;
    }

    toString() {
        return this.items.join(this.separator);
    }

    cloneItems(match, replace) {
        var cloned = [];
        for (var i = 0; i < this.items.length; i++) {
            cloned.push(this.items[i].clone(match, replace));
        }
        return cloned;
    }

    unquote() {
        var items = [];
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i]) {
                items.push(this.items[i].unquote());
            }
        }
        return new List(items, this.separator);
    }

    _getHash() {
        var items = [],
            tItems = this.items,
            item;

        for (var i = 0; i < tItems.length; i++) {
            item = tItems[i];
            items.push((item && item.getHash()) || '');
        }

        items = items.sort();
        return items.join(this.separator);
    }

    setItems (items) {
        this.items = items;
        this._hash = null;
    }
}

Fashion.apply(BaseSelectorList.prototype, {
    separator: null,
    $isFashionBaseSelectorList: true
});

Fashion.mixin(BaseSelectorList, Fashion.BaseSet);

module.exports = BaseSelectorList;
},{"../../export/Base.js":19,"./BaseSelector.js":70}],72:[function(require,module,exports){
"use strict";

var Fashion = require('../../export/Base.js');
var BaseSelector = require('./BaseSelector.js');
var BaseSelectorList = require('./BaseSelectorList.js');
var SelectorPart = require('./SelectorPart.js');
var Literal = require('../../export/type/Literal.js');

class CompoundSelector extends BaseSelector {
    constructor(items, preserve) {
        super();
        this.items = items;
        this.preserve = preserve;
        this._superSelectorMap = {};
    }

    doVisit(visitor) {
        visitor.compoundselector(this);
    }

    descend(visitor) {
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            item && visitor.visit(item);
        }
    }

    cloneItems(match, replace) {
        var cloned = [];
        for (var i = 0; i < this.items.length; i++) {
            cloned.push(this.items[i].clone(match, replace));
        }
        return cloned;
    }

    clone(match, replace) {
        if (match && match === this.toString()) {
            return replace.clone();
        }
        var cloned = new CompoundSelector(this.cloneItems(match, replace));
        if (this.parent) {
            cloned.setParent(this.parent.clone(match, replace));
        }
        return cloned;
    }

    setItems (items) {
        this.items = items;
        this._hash = null;
    }

    toString() {
        return this.items.join('');
    }

    hasPlaceholder() {
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            if (item instanceof SelectorPart) {
                if (item.selectorType === 'placeholder') {
                    return true;
                }
            }
        }
        if (this.parent) {
            var parent = this.parent;
            return parent.hasPlaceholder && parent.hasPlaceholder();
        }
        return false;
    }

    flatten() {
        if (!this.flattened) {
            this.flattened = true;
            var flattened = [],
                map = {};

            for (var i = 0; i < this.items.length; i++) {
                var item = this.items[i];
                if (item instanceof CompoundSelector) {
                    var sel = item,
                        selItems = sel.flatten() && sel.items;
                    for (var s = 0; s < selItems.length; s++) {
                        var sItem = selItems[s];
                        sItem.position = flattened.length;
                        if (!map[sItem.toString()]) {
                            flattened.push(sItem);
                            map[sItem.toString()] = true;
                        }
                    }
                } else if (item instanceof BaseSelectorList) {
                    var list = item;
                    if (list.items.length == 1) {
                        var sItem = list.items[0];
                        sItem.position = flattened.length;
                        if (!map[sItem.toString()]) {
                            flattened.push(sItem);
                            map[sItem.toString()] = true;
                        }
                    } else {
                        var sItem = item;
                        item.position = flattened.length;
                        if (!map[sItem.toString()]) {
                            flattened.push(sItem);
                            map[sItem.toString()] = true;
                        }
                    }
                } else {
                    var sItem = item;
                    sItem.position = flattened.length;
                    if (!map[sItem.toString()] || item.$isFashionLiteral || item.$isFashionNumber) {
                        flattened.push(sItem);
                        map[sItem.toString()] = true;
                    }
                }
            }

            this.items = flattened;
        }
        this._hash = null;
        return this;
    }

    sort() {
        if (!this.sorted) {
            this.sorted = true;
            this.flatten();
            this.items.sort((a, b) => {
                var aIsPart = (a instanceof SelectorPart),
                    bIsPart = (b instanceof SelectorPart),
                    aIsSelector = (a instanceof BaseSelector),
                    bIsSelector = (b instanceof BaseSelector),
                    aVal = a.toString(),
                    bVal = b.toString(),
                    aPart, bPart;


                // ensure that if either component of the comparison is one of the
                // operators that we maintain the original ordering
                if (CompoundSelector.excludeSortOps[aVal] ||
                    CompoundSelector.excludeSortOps[bVal]) {
                    return a.position - b.position;
                }

                if (bIsSelector) {
                    if (!aIsSelector) {
                        if (a instanceof Fashion.Literal) {
                            if (a.toString().indexOf('-') === 0) {
                                return 1;
                            }
                        }
                        if (!CompoundSelector.excludeSortOps[bVal]) {
                            return -1;
                        }
                    }

                    if (bIsPart) {
                        if (!aIsPart) {
                            return -1;
                        }
                        aPart = a;
                        bPart = b;

                        var res = aPart.getTypePriority() - bPart.getTypePriority();
                        if (res === 0) {
                            return aPart.position - bPart.position;
                        }
                        return res;
                    } else {
                        if (aIsPart) {
                            return 1;
                        }
                    }
                } else if (aIsSelector) {
                    if (!CompoundSelector.excludeSortOps[aVal]) {
                        return 1;
                    }
                    // } else if(b instanceof Fashion.Literal) {
                    //if(a instanceof Fashion.Literal) {
                    //    var aVal = a.toString();
                    //    var bVal = b.toString();
                    //    return aVal.localeCompare(bVal);
                    //}
                }


                return a.position - b.position;
            });
        }
        this._hash = null;
        return this;
    }

    base() {
        var first = this.first();
        if (first instanceof Literal) {
            return first;
        }
        if (first instanceof SelectorPart) {
            if (first.selectorType === 'wildcard') {
                return first;
            }
        }
        return null;
    }

    _getHash() {
        var base = this.base(),
            rest = this.rest(),
            parts = [];

        for (var r = 0; r < rest.length; r++) {
            parts.push(rest[r].getHash());
        }

        parts = parts.sort();
        if (base) {
            parts.unshift(base.getHash());
        }
        return parts.join('');
    }

    rest() {
        var base = this.base(),
            rest = Fashion.filter(this.items, function(item) {
                return base ? item !== base : true;
            });
        return rest;
    }

    isSuperSelector(selector) {
        var key = selector,
            map = this._superSelectorMap,
            result = map[key];

        if (result === undefined) {
            result = this.isSubset(selector);
            map[key] = result;
        }
        return result;
    }

    /**
     * returns:
     *  1 == this is subset of other
     * -1 == other is subset of this
     *  0 == different
     */
    isSubset(selector) {
        var items = this.items,
            sItems = selector.items,
            longItemMap = {},
            shortList = items,
            longList = sItems,
            item,
            res = 1;

        if (items.length > sItems.length) {
            shortList = sItems;
            longList = items;
            res = -1;
        }

        for (var i = 0; i < longList.length; i++) {
            item = longList[i];
            longItemMap[item.toString()] = item;
        }

        for (var i = 0; i < shortList.length; i++) {
            item = shortList[i];
            if (!longItemMap[item.toString()]) {
                return 0;
            }
        }

        return res;
    }
}

CompoundSelector.excludeSortOps = {
    '&': true,
    '*': true,
    '~': true,
    '>': true,
    '|': true,
    '+': true
};

Fashion.mixin(CompoundSelector, Fashion.BaseSet);

Fashion.apply(CompoundSelector.prototype, {
    type: 'compoundselector',
    $isFashionCompoundSelector: true,
    $canUnbox: false,
    items: null,
    preserve: false,
    flattened: false,
    sorted: false,
    _superSelectorMap: null
});

module.exports = CompoundSelector;
},{"../../export/Base.js":19,"../../export/type/Literal.js":32,"./BaseSelector.js":70,"./BaseSelectorList.js":71,"./SelectorPart.js":75}],73:[function(require,module,exports){
"use strict";

var Fashion = require('../../export/Base.js');
var BaseSelectorList = require('./BaseSelectorList.js');

class MultiPartSelector extends BaseSelectorList {
    constructor(items, parent) {
        super(items, ' ');
        if (parent) {
            this.setParent(parent);
        }
        this._superSelectorMap = {};
    }

    doVisit(visitor) {
        visitor.multipartselector(this);
    }

    descend(visitor) {
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            item && visitor.visit(item);
        }
    }

    clone(match, replace) {
        if (match && match === this.toString()) {
            return replace.clone();
        }
        var cloned = new MultiPartSelector(this.cloneItems(match, replace));
        if (this.parent) {
            cloned.setParent(this.parent.clone(match, replace));
        }
        cloned.skipParentPrepend = this.skipParentPrepend;
        return cloned;
    }

    /**
     * returns:
     *  1 == this isSuperSelector of other
     * -1 == other isSuperSelector of this
     *  0 == different
     */
    calcIsSuperSelector(selector) {
        var items = this.items,
            sItems = selector.items,
            shortList = items,
            longList = sItems,
            res = 1,
            tmpRes;

        if (items.length > sItems.length) {
            shortList = sItems;
            longList = items;
            res = -1;
        }

        if (this.parent) {
            if (!selector.parent) {
                return 0;
            }
            tmpRes = this.parent.isSuperSelector(selector.parent);
            if (res !== tmpRes) {
                return 0;
            }
        } else if (selector.parent) {
            return 0;
        }


        for (var i = 0; i < shortList.length; i++) {
            //tmpRes = shortList[i].isSuperSelector(longList[i]);
            var tmpRes;
            if (tmpRes === 0) {
                return 0;
            } else if (tmpRes !== res) {
                return 0;
            }
        }
        return res;
    }

    isSuperSelector(selector) {
        var key = selector,
            map = this._superSelectorMap,
            result = map[key];

        if (result === undefined) {
            result = this.calcIsSuperSelector(selector);
            map[key] = result;
        }

        return result;
    }

    removeAtRoot() {
        var items = Fashion.filter(this.items, (item) => {
            return item.toString() !== '@at-root';
        });
        if (items.length) {
            this.items = items;
            return this;
        }
        return null;
    }

    
    flatten () {
        var items = this.items,
            len = items.length,
            newItems = [],
            item;
        for (var i = 0; i < len; i++) {
            item = items[i];
            while (item && item.visitTarget) {
                item = item.visitTarget;
            }
            if (item) {
                if (item.$isFashionMultiPartSelector) {
                    newItems.push.apply(newItems, item.flatten());
                }
                else {
                    if (item.$isFashionCompoundSelector) {
                        item.flatten();
                    }
                    newItems.push(item);
                }
            }
        }
        this.items = newItems;
        return newItems;
    }
    
}

Fashion.apply(MultiPartSelector.prototype, {
    $isFashionMultiPartSelector: true,
    type: 'multipartselector',
    parent: null,
    _superSelectorMap: null
});

module.exports = MultiPartSelector;
},{"../../export/Base.js":19,"./BaseSelectorList.js":71}],74:[function(require,module,exports){
"use strict";

var Fashion = require('../../export/Base.js');
var BaseSelectorList = require('./BaseSelectorList.js');

class SelectorList extends BaseSelectorList {
    constructor(list) {
        super(list, ',');
    }

    doVisit(visitor) {
        visitor.selectorlist(this);
    }

    descend(visitor) {
        for (var i = 0; i < this.items.length; i++) {
            var item = this.items[i];
            item && visitor.visit(item);
        }
    }

    clone(match, replace) {
        var cloned = new SelectorList(this.cloneItems());
        if (this.parent) {
            cloned.setParent(this.parent.clone(match, replace));
        }
        return cloned;
    }

    applyInterpolations() {
        if (!this.interpolated) {
            this.interpolated = true;
            var interpolated = [],
                selectors = this.items,
                selector, str, items;

            for (var s = 0; s < selectors.length; s++) {
                selector = selectors[s];
                str = selector.toString();
                if (str.indexOf(',') === -1) {
                    interpolated.push(selector);
                } else {
                    items = str.split(',');
                    interpolated.push.apply(interpolated, items);
                }
            }
            this.items = interpolated;
        }
    }
    
    flatten () {
        var items = this.items,
            len = items.length,
            newItems = [],
            item;
        for (var i = 0; i < len; i++) {
            item = items[i];
            while (item && item.visitTarget) {
                item = item.visitTarget;
            }
            if (item.$isFashionSelectorList) {
                newItems.push.apply(newItems, item.flatten());
            }
            else {
                if (item.$isFashionMultiPartSelector || item.$isFashionCompoundSelector) {
                    item.flatten();
                }
                newItems.push(item);
            }
        }
        this.items = newItems;
        return newItems;
    }
}

Fashion.apply(SelectorList.prototype, {
    $isFashionSelectorList: true,
    type: 'selectorlist',
    ruleset: null,
    interpolated: null
});

module.exports = SelectorList;

},{"../../export/Base.js":19,"./BaseSelectorList.js":71}],75:[function(require,module,exports){
"use strict";

var Fashion = require('../../export/Base.js');
var BaseSelector = require('./BaseSelector.js');

class SelectorPart extends BaseSelector {
    constructor(value, type) {
        super();
        this.value = value;
        this.selectorType = type;
    }

    doVisit(visitor) {
        visitor.selector(this);
    }

    descend(visitor) {
        this.value && visitor.visit(this.value);
    }

    toString() {
        switch (this.selectorType) {
            case 'placeholder':
                return '%' + this.value.toString();
            case 'dash':
                return '-' + this.value.toString();
            case 'attribute':
                return '[' + this.value.toString() + ']';
            case 'pseudo':
                return ':' + this.value.toString();
            default:
                return this.value.toString();
        }
    }

    clone(match, replace) {
        if (match && match === this.toString()) {
            return replace.clone();
        }
        var cloned = new SelectorPart(this.value, this.selectorType);
        if (this.parent) {
            cloned.setParent(this.parent.clone(match, replace));
        }
        if (this.selectorType == 'parent' && this.visitTarget) {
            cloned.visitTarget = this.visitTarget;
        }
        return cloned;
    }

    getTypePriority() {
        switch (this.selectorType) {
            case 'class':
                return 0;
            case 'id':
                return 1;
            case 'pseudo':
                var str = this.value.toString();

                if (str.indexOf(":") === 0) {
                    return 21;
                }

                if (str.indexOf('not') === 0) {
                    return 19;
                }

                return 20;
            case 'attribute':
                return 0;
            case 'placeholder':
                return -100;
            default:
                return -50;
        }
    }
}

Fashion.apply(SelectorPart.prototype, {
    type: 'selector',
    $isFashionSelectorPart: true,
    value: null,
    selectorType: null
});

module.exports = SelectorPart;
},{"../../export/Base.js":19,"./BaseSelector.js":70}],76:[function(require,module,exports){
"use strict";

var Fashion = require('../../export/Base.js');
var BaseSelector = require('./BaseSelector.js');

class SelectorProperty extends BaseSelector {
    constructor(property, value) {
        super();
        this.property = property;
        this.value = value;
    }


    toString() {
        return this.property.toString() + ": " + this.value.toString();
    }

    doVisit(visitor) {
        visitor.selectorproperty(this);
    }

    descend(visitor) {
        this.value && visitor.visit(this.value);
    }

}

Fashion.apply(SelectorProperty.prototype, {
    type: 'selectorproperty',
    property: null,
    value: null
});

module.exports = SelectorProperty;
},{"../../export/Base.js":19,"./BaseSelector.js":70}]},{},[1])(1)
});
