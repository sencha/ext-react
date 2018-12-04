/**
 * @class Ext.layout.Card
 * @extend Ext.layout.Auto
 * @alias layout.card
 *
 * Sometimes you want to show several screens worth of information but you've only got a small screen to work with.
 * TabPanels and Carousels both enable you to see one screen of many at a time, and underneath they both use a Card
 * Layout.
 *
 * Card Layout takes the size of the Container it is applied to and sizes the currently active item to fill the
 * Container completely. It then hides the rest of the items, allowing you to change which one is currently visible but
 * only showing one at once.
 *
 * Here the gray box is our Container, and the blue box inside it is the currently active card. The three other cards
 * are hidden from view, but can be swapped in later. While it's not too common to create Card layouts directly, you
 * can do so like this:
 *
 *     <Container>
 *         <Panel html="Card One" />
 *         <Panel html="Card Two" />
 *         <Panel html="Card Three" />
 *         <Panel html="Card Four" />
 *     </Container>
 *
 * Here we create a Container with a Card Layout. Normally you're better off using a {@link Ext.tab.Panel tab panel} or a
 * {@link Ext.carousel.Carousel carousel}.
 */

/**
 * @event activeitemchange
 * @preventable
 * Fires when an card is made active
 * @param {Ext.layout.Card} this The layout instance
 * @param {Mixed} newActiveItem The new active item
 * @param {Mixed} oldActiveItem The old active item
 */
