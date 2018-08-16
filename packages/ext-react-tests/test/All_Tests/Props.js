describe("Props", () => {
    it("changing a prop should update the corresponding config", () => {
        ST.navigate('#/SimplePropUpdate')
        
        ST.component('#button')
            .text('Count: 0')
            .click()
            .text('Count: 1');
    });
    
    it('should update the className prop when changed', () => {
        ST.navigate('#/UpdateClassName')
        ST.element('>> .red');
        
        var button = ST.component('#button')

        button.click();
        ST.element('>> .blue');
        
        button.click();
        ST.element('>> .red');
    })
});