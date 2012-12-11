define({
    getUrlParams : function() {
        var vars = {}, hash;
        var hashes = window.location.href.slice(window.location.search.indexOf('?') + 1).split('&');
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
    }
});