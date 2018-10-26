(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Fashion = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var Fashion = require('./src/export/Base.js');
var CssVariableManager = require('./src/export/css/CssVariableManager.js'),
    css = new CssVariableManager();

Fashion.apply(Fashion, {
    css: css,
    CssExport: CssVariableManager,
    Types: require('./src/export/type/Types.js'),
    ValueParser: require('./src/export/parse/ValueParser.js'),
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
    LinearGradient: require('./src/export/type/LinearGradient.js'),
    RadialGradient: require('./src/export/type/RadialGradient.js'),
    Statics: require('./src/export/type/Statics.js'),
    SourceBuilder: require('./src/export/type/SourceBuilder.js'),
    Types: require('./src/export/type/Types.js'),
    TypeVisitor: require('./src/export/type/TypeVisitor.js'),
    Output: require('./src/export/Output.js'),
    Runtime: require('./src/export/Runtime.js')
});

module.exports = Fashion;
},{"./src/export/Base.js":3,"./src/export/Output.js":4,"./src/export/Runtime.js":5,"./src/export/css/CssVariableManager.js":6,"./src/export/parse/ValueParser.js":7,"./src/export/type/Bool.js":8,"./src/export/type/Color.js":9,"./src/export/type/ColorHSLA.js":10,"./src/export/type/ColorRGBA.js":11,"./src/export/type/ColorStop.js":12,"./src/export/type/FunctionCall.js":13,"./src/export/type/LinearGradient.js":14,"./src/export/type/List.js":15,"./src/export/type/Literal.js":16,"./src/export/type/Map.js":17,"./src/export/type/Numeric.js":18,"./src/export/type/ParentheticalExpression.js":19,"./src/export/type/RadialGradient.js":20,"./src/export/type/SourceBuilder.js":21,"./src/export/type/Statics.js":22,"./src/export/type/Text.js":23,"./src/export/type/Type.js":24,"./src/export/type/TypeVisitor.js":25,"./src/export/type/Types.js":26}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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



},{"./../NameConverter.js":2}],4:[function(require,module,exports){
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
},{"./Base.js":3}],5:[function(require,module,exports){
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
},{"./Base.js":3,"./type/Bool.js":8,"./type/Color.js":9,"./type/ColorRGBA.js":11,"./type/List.js":15,"./type/Literal.js":16,"./type/Statics.js":22,"./type/Text.js":23,"./type/Type.js":24,"./type/TypeVisitor.js":25,"./type/Types.js":26}],6:[function(require,module,exports){
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
},{"../Base.js":3,"../Runtime.js":5,"../parse/ValueParser.js":7,"../type/SourceBuilder.js":21}],7:[function(require,module,exports){
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
},{"../Base.js":3,"../type/Statics.js":22,"../type/Type.js":24,"../type/Types.js":26}],8:[function(require,module,exports){
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

},{"../Base.js":3,"./Type.js":24}],9:[function(require,module,exports){
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

},{"../Base.js":3,"./Bool.js":8,"./Numeric.js":18,"./Type.js":24}],10:[function(require,module,exports){
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

},{"../Base.js":3,"./Color.js":9,"./ColorRGBA.js":11}],11:[function(require,module,exports){
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

},{"../Base.js":3,"./Color.js":9}],12:[function(require,module,exports){
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

},{"../Base.js":3,"./Numeric.js":18,"./Type.js":24}],13:[function(require,module,exports){
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
},{"../Base.js":3,"./List.js":15,"./Type.js":24}],14:[function(require,module,exports){
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

},{"../Base.js":3,"./Type.js":24}],15:[function(require,module,exports){
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
},{"../Base.js":3,"./Type.js":24}],16:[function(require,module,exports){
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



},{"../Base.js":3,"./Numeric.js":18,"./Type.js":24}],17:[function(require,module,exports){
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
},{"../Base.js":3,"./List.js":15,"./Literal.js":16,"./Numeric.js":18,"./Type.js":24}],18:[function(require,module,exports){
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

},{"../Base.js":3,"./Bool.js":8,"./Literal.js":16,"./Type.js":24}],19:[function(require,module,exports){
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
},{"../Base.js":3,"./Type.js":24}],20:[function(require,module,exports){
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
},{"../Base.js":3,"./Type.js":24}],21:[function(require,module,exports){
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
},{"../Base.js":3,"../Output.js":4,"./TypeVisitor.js":25}],22:[function(require,module,exports){
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
},{"../Base.js":3,"./Bool.js":8,"./Literal.js":16,"./Numeric.js":18,"./Text.js":23,"./Type.js":24}],23:[function(require,module,exports){
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

},{"../Base.js":3,"./Literal.js":16}],24:[function(require,module,exports){
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

},{"../Base.js":3}],25:[function(require,module,exports){
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

},{"../Base.js":3}],26:[function(require,module,exports){
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
},{"./Bool.js":8,"./Color.js":9,"./ColorHSLA.js":10,"./ColorRGBA.js":11,"./ColorStop.js":12,"./FunctionCall.js":13,"./LinearGradient.js":14,"./List.js":15,"./Literal.js":16,"./Map.js":17,"./Numeric.js":18,"./ParentheticalExpression.js":19,"./RadialGradient.js":20,"./Text.js":23}]},{},[1])(1)
});
