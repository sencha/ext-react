describe('Sencha Test Hooks', () => {
    beforeEach(() => ST.navigate('#/'))
    
    it('should include $reactorComponentName on each rendered component', () => {
        ST.navigate('#/SenchaTestHooks');
        ST.component('#target').and(component => {
            expect(component.$reactorComponentName).toBe('Button')
        })
    });

    it('should support selector by component name', () => {
        ST.navigate('#/SenchaTestHooks');
        ST.component('Button').visible();
    });
});