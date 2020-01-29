/**
 * @class Ext.data.amf.Encoder
 * @alias data.amf.Encoder
 * This class serializes data in the Action Message Format (AMF) format.
 * It can write simple and complex objects, to be used in conjunction with an
 * AMF-compliant server.
 * To encode a byte array, first construct an Encoder, optionally setting the format:
 *
 *     let encoder = Ext.create('Ext.data.amf.Encoder', {
 *       format: 3
 *     });
 *
 * Then use the writer methods to out data to the :
 *
 *     encoder.writeObject(1);
 *
 * And access the data through the #bytes property:
 *     encoder.bytes;
 *
 * You can also reset the class to start a new byte array:
 *
 *     encoder.clear();
 *
 * Current limitations:
 * AMF3 format (format:3)
 * - writeObject will write out XML object, not legacy XMLDocument objects. A
 *   writeXmlDocument method is provided for explicitly writing XMLDocument
 *   objects.
 * - Each object is written out explicitly, not using the reference tables
 *   supported by the AMF format. This means the function does NOT support
 *   circular reference objects.
 * - Array objects: only the numbered indices and data will be written out.
 *   Associative values will be ignored.
 * - Objects that aren't Arrays, Dates, Strings, Document (XML) or primitive
 *   values will be written out as anonymous objects with dynamic data.
 * - There's no JavaScript equivalent to the ByteArray type in ActionScript,
 *   hence data will never be searialized as ByteArrays by the writeObject
 *   function. A writeByteArray method is provided for writing out ByteArray objects.
 *
 * AMF0 format (format:0)
 * - Each object is written out explicitly, not using the reference tables
 *   supported by the AMF format. This means the function does NOT support
 *   circular reference objects.
 * - Array objects: the function always writes an associative array (following
 *   the behavior of flex).
 * - Objects that aren't Arrays, Dates, Strings, Document (XML) or primitive
 *   values will be written out as anonymous objects.
 *
 * For more information on working with AMF data please refer to the
 * [AMF Guide](../guides/backend_connectors/amf.html).
 */

