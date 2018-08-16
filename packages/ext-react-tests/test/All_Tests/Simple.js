describe("Simple", () => {
    it('should render the button', () => {
        ST.navigate('#/Simple')
        ST.component('#button')
            .visible()
            .text('Click Me')
    })
});