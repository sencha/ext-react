import ReactDOM from 'react-dom';
//const ReactCell =
Ext.define('Ext.ReactCell', {
    extend: 'Ext.grid.cell.Base',
    xtype: 'reactcell',

    config: {
        renderer: null,
        summaryRenderer: null,
        forceWidth: true
    },

    setValue: function (value) {
        var me = this,
            context = me.refreshContext,
            column = context.column,
            needsSizing = false,
            scope = column.getScope(),
            markup, renderer, result;

        if (context.summary) {
            renderer = me.getSummaryRenderer() || column.getSummaryRenderer();
        }

        renderer = renderer || me.getRenderer() || column.getRenderer();
        if (renderer) {
            markup = renderer.call(scope, value, context.record, context.dataIndex, me, column);
            if (typeof markup === 'object') {
                result = ReactDOM.render(markup, me.bodyElement.dom);
                if (result == null) {
                  markup.type.prototype.rootDOM =  me.bodyElement.dom
                }
                else {
                  if (result.cmp != undefined) {
                    result.cmp.setRenderTo(me.bodyElement.dom);
                  }
                  if (result.isWidget) {
                      needsSizing = result !== me.widget;
                      me.widget = result;
                  }
                }
            } else {
                if (markup == null) {
                    markup = '';
                }
                Ext.dom.Helper.overwrite(me.bodyElement, Ext.htmlEncode(markup.toString()));
                me.widget = null;
            }
            if (needsSizing && me.getForceWidth()) {
                me.setWidgetWidth(me.getWidth());
            }
        }
        return me;
    },

    updateWidth: function (width, oldWidth) {
        //this.callParent(arguments);
        var el = this.el;

        el.setWidth(width);
        el.toggleCls(this.widthedCls, width != null && width !== 'auto');

        if (this.getForceWidth()) {
            this.setWidgetWidth(width);
        }
    },

    doDestroy: function () {
        this.widget = null;
        ReactDOM.unmountComponentAtNode(this.bodyElement.dom);
        this.callParent();
    },

    privates: {
        setWidgetWidth: function (width) {
            var me = this,
                el = me.bodyElement,
                widget, column, leftPad, rightPad;

            if (!me.rendered) {
                return;
            }

            widget = me.widget;

            if (widget) {
                column = me.getColumn();
                leftPad = parseInt(column.getCachedStyle(el, 'padding-left'), 10) || 0;
                rightPad = parseInt(column.getCachedStyle(el, 'padding-right'), 10) || 0;

                // Give the widget a reference to ourself to allow it to do extra measuring
                widget.measurer = column;
                widget.setWidth(width - leftPad - rightPad);
            }
        }
    }
});
//export default ReactCell;