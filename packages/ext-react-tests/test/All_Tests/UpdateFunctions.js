describe("when function props are updated", function() {
    it("update configs and event handlers", function() {
        ST.navigate('#/UpdateFunctions')
        
        ST.button('[text=handler]').click();
        ST.element('>> #value').text('1');
        ST.button('[text=handler]').click();
        ST.element('>> #value').text('2');

        ST.button('[text=tap]').click();
        ST.element('>> #value').text('3');
        ST.button('[text=tap]').click();
        ST.element('>> #value').text('4');
    });
});