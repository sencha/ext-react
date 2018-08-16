describe("HTML", () => {
    it("should be rendered inside ExtReact components", () => {
        ST.navigate('#/HTMLInExtReactComponent')
        ST.component('#container').visible();
        
        // verify that .x-react-element class is assigned to wrapper component
        ST.element('>> #container .x-react-element').visible();
        
        ST.element('>> #html').text('test');
    });
});