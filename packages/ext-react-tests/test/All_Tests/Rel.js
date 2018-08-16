describe('rel', () => {
    it('should assign an element to a config when a rel prop is present', () => {
        ST.navigate('#/Rel')
        ST.component('#button').click()
        const menu = ST.component('#menu')
        menu.visible();
        ST.component('MenuItem[text="Option 1"]').visible();
        ST.component('MenuItem[text="Option 2"]').visible();
        ST.component('MenuItem[text="Option 3"]').visible();
    });

    it("should update configs when child a child with rel is added or removed", () => {
        ST.navigate('#/RelUpdate');
        ST.button('Button[text="Toggle Menu"]').click();
        ST.button('Button[text="Menu"]').click();
        const menu = ST.component('#menu');
        menu.visible();
        ST.component('MenuItem[text="Option 1"]').visible();
        ST.component('MenuItem[text="Option 2"]').visible();
        ST.component('MenuItem[text="Option 3"]').visible();
        ST.button('Button[text="Toggle Menu"]').click();
        menu.destroyed();
    });

    describe("Dialog.buttons", () => {
        it('should assign child Buttons as the buttons config', () => {
            ST.navigate('#/RelDialog');

            ST.component('#dialog').and(dialog => {
                expect(dialog.getButtons().items.length).toBe(1);
                ST.button('#button').click();
            });
        });
    });

    describe("Cell.editor", () => {
        it('should assign child fields as the editor config in columns', () => {
            ST.navigate('#/RelEditor');
            
            ST.play([
                { type: "tap", target: "#ext-gridcell-1"},
                { type: "tap", target: -1, delay:0 }
            ]);
            
            ST.element('>> .editor').visible();
        });
    });

    describe("Grid.columns", () => {
        it("should auto-assign column, nested column, cell, and widget from children", () => {
            ST.navigate('#/RelGridColumn')

            ST.component('#grid').and(grid => {
                const columns = grid.getColumns();
                expect(columns.length).toBe(3);
            });

            ST.component('#grid gridrow #sparkLine').visible();
        });
    });

    describe("Button.menu", () => {
        it("should auto-assign Menu to the parent button's menu config", () => {
            ST.navigate('#/RelMenu')
            ST.component('#button').click()
            const menu = ST.component('#menu')
            menu.visible();
            ST.component('MenuItem[text="Option 1"]').visible();
            ST.component('MenuItem[text="Option 2"]').visible();
            ST.component('MenuItem[text="Option 3"]').visible();
        });
    });

    describe("Component.tooltip", () => {
        it("should auto-assign tooltip from children", () => {
            ST.navigate('#/RelTooltip')
            
            ST.play([
                {target: '#button', type: 'pointermove', x: 46, y: 100 },
                {target: '#button', type: 'mouseenter'},
                {target: '#button', type: 'mouseover'},
            ]);

            ST.component('#tooltip')
                .visible()
                .text('I am a tooltip');
        });
    });
    
    describe("children mapped to array configs", () => {
        it("should be removed from the array when unrendered", () => {
            ST.navigate('#/RelArrayDelete');
            ST.button('Button').click();
            ST.component('grid').and(grid => {
                expect(grid.getColumns().length).toBe(1);
            })
        });
    });
});
    