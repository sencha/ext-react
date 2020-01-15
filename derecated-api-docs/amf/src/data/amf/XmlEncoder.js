/**
 * @class Ext.data.amf.XmlEncoder
 * @alias data.amf.xmlencoder
 * This class serializes data in the Action Message Format XML (AMFX) format.
 * It can write simple and complex objects, to be used in conjunction with an
 * AMFX-compliant server.
 * To create an encoded XMl, first construct an Encoder:
 *
 *     let encoder = Ext.create('Ext.data.amf.XmlEncoder');
 *
 * Then use the writer methods to out data to the :
 *
 *     encoder.writeObject(1);
 *     encoder.writeObject({a: "b"});
 *
 * And access the data through the #bytes property:
 *     encoder.body;
 *
 * You can also reset the class to start a new body:
 *
 *     encoder.clear();
 *
 * Current limitations:
 * AMF3 format (format:3)
 * - Each object is written out explicitly, not using the reference tables
 *   supported by the AMFX format. This means the function does NOT support
 *   circular reference objects.
 * - Objects that aren't Arrays, Dates, Strings, Document (XML) or primitive
 *   values will be written out as anonymous objects with dynamic data.
 * - If the object has a $flexType field, that field will be used in signifying
 *   the object-type as an attribute, instead of being passed as data.
 * - There's no JavaScript equivalent to the ByteArray type in ActionScript,
 *   hence data will never be searialized as ByteArrays by the writeObject
 *   function. A writeByteArray method is provided for writing out ByteArray objects.
 *
 * For more information on working with AMF data please refer to the
 * [AMF Guide](../guides/backend_connectors/amf.html).
 */

/**
 * @property {String} [body=""]
 * The output string
 */
