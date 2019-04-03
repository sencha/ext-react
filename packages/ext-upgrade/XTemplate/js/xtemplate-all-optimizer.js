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
    proto.createArrayTest = function(L) {
        return 'ts.call(c' + L + ')==="[object Array]"';
    };

}(Ext.XTemplateCompiler.prototype));

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