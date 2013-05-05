define(function() {
	/**
	 * The router maps URLs to controllers and defines sections of the URL to
	 * extract and place inside the request object. It can also be setup to
	 * pass a context object to all controllers. This object could contain an
	 * instance of storage for accessing models, for example.
	 *
	 * @class
	 */
	function Router() {
	}

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
	 * Route segments can contain any alphanumeric character as well as hyphens
	 * and underscores.
	 *
	 * @param {String} route URL to match with segments to extract denoted with a colon.
	 * @param {Function} controller Controller class to map to, not a class instance, an actual class.
	 * @param {String} action Optional action string to pass through to the controller.
	 * @param {String} name The name of the route, can be used for reversing a URL.
	 * @return {Object} The current instance to allow chaining.
	 */
	Router.prototype.addRoute = function(route, controller, action, name) {
		var routes = this.getRoutes();
		var compiledRoute = this._compileRoute(route);
		routes[route] = {
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
		var validRouteSegment = '([a-zA-Z0-9_-]+)';
		var routeSegmentRegExp = new RegExp(':' + validRouteSegment, 'g');

		var routeRegExpSource = route.replace(routeSegmentRegExp, function(match, key) {
			keys.push(key);
			return validRouteSegment;
		});

		var routeRegExp = new RegExp('^' + routeRegExpSource + '$', 'g');
		return {
			keys: keys,
			regex: routeRegExp
		};
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
	 * Routes the provided URL through to the correct controller.
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
	 * Sets the context object to the one that you specify. This object is passed to the controllers execute method when routing.
	 *
	 * @param {Object} context Your desired context object.
	 * @return {Object} The current instance to allow chaining.
	 */
	Router.prototype.setContextObject = function(context) {
		this._context = context;
	};

	return Router;
});
