define([
	'./mixin',
	'./mixins/Events'
], function(mixin, Events) {
	/**
	 * The router maps URLs to controllers and defines sections of the URL to
	 * extract and place inside the request object. It can also be setup to
	 * pass a context object to all controllers. This object could contain an
	 * instance of storage for accessing models, for example.
	 *
	 * @class
	 * @mixes Events
	 */
	function Router() {
	}

	mixin(Router.prototype, Events);

	/**
	 * Creates a route and maps it to a controller with an optional action. If
	 * you want to use the default controller action mapping provided by the
	 * base controller class then you must pass an action. The action will map
	 * to the "{{ action name }}Action" function in the controller.
	 *
	 * The route URL can contain segments prefixed with a colon. These will be
	 * extracted and sent through to the controller in the request object. For
	 * example: "/user/:id/". This will pass the id through to the controller
	 * under request.id.
	 *
	 * Route segments can contain any regex "\w" character. This includes any
	 * alphanumeric characters as well as underscores.
	 *
	 * @param {String} name The name of the route, can be used for reversing a URL.
	 * @param {String} route URL to match with segments to extract denoted with a colon.
	 * @param {Function} controller Controller class to map to, not a class instance, an actual class.
	 * @param {String} action Optional action string to pass through to the controller.
	 * @return {Object} The current instance to allow chaining.
	 */
	Router.prototype.addRoute = function(name, route, controller, action) {
		var routes = this.getRoutes();
		var compiledRoute = this._compileRoute(route);
		routes[route] = {
			routeSource: route,
			route: compiledRoute.regex,
			keys: compiledRoute.keys,
			controller: controller,
			action: action,
			name: name
		};

		return this;
	};

	/**
	 * Builds a regular expression from the provided route. Returns an object
	 * containing the RegExp instance and an array of keys and the order they
	 * were found in.
	 *
	 * @param {String} route
	 * @return {Object} The built RegExp to match the route under "regex" and the keys under "keys".
	 * @private
	 */
	Router.prototype._compileRoute = function(route) {
		var keys = [];
		var cleanRoute = this._escapeRegExp(route);
		var routeRegExpSource = cleanRoute.replace(this._routeSegmentRegExp, function(match, key) {
			keys.push(key);
			return this._validUrlSegment;
		}.bind(this));
		var routeRegExp = new RegExp('^' + routeRegExpSource + '$', 'g');

		return {
			keys: keys,
			regex: routeRegExp
		};
	};

	/**
	 * RegExp segment to match named keys in route URLs.
	 *
	 * @type {String}
	 * @private
	 */
	Router.prototype._validRouteSegment = '(\\w+)';

	/**
	 * RegExp segment to match URL components that can be assigned to keys
	 * found in the route.
	 *
	 * @type {String}
	 * @private
	 */
	Router.prototype._validUrlSegment = '([\\w-]+)';

	/**
	 * Compiled RegExp to match named keys in route URLs.
	 *
	 * @type {RegExp}
	 * @private
	 */
	Router.prototype._routeSegmentRegExp = new RegExp(':' + Router.prototype._validRouteSegment, 'g');

	/**
	 * RegExp to match RegExp special characters.
	 *
	 * @type {RegExp}
	 * @private
	 */
	Router.prototype._regExpSpecialCharacters = /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g;

	/**
	 * Escapes a string for use inside a RegExp.
	 *
	 * @param {String} source
	 * @return {String}
	 * @private
	 */
	Router.prototype._escapeRegExp = function(source) {
		return source.replace(this._regExpSpecialCharacters, '\\$&');
	};

	/**
	 * Fetches the routes object.
	 *
	 * @return {Object}
	 */
	Router.prototype.getRoutes = function() {
		if (typeof this._routes === 'undefined') {
			this._routes = {};
		}

		return this._routes;
	};

	/**
	 * Routes the provided URL through to the correct controller. Will emit the
	 * route event and pass the selected route, controller instance, request
	 * and context object.
	 *
	 * It will also emit a specific route event called route:NAME, where NAME
	 * is the name of the matched route. This will be passed the same
	 * arguments.
	 *
	 * @param {String} route
	 * @return {Object} The current instance to allow chaining.
	 */
	Router.prototype.route = function(route) {
		var routes = this.getRoutes();
		var context = this.getContextObject();
		var key;
		var selectedRoute;
		var controller;
		var request;

		for (key in routes) {
			if (routes.hasOwnProperty(key) && routes[key].route.test(route)) {
				selectedRoute = routes[key];
				controller = new selectedRoute.controller();
				request = this._buildRequestObject(route, selectedRoute.route, selectedRoute.keys);
				controller.execute(selectedRoute.action, request, context);
				this.emitEvent('route', selectedRoute, controller, request, context);
				this.emitEvent('route:' + selectedRoute.name, selectedRoute, controller, request, context);
				console.log(selectedRoute);
				break;
			}
		}

		return this;
	};

	/**
	 * Builds the request object from a route RegExp and a matching URL.
	 *
	 * @param {String} route Matched route. (/users/123/)
	 * @param {String} routeRegExp Route RegExp to parse the route.
	 * @param {String[]} keys The keys in the order they are found in the route RegExp.
	 * @return {Object} Data extracted from the URL mapped to the correct keys.
	 * @private
	 */
	Router.prototype._buildRequestObject = function(route, routeRegExp, keys) {
		var result = {};
		var argumentsArray;
		var values;
		var i;
		route.replace(routeRegExp, function(match, value) {
			argumentsArray = Array.prototype.slice.call(arguments, 0);
			values = argumentsArray.slice(1, -2);
			i = values.length;
			while (i--) {
				result[keys[i]] = values[i];
			}
		});
		return result;
	};

	/**
	 * Fetches the current context object for this router. You can set this to
	 * whatever you want using setContextObject. The object will be passed to
	 * the controllers execute method.
	 *
	 * @return {Object}
	 */
	Router.prototype.getContextObject = function() {
		if (typeof this._context === 'undefined') {
			this._context = {};
		}

		return this._context;
	};

	/**
	 * Sets the context object to the one that you specify. This object is
	 * passed to the controllers execute method when routing.
	 *
	 * @param {Object} context Your desired context object.
	 * @return {Object} The current instance to allow chaining.
	 */
	Router.prototype.setContextObject = function(context) {
		this._context = context;
		return this;
	};

	/**
	 * Builds a URL from a route name and the data required to populate the
	 * route template.
	 *
	 * @param {String} name Name of the route to build from. You set the name with addRoute.
	 * @param {Object} data Named components of the URL to populate.
	 * @return {String} The built URL.
	 */
	Router.prototype.reverse = function(name, data) {
		var route = this._getRouteByName(name);
		return route.routeSource.replace(this._routeSegmentRegExp, function(match, key) {
			return data[key];
		});
	};

	/**
	 * Returns the first route with a name matching the provided string.
	 *
	 * @param {String} name Name of the route to find.
	 * @return {Object|null} The matched route or null if not found.
	 * @private
	 */
	Router.prototype._getRouteByName = function(name) {
		var key;
		var routes = this.getRoutes();

		for (key in routes) {
			if (routes.hasOwnProperty(key) && routes[key].name === name) {
				return routes[key];
			}
		}

		return null;
	};

	return Router;
});
