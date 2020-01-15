/**
 * @class Ext.data.amf.Proxy
 * @extend Ext.data.proxy.Ajax
 * @alias Ext.data.amf.Reader
 * The AMF Proxy is an {@link Ext.data.proxy.Ajax Ajax Proxy} that requests
 * binary data from a remote server and parses it into records using an
 * {@link Ext.data.amf.Reader AMF Reader} for use in a
 * {@link Ext.data.Store Store}.
 *
 *     let store = new Ext.data.Store({
 *         model: 'Foo',
 *         proxy: {
 *             type: 'amf',
 *             url: 'some/url'
 *         }
 *     });
 *     
 * For a detailed tutorial on using AMF data see the
 * [AMF Guide](../guides/backend_connectors/amf.html).
 */

/**
 * @cfg [binary=true]
 * @inheritdoc
 */

/**
 * @cfg {String} [reader="amf"]
 * @inheritdoc
 */
