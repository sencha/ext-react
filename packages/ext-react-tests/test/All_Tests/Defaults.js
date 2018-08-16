describe("Components with a defaults prop", () => {
    it("should set props in children", () => {
        ST.navigate('#/Defaults')
        ST.button('#button').text('Button');
    });
});