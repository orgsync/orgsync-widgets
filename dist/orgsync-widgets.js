// setup.js
// This IIFE is closed and executed in teardown.js. This file must be included
// first and teardown.js last. Here we create a map of every polutant to remove
// and restore after the script has executed.
(function () {
  var polutants = {
    $: null,
    _: null,
    async: null,
    Backbone: null,
    dpr: null,
    elementQuery: null,
    herit: null,
    moment: null,
    Mustache: null,
    Olay: null,
    OrgSyncApi: null,
    Select2: null,
    jQuery: null,
    JST: null,
    jstz: null
  };

  for (var key in polutants) {
    polutants[key] = window[key];

    // `delete window[anything]` throws in IE8, so hack it.
    try { delete window[key]; } catch (er) { window[key] = undefined; }
  }

// bower_components/jquery/jquery.js
/*!
 * jQuery JavaScript Library v1.10.2
 * http://jquery.com/
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 *
 * Copyright 2005, 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03T13:48Z
 */
(function( window, undefined ) {

// Can't do this because several apps including ASP.NET trace
// the stack via arguments.caller.callee and Firefox dies if
// you try to trace through "use strict" call chains. (#13335)
// Support: Firefox 18+
//"use strict";
var
	// The deferred used on DOM ready
	readyList,

	// A central reference to the root jQuery(document)
	rootjQuery,

	// Support: IE<10
	// For `typeof xmlNode.method` instead of `xmlNode.method !== undefined`
	core_strundefined = typeof undefined,

	// Use the correct document accordingly with window argument (sandbox)
	location = window.location,
	document = window.document,
	docElem = document.documentElement,

	// Map over jQuery in case of overwrite
	_jQuery = window.jQuery,

	// Map over the $ in case of overwrite
	_$ = window.$,

	// [[Class]] -> type pairs
	class2type = {},

	// List of deleted data cache ids, so we can reuse them
	core_deletedIds = [],

	core_version = "1.10.2",

	// Save a reference to some core methods
	core_concat = core_deletedIds.concat,
	core_push = core_deletedIds.push,
	core_slice = core_deletedIds.slice,
	core_indexOf = core_deletedIds.indexOf,
	core_toString = class2type.toString,
	core_hasOwn = class2type.hasOwnProperty,
	core_trim = core_version.trim,

	// Define a local copy of jQuery
	jQuery = function( selector, context ) {
		// The jQuery object is actually just the init constructor 'enhanced'
		return new jQuery.fn.init( selector, context, rootjQuery );
	},

	// Used for matching numbers
	core_pnum = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,

	// Used for splitting on whitespace
	core_rnotwhite = /\S+/g,

	// Make sure we trim BOM and NBSP (here's looking at you, Safari 5.0 and IE)
	rtrim = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,

	// A simple way to check for HTML strings
	// Prioritize #id over <tag> to avoid XSS via location.hash (#9521)
	// Strict HTML recognition (#11290: must start with <)
	rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,

	// Match a standalone tag
	rsingleTag = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,

	// JSON RegExp
	rvalidchars = /^[\],:{}\s]*$/,
	rvalidbraces = /(?:^|:|,)(?:\s*\[)+/g,
	rvalidescape = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	rvalidtokens = /"[^"\\\r\n]*"|true|false|null|-?(?:\d+\.|)\d+(?:[eE][+-]?\d+|)/g,

	// Matches dashed string for camelizing
	rmsPrefix = /^-ms-/,
	rdashAlpha = /-([\da-z])/gi,

	// Used by jQuery.camelCase as callback to replace()
	fcamelCase = function( all, letter ) {
		return letter.toUpperCase();
	},

	// The ready event handler
	completed = function( event ) {

		// readyState === "complete" is good enough for us to call the dom ready in oldIE
		if ( document.addEventListener || event.type === "load" || document.readyState === "complete" ) {
			detach();
			jQuery.ready();
		}
	},
	// Clean-up method for dom ready events
	detach = function() {
		if ( document.addEventListener ) {
			document.removeEventListener( "DOMContentLoaded", completed, false );
			window.removeEventListener( "load", completed, false );

		} else {
			document.detachEvent( "onreadystatechange", completed );
			window.detachEvent( "onload", completed );
		}
	};

jQuery.fn = jQuery.prototype = {
	// The current version of jQuery being used
	jquery: core_version,

	constructor: jQuery,
	init: function( selector, context, rootjQuery ) {
		var match, elem;

		// HANDLE: $(""), $(null), $(undefined), $(false)
		if ( !selector ) {
			return this;
		}

		// Handle HTML strings
		if ( typeof selector === "string" ) {
			if ( selector.charAt(0) === "<" && selector.charAt( selector.length - 1 ) === ">" && selector.length >= 3 ) {
				// Assume that strings that start and end with <> are HTML and skip the regex check
				match = [ null, selector, null ];

			} else {
				match = rquickExpr.exec( selector );
			}

			// Match html or make sure no context is specified for #id
			if ( match && (match[1] || !context) ) {

				// HANDLE: $(html) -> $(array)
				if ( match[1] ) {
					context = context instanceof jQuery ? context[0] : context;

					// scripts is true for back-compat
					jQuery.merge( this, jQuery.parseHTML(
						match[1],
						context && context.nodeType ? context.ownerDocument || context : document,
						true
					) );

					// HANDLE: $(html, props)
					if ( rsingleTag.test( match[1] ) && jQuery.isPlainObject( context ) ) {
						for ( match in context ) {
							// Properties of context are called as methods if possible
							if ( jQuery.isFunction( this[ match ] ) ) {
								this[ match ]( context[ match ] );

							// ...and otherwise set as attributes
							} else {
								this.attr( match, context[ match ] );
							}
						}
					}

					return this;

				// HANDLE: $(#id)
				} else {
					elem = document.getElementById( match[2] );

					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE and Opera return items
						// by name instead of ID
						if ( elem.id !== match[2] ) {
							return rootjQuery.find( selector );
						}

						// Otherwise, we inject the element directly into the jQuery object
						this.length = 1;
						this[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					return this;
				}

			// HANDLE: $(expr, $(...))
			} else if ( !context || context.jquery ) {
				return ( context || rootjQuery ).find( selector );

			// HANDLE: $(expr, context)
			// (which is just equivalent to: $(context).find(expr)
			} else {
				return this.constructor( context ).find( selector );
			}

		// HANDLE: $(DOMElement)
		} else if ( selector.nodeType ) {
			this.context = this[0] = selector;
			this.length = 1;
			return this;

		// HANDLE: $(function)
		// Shortcut for document ready
		} else if ( jQuery.isFunction( selector ) ) {
			return rootjQuery.ready( selector );
		}

		if ( selector.selector !== undefined ) {
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray( selector, this );
	},

	// Start with an empty selector
	selector: "",

	// The default length of a jQuery object is 0
	length: 0,

	toArray: function() {
		return core_slice.call( this );
	},

	// Get the Nth element in the matched element set OR
	// Get the whole matched element set as a clean array
	get: function( num ) {
		return num == null ?

			// Return a 'clean' array
			this.toArray() :

			// Return just the object
			( num < 0 ? this[ this.length + num ] : this[ num ] );
	},

	// Take an array of elements and push it onto the stack
	// (returning the new matched element set)
	pushStack: function( elems ) {

		// Build a new jQuery matched element set
		var ret = jQuery.merge( this.constructor(), elems );

		// Add the old object onto the stack (as a reference)
		ret.prevObject = this;
		ret.context = this.context;

		// Return the newly-formed element set
		return ret;
	},

	// Execute a callback for every element in the matched set.
	// (You can seed the arguments with an array of args, but this is
	// only used internally.)
	each: function( callback, args ) {
		return jQuery.each( this, callback, args );
	},

	ready: function( fn ) {
		// Add the callback
		jQuery.ready.promise().done( fn );

		return this;
	},

	slice: function() {
		return this.pushStack( core_slice.apply( this, arguments ) );
	},

	first: function() {
		return this.eq( 0 );
	},

	last: function() {
		return this.eq( -1 );
	},

	eq: function( i ) {
		var len = this.length,
			j = +i + ( i < 0 ? len : 0 );
		return this.pushStack( j >= 0 && j < len ? [ this[j] ] : [] );
	},

	map: function( callback ) {
		return this.pushStack( jQuery.map(this, function( elem, i ) {
			return callback.call( elem, i, elem );
		}));
	},

	end: function() {
		return this.prevObject || this.constructor(null);
	},

	// For internal use only.
	// Behaves like an Array's method, not like a jQuery method.
	push: core_push,
	sort: [].sort,
	splice: [].splice
};

// Give the init function the jQuery prototype for later instantiation
jQuery.fn.init.prototype = jQuery.fn;

jQuery.extend = jQuery.fn.extend = function() {
	var src, copyIsArray, copy, name, options, clone,
		target = arguments[0] || {},
		i = 1,
		length = arguments.length,
		deep = false;

	// Handle a deep copy situation
	if ( typeof target === "boolean" ) {
		deep = target;
		target = arguments[1] || {};
		// skip the boolean and the target
		i = 2;
	}

	// Handle case when target is a string or something (possible in deep copy)
	if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
		target = {};
	}

	// extend jQuery itself if only one argument is passed
	if ( length === i ) {
		target = this;
		--i;
	}

	for ( ; i < length; i++ ) {
		// Only deal with non-null/undefined values
		if ( (options = arguments[ i ]) != null ) {
			// Extend the base object
			for ( name in options ) {
				src = target[ name ];
				copy = options[ name ];

				// Prevent never-ending loop
				if ( target === copy ) {
					continue;
				}

				// Recurse if we're merging plain objects or arrays
				if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
					if ( copyIsArray ) {
						copyIsArray = false;
						clone = src && jQuery.isArray(src) ? src : [];

					} else {
						clone = src && jQuery.isPlainObject(src) ? src : {};
					}

					// Never move original objects, clone them
					target[ name ] = jQuery.extend( deep, clone, copy );

				// Don't bring in undefined values
				} else if ( copy !== undefined ) {
					target[ name ] = copy;
				}
			}
		}
	}

	// Return the modified object
	return target;
};

jQuery.extend({
	// Unique for each copy of jQuery on the page
	// Non-digits removed to match rinlinejQuery
	expando: "jQuery" + ( core_version + Math.random() ).replace( /\D/g, "" ),

	noConflict: function( deep ) {
		if ( window.$ === jQuery ) {
			window.$ = _$;
		}

		if ( deep && window.jQuery === jQuery ) {
			window.jQuery = _jQuery;
		}

		return jQuery;
	},

	// Is the DOM ready to be used? Set to true once it occurs.
	isReady: false,

	// A counter to track how many items to wait for before
	// the ready event fires. See #6781
	readyWait: 1,

	// Hold (or release) the ready event
	holdReady: function( hold ) {
		if ( hold ) {
			jQuery.readyWait++;
		} else {
			jQuery.ready( true );
		}
	},

	// Handle when the DOM is ready
	ready: function( wait ) {

		// Abort if there are pending holds or we're already ready
		if ( wait === true ? --jQuery.readyWait : jQuery.isReady ) {
			return;
		}

		// Make sure body exists, at least, in case IE gets a little overzealous (ticket #5443).
		if ( !document.body ) {
			return setTimeout( jQuery.ready );
		}

		// Remember that the DOM is ready
		jQuery.isReady = true;

		// If a normal DOM Ready event fired, decrement, and wait if need be
		if ( wait !== true && --jQuery.readyWait > 0 ) {
			return;
		}

		// If there are functions bound, to execute
		readyList.resolveWith( document, [ jQuery ] );

		// Trigger any bound ready events
		if ( jQuery.fn.trigger ) {
			jQuery( document ).trigger("ready").off("ready");
		}
	},

	// See test/unit/core.js for details concerning isFunction.
	// Since version 1.3, DOM methods and functions like alert
	// aren't supported. They return false on IE (#2968).
	isFunction: function( obj ) {
		return jQuery.type(obj) === "function";
	},

	isArray: Array.isArray || function( obj ) {
		return jQuery.type(obj) === "array";
	},

	isWindow: function( obj ) {
		/* jshint eqeqeq: false */
		return obj != null && obj == obj.window;
	},

	isNumeric: function( obj ) {
		return !isNaN( parseFloat(obj) ) && isFinite( obj );
	},

	type: function( obj ) {
		if ( obj == null ) {
			return String( obj );
		}
		return typeof obj === "object" || typeof obj === "function" ?
			class2type[ core_toString.call(obj) ] || "object" :
			typeof obj;
	},

	isPlainObject: function( obj ) {
		var key;

		// Must be an Object.
		// Because of IE, we also have to check the presence of the constructor property.
		// Make sure that DOM nodes and window objects don't pass through, as well
		if ( !obj || jQuery.type(obj) !== "object" || obj.nodeType || jQuery.isWindow( obj ) ) {
			return false;
		}

		try {
			// Not own constructor property must be Object
			if ( obj.constructor &&
				!core_hasOwn.call(obj, "constructor") &&
				!core_hasOwn.call(obj.constructor.prototype, "isPrototypeOf") ) {
				return false;
			}
		} catch ( e ) {
			// IE8,9 Will throw exceptions on certain host objects #9897
			return false;
		}

		// Support: IE<9
		// Handle iteration over inherited properties before own properties.
		if ( jQuery.support.ownLast ) {
			for ( key in obj ) {
				return core_hasOwn.call( obj, key );
			}
		}

		// Own properties are enumerated firstly, so to speed up,
		// if last one is own, then all properties are own.
		for ( key in obj ) {}

		return key === undefined || core_hasOwn.call( obj, key );
	},

	isEmptyObject: function( obj ) {
		var name;
		for ( name in obj ) {
			return false;
		}
		return true;
	},

	error: function( msg ) {
		throw new Error( msg );
	},

	// data: string of html
	// context (optional): If specified, the fragment will be created in this context, defaults to document
	// keepScripts (optional): If true, will include scripts passed in the html string
	parseHTML: function( data, context, keepScripts ) {
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		if ( typeof context === "boolean" ) {
			keepScripts = context;
			context = false;
		}
		context = context || document;

		var parsed = rsingleTag.exec( data ),
			scripts = !keepScripts && [];

		// Single tag
		if ( parsed ) {
			return [ context.createElement( parsed[1] ) ];
		}

		parsed = jQuery.buildFragment( [ data ], context, scripts );
		if ( scripts ) {
			jQuery( scripts ).remove();
		}
		return jQuery.merge( [], parsed.childNodes );
	},

	parseJSON: function( data ) {
		// Attempt to parse using the native JSON parser first
		if ( window.JSON && window.JSON.parse ) {
			return window.JSON.parse( data );
		}

		if ( data === null ) {
			return data;
		}

		if ( typeof data === "string" ) {

			// Make sure leading/trailing whitespace is removed (IE can't handle it)
			data = jQuery.trim( data );

			if ( data ) {
				// Make sure the incoming data is actual JSON
				// Logic borrowed from http://json.org/json2.js
				if ( rvalidchars.test( data.replace( rvalidescape, "@" )
					.replace( rvalidtokens, "]" )
					.replace( rvalidbraces, "")) ) {

					return ( new Function( "return " + data ) )();
				}
			}
		}

		jQuery.error( "Invalid JSON: " + data );
	},

	// Cross-browser xml parsing
	parseXML: function( data ) {
		var xml, tmp;
		if ( !data || typeof data !== "string" ) {
			return null;
		}
		try {
			if ( window.DOMParser ) { // Standard
				tmp = new DOMParser();
				xml = tmp.parseFromString( data , "text/xml" );
			} else { // IE
				xml = new ActiveXObject( "Microsoft.XMLDOM" );
				xml.async = "false";
				xml.loadXML( data );
			}
		} catch( e ) {
			xml = undefined;
		}
		if ( !xml || !xml.documentElement || xml.getElementsByTagName( "parsererror" ).length ) {
			jQuery.error( "Invalid XML: " + data );
		}
		return xml;
	},

	noop: function() {},

	// Evaluates a script in a global context
	// Workarounds based on findings by Jim Driscoll
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval: function( data ) {
		if ( data && jQuery.trim( data ) ) {
			// We use execScript on Internet Explorer
			// We use an anonymous function so that context is window
			// rather than jQuery in Firefox
			( window.execScript || function( data ) {
				window[ "eval" ].call( window, data );
			} )( data );
		}
	},

	// Convert dashed to camelCase; used by the css and data modules
	// Microsoft forgot to hump their vendor prefix (#9572)
	camelCase: function( string ) {
		return string.replace( rmsPrefix, "ms-" ).replace( rdashAlpha, fcamelCase );
	},

	nodeName: function( elem, name ) {
		return elem.nodeName && elem.nodeName.toLowerCase() === name.toLowerCase();
	},

	// args is for internal usage only
	each: function( obj, callback, args ) {
		var value,
			i = 0,
			length = obj.length,
			isArray = isArraylike( obj );

		if ( args ) {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.apply( obj[ i ], args );

					if ( value === false ) {
						break;
					}
				}
			}

		// A special, fast, case for the most common use of each
		} else {
			if ( isArray ) {
				for ( ; i < length; i++ ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			} else {
				for ( i in obj ) {
					value = callback.call( obj[ i ], i, obj[ i ] );

					if ( value === false ) {
						break;
					}
				}
			}
		}

		return obj;
	},

	// Use native String.trim function wherever possible
	trim: core_trim && !core_trim.call("\uFEFF\xA0") ?
		function( text ) {
			return text == null ?
				"" :
				core_trim.call( text );
		} :

		// Otherwise use our own trimming functionality
		function( text ) {
			return text == null ?
				"" :
				( text + "" ).replace( rtrim, "" );
		},

	// results is for internal usage only
	makeArray: function( arr, results ) {
		var ret = results || [];

		if ( arr != null ) {
			if ( isArraylike( Object(arr) ) ) {
				jQuery.merge( ret,
					typeof arr === "string" ?
					[ arr ] : arr
				);
			} else {
				core_push.call( ret, arr );
			}
		}

		return ret;
	},

	inArray: function( elem, arr, i ) {
		var len;

		if ( arr ) {
			if ( core_indexOf ) {
				return core_indexOf.call( arr, elem, i );
			}

			len = arr.length;
			i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;

			for ( ; i < len; i++ ) {
				// Skip accessing in sparse arrays
				if ( i in arr && arr[ i ] === elem ) {
					return i;
				}
			}
		}

		return -1;
	},

	merge: function( first, second ) {
		var l = second.length,
			i = first.length,
			j = 0;

		if ( typeof l === "number" ) {
			for ( ; j < l; j++ ) {
				first[ i++ ] = second[ j ];
			}
		} else {
			while ( second[j] !== undefined ) {
				first[ i++ ] = second[ j++ ];
			}
		}

		first.length = i;

		return first;
	},

	grep: function( elems, callback, inv ) {
		var retVal,
			ret = [],
			i = 0,
			length = elems.length;
		inv = !!inv;

		// Go through the array, only saving the items
		// that pass the validator function
		for ( ; i < length; i++ ) {
			retVal = !!callback( elems[ i ], i );
			if ( inv !== retVal ) {
				ret.push( elems[ i ] );
			}
		}

		return ret;
	},

	// arg is for internal usage only
	map: function( elems, callback, arg ) {
		var value,
			i = 0,
			length = elems.length,
			isArray = isArraylike( elems ),
			ret = [];

		// Go through the array, translating each of the items to their
		if ( isArray ) {
			for ( ; i < length; i++ ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}

		// Go through every key on the object,
		} else {
			for ( i in elems ) {
				value = callback( elems[ i ], i, arg );

				if ( value != null ) {
					ret[ ret.length ] = value;
				}
			}
		}

		// Flatten any nested arrays
		return core_concat.apply( [], ret );
	},

	// A global GUID counter for objects
	guid: 1,

	// Bind a function to a context, optionally partially applying any
	// arguments.
	proxy: function( fn, context ) {
		var args, proxy, tmp;

		if ( typeof context === "string" ) {
			tmp = fn[ context ];
			context = fn;
			fn = tmp;
		}

		// Quick check to determine if target is callable, in the spec
		// this throws a TypeError, but we will just return undefined.
		if ( !jQuery.isFunction( fn ) ) {
			return undefined;
		}

		// Simulated bind
		args = core_slice.call( arguments, 2 );
		proxy = function() {
			return fn.apply( context || this, args.concat( core_slice.call( arguments ) ) );
		};

		// Set the guid of unique handler to the same of original handler, so it can be removed
		proxy.guid = fn.guid = fn.guid || jQuery.guid++;

		return proxy;
	},

	// Multifunctional method to get and set values of a collection
	// The value/s can optionally be executed if it's a function
	access: function( elems, fn, key, value, chainable, emptyGet, raw ) {
		var i = 0,
			length = elems.length,
			bulk = key == null;

		// Sets many values
		if ( jQuery.type( key ) === "object" ) {
			chainable = true;
			for ( i in key ) {
				jQuery.access( elems, fn, i, key[i], true, emptyGet, raw );
			}

		// Sets one value
		} else if ( value !== undefined ) {
			chainable = true;

			if ( !jQuery.isFunction( value ) ) {
				raw = true;
			}

			if ( bulk ) {
				// Bulk operations run against the entire set
				if ( raw ) {
					fn.call( elems, value );
					fn = null;

				// ...except when executing function values
				} else {
					bulk = fn;
					fn = function( elem, key, value ) {
						return bulk.call( jQuery( elem ), value );
					};
				}
			}

			if ( fn ) {
				for ( ; i < length; i++ ) {
					fn( elems[i], key, raw ? value : value.call( elems[i], i, fn( elems[i], key ) ) );
				}
			}
		}

		return chainable ?
			elems :

			// Gets
			bulk ?
				fn.call( elems ) :
				length ? fn( elems[0], key ) : emptyGet;
	},

	now: function() {
		return ( new Date() ).getTime();
	},

	// A method for quickly swapping in/out CSS properties to get correct calculations.
	// Note: this method belongs to the css module but it's needed here for the support module.
	// If support gets modularized, this method should be moved back to the css module.
	swap: function( elem, options, callback, args ) {
		var ret, name,
			old = {};

		// Remember the old values, and insert the new ones
		for ( name in options ) {
			old[ name ] = elem.style[ name ];
			elem.style[ name ] = options[ name ];
		}

		ret = callback.apply( elem, args || [] );

		// Revert the old values
		for ( name in options ) {
			elem.style[ name ] = old[ name ];
		}

		return ret;
	}
});

jQuery.ready.promise = function( obj ) {
	if ( !readyList ) {

		readyList = jQuery.Deferred();

		// Catch cases where $(document).ready() is called after the browser event has already occurred.
		// we once tried to use readyState "interactive" here, but it caused issues like the one
		// discovered by ChrisS here: http://bugs.jquery.com/ticket/12282#comment:15
		if ( document.readyState === "complete" ) {
			// Handle it asynchronously to allow scripts the opportunity to delay ready
			setTimeout( jQuery.ready );

		// Standards-based browsers support DOMContentLoaded
		} else if ( document.addEventListener ) {
			// Use the handy event callback
			document.addEventListener( "DOMContentLoaded", completed, false );

			// A fallback to window.onload, that will always work
			window.addEventListener( "load", completed, false );

		// If IE event model is used
		} else {
			// Ensure firing before onload, maybe late but safe also for iframes
			document.attachEvent( "onreadystatechange", completed );

			// A fallback to window.onload, that will always work
			window.attachEvent( "onload", completed );

			// If IE and not a frame
			// continually check to see if the document is ready
			var top = false;

			try {
				top = window.frameElement == null && document.documentElement;
			} catch(e) {}

			if ( top && top.doScroll ) {
				(function doScrollCheck() {
					if ( !jQuery.isReady ) {

						try {
							// Use the trick by Diego Perini
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll("left");
						} catch(e) {
							return setTimeout( doScrollCheck, 50 );
						}

						// detach all dom ready events
						detach();

						// and execute any waiting functions
						jQuery.ready();
					}
				})();
			}
		}
	}
	return readyList.promise( obj );
};

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error".split(" "), function(i, name) {
	class2type[ "[object " + name + "]" ] = name.toLowerCase();
});

function isArraylike( obj ) {
	var length = obj.length,
		type = jQuery.type( obj );

	if ( jQuery.isWindow( obj ) ) {
		return false;
	}

	if ( obj.nodeType === 1 && length ) {
		return true;
	}

	return type === "array" || type !== "function" &&
		( length === 0 ||
		typeof length === "number" && length > 0 && ( length - 1 ) in obj );
}

// All jQuery objects should point back to these
rootjQuery = jQuery(document);
/*!
 * Sizzle CSS Selector Engine v1.10.2
 * http://sizzlejs.com/
 *
 * Copyright 2013 jQuery Foundation, Inc. and other contributors
 * Released under the MIT license
 * http://jquery.org/license
 *
 * Date: 2013-07-03
 */
(function( window, undefined ) {

var i,
	support,
	cachedruns,
	Expr,
	getText,
	isXML,
	compile,
	outermostContext,
	sortInput,

	// Local document vars
	setDocument,
	document,
	docElem,
	documentIsHTML,
	rbuggyQSA,
	rbuggyMatches,
	matches,
	contains,

	// Instance-specific data
	expando = "sizzle" + -(new Date()),
	preferredDoc = window.document,
	dirruns = 0,
	done = 0,
	classCache = createCache(),
	tokenCache = createCache(),
	compilerCache = createCache(),
	hasDuplicate = false,
	sortOrder = function( a, b ) {
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}
		return 0;
	},

	// General-purpose constants
	strundefined = typeof undefined,
	MAX_NEGATIVE = 1 << 31,

	// Instance methods
	hasOwn = ({}).hasOwnProperty,
	arr = [],
	pop = arr.pop,
	push_native = arr.push,
	push = arr.push,
	slice = arr.slice,
	// Use a stripped-down indexOf if we can't use a native one
	indexOf = arr.indexOf || function( elem ) {
		var i = 0,
			len = this.length;
		for ( ; i < len; i++ ) {
			if ( this[i] === elem ) {
				return i;
			}
		}
		return -1;
	},

	booleans = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",

	// Regular expressions

	// Whitespace characters http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace = "[\\x20\\t\\r\\n\\f]",
	// http://www.w3.org/TR/css3-syntax/#characters
	characterEncoding = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",

	// Loosely modeled on CSS identifier characters
	// An unquoted value should be a CSS identifier http://www.w3.org/TR/css3-selectors/#attribute-selectors
	// Proper syntax: http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier = characterEncoding.replace( "w", "w#" ),

	// Acceptable operators http://www.w3.org/TR/selectors/#attribute-selectors
	attributes = "\\[" + whitespace + "*(" + characterEncoding + ")" + whitespace +
		"*(?:([*^$|!~]?=)" + whitespace + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + identifier + ")|)|)" + whitespace + "*\\]",

	// Prefer arguments quoted,
	//   then not containing pseudos/brackets,
	//   then attribute selectors/non-parenthetical expressions,
	//   then anything else
	// These preferences are here to reduce the number of selectors
	//   needing tokenize in the PSEUDO preFilter
	pseudos = ":(" + characterEncoding + ")(?:\\(((['\"])((?:\\\\.|[^\\\\])*?)\\3|((?:\\\\.|[^\\\\()[\\]]|" + attributes.replace( 3, 8 ) + ")*)|.*)\\)|)",

	// Leading and non-escaped trailing whitespace, capturing some non-whitespace characters preceding the latter
	rtrim = new RegExp( "^" + whitespace + "+|((?:^|[^\\\\])(?:\\\\.)*)" + whitespace + "+$", "g" ),

	rcomma = new RegExp( "^" + whitespace + "*," + whitespace + "*" ),
	rcombinators = new RegExp( "^" + whitespace + "*([>+~]|" + whitespace + ")" + whitespace + "*" ),

	rsibling = new RegExp( whitespace + "*[+~]" ),
	rattributeQuotes = new RegExp( "=" + whitespace + "*([^\\]'\"]*)" + whitespace + "*\\]", "g" ),

	rpseudo = new RegExp( pseudos ),
	ridentifier = new RegExp( "^" + identifier + "$" ),

	matchExpr = {
		"ID": new RegExp( "^#(" + characterEncoding + ")" ),
		"CLASS": new RegExp( "^\\.(" + characterEncoding + ")" ),
		"TAG": new RegExp( "^(" + characterEncoding.replace( "w", "w*" ) + ")" ),
		"ATTR": new RegExp( "^" + attributes ),
		"PSEUDO": new RegExp( "^" + pseudos ),
		"CHILD": new RegExp( "^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + whitespace +
			"*(even|odd|(([+-]|)(\\d*)n|)" + whitespace + "*(?:([+-]|)" + whitespace +
			"*(\\d+)|))" + whitespace + "*\\)|)", "i" ),
		"bool": new RegExp( "^(?:" + booleans + ")$", "i" ),
		// For use in libraries implementing .is()
		// We use this for POS matching in `select`
		"needsContext": new RegExp( "^" + whitespace + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" +
			whitespace + "*((?:-\\d)?\\d*)" + whitespace + "*\\)|)(?=[^-]|$)", "i" )
	},

	rnative = /^[^{]+\{\s*\[native \w/,

	// Easily-parseable/retrievable ID or TAG or CLASS selectors
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,

	rinputs = /^(?:input|select|textarea|button)$/i,
	rheader = /^h\d$/i,

	rescape = /'|\\/g,

	// CSS escapes http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp( "\\\\([\\da-f]{1,6}" + whitespace + "?|(" + whitespace + ")|.)", "ig" ),
	funescape = function( _, escaped, escapedWhitespace ) {
		var high = "0x" + escaped - 0x10000;
		// NaN means non-codepoint
		// Support: Firefox
		// Workaround erroneous numeric interpretation of +"0x"
		return high !== high || escapedWhitespace ?
			escaped :
			// BMP codepoint
			high < 0 ?
				String.fromCharCode( high + 0x10000 ) :
				// Supplemental Plane codepoint (surrogate pair)
				String.fromCharCode( high >> 10 | 0xD800, high & 0x3FF | 0xDC00 );
	};

// Optimize for push.apply( _, NodeList )
try {
	push.apply(
		(arr = slice.call( preferredDoc.childNodes )),
		preferredDoc.childNodes
	);
	// Support: Android<4.0
	// Detect silently failing push.apply
	arr[ preferredDoc.childNodes.length ].nodeType;
} catch ( e ) {
	push = { apply: arr.length ?

		// Leverage slice if possible
		function( target, els ) {
			push_native.apply( target, slice.call(els) );
		} :

		// Support: IE<9
		// Otherwise append directly
		function( target, els ) {
			var j = target.length,
				i = 0;
			// Can't trust NodeList.length
			while ( (target[j++] = els[i++]) ) {}
			target.length = j - 1;
		}
	};
}

function Sizzle( selector, context, results, seed ) {
	var match, elem, m, nodeType,
		// QSA vars
		i, groups, old, nid, newContext, newSelector;

	if ( ( context ? context.ownerDocument || context : preferredDoc ) !== document ) {
		setDocument( context );
	}

	context = context || document;
	results = results || [];

	if ( !selector || typeof selector !== "string" ) {
		return results;
	}

	if ( (nodeType = context.nodeType) !== 1 && nodeType !== 9 ) {
		return [];
	}

	if ( documentIsHTML && !seed ) {

		// Shortcuts
		if ( (match = rquickExpr.exec( selector )) ) {
			// Speed-up: Sizzle("#ID")
			if ( (m = match[1]) ) {
				if ( nodeType === 9 ) {
					elem = context.getElementById( m );
					// Check parentNode to catch when Blackberry 4.6 returns
					// nodes that are no longer in the document #6963
					if ( elem && elem.parentNode ) {
						// Handle the case where IE, Opera, and Webkit return items
						// by name instead of ID
						if ( elem.id === m ) {
							results.push( elem );
							return results;
						}
					} else {
						return results;
					}
				} else {
					// Context is not a document
					if ( context.ownerDocument && (elem = context.ownerDocument.getElementById( m )) &&
						contains( context, elem ) && elem.id === m ) {
						results.push( elem );
						return results;
					}
				}

			// Speed-up: Sizzle("TAG")
			} else if ( match[2] ) {
				push.apply( results, context.getElementsByTagName( selector ) );
				return results;

			// Speed-up: Sizzle(".CLASS")
			} else if ( (m = match[3]) && support.getElementsByClassName && context.getElementsByClassName ) {
				push.apply( results, context.getElementsByClassName( m ) );
				return results;
			}
		}

		// QSA path
		if ( support.qsa && (!rbuggyQSA || !rbuggyQSA.test( selector )) ) {
			nid = old = expando;
			newContext = context;
			newSelector = nodeType === 9 && selector;

			// qSA works strangely on Element-rooted queries
			// We can work around this by specifying an extra ID on the root
			// and working up from there (Thanks to Andrew Dupont for the technique)
			// IE 8 doesn't work on object elements
			if ( nodeType === 1 && context.nodeName.toLowerCase() !== "object" ) {
				groups = tokenize( selector );

				if ( (old = context.getAttribute("id")) ) {
					nid = old.replace( rescape, "\\$&" );
				} else {
					context.setAttribute( "id", nid );
				}
				nid = "[id='" + nid + "'] ";

				i = groups.length;
				while ( i-- ) {
					groups[i] = nid + toSelector( groups[i] );
				}
				newContext = rsibling.test( selector ) && context.parentNode || context;
				newSelector = groups.join(",");
			}

			if ( newSelector ) {
				try {
					push.apply( results,
						newContext.querySelectorAll( newSelector )
					);
					return results;
				} catch(qsaError) {
				} finally {
					if ( !old ) {
						context.removeAttribute("id");
					}
				}
			}
		}
	}

	// All others
	return select( selector.replace( rtrim, "$1" ), context, results, seed );
}

/**
 * Create key-value caches of limited size
 * @returns {Function(string, Object)} Returns the Object data after storing it on itself with
 *	property name the (space-suffixed) string and (if the cache is larger than Expr.cacheLength)
 *	deleting the oldest entry
 */
function createCache() {
	var keys = [];

	function cache( key, value ) {
		// Use (key + " ") to avoid collision with native prototype properties (see Issue #157)
		if ( keys.push( key += " " ) > Expr.cacheLength ) {
			// Only keep the most recent entries
			delete cache[ keys.shift() ];
		}
		return (cache[ key ] = value);
	}
	return cache;
}

/**
 * Mark a function for special use by Sizzle
 * @param {Function} fn The function to mark
 */
function markFunction( fn ) {
	fn[ expando ] = true;
	return fn;
}

/**
 * Support testing using an element
 * @param {Function} fn Passed the created div and expects a boolean result
 */
function assert( fn ) {
	var div = document.createElement("div");

	try {
		return !!fn( div );
	} catch (e) {
		return false;
	} finally {
		// Remove from its parent by default
		if ( div.parentNode ) {
			div.parentNode.removeChild( div );
		}
		// release memory in IE
		div = null;
	}
}

/**
 * Adds the same handler for all of the specified attrs
 * @param {String} attrs Pipe-separated list of attributes
 * @param {Function} handler The method that will be applied
 */
function addHandle( attrs, handler ) {
	var arr = attrs.split("|"),
		i = attrs.length;

	while ( i-- ) {
		Expr.attrHandle[ arr[i] ] = handler;
	}
}

/**
 * Checks document order of two siblings
 * @param {Element} a
 * @param {Element} b
 * @returns {Number} Returns less than 0 if a precedes b, greater than 0 if a follows b
 */
function siblingCheck( a, b ) {
	var cur = b && a,
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			( ~b.sourceIndex || MAX_NEGATIVE ) -
			( ~a.sourceIndex || MAX_NEGATIVE );

	// Use IE sourceIndex if available on both nodes
	if ( diff ) {
		return diff;
	}

	// Check if b follows a
	if ( cur ) {
		while ( (cur = cur.nextSibling) ) {
			if ( cur === b ) {
				return -1;
			}
		}
	}

	return a ? 1 : -1;
}

/**
 * Returns a function to use in pseudos for input types
 * @param {String} type
 */
function createInputPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return name === "input" && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for buttons
 * @param {String} type
 */
function createButtonPseudo( type ) {
	return function( elem ) {
		var name = elem.nodeName.toLowerCase();
		return (name === "input" || name === "button") && elem.type === type;
	};
}

/**
 * Returns a function to use in pseudos for positionals
 * @param {Function} fn
 */
function createPositionalPseudo( fn ) {
	return markFunction(function( argument ) {
		argument = +argument;
		return markFunction(function( seed, matches ) {
			var j,
				matchIndexes = fn( [], seed.length, argument ),
				i = matchIndexes.length;

			// Match elements found at the specified indexes
			while ( i-- ) {
				if ( seed[ (j = matchIndexes[i]) ] ) {
					seed[j] = !(matches[j] = seed[j]);
				}
			}
		});
	});
}

/**
 * Detect xml
 * @param {Element|Object} elem An element or a document
 */
isXML = Sizzle.isXML = function( elem ) {
	// documentElement is verified for cases where it doesn't yet exist
	// (such as loading iframes in IE - #4833)
	var documentElement = elem && (elem.ownerDocument || elem).documentElement;
	return documentElement ? documentElement.nodeName !== "HTML" : false;
};

// Expose support vars for convenience
support = Sizzle.support = {};

/**
 * Sets document-related variables once based on the current document
 * @param {Element|Object} [doc] An element or document object to use to set the document
 * @returns {Object} Returns the current document
 */
setDocument = Sizzle.setDocument = function( node ) {
	var doc = node ? node.ownerDocument || node : preferredDoc,
		parent = doc.defaultView;

	// If no document and documentElement is available, return
	if ( doc === document || doc.nodeType !== 9 || !doc.documentElement ) {
		return document;
	}

	// Set our document
	document = doc;
	docElem = doc.documentElement;

	// Support tests
	documentIsHTML = !isXML( doc );

	// Support: IE>8
	// If iframe document is assigned to "document" variable and if iframe has been reloaded,
	// IE will throw "permission denied" error when accessing "document" variable, see jQuery #13936
	// IE6-8 do not support the defaultView property so parent will be undefined
	if ( parent && parent.attachEvent && parent !== parent.top ) {
		parent.attachEvent( "onbeforeunload", function() {
			setDocument();
		});
	}

	/* Attributes
	---------------------------------------------------------------------- */

	// Support: IE<8
	// Verify that getAttribute really returns attributes and not properties (excepting IE8 booleans)
	support.attributes = assert(function( div ) {
		div.className = "i";
		return !div.getAttribute("className");
	});

	/* getElement(s)By*
	---------------------------------------------------------------------- */

	// Check if getElementsByTagName("*") returns only elements
	support.getElementsByTagName = assert(function( div ) {
		div.appendChild( doc.createComment("") );
		return !div.getElementsByTagName("*").length;
	});

	// Check if getElementsByClassName can be trusted
	support.getElementsByClassName = assert(function( div ) {
		div.innerHTML = "<div class='a'></div><div class='a i'></div>";

		// Support: Safari<4
		// Catch class over-caching
		div.firstChild.className = "i";
		// Support: Opera<10
		// Catch gEBCN failure to find non-leading classes
		return div.getElementsByClassName("i").length === 2;
	});

	// Support: IE<10
	// Check if getElementById returns elements by name
	// The broken getElementById methods don't pick up programatically-set names,
	// so use a roundabout getElementsByName test
	support.getById = assert(function( div ) {
		docElem.appendChild( div ).id = expando;
		return !doc.getElementsByName || !doc.getElementsByName( expando ).length;
	});

	// ID find and filter
	if ( support.getById ) {
		Expr.find["ID"] = function( id, context ) {
			if ( typeof context.getElementById !== strundefined && documentIsHTML ) {
				var m = context.getElementById( id );
				// Check parentNode to catch when Blackberry 4.6 returns
				// nodes that are no longer in the document #6963
				return m && m.parentNode ? [m] : [];
			}
		};
		Expr.filter["ID"] = function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				return elem.getAttribute("id") === attrId;
			};
		};
	} else {
		// Support: IE6/7
		// getElementById is not reliable as a find shortcut
		delete Expr.find["ID"];

		Expr.filter["ID"] =  function( id ) {
			var attrId = id.replace( runescape, funescape );
			return function( elem ) {
				var node = typeof elem.getAttributeNode !== strundefined && elem.getAttributeNode("id");
				return node && node.value === attrId;
			};
		};
	}

	// Tag
	Expr.find["TAG"] = support.getElementsByTagName ?
		function( tag, context ) {
			if ( typeof context.getElementsByTagName !== strundefined ) {
				return context.getElementsByTagName( tag );
			}
		} :
		function( tag, context ) {
			var elem,
				tmp = [],
				i = 0,
				results = context.getElementsByTagName( tag );

			// Filter out possible comments
			if ( tag === "*" ) {
				while ( (elem = results[i++]) ) {
					if ( elem.nodeType === 1 ) {
						tmp.push( elem );
					}
				}

				return tmp;
			}
			return results;
		};

	// Class
	Expr.find["CLASS"] = support.getElementsByClassName && function( className, context ) {
		if ( typeof context.getElementsByClassName !== strundefined && documentIsHTML ) {
			return context.getElementsByClassName( className );
		}
	};

	/* QSA/matchesSelector
	---------------------------------------------------------------------- */

	// QSA and matchesSelector support

	// matchesSelector(:active) reports false when true (IE9/Opera 11.5)
	rbuggyMatches = [];

	// qSa(:focus) reports false when true (Chrome 21)
	// We allow this because of a bug in IE8/9 that throws an error
	// whenever `document.activeElement` is accessed on an iframe
	// So, we allow :focus to pass through QSA all the time to avoid the IE error
	// See http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if ( (support.qsa = rnative.test( doc.querySelectorAll )) ) {
		// Build QSA regex
		// Regex strategy adopted from Diego Perini
		assert(function( div ) {
			// Select is set to empty string on purpose
			// This is to test IE's treatment of not explicitly
			// setting a boolean content attribute,
			// since its presence should be enough
			// http://bugs.jquery.com/ticket/12359
			div.innerHTML = "<select><option selected=''></option></select>";

			// Support: IE8
			// Boolean attributes and "value" are not treated correctly
			if ( !div.querySelectorAll("[selected]").length ) {
				rbuggyQSA.push( "\\[" + whitespace + "*(?:value|" + booleans + ")" );
			}

			// Webkit/Opera - :checked should return selected option elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":checked").length ) {
				rbuggyQSA.push(":checked");
			}
		});

		assert(function( div ) {

			// Support: Opera 10-12/IE8
			// ^= $= *= and empty values
			// Should not select anything
			// Support: Windows 8 Native Apps
			// The type attribute is restricted during .innerHTML assignment
			var input = doc.createElement("input");
			input.setAttribute( "type", "hidden" );
			div.appendChild( input ).setAttribute( "t", "" );

			if ( div.querySelectorAll("[t^='']").length ) {
				rbuggyQSA.push( "[*^$]=" + whitespace + "*(?:''|\"\")" );
			}

			// FF 3.5 - :enabled/:disabled and hidden elements (hidden elements are still enabled)
			// IE8 throws error here and will not see later tests
			if ( !div.querySelectorAll(":enabled").length ) {
				rbuggyQSA.push( ":enabled", ":disabled" );
			}

			// Opera 10-11 does not throw on post-comma invalid pseudos
			div.querySelectorAll("*,:x");
			rbuggyQSA.push(",.*:");
		});
	}

	if ( (support.matchesSelector = rnative.test( (matches = docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector) )) ) {

		assert(function( div ) {
			// Check to see if it's possible to do matchesSelector
			// on a disconnected node (IE 9)
			support.disconnectedMatch = matches.call( div, "div" );

			// This should fail with an exception
			// Gecko does not error, returns false instead
			matches.call( div, "[s!='']:x" );
			rbuggyMatches.push( "!=", pseudos );
		});
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp( rbuggyQSA.join("|") );
	rbuggyMatches = rbuggyMatches.length && new RegExp( rbuggyMatches.join("|") );

	/* Contains
	---------------------------------------------------------------------- */

	// Element contains another
	// Purposefully does not implement inclusive descendent
	// As in, an element does not contain itself
	contains = rnative.test( docElem.contains ) || docElem.compareDocumentPosition ?
		function( a, b ) {
			var adown = a.nodeType === 9 ? a.documentElement : a,
				bup = b && b.parentNode;
			return a === bup || !!( bup && bup.nodeType === 1 && (
				adown.contains ?
					adown.contains( bup ) :
					a.compareDocumentPosition && a.compareDocumentPosition( bup ) & 16
			));
		} :
		function( a, b ) {
			if ( b ) {
				while ( (b = b.parentNode) ) {
					if ( b === a ) {
						return true;
					}
				}
			}
			return false;
		};

	/* Sorting
	---------------------------------------------------------------------- */

	// Document order sorting
	sortOrder = docElem.compareDocumentPosition ?
	function( a, b ) {

		// Flag for duplicate removal
		if ( a === b ) {
			hasDuplicate = true;
			return 0;
		}

		var compare = b.compareDocumentPosition && a.compareDocumentPosition && a.compareDocumentPosition( b );

		if ( compare ) {
			// Disconnected nodes
			if ( compare & 1 ||
				(!support.sortDetached && b.compareDocumentPosition( a ) === compare) ) {

				// Choose the first element that is related to our preferred document
				if ( a === doc || contains(preferredDoc, a) ) {
					return -1;
				}
				if ( b === doc || contains(preferredDoc, b) ) {
					return 1;
				}

				// Maintain original order
				return sortInput ?
					( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
					0;
			}

			return compare & 4 ? -1 : 1;
		}

		// Not directly comparable, sort on existence of method
		return a.compareDocumentPosition ? -1 : 1;
	} :
	function( a, b ) {
		var cur,
			i = 0,
			aup = a.parentNode,
			bup = b.parentNode,
			ap = [ a ],
			bp = [ b ];

		// Exit early if the nodes are identical
		if ( a === b ) {
			hasDuplicate = true;
			return 0;

		// Parentless nodes are either documents or disconnected
		} else if ( !aup || !bup ) {
			return a === doc ? -1 :
				b === doc ? 1 :
				aup ? -1 :
				bup ? 1 :
				sortInput ?
				( indexOf.call( sortInput, a ) - indexOf.call( sortInput, b ) ) :
				0;

		// If the nodes are siblings, we can do a quick check
		} else if ( aup === bup ) {
			return siblingCheck( a, b );
		}

		// Otherwise we need full lists of their ancestors for comparison
		cur = a;
		while ( (cur = cur.parentNode) ) {
			ap.unshift( cur );
		}
		cur = b;
		while ( (cur = cur.parentNode) ) {
			bp.unshift( cur );
		}

		// Walk down the tree looking for a discrepancy
		while ( ap[i] === bp[i] ) {
			i++;
		}

		return i ?
			// Do a sibling check if the nodes have a common ancestor
			siblingCheck( ap[i], bp[i] ) :

			// Otherwise nodes in our document sort first
			ap[i] === preferredDoc ? -1 :
			bp[i] === preferredDoc ? 1 :
			0;
	};

	return doc;
};

Sizzle.matches = function( expr, elements ) {
	return Sizzle( expr, null, null, elements );
};

Sizzle.matchesSelector = function( elem, expr ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	// Make sure that attribute selectors are quoted
	expr = expr.replace( rattributeQuotes, "='$1']" );

	if ( support.matchesSelector && documentIsHTML &&
		( !rbuggyMatches || !rbuggyMatches.test( expr ) ) &&
		( !rbuggyQSA     || !rbuggyQSA.test( expr ) ) ) {

		try {
			var ret = matches.call( elem, expr );

			// IE 9's matchesSelector returns false on disconnected nodes
			if ( ret || support.disconnectedMatch ||
					// As well, disconnected nodes are said to be in a document
					// fragment in IE 9
					elem.document && elem.document.nodeType !== 11 ) {
				return ret;
			}
		} catch(e) {}
	}

	return Sizzle( expr, document, null, [elem] ).length > 0;
};

Sizzle.contains = function( context, elem ) {
	// Set document vars if needed
	if ( ( context.ownerDocument || context ) !== document ) {
		setDocument( context );
	}
	return contains( context, elem );
};

Sizzle.attr = function( elem, name ) {
	// Set document vars if needed
	if ( ( elem.ownerDocument || elem ) !== document ) {
		setDocument( elem );
	}

	var fn = Expr.attrHandle[ name.toLowerCase() ],
		// Don't get fooled by Object.prototype properties (jQuery #13807)
		val = fn && hasOwn.call( Expr.attrHandle, name.toLowerCase() ) ?
			fn( elem, name, !documentIsHTML ) :
			undefined;

	return val === undefined ?
		support.attributes || !documentIsHTML ?
			elem.getAttribute( name ) :
			(val = elem.getAttributeNode(name)) && val.specified ?
				val.value :
				null :
		val;
};

Sizzle.error = function( msg ) {
	throw new Error( "Syntax error, unrecognized expression: " + msg );
};

/**
 * Document sorting and removing duplicates
 * @param {ArrayLike} results
 */
Sizzle.uniqueSort = function( results ) {
	var elem,
		duplicates = [],
		j = 0,
		i = 0;

	// Unless we *know* we can detect duplicates, assume their presence
	hasDuplicate = !support.detectDuplicates;
	sortInput = !support.sortStable && results.slice( 0 );
	results.sort( sortOrder );

	if ( hasDuplicate ) {
		while ( (elem = results[i++]) ) {
			if ( elem === results[ i ] ) {
				j = duplicates.push( i );
			}
		}
		while ( j-- ) {
			results.splice( duplicates[ j ], 1 );
		}
	}

	return results;
};

/**
 * Utility function for retrieving the text value of an array of DOM nodes
 * @param {Array|Element} elem
 */
getText = Sizzle.getText = function( elem ) {
	var node,
		ret = "",
		i = 0,
		nodeType = elem.nodeType;

	if ( !nodeType ) {
		// If no nodeType, this is expected to be an array
		for ( ; (node = elem[i]); i++ ) {
			// Do not traverse comment nodes
			ret += getText( node );
		}
	} else if ( nodeType === 1 || nodeType === 9 || nodeType === 11 ) {
		// Use textContent for elements
		// innerText usage removed for consistency of new lines (see #11153)
		if ( typeof elem.textContent === "string" ) {
			return elem.textContent;
		} else {
			// Traverse its children
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				ret += getText( elem );
			}
		}
	} else if ( nodeType === 3 || nodeType === 4 ) {
		return elem.nodeValue;
	}
	// Do not include comment or processing instruction nodes

	return ret;
};

Expr = Sizzle.selectors = {

	// Can be adjusted by the user
	cacheLength: 50,

	createPseudo: markFunction,

	match: matchExpr,

	attrHandle: {},

	find: {},

	relative: {
		">": { dir: "parentNode", first: true },
		" ": { dir: "parentNode" },
		"+": { dir: "previousSibling", first: true },
		"~": { dir: "previousSibling" }
	},

	preFilter: {
		"ATTR": function( match ) {
			match[1] = match[1].replace( runescape, funescape );

			// Move the given value to match[3] whether quoted or unquoted
			match[3] = ( match[4] || match[5] || "" ).replace( runescape, funescape );

			if ( match[2] === "~=" ) {
				match[3] = " " + match[3] + " ";
			}

			return match.slice( 0, 4 );
		},

		"CHILD": function( match ) {
			/* matches from matchExpr["CHILD"]
				1 type (only|nth|...)
				2 what (child|of-type)
				3 argument (even|odd|\d*|\d*n([+-]\d+)?|...)
				4 xn-component of xn+y argument ([+-]?\d*n|)
				5 sign of xn-component
				6 x of xn-component
				7 sign of y-component
				8 y of y-component
			*/
			match[1] = match[1].toLowerCase();

			if ( match[1].slice( 0, 3 ) === "nth" ) {
				// nth-* requires argument
				if ( !match[3] ) {
					Sizzle.error( match[0] );
				}

				// numeric x and y parameters for Expr.filter.CHILD
				// remember that false/true cast respectively to 0/1
				match[4] = +( match[4] ? match[5] + (match[6] || 1) : 2 * ( match[3] === "even" || match[3] === "odd" ) );
				match[5] = +( ( match[7] + match[8] ) || match[3] === "odd" );

			// other types prohibit arguments
			} else if ( match[3] ) {
				Sizzle.error( match[0] );
			}

			return match;
		},

		"PSEUDO": function( match ) {
			var excess,
				unquoted = !match[5] && match[2];

			if ( matchExpr["CHILD"].test( match[0] ) ) {
				return null;
			}

			// Accept quoted arguments as-is
			if ( match[3] && match[4] !== undefined ) {
				match[2] = match[4];

			// Strip excess characters from unquoted arguments
			} else if ( unquoted && rpseudo.test( unquoted ) &&
				// Get excess from tokenize (recursively)
				(excess = tokenize( unquoted, true )) &&
				// advance to the next closing parenthesis
				(excess = unquoted.indexOf( ")", unquoted.length - excess ) - unquoted.length) ) {

				// excess is a negative index
				match[0] = match[0].slice( 0, excess );
				match[2] = unquoted.slice( 0, excess );
			}

			// Return only captures needed by the pseudo filter method (type and argument)
			return match.slice( 0, 3 );
		}
	},

	filter: {

		"TAG": function( nodeNameSelector ) {
			var nodeName = nodeNameSelector.replace( runescape, funescape ).toLowerCase();
			return nodeNameSelector === "*" ?
				function() { return true; } :
				function( elem ) {
					return elem.nodeName && elem.nodeName.toLowerCase() === nodeName;
				};
		},

		"CLASS": function( className ) {
			var pattern = classCache[ className + " " ];

			return pattern ||
				(pattern = new RegExp( "(^|" + whitespace + ")" + className + "(" + whitespace + "|$)" )) &&
				classCache( className, function( elem ) {
					return pattern.test( typeof elem.className === "string" && elem.className || typeof elem.getAttribute !== strundefined && elem.getAttribute("class") || "" );
				});
		},

		"ATTR": function( name, operator, check ) {
			return function( elem ) {
				var result = Sizzle.attr( elem, name );

				if ( result == null ) {
					return operator === "!=";
				}
				if ( !operator ) {
					return true;
				}

				result += "";

				return operator === "=" ? result === check :
					operator === "!=" ? result !== check :
					operator === "^=" ? check && result.indexOf( check ) === 0 :
					operator === "*=" ? check && result.indexOf( check ) > -1 :
					operator === "$=" ? check && result.slice( -check.length ) === check :
					operator === "~=" ? ( " " + result + " " ).indexOf( check ) > -1 :
					operator === "|=" ? result === check || result.slice( 0, check.length + 1 ) === check + "-" :
					false;
			};
		},

		"CHILD": function( type, what, argument, first, last ) {
			var simple = type.slice( 0, 3 ) !== "nth",
				forward = type.slice( -4 ) !== "last",
				ofType = what === "of-type";

			return first === 1 && last === 0 ?

				// Shortcut for :nth-*(n)
				function( elem ) {
					return !!elem.parentNode;
				} :

				function( elem, context, xml ) {
					var cache, outerCache, node, diff, nodeIndex, start,
						dir = simple !== forward ? "nextSibling" : "previousSibling",
						parent = elem.parentNode,
						name = ofType && elem.nodeName.toLowerCase(),
						useCache = !xml && !ofType;

					if ( parent ) {

						// :(first|last|only)-(child|of-type)
						if ( simple ) {
							while ( dir ) {
								node = elem;
								while ( (node = node[ dir ]) ) {
									if ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) {
										return false;
									}
								}
								// Reverse direction for :only-* (if we haven't yet done so)
								start = dir = type === "only" && !start && "nextSibling";
							}
							return true;
						}

						start = [ forward ? parent.firstChild : parent.lastChild ];

						// non-xml :nth-child(...) stores cache data on `parent`
						if ( forward && useCache ) {
							// Seek `elem` from a previously-cached index
							outerCache = parent[ expando ] || (parent[ expando ] = {});
							cache = outerCache[ type ] || [];
							nodeIndex = cache[0] === dirruns && cache[1];
							diff = cache[0] === dirruns && cache[2];
							node = nodeIndex && parent.childNodes[ nodeIndex ];

							while ( (node = ++nodeIndex && node && node[ dir ] ||

								// Fallback to seeking `elem` from the start
								(diff = nodeIndex = 0) || start.pop()) ) {

								// When found, cache indexes on `parent` and break
								if ( node.nodeType === 1 && ++diff && node === elem ) {
									outerCache[ type ] = [ dirruns, nodeIndex, diff ];
									break;
								}
							}

						// Use previously-cached element index if available
						} else if ( useCache && (cache = (elem[ expando ] || (elem[ expando ] = {}))[ type ]) && cache[0] === dirruns ) {
							diff = cache[1];

						// xml :nth-child(...) or :nth-last-child(...) or :nth(-last)?-of-type(...)
						} else {
							// Use the same loop as above to seek `elem` from the start
							while ( (node = ++nodeIndex && node && node[ dir ] ||
								(diff = nodeIndex = 0) || start.pop()) ) {

								if ( ( ofType ? node.nodeName.toLowerCase() === name : node.nodeType === 1 ) && ++diff ) {
									// Cache the index of each encountered element
									if ( useCache ) {
										(node[ expando ] || (node[ expando ] = {}))[ type ] = [ dirruns, diff ];
									}

									if ( node === elem ) {
										break;
									}
								}
							}
						}

						// Incorporate the offset, then check against cycle size
						diff -= last;
						return diff === first || ( diff % first === 0 && diff / first >= 0 );
					}
				};
		},

		"PSEUDO": function( pseudo, argument ) {
			// pseudo-class names are case-insensitive
			// http://www.w3.org/TR/selectors/#pseudo-classes
			// Prioritize by case sensitivity in case custom pseudos are added with uppercase letters
			// Remember that setFilters inherits from pseudos
			var args,
				fn = Expr.pseudos[ pseudo ] || Expr.setFilters[ pseudo.toLowerCase() ] ||
					Sizzle.error( "unsupported pseudo: " + pseudo );

			// The user may use createPseudo to indicate that
			// arguments are needed to create the filter function
			// just as Sizzle does
			if ( fn[ expando ] ) {
				return fn( argument );
			}

			// But maintain support for old signatures
			if ( fn.length > 1 ) {
				args = [ pseudo, pseudo, "", argument ];
				return Expr.setFilters.hasOwnProperty( pseudo.toLowerCase() ) ?
					markFunction(function( seed, matches ) {
						var idx,
							matched = fn( seed, argument ),
							i = matched.length;
						while ( i-- ) {
							idx = indexOf.call( seed, matched[i] );
							seed[ idx ] = !( matches[ idx ] = matched[i] );
						}
					}) :
					function( elem ) {
						return fn( elem, 0, args );
					};
			}

			return fn;
		}
	},

	pseudos: {
		// Potentially complex pseudos
		"not": markFunction(function( selector ) {
			// Trim the selector passed to compile
			// to avoid treating leading and trailing
			// spaces as combinators
			var input = [],
				results = [],
				matcher = compile( selector.replace( rtrim, "$1" ) );

			return matcher[ expando ] ?
				markFunction(function( seed, matches, context, xml ) {
					var elem,
						unmatched = matcher( seed, null, xml, [] ),
						i = seed.length;

					// Match elements unmatched by `matcher`
					while ( i-- ) {
						if ( (elem = unmatched[i]) ) {
							seed[i] = !(matches[i] = elem);
						}
					}
				}) :
				function( elem, context, xml ) {
					input[0] = elem;
					matcher( input, null, xml, results );
					return !results.pop();
				};
		}),

		"has": markFunction(function( selector ) {
			return function( elem ) {
				return Sizzle( selector, elem ).length > 0;
			};
		}),

		"contains": markFunction(function( text ) {
			return function( elem ) {
				return ( elem.textContent || elem.innerText || getText( elem ) ).indexOf( text ) > -1;
			};
		}),

		// "Whether an element is represented by a :lang() selector
		// is based solely on the element's language value
		// being equal to the identifier C,
		// or beginning with the identifier C immediately followed by "-".
		// The matching of C against the element's language value is performed case-insensitively.
		// The identifier C does not have to be a valid language name."
		// http://www.w3.org/TR/selectors/#lang-pseudo
		"lang": markFunction( function( lang ) {
			// lang value must be a valid identifier
			if ( !ridentifier.test(lang || "") ) {
				Sizzle.error( "unsupported lang: " + lang );
			}
			lang = lang.replace( runescape, funescape ).toLowerCase();
			return function( elem ) {
				var elemLang;
				do {
					if ( (elemLang = documentIsHTML ?
						elem.lang :
						elem.getAttribute("xml:lang") || elem.getAttribute("lang")) ) {

						elemLang = elemLang.toLowerCase();
						return elemLang === lang || elemLang.indexOf( lang + "-" ) === 0;
					}
				} while ( (elem = elem.parentNode) && elem.nodeType === 1 );
				return false;
			};
		}),

		// Miscellaneous
		"target": function( elem ) {
			var hash = window.location && window.location.hash;
			return hash && hash.slice( 1 ) === elem.id;
		},

		"root": function( elem ) {
			return elem === docElem;
		},

		"focus": function( elem ) {
			return elem === document.activeElement && (!document.hasFocus || document.hasFocus()) && !!(elem.type || elem.href || ~elem.tabIndex);
		},

		// Boolean properties
		"enabled": function( elem ) {
			return elem.disabled === false;
		},

		"disabled": function( elem ) {
			return elem.disabled === true;
		},

		"checked": function( elem ) {
			// In CSS3, :checked should return both checked and selected elements
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase();
			return (nodeName === "input" && !!elem.checked) || (nodeName === "option" && !!elem.selected);
		},

		"selected": function( elem ) {
			// Accessing this property makes selected-by-default
			// options in Safari work properly
			if ( elem.parentNode ) {
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		},

		// Contents
		"empty": function( elem ) {
			// http://www.w3.org/TR/selectors/#empty-pseudo
			// :empty is only affected by element nodes and content nodes(including text(3), cdata(4)),
			//   not comment, processing instructions, or others
			// Thanks to Diego Perini for the nodeName shortcut
			//   Greater than "@" means alpha characters (specifically not starting with "#" or "?")
			for ( elem = elem.firstChild; elem; elem = elem.nextSibling ) {
				if ( elem.nodeName > "@" || elem.nodeType === 3 || elem.nodeType === 4 ) {
					return false;
				}
			}
			return true;
		},

		"parent": function( elem ) {
			return !Expr.pseudos["empty"]( elem );
		},

		// Element/input types
		"header": function( elem ) {
			return rheader.test( elem.nodeName );
		},

		"input": function( elem ) {
			return rinputs.test( elem.nodeName );
		},

		"button": function( elem ) {
			var name = elem.nodeName.toLowerCase();
			return name === "input" && elem.type === "button" || name === "button";
		},

		"text": function( elem ) {
			var attr;
			// IE6 and 7 will map elem.type to 'text' for new HTML5 types (search, etc)
			// use getAttribute instead to test this case
			return elem.nodeName.toLowerCase() === "input" &&
				elem.type === "text" &&
				( (attr = elem.getAttribute("type")) == null || attr.toLowerCase() === elem.type );
		},

		// Position-in-collection
		"first": createPositionalPseudo(function() {
			return [ 0 ];
		}),

		"last": createPositionalPseudo(function( matchIndexes, length ) {
			return [ length - 1 ];
		}),

		"eq": createPositionalPseudo(function( matchIndexes, length, argument ) {
			return [ argument < 0 ? argument + length : argument ];
		}),

		"even": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 0;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"odd": createPositionalPseudo(function( matchIndexes, length ) {
			var i = 1;
			for ( ; i < length; i += 2 ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"lt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; --i >= 0; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		}),

		"gt": createPositionalPseudo(function( matchIndexes, length, argument ) {
			var i = argument < 0 ? argument + length : argument;
			for ( ; ++i < length; ) {
				matchIndexes.push( i );
			}
			return matchIndexes;
		})
	}
};

Expr.pseudos["nth"] = Expr.pseudos["eq"];

// Add button/input type pseudos
for ( i in { radio: true, checkbox: true, file: true, password: true, image: true } ) {
	Expr.pseudos[ i ] = createInputPseudo( i );
}
for ( i in { submit: true, reset: true } ) {
	Expr.pseudos[ i ] = createButtonPseudo( i );
}

// Easy API for creating new setFilters
function setFilters() {}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters();

function tokenize( selector, parseOnly ) {
	var matched, match, tokens, type,
		soFar, groups, preFilters,
		cached = tokenCache[ selector + " " ];

	if ( cached ) {
		return parseOnly ? 0 : cached.slice( 0 );
	}

	soFar = selector;
	groups = [];
	preFilters = Expr.preFilter;

	while ( soFar ) {

		// Comma and first run
		if ( !matched || (match = rcomma.exec( soFar )) ) {
			if ( match ) {
				// Don't consume trailing commas as valid
				soFar = soFar.slice( match[0].length ) || soFar;
			}
			groups.push( tokens = [] );
		}

		matched = false;

		// Combinators
		if ( (match = rcombinators.exec( soFar )) ) {
			matched = match.shift();
			tokens.push({
				value: matched,
				// Cast descendant combinators to space
				type: match[0].replace( rtrim, " " )
			});
			soFar = soFar.slice( matched.length );
		}

		// Filters
		for ( type in Expr.filter ) {
			if ( (match = matchExpr[ type ].exec( soFar )) && (!preFilters[ type ] ||
				(match = preFilters[ type ]( match ))) ) {
				matched = match.shift();
				tokens.push({
					value: matched,
					type: type,
					matches: match
				});
				soFar = soFar.slice( matched.length );
			}
		}

		if ( !matched ) {
			break;
		}
	}

	// Return the length of the invalid excess
	// if we're just parsing
	// Otherwise, throw an error or return tokens
	return parseOnly ?
		soFar.length :
		soFar ?
			Sizzle.error( selector ) :
			// Cache the tokens
			tokenCache( selector, groups ).slice( 0 );
}

function toSelector( tokens ) {
	var i = 0,
		len = tokens.length,
		selector = "";
	for ( ; i < len; i++ ) {
		selector += tokens[i].value;
	}
	return selector;
}

function addCombinator( matcher, combinator, base ) {
	var dir = combinator.dir,
		checkNonElements = base && dir === "parentNode",
		doneName = done++;

	return combinator.first ?
		// Check against closest ancestor/preceding element
		function( elem, context, xml ) {
			while ( (elem = elem[ dir ]) ) {
				if ( elem.nodeType === 1 || checkNonElements ) {
					return matcher( elem, context, xml );
				}
			}
		} :

		// Check against all ancestor/preceding elements
		function( elem, context, xml ) {
			var data, cache, outerCache,
				dirkey = dirruns + " " + doneName;

			// We can't set arbitrary data on XML nodes, so they don't benefit from dir caching
			if ( xml ) {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						if ( matcher( elem, context, xml ) ) {
							return true;
						}
					}
				}
			} else {
				while ( (elem = elem[ dir ]) ) {
					if ( elem.nodeType === 1 || checkNonElements ) {
						outerCache = elem[ expando ] || (elem[ expando ] = {});
						if ( (cache = outerCache[ dir ]) && cache[0] === dirkey ) {
							if ( (data = cache[1]) === true || data === cachedruns ) {
								return data === true;
							}
						} else {
							cache = outerCache[ dir ] = [ dirkey ];
							cache[1] = matcher( elem, context, xml ) || cachedruns;
							if ( cache[1] === true ) {
								return true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher( matchers ) {
	return matchers.length > 1 ?
		function( elem, context, xml ) {
			var i = matchers.length;
			while ( i-- ) {
				if ( !matchers[i]( elem, context, xml ) ) {
					return false;
				}
			}
			return true;
		} :
		matchers[0];
}

function condense( unmatched, map, filter, context, xml ) {
	var elem,
		newUnmatched = [],
		i = 0,
		len = unmatched.length,
		mapped = map != null;

	for ( ; i < len; i++ ) {
		if ( (elem = unmatched[i]) ) {
			if ( !filter || filter( elem, context, xml ) ) {
				newUnmatched.push( elem );
				if ( mapped ) {
					map.push( i );
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher( preFilter, selector, matcher, postFilter, postFinder, postSelector ) {
	if ( postFilter && !postFilter[ expando ] ) {
		postFilter = setMatcher( postFilter );
	}
	if ( postFinder && !postFinder[ expando ] ) {
		postFinder = setMatcher( postFinder, postSelector );
	}
	return markFunction(function( seed, results, context, xml ) {
		var temp, i, elem,
			preMap = [],
			postMap = [],
			preexisting = results.length,

			// Get initial elements from seed or context
			elems = seed || multipleContexts( selector || "*", context.nodeType ? [ context ] : context, [] ),

			// Prefilter to get matcher input, preserving a map for seed-results synchronization
			matcherIn = preFilter && ( seed || !selector ) ?
				condense( elems, preMap, preFilter, context, xml ) :
				elems,

			matcherOut = matcher ?
				// If we have a postFinder, or filtered seed, or non-seed postFilter or preexisting results,
				postFinder || ( seed ? preFilter : preexisting || postFilter ) ?

					// ...intermediate processing is necessary
					[] :

					// ...otherwise use results directly
					results :
				matcherIn;

		// Find primary matches
		if ( matcher ) {
			matcher( matcherIn, matcherOut, context, xml );
		}

		// Apply postFilter
		if ( postFilter ) {
			temp = condense( matcherOut, postMap );
			postFilter( temp, [], context, xml );

			// Un-match failing elements by moving them back to matcherIn
			i = temp.length;
			while ( i-- ) {
				if ( (elem = temp[i]) ) {
					matcherOut[ postMap[i] ] = !(matcherIn[ postMap[i] ] = elem);
				}
			}
		}

		if ( seed ) {
			if ( postFinder || preFilter ) {
				if ( postFinder ) {
					// Get the final matcherOut by condensing this intermediate into postFinder contexts
					temp = [];
					i = matcherOut.length;
					while ( i-- ) {
						if ( (elem = matcherOut[i]) ) {
							// Restore matcherIn since elem is not yet a final match
							temp.push( (matcherIn[i] = elem) );
						}
					}
					postFinder( null, (matcherOut = []), temp, xml );
				}

				// Move matched elements from seed to results to keep them synchronized
				i = matcherOut.length;
				while ( i-- ) {
					if ( (elem = matcherOut[i]) &&
						(temp = postFinder ? indexOf.call( seed, elem ) : preMap[i]) > -1 ) {

						seed[temp] = !(results[temp] = elem);
					}
				}
			}

		// Add elements to results, through postFinder if defined
		} else {
			matcherOut = condense(
				matcherOut === results ?
					matcherOut.splice( preexisting, matcherOut.length ) :
					matcherOut
			);
			if ( postFinder ) {
				postFinder( null, results, matcherOut, xml );
			} else {
				push.apply( results, matcherOut );
			}
		}
	});
}

function matcherFromTokens( tokens ) {
	var checkContext, matcher, j,
		len = tokens.length,
		leadingRelative = Expr.relative[ tokens[0].type ],
		implicitRelative = leadingRelative || Expr.relative[" "],
		i = leadingRelative ? 1 : 0,

		// The foundational matcher ensures that elements are reachable from top-level context(s)
		matchContext = addCombinator( function( elem ) {
			return elem === checkContext;
		}, implicitRelative, true ),
		matchAnyContext = addCombinator( function( elem ) {
			return indexOf.call( checkContext, elem ) > -1;
		}, implicitRelative, true ),
		matchers = [ function( elem, context, xml ) {
			return ( !leadingRelative && ( xml || context !== outermostContext ) ) || (
				(checkContext = context).nodeType ?
					matchContext( elem, context, xml ) :
					matchAnyContext( elem, context, xml ) );
		} ];

	for ( ; i < len; i++ ) {
		if ( (matcher = Expr.relative[ tokens[i].type ]) ) {
			matchers = [ addCombinator(elementMatcher( matchers ), matcher) ];
		} else {
			matcher = Expr.filter[ tokens[i].type ].apply( null, tokens[i].matches );

			// Return special upon seeing a positional matcher
			if ( matcher[ expando ] ) {
				// Find the next relative operator (if any) for proper handling
				j = ++i;
				for ( ; j < len; j++ ) {
					if ( Expr.relative[ tokens[j].type ] ) {
						break;
					}
				}
				return setMatcher(
					i > 1 && elementMatcher( matchers ),
					i > 1 && toSelector(
						// If the preceding token was a descendant combinator, insert an implicit any-element `*`
						tokens.slice( 0, i - 1 ).concat({ value: tokens[ i - 2 ].type === " " ? "*" : "" })
					).replace( rtrim, "$1" ),
					matcher,
					i < j && matcherFromTokens( tokens.slice( i, j ) ),
					j < len && matcherFromTokens( (tokens = tokens.slice( j )) ),
					j < len && toSelector( tokens )
				);
			}
			matchers.push( matcher );
		}
	}

	return elementMatcher( matchers );
}

function matcherFromGroupMatchers( elementMatchers, setMatchers ) {
	// A counter to specify which element is currently being matched
	var matcherCachedRuns = 0,
		bySet = setMatchers.length > 0,
		byElement = elementMatchers.length > 0,
		superMatcher = function( seed, context, xml, results, expandContext ) {
			var elem, j, matcher,
				setMatched = [],
				matchedCount = 0,
				i = "0",
				unmatched = seed && [],
				outermost = expandContext != null,
				contextBackup = outermostContext,
				// We must always have either seed elements or context
				elems = seed || byElement && Expr.find["TAG"]( "*", expandContext && context.parentNode || context ),
				// Use integer dirruns iff this is the outermost matcher
				dirrunsUnique = (dirruns += contextBackup == null ? 1 : Math.random() || 0.1);

			if ( outermost ) {
				outermostContext = context !== document && context;
				cachedruns = matcherCachedRuns;
			}

			// Add elements passing elementMatchers directly to results
			// Keep `i` a string if there are no elements so `matchedCount` will be "00" below
			for ( ; (elem = elems[i]) != null; i++ ) {
				if ( byElement && elem ) {
					j = 0;
					while ( (matcher = elementMatchers[j++]) ) {
						if ( matcher( elem, context, xml ) ) {
							results.push( elem );
							break;
						}
					}
					if ( outermost ) {
						dirruns = dirrunsUnique;
						cachedruns = ++matcherCachedRuns;
					}
				}

				// Track unmatched elements for set filters
				if ( bySet ) {
					// They will have gone through all possible matchers
					if ( (elem = !matcher && elem) ) {
						matchedCount--;
					}

					// Lengthen the array for every element, matched or not
					if ( seed ) {
						unmatched.push( elem );
					}
				}
			}

			// Apply set filters to unmatched elements
			matchedCount += i;
			if ( bySet && i !== matchedCount ) {
				j = 0;
				while ( (matcher = setMatchers[j++]) ) {
					matcher( unmatched, setMatched, context, xml );
				}

				if ( seed ) {
					// Reintegrate element matches to eliminate the need for sorting
					if ( matchedCount > 0 ) {
						while ( i-- ) {
							if ( !(unmatched[i] || setMatched[i]) ) {
								setMatched[i] = pop.call( results );
							}
						}
					}

					// Discard index placeholder values to get only actual matches
					setMatched = condense( setMatched );
				}

				// Add matches to results
				push.apply( results, setMatched );

				// Seedless set matches succeeding multiple successful matchers stipulate sorting
				if ( outermost && !seed && setMatched.length > 0 &&
					( matchedCount + setMatchers.length ) > 1 ) {

					Sizzle.uniqueSort( results );
				}
			}

			// Override manipulation of globals by nested matchers
			if ( outermost ) {
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			return unmatched;
		};

	return bySet ?
		markFunction( superMatcher ) :
		superMatcher;
}

compile = Sizzle.compile = function( selector, group /* Internal Use Only */ ) {
	var i,
		setMatchers = [],
		elementMatchers = [],
		cached = compilerCache[ selector + " " ];

	if ( !cached ) {
		// Generate a function of recursive functions that can be used to check each element
		if ( !group ) {
			group = tokenize( selector );
		}
		i = group.length;
		while ( i-- ) {
			cached = matcherFromTokens( group[i] );
			if ( cached[ expando ] ) {
				setMatchers.push( cached );
			} else {
				elementMatchers.push( cached );
			}
		}

		// Cache the compiled function
		cached = compilerCache( selector, matcherFromGroupMatchers( elementMatchers, setMatchers ) );
	}
	return cached;
};

function multipleContexts( selector, contexts, results ) {
	var i = 0,
		len = contexts.length;
	for ( ; i < len; i++ ) {
		Sizzle( selector, contexts[i], results );
	}
	return results;
}

function select( selector, context, results, seed ) {
	var i, tokens, token, type, find,
		match = tokenize( selector );

	if ( !seed ) {
		// Try to minimize operations if there is only one group
		if ( match.length === 1 ) {

			// Take a shortcut and set the context if the root selector is an ID
			tokens = match[0] = match[0].slice( 0 );
			if ( tokens.length > 2 && (token = tokens[0]).type === "ID" &&
					support.getById && context.nodeType === 9 && documentIsHTML &&
					Expr.relative[ tokens[1].type ] ) {

				context = ( Expr.find["ID"]( token.matches[0].replace(runescape, funescape), context ) || [] )[0];
				if ( !context ) {
					return results;
				}
				selector = selector.slice( tokens.shift().value.length );
			}

			// Fetch a seed set for right-to-left matching
			i = matchExpr["needsContext"].test( selector ) ? 0 : tokens.length;
			while ( i-- ) {
				token = tokens[i];

				// Abort if we hit a combinator
				if ( Expr.relative[ (type = token.type) ] ) {
					break;
				}
				if ( (find = Expr.find[ type ]) ) {
					// Search, expanding context for leading sibling combinators
					if ( (seed = find(
						token.matches[0].replace( runescape, funescape ),
						rsibling.test( tokens[0].type ) && context.parentNode || context
					)) ) {

						// If seed is empty or no tokens remain, we can return early
						tokens.splice( i, 1 );
						selector = seed.length && toSelector( tokens );
						if ( !selector ) {
							push.apply( results, seed );
							return results;
						}

						break;
					}
				}
			}
		}
	}

	// Compile and execute a filtering function
	// Provide `match` to avoid retokenization if we modified the selector above
	compile( selector, match )(
		seed,
		context,
		!documentIsHTML,
		results,
		rsibling.test( selector )
	);
	return results;
}

// One-time assignments

// Sort stability
support.sortStable = expando.split("").sort( sortOrder ).join("") === expando;

// Support: Chrome<14
// Always assume duplicates if they aren't passed to the comparison function
support.detectDuplicates = hasDuplicate;

// Initialize against the default document
setDocument();

// Support: Webkit<537.32 - Safari 6.0.3/Chrome 25 (fixed in Chrome 27)
// Detached nodes confoundingly follow *each other*
support.sortDetached = assert(function( div1 ) {
	// Should return 1, but returns 4 (following)
	return div1.compareDocumentPosition( document.createElement("div") ) & 1;
});

// Support: IE<8
// Prevent attribute/property "interpolation"
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !assert(function( div ) {
	div.innerHTML = "<a href='#'></a>";
	return div.firstChild.getAttribute("href") === "#" ;
}) ) {
	addHandle( "type|href|height|width", function( elem, name, isXML ) {
		if ( !isXML ) {
			return elem.getAttribute( name, name.toLowerCase() === "type" ? 1 : 2 );
		}
	});
}

// Support: IE<9
// Use defaultValue in place of getAttribute("value")
if ( !support.attributes || !assert(function( div ) {
	div.innerHTML = "<input/>";
	div.firstChild.setAttribute( "value", "" );
	return div.firstChild.getAttribute( "value" ) === "";
}) ) {
	addHandle( "value", function( elem, name, isXML ) {
		if ( !isXML && elem.nodeName.toLowerCase() === "input" ) {
			return elem.defaultValue;
		}
	});
}

// Support: IE<9
// Use getAttributeNode to fetch booleans when getAttribute lies
if ( !assert(function( div ) {
	return div.getAttribute("disabled") == null;
}) ) {
	addHandle( booleans, function( elem, name, isXML ) {
		var val;
		if ( !isXML ) {
			return (val = elem.getAttributeNode( name )) && val.specified ?
				val.value :
				elem[ name ] === true ? name.toLowerCase() : null;
		}
	});
}

jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr[":"] = jQuery.expr.pseudos;
jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;


})( window );
// String to Object options format cache
var optionsCache = {};

// Convert String-formatted options into Object-formatted ones and store in cache
function createOptions( options ) {
	var object = optionsCache[ options ] = {};
	jQuery.each( options.match( core_rnotwhite ) || [], function( _, flag ) {
		object[ flag ] = true;
	});
	return object;
}

/*
 * Create a callback list using the following parameters:
 *
 *	options: an optional list of space-separated options that will change how
 *			the callback list behaves or a more traditional option object
 *
 * By default a callback list will act like an event callback list and can be
 * "fired" multiple times.
 *
 * Possible options:
 *
 *	once:			will ensure the callback list can only be fired once (like a Deferred)
 *
 *	memory:			will keep track of previous values and will call any callback added
 *					after the list has been fired right away with the latest "memorized"
 *					values (like a Deferred)
 *
 *	unique:			will ensure a callback can only be added once (no duplicate in the list)
 *
 *	stopOnFalse:	interrupt callings when a callback returns false
 *
 */
jQuery.Callbacks = function( options ) {

	// Convert options from String-formatted to Object-formatted if needed
	// (we check in cache first)
	options = typeof options === "string" ?
		( optionsCache[ options ] || createOptions( options ) ) :
		jQuery.extend( {}, options );

	var // Flag to know if list is currently firing
		firing,
		// Last fire value (for non-forgettable lists)
		memory,
		// Flag to know if list was already fired
		fired,
		// End of the loop when firing
		firingLength,
		// Index of currently firing callback (modified by remove if needed)
		firingIndex,
		// First callback to fire (used internally by add and fireWith)
		firingStart,
		// Actual callback list
		list = [],
		// Stack of fire calls for repeatable lists
		stack = !options.once && [],
		// Fire callbacks
		fire = function( data ) {
			memory = options.memory && data;
			fired = true;
			firingIndex = firingStart || 0;
			firingStart = 0;
			firingLength = list.length;
			firing = true;
			for ( ; list && firingIndex < firingLength; firingIndex++ ) {
				if ( list[ firingIndex ].apply( data[ 0 ], data[ 1 ] ) === false && options.stopOnFalse ) {
					memory = false; // To prevent further calls using add
					break;
				}
			}
			firing = false;
			if ( list ) {
				if ( stack ) {
					if ( stack.length ) {
						fire( stack.shift() );
					}
				} else if ( memory ) {
					list = [];
				} else {
					self.disable();
				}
			}
		},
		// Actual Callbacks object
		self = {
			// Add a callback or a collection of callbacks to the list
			add: function() {
				if ( list ) {
					// First, we save the current length
					var start = list.length;
					(function add( args ) {
						jQuery.each( args, function( _, arg ) {
							var type = jQuery.type( arg );
							if ( type === "function" ) {
								if ( !options.unique || !self.has( arg ) ) {
									list.push( arg );
								}
							} else if ( arg && arg.length && type !== "string" ) {
								// Inspect recursively
								add( arg );
							}
						});
					})( arguments );
					// Do we need to add the callbacks to the
					// current firing batch?
					if ( firing ) {
						firingLength = list.length;
					// With memory, if we're not firing then
					// we should call right away
					} else if ( memory ) {
						firingStart = start;
						fire( memory );
					}
				}
				return this;
			},
			// Remove a callback from the list
			remove: function() {
				if ( list ) {
					jQuery.each( arguments, function( _, arg ) {
						var index;
						while( ( index = jQuery.inArray( arg, list, index ) ) > -1 ) {
							list.splice( index, 1 );
							// Handle firing indexes
							if ( firing ) {
								if ( index <= firingLength ) {
									firingLength--;
								}
								if ( index <= firingIndex ) {
									firingIndex--;
								}
							}
						}
					});
				}
				return this;
			},
			// Check if a given callback is in the list.
			// If no argument is given, return whether or not list has callbacks attached.
			has: function( fn ) {
				return fn ? jQuery.inArray( fn, list ) > -1 : !!( list && list.length );
			},
			// Remove all callbacks from the list
			empty: function() {
				list = [];
				firingLength = 0;
				return this;
			},
			// Have the list do nothing anymore
			disable: function() {
				list = stack = memory = undefined;
				return this;
			},
			// Is it disabled?
			disabled: function() {
				return !list;
			},
			// Lock the list in its current state
			lock: function() {
				stack = undefined;
				if ( !memory ) {
					self.disable();
				}
				return this;
			},
			// Is it locked?
			locked: function() {
				return !stack;
			},
			// Call all callbacks with the given context and arguments
			fireWith: function( context, args ) {
				if ( list && ( !fired || stack ) ) {
					args = args || [];
					args = [ context, args.slice ? args.slice() : args ];
					if ( firing ) {
						stack.push( args );
					} else {
						fire( args );
					}
				}
				return this;
			},
			// Call all the callbacks with the given arguments
			fire: function() {
				self.fireWith( this, arguments );
				return this;
			},
			// To know if the callbacks have already been called at least once
			fired: function() {
				return !!fired;
			}
		};

	return self;
};
jQuery.extend({

	Deferred: function( func ) {
		var tuples = [
				// action, add listener, listener list, final state
				[ "resolve", "done", jQuery.Callbacks("once memory"), "resolved" ],
				[ "reject", "fail", jQuery.Callbacks("once memory"), "rejected" ],
				[ "notify", "progress", jQuery.Callbacks("memory") ]
			],
			state = "pending",
			promise = {
				state: function() {
					return state;
				},
				always: function() {
					deferred.done( arguments ).fail( arguments );
					return this;
				},
				then: function( /* fnDone, fnFail, fnProgress */ ) {
					var fns = arguments;
					return jQuery.Deferred(function( newDefer ) {
						jQuery.each( tuples, function( i, tuple ) {
							var action = tuple[ 0 ],
								fn = jQuery.isFunction( fns[ i ] ) && fns[ i ];
							// deferred[ done | fail | progress ] for forwarding actions to newDefer
							deferred[ tuple[1] ](function() {
								var returned = fn && fn.apply( this, arguments );
								if ( returned && jQuery.isFunction( returned.promise ) ) {
									returned.promise()
										.done( newDefer.resolve )
										.fail( newDefer.reject )
										.progress( newDefer.notify );
								} else {
									newDefer[ action + "With" ]( this === promise ? newDefer.promise() : this, fn ? [ returned ] : arguments );
								}
							});
						});
						fns = null;
					}).promise();
				},
				// Get a promise for this deferred
				// If obj is provided, the promise aspect is added to the object
				promise: function( obj ) {
					return obj != null ? jQuery.extend( obj, promise ) : promise;
				}
			},
			deferred = {};

		// Keep pipe for back-compat
		promise.pipe = promise.then;

		// Add list-specific methods
		jQuery.each( tuples, function( i, tuple ) {
			var list = tuple[ 2 ],
				stateString = tuple[ 3 ];

			// promise[ done | fail | progress ] = list.add
			promise[ tuple[1] ] = list.add;

			// Handle state
			if ( stateString ) {
				list.add(function() {
					// state = [ resolved | rejected ]
					state = stateString;

				// [ reject_list | resolve_list ].disable; progress_list.lock
				}, tuples[ i ^ 1 ][ 2 ].disable, tuples[ 2 ][ 2 ].lock );
			}

			// deferred[ resolve | reject | notify ]
			deferred[ tuple[0] ] = function() {
				deferred[ tuple[0] + "With" ]( this === deferred ? promise : this, arguments );
				return this;
			};
			deferred[ tuple[0] + "With" ] = list.fireWith;
		});

		// Make the deferred a promise
		promise.promise( deferred );

		// Call given func if any
		if ( func ) {
			func.call( deferred, deferred );
		}

		// All done!
		return deferred;
	},

	// Deferred helper
	when: function( subordinate /* , ..., subordinateN */ ) {
		var i = 0,
			resolveValues = core_slice.call( arguments ),
			length = resolveValues.length,

			// the count of uncompleted subordinates
			remaining = length !== 1 || ( subordinate && jQuery.isFunction( subordinate.promise ) ) ? length : 0,

			// the master Deferred. If resolveValues consist of only a single Deferred, just use that.
			deferred = remaining === 1 ? subordinate : jQuery.Deferred(),

			// Update function for both resolve and progress values
			updateFunc = function( i, contexts, values ) {
				return function( value ) {
					contexts[ i ] = this;
					values[ i ] = arguments.length > 1 ? core_slice.call( arguments ) : value;
					if( values === progressValues ) {
						deferred.notifyWith( contexts, values );
					} else if ( !( --remaining ) ) {
						deferred.resolveWith( contexts, values );
					}
				};
			},

			progressValues, progressContexts, resolveContexts;

		// add listeners to Deferred subordinates; treat others as resolved
		if ( length > 1 ) {
			progressValues = new Array( length );
			progressContexts = new Array( length );
			resolveContexts = new Array( length );
			for ( ; i < length; i++ ) {
				if ( resolveValues[ i ] && jQuery.isFunction( resolveValues[ i ].promise ) ) {
					resolveValues[ i ].promise()
						.done( updateFunc( i, resolveContexts, resolveValues ) )
						.fail( deferred.reject )
						.progress( updateFunc( i, progressContexts, progressValues ) );
				} else {
					--remaining;
				}
			}
		}

		// if we're not waiting on anything, resolve the master
		if ( !remaining ) {
			deferred.resolveWith( resolveContexts, resolveValues );
		}

		return deferred.promise();
	}
});
jQuery.support = (function( support ) {

	var all, a, input, select, fragment, opt, eventName, isSupported, i,
		div = document.createElement("div");

	// Setup
	div.setAttribute( "className", "t" );
	div.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>";

	// Finish early in limited (non-browser) environments
	all = div.getElementsByTagName("*") || [];
	a = div.getElementsByTagName("a")[ 0 ];
	if ( !a || !a.style || !all.length ) {
		return support;
	}

	// First batch of tests
	select = document.createElement("select");
	opt = select.appendChild( document.createElement("option") );
	input = div.getElementsByTagName("input")[ 0 ];

	a.style.cssText = "top:1px;float:left;opacity:.5";

	// Test setAttribute on camelCase class. If it works, we need attrFixes when doing get/setAttribute (ie6/7)
	support.getSetAttribute = div.className !== "t";

	// IE strips leading whitespace when .innerHTML is used
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	// Make sure that tbody elements aren't automatically inserted
	// IE will insert them into empty tables
	support.tbody = !div.getElementsByTagName("tbody").length;

	// Make sure that link elements get serialized correctly by innerHTML
	// This requires a wrapper element in IE
	support.htmlSerialize = !!div.getElementsByTagName("link").length;

	// Get the style information from getAttribute
	// (IE uses .cssText instead)
	support.style = /top/.test( a.getAttribute("style") );

	// Make sure that URLs aren't manipulated
	// (IE normalizes it by default)
	support.hrefNormalized = a.getAttribute("href") === "/a";

	// Make sure that element opacity exists
	// (IE uses filter instead)
	// Use a regex to work around a WebKit issue. See #5145
	support.opacity = /^0.5/.test( a.style.opacity );

	// Verify style float existence
	// (IE uses styleFloat instead of cssFloat)
	support.cssFloat = !!a.style.cssFloat;

	// Check the default checkbox/radio value ("" on WebKit; "on" elsewhere)
	support.checkOn = !!input.value;

	// Make sure that a selected-by-default option has a working selected property.
	// (WebKit defaults to false instead of true, IE too, if it's in an optgroup)
	support.optSelected = opt.selected;

	// Tests for enctype support on a form (#6743)
	support.enctype = !!document.createElement("form").enctype;

	// Makes sure cloning an html5 element does not cause problems
	// Where outerHTML is undefined, this still works
	support.html5Clone = document.createElement("nav").cloneNode( true ).outerHTML !== "<:nav></:nav>";

	// Will be defined later
	support.inlineBlockNeedsLayout = false;
	support.shrinkWrapBlocks = false;
	support.pixelPosition = false;
	support.deleteExpando = true;
	support.noCloneEvent = true;
	support.reliableMarginRight = true;
	support.boxSizingReliable = true;

	// Make sure checked status is properly cloned
	input.checked = true;
	support.noCloneChecked = input.cloneNode( true ).checked;

	// Make sure that the options inside disabled selects aren't marked as disabled
	// (WebKit marks them as disabled)
	select.disabled = true;
	support.optDisabled = !opt.disabled;

	// Support: IE<9
	try {
		delete div.test;
	} catch( e ) {
		support.deleteExpando = false;
	}

	// Check if we can trust getAttribute("value")
	input = document.createElement("input");
	input.setAttribute( "value", "" );
	support.input = input.getAttribute( "value" ) === "";

	// Check if an input maintains its value after becoming a radio
	input.value = "t";
	input.setAttribute( "type", "radio" );
	support.radioValue = input.value === "t";

	// #11217 - WebKit loses check when the name is after the checked attribute
	input.setAttribute( "checked", "t" );
	input.setAttribute( "name", "t" );

	fragment = document.createDocumentFragment();
	fragment.appendChild( input );

	// Check if a disconnected checkbox will retain its checked
	// value of true after appended to the DOM (IE6/7)
	support.appendChecked = input.checked;

	// WebKit doesn't clone checked state correctly in fragments
	support.checkClone = fragment.cloneNode( true ).cloneNode( true ).lastChild.checked;

	// Support: IE<9
	// Opera does not clone events (and typeof div.attachEvent === undefined).
	// IE9-10 clones events bound via attachEvent, but they don't trigger with .click()
	if ( div.attachEvent ) {
		div.attachEvent( "onclick", function() {
			support.noCloneEvent = false;
		});

		div.cloneNode( true ).click();
	}

	// Support: IE<9 (lack submit/change bubble), Firefox 17+ (lack focusin event)
	// Beware of CSP restrictions (https://developer.mozilla.org/en/Security/CSP)
	for ( i in { submit: true, change: true, focusin: true }) {
		div.setAttribute( eventName = "on" + i, "t" );

		support[ i + "Bubbles" ] = eventName in window || div.attributes[ eventName ].expando === false;
	}

	div.style.backgroundClip = "content-box";
	div.cloneNode( true ).style.backgroundClip = "";
	support.clearCloneStyle = div.style.backgroundClip === "content-box";

	// Support: IE<9
	// Iteration over object's inherited properties before its own.
	for ( i in jQuery( support ) ) {
		break;
	}
	support.ownLast = i !== "0";

	// Run tests that need a body at doc ready
	jQuery(function() {
		var container, marginDiv, tds,
			divReset = "padding:0;margin:0;border:0;display:block;box-sizing:content-box;-moz-box-sizing:content-box;-webkit-box-sizing:content-box;",
			body = document.getElementsByTagName("body")[0];

		if ( !body ) {
			// Return for frameset docs that don't have a body
			return;
		}

		container = document.createElement("div");
		container.style.cssText = "border:0;width:0;height:0;position:absolute;top:0;left:-9999px;margin-top:1px";

		body.appendChild( container ).appendChild( div );

		// Support: IE8
		// Check if table cells still have offsetWidth/Height when they are set
		// to display:none and there are still other visible table cells in a
		// table row; if so, offsetWidth/Height are not reliable for use when
		// determining if an element has been hidden directly using
		// display:none (it is still safe to use offsets if a parent element is
		// hidden; don safety goggles and see bug #4512 for more information).
		div.innerHTML = "<table><tr><td></td><td>t</td></tr></table>";
		tds = div.getElementsByTagName("td");
		tds[ 0 ].style.cssText = "padding:0;margin:0;border:0;display:none";
		isSupported = ( tds[ 0 ].offsetHeight === 0 );

		tds[ 0 ].style.display = "";
		tds[ 1 ].style.display = "none";

		// Support: IE8
		// Check if empty table cells still have offsetWidth/Height
		support.reliableHiddenOffsets = isSupported && ( tds[ 0 ].offsetHeight === 0 );

		// Check box-sizing and margin behavior.
		div.innerHTML = "";
		div.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;";

		// Workaround failing boxSizing test due to offsetWidth returning wrong value
		// with some non-1 values of body zoom, ticket #13543
		jQuery.swap( body, body.style.zoom != null ? { zoom: 1 } : {}, function() {
			support.boxSizing = div.offsetWidth === 4;
		});

		// Use window.getComputedStyle because jsdom on node.js will break without it.
		if ( window.getComputedStyle ) {
			support.pixelPosition = ( window.getComputedStyle( div, null ) || {} ).top !== "1%";
			support.boxSizingReliable = ( window.getComputedStyle( div, null ) || { width: "4px" } ).width === "4px";

			// Check if div with explicit width and no margin-right incorrectly
			// gets computed margin-right based on width of container. (#3333)
			// Fails in WebKit before Feb 2011 nightlies
			// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
			marginDiv = div.appendChild( document.createElement("div") );
			marginDiv.style.cssText = div.style.cssText = divReset;
			marginDiv.style.marginRight = marginDiv.style.width = "0";
			div.style.width = "1px";

			support.reliableMarginRight =
				!parseFloat( ( window.getComputedStyle( marginDiv, null ) || {} ).marginRight );
		}

		if ( typeof div.style.zoom !== core_strundefined ) {
			// Support: IE<8
			// Check if natively block-level elements act like inline-block
			// elements when setting their display to 'inline' and giving
			// them layout
			div.innerHTML = "";
			div.style.cssText = divReset + "width:1px;padding:1px;display:inline;zoom:1";
			support.inlineBlockNeedsLayout = ( div.offsetWidth === 3 );

			// Support: IE6
			// Check if elements with layout shrink-wrap their children
			div.style.display = "block";
			div.innerHTML = "<div></div>";
			div.firstChild.style.width = "5px";
			support.shrinkWrapBlocks = ( div.offsetWidth !== 3 );

			if ( support.inlineBlockNeedsLayout ) {
				// Prevent IE 6 from affecting layout for positioned elements #11048
				// Prevent IE from shrinking the body in IE 7 mode #12869
				// Support: IE<8
				body.style.zoom = 1;
			}
		}

		body.removeChild( container );

		// Null elements to avoid leaks in IE
		container = div = tds = marginDiv = null;
	});

	// Null elements to avoid leaks in IE
	all = select = fragment = opt = a = input = null;

	return support;
})({});

var rbrace = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	rmultiDash = /([A-Z])/g;

function internalData( elem, name, data, pvt /* Internal Use Only */ ){
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var ret, thisCache,
		internalKey = jQuery.expando,

		// We have to handle DOM nodes and JS objects differently because IE6-7
		// can't GC object references properly across the DOM-JS boundary
		isNode = elem.nodeType,

		// Only DOM nodes need the global jQuery cache; JS object data is
		// attached directly to the object so GC can occur automatically
		cache = isNode ? jQuery.cache : elem,

		// Only defining an ID for JS objects if its cache already exists allows
		// the code to shortcut on the same path as a DOM node with no cache
		id = isNode ? elem[ internalKey ] : elem[ internalKey ] && internalKey;

	// Avoid doing any more work than we need to when trying to get data on an
	// object that has no data at all
	if ( (!id || !cache[id] || (!pvt && !cache[id].data)) && data === undefined && typeof name === "string" ) {
		return;
	}

	if ( !id ) {
		// Only DOM nodes need a new unique ID for each element since their data
		// ends up in the global cache
		if ( isNode ) {
			id = elem[ internalKey ] = core_deletedIds.pop() || jQuery.guid++;
		} else {
			id = internalKey;
		}
	}

	if ( !cache[ id ] ) {
		// Avoid exposing jQuery metadata on plain JS objects when the object
		// is serialized using JSON.stringify
		cache[ id ] = isNode ? {} : { toJSON: jQuery.noop };
	}

	// An object can be passed to jQuery.data instead of a key/value pair; this gets
	// shallow copied over onto the existing cache
	if ( typeof name === "object" || typeof name === "function" ) {
		if ( pvt ) {
			cache[ id ] = jQuery.extend( cache[ id ], name );
		} else {
			cache[ id ].data = jQuery.extend( cache[ id ].data, name );
		}
	}

	thisCache = cache[ id ];

	// jQuery data() is stored in a separate object inside the object's internal data
	// cache in order to avoid key collisions between internal data and user-defined
	// data.
	if ( !pvt ) {
		if ( !thisCache.data ) {
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if ( data !== undefined ) {
		thisCache[ jQuery.camelCase( name ) ] = data;
	}

	// Check for both converted-to-camel and non-converted data property names
	// If a data property was specified
	if ( typeof name === "string" ) {

		// First Try to find as-is property data
		ret = thisCache[ name ];

		// Test for null|undefined property data
		if ( ret == null ) {

			// Try to find the camelCased property
			ret = thisCache[ jQuery.camelCase( name ) ];
		}
	} else {
		ret = thisCache;
	}

	return ret;
}

function internalRemoveData( elem, name, pvt ) {
	if ( !jQuery.acceptData( elem ) ) {
		return;
	}

	var thisCache, i,
		isNode = elem.nodeType,

		// See jQuery.data for more information
		cache = isNode ? jQuery.cache : elem,
		id = isNode ? elem[ jQuery.expando ] : jQuery.expando;

	// If there is already no cache entry for this object, there is no
	// purpose in continuing
	if ( !cache[ id ] ) {
		return;
	}

	if ( name ) {

		thisCache = pvt ? cache[ id ] : cache[ id ].data;

		if ( thisCache ) {

			// Support array or space separated string names for data keys
			if ( !jQuery.isArray( name ) ) {

				// try the string as a key before any manipulation
				if ( name in thisCache ) {
					name = [ name ];
				} else {

					// split the camel cased version by spaces unless a key with the spaces exists
					name = jQuery.camelCase( name );
					if ( name in thisCache ) {
						name = [ name ];
					} else {
						name = name.split(" ");
					}
				}
			} else {
				// If "name" is an array of keys...
				// When data is initially created, via ("key", "val") signature,
				// keys will be converted to camelCase.
				// Since there is no way to tell _how_ a key was added, remove
				// both plain key and camelCase key. #12786
				// This will only penalize the array argument path.
				name = name.concat( jQuery.map( name, jQuery.camelCase ) );
			}

			i = name.length;
			while ( i-- ) {
				delete thisCache[ name[i] ];
			}

			// If there is no data left in the cache, we want to continue
			// and let the cache object itself get destroyed
			if ( pvt ? !isEmptyDataObject(thisCache) : !jQuery.isEmptyObject(thisCache) ) {
				return;
			}
		}
	}

	// See jQuery.data for more information
	if ( !pvt ) {
		delete cache[ id ].data;

		// Don't destroy the parent cache unless the internal data object
		// had been the only thing left in it
		if ( !isEmptyDataObject( cache[ id ] ) ) {
			return;
		}
	}

	// Destroy the cache
	if ( isNode ) {
		jQuery.cleanData( [ elem ], true );

	// Use delete when supported for expandos or `cache` is not a window per isWindow (#10080)
	/* jshint eqeqeq: false */
	} else if ( jQuery.support.deleteExpando || cache != cache.window ) {
		/* jshint eqeqeq: true */
		delete cache[ id ];

	// When all else fails, null
	} else {
		cache[ id ] = null;
	}
}

jQuery.extend({
	cache: {},

	// The following elements throw uncatchable exceptions if you
	// attempt to add expando properties to them.
	noData: {
		"applet": true,
		"embed": true,
		// Ban all objects except for Flash (which handle expandos)
		"object": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
	},

	hasData: function( elem ) {
		elem = elem.nodeType ? jQuery.cache[ elem[jQuery.expando] ] : elem[ jQuery.expando ];
		return !!elem && !isEmptyDataObject( elem );
	},

	data: function( elem, name, data ) {
		return internalData( elem, name, data );
	},

	removeData: function( elem, name ) {
		return internalRemoveData( elem, name );
	},

	// For internal use only.
	_data: function( elem, name, data ) {
		return internalData( elem, name, data, true );
	},

	_removeData: function( elem, name ) {
		return internalRemoveData( elem, name, true );
	},

	// A method for determining if a DOM node can handle the data expando
	acceptData: function( elem ) {
		// Do not set data on non-element because it will not be cleared (#8335).
		if ( elem.nodeType && elem.nodeType !== 1 && elem.nodeType !== 9 ) {
			return false;
		}

		var noData = elem.nodeName && jQuery.noData[ elem.nodeName.toLowerCase() ];

		// nodes accept data unless otherwise specified; rejection can be conditional
		return !noData || noData !== true && elem.getAttribute("classid") === noData;
	}
});

jQuery.fn.extend({
	data: function( key, value ) {
		var attrs, name,
			data = null,
			i = 0,
			elem = this[0];

		// Special expections of .data basically thwart jQuery.access,
		// so implement the relevant behavior ourselves

		// Gets all values
		if ( key === undefined ) {
			if ( this.length ) {
				data = jQuery.data( elem );

				if ( elem.nodeType === 1 && !jQuery._data( elem, "parsedAttrs" ) ) {
					attrs = elem.attributes;
					for ( ; i < attrs.length; i++ ) {
						name = attrs[i].name;

						if ( name.indexOf("data-") === 0 ) {
							name = jQuery.camelCase( name.slice(5) );

							dataAttr( elem, name, data[ name ] );
						}
					}
					jQuery._data( elem, "parsedAttrs", true );
				}
			}

			return data;
		}

		// Sets multiple values
		if ( typeof key === "object" ) {
			return this.each(function() {
				jQuery.data( this, key );
			});
		}

		return arguments.length > 1 ?

			// Sets one value
			this.each(function() {
				jQuery.data( this, key, value );
			}) :

			// Gets one value
			// Try to fetch any internally stored data first
			elem ? dataAttr( elem, key, jQuery.data( elem, key ) ) : null;
	},

	removeData: function( key ) {
		return this.each(function() {
			jQuery.removeData( this, key );
		});
	}
});

function dataAttr( elem, key, data ) {
	// If nothing was found internally, try to fetch any
	// data from the HTML5 data-* attribute
	if ( data === undefined && elem.nodeType === 1 ) {

		var name = "data-" + key.replace( rmultiDash, "-$1" ).toLowerCase();

		data = elem.getAttribute( name );

		if ( typeof data === "string" ) {
			try {
				data = data === "true" ? true :
					data === "false" ? false :
					data === "null" ? null :
					// Only convert to a number if it doesn't change the string
					+data + "" === data ? +data :
					rbrace.test( data ) ? jQuery.parseJSON( data ) :
						data;
			} catch( e ) {}

			// Make sure we set the data so it isn't changed later
			jQuery.data( elem, key, data );

		} else {
			data = undefined;
		}
	}

	return data;
}

// checks a cache object for emptiness
function isEmptyDataObject( obj ) {
	var name;
	for ( name in obj ) {

		// if the public data object is empty, the private is still empty
		if ( name === "data" && jQuery.isEmptyObject( obj[name] ) ) {
			continue;
		}
		if ( name !== "toJSON" ) {
			return false;
		}
	}

	return true;
}
jQuery.extend({
	queue: function( elem, type, data ) {
		var queue;

		if ( elem ) {
			type = ( type || "fx" ) + "queue";
			queue = jQuery._data( elem, type );

			// Speed up dequeue by getting out quickly if this is just a lookup
			if ( data ) {
				if ( !queue || jQuery.isArray(data) ) {
					queue = jQuery._data( elem, type, jQuery.makeArray(data) );
				} else {
					queue.push( data );
				}
			}
			return queue || [];
		}
	},

	dequeue: function( elem, type ) {
		type = type || "fx";

		var queue = jQuery.queue( elem, type ),
			startLength = queue.length,
			fn = queue.shift(),
			hooks = jQuery._queueHooks( elem, type ),
			next = function() {
				jQuery.dequeue( elem, type );
			};

		// If the fx queue is dequeued, always remove the progress sentinel
		if ( fn === "inprogress" ) {
			fn = queue.shift();
			startLength--;
		}

		if ( fn ) {

			// Add a progress sentinel to prevent the fx queue from being
			// automatically dequeued
			if ( type === "fx" ) {
				queue.unshift( "inprogress" );
			}

			// clear up the last queue stop function
			delete hooks.stop;
			fn.call( elem, next, hooks );
		}

		if ( !startLength && hooks ) {
			hooks.empty.fire();
		}
	},

	// not intended for public consumption - generates a queueHooks object, or returns the current one
	_queueHooks: function( elem, type ) {
		var key = type + "queueHooks";
		return jQuery._data( elem, key ) || jQuery._data( elem, key, {
			empty: jQuery.Callbacks("once memory").add(function() {
				jQuery._removeData( elem, type + "queue" );
				jQuery._removeData( elem, key );
			})
		});
	}
});

jQuery.fn.extend({
	queue: function( type, data ) {
		var setter = 2;

		if ( typeof type !== "string" ) {
			data = type;
			type = "fx";
			setter--;
		}

		if ( arguments.length < setter ) {
			return jQuery.queue( this[0], type );
		}

		return data === undefined ?
			this :
			this.each(function() {
				var queue = jQuery.queue( this, type, data );

				// ensure a hooks for this queue
				jQuery._queueHooks( this, type );

				if ( type === "fx" && queue[0] !== "inprogress" ) {
					jQuery.dequeue( this, type );
				}
			});
	},
	dequeue: function( type ) {
		return this.each(function() {
			jQuery.dequeue( this, type );
		});
	},
	// Based off of the plugin by Clint Helfers, with permission.
	// http://blindsignals.com/index.php/2009/07/jquery-delay/
	delay: function( time, type ) {
		time = jQuery.fx ? jQuery.fx.speeds[ time ] || time : time;
		type = type || "fx";

		return this.queue( type, function( next, hooks ) {
			var timeout = setTimeout( next, time );
			hooks.stop = function() {
				clearTimeout( timeout );
			};
		});
	},
	clearQueue: function( type ) {
		return this.queue( type || "fx", [] );
	},
	// Get a promise resolved when queues of a certain type
	// are emptied (fx is the type by default)
	promise: function( type, obj ) {
		var tmp,
			count = 1,
			defer = jQuery.Deferred(),
			elements = this,
			i = this.length,
			resolve = function() {
				if ( !( --count ) ) {
					defer.resolveWith( elements, [ elements ] );
				}
			};

		if ( typeof type !== "string" ) {
			obj = type;
			type = undefined;
		}
		type = type || "fx";

		while( i-- ) {
			tmp = jQuery._data( elements[ i ], type + "queueHooks" );
			if ( tmp && tmp.empty ) {
				count++;
				tmp.empty.add( resolve );
			}
		}
		resolve();
		return defer.promise( obj );
	}
});
var nodeHook, boolHook,
	rclass = /[\t\r\n\f]/g,
	rreturn = /\r/g,
	rfocusable = /^(?:input|select|textarea|button|object)$/i,
	rclickable = /^(?:a|area)$/i,
	ruseDefault = /^(?:checked|selected)$/i,
	getSetAttribute = jQuery.support.getSetAttribute,
	getSetInput = jQuery.support.input;

jQuery.fn.extend({
	attr: function( name, value ) {
		return jQuery.access( this, jQuery.attr, name, value, arguments.length > 1 );
	},

	removeAttr: function( name ) {
		return this.each(function() {
			jQuery.removeAttr( this, name );
		});
	},

	prop: function( name, value ) {
		return jQuery.access( this, jQuery.prop, name, value, arguments.length > 1 );
	},

	removeProp: function( name ) {
		name = jQuery.propFix[ name ] || name;
		return this.each(function() {
			// try/catch handles cases where IE balks (such as removing a property on window)
			try {
				this[ name ] = undefined;
				delete this[ name ];
			} catch( e ) {}
		});
	},

	addClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).addClass( value.call( this, j, this.className ) );
			});
		}

		if ( proceed ) {
			// The disjunction here is for better compressibility (see removeClass)
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					" "
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						if ( cur.indexOf( " " + clazz + " " ) < 0 ) {
							cur += clazz + " ";
						}
					}
					elem.className = jQuery.trim( cur );

				}
			}
		}

		return this;
	},

	removeClass: function( value ) {
		var classes, elem, cur, clazz, j,
			i = 0,
			len = this.length,
			proceed = arguments.length === 0 || typeof value === "string" && value;

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( j ) {
				jQuery( this ).removeClass( value.call( this, j, this.className ) );
			});
		}
		if ( proceed ) {
			classes = ( value || "" ).match( core_rnotwhite ) || [];

			for ( ; i < len; i++ ) {
				elem = this[ i ];
				// This expression is here for better compressibility (see addClass)
				cur = elem.nodeType === 1 && ( elem.className ?
					( " " + elem.className + " " ).replace( rclass, " " ) :
					""
				);

				if ( cur ) {
					j = 0;
					while ( (clazz = classes[j++]) ) {
						// Remove *all* instances
						while ( cur.indexOf( " " + clazz + " " ) >= 0 ) {
							cur = cur.replace( " " + clazz + " ", " " );
						}
					}
					elem.className = value ? jQuery.trim( cur ) : "";
				}
			}
		}

		return this;
	},

	toggleClass: function( value, stateVal ) {
		var type = typeof value;

		if ( typeof stateVal === "boolean" && type === "string" ) {
			return stateVal ? this.addClass( value ) : this.removeClass( value );
		}

		if ( jQuery.isFunction( value ) ) {
			return this.each(function( i ) {
				jQuery( this ).toggleClass( value.call(this, i, this.className, stateVal), stateVal );
			});
		}

		return this.each(function() {
			if ( type === "string" ) {
				// toggle individual class names
				var className,
					i = 0,
					self = jQuery( this ),
					classNames = value.match( core_rnotwhite ) || [];

				while ( (className = classNames[ i++ ]) ) {
					// check each className given, space separated list
					if ( self.hasClass( className ) ) {
						self.removeClass( className );
					} else {
						self.addClass( className );
					}
				}

			// Toggle whole class name
			} else if ( type === core_strundefined || type === "boolean" ) {
				if ( this.className ) {
					// store className if set
					jQuery._data( this, "__className__", this.className );
				}

				// If the element has a class name or if we're passed "false",
				// then remove the whole classname (if there was one, the above saved it).
				// Otherwise bring back whatever was previously saved (if anything),
				// falling back to the empty string if nothing was stored.
				this.className = this.className || value === false ? "" : jQuery._data( this, "__className__" ) || "";
			}
		});
	},

	hasClass: function( selector ) {
		var className = " " + selector + " ",
			i = 0,
			l = this.length;
		for ( ; i < l; i++ ) {
			if ( this[i].nodeType === 1 && (" " + this[i].className + " ").replace(rclass, " ").indexOf( className ) >= 0 ) {
				return true;
			}
		}

		return false;
	},

	val: function( value ) {
		var ret, hooks, isFunction,
			elem = this[0];

		if ( !arguments.length ) {
			if ( elem ) {
				hooks = jQuery.valHooks[ elem.type ] || jQuery.valHooks[ elem.nodeName.toLowerCase() ];

				if ( hooks && "get" in hooks && (ret = hooks.get( elem, "value" )) !== undefined ) {
					return ret;
				}

				ret = elem.value;

				return typeof ret === "string" ?
					// handle most common string cases
					ret.replace(rreturn, "") :
					// handle cases where value is null/undef or number
					ret == null ? "" : ret;
			}

			return;
		}

		isFunction = jQuery.isFunction( value );

		return this.each(function( i ) {
			var val;

			if ( this.nodeType !== 1 ) {
				return;
			}

			if ( isFunction ) {
				val = value.call( this, i, jQuery( this ).val() );
			} else {
				val = value;
			}

			// Treat null/undefined as ""; convert numbers to string
			if ( val == null ) {
				val = "";
			} else if ( typeof val === "number" ) {
				val += "";
			} else if ( jQuery.isArray( val ) ) {
				val = jQuery.map(val, function ( value ) {
					return value == null ? "" : value + "";
				});
			}

			hooks = jQuery.valHooks[ this.type ] || jQuery.valHooks[ this.nodeName.toLowerCase() ];

			// If set returns undefined, fall back to normal setting
			if ( !hooks || !("set" in hooks) || hooks.set( this, val, "value" ) === undefined ) {
				this.value = val;
			}
		});
	}
});

jQuery.extend({
	valHooks: {
		option: {
			get: function( elem ) {
				// Use proper attribute retrieval(#6932, #12072)
				var val = jQuery.find.attr( elem, "value" );
				return val != null ?
					val :
					elem.text;
			}
		},
		select: {
			get: function( elem ) {
				var value, option,
					options = elem.options,
					index = elem.selectedIndex,
					one = elem.type === "select-one" || index < 0,
					values = one ? null : [],
					max = one ? index + 1 : options.length,
					i = index < 0 ?
						max :
						one ? index : 0;

				// Loop through all the selected options
				for ( ; i < max; i++ ) {
					option = options[ i ];

					// oldIE doesn't update selected after form reset (#2551)
					if ( ( option.selected || i === index ) &&
							// Don't return options that are disabled or in a disabled optgroup
							( jQuery.support.optDisabled ? !option.disabled : option.getAttribute("disabled") === null ) &&
							( !option.parentNode.disabled || !jQuery.nodeName( option.parentNode, "optgroup" ) ) ) {

						// Get the specific value for the option
						value = jQuery( option ).val();

						// We don't need an array for one selects
						if ( one ) {
							return value;
						}

						// Multi-Selects return an array
						values.push( value );
					}
				}

				return values;
			},

			set: function( elem, value ) {
				var optionSet, option,
					options = elem.options,
					values = jQuery.makeArray( value ),
					i = options.length;

				while ( i-- ) {
					option = options[ i ];
					if ( (option.selected = jQuery.inArray( jQuery(option).val(), values ) >= 0) ) {
						optionSet = true;
					}
				}

				// force browsers to behave consistently when non-matching value is set
				if ( !optionSet ) {
					elem.selectedIndex = -1;
				}
				return values;
			}
		}
	},

	attr: function( elem, name, value ) {
		var hooks, ret,
			nType = elem.nodeType;

		// don't get/set attributes on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		// Fallback to prop when attributes are not supported
		if ( typeof elem.getAttribute === core_strundefined ) {
			return jQuery.prop( elem, name, value );
		}

		// All attributes are lowercase
		// Grab necessary hook if one is defined
		if ( nType !== 1 || !jQuery.isXMLDoc( elem ) ) {
			name = name.toLowerCase();
			hooks = jQuery.attrHooks[ name ] ||
				( jQuery.expr.match.bool.test( name ) ? boolHook : nodeHook );
		}

		if ( value !== undefined ) {

			if ( value === null ) {
				jQuery.removeAttr( elem, name );

			} else if ( hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ) {
				return ret;

			} else {
				elem.setAttribute( name, value + "" );
				return value;
			}

		} else if ( hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ) {
			return ret;

		} else {
			ret = jQuery.find.attr( elem, name );

			// Non-existent attributes return null, we normalize to undefined
			return ret == null ?
				undefined :
				ret;
		}
	},

	removeAttr: function( elem, value ) {
		var name, propName,
			i = 0,
			attrNames = value && value.match( core_rnotwhite );

		if ( attrNames && elem.nodeType === 1 ) {
			while ( (name = attrNames[i++]) ) {
				propName = jQuery.propFix[ name ] || name;

				// Boolean attributes get special treatment (#10870)
				if ( jQuery.expr.match.bool.test( name ) ) {
					// Set corresponding property to false
					if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
						elem[ propName ] = false;
					// Support: IE<9
					// Also clear defaultChecked/defaultSelected (if appropriate)
					} else {
						elem[ jQuery.camelCase( "default-" + name ) ] =
							elem[ propName ] = false;
					}

				// See #9699 for explanation of this approach (setting first, then removal)
				} else {
					jQuery.attr( elem, name, "" );
				}

				elem.removeAttribute( getSetAttribute ? name : propName );
			}
		}
	},

	attrHooks: {
		type: {
			set: function( elem, value ) {
				if ( !jQuery.support.radioValue && value === "radio" && jQuery.nodeName(elem, "input") ) {
					// Setting the type on a radio button after the value resets the value in IE6-9
					// Reset value to default in case type is set after value during creation
					var val = elem.value;
					elem.setAttribute( "type", value );
					if ( val ) {
						elem.value = val;
					}
					return value;
				}
			}
		}
	},

	propFix: {
		"for": "htmlFor",
		"class": "className"
	},

	prop: function( elem, name, value ) {
		var ret, hooks, notxml,
			nType = elem.nodeType;

		// don't get/set properties on text, comment and attribute nodes
		if ( !elem || nType === 3 || nType === 8 || nType === 2 ) {
			return;
		}

		notxml = nType !== 1 || !jQuery.isXMLDoc( elem );

		if ( notxml ) {
			// Fix name and attach hooks
			name = jQuery.propFix[ name ] || name;
			hooks = jQuery.propHooks[ name ];
		}

		if ( value !== undefined ) {
			return hooks && "set" in hooks && (ret = hooks.set( elem, value, name )) !== undefined ?
				ret :
				( elem[ name ] = value );

		} else {
			return hooks && "get" in hooks && (ret = hooks.get( elem, name )) !== null ?
				ret :
				elem[ name ];
		}
	},

	propHooks: {
		tabIndex: {
			get: function( elem ) {
				// elem.tabIndex doesn't always return the correct value when it hasn't been explicitly set
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				// Use proper attribute retrieval(#12072)
				var tabindex = jQuery.find.attr( elem, "tabindex" );

				return tabindex ?
					parseInt( tabindex, 10 ) :
					rfocusable.test( elem.nodeName ) || rclickable.test( elem.nodeName ) && elem.href ?
						0 :
						-1;
			}
		}
	}
});

// Hooks for boolean attributes
boolHook = {
	set: function( elem, value, name ) {
		if ( value === false ) {
			// Remove boolean attributes when set to false
			jQuery.removeAttr( elem, name );
		} else if ( getSetInput && getSetAttribute || !ruseDefault.test( name ) ) {
			// IE<8 needs the *property* name
			elem.setAttribute( !getSetAttribute && jQuery.propFix[ name ] || name, name );

		// Use defaultChecked and defaultSelected for oldIE
		} else {
			elem[ jQuery.camelCase( "default-" + name ) ] = elem[ name ] = true;
		}

		return name;
	}
};
jQuery.each( jQuery.expr.match.bool.source.match( /\w+/g ), function( i, name ) {
	var getter = jQuery.expr.attrHandle[ name ] || jQuery.find.attr;

	jQuery.expr.attrHandle[ name ] = getSetInput && getSetAttribute || !ruseDefault.test( name ) ?
		function( elem, name, isXML ) {
			var fn = jQuery.expr.attrHandle[ name ],
				ret = isXML ?
					undefined :
					/* jshint eqeqeq: false */
					(jQuery.expr.attrHandle[ name ] = undefined) !=
						getter( elem, name, isXML ) ?

						name.toLowerCase() :
						null;
			jQuery.expr.attrHandle[ name ] = fn;
			return ret;
		} :
		function( elem, name, isXML ) {
			return isXML ?
				undefined :
				elem[ jQuery.camelCase( "default-" + name ) ] ?
					name.toLowerCase() :
					null;
		};
});

// fix oldIE attroperties
if ( !getSetInput || !getSetAttribute ) {
	jQuery.attrHooks.value = {
		set: function( elem, value, name ) {
			if ( jQuery.nodeName( elem, "input" ) ) {
				// Does not return so that setAttribute is also used
				elem.defaultValue = value;
			} else {
				// Use nodeHook if defined (#1954); otherwise setAttribute is fine
				return nodeHook && nodeHook.set( elem, value, name );
			}
		}
	};
}

// IE6/7 do not support getting/setting some attributes with get/setAttribute
if ( !getSetAttribute ) {

	// Use this for any attribute in IE6/7
	// This fixes almost every IE6/7 issue
	nodeHook = {
		set: function( elem, value, name ) {
			// Set the existing or create a new attribute node
			var ret = elem.getAttributeNode( name );
			if ( !ret ) {
				elem.setAttributeNode(
					(ret = elem.ownerDocument.createAttribute( name ))
				);
			}

			ret.value = value += "";

			// Break association with cloned elements by also using setAttribute (#9646)
			return name === "value" || value === elem.getAttribute( name ) ?
				value :
				undefined;
		}
	};
	jQuery.expr.attrHandle.id = jQuery.expr.attrHandle.name = jQuery.expr.attrHandle.coords =
		// Some attributes are constructed with empty-string values when not defined
		function( elem, name, isXML ) {
			var ret;
			return isXML ?
				undefined :
				(ret = elem.getAttributeNode( name )) && ret.value !== "" ?
					ret.value :
					null;
		};
	jQuery.valHooks.button = {
		get: function( elem, name ) {
			var ret = elem.getAttributeNode( name );
			return ret && ret.specified ?
				ret.value :
				undefined;
		},
		set: nodeHook.set
	};

	// Set contenteditable to false on removals(#10429)
	// Setting to empty string throws an error as an invalid value
	jQuery.attrHooks.contenteditable = {
		set: function( elem, value, name ) {
			nodeHook.set( elem, value === "" ? false : value, name );
		}
	};

	// Set width and height to auto instead of 0 on empty string( Bug #8150 )
	// This is for removals
	jQuery.each([ "width", "height" ], function( i, name ) {
		jQuery.attrHooks[ name ] = {
			set: function( elem, value ) {
				if ( value === "" ) {
					elem.setAttribute( name, "auto" );
					return value;
				}
			}
		};
	});
}


// Some attributes require a special call on IE
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if ( !jQuery.support.hrefNormalized ) {
	// href/src property should get the full normalized URL (#10299/#12915)
	jQuery.each([ "href", "src" ], function( i, name ) {
		jQuery.propHooks[ name ] = {
			get: function( elem ) {
				return elem.getAttribute( name, 4 );
			}
		};
	});
}

if ( !jQuery.support.style ) {
	jQuery.attrHooks.style = {
		get: function( elem ) {
			// Return undefined in the case of empty string
			// Note: IE uppercases css property names, but if we were to .toLowerCase()
			// .cssText, that would destroy case senstitivity in URL's, like in "background"
			return elem.style.cssText || undefined;
		},
		set: function( elem, value ) {
			return ( elem.style.cssText = value + "" );
		}
	};
}

// Safari mis-reports the default selected property of an option
// Accessing the parent's selectedIndex property fixes it
if ( !jQuery.support.optSelected ) {
	jQuery.propHooks.selected = {
		get: function( elem ) {
			var parent = elem.parentNode;

			if ( parent ) {
				parent.selectedIndex;

				// Make sure that it also works with optgroups, see #5701
				if ( parent.parentNode ) {
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}
	};
}

jQuery.each([
	"tabIndex",
	"readOnly",
	"maxLength",
	"cellSpacing",
	"cellPadding",
	"rowSpan",
	"colSpan",
	"useMap",
	"frameBorder",
	"contentEditable"
], function() {
	jQuery.propFix[ this.toLowerCase() ] = this;
});

// IE6/7 call enctype encoding
if ( !jQuery.support.enctype ) {
	jQuery.propFix.enctype = "encoding";
}

// Radios and checkboxes getter/setter
jQuery.each([ "radio", "checkbox" ], function() {
	jQuery.valHooks[ this ] = {
		set: function( elem, value ) {
			if ( jQuery.isArray( value ) ) {
				return ( elem.checked = jQuery.inArray( jQuery(elem).val(), value ) >= 0 );
			}
		}
	};
	if ( !jQuery.support.checkOn ) {
		jQuery.valHooks[ this ].get = function( elem ) {
			// Support: Webkit
			// "" is returned instead of "on" if a value isn't specified
			return elem.getAttribute("value") === null ? "on" : elem.value;
		};
	}
});
var rformElems = /^(?:input|select|textarea)$/i,
	rkeyEvent = /^key/,
	rmouseEvent = /^(?:mouse|contextmenu)|click/,
	rfocusMorph = /^(?:focusinfocus|focusoutblur)$/,
	rtypenamespace = /^([^.]*)(?:\.(.+)|)$/;

function returnTrue() {
	return true;
}

function returnFalse() {
	return false;
}

function safeActiveElement() {
	try {
		return document.activeElement;
	} catch ( err ) { }
}

/*
 * Helper functions for managing events -- not part of the public interface.
 * Props to Dean Edwards' addEvent library for many of the ideas.
 */
jQuery.event = {

	global: {},

	add: function( elem, types, handler, data, selector ) {
		var tmp, events, t, handleObjIn,
			special, eventHandle, handleObj,
			handlers, type, namespaces, origType,
			elemData = jQuery._data( elem );

		// Don't attach events to noData or text/comment nodes (but allow plain objects)
		if ( !elemData ) {
			return;
		}

		// Caller can pass in an object of custom data in lieu of the handler
		if ( handler.handler ) {
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		// Make sure that the handler has a unique ID, used to find/remove it later
		if ( !handler.guid ) {
			handler.guid = jQuery.guid++;
		}

		// Init the element's event structure and main handler, if this is the first
		if ( !(events = elemData.events) ) {
			events = elemData.events = {};
		}
		if ( !(eventHandle = elemData.handle) ) {
			eventHandle = elemData.handle = function( e ) {
				// Discard the second event of a jQuery.event.trigger() and
				// when an event is called after a page has unloaded
				return typeof jQuery !== core_strundefined && (!e || jQuery.event.triggered !== e.type) ?
					jQuery.event.dispatch.apply( eventHandle.elem, arguments ) :
					undefined;
			};
			// Add elem as a property of the handle fn to prevent a memory leak with IE non-native events
			eventHandle.elem = elem;
		}

		// Handle multiple events separated by a space
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// There *must* be a type, no attaching namespace-only handlers
			if ( !type ) {
				continue;
			}

			// If event changes its type, use the special event handlers for the changed type
			special = jQuery.event.special[ type ] || {};

			// If selector defined, determine special event api type, otherwise given type
			type = ( selector ? special.delegateType : special.bindType ) || type;

			// Update special based on newly reset type
			special = jQuery.event.special[ type ] || {};

			// handleObj is passed to all event handlers
			handleObj = jQuery.extend({
				type: type,
				origType: origType,
				data: data,
				handler: handler,
				guid: handler.guid,
				selector: selector,
				needsContext: selector && jQuery.expr.match.needsContext.test( selector ),
				namespace: namespaces.join(".")
			}, handleObjIn );

			// Init the event handler queue if we're the first
			if ( !(handlers = events[ type ]) ) {
				handlers = events[ type ] = [];
				handlers.delegateCount = 0;

				// Only use addEventListener/attachEvent if the special events handler returns false
				if ( !special.setup || special.setup.call( elem, data, namespaces, eventHandle ) === false ) {
					// Bind the global event handler to the element
					if ( elem.addEventListener ) {
						elem.addEventListener( type, eventHandle, false );

					} else if ( elem.attachEvent ) {
						elem.attachEvent( "on" + type, eventHandle );
					}
				}
			}

			if ( special.add ) {
				special.add.call( elem, handleObj );

				if ( !handleObj.handler.guid ) {
					handleObj.handler.guid = handler.guid;
				}
			}

			// Add to the element's handler list, delegates in front
			if ( selector ) {
				handlers.splice( handlers.delegateCount++, 0, handleObj );
			} else {
				handlers.push( handleObj );
			}

			// Keep track of which events have ever been used, for event optimization
			jQuery.event.global[ type ] = true;
		}

		// Nullify elem to prevent memory leaks in IE
		elem = null;
	},

	// Detach an event or set of events from an element
	remove: function( elem, types, handler, selector, mappedTypes ) {
		var j, handleObj, tmp,
			origCount, t, events,
			special, handlers, type,
			namespaces, origType,
			elemData = jQuery.hasData( elem ) && jQuery._data( elem );

		if ( !elemData || !(events = elemData.events) ) {
			return;
		}

		// Once for each type.namespace in types; type may be omitted
		types = ( types || "" ).match( core_rnotwhite ) || [""];
		t = types.length;
		while ( t-- ) {
			tmp = rtypenamespace.exec( types[t] ) || [];
			type = origType = tmp[1];
			namespaces = ( tmp[2] || "" ).split( "." ).sort();

			// Unbind all events (on this namespace, if provided) for the element
			if ( !type ) {
				for ( type in events ) {
					jQuery.event.remove( elem, type + types[ t ], handler, selector, true );
				}
				continue;
			}

			special = jQuery.event.special[ type ] || {};
			type = ( selector ? special.delegateType : special.bindType ) || type;
			handlers = events[ type ] || [];
			tmp = tmp[2] && new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" );

			// Remove matching events
			origCount = j = handlers.length;
			while ( j-- ) {
				handleObj = handlers[ j ];

				if ( ( mappedTypes || origType === handleObj.origType ) &&
					( !handler || handler.guid === handleObj.guid ) &&
					( !tmp || tmp.test( handleObj.namespace ) ) &&
					( !selector || selector === handleObj.selector || selector === "**" && handleObj.selector ) ) {
					handlers.splice( j, 1 );

					if ( handleObj.selector ) {
						handlers.delegateCount--;
					}
					if ( special.remove ) {
						special.remove.call( elem, handleObj );
					}
				}
			}

			// Remove generic event handler if we removed something and no more handlers exist
			// (avoids potential for endless recursion during removal of special event handlers)
			if ( origCount && !handlers.length ) {
				if ( !special.teardown || special.teardown.call( elem, namespaces, elemData.handle ) === false ) {
					jQuery.removeEvent( elem, type, elemData.handle );
				}

				delete events[ type ];
			}
		}

		// Remove the expando if it's no longer used
		if ( jQuery.isEmptyObject( events ) ) {
			delete elemData.handle;

			// removeData also checks for emptiness and clears the expando if empty
			// so use it instead of delete
			jQuery._removeData( elem, "events" );
		}
	},

	trigger: function( event, data, elem, onlyHandlers ) {
		var handle, ontype, cur,
			bubbleType, special, tmp, i,
			eventPath = [ elem || document ],
			type = core_hasOwn.call( event, "type" ) ? event.type : event,
			namespaces = core_hasOwn.call( event, "namespace" ) ? event.namespace.split(".") : [];

		cur = tmp = elem = elem || document;

		// Don't do events on text and comment nodes
		if ( elem.nodeType === 3 || elem.nodeType === 8 ) {
			return;
		}

		// focus/blur morphs to focusin/out; ensure we're not firing them right now
		if ( rfocusMorph.test( type + jQuery.event.triggered ) ) {
			return;
		}

		if ( type.indexOf(".") >= 0 ) {
			// Namespaced trigger; create a regexp to match event type in handle()
			namespaces = type.split(".");
			type = namespaces.shift();
			namespaces.sort();
		}
		ontype = type.indexOf(":") < 0 && "on" + type;

		// Caller can pass in a jQuery.Event object, Object, or just an event type string
		event = event[ jQuery.expando ] ?
			event :
			new jQuery.Event( type, typeof event === "object" && event );

		// Trigger bitmask: & 1 for native handlers; & 2 for jQuery (always true)
		event.isTrigger = onlyHandlers ? 2 : 3;
		event.namespace = namespaces.join(".");
		event.namespace_re = event.namespace ?
			new RegExp( "(^|\\.)" + namespaces.join("\\.(?:.*\\.|)") + "(\\.|$)" ) :
			null;

		// Clean up the event in case it is being reused
		event.result = undefined;
		if ( !event.target ) {
			event.target = elem;
		}

		// Clone any incoming data and prepend the event, creating the handler arg list
		data = data == null ?
			[ event ] :
			jQuery.makeArray( data, [ event ] );

		// Allow special events to draw outside the lines
		special = jQuery.event.special[ type ] || {};
		if ( !onlyHandlers && special.trigger && special.trigger.apply( elem, data ) === false ) {
			return;
		}

		// Determine event propagation path in advance, per W3C events spec (#9951)
		// Bubble up to document, then to window; watch for a global ownerDocument var (#9724)
		if ( !onlyHandlers && !special.noBubble && !jQuery.isWindow( elem ) ) {

			bubbleType = special.delegateType || type;
			if ( !rfocusMorph.test( bubbleType + type ) ) {
				cur = cur.parentNode;
			}
			for ( ; cur; cur = cur.parentNode ) {
				eventPath.push( cur );
				tmp = cur;
			}

			// Only add window if we got to document (e.g., not plain obj or detached DOM)
			if ( tmp === (elem.ownerDocument || document) ) {
				eventPath.push( tmp.defaultView || tmp.parentWindow || window );
			}
		}

		// Fire handlers on the event path
		i = 0;
		while ( (cur = eventPath[i++]) && !event.isPropagationStopped() ) {

			event.type = i > 1 ?
				bubbleType :
				special.bindType || type;

			// jQuery handler
			handle = ( jQuery._data( cur, "events" ) || {} )[ event.type ] && jQuery._data( cur, "handle" );
			if ( handle ) {
				handle.apply( cur, data );
			}

			// Native handler
			handle = ontype && cur[ ontype ];
			if ( handle && jQuery.acceptData( cur ) && handle.apply && handle.apply( cur, data ) === false ) {
				event.preventDefault();
			}
		}
		event.type = type;

		// If nobody prevented the default action, do it now
		if ( !onlyHandlers && !event.isDefaultPrevented() ) {

			if ( (!special._default || special._default.apply( eventPath.pop(), data ) === false) &&
				jQuery.acceptData( elem ) ) {

				// Call a native DOM method on the target with the same name name as the event.
				// Can't use an .isFunction() check here because IE6/7 fails that test.
				// Don't do default actions on window, that's where global variables be (#6170)
				if ( ontype && elem[ type ] && !jQuery.isWindow( elem ) ) {

					// Don't re-trigger an onFOO event when we call its FOO() method
					tmp = elem[ ontype ];

					if ( tmp ) {
						elem[ ontype ] = null;
					}

					// Prevent re-triggering of the same event, since we already bubbled it above
					jQuery.event.triggered = type;
					try {
						elem[ type ]();
					} catch ( e ) {
						// IE<9 dies on focus/blur to hidden element (#1486,#12518)
						// only reproducible on winXP IE8 native, not IE9 in IE8 mode
					}
					jQuery.event.triggered = undefined;

					if ( tmp ) {
						elem[ ontype ] = tmp;
					}
				}
			}
		}

		return event.result;
	},

	dispatch: function( event ) {

		// Make a writable jQuery.Event from the native event object
		event = jQuery.event.fix( event );

		var i, ret, handleObj, matched, j,
			handlerQueue = [],
			args = core_slice.call( arguments ),
			handlers = ( jQuery._data( this, "events" ) || {} )[ event.type ] || [],
			special = jQuery.event.special[ event.type ] || {};

		// Use the fix-ed jQuery.Event rather than the (read-only) native event
		args[0] = event;
		event.delegateTarget = this;

		// Call the preDispatch hook for the mapped type, and let it bail if desired
		if ( special.preDispatch && special.preDispatch.call( this, event ) === false ) {
			return;
		}

		// Determine handlers
		handlerQueue = jQuery.event.handlers.call( this, event, handlers );

		// Run delegates first; they may want to stop propagation beneath us
		i = 0;
		while ( (matched = handlerQueue[ i++ ]) && !event.isPropagationStopped() ) {
			event.currentTarget = matched.elem;

			j = 0;
			while ( (handleObj = matched.handlers[ j++ ]) && !event.isImmediatePropagationStopped() ) {

				// Triggered event must either 1) have no namespace, or
				// 2) have namespace(s) a subset or equal to those in the bound event (both can have no namespace).
				if ( !event.namespace_re || event.namespace_re.test( handleObj.namespace ) ) {

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret = ( (jQuery.event.special[ handleObj.origType ] || {}).handle || handleObj.handler )
							.apply( matched.elem, args );

					if ( ret !== undefined ) {
						if ( (event.result = ret) === false ) {
							event.preventDefault();
							event.stopPropagation();
						}
					}
				}
			}
		}

		// Call the postDispatch hook for the mapped type
		if ( special.postDispatch ) {
			special.postDispatch.call( this, event );
		}

		return event.result;
	},

	handlers: function( event, handlers ) {
		var sel, handleObj, matches, i,
			handlerQueue = [],
			delegateCount = handlers.delegateCount,
			cur = event.target;

		// Find delegate handlers
		// Black-hole SVG <use> instance trees (#13180)
		// Avoid non-left-click bubbling in Firefox (#3861)
		if ( delegateCount && cur.nodeType && (!event.button || event.type !== "click") ) {

			/* jshint eqeqeq: false */
			for ( ; cur != this; cur = cur.parentNode || this ) {
				/* jshint eqeqeq: true */

				// Don't check non-elements (#13208)
				// Don't process clicks on disabled elements (#6911, #8165, #11382, #11764)
				if ( cur.nodeType === 1 && (cur.disabled !== true || event.type !== "click") ) {
					matches = [];
					for ( i = 0; i < delegateCount; i++ ) {
						handleObj = handlers[ i ];

						// Don't conflict with Object.prototype properties (#13203)
						sel = handleObj.selector + " ";

						if ( matches[ sel ] === undefined ) {
							matches[ sel ] = handleObj.needsContext ?
								jQuery( sel, this ).index( cur ) >= 0 :
								jQuery.find( sel, this, null, [ cur ] ).length;
						}
						if ( matches[ sel ] ) {
							matches.push( handleObj );
						}
					}
					if ( matches.length ) {
						handlerQueue.push({ elem: cur, handlers: matches });
					}
				}
			}
		}

		// Add the remaining (directly-bound) handlers
		if ( delegateCount < handlers.length ) {
			handlerQueue.push({ elem: this, handlers: handlers.slice( delegateCount ) });
		}

		return handlerQueue;
	},

	fix: function( event ) {
		if ( event[ jQuery.expando ] ) {
			return event;
		}

		// Create a writable copy of the event object and normalize some properties
		var i, prop, copy,
			type = event.type,
			originalEvent = event,
			fixHook = this.fixHooks[ type ];

		if ( !fixHook ) {
			this.fixHooks[ type ] = fixHook =
				rmouseEvent.test( type ) ? this.mouseHooks :
				rkeyEvent.test( type ) ? this.keyHooks :
				{};
		}
		copy = fixHook.props ? this.props.concat( fixHook.props ) : this.props;

		event = new jQuery.Event( originalEvent );

		i = copy.length;
		while ( i-- ) {
			prop = copy[ i ];
			event[ prop ] = originalEvent[ prop ];
		}

		// Support: IE<9
		// Fix target property (#1925)
		if ( !event.target ) {
			event.target = originalEvent.srcElement || document;
		}

		// Support: Chrome 23+, Safari?
		// Target should not be a text node (#504, #13143)
		if ( event.target.nodeType === 3 ) {
			event.target = event.target.parentNode;
		}

		// Support: IE<9
		// For mouse/key events, metaKey==false if it's undefined (#3368, #11328)
		event.metaKey = !!event.metaKey;

		return fixHook.filter ? fixHook.filter( event, originalEvent ) : event;
	},

	// Includes some event props shared by KeyEvent and MouseEvent
	props: "altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),

	fixHooks: {},

	keyHooks: {
		props: "char charCode key keyCode".split(" "),
		filter: function( event, original ) {

			// Add which for key events
			if ( event.which == null ) {
				event.which = original.charCode != null ? original.charCode : original.keyCode;
			}

			return event;
		}
	},

	mouseHooks: {
		props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
		filter: function( event, original ) {
			var body, eventDoc, doc,
				button = original.button,
				fromElement = original.fromElement;

			// Calculate pageX/Y if missing and clientX/Y available
			if ( event.pageX == null && original.clientX != null ) {
				eventDoc = event.target.ownerDocument || document;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX + ( doc && doc.scrollLeft || body && body.scrollLeft || 0 ) - ( doc && doc.clientLeft || body && body.clientLeft || 0 );
				event.pageY = original.clientY + ( doc && doc.scrollTop  || body && body.scrollTop  || 0 ) - ( doc && doc.clientTop  || body && body.clientTop  || 0 );
			}

			// Add relatedTarget, if necessary
			if ( !event.relatedTarget && fromElement ) {
				event.relatedTarget = fromElement === event.target ? original.toElement : fromElement;
			}

			// Add which for click: 1 === left; 2 === middle; 3 === right
			// Note: button is not normalized, so don't use it
			if ( !event.which && button !== undefined ) {
				event.which = ( button & 1 ? 1 : ( button & 2 ? 3 : ( button & 4 ? 2 : 0 ) ) );
			}

			return event;
		}
	},

	special: {
		load: {
			// Prevent triggered image.load events from bubbling to window.load
			noBubble: true
		},
		focus: {
			// Fire native event if possible so blur/focus sequence is correct
			trigger: function() {
				if ( this !== safeActiveElement() && this.focus ) {
					try {
						this.focus();
						return false;
					} catch ( e ) {
						// Support: IE<9
						// If we error on focus to hidden element (#1486, #12518),
						// let .trigger() run the handlers
					}
				}
			},
			delegateType: "focusin"
		},
		blur: {
			trigger: function() {
				if ( this === safeActiveElement() && this.blur ) {
					this.blur();
					return false;
				}
			},
			delegateType: "focusout"
		},
		click: {
			// For checkbox, fire native event so checked state will be right
			trigger: function() {
				if ( jQuery.nodeName( this, "input" ) && this.type === "checkbox" && this.click ) {
					this.click();
					return false;
				}
			},

			// For cross-browser consistency, don't fire native .click() on links
			_default: function( event ) {
				return jQuery.nodeName( event.target, "a" );
			}
		},

		beforeunload: {
			postDispatch: function( event ) {

				// Even when returnValue equals to undefined Firefox will still show alert
				if ( event.result !== undefined ) {
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	},

	simulate: function( type, elem, event, bubble ) {
		// Piggyback on a donor event to simulate a different one.
		// Fake originalEvent to avoid donor's stopPropagation, but if the
		// simulated event prevents default then we do the same on the donor.
		var e = jQuery.extend(
			new jQuery.Event(),
			event,
			{
				type: type,
				isSimulated: true,
				originalEvent: {}
			}
		);
		if ( bubble ) {
			jQuery.event.trigger( e, null, elem );
		} else {
			jQuery.event.dispatch.call( elem, e );
		}
		if ( e.isDefaultPrevented() ) {
			event.preventDefault();
		}
	}
};

jQuery.removeEvent = document.removeEventListener ?
	function( elem, type, handle ) {
		if ( elem.removeEventListener ) {
			elem.removeEventListener( type, handle, false );
		}
	} :
	function( elem, type, handle ) {
		var name = "on" + type;

		if ( elem.detachEvent ) {

			// #8545, #7054, preventing memory leaks for custom events in IE6-8
			// detachEvent needed property on element, by name of that event, to properly expose it to GC
			if ( typeof elem[ name ] === core_strundefined ) {
				elem[ name ] = null;
			}

			elem.detachEvent( name, handle );
		}
	};

jQuery.Event = function( src, props ) {
	// Allow instantiation without the 'new' keyword
	if ( !(this instanceof jQuery.Event) ) {
		return new jQuery.Event( src, props );
	}

	// Event object
	if ( src && src.type ) {
		this.originalEvent = src;
		this.type = src.type;

		// Events bubbling up the document may have been marked as prevented
		// by a handler lower down the tree; reflect the correct value.
		this.isDefaultPrevented = ( src.defaultPrevented || src.returnValue === false ||
			src.getPreventDefault && src.getPreventDefault() ) ? returnTrue : returnFalse;

	// Event type
	} else {
		this.type = src;
	}

	// Put explicitly provided properties onto the event object
	if ( props ) {
		jQuery.extend( this, props );
	}

	// Create a timestamp if incoming event doesn't have one
	this.timeStamp = src && src.timeStamp || jQuery.now();

	// Mark it as fixed
	this[ jQuery.expando ] = true;
};

// jQuery.Event is based on DOM3 Events as specified by the ECMAScript Language Binding
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	isDefaultPrevented: returnFalse,
	isPropagationStopped: returnFalse,
	isImmediatePropagationStopped: returnFalse,

	preventDefault: function() {
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if ( !e ) {
			return;
		}

		// If preventDefault exists, run it on the original event
		if ( e.preventDefault ) {
			e.preventDefault();

		// Support: IE
		// Otherwise set the returnValue property of the original event to false
		} else {
			e.returnValue = false;
		}
	},
	stopPropagation: function() {
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;
		if ( !e ) {
			return;
		}
		// If stopPropagation exists, run it on the original event
		if ( e.stopPropagation ) {
			e.stopPropagation();
		}

		// Support: IE
		// Set the cancelBubble property of the original event to true
		e.cancelBubble = true;
	},
	stopImmediatePropagation: function() {
		this.isImmediatePropagationStopped = returnTrue;
		this.stopPropagation();
	}
};

// Create mouseenter/leave events using mouseover/out and event-time checks
jQuery.each({
	mouseenter: "mouseover",
	mouseleave: "mouseout"
}, function( orig, fix ) {
	jQuery.event.special[ orig ] = {
		delegateType: fix,
		bindType: fix,

		handle: function( event ) {
			var ret,
				target = this,
				related = event.relatedTarget,
				handleObj = event.handleObj;

			// For mousenter/leave call the handler if related is outside the target.
			// NB: No relatedTarget if the mouse left/entered the browser window
			if ( !related || (related !== target && !jQuery.contains( target, related )) ) {
				event.type = handleObj.origType;
				ret = handleObj.handler.apply( this, arguments );
				event.type = fix;
			}
			return ret;
		}
	};
});

// IE submit delegation
if ( !jQuery.support.submitBubbles ) {

	jQuery.event.special.submit = {
		setup: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Lazy-add a submit handler when a descendant form may potentially be submitted
			jQuery.event.add( this, "click._submit keypress._submit", function( e ) {
				// Node name check avoids a VML-related crash in IE (#9807)
				var elem = e.target,
					form = jQuery.nodeName( elem, "input" ) || jQuery.nodeName( elem, "button" ) ? elem.form : undefined;
				if ( form && !jQuery._data( form, "submitBubbles" ) ) {
					jQuery.event.add( form, "submit._submit", function( event ) {
						event._submit_bubble = true;
					});
					jQuery._data( form, "submitBubbles", true );
				}
			});
			// return undefined since we don't need an event listener
		},

		postDispatch: function( event ) {
			// If form was submitted by the user, bubble the event up the tree
			if ( event._submit_bubble ) {
				delete event._submit_bubble;
				if ( this.parentNode && !event.isTrigger ) {
					jQuery.event.simulate( "submit", this.parentNode, event, true );
				}
			}
		},

		teardown: function() {
			// Only need this for delegated form submit events
			if ( jQuery.nodeName( this, "form" ) ) {
				return false;
			}

			// Remove delegated handlers; cleanData eventually reaps submit handlers attached above
			jQuery.event.remove( this, "._submit" );
		}
	};
}

// IE change delegation and checkbox/radio fix
if ( !jQuery.support.changeBubbles ) {

	jQuery.event.special.change = {

		setup: function() {

			if ( rformElems.test( this.nodeName ) ) {
				// IE doesn't fire change on a check/radio until blur; trigger it on click
				// after a propertychange. Eat the blur-change in special.change.handle.
				// This still fires onchange a second time for check/radio after blur.
				if ( this.type === "checkbox" || this.type === "radio" ) {
					jQuery.event.add( this, "propertychange._change", function( event ) {
						if ( event.originalEvent.propertyName === "checked" ) {
							this._just_changed = true;
						}
					});
					jQuery.event.add( this, "click._change", function( event ) {
						if ( this._just_changed && !event.isTrigger ) {
							this._just_changed = false;
						}
						// Allow triggered, simulated change events (#11500)
						jQuery.event.simulate( "change", this, event, true );
					});
				}
				return false;
			}
			// Delegated event; lazy-add a change handler on descendant inputs
			jQuery.event.add( this, "beforeactivate._change", function( e ) {
				var elem = e.target;

				if ( rformElems.test( elem.nodeName ) && !jQuery._data( elem, "changeBubbles" ) ) {
					jQuery.event.add( elem, "change._change", function( event ) {
						if ( this.parentNode && !event.isSimulated && !event.isTrigger ) {
							jQuery.event.simulate( "change", this.parentNode, event, true );
						}
					});
					jQuery._data( elem, "changeBubbles", true );
				}
			});
		},

		handle: function( event ) {
			var elem = event.target;

			// Swallow native change events from checkbox/radio, we already triggered them above
			if ( this !== elem || event.isSimulated || event.isTrigger || (elem.type !== "radio" && elem.type !== "checkbox") ) {
				return event.handleObj.handler.apply( this, arguments );
			}
		},

		teardown: function() {
			jQuery.event.remove( this, "._change" );

			return !rformElems.test( this.nodeName );
		}
	};
}

// Create "bubbling" focus and blur events
if ( !jQuery.support.focusinBubbles ) {
	jQuery.each({ focus: "focusin", blur: "focusout" }, function( orig, fix ) {

		// Attach a single capturing handler while someone wants focusin/focusout
		var attaches = 0,
			handler = function( event ) {
				jQuery.event.simulate( fix, event.target, jQuery.event.fix( event ), true );
			};

		jQuery.event.special[ fix ] = {
			setup: function() {
				if ( attaches++ === 0 ) {
					document.addEventListener( orig, handler, true );
				}
			},
			teardown: function() {
				if ( --attaches === 0 ) {
					document.removeEventListener( orig, handler, true );
				}
			}
		};
	});
}

jQuery.fn.extend({

	on: function( types, selector, data, fn, /*INTERNAL*/ one ) {
		var type, origFn;

		// Types can be a map of types/handlers
		if ( typeof types === "object" ) {
			// ( types-Object, selector, data )
			if ( typeof selector !== "string" ) {
				// ( types-Object, data )
				data = data || selector;
				selector = undefined;
			}
			for ( type in types ) {
				this.on( type, selector, data, types[ type ], one );
			}
			return this;
		}

		if ( data == null && fn == null ) {
			// ( types, fn )
			fn = selector;
			data = selector = undefined;
		} else if ( fn == null ) {
			if ( typeof selector === "string" ) {
				// ( types, selector, fn )
				fn = data;
				data = undefined;
			} else {
				// ( types, data, fn )
				fn = data;
				data = selector;
				selector = undefined;
			}
		}
		if ( fn === false ) {
			fn = returnFalse;
		} else if ( !fn ) {
			return this;
		}

		if ( one === 1 ) {
			origFn = fn;
			fn = function( event ) {
				// Can use an empty set, since event contains the info
				jQuery().off( event );
				return origFn.apply( this, arguments );
			};
			// Use same guid so caller can remove using origFn
			fn.guid = origFn.guid || ( origFn.guid = jQuery.guid++ );
		}
		return this.each( function() {
			jQuery.event.add( this, types, fn, data, selector );
		});
	},
	one: function( types, selector, data, fn ) {
		return this.on( types, selector, data, fn, 1 );
	},
	off: function( types, selector, fn ) {
		var handleObj, type;
		if ( types && types.preventDefault && types.handleObj ) {
			// ( event )  dispatched jQuery.Event
			handleObj = types.handleObj;
			jQuery( types.delegateTarget ).off(
				handleObj.namespace ? handleObj.origType + "." + handleObj.namespace : handleObj.origType,
				handleObj.selector,
				handleObj.handler
			);
			return this;
		}
		if ( typeof types === "object" ) {
			// ( types-object [, selector] )
			for ( type in types ) {
				this.off( type, selector, types[ type ] );
			}
			return this;
		}
		if ( selector === false || typeof selector === "function" ) {
			// ( types [, fn] )
			fn = selector;
			selector = undefined;
		}
		if ( fn === false ) {
			fn = returnFalse;
		}
		return this.each(function() {
			jQuery.event.remove( this, types, fn, selector );
		});
	},

	trigger: function( type, data ) {
		return this.each(function() {
			jQuery.event.trigger( type, data, this );
		});
	},
	triggerHandler: function( type, data ) {
		var elem = this[0];
		if ( elem ) {
			return jQuery.event.trigger( type, data, elem, true );
		}
	}
});
var isSimple = /^.[^:#\[\.,]*$/,
	rparentsprev = /^(?:parents|prev(?:Until|All))/,
	rneedsContext = jQuery.expr.match.needsContext,
	// methods guaranteed to produce a unique set when starting from a unique set
	guaranteedUnique = {
		children: true,
		contents: true,
		next: true,
		prev: true
	};

jQuery.fn.extend({
	find: function( selector ) {
		var i,
			ret = [],
			self = this,
			len = self.length;

		if ( typeof selector !== "string" ) {
			return this.pushStack( jQuery( selector ).filter(function() {
				for ( i = 0; i < len; i++ ) {
					if ( jQuery.contains( self[ i ], this ) ) {
						return true;
					}
				}
			}) );
		}

		for ( i = 0; i < len; i++ ) {
			jQuery.find( selector, self[ i ], ret );
		}

		// Needed because $( selector, context ) becomes $( context ).find( selector )
		ret = this.pushStack( len > 1 ? jQuery.unique( ret ) : ret );
		ret.selector = this.selector ? this.selector + " " + selector : selector;
		return ret;
	},

	has: function( target ) {
		var i,
			targets = jQuery( target, this ),
			len = targets.length;

		return this.filter(function() {
			for ( i = 0; i < len; i++ ) {
				if ( jQuery.contains( this, targets[i] ) ) {
					return true;
				}
			}
		});
	},

	not: function( selector ) {
		return this.pushStack( winnow(this, selector || [], true) );
	},

	filter: function( selector ) {
		return this.pushStack( winnow(this, selector || [], false) );
	},

	is: function( selector ) {
		return !!winnow(
			this,

			// If this is a positional/relative selector, check membership in the returned set
			// so $("p:first").is("p:last") won't return true for a doc with two "p".
			typeof selector === "string" && rneedsContext.test( selector ) ?
				jQuery( selector ) :
				selector || [],
			false
		).length;
	},

	closest: function( selectors, context ) {
		var cur,
			i = 0,
			l = this.length,
			ret = [],
			pos = rneedsContext.test( selectors ) || typeof selectors !== "string" ?
				jQuery( selectors, context || this.context ) :
				0;

		for ( ; i < l; i++ ) {
			for ( cur = this[i]; cur && cur !== context; cur = cur.parentNode ) {
				// Always skip document fragments
				if ( cur.nodeType < 11 && (pos ?
					pos.index(cur) > -1 :

					// Don't pass non-elements to Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector(cur, selectors)) ) {

					cur = ret.push( cur );
					break;
				}
			}
		}

		return this.pushStack( ret.length > 1 ? jQuery.unique( ret ) : ret );
	},

	// Determine the position of an element within
	// the matched set of elements
	index: function( elem ) {

		// No argument, return index in parent
		if ( !elem ) {
			return ( this[0] && this[0].parentNode ) ? this.first().prevAll().length : -1;
		}

		// index in selector
		if ( typeof elem === "string" ) {
			return jQuery.inArray( this[0], jQuery( elem ) );
		}

		// Locate the position of the desired element
		return jQuery.inArray(
			// If it receives a jQuery object, the first element is used
			elem.jquery ? elem[0] : elem, this );
	},

	add: function( selector, context ) {
		var set = typeof selector === "string" ?
				jQuery( selector, context ) :
				jQuery.makeArray( selector && selector.nodeType ? [ selector ] : selector ),
			all = jQuery.merge( this.get(), set );

		return this.pushStack( jQuery.unique(all) );
	},

	addBack: function( selector ) {
		return this.add( selector == null ?
			this.prevObject : this.prevObject.filter(selector)
		);
	}
});

function sibling( cur, dir ) {
	do {
		cur = cur[ dir ];
	} while ( cur && cur.nodeType !== 1 );

	return cur;
}

jQuery.each({
	parent: function( elem ) {
		var parent = elem.parentNode;
		return parent && parent.nodeType !== 11 ? parent : null;
	},
	parents: function( elem ) {
		return jQuery.dir( elem, "parentNode" );
	},
	parentsUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "parentNode", until );
	},
	next: function( elem ) {
		return sibling( elem, "nextSibling" );
	},
	prev: function( elem ) {
		return sibling( elem, "previousSibling" );
	},
	nextAll: function( elem ) {
		return jQuery.dir( elem, "nextSibling" );
	},
	prevAll: function( elem ) {
		return jQuery.dir( elem, "previousSibling" );
	},
	nextUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "nextSibling", until );
	},
	prevUntil: function( elem, i, until ) {
		return jQuery.dir( elem, "previousSibling", until );
	},
	siblings: function( elem ) {
		return jQuery.sibling( ( elem.parentNode || {} ).firstChild, elem );
	},
	children: function( elem ) {
		return jQuery.sibling( elem.firstChild );
	},
	contents: function( elem ) {
		return jQuery.nodeName( elem, "iframe" ) ?
			elem.contentDocument || elem.contentWindow.document :
			jQuery.merge( [], elem.childNodes );
	}
}, function( name, fn ) {
	jQuery.fn[ name ] = function( until, selector ) {
		var ret = jQuery.map( this, fn, until );

		if ( name.slice( -5 ) !== "Until" ) {
			selector = until;
		}

		if ( selector && typeof selector === "string" ) {
			ret = jQuery.filter( selector, ret );
		}

		if ( this.length > 1 ) {
			// Remove duplicates
			if ( !guaranteedUnique[ name ] ) {
				ret = jQuery.unique( ret );
			}

			// Reverse order for parents* and prev-derivatives
			if ( rparentsprev.test( name ) ) {
				ret = ret.reverse();
			}
		}

		return this.pushStack( ret );
	};
});

jQuery.extend({
	filter: function( expr, elems, not ) {
		var elem = elems[ 0 ];

		if ( not ) {
			expr = ":not(" + expr + ")";
		}

		return elems.length === 1 && elem.nodeType === 1 ?
			jQuery.find.matchesSelector( elem, expr ) ? [ elem ] : [] :
			jQuery.find.matches( expr, jQuery.grep( elems, function( elem ) {
				return elem.nodeType === 1;
			}));
	},

	dir: function( elem, dir, until ) {
		var matched = [],
			cur = elem[ dir ];

		while ( cur && cur.nodeType !== 9 && (until === undefined || cur.nodeType !== 1 || !jQuery( cur ).is( until )) ) {
			if ( cur.nodeType === 1 ) {
				matched.push( cur );
			}
			cur = cur[dir];
		}
		return matched;
	},

	sibling: function( n, elem ) {
		var r = [];

		for ( ; n; n = n.nextSibling ) {
			if ( n.nodeType === 1 && n !== elem ) {
				r.push( n );
			}
		}

		return r;
	}
});

// Implement the identical functionality for filter and not
function winnow( elements, qualifier, not ) {
	if ( jQuery.isFunction( qualifier ) ) {
		return jQuery.grep( elements, function( elem, i ) {
			/* jshint -W018 */
			return !!qualifier.call( elem, i, elem ) !== not;
		});

	}

	if ( qualifier.nodeType ) {
		return jQuery.grep( elements, function( elem ) {
			return ( elem === qualifier ) !== not;
		});

	}

	if ( typeof qualifier === "string" ) {
		if ( isSimple.test( qualifier ) ) {
			return jQuery.filter( qualifier, elements, not );
		}

		qualifier = jQuery.filter( qualifier, elements );
	}

	return jQuery.grep( elements, function( elem ) {
		return ( jQuery.inArray( elem, qualifier ) >= 0 ) !== not;
	});
}
function createSafeFragment( document ) {
	var list = nodeNames.split( "|" ),
		safeFrag = document.createDocumentFragment();

	if ( safeFrag.createElement ) {
		while ( list.length ) {
			safeFrag.createElement(
				list.pop()
			);
		}
	}
	return safeFrag;
}

var nodeNames = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|" +
		"header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	rinlinejQuery = / jQuery\d+="(?:null|\d+)"/g,
	rnoshimcache = new RegExp("<(?:" + nodeNames + ")[\\s/>]", "i"),
	rleadingWhitespace = /^\s+/,
	rxhtmlTag = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	rtagName = /<([\w:]+)/,
	rtbody = /<tbody/i,
	rhtml = /<|&#?\w+;/,
	rnoInnerhtml = /<(?:script|style|link)/i,
	manipulation_rcheckableType = /^(?:checkbox|radio)$/i,
	// checked="checked" or checked
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptType = /^$|\/(?:java|ecma)script/i,
	rscriptTypeMasked = /^true\/(.*)/,
	rcleanScript = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,

	// We have to close these tags to support XHTML (#13200)
	wrapMap = {
		option: [ 1, "<select multiple='multiple'>", "</select>" ],
		legend: [ 1, "<fieldset>", "</fieldset>" ],
		area: [ 1, "<map>", "</map>" ],
		param: [ 1, "<object>", "</object>" ],
		thead: [ 1, "<table>", "</table>" ],
		tr: [ 2, "<table><tbody>", "</tbody></table>" ],
		col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
		td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],

		// IE6-8 can't serialize link, script, style, or any html5 (NoScope) tags,
		// unless wrapped in a div with non-breaking characters in front of it.
		_default: jQuery.support.htmlSerialize ? [ 0, "", "" ] : [ 1, "X<div>", "</div>"  ]
	},
	safeFragment = createSafeFragment( document ),
	fragmentDiv = safeFragment.appendChild( document.createElement("div") );

wrapMap.optgroup = wrapMap.option;
wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;

jQuery.fn.extend({
	text: function( value ) {
		return jQuery.access( this, function( value ) {
			return value === undefined ?
				jQuery.text( this ) :
				this.empty().append( ( this[0] && this[0].ownerDocument || document ).createTextNode( value ) );
		}, null, value, arguments.length );
	},

	append: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.appendChild( elem );
			}
		});
	},

	prepend: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9 ) {
				var target = manipulationTarget( this, elem );
				target.insertBefore( elem, target.firstChild );
			}
		});
	},

	before: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this );
			}
		});
	},

	after: function() {
		return this.domManip( arguments, function( elem ) {
			if ( this.parentNode ) {
				this.parentNode.insertBefore( elem, this.nextSibling );
			}
		});
	},

	// keepData is for internal use only--do not document
	remove: function( selector, keepData ) {
		var elem,
			elems = selector ? jQuery.filter( selector, this ) : this,
			i = 0;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( !keepData && elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem ) );
			}

			if ( elem.parentNode ) {
				if ( keepData && jQuery.contains( elem.ownerDocument, elem ) ) {
					setGlobalEval( getAll( elem, "script" ) );
				}
				elem.parentNode.removeChild( elem );
			}
		}

		return this;
	},

	empty: function() {
		var elem,
			i = 0;

		for ( ; (elem = this[i]) != null; i++ ) {
			// Remove element nodes and prevent memory leaks
			if ( elem.nodeType === 1 ) {
				jQuery.cleanData( getAll( elem, false ) );
			}

			// Remove any remaining nodes
			while ( elem.firstChild ) {
				elem.removeChild( elem.firstChild );
			}

			// If this is a select, ensure that it displays empty (#12336)
			// Support: IE<9
			if ( elem.options && jQuery.nodeName( elem, "select" ) ) {
				elem.options.length = 0;
			}
		}

		return this;
	},

	clone: function( dataAndEvents, deepDataAndEvents ) {
		dataAndEvents = dataAndEvents == null ? false : dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null ? dataAndEvents : deepDataAndEvents;

		return this.map( function () {
			return jQuery.clone( this, dataAndEvents, deepDataAndEvents );
		});
	},

	html: function( value ) {
		return jQuery.access( this, function( value ) {
			var elem = this[0] || {},
				i = 0,
				l = this.length;

			if ( value === undefined ) {
				return elem.nodeType === 1 ?
					elem.innerHTML.replace( rinlinejQuery, "" ) :
					undefined;
			}

			// See if we can take a shortcut and just use innerHTML
			if ( typeof value === "string" && !rnoInnerhtml.test( value ) &&
				( jQuery.support.htmlSerialize || !rnoshimcache.test( value )  ) &&
				( jQuery.support.leadingWhitespace || !rleadingWhitespace.test( value ) ) &&
				!wrapMap[ ( rtagName.exec( value ) || ["", ""] )[1].toLowerCase() ] ) {

				value = value.replace( rxhtmlTag, "<$1></$2>" );

				try {
					for (; i < l; i++ ) {
						// Remove element nodes and prevent memory leaks
						elem = this[i] || {};
						if ( elem.nodeType === 1 ) {
							jQuery.cleanData( getAll( elem, false ) );
							elem.innerHTML = value;
						}
					}

					elem = 0;

				// If using innerHTML throws an exception, use the fallback method
				} catch(e) {}
			}

			if ( elem ) {
				this.empty().append( value );
			}
		}, null, value, arguments.length );
	},

	replaceWith: function() {
		var
			// Snapshot the DOM in case .domManip sweeps something relevant into its fragment
			args = jQuery.map( this, function( elem ) {
				return [ elem.nextSibling, elem.parentNode ];
			}),
			i = 0;

		// Make the changes, replacing each context element with the new content
		this.domManip( arguments, function( elem ) {
			var next = args[ i++ ],
				parent = args[ i++ ];

			if ( parent ) {
				// Don't use the snapshot next if it has moved (#13810)
				if ( next && next.parentNode !== parent ) {
					next = this.nextSibling;
				}
				jQuery( this ).remove();
				parent.insertBefore( elem, next );
			}
		// Allow new content to include elements from the context set
		}, true );

		// Force removal if there was no new content (e.g., from empty arguments)
		return i ? this : this.remove();
	},

	detach: function( selector ) {
		return this.remove( selector, true );
	},

	domManip: function( args, callback, allowIntersection ) {

		// Flatten any nested arrays
		args = core_concat.apply( [], args );

		var first, node, hasScripts,
			scripts, doc, fragment,
			i = 0,
			l = this.length,
			set = this,
			iNoClone = l - 1,
			value = args[0],
			isFunction = jQuery.isFunction( value );

		// We can't cloneNode fragments that contain checked, in WebKit
		if ( isFunction || !( l <= 1 || typeof value !== "string" || jQuery.support.checkClone || !rchecked.test( value ) ) ) {
			return this.each(function( index ) {
				var self = set.eq( index );
				if ( isFunction ) {
					args[0] = value.call( this, index, self.html() );
				}
				self.domManip( args, callback, allowIntersection );
			});
		}

		if ( l ) {
			fragment = jQuery.buildFragment( args, this[ 0 ].ownerDocument, false, !allowIntersection && this );
			first = fragment.firstChild;

			if ( fragment.childNodes.length === 1 ) {
				fragment = first;
			}

			if ( first ) {
				scripts = jQuery.map( getAll( fragment, "script" ), disableScript );
				hasScripts = scripts.length;

				// Use the original fragment for the last item instead of the first because it can end up
				// being emptied incorrectly in certain situations (#8070).
				for ( ; i < l; i++ ) {
					node = fragment;

					if ( i !== iNoClone ) {
						node = jQuery.clone( node, true, true );

						// Keep references to cloned scripts for later restoration
						if ( hasScripts ) {
							jQuery.merge( scripts, getAll( node, "script" ) );
						}
					}

					callback.call( this[i], node, i );
				}

				if ( hasScripts ) {
					doc = scripts[ scripts.length - 1 ].ownerDocument;

					// Reenable scripts
					jQuery.map( scripts, restoreScript );

					// Evaluate executable scripts on first document insertion
					for ( i = 0; i < hasScripts; i++ ) {
						node = scripts[ i ];
						if ( rscriptType.test( node.type || "" ) &&
							!jQuery._data( node, "globalEval" ) && jQuery.contains( doc, node ) ) {

							if ( node.src ) {
								// Hope ajax is available...
								jQuery._evalUrl( node.src );
							} else {
								jQuery.globalEval( ( node.text || node.textContent || node.innerHTML || "" ).replace( rcleanScript, "" ) );
							}
						}
					}
				}

				// Fix #11809: Avoid leaking memory
				fragment = first = null;
			}
		}

		return this;
	}
});

// Support: IE<8
// Manipulating tables requires a tbody
function manipulationTarget( elem, content ) {
	return jQuery.nodeName( elem, "table" ) &&
		jQuery.nodeName( content.nodeType === 1 ? content : content.firstChild, "tr" ) ?

		elem.getElementsByTagName("tbody")[0] ||
			elem.appendChild( elem.ownerDocument.createElement("tbody") ) :
		elem;
}

// Replace/restore the type attribute of script elements for safe DOM manipulation
function disableScript( elem ) {
	elem.type = (jQuery.find.attr( elem, "type" ) !== null) + "/" + elem.type;
	return elem;
}
function restoreScript( elem ) {
	var match = rscriptTypeMasked.exec( elem.type );
	if ( match ) {
		elem.type = match[1];
	} else {
		elem.removeAttribute("type");
	}
	return elem;
}

// Mark scripts as having already been evaluated
function setGlobalEval( elems, refElements ) {
	var elem,
		i = 0;
	for ( ; (elem = elems[i]) != null; i++ ) {
		jQuery._data( elem, "globalEval", !refElements || jQuery._data( refElements[i], "globalEval" ) );
	}
}

function cloneCopyEvent( src, dest ) {

	if ( dest.nodeType !== 1 || !jQuery.hasData( src ) ) {
		return;
	}

	var type, i, l,
		oldData = jQuery._data( src ),
		curData = jQuery._data( dest, oldData ),
		events = oldData.events;

	if ( events ) {
		delete curData.handle;
		curData.events = {};

		for ( type in events ) {
			for ( i = 0, l = events[ type ].length; i < l; i++ ) {
				jQuery.event.add( dest, type, events[ type ][ i ] );
			}
		}
	}

	// make the cloned public data object a copy from the original
	if ( curData.data ) {
		curData.data = jQuery.extend( {}, curData.data );
	}
}

function fixCloneNodeIssues( src, dest ) {
	var nodeName, e, data;

	// We do not need to do anything for non-Elements
	if ( dest.nodeType !== 1 ) {
		return;
	}

	nodeName = dest.nodeName.toLowerCase();

	// IE6-8 copies events bound via attachEvent when using cloneNode.
	if ( !jQuery.support.noCloneEvent && dest[ jQuery.expando ] ) {
		data = jQuery._data( dest );

		for ( e in data.events ) {
			jQuery.removeEvent( dest, e, data.handle );
		}

		// Event data gets referenced instead of copied if the expando gets copied too
		dest.removeAttribute( jQuery.expando );
	}

	// IE blanks contents when cloning scripts, and tries to evaluate newly-set text
	if ( nodeName === "script" && dest.text !== src.text ) {
		disableScript( dest ).text = src.text;
		restoreScript( dest );

	// IE6-10 improperly clones children of object elements using classid.
	// IE10 throws NoModificationAllowedError if parent is null, #12132.
	} else if ( nodeName === "object" ) {
		if ( dest.parentNode ) {
			dest.outerHTML = src.outerHTML;
		}

		// This path appears unavoidable for IE9. When cloning an object
		// element in IE9, the outerHTML strategy above is not sufficient.
		// If the src has innerHTML and the destination does not,
		// copy the src.innerHTML into the dest.innerHTML. #10324
		if ( jQuery.support.html5Clone && ( src.innerHTML && !jQuery.trim(dest.innerHTML) ) ) {
			dest.innerHTML = src.innerHTML;
		}

	} else if ( nodeName === "input" && manipulation_rcheckableType.test( src.type ) ) {
		// IE6-8 fails to persist the checked state of a cloned checkbox
		// or radio button. Worse, IE6-7 fail to give the cloned element
		// a checked appearance if the defaultChecked value isn't also set

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7 get confused and end up setting the value of a cloned
		// checkbox/radio button to an empty string instead of "on"
		if ( dest.value !== src.value ) {
			dest.value = src.value;
		}

	// IE6-8 fails to return the selected option to the default selected
	// state when cloning options
	} else if ( nodeName === "option" ) {
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8 fails to set the defaultValue to the correct value when
	// cloning other types of input fields
	} else if ( nodeName === "input" || nodeName === "textarea" ) {
		dest.defaultValue = src.defaultValue;
	}
}

jQuery.each({
	appendTo: "append",
	prependTo: "prepend",
	insertBefore: "before",
	insertAfter: "after",
	replaceAll: "replaceWith"
}, function( name, original ) {
	jQuery.fn[ name ] = function( selector ) {
		var elems,
			i = 0,
			ret = [],
			insert = jQuery( selector ),
			last = insert.length - 1;

		for ( ; i <= last; i++ ) {
			elems = i === last ? this : this.clone(true);
			jQuery( insert[i] )[ original ]( elems );

			// Modern browsers can apply jQuery collections as arrays, but oldIE needs a .get()
			core_push.apply( ret, elems.get() );
		}

		return this.pushStack( ret );
	};
});

function getAll( context, tag ) {
	var elems, elem,
		i = 0,
		found = typeof context.getElementsByTagName !== core_strundefined ? context.getElementsByTagName( tag || "*" ) :
			typeof context.querySelectorAll !== core_strundefined ? context.querySelectorAll( tag || "*" ) :
			undefined;

	if ( !found ) {
		for ( found = [], elems = context.childNodes || context; (elem = elems[i]) != null; i++ ) {
			if ( !tag || jQuery.nodeName( elem, tag ) ) {
				found.push( elem );
			} else {
				jQuery.merge( found, getAll( elem, tag ) );
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName( context, tag ) ?
		jQuery.merge( [ context ], found ) :
		found;
}

// Used in buildFragment, fixes the defaultChecked property
function fixDefaultChecked( elem ) {
	if ( manipulation_rcheckableType.test( elem.type ) ) {
		elem.defaultChecked = elem.checked;
	}
}

jQuery.extend({
	clone: function( elem, dataAndEvents, deepDataAndEvents ) {
		var destElements, node, clone, i, srcElements,
			inPage = jQuery.contains( elem.ownerDocument, elem );

		if ( jQuery.support.html5Clone || jQuery.isXMLDoc(elem) || !rnoshimcache.test( "<" + elem.nodeName + ">" ) ) {
			clone = elem.cloneNode( true );

		// IE<=8 does not properly clone detached, unknown element nodes
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild( clone = fragmentDiv.firstChild );
		}

		if ( (!jQuery.support.noCloneEvent || !jQuery.support.noCloneChecked) &&
				(elem.nodeType === 1 || elem.nodeType === 11) && !jQuery.isXMLDoc(elem) ) {

			// We eschew Sizzle here for performance reasons: http://jsperf.com/getall-vs-sizzle/2
			destElements = getAll( clone );
			srcElements = getAll( elem );

			// Fix all IE cloning issues
			for ( i = 0; (node = srcElements[i]) != null; ++i ) {
				// Ensure that the destination node is not null; Fixes #9587
				if ( destElements[i] ) {
					fixCloneNodeIssues( node, destElements[i] );
				}
			}
		}

		// Copy the events from the original to the clone
		if ( dataAndEvents ) {
			if ( deepDataAndEvents ) {
				srcElements = srcElements || getAll( elem );
				destElements = destElements || getAll( clone );

				for ( i = 0; (node = srcElements[i]) != null; i++ ) {
					cloneCopyEvent( node, destElements[i] );
				}
			} else {
				cloneCopyEvent( elem, clone );
			}
		}

		// Preserve script evaluation history
		destElements = getAll( clone, "script" );
		if ( destElements.length > 0 ) {
			setGlobalEval( destElements, !inPage && getAll( elem, "script" ) );
		}

		destElements = srcElements = node = null;

		// Return the cloned set
		return clone;
	},

	buildFragment: function( elems, context, scripts, selection ) {
		var j, elem, contains,
			tmp, tag, tbody, wrap,
			l = elems.length,

			// Ensure a safe fragment
			safe = createSafeFragment( context ),

			nodes = [],
			i = 0;

		for ( ; i < l; i++ ) {
			elem = elems[ i ];

			if ( elem || elem === 0 ) {

				// Add nodes directly
				if ( jQuery.type( elem ) === "object" ) {
					jQuery.merge( nodes, elem.nodeType ? [ elem ] : elem );

				// Convert non-html into a text node
				} else if ( !rhtml.test( elem ) ) {
					nodes.push( context.createTextNode( elem ) );

				// Convert html into DOM nodes
				} else {
					tmp = tmp || safe.appendChild( context.createElement("div") );

					// Deserialize a standard representation
					tag = ( rtagName.exec( elem ) || ["", ""] )[1].toLowerCase();
					wrap = wrapMap[ tag ] || wrapMap._default;

					tmp.innerHTML = wrap[1] + elem.replace( rxhtmlTag, "<$1></$2>" ) + wrap[2];

					// Descend through wrappers to the right content
					j = wrap[0];
					while ( j-- ) {
						tmp = tmp.lastChild;
					}

					// Manually add leading whitespace removed by IE
					if ( !jQuery.support.leadingWhitespace && rleadingWhitespace.test( elem ) ) {
						nodes.push( context.createTextNode( rleadingWhitespace.exec( elem )[0] ) );
					}

					// Remove IE's autoinserted <tbody> from table fragments
					if ( !jQuery.support.tbody ) {

						// String was a <table>, *may* have spurious <tbody>
						elem = tag === "table" && !rtbody.test( elem ) ?
							tmp.firstChild :

							// String was a bare <thead> or <tfoot>
							wrap[1] === "<table>" && !rtbody.test( elem ) ?
								tmp :
								0;

						j = elem && elem.childNodes.length;
						while ( j-- ) {
							if ( jQuery.nodeName( (tbody = elem.childNodes[j]), "tbody" ) && !tbody.childNodes.length ) {
								elem.removeChild( tbody );
							}
						}
					}

					jQuery.merge( nodes, tmp.childNodes );

					// Fix #12392 for WebKit and IE > 9
					tmp.textContent = "";

					// Fix #12392 for oldIE
					while ( tmp.firstChild ) {
						tmp.removeChild( tmp.firstChild );
					}

					// Remember the top-level container for proper cleanup
					tmp = safe.lastChild;
				}
			}
		}

		// Fix #11356: Clear elements from fragment
		if ( tmp ) {
			safe.removeChild( tmp );
		}

		// Reset defaultChecked for any radios and checkboxes
		// about to be appended to the DOM in IE 6/7 (#8060)
		if ( !jQuery.support.appendChecked ) {
			jQuery.grep( getAll( nodes, "input" ), fixDefaultChecked );
		}

		i = 0;
		while ( (elem = nodes[ i++ ]) ) {

			// #4087 - If origin and destination elements are the same, and this is
			// that element, do not do anything
			if ( selection && jQuery.inArray( elem, selection ) !== -1 ) {
				continue;
			}

			contains = jQuery.contains( elem.ownerDocument, elem );

			// Append to fragment
			tmp = getAll( safe.appendChild( elem ), "script" );

			// Preserve script evaluation history
			if ( contains ) {
				setGlobalEval( tmp );
			}

			// Capture executables
			if ( scripts ) {
				j = 0;
				while ( (elem = tmp[ j++ ]) ) {
					if ( rscriptType.test( elem.type || "" ) ) {
						scripts.push( elem );
					}
				}
			}
		}

		tmp = null;

		return safe;
	},

	cleanData: function( elems, /* internal */ acceptData ) {
		var elem, type, id, data,
			i = 0,
			internalKey = jQuery.expando,
			cache = jQuery.cache,
			deleteExpando = jQuery.support.deleteExpando,
			special = jQuery.event.special;

		for ( ; (elem = elems[i]) != null; i++ ) {

			if ( acceptData || jQuery.acceptData( elem ) ) {

				id = elem[ internalKey ];
				data = id && cache[ id ];

				if ( data ) {
					if ( data.events ) {
						for ( type in data.events ) {
							if ( special[ type ] ) {
								jQuery.event.remove( elem, type );

							// This is a shortcut to avoid jQuery.event.remove's overhead
							} else {
								jQuery.removeEvent( elem, type, data.handle );
							}
						}
					}

					// Remove cache only if it was not already removed by jQuery.event.remove
					if ( cache[ id ] ) {

						delete cache[ id ];

						// IE does not allow us to delete expando properties from nodes,
						// nor does it have a removeAttribute function on Document nodes;
						// we must handle all of these cases
						if ( deleteExpando ) {
							delete elem[ internalKey ];

						} else if ( typeof elem.removeAttribute !== core_strundefined ) {
							elem.removeAttribute( internalKey );

						} else {
							elem[ internalKey ] = null;
						}

						core_deletedIds.push( id );
					}
				}
			}
		}
	},

	_evalUrl: function( url ) {
		return jQuery.ajax({
			url: url,
			type: "GET",
			dataType: "script",
			async: false,
			global: false,
			"throws": true
		});
	}
});
jQuery.fn.extend({
	wrapAll: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapAll( html.call(this, i) );
			});
		}

		if ( this[0] ) {
			// The elements to wrap the target around
			var wrap = jQuery( html, this[0].ownerDocument ).eq(0).clone(true);

			if ( this[0].parentNode ) {
				wrap.insertBefore( this[0] );
			}

			wrap.map(function() {
				var elem = this;

				while ( elem.firstChild && elem.firstChild.nodeType === 1 ) {
					elem = elem.firstChild;
				}

				return elem;
			}).append( this );
		}

		return this;
	},

	wrapInner: function( html ) {
		if ( jQuery.isFunction( html ) ) {
			return this.each(function(i) {
				jQuery(this).wrapInner( html.call(this, i) );
			});
		}

		return this.each(function() {
			var self = jQuery( this ),
				contents = self.contents();

			if ( contents.length ) {
				contents.wrapAll( html );

			} else {
				self.append( html );
			}
		});
	},

	wrap: function( html ) {
		var isFunction = jQuery.isFunction( html );

		return this.each(function(i) {
			jQuery( this ).wrapAll( isFunction ? html.call(this, i) : html );
		});
	},

	unwrap: function() {
		return this.parent().each(function() {
			if ( !jQuery.nodeName( this, "body" ) ) {
				jQuery( this ).replaceWith( this.childNodes );
			}
		}).end();
	}
});
var iframe, getStyles, curCSS,
	ralpha = /alpha\([^)]*\)/i,
	ropacity = /opacity\s*=\s*([^)]*)/,
	rposition = /^(top|right|bottom|left)$/,
	// swappable if display is none or starts with table except "table", "table-cell", or "table-caption"
	// see here for display values: https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rmargin = /^margin/,
	rnumsplit = new RegExp( "^(" + core_pnum + ")(.*)$", "i" ),
	rnumnonpx = new RegExp( "^(" + core_pnum + ")(?!px)[a-z%]+$", "i" ),
	rrelNum = new RegExp( "^([+-])=(" + core_pnum + ")", "i" ),
	elemdisplay = { BODY: "block" },

	cssShow = { position: "absolute", visibility: "hidden", display: "block" },
	cssNormalTransform = {
		letterSpacing: 0,
		fontWeight: 400
	},

	cssExpand = [ "Top", "Right", "Bottom", "Left" ],
	cssPrefixes = [ "Webkit", "O", "Moz", "ms" ];

// return a css property mapped to a potentially vendor prefixed property
function vendorPropName( style, name ) {

	// shortcut for names that are not vendor prefixed
	if ( name in style ) {
		return name;
	}

	// check for vendor prefixed names
	var capName = name.charAt(0).toUpperCase() + name.slice(1),
		origName = name,
		i = cssPrefixes.length;

	while ( i-- ) {
		name = cssPrefixes[ i ] + capName;
		if ( name in style ) {
			return name;
		}
	}

	return origName;
}

function isHidden( elem, el ) {
	// isHidden might be called from jQuery#filter function;
	// in that case, element will be second argument
	elem = el || elem;
	return jQuery.css( elem, "display" ) === "none" || !jQuery.contains( elem.ownerDocument, elem );
}

function showHide( elements, show ) {
	var display, elem, hidden,
		values = [],
		index = 0,
		length = elements.length;

	for ( ; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}

		values[ index ] = jQuery._data( elem, "olddisplay" );
		display = elem.style.display;
		if ( show ) {
			// Reset the inline display of this element to learn if it is
			// being hidden by cascaded rules or not
			if ( !values[ index ] && display === "none" ) {
				elem.style.display = "";
			}

			// Set elements which have been overridden with display: none
			// in a stylesheet to whatever the default browser style is
			// for such an element
			if ( elem.style.display === "" && isHidden( elem ) ) {
				values[ index ] = jQuery._data( elem, "olddisplay", css_defaultDisplay(elem.nodeName) );
			}
		} else {

			if ( !values[ index ] ) {
				hidden = isHidden( elem );

				if ( display && display !== "none" || !hidden ) {
					jQuery._data( elem, "olddisplay", hidden ? display : jQuery.css( elem, "display" ) );
				}
			}
		}
	}

	// Set the display of most of the elements in a second loop
	// to avoid the constant reflow
	for ( index = 0; index < length; index++ ) {
		elem = elements[ index ];
		if ( !elem.style ) {
			continue;
		}
		if ( !show || elem.style.display === "none" || elem.style.display === "" ) {
			elem.style.display = show ? values[ index ] || "" : "none";
		}
	}

	return elements;
}

jQuery.fn.extend({
	css: function( name, value ) {
		return jQuery.access( this, function( elem, name, value ) {
			var len, styles,
				map = {},
				i = 0;

			if ( jQuery.isArray( name ) ) {
				styles = getStyles( elem );
				len = name.length;

				for ( ; i < len; i++ ) {
					map[ name[ i ] ] = jQuery.css( elem, name[ i ], false, styles );
				}

				return map;
			}

			return value !== undefined ?
				jQuery.style( elem, name, value ) :
				jQuery.css( elem, name );
		}, name, value, arguments.length > 1 );
	},
	show: function() {
		return showHide( this, true );
	},
	hide: function() {
		return showHide( this );
	},
	toggle: function( state ) {
		if ( typeof state === "boolean" ) {
			return state ? this.show() : this.hide();
		}

		return this.each(function() {
			if ( isHidden( this ) ) {
				jQuery( this ).show();
			} else {
				jQuery( this ).hide();
			}
		});
	}
});

jQuery.extend({
	// Add in style property hooks for overriding the default
	// behavior of getting and setting a style property
	cssHooks: {
		opacity: {
			get: function( elem, computed ) {
				if ( computed ) {
					// We should always get a number back from opacity
					var ret = curCSS( elem, "opacity" );
					return ret === "" ? "1" : ret;
				}
			}
		}
	},

	// Don't automatically add "px" to these possibly-unitless properties
	cssNumber: {
		"columnCount": true,
		"fillOpacity": true,
		"fontWeight": true,
		"lineHeight": true,
		"opacity": true,
		"order": true,
		"orphans": true,
		"widows": true,
		"zIndex": true,
		"zoom": true
	},

	// Add in properties whose names you wish to fix before
	// setting or getting the value
	cssProps: {
		// normalize float css property
		"float": jQuery.support.cssFloat ? "cssFloat" : "styleFloat"
	},

	// Get and set the style property on a DOM Node
	style: function( elem, name, value, extra ) {
		// Don't set styles on text and comment nodes
		if ( !elem || elem.nodeType === 3 || elem.nodeType === 8 || !elem.style ) {
			return;
		}

		// Make sure that we're working with the right name
		var ret, type, hooks,
			origName = jQuery.camelCase( name ),
			style = elem.style;

		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// Check if we're setting a value
		if ( value !== undefined ) {
			type = typeof value;

			// convert relative number strings (+= or -=) to relative numbers. #7345
			if ( type === "string" && (ret = rrelNum.exec( value )) ) {
				value = ( ret[1] + 1 ) * ret[2] + parseFloat( jQuery.css( elem, name ) );
				// Fixes bug #9237
				type = "number";
			}

			// Make sure that NaN and null values aren't set. See: #7116
			if ( value == null || type === "number" && isNaN( value ) ) {
				return;
			}

			// If a number was passed in, add 'px' to the (except for certain CSS properties)
			if ( type === "number" && !jQuery.cssNumber[ origName ] ) {
				value += "px";
			}

			// Fixes #8908, it can be done more correctly by specifing setters in cssHooks,
			// but it would mean to define eight (for every problematic property) identical functions
			if ( !jQuery.support.clearCloneStyle && value === "" && name.indexOf("background") === 0 ) {
				style[ name ] = "inherit";
			}

			// If a hook was provided, use that value, otherwise just set the specified value
			if ( !hooks || !("set" in hooks) || (value = hooks.set( elem, value, extra )) !== undefined ) {

				// Wrapped to prevent IE from throwing errors when 'invalid' values are provided
				// Fixes bug #5509
				try {
					style[ name ] = value;
				} catch(e) {}
			}

		} else {
			// If a hook was provided get the non-computed value from there
			if ( hooks && "get" in hooks && (ret = hooks.get( elem, false, extra )) !== undefined ) {
				return ret;
			}

			// Otherwise just get the value from the style object
			return style[ name ];
		}
	},

	css: function( elem, name, extra, styles ) {
		var num, val, hooks,
			origName = jQuery.camelCase( name );

		// Make sure that we're working with the right name
		name = jQuery.cssProps[ origName ] || ( jQuery.cssProps[ origName ] = vendorPropName( elem.style, origName ) );

		// gets hook for the prefixed version
		// followed by the unprefixed version
		hooks = jQuery.cssHooks[ name ] || jQuery.cssHooks[ origName ];

		// If a hook was provided get the computed value from there
		if ( hooks && "get" in hooks ) {
			val = hooks.get( elem, true, extra );
		}

		// Otherwise, if a way to get the computed value exists, use that
		if ( val === undefined ) {
			val = curCSS( elem, name, styles );
		}

		//convert "normal" to computed value
		if ( val === "normal" && name in cssNormalTransform ) {
			val = cssNormalTransform[ name ];
		}

		// Return, converting to number if forced or a qualifier was provided and val looks numeric
		if ( extra === "" || extra ) {
			num = parseFloat( val );
			return extra === true || jQuery.isNumeric( num ) ? num || 0 : val;
		}
		return val;
	}
});

// NOTE: we've included the "window" in window.getComputedStyle
// because jsdom on node.js will break without it.
if ( window.getComputedStyle ) {
	getStyles = function( elem ) {
		return window.getComputedStyle( elem, null );
	};

	curCSS = function( elem, name, _computed ) {
		var width, minWidth, maxWidth,
			computed = _computed || getStyles( elem ),

			// getPropertyValue is only needed for .css('filter') in IE9, see #12537
			ret = computed ? computed.getPropertyValue( name ) || computed[ name ] : undefined,
			style = elem.style;

		if ( computed ) {

			if ( ret === "" && !jQuery.contains( elem.ownerDocument, elem ) ) {
				ret = jQuery.style( elem, name );
			}

			// A tribute to the "awesome hack by Dean Edwards"
			// Chrome < 17 and Safari 5.0 uses "computed value" instead of "used value" for margin-right
			// Safari 5.1.7 (at least) returns percentage for a larger set of values, but width seems to be reliably pixels
			// this is against the CSSOM draft spec: http://dev.w3.org/csswg/cssom/#resolved-values
			if ( rnumnonpx.test( ret ) && rmargin.test( name ) ) {

				// Remember the original values
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				// Put in the new values to get a computed value out
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				// Revert the changed values
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		return ret;
	};
} else if ( document.documentElement.currentStyle ) {
	getStyles = function( elem ) {
		return elem.currentStyle;
	};

	curCSS = function( elem, name, _computed ) {
		var left, rs, rsLeft,
			computed = _computed || getStyles( elem ),
			ret = computed ? computed[ name ] : undefined,
			style = elem.style;

		// Avoid setting ret to empty string here
		// so we don't default to auto
		if ( ret == null && style && style[ name ] ) {
			ret = style[ name ];
		}

		// From the awesome hack by Dean Edwards
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		// If we're not dealing with a regular pixel number
		// but a number that has a weird ending, we need to convert it to pixels
		// but not position css attributes, as those are proportional to the parent element instead
		// and we can't measure the parent instead because it might trigger a "stacking dolls" problem
		if ( rnumnonpx.test( ret ) && !rposition.test( name ) ) {

			// Remember the original values
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			// Put in the new values to get a computed value out
			if ( rsLeft ) {
				rs.left = elem.currentStyle.left;
			}
			style.left = name === "fontSize" ? "1em" : ret;
			ret = style.pixelLeft + "px";

			// Revert the changed values
			style.left = left;
			if ( rsLeft ) {
				rs.left = rsLeft;
			}
		}

		return ret === "" ? "auto" : ret;
	};
}

function setPositiveNumber( elem, value, subtract ) {
	var matches = rnumsplit.exec( value );
	return matches ?
		// Guard against undefined "subtract", e.g., when used as in cssHooks
		Math.max( 0, matches[ 1 ] - ( subtract || 0 ) ) + ( matches[ 2 ] || "px" ) :
		value;
}

function augmentWidthOrHeight( elem, name, extra, isBorderBox, styles ) {
	var i = extra === ( isBorderBox ? "border" : "content" ) ?
		// If we already have the right measurement, avoid augmentation
		4 :
		// Otherwise initialize for horizontal or vertical properties
		name === "width" ? 1 : 0,

		val = 0;

	for ( ; i < 4; i += 2 ) {
		// both box models exclude margin, so add it if we want it
		if ( extra === "margin" ) {
			val += jQuery.css( elem, extra + cssExpand[ i ], true, styles );
		}

		if ( isBorderBox ) {
			// border-box includes padding, so remove it if we want content
			if ( extra === "content" ) {
				val -= jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );
			}

			// at this point, extra isn't border nor margin, so remove border
			if ( extra !== "margin" ) {
				val -= jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		} else {
			// at this point, extra isn't content, so add padding
			val += jQuery.css( elem, "padding" + cssExpand[ i ], true, styles );

			// at this point, extra isn't content nor padding, so add border
			if ( extra !== "padding" ) {
				val += jQuery.css( elem, "border" + cssExpand[ i ] + "Width", true, styles );
			}
		}
	}

	return val;
}

function getWidthOrHeight( elem, name, extra ) {

	// Start with offset property, which is equivalent to the border-box value
	var valueIsBorderBox = true,
		val = name === "width" ? elem.offsetWidth : elem.offsetHeight,
		styles = getStyles( elem ),
		isBorderBox = jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box";

	// some non-html elements return undefined for offsetWidth, so check for null/undefined
	// svg - https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML - https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if ( val <= 0 || val == null ) {
		// Fall back to computed then uncomputed css if necessary
		val = curCSS( elem, name, styles );
		if ( val < 0 || val == null ) {
			val = elem.style[ name ];
		}

		// Computed unit is not pixels. Stop here and return.
		if ( rnumnonpx.test(val) ) {
			return val;
		}

		// we need the check for style in case a browser which returns unreliable values
		// for getComputedStyle silently falls back to the reliable elem.style
		valueIsBorderBox = isBorderBox && ( jQuery.support.boxSizingReliable || val === elem.style[ name ] );

		// Normalize "", auto, and prepare for extra
		val = parseFloat( val ) || 0;
	}

	// use the active box-sizing model to add/subtract irrelevant styles
	return ( val +
		augmentWidthOrHeight(
			elem,
			name,
			extra || ( isBorderBox ? "border" : "content" ),
			valueIsBorderBox,
			styles
		)
	) + "px";
}

// Try to determine the default display value of an element
function css_defaultDisplay( nodeName ) {
	var doc = document,
		display = elemdisplay[ nodeName ];

	if ( !display ) {
		display = actualDisplay( nodeName, doc );

		// If the simple way fails, read from inside an iframe
		if ( display === "none" || !display ) {
			// Use the already-created iframe if possible
			iframe = ( iframe ||
				jQuery("<iframe frameborder='0' width='0' height='0'/>")
				.css( "cssText", "display:block !important" )
			).appendTo( doc.documentElement );

			// Always write a new HTML skeleton so Webkit and Firefox don't choke on reuse
			doc = ( iframe[0].contentWindow || iframe[0].contentDocument ).document;
			doc.write("<!doctype html><html><body>");
			doc.close();

			display = actualDisplay( nodeName, doc );
			iframe.detach();
		}

		// Store the correct default display
		elemdisplay[ nodeName ] = display;
	}

	return display;
}

// Called ONLY from within css_defaultDisplay
function actualDisplay( name, doc ) {
	var elem = jQuery( doc.createElement( name ) ).appendTo( doc.body ),
		display = jQuery.css( elem[0], "display" );
	elem.remove();
	return display;
}

jQuery.each([ "height", "width" ], function( i, name ) {
	jQuery.cssHooks[ name ] = {
		get: function( elem, computed, extra ) {
			if ( computed ) {
				// certain elements can have dimension info if we invisibly show them
				// however, it must have a current display style that would benefit from this
				return elem.offsetWidth === 0 && rdisplayswap.test( jQuery.css( elem, "display" ) ) ?
					jQuery.swap( elem, cssShow, function() {
						return getWidthOrHeight( elem, name, extra );
					}) :
					getWidthOrHeight( elem, name, extra );
			}
		},

		set: function( elem, value, extra ) {
			var styles = extra && getStyles( elem );
			return setPositiveNumber( elem, value, extra ?
				augmentWidthOrHeight(
					elem,
					name,
					extra,
					jQuery.support.boxSizing && jQuery.css( elem, "boxSizing", false, styles ) === "border-box",
					styles
				) : 0
			);
		}
	};
});

if ( !jQuery.support.opacity ) {
	jQuery.cssHooks.opacity = {
		get: function( elem, computed ) {
			// IE uses filters for opacity
			return ropacity.test( (computed && elem.currentStyle ? elem.currentStyle.filter : elem.style.filter) || "" ) ?
				( 0.01 * parseFloat( RegExp.$1 ) ) + "" :
				computed ? "1" : "";
		},

		set: function( elem, value ) {
			var style = elem.style,
				currentStyle = elem.currentStyle,
				opacity = jQuery.isNumeric( value ) ? "alpha(opacity=" + value * 100 + ")" : "",
				filter = currentStyle && currentStyle.filter || style.filter || "";

			// IE has trouble with opacity if it does not have layout
			// Force it by setting the zoom level
			style.zoom = 1;

			// if setting opacity to 1, and no other filters exist - attempt to remove filter attribute #6652
			// if value === "", then remove inline opacity #12685
			if ( ( value >= 1 || value === "" ) &&
					jQuery.trim( filter.replace( ralpha, "" ) ) === "" &&
					style.removeAttribute ) {

				// Setting style.filter to null, "" & " " still leave "filter:" in the cssText
				// if "filter:" is present at all, clearType is disabled, we want to avoid this
				// style.removeAttribute is IE Only, but so apparently is this code path...
				style.removeAttribute( "filter" );

				// if there is no filter style applied in a css rule or unset inline opacity, we are done
				if ( value === "" || currentStyle && !currentStyle.filter ) {
					return;
				}
			}

			// otherwise, set new filter values
			style.filter = ralpha.test( filter ) ?
				filter.replace( ralpha, opacity ) :
				filter + " " + opacity;
		}
	};
}

// These hooks cannot be added until DOM ready because the support test
// for it is not run until after DOM ready
jQuery(function() {
	if ( !jQuery.support.reliableMarginRight ) {
		jQuery.cssHooks.marginRight = {
			get: function( elem, computed ) {
				if ( computed ) {
					// WebKit Bug 13343 - getComputedStyle returns wrong value for margin-right
					// Work around by temporarily setting element display to inline-block
					return jQuery.swap( elem, { "display": "inline-block" },
						curCSS, [ elem, "marginRight" ] );
				}
			}
		};
	}

	// Webkit bug: https://bugs.webkit.org/show_bug.cgi?id=29084
	// getComputedStyle returns percent when specified for top/left/bottom/right
	// rather than make the css module depend on the offset module, we just check for it here
	if ( !jQuery.support.pixelPosition && jQuery.fn.position ) {
		jQuery.each( [ "top", "left" ], function( i, prop ) {
			jQuery.cssHooks[ prop ] = {
				get: function( elem, computed ) {
					if ( computed ) {
						computed = curCSS( elem, prop );
						// if curCSS returns percentage, fallback to offset
						return rnumnonpx.test( computed ) ?
							jQuery( elem ).position()[ prop ] + "px" :
							computed;
					}
				}
			};
		});
	}

});

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.hidden = function( elem ) {
		// Support: Opera <= 12.12
		// Opera reports offsetWidths and offsetHeights less than zero on some elements
		return elem.offsetWidth <= 0 && elem.offsetHeight <= 0 ||
			(!jQuery.support.reliableHiddenOffsets && ((elem.style && elem.style.display) || jQuery.css( elem, "display" )) === "none");
	};

	jQuery.expr.filters.visible = function( elem ) {
		return !jQuery.expr.filters.hidden( elem );
	};
}

// These hooks are used by animate to expand properties
jQuery.each({
	margin: "",
	padding: "",
	border: "Width"
}, function( prefix, suffix ) {
	jQuery.cssHooks[ prefix + suffix ] = {
		expand: function( value ) {
			var i = 0,
				expanded = {},

				// assumes a single number if not a string
				parts = typeof value === "string" ? value.split(" ") : [ value ];

			for ( ; i < 4; i++ ) {
				expanded[ prefix + cssExpand[ i ] + suffix ] =
					parts[ i ] || parts[ i - 2 ] || parts[ 0 ];
			}

			return expanded;
		}
	};

	if ( !rmargin.test( prefix ) ) {
		jQuery.cssHooks[ prefix + suffix ].set = setPositiveNumber;
	}
});
var r20 = /%20/g,
	rbracket = /\[\]$/,
	rCRLF = /\r?\n/g,
	rsubmitterTypes = /^(?:submit|button|image|reset|file)$/i,
	rsubmittable = /^(?:input|select|textarea|keygen)/i;

jQuery.fn.extend({
	serialize: function() {
		return jQuery.param( this.serializeArray() );
	},
	serializeArray: function() {
		return this.map(function(){
			// Can add propHook for "elements" to filter or add form elements
			var elements = jQuery.prop( this, "elements" );
			return elements ? jQuery.makeArray( elements ) : this;
		})
		.filter(function(){
			var type = this.type;
			// Use .is(":disabled") so that fieldset[disabled] works
			return this.name && !jQuery( this ).is( ":disabled" ) &&
				rsubmittable.test( this.nodeName ) && !rsubmitterTypes.test( type ) &&
				( this.checked || !manipulation_rcheckableType.test( type ) );
		})
		.map(function( i, elem ){
			var val = jQuery( this ).val();

			return val == null ?
				null :
				jQuery.isArray( val ) ?
					jQuery.map( val, function( val ){
						return { name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
					}) :
					{ name: elem.name, value: val.replace( rCRLF, "\r\n" ) };
		}).get();
	}
});

//Serialize an array of form elements or a set of
//key/values into a query string
jQuery.param = function( a, traditional ) {
	var prefix,
		s = [],
		add = function( key, value ) {
			// If value is a function, invoke it and return its value
			value = jQuery.isFunction( value ) ? value() : ( value == null ? "" : value );
			s[ s.length ] = encodeURIComponent( key ) + "=" + encodeURIComponent( value );
		};

	// Set traditional to true for jQuery <= 1.3.2 behavior.
	if ( traditional === undefined ) {
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	// If an array was passed in, assume that it is an array of form elements.
	if ( jQuery.isArray( a ) || ( a.jquery && !jQuery.isPlainObject( a ) ) ) {
		// Serialize the form elements
		jQuery.each( a, function() {
			add( this.name, this.value );
		});

	} else {
		// If traditional, encode the "old" way (the way 1.3.2 or older
		// did it), otherwise encode params recursively.
		for ( prefix in a ) {
			buildParams( prefix, a[ prefix ], traditional, add );
		}
	}

	// Return the resulting serialization
	return s.join( "&" ).replace( r20, "+" );
};

function buildParams( prefix, obj, traditional, add ) {
	var name;

	if ( jQuery.isArray( obj ) ) {
		// Serialize array item.
		jQuery.each( obj, function( i, v ) {
			if ( traditional || rbracket.test( prefix ) ) {
				// Treat each array item as a scalar.
				add( prefix, v );

			} else {
				// Item is non-scalar (array or object), encode its numeric index.
				buildParams( prefix + "[" + ( typeof v === "object" ? i : "" ) + "]", v, traditional, add );
			}
		});

	} else if ( !traditional && jQuery.type( obj ) === "object" ) {
		// Serialize object item.
		for ( name in obj ) {
			buildParams( prefix + "[" + name + "]", obj[ name ], traditional, add );
		}

	} else {
		// Serialize scalar item.
		add( prefix, obj );
	}
}
jQuery.each( ("blur focus focusin focusout load resize scroll unload click dblclick " +
	"mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave " +
	"change select submit keydown keypress keyup error contextmenu").split(" "), function( i, name ) {

	// Handle event binding
	jQuery.fn[ name ] = function( data, fn ) {
		return arguments.length > 0 ?
			this.on( name, null, data, fn ) :
			this.trigger( name );
	};
});

jQuery.fn.extend({
	hover: function( fnOver, fnOut ) {
		return this.mouseenter( fnOver ).mouseleave( fnOut || fnOver );
	},

	bind: function( types, data, fn ) {
		return this.on( types, null, data, fn );
	},
	unbind: function( types, fn ) {
		return this.off( types, null, fn );
	},

	delegate: function( selector, types, data, fn ) {
		return this.on( types, selector, data, fn );
	},
	undelegate: function( selector, types, fn ) {
		// ( namespace ) or ( selector, types [, fn] )
		return arguments.length === 1 ? this.off( selector, "**" ) : this.off( types, selector || "**", fn );
	}
});
var
	// Document location
	ajaxLocParts,
	ajaxLocation,
	ajax_nonce = jQuery.now(),

	ajax_rquery = /\?/,
	rhash = /#.*$/,
	rts = /([?&])_=[^&]*/,
	rheaders = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, // IE leaves an \r character at EOL
	// #7653, #8125, #8152: local protocol detection
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/,
	rnoContent = /^(?:GET|HEAD)$/,
	rprotocol = /^\/\//,
	rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,

	// Keep a copy of the old load method
	_load = jQuery.fn.load,

	/* Prefilters
	 * 1) They are useful to introduce custom dataTypes (see ajax/jsonp.js for an example)
	 * 2) These are called:
	 *    - BEFORE asking for a transport
	 *    - AFTER param serialization (s.data is a string if s.processData is true)
	 * 3) key is the dataType
	 * 4) the catchall symbol "*" can be used
	 * 5) execution will start with transport dataType and THEN continue down to "*" if needed
	 */
	prefilters = {},

	/* Transports bindings
	 * 1) key is the dataType
	 * 2) the catchall symbol "*" can be used
	 * 3) selection will start with transport dataType and THEN go to "*" if needed
	 */
	transports = {},

	// Avoid comment-prolog char sequence (#10098); must appease lint and evade compression
	allTypes = "*/".concat("*");

// #8138, IE may throw an exception when accessing
// a field from window.location if document.domain has been set
try {
	ajaxLocation = location.href;
} catch( e ) {
	// Use the href attribute of an A element
	// since IE will modify it given document.location
	ajaxLocation = document.createElement( "a" );
	ajaxLocation.href = "";
	ajaxLocation = ajaxLocation.href;
}

// Segment location into parts
ajaxLocParts = rurl.exec( ajaxLocation.toLowerCase() ) || [];

// Base "constructor" for jQuery.ajaxPrefilter and jQuery.ajaxTransport
function addToPrefiltersOrTransports( structure ) {

	// dataTypeExpression is optional and defaults to "*"
	return function( dataTypeExpression, func ) {

		if ( typeof dataTypeExpression !== "string" ) {
			func = dataTypeExpression;
			dataTypeExpression = "*";
		}

		var dataType,
			i = 0,
			dataTypes = dataTypeExpression.toLowerCase().match( core_rnotwhite ) || [];

		if ( jQuery.isFunction( func ) ) {
			// For each dataType in the dataTypeExpression
			while ( (dataType = dataTypes[i++]) ) {
				// Prepend if requested
				if ( dataType[0] === "+" ) {
					dataType = dataType.slice( 1 ) || "*";
					(structure[ dataType ] = structure[ dataType ] || []).unshift( func );

				// Otherwise append
				} else {
					(structure[ dataType ] = structure[ dataType ] || []).push( func );
				}
			}
		}
	};
}

// Base inspection function for prefilters and transports
function inspectPrefiltersOrTransports( structure, options, originalOptions, jqXHR ) {

	var inspected = {},
		seekingTransport = ( structure === transports );

	function inspect( dataType ) {
		var selected;
		inspected[ dataType ] = true;
		jQuery.each( structure[ dataType ] || [], function( _, prefilterOrFactory ) {
			var dataTypeOrTransport = prefilterOrFactory( options, originalOptions, jqXHR );
			if( typeof dataTypeOrTransport === "string" && !seekingTransport && !inspected[ dataTypeOrTransport ] ) {
				options.dataTypes.unshift( dataTypeOrTransport );
				inspect( dataTypeOrTransport );
				return false;
			} else if ( seekingTransport ) {
				return !( selected = dataTypeOrTransport );
			}
		});
		return selected;
	}

	return inspect( options.dataTypes[ 0 ] ) || !inspected[ "*" ] && inspect( "*" );
}

// A special extend for ajax options
// that takes "flat" options (not to be deep extended)
// Fixes #9887
function ajaxExtend( target, src ) {
	var deep, key,
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for ( key in src ) {
		if ( src[ key ] !== undefined ) {
			( flatOptions[ key ] ? target : ( deep || (deep = {}) ) )[ key ] = src[ key ];
		}
	}
	if ( deep ) {
		jQuery.extend( true, target, deep );
	}

	return target;
}

jQuery.fn.load = function( url, params, callback ) {
	if ( typeof url !== "string" && _load ) {
		return _load.apply( this, arguments );
	}

	var selector, response, type,
		self = this,
		off = url.indexOf(" ");

	if ( off >= 0 ) {
		selector = url.slice( off, url.length );
		url = url.slice( 0, off );
	}

	// If it's a function
	if ( jQuery.isFunction( params ) ) {

		// We assume that it's the callback
		callback = params;
		params = undefined;

	// Otherwise, build a param string
	} else if ( params && typeof params === "object" ) {
		type = "POST";
	}

	// If we have elements to modify, make the request
	if ( self.length > 0 ) {
		jQuery.ajax({
			url: url,

			// if "type" variable is undefined, then "GET" method will be used
			type: type,
			dataType: "html",
			data: params
		}).done(function( responseText ) {

			// Save response for use in complete callback
			response = arguments;

			self.html( selector ?

				// If a selector was specified, locate the right elements in a dummy div
				// Exclude scripts to avoid IE 'Permission Denied' errors
				jQuery("<div>").append( jQuery.parseHTML( responseText ) ).find( selector ) :

				// Otherwise use the full result
				responseText );

		}).complete( callback && function( jqXHR, status ) {
			self.each( callback, response || [ jqXHR.responseText, status, jqXHR ] );
		});
	}

	return this;
};

// Attach a bunch of functions for handling common AJAX events
jQuery.each( [ "ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend" ], function( i, type ){
	jQuery.fn[ type ] = function( fn ){
		return this.on( type, fn );
	};
});

jQuery.extend({

	// Counter for holding the number of active queries
	active: 0,

	// Last-Modified header cache for next request
	lastModified: {},
	etag: {},

	ajaxSettings: {
		url: ajaxLocation,
		type: "GET",
		isLocal: rlocalProtocol.test( ajaxLocParts[ 1 ] ),
		global: true,
		processData: true,
		async: true,
		contentType: "application/x-www-form-urlencoded; charset=UTF-8",
		/*
		timeout: 0,
		data: null,
		dataType: null,
		username: null,
		password: null,
		cache: null,
		throws: false,
		traditional: false,
		headers: {},
		*/

		accepts: {
			"*": allTypes,
			text: "text/plain",
			html: "text/html",
			xml: "application/xml, text/xml",
			json: "application/json, text/javascript"
		},

		contents: {
			xml: /xml/,
			html: /html/,
			json: /json/
		},

		responseFields: {
			xml: "responseXML",
			text: "responseText",
			json: "responseJSON"
		},

		// Data converters
		// Keys separate source (or catchall "*") and destination types with a single space
		converters: {

			// Convert anything to text
			"* text": String,

			// Text to html (true = no transformation)
			"text html": true,

			// Evaluate text as a json expression
			"text json": jQuery.parseJSON,

			// Parse text as xml
			"text xml": jQuery.parseXML
		},

		// For options that shouldn't be deep extended:
		// you can add your own custom options here if
		// and when you create one that shouldn't be
		// deep extended (see ajaxExtend)
		flatOptions: {
			url: true,
			context: true
		}
	},

	// Creates a full fledged settings object into target
	// with both ajaxSettings and settings fields.
	// If target is omitted, writes into ajaxSettings.
	ajaxSetup: function( target, settings ) {
		return settings ?

			// Building a settings object
			ajaxExtend( ajaxExtend( target, jQuery.ajaxSettings ), settings ) :

			// Extending ajaxSettings
			ajaxExtend( jQuery.ajaxSettings, target );
	},

	ajaxPrefilter: addToPrefiltersOrTransports( prefilters ),
	ajaxTransport: addToPrefiltersOrTransports( transports ),

	// Main method
	ajax: function( url, options ) {

		// If url is an object, simulate pre-1.5 signature
		if ( typeof url === "object" ) {
			options = url;
			url = undefined;
		}

		// Force options to be an object
		options = options || {};

		var // Cross-domain detection vars
			parts,
			// Loop variable
			i,
			// URL without anti-cache param
			cacheURL,
			// Response headers as string
			responseHeadersString,
			// timeout handle
			timeoutTimer,

			// To know if global events are to be dispatched
			fireGlobals,

			transport,
			// Response headers
			responseHeaders,
			// Create the final options object
			s = jQuery.ajaxSetup( {}, options ),
			// Callbacks context
			callbackContext = s.context || s,
			// Context for global events is callbackContext if it is a DOM node or jQuery collection
			globalEventContext = s.context && ( callbackContext.nodeType || callbackContext.jquery ) ?
				jQuery( callbackContext ) :
				jQuery.event,
			// Deferreds
			deferred = jQuery.Deferred(),
			completeDeferred = jQuery.Callbacks("once memory"),
			// Status-dependent callbacks
			statusCode = s.statusCode || {},
			// Headers (they are sent all at once)
			requestHeaders = {},
			requestHeadersNames = {},
			// The jqXHR state
			state = 0,
			// Default abort message
			strAbort = "canceled",
			// Fake xhr
			jqXHR = {
				readyState: 0,

				// Builds headers hashtable if needed
				getResponseHeader: function( key ) {
					var match;
					if ( state === 2 ) {
						if ( !responseHeaders ) {
							responseHeaders = {};
							while ( (match = rheaders.exec( responseHeadersString )) ) {
								responseHeaders[ match[1].toLowerCase() ] = match[ 2 ];
							}
						}
						match = responseHeaders[ key.toLowerCase() ];
					}
					return match == null ? null : match;
				},

				// Raw string
				getAllResponseHeaders: function() {
					return state === 2 ? responseHeadersString : null;
				},

				// Caches the header
				setRequestHeader: function( name, value ) {
					var lname = name.toLowerCase();
					if ( !state ) {
						name = requestHeadersNames[ lname ] = requestHeadersNames[ lname ] || name;
						requestHeaders[ name ] = value;
					}
					return this;
				},

				// Overrides response content-type header
				overrideMimeType: function( type ) {
					if ( !state ) {
						s.mimeType = type;
					}
					return this;
				},

				// Status-dependent callbacks
				statusCode: function( map ) {
					var code;
					if ( map ) {
						if ( state < 2 ) {
							for ( code in map ) {
								// Lazy-add the new callback in a way that preserves old ones
								statusCode[ code ] = [ statusCode[ code ], map[ code ] ];
							}
						} else {
							// Execute the appropriate callbacks
							jqXHR.always( map[ jqXHR.status ] );
						}
					}
					return this;
				},

				// Cancel the request
				abort: function( statusText ) {
					var finalText = statusText || strAbort;
					if ( transport ) {
						transport.abort( finalText );
					}
					done( 0, finalText );
					return this;
				}
			};

		// Attach deferreds
		deferred.promise( jqXHR ).complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		// Remove hash character (#7531: and string promotion)
		// Add protocol if not provided (#5866: IE7 issue with protocol-less urls)
		// Handle falsy url in the settings object (#10093: consistency with old signature)
		// We also use the url parameter if available
		s.url = ( ( url || s.url || ajaxLocation ) + "" ).replace( rhash, "" ).replace( rprotocol, ajaxLocParts[ 1 ] + "//" );

		// Alias method option to type as per ticket #12004
		s.type = options.method || options.type || s.method || s.type;

		// Extract dataTypes list
		s.dataTypes = jQuery.trim( s.dataType || "*" ).toLowerCase().match( core_rnotwhite ) || [""];

		// A cross-domain request is in order when we have a protocol:host:port mismatch
		if ( s.crossDomain == null ) {
			parts = rurl.exec( s.url.toLowerCase() );
			s.crossDomain = !!( parts &&
				( parts[ 1 ] !== ajaxLocParts[ 1 ] || parts[ 2 ] !== ajaxLocParts[ 2 ] ||
					( parts[ 3 ] || ( parts[ 1 ] === "http:" ? "80" : "443" ) ) !==
						( ajaxLocParts[ 3 ] || ( ajaxLocParts[ 1 ] === "http:" ? "80" : "443" ) ) )
			);
		}

		// Convert data if not already a string
		if ( s.data && s.processData && typeof s.data !== "string" ) {
			s.data = jQuery.param( s.data, s.traditional );
		}

		// Apply prefilters
		inspectPrefiltersOrTransports( prefilters, s, options, jqXHR );

		// If request was aborted inside a prefilter, stop there
		if ( state === 2 ) {
			return jqXHR;
		}

		// We can fire global events as of now if asked to
		fireGlobals = s.global;

		// Watch for a new set of requests
		if ( fireGlobals && jQuery.active++ === 0 ) {
			jQuery.event.trigger("ajaxStart");
		}

		// Uppercase the type
		s.type = s.type.toUpperCase();

		// Determine if request has content
		s.hasContent = !rnoContent.test( s.type );

		// Save the URL in case we're toying with the If-Modified-Since
		// and/or If-None-Match header later on
		cacheURL = s.url;

		// More options handling for requests with no content
		if ( !s.hasContent ) {

			// If data is available, append data to url
			if ( s.data ) {
				cacheURL = ( s.url += ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + s.data );
				// #9682: remove data so that it's not used in an eventual retry
				delete s.data;
			}

			// Add anti-cache in url if needed
			if ( s.cache === false ) {
				s.url = rts.test( cacheURL ) ?

					// If there is already a '_' parameter, set its value
					cacheURL.replace( rts, "$1_=" + ajax_nonce++ ) :

					// Otherwise add one to the end
					cacheURL + ( ajax_rquery.test( cacheURL ) ? "&" : "?" ) + "_=" + ajax_nonce++;
			}
		}

		// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
		if ( s.ifModified ) {
			if ( jQuery.lastModified[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-Modified-Since", jQuery.lastModified[ cacheURL ] );
			}
			if ( jQuery.etag[ cacheURL ] ) {
				jqXHR.setRequestHeader( "If-None-Match", jQuery.etag[ cacheURL ] );
			}
		}

		// Set the correct header, if data is being sent
		if ( s.data && s.hasContent && s.contentType !== false || options.contentType ) {
			jqXHR.setRequestHeader( "Content-Type", s.contentType );
		}

		// Set the Accepts header for the server, depending on the dataType
		jqXHR.setRequestHeader(
			"Accept",
			s.dataTypes[ 0 ] && s.accepts[ s.dataTypes[0] ] ?
				s.accepts[ s.dataTypes[0] ] + ( s.dataTypes[ 0 ] !== "*" ? ", " + allTypes + "; q=0.01" : "" ) :
				s.accepts[ "*" ]
		);

		// Check for headers option
		for ( i in s.headers ) {
			jqXHR.setRequestHeader( i, s.headers[ i ] );
		}

		// Allow custom headers/mimetypes and early abort
		if ( s.beforeSend && ( s.beforeSend.call( callbackContext, jqXHR, s ) === false || state === 2 ) ) {
			// Abort if not done already and return
			return jqXHR.abort();
		}

		// aborting is no longer a cancellation
		strAbort = "abort";

		// Install callbacks on deferreds
		for ( i in { success: 1, error: 1, complete: 1 } ) {
			jqXHR[ i ]( s[ i ] );
		}

		// Get transport
		transport = inspectPrefiltersOrTransports( transports, s, options, jqXHR );

		// If no transport, we auto-abort
		if ( !transport ) {
			done( -1, "No Transport" );
		} else {
			jqXHR.readyState = 1;

			// Send global event
			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxSend", [ jqXHR, s ] );
			}
			// Timeout
			if ( s.async && s.timeout > 0 ) {
				timeoutTimer = setTimeout(function() {
					jqXHR.abort("timeout");
				}, s.timeout );
			}

			try {
				state = 1;
				transport.send( requestHeaders, done );
			} catch ( e ) {
				// Propagate exception as error if not done
				if ( state < 2 ) {
					done( -1, e );
				// Simply rethrow otherwise
				} else {
					throw e;
				}
			}
		}

		// Callback for when everything is done
		function done( status, nativeStatusText, responses, headers ) {
			var isSuccess, success, error, response, modified,
				statusText = nativeStatusText;

			// Called once
			if ( state === 2 ) {
				return;
			}

			// State is "done" now
			state = 2;

			// Clear timeout if it exists
			if ( timeoutTimer ) {
				clearTimeout( timeoutTimer );
			}

			// Dereference transport for early garbage collection
			// (no matter how long the jqXHR object will be used)
			transport = undefined;

			// Cache response headers
			responseHeadersString = headers || "";

			// Set readyState
			jqXHR.readyState = status > 0 ? 4 : 0;

			// Determine if successful
			isSuccess = status >= 200 && status < 300 || status === 304;

			// Get response data
			if ( responses ) {
				response = ajaxHandleResponses( s, jqXHR, responses );
			}

			// Convert no matter what (that way responseXXX fields are always set)
			response = ajaxConvert( s, response, jqXHR, isSuccess );

			// If successful, handle type chaining
			if ( isSuccess ) {

				// Set the If-Modified-Since and/or If-None-Match header, if in ifModified mode.
				if ( s.ifModified ) {
					modified = jqXHR.getResponseHeader("Last-Modified");
					if ( modified ) {
						jQuery.lastModified[ cacheURL ] = modified;
					}
					modified = jqXHR.getResponseHeader("etag");
					if ( modified ) {
						jQuery.etag[ cacheURL ] = modified;
					}
				}

				// if no content
				if ( status === 204 || s.type === "HEAD" ) {
					statusText = "nocontent";

				// if not modified
				} else if ( status === 304 ) {
					statusText = "notmodified";

				// If we have data, let's convert it
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess = !error;
				}
			} else {
				// We extract error from statusText
				// then normalize statusText and status for non-aborts
				error = statusText;
				if ( status || !statusText ) {
					statusText = "error";
					if ( status < 0 ) {
						status = 0;
					}
				}
			}

			// Set data for the fake xhr object
			jqXHR.status = status;
			jqXHR.statusText = ( nativeStatusText || statusText ) + "";

			// Success/Error
			if ( isSuccess ) {
				deferred.resolveWith( callbackContext, [ success, statusText, jqXHR ] );
			} else {
				deferred.rejectWith( callbackContext, [ jqXHR, statusText, error ] );
			}

			// Status-dependent callbacks
			jqXHR.statusCode( statusCode );
			statusCode = undefined;

			if ( fireGlobals ) {
				globalEventContext.trigger( isSuccess ? "ajaxSuccess" : "ajaxError",
					[ jqXHR, s, isSuccess ? success : error ] );
			}

			// Complete
			completeDeferred.fireWith( callbackContext, [ jqXHR, statusText ] );

			if ( fireGlobals ) {
				globalEventContext.trigger( "ajaxComplete", [ jqXHR, s ] );
				// Handle the global AJAX counter
				if ( !( --jQuery.active ) ) {
					jQuery.event.trigger("ajaxStop");
				}
			}
		}

		return jqXHR;
	},

	getJSON: function( url, data, callback ) {
		return jQuery.get( url, data, callback, "json" );
	},

	getScript: function( url, callback ) {
		return jQuery.get( url, undefined, callback, "script" );
	}
});

jQuery.each( [ "get", "post" ], function( i, method ) {
	jQuery[ method ] = function( url, data, callback, type ) {
		// shift arguments if data argument was omitted
		if ( jQuery.isFunction( data ) ) {
			type = type || callback;
			callback = data;
			data = undefined;
		}

		return jQuery.ajax({
			url: url,
			type: method,
			dataType: type,
			data: data,
			success: callback
		});
	};
});

/* Handles responses to an ajax request:
 * - finds the right dataType (mediates between content-type and expected dataType)
 * - returns the corresponding response
 */
function ajaxHandleResponses( s, jqXHR, responses ) {
	var firstDataType, ct, finalDataType, type,
		contents = s.contents,
		dataTypes = s.dataTypes;

	// Remove auto dataType and get content-type in the process
	while( dataTypes[ 0 ] === "*" ) {
		dataTypes.shift();
		if ( ct === undefined ) {
			ct = s.mimeType || jqXHR.getResponseHeader("Content-Type");
		}
	}

	// Check if we're dealing with a known content-type
	if ( ct ) {
		for ( type in contents ) {
			if ( contents[ type ] && contents[ type ].test( ct ) ) {
				dataTypes.unshift( type );
				break;
			}
		}
	}

	// Check to see if we have a response for the expected dataType
	if ( dataTypes[ 0 ] in responses ) {
		finalDataType = dataTypes[ 0 ];
	} else {
		// Try convertible dataTypes
		for ( type in responses ) {
			if ( !dataTypes[ 0 ] || s.converters[ type + " " + dataTypes[0] ] ) {
				finalDataType = type;
				break;
			}
			if ( !firstDataType ) {
				firstDataType = type;
			}
		}
		// Or just use first one
		finalDataType = finalDataType || firstDataType;
	}

	// If we found a dataType
	// We add the dataType to the list if needed
	// and return the corresponding response
	if ( finalDataType ) {
		if ( finalDataType !== dataTypes[ 0 ] ) {
			dataTypes.unshift( finalDataType );
		}
		return responses[ finalDataType ];
	}
}

/* Chain conversions given the request and the original response
 * Also sets the responseXXX fields on the jqXHR instance
 */
function ajaxConvert( s, response, jqXHR, isSuccess ) {
	var conv2, current, conv, tmp, prev,
		converters = {},
		// Work with a copy of dataTypes in case we need to modify it for conversion
		dataTypes = s.dataTypes.slice();

	// Create converters map with lowercased keys
	if ( dataTypes[ 1 ] ) {
		for ( conv in s.converters ) {
			converters[ conv.toLowerCase() ] = s.converters[ conv ];
		}
	}

	current = dataTypes.shift();

	// Convert to each sequential dataType
	while ( current ) {

		if ( s.responseFields[ current ] ) {
			jqXHR[ s.responseFields[ current ] ] = response;
		}

		// Apply the dataFilter if provided
		if ( !prev && isSuccess && s.dataFilter ) {
			response = s.dataFilter( response, s.dataType );
		}

		prev = current;
		current = dataTypes.shift();

		if ( current ) {

			// There's only work to do if current dataType is non-auto
			if ( current === "*" ) {

				current = prev;

			// Convert response if prev dataType is non-auto and differs from current
			} else if ( prev !== "*" && prev !== current ) {

				// Seek a direct converter
				conv = converters[ prev + " " + current ] || converters[ "* " + current ];

				// If none found, seek a pair
				if ( !conv ) {
					for ( conv2 in converters ) {

						// If conv2 outputs current
						tmp = conv2.split( " " );
						if ( tmp[ 1 ] === current ) {

							// If prev can be converted to accepted input
							conv = converters[ prev + " " + tmp[ 0 ] ] ||
								converters[ "* " + tmp[ 0 ] ];
							if ( conv ) {
								// Condense equivalence converters
								if ( conv === true ) {
									conv = converters[ conv2 ];

								// Otherwise, insert the intermediate dataType
								} else if ( converters[ conv2 ] !== true ) {
									current = tmp[ 0 ];
									dataTypes.unshift( tmp[ 1 ] );
								}
								break;
							}
						}
					}
				}

				// Apply converter (if not an equivalence)
				if ( conv !== true ) {

					// Unless errors are allowed to bubble, catch and return them
					if ( conv && s[ "throws" ] ) {
						response = conv( response );
					} else {
						try {
							response = conv( response );
						} catch ( e ) {
							return { state: "parsererror", error: conv ? e : "No conversion from " + prev + " to " + current };
						}
					}
				}
			}
		}
	}

	return { state: "success", data: response };
}
// Install script dataType
jQuery.ajaxSetup({
	accepts: {
		script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
	},
	contents: {
		script: /(?:java|ecma)script/
	},
	converters: {
		"text script": function( text ) {
			jQuery.globalEval( text );
			return text;
		}
	}
});

// Handle cache's special case and global
jQuery.ajaxPrefilter( "script", function( s ) {
	if ( s.cache === undefined ) {
		s.cache = false;
	}
	if ( s.crossDomain ) {
		s.type = "GET";
		s.global = false;
	}
});

// Bind script tag hack transport
jQuery.ajaxTransport( "script", function(s) {

	// This transport only deals with cross domain requests
	if ( s.crossDomain ) {

		var script,
			head = document.head || jQuery("head")[0] || document.documentElement;

		return {

			send: function( _, callback ) {

				script = document.createElement("script");

				script.async = true;

				if ( s.scriptCharset ) {
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				// Attach handlers for all browsers
				script.onload = script.onreadystatechange = function( _, isAbort ) {

					if ( isAbort || !script.readyState || /loaded|complete/.test( script.readyState ) ) {

						// Handle memory leak in IE
						script.onload = script.onreadystatechange = null;

						// Remove the script
						if ( script.parentNode ) {
							script.parentNode.removeChild( script );
						}

						// Dereference the script
						script = null;

						// Callback if not abort
						if ( !isAbort ) {
							callback( 200, "success" );
						}
					}
				};

				// Circumvent IE6 bugs with base elements (#2709 and #4378) by prepending
				// Use native DOM manipulation to avoid our domManip AJAX trickery
				head.insertBefore( script, head.firstChild );
			},

			abort: function() {
				if ( script ) {
					script.onload( undefined, true );
				}
			}
		};
	}
});
var oldCallbacks = [],
	rjsonp = /(=)\?(?=&|$)|\?\?/;

// Default jsonp settings
jQuery.ajaxSetup({
	jsonp: "callback",
	jsonpCallback: function() {
		var callback = oldCallbacks.pop() || ( jQuery.expando + "_" + ( ajax_nonce++ ) );
		this[ callback ] = true;
		return callback;
	}
});

// Detect, normalize options and install callbacks for jsonp requests
jQuery.ajaxPrefilter( "json jsonp", function( s, originalSettings, jqXHR ) {

	var callbackName, overwritten, responseContainer,
		jsonProp = s.jsonp !== false && ( rjsonp.test( s.url ) ?
			"url" :
			typeof s.data === "string" && !( s.contentType || "" ).indexOf("application/x-www-form-urlencoded") && rjsonp.test( s.data ) && "data"
		);

	// Handle iff the expected data type is "jsonp" or we have a parameter to set
	if ( jsonProp || s.dataTypes[ 0 ] === "jsonp" ) {

		// Get callback name, remembering preexisting value associated with it
		callbackName = s.jsonpCallback = jQuery.isFunction( s.jsonpCallback ) ?
			s.jsonpCallback() :
			s.jsonpCallback;

		// Insert callback into url or form data
		if ( jsonProp ) {
			s[ jsonProp ] = s[ jsonProp ].replace( rjsonp, "$1" + callbackName );
		} else if ( s.jsonp !== false ) {
			s.url += ( ajax_rquery.test( s.url ) ? "&" : "?" ) + s.jsonp + "=" + callbackName;
		}

		// Use data converter to retrieve json after script execution
		s.converters["script json"] = function() {
			if ( !responseContainer ) {
				jQuery.error( callbackName + " was not called" );
			}
			return responseContainer[ 0 ];
		};

		// force json dataType
		s.dataTypes[ 0 ] = "json";

		// Install callback
		overwritten = window[ callbackName ];
		window[ callbackName ] = function() {
			responseContainer = arguments;
		};

		// Clean-up function (fires after converters)
		jqXHR.always(function() {
			// Restore preexisting value
			window[ callbackName ] = overwritten;

			// Save back as free
			if ( s[ callbackName ] ) {
				// make sure that re-using the options doesn't screw things around
				s.jsonpCallback = originalSettings.jsonpCallback;

				// save the callback name for future use
				oldCallbacks.push( callbackName );
			}

			// Call if it was a function and we have a response
			if ( responseContainer && jQuery.isFunction( overwritten ) ) {
				overwritten( responseContainer[ 0 ] );
			}

			responseContainer = overwritten = undefined;
		});

		// Delegate to script
		return "script";
	}
});
var xhrCallbacks, xhrSupported,
	xhrId = 0,
	// #5280: Internet Explorer will keep connections alive if we don't abort on unload
	xhrOnUnloadAbort = window.ActiveXObject && function() {
		// Abort all pending requests
		var key;
		for ( key in xhrCallbacks ) {
			xhrCallbacks[ key ]( undefined, true );
		}
	};

// Functions to create xhrs
function createStandardXHR() {
	try {
		return new window.XMLHttpRequest();
	} catch( e ) {}
}

function createActiveXHR() {
	try {
		return new window.ActiveXObject("Microsoft.XMLHTTP");
	} catch( e ) {}
}

// Create the request object
// (This is still attached to ajaxSettings for backward compatibility)
jQuery.ajaxSettings.xhr = window.ActiveXObject ?
	/* Microsoft failed to properly
	 * implement the XMLHttpRequest in IE7 (can't request local files),
	 * so we use the ActiveXObject when it is available
	 * Additionally XMLHttpRequest can be disabled in IE7/IE8 so
	 * we need a fallback.
	 */
	function() {
		return !this.isLocal && createStandardXHR() || createActiveXHR();
	} :
	// For all other browsers, use the standard XMLHttpRequest object
	createStandardXHR;

// Determine support properties
xhrSupported = jQuery.ajaxSettings.xhr();
jQuery.support.cors = !!xhrSupported && ( "withCredentials" in xhrSupported );
xhrSupported = jQuery.support.ajax = !!xhrSupported;

// Create transport if the browser can provide an xhr
if ( xhrSupported ) {

	jQuery.ajaxTransport(function( s ) {
		// Cross domain only allowed if supported through XMLHttpRequest
		if ( !s.crossDomain || jQuery.support.cors ) {

			var callback;

			return {
				send: function( headers, complete ) {

					// Get a new xhr
					var handle, i,
						xhr = s.xhr();

					// Open the socket
					// Passing null username, generates a login popup on Opera (#2865)
					if ( s.username ) {
						xhr.open( s.type, s.url, s.async, s.username, s.password );
					} else {
						xhr.open( s.type, s.url, s.async );
					}

					// Apply custom fields if provided
					if ( s.xhrFields ) {
						for ( i in s.xhrFields ) {
							xhr[ i ] = s.xhrFields[ i ];
						}
					}

					// Override mime type if needed
					if ( s.mimeType && xhr.overrideMimeType ) {
						xhr.overrideMimeType( s.mimeType );
					}

					// X-Requested-With header
					// For cross-domain requests, seeing as conditions for a preflight are
					// akin to a jigsaw puzzle, we simply never set it to be sure.
					// (it can always be set on a per-request basis or even using ajaxSetup)
					// For same-domain requests, won't change header if already provided.
					if ( !s.crossDomain && !headers["X-Requested-With"] ) {
						headers["X-Requested-With"] = "XMLHttpRequest";
					}

					// Need an extra try/catch for cross domain requests in Firefox 3
					try {
						for ( i in headers ) {
							xhr.setRequestHeader( i, headers[ i ] );
						}
					} catch( err ) {}

					// Do send the request
					// This may raise an exception which is actually
					// handled in jQuery.ajax (so no try/catch here)
					xhr.send( ( s.hasContent && s.data ) || null );

					// Listener
					callback = function( _, isAbort ) {
						var status, responseHeaders, statusText, responses;

						// Firefox throws exceptions when accessing properties
						// of an xhr when a network error occurred
						// http://helpful.knobs-dials.com/index.php/Component_returned_failure_code:_0x80040111_(NS_ERROR_NOT_AVAILABLE)
						try {

							// Was never called and is aborted or complete
							if ( callback && ( isAbort || xhr.readyState === 4 ) ) {

								// Only called once
								callback = undefined;

								// Do not keep as active anymore
								if ( handle ) {
									xhr.onreadystatechange = jQuery.noop;
									if ( xhrOnUnloadAbort ) {
										delete xhrCallbacks[ handle ];
									}
								}

								// If it's an abort
								if ( isAbort ) {
									// Abort it manually if needed
									if ( xhr.readyState !== 4 ) {
										xhr.abort();
									}
								} else {
									responses = {};
									status = xhr.status;
									responseHeaders = xhr.getAllResponseHeaders();

									// When requesting binary data, IE6-9 will throw an exception
									// on any attempt to access responseText (#11426)
									if ( typeof xhr.responseText === "string" ) {
										responses.text = xhr.responseText;
									}

									// Firefox throws an exception when accessing
									// statusText for faulty cross-domain requests
									try {
										statusText = xhr.statusText;
									} catch( e ) {
										// We normalize with Webkit giving an empty statusText
										statusText = "";
									}

									// Filter status for non standard behaviors

									// If the request is local and we have data: assume a success
									// (success with no data won't get notified, that's the best we
									// can do given current implementations)
									if ( !status && s.isLocal && !s.crossDomain ) {
										status = responses.text ? 200 : 404;
									// IE - #1450: sometimes returns 1223 when it should be 204
									} else if ( status === 1223 ) {
										status = 204;
									}
								}
							}
						} catch( firefoxAccessException ) {
							if ( !isAbort ) {
								complete( -1, firefoxAccessException );
							}
						}

						// Call complete if needed
						if ( responses ) {
							complete( status, statusText, responses, responseHeaders );
						}
					};

					if ( !s.async ) {
						// if we're in sync mode we fire the callback
						callback();
					} else if ( xhr.readyState === 4 ) {
						// (IE6 & IE7) if it's in cache and has been
						// retrieved directly we need to fire the callback
						setTimeout( callback );
					} else {
						handle = ++xhrId;
						if ( xhrOnUnloadAbort ) {
							// Create the active xhrs callbacks list if needed
							// and attach the unload handler
							if ( !xhrCallbacks ) {
								xhrCallbacks = {};
								jQuery( window ).unload( xhrOnUnloadAbort );
							}
							// Add to list of active xhrs callbacks
							xhrCallbacks[ handle ] = callback;
						}
						xhr.onreadystatechange = callback;
					}
				},

				abort: function() {
					if ( callback ) {
						callback( undefined, true );
					}
				}
			};
		}
	});
}
var fxNow, timerId,
	rfxtypes = /^(?:toggle|show|hide)$/,
	rfxnum = new RegExp( "^(?:([+-])=|)(" + core_pnum + ")([a-z%]*)$", "i" ),
	rrun = /queueHooks$/,
	animationPrefilters = [ defaultPrefilter ],
	tweeners = {
		"*": [function( prop, value ) {
			var tween = this.createTween( prop, value ),
				target = tween.cur(),
				parts = rfxnum.exec( value ),
				unit = parts && parts[ 3 ] || ( jQuery.cssNumber[ prop ] ? "" : "px" ),

				// Starting value computation is required for potential unit mismatches
				start = ( jQuery.cssNumber[ prop ] || unit !== "px" && +target ) &&
					rfxnum.exec( jQuery.css( tween.elem, prop ) ),
				scale = 1,
				maxIterations = 20;

			if ( start && start[ 3 ] !== unit ) {
				// Trust units reported by jQuery.css
				unit = unit || start[ 3 ];

				// Make sure we update the tween properties later on
				parts = parts || [];

				// Iteratively approximate from a nonzero starting point
				start = +target || 1;

				do {
					// If previous iteration zeroed out, double until we get *something*
					// Use a string for doubling factor so we don't accidentally see scale as unchanged below
					scale = scale || ".5";

					// Adjust and apply
					start = start / scale;
					jQuery.style( tween.elem, prop, start + unit );

				// Update scale, tolerating zero or NaN from tween.cur()
				// And breaking the loop if scale is unchanged or perfect, or if we've just had enough
				} while ( scale !== (scale = tween.cur() / target) && scale !== 1 && --maxIterations );
			}

			// Update tween properties
			if ( parts ) {
				start = tween.start = +start || +target || 0;
				tween.unit = unit;
				// If a +=/-= token was provided, we're doing a relative animation
				tween.end = parts[ 1 ] ?
					start + ( parts[ 1 ] + 1 ) * parts[ 2 ] :
					+parts[ 2 ];
			}

			return tween;
		}]
	};

// Animations created synchronously will run synchronously
function createFxNow() {
	setTimeout(function() {
		fxNow = undefined;
	});
	return ( fxNow = jQuery.now() );
}

function createTween( value, prop, animation ) {
	var tween,
		collection = ( tweeners[ prop ] || [] ).concat( tweeners[ "*" ] ),
		index = 0,
		length = collection.length;
	for ( ; index < length; index++ ) {
		if ( (tween = collection[ index ].call( animation, prop, value )) ) {

			// we're done with this property
			return tween;
		}
	}
}

function Animation( elem, properties, options ) {
	var result,
		stopped,
		index = 0,
		length = animationPrefilters.length,
		deferred = jQuery.Deferred().always( function() {
			// don't match elem in the :animated selector
			delete tick.elem;
		}),
		tick = function() {
			if ( stopped ) {
				return false;
			}
			var currentTime = fxNow || createFxNow(),
				remaining = Math.max( 0, animation.startTime + animation.duration - currentTime ),
				// archaic crash bug won't allow us to use 1 - ( 0.5 || 0 ) (#12497)
				temp = remaining / animation.duration || 0,
				percent = 1 - temp,
				index = 0,
				length = animation.tweens.length;

			for ( ; index < length ; index++ ) {
				animation.tweens[ index ].run( percent );
			}

			deferred.notifyWith( elem, [ animation, percent, remaining ]);

			if ( percent < 1 && length ) {
				return remaining;
			} else {
				deferred.resolveWith( elem, [ animation ] );
				return false;
			}
		},
		animation = deferred.promise({
			elem: elem,
			props: jQuery.extend( {}, properties ),
			opts: jQuery.extend( true, { specialEasing: {} }, options ),
			originalProperties: properties,
			originalOptions: options,
			startTime: fxNow || createFxNow(),
			duration: options.duration,
			tweens: [],
			createTween: function( prop, end ) {
				var tween = jQuery.Tween( elem, animation.opts, prop, end,
						animation.opts.specialEasing[ prop ] || animation.opts.easing );
				animation.tweens.push( tween );
				return tween;
			},
			stop: function( gotoEnd ) {
				var index = 0,
					// if we are going to the end, we want to run all the tweens
					// otherwise we skip this part
					length = gotoEnd ? animation.tweens.length : 0;
				if ( stopped ) {
					return this;
				}
				stopped = true;
				for ( ; index < length ; index++ ) {
					animation.tweens[ index ].run( 1 );
				}

				// resolve when we played the last frame
				// otherwise, reject
				if ( gotoEnd ) {
					deferred.resolveWith( elem, [ animation, gotoEnd ] );
				} else {
					deferred.rejectWith( elem, [ animation, gotoEnd ] );
				}
				return this;
			}
		}),
		props = animation.props;

	propFilter( props, animation.opts.specialEasing );

	for ( ; index < length ; index++ ) {
		result = animationPrefilters[ index ].call( animation, elem, props, animation.opts );
		if ( result ) {
			return result;
		}
	}

	jQuery.map( props, createTween, animation );

	if ( jQuery.isFunction( animation.opts.start ) ) {
		animation.opts.start.call( elem, animation );
	}

	jQuery.fx.timer(
		jQuery.extend( tick, {
			elem: elem,
			anim: animation,
			queue: animation.opts.queue
		})
	);

	// attach callbacks from options
	return animation.progress( animation.opts.progress )
		.done( animation.opts.done, animation.opts.complete )
		.fail( animation.opts.fail )
		.always( animation.opts.always );
}

function propFilter( props, specialEasing ) {
	var index, name, easing, value, hooks;

	// camelCase, specialEasing and expand cssHook pass
	for ( index in props ) {
		name = jQuery.camelCase( index );
		easing = specialEasing[ name ];
		value = props[ index ];
		if ( jQuery.isArray( value ) ) {
			easing = value[ 1 ];
			value = props[ index ] = value[ 0 ];
		}

		if ( index !== name ) {
			props[ name ] = value;
			delete props[ index ];
		}

		hooks = jQuery.cssHooks[ name ];
		if ( hooks && "expand" in hooks ) {
			value = hooks.expand( value );
			delete props[ name ];

			// not quite $.extend, this wont overwrite keys already present.
			// also - reusing 'index' from above because we have the correct "name"
			for ( index in value ) {
				if ( !( index in props ) ) {
					props[ index ] = value[ index ];
					specialEasing[ index ] = easing;
				}
			}
		} else {
			specialEasing[ name ] = easing;
		}
	}
}

jQuery.Animation = jQuery.extend( Animation, {

	tweener: function( props, callback ) {
		if ( jQuery.isFunction( props ) ) {
			callback = props;
			props = [ "*" ];
		} else {
			props = props.split(" ");
		}

		var prop,
			index = 0,
			length = props.length;

		for ( ; index < length ; index++ ) {
			prop = props[ index ];
			tweeners[ prop ] = tweeners[ prop ] || [];
			tweeners[ prop ].unshift( callback );
		}
	},

	prefilter: function( callback, prepend ) {
		if ( prepend ) {
			animationPrefilters.unshift( callback );
		} else {
			animationPrefilters.push( callback );
		}
	}
});

function defaultPrefilter( elem, props, opts ) {
	/* jshint validthis: true */
	var prop, value, toggle, tween, hooks, oldfire,
		anim = this,
		orig = {},
		style = elem.style,
		hidden = elem.nodeType && isHidden( elem ),
		dataShow = jQuery._data( elem, "fxshow" );

	// handle queue: false promises
	if ( !opts.queue ) {
		hooks = jQuery._queueHooks( elem, "fx" );
		if ( hooks.unqueued == null ) {
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function() {
				if ( !hooks.unqueued ) {
					oldfire();
				}
			};
		}
		hooks.unqueued++;

		anim.always(function() {
			// doing this makes sure that the complete handler will be called
			// before this completes
			anim.always(function() {
				hooks.unqueued--;
				if ( !jQuery.queue( elem, "fx" ).length ) {
					hooks.empty.fire();
				}
			});
		});
	}

	// height/width overflow pass
	if ( elem.nodeType === 1 && ( "height" in props || "width" in props ) ) {
		// Make sure that nothing sneaks out
		// Record all 3 overflow attributes because IE does not
		// change the overflow attribute when overflowX and
		// overflowY are set to the same value
		opts.overflow = [ style.overflow, style.overflowX, style.overflowY ];

		// Set display property to inline-block for height/width
		// animations on inline elements that are having width/height animated
		if ( jQuery.css( elem, "display" ) === "inline" &&
				jQuery.css( elem, "float" ) === "none" ) {

			// inline-level elements accept inline-block;
			// block-level elements need to be inline with layout
			if ( !jQuery.support.inlineBlockNeedsLayout || css_defaultDisplay( elem.nodeName ) === "inline" ) {
				style.display = "inline-block";

			} else {
				style.zoom = 1;
			}
		}
	}

	if ( opts.overflow ) {
		style.overflow = "hidden";
		if ( !jQuery.support.shrinkWrapBlocks ) {
			anim.always(function() {
				style.overflow = opts.overflow[ 0 ];
				style.overflowX = opts.overflow[ 1 ];
				style.overflowY = opts.overflow[ 2 ];
			});
		}
	}


	// show/hide pass
	for ( prop in props ) {
		value = props[ prop ];
		if ( rfxtypes.exec( value ) ) {
			delete props[ prop ];
			toggle = toggle || value === "toggle";
			if ( value === ( hidden ? "hide" : "show" ) ) {
				continue;
			}
			orig[ prop ] = dataShow && dataShow[ prop ] || jQuery.style( elem, prop );
		}
	}

	if ( !jQuery.isEmptyObject( orig ) ) {
		if ( dataShow ) {
			if ( "hidden" in dataShow ) {
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data( elem, "fxshow", {} );
		}

		// store state if its toggle - enables .stop().toggle() to "reverse"
		if ( toggle ) {
			dataShow.hidden = !hidden;
		}
		if ( hidden ) {
			jQuery( elem ).show();
		} else {
			anim.done(function() {
				jQuery( elem ).hide();
			});
		}
		anim.done(function() {
			var prop;
			jQuery._removeData( elem, "fxshow" );
			for ( prop in orig ) {
				jQuery.style( elem, prop, orig[ prop ] );
			}
		});
		for ( prop in orig ) {
			tween = createTween( hidden ? dataShow[ prop ] : 0, prop, anim );

			if ( !( prop in dataShow ) ) {
				dataShow[ prop ] = tween.start;
				if ( hidden ) {
					tween.end = tween.start;
					tween.start = prop === "width" || prop === "height" ? 1 : 0;
				}
			}
		}
	}
}

function Tween( elem, options, prop, end, easing ) {
	return new Tween.prototype.init( elem, options, prop, end, easing );
}
jQuery.Tween = Tween;

Tween.prototype = {
	constructor: Tween,
	init: function( elem, options, prop, end, easing, unit ) {
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || "swing";
		this.options = options;
		this.start = this.now = this.cur();
		this.end = end;
		this.unit = unit || ( jQuery.cssNumber[ prop ] ? "" : "px" );
	},
	cur: function() {
		var hooks = Tween.propHooks[ this.prop ];

		return hooks && hooks.get ?
			hooks.get( this ) :
			Tween.propHooks._default.get( this );
	},
	run: function( percent ) {
		var eased,
			hooks = Tween.propHooks[ this.prop ];

		if ( this.options.duration ) {
			this.pos = eased = jQuery.easing[ this.easing ](
				percent, this.options.duration * percent, 0, 1, this.options.duration
			);
		} else {
			this.pos = eased = percent;
		}
		this.now = ( this.end - this.start ) * eased + this.start;

		if ( this.options.step ) {
			this.options.step.call( this.elem, this.now, this );
		}

		if ( hooks && hooks.set ) {
			hooks.set( this );
		} else {
			Tween.propHooks._default.set( this );
		}
		return this;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default: {
		get: function( tween ) {
			var result;

			if ( tween.elem[ tween.prop ] != null &&
				(!tween.elem.style || tween.elem.style[ tween.prop ] == null) ) {
				return tween.elem[ tween.prop ];
			}

			// passing an empty string as a 3rd parameter to .css will automatically
			// attempt a parseFloat and fallback to a string if the parse fails
			// so, simple values such as "10px" are parsed to Float.
			// complex values such as "rotate(1rad)" are returned as is.
			result = jQuery.css( tween.elem, tween.prop, "" );
			// Empty strings, null, undefined and "auto" are converted to 0.
			return !result || result === "auto" ? 0 : result;
		},
		set: function( tween ) {
			// use step hook for back compat - use cssHook if its there - use .style if its
			// available and use plain properties where available
			if ( jQuery.fx.step[ tween.prop ] ) {
				jQuery.fx.step[ tween.prop ]( tween );
			} else if ( tween.elem.style && ( tween.elem.style[ jQuery.cssProps[ tween.prop ] ] != null || jQuery.cssHooks[ tween.prop ] ) ) {
				jQuery.style( tween.elem, tween.prop, tween.now + tween.unit );
			} else {
				tween.elem[ tween.prop ] = tween.now;
			}
		}
	}
};

// Support: IE <=9
// Panic based approach to setting things on disconnected nodes

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set: function( tween ) {
		if ( tween.elem.nodeType && tween.elem.parentNode ) {
			tween.elem[ tween.prop ] = tween.now;
		}
	}
};

jQuery.each([ "toggle", "show", "hide" ], function( i, name ) {
	var cssFn = jQuery.fn[ name ];
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return speed == null || typeof speed === "boolean" ?
			cssFn.apply( this, arguments ) :
			this.animate( genFx( name, true ), speed, easing, callback );
	};
});

jQuery.fn.extend({
	fadeTo: function( speed, to, easing, callback ) {

		// show any hidden elements after setting opacity to 0
		return this.filter( isHidden ).css( "opacity", 0 ).show()

			// animate to the value specified
			.end().animate({ opacity: to }, speed, easing, callback );
	},
	animate: function( prop, speed, easing, callback ) {
		var empty = jQuery.isEmptyObject( prop ),
			optall = jQuery.speed( speed, easing, callback ),
			doAnimation = function() {
				// Operate on a copy of prop so per-property easing won't be lost
				var anim = Animation( this, jQuery.extend( {}, prop ), optall );

				// Empty animations, or finishing resolves immediately
				if ( empty || jQuery._data( this, "finish" ) ) {
					anim.stop( true );
				}
			};
			doAnimation.finish = doAnimation;

		return empty || optall.queue === false ?
			this.each( doAnimation ) :
			this.queue( optall.queue, doAnimation );
	},
	stop: function( type, clearQueue, gotoEnd ) {
		var stopQueue = function( hooks ) {
			var stop = hooks.stop;
			delete hooks.stop;
			stop( gotoEnd );
		};

		if ( typeof type !== "string" ) {
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if ( clearQueue && type !== false ) {
			this.queue( type || "fx", [] );
		}

		return this.each(function() {
			var dequeue = true,
				index = type != null && type + "queueHooks",
				timers = jQuery.timers,
				data = jQuery._data( this );

			if ( index ) {
				if ( data[ index ] && data[ index ].stop ) {
					stopQueue( data[ index ] );
				}
			} else {
				for ( index in data ) {
					if ( data[ index ] && data[ index ].stop && rrun.test( index ) ) {
						stopQueue( data[ index ] );
					}
				}
			}

			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && (type == null || timers[ index ].queue === type) ) {
					timers[ index ].anim.stop( gotoEnd );
					dequeue = false;
					timers.splice( index, 1 );
				}
			}

			// start the next in the queue if the last step wasn't forced
			// timers currently will call their complete callbacks, which will dequeue
			// but only if they were gotoEnd
			if ( dequeue || !gotoEnd ) {
				jQuery.dequeue( this, type );
			}
		});
	},
	finish: function( type ) {
		if ( type !== false ) {
			type = type || "fx";
		}
		return this.each(function() {
			var index,
				data = jQuery._data( this ),
				queue = data[ type + "queue" ],
				hooks = data[ type + "queueHooks" ],
				timers = jQuery.timers,
				length = queue ? queue.length : 0;

			// enable finishing flag on private data
			data.finish = true;

			// empty the queue first
			jQuery.queue( this, type, [] );

			if ( hooks && hooks.stop ) {
				hooks.stop.call( this, true );
			}

			// look for any active animations, and finish them
			for ( index = timers.length; index--; ) {
				if ( timers[ index ].elem === this && timers[ index ].queue === type ) {
					timers[ index ].anim.stop( true );
					timers.splice( index, 1 );
				}
			}

			// look for any animations in the old queue and finish them
			for ( index = 0; index < length; index++ ) {
				if ( queue[ index ] && queue[ index ].finish ) {
					queue[ index ].finish.call( this );
				}
			}

			// turn off finishing flag
			delete data.finish;
		});
	}
});

// Generate parameters to create a standard animation
function genFx( type, includeWidth ) {
	var which,
		attrs = { height: type },
		i = 0;

	// if we include width, step value is 1 to do all cssExpand values,
	// if we don't include width, step value is 2 to skip over Left and Right
	includeWidth = includeWidth? 1 : 0;
	for( ; i < 4 ; i += 2 - includeWidth ) {
		which = cssExpand[ i ];
		attrs[ "margin" + which ] = attrs[ "padding" + which ] = type;
	}

	if ( includeWidth ) {
		attrs.opacity = attrs.width = type;
	}

	return attrs;
}

// Generate shortcuts for custom animations
jQuery.each({
	slideDown: genFx("show"),
	slideUp: genFx("hide"),
	slideToggle: genFx("toggle"),
	fadeIn: { opacity: "show" },
	fadeOut: { opacity: "hide" },
	fadeToggle: { opacity: "toggle" }
}, function( name, props ) {
	jQuery.fn[ name ] = function( speed, easing, callback ) {
		return this.animate( props, speed, easing, callback );
	};
});

jQuery.speed = function( speed, easing, fn ) {
	var opt = speed && typeof speed === "object" ? jQuery.extend( {}, speed ) : {
		complete: fn || !fn && easing ||
			jQuery.isFunction( speed ) && speed,
		duration: speed,
		easing: fn && easing || easing && !jQuery.isFunction( easing ) && easing
	};

	opt.duration = jQuery.fx.off ? 0 : typeof opt.duration === "number" ? opt.duration :
		opt.duration in jQuery.fx.speeds ? jQuery.fx.speeds[ opt.duration ] : jQuery.fx.speeds._default;

	// normalize opt.queue - true/undefined/null -> "fx"
	if ( opt.queue == null || opt.queue === true ) {
		opt.queue = "fx";
	}

	// Queueing
	opt.old = opt.complete;

	opt.complete = function() {
		if ( jQuery.isFunction( opt.old ) ) {
			opt.old.call( this );
		}

		if ( opt.queue ) {
			jQuery.dequeue( this, opt.queue );
		}
	};

	return opt;
};

jQuery.easing = {
	linear: function( p ) {
		return p;
	},
	swing: function( p ) {
		return 0.5 - Math.cos( p*Math.PI ) / 2;
	}
};

jQuery.timers = [];
jQuery.fx = Tween.prototype.init;
jQuery.fx.tick = function() {
	var timer,
		timers = jQuery.timers,
		i = 0;

	fxNow = jQuery.now();

	for ( ; i < timers.length; i++ ) {
		timer = timers[ i ];
		// Checks the timer has not already been removed
		if ( !timer() && timers[ i ] === timer ) {
			timers.splice( i--, 1 );
		}
	}

	if ( !timers.length ) {
		jQuery.fx.stop();
	}
	fxNow = undefined;
};

jQuery.fx.timer = function( timer ) {
	if ( timer() && jQuery.timers.push( timer ) ) {
		jQuery.fx.start();
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function() {
	if ( !timerId ) {
		timerId = setInterval( jQuery.fx.tick, jQuery.fx.interval );
	}
};

jQuery.fx.stop = function() {
	clearInterval( timerId );
	timerId = null;
};

jQuery.fx.speeds = {
	slow: 600,
	fast: 200,
	// Default speed
	_default: 400
};

// Back Compat <1.8 extension point
jQuery.fx.step = {};

if ( jQuery.expr && jQuery.expr.filters ) {
	jQuery.expr.filters.animated = function( elem ) {
		return jQuery.grep(jQuery.timers, function( fn ) {
			return elem === fn.elem;
		}).length;
	};
}
jQuery.fn.offset = function( options ) {
	if ( arguments.length ) {
		return options === undefined ?
			this :
			this.each(function( i ) {
				jQuery.offset.setOffset( this, options, i );
			});
	}

	var docElem, win,
		box = { top: 0, left: 0 },
		elem = this[ 0 ],
		doc = elem && elem.ownerDocument;

	if ( !doc ) {
		return;
	}

	docElem = doc.documentElement;

	// Make sure it's not a disconnected DOM node
	if ( !jQuery.contains( docElem, elem ) ) {
		return box;
	}

	// If we don't have gBCR, just use 0,0 rather than error
	// BlackBerry 5, iOS 3 (original iPhone)
	if ( typeof elem.getBoundingClientRect !== core_strundefined ) {
		box = elem.getBoundingClientRect();
	}
	win = getWindow( doc );
	return {
		top: box.top  + ( win.pageYOffset || docElem.scrollTop )  - ( docElem.clientTop  || 0 ),
		left: box.left + ( win.pageXOffset || docElem.scrollLeft ) - ( docElem.clientLeft || 0 )
	};
};

jQuery.offset = {

	setOffset: function( elem, options, i ) {
		var position = jQuery.css( elem, "position" );

		// set position first, in-case top/left are set even on static elem
		if ( position === "static" ) {
			elem.style.position = "relative";
		}

		var curElem = jQuery( elem ),
			curOffset = curElem.offset(),
			curCSSTop = jQuery.css( elem, "top" ),
			curCSSLeft = jQuery.css( elem, "left" ),
			calculatePosition = ( position === "absolute" || position === "fixed" ) && jQuery.inArray("auto", [curCSSTop, curCSSLeft]) > -1,
			props = {}, curPosition = {}, curTop, curLeft;

		// need to be able to calculate position if either top or left is auto and position is either absolute or fixed
		if ( calculatePosition ) {
			curPosition = curElem.position();
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat( curCSSTop ) || 0;
			curLeft = parseFloat( curCSSLeft ) || 0;
		}

		if ( jQuery.isFunction( options ) ) {
			options = options.call( elem, i, curOffset );
		}

		if ( options.top != null ) {
			props.top = ( options.top - curOffset.top ) + curTop;
		}
		if ( options.left != null ) {
			props.left = ( options.left - curOffset.left ) + curLeft;
		}

		if ( "using" in options ) {
			options.using.call( elem, props );
		} else {
			curElem.css( props );
		}
	}
};


jQuery.fn.extend({

	position: function() {
		if ( !this[ 0 ] ) {
			return;
		}

		var offsetParent, offset,
			parentOffset = { top: 0, left: 0 },
			elem = this[ 0 ];

		// fixed elements are offset from window (parentOffset = {top:0, left: 0}, because it is it's only offset parent
		if ( jQuery.css( elem, "position" ) === "fixed" ) {
			// we assume that getBoundingClientRect is available when computed position is fixed
			offset = elem.getBoundingClientRect();
		} else {
			// Get *real* offsetParent
			offsetParent = this.offsetParent();

			// Get correct offsets
			offset = this.offset();
			if ( !jQuery.nodeName( offsetParent[ 0 ], "html" ) ) {
				parentOffset = offsetParent.offset();
			}

			// Add offsetParent borders
			parentOffset.top  += jQuery.css( offsetParent[ 0 ], "borderTopWidth", true );
			parentOffset.left += jQuery.css( offsetParent[ 0 ], "borderLeftWidth", true );
		}

		// Subtract parent offsets and element margins
		// note: when an element has margin: auto the offsetLeft and marginLeft
		// are the same in Safari causing offset.left to incorrectly be 0
		return {
			top:  offset.top  - parentOffset.top - jQuery.css( elem, "marginTop", true ),
			left: offset.left - parentOffset.left - jQuery.css( elem, "marginLeft", true)
		};
	},

	offsetParent: function() {
		return this.map(function() {
			var offsetParent = this.offsetParent || docElem;
			while ( offsetParent && ( !jQuery.nodeName( offsetParent, "html" ) && jQuery.css( offsetParent, "position") === "static" ) ) {
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || docElem;
		});
	}
});


// Create scrollLeft and scrollTop methods
jQuery.each( {scrollLeft: "pageXOffset", scrollTop: "pageYOffset"}, function( method, prop ) {
	var top = /Y/.test( prop );

	jQuery.fn[ method ] = function( val ) {
		return jQuery.access( this, function( elem, method, val ) {
			var win = getWindow( elem );

			if ( val === undefined ) {
				return win ? (prop in win) ? win[ prop ] :
					win.document.documentElement[ method ] :
					elem[ method ];
			}

			if ( win ) {
				win.scrollTo(
					!top ? val : jQuery( win ).scrollLeft(),
					top ? val : jQuery( win ).scrollTop()
				);

			} else {
				elem[ method ] = val;
			}
		}, method, val, arguments.length, null );
	};
});

function getWindow( elem ) {
	return jQuery.isWindow( elem ) ?
		elem :
		elem.nodeType === 9 ?
			elem.defaultView || elem.parentWindow :
			false;
}
// Create innerHeight, innerWidth, height, width, outerHeight and outerWidth methods
jQuery.each( { Height: "height", Width: "width" }, function( name, type ) {
	jQuery.each( { padding: "inner" + name, content: type, "": "outer" + name }, function( defaultExtra, funcName ) {
		// margin is only for outerHeight, outerWidth
		jQuery.fn[ funcName ] = function( margin, value ) {
			var chainable = arguments.length && ( defaultExtra || typeof margin !== "boolean" ),
				extra = defaultExtra || ( margin === true || value === true ? "margin" : "border" );

			return jQuery.access( this, function( elem, type, value ) {
				var doc;

				if ( jQuery.isWindow( elem ) ) {
					// As of 5/8/2012 this will yield incorrect results for Mobile Safari, but there
					// isn't a whole lot we can do. See pull request at this URL for discussion:
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement[ "client" + name ];
				}

				// Get document width or height
				if ( elem.nodeType === 9 ) {
					doc = elem.documentElement;

					// Either scroll[Width/Height] or offset[Width/Height] or client[Width/Height], whichever is greatest
					// unfortunately, this causes bug #3838 in IE6/8 only, but there is currently no good, small way to fix it.
					return Math.max(
						elem.body[ "scroll" + name ], doc[ "scroll" + name ],
						elem.body[ "offset" + name ], doc[ "offset" + name ],
						doc[ "client" + name ]
					);
				}

				return value === undefined ?
					// Get width or height on the element, requesting but not forcing parseFloat
					jQuery.css( elem, type, extra ) :

					// Set width or height on the element
					jQuery.style( elem, type, value, extra );
			}, type, chainable ? margin : undefined, chainable, null );
		};
	});
});
// Limit scope pollution from any deprecated API
// (function() {

// The number of elements contained in the matched element set
jQuery.fn.size = function() {
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;

// })();
if ( typeof module === "object" && module && typeof module.exports === "object" ) {
	// Expose jQuery as module.exports in loaders that implement the Node
	// module pattern (including browserify). Do not create the global, since
	// the user will be storing it themselves locally, and globals are frowned
	// upon in the Node module world.
	module.exports = jQuery;
} else {
	// Otherwise expose jQuery to the global object as usual
	window.jQuery = window.$ = jQuery;

	// Register as a named AMD module, since jQuery can be concatenated with other
	// files that may use define, but not via a proper concatenation script that
	// understands anonymous AMD modules. A named AMD is safest and most robust
	// way to register. Lowercase jquery is used because AMD module names are
	// derived from file names, and jQuery is normally delivered in a lowercase
	// file name. Do this after creating the global so that if an AMD module wants
	// to call noConflict to hide this version of jQuery, it will work.
	if ( typeof define === "function" && define.amd ) {
		define( "jquery", [], function () { return jQuery; } );
	}
}

})( window );

// bower_components/underscore/underscore.js
//     Underscore.js 1.5.2
//     http://underscorejs.org
//     (c) 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Underscore may be freely distributed under the MIT license.

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `exports` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var
    push             = ArrayProto.push,
    slice            = ArrayProto.slice,
    concat           = ArrayProto.concat,
    toString         = ObjProto.toString,
    hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) {
    if (obj instanceof _) return obj;
    if (!(this instanceof _)) return new _(obj);
    this._wrapped = obj;
  };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root._ = _;
  }

  // Current version.
  _.VERSION = '1.5.2';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      var keys = _.keys(obj);
      for (var i = 0, length = keys.length; i < length; i++) {
        if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results.push(iterator.call(context, value, index, list));
    });
    return results;
  };

  var reduceError = 'Reduce of empty array with no initial value';

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var length = obj.length;
    if (length !== +length) {
      var keys = _.keys(obj);
      length = keys.length;
    }
    each(obj, function(value, index, list) {
      index = keys ? keys[--length] : --length;
      if (!initial) {
        memo = obj[index];
        initial = true;
      } else {
        memo = iterator.call(context, memo, obj[index], index, list);
      }
    });
    if (!initial) throw new TypeError(reduceError);
    return memo;
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results.push(value);
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    return _.filter(obj, function(value, index, list) {
      return !iterator.call(context, value, index, list);
    }, context);
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if the array or object contains a given value (using `===`).
  // Aliased as `include`.
  _.contains = _.include = function(obj, target) {
    if (obj == null) return false;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    return any(obj, function(value) {
      return value === target;
    });
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    var isFunc = _.isFunction(method);
    return _.map(obj, function(value) {
      return (isFunc ? method : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Convenience version of a common use case of `filter`: selecting only objects
  // containing specific `key:value` pairs.
  _.where = function(obj, attrs, first) {
    if (_.isEmpty(attrs)) return first ? void 0 : [];
    return _[first ? 'find' : 'filter'](obj, function(value) {
      for (var key in attrs) {
        if (attrs[key] !== value[key]) return false;
      }
      return true;
    });
  };

  // Convenience version of a common use case of `find`: getting the first object
  // containing specific `key:value` pairs.
  _.findWhere = function(obj, attrs) {
    return _.where(obj, attrs, true);
  };

  // Return the maximum element or (element-based computation).
  // Can't optimize arrays of integers longer than 65,535 elements.
  // See [WebKit Bug 80797](https://bugs.webkit.org/show_bug.cgi?id=80797)
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.max.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity, value: -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed > result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0] && obj.length < 65535) {
      return Math.min.apply(Math, obj);
    }
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity, value: Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array, using the modern version of the 
  // [Fisher-Yates shuffle](http://en.wikipedia.org/wiki/Fisher–Yates_shuffle).
  _.shuffle = function(obj) {
    var rand;
    var index = 0;
    var shuffled = [];
    each(obj, function(value) {
      rand = _.random(index++);
      shuffled[index - 1] = shuffled[rand];
      shuffled[rand] = value;
    });
    return shuffled;
  };

  // Sample **n** random values from an array.
  // If **n** is not specified, returns a single random element from the array.
  // The internal `guard` argument allows it to work with `map`.
  _.sample = function(obj, n, guard) {
    if (arguments.length < 2 || guard) {
      return obj[_.random(obj.length - 1)];
    }
    return _.shuffle(obj).slice(0, Math.max(0, n));
  };

  // An internal function to generate lookup iterators.
  var lookupIterator = function(value) {
    return _.isFunction(value) ? value : function(obj){ return obj[value]; };
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, value, context) {
    var iterator = lookupIterator(value);
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value: value,
        index: index,
        criteria: iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria;
      var b = right.criteria;
      if (a !== b) {
        if (a > b || a === void 0) return 1;
        if (a < b || b === void 0) return -1;
      }
      return left.index - right.index;
    }), 'value');
  };

  // An internal function used for aggregate "group by" operations.
  var group = function(behavior) {
    return function(obj, value, context) {
      var result = {};
      var iterator = value == null ? _.identity : lookupIterator(value);
      each(obj, function(value, index) {
        var key = iterator.call(context, value, index, obj);
        behavior(result, key, value);
      });
      return result;
    };
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = group(function(result, key, value) {
    (_.has(result, key) ? result[key] : (result[key] = [])).push(value);
  });

  // Indexes the object's values by a criterion, similar to `groupBy`, but for
  // when you know that your index values will be unique.
  _.indexBy = group(function(result, key, value) {
    result[key] = value;
  });

  // Counts instances of an object that group by a certain criterion. Pass
  // either a string attribute to count by, or a function that returns the
  // criterion.
  _.countBy = group(function(result, key) {
    _.has(result, key) ? result[key]++ : result[key] = 1;
  });

  // Use a comparator function to figure out the smallest index at which
  // an object should be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator, context) {
    iterator = iterator == null ? _.identity : lookupIterator(iterator);
    var value = iterator.call(context, obj);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >>> 1;
      iterator.call(context, array[mid]) < value ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely create a real, live array from anything iterable.
  _.toArray = function(obj) {
    if (!obj) return [];
    if (_.isArray(obj)) return slice.call(obj);
    if (obj.length === +obj.length) return _.map(obj, _.identity);
    return _.values(obj);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    if (obj == null) return 0;
    return (obj.length === +obj.length) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head` and `take`. The **guard** check
  // allows it to work with `_.map`.
  _.first = _.head = _.take = function(array, n, guard) {
    if (array == null) return void 0;
    return (n == null) || guard ? array[0] : slice.call(array, 0, n);
  };

  // Returns everything but the last entry of the array. Especially useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if (array == null) return void 0;
    if ((n == null) || guard) {
      return array[array.length - 1];
    } else {
      return slice.call(array, Math.max(array.length - n, 0));
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
  // Especially useful on the arguments object. Passing an **n** will return
  // the rest N values in the array. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = _.drop = function(array, n, guard) {
    return slice.call(array, (n == null) || guard ? 1 : n);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, _.identity);
  };

  // Internal implementation of a recursive `flatten` function.
  var flatten = function(input, shallow, output) {
    if (shallow && _.every(input, _.isArray)) {
      return concat.apply(output, input);
    }
    each(input, function(value) {
      if (_.isArray(value) || _.isArguments(value)) {
        shallow ? push.apply(output, value) : flatten(value, shallow, output);
      } else {
        output.push(value);
      }
    });
    return output;
  };

  // Flatten out an array, either recursively (by default), or just one level.
  _.flatten = function(array, shallow) {
    return flatten(array, shallow, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator, context) {
    if (_.isFunction(isSorted)) {
      context = iterator;
      iterator = isSorted;
      isSorted = false;
    }
    var initial = iterator ? _.map(array, iterator, context) : array;
    var results = [];
    var seen = [];
    each(initial, function(value, index) {
      if (isSorted ? (!index || seen[seen.length - 1] !== value) : !_.contains(seen, value)) {
        seen.push(value);
        results.push(array[index]);
      }
    });
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays.
  _.intersection = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = concat.apply(ArrayProto, slice.call(arguments, 1));
    return _.filter(array, function(value){ return !_.contains(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var length = _.max(_.pluck(arguments, "length").concat(0));
    var results = new Array(length);
    for (var i = 0; i < length; i++) {
      results[i] = _.pluck(arguments, '' + i);
    }
    return results;
  };

  // Converts lists into objects. Pass either a single array of `[key, value]`
  // pairs, or two parallel arrays of the same length -- one of keys, and one of
  // the corresponding values.
  _.object = function(list, values) {
    if (list == null) return {};
    var result = {};
    for (var i = 0, length = list.length; i < length; i++) {
      if (values) {
        result[list[i]] = values[i];
      } else {
        result[list[i][0]] = list[i][1];
      }
    }
    return result;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i = 0, length = array.length;
    if (isSorted) {
      if (typeof isSorted == 'number') {
        i = (isSorted < 0 ? Math.max(0, length + isSorted) : isSorted);
      } else {
        i = _.sortedIndex(array, item);
        return array[i] === item ? i : -1;
      }
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item, isSorted);
    for (; i < length; i++) if (array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item, from) {
    if (array == null) return -1;
    var hasIndex = from != null;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) {
      return hasIndex ? array.lastIndexOf(item, from) : array.lastIndexOf(item);
    }
    var i = (hasIndex ? from : array.length);
    while (i--) if (array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var length = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(length);

    while(idx < length) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Delegates to **ECMAScript 5**'s native `Function.bind` if
  // available.
  _.bind = function(func, context) {
    var args, bound;
    if (nativeBind && func.bind === nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      ctor.prototype = null;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Partially apply a function by creating a version that has had some of its
  // arguments pre-filled, without changing its dynamic `this` context.
  _.partial = function(func) {
    var args = slice.call(arguments, 1);
    return function() {
      return func.apply(this, args.concat(slice.call(arguments)));
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length === 0) throw new Error("bindAll must be passed function names");
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(null, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time. Normally, the throttled function will run
  // as much as it can, without ever going more than once per `wait` duration;
  // but if you'd like to disable the execution on the leading edge, pass
  // `{leading: false}`. To disable execution on the trailing edge, ditto.
  _.throttle = function(func, wait, options) {
    var context, args, result;
    var timeout = null;
    var previous = 0;
    options || (options = {});
    var later = function() {
      previous = options.leading === false ? 0 : new Date;
      timeout = null;
      result = func.apply(context, args);
    };
    return function() {
      var now = new Date;
      if (!previous && options.leading === false) previous = now;
      var remaining = wait - (now - previous);
      context = this;
      args = arguments;
      if (remaining <= 0) {
        clearTimeout(timeout);
        timeout = null;
        previous = now;
        result = func.apply(context, args);
      } else if (!timeout && options.trailing !== false) {
        timeout = setTimeout(later, remaining);
      }
      return result;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout, args, context, timestamp, result;
    return function() {
      context = this;
      args = arguments;
      timestamp = new Date();
      var later = function() {
        var last = (new Date()) - timestamp;
        if (last < wait) {
          timeout = setTimeout(later, wait - last);
        } else {
          timeout = null;
          if (!immediate) result = func.apply(context, args);
        }
      };
      var callNow = immediate && !timeout;
      if (!timeout) {
        timeout = setTimeout(later, wait);
      }
      if (callNow) result = func.apply(context, args);
      return result;
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      memo = func.apply(this, arguments);
      func = null;
      return memo;
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func];
      push.apply(args, arguments);
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    return function() {
      if (--times < 1) {
        return func.apply(this, arguments);
      }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys.push(key);
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var values = new Array(length);
    for (var i = 0; i < length; i++) {
      values[i] = obj[keys[i]];
    }
    return values;
  };

  // Convert an object into a list of `[key, value]` pairs.
  _.pairs = function(obj) {
    var keys = _.keys(obj);
    var length = keys.length;
    var pairs = new Array(length);
    for (var i = 0; i < length; i++) {
      pairs[i] = [keys[i], obj[keys[i]]];
    }
    return pairs;
  };

  // Invert the keys and values of an object. The values must be serializable.
  _.invert = function(obj) {
    var result = {};
    var keys = _.keys(obj);
    for (var i = 0, length = keys.length; i < length; i++) {
      result[obj[keys[i]]] = keys[i];
    }
    return result;
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Return a copy of the object only containing the whitelisted properties.
  _.pick = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    each(keys, function(key) {
      if (key in obj) copy[key] = obj[key];
    });
    return copy;
  };

   // Return a copy of the object without the blacklisted properties.
  _.omit = function(obj) {
    var copy = {};
    var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
    for (var key in obj) {
      if (!_.contains(keys, key)) copy[key] = obj[key];
    }
    return copy;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      if (source) {
        for (var prop in source) {
          if (obj[prop] === void 0) obj[prop] = source[prop];
        }
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function for `isEqual`.
  var eq = function(a, b, aStack, bStack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the [Harmony `egal` proposal](http://wiki.ecmascript.org/doku.php?id=harmony:egal).
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a instanceof _) a = a._wrapped;
    if (b instanceof _) b = b._wrapped;
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = aStack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (aStack[length] == a) return bStack[length] == b;
    }
    // Objects with different constructors are not equivalent, but `Object`s
    // from different frames are.
    var aCtor = a.constructor, bCtor = b.constructor;
    if (aCtor !== bCtor && !(_.isFunction(aCtor) && (aCtor instanceof aCtor) &&
                             _.isFunction(bCtor) && (bCtor instanceof bCtor))) {
      return false;
    }
    // Add the first object to the stack of traversed objects.
    aStack.push(a);
    bStack.push(b);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          if (!(result = eq(a[size], b[size], aStack, bStack))) break;
        }
      }
    } else {
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], aStack, bStack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    aStack.pop();
    bStack.pop();
    return result;
  };

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, [], []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType === 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Add some isType methods: isArguments, isFunction, isString, isNumber, isDate, isRegExp.
  each(['Arguments', 'Function', 'String', 'Number', 'Date', 'RegExp'], function(name) {
    _['is' + name] = function(obj) {
      return toString.call(obj) == '[object ' + name + ']';
    };
  });

  // Define a fallback version of the method in browsers (ahem, IE), where
  // there isn't any inspectable "Arguments" type.
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Optimize `isFunction` if appropriate.
  if (typeof (/./) !== 'function') {
    _.isFunction = function(obj) {
      return typeof obj === 'function';
    };
  }

  // Is a given object a finite number?
  _.isFinite = function(obj) {
    return isFinite(obj) && !isNaN(parseFloat(obj));
  };

  // Is the given value `NaN`? (NaN is the only number which does not equal itself).
  _.isNaN = function(obj) {
    return _.isNumber(obj) && obj != +obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Shortcut function for checking if an object has a given property directly
  // on itself (in other words, not on a prototype).
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function(n, iterator, context) {
    var accum = Array(Math.max(0, n));
    for (var i = 0; i < n; i++) accum[i] = iterator.call(context, i);
    return accum;
  };

  // Return a random integer between min and max (inclusive).
  _.random = function(min, max) {
    if (max == null) {
      max = min;
      min = 0;
    }
    return min + Math.floor(Math.random() * (max - min + 1));
  };

  // List of HTML entities for escaping.
  var entityMap = {
    escape: {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;'
    }
  };
  entityMap.unescape = _.invert(entityMap.escape);

  // Regexes containing the keys and values listed immediately above.
  var entityRegexes = {
    escape:   new RegExp('[' + _.keys(entityMap.escape).join('') + ']', 'g'),
    unescape: new RegExp('(' + _.keys(entityMap.unescape).join('|') + ')', 'g')
  };

  // Functions for escaping and unescaping strings to/from HTML interpolation.
  _.each(['escape', 'unescape'], function(method) {
    _[method] = function(string) {
      if (string == null) return '';
      return ('' + string).replace(entityRegexes[method], function(match) {
        return entityMap[method][match];
      });
    };
  });

  // If the value of the named `property` is a function then invoke it with the
  // `object` as context; otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return void 0;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name) {
      var func = _[name] = obj[name];
      _.prototype[name] = function() {
        var args = [this._wrapped];
        push.apply(args, arguments);
        return result.call(this, func.apply(_, args));
      };
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = ++idCounter + '';
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /(.)^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    "'":      "'",
    '\\':     '\\',
    '\r':     'r',
    '\n':     'n',
    '\t':     't',
    '\u2028': 'u2028',
    '\u2029': 'u2029'
  };

  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(text, data, settings) {
    var render;
    settings = _.defaults({}, settings, _.templateSettings);

    // Combine delimiters into one regular expression via alternation.
    var matcher = new RegExp([
      (settings.escape || noMatch).source,
      (settings.interpolate || noMatch).source,
      (settings.evaluate || noMatch).source
    ].join('|') + '|$', 'g');

    // Compile the template source, escaping string literals appropriately.
    var index = 0;
    var source = "__p+='";
    text.replace(matcher, function(match, escape, interpolate, evaluate, offset) {
      source += text.slice(index, offset)
        .replace(escaper, function(match) { return '\\' + escapes[match]; });

      if (escape) {
        source += "'+\n((__t=(" + escape + "))==null?'':_.escape(__t))+\n'";
      }
      if (interpolate) {
        source += "'+\n((__t=(" + interpolate + "))==null?'':__t)+\n'";
      }
      if (evaluate) {
        source += "';\n" + evaluate + "\n__p+='";
      }
      index = offset + match.length;
      return match;
    });
    source += "';\n";

    // If a variable is not specified, place data values in local scope.
    if (!settings.variable) source = 'with(obj||{}){\n' + source + '}\n';

    source = "var __t,__p='',__j=Array.prototype.join," +
      "print=function(){__p+=__j.call(arguments,'');};\n" +
      source + "return __p;\n";

    try {
      render = new Function(settings.variable || 'obj', '_', source);
    } catch (e) {
      e.source = source;
      throw e;
    }

    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };

    // Provide the compiled function source as a convenience for precompilation.
    template.source = 'function(' + (settings.variable || 'obj') + '){\n' + source + '}';

    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // OOP
  // ---------------
  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.

  // Helper function to continue chaining intermediate results.
  var result = function(obj) {
    return this._chain ? _(obj).chain() : obj;
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      var obj = this._wrapped;
      method.apply(obj, arguments);
      if ((name == 'shift' || name == 'splice') && obj.length === 0) delete obj[0];
      return result.call(this, obj);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    _.prototype[name] = function() {
      return result.call(this, method.apply(this._wrapped, arguments));
    };
  });

  _.extend(_.prototype, {

    // Start chaining a wrapped Underscore object.
    chain: function() {
      this._chain = true;
      return this;
    },

    // Extracts the result from a wrapped and chained object.
    value: function() {
      return this._wrapped;
    }

  });

}).call(this);

// bower_components/underscore.string/lib/underscore.string.js
//  Underscore.string
//  (c) 2010 Esa-Matti Suuronen <esa-matti aet suuronen dot org>
//  Underscore.string is freely distributable under the terms of the MIT license.
//  Documentation: https://github.com/epeli/underscore.string
//  Some code is borrowed from MooTools and Alexandru Marasteanu.
//  Version '2.3.2'

!function(root, String){
  'use strict';

  // Defining helper functions.

  var nativeTrim = String.prototype.trim;
  var nativeTrimRight = String.prototype.trimRight;
  var nativeTrimLeft = String.prototype.trimLeft;

  var parseNumber = function(source) { return source * 1 || 0; };

  var strRepeat = function(str, qty){
    if (qty < 1) return '';
    var result = '';
    while (qty > 0) {
      if (qty & 1) result += str;
      qty >>= 1, str += str;
    }
    return result;
  };

  var slice = [].slice;

  var defaultToWhiteSpace = function(characters) {
    if (characters == null)
      return '\\s';
    else if (characters.source)
      return characters.source;
    else
      return '[' + _s.escapeRegExp(characters) + ']';
  };

  // Helper for toBoolean
  function boolMatch(s, matchers) {
    var i, matcher, down = s.toLowerCase();
    matchers = [].concat(matchers);
    for (i = 0; i < matchers.length; i += 1) {
      matcher = matchers[i];
      if (!matcher) continue;
      if (matcher.test && matcher.test(s)) return true;
      if (matcher.toLowerCase() === down) return true;
    }
  }

  var escapeChars = {
    lt: '<',
    gt: '>',
    quot: '"',
    amp: '&',
    apos: "'"
  };

  var reversedEscapeChars = {};
  for(var key in escapeChars) reversedEscapeChars[escapeChars[key]] = key;
  reversedEscapeChars["'"] = '#39';

  // sprintf() for JavaScript 0.7-beta1
  // http://www.diveintojavascript.com/projects/javascript-sprintf
  //
  // Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
  // All rights reserved.

  var sprintf = (function() {
    function get_type(variable) {
      return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
    }

    var str_repeat = strRepeat;

    var str_format = function() {
      if (!str_format.cache.hasOwnProperty(arguments[0])) {
        str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
      }
      return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
    };

    str_format.format = function(parse_tree, argv) {
      var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
      for (i = 0; i < tree_length; i++) {
        node_type = get_type(parse_tree[i]);
        if (node_type === 'string') {
          output.push(parse_tree[i]);
        }
        else if (node_type === 'array') {
          match = parse_tree[i]; // convenience purposes only
          if (match[2]) { // keyword argument
            arg = argv[cursor];
            for (k = 0; k < match[2].length; k++) {
              if (!arg.hasOwnProperty(match[2][k])) {
                throw new Error(sprintf('[_.sprintf] property "%s" does not exist', match[2][k]));
              }
              arg = arg[match[2][k]];
            }
          } else if (match[1]) { // positional argument (explicit)
            arg = argv[match[1]];
          }
          else { // positional argument (implicit)
            arg = argv[cursor++];
          }

          if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
            throw new Error(sprintf('[_.sprintf] expecting number but found %s', get_type(arg)));
          }
          switch (match[8]) {
            case 'b': arg = arg.toString(2); break;
            case 'c': arg = String.fromCharCode(arg); break;
            case 'd': arg = parseInt(arg, 10); break;
            case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
            case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
            case 'o': arg = arg.toString(8); break;
            case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
            case 'u': arg = Math.abs(arg); break;
            case 'x': arg = arg.toString(16); break;
            case 'X': arg = arg.toString(16).toUpperCase(); break;
          }
          arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
          pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
          pad_length = match[6] - String(arg).length;
          pad = match[6] ? str_repeat(pad_character, pad_length) : '';
          output.push(match[5] ? arg + pad : pad + arg);
        }
      }
      return output.join('');
    };

    str_format.cache = {};

    str_format.parse = function(fmt) {
      var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
      while (_fmt) {
        if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
          parse_tree.push(match[0]);
        }
        else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
          parse_tree.push('%');
        }
        else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
          if (match[2]) {
            arg_names |= 1;
            var field_list = [], replacement_field = match[2], field_match = [];
            if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
              field_list.push(field_match[1]);
              while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                }
                else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                }
                else {
                  throw new Error('[_.sprintf] huh?');
                }
              }
            }
            else {
              throw new Error('[_.sprintf] huh?');
            }
            match[2] = field_list;
          }
          else {
            arg_names |= 2;
          }
          if (arg_names === 3) {
            throw new Error('[_.sprintf] mixing positional and named placeholders is not (yet) supported');
          }
          parse_tree.push(match);
        }
        else {
          throw new Error('[_.sprintf] huh?');
        }
        _fmt = _fmt.substring(match[0].length);
      }
      return parse_tree;
    };

    return str_format;
  })();



  // Defining underscore.string

  var _s = {

    VERSION: '2.3.0',

    isBlank: function(str){
      if (str == null) str = '';
      return (/^\s*$/).test(str);
    },

    stripTags: function(str){
      if (str == null) return '';
      return String(str).replace(/<\/?[^>]+>/g, '');
    },

    capitalize : function(str){
      str = str == null ? '' : String(str);
      return str.charAt(0).toUpperCase() + str.slice(1);
    },

    chop: function(str, step){
      if (str == null) return [];
      str = String(str);
      step = ~~step;
      return step > 0 ? str.match(new RegExp('.{1,' + step + '}', 'g')) : [str];
    },

    clean: function(str){
      return _s.strip(str).replace(/\s+/g, ' ');
    },

    count: function(str, substr){
      if (str == null || substr == null) return 0;

      str = String(str);
      substr = String(substr);

      var count = 0,
        pos = 0,
        length = substr.length;

      while (true) {
        pos = str.indexOf(substr, pos);
        if (pos === -1) break;
        count++;
        pos += length;
      }

      return count;
    },

    chars: function(str) {
      if (str == null) return [];
      return String(str).split('');
    },

    swapCase: function(str) {
      if (str == null) return '';
      return String(str).replace(/\S/g, function(c){
        return c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase();
      });
    },

    escapeHTML: function(str) {
      if (str == null) return '';
      return String(str).replace(/[&<>"']/g, function(m){ return '&' + reversedEscapeChars[m] + ';'; });
    },

    unescapeHTML: function(str) {
      if (str == null) return '';
      return String(str).replace(/\&([^;]+);/g, function(entity, entityCode){
        var match;

        if (entityCode in escapeChars) {
          return escapeChars[entityCode];
        } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
          return String.fromCharCode(parseInt(match[1], 16));
        } else if (match = entityCode.match(/^#(\d+)$/)) {
          return String.fromCharCode(~~match[1]);
        } else {
          return entity;
        }
      });
    },

    escapeRegExp: function(str){
      if (str == null) return '';
      return String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1');
    },

    splice: function(str, i, howmany, substr){
      var arr = _s.chars(str);
      arr.splice(~~i, ~~howmany, substr);
      return arr.join('');
    },

    insert: function(str, i, substr){
      return _s.splice(str, i, 0, substr);
    },

    include: function(str, needle){
      if (needle === '') return true;
      if (str == null) return false;
      return String(str).indexOf(needle) !== -1;
    },

    join: function() {
      var args = slice.call(arguments),
        separator = args.shift();

      if (separator == null) separator = '';

      return args.join(separator);
    },

    lines: function(str) {
      if (str == null) return [];
      return String(str).split("\n");
    },

    reverse: function(str){
      return _s.chars(str).reverse().join('');
    },

    startsWith: function(str, starts){
      if (starts === '') return true;
      if (str == null || starts == null) return false;
      str = String(str); starts = String(starts);
      return str.length >= starts.length && str.slice(0, starts.length) === starts;
    },

    endsWith: function(str, ends){
      if (ends === '') return true;
      if (str == null || ends == null) return false;
      str = String(str); ends = String(ends);
      return str.length >= ends.length && str.slice(str.length - ends.length) === ends;
    },

    succ: function(str){
      if (str == null) return '';
      str = String(str);
      return str.slice(0, -1) + String.fromCharCode(str.charCodeAt(str.length-1) + 1);
    },

    titleize: function(str){
      if (str == null) return '';
      str  = String(str).toLowerCase();
      return str.replace(/(?:^|\s|-)\S/g, function(c){ return c.toUpperCase(); });
    },

    camelize: function(str){
      return _s.trim(str).replace(/[-_\s]+(.)?/g, function(match, c){ return c ? c.toUpperCase() : ""; });
    },

    underscored: function(str){
      return _s.trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
    },

    dasherize: function(str){
      return _s.trim(str).replace(/([A-Z])/g, '-$1').replace(/[-_\s]+/g, '-').toLowerCase();
    },

    classify: function(str){
      return _s.titleize(String(str).replace(/[\W_]/g, ' ')).replace(/\s/g, '');
    },

    humanize: function(str){
      return _s.capitalize(_s.underscored(str).replace(/_id$/,'').replace(/_/g, ' '));
    },

    trim: function(str, characters){
      if (str == null) return '';
      if (!characters && nativeTrim) return nativeTrim.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp('\^' + characters + '+|' + characters + '+$', 'g'), '');
    },

    ltrim: function(str, characters){
      if (str == null) return '';
      if (!characters && nativeTrimLeft) return nativeTrimLeft.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp('^' + characters + '+'), '');
    },

    rtrim: function(str, characters){
      if (str == null) return '';
      if (!characters && nativeTrimRight) return nativeTrimRight.call(str);
      characters = defaultToWhiteSpace(characters);
      return String(str).replace(new RegExp(characters + '+$'), '');
    },

    truncate: function(str, length, truncateStr){
      if (str == null) return '';
      str = String(str); truncateStr = truncateStr || '...';
      length = ~~length;
      return str.length > length ? str.slice(0, length) + truncateStr : str;
    },

    /**
     * _s.prune: a more elegant version of truncate
     * prune extra chars, never leaving a half-chopped word.
     * @author github.com/rwz
     */
    prune: function(str, length, pruneStr){
      if (str == null) return '';

      str = String(str); length = ~~length;
      pruneStr = pruneStr != null ? String(pruneStr) : '...';

      if (str.length <= length) return str;

      var tmpl = function(c){ return c.toUpperCase() !== c.toLowerCase() ? 'A' : ' '; },
        template = str.slice(0, length+1).replace(/.(?=\W*\w*$)/g, tmpl); // 'Hello, world' -> 'HellAA AAAAA'

      if (template.slice(template.length-2).match(/\w\w/))
        template = template.replace(/\s*\S+$/, '');
      else
        template = _s.rtrim(template.slice(0, template.length-1));

      return (template+pruneStr).length > str.length ? str : str.slice(0, template.length)+pruneStr;
    },

    words: function(str, delimiter) {
      if (_s.isBlank(str)) return [];
      return _s.trim(str, delimiter).split(delimiter || /\s+/);
    },

    pad: function(str, length, padStr, type) {
      str = str == null ? '' : String(str);
      length = ~~length;

      var padlen  = 0;

      if (!padStr)
        padStr = ' ';
      else if (padStr.length > 1)
        padStr = padStr.charAt(0);

      switch(type) {
        case 'right':
          padlen = length - str.length;
          return str + strRepeat(padStr, padlen);
        case 'both':
          padlen = length - str.length;
          return strRepeat(padStr, Math.ceil(padlen/2)) + str
                  + strRepeat(padStr, Math.floor(padlen/2));
        default: // 'left'
          padlen = length - str.length;
          return strRepeat(padStr, padlen) + str;
        }
    },

    lpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr);
    },

    rpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr, 'right');
    },

    lrpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr, 'both');
    },

    sprintf: sprintf,

    vsprintf: function(fmt, argv){
      argv.unshift(fmt);
      return sprintf.apply(null, argv);
    },

    toNumber: function(str, decimals) {
      if (!str) return 0;
      str = _s.trim(str);
      if (!str.match(/^-?\d+(?:\.\d+)?$/)) return NaN;
      return parseNumber(parseNumber(str).toFixed(~~decimals));
    },

    numberFormat : function(number, dec, dsep, tsep) {
      if (isNaN(number) || number == null) return '';

      number = number.toFixed(~~dec);
      tsep = typeof tsep == 'string' ? tsep : ',';

      var parts = number.split('.'), fnums = parts[0],
        decimals = parts[1] ? (dsep || '.') + parts[1] : '';

      return fnums.replace(/(\d)(?=(?:\d{3})+$)/g, '$1' + tsep) + decimals;
    },

    strRight: function(str, sep){
      if (str == null) return '';
      str = String(str); sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.indexOf(sep);
      return ~pos ? str.slice(pos+sep.length, str.length) : str;
    },

    strRightBack: function(str, sep){
      if (str == null) return '';
      str = String(str); sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.lastIndexOf(sep);
      return ~pos ? str.slice(pos+sep.length, str.length) : str;
    },

    strLeft: function(str, sep){
      if (str == null) return '';
      str = String(str); sep = sep != null ? String(sep) : sep;
      var pos = !sep ? -1 : str.indexOf(sep);
      return ~pos ? str.slice(0, pos) : str;
    },

    strLeftBack: function(str, sep){
      if (str == null) return '';
      str += ''; sep = sep != null ? ''+sep : sep;
      var pos = str.lastIndexOf(sep);
      return ~pos ? str.slice(0, pos) : str;
    },

    toSentence: function(array, separator, lastSeparator, serial) {
      separator = separator || ', ';
      lastSeparator = lastSeparator || ' and ';
      var a = array.slice(), lastMember = a.pop();

      if (array.length > 2 && serial) lastSeparator = _s.rtrim(separator) + lastSeparator;

      return a.length ? a.join(separator) + lastSeparator + lastMember : lastMember;
    },

    toSentenceSerial: function() {
      var args = slice.call(arguments);
      args[3] = true;
      return _s.toSentence.apply(_s, args);
    },

    slugify: function(str) {
      if (str == null) return '';

      var from  = "ąàáäâãåæăćęèéëêìíïîłńòóöôõøśșțùúüûñçżź",
          to    = "aaaaaaaaaceeeeeiiiilnoooooosstuuuunczz",
          regex = new RegExp(defaultToWhiteSpace(from), 'g');

      str = String(str).toLowerCase().replace(regex, function(c){
        var index = from.indexOf(c);
        return to.charAt(index) || '-';
      });

      return _s.dasherize(str.replace(/[^\w\s-]/g, ''));
    },

    surround: function(str, wrapper) {
      return [wrapper, str, wrapper].join('');
    },

    quote: function(str, quoteChar) {
      return _s.surround(str, quoteChar || '"');
    },

    unquote: function(str, quoteChar) {
      quoteChar = quoteChar || '"';
      if (str[0] === quoteChar && str[str.length-1] === quoteChar)
        return str.slice(1,str.length-1);
      else return str;
    },

    exports: function() {
      var result = {};

      for (var prop in this) {
        if (!this.hasOwnProperty(prop) || prop.match(/^(?:include|contains|reverse)$/)) continue;
        result[prop] = this[prop];
      }

      return result;
    },

    repeat: function(str, qty, separator){
      if (str == null) return '';

      qty = ~~qty;

      // using faster implementation if separator is not needed;
      if (separator == null) return strRepeat(String(str), qty);

      // this one is about 300x slower in Google Chrome
      for (var repeat = []; qty > 0; repeat[--qty] = str) {}
      return repeat.join(separator);
    },

    naturalCmp: function(str1, str2){
      if (str1 == str2) return 0;
      if (!str1) return -1;
      if (!str2) return 1;

      var cmpRegex = /(\.\d+)|(\d+)|(\D+)/g,
        tokens1 = String(str1).toLowerCase().match(cmpRegex),
        tokens2 = String(str2).toLowerCase().match(cmpRegex),
        count = Math.min(tokens1.length, tokens2.length);

      for(var i = 0; i < count; i++) {
        var a = tokens1[i], b = tokens2[i];

        if (a !== b){
          var num1 = parseInt(a, 10);
          if (!isNaN(num1)){
            var num2 = parseInt(b, 10);
            if (!isNaN(num2) && num1 - num2)
              return num1 - num2;
          }
          return a < b ? -1 : 1;
        }
      }

      if (tokens1.length === tokens2.length)
        return tokens1.length - tokens2.length;

      return str1 < str2 ? -1 : 1;
    },

    levenshtein: function(str1, str2) {
      if (str1 == null && str2 == null) return 0;
      if (str1 == null) return String(str2).length;
      if (str2 == null) return String(str1).length;

      str1 = String(str1); str2 = String(str2);

      var current = [], prev, value;

      for (var i = 0; i <= str2.length; i++)
        for (var j = 0; j <= str1.length; j++) {
          if (i && j)
            if (str1.charAt(j - 1) === str2.charAt(i - 1))
              value = prev;
            else
              value = Math.min(current[j], current[j - 1], prev) + 1;
          else
            value = i + j;

          prev = current[j];
          current[j] = value;
        }

      return current.pop();
    },

    toBoolean: function(str, trueValues, falseValues) {
      if (typeof str === "number") str = "" + str;
      if (typeof str !== "string") return !!str;
      str = _s.trim(str);
      if (boolMatch(str, trueValues || ["true", "1"])) return true;
      if (boolMatch(str, falseValues || ["false", "0"])) return false;
    }
  };

  // Aliases

  _s.strip    = _s.trim;
  _s.lstrip   = _s.ltrim;
  _s.rstrip   = _s.rtrim;
  _s.center   = _s.lrpad;
  _s.rjust    = _s.lpad;
  _s.ljust    = _s.rpad;
  _s.contains = _s.include;
  _s.q        = _s.quote;
  _s.toBool   = _s.toBoolean;

  // Exporting

  // CommonJS module is defined
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports)
      module.exports = _s;

    exports._s = _s;
  }

  // Register as a named module with AMD.
  if (typeof define === 'function' && define.amd)
    define('underscore.string', [], function(){ return _s; });


  // Integrate with Underscore.js if defined
  // or create our own underscore object.
  root._ = root._ || {};
  root._.string = root._.str = _s;
}(this, String);

// bower_components/herit/herit.js
(function () {
  'use strict';

  // Browser and Node.js friendly
  var node = typeof window === 'undefined';

  var extend = function (objA) {
    for (var i = 1, l = arguments.length; i < l; ++i) {
      var objB = arguments[i];
      for (var k in objB) if (objB.hasOwnProperty(k)) objA[k] = objB[k];
    }
    return objA;
  };

  // Define the mixin
  var herit = function () {

    // Juggle arguments.
    var i;
    var Parent = function () {};
    for (i = 0; typeof arguments[i] === 'function'; ++i) {
      Parent = i ? herit(arguments[i], {constructor: Parent}) : arguments[i];
    }
    var protoProps = arguments[i] || {};

    // `Child` is the passed in `constructor` proto property
    // or a default function that uses `Parent`'s constructor.
    var Child =
      protoProps.hasOwnProperty('constructor') ?
      protoProps.constructor :
      function () { return Parent.apply(this, arguments); };

    // Use Object.create if it's available.
    if (false && typeof Object.create === 'function') {
      Child.prototype = Object.create(Parent.prototype);

    // Otherwise use the workaround.
    } else {

      // `Dummy` is a dummy constructor to ensure `Parent.constructor`
      // isn't actually called as it could have unintended
      // side effects.
      var Dummy = function () { this.constructor = Child; };
      Dummy.prototype = Parent.prototype;
      Child.prototype = new Dummy();
    }

    // Pass __super__ and the on the prototype properties.
    extend(Child.prototype, protoProps);

    // Pass on the static properties.
    extend(Child, Parent, arguments[i + 1] || {});

    // Return the finished constructor.
    return Child;
  };

  node ? module.exports = herit : window.herit = herit;
})();

// bower_components/backbone/backbone.js
//     Backbone.js 1.1.0

//     (c) 2010-2011 Jeremy Ashkenas, DocumentCloud Inc.
//     (c) 2011-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
//     Backbone may be freely distributed under the MIT license.
//     For all details and documentation:
//     http://backbonejs.org

(function(root, factory) {

  // Set up Backbone appropriately for the environment. Start with AMD.
  if (typeof define === 'function' && define.amd) {
    define(['underscore', 'jquery', 'exports'], function(_, $, exports) {
      // Export global even in AMD case in case this script is loaded with
      // others that may still expect a global Backbone.
      root.Backbone = factory(root, exports, _, $);
    });

  // Next for Node.js or CommonJS. jQuery may not be needed as a module.
  } else if (typeof exports !== 'undefined') {
    var _ = require('underscore'), $;
    try { $ = require('jquery'); } catch(e) {};
    factory(root, exports, _, $);

  // Finally, as a browser global.
  } else {
    root.Backbone = factory(root, {}, root._, (root.jQuery || root.Zepto || root.ender || root.$));
  }

}(this, function(root, Backbone, _, $) {

  // Initial Setup
  // -------------

  // Save the previous value of the `Backbone` variable, so that it can be
  // restored later on, if `noConflict` is used.
  var previousBackbone = root.Backbone;

  // Create local references to array methods we'll want to use later.
  var array = [];
  var push = array.push;
  var slice = array.slice;
  var splice = array.splice;

  // Current version of the library. Keep in sync with `package.json`.
  Backbone.VERSION = '1.1.0';

  // For Backbone's purposes, jQuery, Zepto, Ender, or My Library (kidding) owns
  // the `$` variable.
  Backbone.$ = $;

  // Runs Backbone.js in *noConflict* mode, returning the `Backbone` variable
  // to its previous owner. Returns a reference to this Backbone object.
  Backbone.noConflict = function() {
    root.Backbone = previousBackbone;
    return this;
  };

  // Turn on `emulateHTTP` to support legacy HTTP servers. Setting this option
  // will fake `"PATCH"`, `"PUT"` and `"DELETE"` requests via the `_method` parameter and
  // set a `X-Http-Method-Override` header.
  Backbone.emulateHTTP = false;

  // Turn on `emulateJSON` to support legacy servers that can't deal with direct
  // `application/json` requests ... will encode the body as
  // `application/x-www-form-urlencoded` instead and will send the model in a
  // form param named `model`.
  Backbone.emulateJSON = false;

  // Backbone.Events
  // ---------------

  // A module that can be mixed in to *any object* in order to provide it with
  // custom events. You may bind with `on` or remove with `off` callback
  // functions to an event; `trigger`-ing an event fires all callbacks in
  // succession.
  //
  //     var object = {};
  //     _.extend(object, Backbone.Events);
  //     object.on('expand', function(){ alert('expanded'); });
  //     object.trigger('expand');
  //
  var Events = Backbone.Events = {

    // Bind an event to a `callback` function. Passing `"all"` will bind
    // the callback to all events fired.
    on: function(name, callback, context) {
      if (!eventsApi(this, 'on', name, [callback, context]) || !callback) return this;
      this._events || (this._events = {});
      var events = this._events[name] || (this._events[name] = []);
      events.push({callback: callback, context: context, ctx: context || this});
      return this;
    },

    // Bind an event to only be triggered a single time. After the first time
    // the callback is invoked, it will be removed.
    once: function(name, callback, context) {
      if (!eventsApi(this, 'once', name, [callback, context]) || !callback) return this;
      var self = this;
      var once = _.once(function() {
        self.off(name, once);
        callback.apply(this, arguments);
      });
      once._callback = callback;
      return this.on(name, once, context);
    },

    // Remove one or many callbacks. If `context` is null, removes all
    // callbacks with that function. If `callback` is null, removes all
    // callbacks for the event. If `name` is null, removes all bound
    // callbacks for all events.
    off: function(name, callback, context) {
      var retain, ev, events, names, i, l, j, k;
      if (!this._events || !eventsApi(this, 'off', name, [callback, context])) return this;
      if (!name && !callback && !context) {
        this._events = void 0;
        return this;
      }
      names = name ? [name] : _.keys(this._events);
      for (i = 0, l = names.length; i < l; i++) {
        name = names[i];
        if (events = this._events[name]) {
          this._events[name] = retain = [];
          if (callback || context) {
            for (j = 0, k = events.length; j < k; j++) {
              ev = events[j];
              if ((callback && callback !== ev.callback && callback !== ev.callback._callback) ||
                  (context && context !== ev.context)) {
                retain.push(ev);
              }
            }
          }
          if (!retain.length) delete this._events[name];
        }
      }

      return this;
    },

    // Trigger one or many events, firing all bound callbacks. Callbacks are
    // passed the same arguments as `trigger` is, apart from the event name
    // (unless you're listening on `"all"`, which will cause your callback to
    // receive the true name of the event as the first argument).
    trigger: function(name) {
      if (!this._events) return this;
      var args = slice.call(arguments, 1);
      if (!eventsApi(this, 'trigger', name, args)) return this;
      var events = this._events[name];
      var allEvents = this._events.all;
      if (events) triggerEvents(events, args);
      if (allEvents) triggerEvents(allEvents, arguments);
      return this;
    },

    // Tell this object to stop listening to either specific events ... or
    // to every object it's currently listening to.
    stopListening: function(obj, name, callback) {
      var listeningTo = this._listeningTo;
      if (!listeningTo) return this;
      var remove = !name && !callback;
      if (!callback && typeof name === 'object') callback = this;
      if (obj) (listeningTo = {})[obj._listenId] = obj;
      for (var id in listeningTo) {
        obj = listeningTo[id];
        obj.off(name, callback, this);
        if (remove || _.isEmpty(obj._events)) delete this._listeningTo[id];
      }
      return this;
    }

  };

  // Regular expression used to split event strings.
  var eventSplitter = /\s+/;

  // Implement fancy features of the Events API such as multiple event
  // names `"change blur"` and jQuery-style event maps `{change: action}`
  // in terms of the existing API.
  var eventsApi = function(obj, action, name, rest) {
    if (!name) return true;

    // Handle event maps.
    if (typeof name === 'object') {
      for (var key in name) {
        obj[action].apply(obj, [key, name[key]].concat(rest));
      }
      return false;
    }

    // Handle space separated event names.
    if (eventSplitter.test(name)) {
      var names = name.split(eventSplitter);
      for (var i = 0, l = names.length; i < l; i++) {
        obj[action].apply(obj, [names[i]].concat(rest));
      }
      return false;
    }

    return true;
  };

  // A difficult-to-believe, but optimized internal dispatch function for
  // triggering events. Tries to keep the usual cases speedy (most internal
  // Backbone events have 3 arguments).
  var triggerEvents = function(events, args) {
    var ev, i = -1, l = events.length, a1 = args[0], a2 = args[1], a3 = args[2];
    switch (args.length) {
      case 0: while (++i < l) (ev = events[i]).callback.call(ev.ctx); return;
      case 1: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1); return;
      case 2: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2); return;
      case 3: while (++i < l) (ev = events[i]).callback.call(ev.ctx, a1, a2, a3); return;
      default: while (++i < l) (ev = events[i]).callback.apply(ev.ctx, args);
    }
  };

  var listenMethods = {listenTo: 'on', listenToOnce: 'once'};

  // Inversion-of-control versions of `on` and `once`. Tell *this* object to
  // listen to an event in another object ... keeping track of what it's
  // listening to.
  _.each(listenMethods, function(implementation, method) {
    Events[method] = function(obj, name, callback) {
      var listeningTo = this._listeningTo || (this._listeningTo = {});
      var id = obj._listenId || (obj._listenId = _.uniqueId('l'));
      listeningTo[id] = obj;
      if (!callback && typeof name === 'object') callback = this;
      obj[implementation](name, callback, this);
      return this;
    };
  });

  // Aliases for backwards compatibility.
  Events.bind   = Events.on;
  Events.unbind = Events.off;

  // Allow the `Backbone` object to serve as a global event bus, for folks who
  // want global "pubsub" in a convenient place.
  _.extend(Backbone, Events);

  // Backbone.Model
  // --------------

  // Backbone **Models** are the basic data object in the framework --
  // frequently representing a row in a table in a database on your server.
  // A discrete chunk of data and a bunch of useful, related methods for
  // performing computations and transformations on that data.

  // Create a new model with the specified attributes. A client id (`cid`)
  // is automatically generated and assigned for you.
  var Model = Backbone.Model = function(attributes, options) {
    var attrs = attributes || {};
    options || (options = {});
    this.cid = _.uniqueId('c');
    this.attributes = {};
    if (options.collection) this.collection = options.collection;
    if (options.parse) attrs = this.parse(attrs, options) || {};
    attrs = _.defaults({}, attrs, _.result(this, 'defaults'));
    this.set(attrs, options);
    this.changed = {};
    this.initialize.apply(this, arguments);
  };

  // Attach all inheritable methods to the Model prototype.
  _.extend(Model.prototype, Events, {

    // A hash of attributes whose current and previous value differ.
    changed: null,

    // The value returned during the last failed validation.
    validationError: null,

    // The default name for the JSON `id` attribute is `"id"`. MongoDB and
    // CouchDB users may want to set this to `"_id"`.
    idAttribute: 'id',

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Return a copy of the model's `attributes` object.
    toJSON: function(options) {
      return _.clone(this.attributes);
    },

    // Proxy `Backbone.sync` by default -- but override this if you need
    // custom syncing semantics for *this* particular model.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Get the value of an attribute.
    get: function(attr) {
      return this.attributes[attr];
    },

    // Get the HTML-escaped value of an attribute.
    escape: function(attr) {
      return _.escape(this.get(attr));
    },

    // Returns `true` if the attribute contains a value that is not null
    // or undefined.
    has: function(attr) {
      return this.get(attr) != null;
    },

    // Set a hash of model attributes on the object, firing `"change"`. This is
    // the core primitive operation of a model, updating the data and notifying
    // anyone who needs to know about the change in state. The heart of the beast.
    set: function(key, val, options) {
      var attr, attrs, unset, changes, silent, changing, prev, current;
      if (key == null) return this;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options || (options = {});

      // Run validation.
      if (!this._validate(attrs, options)) return false;

      // Extract attributes and options.
      unset           = options.unset;
      silent          = options.silent;
      changes         = [];
      changing        = this._changing;
      this._changing  = true;

      if (!changing) {
        this._previousAttributes = _.clone(this.attributes);
        this.changed = {};
      }
      current = this.attributes, prev = this._previousAttributes;

      // Check for changes of `id`.
      if (this.idAttribute in attrs) this.id = attrs[this.idAttribute];

      // For each `set` attribute, update or delete the current value.
      for (attr in attrs) {
        val = attrs[attr];
        if (!_.isEqual(current[attr], val)) changes.push(attr);
        if (!_.isEqual(prev[attr], val)) {
          this.changed[attr] = val;
        } else {
          delete this.changed[attr];
        }
        unset ? delete current[attr] : current[attr] = val;
      }

      // Trigger all relevant attribute changes.
      if (!silent) {
        if (changes.length) this._pending = options;
        for (var i = 0, l = changes.length; i < l; i++) {
          this.trigger('change:' + changes[i], this, current[changes[i]], options);
        }
      }

      // You might be wondering why there's a `while` loop here. Changes can
      // be recursively nested within `"change"` events.
      if (changing) return this;
      if (!silent) {
        while (this._pending) {
          options = this._pending;
          this._pending = false;
          this.trigger('change', this, options);
        }
      }
      this._pending = false;
      this._changing = false;
      return this;
    },

    // Remove an attribute from the model, firing `"change"`. `unset` is a noop
    // if the attribute doesn't exist.
    unset: function(attr, options) {
      return this.set(attr, void 0, _.extend({}, options, {unset: true}));
    },

    // Clear all attributes on the model, firing `"change"`.
    clear: function(options) {
      var attrs = {};
      for (var key in this.attributes) attrs[key] = void 0;
      return this.set(attrs, _.extend({}, options, {unset: true}));
    },

    // Determine if the model has changed since the last `"change"` event.
    // If you specify an attribute name, determine if that attribute has changed.
    hasChanged: function(attr) {
      if (attr == null) return !_.isEmpty(this.changed);
      return _.has(this.changed, attr);
    },

    // Return an object containing all the attributes that have changed, or
    // false if there are no changed attributes. Useful for determining what
    // parts of a view need to be updated and/or what attributes need to be
    // persisted to the server. Unset attributes will be set to undefined.
    // You can also pass an attributes object to diff against the model,
    // determining if there *would be* a change.
    changedAttributes: function(diff) {
      if (!diff) return this.hasChanged() ? _.clone(this.changed) : false;
      var val, changed = false;
      var old = this._changing ? this._previousAttributes : this.attributes;
      for (var attr in diff) {
        if (_.isEqual(old[attr], (val = diff[attr]))) continue;
        (changed || (changed = {}))[attr] = val;
      }
      return changed;
    },

    // Get the previous value of an attribute, recorded at the time the last
    // `"change"` event was fired.
    previous: function(attr) {
      if (attr == null || !this._previousAttributes) return null;
      return this._previousAttributes[attr];
    },

    // Get all of the attributes of the model at the time of the previous
    // `"change"` event.
    previousAttributes: function() {
      return _.clone(this._previousAttributes);
    },

    // Fetch the model from the server. If the server's representation of the
    // model differs from its current attributes, they will be overridden,
    // triggering a `"change"` event.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        if (!model.set(model.parse(resp, options), options)) return false;
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Set a hash of model attributes, and sync the model to the server.
    // If the server returns an attributes hash that differs, the model's
    // state will be `set` again.
    save: function(key, val, options) {
      var attrs, method, xhr, attributes = this.attributes;

      // Handle both `"key", value` and `{key: value}` -style arguments.
      if (key == null || typeof key === 'object') {
        attrs = key;
        options = val;
      } else {
        (attrs = {})[key] = val;
      }

      options = _.extend({validate: true}, options);

      // If we're not waiting and attributes exist, save acts as
      // `set(attr).save(null, opts)` with validation. Otherwise, check if
      // the model will be valid when the attributes, if any, are set.
      if (attrs && !options.wait) {
        if (!this.set(attrs, options)) return false;
      } else {
        if (!this._validate(attrs, options)) return false;
      }

      // Set temporary attributes if `{wait: true}`.
      if (attrs && options.wait) {
        this.attributes = _.extend({}, attributes, attrs);
      }

      // After a successful server-side save, the client is (optionally)
      // updated with the server-side state.
      if (options.parse === void 0) options.parse = true;
      var model = this;
      var success = options.success;
      options.success = function(resp) {
        // Ensure attributes are restored during synchronous saves.
        model.attributes = attributes;
        var serverAttrs = model.parse(resp, options);
        if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
        if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
          return false;
        }
        if (success) success(model, resp, options);
        model.trigger('sync', model, resp, options);
      };
      wrapError(this, options);

      method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
      if (method === 'patch') options.attrs = attrs;
      xhr = this.sync(method, this, options);

      // Restore attributes.
      if (attrs && options.wait) this.attributes = attributes;

      return xhr;
    },

    // Destroy this model on the server if it was already persisted.
    // Optimistically removes the model from its collection, if it has one.
    // If `wait: true` is passed, waits for the server to respond before removal.
    destroy: function(options) {
      options = options ? _.clone(options) : {};
      var model = this;
      var success = options.success;

      var destroy = function() {
        model.trigger('destroy', model, model.collection, options);
      };

      options.success = function(resp) {
        if (options.wait || model.isNew()) destroy();
        if (success) success(model, resp, options);
        if (!model.isNew()) model.trigger('sync', model, resp, options);
      };

      if (this.isNew()) {
        options.success();
        return false;
      }
      wrapError(this, options);

      var xhr = this.sync('delete', this, options);
      if (!options.wait) destroy();
      return xhr;
    },

    // Default URL for the model's representation on the server -- if you're
    // using Backbone's restful methods, override this to change the endpoint
    // that will be called.
    url: function() {
      var base = _.result(this, 'urlRoot') || _.result(this.collection, 'url') || urlError();
      if (this.isNew()) return base;
      return base + (base.charAt(base.length - 1) === '/' ? '' : '/') + encodeURIComponent(this.id);
    },

    // **parse** converts a response into the hash of attributes to be `set` on
    // the model. The default implementation is just to pass the response along.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new model with identical attributes to this one.
    clone: function() {
      return new this.constructor(this.attributes);
    },

    // A model is new if it has never been saved to the server, and lacks an id.
    isNew: function() {
      return !this.has(this.idAttribute);
    },

    // Check if the model is currently in a valid state.
    isValid: function(options) {
      return this._validate({}, _.extend(options || {}, { validate: true }));
    },

    // Run validation against the next complete set of model attributes,
    // returning `true` if all is well. Otherwise, fire an `"invalid"` event.
    _validate: function(attrs, options) {
      if (!options.validate || !this.validate) return true;
      attrs = _.extend({}, this.attributes, attrs);
      var error = this.validationError = this.validate(attrs, options) || null;
      if (!error) return true;
      this.trigger('invalid', this, error, _.extend(options, {validationError: error}));
      return false;
    }

  });

  // Underscore methods that we want to implement on the Model.
  var modelMethods = ['keys', 'values', 'pairs', 'invert', 'pick', 'omit'];

  // Mix in each Underscore method as a proxy to `Model#attributes`.
  _.each(modelMethods, function(method) {
    Model.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.attributes);
      return _[method].apply(_, args);
    };
  });

  // Backbone.Collection
  // -------------------

  // If models tend to represent a single row of data, a Backbone Collection is
  // more analagous to a table full of data ... or a small slice or page of that
  // table, or a collection of rows that belong together for a particular reason
  // -- all of the messages in this particular folder, all of the documents
  // belonging to this particular author, and so on. Collections maintain
  // indexes of their models, both in order, and for lookup by `id`.

  // Create a new **Collection**, perhaps to contain a specific type of `model`.
  // If a `comparator` is specified, the Collection will maintain
  // its models in sort order, as they're added and removed.
  var Collection = Backbone.Collection = function(models, options) {
    options || (options = {});
    if (options.model) this.model = options.model;
    if (options.comparator !== void 0) this.comparator = options.comparator;
    this._reset();
    this.initialize.apply(this, arguments);
    if (models) this.reset(models, _.extend({silent: true}, options));
  };

  // Default options for `Collection#set`.
  var setOptions = {add: true, remove: true, merge: true};
  var addOptions = {add: true, remove: false};

  // Define the Collection's inheritable methods.
  _.extend(Collection.prototype, Events, {

    // The default model for a collection is just a **Backbone.Model**.
    // This should be overridden in most cases.
    model: Model,

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // The JSON representation of a Collection is an array of the
    // models' attributes.
    toJSON: function(options) {
      return this.map(function(model){ return model.toJSON(options); });
    },

    // Proxy `Backbone.sync` by default.
    sync: function() {
      return Backbone.sync.apply(this, arguments);
    },

    // Add a model, or list of models to the set.
    add: function(models, options) {
      return this.set(models, _.extend({merge: false}, options, addOptions));
    },

    // Remove a model, or a list of models from the set.
    remove: function(models, options) {
      var singular = !_.isArray(models);
      models = singular ? [models] : _.clone(models);
      options || (options = {});
      var i, l, index, model;
      for (i = 0, l = models.length; i < l; i++) {
        model = models[i] = this.get(models[i]);
        if (!model) continue;
        index = this.indexOf(model);
        this.models.splice(index, 1);
        this.length--;
        if (!options.silent) {
          options.index = index;
          model.trigger('remove', model, this, options);
        }
        this._removeReference(model, options);
      }
      return singular ? models[0] : models;
    },

    // Update a collection by `set`-ing a new list of models, adding new ones,
    // removing models that are no longer present, and merging models that
    // already exist in the collection, as necessary. Similar to **Model#set**,
    // the core operation for updating the data contained by the collection.
    set: function(models, options) {
      options = _.defaults({}, options, setOptions);
      if (options.parse) models = this.parse(models, options);
      var singular = !_.isArray(models);
      models = singular ? (models ? [models] : []) : _.clone(models);
      var i, l, id, model, attrs, existing, sort;
      var at = options.at;
      var targetModel = this.model;
      var sortable = this.comparator && (at == null) && options.sort !== false;
      var sortAttr = _.isString(this.comparator) ? this.comparator : null;
      var toAdd = [], toRemove = [], modelMap = {};
      var add = options.add, merge = options.merge, remove = options.remove;
      var order = !sortable && add && remove ? [] : false;

      // Turn bare objects into model references, and prevent invalid models
      // from being added.
      for (i = 0, l = models.length; i < l; i++) {
        attrs = models[i] || {};
        if (attrs instanceof Model) {
          id = model = attrs;
        } else {
          id = attrs[targetModel.prototype.idAttribute || 'id'];
        }

        // If a duplicate is found, prevent it from being added and
        // optionally merge it into the existing model.
        if (existing = this.get(id)) {
          if (remove) modelMap[existing.cid] = true;
          if (merge) {
            attrs = attrs === model ? model.attributes : attrs;
            if (options.parse) attrs = existing.parse(attrs, options);
            existing.set(attrs, options);
            if (sortable && !sort && existing.hasChanged(sortAttr)) sort = true;
          }
          models[i] = existing;

        // If this is a new, valid model, push it to the `toAdd` list.
        } else if (add) {
          model = models[i] = this._prepareModel(attrs, options);
          if (!model) continue;
          toAdd.push(model);
          this._addReference(model, options);
        }
        if (order) order.push(existing || model);
      }

      // Remove nonexistent models if appropriate.
      if (remove) {
        for (i = 0, l = this.length; i < l; ++i) {
          if (!modelMap[(model = this.models[i]).cid]) toRemove.push(model);
        }
        if (toRemove.length) this.remove(toRemove, options);
      }

      // See if sorting is needed, update `length` and splice in new models.
      if (toAdd.length || (order && order.length)) {
        if (sortable) sort = true;
        this.length += toAdd.length;
        if (at != null) {
          for (i = 0, l = toAdd.length; i < l; i++) {
            this.models.splice(at + i, 0, toAdd[i]);
          }
        } else {
          if (order) this.models.length = 0;
          var orderedModels = order || toAdd;
          for (i = 0, l = orderedModels.length; i < l; i++) {
            this.models.push(orderedModels[i]);
          }
        }
      }

      // Silently sort the collection if appropriate.
      if (sort) this.sort({silent: true});

      // Unless silenced, it's time to fire all appropriate add/sort events.
      if (!options.silent) {
        for (i = 0, l = toAdd.length; i < l; i++) {
          (model = toAdd[i]).trigger('add', model, this, options);
        }
        if (sort || (order && order.length)) this.trigger('sort', this, options);
      }

      // Return the added (or merged) model (or models).
      return singular ? models[0] : models;
    },

    // When you have more items than you want to add or remove individually,
    // you can reset the entire set with a new list of models, without firing
    // any granular `add` or `remove` events. Fires `reset` when finished.
    // Useful for bulk operations and optimizations.
    reset: function(models, options) {
      options || (options = {});
      for (var i = 0, l = this.models.length; i < l; i++) {
        this._removeReference(this.models[i], options);
      }
      options.previousModels = this.models;
      this._reset();
      models = this.add(models, _.extend({silent: true}, options));
      if (!options.silent) this.trigger('reset', this, options);
      return models;
    },

    // Add a model to the end of the collection.
    push: function(model, options) {
      return this.add(model, _.extend({at: this.length}, options));
    },

    // Remove a model from the end of the collection.
    pop: function(options) {
      var model = this.at(this.length - 1);
      this.remove(model, options);
      return model;
    },

    // Add a model to the beginning of the collection.
    unshift: function(model, options) {
      return this.add(model, _.extend({at: 0}, options));
    },

    // Remove a model from the beginning of the collection.
    shift: function(options) {
      var model = this.at(0);
      this.remove(model, options);
      return model;
    },

    // Slice out a sub-array of models from the collection.
    slice: function() {
      return slice.apply(this.models, arguments);
    },

    // Get a model from the set by id.
    get: function(obj) {
      if (obj == null) return void 0;
      return this._byId[obj] || this._byId[obj.id] || this._byId[obj.cid];
    },

    // Get the model at the given index.
    at: function(index) {
      return this.models[index];
    },

    // Return models with matching attributes. Useful for simple cases of
    // `filter`.
    where: function(attrs, first) {
      if (_.isEmpty(attrs)) return first ? void 0 : [];
      return this[first ? 'find' : 'filter'](function(model) {
        for (var key in attrs) {
          if (attrs[key] !== model.get(key)) return false;
        }
        return true;
      });
    },

    // Return the first model with matching attributes. Useful for simple cases
    // of `find`.
    findWhere: function(attrs) {
      return this.where(attrs, true);
    },

    // Force the collection to re-sort itself. You don't need to call this under
    // normal circumstances, as the set will maintain sort order as each item
    // is added.
    sort: function(options) {
      if (!this.comparator) throw new Error('Cannot sort a set without a comparator');
      options || (options = {});

      // Run sort based on type of `comparator`.
      if (_.isString(this.comparator) || this.comparator.length === 1) {
        this.models = this.sortBy(this.comparator, this);
      } else {
        this.models.sort(_.bind(this.comparator, this));
      }

      if (!options.silent) this.trigger('sort', this, options);
      return this;
    },

    // Pluck an attribute from each model in the collection.
    pluck: function(attr) {
      return _.invoke(this.models, 'get', attr);
    },

    // Fetch the default set of models for this collection, resetting the
    // collection when they arrive. If `reset: true` is passed, the response
    // data will be passed through the `reset` method instead of `set`.
    fetch: function(options) {
      options = options ? _.clone(options) : {};
      if (options.parse === void 0) options.parse = true;
      var success = options.success;
      var collection = this;
      options.success = function(resp) {
        var method = options.reset ? 'reset' : 'set';
        collection[method](resp, options);
        if (success) success(collection, resp, options);
        collection.trigger('sync', collection, resp, options);
      };
      wrapError(this, options);
      return this.sync('read', this, options);
    },

    // Create a new instance of a model in this collection. Add the model to the
    // collection immediately, unless `wait: true` is passed, in which case we
    // wait for the server to agree.
    create: function(model, options) {
      options = options ? _.clone(options) : {};
      if (!(model = this._prepareModel(model, options))) return false;
      if (!options.wait) this.add(model, options);
      var collection = this;
      var success = options.success;
      options.success = function(model, resp) {
        if (options.wait) collection.add(model, options);
        if (success) success(model, resp, options);
      };
      model.save(null, options);
      return model;
    },

    // **parse** converts a response into a list of models to be added to the
    // collection. The default implementation is just to pass it through.
    parse: function(resp, options) {
      return resp;
    },

    // Create a new collection with an identical list of models as this one.
    clone: function() {
      return new this.constructor(this.models);
    },

    // Private method to reset all internal state. Called when the collection
    // is first initialized or reset.
    _reset: function() {
      this.length = 0;
      this.models = [];
      this._byId  = {};
    },

    // Prepare a hash of attributes (or other model) to be added to this
    // collection.
    _prepareModel: function(attrs, options) {
      if (attrs instanceof Model) return attrs;
      options = options ? _.clone(options) : {};
      options.collection = this;
      var model = new this.model(attrs, options);
      if (!model.validationError) return model;
      this.trigger('invalid', this, model.validationError, options);
      return false;
    },

    // Internal method to create a model's ties to a collection.
    _addReference: function(model, options) {
      this._byId[model.cid] = model;
      if (model.id != null) this._byId[model.id] = model;
      if (!model.collection) model.collection = this;
      model.on('all', this._onModelEvent, this);
    },

    // Internal method to sever a model's ties to a collection.
    _removeReference: function(model, options) {
      delete this._byId[model.id];
      delete this._byId[model.cid];
      if (this === model.collection) delete model.collection;
      model.off('all', this._onModelEvent, this);
    },

    // Internal method called every time a model in the set fires an event.
    // Sets need to update their indexes when models change ids. All other
    // events simply proxy through. "add" and "remove" events that originate
    // in other collections are ignored.
    _onModelEvent: function(event, model, collection, options) {
      if ((event === 'add' || event === 'remove') && collection !== this) return;
      if (event === 'destroy') this.remove(model, options);
      if (model && event === 'change:' + model.idAttribute) {
        delete this._byId[model.previous(model.idAttribute)];
        if (model.id != null) this._byId[model.id] = model;
      }
      this.trigger.apply(this, arguments);
    }

  });

  // Underscore methods that we want to implement on the Collection.
  // 90% of the core usefulness of Backbone Collections is actually implemented
  // right here:
  var methods = ['forEach', 'each', 'map', 'collect', 'reduce', 'foldl',
    'inject', 'reduceRight', 'foldr', 'find', 'detect', 'filter', 'select',
    'reject', 'every', 'all', 'some', 'any', 'include', 'contains', 'invoke',
    'max', 'min', 'toArray', 'size', 'first', 'head', 'take', 'initial', 'rest',
    'tail', 'drop', 'last', 'without', 'difference', 'indexOf', 'shuffle',
    'lastIndexOf', 'isEmpty', 'chain', 'sample'];

  // Mix in each Underscore method as a proxy to `Collection#models`.
  _.each(methods, function(method) {
    Collection.prototype[method] = function() {
      var args = slice.call(arguments);
      args.unshift(this.models);
      return _[method].apply(_, args);
    };
  });

  // Underscore methods that take a property name as an argument.
  var attributeMethods = ['groupBy', 'countBy', 'sortBy', 'indexBy'];

  // Use attributes instead of properties.
  _.each(attributeMethods, function(method) {
    Collection.prototype[method] = function(value, context) {
      var iterator = _.isFunction(value) ? value : function(model) {
        return model.get(value);
      };
      return _[method](this.models, iterator, context);
    };
  });

  // Backbone.View
  // -------------

  // Backbone Views are almost more convention than they are actual code. A View
  // is simply a JavaScript object that represents a logical chunk of UI in the
  // DOM. This might be a single item, an entire list, a sidebar or panel, or
  // even the surrounding frame which wraps your whole app. Defining a chunk of
  // UI as a **View** allows you to define your DOM events declaratively, without
  // having to worry about render order ... and makes it easy for the view to
  // react to specific changes in the state of your models.

  // Creating a Backbone.View creates its initial element outside of the DOM,
  // if an existing element is not provided...
  var View = Backbone.View = function(options) {
    this.cid = _.uniqueId('view');
    options || (options = {});
    _.extend(this, _.pick(options, viewOptions));
    this._ensureElement();
    this.initialize.apply(this, arguments);
    this.delegateEvents();
  };

  // Cached regex to split keys for `delegate`.
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  // List of view options to be merged as properties.
  var viewOptions = ['model', 'collection', 'el', 'id', 'attributes', 'className', 'tagName', 'events'];

  // Set up all inheritable **Backbone.View** properties and methods.
  _.extend(View.prototype, Events, {

    // The default `tagName` of a View's element is `"div"`.
    tagName: 'div',

    // jQuery delegate for element lookup, scoped to DOM elements within the
    // current view. This should be preferred to global lookups where possible.
    $: function(selector) {
      return this.$el.find(selector);
    },

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // **render** is the core function that your view should override, in order
    // to populate its element (`this.el`), with the appropriate HTML. The
    // convention is for **render** to always return `this`.
    render: function() {
      return this;
    },

    // Remove this view by taking the element out of the DOM, and removing any
    // applicable Backbone.Events listeners.
    remove: function() {
      this.$el.remove();
      this.stopListening();
      return this;
    },

    // Change the view's element (`this.el` property), including event
    // re-delegation.
    setElement: function(element, delegate) {
      if (this.$el) this.undelegateEvents();
      this.$el = element instanceof Backbone.$ ? element : Backbone.$(element);
      this.el = this.$el[0];
      if (delegate !== false) this.delegateEvents();
      return this;
    },

    // Set callbacks, where `this.events` is a hash of
    //
    // *{"event selector": "callback"}*
    //
    //     {
    //       'mousedown .title':  'edit',
    //       'click .button':     'save',
    //       'click .open':       function(e) { ... }
    //     }
    //
    // pairs. Callbacks will be bound to the view, with `this` set properly.
    // Uses event delegation for efficiency.
    // Omitting the selector binds the event to `this.el`.
    // This only works for delegate-able events: not `focus`, `blur`, and
    // not `change`, `submit`, and `reset` in Internet Explorer.
    delegateEvents: function(events) {
      if (!(events || (events = _.result(this, 'events')))) return this;
      this.undelegateEvents();
      for (var key in events) {
        var method = events[key];
        if (!_.isFunction(method)) method = this[events[key]];
        if (!method) continue;

        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        method = _.bind(method, this);
        eventName += '.delegateEvents' + this.cid;
        if (selector === '') {
          this.$el.on(eventName, method);
        } else {
          this.$el.on(eventName, selector, method);
        }
      }
      return this;
    },

    // Clears all callbacks previously bound to the view with `delegateEvents`.
    // You usually don't need to use this, but may wish to if you have multiple
    // Backbone views attached to the same DOM element.
    undelegateEvents: function() {
      this.$el.off('.delegateEvents' + this.cid);
      return this;
    },

    // Ensure that the View has a DOM element to render into.
    // If `this.el` is a string, pass it through `$()`, take the first
    // matching element, and re-assign it to `el`. Otherwise, create
    // an element from the `id`, `className` and `tagName` properties.
    _ensureElement: function() {
      if (!this.el) {
        var attrs = _.extend({}, _.result(this, 'attributes'));
        if (this.id) attrs.id = _.result(this, 'id');
        if (this.className) attrs['class'] = _.result(this, 'className');
        var $el = Backbone.$('<' + _.result(this, 'tagName') + '>').attr(attrs);
        this.setElement($el, false);
      } else {
        this.setElement(_.result(this, 'el'), false);
      }
    }

  });

  // Backbone.sync
  // -------------

  // Override this function to change the manner in which Backbone persists
  // models to the server. You will be passed the type of request, and the
  // model in question. By default, makes a RESTful Ajax request
  // to the model's `url()`. Some possible customizations could be:
  //
  // * Use `setTimeout` to batch rapid-fire updates into a single request.
  // * Send up the models as XML instead of JSON.
  // * Persist models via WebSockets instead of Ajax.
  //
  // Turn on `Backbone.emulateHTTP` in order to send `PUT` and `DELETE` requests
  // as `POST`, with a `_method` parameter containing the true HTTP method,
  // as well as all requests with the body as `application/x-www-form-urlencoded`
  // instead of `application/json` with the model in a param named `model`.
  // Useful when interfacing with server-side languages like **PHP** that make
  // it difficult to read the body of `PUT` requests.
  Backbone.sync = function(method, model, options) {
    var type = methodMap[method];

    // Default options, unless specified.
    _.defaults(options || (options = {}), {
      emulateHTTP: Backbone.emulateHTTP,
      emulateJSON: Backbone.emulateJSON
    });

    // Default JSON-request options.
    var params = {type: type, dataType: 'json'};

    // Ensure that we have a URL.
    if (!options.url) {
      params.url = _.result(model, 'url') || urlError();
    }

    // Ensure that we have the appropriate request data.
    if (options.data == null && model && (method === 'create' || method === 'update' || method === 'patch')) {
      params.contentType = 'application/json';
      params.data = JSON.stringify(options.attrs || model.toJSON(options));
    }

    // For older servers, emulate JSON by encoding the request into an HTML-form.
    if (options.emulateJSON) {
      params.contentType = 'application/x-www-form-urlencoded';
      params.data = params.data ? {model: params.data} : {};
    }

    // For older servers, emulate HTTP by mimicking the HTTP method with `_method`
    // And an `X-HTTP-Method-Override` header.
    if (options.emulateHTTP && (type === 'PUT' || type === 'DELETE' || type === 'PATCH')) {
      params.type = 'POST';
      if (options.emulateJSON) params.data._method = type;
      var beforeSend = options.beforeSend;
      options.beforeSend = function(xhr) {
        xhr.setRequestHeader('X-HTTP-Method-Override', type);
        if (beforeSend) return beforeSend.apply(this, arguments);
      };
    }

    // Don't process data on a non-GET request.
    if (params.type !== 'GET' && !options.emulateJSON) {
      params.processData = false;
    }

    // If we're sending a `PATCH` request, and we're in an old Internet Explorer
    // that still has ActiveX enabled by default, override jQuery to use that
    // for XHR instead. Remove this line when jQuery supports `PATCH` on IE8.
    if (params.type === 'PATCH' && noXhrPatch) {
      params.xhr = function() {
        return new ActiveXObject("Microsoft.XMLHTTP");
      };
    }

    // Make the request, allowing the user to override any Ajax options.
    var xhr = options.xhr = Backbone.ajax(_.extend(params, options));
    model.trigger('request', model, xhr, options);
    return xhr;
  };

  var noXhrPatch =
    typeof window !== 'undefined' && !!window.ActiveXObject &&
      !(window.XMLHttpRequest && (new XMLHttpRequest).dispatchEvent);

  // Map from CRUD to HTTP for our default `Backbone.sync` implementation.
  var methodMap = {
    'create': 'POST',
    'update': 'PUT',
    'patch':  'PATCH',
    'delete': 'DELETE',
    'read':   'GET'
  };

  // Set the default implementation of `Backbone.ajax` to proxy through to `$`.
  // Override this if you'd like to use a different library.
  Backbone.ajax = function() {
    return Backbone.$.ajax.apply(Backbone.$, arguments);
  };

  // Backbone.Router
  // ---------------

  // Routers map faux-URLs to actions, and fire events when routes are
  // matched. Creating a new one sets its `routes` hash, if not set statically.
  var Router = Backbone.Router = function(options) {
    options || (options = {});
    if (options.routes) this.routes = options.routes;
    this._bindRoutes();
    this.initialize.apply(this, arguments);
  };

  // Cached regular expressions for matching named param parts and splatted
  // parts of route strings.
  var optionalParam = /\((.*?)\)/g;
  var namedParam    = /(\(\?)?:\w+/g;
  var splatParam    = /\*\w+/g;
  var escapeRegExp  = /[\-{}\[\]+?.,\\\^$|#\s]/g;

  // Set up all inheritable **Backbone.Router** properties and methods.
  _.extend(Router.prototype, Events, {

    // Initialize is an empty function by default. Override it with your own
    // initialization logic.
    initialize: function(){},

    // Manually bind a single named route to a callback. For example:
    //
    //     this.route('search/:query/p:num', 'search', function(query, num) {
    //       ...
    //     });
    //
    route: function(route, name, callback) {
      if (!_.isRegExp(route)) route = this._routeToRegExp(route);
      if (_.isFunction(name)) {
        callback = name;
        name = '';
      }
      if (!callback) callback = this[name];
      var router = this;
      Backbone.history.route(route, function(fragment) {
        var args = router._extractParameters(route, fragment);
        callback && callback.apply(router, args);
        router.trigger.apply(router, ['route:' + name].concat(args));
        router.trigger('route', name, args);
        Backbone.history.trigger('route', router, name, args);
      });
      return this;
    },

    // Simple proxy to `Backbone.history` to save a fragment into the history.
    navigate: function(fragment, options) {
      Backbone.history.navigate(fragment, options);
      return this;
    },

    // Bind all defined routes to `Backbone.history`. We have to reverse the
    // order of the routes here to support behavior where the most general
    // routes can be defined at the bottom of the route map.
    _bindRoutes: function() {
      if (!this.routes) return;
      this.routes = _.result(this, 'routes');
      var route, routes = _.keys(this.routes);
      while ((route = routes.pop()) != null) {
        this.route(route, this.routes[route]);
      }
    },

    // Convert a route string into a regular expression, suitable for matching
    // against the current location hash.
    _routeToRegExp: function(route) {
      route = route.replace(escapeRegExp, '\\$&')
                   .replace(optionalParam, '(?:$1)?')
                   .replace(namedParam, function(match, optional) {
                     return optional ? match : '([^\/]+)';
                   })
                   .replace(splatParam, '(.*?)');
      return new RegExp('^' + route + '$');
    },

    // Given a route, and a URL fragment that it matches, return the array of
    // extracted decoded parameters. Empty or unmatched parameters will be
    // treated as `null` to normalize cross-browser behavior.
    _extractParameters: function(route, fragment) {
      var params = route.exec(fragment).slice(1);
      return _.map(params, function(param) {
        return param ? decodeURIComponent(param) : null;
      });
    }

  });

  // Backbone.History
  // ----------------

  // Handles cross-browser history management, based on either
  // [pushState](http://diveintohtml5.info/history.html) and real URLs, or
  // [onhashchange](https://developer.mozilla.org/en-US/docs/DOM/window.onhashchange)
  // and URL fragments. If the browser supports neither (old IE, natch),
  // falls back to polling.
  var History = Backbone.History = function() {
    this.handlers = [];
    _.bindAll(this, 'checkUrl');

    // Ensure that `History` can be used outside of the browser.
    if (typeof window !== 'undefined') {
      this.location = window.location;
      this.history = window.history;
    }
  };

  // Cached regex for stripping a leading hash/slash and trailing space.
  var routeStripper = /^[#\/]|\s+$/g;

  // Cached regex for stripping leading and trailing slashes.
  var rootStripper = /^\/+|\/+$/g;

  // Cached regex for detecting MSIE.
  var isExplorer = /msie [\w.]+/;

  // Cached regex for removing a trailing slash.
  var trailingSlash = /\/$/;

  // Cached regex for stripping urls of hash and query.
  var pathStripper = /[?#].*$/;

  // Has the history handling already been started?
  History.started = false;

  // Set up all inheritable **Backbone.History** properties and methods.
  _.extend(History.prototype, Events, {

    // The default interval to poll for hash changes, if necessary, is
    // twenty times a second.
    interval: 50,

    // Gets the true hash value. Cannot use location.hash directly due to bug
    // in Firefox where location.hash will always be decoded.
    getHash: function(window) {
      var match = (window || this).location.href.match(/#(.*)$/);
      return match ? match[1] : '';
    },

    // Get the cross-browser normalized URL fragment, either from the URL,
    // the hash, or the override.
    getFragment: function(fragment, forcePushState) {
      if (fragment == null) {
        if (this._hasPushState || !this._wantsHashChange || forcePushState) {
          fragment = this.location.pathname;
          var root = this.root.replace(trailingSlash, '');
          if (!fragment.indexOf(root)) fragment = fragment.slice(root.length);
        } else {
          fragment = this.getHash();
        }
      }
      return fragment.replace(routeStripper, '');
    },

    // Start the hash change handling, returning `true` if the current URL matches
    // an existing route, and `false` otherwise.
    start: function(options) {
      if (History.started) throw new Error("Backbone.history has already been started");
      History.started = true;

      // Figure out the initial configuration. Do we need an iframe?
      // Is pushState desired ... is it available?
      this.options          = _.extend({root: '/'}, this.options, options);
      this.root             = this.options.root;
      this._wantsHashChange = this.options.hashChange !== false;
      this._wantsPushState  = !!this.options.pushState;
      this._hasPushState    = !!(this.options.pushState && this.history && this.history.pushState);
      var fragment          = this.getFragment();
      var docMode           = document.documentMode;
      var oldIE             = (isExplorer.exec(navigator.userAgent.toLowerCase()) && (!docMode || docMode <= 7));

      // Normalize root to always include a leading and trailing slash.
      this.root = ('/' + this.root + '/').replace(rootStripper, '/');

      if (oldIE && this._wantsHashChange) {
        var frame = Backbone.$('<iframe src="javascript:0" tabindex="-1">');
        this.iframe = frame.hide().appendTo('body')[0].contentWindow;
        this.navigate(fragment);
      }

      // Depending on whether we're using pushState or hashes, and whether
      // 'onhashchange' is supported, determine how we check the URL state.
      if (this._hasPushState) {
        Backbone.$(window).on('popstate', this.checkUrl);
      } else if (this._wantsHashChange && ('onhashchange' in window) && !oldIE) {
        Backbone.$(window).on('hashchange', this.checkUrl);
      } else if (this._wantsHashChange) {
        this._checkUrlInterval = setInterval(this.checkUrl, this.interval);
      }

      // Determine if we need to change the base url, for a pushState link
      // opened by a non-pushState browser.
      this.fragment = fragment;
      var loc = this.location;
      var atRoot = loc.pathname.replace(/[^\/]$/, '$&/') === this.root;

      // Transition from hashChange to pushState or vice versa if both are
      // requested.
      if (this._wantsHashChange && this._wantsPushState) {

        // If we've started off with a route from a `pushState`-enabled
        // browser, but we're currently in a browser that doesn't support it...
        if (!this._hasPushState && !atRoot) {
          this.fragment = this.getFragment(null, true);
          this.location.replace(this.root + this.location.search + '#' + this.fragment);
          // Return immediately as browser will do redirect to new url
          return true;

        // Or if we've started out with a hash-based route, but we're currently
        // in a browser where it could be `pushState`-based instead...
        } else if (this._hasPushState && atRoot && loc.hash) {
          this.fragment = this.getHash().replace(routeStripper, '');
          this.history.replaceState({}, document.title, this.root + this.fragment + loc.search);
        }

      }

      if (!this.options.silent) return this.loadUrl();
    },

    // Disable Backbone.history, perhaps temporarily. Not useful in a real app,
    // but possibly useful for unit testing Routers.
    stop: function() {
      Backbone.$(window).off('popstate', this.checkUrl).off('hashchange', this.checkUrl);
      clearInterval(this._checkUrlInterval);
      History.started = false;
    },

    // Add a route to be tested when the fragment changes. Routes added later
    // may override previous routes.
    route: function(route, callback) {
      this.handlers.unshift({route: route, callback: callback});
    },

    // Checks the current URL to see if it has changed, and if it has,
    // calls `loadUrl`, normalizing across the hidden iframe.
    checkUrl: function(e) {
      var current = this.getFragment();
      if (current === this.fragment && this.iframe) {
        current = this.getFragment(this.getHash(this.iframe));
      }
      if (current === this.fragment) return false;
      if (this.iframe) this.navigate(current);
      this.loadUrl();
    },

    // Attempt to load the current URL fragment. If a route succeeds with a
    // match, returns `true`. If no defined routes matches the fragment,
    // returns `false`.
    loadUrl: function(fragment) {
      fragment = this.fragment = this.getFragment(fragment);
      return _.any(this.handlers, function(handler) {
        if (handler.route.test(fragment)) {
          handler.callback(fragment);
          return true;
        }
      });
    },

    // Save a fragment into the hash history, or replace the URL state if the
    // 'replace' option is passed. You are responsible for properly URL-encoding
    // the fragment in advance.
    //
    // The options object can contain `trigger: true` if you wish to have the
    // route callback be fired (not usually desirable), or `replace: true`, if
    // you wish to modify the current URL without adding an entry to the history.
    navigate: function(fragment, options) {
      if (!History.started) return false;
      if (!options || options === true) options = {trigger: !!options};

      var url = this.root + (fragment = this.getFragment(fragment || ''));

      // Strip the fragment of the query and hash for matching.
      fragment = fragment.replace(pathStripper, '');

      if (this.fragment === fragment) return;
      this.fragment = fragment;

      // Don't include a trailing slash on the root.
      if (fragment === '' && url !== '/') url = url.slice(0, -1);

      // If pushState is available, we use it to set the fragment as a real URL.
      if (this._hasPushState) {
        this.history[options.replace ? 'replaceState' : 'pushState']({}, document.title, url);

      // If hash changes haven't been explicitly disabled, update the hash
      // fragment to store history.
      } else if (this._wantsHashChange) {
        this._updateHash(this.location, fragment, options.replace);
        if (this.iframe && (fragment !== this.getFragment(this.getHash(this.iframe)))) {
          // Opening and closing the iframe tricks IE7 and earlier to push a
          // history entry on hash-tag change.  When replace is true, we don't
          // want this.
          if(!options.replace) this.iframe.document.open().close();
          this._updateHash(this.iframe.location, fragment, options.replace);
        }

      // If you've told us that you explicitly don't want fallback hashchange-
      // based history, then `navigate` becomes a page refresh.
      } else {
        return this.location.assign(url);
      }
      if (options.trigger) return this.loadUrl(fragment);
    },

    // Update the hash location, either replacing the current entry, or adding
    // a new one to the browser history.
    _updateHash: function(location, fragment, replace) {
      if (replace) {
        var href = location.href.replace(/(javascript:|#).*$/, '');
        location.replace(href + '#' + fragment);
      } else {
        // Some browsers require that `hash` contains a leading #.
        location.hash = '#' + fragment;
      }
    }

  });

  // Create the default Backbone.history.
  Backbone.history = new History;

  // Helpers
  // -------

  // Helper function to correctly set up the prototype chain, for subclasses.
  // Similar to `goog.inherits`, but uses a hash of prototype properties and
  // class properties to be extended.
  var extend = function(protoProps, staticProps) {
    var parent = this;
    var child;

    // The constructor function for the new subclass is either defined by you
    // (the "constructor" property in your `extend` definition), or defaulted
    // by us to simply call the parent's constructor.
    if (protoProps && _.has(protoProps, 'constructor')) {
      child = protoProps.constructor;
    } else {
      child = function(){ return parent.apply(this, arguments); };
    }

    // Add static properties to the constructor function, if supplied.
    _.extend(child, parent, staticProps);

    // Set the prototype chain to inherit from `parent`, without calling
    // `parent`'s constructor function.
    var Surrogate = function(){ this.constructor = child; };
    Surrogate.prototype = parent.prototype;
    child.prototype = new Surrogate;

    // Add prototype properties (instance properties) to the subclass,
    // if supplied.
    if (protoProps) _.extend(child.prototype, protoProps);

    // Set a convenience property in case the parent's prototype is needed
    // later.
    child.__super__ = parent.prototype;

    return child;
  };

  // Set up inheritance for the model, collection, router, view and history.
  Model.extend = Collection.extend = Router.extend = View.extend = History.extend = extend;

  // Throw an error when a URL is needed, and none is supplied.
  var urlError = function() {
    throw new Error('A "url" property or function must be specified');
  };

  // Wrap an optional error callback with a fallback error event.
  var wrapError = function(model, options) {
    var error = options.error;
    options.error = function(resp) {
      if (error) error(model, resp, options);
      model.trigger('error', model, resp, options);
    };
  };

  return Backbone;

}));

// bower_components/backbone-relations/backbone-relations.js
(function () {
  'use strict';

  var node = typeof window === 'undefined';

  var _ = node ? require('underscore') : window._;
  var Backbone = node ? require('backbone') : window.Backbone;
  var herit = node ? require('herit') : window.herit;

  var proto = Backbone.Model.prototype;
  var constructor = proto.constructor;
  var get = proto.get;
  var set = proto.set;

  var Relation = function (owner, key, options) {
    _.extend(this, options);
    this.owner = owner;
    this.key = key;
    if (this.via) {
      var split = this.via.split('#');
      this.via = split[0];
      this.viaKey = split[1] || key;
    }
  };

  _.extend(Relation.prototype, {
    get: function () { return this.instance(); },

    set: function (val, options) {
      options = _.extend({}, options, {add: true, merge: true, remove: true});
      this.instance().set(val || (this.hasOne ? {} : []), options);
    },

    resolve: function () {
      if (!this.via) return this.get();
      var via = this.owner.relations[this.via];
      var method = via.hasOne ? 'get' : 'pluck';
      var resolved = this.owner.resolve(this.via)[method](this.viaKey);
      if (this.hasOne) return resolved;
      return new this.hasMany(
        resolved[0] instanceof this.hasMany ?
        _.flatten(_.pluck(resolved, 'models')) :
        resolved
      );
    }
  });

  var HasOneRelation = herit(Relation, {
    instance: function () {
      if (this._instance) return this._instance;
      var Model = this.hasOne;
      var Collection = Backbone.Collection.extend({model: Model});
      var owner = this.owner;
      var fk = this.fk;
      var reverse = this.reverse;
      var instance = this._instance = new Collection({id: owner.get(fk)});
      var idAttr = Model.prototype.idAttribute;
      instance.on('add change:' + idAttr, function (model, __, options) {
        owner.set(fk, model.id, options);
      });
      owner.on('change:' + fk, function (__, val, options) {
        if (instance.first().id !== val) {
          instance.set(new Model({id: val}), options);
        }
      });
      if (reverse) {
        instance.on({
          add: function (model, __, options) {
            model.get(reverse).add(owner, options);
          },
          remove: function (model, __, options) {
            model.get(reverse).remove(owner, options);
          }
        });
      }
      return instance;
    },

    get: function () { return this.instance().first(); }
  });

  var HasManyRelation = herit(Relation, {
    instance: function () {
      if (this._instance) return this._instance;
      var instance = this._instance = new this.hasMany();
      var owner = instance.owner = this.owner;
      instance.fk = this.fk;
      instance.urlRoot = this.urlRoot || '/' + this.key;
      instance.url = function () {
        return _.result(owner, 'url') + this.urlRoot;
      };
      var reverse = this.reverse;
      if (this.via) {
        instance.via = owner.get(this.via);
      } else if (reverse) {
        instance.on('add', function (model, __, options) {
          model.set(reverse, owner, options);
        });
      }
      return instance;
    }
  });

  Backbone.Model = Backbone.Model.extend({
    constructor: function () {
      var relations = _.result(this, 'relations');
      if (relations) {
        this.relations = _.reduce(relations, function (obj, options, key) {
          var ctor = options.hasOne ? HasOneRelation : HasManyRelation;
          obj[key] = new ctor(this, key, options);
          return obj;
        }, {}, this);
      }
      return constructor.apply(this, arguments);
    },

    get: function (key) {
      if (!this.relations) return get.apply(this, arguments);
      var rel = this.relations[key];
      return rel ? rel.get(key) : get.call(this, key);
    },

    set: function (key, val, options) {
      if (key == null) return this;
      var attrs;
      if (typeof key === 'object') {
        attrs = _.clone(key);
        options = val;
      } else {
        (attrs = {})[key] = val;
      }
      if (!this.relations) return set.call(this, key, val, options);
      for (key in attrs) {
        var rel = this.relations[key];
        if (rel) {
          val = attrs[key];
          delete attrs[key];
          rel.set(val, options);
        }
      }
      return set.call(this, attrs, options);
    },

    resolve: function (key) {
      var relations = this.relations;
      if (!relations || !relations[key]) return;
      return relations[key].resolve(key);
    }
  });

  _.extend(Backbone.Collection.prototype, {model: Backbone.Model});
})();

// bower_components/select2/select2.js
/*
Copyright 2012 Igor Vaynberg

Version: 3.4.5 Timestamp: Mon Nov  4 08:22:42 PST 2013

This software is licensed under the Apache License, Version 2.0 (the "Apache License") or the GNU
General Public License version 2 (the "GPL License"). You may choose either license to govern your
use of this software only upon the condition that you accept all of the terms of either the Apache
License or the GPL License.

You may obtain a copy of the Apache License and the GPL License at:

    http://www.apache.org/licenses/LICENSE-2.0
    http://www.gnu.org/licenses/gpl-2.0.html

Unless required by applicable law or agreed to in writing, software distributed under the
Apache License or the GPL Licesnse is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
CONDITIONS OF ANY KIND, either express or implied. See the Apache License and the GPL License for
the specific language governing permissions and limitations under the Apache License and the GPL License.
*/
(function ($) {
    if(typeof $.fn.each2 == "undefined") {
        $.extend($.fn, {
            /*
            * 4-10 times faster .each replacement
            * use it carefully, as it overrides jQuery context of element on each iteration
            */
            each2 : function (c) {
                var j = $([0]), i = -1, l = this.length;
                while (
                    ++i < l
                    && (j.context = j[0] = this[i])
                    && c.call(j[0], i, j) !== false //"this"=DOM, i=index, j=jQuery object
                );
                return this;
            }
        });
    }
})(jQuery);

(function ($, undefined) {
    "use strict";
    /*global document, window, jQuery, console */

    if (window.Select2 !== undefined) {
        return;
    }

    var KEY, AbstractSelect2, SingleSelect2, MultiSelect2, nextUid, sizer,
        lastMousePosition={x:0,y:0}, $document, scrollBarDimensions,

    KEY = {
        TAB: 9,
        ENTER: 13,
        ESC: 27,
        SPACE: 32,
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        HOME: 36,
        END: 35,
        BACKSPACE: 8,
        DELETE: 46,
        isArrow: function (k) {
            k = k.which ? k.which : k;
            switch (k) {
            case KEY.LEFT:
            case KEY.RIGHT:
            case KEY.UP:
            case KEY.DOWN:
                return true;
            }
            return false;
        },
        isControl: function (e) {
            var k = e.which;
            switch (k) {
            case KEY.SHIFT:
            case KEY.CTRL:
            case KEY.ALT:
                return true;
            }

            if (e.metaKey) return true;

            return false;
        },
        isFunctionKey: function (k) {
            k = k.which ? k.which : k;
            return k >= 112 && k <= 123;
        }
    },
    MEASURE_SCROLLBAR_TEMPLATE = "<div class='select2-measure-scrollbar'></div>",

    DIACRITICS = {"\u24B6":"A","\uFF21":"A","\u00C0":"A","\u00C1":"A","\u00C2":"A","\u1EA6":"A","\u1EA4":"A","\u1EAA":"A","\u1EA8":"A","\u00C3":"A","\u0100":"A","\u0102":"A","\u1EB0":"A","\u1EAE":"A","\u1EB4":"A","\u1EB2":"A","\u0226":"A","\u01E0":"A","\u00C4":"A","\u01DE":"A","\u1EA2":"A","\u00C5":"A","\u01FA":"A","\u01CD":"A","\u0200":"A","\u0202":"A","\u1EA0":"A","\u1EAC":"A","\u1EB6":"A","\u1E00":"A","\u0104":"A","\u023A":"A","\u2C6F":"A","\uA732":"AA","\u00C6":"AE","\u01FC":"AE","\u01E2":"AE","\uA734":"AO","\uA736":"AU","\uA738":"AV","\uA73A":"AV","\uA73C":"AY","\u24B7":"B","\uFF22":"B","\u1E02":"B","\u1E04":"B","\u1E06":"B","\u0243":"B","\u0182":"B","\u0181":"B","\u24B8":"C","\uFF23":"C","\u0106":"C","\u0108":"C","\u010A":"C","\u010C":"C","\u00C7":"C","\u1E08":"C","\u0187":"C","\u023B":"C","\uA73E":"C","\u24B9":"D","\uFF24":"D","\u1E0A":"D","\u010E":"D","\u1E0C":"D","\u1E10":"D","\u1E12":"D","\u1E0E":"D","\u0110":"D","\u018B":"D","\u018A":"D","\u0189":"D","\uA779":"D","\u01F1":"DZ","\u01C4":"DZ","\u01F2":"Dz","\u01C5":"Dz","\u24BA":"E","\uFF25":"E","\u00C8":"E","\u00C9":"E","\u00CA":"E","\u1EC0":"E","\u1EBE":"E","\u1EC4":"E","\u1EC2":"E","\u1EBC":"E","\u0112":"E","\u1E14":"E","\u1E16":"E","\u0114":"E","\u0116":"E","\u00CB":"E","\u1EBA":"E","\u011A":"E","\u0204":"E","\u0206":"E","\u1EB8":"E","\u1EC6":"E","\u0228":"E","\u1E1C":"E","\u0118":"E","\u1E18":"E","\u1E1A":"E","\u0190":"E","\u018E":"E","\u24BB":"F","\uFF26":"F","\u1E1E":"F","\u0191":"F","\uA77B":"F","\u24BC":"G","\uFF27":"G","\u01F4":"G","\u011C":"G","\u1E20":"G","\u011E":"G","\u0120":"G","\u01E6":"G","\u0122":"G","\u01E4":"G","\u0193":"G","\uA7A0":"G","\uA77D":"G","\uA77E":"G","\u24BD":"H","\uFF28":"H","\u0124":"H","\u1E22":"H","\u1E26":"H","\u021E":"H","\u1E24":"H","\u1E28":"H","\u1E2A":"H","\u0126":"H","\u2C67":"H","\u2C75":"H","\uA78D":"H","\u24BE":"I","\uFF29":"I","\u00CC":"I","\u00CD":"I","\u00CE":"I","\u0128":"I","\u012A":"I","\u012C":"I","\u0130":"I","\u00CF":"I","\u1E2E":"I","\u1EC8":"I","\u01CF":"I","\u0208":"I","\u020A":"I","\u1ECA":"I","\u012E":"I","\u1E2C":"I","\u0197":"I","\u24BF":"J","\uFF2A":"J","\u0134":"J","\u0248":"J","\u24C0":"K","\uFF2B":"K","\u1E30":"K","\u01E8":"K","\u1E32":"K","\u0136":"K","\u1E34":"K","\u0198":"K","\u2C69":"K","\uA740":"K","\uA742":"K","\uA744":"K","\uA7A2":"K","\u24C1":"L","\uFF2C":"L","\u013F":"L","\u0139":"L","\u013D":"L","\u1E36":"L","\u1E38":"L","\u013B":"L","\u1E3C":"L","\u1E3A":"L","\u0141":"L","\u023D":"L","\u2C62":"L","\u2C60":"L","\uA748":"L","\uA746":"L","\uA780":"L","\u01C7":"LJ","\u01C8":"Lj","\u24C2":"M","\uFF2D":"M","\u1E3E":"M","\u1E40":"M","\u1E42":"M","\u2C6E":"M","\u019C":"M","\u24C3":"N","\uFF2E":"N","\u01F8":"N","\u0143":"N","\u00D1":"N","\u1E44":"N","\u0147":"N","\u1E46":"N","\u0145":"N","\u1E4A":"N","\u1E48":"N","\u0220":"N","\u019D":"N","\uA790":"N","\uA7A4":"N","\u01CA":"NJ","\u01CB":"Nj","\u24C4":"O","\uFF2F":"O","\u00D2":"O","\u00D3":"O","\u00D4":"O","\u1ED2":"O","\u1ED0":"O","\u1ED6":"O","\u1ED4":"O","\u00D5":"O","\u1E4C":"O","\u022C":"O","\u1E4E":"O","\u014C":"O","\u1E50":"O","\u1E52":"O","\u014E":"O","\u022E":"O","\u0230":"O","\u00D6":"O","\u022A":"O","\u1ECE":"O","\u0150":"O","\u01D1":"O","\u020C":"O","\u020E":"O","\u01A0":"O","\u1EDC":"O","\u1EDA":"O","\u1EE0":"O","\u1EDE":"O","\u1EE2":"O","\u1ECC":"O","\u1ED8":"O","\u01EA":"O","\u01EC":"O","\u00D8":"O","\u01FE":"O","\u0186":"O","\u019F":"O","\uA74A":"O","\uA74C":"O","\u01A2":"OI","\uA74E":"OO","\u0222":"OU","\u24C5":"P","\uFF30":"P","\u1E54":"P","\u1E56":"P","\u01A4":"P","\u2C63":"P","\uA750":"P","\uA752":"P","\uA754":"P","\u24C6":"Q","\uFF31":"Q","\uA756":"Q","\uA758":"Q","\u024A":"Q","\u24C7":"R","\uFF32":"R","\u0154":"R","\u1E58":"R","\u0158":"R","\u0210":"R","\u0212":"R","\u1E5A":"R","\u1E5C":"R","\u0156":"R","\u1E5E":"R","\u024C":"R","\u2C64":"R","\uA75A":"R","\uA7A6":"R","\uA782":"R","\u24C8":"S","\uFF33":"S","\u1E9E":"S","\u015A":"S","\u1E64":"S","\u015C":"S","\u1E60":"S","\u0160":"S","\u1E66":"S","\u1E62":"S","\u1E68":"S","\u0218":"S","\u015E":"S","\u2C7E":"S","\uA7A8":"S","\uA784":"S","\u24C9":"T","\uFF34":"T","\u1E6A":"T","\u0164":"T","\u1E6C":"T","\u021A":"T","\u0162":"T","\u1E70":"T","\u1E6E":"T","\u0166":"T","\u01AC":"T","\u01AE":"T","\u023E":"T","\uA786":"T","\uA728":"TZ","\u24CA":"U","\uFF35":"U","\u00D9":"U","\u00DA":"U","\u00DB":"U","\u0168":"U","\u1E78":"U","\u016A":"U","\u1E7A":"U","\u016C":"U","\u00DC":"U","\u01DB":"U","\u01D7":"U","\u01D5":"U","\u01D9":"U","\u1EE6":"U","\u016E":"U","\u0170":"U","\u01D3":"U","\u0214":"U","\u0216":"U","\u01AF":"U","\u1EEA":"U","\u1EE8":"U","\u1EEE":"U","\u1EEC":"U","\u1EF0":"U","\u1EE4":"U","\u1E72":"U","\u0172":"U","\u1E76":"U","\u1E74":"U","\u0244":"U","\u24CB":"V","\uFF36":"V","\u1E7C":"V","\u1E7E":"V","\u01B2":"V","\uA75E":"V","\u0245":"V","\uA760":"VY","\u24CC":"W","\uFF37":"W","\u1E80":"W","\u1E82":"W","\u0174":"W","\u1E86":"W","\u1E84":"W","\u1E88":"W","\u2C72":"W","\u24CD":"X","\uFF38":"X","\u1E8A":"X","\u1E8C":"X","\u24CE":"Y","\uFF39":"Y","\u1EF2":"Y","\u00DD":"Y","\u0176":"Y","\u1EF8":"Y","\u0232":"Y","\u1E8E":"Y","\u0178":"Y","\u1EF6":"Y","\u1EF4":"Y","\u01B3":"Y","\u024E":"Y","\u1EFE":"Y","\u24CF":"Z","\uFF3A":"Z","\u0179":"Z","\u1E90":"Z","\u017B":"Z","\u017D":"Z","\u1E92":"Z","\u1E94":"Z","\u01B5":"Z","\u0224":"Z","\u2C7F":"Z","\u2C6B":"Z","\uA762":"Z","\u24D0":"a","\uFF41":"a","\u1E9A":"a","\u00E0":"a","\u00E1":"a","\u00E2":"a","\u1EA7":"a","\u1EA5":"a","\u1EAB":"a","\u1EA9":"a","\u00E3":"a","\u0101":"a","\u0103":"a","\u1EB1":"a","\u1EAF":"a","\u1EB5":"a","\u1EB3":"a","\u0227":"a","\u01E1":"a","\u00E4":"a","\u01DF":"a","\u1EA3":"a","\u00E5":"a","\u01FB":"a","\u01CE":"a","\u0201":"a","\u0203":"a","\u1EA1":"a","\u1EAD":"a","\u1EB7":"a","\u1E01":"a","\u0105":"a","\u2C65":"a","\u0250":"a","\uA733":"aa","\u00E6":"ae","\u01FD":"ae","\u01E3":"ae","\uA735":"ao","\uA737":"au","\uA739":"av","\uA73B":"av","\uA73D":"ay","\u24D1":"b","\uFF42":"b","\u1E03":"b","\u1E05":"b","\u1E07":"b","\u0180":"b","\u0183":"b","\u0253":"b","\u24D2":"c","\uFF43":"c","\u0107":"c","\u0109":"c","\u010B":"c","\u010D":"c","\u00E7":"c","\u1E09":"c","\u0188":"c","\u023C":"c","\uA73F":"c","\u2184":"c","\u24D3":"d","\uFF44":"d","\u1E0B":"d","\u010F":"d","\u1E0D":"d","\u1E11":"d","\u1E13":"d","\u1E0F":"d","\u0111":"d","\u018C":"d","\u0256":"d","\u0257":"d","\uA77A":"d","\u01F3":"dz","\u01C6":"dz","\u24D4":"e","\uFF45":"e","\u00E8":"e","\u00E9":"e","\u00EA":"e","\u1EC1":"e","\u1EBF":"e","\u1EC5":"e","\u1EC3":"e","\u1EBD":"e","\u0113":"e","\u1E15":"e","\u1E17":"e","\u0115":"e","\u0117":"e","\u00EB":"e","\u1EBB":"e","\u011B":"e","\u0205":"e","\u0207":"e","\u1EB9":"e","\u1EC7":"e","\u0229":"e","\u1E1D":"e","\u0119":"e","\u1E19":"e","\u1E1B":"e","\u0247":"e","\u025B":"e","\u01DD":"e","\u24D5":"f","\uFF46":"f","\u1E1F":"f","\u0192":"f","\uA77C":"f","\u24D6":"g","\uFF47":"g","\u01F5":"g","\u011D":"g","\u1E21":"g","\u011F":"g","\u0121":"g","\u01E7":"g","\u0123":"g","\u01E5":"g","\u0260":"g","\uA7A1":"g","\u1D79":"g","\uA77F":"g","\u24D7":"h","\uFF48":"h","\u0125":"h","\u1E23":"h","\u1E27":"h","\u021F":"h","\u1E25":"h","\u1E29":"h","\u1E2B":"h","\u1E96":"h","\u0127":"h","\u2C68":"h","\u2C76":"h","\u0265":"h","\u0195":"hv","\u24D8":"i","\uFF49":"i","\u00EC":"i","\u00ED":"i","\u00EE":"i","\u0129":"i","\u012B":"i","\u012D":"i","\u00EF":"i","\u1E2F":"i","\u1EC9":"i","\u01D0":"i","\u0209":"i","\u020B":"i","\u1ECB":"i","\u012F":"i","\u1E2D":"i","\u0268":"i","\u0131":"i","\u24D9":"j","\uFF4A":"j","\u0135":"j","\u01F0":"j","\u0249":"j","\u24DA":"k","\uFF4B":"k","\u1E31":"k","\u01E9":"k","\u1E33":"k","\u0137":"k","\u1E35":"k","\u0199":"k","\u2C6A":"k","\uA741":"k","\uA743":"k","\uA745":"k","\uA7A3":"k","\u24DB":"l","\uFF4C":"l","\u0140":"l","\u013A":"l","\u013E":"l","\u1E37":"l","\u1E39":"l","\u013C":"l","\u1E3D":"l","\u1E3B":"l","\u017F":"l","\u0142":"l","\u019A":"l","\u026B":"l","\u2C61":"l","\uA749":"l","\uA781":"l","\uA747":"l","\u01C9":"lj","\u24DC":"m","\uFF4D":"m","\u1E3F":"m","\u1E41":"m","\u1E43":"m","\u0271":"m","\u026F":"m","\u24DD":"n","\uFF4E":"n","\u01F9":"n","\u0144":"n","\u00F1":"n","\u1E45":"n","\u0148":"n","\u1E47":"n","\u0146":"n","\u1E4B":"n","\u1E49":"n","\u019E":"n","\u0272":"n","\u0149":"n","\uA791":"n","\uA7A5":"n","\u01CC":"nj","\u24DE":"o","\uFF4F":"o","\u00F2":"o","\u00F3":"o","\u00F4":"o","\u1ED3":"o","\u1ED1":"o","\u1ED7":"o","\u1ED5":"o","\u00F5":"o","\u1E4D":"o","\u022D":"o","\u1E4F":"o","\u014D":"o","\u1E51":"o","\u1E53":"o","\u014F":"o","\u022F":"o","\u0231":"o","\u00F6":"o","\u022B":"o","\u1ECF":"o","\u0151":"o","\u01D2":"o","\u020D":"o","\u020F":"o","\u01A1":"o","\u1EDD":"o","\u1EDB":"o","\u1EE1":"o","\u1EDF":"o","\u1EE3":"o","\u1ECD":"o","\u1ED9":"o","\u01EB":"o","\u01ED":"o","\u00F8":"o","\u01FF":"o","\u0254":"o","\uA74B":"o","\uA74D":"o","\u0275":"o","\u01A3":"oi","\u0223":"ou","\uA74F":"oo","\u24DF":"p","\uFF50":"p","\u1E55":"p","\u1E57":"p","\u01A5":"p","\u1D7D":"p","\uA751":"p","\uA753":"p","\uA755":"p","\u24E0":"q","\uFF51":"q","\u024B":"q","\uA757":"q","\uA759":"q","\u24E1":"r","\uFF52":"r","\u0155":"r","\u1E59":"r","\u0159":"r","\u0211":"r","\u0213":"r","\u1E5B":"r","\u1E5D":"r","\u0157":"r","\u1E5F":"r","\u024D":"r","\u027D":"r","\uA75B":"r","\uA7A7":"r","\uA783":"r","\u24E2":"s","\uFF53":"s","\u00DF":"s","\u015B":"s","\u1E65":"s","\u015D":"s","\u1E61":"s","\u0161":"s","\u1E67":"s","\u1E63":"s","\u1E69":"s","\u0219":"s","\u015F":"s","\u023F":"s","\uA7A9":"s","\uA785":"s","\u1E9B":"s","\u24E3":"t","\uFF54":"t","\u1E6B":"t","\u1E97":"t","\u0165":"t","\u1E6D":"t","\u021B":"t","\u0163":"t","\u1E71":"t","\u1E6F":"t","\u0167":"t","\u01AD":"t","\u0288":"t","\u2C66":"t","\uA787":"t","\uA729":"tz","\u24E4":"u","\uFF55":"u","\u00F9":"u","\u00FA":"u","\u00FB":"u","\u0169":"u","\u1E79":"u","\u016B":"u","\u1E7B":"u","\u016D":"u","\u00FC":"u","\u01DC":"u","\u01D8":"u","\u01D6":"u","\u01DA":"u","\u1EE7":"u","\u016F":"u","\u0171":"u","\u01D4":"u","\u0215":"u","\u0217":"u","\u01B0":"u","\u1EEB":"u","\u1EE9":"u","\u1EEF":"u","\u1EED":"u","\u1EF1":"u","\u1EE5":"u","\u1E73":"u","\u0173":"u","\u1E77":"u","\u1E75":"u","\u0289":"u","\u24E5":"v","\uFF56":"v","\u1E7D":"v","\u1E7F":"v","\u028B":"v","\uA75F":"v","\u028C":"v","\uA761":"vy","\u24E6":"w","\uFF57":"w","\u1E81":"w","\u1E83":"w","\u0175":"w","\u1E87":"w","\u1E85":"w","\u1E98":"w","\u1E89":"w","\u2C73":"w","\u24E7":"x","\uFF58":"x","\u1E8B":"x","\u1E8D":"x","\u24E8":"y","\uFF59":"y","\u1EF3":"y","\u00FD":"y","\u0177":"y","\u1EF9":"y","\u0233":"y","\u1E8F":"y","\u00FF":"y","\u1EF7":"y","\u1E99":"y","\u1EF5":"y","\u01B4":"y","\u024F":"y","\u1EFF":"y","\u24E9":"z","\uFF5A":"z","\u017A":"z","\u1E91":"z","\u017C":"z","\u017E":"z","\u1E93":"z","\u1E95":"z","\u01B6":"z","\u0225":"z","\u0240":"z","\u2C6C":"z","\uA763":"z"};

    $document = $(document);

    nextUid=(function() { var counter=1; return function() { return counter++; }; }());


    function stripDiacritics(str) {
        var ret, i, l, c;

        if (!str || str.length < 1) return str;

        ret = "";
        for (i = 0, l = str.length; i < l; i++) {
            c = str.charAt(i);
            ret += DIACRITICS[c] || c;
        }
        return ret;
    }

    function indexOf(value, array) {
        var i = 0, l = array.length;
        for (; i < l; i = i + 1) {
            if (equal(value, array[i])) return i;
        }
        return -1;
    }

    function measureScrollbar () {
        var $template = $( MEASURE_SCROLLBAR_TEMPLATE );
        $template.appendTo('body');

        var dim = {
            width: $template.width() - $template[0].clientWidth,
            height: $template.height() - $template[0].clientHeight
        };
        $template.remove();

        return dim;
    }

    /**
     * Compares equality of a and b
     * @param a
     * @param b
     */
    function equal(a, b) {
        if (a === b) return true;
        if (a === undefined || b === undefined) return false;
        if (a === null || b === null) return false;
        // Check whether 'a' or 'b' is a string (primitive or object).
        // The concatenation of an empty string (+'') converts its argument to a string's primitive.
        if (a.constructor === String) return a+'' === b+''; // a+'' - in case 'a' is a String object
        if (b.constructor === String) return b+'' === a+''; // b+'' - in case 'b' is a String object
        return false;
    }

    /**
     * Splits the string into an array of values, trimming each value. An empty array is returned for nulls or empty
     * strings
     * @param string
     * @param separator
     */
    function splitVal(string, separator) {
        var val, i, l;
        if (string === null || string.length < 1) return [];
        val = string.split(separator);
        for (i = 0, l = val.length; i < l; i = i + 1) val[i] = $.trim(val[i]);
        return val;
    }

    function getSideBorderPadding(element) {
        return element.outerWidth(false) - element.width();
    }

    function installKeyUpChangeEvent(element) {
        var key="keyup-change-value";
        element.on("keydown", function () {
            if ($.data(element, key) === undefined) {
                $.data(element, key, element.val());
            }
        });
        element.on("keyup", function () {
            var val= $.data(element, key);
            if (val !== undefined && element.val() !== val) {
                $.removeData(element, key);
                element.trigger("keyup-change");
            }
        });
    }

    $document.on("mousemove", function (e) {
        lastMousePosition.x = e.pageX;
        lastMousePosition.y = e.pageY;
    });

    /**
     * filters mouse events so an event is fired only if the mouse moved.
     *
     * filters out mouse events that occur when mouse is stationary but
     * the elements under the pointer are scrolled.
     */
    function installFilteredMouseMove(element) {
        element.on("mousemove", function (e) {
            var lastpos = lastMousePosition;
            if (lastpos === undefined || lastpos.x !== e.pageX || lastpos.y !== e.pageY) {
                $(e.target).trigger("mousemove-filtered", e);
            }
        });
    }

    /**
     * Debounces a function. Returns a function that calls the original fn function only if no invocations have been made
     * within the last quietMillis milliseconds.
     *
     * @param quietMillis number of milliseconds to wait before invoking fn
     * @param fn function to be debounced
     * @param ctx object to be used as this reference within fn
     * @return debounced version of fn
     */
    function debounce(quietMillis, fn, ctx) {
        ctx = ctx || undefined;
        var timeout;
        return function () {
            var args = arguments;
            window.clearTimeout(timeout);
            timeout = window.setTimeout(function() {
                fn.apply(ctx, args);
            }, quietMillis);
        };
    }

    /**
     * A simple implementation of a thunk
     * @param formula function used to lazily initialize the thunk
     * @return {Function}
     */
    function thunk(formula) {
        var evaluated = false,
            value;
        return function() {
            if (evaluated === false) { value = formula(); evaluated = true; }
            return value;
        };
    };

    function installDebouncedScroll(threshold, element) {
        var notify = debounce(threshold, function (e) { element.trigger("scroll-debounced", e);});
        element.on("scroll", function (e) {
            if (indexOf(e.target, element.get()) >= 0) notify(e);
        });
    }

    function focus($el) {
        if ($el[0] === document.activeElement) return;

        /* set the focus in a 0 timeout - that way the focus is set after the processing
            of the current event has finished - which seems like the only reliable way
            to set focus */
        window.setTimeout(function() {
            var el=$el[0], pos=$el.val().length, range;

            $el.focus();

            /* make sure el received focus so we do not error out when trying to manipulate the caret.
                sometimes modals or others listeners may steal it after its set */
            if ($el.is(":visible") && el === document.activeElement) {

                /* after the focus is set move the caret to the end, necessary when we val()
                    just before setting focus */
                if(el.setSelectionRange)
                {
                    el.setSelectionRange(pos, pos);
                }
                else if (el.createTextRange) {
                    range = el.createTextRange();
                    range.collapse(false);
                    range.select();
                }
            }
        }, 0);
    }

    function getCursorInfo(el) {
        el = $(el)[0];
        var offset = 0;
        var length = 0;
        if ('selectionStart' in el) {
            offset = el.selectionStart;
            length = el.selectionEnd - offset;
        } else if ('selection' in document) {
            el.focus();
            var sel = document.selection.createRange();
            length = document.selection.createRange().text.length;
            sel.moveStart('character', -el.value.length);
            offset = sel.text.length - length;
        }
        return { offset: offset, length: length };
    }

    function killEvent(event) {
        event.preventDefault();
        event.stopPropagation();
    }
    function killEventImmediately(event) {
        event.preventDefault();
        event.stopImmediatePropagation();
    }

    function measureTextWidth(e) {
        if (!sizer){
            var style = e[0].currentStyle || window.getComputedStyle(e[0], null);
            sizer = $(document.createElement("div")).css({
                position: "absolute",
                left: "-10000px",
                top: "-10000px",
                display: "none",
                fontSize: style.fontSize,
                fontFamily: style.fontFamily,
                fontStyle: style.fontStyle,
                fontWeight: style.fontWeight,
                letterSpacing: style.letterSpacing,
                textTransform: style.textTransform,
                whiteSpace: "nowrap"
            });
            sizer.attr("class","select2-sizer");
            $("body").append(sizer);
        }
        sizer.text(e.val());
        return sizer.width();
    }

    function syncCssClasses(dest, src, adapter) {
        var classes, replacements = [], adapted;

        classes = dest.attr("class");
        if (classes) {
            classes = '' + classes; // for IE which returns object
            $(classes.split(" ")).each2(function() {
                if (this.indexOf("select2-") === 0) {
                    replacements.push(this);
                }
            });
        }
        classes = src.attr("class");
        if (classes) {
            classes = '' + classes; // for IE which returns object
            $(classes.split(" ")).each2(function() {
                if (this.indexOf("select2-") !== 0) {
                    adapted = adapter(this);
                    if (adapted) {
                        replacements.push(adapted);
                    }
                }
            });
        }
        dest.attr("class", replacements.join(" "));
    }


    function markMatch(text, term, markup, escapeMarkup) {
        var match=stripDiacritics(text.toUpperCase()).indexOf(stripDiacritics(term.toUpperCase())),
            tl=term.length;

        if (match<0) {
            markup.push(escapeMarkup(text));
            return;
        }

        markup.push(escapeMarkup(text.substring(0, match)));
        markup.push("<span class='select2-match'>");
        markup.push(escapeMarkup(text.substring(match, match + tl)));
        markup.push("</span>");
        markup.push(escapeMarkup(text.substring(match + tl, text.length)));
    }

    function defaultEscapeMarkup(markup) {
        var replace_map = {
            '\\': '&#92;',
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;',
            "/": '&#47;'
        };

        return String(markup).replace(/[&<>"'\/\\]/g, function (match) {
            return replace_map[match];
        });
    }

    /**
     * Produces an ajax-based query function
     *
     * @param options object containing configuration paramters
     * @param options.params parameter map for the transport ajax call, can contain such options as cache, jsonpCallback, etc. see $.ajax
     * @param options.transport function that will be used to execute the ajax request. must be compatible with parameters supported by $.ajax
     * @param options.url url for the data
     * @param options.data a function(searchTerm, pageNumber, context) that should return an object containing query string parameters for the above url.
     * @param options.dataType request data type: ajax, jsonp, other datatatypes supported by jQuery's $.ajax function or the transport function if specified
     * @param options.quietMillis (optional) milliseconds to wait before making the ajaxRequest, helps debounce the ajax function if invoked too often
     * @param options.results a function(remoteData, pageNumber) that converts data returned form the remote request to the format expected by Select2.
     *      The expected format is an object containing the following keys:
     *      results array of objects that will be used as choices
     *      more (optional) boolean indicating whether there are more results available
     *      Example: {results:[{id:1, text:'Red'},{id:2, text:'Blue'}], more:true}
     */
    function ajax(options) {
        var timeout, // current scheduled but not yet executed request
            handler = null,
            quietMillis = options.quietMillis || 100,
            ajaxUrl = options.url,
            self = this;

        return function (query) {
            window.clearTimeout(timeout);
            timeout = window.setTimeout(function () {
                var data = options.data, // ajax data function
                    url = ajaxUrl, // ajax url string or function
                    transport = options.transport || $.fn.select2.ajaxDefaults.transport,
                    // deprecated - to be removed in 4.0  - use params instead
                    deprecated = {
                        type: options.type || 'GET', // set type of request (GET or POST)
                        cache: options.cache || false,
                        jsonpCallback: options.jsonpCallback||undefined,
                        dataType: options.dataType||"json"
                    },
                    params = $.extend({}, $.fn.select2.ajaxDefaults.params, deprecated);

                data = data ? data.call(self, query.term, query.page, query.context) : null;
                url = (typeof url === 'function') ? url.call(self, query.term, query.page, query.context) : url;

                if (handler) { handler.abort(); }

                if (options.params) {
                    if ($.isFunction(options.params)) {
                        $.extend(params, options.params.call(self));
                    } else {
                        $.extend(params, options.params);
                    }
                }

                $.extend(params, {
                    url: url,
                    dataType: options.dataType,
                    data: data,
                    success: function (data) {
                        // TODO - replace query.page with query so users have access to term, page, etc.
                        var results = options.results(data, query.page);
                        query.callback(results);
                    }
                });
                handler = transport.call(self, params);
            }, quietMillis);
        };
    }

    /**
     * Produces a query function that works with a local array
     *
     * @param options object containing configuration parameters. The options parameter can either be an array or an
     * object.
     *
     * If the array form is used it is assumed that it contains objects with 'id' and 'text' keys.
     *
     * If the object form is used ti is assumed that it contains 'data' and 'text' keys. The 'data' key should contain
     * an array of objects that will be used as choices. These objects must contain at least an 'id' key. The 'text'
     * key can either be a String in which case it is expected that each element in the 'data' array has a key with the
     * value of 'text' which will be used to match choices. Alternatively, text can be a function(item) that can extract
     * the text.
     */
    function local(options) {
        var data = options, // data elements
            dataText,
            tmp,
            text = function (item) { return ""+item.text; }; // function used to retrieve the text portion of a data item that is matched against the search

         if ($.isArray(data)) {
            tmp = data;
            data = { results: tmp };
        }

         if ($.isFunction(data) === false) {
            tmp = data;
            data = function() { return tmp; };
        }

        var dataItem = data();
        if (dataItem.text) {
            text = dataItem.text;
            // if text is not a function we assume it to be a key name
            if (!$.isFunction(text)) {
                dataText = dataItem.text; // we need to store this in a separate variable because in the next step data gets reset and data.text is no longer available
                text = function (item) { return item[dataText]; };
            }
        }

        return function (query) {
            var t = query.term, filtered = { results: [] }, process;
            if (t === "") {
                query.callback(data());
                return;
            }

            process = function(datum, collection) {
                var group, attr;
                datum = datum[0];
                if (datum.children) {
                    group = {};
                    for (attr in datum) {
                        if (datum.hasOwnProperty(attr)) group[attr]=datum[attr];
                    }
                    group.children=[];
                    $(datum.children).each2(function(i, childDatum) { process(childDatum, group.children); });
                    if (group.children.length || query.matcher(t, text(group), datum)) {
                        collection.push(group);
                    }
                } else {
                    if (query.matcher(t, text(datum), datum)) {
                        collection.push(datum);
                    }
                }
            };

            $(data().results).each2(function(i, datum) { process(datum, filtered.results); });
            query.callback(filtered);
        };
    }

    // TODO javadoc
    function tags(data) {
        var isFunc = $.isFunction(data);
        return function (query) {
            var t = query.term, filtered = {results: []};
            $(isFunc ? data() : data).each(function () {
                var isObject = this.text !== undefined,
                    text = isObject ? this.text : this;
                if (t === "" || query.matcher(t, text)) {
                    filtered.results.push(isObject ? this : {id: this, text: this});
                }
            });
            query.callback(filtered);
        };
    }

    /**
     * Checks if the formatter function should be used.
     *
     * Throws an error if it is not a function. Returns true if it should be used,
     * false if no formatting should be performed.
     *
     * @param formatter
     */
    function checkFormatter(formatter, formatterName) {
        if ($.isFunction(formatter)) return true;
        if (!formatter) return false;
        throw new Error(formatterName +" must be a function or a falsy value");
    }

    function evaluate(val) {
        return $.isFunction(val) ? val() : val;
    }

    function countResults(results) {
        var count = 0;
        $.each(results, function(i, item) {
            if (item.children) {
                count += countResults(item.children);
            } else {
                count++;
            }
        });
        return count;
    }

    /**
     * Default tokenizer. This function uses breaks the input on substring match of any string from the
     * opts.tokenSeparators array and uses opts.createSearchChoice to create the choice object. Both of those
     * two options have to be defined in order for the tokenizer to work.
     *
     * @param input text user has typed so far or pasted into the search field
     * @param selection currently selected choices
     * @param selectCallback function(choice) callback tho add the choice to selection
     * @param opts select2's opts
     * @return undefined/null to leave the current input unchanged, or a string to change the input to the returned value
     */
    function defaultTokenizer(input, selection, selectCallback, opts) {
        var original = input, // store the original so we can compare and know if we need to tell the search to update its text
            dupe = false, // check for whether a token we extracted represents a duplicate selected choice
            token, // token
            index, // position at which the separator was found
            i, l, // looping variables
            separator; // the matched separator

        if (!opts.createSearchChoice || !opts.tokenSeparators || opts.tokenSeparators.length < 1) return undefined;

        while (true) {
            index = -1;

            for (i = 0, l = opts.tokenSeparators.length; i < l; i++) {
                separator = opts.tokenSeparators[i];
                index = input.indexOf(separator);
                if (index >= 0) break;
            }

            if (index < 0) break; // did not find any token separator in the input string, bail

            token = input.substring(0, index);
            input = input.substring(index + separator.length);

            if (token.length > 0) {
                token = opts.createSearchChoice.call(this, token, selection);
                if (token !== undefined && token !== null && opts.id(token) !== undefined && opts.id(token) !== null) {
                    dupe = false;
                    for (i = 0, l = selection.length; i < l; i++) {
                        if (equal(opts.id(token), opts.id(selection[i]))) {
                            dupe = true; break;
                        }
                    }

                    if (!dupe) selectCallback(token);
                }
            }
        }

        if (original!==input) return input;
    }

    /**
     * Creates a new class
     *
     * @param superClass
     * @param methods
     */
    function clazz(SuperClass, methods) {
        var constructor = function () {};
        constructor.prototype = new SuperClass;
        constructor.prototype.constructor = constructor;
        constructor.prototype.parent = SuperClass.prototype;
        constructor.prototype = $.extend(constructor.prototype, methods);
        return constructor;
    }

    AbstractSelect2 = clazz(Object, {

        // abstract
        bind: function (func) {
            var self = this;
            return function () {
                func.apply(self, arguments);
            };
        },

        // abstract
        init: function (opts) {
            var results, search, resultsSelector = ".select2-results";

            // prepare options
            this.opts = opts = this.prepareOpts(opts);

            this.id=opts.id;

            // destroy if called on an existing component
            if (opts.element.data("select2") !== undefined &&
                opts.element.data("select2") !== null) {
                opts.element.data("select2").destroy();
            }

            this.container = this.createContainer();

            this.containerId="s2id_"+(opts.element.attr("id") || "autogen"+nextUid());
            this.containerSelector="#"+this.containerId.replace(/([;&,\.\+\*\~':"\!\^#$%@\[\]\(\)=>\|])/g, '\\$1');
            this.container.attr("id", this.containerId);

            // cache the body so future lookups are cheap
            this.body = thunk(function() { return opts.element.closest("body"); });

            syncCssClasses(this.container, this.opts.element, this.opts.adaptContainerCssClass);

            this.container.attr("style", opts.element.attr("style"));
            this.container.css(evaluate(opts.containerCss));
            this.container.addClass(evaluate(opts.containerCssClass));

            this.elementTabIndex = this.opts.element.attr("tabindex");

            // swap container for the element
            this.opts.element
                .data("select2", this)
                .attr("tabindex", "-1")
                .before(this.container)
                .on("click.select2", killEvent); // do not leak click events

            this.container.data("select2", this);

            this.dropdown = this.container.find(".select2-drop");

            syncCssClasses(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass);

            this.dropdown.addClass(evaluate(opts.dropdownCssClass));
            this.dropdown.data("select2", this);
            this.dropdown.on("click", killEvent);

            this.results = results = this.container.find(resultsSelector);
            this.search = search = this.container.find("input.select2-input");

            this.queryCount = 0;
            this.resultsPage = 0;
            this.context = null;

            // initialize the container
            this.initContainer();

            this.container.on("click", killEvent);

            installFilteredMouseMove(this.results);
            this.dropdown.on("mousemove-filtered touchstart touchmove touchend", resultsSelector, this.bind(this.highlightUnderEvent));

            installDebouncedScroll(80, this.results);
            this.dropdown.on("scroll-debounced", resultsSelector, this.bind(this.loadMoreIfNeeded));

            // do not propagate change event from the search field out of the component
            $(this.container).on("change", ".select2-input", function(e) {e.stopPropagation();});
            $(this.dropdown).on("change", ".select2-input", function(e) {e.stopPropagation();});

            // if jquery.mousewheel plugin is installed we can prevent out-of-bounds scrolling of results via mousewheel
            if ($.fn.mousewheel) {
                results.mousewheel(function (e, delta, deltaX, deltaY) {
                    var top = results.scrollTop();
                    if (deltaY > 0 && top - deltaY <= 0) {
                        results.scrollTop(0);
                        killEvent(e);
                    } else if (deltaY < 0 && results.get(0).scrollHeight - results.scrollTop() + deltaY <= results.height()) {
                        results.scrollTop(results.get(0).scrollHeight - results.height());
                        killEvent(e);
                    }
                });
            }

            installKeyUpChangeEvent(search);
            search.on("keyup-change input paste", this.bind(this.updateResults));
            search.on("focus", function () { search.addClass("select2-focused"); });
            search.on("blur", function () { search.removeClass("select2-focused");});

            this.dropdown.on("mouseup", resultsSelector, this.bind(function (e) {
                if ($(e.target).closest(".select2-result-selectable").length > 0) {
                    this.highlightUnderEvent(e);
                    this.selectHighlighted(e);
                }
            }));

            // trap all mouse events from leaving the dropdown. sometimes there may be a modal that is listening
            // for mouse events outside of itself so it can close itself. since the dropdown is now outside the select2's
            // dom it will trigger the popup close, which is not what we want
            this.dropdown.on("click mouseup mousedown", function (e) { e.stopPropagation(); });

            if ($.isFunction(this.opts.initSelection)) {
                // initialize selection based on the current value of the source element
                this.initSelection();

                // if the user has provided a function that can set selection based on the value of the source element
                // we monitor the change event on the element and trigger it, allowing for two way synchronization
                this.monitorSource();
            }

            if (opts.maximumInputLength !== null) {
                this.search.attr("maxlength", opts.maximumInputLength);
            }

            var disabled = opts.element.prop("disabled");
            if (disabled === undefined) disabled = false;
            this.enable(!disabled);

            var readonly = opts.element.prop("readonly");
            if (readonly === undefined) readonly = false;
            this.readonly(readonly);

            // Calculate size of scrollbar
            scrollBarDimensions = scrollBarDimensions || measureScrollbar();

            this.autofocus = opts.element.prop("autofocus");
            opts.element.prop("autofocus", false);
            if (this.autofocus) this.focus();

            this.nextSearchTerm = undefined;
        },

        // abstract
        destroy: function () {
            var element=this.opts.element, select2 = element.data("select2");

            this.close();

            if (this.propertyObserver) { delete this.propertyObserver; this.propertyObserver = null; }

            if (select2 !== undefined) {
                select2.container.remove();
                select2.dropdown.remove();
                element
                    .removeClass("select2-offscreen")
                    .removeData("select2")
                    .off(".select2")
                    .prop("autofocus", this.autofocus || false);
                if (this.elementTabIndex) {
                    element.attr({tabindex: this.elementTabIndex});
                } else {
                    element.removeAttr("tabindex");
                }
                element.show();
            }
        },

        // abstract
        optionToData: function(element) {
            if (element.is("option")) {
                return {
                    id:element.prop("value"),
                    text:element.text(),
                    element: element.get(),
                    css: element.attr("class"),
                    disabled: element.prop("disabled"),
                    locked: equal(element.attr("locked"), "locked") || equal(element.data("locked"), true)
                };
            } else if (element.is("optgroup")) {
                return {
                    text:element.attr("label"),
                    children:[],
                    element: element.get(),
                    css: element.attr("class")
                };
            }
        },

        // abstract
        prepareOpts: function (opts) {
            var element, select, idKey, ajaxUrl, self = this;

            element = opts.element;

            if (element.get(0).tagName.toLowerCase() === "select") {
                this.select = select = opts.element;
            }

            if (select) {
                // these options are not allowed when attached to a select because they are picked up off the element itself
                $.each(["id", "multiple", "ajax", "query", "createSearchChoice", "initSelection", "data", "tags"], function () {
                    if (this in opts) {
                        throw new Error("Option '" + this + "' is not allowed for Select2 when attached to a <select> element.");
                    }
                });
            }

            opts = $.extend({}, {
                populateResults: function(container, results, query) {
                    var populate, id=this.opts.id;

                    populate=function(results, container, depth) {

                        var i, l, result, selectable, disabled, compound, node, label, innerContainer, formatted;

                        results = opts.sortResults(results, container, query);

                        for (i = 0, l = results.length; i < l; i = i + 1) {

                            result=results[i];

                            disabled = (result.disabled === true);
                            selectable = (!disabled) && (id(result) !== undefined);

                            compound=result.children && result.children.length > 0;

                            node=$("<li></li>");
                            node.addClass("select2-results-dept-"+depth);
                            node.addClass("select2-result");
                            node.addClass(selectable ? "select2-result-selectable" : "select2-result-unselectable");
                            if (disabled) { node.addClass("select2-disabled"); }
                            if (compound) { node.addClass("select2-result-with-children"); }
                            node.addClass(self.opts.formatResultCssClass(result));

                            label=$(document.createElement("div"));
                            label.addClass("select2-result-label");

                            formatted=opts.formatResult(result, label, query, self.opts.escapeMarkup);
                            if (formatted!==undefined) {
                                label.html(formatted);
                            }

                            node.append(label);

                            if (compound) {

                                innerContainer=$("<ul></ul>");
                                innerContainer.addClass("select2-result-sub");
                                populate(result.children, innerContainer, depth+1);
                                node.append(innerContainer);
                            }

                            node.data("select2-data", result);
                            container.append(node);
                        }
                    };

                    populate(results, container, 0);
                }
            }, $.fn.select2.defaults, opts);

            if (typeof(opts.id) !== "function") {
                idKey = opts.id;
                opts.id = function (e) { return e[idKey]; };
            }

            if ($.isArray(opts.element.data("select2Tags"))) {
                if ("tags" in opts) {
                    throw "tags specified as both an attribute 'data-select2-tags' and in options of Select2 " + opts.element.attr("id");
                }
                opts.tags=opts.element.data("select2Tags");
            }

            if (select) {
                opts.query = this.bind(function (query) {
                    var data = { results: [], more: false },
                        term = query.term,
                        children, placeholderOption, process;

                    process=function(element, collection) {
                        var group;
                        if (element.is("option")) {
                            if (query.matcher(term, element.text(), element)) {
                                collection.push(self.optionToData(element));
                            }
                        } else if (element.is("optgroup")) {
                            group=self.optionToData(element);
                            element.children().each2(function(i, elm) { process(elm, group.children); });
                            if (group.children.length>0) {
                                collection.push(group);
                            }
                        }
                    };

                    children=element.children();

                    // ignore the placeholder option if there is one
                    if (this.getPlaceholder() !== undefined && children.length > 0) {
                        placeholderOption = this.getPlaceholderOption();
                        if (placeholderOption) {
                            children=children.not(placeholderOption);
                        }
                    }

                    children.each2(function(i, elm) { process(elm, data.results); });

                    query.callback(data);
                });
                // this is needed because inside val() we construct choices from options and there id is hardcoded
                opts.id=function(e) { return e.id; };
                opts.formatResultCssClass = function(data) { return data.css; };
            } else {
                if (!("query" in opts)) {

                    if ("ajax" in opts) {
                        ajaxUrl = opts.element.data("ajax-url");
                        if (ajaxUrl && ajaxUrl.length > 0) {
                            opts.ajax.url = ajaxUrl;
                        }
                        opts.query = ajax.call(opts.element, opts.ajax);
                    } else if ("data" in opts) {
                        opts.query = local(opts.data);
                    } else if ("tags" in opts) {
                        opts.query = tags(opts.tags);
                        if (opts.createSearchChoice === undefined) {
                            opts.createSearchChoice = function (term) { return {id: $.trim(term), text: $.trim(term)}; };
                        }
                        if (opts.initSelection === undefined) {
                            opts.initSelection = function (element, callback) {
                                var data = [];
                                $(splitVal(element.val(), opts.separator)).each(function () {
                                    var obj = { id: this, text: this },
                                        tags = opts.tags;
                                    if ($.isFunction(tags)) tags=tags();
                                    $(tags).each(function() { if (equal(this.id, obj.id)) { obj = this; return false; } });
                                    data.push(obj);
                                });

                                callback(data);
                            };
                        }
                    }
                }
            }
            if (typeof(opts.query) !== "function") {
                throw "query function not defined for Select2 " + opts.element.attr("id");
            }

            return opts;
        },

        /**
         * Monitor the original element for changes and update select2 accordingly
         */
        // abstract
        monitorSource: function () {
            var el = this.opts.element, sync, observer;

            el.on("change.select2", this.bind(function (e) {
                if (this.opts.element.data("select2-change-triggered") !== true) {
                    this.initSelection();
                }
            }));

            sync = this.bind(function () {

                // sync enabled state
                var disabled = el.prop("disabled");
                if (disabled === undefined) disabled = false;
                this.enable(!disabled);

                var readonly = el.prop("readonly");
                if (readonly === undefined) readonly = false;
                this.readonly(readonly);

                syncCssClasses(this.container, this.opts.element, this.opts.adaptContainerCssClass);
                this.container.addClass(evaluate(this.opts.containerCssClass));

                syncCssClasses(this.dropdown, this.opts.element, this.opts.adaptDropdownCssClass);
                this.dropdown.addClass(evaluate(this.opts.dropdownCssClass));

            });

            // IE8-10
            el.on("propertychange.select2", sync);

            // hold onto a reference of the callback to work around a chromium bug
            if (this.mutationCallback === undefined) {
                this.mutationCallback = function (mutations) {
                    mutations.forEach(sync);
                }
            }

            // safari, chrome, firefox, IE11
            observer = window.MutationObserver || window.WebKitMutationObserver|| window.MozMutationObserver;
            if (observer !== undefined) {
                if (this.propertyObserver) { delete this.propertyObserver; this.propertyObserver = null; }
                this.propertyObserver = new observer(this.mutationCallback);
                this.propertyObserver.observe(el.get(0), { attributes:true, subtree:false });
            }
        },

        // abstract
        triggerSelect: function(data) {
            var evt = $.Event("select2-selecting", { val: this.id(data), object: data });
            this.opts.element.trigger(evt);
            return !evt.isDefaultPrevented();
        },

        /**
         * Triggers the change event on the source element
         */
        // abstract
        triggerChange: function (details) {

            details = details || {};
            details= $.extend({}, details, { type: "change", val: this.val() });
            // prevents recursive triggering
            this.opts.element.data("select2-change-triggered", true);
            this.opts.element.trigger(details);
            this.opts.element.data("select2-change-triggered", false);

            // some validation frameworks ignore the change event and listen instead to keyup, click for selects
            // so here we trigger the click event manually
            this.opts.element.click();

            // ValidationEngine ignorea the change event and listens instead to blur
            // so here we trigger the blur event manually if so desired
            if (this.opts.blurOnChange)
                this.opts.element.blur();
        },

        //abstract
        isInterfaceEnabled: function()
        {
            return this.enabledInterface === true;
        },

        // abstract
        enableInterface: function() {
            var enabled = this._enabled && !this._readonly,
                disabled = !enabled;

            if (enabled === this.enabledInterface) return false;

            this.container.toggleClass("select2-container-disabled", disabled);
            this.close();
            this.enabledInterface = enabled;

            return true;
        },

        // abstract
        enable: function(enabled) {
            if (enabled === undefined) enabled = true;
            if (this._enabled === enabled) return;
            this._enabled = enabled;

            this.opts.element.prop("disabled", !enabled);
            this.enableInterface();
        },

        // abstract
        disable: function() {
            this.enable(false);
        },

        // abstract
        readonly: function(enabled) {
            if (enabled === undefined) enabled = false;
            if (this._readonly === enabled) return false;
            this._readonly = enabled;

            this.opts.element.prop("readonly", enabled);
            this.enableInterface();
            return true;
        },

        // abstract
        opened: function () {
            return this.container.hasClass("select2-dropdown-open");
        },

        // abstract
        positionDropdown: function() {
            var $dropdown = this.dropdown,
                offset = this.container.offset(),
                height = this.container.outerHeight(false),
                width = this.container.outerWidth(false),
                dropHeight = $dropdown.outerHeight(false),
                $window = $(window),
                windowWidth = $window.width(),
                windowHeight = $window.height(),
                viewPortRight = $window.scrollLeft() + windowWidth,
                viewportBottom = $window.scrollTop() + windowHeight,
                dropTop = offset.top + height,
                dropLeft = offset.left,
                enoughRoomBelow = dropTop + dropHeight <= viewportBottom,
                enoughRoomAbove = (offset.top - dropHeight) >= this.body().scrollTop(),
                dropWidth = $dropdown.outerWidth(false),
                enoughRoomOnRight = dropLeft + dropWidth <= viewPortRight,
                aboveNow = $dropdown.hasClass("select2-drop-above"),
                bodyOffset,
                above,
                changeDirection,
                css,
                resultsListNode;

            // always prefer the current above/below alignment, unless there is not enough room
            if (aboveNow) {
                above = true;
                if (!enoughRoomAbove && enoughRoomBelow) {
                    changeDirection = true;
                    above = false;
                }
            } else {
                above = false;
                if (!enoughRoomBelow && enoughRoomAbove) {
                    changeDirection = true;
                    above = true;
                }
            }

            //if we are changing direction we need to get positions when dropdown is hidden;
            if (changeDirection) {
                $dropdown.hide();
                offset = this.container.offset();
                height = this.container.outerHeight(false);
                width = this.container.outerWidth(false);
                dropHeight = $dropdown.outerHeight(false);
                viewPortRight = $window.scrollLeft() + windowWidth;
                viewportBottom = $window.scrollTop() + windowHeight;
                dropTop = offset.top + height;
                dropLeft = offset.left;
                dropWidth = $dropdown.outerWidth(false);
                enoughRoomOnRight = dropLeft + dropWidth <= viewPortRight;
                $dropdown.show();
            }

            if (this.opts.dropdownAutoWidth) {
                resultsListNode = $('.select2-results', $dropdown)[0];
                $dropdown.addClass('select2-drop-auto-width');
                $dropdown.css('width', '');
                // Add scrollbar width to dropdown if vertical scrollbar is present
                dropWidth = $dropdown.outerWidth(false) + (resultsListNode.scrollHeight === resultsListNode.clientHeight ? 0 : scrollBarDimensions.width);
                dropWidth > width ? width = dropWidth : dropWidth = width;
                enoughRoomOnRight = dropLeft + dropWidth <= viewPortRight;
            }
            else {
                this.container.removeClass('select2-drop-auto-width');
            }

            //console.log("below/ droptop:", dropTop, "dropHeight", dropHeight, "sum", (dropTop+dropHeight)+" viewport bottom", viewportBottom, "enough?", enoughRoomBelow);
            //console.log("above/ offset.top", offset.top, "dropHeight", dropHeight, "top", (offset.top-dropHeight), "scrollTop", this.body().scrollTop(), "enough?", enoughRoomAbove);

            // fix positioning when body has an offset and is not position: static
            if (this.body().css('position') !== 'static') {
                bodyOffset = this.body().offset();
                dropTop -= bodyOffset.top;
                dropLeft -= bodyOffset.left;
            }

            if (!enoughRoomOnRight) {
               dropLeft = offset.left + width - dropWidth;
            }

            css =  {
                left: dropLeft,
                width: width
            };

            if (above) {
                css.bottom = windowHeight - offset.top;
                css.top = 'auto';
                this.container.addClass("select2-drop-above");
                $dropdown.addClass("select2-drop-above");
            }
            else {
                css.top = dropTop;
                css.bottom = 'auto';
                this.container.removeClass("select2-drop-above");
                $dropdown.removeClass("select2-drop-above");
            }
            css = $.extend(css, evaluate(this.opts.dropdownCss));

            $dropdown.css(css);
        },

        // abstract
        shouldOpen: function() {
            var event;

            if (this.opened()) return false;

            if (this._enabled === false || this._readonly === true) return false;

            event = $.Event("select2-opening");
            this.opts.element.trigger(event);
            return !event.isDefaultPrevented();
        },

        // abstract
        clearDropdownAlignmentPreference: function() {
            // clear the classes used to figure out the preference of where the dropdown should be opened
            this.container.removeClass("select2-drop-above");
            this.dropdown.removeClass("select2-drop-above");
        },

        /**
         * Opens the dropdown
         *
         * @return {Boolean} whether or not dropdown was opened. This method will return false if, for example,
         * the dropdown is already open, or if the 'open' event listener on the element called preventDefault().
         */
        // abstract
        open: function () {

            if (!this.shouldOpen()) return false;

            this.opening();

            return true;
        },

        /**
         * Performs the opening of the dropdown
         */
        // abstract
        opening: function() {
            var cid = this.containerId,
                scroll = "scroll." + cid,
                resize = "resize."+cid,
                orient = "orientationchange."+cid,
                mask;

            this.container.addClass("select2-dropdown-open").addClass("select2-container-active");

            this.clearDropdownAlignmentPreference();

            if(this.dropdown[0] !== this.body().children().last()[0]) {
                this.dropdown.detach().appendTo(this.body());
            }

            // create the dropdown mask if doesnt already exist
            mask = $("#select2-drop-mask");
            if (mask.length == 0) {
                mask = $(document.createElement("div"));
                mask.attr("id","select2-drop-mask").attr("class","select2-drop-mask");
                mask.hide();
                mask.appendTo(this.body());
                mask.on("mousedown touchstart click", function (e) {
                    var dropdown = $("#select2-drop"), self;
                    if (dropdown.length > 0) {
                        self=dropdown.data("select2");
                        if (self.opts.selectOnBlur) {
                            self.selectHighlighted({noFocus: true});
                        }
                        self.close({focus:true});
                        e.preventDefault();
                        e.stopPropagation();
                    }
                });
            }

            // ensure the mask is always right before the dropdown
            if (this.dropdown.prev()[0] !== mask[0]) {
                this.dropdown.before(mask);
            }

            // move the global id to the correct dropdown
            $("#select2-drop").removeAttr("id");
            this.dropdown.attr("id", "select2-drop");

            // show the elements
            mask.show();

            this.positionDropdown();
            this.dropdown.show();
            this.positionDropdown();

            this.dropdown.addClass("select2-drop-active");

            // attach listeners to events that can change the position of the container and thus require
            // the position of the dropdown to be updated as well so it does not come unglued from the container
            var that = this;
            this.container.parents().add(window).each(function () {
                $(this).on(resize+" "+scroll+" "+orient, function (e) {
                    that.positionDropdown();
                });
            });


        },

        // abstract
        close: function () {
            if (!this.opened()) return;

            var cid = this.containerId,
                scroll = "scroll." + cid,
                resize = "resize."+cid,
                orient = "orientationchange."+cid;

            // unbind event listeners
            this.container.parents().add(window).each(function () { $(this).off(scroll).off(resize).off(orient); });

            this.clearDropdownAlignmentPreference();

            $("#select2-drop-mask").hide();
            this.dropdown.removeAttr("id"); // only the active dropdown has the select2-drop id
            this.dropdown.hide();
            this.container.removeClass("select2-dropdown-open").removeClass("select2-container-active");
            this.results.empty();


            this.clearSearch();
            this.search.removeClass("select2-active");
            this.opts.element.trigger($.Event("select2-close"));
        },

        /**
         * Opens control, sets input value, and updates results.
         */
        // abstract
        externalSearch: function (term) {
            this.open();
            this.search.val(term);
            this.updateResults(false);
        },

        // abstract
        clearSearch: function () {

        },

        //abstract
        getMaximumSelectionSize: function() {
            return evaluate(this.opts.maximumSelectionSize);
        },

        // abstract
        ensureHighlightVisible: function () {
            var results = this.results, children, index, child, hb, rb, y, more;

            index = this.highlight();

            if (index < 0) return;

            if (index == 0) {

                // if the first element is highlighted scroll all the way to the top,
                // that way any unselectable headers above it will also be scrolled
                // into view

                results.scrollTop(0);
                return;
            }

            children = this.findHighlightableChoices().find('.select2-result-label');

            child = $(children[index]);

            hb = child.offset().top + child.outerHeight(true);

            // if this is the last child lets also make sure select2-more-results is visible
            if (index === children.length - 1) {
                more = results.find("li.select2-more-results");
                if (more.length > 0) {
                    hb = more.offset().top + more.outerHeight(true);
                }
            }

            rb = results.offset().top + results.outerHeight(true);
            if (hb > rb) {
                results.scrollTop(results.scrollTop() + (hb - rb));
            }
            y = child.offset().top - results.offset().top;

            // make sure the top of the element is visible
            if (y < 0 && child.css('display') != 'none' ) {
                results.scrollTop(results.scrollTop() + y); // y is negative
            }
        },

        // abstract
        findHighlightableChoices: function() {
            return this.results.find(".select2-result-selectable:not(.select2-disabled, .select2-selected)");
        },

        // abstract
        moveHighlight: function (delta) {
            var choices = this.findHighlightableChoices(),
                index = this.highlight();

            while (index > -1 && index < choices.length) {
                index += delta;
                var choice = $(choices[index]);
                if (choice.hasClass("select2-result-selectable") && !choice.hasClass("select2-disabled") && !choice.hasClass("select2-selected")) {
                    this.highlight(index);
                    break;
                }
            }
        },

        // abstract
        highlight: function (index) {
            var choices = this.findHighlightableChoices(),
                choice,
                data;

            if (arguments.length === 0) {
                return indexOf(choices.filter(".select2-highlighted")[0], choices.get());
            }

            if (index >= choices.length) index = choices.length - 1;
            if (index < 0) index = 0;

            this.removeHighlight();

            choice = $(choices[index]);
            choice.addClass("select2-highlighted");

            this.ensureHighlightVisible();

            data = choice.data("select2-data");
            if (data) {
                this.opts.element.trigger({ type: "select2-highlight", val: this.id(data), choice: data });
            }
        },

        removeHighlight: function() {
            this.results.find(".select2-highlighted").removeClass("select2-highlighted");
        },

        // abstract
        countSelectableResults: function() {
            return this.findHighlightableChoices().length;
        },

        // abstract
        highlightUnderEvent: function (event) {
            var el = $(event.target).closest(".select2-result-selectable");
            if (el.length > 0 && !el.is(".select2-highlighted")) {
                var choices = this.findHighlightableChoices();
                this.highlight(choices.index(el));
            } else if (el.length == 0) {
                // if we are over an unselectable item remove all highlights
                this.removeHighlight();
            }
        },

        // abstract
        loadMoreIfNeeded: function () {
            var results = this.results,
                more = results.find("li.select2-more-results"),
                below, // pixels the element is below the scroll fold, below==0 is when the element is starting to be visible
                page = this.resultsPage + 1,
                self=this,
                term=this.search.val(),
                context=this.context;

            if (more.length === 0) return;
            below = more.offset().top - results.offset().top - results.height();

            if (below <= this.opts.loadMorePadding) {
                more.addClass("select2-active");
                this.opts.query({
                        element: this.opts.element,
                        term: term,
                        page: page,
                        context: context,
                        matcher: this.opts.matcher,
                        callback: this.bind(function (data) {

                    // ignore a response if the select2 has been closed before it was received
                    if (!self.opened()) return;


                    self.opts.populateResults.call(this, results, data.results, {term: term, page: page, context:context});
                    self.postprocessResults(data, false, false);

                    if (data.more===true) {
                        more.detach().appendTo(results).text(self.opts.formatLoadMore(page+1));
                        window.setTimeout(function() { self.loadMoreIfNeeded(); }, 10);
                    } else {
                        more.remove();
                    }
                    self.positionDropdown();
                    self.resultsPage = page;
                    self.context = data.context;
                    this.opts.element.trigger({ type: "select2-loaded", items: data });
                })});
            }
        },

        /**
         * Default tokenizer function which does nothing
         */
        tokenize: function() {

        },

        /**
         * @param initial whether or not this is the call to this method right after the dropdown has been opened
         */
        // abstract
        updateResults: function (initial) {
            var search = this.search,
                results = this.results,
                opts = this.opts,
                data,
                self = this,
                input,
                term = search.val(),
                lastTerm = $.data(this.container, "select2-last-term"),
                // sequence number used to drop out-of-order responses
                queryNumber;

            // prevent duplicate queries against the same term
            if (initial !== true && lastTerm && equal(term, lastTerm)) return;

            $.data(this.container, "select2-last-term", term);

            // if the search is currently hidden we do not alter the results
            if (initial !== true && (this.showSearchInput === false || !this.opened())) {
                return;
            }

            function postRender() {
                search.removeClass("select2-active");
                self.positionDropdown();
            }

            function render(html) {
                results.html(html);
                postRender();
            }

            queryNumber = ++this.queryCount;

            var maxSelSize = this.getMaximumSelectionSize();
            if (maxSelSize >=1) {
                data = this.data();
                if ($.isArray(data) && data.length >= maxSelSize && checkFormatter(opts.formatSelectionTooBig, "formatSelectionTooBig")) {
                    render("<li class='select2-selection-limit'>" + opts.formatSelectionTooBig(maxSelSize) + "</li>");
                    return;
                }
            }

            if (search.val().length < opts.minimumInputLength) {
                if (checkFormatter(opts.formatInputTooShort, "formatInputTooShort")) {
                    render("<li class='select2-no-results'>" + opts.formatInputTooShort(search.val(), opts.minimumInputLength) + "</li>");
                } else {
                    render("");
                }
                if (initial && this.showSearch) this.showSearch(true);
                return;
            }

            if (opts.maximumInputLength && search.val().length > opts.maximumInputLength) {
                if (checkFormatter(opts.formatInputTooLong, "formatInputTooLong")) {
                    render("<li class='select2-no-results'>" + opts.formatInputTooLong(search.val(), opts.maximumInputLength) + "</li>");
                } else {
                    render("");
                }
                return;
            }

            if (opts.formatSearching && this.findHighlightableChoices().length === 0) {
                render("<li class='select2-searching'>" + opts.formatSearching() + "</li>");
            }

            search.addClass("select2-active");

            this.removeHighlight();

            // give the tokenizer a chance to pre-process the input
            input = this.tokenize();
            if (input != undefined && input != null) {
                search.val(input);
            }

            this.resultsPage = 1;

            opts.query({
                element: opts.element,
                    term: search.val(),
                    page: this.resultsPage,
                    context: null,
                    matcher: opts.matcher,
                    callback: this.bind(function (data) {
                var def; // default choice

                // ignore old responses
                if (queryNumber != this.queryCount) {
                  return;
                }

                // ignore a response if the select2 has been closed before it was received
                if (!this.opened()) {
                    this.search.removeClass("select2-active");
                    return;
                }

                // save context, if any
                this.context = (data.context===undefined) ? null : data.context;
                // create a default choice and prepend it to the list
                if (this.opts.createSearchChoice && search.val() !== "") {
                    def = this.opts.createSearchChoice.call(self, search.val(), data.results);
                    if (def !== undefined && def !== null && self.id(def) !== undefined && self.id(def) !== null) {
                        if ($(data.results).filter(
                            function () {
                                return equal(self.id(this), self.id(def));
                            }).length === 0) {
                            data.results.unshift(def);
                        }
                    }
                }

                if (data.results.length === 0 && checkFormatter(opts.formatNoMatches, "formatNoMatches")) {
                    render("<li class='select2-no-results'>" + opts.formatNoMatches(search.val()) + "</li>");
                    return;
                }

                results.empty();
                self.opts.populateResults.call(this, results, data.results, {term: search.val(), page: this.resultsPage, context:null});

                if (data.more === true && checkFormatter(opts.formatLoadMore, "formatLoadMore")) {
                    results.append("<li class='select2-more-results'>" + self.opts.escapeMarkup(opts.formatLoadMore(this.resultsPage)) + "</li>");
                    window.setTimeout(function() { self.loadMoreIfNeeded(); }, 10);
                }

                this.postprocessResults(data, initial);

                postRender();

                this.opts.element.trigger({ type: "select2-loaded", items: data });
            })});
        },

        // abstract
        cancel: function () {
            this.close();
        },

        // abstract
        blur: function () {
            // if selectOnBlur == true, select the currently highlighted option
            if (this.opts.selectOnBlur)
                this.selectHighlighted({noFocus: true});

            this.close();
            this.container.removeClass("select2-container-active");
            // synonymous to .is(':focus'), which is available in jquery >= 1.6
            if (this.search[0] === document.activeElement) { this.search.blur(); }
            this.clearSearch();
            this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");
        },

        // abstract
        focusSearch: function () {
            focus(this.search);
        },

        // abstract
        selectHighlighted: function (options) {
            var index=this.highlight(),
                highlighted=this.results.find(".select2-highlighted"),
                data = highlighted.closest('.select2-result').data("select2-data");

            if (data) {
                this.highlight(index);
                this.onSelect(data, options);
            } else if (options && options.noFocus) {
                this.close();
            }
        },

        // abstract
        getPlaceholder: function () {
            var placeholderOption;
            return this.opts.element.attr("placeholder") ||
                this.opts.element.attr("data-placeholder") || // jquery 1.4 compat
                this.opts.element.data("placeholder") ||
                this.opts.placeholder ||
                ((placeholderOption = this.getPlaceholderOption()) !== undefined ? placeholderOption.text() : undefined);
        },

        // abstract
        getPlaceholderOption: function() {
            if (this.select) {
                var firstOption = this.select.children('option').first();
                if (this.opts.placeholderOption !== undefined ) {
                    //Determine the placeholder option based on the specified placeholderOption setting
                    return (this.opts.placeholderOption === "first" && firstOption) ||
                           (typeof this.opts.placeholderOption === "function" && this.opts.placeholderOption(this.select));
                } else if (firstOption.text() === "" && firstOption.val() === "") {
                    //No explicit placeholder option specified, use the first if it's blank
                    return firstOption;
                }
            }
        },

        /**
         * Get the desired width for the container element.  This is
         * derived first from option `width` passed to select2, then
         * the inline 'style' on the original element, and finally
         * falls back to the jQuery calculated element width.
         */
        // abstract
        initContainerWidth: function () {
            function resolveContainerWidth() {
                var style, attrs, matches, i, l, attr;

                if (this.opts.width === "off") {
                    return null;
                } else if (this.opts.width === "element"){
                    return this.opts.element.outerWidth(false) === 0 ? 'auto' : this.opts.element.outerWidth(false) + 'px';
                } else if (this.opts.width === "copy" || this.opts.width === "resolve") {
                    // check if there is inline style on the element that contains width
                    style = this.opts.element.attr('style');
                    if (style !== undefined) {
                        attrs = style.split(';');
                        for (i = 0, l = attrs.length; i < l; i = i + 1) {
                            attr = attrs[i].replace(/\s/g, '');
                            matches = attr.match(/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i);
                            if (matches !== null && matches.length >= 1)
                                return matches[1];
                        }
                    }

                    if (this.opts.width === "resolve") {
                        // next check if css('width') can resolve a width that is percent based, this is sometimes possible
                        // when attached to input type=hidden or elements hidden via css
                        style = this.opts.element.css('width');
                        if (style.indexOf("%") > 0) return style;

                        // finally, fallback on the calculated width of the element
                        return (this.opts.element.outerWidth(false) === 0 ? 'auto' : this.opts.element.outerWidth(false) + 'px');
                    }

                    return null;
                } else if ($.isFunction(this.opts.width)) {
                    return this.opts.width();
                } else {
                    return this.opts.width;
               }
            };

            var width = resolveContainerWidth.call(this);
            if (width !== null) {
                this.container.css("width", width);
            }
        }
    });

    SingleSelect2 = clazz(AbstractSelect2, {

        // single

        createContainer: function () {
            var container = $(document.createElement("div")).attr({
                "class": "select2-container"
            }).html([
                "<a href='javascript:void(0)' onclick='return false;' class='select2-choice' tabindex='-1'>",
                "   <span class='select2-chosen'>&nbsp;</span><abbr class='select2-search-choice-close'></abbr>",
                "   <span class='select2-arrow'><b></b></span>",
                "</a>",
                "<input class='select2-focusser select2-offscreen' type='text'/>",
                "<div class='select2-drop select2-display-none'>",
                "   <div class='select2-search'>",
                "       <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'/>",
                "   </div>",
                "   <ul class='select2-results'>",
                "   </ul>",
                "</div>"].join(""));
            return container;
        },

        // single
        enableInterface: function() {
            if (this.parent.enableInterface.apply(this, arguments)) {
                this.focusser.prop("disabled", !this.isInterfaceEnabled());
            }
        },

        // single
        opening: function () {
            var el, range, len;

            if (this.opts.minimumResultsForSearch >= 0) {
                this.showSearch(true);
            }

            this.parent.opening.apply(this, arguments);

            if (this.showSearchInput !== false) {
                // IE appends focusser.val() at the end of field :/ so we manually insert it at the beginning using a range
                // all other browsers handle this just fine

                this.search.val(this.focusser.val());
            }
            this.search.focus();
            // move the cursor to the end after focussing, otherwise it will be at the beginning and
            // new text will appear *before* focusser.val()
            el = this.search.get(0);
            if (el.createTextRange) {
                range = el.createTextRange();
                range.collapse(false);
                range.select();
            } else if (el.setSelectionRange) {
                len = this.search.val().length;
                el.setSelectionRange(len, len);
            }

            // initializes search's value with nextSearchTerm (if defined by user)
            // ignore nextSearchTerm if the dropdown is opened by the user pressing a letter
            if(this.search.val() === "") {
                if(this.nextSearchTerm != undefined){
                    this.search.val(this.nextSearchTerm);
                    this.search.select();
                }
            }

            this.focusser.prop("disabled", true).val("");
            this.updateResults(true);
            this.opts.element.trigger($.Event("select2-open"));
        },

        // single
        close: function (params) {
            if (!this.opened()) return;
            this.parent.close.apply(this, arguments);

            params = params || {focus: true};
            this.focusser.removeAttr("disabled");

            if (params.focus) {
                this.focusser.focus();
            }
        },

        // single
        focus: function () {
            if (this.opened()) {
                this.close();
            } else {
                this.focusser.removeAttr("disabled");
                this.focusser.focus();
            }
        },

        // single
        isFocused: function () {
            return this.container.hasClass("select2-container-active");
        },

        // single
        cancel: function () {
            this.parent.cancel.apply(this, arguments);
            this.focusser.removeAttr("disabled");
            this.focusser.focus();
        },

        // single
        destroy: function() {
            $("label[for='" + this.focusser.attr('id') + "']")
                .attr('for', this.opts.element.attr("id"));
            this.parent.destroy.apply(this, arguments);
        },

        // single
        initContainer: function () {

            var selection,
                container = this.container,
                dropdown = this.dropdown;

            if (this.opts.minimumResultsForSearch < 0) {
                this.showSearch(false);
            } else {
                this.showSearch(true);
            }

            this.selection = selection = container.find(".select2-choice");

            this.focusser = container.find(".select2-focusser");

            // rewrite labels from original element to focusser
            this.focusser.attr("id", "s2id_autogen"+nextUid());

            $("label[for='" + this.opts.element.attr("id") + "']")
                .attr('for', this.focusser.attr('id'));

            this.focusser.attr("tabindex", this.elementTabIndex);

            this.search.on("keydown", this.bind(function (e) {
                if (!this.isInterfaceEnabled()) return;

                if (e.which === KEY.PAGE_UP || e.which === KEY.PAGE_DOWN) {
                    // prevent the page from scrolling
                    killEvent(e);
                    return;
                }

                switch (e.which) {
                    case KEY.UP:
                    case KEY.DOWN:
                        this.moveHighlight((e.which === KEY.UP) ? -1 : 1);
                        killEvent(e);
                        return;
                    case KEY.ENTER:
                        this.selectHighlighted();
                        killEvent(e);
                        return;
                    case KEY.TAB:
                        this.selectHighlighted({noFocus: true});
                        return;
                    case KEY.ESC:
                        this.cancel(e);
                        killEvent(e);
                        return;
                }
            }));

            this.search.on("blur", this.bind(function(e) {
                // a workaround for chrome to keep the search field focussed when the scroll bar is used to scroll the dropdown.
                // without this the search field loses focus which is annoying
                if (document.activeElement === this.body().get(0)) {
                    window.setTimeout(this.bind(function() {
                        this.search.focus();
                    }), 0);
                }
            }));

            this.focusser.on("keydown", this.bind(function (e) {
                if (!this.isInterfaceEnabled()) return;

                if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e) || e.which === KEY.ESC) {
                    return;
                }

                if (this.opts.openOnEnter === false && e.which === KEY.ENTER) {
                    killEvent(e);
                    return;
                }

                if (e.which == KEY.DOWN || e.which == KEY.UP
                    || (e.which == KEY.ENTER && this.opts.openOnEnter)) {

                    if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) return;

                    this.open();
                    killEvent(e);
                    return;
                }

                if (e.which == KEY.DELETE || e.which == KEY.BACKSPACE) {
                    if (this.opts.allowClear) {
                        this.clear();
                    }
                    killEvent(e);
                    return;
                }
            }));


            installKeyUpChangeEvent(this.focusser);
            this.focusser.on("keyup-change input", this.bind(function(e) {
                if (this.opts.minimumResultsForSearch >= 0) {
                    e.stopPropagation();
                    if (this.opened()) return;
                    this.open();
                }
            }));

            selection.on("mousedown", "abbr", this.bind(function (e) {
                if (!this.isInterfaceEnabled()) return;
                this.clear();
                killEventImmediately(e);
                this.close();
                this.selection.focus();
            }));

            selection.on("mousedown", this.bind(function (e) {

                if (!this.container.hasClass("select2-container-active")) {
                    this.opts.element.trigger($.Event("select2-focus"));
                }

                if (this.opened()) {
                    this.close();
                } else if (this.isInterfaceEnabled()) {
                    this.open();
                }

                killEvent(e);
            }));

            dropdown.on("mousedown", this.bind(function() { this.search.focus(); }));

            selection.on("focus", this.bind(function(e) {
                killEvent(e);
            }));

            this.focusser.on("focus", this.bind(function(){
                if (!this.container.hasClass("select2-container-active")) {
                    this.opts.element.trigger($.Event("select2-focus"));
                }
                this.container.addClass("select2-container-active");
            })).on("blur", this.bind(function() {
                if (!this.opened()) {
                    this.container.removeClass("select2-container-active");
                    this.opts.element.trigger($.Event("select2-blur"));
                }
            }));
            this.search.on("focus", this.bind(function(){
                if (!this.container.hasClass("select2-container-active")) {
                    this.opts.element.trigger($.Event("select2-focus"));
                }
                this.container.addClass("select2-container-active");
            }));

            this.initContainerWidth();
            this.opts.element.addClass("select2-offscreen");
            this.setPlaceholder();

        },

        // single
        clear: function(triggerChange) {
            var data=this.selection.data("select2-data");
            if (data) { // guard against queued quick consecutive clicks
                var evt = $.Event("select2-clearing");
                this.opts.element.trigger(evt);
                if (evt.isDefaultPrevented()) {
                    return;
                }
                var placeholderOption = this.getPlaceholderOption();
                this.opts.element.val(placeholderOption ? placeholderOption.val() : "");
                this.selection.find(".select2-chosen").empty();
                this.selection.removeData("select2-data");
                this.setPlaceholder();

                if (triggerChange !== false){
                    this.opts.element.trigger({ type: "select2-removed", val: this.id(data), choice: data });
                    this.triggerChange({removed:data});
                }
            }
        },

        /**
         * Sets selection based on source element's value
         */
        // single
        initSelection: function () {
            var selected;
            if (this.isPlaceholderOptionSelected()) {
                this.updateSelection(null);
                this.close();
                this.setPlaceholder();
            } else {
                var self = this;
                this.opts.initSelection.call(null, this.opts.element, function(selected){
                    if (selected !== undefined && selected !== null) {
                        self.updateSelection(selected);
                        self.close();
                        self.setPlaceholder();
                    }
                });
            }
        },

        isPlaceholderOptionSelected: function() {
            var placeholderOption;
            if (!this.getPlaceholder()) return false; // no placeholder specified so no option should be considered
            return ((placeholderOption = this.getPlaceholderOption()) !== undefined && placeholderOption.prop("selected"))
                || (this.opts.element.val() === "")
                || (this.opts.element.val() === undefined)
                || (this.opts.element.val() === null);
        },

        // single
        prepareOpts: function () {
            var opts = this.parent.prepareOpts.apply(this, arguments),
                self=this;

            if (opts.element.get(0).tagName.toLowerCase() === "select") {
                // install the selection initializer
                opts.initSelection = function (element, callback) {
                    var selected = element.find("option").filter(function() { return this.selected });
                    // a single select box always has a value, no need to null check 'selected'
                    callback(self.optionToData(selected));
                };
            } else if ("data" in opts) {
                // install default initSelection when applied to hidden input and data is local
                opts.initSelection = opts.initSelection || function (element, callback) {
                    var id = element.val();
                    //search in data by id, storing the actual matching item
                    var match = null;
                    opts.query({
                        matcher: function(term, text, el){
                            var is_match = equal(id, opts.id(el));
                            if (is_match) {
                                match = el;
                            }
                            return is_match;
                        },
                        callback: !$.isFunction(callback) ? $.noop : function() {
                            callback(match);
                        }
                    });
                };
            }

            return opts;
        },

        // single
        getPlaceholder: function() {
            // if a placeholder is specified on a single select without a valid placeholder option ignore it
            if (this.select) {
                if (this.getPlaceholderOption() === undefined) {
                    return undefined;
                }
            }

            return this.parent.getPlaceholder.apply(this, arguments);
        },

        // single
        setPlaceholder: function () {
            var placeholder = this.getPlaceholder();

            if (this.isPlaceholderOptionSelected() && placeholder !== undefined) {

                // check for a placeholder option if attached to a select
                if (this.select && this.getPlaceholderOption() === undefined) return;

                this.selection.find(".select2-chosen").html(this.opts.escapeMarkup(placeholder));

                this.selection.addClass("select2-default");

                this.container.removeClass("select2-allowclear");
            }
        },

        // single
        postprocessResults: function (data, initial, noHighlightUpdate) {
            var selected = 0, self = this, showSearchInput = true;

            // find the selected element in the result list

            this.findHighlightableChoices().each2(function (i, elm) {
                if (equal(self.id(elm.data("select2-data")), self.opts.element.val())) {
                    selected = i;
                    return false;
                }
            });

            // and highlight it
            if (noHighlightUpdate !== false) {
                if (initial === true && selected >= 0) {
                    this.highlight(selected);
                } else {
                    this.highlight(0);
                }
            }

            // hide the search box if this is the first we got the results and there are enough of them for search

            if (initial === true) {
                var min = this.opts.minimumResultsForSearch;
                if (min >= 0) {
                    this.showSearch(countResults(data.results) >= min);
                }
            }
        },

        // single
        showSearch: function(showSearchInput) {
            if (this.showSearchInput === showSearchInput) return;

            this.showSearchInput = showSearchInput;

            this.dropdown.find(".select2-search").toggleClass("select2-search-hidden", !showSearchInput);
            this.dropdown.find(".select2-search").toggleClass("select2-offscreen", !showSearchInput);
            //add "select2-with-searchbox" to the container if search box is shown
            $(this.dropdown, this.container).toggleClass("select2-with-searchbox", showSearchInput);
        },

        // single
        onSelect: function (data, options) {

            if (!this.triggerSelect(data)) { return; }

            var old = this.opts.element.val(),
                oldData = this.data();

            this.opts.element.val(this.id(data));
            this.updateSelection(data);

            this.opts.element.trigger({ type: "select2-selected", val: this.id(data), choice: data });

            this.nextSearchTerm = this.opts.nextSearchTerm(data, this.search.val());
            this.close();

            if (!options || !options.noFocus)
                this.focusser.focus();

            if (!equal(old, this.id(data))) { this.triggerChange({added:data,removed:oldData}); }
        },

        // single
        updateSelection: function (data) {

            var container=this.selection.find(".select2-chosen"), formatted, cssClass;

            this.selection.data("select2-data", data);

            container.empty();
            if (data !== null) {
                formatted=this.opts.formatSelection(data, container, this.opts.escapeMarkup);
            }
            if (formatted !== undefined) {
                container.append(formatted);
            }
            cssClass=this.opts.formatSelectionCssClass(data, container);
            if (cssClass !== undefined) {
                container.addClass(cssClass);
            }

            this.selection.removeClass("select2-default");

            if (this.opts.allowClear && this.getPlaceholder() !== undefined) {
                this.container.addClass("select2-allowclear");
            }
        },

        // single
        val: function () {
            var val,
                triggerChange = false,
                data = null,
                self = this,
                oldData = this.data();

            if (arguments.length === 0) {
                return this.opts.element.val();
            }

            val = arguments[0];

            if (arguments.length > 1) {
                triggerChange = arguments[1];
            }

            if (this.select) {
                this.select
                    .val(val)
                    .find("option").filter(function() { return this.selected }).each2(function (i, elm) {
                        data = self.optionToData(elm);
                        return false;
                    });
                this.updateSelection(data);
                this.setPlaceholder();
                if (triggerChange) {
                    this.triggerChange({added: data, removed:oldData});
                }
            } else {
                // val is an id. !val is true for [undefined,null,'',0] - 0 is legal
                if (!val && val !== 0) {
                    this.clear(triggerChange);
                    return;
                }
                if (this.opts.initSelection === undefined) {
                    throw new Error("cannot call val() if initSelection() is not defined");
                }
                this.opts.element.val(val);
                this.opts.initSelection(this.opts.element, function(data){
                    self.opts.element.val(!data ? "" : self.id(data));
                    self.updateSelection(data);
                    self.setPlaceholder();
                    if (triggerChange) {
                        self.triggerChange({added: data, removed:oldData});
                    }
                });
            }
        },

        // single
        clearSearch: function () {
            this.search.val("");
            this.focusser.val("");
        },

        // single
        data: function(value) {
            var data,
                triggerChange = false;

            if (arguments.length === 0) {
                data = this.selection.data("select2-data");
                if (data == undefined) data = null;
                return data;
            } else {
                if (arguments.length > 1) {
                    triggerChange = arguments[1];
                }
                if (!value) {
                    this.clear(triggerChange);
                } else {
                    data = this.data();
                    this.opts.element.val(!value ? "" : this.id(value));
                    this.updateSelection(value);
                    if (triggerChange) {
                        this.triggerChange({added: value, removed:data});
                    }
                }
            }
        }
    });

    MultiSelect2 = clazz(AbstractSelect2, {

        // multi
        createContainer: function () {
            var container = $(document.createElement("div")).attr({
                "class": "select2-container select2-container-multi"
            }).html([
                "<ul class='select2-choices'>",
                "  <li class='select2-search-field'>",
                "    <input type='text' autocomplete='off' autocorrect='off' autocapitalize='off' spellcheck='false' class='select2-input'>",
                "  </li>",
                "</ul>",
                "<div class='select2-drop select2-drop-multi select2-display-none'>",
                "   <ul class='select2-results'>",
                "   </ul>",
                "</div>"].join(""));
            return container;
        },

        // multi
        prepareOpts: function () {
            var opts = this.parent.prepareOpts.apply(this, arguments),
                self=this;

            // TODO validate placeholder is a string if specified

            if (opts.element.get(0).tagName.toLowerCase() === "select") {
                // install sthe selection initializer
                opts.initSelection = function (element, callback) {

                    var data = [];

                    element.find("option").filter(function() { return this.selected }).each2(function (i, elm) {
                        data.push(self.optionToData(elm));
                    });
                    callback(data);
                };
            } else if ("data" in opts) {
                // install default initSelection when applied to hidden input and data is local
                opts.initSelection = opts.initSelection || function (element, callback) {
                    var ids = splitVal(element.val(), opts.separator);
                    //search in data by array of ids, storing matching items in a list
                    var matches = [];
                    opts.query({
                        matcher: function(term, text, el){
                            var is_match = $.grep(ids, function(id) {
                                return equal(id, opts.id(el));
                            }).length;
                            if (is_match) {
                                matches.push(el);
                            }
                            return is_match;
                        },
                        callback: !$.isFunction(callback) ? $.noop : function() {
                            // reorder matches based on the order they appear in the ids array because right now
                            // they are in the order in which they appear in data array
                            var ordered = [];
                            for (var i = 0; i < ids.length; i++) {
                                var id = ids[i];
                                for (var j = 0; j < matches.length; j++) {
                                    var match = matches[j];
                                    if (equal(id, opts.id(match))) {
                                        ordered.push(match);
                                        matches.splice(j, 1);
                                        break;
                                    }
                                }
                            }
                            callback(ordered);
                        }
                    });
                };
            }

            return opts;
        },

        // multi
        selectChoice: function (choice) {

            var selected = this.container.find(".select2-search-choice-focus");
            if (selected.length && choice && choice[0] == selected[0]) {

            } else {
                if (selected.length) {
                    this.opts.element.trigger("choice-deselected", selected);
                }
                selected.removeClass("select2-search-choice-focus");
                if (choice && choice.length) {
                    this.close();
                    choice.addClass("select2-search-choice-focus");
                    this.opts.element.trigger("choice-selected", choice);
                }
            }
        },

        // multi
        destroy: function() {
            $("label[for='" + this.search.attr('id') + "']")
                .attr('for', this.opts.element.attr("id"));
            this.parent.destroy.apply(this, arguments);
        },

        // multi
        initContainer: function () {

            var selector = ".select2-choices", selection;

            this.searchContainer = this.container.find(".select2-search-field");
            this.selection = selection = this.container.find(selector);

            var _this = this;
            this.selection.on("click", ".select2-search-choice:not(.select2-locked)", function (e) {
                //killEvent(e);
                _this.search[0].focus();
                _this.selectChoice($(this));
            });

            // rewrite labels from original element to focusser
            this.search.attr("id", "s2id_autogen"+nextUid());
            $("label[for='" + this.opts.element.attr("id") + "']")
                .attr('for', this.search.attr('id'));

            this.search.on("input paste", this.bind(function() {
                if (!this.isInterfaceEnabled()) return;
                if (!this.opened()) {
                    this.open();
                }
            }));

            this.search.attr("tabindex", this.elementTabIndex);

            this.keydowns = 0;
            this.search.on("keydown", this.bind(function (e) {
                if (!this.isInterfaceEnabled()) return;

                ++this.keydowns;
                var selected = selection.find(".select2-search-choice-focus");
                var prev = selected.prev(".select2-search-choice:not(.select2-locked)");
                var next = selected.next(".select2-search-choice:not(.select2-locked)");
                var pos = getCursorInfo(this.search);

                if (selected.length &&
                    (e.which == KEY.LEFT || e.which == KEY.RIGHT || e.which == KEY.BACKSPACE || e.which == KEY.DELETE || e.which == KEY.ENTER)) {
                    var selectedChoice = selected;
                    if (e.which == KEY.LEFT && prev.length) {
                        selectedChoice = prev;
                    }
                    else if (e.which == KEY.RIGHT) {
                        selectedChoice = next.length ? next : null;
                    }
                    else if (e.which === KEY.BACKSPACE) {
                        this.unselect(selected.first());
                        this.search.width(10);
                        selectedChoice = prev.length ? prev : next;
                    } else if (e.which == KEY.DELETE) {
                        this.unselect(selected.first());
                        this.search.width(10);
                        selectedChoice = next.length ? next : null;
                    } else if (e.which == KEY.ENTER) {
                        selectedChoice = null;
                    }

                    this.selectChoice(selectedChoice);
                    killEvent(e);
                    if (!selectedChoice || !selectedChoice.length) {
                        this.open();
                    }
                    return;
                } else if (((e.which === KEY.BACKSPACE && this.keydowns == 1)
                    || e.which == KEY.LEFT) && (pos.offset == 0 && !pos.length)) {

                    this.selectChoice(selection.find(".select2-search-choice:not(.select2-locked)").last());
                    killEvent(e);
                    return;
                } else {
                    this.selectChoice(null);
                }

                if (this.opened()) {
                    switch (e.which) {
                    case KEY.UP:
                    case KEY.DOWN:
                        this.moveHighlight((e.which === KEY.UP) ? -1 : 1);
                        killEvent(e);
                        return;
                    case KEY.ENTER:
                        this.selectHighlighted();
                        killEvent(e);
                        return;
                    case KEY.TAB:
                        this.selectHighlighted({noFocus:true});
                        this.close();
                        return;
                    case KEY.ESC:
                        this.cancel(e);
                        killEvent(e);
                        return;
                    }
                }

                if (e.which === KEY.TAB || KEY.isControl(e) || KEY.isFunctionKey(e)
                 || e.which === KEY.BACKSPACE || e.which === KEY.ESC) {
                    return;
                }

                if (e.which === KEY.ENTER) {
                    if (this.opts.openOnEnter === false) {
                        return;
                    } else if (e.altKey || e.ctrlKey || e.shiftKey || e.metaKey) {
                        return;
                    }
                }

                this.open();

                if (e.which === KEY.PAGE_UP || e.which === KEY.PAGE_DOWN) {
                    // prevent the page from scrolling
                    killEvent(e);
                }

                if (e.which === KEY.ENTER) {
                    // prevent form from being submitted
                    killEvent(e);
                }

            }));

            this.search.on("keyup", this.bind(function (e) {
                this.keydowns = 0;
                this.resizeSearch();
            })
            );

            this.search.on("blur", this.bind(function(e) {
                this.container.removeClass("select2-container-active");
                this.search.removeClass("select2-focused");
                this.selectChoice(null);
                if (!this.opened()) this.clearSearch();
                e.stopImmediatePropagation();
                this.opts.element.trigger($.Event("select2-blur"));
            }));

            this.container.on("click", selector, this.bind(function (e) {
                if (!this.isInterfaceEnabled()) return;
                if ($(e.target).closest(".select2-search-choice").length > 0) {
                    // clicked inside a select2 search choice, do not open
                    return;
                }
                this.selectChoice(null);
                this.clearPlaceholder();
                if (!this.container.hasClass("select2-container-active")) {
                    this.opts.element.trigger($.Event("select2-focus"));
                }
                this.open();
                this.focusSearch();
                e.preventDefault();
            }));

            this.container.on("focus", selector, this.bind(function () {
                if (!this.isInterfaceEnabled()) return;
                if (!this.container.hasClass("select2-container-active")) {
                    this.opts.element.trigger($.Event("select2-focus"));
                }
                this.container.addClass("select2-container-active");
                this.dropdown.addClass("select2-drop-active");
                this.clearPlaceholder();
            }));

            this.initContainerWidth();
            this.opts.element.addClass("select2-offscreen");

            // set the placeholder if necessary
            this.clearSearch();
        },

        // multi
        enableInterface: function() {
            if (this.parent.enableInterface.apply(this, arguments)) {
                this.search.prop("disabled", !this.isInterfaceEnabled());
            }
        },

        // multi
        initSelection: function () {
            var data;
            if (this.opts.element.val() === "" && this.opts.element.text() === "") {
                this.updateSelection([]);
                this.close();
                // set the placeholder if necessary
                this.clearSearch();
            }
            if (this.select || this.opts.element.val() !== "") {
                var self = this;
                this.opts.initSelection.call(null, this.opts.element, function(data){
                    if (data !== undefined && data !== null) {
                        self.updateSelection(data);
                        self.close();
                        // set the placeholder if necessary
                        self.clearSearch();
                    }
                });
            }
        },

        // multi
        clearSearch: function () {
            var placeholder = this.getPlaceholder(),
                maxWidth = this.getMaxSearchWidth();

            if (placeholder !== undefined  && this.getVal().length === 0 && this.search.hasClass("select2-focused") === false) {
                this.search.val(placeholder).addClass("select2-default");
                // stretch the search box to full width of the container so as much of the placeholder is visible as possible
                // we could call this.resizeSearch(), but we do not because that requires a sizer and we do not want to create one so early because of a firefox bug, see #944
                this.search.width(maxWidth > 0 ? maxWidth : this.container.css("width"));
            } else {
                this.search.val("").width(10);
            }
        },

        // multi
        clearPlaceholder: function () {
            if (this.search.hasClass("select2-default")) {
                this.search.val("").removeClass("select2-default");
            }
        },

        // multi
        opening: function () {
            this.clearPlaceholder(); // should be done before super so placeholder is not used to search
            this.resizeSearch();

            this.parent.opening.apply(this, arguments);

            this.focusSearch();

            this.updateResults(true);
            this.search.focus();
            this.opts.element.trigger($.Event("select2-open"));
        },

        // multi
        close: function () {
            if (!this.opened()) return;
            this.parent.close.apply(this, arguments);
        },

        // multi
        focus: function () {
            this.close();
            this.search.focus();
        },

        // multi
        isFocused: function () {
            return this.search.hasClass("select2-focused");
        },

        // multi
        updateSelection: function (data) {
            var ids = [], filtered = [], self = this;

            // filter out duplicates
            $(data).each(function () {
                if (indexOf(self.id(this), ids) < 0) {
                    ids.push(self.id(this));
                    filtered.push(this);
                }
            });
            data = filtered;

            this.selection.find(".select2-search-choice").remove();
            $(data).each(function () {
                self.addSelectedChoice(this);
            });
            self.postprocessResults();
        },

        // multi
        tokenize: function() {
            var input = this.search.val();
            input = this.opts.tokenizer.call(this, input, this.data(), this.bind(this.onSelect), this.opts);
            if (input != null && input != undefined) {
                this.search.val(input);
                if (input.length > 0) {
                    this.open();
                }
            }

        },

        // multi
        onSelect: function (data, options) {

            if (!this.triggerSelect(data)) { return; }

            this.addSelectedChoice(data);

            this.opts.element.trigger({ type: "selected", val: this.id(data), choice: data });

            if (this.select || !this.opts.closeOnSelect) this.postprocessResults(data, false, this.opts.closeOnSelect===true);

            if (this.opts.closeOnSelect) {
                this.close();
                this.search.width(10);
            } else {
                if (this.countSelectableResults()>0) {
                    this.search.width(10);
                    this.resizeSearch();
                    if (this.getMaximumSelectionSize() > 0 && this.val().length >= this.getMaximumSelectionSize()) {
                        // if we reached max selection size repaint the results so choices
                        // are replaced with the max selection reached message
                        this.updateResults(true);
                    }
                    this.positionDropdown();
                } else {
                    // if nothing left to select close
                    this.close();
                    this.search.width(10);
                }
            }

            // since its not possible to select an element that has already been
            // added we do not need to check if this is a new element before firing change
            this.triggerChange({ added: data });

            if (!options || !options.noFocus)
                this.focusSearch();
        },

        // multi
        cancel: function () {
            this.close();
            this.focusSearch();
        },

        addSelectedChoice: function (data) {
            var enableChoice = !data.locked,
                enabledItem = $(
                    "<li class='select2-search-choice'>" +
                    "    <div></div>" +
                    "    <a href='#' onclick='return false;' class='select2-search-choice-close' tabindex='-1'></a>" +
                    "</li>"),
                disabledItem = $(
                    "<li class='select2-search-choice select2-locked'>" +
                    "<div></div>" +
                    "</li>");
            var choice = enableChoice ? enabledItem : disabledItem,
                id = this.id(data),
                val = this.getVal(),
                formatted,
                cssClass;

            formatted=this.opts.formatSelection(data, choice.find("div"), this.opts.escapeMarkup);
            if (formatted != undefined) {
                choice.find("div").replaceWith("<div>"+formatted+"</div>");
            }
            cssClass=this.opts.formatSelectionCssClass(data, choice.find("div"));
            if (cssClass != undefined) {
                choice.addClass(cssClass);
            }

            if(enableChoice){
              choice.find(".select2-search-choice-close")
                  .on("mousedown", killEvent)
                  .on("click dblclick", this.bind(function (e) {
                  if (!this.isInterfaceEnabled()) return;

                  $(e.target).closest(".select2-search-choice").fadeOut('fast', this.bind(function(){
                      this.unselect($(e.target));
                      this.selection.find(".select2-search-choice-focus").removeClass("select2-search-choice-focus");
                      this.close();
                      this.focusSearch();
                  })).dequeue();
                  killEvent(e);
              })).on("focus", this.bind(function () {
                  if (!this.isInterfaceEnabled()) return;
                  this.container.addClass("select2-container-active");
                  this.dropdown.addClass("select2-drop-active");
              }));
            }

            choice.data("select2-data", data);
            choice.insertBefore(this.searchContainer);

            val.push(id);
            this.setVal(val);
        },

        // multi
        unselect: function (selected) {
            var val = this.getVal(),
                data,
                index;
            selected = selected.closest(".select2-search-choice");

            if (selected.length === 0) {
                throw "Invalid argument: " + selected + ". Must be .select2-search-choice";
            }

            data = selected.data("select2-data");

            if (!data) {
                // prevent a race condition when the 'x' is clicked really fast repeatedly the event can be queued
                // and invoked on an element already removed
                return;
            }

            while((index = indexOf(this.id(data), val)) >= 0) {
                val.splice(index, 1);
                this.setVal(val);
                if (this.select) this.postprocessResults();
            }

            var evt = $.Event("select2-removing");
            evt.val = this.id(data);
            evt.choice = data;
            this.opts.element.trigger(evt);

            if (evt.isDefaultPrevented()) {
                return;
            }

            selected.remove();

            this.opts.element.trigger({ type: "select2-removed", val: this.id(data), choice: data });
            this.triggerChange({ removed: data });
        },

        // multi
        postprocessResults: function (data, initial, noHighlightUpdate) {
            var val = this.getVal(),
                choices = this.results.find(".select2-result"),
                compound = this.results.find(".select2-result-with-children"),
                self = this;

            choices.each2(function (i, choice) {
                var id = self.id(choice.data("select2-data"));
                if (indexOf(id, val) >= 0) {
                    choice.addClass("select2-selected");
                    // mark all children of the selected parent as selected
                    choice.find(".select2-result-selectable").addClass("select2-selected");
                }
            });

            compound.each2(function(i, choice) {
                // hide an optgroup if it doesnt have any selectable children
                if (!choice.is('.select2-result-selectable')
                    && choice.find(".select2-result-selectable:not(.select2-selected)").length === 0) {
                    choice.addClass("select2-selected");
                }
            });

            if (this.highlight() == -1 && noHighlightUpdate !== false){
                self.highlight(0);
            }

            //If all results are chosen render formatNoMAtches
            if(!this.opts.createSearchChoice && !choices.filter('.select2-result:not(.select2-selected)').length > 0){
                if(!data || data && !data.more && this.results.find(".select2-no-results").length === 0) {
                    if (checkFormatter(self.opts.formatNoMatches, "formatNoMatches")) {
                        this.results.append("<li class='select2-no-results'>" + self.opts.formatNoMatches(self.search.val()) + "</li>");
                    }
                }
            }

        },

        // multi
        getMaxSearchWidth: function() {
            return this.selection.width() - getSideBorderPadding(this.search);
        },

        // multi
        resizeSearch: function () {
            var minimumWidth, left, maxWidth, containerLeft, searchWidth,
                sideBorderPadding = getSideBorderPadding(this.search);

            minimumWidth = measureTextWidth(this.search) + 10;

            left = this.search.offset().left;

            maxWidth = this.selection.width();
            containerLeft = this.selection.offset().left;

            searchWidth = maxWidth - (left - containerLeft) - sideBorderPadding;

            if (searchWidth < minimumWidth) {
                searchWidth = maxWidth - sideBorderPadding;
            }

            if (searchWidth < 40) {
                searchWidth = maxWidth - sideBorderPadding;
            }

            if (searchWidth <= 0) {
              searchWidth = minimumWidth;
            }

            this.search.width(Math.floor(searchWidth));
        },

        // multi
        getVal: function () {
            var val;
            if (this.select) {
                val = this.select.val();
                return val === null ? [] : val;
            } else {
                val = this.opts.element.val();
                return splitVal(val, this.opts.separator);
            }
        },

        // multi
        setVal: function (val) {
            var unique;
            if (this.select) {
                this.select.val(val);
            } else {
                unique = [];
                // filter out duplicates
                $(val).each(function () {
                    if (indexOf(this, unique) < 0) unique.push(this);
                });
                this.opts.element.val(unique.length === 0 ? "" : unique.join(this.opts.separator));
            }
        },

        // multi
        buildChangeDetails: function (old, current) {
            var current = current.slice(0),
                old = old.slice(0);

            // remove intersection from each array
            for (var i = 0; i < current.length; i++) {
                for (var j = 0; j < old.length; j++) {
                    if (equal(this.opts.id(current[i]), this.opts.id(old[j]))) {
                        current.splice(i, 1);
                        if(i>0){
                        	i--;
                        }
                        old.splice(j, 1);
                        j--;
                    }
                }
            }

            return {added: current, removed: old};
        },


        // multi
        val: function (val, triggerChange) {
            var oldData, self=this;

            if (arguments.length === 0) {
                return this.getVal();
            }

            oldData=this.data();
            if (!oldData.length) oldData=[];

            // val is an id. !val is true for [undefined,null,'',0] - 0 is legal
            if (!val && val !== 0) {
                this.opts.element.val("");
                this.updateSelection([]);
                this.clearSearch();
                if (triggerChange) {
                    this.triggerChange({added: this.data(), removed: oldData});
                }
                return;
            }

            // val is a list of ids
            this.setVal(val);

            if (this.select) {
                this.opts.initSelection(this.select, this.bind(this.updateSelection));
                if (triggerChange) {
                    this.triggerChange(this.buildChangeDetails(oldData, this.data()));
                }
            } else {
                if (this.opts.initSelection === undefined) {
                    throw new Error("val() cannot be called if initSelection() is not defined");
                }

                this.opts.initSelection(this.opts.element, function(data){
                    var ids=$.map(data, self.id);
                    self.setVal(ids);
                    self.updateSelection(data);
                    self.clearSearch();
                    if (triggerChange) {
                        self.triggerChange(self.buildChangeDetails(oldData, self.data()));
                    }
                });
            }
            this.clearSearch();
        },

        // multi
        onSortStart: function() {
            if (this.select) {
                throw new Error("Sorting of elements is not supported when attached to <select>. Attach to <input type='hidden'/> instead.");
            }

            // collapse search field into 0 width so its container can be collapsed as well
            this.search.width(0);
            // hide the container
            this.searchContainer.hide();
        },

        // multi
        onSortEnd:function() {

            var val=[], self=this;

            // show search and move it to the end of the list
            this.searchContainer.show();
            // make sure the search container is the last item in the list
            this.searchContainer.appendTo(this.searchContainer.parent());
            // since we collapsed the width in dragStarted, we resize it here
            this.resizeSearch();

            // update selection
            this.selection.find(".select2-search-choice").each(function() {
                val.push(self.opts.id($(this).data("select2-data")));
            });
            this.setVal(val);
            this.triggerChange();
        },

        // multi
        data: function(values, triggerChange) {
            var self=this, ids, old;
            if (arguments.length === 0) {
                 return this.selection
                     .find(".select2-search-choice")
                     .map(function() { return $(this).data("select2-data"); })
                     .get();
            } else {
                old = this.data();
                if (!values) { values = []; }
                ids = $.map(values, function(e) { return self.opts.id(e); });
                this.setVal(ids);
                this.updateSelection(values);
                this.clearSearch();
                if (triggerChange) {
                    this.triggerChange(this.buildChangeDetails(old, this.data()));
                }
            }
        }
    });

    $.fn.select2 = function () {

        var args = Array.prototype.slice.call(arguments, 0),
            opts,
            select2,
            method, value, multiple,
            allowedMethods = ["val", "destroy", "opened", "open", "close", "focus", "isFocused", "container", "dropdown", "onSortStart", "onSortEnd", "enable", "disable", "readonly", "positionDropdown", "data", "search"],
            valueMethods = ["opened", "isFocused", "container", "dropdown"],
            propertyMethods = ["val", "data"],
            methodsMap = { search: "externalSearch" };

        this.each(function () {
            if (args.length === 0 || typeof(args[0]) === "object") {
                opts = args.length === 0 ? {} : $.extend({}, args[0]);
                opts.element = $(this);

                if (opts.element.get(0).tagName.toLowerCase() === "select") {
                    multiple = opts.element.prop("multiple");
                } else {
                    multiple = opts.multiple || false;
                    if ("tags" in opts) {opts.multiple = multiple = true;}
                }

                select2 = multiple ? new MultiSelect2() : new SingleSelect2();
                select2.init(opts);
            } else if (typeof(args[0]) === "string") {

                if (indexOf(args[0], allowedMethods) < 0) {
                    throw "Unknown method: " + args[0];
                }

                value = undefined;
                select2 = $(this).data("select2");
                if (select2 === undefined) return;

                method=args[0];

                if (method === "container") {
                    value = select2.container;
                } else if (method === "dropdown") {
                    value = select2.dropdown;
                } else {
                    if (methodsMap[method]) method = methodsMap[method];

                    value = select2[method].apply(select2, args.slice(1));
                }
                if (indexOf(args[0], valueMethods) >= 0
                    || (indexOf(args[0], propertyMethods) && args.length == 1)) {
                    return false; // abort the iteration, ready to return first matched value
                }
            } else {
                throw "Invalid arguments to select2 plugin: " + args;
            }
        });
        return (value === undefined) ? this : value;
    };

    // plugin defaults, accessible to users
    $.fn.select2.defaults = {
        width: "copy",
        loadMorePadding: 0,
        closeOnSelect: true,
        openOnEnter: true,
        containerCss: {},
        dropdownCss: {},
        containerCssClass: "",
        dropdownCssClass: "",
        formatResult: function(result, container, query, escapeMarkup) {
            var markup=[];
            markMatch(result.text, query.term, markup, escapeMarkup);
            return markup.join("");
        },
        formatSelection: function (data, container, escapeMarkup) {
            return data ? escapeMarkup(data.text) : undefined;
        },
        sortResults: function (results, container, query) {
            return results;
        },
        formatResultCssClass: function(data) {return undefined;},
        formatSelectionCssClass: function(data, container) {return undefined;},
        formatNoMatches: function () { return "No matches found"; },
        formatInputTooShort: function (input, min) { var n = min - input.length; return "Please enter " + n + " more character" + (n == 1? "" : "s"); },
        formatInputTooLong: function (input, max) { var n = input.length - max; return "Please delete " + n + " character" + (n == 1? "" : "s"); },
        formatSelectionTooBig: function (limit) { return "You can only select " + limit + " item" + (limit == 1 ? "" : "s"); },
        formatLoadMore: function (pageNumber) { return "Loading more results..."; },
        formatSearching: function () { return "Searching..."; },
        minimumResultsForSearch: 0,
        minimumInputLength: 0,
        maximumInputLength: null,
        maximumSelectionSize: 0,
        id: function (e) { return e.id; },
        matcher: function(term, text) {
            return stripDiacritics(''+text).toUpperCase().indexOf(stripDiacritics(''+term).toUpperCase()) >= 0;
        },
        separator: ",",
        tokenSeparators: [],
        tokenizer: defaultTokenizer,
        escapeMarkup: defaultEscapeMarkup,
        blurOnChange: false,
        selectOnBlur: false,
        adaptContainerCssClass: function(c) { return c; },
        adaptDropdownCssClass: function(c) { return null; },
        nextSearchTerm: function(selectedObject, currentSearchTerm) { return undefined; }
    };

    $.fn.select2.ajaxDefaults = {
        transport: $.ajax,
        params: {
            type: "GET",
            cache: false,
            dataType: "json"
        }
    };

    // exports
    window.Select2 = {
        query: {
            ajax: ajax,
            local: local,
            tags: tags
        }, util: {
            debounce: debounce,
            markMatch: markMatch,
            escapeMarkup: defaultEscapeMarkup,
            stripDiacritics: stripDiacritics
        }, "class": {
            "abstract": AbstractSelect2,
            "single": SingleSelect2,
            "multi": MultiSelect2
        }
    };

}(jQuery));

// bower_components/moment/moment.js
//! moment.js
//! version : 2.4.0
//! authors : Tim Wood, Iskren Chernev, Moment.js contributors
//! license : MIT
//! momentjs.com

(function (undefined) {

    /************************************
        Constants
    ************************************/

    var moment,
        VERSION = "2.4.0",
        round = Math.round,
        i,

        YEAR = 0,
        MONTH = 1,
        DATE = 2,
        HOUR = 3,
        MINUTE = 4,
        SECOND = 5,
        MILLISECOND = 6,

        // internal storage for language config files
        languages = {},

        // check for nodeJS
        hasModule = (typeof module !== 'undefined' && module.exports),

        // ASP.NET json date format regex
        aspNetJsonRegex = /^\/?Date\((\-?\d+)/i,
        aspNetTimeSpanJsonRegex = /(\-)?(?:(\d*)\.)?(\d+)\:(\d+)(?:\:(\d+)\.?(\d{3})?)?/,

        // from http://docs.closure-library.googlecode.com/git/closure_goog_date_date.js.source.html
        // somewhat more in line with 4.4.3.2 2004 spec, but allows decimal anywhere
        isoDurationRegex = /^(-)?P(?:(?:([0-9,.]*)Y)?(?:([0-9,.]*)M)?(?:([0-9,.]*)D)?(?:T(?:([0-9,.]*)H)?(?:([0-9,.]*)M)?(?:([0-9,.]*)S)?)?|([0-9,.]*)W)$/,

        // format tokens
        formattingTokens = /(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|mm?|ss?|S{1,4}|X|zz?|ZZ?|.)/g,
        localFormattingTokens = /(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,

        // parsing token regexes
        parseTokenOneOrTwoDigits = /\d\d?/, // 0 - 99
        parseTokenOneToThreeDigits = /\d{1,3}/, // 0 - 999
        parseTokenThreeDigits = /\d{3}/, // 000 - 999
        parseTokenFourDigits = /\d{1,4}/, // 0 - 9999
        parseTokenSixDigits = /[+\-]?\d{1,6}/, // -999,999 - 999,999
        parseTokenDigits = /\d+/, // nonzero number of digits
        parseTokenWord = /[0-9]*['a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF\/]+(\s*?[\u0600-\u06FF]+){1,2}/i, // any word (or two) characters or numbers including two/three word month in arabic.
        parseTokenTimezone = /Z|[\+\-]\d\d:?\d\d/i, // +00:00 -00:00 +0000 -0000 or Z
        parseTokenT = /T/i, // T (ISO seperator)
        parseTokenTimestampMs = /[\+\-]?\d+(\.\d{1,3})?/, // 123456789 123456789.123

        // preliminary iso regex
        // 0000-00-00 0000-W00 or 0000-W00-0 + T + 00 or 00:00 or 00:00:00 or 00:00:00.000 + +00:00 or +0000)
        isoRegex = /^\s*\d{4}-(?:(\d\d-\d\d)|(W\d\d$)|(W\d\d-\d)|(\d\d\d))((T| )(\d\d(:\d\d(:\d\d(\.\d+)?)?)?)?([\+\-]\d\d:?\d\d|Z)?)?$/,

        isoFormat = 'YYYY-MM-DDTHH:mm:ssZ',

        isoDates = [
            'YYYY-MM-DD',
            'GGGG-[W]WW',
            'GGGG-[W]WW-E',
            'YYYY-DDD'
        ],

        // iso time formats and regexes
        isoTimes = [
            ['HH:mm:ss.SSSS', /(T| )\d\d:\d\d:\d\d\.\d{1,3}/],
            ['HH:mm:ss', /(T| )\d\d:\d\d:\d\d/],
            ['HH:mm', /(T| )\d\d:\d\d/],
            ['HH', /(T| )\d\d/]
        ],

        // timezone chunker "+10:00" > ["10", "00"] or "-1530" > ["-15", "30"]
        parseTimezoneChunker = /([\+\-]|\d\d)/gi,

        // getter and setter names
        proxyGettersAndSetters = 'Date|Hours|Minutes|Seconds|Milliseconds'.split('|'),
        unitMillisecondFactors = {
            'Milliseconds' : 1,
            'Seconds' : 1e3,
            'Minutes' : 6e4,
            'Hours' : 36e5,
            'Days' : 864e5,
            'Months' : 2592e6,
            'Years' : 31536e6
        },

        unitAliases = {
            ms : 'millisecond',
            s : 'second',
            m : 'minute',
            h : 'hour',
            d : 'day',
            D : 'date',
            w : 'week',
            W : 'isoWeek',
            M : 'month',
            y : 'year',
            DDD : 'dayOfYear',
            e : 'weekday',
            E : 'isoWeekday',
            gg: 'weekYear',
            GG: 'isoWeekYear'
        },

        camelFunctions = {
            dayofyear : 'dayOfYear',
            isoweekday : 'isoWeekday',
            isoweek : 'isoWeek',
            weekyear : 'weekYear',
            isoweekyear : 'isoWeekYear'
        },

        // format function strings
        formatFunctions = {},

        // tokens to ordinalize and pad
        ordinalizeTokens = 'DDD w W M D d'.split(' '),
        paddedTokens = 'M D H h m s w W'.split(' '),

        formatTokenFunctions = {
            M    : function () {
                return this.month() + 1;
            },
            MMM  : function (format) {
                return this.lang().monthsShort(this, format);
            },
            MMMM : function (format) {
                return this.lang().months(this, format);
            },
            D    : function () {
                return this.date();
            },
            DDD  : function () {
                return this.dayOfYear();
            },
            d    : function () {
                return this.day();
            },
            dd   : function (format) {
                return this.lang().weekdaysMin(this, format);
            },
            ddd  : function (format) {
                return this.lang().weekdaysShort(this, format);
            },
            dddd : function (format) {
                return this.lang().weekdays(this, format);
            },
            w    : function () {
                return this.week();
            },
            W    : function () {
                return this.isoWeek();
            },
            YY   : function () {
                return leftZeroFill(this.year() % 100, 2);
            },
            YYYY : function () {
                return leftZeroFill(this.year(), 4);
            },
            YYYYY : function () {
                return leftZeroFill(this.year(), 5);
            },
            gg   : function () {
                return leftZeroFill(this.weekYear() % 100, 2);
            },
            gggg : function () {
                return this.weekYear();
            },
            ggggg : function () {
                return leftZeroFill(this.weekYear(), 5);
            },
            GG   : function () {
                return leftZeroFill(this.isoWeekYear() % 100, 2);
            },
            GGGG : function () {
                return this.isoWeekYear();
            },
            GGGGG : function () {
                return leftZeroFill(this.isoWeekYear(), 5);
            },
            e : function () {
                return this.weekday();
            },
            E : function () {
                return this.isoWeekday();
            },
            a    : function () {
                return this.lang().meridiem(this.hours(), this.minutes(), true);
            },
            A    : function () {
                return this.lang().meridiem(this.hours(), this.minutes(), false);
            },
            H    : function () {
                return this.hours();
            },
            h    : function () {
                return this.hours() % 12 || 12;
            },
            m    : function () {
                return this.minutes();
            },
            s    : function () {
                return this.seconds();
            },
            S    : function () {
                return toInt(this.milliseconds() / 100);
            },
            SS   : function () {
                return leftZeroFill(toInt(this.milliseconds() / 10), 2);
            },
            SSS  : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            SSSS : function () {
                return leftZeroFill(this.milliseconds(), 3);
            },
            Z    : function () {
                var a = -this.zone(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-";
                }
                return b + leftZeroFill(toInt(a / 60), 2) + ":" + leftZeroFill(toInt(a) % 60, 2);
            },
            ZZ   : function () {
                var a = -this.zone(),
                    b = "+";
                if (a < 0) {
                    a = -a;
                    b = "-";
                }
                return b + leftZeroFill(toInt(10 * a / 6), 4);
            },
            z : function () {
                return this.zoneAbbr();
            },
            zz : function () {
                return this.zoneName();
            },
            X    : function () {
                return this.unix();
            }
        },

        lists = ['months', 'monthsShort', 'weekdays', 'weekdaysShort', 'weekdaysMin'];

    function padToken(func, count) {
        return function (a) {
            return leftZeroFill(func.call(this, a), count);
        };
    }
    function ordinalizeToken(func, period) {
        return function (a) {
            return this.lang().ordinal(func.call(this, a), period);
        };
    }

    while (ordinalizeTokens.length) {
        i = ordinalizeTokens.pop();
        formatTokenFunctions[i + 'o'] = ordinalizeToken(formatTokenFunctions[i], i);
    }
    while (paddedTokens.length) {
        i = paddedTokens.pop();
        formatTokenFunctions[i + i] = padToken(formatTokenFunctions[i], 2);
    }
    formatTokenFunctions.DDDD = padToken(formatTokenFunctions.DDD, 3);


    /************************************
        Constructors
    ************************************/

    function Language() {

    }

    // Moment prototype object
    function Moment(config) {
        checkOverflow(config);
        extend(this, config);
    }

    // Duration Constructor
    function Duration(duration) {
        var normalizedInput = normalizeObjectUnits(duration),
            years = normalizedInput.year || 0,
            months = normalizedInput.month || 0,
            weeks = normalizedInput.week || 0,
            days = normalizedInput.day || 0,
            hours = normalizedInput.hour || 0,
            minutes = normalizedInput.minute || 0,
            seconds = normalizedInput.second || 0,
            milliseconds = normalizedInput.millisecond || 0;

        // store reference to input for deterministic cloning
        this._input = duration;

        // representation for dateAddRemove
        this._milliseconds = +milliseconds +
            seconds * 1e3 + // 1000
            minutes * 6e4 + // 1000 * 60
            hours * 36e5; // 1000 * 60 * 60
        // Because of dateAddRemove treats 24 hours as different from a
        // day when working around DST, we need to store them separately
        this._days = +days +
            weeks * 7;
        // It is impossible translate months into days without knowing
        // which months you are are talking about, so we have to store
        // it separately.
        this._months = +months +
            years * 12;

        this._data = {};

        this._bubble();
    }

    /************************************
        Helpers
    ************************************/


    function extend(a, b) {
        for (var i in b) {
            if (b.hasOwnProperty(i)) {
                a[i] = b[i];
            }
        }

        if (b.hasOwnProperty("toString")) {
            a.toString = b.toString;
        }

        if (b.hasOwnProperty("valueOf")) {
            a.valueOf = b.valueOf;
        }

        return a;
    }

    function absRound(number) {
        if (number < 0) {
            return Math.ceil(number);
        } else {
            return Math.floor(number);
        }
    }

    // left zero fill a number
    // see http://jsperf.com/left-zero-filling for performance comparison
    function leftZeroFill(number, targetLength) {
        var output = number + '';
        while (output.length < targetLength) {
            output = '0' + output;
        }
        return output;
    }

    // helper function for _.addTime and _.subtractTime
    function addOrSubtractDurationFromMoment(mom, duration, isAdding, ignoreUpdateOffset) {
        var milliseconds = duration._milliseconds,
            days = duration._days,
            months = duration._months,
            minutes,
            hours;

        if (milliseconds) {
            mom._d.setTime(+mom._d + milliseconds * isAdding);
        }
        // store the minutes and hours so we can restore them
        if (days || months) {
            minutes = mom.minute();
            hours = mom.hour();
        }
        if (days) {
            mom.date(mom.date() + days * isAdding);
        }
        if (months) {
            mom.month(mom.month() + months * isAdding);
        }
        if (milliseconds && !ignoreUpdateOffset) {
            moment.updateOffset(mom);
        }
        // restore the minutes and hours after possibly changing dst
        if (days || months) {
            mom.minute(minutes);
            mom.hour(hours);
        }
    }

    // check if is an array
    function isArray(input) {
        return Object.prototype.toString.call(input) === '[object Array]';
    }

    function isDate(input) {
        return  Object.prototype.toString.call(input) === '[object Date]' ||
                input instanceof Date;
    }

    // compare two arrays, return the number of differences
    function compareArrays(array1, array2, dontConvert) {
        var len = Math.min(array1.length, array2.length),
            lengthDiff = Math.abs(array1.length - array2.length),
            diffs = 0,
            i;
        for (i = 0; i < len; i++) {
            if ((dontConvert && array1[i] !== array2[i]) ||
                (!dontConvert && toInt(array1[i]) !== toInt(array2[i]))) {
                diffs++;
            }
        }
        return diffs + lengthDiff;
    }

    function normalizeUnits(units) {
        if (units) {
            var lowered = units.toLowerCase().replace(/(.)s$/, '$1');
            units = unitAliases[units] || camelFunctions[lowered] || lowered;
        }
        return units;
    }

    function normalizeObjectUnits(inputObject) {
        var normalizedInput = {},
            normalizedProp,
            prop,
            index;

        for (prop in inputObject) {
            if (inputObject.hasOwnProperty(prop)) {
                normalizedProp = normalizeUnits(prop);
                if (normalizedProp) {
                    normalizedInput[normalizedProp] = inputObject[prop];
                }
            }
        }

        return normalizedInput;
    }

    function makeList(field) {
        var count, setter;

        if (field.indexOf('week') === 0) {
            count = 7;
            setter = 'day';
        }
        else if (field.indexOf('month') === 0) {
            count = 12;
            setter = 'month';
        }
        else {
            return;
        }

        moment[field] = function (format, index) {
            var i, getter,
                method = moment.fn._lang[field],
                results = [];

            if (typeof format === 'number') {
                index = format;
                format = undefined;
            }

            getter = function (i) {
                var m = moment().utc().set(setter, i);
                return method.call(moment.fn._lang, m, format || '');
            };

            if (index != null) {
                return getter(index);
            }
            else {
                for (i = 0; i < count; i++) {
                    results.push(getter(i));
                }
                return results;
            }
        };
    }

    function toInt(argumentForCoercion) {
        var coercedNumber = +argumentForCoercion,
            value = 0;

        if (coercedNumber !== 0 && isFinite(coercedNumber)) {
            if (coercedNumber >= 0) {
                value = Math.floor(coercedNumber);
            } else {
                value = Math.ceil(coercedNumber);
            }
        }

        return value;
    }

    function daysInMonth(year, month) {
        return new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    }

    function daysInYear(year) {
        return isLeapYear(year) ? 366 : 365;
    }

    function isLeapYear(year) {
        return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    }

    function checkOverflow(m) {
        var overflow;
        if (m._a && m._pf.overflow === -2) {
            overflow =
                m._a[MONTH] < 0 || m._a[MONTH] > 11 ? MONTH :
                m._a[DATE] < 1 || m._a[DATE] > daysInMonth(m._a[YEAR], m._a[MONTH]) ? DATE :
                m._a[HOUR] < 0 || m._a[HOUR] > 23 ? HOUR :
                m._a[MINUTE] < 0 || m._a[MINUTE] > 59 ? MINUTE :
                m._a[SECOND] < 0 || m._a[SECOND] > 59 ? SECOND :
                m._a[MILLISECOND] < 0 || m._a[MILLISECOND] > 999 ? MILLISECOND :
                -1;

            if (m._pf._overflowDayOfYear && (overflow < YEAR || overflow > DATE)) {
                overflow = DATE;
            }

            m._pf.overflow = overflow;
        }
    }

    function initializeParsingFlags(config) {
        config._pf = {
            empty : false,
            unusedTokens : [],
            unusedInput : [],
            overflow : -2,
            charsLeftOver : 0,
            nullInput : false,
            invalidMonth : null,
            invalidFormat : false,
            userInvalidated : false,
            iso: false
        };
    }

    function isValid(m) {
        if (m._isValid == null) {
            m._isValid = !isNaN(m._d.getTime()) &&
                m._pf.overflow < 0 &&
                !m._pf.empty &&
                !m._pf.invalidMonth &&
                !m._pf.nullInput &&
                !m._pf.invalidFormat &&
                !m._pf.userInvalidated;

            if (m._strict) {
                m._isValid = m._isValid &&
                    m._pf.charsLeftOver === 0 &&
                    m._pf.unusedTokens.length === 0;
            }
        }
        return m._isValid;
    }

    function normalizeLanguage(key) {
        return key ? key.toLowerCase().replace('_', '-') : key;
    }

    /************************************
        Languages
    ************************************/


    extend(Language.prototype, {

        set : function (config) {
            var prop, i;
            for (i in config) {
                prop = config[i];
                if (typeof prop === 'function') {
                    this[i] = prop;
                } else {
                    this['_' + i] = prop;
                }
            }
        },

        _months : "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        months : function (m) {
            return this._months[m.month()];
        },

        _monthsShort : "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
        monthsShort : function (m) {
            return this._monthsShort[m.month()];
        },

        monthsParse : function (monthName) {
            var i, mom, regex;

            if (!this._monthsParse) {
                this._monthsParse = [];
            }

            for (i = 0; i < 12; i++) {
                // make the regex if we don't have it already
                if (!this._monthsParse[i]) {
                    mom = moment.utc([2000, i]);
                    regex = '^' + this.months(mom, '') + '|^' + this.monthsShort(mom, '');
                    this._monthsParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._monthsParse[i].test(monthName)) {
                    return i;
                }
            }
        },

        _weekdays : "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        weekdays : function (m) {
            return this._weekdays[m.day()];
        },

        _weekdaysShort : "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
        weekdaysShort : function (m) {
            return this._weekdaysShort[m.day()];
        },

        _weekdaysMin : "Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
        weekdaysMin : function (m) {
            return this._weekdaysMin[m.day()];
        },

        weekdaysParse : function (weekdayName) {
            var i, mom, regex;

            if (!this._weekdaysParse) {
                this._weekdaysParse = [];
            }

            for (i = 0; i < 7; i++) {
                // make the regex if we don't have it already
                if (!this._weekdaysParse[i]) {
                    mom = moment([2000, 1]).day(i);
                    regex = '^' + this.weekdays(mom, '') + '|^' + this.weekdaysShort(mom, '') + '|^' + this.weekdaysMin(mom, '');
                    this._weekdaysParse[i] = new RegExp(regex.replace('.', ''), 'i');
                }
                // test the regex
                if (this._weekdaysParse[i].test(weekdayName)) {
                    return i;
                }
            }
        },

        _longDateFormat : {
            LT : "h:mm A",
            L : "MM/DD/YYYY",
            LL : "MMMM D YYYY",
            LLL : "MMMM D YYYY LT",
            LLLL : "dddd, MMMM D YYYY LT"
        },
        longDateFormat : function (key) {
            var output = this._longDateFormat[key];
            if (!output && this._longDateFormat[key.toUpperCase()]) {
                output = this._longDateFormat[key.toUpperCase()].replace(/MMMM|MM|DD|dddd/g, function (val) {
                    return val.slice(1);
                });
                this._longDateFormat[key] = output;
            }
            return output;
        },

        isPM : function (input) {
            // IE8 Quirks Mode & IE7 Standards Mode do not allow accessing strings like arrays
            // Using charAt should be more compatible.
            return ((input + '').toLowerCase().charAt(0) === 'p');
        },

        _meridiemParse : /[ap]\.?m?\.?/i,
        meridiem : function (hours, minutes, isLower) {
            if (hours > 11) {
                return isLower ? 'pm' : 'PM';
            } else {
                return isLower ? 'am' : 'AM';
            }
        },

        _calendar : {
            sameDay : '[Today at] LT',
            nextDay : '[Tomorrow at] LT',
            nextWeek : 'dddd [at] LT',
            lastDay : '[Yesterday at] LT',
            lastWeek : '[Last] dddd [at] LT',
            sameElse : 'L'
        },
        calendar : function (key, mom) {
            var output = this._calendar[key];
            return typeof output === 'function' ? output.apply(mom) : output;
        },

        _relativeTime : {
            future : "in %s",
            past : "%s ago",
            s : "a few seconds",
            m : "a minute",
            mm : "%d minutes",
            h : "an hour",
            hh : "%d hours",
            d : "a day",
            dd : "%d days",
            M : "a month",
            MM : "%d months",
            y : "a year",
            yy : "%d years"
        },
        relativeTime : function (number, withoutSuffix, string, isFuture) {
            var output = this._relativeTime[string];
            return (typeof output === 'function') ?
                output(number, withoutSuffix, string, isFuture) :
                output.replace(/%d/i, number);
        },
        pastFuture : function (diff, output) {
            var format = this._relativeTime[diff > 0 ? 'future' : 'past'];
            return typeof format === 'function' ? format(output) : format.replace(/%s/i, output);
        },

        ordinal : function (number) {
            return this._ordinal.replace("%d", number);
        },
        _ordinal : "%d",

        preparse : function (string) {
            return string;
        },

        postformat : function (string) {
            return string;
        },

        week : function (mom) {
            return weekOfYear(mom, this._week.dow, this._week.doy).week;
        },

        _week : {
            dow : 0, // Sunday is the first day of the week.
            doy : 6  // The week that contains Jan 1st is the first week of the year.
        },

        _invalidDate: 'Invalid date',
        invalidDate: function () {
            return this._invalidDate;
        }
    });

    // Loads a language definition into the `languages` cache.  The function
    // takes a key and optionally values.  If not in the browser and no values
    // are provided, it will load the language file module.  As a convenience,
    // this function also returns the language values.
    function loadLang(key, values) {
        values.abbr = key;
        if (!languages[key]) {
            languages[key] = new Language();
        }
        languages[key].set(values);
        return languages[key];
    }

    // Remove a language from the `languages` cache. Mostly useful in tests.
    function unloadLang(key) {
        delete languages[key];
    }

    // Determines which language definition to use and returns it.
    //
    // With no parameters, it will return the global language.  If you
    // pass in a language key, such as 'en', it will return the
    // definition for 'en', so long as 'en' has already been loaded using
    // moment.lang.
    function getLangDefinition(key) {
        var i = 0, j, lang, next, split,
            get = function (k) {
                if (!languages[k] && hasModule) {
                    try {
                        require('./lang/' + k);
                    } catch (e) { }
                }
                return languages[k];
            };

        if (!key) {
            return moment.fn._lang;
        }

        if (!isArray(key)) {
            //short-circuit everything else
            lang = get(key);
            if (lang) {
                return lang;
            }
            key = [key];
        }

        //pick the language from the array
        //try ['en-au', 'en-gb'] as 'en-au', 'en-gb', 'en', as in move through the list trying each
        //substring from most specific to least, but move to the next array item if it's a more specific variant than the current root
        while (i < key.length) {
            split = normalizeLanguage(key[i]).split('-');
            j = split.length;
            next = normalizeLanguage(key[i + 1]);
            next = next ? next.split('-') : null;
            while (j > 0) {
                lang = get(split.slice(0, j).join('-'));
                if (lang) {
                    return lang;
                }
                if (next && next.length >= j && compareArrays(split, next, true) >= j - 1) {
                    //the next array item is better than a shallower substring of this one
                    break;
                }
                j--;
            }
            i++;
        }
        return moment.fn._lang;
    }

    /************************************
        Formatting
    ************************************/


    function removeFormattingTokens(input) {
        if (input.match(/\[[\s\S]/)) {
            return input.replace(/^\[|\]$/g, "");
        }
        return input.replace(/\\/g, "");
    }

    function makeFormatFunction(format) {
        var array = format.match(formattingTokens), i, length;

        for (i = 0, length = array.length; i < length; i++) {
            if (formatTokenFunctions[array[i]]) {
                array[i] = formatTokenFunctions[array[i]];
            } else {
                array[i] = removeFormattingTokens(array[i]);
            }
        }

        return function (mom) {
            var output = "";
            for (i = 0; i < length; i++) {
                output += array[i] instanceof Function ? array[i].call(mom, format) : array[i];
            }
            return output;
        };
    }

    // format date using native date object
    function formatMoment(m, format) {

        if (!m.isValid()) {
            return m.lang().invalidDate();
        }

        format = expandFormat(format, m.lang());

        if (!formatFunctions[format]) {
            formatFunctions[format] = makeFormatFunction(format);
        }

        return formatFunctions[format](m);
    }

    function expandFormat(format, lang) {
        var i = 5;

        function replaceLongDateFormatTokens(input) {
            return lang.longDateFormat(input) || input;
        }

        localFormattingTokens.lastIndex = 0;
        while (i >= 0 && localFormattingTokens.test(format)) {
            format = format.replace(localFormattingTokens, replaceLongDateFormatTokens);
            localFormattingTokens.lastIndex = 0;
            i -= 1;
        }

        return format;
    }


    /************************************
        Parsing
    ************************************/


    // get the regex to find the next token
    function getParseRegexForToken(token, config) {
        var a;
        switch (token) {
        case 'DDDD':
            return parseTokenThreeDigits;
        case 'YYYY':
        case 'GGGG':
        case 'gggg':
            return parseTokenFourDigits;
        case 'YYYYY':
        case 'GGGGG':
        case 'ggggg':
            return parseTokenSixDigits;
        case 'S':
        case 'SS':
        case 'SSS':
        case 'DDD':
            return parseTokenOneToThreeDigits;
        case 'MMM':
        case 'MMMM':
        case 'dd':
        case 'ddd':
        case 'dddd':
            return parseTokenWord;
        case 'a':
        case 'A':
            return getLangDefinition(config._l)._meridiemParse;
        case 'X':
            return parseTokenTimestampMs;
        case 'Z':
        case 'ZZ':
            return parseTokenTimezone;
        case 'T':
            return parseTokenT;
        case 'SSSS':
            return parseTokenDigits;
        case 'MM':
        case 'DD':
        case 'YY':
        case 'GG':
        case 'gg':
        case 'HH':
        case 'hh':
        case 'mm':
        case 'ss':
        case 'M':
        case 'D':
        case 'd':
        case 'H':
        case 'h':
        case 'm':
        case 's':
        case 'w':
        case 'ww':
        case 'W':
        case 'WW':
        case 'e':
        case 'E':
            return parseTokenOneOrTwoDigits;
        default :
            a = new RegExp(regexpEscape(unescapeFormat(token.replace('\\', '')), "i"));
            return a;
        }
    }

    function timezoneMinutesFromString(string) {
        var tzchunk = (parseTokenTimezone.exec(string) || [])[0],
            parts = (tzchunk + '').match(parseTimezoneChunker) || ['-', 0, 0],
            minutes = +(parts[1] * 60) + toInt(parts[2]);

        return parts[0] === '+' ? -minutes : minutes;
    }

    // function to convert string input to date
    function addTimeToArrayFromToken(token, input, config) {
        var a, datePartArray = config._a;

        switch (token) {
        // MONTH
        case 'M' : // fall through to MM
        case 'MM' :
            if (input != null) {
                datePartArray[MONTH] = toInt(input) - 1;
            }
            break;
        case 'MMM' : // fall through to MMMM
        case 'MMMM' :
            a = getLangDefinition(config._l).monthsParse(input);
            // if we didn't find a month name, mark the date as invalid.
            if (a != null) {
                datePartArray[MONTH] = a;
            } else {
                config._pf.invalidMonth = input;
            }
            break;
        // DAY OF MONTH
        case 'D' : // fall through to DD
        case 'DD' :
            if (input != null) {
                datePartArray[DATE] = toInt(input);
            }
            break;
        // DAY OF YEAR
        case 'DDD' : // fall through to DDDD
        case 'DDDD' :
            if (input != null) {
                config._dayOfYear = toInt(input);
            }

            break;
        // YEAR
        case 'YY' :
            datePartArray[YEAR] = toInt(input) + (toInt(input) > 68 ? 1900 : 2000);
            break;
        case 'YYYY' :
        case 'YYYYY' :
            datePartArray[YEAR] = toInt(input);
            break;
        // AM / PM
        case 'a' : // fall through to A
        case 'A' :
            config._isPm = getLangDefinition(config._l).isPM(input);
            break;
        // 24 HOUR
        case 'H' : // fall through to hh
        case 'HH' : // fall through to hh
        case 'h' : // fall through to hh
        case 'hh' :
            datePartArray[HOUR] = toInt(input);
            break;
        // MINUTE
        case 'm' : // fall through to mm
        case 'mm' :
            datePartArray[MINUTE] = toInt(input);
            break;
        // SECOND
        case 's' : // fall through to ss
        case 'ss' :
            datePartArray[SECOND] = toInt(input);
            break;
        // MILLISECOND
        case 'S' :
        case 'SS' :
        case 'SSS' :
        case 'SSSS' :
            datePartArray[MILLISECOND] = toInt(('0.' + input) * 1000);
            break;
        // UNIX TIMESTAMP WITH MS
        case 'X':
            config._d = new Date(parseFloat(input) * 1000);
            break;
        // TIMEZONE
        case 'Z' : // fall through to ZZ
        case 'ZZ' :
            config._useUTC = true;
            config._tzm = timezoneMinutesFromString(input);
            break;
        case 'w':
        case 'ww':
        case 'W':
        case 'WW':
        case 'd':
        case 'dd':
        case 'ddd':
        case 'dddd':
        case 'e':
        case 'E':
            token = token.substr(0, 1);
            /* falls through */
        case 'gg':
        case 'gggg':
        case 'GG':
        case 'GGGG':
        case 'GGGGG':
            token = token.substr(0, 2);
            if (input) {
                config._w = config._w || {};
                config._w[token] = input;
            }
            break;
        }
    }

    // convert an array to a date.
    // the array should mirror the parameters below
    // note: all values past the year are optional and will default to the lowest possible value.
    // [year, month, day , hour, minute, second, millisecond]
    function dateFromConfig(config) {
        var i, date, input = [], currentDate,
            yearToUse, fixYear, w, temp, lang, weekday, week;

        if (config._d) {
            return;
        }

        currentDate = currentDateArray(config);

        //compute day of the year from weeks and weekdays
        if (config._w && config._a[DATE] == null && config._a[MONTH] == null) {
            fixYear = function (val) {
                return val ?
                  (val.length < 3 ? (parseInt(val, 10) > 68 ? '19' + val : '20' + val) : val) :
                  (config._a[YEAR] == null ? moment().weekYear() : config._a[YEAR]);
            };

            w = config._w;
            if (w.GG != null || w.W != null || w.E != null) {
                temp = dayOfYearFromWeeks(fixYear(w.GG), w.W || 1, w.E, 4, 1);
            }
            else {
                lang = getLangDefinition(config._l);
                weekday = w.d != null ?  parseWeekday(w.d, lang) :
                  (w.e != null ?  parseInt(w.e, 10) + lang._week.dow : 0);

                week = parseInt(w.w, 10) || 1;

                //if we're parsing 'd', then the low day numbers may be next week
                if (w.d != null && weekday < lang._week.dow) {
                    week++;
                }

                temp = dayOfYearFromWeeks(fixYear(w.gg), week, weekday, lang._week.doy, lang._week.dow);
            }

            config._a[YEAR] = temp.year;
            config._dayOfYear = temp.dayOfYear;
        }

        //if the day of the year is set, figure out what it is
        if (config._dayOfYear) {
            yearToUse = config._a[YEAR] == null ? currentDate[YEAR] : config._a[YEAR];

            if (config._dayOfYear > daysInYear(yearToUse)) {
                config._pf._overflowDayOfYear = true;
            }

            date = makeUTCDate(yearToUse, 0, config._dayOfYear);
            config._a[MONTH] = date.getUTCMonth();
            config._a[DATE] = date.getUTCDate();
        }

        // Default to current date.
        // * if no year, month, day of month are given, default to today
        // * if day of month is given, default month and year
        // * if month is given, default only year
        // * if year is given, don't default anything
        for (i = 0; i < 3 && config._a[i] == null; ++i) {
            config._a[i] = input[i] = currentDate[i];
        }

        // Zero out whatever was not defaulted, including time
        for (; i < 7; i++) {
            config._a[i] = input[i] = (config._a[i] == null) ? (i === 2 ? 1 : 0) : config._a[i];
        }

        // add the offsets to the time to be parsed so that we can have a clean array for checking isValid
        input[HOUR] += toInt((config._tzm || 0) / 60);
        input[MINUTE] += toInt((config._tzm || 0) % 60);

        config._d = (config._useUTC ? makeUTCDate : makeDate).apply(null, input);
    }

    function dateFromObject(config) {
        var normalizedInput;

        if (config._d) {
            return;
        }

        normalizedInput = normalizeObjectUnits(config._i);
        config._a = [
            normalizedInput.year,
            normalizedInput.month,
            normalizedInput.day,
            normalizedInput.hour,
            normalizedInput.minute,
            normalizedInput.second,
            normalizedInput.millisecond
        ];

        dateFromConfig(config);
    }

    function currentDateArray(config) {
        var now = new Date();
        if (config._useUTC) {
            return [
                now.getUTCFullYear(),
                now.getUTCMonth(),
                now.getUTCDate()
            ];
        } else {
            return [now.getFullYear(), now.getMonth(), now.getDate()];
        }
    }

    // date from string and format string
    function makeDateFromStringAndFormat(config) {

        config._a = [];
        config._pf.empty = true;

        // This array is used to make a Date, either with `new Date` or `Date.UTC`
        var lang = getLangDefinition(config._l),
            string = '' + config._i,
            i, parsedInput, tokens, token, skipped,
            stringLength = string.length,
            totalParsedInputLength = 0;

        tokens = expandFormat(config._f, lang).match(formattingTokens) || [];

        for (i = 0; i < tokens.length; i++) {
            token = tokens[i];
            parsedInput = (getParseRegexForToken(token, config).exec(string) || [])[0];
            if (parsedInput) {
                skipped = string.substr(0, string.indexOf(parsedInput));
                if (skipped.length > 0) {
                    config._pf.unusedInput.push(skipped);
                }
                string = string.slice(string.indexOf(parsedInput) + parsedInput.length);
                totalParsedInputLength += parsedInput.length;
            }
            // don't parse if it's not a known token
            if (formatTokenFunctions[token]) {
                if (parsedInput) {
                    config._pf.empty = false;
                }
                else {
                    config._pf.unusedTokens.push(token);
                }
                addTimeToArrayFromToken(token, parsedInput, config);
            }
            else if (config._strict && !parsedInput) {
                config._pf.unusedTokens.push(token);
            }
        }

        // add remaining unparsed input length to the string
        config._pf.charsLeftOver = stringLength - totalParsedInputLength;
        if (string.length > 0) {
            config._pf.unusedInput.push(string);
        }

        // handle am pm
        if (config._isPm && config._a[HOUR] < 12) {
            config._a[HOUR] += 12;
        }
        // if is 12 am, change hours to 0
        if (config._isPm === false && config._a[HOUR] === 12) {
            config._a[HOUR] = 0;
        }

        dateFromConfig(config);
        checkOverflow(config);
    }

    function unescapeFormat(s) {
        return s.replace(/\\(\[)|\\(\])|\[([^\]\[]*)\]|\\(.)/g, function (matched, p1, p2, p3, p4) {
            return p1 || p2 || p3 || p4;
        });
    }

    // Code from http://stackoverflow.com/questions/3561493/is-there-a-regexp-escape-function-in-javascript
    function regexpEscape(s) {
        return s.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
    }

    // date from string and array of format strings
    function makeDateFromStringAndArray(config) {
        var tempConfig,
            bestMoment,

            scoreToBeat,
            i,
            currentScore;

        if (config._f.length === 0) {
            config._pf.invalidFormat = true;
            config._d = new Date(NaN);
            return;
        }

        for (i = 0; i < config._f.length; i++) {
            currentScore = 0;
            tempConfig = extend({}, config);
            initializeParsingFlags(tempConfig);
            tempConfig._f = config._f[i];
            makeDateFromStringAndFormat(tempConfig);

            if (!isValid(tempConfig)) {
                continue;
            }

            // if there is any input that was not parsed add a penalty for that format
            currentScore += tempConfig._pf.charsLeftOver;

            //or tokens
            currentScore += tempConfig._pf.unusedTokens.length * 10;

            tempConfig._pf.score = currentScore;

            if (scoreToBeat == null || currentScore < scoreToBeat) {
                scoreToBeat = currentScore;
                bestMoment = tempConfig;
            }
        }

        extend(config, bestMoment || tempConfig);
    }

    // date from iso format
    function makeDateFromString(config) {
        var i,
            string = config._i,
            match = isoRegex.exec(string);

        if (match) {
            config._pf.iso = true;
            for (i = 4; i > 0; i--) {
                if (match[i]) {
                    // match[5] should be "T" or undefined
                    config._f = isoDates[i - 1] + (match[6] || " ");
                    break;
                }
            }
            for (i = 0; i < 4; i++) {
                if (isoTimes[i][1].exec(string)) {
                    config._f += isoTimes[i][0];
                    break;
                }
            }
            if (parseTokenTimezone.exec(string)) {
                config._f += "Z";
            }
            makeDateFromStringAndFormat(config);
        }
        else {
            config._d = new Date(string);
        }
    }

    function makeDateFromInput(config) {
        var input = config._i,
            matched = aspNetJsonRegex.exec(input);

        if (input === undefined) {
            config._d = new Date();
        } else if (matched) {
            config._d = new Date(+matched[1]);
        } else if (typeof input === 'string') {
            makeDateFromString(config);
        } else if (isArray(input)) {
            config._a = input.slice(0);
            dateFromConfig(config);
        } else if (isDate(input)) {
            config._d = new Date(+input);
        } else if (typeof(input) === 'object') {
            dateFromObject(config);
        } else {
            config._d = new Date(input);
        }
    }

    function makeDate(y, m, d, h, M, s, ms) {
        //can't just apply() to create a date:
        //http://stackoverflow.com/questions/181348/instantiating-a-javascript-object-by-calling-prototype-constructor-apply
        var date = new Date(y, m, d, h, M, s, ms);

        //the date constructor doesn't accept years < 1970
        if (y < 1970) {
            date.setFullYear(y);
        }
        return date;
    }

    function makeUTCDate(y) {
        var date = new Date(Date.UTC.apply(null, arguments));
        if (y < 1970) {
            date.setUTCFullYear(y);
        }
        return date;
    }

    function parseWeekday(input, language) {
        if (typeof input === 'string') {
            if (!isNaN(input)) {
                input = parseInt(input, 10);
            }
            else {
                input = language.weekdaysParse(input);
                if (typeof input !== 'number') {
                    return null;
                }
            }
        }
        return input;
    }

    /************************************
        Relative Time
    ************************************/


    // helper function for moment.fn.from, moment.fn.fromNow, and moment.duration.fn.humanize
    function substituteTimeAgo(string, number, withoutSuffix, isFuture, lang) {
        return lang.relativeTime(number || 1, !!withoutSuffix, string, isFuture);
    }

    function relativeTime(milliseconds, withoutSuffix, lang) {
        var seconds = round(Math.abs(milliseconds) / 1000),
            minutes = round(seconds / 60),
            hours = round(minutes / 60),
            days = round(hours / 24),
            years = round(days / 365),
            args = seconds < 45 && ['s', seconds] ||
                minutes === 1 && ['m'] ||
                minutes < 45 && ['mm', minutes] ||
                hours === 1 && ['h'] ||
                hours < 22 && ['hh', hours] ||
                days === 1 && ['d'] ||
                days <= 25 && ['dd', days] ||
                days <= 45 && ['M'] ||
                days < 345 && ['MM', round(days / 30)] ||
                years === 1 && ['y'] || ['yy', years];
        args[2] = withoutSuffix;
        args[3] = milliseconds > 0;
        args[4] = lang;
        return substituteTimeAgo.apply({}, args);
    }


    /************************************
        Week of Year
    ************************************/


    // firstDayOfWeek       0 = sun, 6 = sat
    //                      the day of the week that starts the week
    //                      (usually sunday or monday)
    // firstDayOfWeekOfYear 0 = sun, 6 = sat
    //                      the first week is the week that contains the first
    //                      of this day of the week
    //                      (eg. ISO weeks use thursday (4))
    function weekOfYear(mom, firstDayOfWeek, firstDayOfWeekOfYear) {
        var end = firstDayOfWeekOfYear - firstDayOfWeek,
            daysToDayOfWeek = firstDayOfWeekOfYear - mom.day(),
            adjustedMoment;


        if (daysToDayOfWeek > end) {
            daysToDayOfWeek -= 7;
        }

        if (daysToDayOfWeek < end - 7) {
            daysToDayOfWeek += 7;
        }

        adjustedMoment = moment(mom).add('d', daysToDayOfWeek);
        return {
            week: Math.ceil(adjustedMoment.dayOfYear() / 7),
            year: adjustedMoment.year()
        };
    }

    //http://en.wikipedia.org/wiki/ISO_week_date#Calculating_a_date_given_the_year.2C_week_number_and_weekday
    function dayOfYearFromWeeks(year, week, weekday, firstDayOfWeekOfYear, firstDayOfWeek) {
        var d = new Date(Date.UTC(year, 0)).getUTCDay(),
            daysToAdd, dayOfYear;

        weekday = weekday != null ? weekday : firstDayOfWeek;
        daysToAdd = firstDayOfWeek - d + (d > firstDayOfWeekOfYear ? 7 : 0);
        dayOfYear = 7 * (week - 1) + (weekday - firstDayOfWeek) + daysToAdd + 1;

        return {
            year: dayOfYear > 0 ? year : year - 1,
            dayOfYear: dayOfYear > 0 ?  dayOfYear : daysInYear(year - 1) + dayOfYear
        };
    }

    /************************************
        Top Level Functions
    ************************************/

    function makeMoment(config) {
        var input = config._i,
            format = config._f;

        if (typeof config._pf === 'undefined') {
            initializeParsingFlags(config);
        }

        if (input === null) {
            return moment.invalid({nullInput: true});
        }

        if (typeof input === 'string') {
            config._i = input = getLangDefinition().preparse(input);
        }

        if (moment.isMoment(input)) {
            config = extend({}, input);

            config._d = new Date(+input._d);
        } else if (format) {
            if (isArray(format)) {
                makeDateFromStringAndArray(config);
            } else {
                makeDateFromStringAndFormat(config);
            }
        } else {
            makeDateFromInput(config);
        }

        return new Moment(config);
    }

    moment = function (input, format, lang, strict) {
        if (typeof(lang) === "boolean") {
            strict = lang;
            lang = undefined;
        }
        return makeMoment({
            _i : input,
            _f : format,
            _l : lang,
            _strict : strict,
            _isUTC : false
        });
    };

    // creating with utc
    moment.utc = function (input, format, lang, strict) {
        var m;

        if (typeof(lang) === "boolean") {
            strict = lang;
            lang = undefined;
        }
        m = makeMoment({
            _useUTC : true,
            _isUTC : true,
            _l : lang,
            _i : input,
            _f : format,
            _strict : strict
        }).utc();

        return m;
    };

    // creating with unix timestamp (in seconds)
    moment.unix = function (input) {
        return moment(input * 1000);
    };

    // duration
    moment.duration = function (input, key) {
        var isDuration = moment.isDuration(input),
            isNumber = (typeof input === 'number'),
            duration = (isDuration ? input._input : (isNumber ? {} : input)),
            // matching against regexp is expensive, do it on demand
            match = null,
            sign,
            ret,
            parseIso,
            timeEmpty,
            dateTimeEmpty;

        if (isNumber) {
            if (key) {
                duration[key] = input;
            } else {
                duration.milliseconds = input;
            }
        } else if (!!(match = aspNetTimeSpanJsonRegex.exec(input))) {
            sign = (match[1] === "-") ? -1 : 1;
            duration = {
                y: 0,
                d: toInt(match[DATE]) * sign,
                h: toInt(match[HOUR]) * sign,
                m: toInt(match[MINUTE]) * sign,
                s: toInt(match[SECOND]) * sign,
                ms: toInt(match[MILLISECOND]) * sign
            };
        } else if (!!(match = isoDurationRegex.exec(input))) {
            sign = (match[1] === "-") ? -1 : 1;
            parseIso = function (inp) {
                // We'd normally use ~~inp for this, but unfortunately it also
                // converts floats to ints.
                // inp may be undefined, so careful calling replace on it.
                var res = inp && parseFloat(inp.replace(',', '.'));
                // apply sign while we're at it
                return (isNaN(res) ? 0 : res) * sign;
            };
            duration = {
                y: parseIso(match[2]),
                M: parseIso(match[3]),
                d: parseIso(match[4]),
                h: parseIso(match[5]),
                m: parseIso(match[6]),
                s: parseIso(match[7]),
                w: parseIso(match[8])
            };
        }

        ret = new Duration(duration);

        if (isDuration && input.hasOwnProperty('_lang')) {
            ret._lang = input._lang;
        }

        return ret;
    };

    // version number
    moment.version = VERSION;

    // default format
    moment.defaultFormat = isoFormat;

    // This function will be called whenever a moment is mutated.
    // It is intended to keep the offset in sync with the timezone.
    moment.updateOffset = function () {};

    // This function will load languages and then set the global language.  If
    // no arguments are passed in, it will simply return the current global
    // language key.
    moment.lang = function (key, values) {
        var r;
        if (!key) {
            return moment.fn._lang._abbr;
        }
        if (values) {
            loadLang(normalizeLanguage(key), values);
        } else if (values === null) {
            unloadLang(key);
            key = 'en';
        } else if (!languages[key]) {
            getLangDefinition(key);
        }
        r = moment.duration.fn._lang = moment.fn._lang = getLangDefinition(key);
        return r._abbr;
    };

    // returns language data
    moment.langData = function (key) {
        if (key && key._lang && key._lang._abbr) {
            key = key._lang._abbr;
        }
        return getLangDefinition(key);
    };

    // compare moment object
    moment.isMoment = function (obj) {
        return obj instanceof Moment;
    };

    // for typechecking Duration objects
    moment.isDuration = function (obj) {
        return obj instanceof Duration;
    };

    for (i = lists.length - 1; i >= 0; --i) {
        makeList(lists[i]);
    }

    moment.normalizeUnits = function (units) {
        return normalizeUnits(units);
    };

    moment.invalid = function (flags) {
        var m = moment.utc(NaN);
        if (flags != null) {
            extend(m._pf, flags);
        }
        else {
            m._pf.userInvalidated = true;
        }

        return m;
    };

    moment.parseZone = function (input) {
        return moment(input).parseZone();
    };

    /************************************
        Moment Prototype
    ************************************/


    extend(moment.fn = Moment.prototype, {

        clone : function () {
            return moment(this);
        },

        valueOf : function () {
            return +this._d + ((this._offset || 0) * 60000);
        },

        unix : function () {
            return Math.floor(+this / 1000);
        },

        toString : function () {
            return this.clone().lang('en').format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
        },

        toDate : function () {
            return this._offset ? new Date(+this) : this._d;
        },

        toISOString : function () {
            return formatMoment(moment(this).utc(), 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]');
        },

        toArray : function () {
            var m = this;
            return [
                m.year(),
                m.month(),
                m.date(),
                m.hours(),
                m.minutes(),
                m.seconds(),
                m.milliseconds()
            ];
        },

        isValid : function () {
            return isValid(this);
        },

        isDSTShifted : function () {

            if (this._a) {
                return this.isValid() && compareArrays(this._a, (this._isUTC ? moment.utc(this._a) : moment(this._a)).toArray()) > 0;
            }

            return false;
        },

        parsingFlags : function () {
            return extend({}, this._pf);
        },

        invalidAt: function () {
            return this._pf.overflow;
        },

        utc : function () {
            return this.zone(0);
        },

        local : function () {
            this.zone(0);
            this._isUTC = false;
            return this;
        },

        format : function (inputString) {
            var output = formatMoment(this, inputString || moment.defaultFormat);
            return this.lang().postformat(output);
        },

        add : function (input, val) {
            var dur;
            // switch args to support add('s', 1) and add(1, 's')
            if (typeof input === 'string') {
                dur = moment.duration(+val, input);
            } else {
                dur = moment.duration(input, val);
            }
            addOrSubtractDurationFromMoment(this, dur, 1);
            return this;
        },

        subtract : function (input, val) {
            var dur;
            // switch args to support subtract('s', 1) and subtract(1, 's')
            if (typeof input === 'string') {
                dur = moment.duration(+val, input);
            } else {
                dur = moment.duration(input, val);
            }
            addOrSubtractDurationFromMoment(this, dur, -1);
            return this;
        },

        diff : function (input, units, asFloat) {
            var that = this._isUTC ? moment(input).zone(this._offset || 0) : moment(input).local(),
                zoneDiff = (this.zone() - that.zone()) * 6e4,
                diff, output;

            units = normalizeUnits(units);

            if (units === 'year' || units === 'month') {
                // average number of days in the months in the given dates
                diff = (this.daysInMonth() + that.daysInMonth()) * 432e5; // 24 * 60 * 60 * 1000 / 2
                // difference in months
                output = ((this.year() - that.year()) * 12) + (this.month() - that.month());
                // adjust by taking difference in days, average number of days
                // and dst in the given months.
                output += ((this - moment(this).startOf('month')) -
                        (that - moment(that).startOf('month'))) / diff;
                // same as above but with zones, to negate all dst
                output -= ((this.zone() - moment(this).startOf('month').zone()) -
                        (that.zone() - moment(that).startOf('month').zone())) * 6e4 / diff;
                if (units === 'year') {
                    output = output / 12;
                }
            } else {
                diff = (this - that);
                output = units === 'second' ? diff / 1e3 : // 1000
                    units === 'minute' ? diff / 6e4 : // 1000 * 60
                    units === 'hour' ? diff / 36e5 : // 1000 * 60 * 60
                    units === 'day' ? (diff - zoneDiff) / 864e5 : // 1000 * 60 * 60 * 24, negate dst
                    units === 'week' ? (diff - zoneDiff) / 6048e5 : // 1000 * 60 * 60 * 24 * 7, negate dst
                    diff;
            }
            return asFloat ? output : absRound(output);
        },

        from : function (time, withoutSuffix) {
            return moment.duration(this.diff(time)).lang(this.lang()._abbr).humanize(!withoutSuffix);
        },

        fromNow : function (withoutSuffix) {
            return this.from(moment(), withoutSuffix);
        },

        calendar : function () {
            var diff = this.diff(moment().zone(this.zone()).startOf('day'), 'days', true),
                format = diff < -6 ? 'sameElse' :
                diff < -1 ? 'lastWeek' :
                diff < 0 ? 'lastDay' :
                diff < 1 ? 'sameDay' :
                diff < 2 ? 'nextDay' :
                diff < 7 ? 'nextWeek' : 'sameElse';
            return this.format(this.lang().calendar(format, this));
        },

        isLeapYear : function () {
            return isLeapYear(this.year());
        },

        isDST : function () {
            return (this.zone() < this.clone().month(0).zone() ||
                this.zone() < this.clone().month(5).zone());
        },

        day : function (input) {
            var day = this._isUTC ? this._d.getUTCDay() : this._d.getDay();
            if (input != null) {
                input = parseWeekday(input, this.lang());
                return this.add({ d : input - day });
            } else {
                return day;
            }
        },

        month : function (input) {
            var utc = this._isUTC ? 'UTC' : '',
                dayOfMonth;

            if (input != null) {
                if (typeof input === 'string') {
                    input = this.lang().monthsParse(input);
                    if (typeof input !== 'number') {
                        return this;
                    }
                }

                dayOfMonth = this.date();
                this.date(1);
                this._d['set' + utc + 'Month'](input);
                this.date(Math.min(dayOfMonth, this.daysInMonth()));

                moment.updateOffset(this);
                return this;
            } else {
                return this._d['get' + utc + 'Month']();
            }
        },

        startOf: function (units) {
            units = normalizeUnits(units);
            // the following switch intentionally omits break keywords
            // to utilize falling through the cases.
            switch (units) {
            case 'year':
                this.month(0);
                /* falls through */
            case 'month':
                this.date(1);
                /* falls through */
            case 'week':
            case 'isoWeek':
            case 'day':
                this.hours(0);
                /* falls through */
            case 'hour':
                this.minutes(0);
                /* falls through */
            case 'minute':
                this.seconds(0);
                /* falls through */
            case 'second':
                this.milliseconds(0);
                /* falls through */
            }

            // weeks are a special case
            if (units === 'week') {
                this.weekday(0);
            } else if (units === 'isoWeek') {
                this.isoWeekday(1);
            }

            return this;
        },

        endOf: function (units) {
            units = normalizeUnits(units);
            return this.startOf(units).add((units === 'isoWeek' ? 'week' : units), 1).subtract('ms', 1);
        },

        isAfter: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) > +moment(input).startOf(units);
        },

        isBefore: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) < +moment(input).startOf(units);
        },

        isSame: function (input, units) {
            units = typeof units !== 'undefined' ? units : 'millisecond';
            return +this.clone().startOf(units) === +moment(input).startOf(units);
        },

        min: function (other) {
            other = moment.apply(null, arguments);
            return other < this ? this : other;
        },

        max: function (other) {
            other = moment.apply(null, arguments);
            return other > this ? this : other;
        },

        zone : function (input) {
            var offset = this._offset || 0;
            if (input != null) {
                if (typeof input === "string") {
                    input = timezoneMinutesFromString(input);
                }
                if (Math.abs(input) < 16) {
                    input = input * 60;
                }
                this._offset = input;
                this._isUTC = true;
                if (offset !== input) {
                    addOrSubtractDurationFromMoment(this, moment.duration(offset - input, 'm'), 1, true);
                }
            } else {
                return this._isUTC ? offset : this._d.getTimezoneOffset();
            }
            return this;
        },

        zoneAbbr : function () {
            return this._isUTC ? "UTC" : "";
        },

        zoneName : function () {
            return this._isUTC ? "Coordinated Universal Time" : "";
        },

        parseZone : function () {
            if (typeof this._i === 'string') {
                this.zone(this._i);
            }
            return this;
        },

        hasAlignedHourOffset : function (input) {
            if (!input) {
                input = 0;
            }
            else {
                input = moment(input).zone();
            }

            return (this.zone() - input) % 60 === 0;
        },

        daysInMonth : function () {
            return daysInMonth(this.year(), this.month());
        },

        dayOfYear : function (input) {
            var dayOfYear = round((moment(this).startOf('day') - moment(this).startOf('year')) / 864e5) + 1;
            return input == null ? dayOfYear : this.add("d", (input - dayOfYear));
        },

        weekYear : function (input) {
            var year = weekOfYear(this, this.lang()._week.dow, this.lang()._week.doy).year;
            return input == null ? year : this.add("y", (input - year));
        },

        isoWeekYear : function (input) {
            var year = weekOfYear(this, 1, 4).year;
            return input == null ? year : this.add("y", (input - year));
        },

        week : function (input) {
            var week = this.lang().week(this);
            return input == null ? week : this.add("d", (input - week) * 7);
        },

        isoWeek : function (input) {
            var week = weekOfYear(this, 1, 4).week;
            return input == null ? week : this.add("d", (input - week) * 7);
        },

        weekday : function (input) {
            var weekday = (this.day() + 7 - this.lang()._week.dow) % 7;
            return input == null ? weekday : this.add("d", input - weekday);
        },

        isoWeekday : function (input) {
            // behaves the same as moment#day except
            // as a getter, returns 7 instead of 0 (1-7 range instead of 0-6)
            // as a setter, sunday should belong to the previous week.
            return input == null ? this.day() || 7 : this.day(this.day() % 7 ? input : input - 7);
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units]();
        },

        set : function (units, value) {
            units = normalizeUnits(units);
            if (typeof this[units] === 'function') {
                this[units](value);
            }
            return this;
        },

        // If passed a language key, it will set the language for this
        // instance.  Otherwise, it will return the language configuration
        // variables for this instance.
        lang : function (key) {
            if (key === undefined) {
                return this._lang;
            } else {
                this._lang = getLangDefinition(key);
                return this;
            }
        }
    });

    // helper for adding shortcuts
    function makeGetterAndSetter(name, key) {
        moment.fn[name] = moment.fn[name + 's'] = function (input) {
            var utc = this._isUTC ? 'UTC' : '';
            if (input != null) {
                this._d['set' + utc + key](input);
                moment.updateOffset(this);
                return this;
            } else {
                return this._d['get' + utc + key]();
            }
        };
    }

    // loop through and add shortcuts (Month, Date, Hours, Minutes, Seconds, Milliseconds)
    for (i = 0; i < proxyGettersAndSetters.length; i ++) {
        makeGetterAndSetter(proxyGettersAndSetters[i].toLowerCase().replace(/s$/, ''), proxyGettersAndSetters[i]);
    }

    // add shortcut for year (uses different syntax than the getter/setter 'year' == 'FullYear')
    makeGetterAndSetter('year', 'FullYear');

    // add plural methods
    moment.fn.days = moment.fn.day;
    moment.fn.months = moment.fn.month;
    moment.fn.weeks = moment.fn.week;
    moment.fn.isoWeeks = moment.fn.isoWeek;

    // add aliased format methods
    moment.fn.toJSON = moment.fn.toISOString;

    /************************************
        Duration Prototype
    ************************************/


    extend(moment.duration.fn = Duration.prototype, {

        _bubble : function () {
            var milliseconds = this._milliseconds,
                days = this._days,
                months = this._months,
                data = this._data,
                seconds, minutes, hours, years;

            // The following code bubbles up values, see the tests for
            // examples of what that means.
            data.milliseconds = milliseconds % 1000;

            seconds = absRound(milliseconds / 1000);
            data.seconds = seconds % 60;

            minutes = absRound(seconds / 60);
            data.minutes = minutes % 60;

            hours = absRound(minutes / 60);
            data.hours = hours % 24;

            days += absRound(hours / 24);
            data.days = days % 30;

            months += absRound(days / 30);
            data.months = months % 12;

            years = absRound(months / 12);
            data.years = years;
        },

        weeks : function () {
            return absRound(this.days() / 7);
        },

        valueOf : function () {
            return this._milliseconds +
              this._days * 864e5 +
              (this._months % 12) * 2592e6 +
              toInt(this._months / 12) * 31536e6;
        },

        humanize : function (withSuffix) {
            var difference = +this,
                output = relativeTime(difference, !withSuffix, this.lang());

            if (withSuffix) {
                output = this.lang().pastFuture(difference, output);
            }

            return this.lang().postformat(output);
        },

        add : function (input, val) {
            // supports only 2.0-style add(1, 's') or add(moment)
            var dur = moment.duration(input, val);

            this._milliseconds += dur._milliseconds;
            this._days += dur._days;
            this._months += dur._months;

            this._bubble();

            return this;
        },

        subtract : function (input, val) {
            var dur = moment.duration(input, val);

            this._milliseconds -= dur._milliseconds;
            this._days -= dur._days;
            this._months -= dur._months;

            this._bubble();

            return this;
        },

        get : function (units) {
            units = normalizeUnits(units);
            return this[units.toLowerCase() + 's']();
        },

        as : function (units) {
            units = normalizeUnits(units);
            return this['as' + units.charAt(0).toUpperCase() + units.slice(1) + 's']();
        },

        lang : moment.fn.lang,

        toIsoString : function () {
            // inspired by https://github.com/dordille/moment-isoduration/blob/master/moment.isoduration.js
            var years = Math.abs(this.years()),
                months = Math.abs(this.months()),
                days = Math.abs(this.days()),
                hours = Math.abs(this.hours()),
                minutes = Math.abs(this.minutes()),
                seconds = Math.abs(this.seconds() + this.milliseconds() / 1000);

            if (!this.asSeconds()) {
                // this is the same as C#'s (Noda) and python (isodate)...
                // but not other JS (goog.date)
                return 'P0D';
            }

            return (this.asSeconds() < 0 ? '-' : '') +
                'P' +
                (years ? years + 'Y' : '') +
                (months ? months + 'M' : '') +
                (days ? days + 'D' : '') +
                ((hours || minutes || seconds) ? 'T' : '') +
                (hours ? hours + 'H' : '') +
                (minutes ? minutes + 'M' : '') +
                (seconds ? seconds + 'S' : '');
        }
    });

    function makeDurationGetter(name) {
        moment.duration.fn[name] = function () {
            return this._data[name];
        };
    }

    function makeDurationAsGetter(name, factor) {
        moment.duration.fn['as' + name] = function () {
            return +this / factor;
        };
    }

    for (i in unitMillisecondFactors) {
        if (unitMillisecondFactors.hasOwnProperty(i)) {
            makeDurationAsGetter(i, unitMillisecondFactors[i]);
            makeDurationGetter(i.toLowerCase());
        }
    }

    makeDurationAsGetter('Weeks', 6048e5);
    moment.duration.fn.asMonths = function () {
        return (+this - this.years() * 31536e6) / 2592e6 + this.years() * 12;
    };


    /************************************
        Default Lang
    ************************************/


    // Set default language, other languages will inherit from English.
    moment.lang('en', {
        ordinal : function (number) {
            var b = number % 10,
                output = (toInt(number % 100 / 10) === 1) ? 'th' :
                (b === 1) ? 'st' :
                (b === 2) ? 'nd' :
                (b === 3) ? 'rd' : 'th';
            return number + output;
        }
    });

    /* EMBED_LANGUAGES */

    /************************************
        Exposing Moment
    ************************************/

    function makeGlobal(deprecate) {
        var warned = false, local_moment = moment;
        /*global ender:false */
        if (typeof ender !== 'undefined') {
            return;
        }
        // here, `this` means `window` in the browser, or `global` on the server
        // add `moment` as a global object via a string identifier,
        // for Closure Compiler "advanced" mode
        if (deprecate) {
            this.moment = function () {
                if (!warned && console && console.warn) {
                    warned = true;
                    console.warn(
                            "Accessing Moment through the global scope is " +
                            "deprecated, and will be removed in an upcoming " +
                            "release.");
                }
                return local_moment.apply(null, arguments);
            };
        } else {
            this['moment'] = moment;
        }
    }

    // CommonJS module is defined
    if (hasModule) {
        module.exports = moment;
        makeGlobal(true);
    } else if (typeof define === "function" && define.amd) {
        define("moment", function (require, exports, module) {
            if (module.config().noGlobal !== true) {
                // If user provided noGlobal, he is aware of global
                makeGlobal(module.config().noGlobal === undefined);
            }

            return moment;
        });
    } else {
        makeGlobal();
    }
}).call(this);

// bower_components/moment-timezone/moment-timezone.js
// moment-timezone.js
// version : 0.0.3
// author : Tim Wood
// license : MIT
// github.com/timrwood/moment-timezone

(function () {

	var VERSION = "0.0.3";

	function onload(moment) {
		var oldZoneName = moment.fn.zoneName,
			oldZoneAbbr = moment.fn.zoneAbbr,

			defaultRule,
			rules = {},
			ruleSets = {},
			zones = {},
			zoneSets = {},
			links = {},

			TIME_RULE_WALL_CLOCK = 0,
			TIME_RULE_UTC        = 1,
			TIME_RULE_STANDARD   = 2,

			DAY_RULE_DAY_OF_MONTH   = 7,
			DAY_RULE_LAST_WEEKDAY   = 8;

		// converts time in the HH:mm:ss format to absolute number of minutes
		function parseMinutes (input) {
			input = input + '';
			var output = input.split(':'),
				sign = ~input.indexOf('-') ? -1 : 1,
				hour = Math.abs(+output[0]),
				minute = parseInt(output[1], 10) || 0,
				second = parseInt(output[2], 10) || 0;

			return sign * ((hour * 60) + (minute) + (second / 60));
		}

		/************************************
			Rules
		************************************/

		function Rule (name, startYear, endYear, month, day, dayRule, time, timeRule, offset, letters) {
			this.name      = name;
			this.startYear = +startYear;
			this.endYear   = +endYear;
			this.month     = +month;
			this.day       = +day;
			this.dayRule   = +dayRule;
			this.time      = parseMinutes(time);
			this.timeRule  = +timeRule;
			this.offset    = parseMinutes(offset);
			this.letters   = letters || '';
			this.date = memoize(this.date);
			this.weekdayAfter = memoize(this.weekdayAfter);
			this.lastWeekday = memoize(this.lastWeekday);
		}

		Rule.prototype = {
			contains : function (year) {
				return (year >= this.startYear && year <= this.endYear);
			},

			start : function (year) {
				year = Math.min(Math.max(year, this.startYear), this.endYear);
				return moment.utc([year, this.month, this.date(year), 0, this.time]);
			},

			date : function (year) {
				if (this.dayRule === DAY_RULE_DAY_OF_MONTH) {
					return this.day;
				} else if (this.dayRule === DAY_RULE_LAST_WEEKDAY) {
					return this.lastWeekday(year);
				}
				return this.weekdayAfter(year);
			},

			weekdayAfter : function (year) {
				var day = this.day,
					firstDayOfWeek = moment([year, this.month, 1]).day(),
					output = this.dayRule + 1 - firstDayOfWeek;

				while (output < day) {
					output += 7;
				}

				return output;
			},

			lastWeekday : function (year) {
				var day = this.day,
					dow = day % 7,
					lastDowOfMonth = moment([year, this.month + 1, 1]).day(),
					daysInMonth = moment([year, this.month, 1]).daysInMonth(),
					output = daysInMonth + (dow - (lastDowOfMonth - 1)) - (~~(day / 7) * 7);

				if (dow >= lastDowOfMonth) {
					output -= 7;
				}
				return output;
			}
		};

		/************************************
			Rule Year
		************************************/

		function RuleYear (year, rule) {
			this.rule = rule;
			this.start = rule.start(year);
		}

		RuleYear.prototype = {
			equals : function (other) {
				if (!other || other.rule !== this.rule) {
					return false;
				}
				return Math.abs(other.start - this.start) < 86400000; // 24 * 60 * 60 * 1000
			}
		};

		function sortRuleYears (a, b) {
			if (a.isLast) {
				return -1;
			}
			if (b.isLast) {
				return 1;
			}
			return b.start - a.start;
		}

		/************************************
			Rule Sets
		************************************/

		function RuleSet (name) {
			this.name = name;
			this.rules = [];
			this.lastYearRule = memoize(this.lastYearRule);
		}

		RuleSet.prototype = {
			add : function (rule) {
				this.rules.push(rule);
			},

			ruleYears : function (mom, lastZone) {
				var i, j,
					year = mom.year(),
					rule,
					lastZoneRule,
					rules = [];

				for (i = 0; i < this.rules.length; i++) {
					rule = this.rules[i];
					if (rule.contains(year)) {
						rules.push(new RuleYear(year, rule));
					} else if (rule.contains(year + 1)) {
						rules.push(new RuleYear(year + 1, rule));
					}
				}
				rules.push(new RuleYear(year - 1, this.lastYearRule(year - 1)));

				if (lastZone) {
					lastZoneRule = new RuleYear(year - 1, lastZone.lastRule());
					lastZoneRule.start = lastZone.until.clone().utc();
					lastZoneRule.isLast = lastZone.ruleSet !== this;
					rules.push(lastZoneRule);
				}

				rules.sort(sortRuleYears);
				return rules;
			},

			rule : function (mom, offset, lastZone) {
				var rules = this.ruleYears(mom, lastZone),
					lastOffset = 0,
					rule,
					lastZoneOffset,
					lastZoneOffsetAbs,
					lastRule,
					i;

				if (lastZone) {
					lastZoneOffset = lastZone.offset + lastZone.lastRule().offset;
					lastZoneOffsetAbs = Math.abs(lastZoneOffset) * 90000;
				}

				// make sure to include the previous rule's offset
				for (i = rules.length - 1; i > -1; i--) {
					lastRule = rule;
					rule = rules[i];

					if (rule.equals(lastRule)) {
						continue;
					}

					if (lastZone && !rule.isLast && Math.abs(rule.start - lastZone.until) <= lastZoneOffsetAbs) {
						lastOffset += lastZoneOffset - offset;
					}

					if (rule.rule.timeRule === TIME_RULE_STANDARD) {
						lastOffset = offset;
					}

					if (rule.rule.timeRule !== TIME_RULE_UTC) {
						rule.start.add('m', -lastOffset);
					}

					lastOffset = rule.rule.offset + offset;
				}

				for (i = 0; i < rules.length; i++) {
					rule = rules[i];
					if (mom >= rule.start && !rule.isLast) {
						return rule.rule;
					}
				}

				return defaultRule;
			},

			lastYearRule : function (year) {
				var i,
					rule,
					start,
					bestRule = defaultRule,
					largest = -1e30;

				for (i = 0; i < this.rules.length; i++) {
					rule = this.rules[i];
					if (year >= rule.startYear) {
						start = rule.start(year);
						if (start > largest) {
							largest = start;
							bestRule = rule;
						}
					}
				}

				return bestRule;
			}
		};

		/************************************
			Zone
		************************************/

		function Zone (name, offset, ruleSet, letters, until, untilOffset) {
			var i,
				untilArray = typeof until === 'string' ? until.split('_') : [9999];

			this.name = name;
			this.offset = parseMinutes(offset);
			this.ruleSet = ruleSet;
			this.letters = letters;
			this.lastRule = memoize(this.lastRule);

			for (i = 0; i < untilArray.length; i++) {
				untilArray[i] = +untilArray[i];
			}
			this.until = moment.utc(untilArray).subtract('m', parseMinutes(untilOffset));
		}

		Zone.prototype = {
			rule : function (mom, lastZone) {
				return this.ruleSet.rule(mom, this.offset, lastZone);
			},

			lastRule : function () {
				return this.rule(this.until);
			},

			format : function (rule) {
				return this.letters.replace("%s", rule.letters);
			}
		};

		/************************************
			Zone Set
		************************************/

		function sortZones (a, b) {
			return a.until - b.until;
		}

		function ZoneSet (name) {
			this.name = normalizeName(name);
			this.displayName = name;
			this.zones = [];
			this.zoneAndRule = memoize(this.zoneAndRule, function (mom) {
				return +mom;
			});
		}

		ZoneSet.prototype = {
			zoneAndRule : function (mom) {
				var i,
					zone,
					lastZone;

				mom = mom.clone().utc();
				for (i = 0; i < this.zones.length; i++) {
					zone = this.zones[i];
					if (mom < zone.until) {
						break;
					}
					lastZone = zone;
				}

				return [zone, zone.rule(mom, lastZone)];
			},

			add : function (zone) {
				this.zones.push(zone);
				this.zones.sort(sortZones);
			},

			format : function (mom) {
				var zoneAndRule = this.zoneAndRule(mom);
				return zoneAndRule[0].format(zoneAndRule[1]);
			},

			offset : function (mom) {
				var zoneAndRule = this.zoneAndRule(mom);
				return -(zoneAndRule[0].offset + zoneAndRule[1].offset);
			}
		};

		/************************************
			Global Methods
		************************************/

		function memoize (fn, keyFn) {
			var cache = {};
			return function (first) {
				var key = keyFn ? keyFn.apply(this, arguments) : first;
				return key in cache ?
					cache[key] :
					(cache[key] = fn.apply(this, arguments));
			};
		}

		function addRules (rules) {
			var i, j, rule;
			for (i in rules) {
				rule = rules[i];
				for (j = 0; j < rule.length; j++) {
					addRule(i + '\t' + rule[j]);
				}
			}
		}

		function addRule (ruleString) {
			// don't duplicate rules
			if (rules[ruleString]) {
				return rules[ruleString];
			}

			var p = ruleString.split(/\s/),
				name = normalizeName(p[0]),
				rule = new Rule(name, p[1], p[2], p[3], p[4], p[5], p[6], p[7], p[8], p[9], p[10]);

			// cache the rule so we don't add it again
			rules[ruleString] = rule;

			// add to the ruleset
			getRuleSet(name).add(rule);

			return rule;
		}

		function normalizeName (name) {
			return (name || '').toLowerCase().replace(/\//g, '_');
		}

		function addZones (zones) {
			var i, j, zone;
			for (i in zones) {
				zone = zones[i];
				for (j = 0; j < zone.length; j++) {
					addZone(i + '\t' + zone[j]);
				}
			}
		}

		function addLinks (linksToAdd) {
			var i;
			for (i in linksToAdd) {
				links[normalizeName(i)] = normalizeName(linksToAdd[i]);
			}
		}

		function addZone (zoneString) {
			// don't duplicate zones
			if (zones[zoneString]) {
				return zones[zoneString];
			}

			var p = zoneString.split(/\s/),
				name = normalizeName(p[0]),
				zone = new Zone(name, p[1], getRuleSet(p[2]), p[3], p[4], p[5]);

			// cache the zone so we don't add it again
			zones[zoneString] = zone;

			// add to the zoneset
			getZoneSet(p[0]).add(zone);

			return zone;
		}

		function getRuleSet (name) {
			name = normalizeName(name);
			if (!ruleSets[name]) {
				ruleSets[name] = new RuleSet(name);
			}
			return ruleSets[name];
		}

		function getZoneSet (name) {
			var machineName = normalizeName(name);
			if (links[machineName]) {
				machineName = links[machineName];
			}
			if (!zoneSets[machineName]) {
				zoneSets[machineName] = new ZoneSet(name);
			}
			return zoneSets[machineName];
		}

		function add (data) {
			if (!data) {
				return;
			}
			if (data.zones) {
				addZones(data.zones);
			}
			if (data.rules) {
				addRules(data.rules);
			}
			if (data.links) {
				addLinks(data.links);
			}
		}

		// overwrite moment.updateOffset
		moment.updateOffset = function (mom) {
			var offset;
			if (mom._z) {
				offset = mom._z.offset(mom);
				if (Math.abs(offset) < 16) {
					offset = offset / 60;
				}
				mom.zone(offset);
			}
		};

		function getZoneSets() {
			var sets = [],
				zoneName;
			for (zoneName in zoneSets) {
				sets.push(zoneSets[zoneName]);
			}
			return sets;
		}

		moment.fn.tz = function (name) {
			if (name) {
				this._z = getZoneSet(name);
				if (this._z) {
					moment.updateOffset(this);
				}
				return this;
			}
			if (this._z) {
				return this._z.displayName;
			}
		};

		moment.fn.zoneName = function () {
			if (this._z) {
				return this._z.format(this);
			}
			return oldZoneName.call(this);
		};

		moment.fn.zoneAbbr = function () {
			if (this._z) {
				return this._z.format(this);
			}
			return oldZoneAbbr.call(this);
		};

		moment.tz = function () {
			var args = [], i, len = arguments.length - 1;
			for (i = 0; i < len; i++) {
				args[i] = arguments[i];
			}
			var m = moment.apply(null, args);
			var preTzOffset = m.zone();
			m.tz(arguments[len]);
			return m.add('minutes', m.zone() - preTzOffset);
		};

		moment.tz.add = add;
		moment.tz.addRule = addRule;
		moment.tz.addZone = addZone;
		moment.tz.zones = getZoneSets;

		moment.tz.version = VERSION;

		// add default rule
		defaultRule = addRule("- 0 9999 0 0 0 0 0 0");

		return moment;
	}

	if (typeof define === "function" && define.amd) {
		define("moment-timezone", ["moment"], onload);
	} else if (typeof window !== "undefined" && window.moment) {
		onload(window.moment);
	} else if (typeof module !== 'undefined') {
		module.exports = onload(require('moment'));
	}
}).apply(this);

// timezones/setup.js
(function () {
  'use strict';

  window.moment.tz.add(

{
	"links": {
		"Africa/Asmera": "Africa/Asmara",
		"Africa/Timbuktu": "Africa/Bamako",
		"America/Argentina/ComodRivadavia": "America/Argentina/Catamarca",
		"America/Atka": "America/Adak",
		"America/Buenos_Aires": "America/Argentina/Buenos_Aires",
		"America/Catamarca": "America/Argentina/Catamarca",
		"America/Coral_Harbour": "America/Atikokan",
		"America/Cordoba": "America/Argentina/Cordoba",
		"America/Ensenada": "America/Tijuana",
		"America/Fort_Wayne": "America/Indiana/Indianapolis",
		"America/Indianapolis": "America/Indiana/Indianapolis",
		"America/Jujuy": "America/Argentina/Jujuy",
		"America/Knox_IN": "America/Indiana/Knox",
		"America/Kralendijk": "America/Curacao",
		"America/Louisville": "America/Kentucky/Louisville",
		"America/Lower_Princes": "America/Curacao",
		"America/Marigot": "America/Guadeloupe",
		"America/Mendoza": "America/Argentina/Mendoza",
		"America/Porto_Acre": "America/Rio_Branco",
		"America/Rosario": "America/Argentina/Cordoba",
		"America/Shiprock": "America/Denver",
		"America/St_Barthelemy": "America/Guadeloupe",
		"America/Virgin": "America/St_Thomas",
		"Antarctica/South_Pole": "Antarctica/McMurdo",
		"Arctic/Longyearbyen": "Europe/Oslo",
		"Asia/Ashkhabad": "Asia/Ashgabat",
		"Asia/Calcutta": "Asia/Kolkata",
		"Asia/Chungking": "Asia/Chongqing",
		"Asia/Dacca": "Asia/Dhaka",
		"Asia/Istanbul": "Europe/Istanbul",
		"Asia/Katmandu": "Asia/Kathmandu",
		"Asia/Macao": "Asia/Macau",
		"Asia/Saigon": "Asia/Ho_Chi_Minh",
		"Asia/Tel_Aviv": "Asia/Jerusalem",
		"Asia/Thimbu": "Asia/Thimphu",
		"Asia/Ujung_Pandang": "Asia/Makassar",
		"Asia/Ulan_Bator": "Asia/Ulaanbaatar",
		"Atlantic/Faeroe": "Atlantic/Faroe",
		"Atlantic/Jan_Mayen": "Europe/Oslo",
		"Australia/ACT": "Australia/Sydney",
		"Australia/Canberra": "Australia/Sydney",
		"Australia/LHI": "Australia/Lord_Howe",
		"Australia/NSW": "Australia/Sydney",
		"Australia/North": "Australia/Darwin",
		"Australia/Queensland": "Australia/Brisbane",
		"Australia/South": "Australia/Adelaide",
		"Australia/Tasmania": "Australia/Hobart",
		"Australia/Victoria": "Australia/Melbourne",
		"Australia/West": "Australia/Perth",
		"Australia/Yancowinna": "Australia/Broken_Hill",
		"Brazil/Acre": "America/Rio_Branco",
		"Brazil/DeNoronha": "America/Noronha",
		"Brazil/East": "America/Sao_Paulo",
		"Brazil/West": "America/Manaus",
		"Canada/Atlantic": "America/Halifax",
		"Canada/Central": "America/Winnipeg",
		"Canada/East-Saskatchewan": "America/Regina",
		"Canada/Eastern": "America/Toronto",
		"Canada/Mountain": "America/Edmonton",
		"Canada/Newfoundland": "America/St_Johns",
		"Canada/Pacific": "America/Vancouver",
		"Canada/Saskatchewan": "America/Regina",
		"Canada/Yukon": "America/Whitehorse",
		"Chile/Continental": "America/Santiago",
		"Chile/EasterIsland": "Pacific/Easter",
		"Cuba": "America/Havana",
		"Egypt": "Africa/Cairo",
		"Eire": "Europe/Dublin",
		"Etc/GMT+0": "Etc/GMT",
		"Etc/GMT-0": "Etc/GMT",
		"Etc/GMT0": "Etc/GMT",
		"Etc/Greenwich": "Etc/GMT",
		"Etc/Universal": "Etc/UTC",
		"Etc/Zulu": "Etc/UTC",
		"Europe/Belfast": "Europe/London",
		"Europe/Bratislava": "Europe/Prague",
		"Europe/Busingen": "Europe/Zurich",
		"Europe/Guernsey": "Europe/London",
		"Europe/Isle_of_Man": "Europe/London",
		"Europe/Jersey": "Europe/London",
		"Europe/Ljubljana": "Europe/Belgrade",
		"Europe/Mariehamn": "Europe/Helsinki",
		"Europe/Nicosia": "Asia/Nicosia",
		"Europe/Podgorica": "Europe/Belgrade",
		"Europe/San_Marino": "Europe/Rome",
		"Europe/Sarajevo": "Europe/Belgrade",
		"Europe/Skopje": "Europe/Belgrade",
		"Europe/Tiraspol": "Europe/Chisinau",
		"Europe/Vatican": "Europe/Rome",
		"Europe/Zagreb": "Europe/Belgrade",
		"GB": "Europe/London",
		"GB-Eire": "Europe/London",
		"GMT": "Etc/GMT",
		"GMT+0": "Etc/GMT",
		"GMT-0": "Etc/GMT",
		"GMT0": "Etc/GMT",
		"Greenwich": "Etc/GMT",
		"Hongkong": "Asia/Hong_Kong",
		"Iceland": "Atlantic/Reykjavik",
		"Iran": "Asia/Tehran",
		"Israel": "Asia/Jerusalem",
		"Jamaica": "America/Jamaica",
		"Japan": "Asia/Tokyo",
		"Kwajalein": "Pacific/Kwajalein",
		"Libya": "Africa/Tripoli",
		"Mexico/BajaNorte": "America/Tijuana",
		"Mexico/BajaSur": "America/Mazatlan",
		"Mexico/General": "America/Mexico_City",
		"NZ": "Pacific/Auckland",
		"NZ-CHAT": "Pacific/Chatham",
		"Navajo": "America/Denver",
		"PRC": "Asia/Shanghai",
		"Pacific/Ponape": "Pacific/Pohnpei",
		"Pacific/Samoa": "Pacific/Pago_Pago",
		"Pacific/Truk": "Pacific/Chuuk",
		"Pacific/Yap": "Pacific/Chuuk",
		"Poland": "Europe/Warsaw",
		"Portugal": "Europe/Lisbon",
		"ROC": "Asia/Taipei",
		"ROK": "Asia/Seoul",
		"Singapore": "Asia/Singapore",
		"Turkey": "Europe/Istanbul",
		"UCT": "Etc/UCT",
		"US/Alaska": "America/Anchorage",
		"US/Aleutian": "America/Adak",
		"US/Arizona": "America/Phoenix",
		"US/Central": "America/Chicago",
		"US/East-Indiana": "America/Indiana/Indianapolis",
		"US/Eastern": "America/New_York",
		"US/Hawaii": "Pacific/Honolulu",
		"US/Indiana-Starke": "America/Indiana/Knox",
		"US/Michigan": "America/Detroit",
		"US/Mountain": "America/Denver",
		"US/Pacific": "America/Los_Angeles",
		"US/Samoa": "Pacific/Pago_Pago",
		"UTC": "Etc/UTC",
		"Universal": "Etc/UTC",
		"W-SU": "Europe/Moscow",
		"Zulu": "Etc/UTC"
	},
	"meta": {
		"Africa/Abidjan": {
			"lat": 5.3167,
			"lon": -3.9667,
			"rules": ""
		},
		"Africa/Accra": {
			"lat": 5.55,
			"lon": 0.2167,
			"rules": "Ghana"
		},
		"Africa/Addis_Ababa": {
			"lat": 9.0333,
			"lon": 38.7,
			"rules": ""
		},
		"Africa/Algiers": {
			"lat": 36.7833,
			"lon": 3.05,
			"rules": "Algeria"
		},
		"Africa/Asmara": {
			"lat": 15.3333,
			"lon": 38.8833,
			"rules": ""
		},
		"Africa/Bamako": {
			"lat": 12.65,
			"lon": -8,
			"rules": ""
		},
		"Africa/Bangui": {
			"lat": 4.3667,
			"lon": 18.5833,
			"rules": ""
		},
		"Africa/Banjul": {
			"lat": 13.4667,
			"lon": -15.35,
			"rules": ""
		},
		"Africa/Bissau": {
			"lat": 11.85,
			"lon": -14.4167,
			"rules": ""
		},
		"Africa/Blantyre": {
			"lat": -14.2167,
			"lon": 35,
			"rules": ""
		},
		"Africa/Brazzaville": {
			"lat": -3.7333,
			"lon": 15.2833,
			"rules": ""
		},
		"Africa/Bujumbura": {
			"lat": -2.6167,
			"lon": 29.3667,
			"rules": ""
		},
		"Africa/Cairo": {
			"lat": 30.05,
			"lon": 31.25,
			"rules": "Egypt"
		},
		"Africa/Casablanca": {
			"lat": 33.65,
			"lon": -6.4167,
			"rules": "Morocco"
		},
		"Africa/Ceuta": {
			"lat": 35.8833,
			"lon": -4.6833,
			"rules": "Spain SpainAfrica EU"
		},
		"Africa/Conakry": {
			"lat": 9.5167,
			"lon": -12.2833,
			"rules": ""
		},
		"Africa/Dakar": {
			"lat": 14.6667,
			"lon": -16.5667,
			"rules": ""
		},
		"Africa/Dar_es_Salaam": {
			"lat": -5.2,
			"lon": 39.2833,
			"rules": ""
		},
		"Africa/Djibouti": {
			"lat": 11.6,
			"lon": 43.15,
			"rules": ""
		},
		"Africa/Douala": {
			"lat": 4.05,
			"lon": 9.7,
			"rules": ""
		},
		"Africa/El_Aaiun": {
			"lat": 27.15,
			"lon": -12.8,
			"rules": ""
		},
		"Africa/Freetown": {
			"lat": 8.5,
			"lon": -12.75,
			"rules": "SL"
		},
		"Africa/Gaborone": {
			"lat": -23.35,
			"lon": 25.9167,
			"rules": ""
		},
		"Africa/Harare": {
			"lat": -16.1667,
			"lon": 31.05,
			"rules": ""
		},
		"Africa/Johannesburg": {
			"lat": -25.75,
			"lon": 28,
			"rules": "SA"
		},
		"Africa/Juba": {
			"lat": 4.85,
			"lon": 31.6,
			"rules": "Sudan"
		},
		"Africa/Kampala": {
			"lat": 0.3167,
			"lon": 32.4167,
			"rules": ""
		},
		"Africa/Khartoum": {
			"lat": 15.6,
			"lon": 32.5333,
			"rules": "Sudan"
		},
		"Africa/Kigali": {
			"lat": -0.05,
			"lon": 30.0667,
			"rules": ""
		},
		"Africa/Kinshasa": {
			"lat": -3.7,
			"lon": 15.3,
			"rules": ""
		},
		"Africa/Lagos": {
			"lat": 6.45,
			"lon": 3.4,
			"rules": ""
		},
		"Africa/Libreville": {
			"lat": 0.3833,
			"lon": 9.45,
			"rules": ""
		},
		"Africa/Lome": {
			"lat": 6.1333,
			"lon": 1.2167,
			"rules": ""
		},
		"Africa/Luanda": {
			"lat": -7.2,
			"lon": 13.2333,
			"rules": ""
		},
		"Africa/Lubumbashi": {
			"lat": -10.3333,
			"lon": 27.4667,
			"rules": ""
		},
		"Africa/Lusaka": {
			"lat": -14.5833,
			"lon": 28.2833,
			"rules": ""
		},
		"Africa/Malabo": {
			"lat": 3.75,
			"lon": 8.7833,
			"rules": ""
		},
		"Africa/Maputo": {
			"lat": -24.0333,
			"lon": 32.5833,
			"rules": ""
		},
		"Africa/Maseru": {
			"lat": -28.5333,
			"lon": 27.5,
			"rules": ""
		},
		"Africa/Mbabane": {
			"lat": -25.7,
			"lon": 31.1,
			"rules": ""
		},
		"Africa/Mogadishu": {
			"lat": 2.0667,
			"lon": 45.3667,
			"rules": ""
		},
		"Africa/Monrovia": {
			"lat": 6.3,
			"lon": -9.2167,
			"rules": ""
		},
		"Africa/Nairobi": {
			"lat": -0.7167,
			"lon": 36.8167,
			"rules": ""
		},
		"Africa/Ndjamena": {
			"lat": 12.1167,
			"lon": 15.05,
			"rules": ""
		},
		"Africa/Niamey": {
			"lat": 13.5167,
			"lon": 2.1167,
			"rules": ""
		},
		"Africa/Nouakchott": {
			"lat": 18.1,
			"lon": -14.05,
			"rules": ""
		},
		"Africa/Ouagadougou": {
			"lat": 12.3667,
			"lon": -0.4833,
			"rules": ""
		},
		"Africa/Porto-Novo": {
			"lat": 6.4833,
			"lon": 2.6167,
			"rules": ""
		},
		"Africa/Sao_Tome": {
			"lat": 0.3333,
			"lon": 6.7333,
			"rules": ""
		},
		"Africa/Tripoli": {
			"lat": 32.9,
			"lon": 13.1833,
			"rules": "Libya"
		},
		"Africa/Tunis": {
			"lat": 36.8,
			"lon": 10.1833,
			"rules": "Tunisia"
		},
		"Africa/Windhoek": {
			"lat": -21.4333,
			"lon": 17.1,
			"rules": "Namibia"
		},
		"America/Adak": {
			"lat": 51.88,
			"lon": -175.3419,
			"rules": "US"
		},
		"America/Anchorage": {
			"lat": 61.2181,
			"lon": -148.0997,
			"rules": "US"
		},
		"America/Anguilla": {
			"lat": 18.2,
			"lon": -62.9333,
			"rules": ""
		},
		"America/Antigua": {
			"lat": 17.05,
			"lon": -60.2,
			"rules": ""
		},
		"America/Araguaina": {
			"lat": -6.8,
			"lon": -47.8,
			"rules": "Brazil"
		},
		"America/Argentina/Buenos_Aires": {
			"lat": -33.4,
			"lon": -57.55,
			"rules": "Arg"
		},
		"America/Argentina/Catamarca": {
			"lat": -27.5333,
			"lon": -64.2167,
			"rules": "Arg"
		},
		"America/Argentina/Cordoba": {
			"lat": -30.6,
			"lon": -63.8167,
			"rules": "Arg"
		},
		"America/Argentina/Jujuy": {
			"lat": -23.8167,
			"lon": -64.7,
			"rules": "Arg"
		},
		"America/Argentina/La_Rioja": {
			"lat": -28.5667,
			"lon": -65.15,
			"rules": "Arg"
		},
		"America/Argentina/Mendoza": {
			"lat": -31.1167,
			"lon": -67.1833,
			"rules": "Arg"
		},
		"America/Argentina/Rio_Gallegos": {
			"lat": -50.3667,
			"lon": -68.7833,
			"rules": "Arg"
		},
		"America/Argentina/Salta": {
			"lat": -23.2167,
			"lon": -64.5833,
			"rules": "Arg"
		},
		"America/Argentina/San_Juan": {
			"lat": -30.4667,
			"lon": -67.4833,
			"rules": "Arg"
		},
		"America/Argentina/San_Luis": {
			"lat": -32.6833,
			"lon": -65.65,
			"rules": "Arg SanLuis"
		},
		"America/Argentina/Tucuman": {
			"lat": -25.1833,
			"lon": -64.7833,
			"rules": "Arg"
		},
		"America/Argentina/Ushuaia": {
			"lat": -53.2,
			"lon": -67.7,
			"rules": "Arg"
		},
		"America/Aruba": {
			"lat": 12.5,
			"lon": -68.0333,
			"rules": ""
		},
		"America/Asuncion": {
			"lat": -24.7333,
			"lon": -56.3333,
			"rules": "Para"
		},
		"America/Atikokan": {
			"lat": 48.7586,
			"lon": -90.3783,
			"rules": "Canada"
		},
		"America/Bahia": {
			"lat": -11.0167,
			"lon": -37.4833,
			"rules": "Brazil"
		},
		"America/Bahia_Banderas": {
			"lat": 20.8,
			"lon": -104.75,
			"rules": "Mexico"
		},
		"America/Barbados": {
			"lat": 13.1,
			"lon": -58.3833,
			"rules": "Barb"
		},
		"America/Belem": {
			"lat": -0.55,
			"lon": -47.5167,
			"rules": "Brazil"
		},
		"America/Belize": {
			"lat": 17.5,
			"lon": -87.8,
			"rules": "Belize"
		},
		"America/Blanc-Sablon": {
			"lat": 51.4167,
			"lon": -56.8833,
			"rules": "Canada"
		},
		"America/Boa_Vista": {
			"lat": 2.8167,
			"lon": -59.3333,
			"rules": "Brazil"
		},
		"America/Bogota": {
			"lat": 4.6,
			"lon": -73.9167,
			"rules": "CO"
		},
		"America/Boise": {
			"lat": 43.6136,
			"lon": -115.7975,
			"rules": "US"
		},
		"America/Cambridge_Bay": {
			"lat": 69.1139,
			"lon": -104.9472,
			"rules": "NT_YK Canada"
		},
		"America/Campo_Grande": {
			"lat": -19.55,
			"lon": -53.3833,
			"rules": "Brazil"
		},
		"America/Cancun": {
			"lat": 21.0833,
			"lon": -85.2333,
			"rules": "Mexico"
		},
		"America/Caracas": {
			"lat": 10.5,
			"lon": -65.0667,
			"rules": ""
		},
		"America/Cayenne": {
			"lat": 4.9333,
			"lon": -51.6667,
			"rules": ""
		},
		"America/Cayman": {
			"lat": 19.3,
			"lon": -80.6167,
			"rules": ""
		},
		"America/Chicago": {
			"lat": 41.85,
			"lon": -86.35,
			"rules": "US Chicago"
		},
		"America/Chihuahua": {
			"lat": 28.6333,
			"lon": -105.9167,
			"rules": "Mexico"
		},
		"America/Costa_Rica": {
			"lat": 9.9333,
			"lon": -83.9167,
			"rules": "CR"
		},
		"America/Creston": {
			"lat": 49.1,
			"lon": -115.4833,
			"rules": ""
		},
		"America/Cuiaba": {
			"lat": -14.4167,
			"lon": -55.9167,
			"rules": "Brazil"
		},
		"America/Curacao": {
			"lat": 12.1833,
			"lon": -69,
			"rules": ""
		},
		"America/Danmarkshavn": {
			"lat": 76.7667,
			"lon": -17.3333,
			"rules": "EU"
		},
		"America/Dawson": {
			"lat": 64.0667,
			"lon": -138.5833,
			"rules": "NT_YK Canada"
		},
		"America/Dawson_Creek": {
			"lat": 59.7667,
			"lon": -119.7667,
			"rules": "Canada Vanc"
		},
		"America/Denver": {
			"lat": 39.7392,
			"lon": -103.0158,
			"rules": "US Denver"
		},
		"America/Detroit": {
			"lat": 42.3314,
			"lon": -82.9542,
			"rules": "US Detroit"
		},
		"America/Dominica": {
			"lat": 15.3,
			"lon": -60.6,
			"rules": ""
		},
		"America/Edmonton": {
			"lat": 53.55,
			"lon": -112.5333,
			"rules": "Edm Canada"
		},
		"America/Eirunepe": {
			"lat": -5.3333,
			"lon": -68.1333,
			"rules": "Brazil"
		},
		"America/El_Salvador": {
			"lat": 13.7,
			"lon": -88.8,
			"rules": "Salv"
		},
		"America/Fortaleza": {
			"lat": -2.2833,
			"lon": -37.5,
			"rules": "Brazil"
		},
		"America/Glace_Bay": {
			"lat": 46.2,
			"lon": -58.05,
			"rules": "Canada Halifax"
		},
		"America/Godthab": {
			"lat": 64.1833,
			"lon": -50.2667,
			"rules": "EU"
		},
		"America/Goose_Bay": {
			"lat": 53.3333,
			"lon": -59.5833,
			"rules": "Canada StJohns"
		},
		"America/Grand_Turk": {
			"lat": 21.4667,
			"lon": -70.8667,
			"rules": "TC"
		},
		"America/Grenada": {
			"lat": 12.05,
			"lon": -60.25,
			"rules": ""
		},
		"America/Guadeloupe": {
			"lat": 16.2333,
			"lon": -60.4667,
			"rules": ""
		},
		"America/Guatemala": {
			"lat": 14.6333,
			"lon": -89.4833,
			"rules": "Guat"
		},
		"America/Guayaquil": {
			"lat": -1.8333,
			"lon": -78.1667,
			"rules": ""
		},
		"America/Guyana": {
			"lat": 6.8,
			"lon": -57.8333,
			"rules": ""
		},
		"America/Halifax": {
			"lat": 44.65,
			"lon": -62.4,
			"rules": "Halifax Canada"
		},
		"America/Havana": {
			"lat": 23.1333,
			"lon": -81.6333,
			"rules": "Cuba"
		},
		"America/Hermosillo": {
			"lat": 29.0667,
			"lon": -109.0333,
			"rules": "Mexico"
		},
		"America/Indiana/Indianapolis": {
			"lat": 39.7683,
			"lon": -85.8419,
			"rules": "US Indianapolis"
		},
		"America/Indiana/Knox": {
			"lat": 41.2958,
			"lon": -85.375,
			"rules": "US Starke"
		},
		"America/Indiana/Marengo": {
			"lat": 38.3756,
			"lon": -85.6553,
			"rules": "US Marengo"
		},
		"America/Indiana/Petersburg": {
			"lat": 38.4919,
			"lon": -86.7214,
			"rules": "US Pike"
		},
		"America/Indiana/Tell_City": {
			"lat": 37.9531,
			"lon": -85.2386,
			"rules": "US Perry"
		},
		"America/Indiana/Vevay": {
			"lat": 38.7478,
			"lon": -84.9328,
			"rules": "US"
		},
		"America/Indiana/Vincennes": {
			"lat": 38.6772,
			"lon": -86.4714,
			"rules": "US Vincennes"
		},
		"America/Indiana/Winamac": {
			"lat": 41.0514,
			"lon": -85.3969,
			"rules": "US Pulaski"
		},
		"America/Inuvik": {
			"lat": 68.3497,
			"lon": -132.2833,
			"rules": "NT_YK Canada"
		},
		"America/Iqaluit": {
			"lat": 63.7333,
			"lon": -67.5333,
			"rules": "NT_YK Canada"
		},
		"America/Jamaica": {
			"lat": 18,
			"lon": -75.2,
			"rules": "US"
		},
		"America/Juneau": {
			"lat": 58.3019,
			"lon": -133.5803,
			"rules": "US"
		},
		"America/Kentucky/Louisville": {
			"lat": 38.2542,
			"lon": -84.2406,
			"rules": "US Louisville"
		},
		"America/Kentucky/Monticello": {
			"lat": 36.8297,
			"lon": -83.1508,
			"rules": "US"
		},
		"America/Kralendijk": {
			"lat": 12.1508,
			"lon": -67.7233,
			"rules": ""
		},
		"America/La_Paz": {
			"lat": -15.5,
			"lon": -67.85,
			"rules": ""
		},
		"America/Lima": {
			"lat": -11.95,
			"lon": -76.95,
			"rules": "Peru"
		},
		"America/Los_Angeles": {
			"lat": 34.0522,
			"lon": -117.7572,
			"rules": "US CA"
		},
		"America/Lower_Princes": {
			"lat": 18.0514,
			"lon": -62.9528,
			"rules": ""
		},
		"America/Maceio": {
			"lat": -8.3333,
			"lon": -34.2833,
			"rules": "Brazil"
		},
		"America/Managua": {
			"lat": 12.15,
			"lon": -85.7167,
			"rules": "Nic"
		},
		"America/Manaus": {
			"lat": -2.8667,
			"lon": -59.9833,
			"rules": "Brazil"
		},
		"America/Marigot": {
			"lat": 18.0667,
			"lon": -62.9167,
			"rules": ""
		},
		"America/Martinique": {
			"lat": 14.6,
			"lon": -60.9167,
			"rules": ""
		},
		"America/Matamoros": {
			"lat": 25.8333,
			"lon": -96.5,
			"rules": "US Mexico"
		},
		"America/Mazatlan": {
			"lat": 23.2167,
			"lon": -105.5833,
			"rules": "Mexico"
		},
		"America/Menominee": {
			"lat": 45.1078,
			"lon": -86.3858,
			"rules": "US Menominee"
		},
		"America/Merida": {
			"lat": 20.9667,
			"lon": -88.3833,
			"rules": "Mexico"
		},
		"America/Metlakatla": {
			"lat": 55.1269,
			"lon": -130.4236,
			"rules": "US"
		},
		"America/Mexico_City": {
			"lat": 19.4,
			"lon": -98.85,
			"rules": "Mexico"
		},
		"America/Miquelon": {
			"lat": 47.05,
			"lon": -55.6667,
			"rules": "Canada"
		},
		"America/Moncton": {
			"lat": 46.1,
			"lon": -63.2167,
			"rules": "Canada Moncton"
		},
		"America/Monterrey": {
			"lat": 25.6667,
			"lon": -99.6833,
			"rules": "US Mexico"
		},
		"America/Montevideo": {
			"lat": -33.1167,
			"lon": -55.8167,
			"rules": "Uruguay"
		},
		"America/Montreal": {
			"lat": 45.5167,
			"lon": -72.4333,
			"rules": "Mont Canada"
		},
		"America/Montserrat": {
			"lat": 16.7167,
			"lon": -61.7833,
			"rules": ""
		},
		"America/Nassau": {
			"lat": 25.0833,
			"lon": -76.65,
			"rules": "Bahamas US"
		},
		"America/New_York": {
			"lat": 40.7142,
			"lon": -73.9936,
			"rules": "US NYC"
		},
		"America/Nipigon": {
			"lat": 49.0167,
			"lon": -87.7333,
			"rules": "Canada"
		},
		"America/Nome": {
			"lat": 64.5011,
			"lon": -164.5936,
			"rules": "US"
		},
		"America/Noronha": {
			"lat": -2.15,
			"lon": -31.5833,
			"rules": "Brazil"
		},
		"America/North_Dakota/Beulah": {
			"lat": 47.2642,
			"lon": -100.2222,
			"rules": "US"
		},
		"America/North_Dakota/Center": {
			"lat": 47.1164,
			"lon": -100.7008,
			"rules": "US"
		},
		"America/North_Dakota/New_Salem": {
			"lat": 46.845,
			"lon": -100.5892,
			"rules": "US"
		},
		"America/Ojinaga": {
			"lat": 29.5667,
			"lon": -103.5833,
			"rules": "Mexico US"
		},
		"America/Panama": {
			"lat": 8.9667,
			"lon": -78.4667,
			"rules": ""
		},
		"America/Pangnirtung": {
			"lat": 66.1333,
			"lon": -64.2667,
			"rules": "NT_YK Canada"
		},
		"America/Paramaribo": {
			"lat": 5.8333,
			"lon": -54.8333,
			"rules": ""
		},
		"America/Phoenix": {
			"lat": 33.4483,
			"lon": -111.9267,
			"rules": "US"
		},
		"America/Port-au-Prince": {
			"lat": 18.5333,
			"lon": -71.6667,
			"rules": "Haiti"
		},
		"America/Port_of_Spain": {
			"lat": 10.65,
			"lon": -60.4833,
			"rules": ""
		},
		"America/Porto_Velho": {
			"lat": -7.2333,
			"lon": -62.1,
			"rules": "Brazil"
		},
		"America/Puerto_Rico": {
			"lat": 18.4683,
			"lon": -65.8939,
			"rules": "US"
		},
		"America/Rainy_River": {
			"lat": 48.7167,
			"lon": -93.4333,
			"rules": "Canada"
		},
		"America/Rankin_Inlet": {
			"lat": 62.8167,
			"lon": -91.9169,
			"rules": "NT_YK Canada"
		},
		"America/Recife": {
			"lat": -7.95,
			"lon": -33.1,
			"rules": "Brazil"
		},
		"America/Regina": {
			"lat": 50.4,
			"lon": -103.35,
			"rules": "Regina"
		},
		"America/Resolute": {
			"lat": 74.6956,
			"lon": -93.1708,
			"rules": "NT_YK Canada"
		},
		"America/Rio_Branco": {
			"lat": -8.0333,
			"lon": -66.2,
			"rules": "Brazil"
		},
		"America/Santa_Isabel": {
			"lat": 30.3,
			"lon": -113.1333,
			"rules": "CA US Mexico"
		},
		"America/Santarem": {
			"lat": -1.5667,
			"lon": -53.1333,
			"rules": "Brazil"
		},
		"America/Santiago": {
			"lat": -32.55,
			"lon": -69.3333,
			"rules": "Chile"
		},
		"America/Santo_Domingo": {
			"lat": 18.4667,
			"lon": -68.1,
			"rules": "DR US"
		},
		"America/Sao_Paulo": {
			"lat": -22.4667,
			"lon": -45.3833,
			"rules": "Brazil"
		},
		"America/Scoresbysund": {
			"lat": 70.4833,
			"lon": -20.0333,
			"rules": "C-Eur EU"
		},
		"America/Shiprock": {
			"lat": 36.7856,
			"lon": -107.3136,
			"rules": ""
		},
		"America/Sitka": {
			"lat": 57.1764,
			"lon": -134.6981,
			"rules": "US"
		},
		"America/St_Barthelemy": {
			"lat": 17.8833,
			"lon": -61.15,
			"rules": ""
		},
		"America/St_Johns": {
			"lat": 47.5667,
			"lon": -51.2833,
			"rules": "StJohns Canada"
		},
		"America/St_Kitts": {
			"lat": 17.3,
			"lon": -61.2833,
			"rules": ""
		},
		"America/St_Lucia": {
			"lat": 14.0167,
			"lon": -61,
			"rules": ""
		},
		"America/St_Thomas": {
			"lat": 18.35,
			"lon": -63.0667,
			"rules": ""
		},
		"America/St_Vincent": {
			"lat": 13.15,
			"lon": -60.7667,
			"rules": ""
		},
		"America/Swift_Current": {
			"lat": 50.2833,
			"lon": -106.1667,
			"rules": "Canada Regina Swift"
		},
		"America/Tegucigalpa": {
			"lat": 14.1,
			"lon": -86.7833,
			"rules": "Hond"
		},
		"America/Thule": {
			"lat": 76.5667,
			"lon": -67.2167,
			"rules": "Thule"
		},
		"America/Thunder_Bay": {
			"lat": 48.3833,
			"lon": -88.75,
			"rules": "Canada Mont"
		},
		"America/Tijuana": {
			"lat": 32.5333,
			"lon": -116.9833,
			"rules": "CA US Mexico"
		},
		"America/Toronto": {
			"lat": 43.65,
			"lon": -78.6167,
			"rules": "Canada Toronto"
		},
		"America/Tortola": {
			"lat": 18.45,
			"lon": -63.3833,
			"rules": ""
		},
		"America/Vancouver": {
			"lat": 49.2667,
			"lon": -122.8833,
			"rules": "Vanc Canada"
		},
		"America/Whitehorse": {
			"lat": 60.7167,
			"lon": -134.95,
			"rules": "NT_YK Canada"
		},
		"America/Winnipeg": {
			"lat": 49.8833,
			"lon": -96.85,
			"rules": "Winn Canada"
		},
		"America/Yakutat": {
			"lat": 59.5469,
			"lon": -138.2728,
			"rules": "US"
		},
		"America/Yellowknife": {
			"lat": 62.45,
			"lon": -113.65,
			"rules": "NT_YK Canada"
		},
		"Antarctica/Casey": {
			"lat": -65.7167,
			"lon": 110.5167,
			"rules": ""
		},
		"Antarctica/Davis": {
			"lat": -67.4167,
			"lon": 77.9667,
			"rules": ""
		},
		"Antarctica/DumontDUrville": {
			"lat": -65.3333,
			"lon": 140.0167,
			"rules": ""
		},
		"Antarctica/Macquarie": {
			"lat": -53.5,
			"lon": 158.95,
			"rules": "Aus AT"
		},
		"Antarctica/Mawson": {
			"lat": -66.4,
			"lon": 62.8833,
			"rules": ""
		},
		"Antarctica/McMurdo": {
			"lat": -76.1667,
			"lon": 166.6,
			"rules": "NZAQ"
		},
		"Antarctica/Palmer": {
			"lat": -63.2,
			"lon": -63.9,
			"rules": "ArgAQ ChileAQ"
		},
		"Antarctica/Rothera": {
			"lat": -66.4333,
			"lon": -67.8667,
			"rules": ""
		},
		"Antarctica/South_Pole": {
			"lat": -90,
			"lon": 0,
			"rules": ""
		},
		"Antarctica/Syowa": {
			"lat": -68.9939,
			"lon": 39.59,
			"rules": ""
		},
		"Antarctica/Vostok": {
			"lat": -77.6,
			"lon": 106.9,
			"rules": ""
		},
		"Arctic/Longyearbyen": {
			"lat": 78,
			"lon": 16,
			"rules": ""
		},
		"Asia/Aden": {
			"lat": 12.75,
			"lon": 45.2,
			"rules": ""
		},
		"Asia/Almaty": {
			"lat": 43.25,
			"lon": 76.95,
			"rules": "RussiaAsia"
		},
		"Asia/Amman": {
			"lat": 31.95,
			"lon": 35.9333,
			"rules": "Jordan"
		},
		"Asia/Anadyr": {
			"lat": 64.75,
			"lon": 177.4833,
			"rules": "Russia"
		},
		"Asia/Aqtau": {
			"lat": 44.5167,
			"lon": 50.2667,
			"rules": "RussiaAsia"
		},
		"Asia/Aqtobe": {
			"lat": 50.2833,
			"lon": 57.1667,
			"rules": "RussiaAsia"
		},
		"Asia/Ashgabat": {
			"lat": 37.95,
			"lon": 58.3833,
			"rules": "RussiaAsia"
		},
		"Asia/Baghdad": {
			"lat": 33.35,
			"lon": 44.4167,
			"rules": "Iraq"
		},
		"Asia/Bahrain": {
			"lat": 26.3833,
			"lon": 50.5833,
			"rules": ""
		},
		"Asia/Baku": {
			"lat": 40.3833,
			"lon": 49.85,
			"rules": "RussiaAsia EUAsia Azer"
		},
		"Asia/Bangkok": {
			"lat": 13.75,
			"lon": 100.5167,
			"rules": ""
		},
		"Asia/Beirut": {
			"lat": 33.8833,
			"lon": 35.5,
			"rules": "Lebanon"
		},
		"Asia/Bishkek": {
			"lat": 42.9,
			"lon": 74.6,
			"rules": "RussiaAsia Kyrgyz"
		},
		"Asia/Brunei": {
			"lat": 4.9333,
			"lon": 114.9167,
			"rules": ""
		},
		"Asia/Choibalsan": {
			"lat": 48.0667,
			"lon": 114.5,
			"rules": "Mongol"
		},
		"Asia/Chongqing": {
			"lat": 29.5667,
			"lon": 106.5833,
			"rules": "PRC"
		},
		"Asia/Colombo": {
			"lat": 6.9333,
			"lon": 79.85,
			"rules": ""
		},
		"Asia/Damascus": {
			"lat": 33.5,
			"lon": 36.3,
			"rules": "Syria"
		},
		"Asia/Dhaka": {
			"lat": 23.7167,
			"lon": 90.4167,
			"rules": "Dhaka"
		},
		"Asia/Dili": {
			"lat": -7.45,
			"lon": 125.5833,
			"rules": ""
		},
		"Asia/Dubai": {
			"lat": 25.3,
			"lon": 55.3,
			"rules": ""
		},
		"Asia/Dushanbe": {
			"lat": 38.5833,
			"lon": 68.8,
			"rules": "RussiaAsia"
		},
		"Asia/Gaza": {
			"lat": 31.5,
			"lon": 34.4667,
			"rules": "Zion EgyptAsia Jordan Palestine"
		},
		"Asia/Harbin": {
			"lat": 45.75,
			"lon": 126.6833,
			"rules": "PRC"
		},
		"Asia/Hebron": {
			"lat": 31.5333,
			"lon": 35.095,
			"rules": "Zion EgyptAsia Jordan Palestine"
		},
		"Asia/Ho_Chi_Minh": {
			"lat": 10.75,
			"lon": 106.6667,
			"rules": ""
		},
		"Asia/Hong_Kong": {
			"lat": 22.2833,
			"lon": 114.15,
			"rules": "HK"
		},
		"Asia/Hovd": {
			"lat": 48.0167,
			"lon": 91.65,
			"rules": "Mongol"
		},
		"Asia/Irkutsk": {
			"lat": 52.2667,
			"lon": 104.3333,
			"rules": "Russia"
		},
		"Asia/Jakarta": {
			"lat": -5.8333,
			"lon": 106.8,
			"rules": ""
		},
		"Asia/Jayapura": {
			"lat": -1.4667,
			"lon": 140.7,
			"rules": ""
		},
		"Asia/Jerusalem": {
			"lat": 31.7667,
			"lon": 35.2333,
			"rules": "Zion"
		},
		"Asia/Kabul": {
			"lat": 34.5167,
			"lon": 69.2,
			"rules": ""
		},
		"Asia/Kamchatka": {
			"lat": 53.0167,
			"lon": 158.65,
			"rules": "Russia"
		},
		"Asia/Karachi": {
			"lat": 24.8667,
			"lon": 67.05,
			"rules": "Pakistan"
		},
		"Asia/Kashgar": {
			"lat": 39.4833,
			"lon": 75.9833,
			"rules": "PRC"
		},
		"Asia/Kathmandu": {
			"lat": 27.7167,
			"lon": 85.3167,
			"rules": ""
		},
		"Asia/Khandyga": {
			"lat": 62.6564,
			"lon": 135.5539,
			"rules": "Russia"
		},
		"Asia/Kolkata": {
			"lat": 22.5333,
			"lon": 88.3667,
			"rules": ""
		},
		"Asia/Krasnoyarsk": {
			"lat": 56.0167,
			"lon": 92.8333,
			"rules": "Russia"
		},
		"Asia/Kuala_Lumpur": {
			"lat": 3.1667,
			"lon": 101.7,
			"rules": ""
		},
		"Asia/Kuching": {
			"lat": 1.55,
			"lon": 110.3333,
			"rules": "NBorneo"
		},
		"Asia/Kuwait": {
			"lat": 29.3333,
			"lon": 47.9833,
			"rules": ""
		},
		"Asia/Macau": {
			"lat": 22.2333,
			"lon": 113.5833,
			"rules": "Macau PRC"
		},
		"Asia/Magadan": {
			"lat": 59.5667,
			"lon": 150.8,
			"rules": "Russia"
		},
		"Asia/Makassar": {
			"lat": -4.8833,
			"lon": 119.4,
			"rules": ""
		},
		"Asia/Manila": {
			"lat": 14.5833,
			"lon": 121,
			"rules": "Phil"
		},
		"Asia/Muscat": {
			"lat": 23.6,
			"lon": 58.5833,
			"rules": ""
		},
		"Asia/Nicosia": {
			"lat": 35.1667,
			"lon": 33.3667,
			"rules": "Cyprus EUAsia"
		},
		"Asia/Novokuznetsk": {
			"lat": 53.75,
			"lon": 87.1167,
			"rules": "Russia"
		},
		"Asia/Novosibirsk": {
			"lat": 55.0333,
			"lon": 82.9167,
			"rules": "Russia"
		},
		"Asia/Omsk": {
			"lat": 55,
			"lon": 73.4,
			"rules": "Russia"
		},
		"Asia/Oral": {
			"lat": 51.2167,
			"lon": 51.35,
			"rules": "RussiaAsia"
		},
		"Asia/Phnom_Penh": {
			"lat": 11.55,
			"lon": 104.9167,
			"rules": ""
		},
		"Asia/Pontianak": {
			"lat": 0.0333,
			"lon": 109.3333,
			"rules": ""
		},
		"Asia/Pyongyang": {
			"lat": 39.0167,
			"lon": 125.75,
			"rules": ""
		},
		"Asia/Qatar": {
			"lat": 25.2833,
			"lon": 51.5333,
			"rules": ""
		},
		"Asia/Qyzylorda": {
			"lat": 44.8,
			"lon": 65.4667,
			"rules": "RussiaAsia"
		},
		"Asia/Rangoon": {
			"lat": 16.7833,
			"lon": 96.1667,
			"rules": ""
		},
		"Asia/Riyadh": {
			"lat": 24.6333,
			"lon": 46.7167,
			"rules": ""
		},
		"Asia/Sakhalin": {
			"lat": 46.9667,
			"lon": 142.7,
			"rules": "Russia"
		},
		"Asia/Samarkand": {
			"lat": 39.6667,
			"lon": 66.8,
			"rules": "RussiaAsia"
		},
		"Asia/Seoul": {
			"lat": 37.55,
			"lon": 126.9667,
			"rules": "ROK"
		},
		"Asia/Shanghai": {
			"lat": 31.2333,
			"lon": 121.4667,
			"rules": "Shang PRC"
		},
		"Asia/Singapore": {
			"lat": 1.2833,
			"lon": 103.85,
			"rules": ""
		},
		"Asia/Taipei": {
			"lat": 25.05,
			"lon": 121.5,
			"rules": "Taiwan"
		},
		"Asia/Tashkent": {
			"lat": 41.3333,
			"lon": 69.3,
			"rules": "RussiaAsia"
		},
		"Asia/Tbilisi": {
			"lat": 41.7167,
			"lon": 44.8167,
			"rules": "RussiaAsia E-EurAsia"
		},
		"Asia/Tehran": {
			"lat": 35.6667,
			"lon": 51.4333,
			"rules": "Iran"
		},
		"Asia/Thimphu": {
			"lat": 27.4667,
			"lon": 89.65,
			"rules": ""
		},
		"Asia/Tokyo": {
			"lat": 35.6544,
			"lon": 139.7447,
			"rules": "Japan"
		},
		"Asia/Ulaanbaatar": {
			"lat": 47.9167,
			"lon": 106.8833,
			"rules": "Mongol"
		},
		"Asia/Urumqi": {
			"lat": 43.8,
			"lon": 87.5833,
			"rules": "PRC"
		},
		"Asia/Ust-Nera": {
			"lat": 64.5603,
			"lon": 143.2267,
			"rules": "Russia"
		},
		"Asia/Vientiane": {
			"lat": 17.9667,
			"lon": 102.6,
			"rules": ""
		},
		"Asia/Vladivostok": {
			"lat": 43.1667,
			"lon": 131.9333,
			"rules": "Russia"
		},
		"Asia/Yakutsk": {
			"lat": 62,
			"lon": 129.6667,
			"rules": "Russia"
		},
		"Asia/Yekaterinburg": {
			"lat": 56.85,
			"lon": 60.6,
			"rules": "Russia"
		},
		"Asia/Yerevan": {
			"lat": 40.1833,
			"lon": 44.5,
			"rules": "RussiaAsia"
		},
		"Atlantic/Azores": {
			"lat": 37.7333,
			"lon": -24.3333,
			"rules": "Port W-Eur EU"
		},
		"Atlantic/Bermuda": {
			"lat": 32.2833,
			"lon": -63.2333,
			"rules": "Bahamas US"
		},
		"Atlantic/Canary": {
			"lat": 28.1,
			"lon": -14.6,
			"rules": "EU"
		},
		"Atlantic/Cape_Verde": {
			"lat": 14.9167,
			"lon": -22.4833,
			"rules": ""
		},
		"Atlantic/Faroe": {
			"lat": 62.0167,
			"lon": -5.2333,
			"rules": "EU"
		},
		"Atlantic/Madeira": {
			"lat": 32.6333,
			"lon": -15.1,
			"rules": "Port EU"
		},
		"Atlantic/Reykjavik": {
			"lat": 64.15,
			"lon": -20.15,
			"rules": "Iceland"
		},
		"Atlantic/South_Georgia": {
			"lat": -53.7333,
			"lon": -35.4667,
			"rules": ""
		},
		"Atlantic/St_Helena": {
			"lat": -14.0833,
			"lon": -4.3,
			"rules": ""
		},
		"Atlantic/Stanley": {
			"lat": -50.3,
			"lon": -56.15,
			"rules": "Falk"
		},
		"Australia/Adelaide": {
			"lat": -33.0833,
			"lon": 138.5833,
			"rules": "Aus AS"
		},
		"Australia/Brisbane": {
			"lat": -26.5333,
			"lon": 153.0333,
			"rules": "Aus AQ"
		},
		"Australia/Broken_Hill": {
			"lat": -30.05,
			"lon": 141.45,
			"rules": "Aus AN AS"
		},
		"Australia/Currie": {
			"lat": -38.0667,
			"lon": 143.8667,
			"rules": "Aus AT"
		},
		"Australia/Darwin": {
			"lat": -11.5333,
			"lon": 130.8333,
			"rules": "Aus"
		},
		"Australia/Eucla": {
			"lat": -30.2833,
			"lon": 128.8667,
			"rules": "Aus AW"
		},
		"Australia/Hobart": {
			"lat": -41.1167,
			"lon": 147.3167,
			"rules": "Aus AT"
		},
		"Australia/Lindeman": {
			"lat": -19.7333,
			"lon": 149,
			"rules": "Aus AQ Holiday"
		},
		"Australia/Lord_Howe": {
			"lat": -30.45,
			"lon": 159.0833,
			"rules": "LH"
		},
		"Australia/Melbourne": {
			"lat": -36.1833,
			"lon": 144.9667,
			"rules": "Aus AV"
		},
		"Australia/Perth": {
			"lat": -30.05,
			"lon": 115.85,
			"rules": "Aus AW"
		},
		"Australia/Sydney": {
			"lat": -32.1333,
			"lon": 151.2167,
			"rules": "Aus AN"
		},
		"CET": {
			"rules": "C-Eur"
		},
		"CST6CDT": {
			"rules": "US"
		},
		"EET": {
			"rules": "EU"
		},
		"EST": {
			"rules": ""
		},
		"EST5EDT": {
			"rules": "US"
		},
		"Etc/GMT": {
			"rules": ""
		},
		"Etc/GMT+1": {
			"rules": ""
		},
		"Etc/GMT+10": {
			"rules": ""
		},
		"Etc/GMT+11": {
			"rules": ""
		},
		"Etc/GMT+12": {
			"rules": ""
		},
		"Etc/GMT+2": {
			"rules": ""
		},
		"Etc/GMT+3": {
			"rules": ""
		},
		"Etc/GMT+4": {
			"rules": ""
		},
		"Etc/GMT+5": {
			"rules": ""
		},
		"Etc/GMT+6": {
			"rules": ""
		},
		"Etc/GMT+7": {
			"rules": ""
		},
		"Etc/GMT+8": {
			"rules": ""
		},
		"Etc/GMT+9": {
			"rules": ""
		},
		"Etc/GMT-1": {
			"rules": ""
		},
		"Etc/GMT-10": {
			"rules": ""
		},
		"Etc/GMT-11": {
			"rules": ""
		},
		"Etc/GMT-12": {
			"rules": ""
		},
		"Etc/GMT-13": {
			"rules": ""
		},
		"Etc/GMT-14": {
			"rules": ""
		},
		"Etc/GMT-2": {
			"rules": ""
		},
		"Etc/GMT-3": {
			"rules": ""
		},
		"Etc/GMT-4": {
			"rules": ""
		},
		"Etc/GMT-5": {
			"rules": ""
		},
		"Etc/GMT-6": {
			"rules": ""
		},
		"Etc/GMT-7": {
			"rules": ""
		},
		"Etc/GMT-8": {
			"rules": ""
		},
		"Etc/GMT-9": {
			"rules": ""
		},
		"Etc/UCT": {
			"rules": ""
		},
		"Etc/UTC": {
			"rules": ""
		},
		"Europe/Amsterdam": {
			"lat": 52.3667,
			"lon": 4.9,
			"rules": "Neth C-Eur EU"
		},
		"Europe/Andorra": {
			"lat": 42.5,
			"lon": 1.5167,
			"rules": "EU"
		},
		"Europe/Athens": {
			"lat": 37.9667,
			"lon": 23.7167,
			"rules": "Greece EU"
		},
		"Europe/Belgrade": {
			"lat": 44.8333,
			"lon": 20.5,
			"rules": "C-Eur EU"
		},
		"Europe/Berlin": {
			"lat": 52.5,
			"lon": 13.3667,
			"rules": "C-Eur SovietZone Germany EU"
		},
		"Europe/Bratislava": {
			"lat": 48.15,
			"lon": 17.1167,
			"rules": ""
		},
		"Europe/Brussels": {
			"lat": 50.8333,
			"lon": 4.3333,
			"rules": "C-Eur Belgium EU"
		},
		"Europe/Bucharest": {
			"lat": 44.4333,
			"lon": 26.1,
			"rules": "Romania C-Eur E-Eur EU"
		},
		"Europe/Budapest": {
			"lat": 47.5,
			"lon": 19.0833,
			"rules": "C-Eur Hungary EU"
		},
		"Europe/Busingen": {
			"lat": 47.7,
			"lon": 8.6833,
			"rules": ""
		},
		"Europe/Chisinau": {
			"lat": 47,
			"lon": 28.8333,
			"rules": "Romania C-Eur Russia E-Eur EU"
		},
		"Europe/Copenhagen": {
			"lat": 55.6667,
			"lon": 12.5833,
			"rules": "Denmark C-Eur EU"
		},
		"Europe/Dublin": {
			"lat": 53.3333,
			"lon": -5.75,
			"rules": "GB-Eire EU"
		},
		"Europe/Gibraltar": {
			"lat": 36.1333,
			"lon": -4.65,
			"rules": "GB-Eire EU"
		},
		"Europe/Guernsey": {
			"lat": 49.45,
			"lon": -1.4667,
			"rules": ""
		},
		"Europe/Helsinki": {
			"lat": 60.1667,
			"lon": 24.9667,
			"rules": "Finland EU"
		},
		"Europe/Isle_of_Man": {
			"lat": 54.15,
			"lon": -3.5333,
			"rules": ""
		},
		"Europe/Istanbul": {
			"lat": 41.0167,
			"lon": 28.9667,
			"rules": "Turkey EU"
		},
		"Europe/Jersey": {
			"lat": 49.2,
			"lon": -1.8833,
			"rules": ""
		},
		"Europe/Kaliningrad": {
			"lat": 54.7167,
			"lon": 20.5,
			"rules": "C-Eur Poland Russia"
		},
		"Europe/Kiev": {
			"lat": 50.4333,
			"lon": 30.5167,
			"rules": "C-Eur Russia E-Eur EU"
		},
		"Europe/Lisbon": {
			"lat": 38.7167,
			"lon": -8.8667,
			"rules": "Port W-Eur EU"
		},
		"Europe/Ljubljana": {
			"lat": 46.05,
			"lon": 14.5167,
			"rules": ""
		},
		"Europe/London": {
			"lat": 51.5083,
			"lon": 0.1253,
			"rules": "GB-Eire EU"
		},
		"Europe/Luxembourg": {
			"lat": 49.6,
			"lon": 6.15,
			"rules": "Lux Belgium C-Eur EU"
		},
		"Europe/Madrid": {
			"lat": 40.4,
			"lon": -2.3167,
			"rules": "Spain EU"
		},
		"Europe/Malta": {
			"lat": 35.9,
			"lon": 14.5167,
			"rules": "Italy C-Eur Malta EU"
		},
		"Europe/Mariehamn": {
			"lat": 60.1,
			"lon": 19.95,
			"rules": ""
		},
		"Europe/Minsk": {
			"lat": 53.9,
			"lon": 27.5667,
			"rules": "C-Eur Russia"
		},
		"Europe/Monaco": {
			"lat": 43.7,
			"lon": 7.3833,
			"rules": "France EU"
		},
		"Europe/Moscow": {
			"lat": 55.75,
			"lon": 37.5833,
			"rules": "Russia"
		},
		"Europe/Oslo": {
			"lat": 59.9167,
			"lon": 10.75,
			"rules": "Norway C-Eur EU"
		},
		"Europe/Paris": {
			"lat": 48.8667,
			"lon": 2.3333,
			"rules": "France C-Eur EU"
		},
		"Europe/Podgorica": {
			"lat": 42.4333,
			"lon": 19.2667,
			"rules": ""
		},
		"Europe/Prague": {
			"lat": 50.0833,
			"lon": 14.4333,
			"rules": "C-Eur Czech EU"
		},
		"Europe/Riga": {
			"lat": 56.95,
			"lon": 24.1,
			"rules": "C-Eur Russia Latvia EU"
		},
		"Europe/Rome": {
			"lat": 41.9,
			"lon": 12.4833,
			"rules": "Italy C-Eur EU"
		},
		"Europe/Samara": {
			"lat": 53.2,
			"lon": 50.15,
			"rules": "Russia"
		},
		"Europe/San_Marino": {
			"lat": 43.9167,
			"lon": 12.4667,
			"rules": ""
		},
		"Europe/Sarajevo": {
			"lat": 43.8667,
			"lon": 18.4167,
			"rules": ""
		},
		"Europe/Simferopol": {
			"lat": 44.95,
			"lon": 34.1,
			"rules": "C-Eur Russia E-Eur EU"
		},
		"Europe/Skopje": {
			"lat": 41.9833,
			"lon": 21.4333,
			"rules": ""
		},
		"Europe/Sofia": {
			"lat": 42.6833,
			"lon": 23.3167,
			"rules": "C-Eur Bulg E-Eur EU"
		},
		"Europe/Stockholm": {
			"lat": 59.3333,
			"lon": 18.05,
			"rules": "EU"
		},
		"Europe/Tallinn": {
			"lat": 59.4167,
			"lon": 24.75,
			"rules": "C-Eur Russia EU"
		},
		"Europe/Tirane": {
			"lat": 41.3333,
			"lon": 19.8333,
			"rules": "Albania EU"
		},
		"Europe/Uzhgorod": {
			"lat": 48.6167,
			"lon": 22.3,
			"rules": "C-Eur Russia E-Eur EU"
		},
		"Europe/Vaduz": {
			"lat": 47.15,
			"lon": 9.5167,
			"rules": "EU"
		},
		"Europe/Vatican": {
			"lat": 41.9022,
			"lon": 12.4531,
			"rules": ""
		},
		"Europe/Vienna": {
			"lat": 48.2167,
			"lon": 16.3333,
			"rules": "C-Eur Austria EU"
		},
		"Europe/Vilnius": {
			"lat": 54.6833,
			"lon": 25.3167,
			"rules": "C-Eur Russia EU"
		},
		"Europe/Volgograd": {
			"lat": 48.7333,
			"lon": 44.4167,
			"rules": "Russia"
		},
		"Europe/Warsaw": {
			"lat": 52.25,
			"lon": 21,
			"rules": "C-Eur Poland W-Eur EU"
		},
		"Europe/Zagreb": {
			"lat": 45.8,
			"lon": 15.9667,
			"rules": ""
		},
		"Europe/Zaporozhye": {
			"lat": 47.8333,
			"lon": 35.1667,
			"rules": "C-Eur Russia E-Eur EU"
		},
		"Europe/Zurich": {
			"lat": 47.3833,
			"lon": 8.5333,
			"rules": "Swiss EU"
		},
		"HST": {
			"rules": ""
		},
		"Indian/Antananarivo": {
			"lat": -17.0833,
			"lon": 47.5167,
			"rules": ""
		},
		"Indian/Chagos": {
			"lat": -6.6667,
			"lon": 72.4167,
			"rules": ""
		},
		"Indian/Christmas": {
			"lat": -9.5833,
			"lon": 105.7167,
			"rules": ""
		},
		"Indian/Cocos": {
			"lat": -11.8333,
			"lon": 96.9167,
			"rules": ""
		},
		"Indian/Comoro": {
			"lat": -10.3167,
			"lon": 43.2667,
			"rules": ""
		},
		"Indian/Kerguelen": {
			"lat": -48.6472,
			"lon": 70.2175,
			"rules": ""
		},
		"Indian/Mahe": {
			"lat": -3.3333,
			"lon": 55.4667,
			"rules": ""
		},
		"Indian/Maldives": {
			"lat": 4.1667,
			"lon": 73.5,
			"rules": ""
		},
		"Indian/Mauritius": {
			"lat": -19.8333,
			"lon": 57.5,
			"rules": "Mauritius"
		},
		"Indian/Mayotte": {
			"lat": -11.2167,
			"lon": 45.2333,
			"rules": ""
		},
		"Indian/Reunion": {
			"lat": -19.1333,
			"lon": 55.4667,
			"rules": ""
		},
		"MET": {
			"rules": "C-Eur"
		},
		"MST": {
			"rules": ""
		},
		"MST7MDT": {
			"rules": "US"
		},
		"PST8PDT": {
			"rules": "US"
		},
		"Pacific/Apia": {
			"lat": -12.1667,
			"lon": -170.2667,
			"rules": "WS"
		},
		"Pacific/Auckland": {
			"lat": -35.1333,
			"lon": 174.7667,
			"rules": "NZ"
		},
		"Pacific/Chatham": {
			"lat": -42.05,
			"lon": -175.45,
			"rules": "Chatham"
		},
		"Pacific/Chuuk": {
			"lat": 7.4167,
			"lon": 151.7833,
			"rules": ""
		},
		"Pacific/Easter": {
			"lat": -26.85,
			"lon": -108.5667,
			"rules": "Chile"
		},
		"Pacific/Efate": {
			"lat": -16.3333,
			"lon": 168.4167,
			"rules": "Vanuatu"
		},
		"Pacific/Enderbury": {
			"lat": -2.8667,
			"lon": -170.9167,
			"rules": ""
		},
		"Pacific/Fakaofo": {
			"lat": -8.6333,
			"lon": -170.7667,
			"rules": ""
		},
		"Pacific/Fiji": {
			"lat": -17.8667,
			"lon": 178.4167,
			"rules": "Fiji"
		},
		"Pacific/Funafuti": {
			"lat": -7.4833,
			"lon": 179.2167,
			"rules": ""
		},
		"Pacific/Galapagos": {
			"lat": 0.9,
			"lon": -88.4,
			"rules": ""
		},
		"Pacific/Gambier": {
			"lat": -22.8667,
			"lon": -133.05,
			"rules": ""
		},
		"Pacific/Guadalcanal": {
			"lat": -8.4667,
			"lon": 160.2,
			"rules": ""
		},
		"Pacific/Guam": {
			"lat": 13.4667,
			"lon": 144.75,
			"rules": ""
		},
		"Pacific/Honolulu": {
			"lat": 21.3069,
			"lon": -156.1417,
			"rules": ""
		},
		"Pacific/Johnston": {
			"lat": 16.75,
			"lon": -168.4833,
			"rules": ""
		},
		"Pacific/Kiritimati": {
			"lat": 1.8667,
			"lon": -156.6667,
			"rules": ""
		},
		"Pacific/Kosrae": {
			"lat": 5.3167,
			"lon": 162.9833,
			"rules": ""
		},
		"Pacific/Kwajalein": {
			"lat": 9.0833,
			"lon": 167.3333,
			"rules": ""
		},
		"Pacific/Majuro": {
			"lat": 7.15,
			"lon": 171.2,
			"rules": ""
		},
		"Pacific/Marquesas": {
			"lat": -9,
			"lon": -138.5,
			"rules": ""
		},
		"Pacific/Midway": {
			"lat": 28.2167,
			"lon": -176.6333,
			"rules": ""
		},
		"Pacific/Nauru": {
			"lat": 0.5167,
			"lon": 166.9167,
			"rules": ""
		},
		"Pacific/Niue": {
			"lat": -18.9833,
			"lon": -168.0833,
			"rules": ""
		},
		"Pacific/Norfolk": {
			"lat": -28.95,
			"lon": 167.9667,
			"rules": ""
		},
		"Pacific/Noumea": {
			"lat": -21.7333,
			"lon": 166.45,
			"rules": "NC"
		},
		"Pacific/Pago_Pago": {
			"lat": -13.7333,
			"lon": -169.3,
			"rules": ""
		},
		"Pacific/Palau": {
			"lat": 7.3333,
			"lon": 134.4833,
			"rules": ""
		},
		"Pacific/Pitcairn": {
			"lat": -24.9333,
			"lon": -129.9167,
			"rules": ""
		},
		"Pacific/Pohnpei": {
			"lat": 6.9667,
			"lon": 158.2167,
			"rules": ""
		},
		"Pacific/Port_Moresby": {
			"lat": -8.5,
			"lon": 147.1667,
			"rules": ""
		},
		"Pacific/Rarotonga": {
			"lat": -20.7667,
			"lon": -158.2333,
			"rules": "Cook"
		},
		"Pacific/Saipan": {
			"lat": 15.2,
			"lon": 145.75,
			"rules": ""
		},
		"Pacific/Tahiti": {
			"lat": -16.4667,
			"lon": -148.4333,
			"rules": ""
		},
		"Pacific/Tarawa": {
			"lat": 1.4167,
			"lon": 173,
			"rules": ""
		},
		"Pacific/Tongatapu": {
			"lat": -20.8333,
			"lon": -174.8333,
			"rules": "Tonga"
		},
		"Pacific/Wake": {
			"lat": 19.2833,
			"lon": 166.6167,
			"rules": ""
		},
		"Pacific/Wallis": {
			"lat": -12.7,
			"lon": -175.8333,
			"rules": ""
		},
		"WET": {
			"rules": "EU"
		}
	},
	"rules": {
		"AN": [
			"1971 1985 9 0 8 2 2 1",
			"1972 1972 1 27 7 2 2 0",
			"1973 1981 2 1 0 2 2 0",
			"1982 1982 3 1 0 2 2 0",
			"1983 1985 2 1 0 2 2 0",
			"1986 1989 2 15 0 2 2 0",
			"1986 1986 9 19 7 2 2 1",
			"1987 1999 9 0 8 2 2 1",
			"1990 1995 2 1 0 2 2 0",
			"1996 2005 2 0 8 2 2 0",
			"2000 2000 7 0 8 2 2 1",
			"2001 2007 9 0 8 2 2 1",
			"2006 2006 3 1 0 2 2 0",
			"2007 2007 2 0 8 2 2 0",
			"2008 9999 3 1 0 2 2 0",
			"2008 9999 9 1 0 2 2 1"
		],
		"AQ": [
			"1971 1971 9 0 8 2 2 1",
			"1972 1972 1 0 8 2 2 0",
			"1989 1991 9 0 8 2 2 1",
			"1990 1992 2 1 0 2 2 0"
		],
		"AS": [
			"1971 1985 9 0 8 2 2 1",
			"1986 1986 9 19 7 2 2 1",
			"1987 2007 9 0 8 2 2 1",
			"1972 1972 1 27 7 2 2 0",
			"1973 1985 2 1 0 2 2 0",
			"1986 1990 2 15 0 2 2 0",
			"1991 1991 2 3 7 2 2 0",
			"1992 1992 2 22 7 2 2 0",
			"1993 1993 2 7 7 2 2 0",
			"1994 1994 2 20 7 2 2 0",
			"1995 2005 2 0 8 2 2 0",
			"2006 2006 3 2 7 2 2 0",
			"2007 2007 2 0 8 2 2 0",
			"2008 9999 3 1 0 2 2 0",
			"2008 9999 9 1 0 2 2 1"
		],
		"AT": [
			"1967 1967 9 1 0 2 2 1",
			"1968 1968 2 0 8 2 2 0",
			"1968 1985 9 0 8 2 2 1",
			"1969 1971 2 8 0 2 2 0",
			"1972 1972 1 0 8 2 2 0",
			"1973 1981 2 1 0 2 2 0",
			"1982 1983 2 0 8 2 2 0",
			"1984 1986 2 1 0 2 2 0",
			"1986 1986 9 15 0 2 2 1",
			"1987 1990 2 15 0 2 2 0",
			"1987 1987 9 22 0 2 2 1",
			"1988 1990 9 0 8 2 2 1",
			"1991 1999 9 1 0 2 2 1",
			"1991 2005 2 0 8 2 2 0",
			"2000 2000 7 0 8 2 2 1",
			"2001 9999 9 1 0 2 2 1",
			"2006 2006 3 1 0 2 2 0",
			"2007 2007 2 0 8 2 2 0",
			"2008 9999 3 1 0 2 2 0"
		],
		"AV": [
			"1971 1985 9 0 8 2 2 1",
			"1972 1972 1 0 8 2 2 0",
			"1973 1985 2 1 0 2 2 0",
			"1986 1990 2 15 0 2 2 0",
			"1986 1987 9 15 0 2 2 1",
			"1988 1999 9 0 8 2 2 1",
			"1991 1994 2 1 0 2 2 0",
			"1995 2005 2 0 8 2 2 0",
			"2000 2000 7 0 8 2 2 1",
			"2001 2007 9 0 8 2 2 1",
			"2006 2006 3 1 0 2 2 0",
			"2007 2007 2 0 8 2 2 0",
			"2008 9999 3 1 0 2 2 0",
			"2008 9999 9 1 0 2 2 1"
		],
		"AW": [
			"1974 1974 9 0 8 2 2 1",
			"1975 1975 2 1 0 2 2 0",
			"1983 1983 9 0 8 2 2 1",
			"1984 1984 2 1 0 2 2 0",
			"1991 1991 10 17 7 2 2 1",
			"1992 1992 2 1 0 2 2 0",
			"2006 2006 11 3 7 2 2 1",
			"2007 2009 2 0 8 2 2 0",
			"2007 2008 9 0 8 2 2 1"
		],
		"Albania": [
			"1940 1940 5 16 7 0 0 1 S",
			"1942 1942 10 2 7 3 0 0",
			"1943 1943 2 29 7 2 0 1 S",
			"1943 1943 3 10 7 3 0 0",
			"1974 1974 4 4 7 0 0 1 S",
			"1974 1974 9 2 7 0 0 0",
			"1975 1975 4 1 7 0 0 1 S",
			"1975 1975 9 2 7 0 0 0",
			"1976 1976 4 2 7 0 0 1 S",
			"1976 1976 9 3 7 0 0 0",
			"1977 1977 4 8 7 0 0 1 S",
			"1977 1977 9 2 7 0 0 0",
			"1978 1978 4 6 7 0 0 1 S",
			"1978 1978 9 1 7 0 0 0",
			"1979 1979 4 5 7 0 0 1 S",
			"1979 1979 8 30 7 0 0 0",
			"1980 1980 4 3 7 0 0 1 S",
			"1980 1980 9 4 7 0 0 0",
			"1981 1981 3 26 7 0 0 1 S",
			"1981 1981 8 27 7 0 0 0",
			"1982 1982 4 2 7 0 0 1 S",
			"1982 1982 9 3 7 0 0 0",
			"1983 1983 3 18 7 0 0 1 S",
			"1983 1983 9 1 7 0 0 0",
			"1984 1984 3 1 7 0 0 1 S"
		],
		"Algeria": [
			"1916 1916 5 14 7 23 2 1 S",
			"1916 1919 9 1 0 23 2 0",
			"1917 1917 2 24 7 23 2 1 S",
			"1918 1918 2 9 7 23 2 1 S",
			"1919 1919 2 1 7 23 2 1 S",
			"1920 1920 1 14 7 23 2 1 S",
			"1920 1920 9 23 7 23 2 0",
			"1921 1921 2 14 7 23 2 1 S",
			"1921 1921 5 21 7 23 2 0",
			"1939 1939 8 11 7 23 2 1 S",
			"1939 1939 10 19 7 1 0 0",
			"1944 1945 3 1 1 2 0 1 S",
			"1944 1944 9 8 7 2 0 0",
			"1945 1945 8 16 7 1 0 0",
			"1971 1971 3 25 7 23 2 1 S",
			"1971 1971 8 26 7 23 2 0",
			"1977 1977 4 6 7 0 0 1 S",
			"1977 1977 9 21 7 0 0 0",
			"1978 1978 2 24 7 1 0 1 S",
			"1978 1978 8 22 7 3 0 0",
			"1980 1980 3 25 7 0 0 1 S",
			"1980 1980 9 31 7 2 0 0"
		],
		"Arg": [
			"1930 1930 11 1 7 0 0 1 S",
			"1931 1931 3 1 7 0 0 0",
			"1931 1931 9 15 7 0 0 1 S",
			"1932 1940 2 1 7 0 0 0",
			"1932 1939 10 1 7 0 0 1 S",
			"1940 1940 6 1 7 0 0 1 S",
			"1941 1941 5 15 7 0 0 0",
			"1941 1941 9 15 7 0 0 1 S",
			"1943 1943 7 1 7 0 0 0",
			"1943 1943 9 15 7 0 0 1 S",
			"1946 1946 2 1 7 0 0 0",
			"1946 1946 9 1 7 0 0 1 S",
			"1963 1963 9 1 7 0 0 0",
			"1963 1963 11 15 7 0 0 1 S",
			"1964 1966 2 1 7 0 0 0",
			"1964 1966 9 15 7 0 0 1 S",
			"1967 1967 3 2 7 0 0 0",
			"1967 1968 9 1 0 0 0 1 S",
			"1968 1969 3 1 0 0 0 0",
			"1974 1974 0 23 7 0 0 1 S",
			"1974 1974 4 1 7 0 0 0",
			"1988 1988 11 1 7 0 0 1 S",
			"1989 1993 2 1 0 0 0 0",
			"1989 1992 9 15 0 0 0 1 S",
			"1999 1999 9 1 0 0 0 1 S",
			"2000 2000 2 3 7 0 0 0",
			"2007 2007 11 30 7 0 0 1 S",
			"2008 2009 2 15 0 0 0 0",
			"2008 2008 9 15 0 0 0 1 S"
		],
		"ArgAQ": [
			"1964 1966 2 1 7 0 0 0",
			"1964 1966 9 15 7 0 0 1 S",
			"1967 1967 3 2 7 0 0 0",
			"1967 1968 9 1 0 0 0 1 S",
			"1968 1969 3 1 0 0 0 0",
			"1974 1974 0 23 7 0 0 1 S",
			"1974 1974 4 1 7 0 0 0"
		],
		"Aus": [
			"1917 1917 0 1 7 0:1 0 1",
			"1917 1917 2 25 7 2 0 0",
			"1942 1942 0 1 7 2 0 1",
			"1942 1942 2 29 7 2 0 0",
			"1942 1942 8 27 7 2 0 1",
			"1943 1944 2 0 8 2 0 0",
			"1943 1943 9 3 7 2 0 1"
		],
		"Austria": [
			"1920 1920 3 5 7 2 2 1 S",
			"1920 1920 8 13 7 2 2 0",
			"1946 1946 3 14 7 2 2 1 S",
			"1946 1948 9 1 0 2 2 0",
			"1947 1947 3 6 7 2 2 1 S",
			"1948 1948 3 18 7 2 2 1 S",
			"1980 1980 3 6 7 0 0 1 S",
			"1980 1980 8 28 7 0 0 0"
		],
		"Azer": [
			"1997 9999 2 0 8 4 0 1 S",
			"1997 9999 9 0 8 5 0 0"
		],
		"Bahamas": [
			"1964 1975 9 0 8 2 0 0 S",
			"1964 1975 3 0 8 2 0 1 D"
		],
		"Barb": [
			"1977 1977 5 12 7 2 0 1 D",
			"1977 1978 9 1 0 2 0 0 S",
			"1978 1980 3 15 0 2 0 1 D",
			"1979 1979 8 30 7 2 0 0 S",
			"1980 1980 8 25 7 2 0 0 S"
		],
		"Belgium": [
			"1918 1918 2 9 7 0 2 1 S",
			"1918 1919 9 1 6 23 2 0",
			"1919 1919 2 1 7 23 2 1 S",
			"1920 1920 1 14 7 23 2 1 S",
			"1920 1920 9 23 7 23 2 0",
			"1921 1921 2 14 7 23 2 1 S",
			"1921 1921 9 25 7 23 2 0",
			"1922 1922 2 25 7 23 2 1 S",
			"1922 1927 9 1 6 23 2 0",
			"1923 1923 3 21 7 23 2 1 S",
			"1924 1924 2 29 7 23 2 1 S",
			"1925 1925 3 4 7 23 2 1 S",
			"1926 1926 3 17 7 23 2 1 S",
			"1927 1927 3 9 7 23 2 1 S",
			"1928 1928 3 14 7 23 2 1 S",
			"1928 1938 9 2 0 2 2 0",
			"1929 1929 3 21 7 2 2 1 S",
			"1930 1930 3 13 7 2 2 1 S",
			"1931 1931 3 19 7 2 2 1 S",
			"1932 1932 3 3 7 2 2 1 S",
			"1933 1933 2 26 7 2 2 1 S",
			"1934 1934 3 8 7 2 2 1 S",
			"1935 1935 2 31 7 2 2 1 S",
			"1936 1936 3 19 7 2 2 1 S",
			"1937 1937 3 4 7 2 2 1 S",
			"1938 1938 2 27 7 2 2 1 S",
			"1939 1939 3 16 7 2 2 1 S",
			"1939 1939 10 19 7 2 2 0",
			"1940 1940 1 25 7 2 2 1 S",
			"1944 1944 8 17 7 2 2 0",
			"1945 1945 3 2 7 2 2 1 S",
			"1945 1945 8 16 7 2 2 0",
			"1946 1946 4 19 7 2 2 1 S",
			"1946 1946 9 7 7 2 2 0"
		],
		"Belize": [
			"1918 1942 9 2 0 0 0 0:30 HD",
			"1919 1943 1 9 0 0 0 0 S",
			"1973 1973 11 5 7 0 0 1 D",
			"1974 1974 1 9 7 0 0 0 S",
			"1982 1982 11 18 7 0 0 1 D",
			"1983 1983 1 12 7 0 0 0 S"
		],
		"Brazil": [
			"1931 1931 9 3 7 11 0 1 S",
			"1932 1933 3 1 7 0 0 0",
			"1932 1932 9 3 7 0 0 1 S",
			"1949 1952 11 1 7 0 0 1 S",
			"1950 1950 3 16 7 1 0 0",
			"1951 1952 3 1 7 0 0 0",
			"1953 1953 2 1 7 0 0 0",
			"1963 1963 11 9 7 0 0 1 S",
			"1964 1964 2 1 7 0 0 0",
			"1965 1965 0 31 7 0 0 1 S",
			"1965 1965 2 31 7 0 0 0",
			"1965 1965 11 1 7 0 0 1 S",
			"1966 1968 2 1 7 0 0 0",
			"1966 1967 10 1 7 0 0 1 S",
			"1985 1985 10 2 7 0 0 1 S",
			"1986 1986 2 15 7 0 0 0",
			"1986 1986 9 25 7 0 0 1 S",
			"1987 1987 1 14 7 0 0 0",
			"1987 1987 9 25 7 0 0 1 S",
			"1988 1988 1 7 7 0 0 0",
			"1988 1988 9 16 7 0 0 1 S",
			"1989 1989 0 29 7 0 0 0",
			"1989 1989 9 15 7 0 0 1 S",
			"1990 1990 1 11 7 0 0 0",
			"1990 1990 9 21 7 0 0 1 S",
			"1991 1991 1 17 7 0 0 0",
			"1991 1991 9 20 7 0 0 1 S",
			"1992 1992 1 9 7 0 0 0",
			"1992 1992 9 25 7 0 0 1 S",
			"1993 1993 0 31 7 0 0 0",
			"1993 1995 9 11 0 0 0 1 S",
			"1994 1995 1 15 0 0 0 0",
			"1996 1996 1 11 7 0 0 0",
			"1996 1996 9 6 7 0 0 1 S",
			"1997 1997 1 16 7 0 0 0",
			"1997 1997 9 6 7 0 0 1 S",
			"1998 1998 2 1 7 0 0 0",
			"1998 1998 9 11 7 0 0 1 S",
			"1999 1999 1 21 7 0 0 0",
			"1999 1999 9 3 7 0 0 1 S",
			"2000 2000 1 27 7 0 0 0",
			"2000 2001 9 8 0 0 0 1 S",
			"2001 2006 1 15 0 0 0 0",
			"2002 2002 10 3 7 0 0 1 S",
			"2003 2003 9 19 7 0 0 1 S",
			"2004 2004 10 2 7 0 0 1 S",
			"2005 2005 9 16 7 0 0 1 S",
			"2006 2006 10 5 7 0 0 1 S",
			"2007 2007 1 25 7 0 0 0",
			"2007 2007 9 8 0 0 0 1 S",
			"2008 9999 9 15 0 0 0 1 S",
			"2008 2011 1 15 0 0 0 0",
			"2012 2012 1 22 0 0 0 0",
			"2013 2014 1 15 0 0 0 0",
			"2015 2015 1 22 0 0 0 0",
			"2016 2022 1 15 0 0 0 0",
			"2023 2023 1 22 0 0 0 0",
			"2024 2025 1 15 0 0 0 0",
			"2026 2026 1 22 0 0 0 0",
			"2027 2033 1 15 0 0 0 0",
			"2034 2034 1 22 0 0 0 0",
			"2035 2036 1 15 0 0 0 0",
			"2037 2037 1 22 0 0 0 0",
			"2038 9999 1 15 0 0 0 0"
		],
		"Bulg": [
			"1979 1979 2 31 7 23 0 1 S",
			"1979 1979 9 1 7 1 0 0",
			"1980 1982 3 1 6 23 0 1 S",
			"1980 1980 8 29 7 1 0 0",
			"1981 1981 8 27 7 2 0 0"
		],
		"C-Eur": [
			"1916 1916 3 30 7 23 0 1 S",
			"1916 1916 9 1 7 1 0 0",
			"1917 1918 3 15 1 2 2 1 S",
			"1917 1918 8 15 1 2 2 0",
			"1940 1940 3 1 7 2 2 1 S",
			"1942 1942 10 2 7 2 2 0",
			"1943 1943 2 29 7 2 2 1 S",
			"1943 1943 9 4 7 2 2 0",
			"1944 1945 3 1 1 2 2 1 S",
			"1944 1944 9 2 7 2 2 0",
			"1945 1945 8 16 7 2 2 0",
			"1977 1980 3 1 0 2 2 1 S",
			"1977 1977 8 0 8 2 2 0",
			"1978 1978 9 1 7 2 2 0",
			"1979 1995 8 0 8 2 2 0",
			"1981 9999 2 0 8 2 2 1 S",
			"1996 9999 9 0 8 2 2 0"
		],
		"CA": [
			"1948 1948 2 14 7 2 0 1 D",
			"1949 1949 0 1 7 2 0 0 S",
			"1950 1966 3 0 8 2 0 1 D",
			"1950 1961 8 0 8 2 0 0 S",
			"1962 1966 9 0 8 2 0 0 S"
		],
		"CO": [
			"1992 1992 4 3 7 0 0 1 S",
			"1993 1993 3 4 7 0 0 0"
		],
		"CR": [
			"1979 1980 1 0 8 0 0 1 D",
			"1979 1980 5 1 0 0 0 0 S",
			"1991 1992 0 15 6 0 0 1 D",
			"1991 1991 6 1 7 0 0 0 S",
			"1992 1992 2 15 7 0 0 0 S"
		],
		"Canada": [
			"1918 1918 3 14 7 2 0 1 D",
			"1918 1918 9 27 7 2 0 0 S",
			"1942 1942 1 9 7 2 0 1 W",
			"1945 1945 7 14 7 23 1 1 P",
			"1945 1945 8 30 7 2 0 0 S",
			"1974 1986 3 0 8 2 0 1 D",
			"1974 2006 9 0 8 2 0 0 S",
			"1987 2006 3 1 0 2 0 1 D",
			"2007 9999 2 8 0 2 0 1 D",
			"2007 9999 10 1 0 2 0 0 S"
		],
		"Chatham": [
			"1974 1974 10 1 0 2:45 2 1 D",
			"1975 1975 1 0 8 2:45 2 0 S",
			"1975 1988 9 0 8 2:45 2 1 D",
			"1976 1989 2 1 0 2:45 2 0 S",
			"1989 1989 9 8 0 2:45 2 1 D",
			"1990 2006 9 1 0 2:45 2 1 D",
			"1990 2007 2 15 0 2:45 2 0 S",
			"2007 9999 8 0 8 2:45 2 1 D",
			"2008 9999 3 1 0 2:45 2 0 S"
		],
		"Chicago": [
			"1920 1920 5 13 7 2 0 1 D",
			"1920 1921 9 0 8 2 0 0 S",
			"1921 1921 2 0 8 2 0 1 D",
			"1922 1966 3 0 8 2 0 1 D",
			"1922 1954 8 0 8 2 0 0 S",
			"1955 1966 9 0 8 2 0 0 S"
		],
		"Chile": [
			"1927 1932 8 1 7 0 0 1 S",
			"1928 1932 3 1 7 0 0 0",
			"1942 1942 5 1 7 4 1 0",
			"1942 1942 7 1 7 5 1 1 S",
			"1946 1946 6 15 7 4 1 1 S",
			"1946 1946 8 1 7 3 1 0",
			"1947 1947 3 1 7 4 1 0",
			"1968 1968 10 3 7 4 1 1 S",
			"1969 1969 2 30 7 3 1 0",
			"1969 1969 10 23 7 4 1 1 S",
			"1970 1970 2 29 7 3 1 0",
			"1971 1971 2 14 7 3 1 0",
			"1970 1972 9 9 0 4 1 1 S",
			"1972 1986 2 9 0 3 1 0",
			"1973 1973 8 30 7 4 1 1 S",
			"1974 1987 9 9 0 4 1 1 S",
			"1987 1987 3 12 7 3 1 0",
			"1988 1989 2 9 0 3 1 0",
			"1988 1988 9 1 0 4 1 1 S",
			"1989 1989 9 9 0 4 1 1 S",
			"1990 1990 2 18 7 3 1 0",
			"1990 1990 8 16 7 4 1 1 S",
			"1991 1996 2 9 0 3 1 0",
			"1991 1997 9 9 0 4 1 1 S",
			"1997 1997 2 30 7 3 1 0",
			"1998 1998 2 9 0 3 1 0",
			"1998 1998 8 27 7 4 1 1 S",
			"1999 1999 3 4 7 3 1 0",
			"1999 2010 9 9 0 4 1 1 S",
			"2000 2007 2 9 0 3 1 0",
			"2008 2008 2 30 7 3 1 0",
			"2009 2009 2 9 0 3 1 0",
			"2010 2010 3 1 0 3 1 0",
			"2011 2011 4 2 0 3 1 0",
			"2011 2011 7 16 0 4 1 1 S",
			"2012 9999 3 23 0 3 1 0",
			"2012 9999 8 2 0 4 1 1 S"
		],
		"ChileAQ": [
			"1972 1986 2 9 0 3 1 0",
			"1974 1987 9 9 0 4 1 1 S",
			"1987 1987 3 12 7 3 1 0",
			"1988 1989 2 9 0 3 1 0",
			"1988 1988 9 1 0 4 1 1 S",
			"1989 1989 9 9 0 4 1 1 S",
			"1990 1990 2 18 7 3 1 0",
			"1990 1990 8 16 7 4 1 1 S",
			"1991 1996 2 9 0 3 1 0",
			"1991 1997 9 9 0 4 1 1 S",
			"1997 1997 2 30 7 3 1 0",
			"1998 1998 2 9 0 3 1 0",
			"1998 1998 8 27 7 4 1 1 S",
			"1999 1999 3 4 7 3 1 0",
			"1999 2010 9 9 0 4 1 1 S",
			"2000 2007 2 9 0 3 1 0",
			"2008 2008 2 30 7 3 1 0",
			"2009 2009 2 9 0 3 1 0",
			"2010 2010 3 1 0 3 1 0",
			"2011 2011 4 2 0 3 1 0",
			"2011 2011 7 16 0 4 1 1 S",
			"2012 9999 3 23 0 3 1 0",
			"2012 9999 8 2 0 4 1 1 S"
		],
		"Cook": [
			"1978 1978 10 12 7 0 0 0:30 HS",
			"1979 1991 2 1 0 0 0 0",
			"1979 1990 9 0 8 0 0 0:30 HS"
		],
		"Cuba": [
			"1928 1928 5 10 7 0 0 1 D",
			"1928 1928 9 10 7 0 0 0 S",
			"1940 1942 5 1 0 0 0 1 D",
			"1940 1942 8 1 0 0 0 0 S",
			"1945 1946 5 1 0 0 0 1 D",
			"1945 1946 8 1 0 0 0 0 S",
			"1965 1965 5 1 7 0 0 1 D",
			"1965 1965 8 30 7 0 0 0 S",
			"1966 1966 4 29 7 0 0 1 D",
			"1966 1966 9 2 7 0 0 0 S",
			"1967 1967 3 8 7 0 0 1 D",
			"1967 1968 8 8 0 0 0 0 S",
			"1968 1968 3 14 7 0 0 1 D",
			"1969 1977 3 0 8 0 0 1 D",
			"1969 1971 9 0 8 0 0 0 S",
			"1972 1974 9 8 7 0 0 0 S",
			"1975 1977 9 0 8 0 0 0 S",
			"1978 1978 4 7 7 0 0 1 D",
			"1978 1990 9 8 0 0 0 0 S",
			"1979 1980 2 15 0 0 0 1 D",
			"1981 1985 4 5 0 0 0 1 D",
			"1986 1989 2 14 0 0 0 1 D",
			"1990 1997 3 1 0 0 0 1 D",
			"1991 1995 9 8 0 0 2 0 S",
			"1996 1996 9 6 7 0 2 0 S",
			"1997 1997 9 12 7 0 2 0 S",
			"1998 1999 2 0 8 0 2 1 D",
			"1998 2003 9 0 8 0 2 0 S",
			"2000 2004 3 1 0 0 2 1 D",
			"2006 2010 9 0 8 0 2 0 S",
			"2007 2007 2 8 0 0 2 1 D",
			"2008 2008 2 15 0 0 2 1 D",
			"2009 2010 2 8 0 0 2 1 D",
			"2011 2011 2 15 0 0 2 1 D",
			"2011 2011 10 13 7 0 2 0 S",
			"2012 2012 3 1 7 0 2 1 D",
			"2012 9999 10 1 0 0 2 0 S",
			"2013 9999 2 8 0 0 2 1 D"
		],
		"Cyprus": [
			"1975 1975 3 13 7 0 0 1 S",
			"1975 1975 9 12 7 0 0 0",
			"1976 1976 4 15 7 0 0 1 S",
			"1976 1976 9 11 7 0 0 0",
			"1977 1980 3 1 0 0 0 1 S",
			"1977 1977 8 25 7 0 0 0",
			"1978 1978 9 2 7 0 0 0",
			"1979 1997 8 0 8 0 0 0",
			"1981 1998 2 0 8 0 0 1 S"
		],
		"Czech": [
			"1945 1945 3 8 7 2 2 1 S",
			"1945 1945 10 18 7 2 2 0",
			"1946 1946 4 6 7 2 2 1 S",
			"1946 1949 9 1 0 2 2 0",
			"1947 1947 3 20 7 2 2 1 S",
			"1948 1948 3 18 7 2 2 1 S",
			"1949 1949 3 9 7 2 2 1 S"
		],
		"DR": [
			"1966 1966 9 30 7 0 0 1 D",
			"1967 1967 1 28 7 0 0 0 S",
			"1969 1973 9 0 8 0 0 0:30 HD",
			"1970 1970 1 21 7 0 0 0 S",
			"1971 1971 0 20 7 0 0 0 S",
			"1972 1974 0 21 7 0 0 0 S"
		],
		"Denmark": [
			"1916 1916 4 14 7 23 0 1 S",
			"1916 1916 8 30 7 23 0 0",
			"1940 1940 4 15 7 0 0 1 S",
			"1945 1945 3 2 7 2 2 1 S",
			"1945 1945 7 15 7 2 2 0",
			"1946 1946 4 1 7 2 2 1 S",
			"1946 1946 8 1 7 2 2 0",
			"1947 1947 4 4 7 2 2 1 S",
			"1947 1947 7 10 7 2 2 0",
			"1948 1948 4 9 7 2 2 1 S",
			"1948 1948 7 8 7 2 2 0"
		],
		"Denver": [
			"1920 1921 2 0 8 2 0 1 D",
			"1920 1920 9 0 8 2 0 0 S",
			"1921 1921 4 22 7 2 0 0 S",
			"1965 1966 3 0 8 2 0 1 D",
			"1965 1966 9 0 8 2 0 0 S"
		],
		"Detroit": [
			"1948 1948 3 0 8 2 0 1 D",
			"1948 1948 8 0 8 2 0 0 S",
			"1967 1967 5 14 7 2 0 1 D",
			"1967 1967 9 0 8 2 0 0 S"
		],
		"Dhaka": [
			"2009 2009 5 19 7 23 0 1 S",
			"2009 2009 11 31 7 23:59 0 0"
		],
		"E-Eur": [
			"1977 1980 3 1 0 0 0 1 S",
			"1977 1977 8 0 8 0 0 0",
			"1978 1978 9 1 7 0 0 0",
			"1979 1995 8 0 8 0 0 0",
			"1981 9999 2 0 8 0 0 1 S",
			"1996 9999 9 0 8 0 0 0"
		],
		"E-EurAsia": [
			"1981 9999 2 0 8 0 0 1 S",
			"1979 1995 8 0 8 0 0 0",
			"1996 9999 9 0 8 0 0 0"
		],
		"EU": [
			"1977 1980 3 1 0 1 1 1 S",
			"1977 1977 8 0 8 1 1 0",
			"1978 1978 9 1 7 1 1 0",
			"1979 1995 8 0 8 1 1 0",
			"1981 9999 2 0 8 1 1 1 S",
			"1996 9999 9 0 8 1 1 0"
		],
		"EUAsia": [
			"1981 9999 2 0 8 1 1 1 S",
			"1979 1995 8 0 8 1 1 0",
			"1996 9999 9 0 8 1 1 0"
		],
		"Edm": [
			"1918 1919 3 8 0 2 0 1 D",
			"1918 1918 9 27 7 2 0 0 S",
			"1919 1919 4 27 7 2 0 0 S",
			"1920 1923 3 0 8 2 0 1 D",
			"1920 1920 9 0 8 2 0 0 S",
			"1921 1923 8 0 8 2 0 0 S",
			"1942 1942 1 9 7 2 0 1 W",
			"1945 1945 7 14 7 23 1 1 P",
			"1945 1945 8 0 8 2 0 0 S",
			"1947 1947 3 0 8 2 0 1 D",
			"1947 1947 8 0 8 2 0 0 S",
			"1967 1967 3 0 8 2 0 1 D",
			"1967 1967 9 0 8 2 0 0 S",
			"1969 1969 3 0 8 2 0 1 D",
			"1969 1969 9 0 8 2 0 0 S",
			"1972 1986 3 0 8 2 0 1 D",
			"1972 2006 9 0 8 2 0 0 S"
		],
		"Egypt": [
			"1940 1940 6 15 7 0 0 1 S",
			"1940 1940 9 1 7 0 0 0",
			"1941 1941 3 15 7 0 0 1 S",
			"1941 1941 8 16 7 0 0 0",
			"1942 1944 3 1 7 0 0 1 S",
			"1942 1942 9 27 7 0 0 0",
			"1943 1945 10 1 7 0 0 0",
			"1945 1945 3 16 7 0 0 1 S",
			"1957 1957 4 10 7 0 0 1 S",
			"1957 1958 9 1 7 0 0 0",
			"1958 1958 4 1 7 0 0 1 S",
			"1959 1981 4 1 7 1 0 1 S",
			"1959 1965 8 30 7 3 0 0",
			"1966 1994 9 1 7 3 0 0",
			"1982 1982 6 25 7 1 0 1 S",
			"1983 1983 6 12 7 1 0 1 S",
			"1984 1988 4 1 7 1 0 1 S",
			"1989 1989 4 6 7 1 0 1 S",
			"1990 1994 4 1 7 1 0 1 S",
			"1995 2010 3 5 8 0 2 1 S",
			"1995 2005 8 4 8 23 2 0",
			"2006 2006 8 21 7 23 2 0",
			"2007 2007 8 1 4 23 2 0",
			"2008 2008 7 4 8 23 2 0",
			"2009 2009 7 20 7 23 2 0",
			"2010 2010 7 11 7 0 0 0",
			"2010 2010 8 10 7 0 0 1 S",
			"2010 2010 8 4 8 23 2 0"
		],
		"EgyptAsia": [
			"1957 1957 4 10 7 0 0 1 S",
			"1957 1958 9 1 7 0 0 0",
			"1958 1958 4 1 7 0 0 1 S",
			"1959 1967 4 1 7 1 0 1 S",
			"1959 1965 8 30 7 3 0 0",
			"1966 1966 9 1 7 3 0 0"
		],
		"Falk": [
			"1937 1938 8 0 8 0 0 1 S",
			"1938 1942 2 19 0 0 0 0",
			"1939 1939 9 1 7 0 0 1 S",
			"1940 1942 8 0 8 0 0 1 S",
			"1943 1943 0 1 7 0 0 0",
			"1983 1983 8 0 8 0 0 1 S",
			"1984 1985 3 0 8 0 0 0",
			"1984 1984 8 16 7 0 0 1 S",
			"1985 2000 8 9 0 0 0 1 S",
			"1986 2000 3 16 0 0 0 0",
			"2001 2010 3 15 0 2 0 0",
			"2001 2010 8 1 0 2 0 1 S"
		],
		"Fiji": [
			"1998 1999 10 1 0 2 0 1 S",
			"1999 2000 1 0 8 3 0 0",
			"2009 2009 10 29 7 2 0 1 S",
			"2010 2010 2 0 8 3 0 0",
			"2010 9999 9 18 0 2 0 1 S",
			"2011 2011 2 1 0 3 0 0",
			"2012 9999 0 18 0 3 0 0"
		],
		"Finland": [
			"1942 1942 3 3 7 0 0 1 S",
			"1942 1942 9 3 7 0 0 0",
			"1981 1982 2 0 8 2 0 1 S",
			"1981 1982 8 0 8 3 0 0"
		],
		"France": [
			"1916 1916 5 14 7 23 2 1 S",
			"1916 1919 9 1 0 23 2 0",
			"1917 1917 2 24 7 23 2 1 S",
			"1918 1918 2 9 7 23 2 1 S",
			"1919 1919 2 1 7 23 2 1 S",
			"1920 1920 1 14 7 23 2 1 S",
			"1920 1920 9 23 7 23 2 0",
			"1921 1921 2 14 7 23 2 1 S",
			"1921 1921 9 25 7 23 2 0",
			"1922 1922 2 25 7 23 2 1 S",
			"1922 1938 9 1 6 23 2 0",
			"1923 1923 4 26 7 23 2 1 S",
			"1924 1924 2 29 7 23 2 1 S",
			"1925 1925 3 4 7 23 2 1 S",
			"1926 1926 3 17 7 23 2 1 S",
			"1927 1927 3 9 7 23 2 1 S",
			"1928 1928 3 14 7 23 2 1 S",
			"1929 1929 3 20 7 23 2 1 S",
			"1930 1930 3 12 7 23 2 1 S",
			"1931 1931 3 18 7 23 2 1 S",
			"1932 1932 3 2 7 23 2 1 S",
			"1933 1933 2 25 7 23 2 1 S",
			"1934 1934 3 7 7 23 2 1 S",
			"1935 1935 2 30 7 23 2 1 S",
			"1936 1936 3 18 7 23 2 1 S",
			"1937 1937 3 3 7 23 2 1 S",
			"1938 1938 2 26 7 23 2 1 S",
			"1939 1939 3 15 7 23 2 1 S",
			"1939 1939 10 18 7 23 2 0",
			"1940 1940 1 25 7 2 0 1 S",
			"1941 1941 4 5 7 0 0 2 M",
			"1941 1941 9 6 7 0 0 1 S",
			"1942 1942 2 9 7 0 0 2 M",
			"1942 1942 10 2 7 3 0 1 S",
			"1943 1943 2 29 7 2 0 2 M",
			"1943 1943 9 4 7 3 0 1 S",
			"1944 1944 3 3 7 2 0 2 M",
			"1944 1944 9 8 7 1 0 1 S",
			"1945 1945 3 2 7 2 0 2 M",
			"1945 1945 8 16 7 3 0 0",
			"1976 1976 2 28 7 1 0 1 S",
			"1976 1976 8 26 7 1 0 0"
		],
		"GB-Eire": [
			"1916 1916 4 21 7 2 2 1 BST",
			"1916 1916 9 1 7 2 2 0 GMT",
			"1917 1917 3 8 7 2 2 1 BST",
			"1917 1917 8 17 7 2 2 0 GMT",
			"1918 1918 2 24 7 2 2 1 BST",
			"1918 1918 8 30 7 2 2 0 GMT",
			"1919 1919 2 30 7 2 2 1 BST",
			"1919 1919 8 29 7 2 2 0 GMT",
			"1920 1920 2 28 7 2 2 1 BST",
			"1920 1920 9 25 7 2 2 0 GMT",
			"1921 1921 3 3 7 2 2 1 BST",
			"1921 1921 9 3 7 2 2 0 GMT",
			"1922 1922 2 26 7 2 2 1 BST",
			"1922 1922 9 8 7 2 2 0 GMT",
			"1923 1923 3 16 0 2 2 1 BST",
			"1923 1924 8 16 0 2 2 0 GMT",
			"1924 1924 3 9 0 2 2 1 BST",
			"1925 1926 3 16 0 2 2 1 BST",
			"1925 1938 9 2 0 2 2 0 GMT",
			"1927 1927 3 9 0 2 2 1 BST",
			"1928 1929 3 16 0 2 2 1 BST",
			"1930 1930 3 9 0 2 2 1 BST",
			"1931 1932 3 16 0 2 2 1 BST",
			"1933 1933 3 9 0 2 2 1 BST",
			"1934 1934 3 16 0 2 2 1 BST",
			"1935 1935 3 9 0 2 2 1 BST",
			"1936 1937 3 16 0 2 2 1 BST",
			"1938 1938 3 9 0 2 2 1 BST",
			"1939 1939 3 16 0 2 2 1 BST",
			"1939 1939 10 16 0 2 2 0 GMT",
			"1940 1940 1 23 0 2 2 1 BST",
			"1941 1941 4 2 0 1 2 2 BDST",
			"1941 1943 7 9 0 1 2 1 BST",
			"1942 1944 3 2 0 1 2 2 BDST",
			"1944 1944 8 16 0 1 2 1 BST",
			"1945 1945 3 2 1 1 2 2 BDST",
			"1945 1945 6 9 0 1 2 1 BST",
			"1945 1946 9 2 0 2 2 0 GMT",
			"1946 1946 3 9 0 2 2 1 BST",
			"1947 1947 2 16 7 2 2 1 BST",
			"1947 1947 3 13 7 1 2 2 BDST",
			"1947 1947 7 10 7 1 2 1 BST",
			"1947 1947 10 2 7 2 2 0 GMT",
			"1948 1948 2 14 7 2 2 1 BST",
			"1948 1948 9 31 7 2 2 0 GMT",
			"1949 1949 3 3 7 2 2 1 BST",
			"1949 1949 9 30 7 2 2 0 GMT",
			"1950 1952 3 14 0 2 2 1 BST",
			"1950 1952 9 21 0 2 2 0 GMT",
			"1953 1953 3 16 0 2 2 1 BST",
			"1953 1960 9 2 0 2 2 0 GMT",
			"1954 1954 3 9 0 2 2 1 BST",
			"1955 1956 3 16 0 2 2 1 BST",
			"1957 1957 3 9 0 2 2 1 BST",
			"1958 1959 3 16 0 2 2 1 BST",
			"1960 1960 3 9 0 2 2 1 BST",
			"1961 1963 2 0 8 2 2 1 BST",
			"1961 1968 9 23 0 2 2 0 GMT",
			"1964 1967 2 19 0 2 2 1 BST",
			"1968 1968 1 18 7 2 2 1 BST",
			"1972 1980 2 16 0 2 2 1 BST",
			"1972 1980 9 23 0 2 2 0 GMT",
			"1981 1995 2 0 8 1 1 1 BST",
			"1981 1989 9 23 0 1 1 0 GMT",
			"1990 1995 9 22 0 1 1 0 GMT"
		],
		"Germany": [
			"1946 1946 3 14 7 2 2 1 S",
			"1946 1946 9 7 7 2 2 0",
			"1947 1949 9 1 0 2 2 0",
			"1947 1947 3 6 7 3 2 1 S",
			"1947 1947 4 11 7 2 2 2 M",
			"1947 1947 5 29 7 3 0 1 S",
			"1948 1948 3 18 7 2 2 1 S",
			"1949 1949 3 10 7 2 2 1 S"
		],
		"Ghana": [
			"1936 1942 8 1 7 0 0 0:20 GHST",
			"1936 1942 11 31 7 0 0 0 GMT"
		],
		"Greece": [
			"1932 1932 6 7 7 0 0 1 S",
			"1932 1932 8 1 7 0 0 0",
			"1941 1941 3 7 7 0 0 1 S",
			"1942 1942 10 2 7 3 0 0",
			"1943 1943 2 30 7 0 0 1 S",
			"1943 1943 9 4 7 0 0 0",
			"1952 1952 6 1 7 0 0 1 S",
			"1952 1952 10 2 7 0 0 0",
			"1975 1975 3 12 7 0 2 1 S",
			"1975 1975 10 26 7 0 2 0",
			"1976 1976 3 11 7 2 2 1 S",
			"1976 1976 9 10 7 2 2 0",
			"1977 1978 3 1 0 2 2 1 S",
			"1977 1977 8 26 7 2 2 0",
			"1978 1978 8 24 7 4 0 0",
			"1979 1979 3 1 7 9 0 1 S",
			"1979 1979 8 29 7 2 0 0",
			"1980 1980 3 1 7 0 0 1 S",
			"1980 1980 8 28 7 0 0 0"
		],
		"Guat": [
			"1973 1973 10 25 7 0 0 1 D",
			"1974 1974 1 24 7 0 0 0 S",
			"1983 1983 4 21 7 0 0 1 D",
			"1983 1983 8 22 7 0 0 0 S",
			"1991 1991 2 23 7 0 0 1 D",
			"1991 1991 8 7 7 0 0 0 S",
			"2006 2006 3 30 7 0 0 1 D",
			"2006 2006 9 1 7 0 0 0 S"
		],
		"HK": [
			"1941 1941 3 1 7 3:30 0 1 S",
			"1941 1941 8 30 7 3:30 0 0",
			"1946 1946 3 20 7 3:30 0 1 S",
			"1946 1946 11 1 7 3:30 0 0",
			"1947 1947 3 13 7 3:30 0 1 S",
			"1947 1947 11 30 7 3:30 0 0",
			"1948 1948 4 2 7 3:30 0 1 S",
			"1948 1951 9 0 8 3:30 0 0",
			"1952 1952 9 25 7 3:30 0 0",
			"1949 1953 3 1 0 3:30 0 1 S",
			"1953 1953 10 1 7 3:30 0 0",
			"1954 1964 2 18 0 3:30 0 1 S",
			"1954 1954 9 31 7 3:30 0 0",
			"1955 1964 10 1 0 3:30 0 0",
			"1965 1976 3 16 0 3:30 0 1 S",
			"1965 1976 9 16 0 3:30 0 0",
			"1973 1973 11 30 7 3:30 0 1 S",
			"1979 1979 4 8 0 3:30 0 1 S",
			"1979 1979 9 16 0 3:30 0 0"
		],
		"Haiti": [
			"1983 1983 4 8 7 0 0 1 D",
			"1984 1987 3 0 8 0 0 1 D",
			"1983 1987 9 0 8 0 0 0 S",
			"1988 1997 3 1 0 1 2 1 D",
			"1988 1997 9 0 8 1 2 0 S",
			"2005 2006 3 1 0 0 0 1 D",
			"2005 2006 9 0 8 0 0 0 S",
			"2012 9999 2 8 0 2 0 1 D",
			"2012 9999 10 1 0 2 0 0 S"
		],
		"Halifax": [
			"1916 1916 3 1 7 0 0 1 D",
			"1916 1916 9 1 7 0 0 0 S",
			"1920 1920 4 9 7 0 0 1 D",
			"1920 1920 7 29 7 0 0 0 S",
			"1921 1921 4 6 7 0 0 1 D",
			"1921 1922 8 5 7 0 0 0 S",
			"1922 1922 3 30 7 0 0 1 D",
			"1923 1925 4 1 0 0 0 1 D",
			"1923 1923 8 4 7 0 0 0 S",
			"1924 1924 8 15 7 0 0 0 S",
			"1925 1925 8 28 7 0 0 0 S",
			"1926 1926 4 16 7 0 0 1 D",
			"1926 1926 8 13 7 0 0 0 S",
			"1927 1927 4 1 7 0 0 1 D",
			"1927 1927 8 26 7 0 0 0 S",
			"1928 1931 4 8 0 0 0 1 D",
			"1928 1928 8 9 7 0 0 0 S",
			"1929 1929 8 3 7 0 0 0 S",
			"1930 1930 8 15 7 0 0 0 S",
			"1931 1932 8 24 1 0 0 0 S",
			"1932 1932 4 1 7 0 0 1 D",
			"1933 1933 3 30 7 0 0 1 D",
			"1933 1933 9 2 7 0 0 0 S",
			"1934 1934 4 20 7 0 0 1 D",
			"1934 1934 8 16 7 0 0 0 S",
			"1935 1935 5 2 7 0 0 1 D",
			"1935 1935 8 30 7 0 0 0 S",
			"1936 1936 5 1 7 0 0 1 D",
			"1936 1936 8 14 7 0 0 0 S",
			"1937 1938 4 1 0 0 0 1 D",
			"1937 1941 8 24 1 0 0 0 S",
			"1939 1939 4 28 7 0 0 1 D",
			"1940 1941 4 1 0 0 0 1 D",
			"1946 1949 3 0 8 2 0 1 D",
			"1946 1949 8 0 8 2 0 0 S",
			"1951 1954 3 0 8 2 0 1 D",
			"1951 1954 8 0 8 2 0 0 S",
			"1956 1959 3 0 8 2 0 1 D",
			"1956 1959 8 0 8 2 0 0 S",
			"1962 1973 3 0 8 2 0 1 D",
			"1962 1973 9 0 8 2 0 0 S"
		],
		"Holiday": [
			"1992 1993 9 0 8 2 2 1",
			"1993 1994 2 1 0 2 2 0"
		],
		"Hond": [
			"1987 1988 4 1 0 0 0 1 D",
			"1987 1988 8 0 8 0 0 0 S",
			"2006 2006 4 1 0 0 0 1 D",
			"2006 2006 7 1 1 0 0 0 S"
		],
		"Hungary": [
			"1918 1918 3 1 7 3 0 1 S",
			"1918 1918 8 29 7 3 0 0",
			"1919 1919 3 15 7 3 0 1 S",
			"1919 1919 8 15 7 3 0 0",
			"1920 1920 3 5 7 3 0 1 S",
			"1920 1920 8 30 7 3 0 0",
			"1945 1945 4 1 7 23 0 1 S",
			"1945 1945 10 3 7 0 0 0",
			"1946 1946 2 31 7 2 2 1 S",
			"1946 1949 9 1 0 2 2 0",
			"1947 1949 3 4 0 2 2 1 S",
			"1950 1950 3 17 7 2 2 1 S",
			"1950 1950 9 23 7 2 2 0",
			"1954 1955 4 23 7 0 0 1 S",
			"1954 1955 9 3 7 0 0 0",
			"1956 1956 5 1 0 0 0 1 S",
			"1956 1956 8 0 8 0 0 0",
			"1957 1957 5 1 0 1 0 1 S",
			"1957 1957 8 0 8 3 0 0",
			"1980 1980 3 6 7 1 0 1 S"
		],
		"Iceland": [
			"1917 1918 1 19 7 23 0 1 S",
			"1917 1917 9 21 7 1 0 0",
			"1918 1918 10 16 7 1 0 0",
			"1939 1939 3 29 7 23 0 1 S",
			"1939 1939 10 29 7 2 0 0",
			"1940 1940 1 25 7 2 0 1 S",
			"1940 1940 10 3 7 2 0 0",
			"1941 1941 2 2 7 1 2 1 S",
			"1941 1941 10 2 7 1 2 0",
			"1942 1942 2 8 7 1 2 1 S",
			"1942 1942 9 25 7 1 2 0",
			"1943 1946 2 1 0 1 2 1 S",
			"1943 1948 9 22 0 1 2 0",
			"1947 1967 3 1 0 1 2 1 S",
			"1949 1949 9 30 7 1 2 0",
			"1950 1966 9 22 0 1 2 0",
			"1967 1967 9 29 7 1 2 0"
		],
		"Indianapolis": [
			"1941 1941 5 22 7 2 0 1 D",
			"1941 1954 8 0 8 2 0 0 S",
			"1946 1954 3 0 8 2 0 1 D"
		],
		"Iran": [
			"1978 1980 2 21 7 0 0 1 D",
			"1978 1978 9 21 7 0 0 0 S",
			"1979 1979 8 19 7 0 0 0 S",
			"1980 1980 8 23 7 0 0 0 S",
			"1991 1991 4 3 7 0 0 1 D",
			"1992 1995 2 22 7 0 0 1 D",
			"1991 1995 8 22 7 0 0 0 S",
			"1996 1996 2 21 7 0 0 1 D",
			"1996 1996 8 21 7 0 0 0 S",
			"1997 1999 2 22 7 0 0 1 D",
			"1997 1999 8 22 7 0 0 0 S",
			"2000 2000 2 21 7 0 0 1 D",
			"2000 2000 8 21 7 0 0 0 S",
			"2001 2003 2 22 7 0 0 1 D",
			"2001 2003 8 22 7 0 0 0 S",
			"2004 2004 2 21 7 0 0 1 D",
			"2004 2004 8 21 7 0 0 0 S",
			"2005 2005 2 22 7 0 0 1 D",
			"2005 2005 8 22 7 0 0 0 S",
			"2008 2008 2 21 7 0 0 1 D",
			"2008 2008 8 21 7 0 0 0 S",
			"2009 2011 2 22 7 0 0 1 D",
			"2009 2011 8 22 7 0 0 0 S",
			"2012 2012 2 21 7 0 0 1 D",
			"2012 2012 8 21 7 0 0 0 S",
			"2013 2015 2 22 7 0 0 1 D",
			"2013 2015 8 22 7 0 0 0 S",
			"2016 2016 2 21 7 0 0 1 D",
			"2016 2016 8 21 7 0 0 0 S",
			"2017 2019 2 22 7 0 0 1 D",
			"2017 2019 8 22 7 0 0 0 S",
			"2020 2020 2 21 7 0 0 1 D",
			"2020 2020 8 21 7 0 0 0 S",
			"2021 2023 2 22 7 0 0 1 D",
			"2021 2023 8 22 7 0 0 0 S",
			"2024 2024 2 21 7 0 0 1 D",
			"2024 2024 8 21 7 0 0 0 S",
			"2025 2027 2 22 7 0 0 1 D",
			"2025 2027 8 22 7 0 0 0 S",
			"2028 2029 2 21 7 0 0 1 D",
			"2028 2029 8 21 7 0 0 0 S",
			"2030 2031 2 22 7 0 0 1 D",
			"2030 2031 8 22 7 0 0 0 S",
			"2032 2033 2 21 7 0 0 1 D",
			"2032 2033 8 21 7 0 0 0 S",
			"2034 2035 2 22 7 0 0 1 D",
			"2034 2035 8 22 7 0 0 0 S",
			"2036 2037 2 21 7 0 0 1 D",
			"2036 2037 8 21 7 0 0 0 S"
		],
		"Iraq": [
			"1982 1982 4 1 7 0 0 1 D",
			"1982 1984 9 1 7 0 0 0 S",
			"1983 1983 2 31 7 0 0 1 D",
			"1984 1985 3 1 7 0 0 1 D",
			"1985 1990 8 0 8 1 2 0 S",
			"1986 1990 2 0 8 1 2 1 D",
			"1991 2007 3 1 7 3 2 1 D",
			"1991 2007 9 1 7 3 2 0 S"
		],
		"Italy": [
			"1916 1916 5 3 7 0 2 1 S",
			"1916 1916 9 1 7 0 2 0",
			"1917 1917 3 1 7 0 2 1 S",
			"1917 1917 8 30 7 0 2 0",
			"1918 1918 2 10 7 0 2 1 S",
			"1918 1919 9 1 0 0 2 0",
			"1919 1919 2 2 7 0 2 1 S",
			"1920 1920 2 21 7 0 2 1 S",
			"1920 1920 8 19 7 0 2 0",
			"1940 1940 5 15 7 0 2 1 S",
			"1944 1944 8 17 7 0 2 0",
			"1945 1945 3 2 7 2 0 1 S",
			"1945 1945 8 15 7 0 2 0",
			"1946 1946 2 17 7 2 2 1 S",
			"1946 1946 9 6 7 2 2 0",
			"1947 1947 2 16 7 0 2 1 S",
			"1947 1947 9 5 7 0 2 0",
			"1948 1948 1 29 7 2 2 1 S",
			"1948 1948 9 3 7 2 2 0",
			"1966 1968 4 22 0 0 0 1 S",
			"1966 1969 8 22 0 0 0 0",
			"1969 1969 5 1 7 0 0 1 S",
			"1970 1970 4 31 7 0 0 1 S",
			"1970 1970 8 0 8 0 0 0",
			"1971 1972 4 22 0 0 0 1 S",
			"1971 1971 8 0 8 1 0 0",
			"1972 1972 9 1 7 0 0 0",
			"1973 1973 5 3 7 0 0 1 S",
			"1973 1974 8 0 8 0 0 0",
			"1974 1974 4 26 7 0 0 1 S",
			"1975 1975 5 1 7 0 2 1 S",
			"1975 1977 8 0 8 0 2 0",
			"1976 1976 4 30 7 0 2 1 S",
			"1977 1979 4 22 0 0 2 1 S",
			"1978 1978 9 1 7 0 2 0",
			"1979 1979 8 30 7 0 2 0"
		],
		"Japan": [
			"1948 1948 4 1 0 2 0 1 D",
			"1948 1951 8 8 6 2 0 0 S",
			"1949 1949 3 1 0 2 0 1 D",
			"1950 1951 4 1 0 2 0 1 D"
		],
		"Jordan": [
			"1973 1973 5 6 7 0 0 1 S",
			"1973 1975 9 1 7 0 0 0",
			"1974 1977 4 1 7 0 0 1 S",
			"1976 1976 10 1 7 0 0 0",
			"1977 1977 9 1 7 0 0 0",
			"1978 1978 3 30 7 0 0 1 S",
			"1978 1978 8 30 7 0 0 0",
			"1985 1985 3 1 7 0 0 1 S",
			"1985 1985 9 1 7 0 0 0",
			"1986 1988 3 1 5 0 0 1 S",
			"1986 1990 9 1 5 0 0 0",
			"1989 1989 4 8 7 0 0 1 S",
			"1990 1990 3 27 7 0 0 1 S",
			"1991 1991 3 17 7 0 0 1 S",
			"1991 1991 8 27 7 0 0 0",
			"1992 1992 3 10 7 0 0 1 S",
			"1992 1993 9 1 5 0 0 0",
			"1993 1998 3 1 5 0 0 1 S",
			"1994 1994 8 15 5 0 0 0",
			"1995 1998 8 15 5 0 2 0",
			"1999 1999 6 1 7 0 2 1 S",
			"1999 2002 8 5 8 0 2 0",
			"2000 2001 2 4 8 0 2 1 S",
			"2002 9999 2 4 8 24 0 1 S",
			"2003 2003 9 24 7 0 2 0",
			"2004 2004 9 15 7 0 2 0",
			"2005 2005 8 5 8 0 2 0",
			"2006 2011 9 5 8 0 2 0",
			"2013 9999 9 5 8 0 2 0"
		],
		"Kyrgyz": [
			"1992 1996 3 7 0 0 2 1 S",
			"1992 1996 8 0 8 0 0 0",
			"1997 2005 2 0 8 2:30 0 1 S",
			"1997 2004 9 0 8 2:30 0 0"
		],
		"LH": [
			"1981 1984 9 0 8 2 0 1",
			"1982 1985 2 1 0 2 0 0",
			"1985 1985 9 0 8 2 0 0:30",
			"1986 1989 2 15 0 2 0 0",
			"1986 1986 9 19 7 2 0 0:30",
			"1987 1999 9 0 8 2 0 0:30",
			"1990 1995 2 1 0 2 0 0",
			"1996 2005 2 0 8 2 0 0",
			"2000 2000 7 0 8 2 0 0:30",
			"2001 2007 9 0 8 2 0 0:30",
			"2006 2006 3 1 0 2 0 0",
			"2007 2007 2 0 8 2 0 0",
			"2008 9999 3 1 0 2 0 0",
			"2008 9999 9 1 0 2 0 0:30"
		],
		"Latvia": [
			"1989 1996 2 0 8 2 2 1 S",
			"1989 1996 8 0 8 2 2 0"
		],
		"Lebanon": [
			"1920 1920 2 28 7 0 0 1 S",
			"1920 1920 9 25 7 0 0 0",
			"1921 1921 3 3 7 0 0 1 S",
			"1921 1921 9 3 7 0 0 0",
			"1922 1922 2 26 7 0 0 1 S",
			"1922 1922 9 8 7 0 0 0",
			"1923 1923 3 22 7 0 0 1 S",
			"1923 1923 8 16 7 0 0 0",
			"1957 1961 4 1 7 0 0 1 S",
			"1957 1961 9 1 7 0 0 0",
			"1972 1972 5 22 7 0 0 1 S",
			"1972 1977 9 1 7 0 0 0",
			"1973 1977 4 1 7 0 0 1 S",
			"1978 1978 3 30 7 0 0 1 S",
			"1978 1978 8 30 7 0 0 0",
			"1984 1987 4 1 7 0 0 1 S",
			"1984 1991 9 16 7 0 0 0",
			"1988 1988 5 1 7 0 0 1 S",
			"1989 1989 4 10 7 0 0 1 S",
			"1990 1992 4 1 7 0 0 1 S",
			"1992 1992 9 4 7 0 0 0",
			"1993 9999 2 0 8 0 0 1 S",
			"1993 1998 8 0 8 0 0 0",
			"1999 9999 9 0 8 0 0 0"
		],
		"Libya": [
			"1951 1951 9 14 7 2 0 1 S",
			"1952 1952 0 1 7 0 0 0",
			"1953 1953 9 9 7 2 0 1 S",
			"1954 1954 0 1 7 0 0 0",
			"1955 1955 8 30 7 0 0 1 S",
			"1956 1956 0 1 7 0 0 0",
			"1982 1984 3 1 7 0 0 1 S",
			"1982 1985 9 1 7 0 0 0",
			"1985 1985 3 6 7 0 0 1 S",
			"1986 1986 3 4 7 0 0 1 S",
			"1986 1986 9 3 7 0 0 0",
			"1987 1989 3 1 7 0 0 1 S",
			"1987 1989 9 1 7 0 0 0",
			"1997 1997 3 4 7 0 0 1 S",
			"1997 1997 9 4 7 0 0 0",
			"2013 9999 2 5 8 1 0 1 S",
			"2013 9999 9 5 8 2 0 0"
		],
		"Louisville": [
			"1921 1921 4 1 7 2 0 1 D",
			"1921 1921 8 1 7 2 0 0 S",
			"1941 1961 3 0 8 2 0 1 D",
			"1941 1941 8 0 8 2 0 0 S",
			"1946 1946 5 2 7 2 0 0 S",
			"1950 1955 8 0 8 2 0 0 S",
			"1956 1960 9 0 8 2 0 0 S"
		],
		"Lux": [
			"1916 1916 4 14 7 23 0 1 S",
			"1916 1916 9 1 7 1 0 0",
			"1917 1917 3 28 7 23 0 1 S",
			"1917 1917 8 17 7 1 0 0",
			"1918 1918 3 15 1 2 2 1 S",
			"1918 1918 8 15 1 2 2 0",
			"1919 1919 2 1 7 23 0 1 S",
			"1919 1919 9 5 7 3 0 0",
			"1920 1920 1 14 7 23 0 1 S",
			"1920 1920 9 24 7 2 0 0",
			"1921 1921 2 14 7 23 0 1 S",
			"1921 1921 9 26 7 2 0 0",
			"1922 1922 2 25 7 23 0 1 S",
			"1922 1922 9 2 0 1 0 0",
			"1923 1923 3 21 7 23 0 1 S",
			"1923 1923 9 2 0 2 0 0",
			"1924 1924 2 29 7 23 0 1 S",
			"1924 1928 9 2 0 1 0 0",
			"1925 1925 3 5 7 23 0 1 S",
			"1926 1926 3 17 7 23 0 1 S",
			"1927 1927 3 9 7 23 0 1 S",
			"1928 1928 3 14 7 23 0 1 S",
			"1929 1929 3 20 7 23 0 1 S"
		],
		"Macau": [
			"1961 1962 2 16 0 3:30 0 1 S",
			"1961 1964 10 1 0 3:30 0 0",
			"1963 1963 2 16 0 0 0 1 S",
			"1964 1964 2 16 0 3:30 0 1 S",
			"1965 1965 2 16 0 0 0 1 S",
			"1965 1965 9 31 7 0 0 0",
			"1966 1971 3 16 0 3:30 0 1 S",
			"1966 1971 9 16 0 3:30 0 0",
			"1972 1974 3 15 0 0 0 1 S",
			"1972 1973 9 15 0 0 0 0",
			"1974 1977 9 15 0 3:30 0 0",
			"1975 1977 3 15 0 3:30 0 1 S",
			"1978 1980 3 15 0 0 0 1 S",
			"1978 1980 9 15 0 0 0 0"
		],
		"Malta": [
			"1973 1973 2 31 7 0 2 1 S",
			"1973 1973 8 29 7 0 2 0",
			"1974 1974 3 21 7 0 2 1 S",
			"1974 1974 8 16 7 0 2 0",
			"1975 1979 3 15 0 2 0 1 S",
			"1975 1980 8 15 0 2 0 0",
			"1980 1980 2 31 7 2 0 1 S"
		],
		"Marengo": [
			"1951 1951 3 0 8 2 0 1 D",
			"1951 1951 8 0 8 2 0 0 S",
			"1954 1960 3 0 8 2 0 1 D",
			"1954 1960 8 0 8 2 0 0 S"
		],
		"Mauritius": [
			"1982 1982 9 10 7 0 0 1 S",
			"1983 1983 2 21 7 0 0 0",
			"2008 2008 9 0 8 2 0 1 S",
			"2009 2009 2 0 8 2 0 0"
		],
		"Menominee": [
			"1946 1946 3 0 8 2 0 1 D",
			"1946 1946 8 0 8 2 0 0 S",
			"1966 1966 3 0 8 2 0 1 D",
			"1966 1966 9 0 8 2 0 0 S"
		],
		"Mexico": [
			"1939 1939 1 5 7 0 0 1 D",
			"1939 1939 5 25 7 0 0 0 S",
			"1940 1940 11 9 7 0 0 1 D",
			"1941 1941 3 1 7 0 0 0 S",
			"1943 1943 11 16 7 0 0 1 W",
			"1944 1944 4 1 7 0 0 0 S",
			"1950 1950 1 12 7 0 0 1 D",
			"1950 1950 6 30 7 0 0 0 S",
			"1996 2000 3 1 0 2 0 1 D",
			"1996 2000 9 0 8 2 0 0 S",
			"2001 2001 4 1 0 2 0 1 D",
			"2001 2001 8 0 8 2 0 0 S",
			"2002 9999 3 1 0 2 0 1 D",
			"2002 9999 9 0 8 2 0 0 S"
		],
		"Moncton": [
			"1933 1935 5 8 0 1 0 1 D",
			"1933 1935 8 8 0 1 0 0 S",
			"1936 1938 5 1 0 1 0 1 D",
			"1936 1938 8 1 0 1 0 0 S",
			"1939 1939 4 27 7 1 0 1 D",
			"1939 1941 8 21 6 1 0 0 S",
			"1940 1940 4 19 7 1 0 1 D",
			"1941 1941 4 4 7 1 0 1 D",
			"1946 1972 3 0 8 2 0 1 D",
			"1946 1956 8 0 8 2 0 0 S",
			"1957 1972 9 0 8 2 0 0 S",
			"1993 2006 3 1 0 0:1 0 1 D",
			"1993 2006 9 0 8 0:1 0 0 S"
		],
		"Mongol": [
			"1983 1984 3 1 7 0 0 1 S",
			"1983 1983 9 1 7 0 0 0",
			"1985 1998 2 0 8 0 0 1 S",
			"1984 1998 8 0 8 0 0 0",
			"2001 2001 3 6 8 2 0 1 S",
			"2001 2006 8 6 8 2 0 0",
			"2002 2006 2 6 8 2 0 1 S"
		],
		"Mont": [
			"1917 1917 2 25 7 2 0 1 D",
			"1917 1917 3 24 7 0 0 0 S",
			"1919 1919 2 31 7 2:30 0 1 D",
			"1919 1919 9 25 7 2:30 0 0 S",
			"1920 1920 4 2 7 2:30 0 1 D",
			"1920 1922 9 1 0 2:30 0 0 S",
			"1921 1921 4 1 7 2 0 1 D",
			"1922 1922 3 30 7 2 0 1 D",
			"1924 1924 4 17 7 2 0 1 D",
			"1924 1926 8 0 8 2:30 0 0 S",
			"1925 1926 4 1 0 2 0 1 D",
			"1927 1927 4 1 7 0 0 1 D",
			"1927 1932 8 0 8 0 0 0 S",
			"1928 1931 3 0 8 0 0 1 D",
			"1932 1932 4 1 7 0 0 1 D",
			"1933 1940 3 0 8 0 0 1 D",
			"1933 1933 9 1 7 0 0 0 S",
			"1934 1939 8 0 8 0 0 0 S",
			"1946 1973 3 0 8 2 0 1 D",
			"1945 1948 8 0 8 2 0 0 S",
			"1949 1950 9 0 8 2 0 0 S",
			"1951 1956 8 0 8 2 0 0 S",
			"1957 1973 9 0 8 2 0 0 S"
		],
		"Morocco": [
			"1939 1939 8 12 7 0 0 1 S",
			"1939 1939 10 19 7 0 0 0",
			"1940 1940 1 25 7 0 0 1 S",
			"1945 1945 10 18 7 0 0 0",
			"1950 1950 5 11 7 0 0 1 S",
			"1950 1950 9 29 7 0 0 0",
			"1967 1967 5 3 7 12 0 1 S",
			"1967 1967 9 1 7 0 0 0",
			"1974 1974 5 24 7 0 0 1 S",
			"1974 1974 8 1 7 0 0 0",
			"1976 1977 4 1 7 0 0 1 S",
			"1976 1976 7 1 7 0 0 0",
			"1977 1977 8 28 7 0 0 0",
			"1978 1978 5 1 7 0 0 1 S",
			"1978 1978 7 4 7 0 0 0",
			"2008 2008 5 1 7 0 0 1 S",
			"2008 2008 8 1 7 0 0 0",
			"2009 2009 5 1 7 0 0 1 S",
			"2009 2009 7 21 7 0 0 0",
			"2010 2010 4 2 7 0 0 1 S",
			"2010 2010 7 8 7 0 0 0",
			"2011 2011 3 3 7 0 0 1 S",
			"2011 2011 6 31 7 0 0 0",
			"2012 2019 3 0 8 2 0 1 S",
			"2012 9999 8 0 8 3 0 0",
			"2012 2012 6 20 7 3 0 0",
			"2012 2012 7 20 7 2 0 1 S",
			"2013 2013 6 9 7 3 0 0",
			"2013 2013 7 8 7 2 0 1 S",
			"2014 2014 5 29 7 3 0 0",
			"2014 2014 6 29 7 2 0 1 S",
			"2015 2015 5 18 7 3 0 0",
			"2015 2015 6 18 7 2 0 1 S",
			"2016 2016 5 7 7 3 0 0",
			"2016 2016 6 7 7 2 0 1 S",
			"2017 2017 4 27 7 3 0 0",
			"2017 2017 5 26 7 2 0 1 S",
			"2018 2018 4 16 7 3 0 0",
			"2018 2018 5 15 7 2 0 1 S",
			"2019 2019 4 6 7 3 0 0",
			"2019 2019 5 5 7 2 0 1 S",
			"2020 2020 4 24 7 2 0 1 S",
			"2021 2021 4 13 7 2 0 1 S",
			"2022 2022 4 3 7 2 0 1 S",
			"2023 9999 3 0 8 2 0 1 S"
		],
		"NBorneo": [
			"1935 1941 8 14 7 0 0 0:20 TS",
			"1935 1941 11 14 7 0 0 0"
		],
		"NC": [
			"1977 1978 11 1 0 0 0 1 S",
			"1978 1979 1 27 7 0 0 0",
			"1996 1996 11 1 7 2 2 1 S",
			"1997 1997 2 2 7 2 2 0"
		],
		"NT_YK": [
			"1918 1918 3 14 7 2 0 1 D",
			"1918 1918 9 27 7 2 0 0 S",
			"1919 1919 4 25 7 2 0 1 D",
			"1919 1919 10 1 7 0 0 0 S",
			"1942 1942 1 9 7 2 0 1 W",
			"1945 1945 7 14 7 23 1 1 P",
			"1945 1945 8 30 7 2 0 0 S",
			"1965 1965 3 0 8 0 0 2 DD",
			"1965 1965 9 0 8 2 0 0 S",
			"1980 1986 3 0 8 2 0 1 D",
			"1980 2006 9 0 8 2 0 0 S",
			"1987 2006 3 1 0 2 0 1 D"
		],
		"NYC": [
			"1920 1920 2 0 8 2 0 1 D",
			"1920 1920 9 0 8 2 0 0 S",
			"1921 1966 3 0 8 2 0 1 D",
			"1921 1954 8 0 8 2 0 0 S",
			"1955 1966 9 0 8 2 0 0 S"
		],
		"NZ": [
			"1927 1927 10 6 7 2 0 1 S",
			"1928 1928 2 4 7 2 0 0 M",
			"1928 1933 9 8 0 2 0 0:30 S",
			"1929 1933 2 15 0 2 0 0 M",
			"1934 1940 3 0 8 2 0 0 M",
			"1934 1940 8 0 8 2 0 0:30 S",
			"1946 1946 0 1 7 0 0 0 S",
			"1974 1974 10 1 0 2 2 1 D",
			"1975 1975 1 0 8 2 2 0 S",
			"1975 1988 9 0 8 2 2 1 D",
			"1976 1989 2 1 0 2 2 0 S",
			"1989 1989 9 8 0 2 2 1 D",
			"1990 2006 9 1 0 2 2 1 D",
			"1990 2007 2 15 0 2 2 0 S",
			"2007 9999 8 0 8 2 2 1 D",
			"2008 9999 3 1 0 2 2 0 S"
		],
		"NZAQ": [
			"1974 1974 10 3 7 2 2 1 D",
			"1975 1988 9 0 8 2 2 1 D",
			"1989 1989 9 8 7 2 2 1 D",
			"1990 2006 9 1 0 2 2 1 D",
			"1975 1975 1 23 7 2 2 0 S",
			"1976 1989 2 1 0 2 2 0 S",
			"1990 2007 2 15 0 2 2 0 S",
			"2007 9999 8 0 8 2 2 1 D",
			"2008 9999 3 1 0 2 2 0 S"
		],
		"Namibia": [
			"1994 9999 8 1 0 2 0 1 S",
			"1995 9999 3 1 0 2 0 0"
		],
		"Neth": [
			"1916 1916 4 1 7 0 0 1 NST",
			"1916 1916 9 1 7 0 0 0 AMT",
			"1917 1917 3 16 7 2 2 1 NST",
			"1917 1917 8 17 7 2 2 0 AMT",
			"1918 1921 3 1 1 2 2 1 NST",
			"1918 1921 8 1 8 2 2 0 AMT",
			"1922 1922 2 0 8 2 2 1 NST",
			"1922 1936 9 2 0 2 2 0 AMT",
			"1923 1923 5 1 5 2 2 1 NST",
			"1924 1924 2 0 8 2 2 1 NST",
			"1925 1925 5 1 5 2 2 1 NST",
			"1926 1931 4 15 7 2 2 1 NST",
			"1932 1932 4 22 7 2 2 1 NST",
			"1933 1936 4 15 7 2 2 1 NST",
			"1937 1937 4 22 7 2 2 1 NST",
			"1937 1937 6 1 7 0 0 1 S",
			"1937 1939 9 2 0 2 2 0",
			"1938 1939 4 15 7 2 2 1 S",
			"1945 1945 3 2 7 2 2 1 S",
			"1945 1945 8 16 7 2 2 0"
		],
		"Nic": [
			"1979 1980 2 16 0 0 0 1 D",
			"1979 1980 5 23 1 0 0 0 S",
			"2005 2005 3 10 7 0 0 1 D",
			"2005 2005 9 1 0 0 0 0 S",
			"2006 2006 3 30 7 2 0 1 D",
			"2006 2006 9 1 0 1 0 0 S"
		],
		"Norway": [
			"1916 1916 4 22 7 1 0 1 S",
			"1916 1916 8 30 7 0 0 0",
			"1945 1945 3 2 7 2 2 1 S",
			"1945 1945 9 1 7 2 2 0",
			"1959 1964 2 15 0 2 2 1 S",
			"1959 1965 8 15 0 2 2 0",
			"1965 1965 3 25 7 2 2 1 S"
		],
		"PRC": [
			"1986 1986 4 4 7 0 0 1 D",
			"1986 1991 8 11 0 0 0 0 S",
			"1987 1991 3 10 0 0 0 1 D"
		],
		"Pakistan": [
			"2002 2002 3 2 0 0:1 0 1 S",
			"2002 2002 9 2 0 0:1 0 0",
			"2008 2008 5 1 7 0 0 1 S",
			"2008 2008 10 1 7 0 0 0",
			"2009 2009 3 15 7 0 0 1 S",
			"2009 2009 10 1 7 0 0 0"
		],
		"Palestine": [
			"1999 2005 3 15 5 0 0 1 S",
			"1999 2003 9 15 5 0 0 0",
			"2004 2004 9 1 7 1 0 0",
			"2005 2005 9 4 7 2 0 0",
			"2006 2007 3 1 7 0 0 1 S",
			"2006 2006 8 22 7 0 0 0",
			"2007 2007 8 8 4 2 0 0",
			"2008 2009 2 5 8 0 0 1 S",
			"2008 2008 8 1 7 0 0 0",
			"2009 2009 8 1 5 1 0 0",
			"2010 2010 2 26 7 0 0 1 S",
			"2010 2010 7 11 7 0 0 0",
			"2011 2011 3 1 7 0:1 0 1 S",
			"2011 2011 7 1 7 0 0 0",
			"2011 2011 7 30 7 0 0 1 S",
			"2011 2011 8 30 7 0 0 0",
			"2012 9999 2 4 8 24 0 1 S",
			"2012 9999 8 21 5 1 0 0"
		],
		"Para": [
			"1975 1988 9 1 7 0 0 1 S",
			"1975 1978 2 1 7 0 0 0",
			"1979 1991 3 1 7 0 0 0",
			"1989 1989 9 22 7 0 0 1 S",
			"1990 1990 9 1 7 0 0 1 S",
			"1991 1991 9 6 7 0 0 1 S",
			"1992 1992 2 1 7 0 0 0",
			"1992 1992 9 5 7 0 0 1 S",
			"1993 1993 2 31 7 0 0 0",
			"1993 1995 9 1 7 0 0 1 S",
			"1994 1995 1 0 8 0 0 0",
			"1996 1996 2 1 7 0 0 0",
			"1996 2001 9 1 0 0 0 1 S",
			"1997 1997 1 0 8 0 0 0",
			"1998 2001 2 1 0 0 0 0",
			"2002 2004 3 1 0 0 0 0",
			"2002 2003 8 1 0 0 0 1 S",
			"2004 2009 9 15 0 0 0 1 S",
			"2005 2009 2 8 0 0 0 0",
			"2010 9999 9 1 0 0 0 1 S",
			"2010 2012 3 8 0 0 0 0",
			"2013 9999 2 22 0 0 0 0"
		],
		"Perry": [
			"1946 1946 3 0 8 2 0 1 D",
			"1946 1946 8 0 8 2 0 0 S",
			"1953 1954 3 0 8 2 0 1 D",
			"1953 1959 8 0 8 2 0 0 S",
			"1955 1955 4 1 7 0 0 1 D",
			"1956 1963 3 0 8 2 0 1 D",
			"1960 1960 9 0 8 2 0 0 S",
			"1961 1961 8 0 8 2 0 0 S",
			"1962 1963 9 0 8 2 0 0 S"
		],
		"Peru": [
			"1938 1938 0 1 7 0 0 1 S",
			"1938 1938 3 1 7 0 0 0",
			"1938 1939 8 0 8 0 0 1 S",
			"1939 1940 2 24 0 0 0 0",
			"1986 1987 0 1 7 0 0 1 S",
			"1986 1987 3 1 7 0 0 0",
			"1990 1990 0 1 7 0 0 1 S",
			"1990 1990 3 1 7 0 0 0",
			"1994 1994 0 1 7 0 0 1 S",
			"1994 1994 3 1 7 0 0 0"
		],
		"Phil": [
			"1936 1936 10 1 7 0 0 1 S",
			"1937 1937 1 1 7 0 0 0",
			"1954 1954 3 12 7 0 0 1 S",
			"1954 1954 6 1 7 0 0 0",
			"1978 1978 2 22 7 0 0 1 S",
			"1978 1978 8 21 7 0 0 0"
		],
		"Pike": [
			"1955 1955 4 1 7 0 0 1 D",
			"1955 1960 8 0 8 2 0 0 S",
			"1956 1964 3 0 8 2 0 1 D",
			"1961 1964 9 0 8 2 0 0 S"
		],
		"Poland": [
			"1918 1919 8 16 7 2 2 0",
			"1919 1919 3 15 7 2 2 1 S",
			"1944 1944 3 3 7 2 2 1 S",
			"1944 1944 9 4 7 2 0 0",
			"1945 1945 3 29 7 0 0 1 S",
			"1945 1945 10 1 7 0 0 0",
			"1946 1946 3 14 7 0 2 1 S",
			"1946 1946 9 7 7 2 2 0",
			"1947 1947 4 4 7 2 2 1 S",
			"1947 1949 9 1 0 2 2 0",
			"1948 1948 3 18 7 2 2 1 S",
			"1949 1949 3 10 7 2 2 1 S",
			"1957 1957 5 2 7 1 2 1 S",
			"1957 1958 8 0 8 1 2 0",
			"1958 1958 2 30 7 1 2 1 S",
			"1959 1959 4 31 7 1 2 1 S",
			"1959 1961 9 1 0 1 2 0",
			"1960 1960 3 3 7 1 2 1 S",
			"1961 1964 4 0 8 1 2 1 S",
			"1962 1964 8 0 8 1 2 0"
		],
		"Port": [
			"1916 1916 5 17 7 23 0 1 S",
			"1916 1916 10 1 7 1 0 0",
			"1917 1917 1 28 7 23 2 1 S",
			"1917 1921 9 14 7 23 2 0",
			"1918 1918 2 1 7 23 2 1 S",
			"1919 1919 1 28 7 23 2 1 S",
			"1920 1920 1 29 7 23 2 1 S",
			"1921 1921 1 28 7 23 2 1 S",
			"1924 1924 3 16 7 23 2 1 S",
			"1924 1924 9 14 7 23 2 0",
			"1926 1926 3 17 7 23 2 1 S",
			"1926 1929 9 1 6 23 2 0",
			"1927 1927 3 9 7 23 2 1 S",
			"1928 1928 3 14 7 23 2 1 S",
			"1929 1929 3 20 7 23 2 1 S",
			"1931 1931 3 18 7 23 2 1 S",
			"1931 1932 9 1 6 23 2 0",
			"1932 1932 3 2 7 23 2 1 S",
			"1934 1934 3 7 7 23 2 1 S",
			"1934 1938 9 1 6 23 2 0",
			"1935 1935 2 30 7 23 2 1 S",
			"1936 1936 3 18 7 23 2 1 S",
			"1937 1937 3 3 7 23 2 1 S",
			"1938 1938 2 26 7 23 2 1 S",
			"1939 1939 3 15 7 23 2 1 S",
			"1939 1939 10 18 7 23 2 0",
			"1940 1940 1 24 7 23 2 1 S",
			"1940 1941 9 5 7 23 2 0",
			"1941 1941 3 5 7 23 2 1 S",
			"1942 1945 2 8 6 23 2 1 S",
			"1942 1942 3 25 7 22 2 2 M",
			"1942 1942 7 15 7 22 2 1 S",
			"1942 1945 9 24 6 23 2 0",
			"1943 1943 3 17 7 22 2 2 M",
			"1943 1945 7 25 6 22 2 1 S",
			"1944 1945 3 21 6 22 2 2 M",
			"1946 1946 3 1 6 23 2 1 S",
			"1946 1946 9 1 6 23 2 0",
			"1947 1949 3 1 0 2 2 1 S",
			"1947 1949 9 1 0 2 2 0",
			"1951 1965 3 1 0 2 2 1 S",
			"1951 1965 9 1 0 2 2 0",
			"1977 1977 2 27 7 0 2 1 S",
			"1977 1977 8 25 7 0 2 0",
			"1978 1979 3 1 0 0 2 1 S",
			"1978 1978 9 1 7 0 2 0",
			"1979 1982 8 0 8 1 2 0",
			"1980 1980 2 0 8 0 2 1 S",
			"1981 1982 2 0 8 1 2 1 S",
			"1983 1983 2 0 8 2 2 1 S"
		],
		"Pulaski": [
			"1946 1960 3 0 8 2 0 1 D",
			"1946 1954 8 0 8 2 0 0 S",
			"1955 1956 9 0 8 2 0 0 S",
			"1957 1960 8 0 8 2 0 0 S"
		],
		"ROK": [
			"1960 1960 4 15 7 0 0 1 D",
			"1960 1960 8 13 7 0 0 0 S",
			"1987 1988 4 8 0 0 0 1 D",
			"1987 1988 9 8 0 0 0 0 S"
		],
		"Regina": [
			"1918 1918 3 14 7 2 0 1 D",
			"1918 1918 9 27 7 2 0 0 S",
			"1930 1934 4 1 0 0 0 1 D",
			"1930 1934 9 1 0 0 0 0 S",
			"1937 1941 3 8 0 0 0 1 D",
			"1937 1937 9 8 0 0 0 0 S",
			"1938 1938 9 1 0 0 0 0 S",
			"1939 1941 9 8 0 0 0 0 S",
			"1942 1942 1 9 7 2 0 1 W",
			"1945 1945 7 14 7 23 1 1 P",
			"1945 1945 8 0 8 2 0 0 S",
			"1946 1946 3 8 0 2 0 1 D",
			"1946 1946 9 8 0 2 0 0 S",
			"1947 1957 3 0 8 2 0 1 D",
			"1947 1957 8 0 8 2 0 0 S",
			"1959 1959 3 0 8 2 0 1 D",
			"1959 1959 9 0 8 2 0 0 S"
		],
		"Romania": [
			"1932 1932 4 21 7 0 2 1 S",
			"1932 1939 9 1 0 0 2 0",
			"1933 1939 3 2 0 0 2 1 S",
			"1979 1979 4 27 7 0 0 1 S",
			"1979 1979 8 0 8 0 0 0",
			"1980 1980 3 5 7 23 0 1 S",
			"1980 1980 8 0 8 1 0 0",
			"1991 1993 2 0 8 0 2 1 S",
			"1991 1993 8 0 8 0 2 0"
		],
		"Russia": [
			"1917 1917 6 1 7 23 0 1 MST",
			"1917 1917 11 28 7 0 0 0 MMT",
			"1918 1918 4 31 7 22 0 2 MDST",
			"1918 1918 8 16 7 1 0 1 MST",
			"1919 1919 4 31 7 23 0 2 MDST",
			"1919 1919 6 1 7 2 0 1 S",
			"1919 1919 7 16 7 0 0 0",
			"1921 1921 1 14 7 23 0 1 S",
			"1921 1921 2 20 7 23 0 2 M",
			"1921 1921 8 1 7 0 0 1 S",
			"1921 1921 9 1 7 0 0 0",
			"1981 1984 3 1 7 0 0 1 S",
			"1981 1983 9 1 7 0 0 0",
			"1984 1991 8 0 8 2 2 0",
			"1985 1991 2 0 8 2 2 1 S",
			"1992 1992 2 6 8 23 0 1 S",
			"1992 1992 8 6 8 23 0 0",
			"1993 2010 2 0 8 2 2 1 S",
			"1993 1995 8 0 8 2 2 0",
			"1996 2010 9 0 8 2 2 0"
		],
		"RussiaAsia": [
			"1981 1984 3 1 7 0 0 1 S",
			"1981 1983 9 1 7 0 0 0",
			"1984 1991 8 0 8 2 2 0",
			"1985 1991 2 0 8 2 2 1 S",
			"1992 1992 2 6 8 23 0 1 S",
			"1992 1992 8 6 8 23 0 0",
			"1993 9999 2 0 8 2 2 1 S",
			"1993 1995 8 0 8 2 2 0",
			"1996 9999 9 0 8 2 2 0"
		],
		"SA": [
			"1942 1943 8 15 0 2 0 1",
			"1943 1944 2 15 0 2 0 0"
		],
		"SL": [
			"1935 1942 5 1 7 0 0 0:40 SLST",
			"1935 1942 9 1 7 0 0 0 WAT",
			"1957 1962 5 1 7 0 0 1 SLST",
			"1957 1962 8 1 7 0 0 0 GMT"
		],
		"Salv": [
			"1987 1988 4 1 0 0 0 1 D",
			"1987 1988 8 0 8 0 0 0 S"
		],
		"SanLuis": [
			"2008 2009 2 8 0 0 0 0",
			"2007 2009 9 8 0 0 0 1 S"
		],
		"Shang": [
			"1940 1940 5 3 7 0 0 1 D",
			"1940 1941 9 1 7 0 0 0 S",
			"1941 1941 2 16 7 0 0 1 D"
		],
		"SovietZone": [
			"1945 1945 4 24 7 2 0 2 M",
			"1945 1945 8 24 7 3 0 1 S",
			"1945 1945 10 18 7 2 2 0"
		],
		"Spain": [
			"1917 1917 4 5 7 23 2 1 S",
			"1917 1919 9 6 7 23 2 0",
			"1918 1918 3 15 7 23 2 1 S",
			"1919 1919 3 5 7 23 2 1 S",
			"1924 1924 3 16 7 23 2 1 S",
			"1924 1924 9 4 7 23 2 0",
			"1926 1926 3 17 7 23 2 1 S",
			"1926 1929 9 1 6 23 2 0",
			"1927 1927 3 9 7 23 2 1 S",
			"1928 1928 3 14 7 23 2 1 S",
			"1929 1929 3 20 7 23 2 1 S",
			"1937 1937 4 22 7 23 2 1 S",
			"1937 1939 9 1 6 23 2 0",
			"1938 1938 2 22 7 23 2 1 S",
			"1939 1939 3 15 7 23 2 1 S",
			"1940 1940 2 16 7 23 2 1 S",
			"1942 1942 4 2 7 22 2 2 M",
			"1942 1942 8 1 7 22 2 1 S",
			"1943 1946 3 13 6 22 2 2 M",
			"1943 1943 9 3 7 22 2 1 S",
			"1944 1944 9 10 7 22 2 1 S",
			"1945 1945 8 30 7 1 0 1 S",
			"1946 1946 8 30 7 0 0 0",
			"1949 1949 3 30 7 23 0 1 S",
			"1949 1949 8 30 7 1 0 0",
			"1974 1975 3 13 6 23 0 1 S",
			"1974 1975 9 1 0 1 0 0",
			"1976 1976 2 27 7 23 0 1 S",
			"1976 1977 8 0 8 1 0 0",
			"1977 1978 3 2 7 23 0 1 S",
			"1978 1978 9 1 7 1 0 0"
		],
		"SpainAfrica": [
			"1967 1967 5 3 7 12 0 1 S",
			"1967 1967 9 1 7 0 0 0",
			"1974 1974 5 24 7 0 0 1 S",
			"1974 1974 8 1 7 0 0 0",
			"1976 1977 4 1 7 0 0 1 S",
			"1976 1976 7 1 7 0 0 0",
			"1977 1977 8 28 7 0 0 0",
			"1978 1978 5 1 7 0 0 1 S",
			"1978 1978 7 4 7 0 0 0"
		],
		"StJohns": [
			"1917 1917 3 8 7 2 0 1 D",
			"1917 1917 8 17 7 2 0 0 S",
			"1919 1919 4 5 7 23 0 1 D",
			"1919 1919 7 12 7 23 0 0 S",
			"1920 1935 4 1 0 23 0 1 D",
			"1920 1935 9 0 8 23 0 0 S",
			"1936 1941 4 9 1 0 0 1 D",
			"1936 1941 9 2 1 0 0 0 S",
			"1946 1950 4 8 0 2 0 1 D",
			"1946 1950 9 2 0 2 0 0 S",
			"1951 1986 3 0 8 2 0 1 D",
			"1951 1959 8 0 8 2 0 0 S",
			"1960 1986 9 0 8 2 0 0 S",
			"1987 1987 3 1 0 0:1 0 1 D",
			"1987 2006 9 0 8 0:1 0 0 S",
			"1988 1988 3 1 0 0:1 0 2 DD",
			"1989 2006 3 1 0 0:1 0 1 D",
			"2007 2011 2 8 0 0:1 0 1 D",
			"2007 2010 10 1 0 0:1 0 0 S"
		],
		"Starke": [
			"1947 1961 3 0 8 2 0 1 D",
			"1947 1954 8 0 8 2 0 0 S",
			"1955 1956 9 0 8 2 0 0 S",
			"1957 1958 8 0 8 2 0 0 S",
			"1959 1961 9 0 8 2 0 0 S"
		],
		"Sudan": [
			"1970 1970 4 1 7 0 0 1 S",
			"1970 1985 9 15 7 0 0 0",
			"1971 1971 3 30 7 0 0 1 S",
			"1972 1985 3 0 8 0 0 1 S"
		],
		"Swift": [
			"1957 1957 3 0 8 2 0 1 D",
			"1957 1957 9 0 8 2 0 0 S",
			"1959 1961 3 0 8 2 0 1 D",
			"1959 1959 9 0 8 2 0 0 S",
			"1960 1961 8 0 8 2 0 0 S"
		],
		"Swiss": [
			"1941 1942 4 1 1 1 0 1 S",
			"1941 1942 9 1 1 2 0 0"
		],
		"Syria": [
			"1920 1923 3 15 0 2 0 1 S",
			"1920 1923 9 1 0 2 0 0",
			"1962 1962 3 29 7 2 0 1 S",
			"1962 1962 9 1 7 2 0 0",
			"1963 1965 4 1 7 2 0 1 S",
			"1963 1963 8 30 7 2 0 0",
			"1964 1964 9 1 7 2 0 0",
			"1965 1965 8 30 7 2 0 0",
			"1966 1966 3 24 7 2 0 1 S",
			"1966 1976 9 1 7 2 0 0",
			"1967 1978 4 1 7 2 0 1 S",
			"1977 1978 8 1 7 2 0 0",
			"1983 1984 3 9 7 2 0 1 S",
			"1983 1984 9 1 7 2 0 0",
			"1986 1986 1 16 7 2 0 1 S",
			"1986 1986 9 9 7 2 0 0",
			"1987 1987 2 1 7 2 0 1 S",
			"1987 1988 9 31 7 2 0 0",
			"1988 1988 2 15 7 2 0 1 S",
			"1989 1989 2 31 7 2 0 1 S",
			"1989 1989 9 1 7 2 0 0",
			"1990 1990 3 1 7 2 0 1 S",
			"1990 1990 8 30 7 2 0 0",
			"1991 1991 3 1 7 0 0 1 S",
			"1991 1992 9 1 7 0 0 0",
			"1992 1992 3 8 7 0 0 1 S",
			"1993 1993 2 26 7 0 0 1 S",
			"1993 1993 8 25 7 0 0 0",
			"1994 1996 3 1 7 0 0 1 S",
			"1994 2005 9 1 7 0 0 0",
			"1997 1998 2 1 8 0 0 1 S",
			"1999 2006 3 1 7 0 0 1 S",
			"2006 2006 8 22 7 0 0 0",
			"2007 2007 2 5 8 0 0 1 S",
			"2007 2007 10 1 5 0 0 0",
			"2008 2008 3 1 5 0 0 1 S",
			"2008 2008 10 1 7 0 0 0",
			"2009 2009 2 5 8 0 0 1 S",
			"2010 2011 3 1 5 0 0 1 S",
			"2012 9999 2 5 8 0 0 1 S",
			"2009 9999 9 5 8 0 0 0"
		],
		"TC": [
			"1979 1986 3 0 8 2 0 1 D",
			"1979 2006 9 0 8 2 0 0 S",
			"1987 2006 3 1 0 2 0 1 D",
			"2007 9999 2 8 0 2 0 1 D",
			"2007 9999 10 1 0 2 0 0 S"
		],
		"Taiwan": [
			"1945 1951 4 1 7 0 0 1 D",
			"1945 1951 9 1 7 0 0 0 S",
			"1952 1952 2 1 7 0 0 1 D",
			"1952 1954 10 1 7 0 0 0 S",
			"1953 1959 3 1 7 0 0 1 D",
			"1955 1961 9 1 7 0 0 0 S",
			"1960 1961 5 1 7 0 0 1 D",
			"1974 1975 3 1 7 0 0 1 D",
			"1974 1975 9 1 7 0 0 0 S",
			"1979 1979 5 30 7 0 0 1 D",
			"1979 1979 8 30 7 0 0 0 S"
		],
		"Thule": [
			"1991 1992 2 0 8 2 0 1 D",
			"1991 1992 8 0 8 2 0 0 S",
			"1993 2006 3 1 0 2 0 1 D",
			"1993 2006 9 0 8 2 0 0 S",
			"2007 9999 2 8 0 2 0 1 D",
			"2007 9999 10 1 0 2 0 0 S"
		],
		"Tonga": [
			"1999 1999 9 7 7 2 2 1 S",
			"2000 2000 2 19 7 2 2 0",
			"2000 2001 10 1 0 2 0 1 S",
			"2001 2002 0 0 8 2 0 0"
		],
		"Toronto": [
			"1919 1919 2 30 7 23:30 0 1 D",
			"1919 1919 9 26 7 0 0 0 S",
			"1920 1920 4 2 7 2 0 1 D",
			"1920 1920 8 26 7 0 0 0 S",
			"1921 1921 4 15 7 2 0 1 D",
			"1921 1921 8 15 7 2 0 0 S",
			"1922 1923 4 8 0 2 0 1 D",
			"1922 1926 8 15 0 2 0 0 S",
			"1924 1927 4 1 0 2 0 1 D",
			"1927 1932 8 0 8 2 0 0 S",
			"1928 1931 3 0 8 2 0 1 D",
			"1932 1932 4 1 7 2 0 1 D",
			"1933 1940 3 0 8 2 0 1 D",
			"1933 1933 9 1 7 2 0 0 S",
			"1934 1939 8 0 8 2 0 0 S",
			"1945 1946 8 0 8 2 0 0 S",
			"1946 1946 3 0 8 2 0 1 D",
			"1947 1949 3 0 8 0 0 1 D",
			"1947 1948 8 0 8 0 0 0 S",
			"1949 1949 10 0 8 0 0 0 S",
			"1950 1973 3 0 8 2 0 1 D",
			"1950 1950 10 0 8 2 0 0 S",
			"1951 1956 8 0 8 2 0 0 S",
			"1957 1973 9 0 8 2 0 0 S"
		],
		"Tunisia": [
			"1939 1939 3 15 7 23 2 1 S",
			"1939 1939 10 18 7 23 2 0",
			"1940 1940 1 25 7 23 2 1 S",
			"1941 1941 9 6 7 0 0 0",
			"1942 1942 2 9 7 0 0 1 S",
			"1942 1942 10 2 7 3 0 0",
			"1943 1943 2 29 7 2 0 1 S",
			"1943 1943 3 17 7 2 0 0",
			"1943 1943 3 25 7 2 0 1 S",
			"1943 1943 9 4 7 2 0 0",
			"1944 1945 3 1 1 2 0 1 S",
			"1944 1944 9 8 7 0 0 0",
			"1945 1945 8 16 7 0 0 0",
			"1977 1977 3 30 7 0 2 1 S",
			"1977 1977 8 24 7 0 2 0",
			"1978 1978 4 1 7 0 2 1 S",
			"1978 1978 9 1 7 0 2 0",
			"1988 1988 5 1 7 0 2 1 S",
			"1988 1990 8 0 8 0 2 0",
			"1989 1989 2 26 7 0 2 1 S",
			"1990 1990 4 1 7 0 2 1 S",
			"2005 2005 4 1 7 0 2 1 S",
			"2005 2005 8 30 7 1 2 0",
			"2006 2008 2 0 8 2 2 1 S",
			"2006 2008 9 0 8 2 2 0"
		],
		"Turkey": [
			"1916 1916 4 1 7 0 0 1 S",
			"1916 1916 9 1 7 0 0 0",
			"1920 1920 2 28 7 0 0 1 S",
			"1920 1920 9 25 7 0 0 0",
			"1921 1921 3 3 7 0 0 1 S",
			"1921 1921 9 3 7 0 0 0",
			"1922 1922 2 26 7 0 0 1 S",
			"1922 1922 9 8 7 0 0 0",
			"1924 1924 4 13 7 0 0 1 S",
			"1924 1925 9 1 7 0 0 0",
			"1925 1925 4 1 7 0 0 1 S",
			"1940 1940 5 30 7 0 0 1 S",
			"1940 1940 9 5 7 0 0 0",
			"1940 1940 11 1 7 0 0 1 S",
			"1941 1941 8 21 7 0 0 0",
			"1942 1942 3 1 7 0 0 1 S",
			"1942 1942 10 1 7 0 0 0",
			"1945 1945 3 2 7 0 0 1 S",
			"1945 1945 9 8 7 0 0 0",
			"1946 1946 5 1 7 0 0 1 S",
			"1946 1946 9 1 7 0 0 0",
			"1947 1948 3 16 0 0 0 1 S",
			"1947 1950 9 2 0 0 0 0",
			"1949 1949 3 10 7 0 0 1 S",
			"1950 1950 3 19 7 0 0 1 S",
			"1951 1951 3 22 7 0 0 1 S",
			"1951 1951 9 8 7 0 0 0",
			"1962 1962 6 15 7 0 0 1 S",
			"1962 1962 9 8 7 0 0 0",
			"1964 1964 4 15 7 0 0 1 S",
			"1964 1964 9 1 7 0 0 0",
			"1970 1972 4 2 0 0 0 1 S",
			"1970 1972 9 2 0 0 0 0",
			"1973 1973 5 3 7 1 0 1 S",
			"1973 1973 10 4 7 3 0 0",
			"1974 1974 2 31 7 2 0 1 S",
			"1974 1974 10 3 7 5 0 0",
			"1975 1975 2 30 7 0 0 1 S",
			"1975 1976 9 0 8 0 0 0",
			"1976 1976 5 1 7 0 0 1 S",
			"1977 1978 3 1 0 0 0 1 S",
			"1977 1977 9 16 7 0 0 0",
			"1979 1980 3 1 0 3 0 1 S",
			"1979 1982 9 11 1 0 0 0",
			"1981 1982 2 0 8 3 0 1 S",
			"1983 1983 6 31 7 0 0 1 S",
			"1983 1983 9 2 7 0 0 0",
			"1985 1985 3 20 7 0 0 1 S",
			"1985 1985 8 28 7 0 0 0",
			"1986 1990 2 0 8 2 2 1 S",
			"1986 1990 8 0 8 2 2 0",
			"1991 2006 2 0 8 1 2 1 S",
			"1991 1995 8 0 8 1 2 0",
			"1996 2006 9 0 8 1 2 0"
		],
		"US": [
			"1918 1919 2 0 8 2 0 1 D",
			"1918 1919 9 0 8 2 0 0 S",
			"1942 1942 1 9 7 2 0 1 W",
			"1945 1945 7 14 7 23 1 1 P",
			"1945 1945 8 30 7 2 0 0 S",
			"1967 2006 9 0 8 2 0 0 S",
			"1967 1973 3 0 8 2 0 1 D",
			"1974 1974 0 6 7 2 0 1 D",
			"1975 1975 1 23 7 2 0 1 D",
			"1976 1986 3 0 8 2 0 1 D",
			"1987 2006 3 1 0 2 0 1 D",
			"2007 9999 2 8 0 2 0 1 D",
			"2007 9999 10 1 0 2 0 0 S"
		],
		"Uruguay": [
			"1923 1923 9 2 7 0 0 0:30 HS",
			"1924 1926 3 1 7 0 0 0",
			"1924 1925 9 1 7 0 0 0:30 HS",
			"1933 1935 9 0 8 0 0 0:30 HS",
			"1934 1936 2 25 6 23:30 2 0",
			"1936 1936 10 1 7 0 0 0:30 HS",
			"1937 1941 2 0 8 0 0 0",
			"1937 1940 9 0 8 0 0 0:30 HS",
			"1941 1941 7 1 7 0 0 0:30 HS",
			"1942 1942 0 1 7 0 0 0",
			"1942 1942 11 14 7 0 0 1 S",
			"1943 1943 2 14 7 0 0 0",
			"1959 1959 4 24 7 0 0 1 S",
			"1959 1959 10 15 7 0 0 0",
			"1960 1960 0 17 7 0 0 1 S",
			"1960 1960 2 6 7 0 0 0",
			"1965 1967 3 1 0 0 0 1 S",
			"1965 1965 8 26 7 0 0 0",
			"1966 1967 9 31 7 0 0 0",
			"1968 1970 4 27 7 0 0 0:30 HS",
			"1968 1970 11 2 7 0 0 0",
			"1972 1972 3 24 7 0 0 1 S",
			"1972 1972 7 15 7 0 0 0",
			"1974 1974 2 10 7 0 0 0:30 HS",
			"1974 1974 11 22 7 0 0 1 S",
			"1976 1976 9 1 7 0 0 0",
			"1977 1977 11 4 7 0 0 1 S",
			"1978 1978 3 1 7 0 0 0",
			"1979 1979 9 1 7 0 0 1 S",
			"1980 1980 4 1 7 0 0 0",
			"1987 1987 11 14 7 0 0 1 S",
			"1988 1988 2 14 7 0 0 0",
			"1988 1988 11 11 7 0 0 1 S",
			"1989 1989 2 12 7 0 0 0",
			"1989 1989 9 29 7 0 0 1 S",
			"1990 1992 2 1 0 0 0 0",
			"1990 1991 9 21 0 0 0 1 S",
			"1992 1992 9 18 7 0 0 1 S",
			"1993 1993 1 28 7 0 0 0",
			"2004 2004 8 19 7 0 0 1 S",
			"2005 2005 2 27 7 2 0 0",
			"2005 2005 9 9 7 2 0 1 S",
			"2006 2006 2 12 7 2 0 0",
			"2006 9999 9 1 0 2 0 1 S",
			"2007 9999 2 8 0 2 0 0"
		],
		"Vanc": [
			"1918 1918 3 14 7 2 0 1 D",
			"1918 1918 9 27 7 2 0 0 S",
			"1942 1942 1 9 7 2 0 1 W",
			"1945 1945 7 14 7 23 1 1 P",
			"1945 1945 8 30 7 2 0 0 S",
			"1946 1986 3 0 8 2 0 1 D",
			"1946 1946 9 13 7 2 0 0 S",
			"1947 1961 8 0 8 2 0 0 S",
			"1962 2006 9 0 8 2 0 0 S"
		],
		"Vanuatu": [
			"1983 1983 8 25 7 0 0 1 S",
			"1984 1991 2 23 0 0 0 0",
			"1984 1984 9 23 7 0 0 1 S",
			"1985 1991 8 23 0 0 0 1 S",
			"1992 1993 0 23 0 0 0 0",
			"1992 1992 9 23 0 0 0 1 S"
		],
		"Vincennes": [
			"1946 1946 3 0 8 2 0 1 D",
			"1946 1946 8 0 8 2 0 0 S",
			"1953 1954 3 0 8 2 0 1 D",
			"1953 1959 8 0 8 2 0 0 S",
			"1955 1955 4 1 7 0 0 1 D",
			"1956 1963 3 0 8 2 0 1 D",
			"1960 1960 9 0 8 2 0 0 S",
			"1961 1961 8 0 8 2 0 0 S",
			"1962 1963 9 0 8 2 0 0 S"
		],
		"W-Eur": [
			"1977 1980 3 1 0 1 2 1 S",
			"1977 1977 8 0 8 1 2 0",
			"1978 1978 9 1 7 1 2 0",
			"1979 1995 8 0 8 1 2 0",
			"1981 9999 2 0 8 1 2 1 S",
			"1996 9999 9 0 8 1 2 0"
		],
		"WS": [
			"2012 9999 8 0 8 3 0 1 D",
			"2012 9999 3 1 0 4 0 0"
		],
		"Winn": [
			"1916 1916 3 23 7 0 0 1 D",
			"1916 1916 8 17 7 0 0 0 S",
			"1918 1918 3 14 7 2 0 1 D",
			"1918 1918 9 27 7 2 0 0 S",
			"1937 1937 4 16 7 2 0 1 D",
			"1937 1937 8 26 7 2 0 0 S",
			"1942 1942 1 9 7 2 0 1 W",
			"1945 1945 7 14 7 23 1 1 P",
			"1945 1945 8 0 8 2 0 0 S",
			"1946 1946 4 12 7 2 0 1 D",
			"1946 1946 9 13 7 2 0 0 S",
			"1947 1949 3 0 8 2 0 1 D",
			"1947 1949 8 0 8 2 0 0 S",
			"1950 1950 4 1 7 2 0 1 D",
			"1950 1950 8 30 7 2 0 0 S",
			"1951 1960 3 0 8 2 0 1 D",
			"1951 1958 8 0 8 2 0 0 S",
			"1959 1959 9 0 8 2 0 0 S",
			"1960 1960 8 0 8 2 0 0 S",
			"1963 1963 3 0 8 2 0 1 D",
			"1963 1963 8 22 7 2 0 0 S",
			"1966 1986 3 0 8 2 2 1 D",
			"1966 2005 9 0 8 2 2 0 S",
			"1987 2005 3 1 0 2 2 1 D"
		],
		"Zion": [
			"1940 1940 5 1 7 0 0 1 D",
			"1942 1944 10 1 7 0 0 0 S",
			"1943 1943 3 1 7 2 0 1 D",
			"1944 1944 3 1 7 0 0 1 D",
			"1945 1945 3 16 7 0 0 1 D",
			"1945 1945 10 1 7 2 0 0 S",
			"1946 1946 3 16 7 2 0 1 D",
			"1946 1946 10 1 7 0 0 0 S",
			"1948 1948 4 23 7 0 0 2 DD",
			"1948 1948 8 1 7 0 0 1 D",
			"1948 1949 10 1 7 2 0 0 S",
			"1949 1949 4 1 7 0 0 1 D",
			"1950 1950 3 16 7 0 0 1 D",
			"1950 1950 8 15 7 3 0 0 S",
			"1951 1951 3 1 7 0 0 1 D",
			"1951 1951 10 11 7 3 0 0 S",
			"1952 1952 3 20 7 2 0 1 D",
			"1952 1952 9 19 7 3 0 0 S",
			"1953 1953 3 12 7 2 0 1 D",
			"1953 1953 8 13 7 3 0 0 S",
			"1954 1954 5 13 7 0 0 1 D",
			"1954 1954 8 12 7 0 0 0 S",
			"1955 1955 5 11 7 2 0 1 D",
			"1955 1955 8 11 7 0 0 0 S",
			"1956 1956 5 3 7 0 0 1 D",
			"1956 1956 8 30 7 3 0 0 S",
			"1957 1957 3 29 7 2 0 1 D",
			"1957 1957 8 22 7 0 0 0 S",
			"1974 1974 6 7 7 0 0 1 D",
			"1974 1974 9 13 7 0 0 0 S",
			"1975 1975 3 20 7 0 0 1 D",
			"1975 1975 7 31 7 0 0 0 S",
			"1985 1985 3 14 7 0 0 1 D",
			"1985 1985 8 15 7 0 0 0 S",
			"1986 1986 4 18 7 0 0 1 D",
			"1986 1986 8 7 7 0 0 0 S",
			"1987 1987 3 15 7 0 0 1 D",
			"1987 1987 8 13 7 0 0 0 S",
			"1988 1988 3 9 7 0 0 1 D",
			"1988 1988 8 3 7 0 0 0 S",
			"1989 1989 3 30 7 0 0 1 D",
			"1989 1989 8 3 7 0 0 0 S",
			"1990 1990 2 25 7 0 0 1 D",
			"1990 1990 7 26 7 0 0 0 S",
			"1991 1991 2 24 7 0 0 1 D",
			"1991 1991 8 1 7 0 0 0 S",
			"1992 1992 2 29 7 0 0 1 D",
			"1992 1992 8 6 7 0 0 0 S",
			"1993 1993 3 2 7 0 0 1 D",
			"1993 1993 8 5 7 0 0 0 S",
			"1994 1994 3 1 7 0 0 1 D",
			"1994 1994 7 28 7 0 0 0 S",
			"1995 1995 2 31 7 0 0 1 D",
			"1995 1995 8 3 7 0 0 0 S",
			"1996 1996 2 15 7 0 0 1 D",
			"1996 1996 8 16 7 0 0 0 S",
			"1997 1997 2 21 7 0 0 1 D",
			"1997 1997 8 14 7 0 0 0 S",
			"1998 1998 2 20 7 0 0 1 D",
			"1998 1998 8 6 7 0 0 0 S",
			"1999 1999 3 2 7 2 0 1 D",
			"1999 1999 8 3 7 2 0 0 S",
			"2000 2000 3 14 7 2 0 1 D",
			"2000 2000 9 6 7 1 0 0 S",
			"2001 2001 3 9 7 1 0 1 D",
			"2001 2001 8 24 7 1 0 0 S",
			"2002 2002 2 29 7 1 0 1 D",
			"2002 2002 9 7 7 1 0 0 S",
			"2003 2003 2 28 7 1 0 1 D",
			"2003 2003 9 3 7 1 0 0 S",
			"2004 2004 3 7 7 1 0 1 D",
			"2004 2004 8 22 7 1 0 0 S",
			"2005 2005 3 1 7 2 0 1 D",
			"2005 2005 9 9 7 2 0 0 S",
			"2006 2010 2 26 5 2 0 1 D",
			"2006 2006 9 1 7 2 0 0 S",
			"2007 2007 8 16 7 2 0 0 S",
			"2008 2008 9 5 7 2 0 0 S",
			"2009 2009 8 27 7 2 0 0 S",
			"2010 2010 8 12 7 2 0 0 S",
			"2011 2011 3 1 7 2 0 1 D",
			"2011 2011 9 2 7 2 0 0 S",
			"2012 2012 2 26 5 2 0 1 D",
			"2012 2012 8 23 7 2 0 0 S",
			"2013 9999 2 23 5 2 0 1 D",
			"2013 2026 9 2 0 2 0 0 S",
			"2027 2027 9 3 1 2 0 0 S",
			"2028 9999 9 2 0 2 0 0 S"
		]
	},
	"zones": {
		"Africa/Abidjan": [
			"-0:16:8 - LMT 1912 -0:16:8",
			"0 - GMT"
		],
		"Africa/Accra": [
			"-0:0:52 - LMT 1918 -0:0:52",
			"0 Ghana %s"
		],
		"Africa/Addis_Ababa": [
			"2:34:48 - LMT 1870 2:34:48",
			"2:35:20 - ADMT 1936_4_5 2:35:20",
			"3 - EAT"
		],
		"Africa/Algiers": [
			"0:12:12 - LMT 1891_2_15_0_1 0:12:12",
			"0:9:21 - PMT 1911_2_11 0:9:21",
			"0 Algeria WE%sT 1940_1_25_2",
			"1 Algeria CE%sT 1946_9_7 1",
			"0 - WET 1956_0_29",
			"1 - CET 1963_3_14 1",
			"0 Algeria WE%sT 1977_9_21 1",
			"1 Algeria CE%sT 1979_9_26 1",
			"0 Algeria WE%sT 1981_4",
			"1 - CET"
		],
		"Africa/Asmara": [
			"2:35:32 - LMT 1870 2:35:32",
			"2:35:32 - AMT 1890 2:35:32",
			"2:35:20 - ADMT 1936_4_5 2:35:20",
			"3 - EAT"
		],
		"Africa/Bamako": [
			"-0:32 - LMT 1912 -0:32",
			"0 - GMT 1934_1_26",
			"-1 - WAT 1960_5_20 -1",
			"0 - GMT"
		],
		"Africa/Bangui": [
			"1:14:20 - LMT 1912 1:14:20",
			"1 - WAT"
		],
		"Africa/Banjul": [
			"-1:6:36 - LMT 1912 -1:6:36",
			"-1:6:36 - BMT 1935 -1:6:36",
			"-1 - WAT 1964 -1",
			"0 - GMT"
		],
		"Africa/Bissau": [
			"-1:2:20 - LMT 1911_4_26 -1:2:20",
			"-1 - WAT 1975 -1",
			"0 - GMT"
		],
		"Africa/Blantyre": [
			"2:20 - LMT 1903_2 2:20",
			"2 - CAT"
		],
		"Africa/Brazzaville": [
			"1:1:8 - LMT 1912 1:1:8",
			"1 - WAT"
		],
		"Africa/Bujumbura": [
			"1:57:28 - LMT 1890 1:57:28",
			"2 - CAT"
		],
		"Africa/Cairo": [
			"2:5:9 - LMT 1900_9 2:5:9",
			"2 Egypt EE%sT"
		],
		"Africa/Casablanca": [
			"-0:30:20 - LMT 1913_9_26 -0:30:20",
			"0 Morocco WE%sT 1984_2_16",
			"1 - CET 1986 1",
			"0 Morocco WE%sT"
		],
		"Africa/Ceuta": [
			"-0:21:16 - LMT 1901 -0:21:16",
			"0 - WET 1918_4_6_23",
			"1 - WEST 1918_9_7_23 1",
			"0 - WET 1924",
			"0 Spain WE%sT 1929",
			"0 SpainAfrica WE%sT 1984_2_16",
			"1 - CET 1986 1",
			"1 EU CE%sT"
		],
		"Africa/Conakry": [
			"-0:54:52 - LMT 1912 -0:54:52",
			"0 - GMT 1934_1_26",
			"-1 - WAT 1960 -1",
			"0 - GMT"
		],
		"Africa/Dakar": [
			"-1:9:44 - LMT 1912 -1:9:44",
			"-1 - WAT 1941_5 -1",
			"0 - GMT"
		],
		"Africa/Dar_es_Salaam": [
			"2:37:8 - LMT 1931 2:37:8",
			"3 - EAT 1948 3",
			"2:45 - BEAUT 1961 2:45",
			"3 - EAT"
		],
		"Africa/Djibouti": [
			"2:52:36 - LMT 1911_6 2:52:36",
			"3 - EAT"
		],
		"Africa/Douala": [
			"0:38:48 - LMT 1912 0:38:48",
			"1 - WAT"
		],
		"Africa/El_Aaiun": [
			"-0:52:48 - LMT 1934_0 -0:52:48",
			"-1 - WAT 1976_3_14 -1",
			"0 - WET"
		],
		"Africa/Freetown": [
			"-0:53 - LMT 1882 -0:53",
			"-0:53 - FMT 1913_5 -0:53",
			"-1 SL %s 1957 -1",
			"0 SL %s"
		],
		"Africa/Gaborone": [
			"1:43:40 - LMT 1885 1:43:40",
			"1:30 - SAST 1903_2 1:30",
			"2 - CAT 1943_8_19_2 2",
			"3 - CAST 1944_2_19_2 3",
			"2 - CAT"
		],
		"Africa/Harare": [
			"2:4:12 - LMT 1903_2 2:4:12",
			"2 - CAT"
		],
		"Africa/Johannesburg": [
			"1:52 - LMT 1892_1_8 1:52",
			"1:30 - SAST 1903_2 1:30",
			"2 SA SAST"
		],
		"Africa/Juba": [
			"2:6:24 - LMT 1931 2:6:24",
			"2 Sudan CA%sT 2000_0_15_12 2",
			"3 - EAT"
		],
		"Africa/Kampala": [
			"2:9:40 - LMT 1928_6 2:9:40",
			"3 - EAT 1930 3",
			"2:30 - BEAT 1948 2:30",
			"2:45 - BEAUT 1957 2:45",
			"3 - EAT"
		],
		"Africa/Khartoum": [
			"2:10:8 - LMT 1931 2:10:8",
			"2 Sudan CA%sT 2000_0_15_12 2",
			"3 - EAT"
		],
		"Africa/Kigali": [
			"2:0:16 - LMT 1935_5 2:0:16",
			"2 - CAT"
		],
		"Africa/Kinshasa": [
			"1:1:12 - LMT 1897_10_9 1:1:12",
			"1 - WAT"
		],
		"Africa/Lagos": [
			"0:13:36 - LMT 1919_8 0:13:36",
			"1 - WAT"
		],
		"Africa/Libreville": [
			"0:37:48 - LMT 1912 0:37:48",
			"1 - WAT"
		],
		"Africa/Lome": [
			"0:4:52 - LMT 1893 0:4:52",
			"0 - GMT"
		],
		"Africa/Luanda": [
			"0:52:56 - LMT 1892 0:52:56",
			"0:52:4 - AOT 1911_4_26 0:52:4",
			"1 - WAT"
		],
		"Africa/Lubumbashi": [
			"1:49:52 - LMT 1897_10_9 1:49:52",
			"2 - CAT"
		],
		"Africa/Lusaka": [
			"1:53:8 - LMT 1903_2 1:53:8",
			"2 - CAT"
		],
		"Africa/Malabo": [
			"0:35:8 - LMT 1912 0:35:8",
			"0 - GMT 1963_11_15",
			"1 - WAT"
		],
		"Africa/Maputo": [
			"2:10:20 - LMT 1903_2 2:10:20",
			"2 - CAT"
		],
		"Africa/Maseru": [
			"1:50 - LMT 1903_2 1:50",
			"2 - SAST 1943_8_19_2 2",
			"3 - SAST 1944_2_19_2 3",
			"2 - SAST"
		],
		"Africa/Mbabane": [
			"2:4:24 - LMT 1903_2 2:4:24",
			"2 - SAST"
		],
		"Africa/Mogadishu": [
			"3:1:28 - LMT 1893_10 3:1:28",
			"3 - EAT 1931 3",
			"2:30 - BEAT 1957 2:30",
			"3 - EAT"
		],
		"Africa/Monrovia": [
			"-0:43:8 - LMT 1882 -0:43:8",
			"-0:43:8 - MMT 1919_2 -0:43:8",
			"-0:44:30 - LRT 1972_4 -0:44:30",
			"0 - GMT"
		],
		"Africa/Nairobi": [
			"2:27:16 - LMT 1928_6 2:27:16",
			"3 - EAT 1930 3",
			"2:30 - BEAT 1940 2:30",
			"2:45 - BEAUT 1960 2:45",
			"3 - EAT"
		],
		"Africa/Ndjamena": [
			"1:0:12 - LMT 1912 1:0:12",
			"1 - WAT 1979_9_14 1",
			"2 - WAST 1980_2_8 2",
			"1 - WAT"
		],
		"Africa/Niamey": [
			"0:8:28 - LMT 1912 0:8:28",
			"-1 - WAT 1934_1_26 -1",
			"0 - GMT 1960",
			"1 - WAT"
		],
		"Africa/Nouakchott": [
			"-1:3:48 - LMT 1912 -1:3:48",
			"0 - GMT 1934_1_26",
			"-1 - WAT 1960_10_28 -1",
			"0 - GMT"
		],
		"Africa/Ouagadougou": [
			"-0:6:4 - LMT 1912 -0:6:4",
			"0 - GMT"
		],
		"Africa/Porto-Novo": [
			"0:10:28 - LMT 1912 0:10:28",
			"0 - GMT 1934_1_26",
			"1 - WAT"
		],
		"Africa/Sao_Tome": [
			"0:26:56 - LMT 1884 0:26:56",
			"-0:36:32 - LMT 1912 -0:36:32",
			"0 - GMT"
		],
		"Africa/Tripoli": [
			"0:52:44 - LMT 1920 0:52:44",
			"1 Libya CE%sT 1959 1",
			"2 - EET 1982 2",
			"1 Libya CE%sT 1990_4_4 1",
			"2 - EET 1996_8_30 2",
			"1 Libya CE%sT 1997_9_4 2",
			"2 - EET 2012_10_10_2 2",
			"1 Libya CE%sT"
		],
		"Africa/Tunis": [
			"0:40:44 - LMT 1881_4_12 0:40:44",
			"0:9:21 - PMT 1911_2_11 0:9:21",
			"1 Tunisia CE%sT"
		],
		"Africa/Windhoek": [
			"1:8:24 - LMT 1892_1_8 1:8:24",
			"1:30 - SWAT 1903_2 1:30",
			"2 - SAST 1942_8_20_2 2",
			"3 - SAST 1943_2_21_2 3",
			"2 - SAST 1990_2_21 2",
			"2 - CAT 1994_3_3 2",
			"1 Namibia WA%sT"
		],
		"America/Adak": [
			"12:13:21 - LMT 1867_9_18 12:13:21",
			"-11:46:38 - LMT 1900_7_20_12 -11:46:38",
			"-11 - NST 1942 -11",
			"-11 US N%sT 1946 -11",
			"-11 - NST 1967_3 -11",
			"-11 - BST 1969 -11",
			"-11 US B%sT 1983_9_30_2 -10",
			"-10 US AH%sT 1983_10_30 -10",
			"-10 US HA%sT"
		],
		"America/Anchorage": [
			"14:0:24 - LMT 1867_9_18 14:0:24",
			"-9:59:36 - LMT 1900_7_20_12 -9:59:36",
			"-10 - CAT 1942 -10",
			"-10 US CAT/CAWT 1945_7_14_23",
			"-10 US CAT/CAPT 1946 -10",
			"-10 - CAT 1967_3 -10",
			"-10 - AHST 1969 -10",
			"-10 US AH%sT 1983_9_30_2 -9",
			"-9 US Y%sT 1983_10_30 -9",
			"-9 US AK%sT"
		],
		"America/Anguilla": [
			"-4:12:16 - LMT 1912_2_2 -4:12:16",
			"-4 - AST"
		],
		"America/Antigua": [
			"-4:7:12 - LMT 1912_2_2 -4:7:12",
			"-5 - EST 1951 -5",
			"-4 - AST"
		],
		"America/Araguaina": [
			"-3:12:48 - LMT 1914 -3:12:48",
			"-3 Brazil BR%sT 1990_8_17 -3",
			"-3 - BRT 1995_8_14 -3",
			"-3 Brazil BR%sT 2003_8_24 -3",
			"-3 - BRT 2012_9_21 -3",
			"-3 Brazil BR%sT"
		],
		"America/Argentina/Buenos_Aires": [
			"-3:53:48 - LMT 1894_9_31 -3:53:48",
			"-4:16:48 - CMT 1920_4 -4:16:48",
			"-4 - ART 1930_11 -4",
			"-4 Arg AR%sT 1969_9_5 -4",
			"-3 Arg AR%sT 1999_9_3 -3",
			"-4 Arg AR%sT 2000_2_3 -3",
			"-3 Arg AR%sT"
		],
		"America/Argentina/Catamarca": [
			"-4:23:8 - LMT 1894_9_31 -4:23:8",
			"-4:16:48 - CMT 1920_4 -4:16:48",
			"-4 - ART 1930_11 -4",
			"-4 Arg AR%sT 1969_9_5 -4",
			"-3 Arg AR%sT 1991_2_3 -2",
			"-4 - WART 1991_9_20 -4",
			"-3 Arg AR%sT 1999_9_3 -3",
			"-4 Arg AR%sT 2000_2_3 -3",
			"-3 - ART 2004_5_1 -3",
			"-4 - WART 2004_5_20 -4",
			"-3 Arg AR%sT 2008_9_18 -3",
			"-3 - ART"
		],
		"America/Argentina/Cordoba": [
			"-4:16:48 - LMT 1894_9_31 -4:16:48",
			"-4:16:48 - CMT 1920_4 -4:16:48",
			"-4 - ART 1930_11 -4",
			"-4 Arg AR%sT 1969_9_5 -4",
			"-3 Arg AR%sT 1991_2_3 -2",
			"-4 - WART 1991_9_20 -4",
			"-3 Arg AR%sT 1999_9_3 -3",
			"-4 Arg AR%sT 2000_2_3 -3",
			"-3 Arg AR%sT"
		],
		"America/Argentina/Jujuy": [
			"-4:21:12 - LMT 1894_9_31 -4:21:12",
			"-4:16:48 - CMT 1920_4 -4:16:48",
			"-4 - ART 1930_11 -4",
			"-4 Arg AR%sT 1969_9_5 -4",
			"-3 Arg AR%sT 1990_2_4 -2",
			"-4 - WART 1990_9_28 -4",
			"-3 - WARST 1991_2_17 -3",
			"-4 - WART 1991_9_6 -4",
			"-2 - ARST 1992 -2",
			"-3 Arg AR%sT 1999_9_3 -3",
			"-4 Arg AR%sT 2000_2_3 -3",
			"-3 Arg AR%sT 2008_9_18 -3",
			"-3 - ART"
		],
		"America/Argentina/La_Rioja": [
			"-4:27:24 - LMT 1894_9_31 -4:27:24",
			"-4:16:48 - CMT 1920_4 -4:16:48",
			"-4 - ART 1930_11 -4",
			"-4 Arg AR%sT 1969_9_5 -4",
			"-3 Arg AR%sT 1991_2_1 -2",
			"-4 - WART 1991_4_7 -4",
			"-3 Arg AR%sT 1999_9_3 -3",
			"-4 Arg AR%sT 2000_2_3 -3",
			"-3 - ART 2004_5_1 -3",
			"-4 - WART 2004_5_20 -4",
			"-3 Arg AR%sT 2008_9_18 -3",
			"-3 - ART"
		],
		"America/Argentina/Mendoza": [
			"-4:35:16 - LMT 1894_9_31 -4:35:16",
			"-4:16:48 - CMT 1920_4 -4:16:48",
			"-4 - ART 1930_11 -4",
			"-4 Arg AR%sT 1969_9_5 -4",
			"-3 Arg AR%sT 1990_2_4 -2",
			"-4 - WART 1990_9_15 -4",
			"-3 - WARST 1991_2_1 -3",
			"-4 - WART 1991_9_15 -4",
			"-3 - WARST 1992_2_1 -3",
			"-4 - WART 1992_9_18 -4",
			"-3 Arg AR%sT 1999_9_3 -3",
			"-4 Arg AR%sT 2000_2_3 -3",
			"-3 - ART 2004_4_23 -3",
			"-4 - WART 2004_8_26 -4",
			"-3 Arg AR%sT 2008_9_18 -3",
			"-3 - ART"
		],
		"America/Argentina/Rio_Gallegos": [
			"-4:36:52 - LMT 1894_9_31 -4:36:52",
			"-4:16:48 - CMT 1920_4 -4:16:48",
			"-4 - ART 1930_11 -4",
			"-4 Arg AR%sT 1969_9_5 -4",
			"-3 Arg AR%sT 1999_9_3 -3",
			"-4 Arg AR%sT 2000_2_3 -3",
			"-3 - ART 2004_5_1 -3",
			"-4 - WART 2004_5_20 -4",
			"-3 Arg AR%sT 2008_9_18 -3",
			"-3 - ART"
		],
		"America/Argentina/Salta": [
			"-4:21:40 - LMT 1894_9_31 -4:21:40",
			"-4:16:48 - CMT 1920_4 -4:16:48",
			"-4 - ART 1930_11 -4",
			"-4 Arg AR%sT 1969_9_5 -4",
			"-3 Arg AR%sT 1991_2_3 -2",
			"-4 - WART 1991_9_20 -4",
			"-3 Arg AR%sT 1999_9_3 -3",
			"-4 Arg AR%sT 2000_2_3 -3",
			"-3 Arg AR%sT 2008_9_18 -3",
			"-3 - ART"
		],
		"America/Argentina/San_Juan": [
			"-4:34:4 - LMT 1894_9_31 -4:34:4",
			"-4:16:48 - CMT 1920_4 -4:16:48",
			"-4 - ART 1930_11 -4",
			"-4 Arg AR%sT 1969_9_5 -4",
			"-3 Arg AR%sT 1991_2_1 -2",
			"-4 - WART 1991_4_7 -4",
			"-3 Arg AR%sT 1999_9_3 -3",
			"-4 Arg AR%sT 2000_2_3 -3",
			"-3 - ART 2004_4_31 -3",
			"-4 - WART 2004_6_25 -4",
			"-3 Arg AR%sT 2008_9_18 -3",
			"-3 - ART"
		],
		"America/Argentina/San_Luis": [
			"-4:25:24 - LMT 1894_9_31 -4:25:24",
			"-4:16:48 - CMT 1920_4 -4:16:48",
			"-4 - ART 1930_11 -4",
			"-4 Arg AR%sT 1969_9_5 -4",
			"-3 Arg AR%sT 1990 -2",
			"-2 - ARST 1990_2_14 -2",
			"-4 - WART 1990_9_15 -4",
			"-3 - WARST 1991_2_1 -3",
			"-4 - WART 1991_5_1 -4",
			"-3 - ART 1999_9_3 -3",
			"-3 - WARST 2000_2_3 -3",
			"-3 - ART 2004_4_31 -3",
			"-4 - WART 2004_6_25 -4",
			"-3 Arg AR%sT 2008_0_21 -2",
			"-4 SanLuis WAR%sT"
		],
		"America/Argentina/Tucuman": [
			"-4:20:52 - LMT 1894_9_31 -4:20:52",
			"-4:16:48 - CMT 1920_4 -4:16:48",
			"-4 - ART 1930_11 -4",
			"-4 Arg AR%sT 1969_9_5 -4",
			"-3 Arg AR%sT 1991_2_3 -2",
			"-4 - WART 1991_9_20 -4",
			"-3 Arg AR%sT 1999_9_3 -3",
			"-4 Arg AR%sT 2000_2_3 -3",
			"-3 - ART 2004_5_1 -3",
			"-4 - WART 2004_5_13 -4",
			"-3 Arg AR%sT"
		],
		"America/Argentina/Ushuaia": [
			"-4:33:12 - LMT 1894_9_31 -4:33:12",
			"-4:16:48 - CMT 1920_4 -4:16:48",
			"-4 - ART 1930_11 -4",
			"-4 Arg AR%sT 1969_9_5 -4",
			"-3 Arg AR%sT 1999_9_3 -3",
			"-4 Arg AR%sT 2000_2_3 -3",
			"-3 - ART 2004_4_30 -3",
			"-4 - WART 2004_5_20 -4",
			"-3 Arg AR%sT 2008_9_18 -3",
			"-3 - ART"
		],
		"America/Aruba": [
			"-4:40:24 - LMT 1912_1_12 -4:40:24",
			"-4:30 - ANT 1965 -4:30",
			"-4 - AST"
		],
		"America/Asuncion": [
			"-3:50:40 - LMT 1890 -3:50:40",
			"-3:50:40 - AMT 1931_9_10 -3:50:40",
			"-4 - PYT 1972_9 -4",
			"-3 - PYT 1974_3 -3",
			"-4 Para PY%sT"
		],
		"America/Atikokan": [
			"-6:6:28 - LMT 1895 -6:6:28",
			"-6 Canada C%sT 1940_8_29 -6",
			"-5 - CDT 1942_1_9_2 -6",
			"-6 Canada C%sT 1945_8_30_2 -5",
			"-5 - EST"
		],
		"America/Bahia": [
			"-2:34:4 - LMT 1914 -2:34:4",
			"-3 Brazil BR%sT 2003_8_24 -3",
			"-3 - BRT 2011_9_16 -3",
			"-3 Brazil BR%sT 2012_9_21 -3",
			"-3 - BRT"
		],
		"America/Bahia_Banderas": [
			"-7:1 - LMT 1921_11_31_23_59 -7:1",
			"-7 - MST 1927_5_10_23 -7",
			"-6 - CST 1930_10_15 -6",
			"-7 - MST 1931_4_1_23 -7",
			"-6 - CST 1931_9 -6",
			"-7 - MST 1932_3_1 -7",
			"-6 - CST 1942_3_24 -6",
			"-7 - MST 1949_0_14 -7",
			"-8 - PST 1970 -8",
			"-7 Mexico M%sT 2010_3_4_2 -7",
			"-6 Mexico C%sT"
		],
		"America/Barbados": [
			"-3:58:29 - LMT 1924 -3:58:29",
			"-3:58:29 - BMT 1932 -3:58:29",
			"-4 Barb A%sT"
		],
		"America/Belem": [
			"-3:13:56 - LMT 1914 -3:13:56",
			"-3 Brazil BR%sT 1988_8_12 -3",
			"-3 - BRT"
		],
		"America/Belize": [
			"-5:52:48 - LMT 1912_3 -5:52:48",
			"-6 Belize C%sT"
		],
		"America/Blanc-Sablon": [
			"-3:48:28 - LMT 1884 -3:48:28",
			"-4 Canada A%sT 1970 -4",
			"-4 - AST"
		],
		"America/Boa_Vista": [
			"-4:2:40 - LMT 1914 -4:2:40",
			"-4 Brazil AM%sT 1988_8_12 -4",
			"-4 - AMT 1999_8_30 -4",
			"-4 Brazil AM%sT 2000_9_15 -3",
			"-4 - AMT"
		],
		"America/Bogota": [
			"-4:56:16 - LMT 1884_2_13 -4:56:16",
			"-4:56:16 - BMT 1914_10_23 -4:56:16",
			"-5 CO CO%sT"
		],
		"America/Boise": [
			"-7:44:49 - LMT 1883_10_18_12_15_11 -7:44:49",
			"-8 US P%sT 1923_4_13_2 -8",
			"-7 US M%sT 1974 -7",
			"-7 - MST 1974_1_3_2 -7",
			"-7 US M%sT"
		],
		"America/Cambridge_Bay": [
			"0 - zzz 1920",
			"-7 NT_YK M%sT 1999_9_31_2 -6",
			"-6 Canada C%sT 2000_9_29_2 -5",
			"-5 - EST 2000_10_5_0 -5",
			"-6 - CST 2001_3_1_3 -6",
			"-7 Canada M%sT"
		],
		"America/Campo_Grande": [
			"-3:38:28 - LMT 1914 -3:38:28",
			"-4 Brazil AM%sT"
		],
		"America/Cancun": [
			"-5:47:4 - LMT 1922_0_1_0_12_56 -5:47:4",
			"-6 - CST 1981_11_23 -6",
			"-5 Mexico E%sT 1998_7_2_2 -4",
			"-6 Mexico C%sT"
		],
		"America/Caracas": [
			"-4:27:44 - LMT 1890 -4:27:44",
			"-4:27:40 - CMT 1912_1_12 -4:27:40",
			"-4:30 - VET 1965 -4:30",
			"-4 - VET 2007_11_9_03 -4",
			"-4:30 - VET"
		],
		"America/Cayenne": [
			"-3:29:20 - LMT 1911_6 -3:29:20",
			"-4 - GFT 1967_9 -4",
			"-3 - GFT"
		],
		"America/Cayman": [
			"-5:25:32 - LMT 1890 -5:25:32",
			"-5:7:12 - KMT 1912_1 -5:7:12",
			"-5 - EST"
		],
		"America/Chicago": [
			"-5:50:36 - LMT 1883_10_18_12_9_24 -5:50:36",
			"-6 US C%sT 1920 -6",
			"-6 Chicago C%sT 1936_2_1_2 -6",
			"-5 - EST 1936_10_15_2 -5",
			"-6 Chicago C%sT 1942 -6",
			"-6 US C%sT 1946 -6",
			"-6 Chicago C%sT 1967 -6",
			"-6 US C%sT"
		],
		"America/Chihuahua": [
			"-7:4:20 - LMT 1921_11_31_23_55_40 -7:4:20",
			"-7 - MST 1927_5_10_23 -7",
			"-6 - CST 1930_10_15 -6",
			"-7 - MST 1931_4_1_23 -7",
			"-6 - CST 1931_9 -6",
			"-7 - MST 1932_3_1 -7",
			"-6 - CST 1996 -6",
			"-6 Mexico C%sT 1998 -6",
			"-6 - CST 1998_3_5_3 -6",
			"-7 Mexico M%sT"
		],
		"America/Costa_Rica": [
			"-5:36:13 - LMT 1890 -5:36:13",
			"-5:36:13 - SJMT 1921_0_15 -5:36:13",
			"-6 CR C%sT"
		],
		"America/Creston": [
			"-7:46:4 - LMT 1884 -7:46:4",
			"-7 - MST 1916_9_1 -7",
			"-8 - PST 1918_5_2 -8",
			"-7 - MST"
		],
		"America/Cuiaba": [
			"-3:44:20 - LMT 1914 -3:44:20",
			"-4 Brazil AM%sT 2003_8_24 -4",
			"-4 - AMT 2004_9_1 -4",
			"-4 Brazil AM%sT"
		],
		"America/Curacao": [
			"-4:35:47 - LMT 1912_1_12 -4:35:47",
			"-4:30 - ANT 1965 -4:30",
			"-4 - AST"
		],
		"America/Danmarkshavn": [
			"-1:14:40 - LMT 1916_6_28 -1:14:40",
			"-3 - WGT 1980_3_6_2 -3",
			"-3 EU WG%sT 1996 -3",
			"0 - GMT"
		],
		"America/Dawson": [
			"-9:17:40 - LMT 1900_7_20 -9:17:40",
			"-9 NT_YK Y%sT 1973_9_28_0 -9",
			"-8 NT_YK P%sT 1980 -8",
			"-8 Canada P%sT"
		],
		"America/Dawson_Creek": [
			"-8:0:56 - LMT 1884 -8:0:56",
			"-8 Canada P%sT 1947 -8",
			"-8 Vanc P%sT 1972_7_30_2 -7",
			"-7 - MST"
		],
		"America/Denver": [
			"-6:59:56 - LMT 1883_10_18_12_0_4 -6:59:56",
			"-7 US M%sT 1920 -7",
			"-7 Denver M%sT 1942 -7",
			"-7 US M%sT 1946 -7",
			"-7 Denver M%sT 1967 -7",
			"-7 US M%sT"
		],
		"America/Detroit": [
			"-5:32:11 - LMT 1905 -5:32:11",
			"-6 - CST 1915_4_15_2 -6",
			"-5 - EST 1942 -5",
			"-5 US E%sT 1946 -5",
			"-5 Detroit E%sT 1973 -5",
			"-5 US E%sT 1975 -5",
			"-5 - EST 1975_3_27_2 -5",
			"-5 US E%sT"
		],
		"America/Dominica": [
			"-4:5:36 - LMT 1911_6_1_0_1 -4:5:36",
			"-4 - AST"
		],
		"America/Edmonton": [
			"-7:33:52 - LMT 1906_8 -7:33:52",
			"-7 Edm M%sT 1987 -7",
			"-7 Canada M%sT"
		],
		"America/Eirunepe": [
			"-4:39:28 - LMT 1914 -4:39:28",
			"-5 Brazil AC%sT 1988_8_12 -5",
			"-5 - ACT 1993_8_28 -5",
			"-5 Brazil AC%sT 1994_8_22 -5",
			"-5 - ACT 2008_5_24_00 -5",
			"-4 - AMT"
		],
		"America/El_Salvador": [
			"-5:56:48 - LMT 1921 -5:56:48",
			"-6 Salv C%sT"
		],
		"America/Fortaleza": [
			"-2:34 - LMT 1914 -2:34",
			"-3 Brazil BR%sT 1990_8_17 -3",
			"-3 - BRT 1999_8_30 -3",
			"-3 Brazil BR%sT 2000_9_22 -2",
			"-3 - BRT 2001_8_13 -3",
			"-3 Brazil BR%sT 2002_9_1 -3",
			"-3 - BRT"
		],
		"America/Glace_Bay": [
			"-3:59:48 - LMT 1902_5_15 -3:59:48",
			"-4 Canada A%sT 1953 -4",
			"-4 Halifax A%sT 1954 -4",
			"-4 - AST 1972 -4",
			"-4 Halifax A%sT 1974 -4",
			"-4 Canada A%sT"
		],
		"America/Godthab": [
			"-3:26:56 - LMT 1916_6_28 -3:26:56",
			"-3 - WGT 1980_3_6_2 -3",
			"-3 EU WG%sT"
		],
		"America/Goose_Bay": [
			"-4:1:40 - LMT 1884 -4:1:40",
			"-3:30:52 - NST 1918 -3:30:52",
			"-3:30:52 Canada N%sT 1919 -3:30:52",
			"-3:30:52 - NST 1935_2_30 -3:30:52",
			"-3:30 - NST 1936 -3:30",
			"-3:30 StJohns N%sT 1942_4_11 -3:30",
			"-3:30 Canada N%sT 1946 -3:30",
			"-3:30 StJohns N%sT 1966_2_15_2 -3:30",
			"-4 StJohns A%sT 2011_10 -3",
			"-4 Canada A%sT"
		],
		"America/Grand_Turk": [
			"-4:44:32 - LMT 1890 -4:44:32",
			"-5:7:12 - KMT 1912_1 -5:7:12",
			"-5 TC E%sT"
		],
		"America/Grenada": [
			"-4:7 - LMT 1911_6 -4:7",
			"-4 - AST"
		],
		"America/Guadeloupe": [
			"-4:6:8 - LMT 1911_5_8 -4:6:8",
			"-4 - AST"
		],
		"America/Guatemala": [
			"-6:2:4 - LMT 1918_9_5 -6:2:4",
			"-6 Guat C%sT"
		],
		"America/Guayaquil": [
			"-5:19:20 - LMT 1890 -5:19:20",
			"-5:14 - QMT 1931 -5:14",
			"-5 - ECT"
		],
		"America/Guyana": [
			"-3:52:40 - LMT 1915_2 -3:52:40",
			"-3:45 - GBGT 1966_4_26 -3:45",
			"-3:45 - GYT 1975_6_31 -3:45",
			"-3 - GYT 1991 -3",
			"-4 - GYT"
		],
		"America/Halifax": [
			"-4:14:24 - LMT 1902_5_15 -4:14:24",
			"-4 Halifax A%sT 1918 -4",
			"-4 Canada A%sT 1919 -4",
			"-4 Halifax A%sT 1942_1_9_2 -4",
			"-4 Canada A%sT 1946 -4",
			"-4 Halifax A%sT 1974 -4",
			"-4 Canada A%sT"
		],
		"America/Havana": [
			"-5:29:28 - LMT 1890 -5:29:28",
			"-5:29:36 - HMT 1925_6_19_12 -5:29:36",
			"-5 Cuba C%sT"
		],
		"America/Hermosillo": [
			"-7:23:52 - LMT 1921_11_31_23_36_8 -7:23:52",
			"-7 - MST 1927_5_10_23 -7",
			"-6 - CST 1930_10_15 -6",
			"-7 - MST 1931_4_1_23 -7",
			"-6 - CST 1931_9 -6",
			"-7 - MST 1932_3_1 -7",
			"-6 - CST 1942_3_24 -6",
			"-7 - MST 1949_0_14 -7",
			"-8 - PST 1970 -8",
			"-7 Mexico M%sT 1999 -7",
			"-7 - MST"
		],
		"America/Indiana/Indianapolis": [
			"-5:44:38 - LMT 1883_10_18_12_15_22 -5:44:38",
			"-6 US C%sT 1920 -6",
			"-6 Indianapolis C%sT 1942 -6",
			"-6 US C%sT 1946 -6",
			"-6 Indianapolis C%sT 1955_3_24_2 -6",
			"-5 - EST 1957_8_29_2 -5",
			"-6 - CST 1958_3_27_2 -6",
			"-5 - EST 1969 -5",
			"-5 US E%sT 1971 -5",
			"-5 - EST 2006 -5",
			"-5 US E%sT"
		],
		"America/Indiana/Knox": [
			"-5:46:30 - LMT 1883_10_18_12_13_30 -5:46:30",
			"-6 US C%sT 1947 -6",
			"-6 Starke C%sT 1962_3_29_2 -6",
			"-5 - EST 1963_9_27_2 -5",
			"-6 US C%sT 1991_9_27_2 -5",
			"-5 - EST 2006_3_2_2 -5",
			"-6 US C%sT"
		],
		"America/Indiana/Marengo": [
			"-5:45:23 - LMT 1883_10_18_12_14_37 -5:45:23",
			"-6 US C%sT 1951 -6",
			"-6 Marengo C%sT 1961_3_30_2 -6",
			"-5 - EST 1969 -5",
			"-5 US E%sT 1974_0_6_2 -5",
			"-5 - CDT 1974_9_27_2 -5",
			"-5 US E%sT 1976 -5",
			"-5 - EST 2006 -5",
			"-5 US E%sT"
		],
		"America/Indiana/Petersburg": [
			"-5:49:7 - LMT 1883_10_18_12_10_53 -5:49:7",
			"-6 US C%sT 1955 -6",
			"-6 Pike C%sT 1965_3_25_2 -6",
			"-5 - EST 1966_9_30_2 -5",
			"-6 US C%sT 1977_9_30_2 -5",
			"-5 - EST 2006_3_2_2 -5",
			"-6 US C%sT 2007_10_4_2 -5",
			"-5 US E%sT"
		],
		"America/Indiana/Tell_City": [
			"-5:47:3 - LMT 1883_10_18_12_12_57 -5:47:3",
			"-6 US C%sT 1946 -6",
			"-6 Perry C%sT 1964_3_26_2 -6",
			"-5 - EST 1969 -5",
			"-5 US E%sT 1971 -5",
			"-5 - EST 2006_3_2_2 -5",
			"-6 US C%sT"
		],
		"America/Indiana/Vevay": [
			"-5:40:16 - LMT 1883_10_18_12_19_44 -5:40:16",
			"-6 US C%sT 1954_3_25_2 -6",
			"-5 - EST 1969 -5",
			"-5 US E%sT 1973 -5",
			"-5 - EST 2006 -5",
			"-5 US E%sT"
		],
		"America/Indiana/Vincennes": [
			"-5:50:7 - LMT 1883_10_18_12_9_53 -5:50:7",
			"-6 US C%sT 1946 -6",
			"-6 Vincennes C%sT 1964_3_26_2 -6",
			"-5 - EST 1969 -5",
			"-5 US E%sT 1971 -5",
			"-5 - EST 2006_3_2_2 -5",
			"-6 US C%sT 2007_10_4_2 -5",
			"-5 US E%sT"
		],
		"America/Indiana/Winamac": [
			"-5:46:25 - LMT 1883_10_18_12_13_35 -5:46:25",
			"-6 US C%sT 1946 -6",
			"-6 Pulaski C%sT 1961_3_30_2 -6",
			"-5 - EST 1969 -5",
			"-5 US E%sT 1971 -5",
			"-5 - EST 2006_3_2_2 -5",
			"-6 US C%sT 2007_2_11_2 -6",
			"-5 US E%sT"
		],
		"America/Inuvik": [
			"0 - zzz 1953",
			"-8 NT_YK P%sT 1979_3_29_2 -8",
			"-7 NT_YK M%sT 1980 -7",
			"-7 Canada M%sT"
		],
		"America/Iqaluit": [
			"0 - zzz 1942_7",
			"-5 NT_YK E%sT 1999_9_31_2 -4",
			"-6 Canada C%sT 2000_9_29_2 -5",
			"-5 Canada E%sT"
		],
		"America/Jamaica": [
			"-5:7:12 - LMT 1890 -5:7:12",
			"-5:7:12 - KMT 1912_1 -5:7:12",
			"-5 - EST 1974_3_28_2 -5",
			"-5 US E%sT 1984 -5",
			"-5 - EST"
		],
		"America/Juneau": [
			"15:2:19 - LMT 1867_9_18 15:2:19",
			"-8:57:41 - LMT 1900_7_20_12 -8:57:41",
			"-8 - PST 1942 -8",
			"-8 US P%sT 1946 -8",
			"-8 - PST 1969 -8",
			"-8 US P%sT 1980_3_27_2 -8",
			"-9 US Y%sT 1980_9_26_2 -8",
			"-8 US P%sT 1983_9_30_2 -7",
			"-9 US Y%sT 1983_10_30 -9",
			"-9 US AK%sT"
		],
		"America/Kentucky/Louisville": [
			"-5:43:2 - LMT 1883_10_18_12_16_58 -5:43:2",
			"-6 US C%sT 1921 -6",
			"-6 Louisville C%sT 1942 -6",
			"-6 US C%sT 1946 -6",
			"-6 Louisville C%sT 1961_6_23_2 -5",
			"-5 - EST 1968 -5",
			"-5 US E%sT 1974_0_6_2 -5",
			"-5 - CDT 1974_9_27_2 -5",
			"-5 US E%sT"
		],
		"America/Kentucky/Monticello": [
			"-5:39:24 - LMT 1883_10_18_12_20_36 -5:39:24",
			"-6 US C%sT 1946 -6",
			"-6 - CST 1968 -6",
			"-6 US C%sT 2000_9_29_2 -5",
			"-5 US E%sT"
		],
		"America/La_Paz": [
			"-4:32:36 - LMT 1890 -4:32:36",
			"-4:32:36 - CMT 1931_9_15 -4:32:36",
			"-3:32:36 - BOST 1932_2_21 -3:32:36",
			"-4 - BOT"
		],
		"America/Lima": [
			"-5:8:12 - LMT 1890 -5:8:12",
			"-5:8:36 - LMT 1908_6_28 -5:8:36",
			"-5 Peru PE%sT"
		],
		"America/Los_Angeles": [
			"-7:52:58 - LMT 1883_10_18_12_7_2 -7:52:58",
			"-8 US P%sT 1946 -8",
			"-8 CA P%sT 1967 -8",
			"-8 US P%sT"
		],
		"America/Maceio": [
			"-2:22:52 - LMT 1914 -2:22:52",
			"-3 Brazil BR%sT 1990_8_17 -3",
			"-3 - BRT 1995_9_13 -3",
			"-3 Brazil BR%sT 1996_8_4 -3",
			"-3 - BRT 1999_8_30 -3",
			"-3 Brazil BR%sT 2000_9_22 -2",
			"-3 - BRT 2001_8_13 -3",
			"-3 Brazil BR%sT 2002_9_1 -3",
			"-3 - BRT"
		],
		"America/Managua": [
			"-5:45:8 - LMT 1890 -5:45:8",
			"-5:45:12 - MMT 1934_5_23 -5:45:12",
			"-6 - CST 1973_4 -6",
			"-5 - EST 1975_1_16 -5",
			"-6 Nic C%sT 1992_0_1_4 -6",
			"-5 - EST 1992_8_24 -5",
			"-6 - CST 1993 -6",
			"-5 - EST 1997 -5",
			"-6 Nic C%sT"
		],
		"America/Manaus": [
			"-4:0:4 - LMT 1914 -4:0:4",
			"-4 Brazil AM%sT 1988_8_12 -4",
			"-4 - AMT 1993_8_28 -4",
			"-4 Brazil AM%sT 1994_8_22 -4",
			"-4 - AMT"
		],
		"America/Martinique": [
			"-4:4:20 - LMT 1890 -4:4:20",
			"-4:4:20 - FFMT 1911_4 -4:4:20",
			"-4 - AST 1980_3_6 -4",
			"-3 - ADT 1980_8_28 -3",
			"-4 - AST"
		],
		"America/Matamoros": [
			"-6:40 - LMT 1921_11_31_23_20 -6:40",
			"-6 - CST 1988 -6",
			"-6 US C%sT 1989 -6",
			"-6 Mexico C%sT 2010 -6",
			"-6 US C%sT"
		],
		"America/Mazatlan": [
			"-7:5:40 - LMT 1921_11_31_23_54_20 -7:5:40",
			"-7 - MST 1927_5_10_23 -7",
			"-6 - CST 1930_10_15 -6",
			"-7 - MST 1931_4_1_23 -7",
			"-6 - CST 1931_9 -6",
			"-7 - MST 1932_3_1 -7",
			"-6 - CST 1942_3_24 -6",
			"-7 - MST 1949_0_14 -7",
			"-8 - PST 1970 -8",
			"-7 Mexico M%sT"
		],
		"America/Menominee": [
			"-5:50:27 - LMT 1885_8_18_12 -5:50:27",
			"-6 US C%sT 1946 -6",
			"-6 Menominee C%sT 1969_3_27_2 -6",
			"-5 - EST 1973_3_29_2 -5",
			"-6 US C%sT"
		],
		"America/Merida": [
			"-5:58:28 - LMT 1922_0_1_0_1_32 -5:58:28",
			"-6 - CST 1981_11_23 -6",
			"-5 - EST 1982_11_2 -5",
			"-6 Mexico C%sT"
		],
		"America/Metlakatla": [
			"15:13:42 - LMT 1867_9_18 15:13:42",
			"-8:46:18 - LMT 1900_7_20_12 -8:46:18",
			"-8 - PST 1942 -8",
			"-8 US P%sT 1946 -8",
			"-8 - PST 1969 -8",
			"-8 US P%sT 1983_9_30_2 -7",
			"-8 - MeST"
		],
		"America/Mexico_City": [
			"-6:36:36 - LMT 1922_0_1_0_23_24 -6:36:36",
			"-7 - MST 1927_5_10_23 -7",
			"-6 - CST 1930_10_15 -6",
			"-7 - MST 1931_4_1_23 -7",
			"-6 - CST 1931_9 -6",
			"-7 - MST 1932_3_1 -7",
			"-6 Mexico C%sT 2001_8_30_02 -5",
			"-6 - CST 2002_1_20 -6",
			"-6 Mexico C%sT"
		],
		"America/Miquelon": [
			"-3:44:40 - LMT 1911_4_15 -3:44:40",
			"-4 - AST 1980_4 -4",
			"-3 - PMST 1987 -3",
			"-3 Canada PM%sT"
		],
		"America/Moncton": [
			"-4:19:8 - LMT 1883_11_9 -4:19:8",
			"-5 - EST 1902_5_15 -5",
			"-4 Canada A%sT 1933 -4",
			"-4 Moncton A%sT 1942 -4",
			"-4 Canada A%sT 1946 -4",
			"-4 Moncton A%sT 1973 -4",
			"-4 Canada A%sT 1993 -4",
			"-4 Moncton A%sT 2007 -4",
			"-4 Canada A%sT"
		],
		"America/Monterrey": [
			"-6:41:16 - LMT 1921_11_31_23_18_44 -6:41:16",
			"-6 - CST 1988 -6",
			"-6 US C%sT 1989 -6",
			"-6 Mexico C%sT"
		],
		"America/Montevideo": [
			"-3:44:44 - LMT 1898_5_28 -3:44:44",
			"-3:44:44 - MMT 1920_4_1 -3:44:44",
			"-3:30 Uruguay UY%sT 1942_11_14 -3:30",
			"-3 Uruguay UY%sT"
		],
		"America/Montreal": [
			"-4:54:16 - LMT 1884 -4:54:16",
			"-5 Mont E%sT 1918 -5",
			"-5 Canada E%sT 1919 -5",
			"-5 Mont E%sT 1942_1_9_2 -5",
			"-5 Canada E%sT 1946 -5",
			"-5 Mont E%sT 1974 -5",
			"-5 Canada E%sT"
		],
		"America/Montserrat": [
			"-4:8:52 - LMT 1911_6_1_0_1 -4:8:52",
			"-4 - AST"
		],
		"America/Nassau": [
			"-5:9:30 - LMT 1912_2_2 -5:9:30",
			"-5 Bahamas E%sT 1976 -5",
			"-5 US E%sT"
		],
		"America/New_York": [
			"-4:56:2 - LMT 1883_10_18_12_3_58 -4:56:2",
			"-5 US E%sT 1920 -5",
			"-5 NYC E%sT 1942 -5",
			"-5 US E%sT 1946 -5",
			"-5 NYC E%sT 1967 -5",
			"-5 US E%sT"
		],
		"America/Nipigon": [
			"-5:53:4 - LMT 1895 -5:53:4",
			"-5 Canada E%sT 1940_8_29 -5",
			"-4 - EDT 1942_1_9_2 -5",
			"-5 Canada E%sT"
		],
		"America/Nome": [
			"12:58:21 - LMT 1867_9_18 12:58:21",
			"-11:1:38 - LMT 1900_7_20_12 -11:1:38",
			"-11 - NST 1942 -11",
			"-11 US N%sT 1946 -11",
			"-11 - NST 1967_3 -11",
			"-11 - BST 1969 -11",
			"-11 US B%sT 1983_9_30_2 -10",
			"-9 US Y%sT 1983_10_30 -9",
			"-9 US AK%sT"
		],
		"America/Noronha": [
			"-2:9:40 - LMT 1914 -2:9:40",
			"-2 Brazil FN%sT 1990_8_17 -2",
			"-2 - FNT 1999_8_30 -2",
			"-2 Brazil FN%sT 2000_9_15 -1",
			"-2 - FNT 2001_8_13 -2",
			"-2 Brazil FN%sT 2002_9_1 -2",
			"-2 - FNT"
		],
		"America/North_Dakota/Beulah": [
			"-6:47:7 - LMT 1883_10_18_12_12_53 -6:47:7",
			"-7 US M%sT 2010_10_7_2 -6",
			"-6 US C%sT"
		],
		"America/North_Dakota/Center": [
			"-6:45:12 - LMT 1883_10_18_12_14_48 -6:45:12",
			"-7 US M%sT 1992_9_25_02 -6",
			"-6 US C%sT"
		],
		"America/North_Dakota/New_Salem": [
			"-6:45:39 - LMT 1883_10_18_12_14_21 -6:45:39",
			"-7 US M%sT 2003_9_26_02 -6",
			"-6 US C%sT"
		],
		"America/Ojinaga": [
			"-6:57:40 - LMT 1922_0_1_0_2_20 -6:57:40",
			"-7 - MST 1927_5_10_23 -7",
			"-6 - CST 1930_10_15 -6",
			"-7 - MST 1931_4_1_23 -7",
			"-6 - CST 1931_9 -6",
			"-7 - MST 1932_3_1 -7",
			"-6 - CST 1996 -6",
			"-6 Mexico C%sT 1998 -6",
			"-6 - CST 1998_3_5_3 -6",
			"-7 Mexico M%sT 2010 -7",
			"-7 US M%sT"
		],
		"America/Panama": [
			"-5:18:8 - LMT 1890 -5:18:8",
			"-5:19:36 - CMT 1908_3_22 -5:19:36",
			"-5 - EST"
		],
		"America/Pangnirtung": [
			"0 - zzz 1921",
			"-4 NT_YK A%sT 1995_3_2_2 -4",
			"-5 Canada E%sT 1999_9_31_2 -4",
			"-6 Canada C%sT 2000_9_29_2 -5",
			"-5 Canada E%sT"
		],
		"America/Paramaribo": [
			"-3:40:40 - LMT 1911 -3:40:40",
			"-3:40:52 - PMT 1935 -3:40:52",
			"-3:40:36 - PMT 1945_9 -3:40:36",
			"-3:30 - NEGT 1975_10_20 -3:30",
			"-3:30 - SRT 1984_9 -3:30",
			"-3 - SRT"
		],
		"America/Phoenix": [
			"-7:28:18 - LMT 1883_10_18_11_31_42 -7:28:18",
			"-7 US M%sT 1944_0_1_00_1 -6",
			"-7 - MST 1944_3_1_00_1 -7",
			"-7 US M%sT 1944_9_1_00_1 -6",
			"-7 - MST 1967 -7",
			"-7 US M%sT 1968_2_21 -7",
			"-7 - MST"
		],
		"America/Port-au-Prince": [
			"-4:49:20 - LMT 1890 -4:49:20",
			"-4:49 - PPMT 1917_0_24_12 -4:49",
			"-5 Haiti E%sT"
		],
		"America/Port_of_Spain": [
			"-4:6:4 - LMT 1912_2_2 -4:6:4",
			"-4 - AST"
		],
		"America/Porto_Velho": [
			"-4:15:36 - LMT 1914 -4:15:36",
			"-4 Brazil AM%sT 1988_8_12 -4",
			"-4 - AMT"
		],
		"America/Puerto_Rico": [
			"-4:24:25 - LMT 1899_2_28_12 -4:24:25",
			"-4 - AST 1942_4_3 -4",
			"-4 US A%sT 1946 -4",
			"-4 - AST"
		],
		"America/Rainy_River": [
			"-6:18:16 - LMT 1895 -6:18:16",
			"-6 Canada C%sT 1940_8_29 -6",
			"-5 - CDT 1942_1_9_2 -6",
			"-6 Canada C%sT"
		],
		"America/Rankin_Inlet": [
			"0 - zzz 1957",
			"-6 NT_YK C%sT 2000_9_29_2 -5",
			"-5 - EST 2001_3_1_3 -5",
			"-6 Canada C%sT"
		],
		"America/Recife": [
			"-2:19:36 - LMT 1914 -2:19:36",
			"-3 Brazil BR%sT 1990_8_17 -3",
			"-3 - BRT 1999_8_30 -3",
			"-3 Brazil BR%sT 2000_9_15 -2",
			"-3 - BRT 2001_8_13 -3",
			"-3 Brazil BR%sT 2002_9_1 -3",
			"-3 - BRT"
		],
		"America/Regina": [
			"-6:58:36 - LMT 1905_8 -6:58:36",
			"-7 Regina M%sT 1960_3_24_2 -7",
			"-6 - CST"
		],
		"America/Resolute": [
			"0 - zzz 1947_7_31",
			"-6 NT_YK C%sT 2000_9_29_2 -5",
			"-5 - EST 2001_3_1_3 -5",
			"-6 Canada C%sT 2006_9_29_2 -5",
			"-5 - EST 2007_2_11_3 -5",
			"-6 Canada C%sT"
		],
		"America/Rio_Branco": [
			"-4:31:12 - LMT 1914 -4:31:12",
			"-5 Brazil AC%sT 1988_8_12 -5",
			"-5 - ACT 2008_5_24_00 -5",
			"-4 - AMT"
		],
		"America/Santa_Isabel": [
			"-7:39:28 - LMT 1922_0_1_0_20_32 -7:39:28",
			"-7 - MST 1924 -7",
			"-8 - PST 1927_5_10_23 -8",
			"-7 - MST 1930_10_15 -7",
			"-8 - PST 1931_3_1 -8",
			"-7 - PDT 1931_8_30 -7",
			"-8 - PST 1942_3_24 -8",
			"-7 - PWT 1945_7_14_23",
			"-7 - PPT 1945_10_12 -7",
			"-8 - PST 1948_3_5 -8",
			"-7 - PDT 1949_0_14 -7",
			"-8 - PST 1954 -8",
			"-8 CA P%sT 1961 -8",
			"-8 - PST 1976 -8",
			"-8 US P%sT 1996 -8",
			"-8 Mexico P%sT 2001 -8",
			"-8 US P%sT 2002_1_20 -8",
			"-8 Mexico P%sT"
		],
		"America/Santarem": [
			"-3:38:48 - LMT 1914 -3:38:48",
			"-4 Brazil AM%sT 1988_8_12 -4",
			"-4 - AMT 2008_5_24_00 -4",
			"-3 - BRT"
		],
		"America/Santiago": [
			"-4:42:46 - LMT 1890 -4:42:46",
			"-4:42:46 - SMT 1910 -4:42:46",
			"-5 - CLT 1916_6_1 -5",
			"-4:42:46 - SMT 1918_8_1 -4:42:46",
			"-4 - CLT 1919_6_1 -4",
			"-4:42:46 - SMT 1927_8_1 -4:42:46",
			"-5 Chile CL%sT 1947_4_22 -5",
			"-4 Chile CL%sT"
		],
		"America/Santo_Domingo": [
			"-4:39:36 - LMT 1890 -4:39:36",
			"-4:40 - SDMT 1933_3_1_12 -4:40",
			"-5 DR E%sT 1974_9_27 -5",
			"-4 - AST 2000_9_29_02 -4",
			"-5 US E%sT 2000_11_3_01 -5",
			"-4 - AST"
		],
		"America/Sao_Paulo": [
			"-3:6:28 - LMT 1914 -3:6:28",
			"-3 Brazil BR%sT 1963_9_23_00 -3",
			"-2 - BRST 1964 -2",
			"-3 Brazil BR%sT"
		],
		"America/Scoresbysund": [
			"-1:27:52 - LMT 1916_6_28 -1:27:52",
			"-2 - CGT 1980_3_6_2 -2",
			"-2 C-Eur CG%sT 1981_2_29 -2",
			"-1 EU EG%sT"
		],
		"America/Sitka": [
			"14:58:47 - LMT 1867_9_18 14:58:47",
			"-9:1:13 - LMT 1900_7_20_12 -9:1:13",
			"-8 - PST 1942 -8",
			"-8 US P%sT 1946 -8",
			"-8 - PST 1969 -8",
			"-8 US P%sT 1983_9_30_2 -7",
			"-9 US Y%sT 1983_10_30 -9",
			"-9 US AK%sT"
		],
		"America/St_Johns": [
			"-3:30:52 - LMT 1884 -3:30:52",
			"-3:30:52 StJohns N%sT 1918 -3:30:52",
			"-3:30:52 Canada N%sT 1919 -3:30:52",
			"-3:30:52 StJohns N%sT 1935_2_30 -3:30:52",
			"-3:30 StJohns N%sT 1942_4_11 -3:30",
			"-3:30 Canada N%sT 1946 -3:30",
			"-3:30 StJohns N%sT 2011_10 -2:30",
			"-3:30 Canada N%sT"
		],
		"America/St_Kitts": [
			"-4:10:52 - LMT 1912_2_2 -4:10:52",
			"-4 - AST"
		],
		"America/St_Lucia": [
			"-4:4 - LMT 1890 -4:4",
			"-4:4 - CMT 1912 -4:4",
			"-4 - AST"
		],
		"America/St_Thomas": [
			"-4:19:44 - LMT 1911_6 -4:19:44",
			"-4 - AST"
		],
		"America/St_Vincent": [
			"-4:4:56 - LMT 1890 -4:4:56",
			"-4:4:56 - KMT 1912 -4:4:56",
			"-4 - AST"
		],
		"America/Swift_Current": [
			"-7:11:20 - LMT 1905_8 -7:11:20",
			"-7 Canada M%sT 1946_3_28_2 -7",
			"-7 Regina M%sT 1950 -7",
			"-7 Swift M%sT 1972_3_30_2 -7",
			"-6 - CST"
		],
		"America/Tegucigalpa": [
			"-5:48:52 - LMT 1921_3 -5:48:52",
			"-6 Hond C%sT"
		],
		"America/Thule": [
			"-4:35:8 - LMT 1916_6_28 -4:35:8",
			"-4 Thule A%sT"
		],
		"America/Thunder_Bay": [
			"-5:57 - LMT 1895 -5:57",
			"-6 - CST 1910 -6",
			"-5 - EST 1942 -5",
			"-5 Canada E%sT 1970 -5",
			"-5 Mont E%sT 1973 -5",
			"-5 - EST 1974 -5",
			"-5 Canada E%sT"
		],
		"America/Tijuana": [
			"-7:48:4 - LMT 1922_0_1_0_11_56 -7:48:4",
			"-7 - MST 1924 -7",
			"-8 - PST 1927_5_10_23 -8",
			"-7 - MST 1930_10_15 -7",
			"-8 - PST 1931_3_1 -8",
			"-7 - PDT 1931_8_30 -7",
			"-8 - PST 1942_3_24 -8",
			"-7 - PWT 1945_7_14_23",
			"-7 - PPT 1945_10_12 -7",
			"-8 - PST 1948_3_5 -8",
			"-7 - PDT 1949_0_14 -7",
			"-8 - PST 1954 -8",
			"-8 CA P%sT 1961 -8",
			"-8 - PST 1976 -8",
			"-8 US P%sT 1996 -8",
			"-8 Mexico P%sT 2001 -8",
			"-8 US P%sT 2002_1_20 -8",
			"-8 Mexico P%sT 2010 -8",
			"-8 US P%sT"
		],
		"America/Toronto": [
			"-5:17:32 - LMT 1895 -5:17:32",
			"-5 Canada E%sT 1919 -5",
			"-5 Toronto E%sT 1942_1_9_2 -5",
			"-5 Canada E%sT 1946 -5",
			"-5 Toronto E%sT 1974 -5",
			"-5 Canada E%sT"
		],
		"America/Tortola": [
			"-4:18:28 - LMT 1911_6 -4:18:28",
			"-4 - AST"
		],
		"America/Vancouver": [
			"-8:12:28 - LMT 1884 -8:12:28",
			"-8 Vanc P%sT 1987 -8",
			"-8 Canada P%sT"
		],
		"America/Whitehorse": [
			"-9:0:12 - LMT 1900_7_20 -9:0:12",
			"-9 NT_YK Y%sT 1966_6_1_2 -9",
			"-8 NT_YK P%sT 1980 -8",
			"-8 Canada P%sT"
		],
		"America/Winnipeg": [
			"-6:28:36 - LMT 1887_6_16 -6:28:36",
			"-6 Winn C%sT 2006 -6",
			"-6 Canada C%sT"
		],
		"America/Yakutat": [
			"14:41:5 - LMT 1867_9_18 14:41:5",
			"-9:18:55 - LMT 1900_7_20_12 -9:18:55",
			"-9 - YST 1942 -9",
			"-9 US Y%sT 1946 -9",
			"-9 - YST 1969 -9",
			"-9 US Y%sT 1983_10_30 -9",
			"-9 US AK%sT"
		],
		"America/Yellowknife": [
			"0 - zzz 1935",
			"-7 NT_YK M%sT 1980 -7",
			"-7 Canada M%sT"
		],
		"Antarctica/Casey": [
			"0 - zzz 1969",
			"8 - WST 2009_9_18_2 8",
			"11 - CAST 2010_2_5_2 11",
			"8 - WST 2011_9_28_2 8",
			"11 - CAST 2012_1_21_17",
			"8 - WST"
		],
		"Antarctica/Davis": [
			"0 - zzz 1957_0_13",
			"7 - DAVT 1964_10 7",
			"0 - zzz 1969_1",
			"7 - DAVT 2009_9_18_2 7",
			"5 - DAVT 2010_2_10_20",
			"7 - DAVT 2011_9_28_2 7",
			"5 - DAVT 2012_1_21_20",
			"7 - DAVT"
		],
		"Antarctica/DumontDUrville": [
			"0 - zzz 1947",
			"10 - PMT 1952_0_14 10",
			"0 - zzz 1956_10",
			"10 - DDUT"
		],
		"Antarctica/Macquarie": [
			"0 - zzz 1899_10",
			"10 - EST 1916_9_1_2 10",
			"11 - EST 1917_1 11",
			"10 Aus EST 1919_3 10",
			"0 - zzz 1948_2_25",
			"10 Aus EST 1967 10",
			"10 AT EST 2010_3_4_3 11",
			"11 - MIST"
		],
		"Antarctica/Mawson": [
			"0 - zzz 1954_1_13",
			"6 - MAWT 2009_9_18_2 6",
			"5 - MAWT"
		],
		"Antarctica/McMurdo": [
			"0 - zzz 1956",
			"12 NZAQ NZ%sT"
		],
		"Antarctica/Palmer": [
			"0 - zzz 1965",
			"-4 ArgAQ AR%sT 1969_9_5 -4",
			"-3 ArgAQ AR%sT 1982_4 -3",
			"-4 ChileAQ CL%sT"
		],
		"Antarctica/Rothera": [
			"0 - zzz 1976_11_1",
			"-3 - ROTT"
		],
		"Antarctica/Syowa": [
			"0 - zzz 1957_0_29",
			"3 - SYOT"
		],
		"Antarctica/Vostok": [
			"0 - zzz 1957_11_16",
			"6 - VOST"
		],
		"Asia/Aden": [
			"2:59:54 - LMT 1950 2:59:54",
			"3 - AST"
		],
		"Asia/Almaty": [
			"5:7:48 - LMT 1924_4_2 5:7:48",
			"5 - ALMT 1930_5_21 5",
			"6 RussiaAsia ALM%sT 1991 6",
			"6 - ALMT 1992 6",
			"6 RussiaAsia ALM%sT 2005_2_15 6",
			"6 - ALMT"
		],
		"Asia/Amman": [
			"2:23:44 - LMT 1931 2:23:44",
			"2 Jordan EE%sT"
		],
		"Asia/Anadyr": [
			"11:49:56 - LMT 1924_4_2 11:49:56",
			"12 - ANAT 1930_5_21 12",
			"13 Russia ANA%sT 1982_3_1_0 13",
			"12 Russia ANA%sT 1991_2_31_2 12",
			"11 Russia ANA%sT 1992_0_19_2 11",
			"12 Russia ANA%sT 2010_2_28_2 12",
			"11 Russia ANA%sT 2011_2_27_2 11",
			"12 - ANAT"
		],
		"Asia/Aqtau": [
			"3:21:4 - LMT 1924_4_2 3:21:4",
			"4 - FORT 1930_5_21 4",
			"5 - FORT 1963 5",
			"5 - SHET 1981_9_1 5",
			"6 - SHET 1982_3_1 6",
			"5 RussiaAsia SHE%sT 1991 5",
			"5 - SHET 1991_11_16 5",
			"5 RussiaAsia AQT%sT 1995_2_26_2 5",
			"4 RussiaAsia AQT%sT 2005_2_15 4",
			"5 - AQTT"
		],
		"Asia/Aqtobe": [
			"3:48:40 - LMT 1924_4_2 3:48:40",
			"4 - AKTT 1930_5_21 4",
			"5 - AKTT 1981_3_1 5",
			"6 - AKTST 1981_9_1 6",
			"6 - AKTT 1982_3_1 6",
			"5 RussiaAsia AKT%sT 1991 5",
			"5 - AKTT 1991_11_16 5",
			"5 RussiaAsia AQT%sT 2005_2_15 5",
			"5 - AQTT"
		],
		"Asia/Ashgabat": [
			"3:53:32 - LMT 1924_4_2 3:53:32",
			"4 - ASHT 1930_5_21 4",
			"5 RussiaAsia ASH%sT 1991_2_31_2 5",
			"4 RussiaAsia ASH%sT 1991_9_27 4",
			"4 RussiaAsia TM%sT 1992_0_19_2 4",
			"5 - TMT"
		],
		"Asia/Baghdad": [
			"2:57:40 - LMT 1890 2:57:40",
			"2:57:36 - BMT 1918 2:57:36",
			"3 - AST 1982_4 3",
			"3 Iraq A%sT"
		],
		"Asia/Bahrain": [
			"3:22:20 - LMT 1920 3:22:20",
			"4 - GST 1972_5 4",
			"3 - AST"
		],
		"Asia/Baku": [
			"3:19:24 - LMT 1924_4_2 3:19:24",
			"3 - BAKT 1957_2 3",
			"4 RussiaAsia BAK%sT 1991_2_31_2 4",
			"4 - BAKST 1991_7_30 4",
			"3 RussiaAsia AZ%sT 1992_8_26_23 4",
			"4 - AZT 1996 4",
			"4 EUAsia AZ%sT 1997 4",
			"4 Azer AZ%sT"
		],
		"Asia/Bangkok": [
			"6:42:4 - LMT 1880 6:42:4",
			"6:42:4 - BMT 1920_3 6:42:4",
			"7 - ICT"
		],
		"Asia/Beirut": [
			"2:22 - LMT 1880 2:22",
			"2 Lebanon EE%sT"
		],
		"Asia/Bishkek": [
			"4:58:24 - LMT 1924_4_2 4:58:24",
			"5 - FRUT 1930_5_21 5",
			"6 RussiaAsia FRU%sT 1991_2_31_2 6",
			"6 - FRUST 1991_7_31_2 6",
			"5 Kyrgyz KG%sT 2005_7_12 6",
			"6 - KGT"
		],
		"Asia/Brunei": [
			"7:39:40 - LMT 1926_2 7:39:40",
			"7:30 - BNT 1933 7:30",
			"8 - BNT"
		],
		"Asia/Choibalsan": [
			"7:38 - LMT 1905_7 7:38",
			"7 - ULAT 1978 7",
			"8 - ULAT 1983_3 8",
			"9 Mongol CHO%sT 2008_2_31 9",
			"8 Mongol CHO%sT"
		],
		"Asia/Chongqing": [
			"7:6:20 - LMT 1928 7:6:20",
			"7 - LONT 1980_4 7",
			"8 PRC C%sT"
		],
		"Asia/Colombo": [
			"5:19:24 - LMT 1880 5:19:24",
			"5:19:32 - MMT 1906 5:19:32",
			"5:30 - IST 1942_0_5 5:30",
			"6 - IHST 1942_8 6",
			"6:30 - IST 1945_9_16_2 6:30",
			"5:30 - IST 1996_4_25_0 5:30",
			"6:30 - LKT 1996_9_26_0_30 6:30",
			"6 - LKT 2006_3_15_0_30 6",
			"5:30 - IST"
		],
		"Asia/Damascus": [
			"2:25:12 - LMT 1920 2:25:12",
			"2 Syria EE%sT"
		],
		"Asia/Dhaka": [
			"6:1:40 - LMT 1890 6:1:40",
			"5:53:20 - HMT 1941_9 5:53:20",
			"6:30 - BURT 1942_4_15 6:30",
			"5:30 - IST 1942_8 5:30",
			"6:30 - BURT 1951_8_30 6:30",
			"6 - DACT 1971_2_26 6",
			"6 - BDT 2009 6",
			"6 Dhaka BD%sT"
		],
		"Asia/Dili": [
			"8:22:20 - LMT 1912 8:22:20",
			"8 - TLT 1942_1_21_23 8",
			"9 - JST 1945_8_23 9",
			"9 - TLT 1976_4_3 9",
			"8 - CIT 2000_8_17_00 8",
			"9 - TLT"
		],
		"Asia/Dubai": [
			"3:41:12 - LMT 1920 3:41:12",
			"4 - GST"
		],
		"Asia/Dushanbe": [
			"4:35:12 - LMT 1924_4_2 4:35:12",
			"5 - DUST 1930_5_21 5",
			"6 RussiaAsia DUS%sT 1991_2_31_2 6",
			"6 - DUSST 1991_8_9_2 5",
			"5 - TJT"
		],
		"Asia/Gaza": [
			"2:17:52 - LMT 1900_9 2:17:52",
			"2 Zion EET 1948_4_15 2",
			"2 EgyptAsia EE%sT 1967_5_5 3",
			"2 Zion I%sT 1996 2",
			"2 Jordan EE%sT 1999 2",
			"2 Palestine EE%sT 2008_7_29_0 3",
			"2 - EET 2008_8 2",
			"2 Palestine EE%sT 2010 2",
			"2 - EET 2010_2_27_0_1 2",
			"2 Palestine EE%sT 2011_7_1 3",
			"2 - EET 2012 2",
			"2 Palestine EE%sT"
		],
		"Asia/Harbin": [
			"8:26:44 - LMT 1928 8:26:44",
			"8:30 - CHAT 1932_2 8:30",
			"8 - CST 1940 8",
			"9 - CHAT 1966_4 9",
			"8:30 - CHAT 1980_4 8:30",
			"8 PRC C%sT"
		],
		"Asia/Hebron": [
			"2:20:23 - LMT 1900_9 2:20:23",
			"2 Zion EET 1948_4_15 2",
			"2 EgyptAsia EE%sT 1967_5_5 3",
			"2 Zion I%sT 1996 2",
			"2 Jordan EE%sT 1999 2",
			"2 Palestine EE%sT"
		],
		"Asia/Ho_Chi_Minh": [
			"7:6:40 - LMT 1906_5_9 7:6:40",
			"7:6:20 - SMT 1911_2_11_0_1 7:6:20",
			"7 - ICT 1912_4 7",
			"8 - ICT 1931_4 8",
			"7 - ICT"
		],
		"Asia/Hong_Kong": [
			"7:36:42 - LMT 1904_9_30 7:36:42",
			"8 HK HK%sT 1941_11_25 8",
			"9 - JST 1945_8_15 9",
			"8 HK HK%sT"
		],
		"Asia/Hovd": [
			"6:6:36 - LMT 1905_7 6:6:36",
			"6 - HOVT 1978 6",
			"7 Mongol HOV%sT"
		],
		"Asia/Irkutsk": [
			"6:57:20 - LMT 1880 6:57:20",
			"6:57:20 - IMT 1920_0_25 6:57:20",
			"7 - IRKT 1930_5_21 7",
			"8 Russia IRK%sT 1991_2_31_2 8",
			"7 Russia IRK%sT 1992_0_19_2 7",
			"8 Russia IRK%sT 2011_2_27_2 8",
			"9 - IRKT"
		],
		"Asia/Jakarta": [
			"7:7:12 - LMT 1867_7_10 7:7:12",
			"7:7:12 - JMT 1923_11_31_23_47_12 7:7:12",
			"7:20 - JAVT 1932_10 7:20",
			"7:30 - WIT 1942_2_23 7:30",
			"9 - JST 1945_8_23 9",
			"7:30 - WIT 1948_4 7:30",
			"8 - WIT 1950_4 8",
			"7:30 - WIT 1964 7:30",
			"7 - WIT"
		],
		"Asia/Jayapura": [
			"9:22:48 - LMT 1932_10 9:22:48",
			"9 - EIT 1944_8_1 9",
			"9:30 - CST 1964 9:30",
			"9 - EIT"
		],
		"Asia/Jerusalem": [
			"2:20:56 - LMT 1880 2:20:56",
			"2:20:40 - JMT 1918 2:20:40",
			"2 Zion I%sT"
		],
		"Asia/Kabul": [
			"4:36:48 - LMT 1890 4:36:48",
			"4 - AFT 1945 4",
			"4:30 - AFT"
		],
		"Asia/Kamchatka": [
			"10:34:36 - LMT 1922_10_10 10:34:36",
			"11 - PETT 1930_5_21 11",
			"12 Russia PET%sT 1991_2_31_2 12",
			"11 Russia PET%sT 1992_0_19_2 11",
			"12 Russia PET%sT 2010_2_28_2 12",
			"11 Russia PET%sT 2011_2_27_2 11",
			"12 - PETT"
		],
		"Asia/Karachi": [
			"4:28:12 - LMT 1907 4:28:12",
			"5:30 - IST 1942_8 5:30",
			"6:30 - IST 1945_9_15 6:30",
			"5:30 - IST 1951_8_30 5:30",
			"5 - KART 1971_2_26 5",
			"5 Pakistan PK%sT"
		],
		"Asia/Kashgar": [
			"5:3:56 - LMT 1928 5:3:56",
			"5:30 - KAST 1940 5:30",
			"5 - KAST 1980_4 5",
			"8 PRC C%sT"
		],
		"Asia/Kathmandu": [
			"5:41:16 - LMT 1920 5:41:16",
			"5:30 - IST 1986 5:30",
			"5:45 - NPT"
		],
		"Asia/Khandyga": [
			"9:2:13 - LMT 1919_11_15 9:2:13",
			"8 - YAKT 1930_5_21 8",
			"9 Russia YAK%sT 1991_2_31_2 9",
			"8 Russia YAK%sT 1992_0_19_2 8",
			"9 Russia YAK%sT 2004 9",
			"10 Russia VLA%sT 2011_2_27_2 10",
			"11 - VLAT 2011_8_13_0 11",
			"10 - YAKT"
		],
		"Asia/Kolkata": [
			"5:53:28 - LMT 1880 5:53:28",
			"5:53:20 - HMT 1941_9 5:53:20",
			"6:30 - BURT 1942_4_15 6:30",
			"5:30 - IST 1942_8 5:30",
			"6:30 - IST 1945_9_15 6:30",
			"5:30 - IST"
		],
		"Asia/Krasnoyarsk": [
			"6:11:20 - LMT 1920_0_6 6:11:20",
			"6 - KRAT 1930_5_21 6",
			"7 Russia KRA%sT 1991_2_31_2 7",
			"6 Russia KRA%sT 1992_0_19_2 6",
			"7 Russia KRA%sT 2011_2_27_2 7",
			"8 - KRAT"
		],
		"Asia/Kuala_Lumpur": [
			"6:46:46 - LMT 1901_0_1 6:46:46",
			"6:55:25 - SMT 1905_5_1 6:55:25",
			"7 - MALT 1933_0_1 7",
			"7:20 - MALST 1936_0_1 7:20",
			"7:20 - MALT 1941_8_1 7:20",
			"7:30 - MALT 1942_1_16 7:30",
			"9 - JST 1945_8_12 9",
			"7:30 - MALT 1982_0_1 7:30",
			"8 - MYT"
		],
		"Asia/Kuching": [
			"7:21:20 - LMT 1926_2 7:21:20",
			"7:30 - BORT 1933 7:30",
			"8 NBorneo BOR%sT 1942_1_16 8",
			"9 - JST 1945_8_12 9",
			"8 - BORT 1982_0_1 8",
			"8 - MYT"
		],
		"Asia/Kuwait": [
			"3:11:56 - LMT 1950 3:11:56",
			"3 - AST"
		],
		"Asia/Macau": [
			"7:34:20 - LMT 1912 7:34:20",
			"8 Macau MO%sT 1999_11_20 8",
			"8 PRC C%sT"
		],
		"Asia/Magadan": [
			"10:3:12 - LMT 1924_4_2 10:3:12",
			"10 - MAGT 1930_5_21 10",
			"11 Russia MAG%sT 1991_2_31_2 11",
			"10 Russia MAG%sT 1992_0_19_2 10",
			"11 Russia MAG%sT 2011_2_27_2 11",
			"12 - MAGT"
		],
		"Asia/Makassar": [
			"7:57:36 - LMT 1920 7:57:36",
			"7:57:36 - MMT 1932_10 7:57:36",
			"8 - CIT 1942_1_9 8",
			"9 - JST 1945_8_23 9",
			"8 - CIT"
		],
		"Asia/Manila": [
			"-15:56 - LMT 1844_11_31 -15:56",
			"8:4 - LMT 1899_4_11 8:4",
			"8 Phil PH%sT 1942_4 8",
			"9 - JST 1944_10 9",
			"8 Phil PH%sT"
		],
		"Asia/Muscat": [
			"3:54:24 - LMT 1920 3:54:24",
			"4 - GST"
		],
		"Asia/Nicosia": [
			"2:13:28 - LMT 1921_10_14 2:13:28",
			"2 Cyprus EE%sT 1998_8 3",
			"2 EUAsia EE%sT"
		],
		"Asia/Novokuznetsk": [
			"5:48:48 - NMT 1920_0_6 5:48:48",
			"6 - KRAT 1930_5_21 6",
			"7 Russia KRA%sT 1991_2_31_2 7",
			"6 Russia KRA%sT 1992_0_19_2 6",
			"7 Russia KRA%sT 2010_2_28_2 7",
			"6 Russia NOV%sT 2011_2_27_2 6",
			"7 - NOVT"
		],
		"Asia/Novosibirsk": [
			"5:31:40 - LMT 1919_11_14_6 5:31:40",
			"6 - NOVT 1930_5_21 6",
			"7 Russia NOV%sT 1991_2_31_2 7",
			"6 Russia NOV%sT 1992_0_19_2 6",
			"7 Russia NOV%sT 1993_4_23 8",
			"6 Russia NOV%sT 2011_2_27_2 6",
			"7 - NOVT"
		],
		"Asia/Omsk": [
			"4:53:36 - LMT 1919_10_14 4:53:36",
			"5 - OMST 1930_5_21 5",
			"6 Russia OMS%sT 1991_2_31_2 6",
			"5 Russia OMS%sT 1992_0_19_2 5",
			"6 Russia OMS%sT 2011_2_27_2 6",
			"7 - OMST"
		],
		"Asia/Oral": [
			"3:25:24 - LMT 1924_4_2 3:25:24",
			"4 - URAT 1930_5_21 4",
			"5 - URAT 1981_3_1 5",
			"6 - URAST 1981_9_1 6",
			"6 - URAT 1982_3_1 6",
			"5 RussiaAsia URA%sT 1989_2_26_2 5",
			"4 RussiaAsia URA%sT 1991 4",
			"4 - URAT 1991_11_16 4",
			"4 RussiaAsia ORA%sT 2005_2_15 4",
			"5 - ORAT"
		],
		"Asia/Phnom_Penh": [
			"6:59:40 - LMT 1906_5_9 6:59:40",
			"7:6:20 - SMT 1911_2_11_0_1 7:6:20",
			"7 - ICT 1912_4 7",
			"8 - ICT 1931_4 8",
			"7 - ICT"
		],
		"Asia/Pontianak": [
			"7:17:20 - LMT 1908_4 7:17:20",
			"7:17:20 - PMT 1932_10 7:17:20",
			"7:30 - WIT 1942_0_29 7:30",
			"9 - JST 1945_8_23 9",
			"7:30 - WIT 1948_4 7:30",
			"8 - WIT 1950_4 8",
			"7:30 - WIT 1964 7:30",
			"8 - CIT 1988_0_1 8",
			"7 - WIT"
		],
		"Asia/Pyongyang": [
			"8:23 - LMT 1890 8:23",
			"8:30 - KST 1904_11 8:30",
			"9 - KST 1928 9",
			"8:30 - KST 1932 8:30",
			"9 - KST 1954_2_21 9",
			"8 - KST 1961_7_10 8",
			"9 - KST"
		],
		"Asia/Qatar": [
			"3:26:8 - LMT 1920 3:26:8",
			"4 - GST 1972_5 4",
			"3 - AST"
		],
		"Asia/Qyzylorda": [
			"4:21:52 - LMT 1924_4_2 4:21:52",
			"4 - KIZT 1930_5_21 4",
			"5 - KIZT 1981_3_1 5",
			"6 - KIZST 1981_9_1 6",
			"6 - KIZT 1982_3_1 6",
			"5 RussiaAsia KIZ%sT 1991 5",
			"5 - KIZT 1991_11_16 5",
			"5 - QYZT 1992_0_19_2 5",
			"6 RussiaAsia QYZ%sT 2005_2_15 6",
			"6 - QYZT"
		],
		"Asia/Rangoon": [
			"6:24:40 - LMT 1880 6:24:40",
			"6:24:40 - RMT 1920 6:24:40",
			"6:30 - BURT 1942_4 6:30",
			"9 - JST 1945_4_3 9",
			"6:30 - MMT"
		],
		"Asia/Riyadh": [
			"3:6:52 - LMT 1950 3:6:52",
			"3 - AST"
		],
		"Asia/Sakhalin": [
			"9:30:48 - LMT 1905_7_23 9:30:48",
			"9 - CJT 1938 9",
			"9 - JST 1945_7_25 9",
			"11 Russia SAK%sT 1991_2_31_2 11",
			"10 Russia SAK%sT 1992_0_19_2 10",
			"11 Russia SAK%sT 1997_2_30_2 11",
			"10 Russia SAK%sT 2011_2_27_2 10",
			"11 - SAKT"
		],
		"Asia/Samarkand": [
			"4:27:12 - LMT 1924_4_2 4:27:12",
			"4 - SAMT 1930_5_21 4",
			"5 - SAMT 1981_3_1 5",
			"6 - SAMST 1981_9_1 6",
			"6 - TAST 1982_3_1 6",
			"5 RussiaAsia SAM%sT 1991_8_1 6",
			"5 RussiaAsia UZ%sT 1992 5",
			"5 - UZT"
		],
		"Asia/Seoul": [
			"8:27:52 - LMT 1890 8:27:52",
			"8:30 - KST 1904_11 8:30",
			"9 - KST 1928 9",
			"8:30 - KST 1932 8:30",
			"9 - KST 1954_2_21 9",
			"8 ROK K%sT 1961_7_10 8",
			"8:30 - KST 1968_9 8:30",
			"9 ROK K%sT"
		],
		"Asia/Shanghai": [
			"8:5:57 - LMT 1928 8:5:57",
			"8 Shang C%sT 1949 8",
			"8 PRC C%sT"
		],
		"Asia/Singapore": [
			"6:55:25 - LMT 1901_0_1 6:55:25",
			"6:55:25 - SMT 1905_5_1 6:55:25",
			"7 - MALT 1933_0_1 7",
			"7:20 - MALST 1936_0_1 7:20",
			"7:20 - MALT 1941_8_1 7:20",
			"7:30 - MALT 1942_1_16 7:30",
			"9 - JST 1945_8_12 9",
			"7:30 - MALT 1965_7_9 7:30",
			"7:30 - SGT 1982_0_1 7:30",
			"8 - SGT"
		],
		"Asia/Taipei": [
			"8:6 - LMT 1896 8:6",
			"8 Taiwan C%sT"
		],
		"Asia/Tashkent": [
			"4:37:12 - LMT 1924_4_2 4:37:12",
			"5 - TAST 1930_5_21 5",
			"6 RussiaAsia TAS%sT 1991_2_31_2 6",
			"5 RussiaAsia TAS%sT 1991_8_1 6",
			"5 RussiaAsia UZ%sT 1992 5",
			"5 - UZT"
		],
		"Asia/Tbilisi": [
			"2:59:16 - LMT 1880 2:59:16",
			"2:59:16 - TBMT 1924_4_2 2:59:16",
			"3 - TBIT 1957_2 3",
			"4 RussiaAsia TBI%sT 1991_2_31_2 4",
			"4 - TBIST 1991_3_9 4",
			"3 RussiaAsia GE%sT 1992 3",
			"3 E-EurAsia GE%sT 1994_8_25 4",
			"4 E-EurAsia GE%sT 1996_9_27 5",
			"5 - GEST 1997_2_30 5",
			"4 E-EurAsia GE%sT 2004_5_27 5",
			"3 RussiaAsia GE%sT 2005_2_27_2 3",
			"4 - GET"
		],
		"Asia/Tehran": [
			"3:25:44 - LMT 1916 3:25:44",
			"3:25:44 - TMT 1946 3:25:44",
			"3:30 - IRST 1977_10 3:30",
			"4 Iran IR%sT 1979 4",
			"3:30 Iran IR%sT"
		],
		"Asia/Thimphu": [
			"5:58:36 - LMT 1947_7_15 5:58:36",
			"5:30 - IST 1987_9 5:30",
			"6 - BTT"
		],
		"Asia/Tokyo": [
			"9:18:59 - LMT 1887_11_31_15",
			"9 - JST 1896 9",
			"9 - CJT 1938 9",
			"9 Japan J%sT"
		],
		"Asia/Ulaanbaatar": [
			"7:7:32 - LMT 1905_7 7:7:32",
			"7 - ULAT 1978 7",
			"8 Mongol ULA%sT"
		],
		"Asia/Urumqi": [
			"5:50:20 - LMT 1928 5:50:20",
			"6 - URUT 1980_4 6",
			"8 PRC C%sT"
		],
		"Asia/Ust-Nera": [
			"9:32:54 - LMT 1919_11_15 9:32:54",
			"8 - YAKT 1930_5_21 8",
			"9 Russia YAKT 1981_3_1 9",
			"11 Russia MAG%sT 1991_2_31_2 11",
			"10 Russia MAG%sT 1992_0_19_2 10",
			"11 Russia MAG%sT 2011_2_27_2 11",
			"12 - MAGT 2011_8_13_0 12",
			"11 - VLAT"
		],
		"Asia/Vientiane": [
			"6:50:24 - LMT 1906_5_9 6:50:24",
			"7:6:20 - SMT 1911_2_11_0_1 7:6:20",
			"7 - ICT 1912_4 7",
			"8 - ICT 1931_4 8",
			"7 - ICT"
		],
		"Asia/Vladivostok": [
			"8:47:44 - LMT 1922_10_15 8:47:44",
			"9 - VLAT 1930_5_21 9",
			"10 Russia VLA%sT 1991_2_31_2 10",
			"9 Russia VLA%sST 1992_0_19_2 9",
			"10 Russia VLA%sT 2011_2_27_2 10",
			"11 - VLAT"
		],
		"Asia/Yakutsk": [
			"8:38:40 - LMT 1919_11_15 8:38:40",
			"8 - YAKT 1930_5_21 8",
			"9 Russia YAK%sT 1991_2_31_2 9",
			"8 Russia YAK%sT 1992_0_19_2 8",
			"9 Russia YAK%sT 2011_2_27_2 9",
			"10 - YAKT"
		],
		"Asia/Yekaterinburg": [
			"4:2:24 - LMT 1919_6_15_4 4:2:24",
			"4 - SVET 1930_5_21 4",
			"5 Russia SVE%sT 1991_2_31_2 5",
			"4 Russia SVE%sT 1992_0_19_2 4",
			"5 Russia YEK%sT 2011_2_27_2 5",
			"6 - YEKT"
		],
		"Asia/Yerevan": [
			"2:58 - LMT 1924_4_2 2:58",
			"3 - YERT 1957_2 3",
			"4 RussiaAsia YER%sT 1991_2_31_2 4",
			"4 - YERST 1991_8_23 4",
			"3 RussiaAsia AM%sT 1995_8_24_2 3",
			"4 - AMT 1997 4",
			"4 RussiaAsia AM%sT 2012_2_25_2 4",
			"4 - AMT"
		],
		"Atlantic/Azores": [
			"-1:42:40 - LMT 1884 -1:42:40",
			"-1:54:32 - HMT 1911_4_24 -1:54:32",
			"-2 Port AZO%sT 1966_3_3_2 -2",
			"-1 Port AZO%sT 1983_8_25_1 -1",
			"-1 W-Eur AZO%sT 1992_8_27_1 -1",
			"0 EU WE%sT 1993_2_28_1",
			"-1 EU AZO%sT"
		],
		"Atlantic/Bermuda": [
			"-4:19:18 - LMT 1930_0_1_2 -4:19:18",
			"-4 - AST 1974_3_28_2 -4",
			"-4 Bahamas A%sT 1976 -4",
			"-4 US A%sT"
		],
		"Atlantic/Canary": [
			"-1:1:36 - LMT 1922_2 -1:1:36",
			"-1 - CANT 1946_8_30_1 -1",
			"0 - WET 1980_3_6_0",
			"1 - WEST 1980_8_28_0",
			"0 EU WE%sT"
		],
		"Atlantic/Cape_Verde": [
			"-1:34:4 - LMT 1907 -1:34:4",
			"-2 - CVT 1942_8 -2",
			"-1 - CVST 1945_9_15 -1",
			"-2 - CVT 1975_10_25_2 -2",
			"-1 - CVT"
		],
		"Atlantic/Faroe": [
			"-0:27:4 - LMT 1908_0_11 -0:27:4",
			"0 - WET 1981",
			"0 EU WE%sT"
		],
		"Atlantic/Madeira": [
			"-1:7:36 - LMT 1884 -1:7:36",
			"-1:7:36 - FMT 1911_4_24 -1:7:36",
			"-1 Port MAD%sT 1966_3_3_2 -1",
			"0 Port WE%sT 1983_8_25_1",
			"0 EU WE%sT"
		],
		"Atlantic/Reykjavik": [
			"-1:27:24 - LMT 1837 -1:27:24",
			"-1:27:48 - RMT 1908 -1:27:48",
			"-1 Iceland IS%sT 1968_3_7_1 -1",
			"0 - GMT"
		],
		"Atlantic/South_Georgia": [
			"-2:26:8 - LMT 1890 -2:26:8",
			"-2 - GST"
		],
		"Atlantic/St_Helena": [
			"-0:22:48 - LMT 1890 -0:22:48",
			"-0:22:48 - JMT 1951 -0:22:48",
			"0 - GMT"
		],
		"Atlantic/Stanley": [
			"-3:51:24 - LMT 1890 -3:51:24",
			"-3:51:24 - SMT 1912_2_12 -3:51:24",
			"-4 Falk FK%sT 1983_4 -4",
			"-3 Falk FK%sT 1985_8_15 -3",
			"-4 Falk FK%sT 2010_8_5_02 -4",
			"-3 - FKST"
		],
		"Australia/Adelaide": [
			"9:14:20 - LMT 1895_1 9:14:20",
			"9 - CST 1899_4 9",
			"9:30 Aus CST 1971 9:30",
			"9:30 AS CST"
		],
		"Australia/Brisbane": [
			"10:12:8 - LMT 1895 10:12:8",
			"10 Aus EST 1971 10",
			"10 AQ EST"
		],
		"Australia/Broken_Hill": [
			"9:25:48 - LMT 1895_1 9:25:48",
			"10 - EST 1896_7_23 10",
			"9 - CST 1899_4 9",
			"9:30 Aus CST 1971 9:30",
			"9:30 AN CST 2000 10:30",
			"9:30 AS CST"
		],
		"Australia/Currie": [
			"9:35:28 - LMT 1895_8 9:35:28",
			"10 - EST 1916_9_1_2 10",
			"11 - EST 1917_1 11",
			"10 Aus EST 1971_6 10",
			"10 AT EST"
		],
		"Australia/Darwin": [
			"8:43:20 - LMT 1895_1 8:43:20",
			"9 - CST 1899_4 9",
			"9:30 Aus CST"
		],
		"Australia/Eucla": [
			"8:35:28 - LMT 1895_11 8:35:28",
			"8:45 Aus CWST 1943_6 8:45",
			"8:45 AW CWST"
		],
		"Australia/Hobart": [
			"9:49:16 - LMT 1895_8 9:49:16",
			"10 - EST 1916_9_1_2 10",
			"11 - EST 1917_1 11",
			"10 Aus EST 1967 10",
			"10 AT EST"
		],
		"Australia/Lindeman": [
			"9:55:56 - LMT 1895 9:55:56",
			"10 Aus EST 1971 10",
			"10 AQ EST 1992_6 10",
			"10 Holiday EST"
		],
		"Australia/Lord_Howe": [
			"10:36:20 - LMT 1895_1 10:36:20",
			"10 - EST 1981_2 10",
			"10:30 LH LHST"
		],
		"Australia/Melbourne": [
			"9:39:52 - LMT 1895_1 9:39:52",
			"10 Aus EST 1971 10",
			"10 AV EST"
		],
		"Australia/Perth": [
			"7:43:24 - LMT 1895_11 7:43:24",
			"8 Aus WST 1943_6 8",
			"8 AW WST"
		],
		"Australia/Sydney": [
			"10:4:52 - LMT 1895_1 10:4:52",
			"10 Aus EST 1971 10",
			"10 AN EST"
		],
		"CET": [
			"1 C-Eur CE%sT"
		],
		"CST6CDT": [
			"-6 US C%sT"
		],
		"EET": [
			"2 EU EE%sT"
		],
		"EST": [
			"-5 - EST"
		],
		"EST5EDT": [
			"-5 US E%sT"
		],
		"Etc/GMT": [
			"0 - GMT"
		],
		"Etc/GMT+1": [
			"-1 - GMT+1"
		],
		"Etc/GMT+10": [
			"-10 - GMT+10"
		],
		"Etc/GMT+11": [
			"-11 - GMT+11"
		],
		"Etc/GMT+12": [
			"-12 - GMT+12"
		],
		"Etc/GMT+2": [
			"-2 - GMT+2"
		],
		"Etc/GMT+3": [
			"-3 - GMT+3"
		],
		"Etc/GMT+4": [
			"-4 - GMT+4"
		],
		"Etc/GMT+5": [
			"-5 - GMT+5"
		],
		"Etc/GMT+6": [
			"-6 - GMT+6"
		],
		"Etc/GMT+7": [
			"-7 - GMT+7"
		],
		"Etc/GMT+8": [
			"-8 - GMT+8"
		],
		"Etc/GMT+9": [
			"-9 - GMT+9"
		],
		"Etc/GMT-1": [
			"1 - GMT-1"
		],
		"Etc/GMT-10": [
			"10 - GMT-10"
		],
		"Etc/GMT-11": [
			"11 - GMT-11"
		],
		"Etc/GMT-12": [
			"12 - GMT-12"
		],
		"Etc/GMT-13": [
			"13 - GMT-13"
		],
		"Etc/GMT-14": [
			"14 - GMT-14"
		],
		"Etc/GMT-2": [
			"2 - GMT-2"
		],
		"Etc/GMT-3": [
			"3 - GMT-3"
		],
		"Etc/GMT-4": [
			"4 - GMT-4"
		],
		"Etc/GMT-5": [
			"5 - GMT-5"
		],
		"Etc/GMT-6": [
			"6 - GMT-6"
		],
		"Etc/GMT-7": [
			"7 - GMT-7"
		],
		"Etc/GMT-8": [
			"8 - GMT-8"
		],
		"Etc/GMT-9": [
			"9 - GMT-9"
		],
		"Etc/UCT": [
			"0 - UCT"
		],
		"Etc/UTC": [
			"0 - UTC"
		],
		"Europe/Amsterdam": [
			"0:19:32 - LMT 1835 0:19:32",
			"0:19:32 Neth %s 1937_6_1 1:19:32",
			"0:20 Neth NE%sT 1940_4_16_0 0:20",
			"1 C-Eur CE%sT 1945_3_2_2 1",
			"1 Neth CE%sT 1977 1",
			"1 EU CE%sT"
		],
		"Europe/Andorra": [
			"0:6:4 - LMT 1901 0:6:4",
			"0 - WET 1946_8_30",
			"1 - CET 1985_2_31_2 1",
			"1 EU CE%sT"
		],
		"Europe/Athens": [
			"1:34:52 - LMT 1895_8_14 1:34:52",
			"1:34:52 - AMT 1916_6_28_0_1 1:34:52",
			"2 Greece EE%sT 1941_3_30 3",
			"1 Greece CE%sT 1944_3_4 1",
			"2 Greece EE%sT 1981 2",
			"2 EU EE%sT"
		],
		"Europe/Belgrade": [
			"1:22 - LMT 1884 1:22",
			"1 - CET 1941_3_18_23 1",
			"1 C-Eur CE%sT 1945 1",
			"1 - CET 1945_4_8_2 1",
			"2 - CEST 1945_8_16_2 1",
			"1 - CET 1982_10_27 1",
			"1 EU CE%sT"
		],
		"Europe/Berlin": [
			"0:53:28 - LMT 1893_3 0:53:28",
			"1 C-Eur CE%sT 1945_4_24_2 2",
			"1 SovietZone CE%sT 1946 1",
			"1 Germany CE%sT 1980 1",
			"1 EU CE%sT"
		],
		"Europe/Brussels": [
			"0:17:30 - LMT 1880 0:17:30",
			"0:17:30 - BMT 1892_4_1_12 0:17:30",
			"0 - WET 1914_10_8",
			"1 - CET 1916_4_1_0 1",
			"1 C-Eur CE%sT 1918_10_11_11",
			"0 Belgium WE%sT 1940_4_20_2",
			"1 C-Eur CE%sT 1944_8_3 2",
			"1 Belgium CE%sT 1977 1",
			"1 EU CE%sT"
		],
		"Europe/Bucharest": [
			"1:44:24 - LMT 1891_9 1:44:24",
			"1:44:24 - BMT 1931_6_24 1:44:24",
			"2 Romania EE%sT 1981_2_29_2 2",
			"2 C-Eur EE%sT 1991 2",
			"2 Romania EE%sT 1994 2",
			"2 E-Eur EE%sT 1997 2",
			"2 EU EE%sT"
		],
		"Europe/Budapest": [
			"1:16:20 - LMT 1890_9 1:16:20",
			"1 C-Eur CE%sT 1918 1",
			"1 Hungary CE%sT 1941_3_6_2 1",
			"1 C-Eur CE%sT 1945 1",
			"1 Hungary CE%sT 1980_8_28_2 1",
			"1 EU CE%sT"
		],
		"Europe/Chisinau": [
			"1:55:20 - LMT 1880 1:55:20",
			"1:55 - CMT 1918_1_15 1:55",
			"1:44:24 - BMT 1931_6_24 1:44:24",
			"2 Romania EE%sT 1940_7_15 2",
			"3 - EEST 1941_6_17 3",
			"1 C-Eur CE%sT 1944_7_24 2",
			"3 Russia MSK/MSD 1990 3",
			"3 - MSK 1990_4_6 3",
			"2 - EET 1991 2",
			"2 Russia EE%sT 1992 2",
			"2 E-Eur EE%sT 1997 2",
			"2 EU EE%sT"
		],
		"Europe/Copenhagen": [
			"0:50:20 - LMT 1890 0:50:20",
			"0:50:20 - CMT 1894_0_1 0:50:20",
			"1 Denmark CE%sT 1942_10_2_2 1",
			"1 C-Eur CE%sT 1945_3_2_2 1",
			"1 Denmark CE%sT 1980 1",
			"1 EU CE%sT"
		],
		"Europe/Dublin": [
			"-0:25 - LMT 1880_7_2 -0:25",
			"-0:25:21 - DMT 1916_4_21_2 -0:25:21",
			"0:34:39 - IST 1916_9_1_2 -0:25:21",
			"0 GB-Eire %s 1921_11_6",
			"0 GB-Eire GMT/IST 1940_1_25_2",
			"1 - IST 1946_9_6_2 1",
			"0 - GMT 1947_2_16_2",
			"1 - IST 1947_10_2_2 1",
			"0 - GMT 1948_3_18_2",
			"0 GB-Eire GMT/IST 1968_9_27 1",
			"1 - IST 1971_9_31_2",
			"0 GB-Eire GMT/IST 1996",
			"0 EU GMT/IST"
		],
		"Europe/Gibraltar": [
			"-0:21:24 - LMT 1880_7_2_0 -0:21:24",
			"0 GB-Eire %s 1957_3_14_2",
			"1 - CET 1982 1",
			"1 EU CE%sT"
		],
		"Europe/Helsinki": [
			"1:39:52 - LMT 1878_4_31 1:39:52",
			"1:39:52 - HMT 1921_4 1:39:52",
			"2 Finland EE%sT 1983 2",
			"2 EU EE%sT"
		],
		"Europe/Istanbul": [
			"1:55:52 - LMT 1880 1:55:52",
			"1:56:56 - IMT 1910_9 1:56:56",
			"2 Turkey EE%sT 1978_9_15 3",
			"3 Turkey TR%sT 1985_3_20 3",
			"2 Turkey EE%sT 2007 2",
			"2 EU EE%sT 2011_2_27_1",
			"2 - EET 2011_2_28_1",
			"2 EU EE%sT"
		],
		"Europe/Kaliningrad": [
			"1:22 - LMT 1893_3 1:22",
			"1 C-Eur CE%sT 1945 1",
			"2 Poland CE%sT 1946 2",
			"3 Russia MSK/MSD 1991_2_31_2 3",
			"2 Russia EE%sT 2011_2_27_2 2",
			"3 - FET"
		],
		"Europe/Kiev": [
			"2:2:4 - LMT 1880 2:2:4",
			"2:2:4 - KMT 1924_4_2 2:2:4",
			"2 - EET 1930_5_21 2",
			"3 - MSK 1941_8_20 3",
			"1 C-Eur CE%sT 1943_10_6 1",
			"3 Russia MSK/MSD 1990 3",
			"3 - MSK 1990_6_1_2 3",
			"2 - EET 1992 2",
			"2 E-Eur EE%sT 1995 2",
			"2 EU EE%sT"
		],
		"Europe/Lisbon": [
			"-0:36:32 - LMT 1884 -0:36:32",
			"-0:36:32 - LMT 1912_0_1 -0:36:32",
			"0 Port WE%sT 1966_3_3_2",
			"1 - CET 1976_8_26_1 1",
			"0 Port WE%sT 1983_8_25_1",
			"0 W-Eur WE%sT 1992_8_27_1",
			"1 EU CE%sT 1996_2_31_1",
			"0 EU WE%sT"
		],
		"Europe/London": [
			"-0:1:15 - LMT 1847_11_1_0 -0:1:15",
			"0 GB-Eire %s 1968_9_27 1",
			"1 - BST 1971_9_31_2",
			"0 GB-Eire %s 1996",
			"0 EU GMT/BST"
		],
		"Europe/Luxembourg": [
			"0:24:36 - LMT 1904_5 0:24:36",
			"1 Lux CE%sT 1918_10_25 1",
			"0 Lux WE%sT 1929_9_6_2",
			"0 Belgium WE%sT 1940_4_14_3 1",
			"1 C-Eur WE%sT 1944_8_18_3 2",
			"1 Belgium CE%sT 1977 1",
			"1 EU CE%sT"
		],
		"Europe/Madrid": [
			"-0:14:44 - LMT 1901_0_1_0 -0:14:44",
			"0 Spain WE%sT 1946_8_30 2",
			"1 Spain CE%sT 1979 1",
			"1 EU CE%sT"
		],
		"Europe/Malta": [
			"0:58:4 - LMT 1893_10_2_0 0:58:4",
			"1 Italy CE%sT 1942_10_2_2 1",
			"1 C-Eur CE%sT 1945_3_2_2 1",
			"1 Italy CE%sT 1973_2_31 1",
			"1 Malta CE%sT 1981 1",
			"1 EU CE%sT"
		],
		"Europe/Minsk": [
			"1:50:16 - LMT 1880 1:50:16",
			"1:50 - MMT 1924_4_2 1:50",
			"2 - EET 1930_5_21 2",
			"3 - MSK 1941_5_28 3",
			"1 C-Eur CE%sT 1944_6_3 2",
			"3 Russia MSK/MSD 1990 3",
			"3 - MSK 1991_2_31_2 3",
			"3 - EEST 1991_8_29_2 2",
			"2 - EET 1992_2_29_0 2",
			"3 - EEST 1992_8_27_0 2",
			"2 Russia EE%sT 2011_2_27_2 2",
			"3 - FET"
		],
		"Europe/Monaco": [
			"0:29:32 - LMT 1891_2_15 0:29:32",
			"0:9:21 - PMT 1911_2_11 0:9:21",
			"0 France WE%sT 1945_8_16_3 2",
			"1 France CE%sT 1977 1",
			"1 EU CE%sT"
		],
		"Europe/Moscow": [
			"2:30:20 - LMT 1880 2:30:20",
			"2:30 - MMT 1916_6_3 2:30",
			"2:30:48 Russia %s 1919_6_1_2 4:30:48",
			"3 Russia MSK/MSD 1922_9 3",
			"2 - EET 1930_5_21 2",
			"3 Russia MSK/MSD 1991_2_31_2 3",
			"2 Russia EE%sT 1992_0_19_2 2",
			"3 Russia MSK/MSD 2011_2_27_2 3",
			"4 - MSK"
		],
		"Europe/Oslo": [
			"0:43 - LMT 1895_0_1 0:43",
			"1 Norway CE%sT 1940_7_10_23 1",
			"1 C-Eur CE%sT 1945_3_2_2 1",
			"1 Norway CE%sT 1980 1",
			"1 EU CE%sT"
		],
		"Europe/Paris": [
			"0:9:21 - LMT 1891_2_15_0_1 0:9:21",
			"0:9:21 - PMT 1911_2_11_0_1 0:9:21",
			"0 France WE%sT 1940_5_14_23 1",
			"1 C-Eur CE%sT 1944_7_25 2",
			"0 France WE%sT 1945_8_16_3 2",
			"1 France CE%sT 1977 1",
			"1 EU CE%sT"
		],
		"Europe/Prague": [
			"0:57:44 - LMT 1850 0:57:44",
			"0:57:44 - PMT 1891_9 0:57:44",
			"1 C-Eur CE%sT 1944_8_17_2 1",
			"1 Czech CE%sT 1979 1",
			"1 EU CE%sT"
		],
		"Europe/Riga": [
			"1:36:24 - LMT 1880 1:36:24",
			"1:36:24 - RMT 1918_3_15_2 1:36:24",
			"2:36:24 - LST 1918_8_16_3 2:36:24",
			"1:36:24 - RMT 1919_3_1_2 1:36:24",
			"2:36:24 - LST 1919_4_22_3 2:36:24",
			"1:36:24 - RMT 1926_4_11 1:36:24",
			"2 - EET 1940_7_5 2",
			"3 - MSK 1941_6 3",
			"1 C-Eur CE%sT 1944_9_13 1",
			"3 Russia MSK/MSD 1989_2_26_2 3",
			"3 - EEST 1989_8_24_2 2",
			"2 Latvia EE%sT 1997_0_21 2",
			"2 EU EE%sT 2000_1_29 2",
			"2 - EET 2001_0_2 2",
			"2 EU EE%sT"
		],
		"Europe/Rome": [
			"0:49:56 - LMT 1866_8_22 0:49:56",
			"0:49:56 - RMT 1893_10_1_0 0:49:56",
			"1 Italy CE%sT 1942_10_2_2 1",
			"1 C-Eur CE%sT 1944_6 2",
			"1 Italy CE%sT 1980 1",
			"1 EU CE%sT"
		],
		"Europe/Samara": [
			"3:20:36 - LMT 1919_6_1_2 3:20:36",
			"3 - SAMT 1930_5_21 3",
			"4 - SAMT 1935_0_27 4",
			"4 Russia KUY%sT 1989_2_26_2 4",
			"3 Russia KUY%sT 1991_2_31_2 3",
			"2 Russia KUY%sT 1991_8_29_2 2",
			"3 - KUYT 1991_9_20_3 3",
			"4 Russia SAM%sT 2010_2_28_2 4",
			"3 Russia SAM%sT 2011_2_27_2 3",
			"4 - SAMT"
		],
		"Europe/Simferopol": [
			"2:16:24 - LMT 1880 2:16:24",
			"2:16 - SMT 1924_4_2 2:16",
			"2 - EET 1930_5_21 2",
			"3 - MSK 1941_10 3",
			"1 C-Eur CE%sT 1944_3_13 2",
			"3 Russia MSK/MSD 1990 3",
			"3 - MSK 1990_6_1_2 3",
			"2 - EET 1992 2",
			"2 E-Eur EE%sT 1994_4 3",
			"3 E-Eur MSK/MSD 1996_2_31_3 3",
			"4 - MSD 1996_9_27_3 3",
			"3 Russia MSK/MSD 1997 3",
			"3 - MSK 1997_2_30_1",
			"2 EU EE%sT"
		],
		"Europe/Sofia": [
			"1:33:16 - LMT 1880 1:33:16",
			"1:56:56 - IMT 1894_10_30 1:56:56",
			"2 - EET 1942_10_2_3 2",
			"1 C-Eur CE%sT 1945 1",
			"1 - CET 1945_3_2_3 1",
			"2 - EET 1979_2_31_23 2",
			"2 Bulg EE%sT 1982_8_26_2 3",
			"2 C-Eur EE%sT 1991 2",
			"2 E-Eur EE%sT 1997 2",
			"2 EU EE%sT"
		],
		"Europe/Stockholm": [
			"1:12:12 - LMT 1879_0_1 1:12:12",
			"1:0:14 - SET 1900_0_1 1:0:14",
			"1 - CET 1916_4_14_23 1",
			"2 - CEST 1916_9_1_01 2",
			"1 - CET 1980 1",
			"1 EU CE%sT"
		],
		"Europe/Tallinn": [
			"1:39 - LMT 1880 1:39",
			"1:39 - TMT 1918_1 1:39",
			"1 C-Eur CE%sT 1919_6 1",
			"1:39 - TMT 1921_4 1:39",
			"2 - EET 1940_7_6 2",
			"3 - MSK 1941_8_15 3",
			"1 C-Eur CE%sT 1944_8_22 2",
			"3 Russia MSK/MSD 1989_2_26_2 3",
			"3 - EEST 1989_8_24_2 2",
			"2 C-Eur EE%sT 1998_8_22 3",
			"2 EU EE%sT 1999_10_1 3",
			"2 - EET 2002_1_21 2",
			"2 EU EE%sT"
		],
		"Europe/Tirane": [
			"1:19:20 - LMT 1914 1:19:20",
			"1 - CET 1940_5_16 1",
			"1 Albania CE%sT 1984_6 2",
			"1 EU CE%sT"
		],
		"Europe/Uzhgorod": [
			"1:29:12 - LMT 1890_9 1:29:12",
			"1 - CET 1940 1",
			"1 C-Eur CE%sT 1944_9 2",
			"2 - CEST 1944_9_26 2",
			"1 - CET 1945_5_29 1",
			"3 Russia MSK/MSD 1990 3",
			"3 - MSK 1990_6_1_2 3",
			"1 - CET 1991_2_31_3 1",
			"2 - EET 1992 2",
			"2 E-Eur EE%sT 1995 2",
			"2 EU EE%sT"
		],
		"Europe/Vaduz": [
			"0:38:4 - LMT 1894_5 0:38:4",
			"1 - CET 1981 1",
			"1 EU CE%sT"
		],
		"Europe/Vienna": [
			"1:5:21 - LMT 1893_3 1:5:21",
			"1 C-Eur CE%sT 1920 1",
			"1 Austria CE%sT 1940_3_1_2 1",
			"1 C-Eur CE%sT 1945_3_2_2 1",
			"2 - CEST 1945_3_12_2 1",
			"1 - CET 1946 1",
			"1 Austria CE%sT 1981 1",
			"1 EU CE%sT"
		],
		"Europe/Vilnius": [
			"1:41:16 - LMT 1880 1:41:16",
			"1:24 - WMT 1917 1:24",
			"1:35:36 - KMT 1919_9_10 1:35:36",
			"1 - CET 1920_6_12 1",
			"2 - EET 1920_9_9 2",
			"1 - CET 1940_7_3 1",
			"3 - MSK 1941_5_24 3",
			"1 C-Eur CE%sT 1944_7 2",
			"3 Russia MSK/MSD 1991_2_31_2 3",
			"3 - EEST 1991_8_29_2 2",
			"2 C-Eur EE%sT 1998 2",
			"2 - EET 1998_2_29_1",
			"1 EU CE%sT 1999_9_31_1",
			"2 - EET 2003_0_1 2",
			"2 EU EE%sT"
		],
		"Europe/Volgograd": [
			"2:57:40 - LMT 1920_0_3 2:57:40",
			"3 - TSAT 1925_3_6 3",
			"3 - STAT 1930_5_21 3",
			"4 - STAT 1961_10_11 4",
			"4 Russia VOL%sT 1989_2_26_2 4",
			"3 Russia VOL%sT 1991_2_31_2 3",
			"4 - VOLT 1992_2_29_2 4",
			"3 Russia VOL%sT 2011_2_27_2 3",
			"4 - VOLT"
		],
		"Europe/Warsaw": [
			"1:24 - LMT 1880 1:24",
			"1:24 - WMT 1915_7_5 1:24",
			"1 C-Eur CE%sT 1918_8_16_3 2",
			"2 Poland EE%sT 1922_5 2",
			"1 Poland CE%sT 1940_5_23_2 1",
			"1 C-Eur CE%sT 1944_9 2",
			"1 Poland CE%sT 1977 1",
			"1 W-Eur CE%sT 1988 1",
			"1 EU CE%sT"
		],
		"Europe/Zaporozhye": [
			"2:20:40 - LMT 1880 2:20:40",
			"2:20 - CUT 1924_4_2 2:20",
			"2 - EET 1930_5_21 2",
			"3 - MSK 1941_7_25 3",
			"1 C-Eur CE%sT 1943_9_25 1",
			"3 Russia MSK/MSD 1991_2_31_2 3",
			"2 E-Eur EE%sT 1995 2",
			"2 EU EE%sT"
		],
		"Europe/Zurich": [
			"0:34:8 - LMT 1848_8_12 0:34:8",
			"0:29:44 - BMT 1894_5 0:29:44",
			"1 Swiss CE%sT 1981 1",
			"1 EU CE%sT"
		],
		"HST": [
			"-10 - HST"
		],
		"Indian/Antananarivo": [
			"3:10:4 - LMT 1911_6 3:10:4",
			"3 - EAT 1954_1_27_23 3",
			"4 - EAST 1954_4_29_23 3",
			"3 - EAT"
		],
		"Indian/Chagos": [
			"4:49:40 - LMT 1907 4:49:40",
			"5 - IOT 1996 5",
			"6 - IOT"
		],
		"Indian/Christmas": [
			"7:2:52 - LMT 1895_1 7:2:52",
			"7 - CXT"
		],
		"Indian/Cocos": [
			"6:27:40 - LMT 1900 6:27:40",
			"6:30 - CCT"
		],
		"Indian/Comoro": [
			"2:53:4 - LMT 1911_6 2:53:4",
			"3 - EAT"
		],
		"Indian/Kerguelen": [
			"0 - zzz 1950",
			"5 - TFT"
		],
		"Indian/Mahe": [
			"3:41:48 - LMT 1906_5 3:41:48",
			"4 - SCT"
		],
		"Indian/Maldives": [
			"4:54 - LMT 1880 4:54",
			"4:54 - MMT 1960 4:54",
			"5 - MVT"
		],
		"Indian/Mauritius": [
			"3:50 - LMT 1907 3:50",
			"4 Mauritius MU%sT"
		],
		"Indian/Mayotte": [
			"3:0:56 - LMT 1911_6 3:0:56",
			"3 - EAT"
		],
		"Indian/Reunion": [
			"3:41:52 - LMT 1911_5 3:41:52",
			"4 - RET"
		],
		"MET": [
			"1 C-Eur ME%sT"
		],
		"MST": [
			"-7 - MST"
		],
		"MST7MDT": [
			"-7 US M%sT"
		],
		"PST8PDT": [
			"-8 US P%sT"
		],
		"Pacific/Apia": [
			"12:33:4 - LMT 1879_6_5 12:33:4",
			"-11:26:56 - LMT 1911 -11:26:56",
			"-11:30 - SAMT 1950 -11:30",
			"-11 - WST 2010_8_26 -11",
			"-10 - WSDT 2011_3_2_4 -10",
			"-11 - WST 2011_8_24_3 -11",
			"-10 - WSDT 2011_11_30 -10",
			"14 - WSDT 2012_3_1_4 14",
			"13 WS WS%sT"
		],
		"Pacific/Auckland": [
			"11:39:4 - LMT 1868_10_2 11:39:4",
			"11:30 NZ NZ%sT 1946_0_1 12",
			"12 NZ NZ%sT"
		],
		"Pacific/Chatham": [
			"12:13:48 - LMT 1957_0_1 12:13:48",
			"12:45 Chatham CHA%sT"
		],
		"Pacific/Chuuk": [
			"10:7:8 - LMT 1901 10:7:8",
			"10 - CHUT"
		],
		"Pacific/Easter": [
			"-7:17:44 - LMT 1890 -7:17:44",
			"-7:17:28 - EMT 1932_8 -7:17:28",
			"-7 Chile EAS%sT 1982_2_13_21 -6",
			"-6 Chile EAS%sT"
		],
		"Pacific/Efate": [
			"11:13:16 - LMT 1912_0_13 11:13:16",
			"11 Vanuatu VU%sT"
		],
		"Pacific/Enderbury": [
			"-11:24:20 - LMT 1901 -11:24:20",
			"-12 - PHOT 1979_9 -12",
			"-11 - PHOT 1995 -11",
			"13 - PHOT"
		],
		"Pacific/Fakaofo": [
			"-11:24:56 - LMT 1901 -11:24:56",
			"-11 - TKT 2011_11_30 -11",
			"13 - TKT"
		],
		"Pacific/Fiji": [
			"11:55:44 - LMT 1915_9_26 11:55:44",
			"12 Fiji FJ%sT"
		],
		"Pacific/Funafuti": [
			"11:56:52 - LMT 1901 11:56:52",
			"12 - TVT"
		],
		"Pacific/Galapagos": [
			"-5:58:24 - LMT 1931 -5:58:24",
			"-5 - ECT 1986 -5",
			"-6 - GALT"
		],
		"Pacific/Gambier": [
			"-8:59:48 - LMT 1912_9 -8:59:48",
			"-9 - GAMT"
		],
		"Pacific/Guadalcanal": [
			"10:39:48 - LMT 1912_9 10:39:48",
			"11 - SBT"
		],
		"Pacific/Guam": [
			"-14:21 - LMT 1844_11_31 -14:21",
			"9:39 - LMT 1901 9:39",
			"10 - GST 2000_11_23 10",
			"10 - ChST"
		],
		"Pacific/Honolulu": [
			"-10:31:26 - LMT 1896_0_13_12 -10:31:26",
			"-10:30 - HST 1933_3_30_2 -10:30",
			"-9:30 - HDT 1933_4_21_12 -9:30",
			"-10:30 - HST 1942_1_09_2 -10:30",
			"-9:30 - HDT 1945_8_30_2 -9:30",
			"-10:30 - HST 1947_5_8_2 -10:30",
			"-10 - HST"
		],
		"Pacific/Johnston": [
			"-10 - HST"
		],
		"Pacific/Kiritimati": [
			"-10:29:20 - LMT 1901 -10:29:20",
			"-10:40 - LINT 1979_9 -10:40",
			"-10 - LINT 1995 -10",
			"14 - LINT"
		],
		"Pacific/Kosrae": [
			"10:51:56 - LMT 1901 10:51:56",
			"11 - KOST 1969_9 11",
			"12 - KOST 1999 12",
			"11 - KOST"
		],
		"Pacific/Kwajalein": [
			"11:9:20 - LMT 1901 11:9:20",
			"11 - MHT 1969_9 11",
			"-12 - KWAT 1993_7_20 -12",
			"12 - MHT"
		],
		"Pacific/Majuro": [
			"11:24:48 - LMT 1901 11:24:48",
			"11 - MHT 1969_9 11",
			"12 - MHT"
		],
		"Pacific/Marquesas": [
			"-9:18 - LMT 1912_9 -9:18",
			"-9:30 - MART"
		],
		"Pacific/Midway": [
			"-11:49:28 - LMT 1901 -11:49:28",
			"-11 - NST 1956_5_3 -11",
			"-10 - NDT 1956_8_2 -10",
			"-11 - NST 1967_3 -11",
			"-11 - BST 1983_10_30 -11",
			"-11 - SST"
		],
		"Pacific/Nauru": [
			"11:7:40 - LMT 1921_0_15 11:7:40",
			"11:30 - NRT 1942_2_15 11:30",
			"9 - JST 1944_7_15 9",
			"11:30 - NRT 1979_4 11:30",
			"12 - NRT"
		],
		"Pacific/Niue": [
			"-11:19:40 - LMT 1901 -11:19:40",
			"-11:20 - NUT 1951 -11:20",
			"-11:30 - NUT 1978_9_1 -11:30",
			"-11 - NUT"
		],
		"Pacific/Norfolk": [
			"11:11:52 - LMT 1901 11:11:52",
			"11:12 - NMT 1951 11:12",
			"11:30 - NFT"
		],
		"Pacific/Noumea": [
			"11:5:48 - LMT 1912_0_13 11:5:48",
			"11 NC NC%sT"
		],
		"Pacific/Pago_Pago": [
			"12:37:12 - LMT 1879_6_5 12:37:12",
			"-11:22:48 - LMT 1911 -11:22:48",
			"-11:30 - SAMT 1950 -11:30",
			"-11 - NST 1967_3 -11",
			"-11 - BST 1983_10_30 -11",
			"-11 - SST"
		],
		"Pacific/Palau": [
			"8:57:56 - LMT 1901 8:57:56",
			"9 - PWT"
		],
		"Pacific/Pitcairn": [
			"-8:40:20 - LMT 1901 -8:40:20",
			"-8:30 - PNT 1998_3_27_00 -8:30",
			"-8 - PST"
		],
		"Pacific/Pohnpei": [
			"10:32:52 - LMT 1901 10:32:52",
			"11 - PONT"
		],
		"Pacific/Port_Moresby": [
			"9:48:40 - LMT 1880 9:48:40",
			"9:48:32 - PMMT 1895 9:48:32",
			"10 - PGT"
		],
		"Pacific/Rarotonga": [
			"-10:39:4 - LMT 1901 -10:39:4",
			"-10:30 - CKT 1978_10_12 -10:30",
			"-10 Cook CK%sT"
		],
		"Pacific/Saipan": [
			"-14:17 - LMT 1844_11_31 -14:17",
			"9:43 - LMT 1901 9:43",
			"9 - MPT 1969_9 9",
			"10 - MPT 2000_11_23 10",
			"10 - ChST"
		],
		"Pacific/Tahiti": [
			"-9:58:16 - LMT 1912_9 -9:58:16",
			"-10 - TAHT"
		],
		"Pacific/Tarawa": [
			"11:32:4 - LMT 1901 11:32:4",
			"12 - GILT"
		],
		"Pacific/Tongatapu": [
			"12:19:20 - LMT 1901 12:19:20",
			"12:20 - TOT 1941 12:20",
			"13 - TOT 1999 13",
			"13 Tonga TO%sT"
		],
		"Pacific/Wake": [
			"11:6:28 - LMT 1901 11:6:28",
			"12 - WAKT"
		],
		"Pacific/Wallis": [
			"12:15:20 - LMT 1901 12:15:20",
			"12 - WFT"
		],
		"WET": [
			"0 EU WE%sT"
		]
	}
}
// timezones/teardown.js
);
})();

// bower_components/jstz/jstz.js
/**
 * This script gives you the zone info key representing your device's time zone setting.
 *
 * @name jsTimezoneDetect
 * @version 1.0.5
 * @author Jon Nylander
 * @license MIT License - http://www.opensource.org/licenses/mit-license.php
 *
 * For usage and examples, visit:
 * http://pellepim.bitbucket.org/jstz/
 *
 * Copyright (c) Jon Nylander
 */

/*jslint undef: true */
/*global console, exports*/

(function(root) {
  /**
   * Namespace to hold all the code for timezone detection.
   */
  var jstz = (function () {
      'use strict';
      var HEMISPHERE_SOUTH = 's',
          
          /**
           * Gets the offset in minutes from UTC for a certain date.
           * @param {Date} date
           * @returns {Number}
           */
          get_date_offset = function (date) {
              var offset = -date.getTimezoneOffset();
              return (offset !== null ? offset : 0);
          },

          get_date = function (year, month, date) {
              var d = new Date();
              if (year !== undefined) {
                d.setFullYear(year);
              }
              d.setMonth(month);
              d.setDate(date);
              return d;
          },

          get_january_offset = function (year) {
              return get_date_offset(get_date(year, 0 ,2));
          },

          get_june_offset = function (year) {
              return get_date_offset(get_date(year, 5, 2));
          },

          /**
           * Private method.
           * Checks whether a given date is in daylight saving time.
           * If the date supplied is after august, we assume that we're checking
           * for southern hemisphere DST.
           * @param {Date} date
           * @returns {Boolean}
           */
          date_is_dst = function (date) {
              var is_southern = date.getMonth() > 7,
                  base_offset = is_southern ? get_june_offset(date.getFullYear()) : 
                                              get_january_offset(date.getFullYear()),
                  date_offset = get_date_offset(date),
                  is_west = base_offset < 0,
                  dst_offset = base_offset - date_offset;
                  
              if (!is_west && !is_southern) {
                  return dst_offset < 0;
              }

              return dst_offset !== 0;
          },

          /**
           * This function does some basic calculations to create information about
           * the user's timezone. It uses REFERENCE_YEAR as a solid year for which
           * the script has been tested rather than depend on the year set by the
           * client device.
           *
           * Returns a key that can be used to do lookups in jstz.olson.timezones.
           * eg: "720,1,2". 
           *
           * @returns {String}
           */

          lookup_key = function () {
              var january_offset = get_january_offset(),
                  june_offset = get_june_offset(),
                  diff = january_offset - june_offset;

              if (diff < 0) {
                  return january_offset + ",1";
              } else if (diff > 0) {
                  return june_offset + ",1," + HEMISPHERE_SOUTH;
              }

              return january_offset + ",0";
          },

          /**
           * Uses get_timezone_info() to formulate a key to use in the olson.timezones dictionary.
           *
           * Returns a primitive object on the format:
           * {'timezone': TimeZone, 'key' : 'the key used to find the TimeZone object'}
           *
           * @returns Object
           */
          determine = function () {
              var key = lookup_key();
              return new jstz.TimeZone(jstz.olson.timezones[key]);
          },

          /**
           * This object contains information on when daylight savings starts for
           * different timezones.
           *
           * The list is short for a reason. Often we do not have to be very specific
           * to single out the correct timezone. But when we do, this list comes in
           * handy.
           *
           * Each value is a date denoting when daylight savings starts for that timezone.
           */
          dst_start_for = function (tz_name) {

            var ru_pre_dst_change = new Date(2010, 6, 15, 1, 0, 0, 0), // In 2010 Russia had DST, this allows us to detect Russia :)
                dst_starts = {
                    'America/Denver': new Date(2011, 2, 13, 3, 0, 0, 0),
                    'America/Mazatlan': new Date(2011, 3, 3, 3, 0, 0, 0),
                    'America/Chicago': new Date(2011, 2, 13, 3, 0, 0, 0),
                    'America/Mexico_City': new Date(2011, 3, 3, 3, 0, 0, 0),
                    'America/Asuncion': new Date(2012, 9, 7, 3, 0, 0, 0),
                    'America/Santiago': new Date(2012, 9, 3, 3, 0, 0, 0),
                    'America/Campo_Grande': new Date(2012, 9, 21, 5, 0, 0, 0),
                    'America/Montevideo': new Date(2011, 9, 2, 3, 0, 0, 0),
                    'America/Sao_Paulo': new Date(2011, 9, 16, 5, 0, 0, 0),
                    'America/Los_Angeles': new Date(2011, 2, 13, 8, 0, 0, 0),
                    'America/Santa_Isabel': new Date(2011, 3, 5, 8, 0, 0, 0),
                    'America/Havana': new Date(2012, 2, 10, 2, 0, 0, 0),
                    'America/New_York': new Date(2012, 2, 10, 7, 0, 0, 0),
                    'Europe/Helsinki': new Date(2013, 2, 31, 5, 0, 0, 0),
                    'Pacific/Auckland': new Date(2011, 8, 26, 7, 0, 0, 0),
                    'America/Halifax': new Date(2011, 2, 13, 6, 0, 0, 0),
                    'America/Goose_Bay': new Date(2011, 2, 13, 2, 1, 0, 0),
                    'America/Miquelon': new Date(2011, 2, 13, 5, 0, 0, 0),
                    'America/Godthab': new Date(2011, 2, 27, 1, 0, 0, 0),
                    'Europe/Moscow': ru_pre_dst_change,
                    'Asia/Amman': new Date(2013, 2, 29, 1, 0, 0, 0),
                    'Asia/Beirut': new Date(2013, 2, 31, 2, 0, 0, 0),
                    'Asia/Damascus': new Date(2013, 3, 6, 2, 0, 0, 0),
                    'Asia/Jerusalem': new Date(2013, 2, 29, 5, 0, 0, 0),
                    'Asia/Yekaterinburg': ru_pre_dst_change,
                    'Asia/Omsk': ru_pre_dst_change,
                    'Asia/Krasnoyarsk': ru_pre_dst_change,
                    'Asia/Irkutsk': ru_pre_dst_change,
                    'Asia/Yakutsk': ru_pre_dst_change,
                    'Asia/Vladivostok': ru_pre_dst_change,
                    'Asia/Baku': new Date(2013, 2, 31, 4, 0, 0),
                    'Asia/Yerevan': new Date(2013, 2, 31, 3, 0, 0),
                    'Asia/Kamchatka': ru_pre_dst_change,
                    'Asia/Gaza': new Date(2010, 2, 27, 4, 0, 0),
                    'Africa/Cairo': new Date(2010, 4, 1, 3, 0, 0),
                    'Europe/Minsk': ru_pre_dst_change,
                    'Pacific/Apia': new Date(2010, 10, 1, 1, 0, 0, 0),
                    'Pacific/Fiji': new Date(2010, 11, 1, 0, 0, 0),
                    'Australia/Perth': new Date(2008, 10, 1, 1, 0, 0, 0)
                };

              return dst_starts[tz_name];
          };

      return {
          determine: determine,
          date_is_dst: date_is_dst,
          dst_start_for: dst_start_for 
      };
  }());

  /**
   * Simple object to perform ambiguity check and to return name of time zone.
   */
  jstz.TimeZone = function (tz_name) {
      'use strict';
        /**
         * The keys in this object are timezones that we know may be ambiguous after
         * a preliminary scan through the olson_tz object.
         *
         * The array of timezones to compare must be in the order that daylight savings
         * starts for the regions.
         */
      var AMBIGUITIES = {
              'America/Denver':       ['America/Denver', 'America/Mazatlan'],
              'America/Chicago':      ['America/Chicago', 'America/Mexico_City'],
              'America/Santiago':     ['America/Santiago', 'America/Asuncion', 'America/Campo_Grande'],
              'America/Montevideo':   ['America/Montevideo', 'America/Sao_Paulo'],
              'Asia/Beirut':          ['Asia/Amman', 'Asia/Jerusalem', 'Asia/Beirut', 'Europe/Helsinki','Asia/Damascus'],
              'Pacific/Auckland':     ['Pacific/Auckland', 'Pacific/Fiji'],
              'America/Los_Angeles':  ['America/Los_Angeles', 'America/Santa_Isabel'],
              'America/New_York':     ['America/Havana', 'America/New_York'],
              'America/Halifax':      ['America/Goose_Bay', 'America/Halifax'],
              'America/Godthab':      ['America/Miquelon', 'America/Godthab'],
              'Asia/Dubai':           ['Europe/Moscow'],
              'Asia/Dhaka':           ['Asia/Yekaterinburg'],
              'Asia/Jakarta':         ['Asia/Omsk'],
              'Asia/Shanghai':        ['Asia/Krasnoyarsk', 'Australia/Perth'],
              'Asia/Tokyo':           ['Asia/Irkutsk'],
              'Australia/Brisbane':   ['Asia/Yakutsk'],
              'Pacific/Noumea':       ['Asia/Vladivostok'],
              'Pacific/Tarawa':       ['Asia/Kamchatka', 'Pacific/Fiji'],
              'Pacific/Tongatapu':    ['Pacific/Apia'],
              'Asia/Baghdad':         ['Europe/Minsk'],
              'Asia/Baku':            ['Asia/Yerevan','Asia/Baku'],
              'Africa/Johannesburg':  ['Asia/Gaza', 'Africa/Cairo']
          },

          timezone_name = tz_name,
          
          /**
           * Checks if a timezone has possible ambiguities. I.e timezones that are similar.
           *
           * For example, if the preliminary scan determines that we're in America/Denver.
           * We double check here that we're really there and not in America/Mazatlan.
           *
           * This is done by checking known dates for when daylight savings start for different
           * timezones during 2010 and 2011.
           */
          ambiguity_check = function () {
              var ambiguity_list = AMBIGUITIES[timezone_name],
                  length = ambiguity_list.length,
                  i = 0,
                  tz = ambiguity_list[0];

              for (; i < length; i += 1) {
                  tz = ambiguity_list[i];

                  if (jstz.date_is_dst(jstz.dst_start_for(tz))) {
                      timezone_name = tz;
                      return;
                  }
              }
          },

          /**
           * Checks if it is possible that the timezone is ambiguous.
           */
          is_ambiguous = function () {
              return typeof (AMBIGUITIES[timezone_name]) !== 'undefined';
          };

      if (is_ambiguous()) {
          ambiguity_check();
      }

      return {
          name: function () {
              return timezone_name;
          }
      };
  };

  jstz.olson = {};

  /*
   * The keys in this dictionary are comma separated as such:
   *
   * First the offset compared to UTC time in minutes.
   *
   * Then a flag which is 0 if the timezone does not take daylight savings into account and 1 if it
   * does.
   *
   * Thirdly an optional 's' signifies that the timezone is in the southern hemisphere,
   * only interesting for timezones with DST.
   *
   * The mapped arrays is used for constructing the jstz.TimeZone object from within
   * jstz.determine_timezone();
   */
  jstz.olson.timezones = {
      '-720,0'   : 'Pacific/Majuro',
      '-660,0'   : 'Pacific/Pago_Pago',
      '-600,1'   : 'America/Adak',
      '-600,0'   : 'Pacific/Honolulu',
      '-570,0'   : 'Pacific/Marquesas',
      '-540,0'   : 'Pacific/Gambier',
      '-540,1'   : 'America/Anchorage',
      '-480,1'   : 'America/Los_Angeles',
      '-480,0'   : 'Pacific/Pitcairn',
      '-420,0'   : 'America/Phoenix',
      '-420,1'   : 'America/Denver',
      '-360,0'   : 'America/Guatemala',
      '-360,1'   : 'America/Chicago',
      '-360,1,s' : 'Pacific/Easter',
      '-300,0'   : 'America/Bogota',
      '-300,1'   : 'America/New_York',
      '-270,0'   : 'America/Caracas',
      '-240,1'   : 'America/Halifax',
      '-240,0'   : 'America/Santo_Domingo',
      '-240,1,s' : 'America/Santiago',
      '-210,1'   : 'America/St_Johns',
      '-180,1'   : 'America/Godthab',
      '-180,0'   : 'America/Argentina/Buenos_Aires',
      '-180,1,s' : 'America/Montevideo',
      '-120,0'   : 'America/Noronha',
      '-120,1'   : 'America/Noronha',
      '-60,1'    : 'Atlantic/Azores',
      '-60,0'    : 'Atlantic/Cape_Verde',
      '0,0'      : 'UTC',
      '0,1'      : 'Europe/London',
      '60,1'     : 'Europe/Berlin',
      '60,0'     : 'Africa/Lagos',
      '60,1,s'   : 'Africa/Windhoek',
      '120,1'    : 'Asia/Beirut',
      '120,0'    : 'Africa/Johannesburg',
      '180,0'    : 'Asia/Baghdad',
      '180,1'    : 'Europe/Moscow',
      '210,1'    : 'Asia/Tehran',
      '240,0'    : 'Asia/Dubai',
      '240,1'    : 'Asia/Baku',
      '270,0'    : 'Asia/Kabul',
      '300,1'    : 'Asia/Yekaterinburg',
      '300,0'    : 'Asia/Karachi',
      '330,0'    : 'Asia/Kolkata',
      '345,0'    : 'Asia/Kathmandu',
      '360,0'    : 'Asia/Dhaka',
      '360,1'    : 'Asia/Omsk',
      '390,0'    : 'Asia/Rangoon',
      '420,1'    : 'Asia/Krasnoyarsk',
      '420,0'    : 'Asia/Jakarta',
      '480,0'    : 'Asia/Shanghai',
      '480,1'    : 'Asia/Irkutsk',
      '525,0'    : 'Australia/Eucla',
      '525,1,s'  : 'Australia/Eucla',
      '540,1'    : 'Asia/Yakutsk',
      '540,0'    : 'Asia/Tokyo',
      '570,0'    : 'Australia/Darwin',
      '570,1,s'  : 'Australia/Adelaide',
      '600,0'    : 'Australia/Brisbane',
      '600,1'    : 'Asia/Vladivostok',
      '600,1,s'  : 'Australia/Sydney',
      '630,1,s'  : 'Australia/Lord_Howe',
      '660,1'    : 'Asia/Kamchatka',
      '660,0'    : 'Pacific/Noumea',
      '690,0'    : 'Pacific/Norfolk',
      '720,1,s'  : 'Pacific/Auckland',
      '720,0'    : 'Pacific/Tarawa',
      '765,1,s'  : 'Pacific/Chatham',
      '780,0'    : 'Pacific/Tongatapu',
      '780,1,s'  : 'Pacific/Apia',
      '840,0'    : 'Pacific/Kiritimati'
  };

  if (typeof exports !== 'undefined') {
    exports.jstz = jstz;
  } else {
    root.jstz = jstz;
  }
})(this);

// bower_components/olay/olay.js
(function () {
  'use strict';

  // Store a local reference to jQuery.
  var $ = window.jQuery;

  // Selector for tabbable elements.
  var tabbable =
    ':input, [tabindex], [contenteditable], [href], iframe, object, embed';

  // Convenience method for `off`/`on`ing in jQuery.
  var delegate = function ($el, ev, selector, cb) {
    $el.off.call($el, ev, selector, cb).on.call($el, ev, selector, cb);
  };

  // Listen for keydown events.
  $(document).keydown(function (ev) {
    var lastContainer = $('.js-olay-container').last()[0];
    if (!lastContainer) return;
    var olay = lastContainer.olay;
    var which = ev.which;
    var keys = olay.hideOnKeys || [];
    for (var i = 0, l = keys.length; i < l; ++i) {
      if (which === keys[i]) return olay.hide() && false;
    }
  });

  // Create the `Olay` constructor.
  //
  // ```js
  // var olay = new Olay('Howdy!', {duration: 5000});
  // ```
  var Olay = window.Olay = function (el, options) {

    // Extend the instance with its options.
    for (var name in options) this[name] = options[name];

    // Store bound listeners to be used for callbacks. This is also used to
    // ensure event callbacks can be removed consistently.
    var self = this;
    this._hide = function () { return self.hide(); };
    this._$containerClick = function (ev) {
      var contentClicked =
        $.contains(self.$cell[0], ev.target) ||
        !$.contains($('body')[0], ev.target);
      if (self.hideOnClick && !contentClicked) self.hide();
    };

    // Create the necessary DOM nodes.
    this.$container = $('<div>')
      .addClass('js-olay-container')
      .addClass(this.transition)
      .append(
    this.$table = $('<div>')
      .addClass('js-olay-table')
      .append(
    this.$cell = $('<div>')
      .addClass('js-olay-cell')
      .append(
    this.$content = $('<div>')
      .addClass('js-olay-content')
      .attr({role: 'alertdialog', 'aria-label': this.ariaLabel}))));

    // Finally, set the element.
    this.setElement(el);
  };

  // Define `prototype` properties and methods for `Olay`.
  var proto = {

    // How long the olay should be displayed for (in ms)?
    // `0` means indefinitely.
    duration: 0,

    // What transition should be used? This simply refers to a class that will
    // be added to the `$container` when shown. Use this to style different
    // transitions with CSS.
    transition: 'js-olay-scale-up',

    // How long should the olay take to transition in or out?
    // `0` means instantly.
    transitionDuration: 250,

    // What keys hide the olay? Default is just ESC.
    hideOnKeys: [27],

    // Should the olay be hidden when there is a click outside the content box?
    hideOnClick: true,

    // Preserve the DOM data and events for this olay. If this is set to `true`,
    // be sure to either set it to `false` before your final `hide` call, or
    // after your final `hide` call invoke `destroy()` after your transition.
    // Failure to do this will cause memory leaks. When `preserve` is set to
    // `false` this is handled automaticaly.
    preserve: false,

    // Show the olay.
    show: function () {
      var inDom = $.contains($('body')[0], this.$container[0]);
      if (inDom && this.$container.hasClass('js-olay-show')) return this;
      clearTimeout(this._timeout);
      if (!inDom) this._append();

      // Force a redraw before adding the transition class. Not doing this will
      // apply the end result of the transition instantly, which is not
      // desirable in a transition...
      this.$container[0].olay = this;
      this.$container.height();
      this.$container.addClass('js-olay-show');

      // Delegate events, ensuring no double-binding.
      delegate(this.$container, 'click', this._$containerClick);
      delegate(this.$content, 'click', '.js-olay-hide', this._hide);

      this.$el.trigger('olay:show');
      var duration = this.duration;
      if (!this.duration) return this;
      duration += this.transitionDuration;
      this._timeout = setTimeout(this._hide, duration);
      return this;
    },

    // Hide the olay by removing the `'js-show'` class to the container and then
    // finally removing it from the DOM after `transitionDuration`.
    hide: function () {
      if (!this.$container.hasClass('js-olay-show')) return;
      clearTimeout(this._timeout);
      this.$container.removeClass('js-olay-show');
      var duration = this.transitionDuration;
      if (!duration) return this._remove();
      var self = this;
      this._timeout = setTimeout(function () { self._remove(); }, duration);
      return this;
    },

    // Use this method to set or update `$el`.
    setElement: function (el) {
      this.$content.empty().append(this.$el = el instanceof $ ? el : $(el));
      return this;
    },

    // Completely remove the `$container` element and its children and all of
    // the associated data and events. This will only ever need to be called if
    // the `preserve` option is `true` to prevent memory leaks.
    destroy: function () {
      this.$container.remove();
      return this;
    },

    // Append `$container` to the DOM. Used internally.
    _append: function () {
      var $body = $('body');
      var $olays = $('.js-olay-container');
      var active = document.activeElement;
      var useLast = $olays.length && active === $body[0];
      this._$active = useLast ? $olays.last() : $(active);
      $(tabbable).each(function () {
        if ('olayTabindex' in this) return;
        var $self = $(this);
        this.olayTabindex = $self.attr('tabindex') || null;
        $self.attr('tabindex', -1);
      });
      $body.addClass('js-olay-visible').append(this.$container);
      this.$content.attr('tabindex', 0).focus().removeAttr('tabindex');
      return this;
    },

    // Detach and optionally remove `$container` from the DOM. Used internally.
    _remove: function () {
      this.$container.detach();
      this._$active.attr('tabindex', 0).focus().removeAttr('tabindex');
      var $olays = $('.js-olay-container');
      ($olays.length ? $olays.last() : $('body').removeClass('js-olay-visible'))
        .find(tabbable).each(function () {
          $(this).attr('tabindex', this.olayTabindex);
          delete this.olayTabindex;
        });
      this.$el.trigger('olay:hide');
      if (!this.preserve) this.destroy();
      return this;
    }
  };

  // Extend `Olay.prototype`.
  for (var name in proto) Olay.prototype[name] = proto[name];
})();

// bower_components/async/lib/async.js
/*global setImmediate: false, setTimeout: false, console: false */
(function () {

    var async = {};

    // global on the server, window in the browser
    var root, previous_async;

    root = this;
    if (root != null) {
      previous_async = root.async;
    }

    async.noConflict = function () {
        root.async = previous_async;
        return async;
    };

    function only_once(fn) {
        var called = false;
        return function() {
            if (called) throw new Error("Callback was already called.");
            called = true;
            fn.apply(root, arguments);
        }
    }

    //// cross-browser compatiblity functions ////

    var _each = function (arr, iterator) {
        if (arr.forEach) {
            return arr.forEach(iterator);
        }
        for (var i = 0; i < arr.length; i += 1) {
            iterator(arr[i], i, arr);
        }
    };

    var _map = function (arr, iterator) {
        if (arr.map) {
            return arr.map(iterator);
        }
        var results = [];
        _each(arr, function (x, i, a) {
            results.push(iterator(x, i, a));
        });
        return results;
    };

    var _reduce = function (arr, iterator, memo) {
        if (arr.reduce) {
            return arr.reduce(iterator, memo);
        }
        _each(arr, function (x, i, a) {
            memo = iterator(memo, x, i, a);
        });
        return memo;
    };

    var _keys = function (obj) {
        if (Object.keys) {
            return Object.keys(obj);
        }
        var keys = [];
        for (var k in obj) {
            if (obj.hasOwnProperty(k)) {
                keys.push(k);
            }
        }
        return keys;
    };

    //// exported async module functions ////

    //// nextTick implementation with browser-compatible fallback ////
    if (typeof process === 'undefined' || !(process.nextTick)) {
        if (typeof setImmediate === 'function') {
            async.nextTick = function (fn) {
                setImmediate(fn);
            };
        }
        else {
            async.nextTick = function (fn) {
                setTimeout(fn, 0);
            };
        }
    }
    else {
        async.nextTick = process.nextTick;
    }

    async.each = function (arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        _each(arr, function (x) {
            iterator(x, only_once(function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed >= arr.length) {
                        callback(null);
                    }
                }
            }));
        });
    };
    async.forEach = async.each;

    async.eachSeries = function (arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        var iterate = function () {
            var sync = true;
            iterator(arr[completed], function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed >= arr.length) {
                        callback(null);
                    }
                    else {
                        if (sync) {
                            async.nextTick(iterate);
                        }
                        else {
                            iterate();
                        }
                    }
                }
            });
            sync = false;
        };
        iterate();
    };
    async.forEachSeries = async.eachSeries;

    async.eachLimit = function (arr, limit, iterator, callback) {
        var fn = _eachLimit(limit);
        fn.apply(null, [arr, iterator, callback]);
    };
    async.forEachLimit = async.eachLimit;

    var _eachLimit = function (limit) {

        return function (arr, iterator, callback) {
            callback = callback || function () {};
            if (!arr.length || limit <= 0) {
                return callback();
            }
            var completed = 0;
            var started = 0;
            var running = 0;

            (function replenish () {
                if (completed >= arr.length) {
                    return callback();
                }

                while (running < limit && started < arr.length) {
                    started += 1;
                    running += 1;
                    iterator(arr[started - 1], function (err) {
                        if (err) {
                            callback(err);
                            callback = function () {};
                        }
                        else {
                            completed += 1;
                            running -= 1;
                            if (completed >= arr.length) {
                                callback();
                            }
                            else {
                                replenish();
                            }
                        }
                    });
                }
            })();
        };
    };


    var doParallel = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.each].concat(args));
        };
    };
    var doParallelLimit = function(limit, fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [_eachLimit(limit)].concat(args));
        };
    };
    var doSeries = function (fn) {
        return function () {
            var args = Array.prototype.slice.call(arguments);
            return fn.apply(null, [async.eachSeries].concat(args));
        };
    };


    var _asyncMap = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (err, v) {
                results[x.index] = v;
                callback(err);
            });
        }, function (err) {
            callback(err, results);
        });
    };
    async.map = doParallel(_asyncMap);
    async.mapSeries = doSeries(_asyncMap);
    async.mapLimit = function (arr, limit, iterator, callback) {
        return _mapLimit(limit)(arr, iterator, callback);
    };

    var _mapLimit = function(limit) {
        return doParallelLimit(limit, _asyncMap);
    };

    // reduce only has a series version, as doing reduce in parallel won't
    // work in many situations.
    async.reduce = function (arr, memo, iterator, callback) {
        async.eachSeries(arr, function (x, callback) {
            iterator(memo, x, function (err, v) {
                memo = v;
                callback(err);
            });
        }, function (err) {
            callback(err, memo);
        });
    };
    // inject alias
    async.inject = async.reduce;
    // foldl alias
    async.foldl = async.reduce;

    async.reduceRight = function (arr, memo, iterator, callback) {
        var reversed = _map(arr, function (x) {
            return x;
        }).reverse();
        async.reduce(reversed, memo, iterator, callback);
    };
    // foldr alias
    async.foldr = async.reduceRight;

    var _filter = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.filter = doParallel(_filter);
    async.filterSeries = doSeries(_filter);
    // select alias
    async.select = async.filter;
    async.selectSeries = async.filterSeries;

    var _reject = function (eachfn, arr, iterator, callback) {
        var results = [];
        arr = _map(arr, function (x, i) {
            return {index: i, value: x};
        });
        eachfn(arr, function (x, callback) {
            iterator(x.value, function (v) {
                if (!v) {
                    results.push(x);
                }
                callback();
            });
        }, function (err) {
            callback(_map(results.sort(function (a, b) {
                return a.index - b.index;
            }), function (x) {
                return x.value;
            }));
        });
    };
    async.reject = doParallel(_reject);
    async.rejectSeries = doSeries(_reject);

    var _detect = function (eachfn, arr, iterator, main_callback) {
        eachfn(arr, function (x, callback) {
            iterator(x, function (result) {
                if (result) {
                    main_callback(x);
                    main_callback = function () {};
                }
                else {
                    callback();
                }
            });
        }, function (err) {
            main_callback();
        });
    };
    async.detect = doParallel(_detect);
    async.detectSeries = doSeries(_detect);

    async.some = function (arr, iterator, main_callback) {
        async.each(arr, function (x, callback) {
            iterator(x, function (v) {
                if (v) {
                    main_callback(true);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(false);
        });
    };
    // any alias
    async.any = async.some;

    async.every = function (arr, iterator, main_callback) {
        async.each(arr, function (x, callback) {
            iterator(x, function (v) {
                if (!v) {
                    main_callback(false);
                    main_callback = function () {};
                }
                callback();
            });
        }, function (err) {
            main_callback(true);
        });
    };
    // all alias
    async.all = async.every;

    async.sortBy = function (arr, iterator, callback) {
        async.map(arr, function (x, callback) {
            iterator(x, function (err, criteria) {
                if (err) {
                    callback(err);
                }
                else {
                    callback(null, {value: x, criteria: criteria});
                }
            });
        }, function (err, results) {
            if (err) {
                return callback(err);
            }
            else {
                var fn = function (left, right) {
                    var a = left.criteria, b = right.criteria;
                    return a < b ? -1 : a > b ? 1 : 0;
                };
                callback(null, _map(results.sort(fn), function (x) {
                    return x.value;
                }));
            }
        });
    };

    async.auto = function (tasks, callback) {
        callback = callback || function () {};
        var keys = _keys(tasks);
        if (!keys.length) {
            return callback(null);
        }

        var results = {};

        var listeners = [];
        var addListener = function (fn) {
            listeners.unshift(fn);
        };
        var removeListener = function (fn) {
            for (var i = 0; i < listeners.length; i += 1) {
                if (listeners[i] === fn) {
                    listeners.splice(i, 1);
                    return;
                }
            }
        };
        var taskComplete = function () {
            _each(listeners.slice(0), function (fn) {
                fn();
            });
        };

        addListener(function () {
            if (_keys(results).length === keys.length) {
                callback(null, results);
                callback = function () {};
            }
        });

        _each(keys, function (k) {
            var task = (tasks[k] instanceof Function) ? [tasks[k]]: tasks[k];
            var taskCallback = function (err) {
                if (err) {
                    callback(err);
                    // stop subsequent errors hitting callback multiple times
                    callback = function () {};
                }
                else {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    async.nextTick(taskComplete);
                }
            };
            var requires = task.slice(0, Math.abs(task.length - 1)) || [];
            var ready = function () {
                return _reduce(requires, function (a, x) {
                    return (a && results.hasOwnProperty(x));
                }, true) && !results.hasOwnProperty(k);
            };
            if (ready()) {
                task[task.length - 1](taskCallback, results);
            }
            else {
                var listener = function () {
                    if (ready()) {
                        removeListener(listener);
                        task[task.length - 1](taskCallback, results);
                    }
                };
                addListener(listener);
            }
        });
    };

    async.waterfall = function (tasks, callback) {
        callback = callback || function () {};
        if (!tasks.length) {
            return callback();
        }
        var wrapIterator = function (iterator) {
            return function (err) {
                if (err) {
                    callback.apply(null, arguments);
                    callback = function () {};
                }
                else {
                    var args = Array.prototype.slice.call(arguments, 1);
                    var next = iterator.next();
                    if (next) {
                        args.push(wrapIterator(next));
                    }
                    else {
                        args.push(callback);
                    }
                    async.nextTick(function () {
                        iterator.apply(null, args);
                    });
                }
            };
        };
        wrapIterator(async.iterator(tasks))();
    };

    var _parallel = function(eachfn, tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor === Array) {
            eachfn.map(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            eachfn.each(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.parallel = function (tasks, callback) {
        _parallel({ map: async.map, each: async.each }, tasks, callback);
    };

    async.parallelLimit = function(tasks, limit, callback) {
        _parallel({ map: _mapLimit(limit), each: _eachLimit(limit) }, tasks, callback);
    };

    async.series = function (tasks, callback) {
        callback = callback || function () {};
        if (tasks.constructor === Array) {
            async.mapSeries(tasks, function (fn, callback) {
                if (fn) {
                    fn(function (err) {
                        var args = Array.prototype.slice.call(arguments, 1);
                        if (args.length <= 1) {
                            args = args[0];
                        }
                        callback.call(null, err, args);
                    });
                }
            }, callback);
        }
        else {
            var results = {};
            async.eachSeries(_keys(tasks), function (k, callback) {
                tasks[k](function (err) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    if (args.length <= 1) {
                        args = args[0];
                    }
                    results[k] = args;
                    callback(err);
                });
            }, function (err) {
                callback(err, results);
            });
        }
    };

    async.iterator = function (tasks) {
        var makeCallback = function (index) {
            var fn = function () {
                if (tasks.length) {
                    tasks[index].apply(null, arguments);
                }
                return fn.next();
            };
            fn.next = function () {
                return (index < tasks.length - 1) ? makeCallback(index + 1): null;
            };
            return fn;
        };
        return makeCallback(0);
    };

    async.apply = function (fn) {
        var args = Array.prototype.slice.call(arguments, 1);
        return function () {
            return fn.apply(
                null, args.concat(Array.prototype.slice.call(arguments))
            );
        };
    };

    var _concat = function (eachfn, arr, fn, callback) {
        var r = [];
        eachfn(arr, function (x, cb) {
            fn(x, function (err, y) {
                r = r.concat(y || []);
                cb(err);
            });
        }, function (err) {
            callback(err, r);
        });
    };
    async.concat = doParallel(_concat);
    async.concatSeries = doSeries(_concat);

    async.whilst = function (test, iterator, callback) {
        if (test()) {
            var sync = true;
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                if (sync) {
                    async.nextTick(function () {
                        async.whilst(test, iterator, callback);
                    });
                }
                else {
                    async.whilst(test, iterator, callback);
                }
            });
            sync = false;
        }
        else {
            callback();
        }
    };

    async.doWhilst = function (iterator, test, callback) {
        var sync = true;
        iterator(function (err) {
            if (err) {
                return callback(err);
            }
            if (test()) {
                if (sync) {
                    async.nextTick(function () {
                        async.doWhilst(iterator, test, callback);
                    });
                }
                else {
                    async.doWhilst(iterator, test, callback);
                }
            }
            else {
                callback();
            }
        });
        sync = false;
    };

    async.until = function (test, iterator, callback) {
        if (!test()) {
            var sync = true;
            iterator(function (err) {
                if (err) {
                    return callback(err);
                }
                if (sync) {
                    async.nextTick(function () {
                        async.until(test, iterator, callback);
                    });
                }
                else {
                    async.until(test, iterator, callback);
                }
            });
            sync = false;
        }
        else {
            callback();
        }
    };

    async.doUntil = function (iterator, test, callback) {
        var sync = true;
        iterator(function (err) {
            if (err) {
                return callback(err);
            }
            if (!test()) {
                if (sync) {
                    async.nextTick(function () {
                        async.doUntil(iterator, test, callback);
                    });
                }
                else {
                    async.doUntil(iterator, test, callback);
                }
            }
            else {
                callback();
            }
        });
        sync = false;
    };

    async.queue = function (worker, concurrency) {
        function _insert(q, data, pos, callback) {
          if(data.constructor !== Array) {
              data = [data];
          }
          _each(data, function(task) {
              var item = {
                  data: task,
                  callback: typeof callback === 'function' ? callback : null
              };

              if (pos) {
                q.tasks.unshift(item);
              } else {
                q.tasks.push(item);
              }

              if (q.saturated && q.tasks.length === concurrency) {
                  q.saturated();
              }
              async.nextTick(q.process);
          });
        }

        var workers = 0;
        var q = {
            tasks: [],
            concurrency: concurrency,
            saturated: null,
            empty: null,
            drain: null,
            push: function (data, callback) {
              _insert(q, data, false, callback);
            },
            unshift: function (data, callback) {
              _insert(q, data, true, callback);
            },
            process: function () {
                if (workers < q.concurrency && q.tasks.length) {
                    var task = q.tasks.shift();
                    if (q.empty && q.tasks.length === 0) {
                        q.empty();
                    }
                    workers += 1;
                    var sync = true;
                    var next = function () {
                        workers -= 1;
                        if (task.callback) {
                            task.callback.apply(task, arguments);
                        }
                        if (q.drain && q.tasks.length + workers === 0) {
                            q.drain();
                        }
                        q.process();
                    };
                    var cb = only_once(function () {
                        var cbArgs = arguments;

                        if (sync) {
                            async.nextTick(function () {
                                next.apply(null, cbArgs);
                            });
                        } else {
                            next.apply(null, arguments);
                        }
                    });
                    worker(task.data, cb);
                    sync = false;
                }
            },
            length: function () {
                return q.tasks.length;
            },
            running: function () {
                return workers;
            }
        };
        return q;
    };

    async.cargo = function (worker, payload) {
        var working     = false,
            tasks       = [];

        var cargo = {
            tasks: tasks,
            payload: payload,
            saturated: null,
            empty: null,
            drain: null,
            push: function (data, callback) {
                if(data.constructor !== Array) {
                    data = [data];
                }
                _each(data, function(task) {
                    tasks.push({
                        data: task,
                        callback: typeof callback === 'function' ? callback : null
                    });
                    if (cargo.saturated && tasks.length === payload) {
                        cargo.saturated();
                    }
                });
                async.nextTick(cargo.process);
            },
            process: function process() {
                if (working) return;
                if (tasks.length === 0) {
                    if(cargo.drain) cargo.drain();
                    return;
                }

                var ts = typeof payload === 'number'
                            ? tasks.splice(0, payload)
                            : tasks.splice(0);

                var ds = _map(ts, function (task) {
                    return task.data;
                });

                if(cargo.empty) cargo.empty();
                working = true;
                worker(ds, function () {
                    working = false;

                    var args = arguments;
                    _each(ts, function (data) {
                        if (data.callback) {
                            data.callback.apply(null, args);
                        }
                    });

                    process();
                });
            },
            length: function () {
                return tasks.length;
            },
            running: function () {
                return working;
            }
        };
        return cargo;
    };

    var _console_fn = function (name) {
        return function (fn) {
            var args = Array.prototype.slice.call(arguments, 1);
            fn.apply(null, args.concat([function (err) {
                var args = Array.prototype.slice.call(arguments, 1);
                if (typeof console !== 'undefined') {
                    if (err) {
                        if (console.error) {
                            console.error(err);
                        }
                    }
                    else if (console[name]) {
                        _each(args, function (x) {
                            console[name](x);
                        });
                    }
                }
            }]));
        };
    };
    async.log = _console_fn('log');
    async.dir = _console_fn('dir');
    /*async.info = _console_fn('info');
    async.warn = _console_fn('warn');
    async.error = _console_fn('error');*/

    async.memoize = function (fn, hasher) {
        var memo = {};
        var queues = {};
        hasher = hasher || function (x) {
            return x;
        };
        var memoized = function () {
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            var key = hasher.apply(null, args);
            if (key in memo) {
                callback.apply(null, memo[key]);
            }
            else if (key in queues) {
                queues[key].push(callback);
            }
            else {
                queues[key] = [callback];
                fn.apply(null, args.concat([function () {
                    memo[key] = arguments;
                    var q = queues[key];
                    delete queues[key];
                    for (var i = 0, l = q.length; i < l; i++) {
                      q[i].apply(null, arguments);
                    }
                }]));
            }
        };
        memoized.memo = memo;
        memoized.unmemoized = fn;
        return memoized;
    };

    async.unmemoize = function (fn) {
      return function () {
        return (fn.unmemoized || fn).apply(null, arguments);
      };
    };

    async.times = function (count, iterator, callback) {
        var counter = [];
        for (var i = 0; i < count; i++) {
            counter.push(i);
        }
        return async.map(counter, iterator, callback);
    };

    async.timesSeries = function (count, iterator, callback) {
        var counter = [];
        for (var i = 0; i < count; i++) {
            counter.push(i);
        }
        return async.mapSeries(counter, iterator, callback);
    };

    async.compose = function (/* functions... */) {
        var fns = Array.prototype.reverse.call(arguments);
        return function () {
            var that = this;
            var args = Array.prototype.slice.call(arguments);
            var callback = args.pop();
            async.reduce(fns, args, function (newargs, fn, cb) {
                fn.apply(that, newargs.concat([function () {
                    var err = arguments[0];
                    var nextargs = Array.prototype.slice.call(arguments, 1);
                    cb(err, nextargs);
                }]))
            },
            function (err, results) {
                callback.apply(that, [err].concat(results));
            });
        };
    };

    // AMD / RequireJS
    if (typeof define !== 'undefined' && define.amd) {
        define([], function () {
            return async;
        });
    }
    // Node.js
    else if (typeof module !== 'undefined' && module.exports) {
        module.exports = async;
    }
    // included directly via <script> tag
    else {
        root.async = async;
    }

}());

// node_modules/orgsync-javascript-api/orgsync-javascript-api.js
(function () {
  'use strict';

  var node = typeof window === 'undefined';

  var $ = node ? null : window.jQuery;
  var _ = node ? require('underscore') : window._;
  var superagent = node ? require('superagent') : window.superagent;

  var methods = ['get', 'post', 'patch', 'put', 'delete'];

  var OrgSyncApi = function (options) { _.extend(this, options); };

  _.extend(OrgSyncApi.prototype, {

    // https://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/
    cors: XMLHttpRequest && 'withCredentials' in new XMLHttpRequest(),

    urlRoot: 'http://mobile-staging.orgsync.com/user_api/v1',

    req: function (method, path, data, cb) {
      if (!cb) cb = data;
      if (!_.isObject(data)) data = {};
      if (this.key) data.key = this.key;
      var url = this.urlRoot + path;
      if (superagent && this.cors) {
        this.superagentReq(method, url, data, cb);
      }
      return this.jQueryReq(method, url, data, cb);
    },

    superagentReq: function (method, url, data, cb) {
      return superagent[method.toLowerCase()](url)
        .send(data)
        .end(function (er, res) {
          if (er) return cb(er, res);
          if (!res.ok) return cb(new Error(res.body.error), res);
          cb(null, res);
        });
    },

    jQueryReq: function (method, url, data, cb) {
      return $.ajax({
        type: this.cors ? method.toUpperCase() : 'GET',
        url: url,
        dataType: this.cors ? 'json': 'jsonp',
        contentType: 'application/json',
        data: data,
        success: function (res) {
          if (res.error) return cb(new Error(res.error));
          cb(null, res);
        },
        error: function (xhr) { cb(new Error(xhr.responseText)); }
      });
    },

    login: function (communityId, username, password, cb) {
      var self = this;
      this.post('/authentication/login', {
        device_info: 'OrgSync API JavaScript Client',
        community_id: communityId,
        username: username,
        password: password
      }, function (er, res) {
        if (er) return cb(er);
        self.key = res.body.key;
        cb(null, res);
      });
    }
  }, _.reduce(methods, function (obj, method) {
    obj[method] = function (path, data, cb) {
      return this.req(method, path, data, cb);
    };
    return obj;
  }, {}));

  node ? module.exports = OrgSyncApi : window.OrgSyncApi = OrgSyncApi;
})();

// bower_components/dpr/dpr.js
(function () {
  'use strict';

  var $ = window.jQuery || window.Zepto;

  // Define the namespace
  var dpr = window.dpr = function (arg) {

    // Return a formatted path if a path was given
    if (typeof arg === 'string') return format(arg);

    // Configure if arg is an object
    if (typeof arg === 'object') return config(arg);

    // Return the current DPR
    return get();
  };

  // Get the current DPR (I say current because it can actually change if a
  // window is dragged from, for example, a retina display to a standard 72 or
  // 92 ppi display)
  var get = function () {

    // Check support for devicePixelRatio and matchMedia
    var n = window.devicePixelRatio;
    var mm = window.matchMedia;

    // Use the fallback if neither DPR-finding method is supported
    if (!n || !mm) return dpr.fallback;

    // Remember the highest supported dpr
    var supported = dpr.supported;
    var best = null;
    var mdpr = 'min-device-pixel-ratio: ';

    // Iterate through the available DPRs and find the best match
    for (var i = 0, l = supported.length; i < l; ++i) {
      var check = supported[i];
      var mdprCheck = mdpr + check;

      // See if the DPR is >= what we can offer
      if (best === null || n >= check || mm &&
          mm(mdprCheck).matches ||
          mm('-webkit-' + mdprCheck).matches ||
          mm('-moz-' + mdprCheck).matches ||
          mm('-o-' + mdprCheck).matches ||
          mm('-ms-' + mdprCheck).matches) {
        best = check;

      // We've reached the limit
      } else {
        break;
      }
    }

    // `best` is the best available match
    return best;
  };

  // Format a path for the current dpr based on the set formatPattern
  var format = function (path) {
    var n = dpr();

    // If the DPR is 1 and formatOne is false, don't do anything to path
    if (n === 1 && !dpr.one) return path;

    // Otherwise, replace the necessary part of the path with the goods
    return path.replace(dpr.match, dpr.replace.replace(/#/, n));
  };

  // Scan the document for img[data-dpr-src] elements in need of the correct src
  // attribute
  dpr.scan = function ($el) {
    if (!$) return;
    $el || ($el = $(document));
    $('img[data-dpr-src]', $el).each(function () {
      var $self = $(this);
      var src = {src: dpr($self.data('dprSrc'))};
      $self.attr(src).removeAttr('data-dpr-src');
    });
  };

  // Define a configure method for easy option setting
  var config = function (options) {

    var scan = options.readyScan;

    // Turn readyScan on or off
    if (scan != dpr.readyScan && $) {
      $(document)[scan ? 'on' : 'off']('ready', dpr.scan);
    }

    // Apply the settings
    for (var name in options) dpr[name] = options[name];

    // Return the DPR object for chaining
    return dpr;
  };

  config({

    // These are the ratios we have images for. Sort ASC (i.e. [1, 1.5, 2])
    supported: [1, 2],

    // Specify a fallback for when the DPR cannot be determined. I assume 1 for
    // now, but maybe assume 2 in a couple years, when bandwidth/average DPR
    // increases, but for now be conservative.
    fallback: 1,

    // What part of the file do we want to replace?
    match: /(\..*)/,

    // How should filename alterations be formatted? (# is the dpr)
    replace: '-#x$1',

    // Should filenames with DPR of 1 be formatted?
    one: true,

    // Should dpr scan the document when the DOM is ready? (requires jQuery or
    // Zepto)
    readyScan: true
  });
})();

// bower_components/elementQuery/elementQuery.js
/*! elementQuery | Author: Tyson Matanich (http://matanich.com), 2013 | License: MIT */
(function (window, document, undefined) {
    // Enable strict mode
    "use strict";

    // Use Sizzle standalone or from jQuery
    var sizzle = window.Sizzle || jQuery.find;

    // Set the number of sizzle selectors to cache (default is 50)
    //sizzle.selectors.cacheLength = 50;

    var queryData = {};

    var addQueryDataValue = function (selector, type, pair, number, value) {

        selector = trim(selector);

        if (selector != "") {
            var parts;
            if (!number && !value) {
                parts = /^([0-9]*.?[0-9]+)(px|em)$/.exec(pair)
                if (parts != null) {
                    number = Number(parts[1]);
                    if (number + "" != "NaN") {
                        value = parts[2];
                    }
                }
            }

            if (value) {
                // Compile the sizzle selector
                if (sizzle.compile) {
                    sizzle.compile(selector);
                }

                // Update the queryData object
                if (queryData[selector] === undefined) {
                    queryData[selector] = {};
                }
                if (queryData[selector][type] === undefined) {
                    queryData[selector][type] = {};
                }
                queryData[selector][type][pair] = [number, value];
            }
        }
    };

    var updateQueryData = function (data, doUpdate) {

        var i, j, k;
        for (i in data) {
            for (j in data[i]) {
                if (typeof data[i][j] == "string") {
                    addQueryDataValue(i, j, data[i][j]);
                }
                else if (typeof data[i][j] == "object") {
                    for (k = 0; k < data[i][j].length; k++) {
                        addQueryDataValue(i, j, data[i][j][k]);
                    }
                }
            }
        }

        if (doUpdate == true) {
            refresh();
        }
    };


    // Refactor from jQuery.trim()
    var trim = function (text) {
        if (text == null) {
            return "";
        }
        else {
            var core_trim = "".trim;
            if (core_trim && !core_trim.call("\uFEFF\xA0")) {
                return core_trim.call(text);
            }
            else {
                return (text + "").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
            }
        }
    };

    // Refactor from jquery().addClass() and jquery().removeClass()
    var clean = function (element, attr) {
        // This expression is here for better compressibility
        var val = element.getAttribute(attr);
        return val ? (" " + val + " ").replace(/[\t\r\n]/g, " ") : " ";
    };

    // Refactor from jquery().addClass()
    var addTo = function (element, attr, value) {

        if (element.nodeType === 1) {
            var val = trim(value);
            if (val != "") {
                var cur = clean(element, attr);
                
                if (cur.indexOf(" " + val + " ") < 0) {
                    // Add the value if its not already there
                    element.setAttribute(attr, trim(cur + val));
                }
            }
        }
    };

    // Refactor from jquery().removeClass()
    var removeFrom = function (element, attr, value) {

        if (element.nodeType === 1) {
            var val = trim(value);
            if (val != "") {
                var cur = clean(element, attr);
                var updated = false;
                while (cur.indexOf(" " + val + " ") >= 0) {
                    // Remove the value
                    cur = cur.replace(" " + val + " ", " ");
                    updated = true;
                }
                if (updated) {
                    // Update the attribute
                    element.setAttribute(attr, trim(cur));
                }
            }
        }
    };

    var refresh = function () {

        var i, ei, j, k, elements, element, val;

        // For each selector
        for (i in queryData) {

            // Get the items matching the selector
            elements = sizzle(i);

            if (elements.length > 0) {

                // For each matching element
                for (ei = 0; ei < elements.length; ei++) {
                    element = elements[ei];

                    // For each min|max-width|height string
                    for (j in queryData[i]) {

                        // For each number px|em value pair
                        for (k in queryData[i][j]) {

                            val = queryData[i][j][k][0];

                            if (queryData[i][j][k][1] == "em") {
                                // Convert EMs to pixels
                                val = val * (window.getEmPixels ? getEmPixels(element) : 16); // NOTE: Using getEmPixels() has a small performance impact
                            }

                            /* NOTE: Using offsetWidth/Height so an element can be adjusted when it reaches a specific size.
                            /* For Nested queries scrollWidth/Height or clientWidth/Height may sometime be desired but are not supported. */

                            if ((j == "min-width" && element.offsetWidth >= val) ||
                                (j == "max-width" && element.offsetWidth <= val) ||
                                (j == "min-height" && element.offsetHeight >= val) ||
                                (j == "max-height" && element.offsetHeight <= val)) {
                                // Add matching attr value
                                addTo(element, j, k);
                            }
                            else {
                                // Remove non-matching attr value
                                removeFrom(element, j, k);
                            }
                        }
                    }
                }
            }
        }

        if (!window.addEventListener && window.attachEvent) {
            // Force a repaint in IE7 and IE8
            var className = document.documentElement.className;
            document.documentElement.className = " " + className;
            document.documentElement.className = className;
        }
    }

    // Expose some public functions
    window.elementQuery = function (arg1, arg2) {

        if (arg1 && typeof arg1 == "object" && !(arg1.cssRules || arg1.rules)) {
            // Add new selector queries
            updateQueryData(arg1, arg2);
        }
        else if (!arg1 && !arg2) {
            refresh();
        }
    };

    //NOTE: For development purposes only! Added stub to prevent errors.
    window.elementQuery.selectors = function () { };

    if (window.addEventListener) {
        window.addEventListener("resize", refresh, false);
        window.addEventListener("DOMContentLoaded", refresh, false);
        window.addEventListener("load", refresh, false);
    }
    else if (window.attachEvent) {
        window.attachEvent("onresize", refresh);
        window.attachEvent("onload", refresh);
    }
}(this, document, undefined));

/*! getEmPixels  | Author: Tyson Matanich (http://matanich.com), 2013 | License: MIT */
(function (document, documentElement) {
    // Enable strict mode
    "use strict";

    // Form the style on the fly to result in smaller minified file
    var important = "!important;";
    var style = "position:absolute" + important + "visibility:hidden" + important + "width:1em" + important + "font-size:1em" + important + "padding:0" + important;

    window.getEmPixels = function (element) {

        var extraBody;

        if (!element) {
            // Emulate the documentElement to get rem value (documentElement does not work in IE6-7)
            element = extraBody = document.createElement("body");
            extraBody.style.cssText = "font-size:1em" + important;
            documentElement.insertBefore(extraBody, document.body);
        }

        // Create and style a test element
        var testElement = document.createElement("i");
        testElement.style.cssText = style;
        element.appendChild(testElement);

        // Get the client width of the test element
        var value = testElement.clientWidth;

        if (extraBody) {
            // Remove the extra body element
            documentElement.removeChild(extraBody);
        }
        else {
            // Remove the test element
            element.removeChild(testElement);
        }

        // Return the em value in pixels
        return value;
    };
}(document, document.documentElement));

// node_modules/mustache/mustache.js
/*!
 * mustache.js - Logic-less {{mustache}} templates with JavaScript
 * http://github.com/janl/mustache.js
 */

/*global define: false*/

(function (root, factory) {
  if (typeof exports === "object" && exports) {
    factory(exports); // CommonJS
  } else {
    var mustache = {};
    factory(mustache);
    if (typeof define === "function" && define.amd) {
      define(mustache); // AMD
    } else {
      root.Mustache = mustache; // <script>
    }
  }
}(this, function (mustache) {

  var whiteRe = /\s*/;
  var spaceRe = /\s+/;
  var nonSpaceRe = /\S/;
  var eqRe = /\s*=/;
  var curlyRe = /\s*\}/;
  var tagRe = /#|\^|\/|>|\{|&|=|!/;

  // Workaround for https://issues.apache.org/jira/browse/COUCHDB-577
  // See https://github.com/janl/mustache.js/issues/189
  var RegExp_test = RegExp.prototype.test;
  function testRegExp(re, string) {
    return RegExp_test.call(re, string);
  }

  function isWhitespace(string) {
    return !testRegExp(nonSpaceRe, string);
  }

  var Object_toString = Object.prototype.toString;
  var isArray = Array.isArray || function (object) {
    return Object_toString.call(object) === '[object Array]';
  };

  function isFunction(object) {
    return typeof object === 'function';
  }

  function escapeRegExp(string) {
    return string.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
  }

  var entityMap = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': '&quot;',
    "'": '&#39;',
    "/": '&#x2F;'
  };

  function escapeHtml(string) {
    return String(string).replace(/[&<>"'\/]/g, function (s) {
      return entityMap[s];
    });
  }

  function escapeTags(tags) {
    if (!isArray(tags) || tags.length !== 2) {
      throw new Error('Invalid tags: ' + tags);
    }

    return [
      new RegExp(escapeRegExp(tags[0]) + "\\s*"),
      new RegExp("\\s*" + escapeRegExp(tags[1]))
    ];
  }

  /**
   * Breaks up the given `template` string into a tree of tokens. If the `tags`
   * argument is given here it must be an array with two string values: the
   * opening and closing tags used in the template (e.g. [ "<%", "%>" ]). Of
   * course, the default is to use mustaches (i.e. mustache.tags).
   *
   * A token is an array with at least 4 elements. The first element is the
   * mustache symbol that was used inside the tag, e.g. "#" or "&". If the tag
   * did not contain a symbol (i.e. {{myValue}}) this element is "name". For
   * all template text that appears outside a symbol this element is "text".
   *
   * The second element of a token is its "value". For mustache tags this is
   * whatever else was inside the tag besides the opening symbol. For text tokens
   * this is the text itself.
   *
   * The third and fourth elements of the token are the start and end indices
   * in the original template of the token, respectively.
   *
   * Tokens that are the root node of a subtree contain two more elements: an
   * array of tokens in the subtree and the index in the original template at which
   * the closing tag for that section begins.
   */
  function parseTemplate(template, tags) {
    tags = tags || mustache.tags;
    template = template || '';

    if (typeof tags === 'string') {
      tags = tags.split(spaceRe);
    }

    var tagRes = escapeTags(tags);
    var scanner = new Scanner(template);

    var sections = [];     // Stack to hold section tokens
    var tokens = [];       // Buffer to hold the tokens
    var spaces = [];       // Indices of whitespace tokens on the current line
    var hasTag = false;    // Is there a {{tag}} on the current line?
    var nonSpace = false;  // Is there a non-space char on the current line?

    // Strips all whitespace tokens array for the current line
    // if there was a {{#tag}} on it and otherwise only space.
    function stripSpace() {
      if (hasTag && !nonSpace) {
        while (spaces.length) {
          delete tokens[spaces.pop()];
        }
      } else {
        spaces = [];
      }

      hasTag = false;
      nonSpace = false;
    }

    var start, type, value, chr, token, openSection;
    while (!scanner.eos()) {
      start = scanner.pos;

      // Match any text between tags.
      value = scanner.scanUntil(tagRes[0]);
      if (value) {
        for (var i = 0, len = value.length; i < len; ++i) {
          chr = value.charAt(i);

          if (isWhitespace(chr)) {
            spaces.push(tokens.length);
          } else {
            nonSpace = true;
          }

          tokens.push(['text', chr, start, start + 1]);
          start += 1;

          // Check for whitespace on the current line.
          if (chr === '\n') {
            stripSpace();
          }
        }
      }

      // Match the opening tag.
      if (!scanner.scan(tagRes[0])) break;
      hasTag = true;

      // Get the tag type.
      type = scanner.scan(tagRe) || 'name';
      scanner.scan(whiteRe);

      // Get the tag value.
      if (type === '=') {
        value = scanner.scanUntil(eqRe);
        scanner.scan(eqRe);
        scanner.scanUntil(tagRes[1]);
      } else if (type === '{') {
        value = scanner.scanUntil(new RegExp('\\s*' + escapeRegExp('}' + tags[1])));
        scanner.scan(curlyRe);
        scanner.scanUntil(tagRes[1]);
        type = '&';
      } else {
        value = scanner.scanUntil(tagRes[1]);
      }

      // Match the closing tag.
      if (!scanner.scan(tagRes[1])) {
        throw new Error('Unclosed tag at ' + scanner.pos);
      }

      token = [ type, value, start, scanner.pos ];
      tokens.push(token);

      if (type === '#' || type === '^') {
        sections.push(token);
      } else if (type === '/') {
        // Check section nesting.
        openSection = sections.pop();

        if (!openSection) {
          throw new Error('Unopened section "' + value + '" at ' + start);
        }
        if (openSection[1] !== value) {
          throw new Error('Unclosed section "' + openSection[1] + '" at ' + start);
        }
      } else if (type === 'name' || type === '{' || type === '&') {
        nonSpace = true;
      } else if (type === '=') {
        // Set the tags for the next time around.
        tagRes = escapeTags(tags = value.split(spaceRe));
      }
    }

    // Make sure there are no open sections when we're done.
    openSection = sections.pop();
    if (openSection) {
      throw new Error('Unclosed section "' + openSection[1] + '" at ' + scanner.pos);
    }

    return nestTokens(squashTokens(tokens));
  }

  /**
   * Combines the values of consecutive text tokens in the given `tokens` array
   * to a single token.
   */
  function squashTokens(tokens) {
    var squashedTokens = [];

    var token, lastToken;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      if (token) {
        if (token[0] === 'text' && lastToken && lastToken[0] === 'text') {
          lastToken[1] += token[1];
          lastToken[3] = token[3];
        } else {
          squashedTokens.push(token);
          lastToken = token;
        }
      }
    }

    return squashedTokens;
  }

  /**
   * Forms the given array of `tokens` into a nested tree structure where
   * tokens that represent a section have two additional items: 1) an array of
   * all tokens that appear in that section and 2) the index in the original
   * template that represents the end of that section.
   */
  function nestTokens(tokens) {
    var nestedTokens = [];
    var collector = nestedTokens;
    var sections = [];

    var token, section;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      switch (token[0]) {
      case '#':
      case '^':
        collector.push(token);
        sections.push(token);
        collector = token[4] = [];
        break;
      case '/':
        section = sections.pop();
        section[5] = token[2];
        collector = sections.length > 0 ? sections[sections.length - 1][4] : nestedTokens;
        break;
      default:
        collector.push(token);
      }
    }

    return nestedTokens;
  }

  /**
   * A simple string scanner that is used by the template parser to find
   * tokens in template strings.
   */
  function Scanner(string) {
    this.string = string;
    this.tail = string;
    this.pos = 0;
  }

  /**
   * Returns `true` if the tail is empty (end of string).
   */
  Scanner.prototype.eos = function () {
    return this.tail === "";
  };

  /**
   * Tries to match the given regular expression at the current position.
   * Returns the matched text if it can match, the empty string otherwise.
   */
  Scanner.prototype.scan = function (re) {
    var match = this.tail.match(re);

    if (match && match.index === 0) {
      var string = match[0];
      this.tail = this.tail.substring(string.length);
      this.pos += string.length;
      return string;
    }

    return "";
  };

  /**
   * Skips all text until the given regular expression can be matched. Returns
   * the skipped string, which is the entire tail if no match can be made.
   */
  Scanner.prototype.scanUntil = function (re) {
    var index = this.tail.search(re), match;

    switch (index) {
    case -1:
      match = this.tail;
      this.tail = "";
      break;
    case 0:
      match = "";
      break;
    default:
      match = this.tail.substring(0, index);
      this.tail = this.tail.substring(index);
    }

    this.pos += match.length;

    return match;
  };

  /**
   * Represents a rendering context by wrapping a view object and
   * maintaining a reference to the parent context.
   */
  function Context(view, parentContext) {
    this.view = view == null ? {} : view;
    this.cache = { '.': this.view };
    this.parent = parentContext;
  }

  /**
   * Creates a new context using the given view with this context
   * as the parent.
   */
  Context.prototype.push = function (view) {
    return new Context(view, this);
  };

  /**
   * Returns the value of the given name in this context, traversing
   * up the context hierarchy if the value is absent in this context's view.
   */
  Context.prototype.lookup = function (name) {
    var value;
    if (name in this.cache) {
      value = this.cache[name];
    } else {
      var context = this;

      while (context) {
        if (name.indexOf('.') > 0) {
          value = context.view;

          var names = name.split('.'), i = 0;
          while (value != null && i < names.length) {
            value = value[names[i++]];
          }
        } else {
          value = context.view[name];
        }

        if (value != null) break;

        context = context.parent;
      }

      this.cache[name] = value;
    }

    if (isFunction(value)) {
      value = value.call(this.view);
    }

    return value;
  };

  /**
   * A Writer knows how to take a stream of tokens and render them to a
   * string, given a context. It also maintains a cache of templates to
   * avoid the need to parse the same template twice.
   */
  function Writer() {
    this.cache = {};
  }

  /**
   * Clears all cached templates in this writer.
   */
  Writer.prototype.clearCache = function () {
    this.cache = {};
  };

  /**
   * Parses and caches the given `template` and returns the array of tokens
   * that is generated from the parse.
   */
  Writer.prototype.parse = function (template, tags) {
    if (!(template in this.cache)) {
      this.cache[template] = parseTemplate(template, tags);
    }

    return this.cache[template];
  };

  /**
   * High-level method that is used to render the given `template` with
   * the given `view`.
   *
   * The optional `partials` argument may be an object that contains the
   * names and templates of partials that are used in the template. It may
   * also be a function that is used to load partial templates on the fly
   * that takes a single argument: the name of the partial.
   */
  Writer.prototype.render = function (template, view, partials) {
    var tokens = this.parse(template);
    var context = (view instanceof Context) ? view : new Context(view);
    return this.renderTokens(tokens, context, partials, template);
  };

  /**
   * Low-level method that renders the given array of `tokens` using
   * the given `context` and `partials`.
   *
   * Note: The `originalTemplate` is only ever used to extract the portion
   * of the original template that was contained in a higher-order section.
   * If the template doesn't use higher-order sections, this argument may
   * be omitted.
   */
  Writer.prototype.renderTokens = function (tokens, context, partials, originalTemplate) {
    var buffer = '';

    // This function is used to render an arbitrary template
    // in the current context by higher-order sections.
    var self = this;
    function subRender(template) {
      return self.render(template, context, partials);
    }

    var token, value;
    for (var i = 0, len = tokens.length; i < len; ++i) {
      token = tokens[i];

      switch (token[0]) {
      case '#':
        value = context.lookup(token[1]);
        if (!value) continue;

        if (isArray(value)) {
          for (var j = 0, jlen = value.length; j < jlen; ++j) {
            buffer += this.renderTokens(token[4], context.push(value[j]), partials, originalTemplate);
          }
        } else if (typeof value === 'object' || typeof value === 'string') {
          buffer += this.renderTokens(token[4], context.push(value), partials, originalTemplate);
        } else if (isFunction(value)) {
          if (typeof originalTemplate !== 'string') {
            throw new Error('Cannot use higher-order sections without the original template');
          }

          // Extract the portion of the original template that the section contains.
          value = value.call(context.view, originalTemplate.slice(token[3], token[5]), subRender);

          if (value != null) buffer += value;
        } else {
          buffer += this.renderTokens(token[4], context, partials, originalTemplate);
        }

        break;
      case '^':
        value = context.lookup(token[1]);

        // Use JavaScript's definition of falsy. Include empty arrays.
        // See https://github.com/janl/mustache.js/issues/186
        if (!value || (isArray(value) && value.length === 0)) {
          buffer += this.renderTokens(token[4], context, partials, originalTemplate);
        }

        break;
      case '>':
        if (!partials) continue;
        value = this.parse(isFunction(partials) ? partials(token[1]) : partials[token[1]]);
        if (value != null) buffer += this.renderTokens(value, context, partials, originalTemplate);
        break;
      case '&':
        value = context.lookup(token[1]);
        if (value != null) buffer += value;
        break;
      case 'name':
        value = context.lookup(token[1]);
        if (value != null) buffer += mustache.escape(value);
        break;
      case 'text':
        buffer += token[1];
        break;
      }
    }

    return buffer;
  };

  mustache.name = "mustache.js";
  mustache.version = "0.8.0";
  mustache.tags = [ "{{", "}}" ];

  // All high-level mustache.* functions use this writer.
  var defaultWriter = new Writer();

  /**
   * Clears all cached templates in the default writer.
   */
  mustache.clearCache = function () {
    return defaultWriter.clearCache();
  };

  /**
   * Parses and caches the given template in the default writer and returns the
   * array of tokens it contains. Doing this ahead of time avoids the need to
   * parse templates on the fly as they are rendered.
   */
  mustache.parse = function (template, tags) {
    return defaultWriter.parse(template, tags);
  };

  /**
   * Renders the `template` with the given `view` and `partials` using the
   * default writer.
   */
  mustache.render = function (template, view, partials) {
    return defaultWriter.render(template, view, partials);
  };

  // This is here for backwards compatibility with 0.4.x.
  mustache.to_html = function (template, view, partials, send) {
    var result = mustache.render(template, view, partials);

    if (isFunction(send)) {
      send(result);
    } else {
      return result;
    }
  };

  // Export the escaping function so that the user may override it.
  // See https://github.com/janl/mustache.js/issues/244
  mustache.escape = escapeHtml;

  // Export these mainly for testing, but also for advanced usage.
  mustache.Scanner = Scanner;
  mustache.Context = Context;
  mustache.Writer = Writer;

}));

// orgsync-widgets.js
(function () {
  'use strict';

  var $ = window.jQuery;
  var _ = window._;
  var dpr = window.dpr;
  var herit = window.herit;
  var jstz = window.jstz;
  var moment = window.moment;
  var Olay = window.Olay;

  // Define our global namespace.
  var app = window.OrgSyncWidgets = {
    api: new window.OrgSyncApi({cors: false}),

    // Views will add themselves to this map with their corresponding selectors.
    // i.e. {'.js-osw-index-portals': app.IndexPortalsView}
    selectorViewMap: {},

    // In the ready function, run through the selectorViewMap and initialize
    // views accordingly.
    ready: function () {
      $('html').addClass('dpr-' + dpr());
      _.each(app.selectorViewMap, function (view, selector) {
        $(selector).each(function () { new view({el: this}); });
      });
    },

    // Only calculate the current timezone name once.
    tz: jstz.determine().name()
  };

  window.Olay = herit(window.Olay, {
    constructor: function () {
      Olay.apply(this, arguments);
      this.$content.addClass('orgsync-widget');
    }
  });

  // Tell elementQuery to keep track of sizes for `.orgsync-widget`s
  window.elementQuery({
    '.orgsync-widget': {
      'min-width': [
        '231px',
        '251px',
        '401px',
        '461px',
        '480px',
        '501px',
        '640px',
        '691px',
        '751px',
        '800px',
        '921px',
        '960px',
        '1001px'
      ]
    }
  });

  // Fixing the updateOffset method for some wonky DST issues.
  moment.updateOffset = function (date) {
    if (!date._z) return;
    var delta = date.zone();
    var offset = date._z.offset(date);
    if (!(delta -= offset)) return;
    date.zone(offset);
    if (Math.abs(delta) <= 60) date.subtract('minutes', delta);
  };

  // Run the app's ready function when the DOM is parsed.
  $(app.ready);
})();

// models/model.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var _ = window._;
  var async = window.async;
  var Backbone = window.Backbone;

  var Model = app.Model = Backbone.Model.extend({
    constructor: function () {
      this.constructor.relations();
      Backbone.Model.apply(this, arguments);
    },

    sync: function (method, model, options) {
      var url = _.result(model, 'url');
      var data = options.data;
      return app.api.get(url, data, function (er, res) {
        if (er || res.error) {
          options.error(er || res.error);
          return model.trigger('error');
        }
        options.success(res.data);
        model.trigger('sync');
      });
    }
  }, {
    relations: function () {
      if (this._relations) return this._relations;
      var relations = _.result(this.prototype, 'relations');
      if (!relations) return this._relations = {};
      if (_.isFunction(this.prototype.relations)) {
        return this._relations = this.prototype.relations = relations;
      }
      relations = _.reduce(relations, function (rels, rel, key) {
        var Model = app[rel.hasOne || rel.hasMany];
        if (rel.hasOne) rel.hasOne = Model;
        if (rel.hasMany) rel.hasMany = Model.Collection;
        if (!rel.via) {
          var complement = Model.prototype.relations;
          var hasOne = !rel.hasOne;
          var fk = rel.fk;
          rel.reverse = _.reduce(complement, function (reverse, rel, key) {
            if (!rel.via && hasOne !== !rel.hasOne && fk === rel.fk) return key;
            return reverse;
          }, null);
        }
        rels[key] = rel;
        return rels;
      }, {});
      return this._relations = this.prototype.relations = relations;
    }
  });

  Model.Collection = Backbone.Collection.extend({
    model: Model,

    sync: Model.prototype.sync,

    pagedFetch: function (options) {
      options = options ? _.clone(options) : {};
      var limit = options.limit || Infinity;
      var page = 0;
      var perPage = options.per_page || 100;
      var data = options.data || {};
      var success = options.success || function () {};
      var error = options.error || function () {};
      delete options.success;
      delete options.error;
      var self = this;
      var length = -1;
      async.whilst(
        function () {
          var l = self.length;
          return !(length === l || (length = l) >= limit || length % perPage);
        },
        function (cb) {
          self.fetch({
            data: _.extend({
              page: ++page,
              per_page: perPage
            }, data),
            remove: false,
            success: _.bind(cb, null, null),
            error: error
          });
        },
        function () {
          length = self.length;
          if (limit && length > limit) self.remove(self.last(length - limit));
          if (success) success(self, self.models, options);
        }
      );
    }
  });
})();

// models/account.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var Model = app.Model;

  var Account = app.Account = Model.extend({});

  Account.Collection = Model.Collection.extend({
    model: Account
  });
})();

// models/album.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var Model = app.Model;

  var Album = app.Album = Model.extend({
    relations: {
      portal: {hasOne: 'Portal', fk: 'portal_id'},
      photos: {hasMany: 'Photo', fk: 'album_id'}
    },

    orgsyncUrl: function () {
      return 'https://orgsync.com/' + this.get('portal').id +
        '/photos/albums/' + this.id;
    }
  });

  Album.Collection = Model.Collection.extend({
    model: Album
  });
})();

// models/category.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var Model = app.Model;

  var Category = app.Category = Model.extend({
    relations: {
      portals: {hasMany: 'Portal', fk: 'category_id'}
    }
  });

  Category.Collection = Model.Collection.extend({
    model: Category,

    comparator: 'name'
  });
})();

// models/comment.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var Model = app.Model;
  var moment = window.moment;

  var Comment = app.Comment = Model.extend({
    relations: {
      'creator': {hasOne: 'Account', fk: 'creator_id'}
    },

    time: function () {
      return moment(this.get('created_at')).fromNow();
    },
  });

  Comment.Collection = Model.Collection.extend({
    model: Comment
  });
})();

// models/community.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var Model = app.Model;

  var Community = app.Community = Model.extend({
    relations: {
      portals: {hasMany: 'Portal', fk: 'community_id'},
      umbrellas: {hasMany: 'Portal', fk: 'community_id'},
      categories: {hasMany: 'Category', fk: 'community_id'},
      events: {hasMany: 'Event', via: 'portals', fk: 'portal_id'}
    },
    urlRoot: '/communities'
  });

  Community.Collection = Model.Collection.extend({
    model: Community,

    url: '/communities'
  });
})();

// models/day.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var Model = app.Model;
  var moment = window.moment;

  var Day = app.Day = Model.extend({
    relations: {
      eventDates: {hasMany: 'EventDate', fk: 'day_id'},
      events: {hasMany: 'Event', via: 'eventDates#event', fk: 'event_id'}
    },

    defaults: {
      tz: app.tz,
      visible: true,
      fetched: 0
    },

    initialize: function () {
      this.listenTo(this.get('eventDates'), {
        add: function (eventDate) {
          this.setVisible();
          this.listenTo(
            eventDate.get('event'),
            'change:visible',
            this.setVisible
          );
        },
        remove: function (eventDate) {
          this.setVisible();
          this.stopListening(
            eventDate.get('event'),
            'change:visible',
            this.setVisible
          );
        }
      });
    },

    date: function () {
      return this._date || (this._date = moment.tz(this.id, this.get('tz')));
    },

    setVisible: function () {
      this.set('visible', this.get('eventDates').any(function (eventDate) {
        return !eventDate.get('filler') &&
          eventDate.get('event').get('visible');
      }));
    }
  }, {
    id: function (date) { return date.format('YYYY-MM-DD'); }
  });

  Day.Collection = Model.Collection.extend({
    model: Day,

    comparator: 'id',

    tz: app.tz,

    addEvents: function (events) {
      events.each(this.addEvent, this);
    },

    addEvent: function (event) {
      this.addEventDates(event.get('dates'), this);
    },

    addEventDates: function (eventDates) {
      eventDates.each(this.addEventDate, this);
    },

    addEventDate: function (eventDate) {
      var tz = this.tz;
      eventDate.set('tz', tz);
      var start = eventDate.start().clone().startOf('day');
      var end = eventDate.end();
      do {
        var id = Day.id(start);
        var day = this.get(id);
        if (!day) this.add((day = new Day({id: id})).set('tz', tz));
        day.get('eventDates').add(eventDate);
      } while (start.add('days', 1).isBefore(end));
    },

    fill: function (from, to, fetched) {

      // Hold days to be added in an array before actually adding them. This
      // saves the extra computation that is needed in Backbone's
      // Collection#set.
      var days = [];
      var tz = this.tz;

      // Fill in all gaps between the from and to days.
      from = from.clone();
      do {
        var id = Day.id(from);
        var day = this.get(id);
        if (day) {
          if (fetched && from.isBefore(to)) day.set('fetched', Infinity);
          continue;
        }
        days.push({id: id, tz: tz, fetched: fetched ? Infinity : 0});
      } while (!from.add('day', 1).isAfter(to));

      // Finally, add the new days.
      this.add(days);
    }
  });
})();

// models/event-date.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var Model = app.Model;
  var moment = window.moment;

  var EventDate = app.EventDate = Model.extend({
    relations: {
      event: {hasOne: 'Event', fk: 'event_id'}
    },

    defaults: {
      tz: app.tz
    },

    initialize: function () {

      // When the timezone changes, we need to destroy the cached starts and
      // ends moment instances so they can be regenerated with their new time.
      this.on('change:tz', function () {
        delete this._starts_at;
        delete this._ends_at;
      });
    },

    start: function () { return this.normalize('starts_at'); },

    end: function () { return this.normalize('ends_at'); },

    normalize: function (which) {
      var key = '_' + which;
      if (this[key]) return this[key];
      var date = moment(this.get(which));
      var tz = this.get('tz');
      if (!this.get('event').get('is_all_day')) return date.tz(tz);

      // HACK: Until event occurrences is out, this is necessary for any
      // duration calculation to work as all day events return the same
      // starts_at and ends_at. This can be removed in the future (hopefully).
      if (which === 'ends_at') date.add('days', 1);

      // All day events should always be midnight to midnight in the timezone
      // they are being viewed in, regardless of the time zone they were created
      // in.
      return this[key] = moment.tz(app.Day.id(date), tz);
    },

    isMultiDay: function () {
      var startDay = this.start().clone().startOf('day');
      return startDay.add('days', 1).isBefore(this.end());
    },

    shortTime: function () {
      if (this.get('event').get('is_all_day')) return 'all day';
      if (!this.continued) return this.shortTimeFormat(this.start());
      if (this.continues) return 'all day';
      return 'ends ' + this.shortTimeFormat(this.end());
    },

    shortTimeFormat: function (date) {
      return date.format('h:mma').replace(':00', '').replace('m', '');
    },

    longTime: function () {
      var start = this.start();
      var end = this.end();
      var allDay = this.get('event').get('is_all_day');
      var multiDay = this.isMultiDay();
      if (!multiDay && allDay) return 'All Day';
      var format = allDay ? '[All Day]' : 'LT';
      if (multiDay) format += ', MMM D';
      return start.format(format) + ' to ' + end.format(format);
    }
  });

  EventDate.Collection = Model.Collection.extend({
    model: EventDate,

    comparator: function (eventDate) { return eventDate.start(); }
  });
})();

// models/event-filter.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var Model = app.Model;

  var EventFilter = app.EventFilter = Model.extend({
    defaults: {
      enabled: true
    },

    hex: function (scale) {
      var hex = this.get('color');
      if (scale) {
        var n = parseInt(hex, '16');
        var r = (n >> 16) & 0xFF;
        r += Math.floor((scale > 0 ? (255 - r) : r) * scale);
        var g = (n >> 8) & 0xFF;
        g += Math.floor((scale > 0 ? (255 - g) : g) * scale);
        var b = n & 0xFF;
        b += Math.floor((scale > 0 ? (255 - b) : b) * scale);
        n = (r << 16) + (g << 8) + b;
        hex = n.toString(16);
      }
      while (hex.length < 6) hex = '0' + hex;
      return hex;
    }
  });

  EventFilter.Collection = Model.Collection.extend({
    model: EventFilter,

    comparator: 'name'
  });
})();

// models/event.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var _ = window._;
  var Model = app.Model;

  // NOTE: Temp data while endpoint is created.
  var tags = [{
    id: "umbrella-1",
    name: "Student Life",
    color: "FF0000"
  }, {
    id: "umbrella-2",
    name: "Rec Sports",
    color: "00FF00"
  }, {
    id: "umbrella-3",
    name: "Frat Life",
    color: "0000FF"
  }];


  var Event = app.Event = Model.extend({
    relations: {
      portal: {hasOne: 'Portal', fk: 'portal_id'},
      creator: {hasOne: 'Account', fk: 'creator_id'},
      dates: {hasMany: 'EventDate', fk: 'event_id'},
      comments: {hasMany: 'Comment', fk: 'event_id'},
      tags: {hasMany: 'EventFilter'}
    },

    // NOTE: Temp defaults until response returns `tags`.
    defaults: function () {
      return {visible: true, tags: _.sample(tags)};
    },

    searchableWords: function () {
      if (this._searchableWords) return this._searchableWords;
      return this._searchableWords = _.str.words(_.values(
        this.pick('title', 'description', 'location')
      ).join(' ').toLowerCase());
    },

    matchesQuery: function (query) {
      if (!query) return true;
      var words = _.str.words(query.toLowerCase());
      var searchableWords = this.searchableWords();
      return _.every(words, function (wordA) {
        return _.any(searchableWords, function (wordB) {
          return _.str.startsWith(wordB, wordA);
        });
      });
    },

    matchesEventFilters: function (eventFilters) {
      if (!eventFilters.length) return true;
      var tags = this.get('tags');
      return eventFilters.any(function (eventFilter) {
        return eventFilter.get('enabled') && tags.get(eventFilter);
      }, this);
    },

    hex: function (scale) {
      return this.get('tags').first().hex(scale);
    },

    parse: function (data) {
      data.dates = this.get('dates').models.concat(data.dates);
      return data;
    },

    orgsyncUrl: function (eventDate) {
      var url = 'https://orgsync.com/' + this.get('portal').id +
        '/events/' + this.id;
      if (eventDate) url += '?date=' + eventDate.start().format('YYYY-MM-DD');
      return url;
    }
  });

  Event.Collection = Model.Collection.extend({
    model: Event,

    comparator: 'name'
  });
})();

// models/news-post.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var $ = window.jQuery;
  var Model = app.Model;
  var moment = window.moment;

  var NewsPost = app.NewsPost = Model.extend({
    relations: {
      portal: {hasOne: 'Portal', fk: 'portal_id'},
      creator: {hasOne: 'Account', fk: 'creator_id'},
      comments: {hasMany: 'Comment', fk: 'news_post_id'}
    },

    orgsyncUrl: function () {
      return 'https://orgsync.com/' + this.get('portal').id + '/news_posts/' +
        this.id;
    },

    time: function () {
      return moment(this.get('created_at')).fromNow();
    },

    strippedBody: function () {
      return $($.parseHTML(this.get('body'))).text();
    },

    truncatedBody: function (length) {
      var body = this.strippedBody();
      var ellipsis = '...';
      var max = length - ellipsis.length;
      if (!length || body.length <= max) return body;
      return body.substring(0, max).replace(/[\s,.;]+\S*$/, '') + ellipsis;
    }
  });

  NewsPost.Collection = Model.Collection.extend({
    model: NewsPost
  });
})();

// models/photo.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var Model = app.Model;

  var Photo = app.Photo = Model.extend({
    relations: {
      album: {hasOne: 'Album', fk: 'album_id'},
      comments: {hasMany: 'Comment', fk: 'photo_id'}
    },

    orgsyncUrl: function () {
      return this.get('album').orgsyncUrl() + '/photo/' + this.id;
    }
  });

  Photo.Collection = Model.Collection.extend({
    model: Photo
  });
})();

// models/portal.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var _ = window._;
  var Model = app.Model;

  var Portal = app.Portal = Model.extend({
    relations: {
      umbrella: {hasOne: 'Portal', fk: 'umbrella_id'},
      category: {hasOne: 'Category', fk: 'category_id'},
      albums: {hasMany: 'Album', fk: 'portal_id'},
      newsPosts: {hasMany: 'NewsPost', fk: 'portal_id', urlRoot: '/news'},
      events: {hasMany: 'Event', fk: 'portal_id'}
    },

    defaultPicture: 'https://orgsync.com/assets/no_org_profile_150.png',

    urlRoot: '/portals',

    searchableWords: function () {
      if (this._searchableWords) return this._searchableWords;
      return this._searchableWords = _.str.words(_.values(
        this.pick('name', 'short_name', 'keywords')
      ).join(' ').toLowerCase());
    },

    matchesQuery: function (query) {
      if (!query) return true;
      var words = _.str.words(query.toLowerCase());
      var searchableWords = this.searchableWords();
      return _.every(words, function (wordA) {
        return _.any(searchableWords, function (wordB) {
          return _.str.startsWith(wordB, wordA);
        });
      });
    },

    picture: function () {
      return this.get('picture_url') || this.defaultPicture;
    },

    orgsyncUrl: function () {
      return 'https://orgsync.com/' + this.id + '/chapter';
    },

    isUmbrella: function () {
      var id = this.get('umbrella').id;
      return !id || id === this.id;
    },

    umbrellaName: function () {
      return this.isUmbrella() ? 'Umbrella' : this.get('umbrella').get('name');
    }
  });

  Portal.Collection = Model.Collection.extend({
    model: Portal,

    url: '/portals',

    comparator: function (a, b) {
      var aName = (a.get('name') || '').toLowerCase();
      var bName = (b.get('name') || '').toLowerCase();
      var aIsUmbrella = a.isUmbrella();
      var bIsUmbrella = b.isUmbrella();
      if (aIsUmbrella === bIsUmbrella) return aName < bName ? -1 : 1;
      return aIsUmbrella ? -1 : 1;
    }
  });
})();

// jst/albums/index/index.mustache
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('jst/albums/index/index', [], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    (root.JST || (root.JST = {}))['jst/albums/index/index'] = factory();
  }
})(this, function () {
  return (function () {
  var source = "<ol class='js-list list' aria-live='assertive'></ol>\n";
  var fn = function (data, partials) {
    return Mustache.render(source, data, partials);
  };
  fn.source = source;
  return fn;
})();
});

// jst/albums/index/list-item.mustache
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('jst/albums/index/list-item', [], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    (root.JST || (root.JST = {}))['jst/albums/index/list-item'] = factory();
  }
})(this, function () {
  return (function () {
  var source = "<a href='{{model.orgsyncUrl}}' tabindex='1'>\n  <div class='image-container'>\n    <img src='{{model.attributes.cover_photo}}'>\n  </div>\n  <div class='name'>{{model.attributes.name}}</div>\n  <div class='count'>{{model.attributes.photo_count}}</div>\n</a>\n";
  var fn = function (data, partials) {
    return Mustache.render(source, data, partials);
  };
  fn.source = source;
  return fn;
})();
});

// jst/comments/show.tmpl
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('jst/comments/show', [], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    (root.JST || (root.JST = {}))['jst/comments/show'] = factory();
  }
})(this, function () {
  return function(o){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='';

var creator = o.model.get('creator');
var src = creator.get('picture_url');

__p+='\n<div class=\'picture\'>';
 if (src) { 
__p+='<img src=\''+
((__t=( src ))==null?'':_.escape(__t))+
'\'>';
 } 
__p+='</div>\n<div class=\'info\'>\n  <div class=\'name\'>'+
((__t=( creator.get('display_name') ))==null?'':_.escape(__t))+
'</div>\n  <div class=\'time\'>'+
((__t=( o.model.time() ))==null?'':_.escape(__t))+
'</div>\n  <div class=\'content\'>'+
((__t=( o.model.get('content') ))==null?'':_.escape(__t))+
'</div>\n</div>\n';
return __p;
};
});

// jst/days/show.tmpl
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('jst/days/show', [], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    (root.JST || (root.JST = {}))['jst/days/show'] = factory();
  }
})(this, function () {
  return function(o){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class=\'js-long-date long-date\'>'+
((__t=( o.longDate() ))==null?'':_.escape(__t))+
'</div>\n<div\n  class=\'js-short-date short-date js-jump-to\'\n  data-date=\''+
((__t=( o.model.date().format('YYYY-MM-DD') ))==null?'':__t)+
'\'>\n  '+
((__t=( o.shortDate() ))==null?'':_.escape(__t))+
'\n</div>\n<ol class=\'js-event-dates-list event-dates-list\'></ol>\n';
return __p;
};
});

// jst/event-dates/show.tmpl
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('jst/event-dates/show', [], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    (root.JST || (root.JST = {}))['jst/event-dates/show'] = factory();
  }
})(this, function () {
  return function(o){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='';

var event = o.model.get('event');
var thumbnailUrl = event.get('thumbnail_url');
var title = o.model.get('filler') ? '&nbsp;' : _.escape(event.get('title'));

__p+='\n<div class=\'picture-container\'>\n  ';
 if (thumbnailUrl) { 
__p+='<img src=\''+
((__t=( thumbnailUrl ))==null?'':_.escape(__t))+
'\'>';
 } 
__p+='\n</div>\n<div class=\'info\'>\n  <div class=\'short-time\'>'+
((__t=( o.model.shortTime() ))==null?'':_.escape(__t))+
'</div>\n  <div class=\'title\'>'+
((__t=( title ))==null?'':__t)+
'</div>\n  <div class=\'long-time\'>'+
((__t=( o.model.longTime() ))==null?'':_.escape(__t))+
'</div>\n  <div class=\'location\'>'+
((__t=( event.get('location') ))==null?'':_.escape(__t))+
'</div>\n</div>\n';
return __p;
};
});

// jst/event-filters/show.mustache
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('jst/event-filters/show', [], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    (root.JST || (root.JST = {}))['jst/event-filters/show'] = factory();
  }
})(this, function () {
  return (function () {
  var source = "<input type='checkbox' class='js-enabled enabled' checked\n>{{model.attributes.name}}\n";
  var fn = function (data, partials) {
    return Mustache.render(source, data, partials);
  };
  fn.source = source;
  return fn;
})();
});

// jst/events/index/index.tmpl
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('jst/events/index/index', [], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    (root.JST || (root.JST = {}))['jst/events/index/index'] = factory();
  }
})(this, function () {
  return function(o){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class=\'js-event-filters event-filters\'>\n  <input class=\'js-search-input search-input\' placeholder=\'Search Events\'>\n  <ol class=\'js-event-filters-list event-filters-list\'></ol>\n</div\n><div class=\'main\'>\n  <div class=\'top\'>\n    <div class=\'js-tz tz\'>'+
((__t=( o.tzDisplay() ))==null?'':_.escape(__t))+
'</div>\n    <div class=\'month-year\'>\n      <div class=\'left-buttons\'>\n        <span class=\'js-toggle-filters toggle-filters\'></span>\n      </div>\n      <div class=\'right-buttons\'>\n        <span class=\'js-today today\'>Today</span\n        >\n        View as:\n        <span class=\'js-change-view change-view\' data-view=\'list\'>List</span>\n        |\n        <span class=\'js-change-view change-view\' data-view=\'month\'>Month</span>\n      </div>\n      <span class=\'js-prev-month prev-month\'>&lt;</span\n      ';
 var date = o.date(); 
__p+='\n      ><select class=\'js-month month\'>\n        ';
 _.each(_.range(0, 12), function (month) { 
__p+='\n        <option value=\''+
((__t=( month ))==null?'':__t)+
'\'>\n          '+
((__t=( date.month(month).format('MMMM') ))==null?'':__t)+
'\n        </option>\n        ';
 }); 
__p+='\n      </select\n      ';
 var year = date.year(); 
__p+='\n      ><select class=\'js-year year\'>\n        ';
 _.each(_.range(year - 3, year + 4), function (year) { 
__p+='\n        <option value=\''+
((__t=( year ))==null?'':__t)+
'\'>'+
((__t=( year ))==null?'':__t)+
'</option>\n        ';
 }); 
__p+='\n      </select\n      ><span class=\'js-next-month next-month\'>&gt;</span>\n    </div>\n  </div>\n  <div class=\'events\'>\n    <div class=\'js-days-of-week days-of-week\'></div>\n    <ol class=\'js-events-list events-list\'></ol>\n  </div>\n</div>\n';
return __p;
};
});

// jst/events/show.tmpl
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('jst/events/show', [], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    (root.JST || (root.JST = {}))['jst/events/show'] = factory();
  }
})(this, function () {
  return function(o){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='';
 var thumbnailUrl = o.model.get('thumbnail_url'); 
__p+='\n<div class=\'picture-container\'>\n  ';
 if (thumbnailUrl) { 
__p+='<img src=\''+
((__t=( thumbnailUrl ))==null?'':_.escape(__t))+
'\'>';
 } 
__p+='\n</div>\n<div class=\'info\'>\n  <div class=\'title\'>'+
((__t=( o.model.get('title') ))==null?'':_.escape(__t))+
'</div>\n  <div class=\'datetime\'>\n    ';
 if (o.eventDate.isMultiDay()) { 
__p+='\n    <div class=\'time\'>\n      '+
((__t=( o.eventDate.start().format('dddd, MMMM D, YYYY [at] LT') ))==null?'':_.escape(__t))+
' to<br>\n      '+
((__t=( o.eventDate.end().format('dddd, MMMM D, YYYY [at] LT') ))==null?'':_.escape(__t))+
'\n    </div>\n    ';
 } else { 
__p+='\n    <div class=\'date\'>\n      '+
((__t=( o.eventDate.start().format('dddd, MMMM D, YYYY') ))==null?'':_.escape(__t))+
'\n    </div>\n    <div class=\'time\'>'+
((__t=( o.eventDate.longTime() ))==null?'':_.escape(__t))+
'</div>\n    ';
 } 
__p+='\n  </div>\n  <div class=\'location\'>'+
((__t=( o.model.get('location') ))==null?'':_.escape(__t))+
'</div>\n  <div class=\'portal\'>'+
((__t=( o.model.get('portal').get('name') ))==null?'':_.escape(__t))+
'</div>\n  <div class=\'description\'>'+
((__t=( o.model.get('description') ))==null?'':_.escape(__t))+
'</div>\n  <a href=\''+
((__t=( o.model.orgsyncUrl(o.eventDate) ))==null?'':_.escape(__t))+
'\' class=\'see-full-details\'>\n    See Full Details\n  </a>\n</div>\n';
return __p;
};
});

// jst/news-posts/index/index.tmpl
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('jst/news-posts/index/index', [], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    (root.JST || (root.JST = {}))['jst/news-posts/index/index'] = factory();
  }
})(this, function () {
  return function(o){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<ol class=\'js-list list\' aria-live=\'assertive\'></ol>\n';
return __p;
};
});

// jst/news-posts/index/list-item.tmpl
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('jst/news-posts/index/list-item', [], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    (root.JST || (root.JST = {}))['jst/news-posts/index/list-item'] = factory();
  }
})(this, function () {
  return function(o){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='';

var count = o.model.get('comments_count');
var classes = '';
if (count !== 1) classes += ' plural';
if (!count) classes += ' none';
var thumbnailUrl = o.model.get('thumbnail_url');

__p+='\n';
 if (thumbnailUrl) { 
__p+='\n<img src=\''+
((__t=( thumbnailUrl ))==null?'':_.escape(__t))+
'\' class=\'thumbnail\'>\n';
 } 
__p+='\n<a href=\''+
((__t=( o.model.orgsyncUrl() ))==null?'':_.escape(__t))+
'\' class=\'title\'>\n  '+
((__t=( o.model.get('title') ))==null?'':_.escape(__t))+
'\n</a>\n<div class=\'creator\'>'+
((__t=( o.model.get('creator').get('display_name') ))==null?'':_.escape(__t))+
'</div>\n<div class=\'time\'>'+
((__t=( o.model.time() ))==null?'':_.escape(__t))+
'</div>\n<a href=\''+
((__t=( o.model.orgsyncUrl() ))==null?'':_.escape(__t))+
'\' class=\'comment-count'+
((__t=( classes ))==null?'':__t)+
'\'>\n  '+
((__t=( count ))==null?'':__t)+
'\n</a>\n<div class=\'js-body body\'>'+
((__t=( o.model.truncatedBody(o.truncate) ))==null?'':_.escape(__t))+
'</div>\n';
return __p;
};
});

// jst/news-posts/show.tmpl
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('jst/news-posts/show', [], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    (root.JST || (root.JST = {}))['jst/news-posts/show'] = factory();
  }
})(this, function () {
  return function(o){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='';
 var thumbnailUrl = o.model.get('thumbnail_url'); 
__p+='\n';
 if (thumbnailUrl) { 
__p+='\n<img src=\''+
((__t=( thumbnailUrl ))==null?'':_.escape(__t))+
'\' class=\'thumbnail\'>\n';
 } 
__p+='\n<div class=\'title\'>'+
((__t=( o.model.get('title') ))==null?'':_.escape(__t))+
'</div>\n<div class=\'creator\'>'+
((__t=( o.model.get('creator').get('display_name') ))==null?'':_.escape(__t))+
'</div>\n<div class=\'time\'>'+
((__t=( o.model.time() ))==null?'':_.escape(__t))+
'</div>\n<div class=\'body\'>'+
((__t=( o.model.get('body') ))==null?'':__t)+
'</div>\n<ol class=\'js-comments comments\'></ol>\n<a href=\''+
((__t=( o.model.orgsyncUrl() ))==null?'':_.escape(__t))+
'\' class=\'comment-on-orgsync\'>\n  Comment on OrgSync\n</a>\n';
return __p;
};
});

// jst/photos/index/index.tmpl
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('jst/photos/index/index', [], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    (root.JST || (root.JST = {}))['jst/photos/index/index'] = factory();
  }
})(this, function () {
  return function(o){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class=\'info\'>\n  <h1>'+
((__t=( o.album.get('name') ))==null?'':__t)+
'</h1>\n  <h2>'+
((__t=( o.album.get('photo_count') ))==null?'':__t)+
'</h2>\n</div>\n<ol class=\'js-list list\' aria-live=\'assertive\'></ol>\n';
return __p;
};
});

// jst/photos/index/list-item.tmpl
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('jst/photos/index/list-item', [], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    (root.JST || (root.JST = {}))['jst/photos/index/list-item'] = factory();
  }
})(this, function () {
  return function(o){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='';

var count = o.model.get('comments_count');
var classes = '';
if (count !== 1) classes += ' plural';
if (!count) classes += ' none';

__p+='\n<a href=\''+
((__t=( o.model.orgsyncUrl() ))==null?'':_.escape(__t))+
'\' tabindex=\'1\'>\n  <div class=\'image-container\'>\n    <img src=\''+
((__t=( o.model.get('thumbnail_url') ))==null?'':_.escape(__t))+
'\'>\n  </div>\n  <div class=\'comment-count'+
((__t=( classes ))==null?'':__t)+
'\'>'+
((__t=( count ))==null?'':__t)+
'</div>\n</a>\n';
return __p;
};
});

// jst/photos/show.tmpl
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('jst/photos/show', [], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    (root.JST || (root.JST = {}))['jst/photos/show'] = factory();
  }
})(this, function () {
  return function(o){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='';
 var description = o.model.get('description') 
__p+='\n<img src=\''+
((__t=( o.model.get('full_url') ))==null?'':_.escape(__t))+
'\'>\n<div class=\'description'+
((__t=( description ? '' : ' js-none'))==null?'':__t)+
'\'>\n  '+
((__t=( description ))==null?'':_.escape(__t))+
'\n</div>\n<ol class=\'js-comments comments\'></ol>\n<a href=\''+
((__t=( o.model.orgsyncUrl() ))==null?'':_.escape(__t))+
'\' class=\'comment-on-orgsync\'>\n  Comment on OrgSync\n</a>\n';
return __p;
};
});

// jst/portals/index/index.tmpl
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('jst/portals/index/index', [], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    (root.JST || (root.JST = {}))['jst/portals/index/index'] = factory();
  }
})(this, function () {
  return function(o){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class=\'filters\'>\n  <input class=\'js-search-input search-input\' placeholder=\'Search Portals\'\n  ><div class=\'js-umbrella-selector umbrella-selector\'></div\n  ><div class=\'js-category-selector category-selector\'></div\n  ><div class=\'letters\'>\n    <input type=\'button\' class=\'js-letter letter js-selected\' value=\'All\'\n    ';

    _.times(26, function (n) {
      var c = String.fromCharCode(65 + n);
    
__p+='\n    ><input\n      type=\'button\'\n      class=\'js-letter letter\'\n      value=\''+
((__t=( c ))==null?'':__t)+
'\'\n      data-re=\''+
((__t=( c ))==null?'':__t)+
'\'\n    ';
 }); 
__p+='\n    ><input\n      type=\'button\'\n      class=\'js-letter letter\'\n      value=\'Other\'\n      data-re=\'[^a-z]\'\n    >\n  </div>\n  <div class=\'js-results-summary results-summary\'></div>\n</div>\n<ol class=\'js-list list\' aria-live=\'assertive\'></ol>\n';
return __p;
};
});

// jst/portals/index/list-item.tmpl
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('jst/portals/index/list-item', [], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    (root.JST || (root.JST = {}))['jst/portals/index/list-item'] = factory();
  }
})(this, function () {
  return function(o){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='';

var name = o.model.get('name');
var fittedName = name.length > 80 ? o.model.get('short_name') : name;

__p+='\n<a href=\''+
((__t=( o.model.orgsyncUrl() ))==null?'':_.escape(__t))+
'\' tabindex=\'1\'>\n  <div class=\'image-container\'>\n    <img src=\''+
((__t=( o.model.picture() ))==null?'':_.escape(__t))+
'\' alt=\''+
((__t=( name ))==null?'':_.escape(__t))+
'\'>\n  </div>\n  <div class=\'info\'>\n    <div class=\'name\'>'+
((__t=( fittedName ))==null?'':_.escape(__t))+
'</div>\n    <div class=\'umbrella\'>'+
((__t=( o.model.umbrellaName() ))==null?'':_.escape(__t))+
'</div>\n    <div class=\'category\'>'+
((__t=( o.model.get('category').get('name') ))==null?'':_.escape(__t))+
'</div>\n  </div>\n</a>\n';
return __p;
};
});

// jst/portals/index/no-results.tmpl
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('jst/portals/index/no-results', [], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    (root.JST || (root.JST = {}))['jst/portals/index/no-results'] = factory();
  }
})(this, function () {
  return function(o){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class=\'js-no-results no-results\'>\n  <p>We\'re sorry, but no portals match your selected filters.</p>\n  <strong>Suggestions</strong>\n  <ul>\n    <li>Make sure all words are spelled correctly</li>\n    <li>Try different, or fewer, keywords</li>\n    <li>Clear all filters to return to all organizations</li>\n  </ul>\n  <input\n    type=\'button\'\n    class=\'js-clear-all-filters clear-all-filters\'\n    value=\'Clear all filters\'\n  >\n</div>\n';
return __p;
};
});

// jst/portals/index/results-summary.tmpl
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('jst/portals/index/results-summary', [], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    (root.JST || (root.JST = {}))['jst/portals/index/results-summary'] = factory();
  }
})(this, function () {
  return function(o){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='Showing '+
((__t=( o.count ))==null?'':__t)+
' portals matching\n';

_.each(o.filters, function (val, name) {
  if (name === 'letter') {
    val = val.toString()[2];
    if (val === '[') val = 'Other';
  }

__p+='\n<span class=\'active-filter\'>\n  <span class=\'filter-name\'>'+
((__t=( _.str.capitalize(name) ))==null?'':__t)+
'</span\n  ><span class=\'filter-value\'>'+
((__t=( val ))==null?'':_.escape(__t))+
'</span\n  ><input\n    type=\'button\'\n    class=\'js-clear-filter clear-filter\'\n    data-filter=\''+
((__t=( name ))==null?'':__t)+
'\'\n    value=\'X\'\n  >\n</span>\n';
 }); 
__p+='\n<input\n  type=\'button\'\n  class=\'js-clear-all-filters clear-all-filters\'\n  value=\'Clear All Filters\'\n>\n';
return __p;
};
});

// jst/portals/show/error.tmpl
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('jst/portals/show/error', [], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    (root.JST || (root.JST = {}))['jst/portals/show/error'] = factory();
  }
})(this, function () {
  return function(o){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='Whoops! An error occurred.<br>\n<br>\n<button class=\'js-try-again\'>Try Again</button>\n';
return __p;
};
});

// jst/portals/show/index.tmpl
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('jst/portals/show/index', [], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    (root.JST || (root.JST = {}))['jst/portals/show/index'] = factory();
  }
})(this, function () {
  return function(o){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<img src="'+
((__t=( o.model.picture() ))==null?'':_.escape(__t))+
'" alt=\''+
((__t=( o.model.get('name') ))==null?'':_.escape(__t))+
'\'>\n<div class=\'info\'>\n  <div class=\'name\'>'+
((__t=( o.model.get('name') ))==null?'':_.escape(__t))+
'</div>\n  <div class=\'umbrella\'>'+
((__t=( o.model.umbrellaName() ))==null?'':_.escape(__t))+
'</div>\n  <div class=\'category\'>'+
((__t=( o.model.get('category').get('name') ))==null?'':_.escape(__t))+
'</div>\n  <div class=\'description\'>'+
((__t=( o.model.get('description') ))==null?'':_.escape(__t))+
'</div>\n  ';
 if (o.model.get('website_url')) { 
__p+='\n  <a href="'+
((__t=( o.model.get('website_url') ))==null?'':_.escape(__t))+
'">Website</a> |\n  ';
 } 
__p+='\n  <a href="'+
((__t=( o.model.orgsyncUrl() ))==null?'':_.escape(__t))+
'">On OrgSync.com</a>\n</div>\n';
return __p;
};
});

// jst/portals/show/loading.tmpl
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define('jst/portals/show/loading', [], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory();
  } else {
    (root.JST || (root.JST = {}))['jst/portals/show/loading'] = factory();
  }
})(this, function () {
  return function(o){
var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};
__p+='<div class=\'loading\'></div>\n';
return __p;
};
});

// views/view.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var _ = window._;
  var View = window.Backbone.View;

  app.View = View.extend({
    constructor: function () {
      this.views = {};
      View.apply(this, arguments);
      this.delegateListeners();
    },

    initialize: function (options) {
      if (this.options) {
        _.extend(this, _.pick.apply(_,
          [_.extend({}, this.$el.data(), options)].concat(this.options)
        ));
      }
      if (this.classes) this.$el.addClass(this.classes.join(' '));
    },

    render: function () {
      View.prototype.render.apply(this, arguments);
      if (this.template) this.$el.html(this.template(this));
      return this;
    },

    delegateEvents: function () {
      View.prototype.delegateEvents.apply(this, arguments);
      _.invoke(this.views, 'delegateEvents');
      return this;
    },

    undelegateEvents: function () {
      View.prototype.undelegateEvents.apply(this, arguments);
      _.invoke(this.views, 'undelegateEvents');
      return this;
    },

    delegateListeners: function () {
      _.each(_.result(this, 'listeners'), function (events, key) {
        if (!this[key]) return;
        this.listenTo(this[key], _.reduce(events, function (events, key, ev) {
          events[ev] = this[key];
          return events;
        }, {}, this));
      }, this);
    },

    remove: function () {
      View.prototype.remove.apply(this, arguments);
      _.invoke(this.views, 'remove');
      return this;
    }
  });
})();

// views/albums/index/index.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var $ = window.jQuery;
  var _ = window._;
  var JST = window.JST;
  var View = app.View;

  var dirMap = {'37': -1, '39': 1};

  app.selectorViewMap['.js-osw-albums-index'] =
  app.AlbumsIndexView = View.extend({
    template: JST['jst/albums/index/index'],

    options: ['portalId', 'action'],

    classes: [
      'orgsync-widget',
      'js-osw-albums-index',
      'osw-albums-index'
    ],

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);
      this.portal = new app.Portal({id: this.portalId});
      this.albums = this.portal.get('albums');
      this.$el.append($('<div>').addClass('js-loading'));
      this.albums.pagedFetch({
        success: _.bind(this.render, this),
        error: _.bind(this.$el.text, this.$el, 'Load failed...')
      });
      _.bindAll(this, 'onKeyDown');
      $(document).on('keydown', this.onKeyDown);
    },

    render: function () {
      View.prototype.render.apply(this, arguments);
      this.renderAlbumList();
      return this;
    },

    renderAlbumList: function () {
      this.views.albumsList = new app.InfiniteListView({
        el: this.$('.js-list'),
        modelView: app.AlbumsIndexListItemView,
        modelViewOptions: {action: this.action},
        collection: this.albums
      });
    },

    onKeyDown: function (ev) { this.dir(dirMap[ev.which]); },

    dir: function (dir) {
      var selected = this.albums.findWhere({selected: true});
      if (!dir || !selected) return;
      if (selected.get('photos').findWhere({selected: true})) return;
      selected.set('selected', false);
      var l = this.albums.length;
      var i = (l + this.albums.indexOf(selected) + dir) % l;
      var albumsList = this.views.albumsList;
      while (i >= albumsList.collection.length) albumsList.nextPage(true);
      this.albums.at(i).set('selected', true);
    },

    remove: function () {
      $(document).off('keydown', this.onKeyDown);
      return View.prototype.remove.apply(this, arguments);
    }
  });
})();

// views/albums/index/list-item.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var $ = window.jQuery;
  var _ = window._;
  var elementQuery = window.elementQuery;
  var Olay = window.Olay;
  var View = app.View;

  app.AlbumsIndexListItemView = View.extend({
    tagName: 'li',

    className: 'js-list-item list-item',

    template: window.JST['jst/albums/index/list-item'],

    events: {
      click: 'select'
    },

    listeners: {
      model: {'change:selected': 'toggleOlay'}
    },

    options: ['portalId', 'action'],

    select: function () {
      if (this.action === 'redirect') return;
      this.collection.each(function (album) {
        album.set('selected', album === this.model);
      }, this);
      return false;
    },

    toggleOlay: function () {
      var album = this.model;
      var selected = album.get('selected');
      if (selected || this.olay) {
        if (!this.olay) {
          (this.views.photosIndex = new app.PhotosIndexView({album: album})).$el
            .addClass('js-olay-hide')
            .on('olay:show', function () {
              $(this).closest('.js-olay-container').scrollTop(0);
              _.defer(elementQuery);
            })
            .on('olay:hide', function () { album.set('selected', false); });
          (this.olay = new Olay(this.views.photosIndex.$el, {preserve: true}))
            .$container.addClass('osw-photos-index-olay');
        }
        this.olay[selected ? 'show' : 'hide']();
      }
    },

    remove: function () {
      if (this.olay) this.olay.destroy();
      return View.prototype.remove.apply(this, arguments);
    }
  });
})();

// views/comments/show.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var View = app.View;
  var JST = window.JST;

  app.CommentsShowView = View.extend({
    template: JST['jst/comments/show'],

    classes: [
      'orgsync-widget',
      'js-osw-comments-show',
      'osw-comments-show'
    ]
  });
})();

// views/list.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var _ = window._;
  var View = app.View;

  app.ListView = View.extend({
    options: [
      'modelView',
      'modelViewOptions',
    ],

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);
      this.listenTo(this.collection, {
        add: this.addModel,
        sort: this.sortModels,
        remove: this.removeModel
      });
      this.collection.each(this.addModel, this);
      this.sortModels();
    },

    addModel: function (model) {
      if (this.views[model.cid]) return;
      (this.views[model.cid] = new this.modelView(_.extend({
        collection: this.collection,
        model: model
      }, this.modelViewOptions))).render();
    },

    sortModels: function () {
      this.$el.html(this.collection.map(function (model) {
        return this.views[model.cid].$el.detach();
      }, this));
    },

    removeModel: function (model) {
      this.views[model.cid].remove();
      delete this.views[model.cid];
    }
  });
})();

// views/days/show.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var EventDate = app.EventDate;
  var moment = window.moment;
  var JST = window.JST;
  var View = app.View;

  app.DaysShowView = View.extend({
    template: JST['jst/days/show'],

    classes: [
      'orgsync-widget',
      'js-osw-days-show',
      'osw-days-show'
    ],

    view: 'month',

    options: ['view'],

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);
      var date = this.model.date().clone();
      this.$el.addClass(
        'js-day-' + this.model.id + ' js-month-' + date.format('YYYY-MM')
      );
      this.eventDates = this.model.get('eventDates');
      this.eventDates.remove(this.eventDates.where({filler: true}));
      var today = moment().tz(date.tz()).startOf('day');
      if (date.isSame(today)) this.$el.addClass('js-today');
      if (date.startOf('week').isSame(today.startOf('week'))) {
        this.$el.addClass('js-current-week');
      }
    },

    render: function () {
      View.prototype.render.apply(this, arguments);
      this.renderEventDatesList();
      return this;
    },

    renderEventDatesList: function () {
      this.eventDates.sort();
      this.views.eventDatesList = new app.ListView({
        el: this.$('.js-event-dates-list'),
        collection: this.eventDates,
        modelView: app.EventDatesShowView,
        modelViewOptions: {day: this.model, view: this.view}
      });
      this.correctDisplay();
    },

    longDate: function () {
      var date = this.model.date();
      var today = moment().tz(date.tz()).startOf('day');
      var prefix = (function () {
        switch (+date) {
        case +today.subtract('day', 1):
          return 'Yesterday, ';
        case +today.add('day', 1):
          return 'Today, ';
        case +today.add('day', 1):
          return 'Tomorrow, ';
        }
        return '';
      })();
      return date.format('[' + prefix + ']dddd, MMMM D, YYYY');
    },

    shortDate: function () {
      var date = this.model.date();
      return (date.date() === 1 ? date.format('MMMM') + ' ' : '') + date.date();
    },

    correctDisplay: function () {
      if (this.view === 'list') return;
      var day = this.model;
      var date = day.date();
      if (!date.weekday()) return;
      var eventDates = day.get('eventDates');
      eventDates.sort({silent: true});
      var hidden = [];
      var starters = [];
      var sorted = [];
      var prev =
        this.collection.at(this.collection.indexOf(day) - 1).get('eventDates');
      eventDates.each(function (eventDate) {
        if (eventDate.get('filler')) return;
        if (!eventDate.get('event').get('visible')) {
          hidden.push(eventDate);
        } else if (eventDate.start().clone().startOf('day').isSame(date)) {
          starters.push(eventDate);
        } else {
          sorted[prev.indexOf(eventDate)] = eventDate;
        }
      });
      var l = Math.max(sorted.length, eventDates.length - hidden.length);
      for (var i = 0; i < l; ++i) {
        if (!sorted[i]) {
          sorted[i] = starters.shift() || new EventDate({filler: true});
        }
      }
      eventDates.set(sorted.concat(hidden), {sort: false});
    }
  });
})();

// views/days/list.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var $ = window.jQuery;
  var _ = window._;
  var Day = app.Day;
  var EventDate = app.EventDate;
  var ListView = app.ListView;
  var moment = window.moment;

  app.DaysListView = ListView.extend({
    threshold: 800,

    view: 'month',

    modelView: app.DaysShowView,

    options: [
      'threshold',
      'pageSize',
      'view',
      'initialDate',
      'fetchedEvents'
    ],

    events: {
      scroll: 'padAndTrim',
      mousedown: 'onMousedown',
      mouseup: 'onMouseup'
    },

    listeners: {
      collection: {add: 'debouncedCheckFetch'}
    },

    initialize: function () {
      _.bindAll(this, 'padAndTrim');
      $(window).on('resize', this.padAndTrim);
      this.debouncedCheckFetch = _.debounce(this.checkFetch, 100);
      this.debouncedOnMouseup = _.debounce(this.onMouseup, 1000);
      this.available = this.collection;
      this.collection = new Day.Collection();
      this.collection.tz = this.available.tz;
      this.setView(this.view, this.initialDate);
      ListView.prototype.initialize.apply(this, arguments);
    },

    pageSize: function () {
      return this.view === 'list' ? 1 : 7;
    },

    needsAbove: function () {
      if (this.topEdge()) return false;
      return this.$el.scrollTop() < this.threshold;
    },

    renderAbove: function () {
      var collection = this.collection;
      var available = this.available;
      var pageSize = this.pageSize();
      var edge = collection.first();
      var target = edge.date().clone().subtract('days', pageSize);
      var scrollHeight = this.$el.prop('scrollHeight');
      switch (this.view) {
      case 'month':
      case 'week':
        var targetId = Day.id(target);
        available.fill(target, edge.date());
        var i = available.indexOf(available.get(targetId));
        collection.add(available.models.slice(i, i + pageSize));
        break;
      case 'list':
        this.collection.add(this.listStep(target).prev);
      }
      var delta = this.$el.prop('scrollHeight') - scrollHeight;
      this.$el.scrollTop(this.$el.scrollTop() + delta);
    },

    extraAbove: function () {
      if (this.bottomEdge()) return false;
      var $el = this.$el;
      var scrollTop = $el.scrollTop();
      var firstHeight = $el.children().first().outerHeight();
      return scrollTop > this.threshold + firstHeight;
    },

    removeAbove: function () {
      var scrollHeight = this.$el.prop('scrollHeight');
      this.collection.remove(this.collection.first(this.pageSize()));
      var delta = this.$el.prop('scrollHeight') - scrollHeight;
      this.$el.scrollTop(this.$el.scrollTop() + delta);
    },

    needsBelow: function () {
      if (this.bottomEdge()) return false;
      var $el = this.$el;
      var scrollHeight = $el.prop('scrollHeight');
      var scrollTop = $el.scrollTop();
      var height = $el.outerHeight();
      return scrollHeight < scrollTop + height + this.threshold;
    },

    renderBelow: function () {
      var collection = this.collection;
      var available = this.available;
      var pageSize = this.pageSize();
      var edge = collection.last();
      var target = edge.date().clone().add('days', pageSize);
      switch (this.view) {
      case 'month':
      case 'week':
        var targetId = Day.id(target);
        available.fill(edge.date(), target);
        var i = available.indexOf(available.get(targetId));
        collection.add(available.models.slice(i - pageSize + 1, i + 1));
        break;
      case 'list':
        collection.add(this.listStep(target).next);
      }
    },

    extraBelow: function () {
      if (this.topEdge()) return false;
      var $el = this.$el;
      var scrollHeight = $el.prop('scrollHeight');
      var scrollTop = $el.scrollTop();
      var height = this.$el.outerHeight();
      var lastHeight = this.$el.children().last().outerHeight();
      return scrollHeight > scrollTop + height + this.threshold + lastHeight;
    },

    removeBelow: function () {
      this.collection.remove(this.collection.last(this.pageSize()));
    },

    remove: function () {
      $(window).off('resize', this.padAndTrim);
      return ListView.prototype.remove.apply(this, arguments);
    },

    topEdge: function () {
      if (this.view !== 'list') return false;
      var edge = this.collection.first();
      if (!edge) return true;
      var prev = this.listStep(edge.date().clone().subtract('day', 1)).prev;
      return prev === edge;
    },

    bottomEdge: function () {
      if (this.view !== 'list') return false;
      var edge = this.collection.last();
      if (!edge) return true;
      var next = this.listStep(edge.date().clone().add('day', 1)).next;
      return next === edge;
    },

    padAndTrim: function () {

      // Don't try to pad/trim while the user could be scrolling with the scroll
      // bar. It causes massive jankness.
      if (this.mousedown) {
        this.debouncedOnMouseup();
        this.padAndTrimCalled = true;
        return;
      }
      this.padAndTrimCalled = false;

      // Add or remove elements below if necessary.
      if (this.needsBelow()) this.renderBelow();
      else if (this.needsAbove()) this.renderAbove();
      else if (this.extraBelow()) this.removeBelow();
      else if (this.extraAbove()) this.removeAbove();
      else return;

      _.defer(this.padAndTrim);
    },

    date: function (date) {
      return date ? this.jumpTo(date) : this.calculateDate();
    },

    jumpTo: function (date) {
      var pageSize = this.pageSize();
      var available = this.available;
      switch (this.view) {
      case 'month':
      case 'week':
        date = date.clone().startOf('week');
        available.fill(date, date.clone().add('days', pageSize));
        var i = available.indexOf(available.get(Day.id(date)));
        this.collection.set(available.models.slice(i, i + pageSize));
        break;
      case 'list':
        this.collection.set(this.listStep(date).next);
      }
      this.padAndTrim();
    },

    // The list view doesn't care about empty days, so this function is used to
    // determine what the next interesting (event-filled) days are.
    listStep: function (date) {
      var id = Day.id(date);
      var prev;
      var next = this.available.find(function (day) {
        if (!day.get('eventDates').length || !day.get('visible')) return;
        if (day.id <= id) prev = day;
        return day.id >= id;
      });
      return {next: next || prev, prev: prev || next};
    },

    calculateDate: function () {
      var date = this.collection.find(function (day) {
        var $el = this.views[day.cid].$el;
        var top = $el.position().top;
        return this.view === 'list' ? top + $el.outerHeight() > 0 : top >= 0;
      }, this);
      return date ? date.date() : moment().tz(this.available.tz);
    },

    setView: function (view, date) {
      this.view = view;
      this.modelViewOptions = {view: view};
      this.collection.set();
      this.date(date);
    },

    onMousedown: function () {
      this.mousedown = true;
      this.debouncedOnMouseup();
    },

    onMouseup: function () {
      this.mousedown = false;
      if (this.padAndTrimCalled) this.padAndTrim();
    },

    correctDisplay: function () {
      if (this.view === 'list') return;
      this.collection.each(function (day) {
        this.views[day.cid].correctDisplay();
      }, this);
    },

    checkFetch: function () {
      switch (this.view) {
      case 'list':
        var id = Day.id(this.date());
        var prev;
        var next;
        this.available.find(function (day) {
          if (day.get('eventDates').length && day.get('visible')) {
            if (!prev) prev = day;
            next = day;
          }
          if (day.get('fetched') === Infinity) return;
          if (day.id <= id) prev = day;
          if (day.id >= id) return next = day;
        });
        if (this.collection.get(prev)) this.fetch(prev, 'before');
        if (this.collection.get(next)) this.fetch(next, 'after');
        break;
      case 'month':
      case 'week':
        var firstUnfetched = this.collection.find(function (day) {
          return day.get('fetched') < Infinity;
        });
        if (firstUnfetched) this.fetch(firstUnfetched, 'after');
      }
    },

    fetch: function (day, dir) {
      var page = day.get('fetched') + 1;
      var self = this;
      var fetchKey = dir + 'FetchDay';
      this[fetchKey] = day;
      var limitKey = dir + 'Limit';
      var date = day.date();
      var limit = this[limitKey];
      if (limit) {
        if (dir === 'before' && date.isBefore(limit)) return;
        if (dir === 'after' && date.isAfter(limit)) return;
      }
      var data = {page: page === Infinity ? 1 : page, per_page: 100};
      data[dir] = date.toISOString();
      this.fetchedEvents.fetch({
        remove: false,
        data: data,
        success: function (events, data) {
          if (!data.length) self[limitKey] = date;
          day.set('fetched', page);
          var newEventDates = new EventDate.Collection(
            _.flatten(_.map(data, function (event) {
              var eventDates = events.get(event.id).get('dates');
              return _.map(event.dates, function (date) {
                return eventDates.get(date.id);
              });
            }))
          );
          self.available.addEventDates(newEventDates);
          self.available.fill(
            day.date(),
            newEventDates.last().start().clone().startOf('day'),
            true
          );
          if (self[fetchKey] === day) self.checkFetch();
        }
      });
    }
  });
})();

// views/event-dates/show.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var Olay = window.Olay;
  var JST = window.JST;
  var View = app.View;

  app.EventDatesShowView = View.extend({
    template: JST['jst/event-dates/show'],

    events: {
      click: 'open'
    },

    view: 'month',

    options: ['day', 'view'],

    classes: [
      'orgsync-widget',
      'js-osw-event-dates-show',
      'osw-event-dates-show'
    ],

    listeners: {
      event: {'change:visible': 'correctDisplay'}
    },

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);
      this.event = this.model.get('event');
      this.correctDisplay();
      if (this.event.get('is_all_day')) this.$el.addClass('js-all-day');
      if (this.model.get('filler')) this.$el.addClass('js-filler');
      if (this.day) {
        var day = this.day.date();
        var startDay = this.model.start().clone().startOf('day');
        var end = this.model.end();
        if (this.firstDow = !day.weekday()) this.$el.addClass('js-first-dow');
        if (this.continued = day.isAfter(startDay)) {
          this.$el.addClass('js-continued');
        }
        if (this.continues = day.clone().add('day', 1).isBefore(end)) {
          this.$el.addClass('js-continues');
        }
      }
    },

    open: function () {
      if (this.olay) return this.olay.show();
      (this.views.event = new app.EventsShowView({
        model: this.event,
        eventDate: this.model
      })).render();
      (this.olay = new Olay(this.views.event.el)).show();
    },

    correctDisplay: function () {
      this.$el.toggleClass('js-none', !this.event.get('visible'));
    }
  });
})();

// views/event-filters/show.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var JST = window.JST;
  var View = app.View;

  app.EventFiltersShowView = View.extend({
    tagName: 'label',

    template: JST['jst/event-filters/show'],

    classes: [
      'orgsync-widget',
      'js-osw-event-filters-show',
      'osw-event-filters-show'
    ],

    options: ['legendMode'],

    events: {
      'change .js-enabled': 'updateEnabled'
    },

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);
      if (this.legendMode) this.$el.addClass('js-legend-mode');
    },

    updateEnabled: function () {
      this.model.set(
        'enabled',
        this.legendMode || this.$('.js-enabled').prop('checked')
      );
    }
  });
})();

// views/events/index.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var $ = window.jQuery;
  var _ = window._;
  var Community = app.Community;
  var Day = app.Day;
  var EventFilter = app.EventFilter;
  var JST = window.JST;
  var moment = window.moment;
  var Portal = app.Portal;
  var View = app.View;

  app.selectorViewMap['.js-osw-events-index'] =
  app.EventsIndexView = View.extend({
    template: JST['jst/events/index/index'],

    events: {
      'click .js-change-view': 'clickChangeView',
      'click .js-today': 'clickToday',
      'click .js-prev-month': function () { this.incr('month', -1); },
      'click .js-next-month': function () { this.incr('month', 1); },
      'click .js-toggle-filters': 'toggleFilters',
      'keydown .js-search-input': 'searchKeydown',
      'change .js-month, .js-year': 'jumpToSelected',
      'click .js-jump-to': 'jumpToClicked'
    },

    options: [
      'communityId',
      'portalId',
      'date',
      'tz',
      'view',
      'fetchedEvents',
      'eventFilters',
      'legendMode'
    ],

    classes: [
      'orgsync-widget',
      'js-osw-events-index',
      'osw-events-index',
      'js-month-view'
    ],

    tz: app.tz,

    view: 'month',

    listeners: {
      eventFilters: {'change:enabled': 'updateFiltered'},
      fetchedEvents: {sync: 'onFetchedEvents'}
    },

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);
      this.days = new Day.Collection();
      this.days.tz = this.tz;
      this.community = new Community({id: this.communityId});
      this.portal = new Portal({id: this.portalId});
      this.eventFilters = new EventFilter.Collection(this.eventFilters);
      this.fetchedEvents = this.community.get('events');
      this.render();
    },

    setView: function (view, date) {
      if (!date) {
        date = view === 'list' ? this.date().clone().weekday(0) : this.date();
      }
      this.view = view;
      this.$el
        .removeClass('js-list-view js-month-view js-week-view')
        .addClass('js-' + view + '-view');
      this.views.daysList.setView(view, date);
      this.updateMonth();
      this.updateFilterText();
    },

    render: function () {
      View.prototype.render.apply(this, arguments);
      this.renderEventFiltersList();
      this.renderDaysOfWeek();
      this.renderDaysList();
      this.setView(this.view);
      return this;
    },

    renderDaysOfWeek: function () {
      var day = this.date().startOf('week');
      var $days = [];
      do $days.push($('<div>').addClass('js-day').text(day.format('ddd')));
      while (day.add('day', 1).weekday());
      this.$('.js-days-of-week').append($days);
    },

    renderEventFiltersList: function () {
      this.views.eventFiltersList = new app.ListView({
        el: this.$('.js-event-filters-list'),
        collection: this.eventFilters,
        modelView: app.EventFiltersShowView,
        modelViewOptions: {legendMode: this.legendMode}
      });
    },

    renderDaysList: function () {
      var $list = this.$('.js-events-list');
      this.views.daysList = new app.DaysListView({
        el: $list,
        collection: this.days,
        view: this.view,
        initialDate: this.date(),
        fetchedEvents: this.fetchedEvents
      });
      $list.scroll(_.throttle(_.bind(this.updateMonth, this, false), 100));
    },

    clickChangeView: function (ev) {
      this.setView($(ev.target).data('view'));
    },

    clickToday: function () {
      this.date(moment().tz(this.tz), 500);
    },

    incr: function (unit, n) {
      var day = this.date().clone();
      if (this.view !== 'list') day.weekday(6);
      this.date(day.add(unit, n).startOf(unit), 500);
    },

    updateMonth: function (force) {
      var date = this.date();
      if (this.view !== 'list') date = date.clone().weekday(6);
      var month = date.month();
      if (force || month !== this.lastMonth) {
        this.$('.js-month').val(date.month());
        this.lastMonth = month;
      }
      var year = date.year();
      if (force || year !== this.lastYear) {
        this.updateYearOptions(year);
        this.$('.js-year').val(year);
        this.lastYear = year;
      }
    },

    updateYearOptions: function (year) {
      var $options = this.$('.js-year > option');
      _.each(_.range(year - 3, year + 4), function (n, i) {
        $options.eq(i).attr('value', n).text(n);
      });
    },

    date: function (date) {
      return this.views.daysList ?
        this.views.daysList.date(date) :
        moment().tz(this.tz);
    },

    searchKeydown: function () {
      _.defer(_.bind(this.updateQueryFilter, this));
    },

    updateQueryFilter: function () {
      var q = this.$('.js-search-input').val();
      var words = _.str.words(q.toLowerCase());
      if (_.isEqual(words, this.lastWords)) return;
      this.lastWords = words;
      this.query = words.length ? q : null;
      this.updateFiltered();
    },

    updateFiltered: function () {
      var eventFilters = this.eventFilters;
      var query = this.query;
      var date = this.date();
      this.fetchedEvents.each(function (event) {
        event.set(
          'visible',
          event.matchesQuery(query) && event.matchesEventFilters(eventFilters)
        );
      });
      if (this.view === 'list') this.date(date);
      this.views.daysList.correctDisplay();
    },

    jumpToSelected: function () {
      var month = +this.$('.js-month').val() + 1;
      if (month < 10) month = '0' + month;
      var year = this.$('.js-year').val();
      var date = moment.tz(year + '-' + month + '-01', this.tz);
      this.date(date);
      this.updateMonth(true);
    },

    tzDisplay: function () {
      var full = this.tz.replace(/^.*?\//, '').replace(/_/g, ' ');
      var abbr = this.date().zoneAbbr();
      return full + ' Time (' + abbr + ')';
    },

    jumpToClicked: function (ev) {
      this.setView('list', moment.tz($(ev.target).data('date'), this.tz));
    },

    onFetchedEvents: function () {
      if (this.view === 'list') {
        this.date(this.date());
        this.updateMonth();
      }
      this.updateFiltered();
    },

    updateFilterText: function () {
      this.$('.js-toggle-filters').text(
        (this.$el.hasClass('js-full-width') ? 'Show ' : 'Hide ') +
        (this.legendMode ? 'Legend' : 'Filters')
      );
    },

    toggleFilters: function () {
      this.$el.toggleClass('js-full-width');
      this.updateFilterText();
    }
  });
})();

// views/events/show.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var View = app.View;
  var JST = window.JST;

  app.EventsShowView = View.extend({
    className: 'js-osw-events-show osw-events-show',

    template: JST['jst/events/show'],

    options: ['eventDate']
  });
})();

// views/infinite-list.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var $ = window.jQuery;
  var _ = window._;
  var View = app.View;
  var ListView = app.ListView;

  app.InfiniteListView = ListView.extend({
    page: 0,

    pageSize: 10,

    threshold: 500,

    options: [
      'modelView',
      'modelViewOptions',
      'threshold',
      'pageSize'
    ],

    listeners: {
      available: {
        add: 'nextPage'
      }
    },

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);
      _.bindAll(this, 'nextPage');
      this.$scrollParent().on('scroll', this.nextPage);
      $(window).on('resize', this.nextPage);
      this.available = this.collection;
      this.collection = new this.available.constructor();
      this.listenTo(this.collection, {
        add: this.addModel,
        sort: this.sortModels,
        remove: this.removeModel
      });
      this.collection.each(this.addModel, this);
      this.sortModels();
      this.refresh();
    },

    $scrollParent: function () {
      if (this._$scrollParent) return this._$scrollParent;
      var parents = [this.el].concat(this.$el.parents().toArray());
      return this._$scrollParent = $(_.find(parents, function (parent) {
        var overflowY = $(parent).css('overflow-y');
        return overflowY === 'auto' || overflowY === 'scroll';
      }) || window);
    },

    nextPage: function (force) {
      var needsPage = force === true || this.needsPage();
      if (needsPage && this.collection.length < this.available.length) {
        if (!this.page) this.$el.empty();
        this.collection.add(
          this.available.models.slice(
            this.page * this.pageSize,
            ++this.page * this.pageSize
          )
        );
        _.defer(this.nextPage);
      } else {
        this.trigger('done-paging');
      }
    },

    needsPage: function (scrollTop) {
      var $scrollParent = this.$scrollParent();
      var isWindow = $scrollParent[0] === window;
      var aH = $scrollParent.height();
      if (scrollTop == null) {
        scrollTop = (isWindow ? $(document) : $scrollParent).scrollTop();
      }
      var bY = this.$el[isWindow ? 'offset' : 'position']().top;
      var bH = this.$el.prop('scrollHeight');
      var threshold = this.threshold;
      return aH + scrollTop > bY + bH - threshold;
    },

    refresh: function () {
      this.page = 0;
      this.collection.set();
      this.nextPage();
    },

    remove: function () {
      this.$scrollParent().off('scroll', this.nextPage);
      $(window).off('resize', this.nextPage);
      return ListView.prototype.remove.apply(this, arguments);
    }
  });
})();

// views/news-posts/index/index.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var $ = window.jQuery;
  var _ = window._;
  var JST = window.JST;
  var View = app.View;


  app.selectorViewMap['.js-osw-news-posts-index'] =
  app.NewsPostsIndexView = View.extend({
    template: JST['jst/news-posts/index/index'],

    options: ['portalId', 'action', 'limit', 'truncate'],

    classes: [
      'orgsync-widget',
      'js-osw-news-posts-index',
      'osw-news-posts-index'
    ],

    limit: 100,

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);
      this.portal = new app.Portal({id: this.portalId});
      this.newsPosts = this.portal.get('newsPosts');
      this.$el.append($('<div>').addClass('js-loading'));
      this.newsPosts.fetch({
        limit: this.limit,
        data: {strip_html: false},
        success: _.bind(this.render, this),
        error: _.bind(this.$el.text, this.$el, 'Load failed...')
      });
    },

    render: function () {
      View.prototype.render.apply(this, arguments);
      this.renderNewsPostsList();
      return this;
    },

    renderNewsPostsList: function () {
      var options = {};
      if (this.action) options.action = this.action;
      if (this.truncate) options.truncate = this.truncate;
      this.views.newsPostsList = new app.InfiniteListView({
        el: this.$('.js-list'),
        modelView: app.NewsPostsIndexListItemView,
        modelViewOptions: options,
        collection: this.newsPosts
      });
    }
  });
})();

// views/news-posts/index/list-item.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var Olay = window.Olay;
  var View = app.View;

  app.NewsPostsIndexListItemView = View.extend({
    tagName: 'li',

    className: 'js-list-item list-item',

    template: window.JST['jst/news-posts/index/list-item'],

    events: {
      'click a': 'show'
    },

    options: ['action', 'truncate'],

    truncate: 250,

    show: function (ev) {
      if (this.action === 'redirect') return;
      ev.preventDefault();
      var newsPost = this.model;
      if (!this.olay) {
        (this.views.newsPostsShow = new app.NewsPostsShowView({
          model: newsPost,
          action: this.action
        })).render();
        (this.olay = new Olay(this.views.newsPostsShow.$el, {preserve: true}))
          .$container.addClass('osw-news-post-show-olay');
      }
      this.olay.show();
    },

    remove: function () {
      if (this.olay) this.olay.destroy();
      return View.prototype.remove.apply(this, arguments);
    }
  });
})();

// views/news-posts/show.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var View = app.View;
  var JST = window.JST;

  app.NewsPostsShowView = View.extend({
    template: JST['jst/news-posts/show'],

    classes: [
      'orgsync-widget',
      'js-osw-news-posts-show',
      'osw-news-posts-show'
    ],

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);
      this.comments = this.model.get('comments');
      this.comments.url = this.model.get('comments_url');
      this.comments.fetch();
    },

    render: function () {
      View.prototype.render.apply(this, arguments);
      this.views.commentsList = new app.InfiniteListView({
        el: this.$('.js-comments'),
        collection: this.comments,
        modelView: app.CommentsShowView,
        modelViewOptions: {tagName: 'li'}
      });
      return this;
    }
  });
})();

// views/photos/index/index.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var $ = window.jQuery;
  var _ = window._;
  var JST = window.JST;
  var View = app.View;

  var dirMap = {'37': -1, '39': 1};

  app.selectorViewMap['.js-osw-photos-index'] =
  app.PhotosIndexView = View.extend({
    template: JST['jst/photos/index/index'],

    options: ['album', 'albumId', 'action'],

    classes: [
      'orgsync-widget',
      'js-osw-photos-index',
      'osw-photos-index'
    ],

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);
      if (!this.album) this.album = new app.Album({id: this.albumId});
      this.photos = this.album.get('photos');
      this.$el.append($('<div>').addClass('js-loading'));
      this.album.fetch({
        success: _.bind(this.render, this),
        error: _.bind(this.$el.text, this.$el, 'Load failed...')
      });
      _.bindAll(this, 'onKeyDown');
      $(document).on('keydown', this.onKeyDown);
    },

    render: function () {
      View.prototype.render.apply(this, arguments);
      this.renderPhotoList();
      return this;
    },

    renderPhotoList: function () {
      this.views.photosList = new app.InfiniteListView({
        el: this.$('.js-list'),
        modelView: app.PhotosIndexListItemView,
        modelViewOptions: {action: this.action},
        collection: this.photos
      });
    },

    onKeyDown: function (ev) { this.dir(dirMap[ev.which]); },

    dir: function (dir) {
      var selected = this.photos.findWhere({selected: true});
      if (!dir || !selected || !this.album.get('selected')) return;
      selected.set('selected', false);
      var l = this.photos.length;
      var i = (l + this.photos.indexOf(selected) + dir) % l;
      var photosList = this.views.photosList;
      while (i >= photosList.collection.length) photosList.nextPage(true);
      this.photos.at(i).set('selected', true);
    },

    remove: function () {
      $(document).off('keydown', this.onKeyDown);
      return View.prototype.remove.apply(this, arguments);
    }
  });
})();

// views/photos/index/list-item.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var $ = window.jQuery;
  var Olay = window.Olay;
  var View = app.View;

  app.PhotosIndexListItemView = View.extend({
    tagName: 'li',

    className: 'js-list-item list-item',

    template: window.JST['jst/photos/index/list-item'],

    events: {
      click: 'select'
    },

    listeners: {
      model: {'change:selected': 'toggleOlay'}
    },

    options: ['action'],

    select: function () {
      if (this.action === 'redirect') return;
      this.collection.each(function (photo) {
        photo.set('selected', photo === this.model);
      }, this);
      return false;
    },

    toggleOlay: function () {
      var photo = this.model;
      var selected = photo.get('selected');
      if (selected || this.olay) {
        if (!this.olay) {
          (this.views.photosShow = new app.PhotosShowView({
            model: photo,
            action: this.action
          })).render().$el
            .on('olay:show', function () {
              $(this).closest('.js-olay-container').scrollTop(0);
            })
            .on('olay:hide', function () { photo.set('selected', false); });
          (this.olay = new Olay(this.views.photosShow.$el, {preserve: true}))
            .$container.addClass('osw-photos-show-olay');
        }
        this.olay[selected ? 'show' : 'hide']();
      }
    },

    remove: function () {
      if (this.olay) this.olay.destroy();
      return View.prototype.remove.apply(this, arguments);
    }
  });
})();

// views/photos/show.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var View = app.View;
  var JST = window.JST;

  app.PhotosShowView = View.extend({
    template: JST['jst/photos/show'],

    events: {
      'click img': 'next',
    },

    options: ['action'],

    classes: [
      'orgsync-widget',
      'js-osw-photos-show',
      'osw-photos-show'
    ],

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);
      this.comments = this.model.get('comments');
      this.comments.url = this.model.get('comments_url');
      this.comments.fetch();
    },

    render: function () {
      View.prototype.render.apply(this, arguments);
      this.views.commentsList = new app.InfiniteListView({
        el: this.$('.js-comments'),
        collection: this.comments,
        modelView: app.CommentsShowView,
        modelViewOptions: {tagName: 'li'}
      });
      return this;
    },

    next: function () {
      if (this.action === 'redirect') return;
      this.model.set('selected', false);
      var photos = this.model.collection;
      if (!photos) return;
      var i = (photos.indexOf(this.model) + 1) % photos.length;
      photos.at(i).set('selected', true);
    }
  });
})();

// views/portals/index/index.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var $ = window.jQuery;
  var _ = window._;
  var JST = window.JST;
  var View = app.View;

  app.selectorViewMap['.js-osw-portals-index'] =
  app.PortalsIndexView = View.extend({
    template: JST['jst/portals/index/index'],

    noResultsTemplate: JST['jst/portals/index/no-results'],

    resultsSummaryTemplate: JST['jst/portals/index/results-summary'],

    events: {
      'change .js-umbrella-selector': 'updateUmbrellaFilter',
      'change .js-category-selector': 'updateCategoryFilter',
      'keydown .js-search-input': 'searchKeydown',
      'change .js-search-input': 'updateQueryFilter',
      'click .js-letter': 'letterClick',
      'click .js-clear-all-filters': 'clearAllFilters',
      'click .js-clear-filter': 'clickClearFilter'
    },

    options: [
      'communityId',
      'umbrella',
      'category',
      'portals',
      'action'
    ],

    classes: [
      'orgsync-widget',
      'js-osw-portals-index',
      'osw-portals-index'
    ],

    initialize: function () {
      View.prototype.initialize.apply(this, arguments);
      this.community = new app.Community({id: this.communityId});
      var bootstrapped = this.portals;
      this.portals = this.community.get('portals');
      this.portals.set(bootstrapped);
      this.portals.url = this.community.url() + '/portals';
      this.filtered = new app.Portal.Collection();
      this.filters = {
        query: null,
        umbrella: null,
        category: null,
        letter: null
      };
      _.bindAll(this, 'updateFiltered');
      this.updateFiltered = _.debounce(this.updateFiltered);
      if (bootstrapped) return this.fetchSuccess();
      this.$el.append($('<div>').addClass('js-loading'));
      this.portals.pagedFetch({
        success: _.bind(this.fetchSuccess, this),
        error: _.bind(this.$el.text, this.$el, 'Load failed...')
      });
    },

    fetchSuccess: function () {
      this.portals.each(function (portal) {
        if (portal.isUmbrella()) portal.set('umbrella', portal);
      });
      this.community.set('umbrellas', this.portals.pluck('umbrella'));
      this.community.set('categories', this.portals.pluck('category'));
      this.render();
    },

    render: function () {
      View.prototype.render.apply(this, arguments);
      this.renderSelectors();
      this.renderPortalList();
      this.updateFiltered();
      return this;
    },

    renderSelectors: function () {
      this.renderSelector('umbrella', 'umbrellas');
      this.renderSelector('category', 'categories');
    },

    select2Option: function (singular, plural, name) {
      if (!name || name === 'null') name = null;
      var filters = _.clone(this.filters);
      filters[singular] = name;
      var count = this.filterPortals(filters).length;
      var id = name;
      if (!name) name = 'All ' + _.str.capitalize(plural);
      return {id: id, text: name + ' (' + count + ')', count: count};
    },

    renderSelector: function (singular, plural) {
      var models = this.community.get(plural);
      var $el = this.$('.js-' + singular + '-selector');
      if (models.length <= 1) return $el.hide();
      var self = this;
      $el.select2({
        data: function () {
          var filters = _.clone(self.filters);
          filters[singular] = null;
          return {results: _.map(models.reduce(function (data, model) {
            var name = model.get('name');
            if (data[name]) return data;
            var option = self.select2Option(singular, plural, name);
            if (!option.count) return data;
            data[name] = option;
            return data;
          }, {'null': self.select2Option(singular, plural)}), _.identity)};
        },
        minimumResultsForSearch: -1,
        initSelection: function ($el, cb) {
          cb(self.select2Option(singular, plural, $el.select2('val')));
        }
      });
      var id = this[singular + 'Id'];
      if (!id) return;
      $el.select2('val', id).addClass('js-none');
      this.updateSelectorFilter(singular);
    },

    renderPortalList: function () {
      this.views.portalList = new app.InfiniteListView({
        el: this.$('.js-list'),
        collection: this.filtered,
        modelView: app.PortalsIndexListItemView,
        modelViewOptions: {action: this.action},
        pageSize: 20
      });
    },

    searchKeydown: function () {
      _.defer(_.bind(this.updateQueryFilter, this));
    },

    updateQueryFilter: function () {
      var q = this.$('.js-search-input').val();
      var words = _.str.words(q.toLowerCase());
      if (_.isEqual(words, this.lastWords)) return;
      this.lastWords = words;
      this.filters.query = words.length ? q : null;
      this.updateFiltered();
    },

    updateUmbrellaFilter: function () {
      this.updateSelectorFilter('umbrella');
    },

    updateCategoryFilter: function () {
      this.updateSelectorFilter('category');
    },

    updateSelectorFilter: function (key) {
      this.filters[key] = this.$('.js-' + key + '-selector').select2('val');
      this.updateFiltered();
    },

    letterClick: function (ev) {
      var str = $(ev.currentTarget)
        .addClass('js-selected')
        .siblings()
        .removeClass('js-selected')
        .end()
        .data('re');
      this.setletter(str ? new RegExp('^' + str, 'i') : null);
    },

    setletter: function (re) {
      this.filters.letter = re;
      this.updateFiltered();
    },

    filterPortals: function (filters) {
      if (!filters) filters = this.filters;
      var query = filters.query;
      var umbrella = filters.umbrella;
      var category = filters.category;
      var letter = filters.letter;
      return this.portals.filter(function (portal) {
        return portal.matchesQuery(query) &&
          (!umbrella || portal.get('umbrella').get('name') === umbrella) &&
          (!category || portal.get('category').get('name') === category) &&
          (!letter || letter.test(portal.get('name') || ''));
      });
    },

    updateFiltered: function () {
      this.filtered.set(this.filterPortals());
      this.updateCounts();
      this.updateResultsSummary();
      this.views.portalList.refresh();
      this.checkResults();
    },

    updateCounts: function () {
      this.$('.js-umbrella-selector, .js-category-selector').each(function () {
        var $self = $(this);
        $self.select2('val', $self.select2('val') || 'null');
      });
    },

    updateResultsSummary: function () {
      var filters = _.reduce(this.filters, function (filters, val, filter) {
        if (val) filters[filter] = val;
        return filters;
      }, {});
      this.$('.js-results-summary')
        .toggleClass('js-hidden', !_.size(filters))
        .html(this.resultsSummaryTemplate({
          filters: filters,
          count: this.filtered.length
        }));
    },

    checkResults: function () {
      if (!this.views.portalList.page) {
        this.$('.js-list').html(this.noResultsTemplate(this));
      }
    },

    clickClearFilter: function (ev) {
      this.clearFilter($(ev.currentTarget).data('filter'));
    },

    clearFilter: function (filter) {
      switch (filter) {
      case 'query':
        this.$('.js-search-input').val('').change();
        break;
      case 'umbrella':
      case 'category':
        this.$('.js-' + filter + '-selector').select2('val', 'null', true);
        break;
      case 'letter':
        this.$('.js-letter').first().click();
      }
    },

    clearAllFilters: function () {
      _.each(_.keys(this.filters), this.clearFilter, this);
    }
  });
})();

// views/portals/index/list-item.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var Olay = window.Olay;
  var View = app.View;

  app.PortalsIndexListItemView = View.extend({
    tagName: 'li',

    className: 'js-list-item list-item',

    template: window.JST['jst/portals/index/list-item'],

    events: {
      'click': 'open'
    },

    listeners: {
      model: {remove: 'checkRemove'}
    },

    options: ['action'],

    open: function (ev) {
      if (this.action === 'redirect') return;
      ev.preventDefault();
      if (!this.olay) {
        this.views.show = new app.PortalsShowView({model: this.model});
        this.olay = new Olay(this.views.show.render().$el);
      }
      this.olay.show();
    },

    checkRemove: function (portal, collection) {
      if (collection === this.collection) this.remove();
    }
  });
})();

// views/portals/show.js
(function () {
  'use strict';

  var app = window.OrgSyncWidgets;

  var _ = window._;
  var View = app.View;
  var JST = window.JST;

  app.PortalsShowView = View.extend({
    className: 'js-osw-portals-show osw-portals-show',

    template: JST['jst/portals/show/index'],

    loadingTemplate: JST['jst/portals/show/loading'],

    errorTemplate: JST['jst/portals/show/error'],

    events: {
      'click .js-try-again': 'fetch'
    },

    classes: [
      'orgsync-widget',
      'js-osw-portals-show',
      'osw-portals-show'
    ],

    render: function () {
      if (this.model.get('description') !== void 0) {
        return View.prototype.render.apply(this, arguments);
      }
      return this.fetch();
    },

    fetch: function () {
      this.renderLoading();
      this.model.fetch({
        success: _.bind(this.render, this),
        error: _.bind(this.renderError, this)
      });
      return this;
    },

    renderLoading: function () {
      this.$el.html(this.loadingTemplate(this));
    },

    renderError: function () {
      this.$el.html(this.errorTemplate(this));
    }
  });
})();

// teardown.js
// Close and execute the IIFE that was started in setup.js. Here we return all
// of the overriden globals to their previous states.

  var app = window.OrgSyncWidgets;

  // This local delcaration is important to store for the Underscore templates
  // since they use `_.escape`. Same for Mustache.
  var _ = window._;
  var Mustache = window.Mustache;

  _.each(polutants, function (val, key) {
    app[key] = window[key];
    if (val) return window[key] = val;

    // `delete window[anything]` throws in IE8, so hack it.
    try { delete window[key]; } catch (er) { window[key] = undefined; }
  });
})();
