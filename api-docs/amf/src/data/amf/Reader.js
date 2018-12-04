/**
 * @class Ext.data.amf.Reader
 * @extend Ext.data.reader.Json
 * @alias reader.amf
 *
 * The AMF Reader is used by an {@link Ext.data.amf.Proxy AMF Proxy} to read 
 * records from a server response that contains binary data in either AMF0 or
 * AMF3 format. AMF Reader constructs an {@link Ext.data.amf.Packet AMF Packet}
 * and uses it to decode the binary data into javascript objects, then simply
 * allows its superclass ({@link Ext.data.reader.Json}) to handle converting the
 * raw javascript objects into {@link Ext.data.Model} instances.
 * 
 * For a more detailed tutorial see the
 * [AMF Guide](../guides/backend_connectors/amf.html).
 */

/**
 * @cfg {Number} [messageIndex=0]
 * AMF Packets can contain multiple messages. This config specifies the
 * 0-based index of the message that contains the record data.
 */
