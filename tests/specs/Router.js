define([
	'tarmac/Router',
	'tarmac/Controller',
	'sinon'
], function(Router, Controller) {
	function SpyController() {
		this.execute = sinon.spy();
	}
	SpyController.prototype = Object.create(Controller.prototype);

	suite('tarmac/Router', function() {
		setup(function() {
			this.router = new Router();
		});

		suite('getRoutes', function() {
			test('routes starts as an empty object', function() {
				var routes = this.router.getRoutes();
				assert.deepEqual(routes, {});
			});
		});

		suite('addRoute', function() {
			test('routes are added to the route object', function() {
				var route = '/users/:id/';
				this.router.addRoute(route);
				var routes = this.router.getRoutes();
				assert.property(routes, route);
			});

			test('routes are added with a controller and option', function() {
				var route = '/users/:id/';
				this.router.addRoute(route, SpyController, 'testing');
				var routes = this.router.getRoutes();

				assert.deepPropertyVal(routes, route + '.controller', SpyController);
				assert.deepPropertyVal(routes, route + '.action', 'testing');
			});

			test('routes compile a RegExp that matches example routes', function() {
				var route = '/users/:id/';
				this.router.addRoute(route);
				var routes = this.router.getRoutes();

				assert.deepPropertyVal(routes, route + '.route');

				var routeRegExp = routes[route].route;

				assert.isTrue(routeRegExp.test('/users/100/'));
				assert.isFalse(routeRegExp.test('/users/100/extra/'));
				assert.isFalse(routeRegExp.test('/users/100'));
				assert.isFalse(routeRegExp.test('users/100/'));
			});
		});
	});
});
