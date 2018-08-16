describe("Lifecycle", () => {
    describe('componentWillUnmount', () => {
        it('should be called when a parent ExtReact component is removed', () => {
            ST.navigate('#/LifecycleUnmount');
            ST.button('#button').click();
            ST.element('>> #message').text('unmounted');
        })
    })
});