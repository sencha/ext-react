/**
 * @class Ext.Glyph
 * @private
 * A class which parses a `glyph` config and provides ways of creating the relevant DOM or yielding
 * information about the selected codepoint and font.
 */

/**
 * @method fly
 * @static
 * Returns a static, *singleton* `Glyph` instance encapsulating the passed configuration.
 * See {@link #method-setGlyph}
 *
 * Note that the returned `Glyph` is reused upon each call, so only use this whwn the encapsulated
 * information is consumed immediately. For a persistent `Glyph` instance, instantiate a new one.
 *
 * @param {String/Number} glyph
 * If a `string` is passed, it may be the character itself, or the unicode codepoint.
 * for example:
 *
 *     Ext.Glyph.fly('H');      // the "home" icon in the default (Pictos) font.
 *     Ext.Glyph.fly('x48');    // the "home" icon in the default (Pictos) font.
 *     Ext.Glyph.fly(72);       // the "home" icon in the default (Pictos) font.
 *
 * An `@` separator may be used to denote the font:
 *
 *     Ext.Glyph.fly('xf015@FontAwesome');  // The "home" icon in the FontAwesome font.
 *
 * @returns {Ext.Glyph} A static `Glyph` instance encapsulating the passed configuration.
 */

/**
 * @property {Boolean} [isGlyph=true]
 * `true` in this class to identify an object as an instantiated Glyph, or subclass thereof.
 */

/**
 * @property {Number} codepoint
 * The unicode codepoint of the configured glyph.
 */

/**
 * @property {String} character
 * A single character string representing the selected glyph. This may safely
 * be injected directly into HTML.
 */

/**
 * @property {String} fontFamily
 * The name of the font family configured. If none was configured, it uses the library default.
 * The default font-family  for glyphs can be set globally using
 * {@link Ext.app.Application#glyphFontFamily glyphFontFamily} application
 * config or the {@link Ext#setGlyphFontFamily Ext.setGlyphFontFamily()} method.
 * It is initially set to `'Pictos'`.
 */

