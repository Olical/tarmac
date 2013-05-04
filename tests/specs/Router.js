define([
	'tarmac/Router',
	'tarmac/Controller',
	'sinon'
], function(Router, Controller) {
	suite('tarmac/Router', function() {
		setup(function() {
			this.SpyController = function(){};
			this.SpyController.prototype = Object.create(Controller.prototype);
			this.SpyController.prototype.execute = sinon.spy();
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
				this.router.addRoute(route, this.SpyController, 'testing');
				var routes = this.router.getRoutes();

				assert.deepPropertyVal(routes, route + '.controller', this.SpyController);
				assert.deepPropertyVal(routes, route + '.action', 'testing');
			});

			test('routes compile a RegExp that matches example routes', function() {
				var route = '/users/:id/:slug/';
				this.router.addRoute(route);
				var routes = this.router.getRoutes();

				assert.deepPropertyVal(routes, route + '.route');

				var routeRegExp = routes[route].route;

				assert.isTrue(routeRegExp.test('/users/100/oliver-caldwell/'));
				assert.isFalse(routeRegExp.test('/users/100/oc/extra/'));
				assert.isFalse(routeRegExp.test('/users/100/oc'));
				assert.isFalse(routeRegExp.test('users/100/oc/'));
			});
		});

		suite('route', function() {
			test('routes through to a controller', function() {
				var route = '/users/:id/:slug/';
				this.router.addRoute(route, this.SpyController);
				this.router.route('/users/100/oliver-caldwell/');
				assert.isTrue(this.SpyController.prototype.execute.called);
			});
		});

		suite('getContextObject', function(){});
		suite('setContextObject', function(){});
	});
});
