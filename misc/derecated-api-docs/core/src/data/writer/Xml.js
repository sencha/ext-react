/**
 * @class Ext.data.writer.Xml
 * @extend Ext.data.writer.Writer
 * @alias writer.xml
 *
 * This class is used to write {@link Ext.data.Model} data to the server in an XML format.
 * The {@link #documentRoot} property is used to specify the root element in the XML document.
 * The {@link #record} option is used to specify the element name for each record that will make up the XML document.
 */

/**
 * @cfg {String} [documentRoot="xmlData"]
 * The name of the root element of the document. Defaults to <tt>'xmlData'</tt>.
 * If there is more than 1 record and the root is not specified, the default document root will still be used
 * to ensure a valid XML document is created.
 *
 * If the {@link #record} mapping includes a root element name, eg: "SystemInfo>Operation", and
 * the selector includes the root element name, then you must configure this as `false`
 * @accessor
 */

/**
 * @cfg {String} [defaultDocumentRoot="xmlData"]
 * The root to be used if {@link #documentRoot} is empty and a root is required
 * to form a valid XML document.
 * @accessor
 */

/**
 * @cfg {String} [header=""]
 * A header to use in the XML document (such as setting the encoding or version).
 * Defaults to <tt>''</tt>.
 * @accessor
 */

/**
 * @cfg {String} record
 * The name of the node to use for each record. Defaults to
 * the owning {@link Ext.data.proxy.Proxy Proxy}'s {@link Ext.data.reader.Xml Reader}'s
 * {@link Ext.data.reader.Xml#record} setting, or `'record'`.
 * @accessor
 */

/**
 * @method objectToElement
 * Serializes an object to XML.
 * Properties will be serialized as child elements unless their first character is `'@'`
 *
 * For example:
 *
 *    myWriter.objectToElement('SystemComponent', {
 *        "@SystemNumber": '10118795',
 *        "SystemInfo>SystemName": 'Phase Noise Measurement System',
 *        AssetId: 'DE3208',
 *        AgilentModel: 'E5505A',
 *        SerialNumber: 'US44101357',
 *    }, []).join('');
 *
 * becomes
 *
 *    <SystemComponent SystemNumber="10118795">
 *      <SystemInfo>
 *          <SystemName>Phase Noise Measurement System</SystemName>
 *      </SystemInfo>
 *      <AssetId>DE3208</AssetId>
 *      <AgilentModel>E5505A</AgilentModel>
 *      <SerialNumber>US44101357</SerialNumber>
 *    </SystemComponent>
 *
 * @param {String} name The element name for the object.
 * @param {Object} o The object to serialize.
 * @param {Array} [output] The array into which to serialize the object.
 * @return {undefined}
 */
