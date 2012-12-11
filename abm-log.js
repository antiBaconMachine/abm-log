define(["abm-util"], function(util){
    
    var fallback = function(msg){
        alert(msg);
    };
    var suppressed = function(level) {
        return function() {
            return level +" suppressed";
        }
    }
    var originalFunctions = [];
    
    var self = {
        
        levels : ["debug","info","warn","error"],
    
        init : function(minLevel) {
            var params = util.getUrlParams();
            minLevel = params["debug"] || minLevel;
        
            //TODO: firebug lite
            window.console = window.console || {};
        
            var clear = false;
            for (var i=0; i<self.levels.length; i++) {
                var level = self.levels[i];
                originalFunctions[i] = originalFunctions[i] 
                || console[level] || fallback;
            
                if (level && (clear || level===minLevel)) {
                    console[level] = originalFunctions[i];
                    clear=true;
                } else {
                    console[level] = suppressed(level);
                }
            }
        
        },
        
        reset : function() {
            for (var i=originalFunctions.length; i>=0; i--) {
                console[self.levels[i]] = originalFunctions[i];
            }
            originalFunctions = [];
        },
        
        getOriginalFunctions : function() {
            return originalFunctions;
        }
    };
    return self;
});
