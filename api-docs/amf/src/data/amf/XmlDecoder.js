/**
 * @class Ext.data.amf.XmlDecoder
 * @alias data.amf.xmldecoder
 * This class parses an XML-based AMFX message and returns the deserialized
 * objects. You should not need to use this class directly. It's mostly used by
 * the AMFX Direct implementation.
 * To decode a message, first construct a Decoder:
 *
 *     let decoder = Ext.create('Ext.data.amf.XmlDecoder');
 *
 * Then ask it to read in the message :
 *
 *     let resp = decoder.readAmfxMessage(str);
 *
 * For more information on working with AMF data please refer to the
 * [AMF Guide](../guides/backend_connectors/amf.html).
 */

