describe('Template', () => {
    describe("Column.tpl", () => {
        it('should render React elements returned by cell tpl', () => {
            ST.navigate('#/TemplateGrid')
            ST.element('>> .item')
                .visible()
                .text('Mark Brocato');
        })
    });

    describe("List.itemTpl", () => {
        it('should render React elements returned by itemTpl', () => {
            ST.navigate('#/TemplateList')
            ST.element('>> .text')
                .visible()
                .text('Mark Brocato');

            ST.component('#button').visible();
        })
    });

    describe("unmount", () => {
        it('should unmount components when the parent ExtReact component is destroyed', () => {
            ST.navigate('#/TemplateUnmount')
            ST.button('#button').click();
            ST.element('>> #message').text('unmounted');
        });
    });
})

