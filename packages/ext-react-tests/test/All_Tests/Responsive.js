describe("Responsive", function() {
    it("automatically apply plugins='responsive' when responsiveConfig is present", function() {
        ST.navigate('#/Responsive');
        ST.component('#noPlugin').expect('title').toBe('Title');
        ST.component('#responsiveString').expect('title').toBe('Title');
        ST.component('#responsiveObject').expect('title').toBe('Title');
        ST.component('#responsiveArray').expect('title').toBe('Title');
        ST.component('#otherString').expect('title').toBe('Title');
        ST.component('#otherObject').expect('title').toBe('Title');
        ST.component('#otherArray').expect('title').toBe('Title');
    });
});