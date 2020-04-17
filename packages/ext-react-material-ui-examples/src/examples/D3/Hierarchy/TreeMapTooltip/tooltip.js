const parentTpl = new Ext.XTemplate([
        '<div class="treemaptooltip-tip-title">{data.name}</div>',
        '<tpl for="childNodes">',
        '<div><span class="treemaptooltip-tip-symbol">{data.name}</span><tpl if="data.description"> - {data.description}</tpl></div>',
        '<tpl if="xindex &gt; 10">...{% break; %}</tpl>',
        '</tpl>'
    ]),
    leafTpl = new Ext.XTemplate([
        '<div class="treemaptooltip-tip-company">{data.description}</div>',
        '<div>Change: <tpl if="data.change &gt; 0">+</tpl>{data.change}%</div>'
    ]);

export default function(component, tooltip, node) {
    const record = node.data,
        tpl = record.isLeaf() ? leafTpl : parentTpl;
    
    component.setSelection(record);

    tooltip.setHtml(tpl.apply(record));
}