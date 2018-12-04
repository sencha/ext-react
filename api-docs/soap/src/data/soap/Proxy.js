/**
 * @class Ext.data.soap.Proxy
 * @extend Ext.data.proxy.Ajax
 * @alias proxy.soap
 * The SOAP Proxy class is an {@link Ext.data.proxy.Ajax Ajax Proxy} to access v1.1 SOAP
 * (Simple Object Access Protocol) services.  SOAP Proxy constructs a SOAP Envelope and 
 * submits an AJAX request to load a SOAP response from the server.
 * 
 * For help getting started please refer to the
 * [Soap Guide](../guides/backend_connectors/soap.html).
 *
 * @class Ext.data.soap.Proxy
 */

/**
* @cfg {Object} api
* An object containing "create", "read", "update" and "destroy" properties that define
* SOAP operations for each CRUD action method. These operations will be appended to
* the {@link #url} as the {@link #operationParam} for each request type.
*
*     api: {
*         create: undefined,
*         read: undefined,
*         update: undefined,
*         destroy: undefined
*     }
*
* At least one operation is required, but additional operations do not need to be configured
* if they will not be used.  For example, if this proxy is only used for read operations
* the following configuration will be sufficient:
*
*     api: {
*         read: 'Foo'
*     }
*
* @accessor
*/

/**
* @cfg {Object} soapAction
* An object containing "create", "read", "update" and "destroy" properties that define
* the [SOAPAction](http://www.w3.org/TR/2000/NOTE-SOAP-20000508/#_Toc478383528) header
* for each CRUD action method. A soapAction must be specified for each operation
* configured in {@link #api}  Defaults to:
*
*     soapAction: {
*         create: undefined,
*         read: undefined,
*         update: undefined,
*         destroy: undefined
*     }
* @accessor
*/

/**
* @cfg {String} [operationParam='op']
* The name of the operation parameter to be appened to the SOAP endpoint url
* @accessor
*/

/**
* @cfg {Object/String/Ext.data.soap.Reader} [reader='soap']
* The {@link Ext.data.soap.Reader} to use to decode the server's response. This can
* either be a SOAP Reader instance, a SOAP Reader config object or 'soap'.
* @accessor
*/

/**
* @cfg {String} [url=""]
* The SOAP endpoint url that this proxy will use to request the SOAP data. This can
* be a proxied url to work around same-origin policy if the SOAP endpoint url is on
* a different domain from your application.
* @accessor
*/

/**
* @cfg [envelopeTpl=undefined]
* The template used to create the SOAP envelope.  Defaults to:
*
*     [
*         '<?xml version="1.0" encoding="utf-8" ?>',
*         '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">',
*             '{[values.bodyTpl.apply(values)]}',
*         '</soap:Envelope>'
*     ]
* @accessor
*/

/**
* @cfg {Ext.XTemplate/Array} createBodyTpl
* The template used to create the SOAP body for the "create" action. If not specified
* {@link #writeBodyTpl} will be used for the "create" action.
* @accessor
*/

/**
* @cfg {Ext.XTemplate/Array} [readBodyTpl=undefined]
* The template used to create the SOAP body for the "read" action.  Defaults to:
*
*     [
*         '<soap:Body>',
*             '<{operation} xmlns="{targetNamespace}">',
*                 '<tpl foreach="params">',
*                     '<{$}>{.}</{$}>',
*                 '</tpl>',
*             '</{operation}>',
*         '</soap:Body>'
*     ]
* @accessor
*/

/**
* @cfg {Ext.XTemplate/Array} updateBodyTpl
* The template used to create the SOAP body for the "update" action. If not specified
* {@link #writeBodyTpl} will be used for the "update" action.
* @accessor
*/

/**
* @cfg {Ext.XTemplate/Array} destroyBodyTpl
* The template used to create the SOAP body for the "destroy" action. If not specified
* {@link #writeBodyTpl} will be used for the "destroy" action.
* @accessor
*/

/**
* @cfg {Ext.XTemplate/Array} [writeBodyTpl=undefined]
* The default template used to create the SOAP body for write actions (create, update,
* and destroy). The individual body templates for each write action can be configured
* using {@link #createBodyTpl}, {@link #updateBodyTpl}, and {@link #destroyBodyTpl}.
* Defaults to:
*
*     [
*          '<soap:Body>',
*              '<{operation} xmlns="{targetNamespace}">',
*                  '<tpl for="records">',
*                      '{% var recordName=values.modelName.split(".").pop(); %}',
*                      '<{[recordName]}>',
*                          '<tpl for="fields">',
*                              '<{name}>{[parent.get(values.name)]}</{name}>',
*                          '</tpl>',
*                      '</{[recordName]}>',
*                  '</tpl>',
*              '</{operation}>',
*          '</soap:Body>'
*      ]
* @accessor
*/

/**
* @cfg {String} [targetNamespace=""]
* namespace URI used by {@link #createBodyTpl}, {@link #readBodyTpl}, {@link #updateBodyTpl},
* and {@link #destroyBodyTpl} as the "xmlns" attribute for the operation element.
* @accessor
*/
