var abm = abm || {};

/**
 *Logging utility allows granular control of js logging.
 *
 *wraps standard console with guard to filter out unwanted levels.
 *reads url param or can be called programatically
 *
 *usage 
 *
 *abm.log.init([minlevel])
 *
 *if the url param debug=minlevel exists then this will be used, otherwise the argument minlevel will be used
 *finally if neither of these are present the fallback is "info".
 *
 *minlevel can be one of ["debug","info","warn","error"]
 */
abm.log = (function(){
    
    /**
     *Fallback function used when no console is present
     */ 	
    var fallback = function(msg){
        //alert(msg);
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
            var params = abm.getUrlParams();
            minLevel = params["debug"] || minLevel || "info";
       	    
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
}());

abm.getUrlParams = abm.getUrlParams || 
    function() {
        var vars = {}, hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = hashes.length-1; i >= 0; i--)
        {
            hash = hashes[i].split('=');

            var val = hash[1];
            var intVal = parseInt(val);
            if (!isNaN(intVal)) {
                val = intVal;
            }else if (val==="true" || val==="false") {
                val = Boolean(val);
            }
            vars[hash[0]] = val;
        }
        return vars;
    };
