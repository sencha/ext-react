/**
 * @private
 */
Ext.define('Ext.exporter.file.ooxml.Relationship', {
    extend: 'Ext.exporter.file.Base',

    isRelationship: true,

    config: {
        idPrefix: 'rId',

        schema: '',

        target: '',

        /**
         * @private
         * All relationships targets should be relative paths to this parent folder.
         */
        parentFolder: null,

        /**
         * @private
         * Calculated as the `target` path relative to the parent folder
         */
        path: null
    },

    tpl: [
        '<Relationship Id="{id}" Type="{schema}" Target="{path}"/>'
    ],

    updateTarget: function(target) {
        this.calculatePath();
    },

    applyParentFolder: function(folder) {
        folder = folder || '';
        if(folder[folder.length - 1] == '/') {
            folder = folder.slice(0, folder.length - 1);
        }
        return folder;
    },

    updateParentFolder: function(folder) {
        this.calculatePath();
    },

    calculatePath: function() {
        var from = String(this.getParentFolder() || ''),
            to = String(this.getTarget() || ''),
            fromParts = from.split('/'),
            toParts = to.split('/'),
            length = Math.min(fromParts.length, toParts.length),
            samePartsLength = length,
            path = '',
            outputParts = [],
            i;

        for(i = 0; i < length; i++) {
            if (fromParts[i] !== toParts[i]) {
                samePartsLength = i;
                break;
            }
        }

        if (samePartsLength == 0) {
            path = to;
        } else {
            for (i = samePartsLength; i < fromParts.length; i++) {
                outputParts.push('..');
            }

            outputParts = outputParts.concat(toParts.slice(samePartsLength));
            path = outputParts.join('/');
        }

        this.setPath(path);
    }
});