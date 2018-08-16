describe("CreateChild", function() {
    it("should insert an ExtReact component at the start", function() {
        ST.navigate('#/InsertStart');
        ST.button('#insert').click();
        ST.component('#inserted').and(function(inserted) {
            expect(inserted.getParent().indexOf(inserted)).toBe(0);
        })
    });
    
    it("should insert an ExtReact component in the middle", function() {
        ST.navigate('#/InsertBetween');
        ST.button('#insert').click();
        ST.component('#inserted').and(function(inserted) {
            expect(inserted.getParent().indexOf(inserted)).toBe(1);
        })
    });
    
    it("should insert an ExtReact component at the end", function() {
        ST.navigate('#/InsertEnd');
        ST.button('#insert').click();
        ST.component('#inserted').and(function(inserted) {
            expect(inserted.getParent().indexOf(inserted)).toBe(2);
        })
    });
    
    it("should insert an html element at the start", function() {
        ST.navigate('#/ElementInsertStart');
        ST.button('#insert').click();
        ST.element('>> #inserted').and(function(inserted) {
            inserted = Ext.Component.from(inserted)
            expect(inserted.getParent().indexOf(inserted)).toBe(0);
        })
    });
    
    it("should insert an html element in the middle", function() {
        ST.navigate('#/ElementInsertBetween');
        ST.button('#insert').click();
        ST.element('>> #inserted').and(function(inserted) {
            inserted = Ext.Component.from(inserted)
            expect(inserted.getParent().indexOf(inserted)).toBe(1);
        })
    });
    
    it("should insert an html element at the end", function() {
        ST.navigate('#/ElementInsertEnd');
        ST.button('#insert').click();
        ST.element('>> #inserted').and(function(inserted) {
            inserted = Ext.Component.from(inserted)
            expect(inserted.getParent().indexOf(inserted)).toBe(2);
        })
    });
});