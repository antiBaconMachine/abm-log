describe("log", function() {
    beforeEach(function() {
    
    });
    
    it("should supress calls to console methods lower then that specified", function() {
        abm.log.init("info");
        expect(console.debug).not.toEqual(abm.log.getOriginalFunctions()[0]);
        expect(console.debug()).toEqual("debug suppressed");
    });
    
    it("should restore original logging functions when reinitalised", function() {
        abm.log.init("warn");
        expect(console.info).not.toEqual(abm.log.getOriginalFunctions()[1]);
        abm.log.init("info");
        expect(console.info).toEqual(abm.log.getOriginalFunctions()[1]);
    });
    
    it("should return the console object to it's original state when reset is called", function() {
        abm.log.init("error");
        expect(console.warn()).toEqual("warn suppressed");
        abm.log.reset();
        expect(console.warn()).not.toEqual("warn suppressed");
        abm.log.init("error");
        expect(console.warn()).toEqual("warn suppressed");

    });
    
    it("should disable all levels when a falsy value is set as the lvel", function() {
        abm.log.init(0);
        expect(console.error()).toEqual("error suppressed");
    });
    
    it("should prefer the url debug param to the function param", function(){});
})

