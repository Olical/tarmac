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
	 * @return {Object} The current instance to allow chaining.
	 */
	Router.prototype.addRoute = function(route, controller, action) {
		var routes = this.getRoutes();
		routes[route] = {
			route: this._compileRoute(route),
			controller: controller,
			action: action
		};

		return this;
	};

	/**
	 * Builds a regular expression from the provided route.
	 *
	 * @param {String} route
	 * @return {RegExp} The built RegExp to match the route.
	 * @private
	 */
	Router.prototype._compileRoute = function(route) {
		var validRouteSegment = '([a-zA-Z0-9_-]+)';
		var routeSegmentRegExp = new RegExp(':' + validRouteSegment);
		var routeRegExpSource = route.replace(routeSegmentRegExp, validRouteSegment);
		var routeRegExp = new RegExp('^' + routeRegExpSource + '$');
		return routeRegExp;
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

	return Router;
});
