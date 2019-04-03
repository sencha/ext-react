//@require ../ant/ant-util.js
//@require ../ant/JSON.js

//@require Ext.js
//@require String.js
//@require Format.js
//@require Template.js
//@require XTemplateParser.js
//@require XTemplateCompiler.js
//@require XTemplate.js

(function (proto) {
    if (!proto.createArrayTest) {
        console.error("Something has changed in XTemplateCompiler");
        throw new Error("Something has changed in XTemplateCompiler");
    }

    proto.createArrayTest = ('isArray' in Array) ? function(L) {
        return 'Array.isArray(c' + L + ' = toJS(c' + L +'))';
    } : function(L) {
        return 'ts.call(c' + L + ' = toJS(c' + L + '))==="[object Array]"';
    };

}(Ext.XTemplateCompiler.prototype));

var $tplMap = {};

function getTpl(tpl) {
   var compiled = $tplMap[tpl] || new Ext.XTemplate(toJS(tpl));
   $tplMap[tpl] = compiled;
   return compiled;
}

function evalDataObj(tpl, dataObj) {
   tpl = getTpl(tpl);
   dataObj = toJS(dataObj);
   return tpl.apply(dataObj);
}

function evalDataStr(tpl, dataStr, dataObj) {
   tpl = getTpl(tpl);
   dataStr = eval('(' + dataStr + ')');
   dataObj = toJS(dataObj);
   return tpl.apply(Ext.apply(dataStr, dataObj));
}

function getTplFn(tpl, cfg) {
    var theObj = {};
    if(cfg) {
        theObj = eval('theObj = ' + cfg);
    }

    var compiled = new Ext.XTemplate(toJS(tpl), theObj);
    var compiler = new Ext.XTemplateCompiler({
        useFormat: compiled.disableFormats !== true,
        definitions: compiled.definitions
    });

    var source = compiler.generate(compiled.html);
    return source;
}