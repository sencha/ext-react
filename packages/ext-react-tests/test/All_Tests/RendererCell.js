describe("RendererCell", () => {
    it('should render a React element in a grid cell', () => {
        ST.navigate('#/RendererCell')
        
        ST.button('#rendererCellButton')
            .visible()
            .text('Mark Brocato')
            .click();
            
        ST.button('#rendererCellSummaryButton')
            .visible()
            .text('Summary')
            .click();

        ST.button('#rendererButton')
            .visible()
            .text('Mark Brocato')
            .click();
            
        ST.button('#rendererSummaryButton')
            .visible()
            .text('Summary')
            .click();

        ST.element('>> [data-recordid] .string-cell')
            .text('Mark Brocato')

        ST.element('>> .x-summaryrow .string-cell')
            .text('summary')
    })
    
    it('should unmount components in cells when the grid is destroyed', () => {
        ST.navigate('#/RendererCell')
        ST.button('#button').click();
        ST.element('>> #message').text('unmounted');
    })
});