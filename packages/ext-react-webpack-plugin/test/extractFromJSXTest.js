const { expect } = require('chai');
const extractFromJSX = require('../dist/extractFromJSX');

describe('extractFromJSX', () => {

    it('extract xtypes from imports', () => {
        const statements = extractFromJSX(`
            import { Panel, Container } from '@sencha/ext-modern';
            var panel = React.createElement(Panel, { title: 'title' });
            var container = React.createElement(Container, { layout: 'vbox' });
        `);

        expect(statements).to.eql([
            `Ext.create({\n  xtype: 'panel',\n  title: 'title'\n})`,
            `Ext.create({\n  xtype: 'container',\n  layout: 'vbox'\n})`,
            `Ext.create({"xtype":"panel"})`,
            `Ext.create({"xtype":"container"})`
        ])
    });

    it('should handle reactify(xtype)', () => {
        const statements = extractFromJSX(`
            import { reactify } from '@sencha/ext-react16';
            var Panel = reactify('panel');
            var comp = React.createElement(Panel, { title: 'title' })
        `);

        expect(statements).to.eql([
            `Ext.create({\n  xtype: 'panel',\n  title: 'title'\n})`,
            `Ext.create({"xtype":"panel"})`
        ])
    });
    
    it('should handle reactify([xtype1, xtype2, ...])', () => {
        const statements = extractFromJSX(`
            import { reactify } from '@sencha/ext-react16';
            var [ Panel, Container ] = reactify('panel', 'container');
            var comp = React.createElement(Panel, { title: 'title' })
            var container = React.createElement(Container, { layout: 'vbox' });
        `);

        expect(statements).to.eql([
            `Ext.create({\n  xtype: 'panel',\n  title: 'title'\n})`,
            `Ext.create({\n  xtype: 'container',\n  layout: 'vbox'\n})`,
            `Ext.create({"xtype":"panel"})`,
            `Ext.create({"xtype":"container"})`
        ])
    });

    it('should handle reactify(class)', () => {
        const statements = extractFromJSX(`
            import { reactify } from '@sencha/ext-react16';
            var Panel = reactify(Ext.Panel);
            var comp = React.createElement(Panel, { title: 'title' })
        `);

        expect(statements).to.eql([
            `Ext.create({\n  xclass: 'Ext.Panel',\n  title: 'title'\n})`,
            `Ext.create({"xclass":"Ext.Panel"})`
        ])
    });
    
});