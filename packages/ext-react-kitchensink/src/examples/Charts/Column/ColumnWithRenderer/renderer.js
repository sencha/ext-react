export function seriesG1Renderer(sprite, config, rendererData, index) {
    const store = rendererData.store,
        storeItems = store.getData().items,
        record = storeItems[index],
        diff = record && (record.data['g2'] - record.data['g1']),
        last = storeItems.length - 1,
        surface = sprite.getParent(),
        changes = {};

    if (!record) {
        return;
    }

    // This renderer function paints the back column red instead
    // of palegreen if series #2 is greater than series #1.
    changes.fillStyle = (diff > 0 ? 'tomato' : 'palegreen');

    // Make the first and last columns larger.
    if (index == 0 || index == last) {
        changes.x = config.x - config.width * 0.2;
        changes.y = config.y;
        changes.width = config.width * 1.4;
        changes.lineWidth = 4;
        // Draw a line between the first and last columns
        let lineSprites = surface.myLineSprites;

        if (!lineSprites) {
            lineSprites = surface.myLineSprites = [];
            lineSprites[0] = surface.add({
                type: 'path'
            });
            lineSprites[1] = surface.add({
                type: 'text'
            });
        }

        if (index == 0) {
            surface.myFirstColumnConfig = Ext.clone(changes);
        } else if (index == last) {
            const firstData = storeItems[0].data['g1'],
                lastData = storeItems[last].data['g1'],
                firstColumnConfig = surface.myFirstColumnConfig,
                x1 = firstColumnConfig.x + firstColumnConfig.width,
                y1 = firstColumnConfig.y,
                x2 = changes.x,
                y2 = changes.y;

            lineSprites[0].setAttributes({
                lineWidth: 1,
                stroke: 'blue',
                zIndex: 10000,
                opacity: 0.4,
                path: "M" + x2 + " " + y2 + " L" + x1 + " " + y1 + " L" + x2 + " " + y1 + (lastData < firstData ? " L" : " M") + x2 + " " + y2 + " Z"
            });

            const growth = Math.round(100 * (lastData - firstData) / (firstData || 1)),
                string = (growth > 0 ? "+ " : "- ") + Math.abs(growth) + " %";

            lineSprites[1].setAttributes({
                text: string,
                x: changes.x - 12,
                y: firstColumnConfig.y + (changes.y - firstColumnConfig.y) / 2 + 10,
                fill: '#00c',
                fontSize: 20,
                zIndex: 10000,
                opacity: 0.6,
                scalingY: -1,
                textAlign: "center",
                rotate: -90
            });
        }
    } else {
        changes.lineWidth = 2;
    }

    return changes;
}

export function seriesG2Renderer(sprite, config, rendererData, index) {
    const store = rendererData.store,
        storeItems = store.getData().items,
        last = storeItems.length - 1,
        record = storeItems[index],
        diff = record && Math.round(record.data['g2'] - record.data['g1']),
        surface = sprite.getParent();

    if (!record) {
        return;
    }

    // This renderer function draws a red label if series #2 is greater than series #1.
    // The label displays the difference between the values of series #1 and series #2.
    //
    // Note: The two renderer functions in this test case cannot be consolidated. The red labels
    // are rendered here because they are positioned relatively to the series #2 columns.
    if (diff > 0) {
        let textSprites = surface.myTextSprites;

        if (!textSprites) {
            textSprites = surface.myTextSprites = [];
        }

        let textSprite = textSprites[index],
            rectSprite;

        if (!textSprite) {
            textSprite = textSprites[index] = surface.add({
                type: 'text'
            });
            rectSprite = textSprite.rectSprite = surface.add({
                type: 'rect'
            });
        } else {
            rectSprite = textSprite.rectSprite;
            textSprite.show();
            rectSprite.show();
        }

        rectSprite.setAttributes({
            x: config.x + (index == last ? -18 : 20),
            y: config.y - 36,
            width: 36 + (diff >= 10 ? (diff >= 100 ? (diff >= 1000 ? 30 : 20) : 10) : 0),
            height: 22,
            fill: 'tomato',
            stroke: 'black',
            radius: 4,
            opacity: 1,
            zIndex: 10000
        });

        textSprite.setAttributes({
            text: "+ " + diff,
            x: config.x + (index == last ? -12 : 28),
            y: config.y - 20,
            fill: 'black',
            fontSize: 16,
            zIndex: 10001,
            scalingY: -1
        });
    } else {
        let textSprites = surface.myTextSprites;

        if (textSprites) {
            let textSprite = textSprites[index];

            if (textSprite) {
                textSprite.rectSprite.hide();
                textSprite.hide();
            }
        }
    }

    return null;
}