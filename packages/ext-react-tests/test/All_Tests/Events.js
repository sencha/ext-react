describe("Events", () => {
    it("should convert on* props to listeners", () => {
        ST.navigate('#/BasicEvent');
        ST.button('#button').click();
        ST.element('>> #message').text("tapped");
    });
    
    it("should support single events", () => {
        ST.navigate('#/SingleEvent');
        const message = ST.element('>> #message');
        ST.button('#button').click().and(() => message.text("1"));
        ST.button('#button').click().and(() => message.text("1"));
    });
});