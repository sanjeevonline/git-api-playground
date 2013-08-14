//
// Stolen, with pride, from misc sources. John Resig's Ninja book for instance.
//

(function(){

	//--------- Unit test functions ---------

	var results;
	
	this.assert = function assert( value, desc ) {
		var li = document.createElement("li");
		li.className = value ? "pass" : "fail";
		li.appendChild( document.createTextNode( desc ) );
		results.appendChild( li );
		if ( !value ) {
			li.parentNode.parentNode.className = "fail";
		}
		return li;
	};
	
	this.test = function test(name, fn) {
		results = document.getElementById("results");
		results = assert( true, name ).appendChild(
			document.createElement("ul") );
		fn();
	};
	

	//--------- Logging ---------
	
	this.logging = {
		emerg:   0,
		alert:   1,
		crit:    2,
		err:     3,
		warning: 4,
		notice:  5,
		info:    6,
		debug:   7,
	};

	this.logging.threshold = this.logging.warning;


	// A simple logging statement that works in all browsers.
	this.logEmerg = function(){
	    if(this.logging.emerg <= this.logging.threshold ) {
	    	log(arguments);
	    }
	}

	this.logAlert = function(){
	    if(this.logging.alert <= this.logging.threshold ) {
	    	log(arguments);
	    }
	}

	this.logCrit = function(){
	    if(this.logging.crit <= this.logging.threshold ) {
	    	log(arguments);
	    }
	}

	this.logErr = function(){
	    if(this.logging.err <= this.logging.threshold ) {
	    	log(arguments);
	    }
	}

	this.logWarning = function(){
	    if(this.logging.warning <= this.logging.threshold ) {
	    	log(arguments);
	    }
	}

	this.logNotice = function(){
	    if(this.logging.notice <= this.logging.threshold ) {
	    	log(arguments);
	    }
	}

	this.logInfo = function(){
	    if(this.logging.info <= this.logging.threshold ) {
	    	log(arguments);
	    }
	}

	this.logDebug = function(){
	    if(this.logging.debug <= this.logging.threshold ) {
	    	log(arguments);
	    }
	}

	this.log = function log() {
	    try {
	        console.log.apply( console, arguments );
	    } catch(e) {
	        try {
	    		opera.postError.apply( opera, arguments );
	    	} catch(e){
	    		alert( Array.prototype.join.call( arguments, " " ) );
	    	}
	  	}
	}


	//--------- Templating ---------

	// Simple JavaScript Templating
	// John Resig - http://ejohn.org/ - MIT Licensed 
	var cache = {};
	this.tmpl = function tmpl(str, data){
	
		// Figure out if we're getting a template, or if we need to 
		// load the template - and be sure to cache the result. 
		var fn = !/\W/.test(str) ?
			cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) :
		
		// Generate a reusable function that will serve as a template 
		// generator (and which will be cached).
		new Function(
			"obj","var p=[],print=function(){p.push.apply(p,arguments);};" + 
			
			// Introduce the data as local variables using with(){}
			"with(obj){p.push('" +
			
			// Convert the template into pure JavaScript
			str
				.replace(/[\r\t\n]/g, " ")
				.split("<%").join("\t")
				.replace(/((^|%>)[^\t]*)'/g, "$1\r")
				.replace(/\t=(.*?)%>/g, "',$1,'")
				.split("\t").join("');")
				.split("%>").join("p.push('")
				.split("\r").join("\\'")
				+ "');}"
				+ "return p.join('');"
			);
		
		// Provide some basic currying to the user
		return data ? fn( data ) : fn; 
	}

})();
