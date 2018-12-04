/**
 * @class Ext.data.amf.Packet
 * This class represents an Action Message Format (AMF) Packet.  It contains all
 * the logic required to decode an AMF Packet from a byte array.
 * To decode a Packet, first construct a Packet:
 *
 *     let packet = Ext.create('Ext.data.amf.Packet');
 *
 * Then use the decode method to decode an AMF byte array:
 *
 *     packet.decode(bytes);
 *
 * where "bytes" is a Uint8Array or an array of numbers representing the binary
 * AMF data.
 *
 * To access the decoded data use the #version, #headers, and #messages properties:
 *
 *     console.log(packet.version, packet.headers, packet.messages);
 *
 * For more information on working with AMF data please refer to the
 * [AMF Guide](../guides/backend_connectors/amf.html).
 */

