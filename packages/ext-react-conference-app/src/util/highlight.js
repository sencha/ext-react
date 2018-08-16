/**
 * Highlights occurrences of the query in the text
 * @param {String} query 
 * @param {String} text 
 * @return {Object} escaped html for dangerouslySetInnerHTML prop
 */
export default function highlight(query='', text='') {
    text = Ext.htmlEncode(text);

    if (query.length) query.toLowerCase().split(/\s+/).forEach(token => {
        const regex = new RegExp(`(${Ext.String.escapeRegex(token)})`, 'gi');
        text = text.replace(regex, '<span class="highlight">$1</span>')
    })

    return { __html: text };
}