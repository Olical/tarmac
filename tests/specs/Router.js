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
				this.router.addRoute('test', route);
				var routes = this.router.getRoutes();
				assert.property(routes, route);
			});

			test('routes are added with a controller and option', function() {
				var route = '/users/:id/';
				this.router.addRoute('test', route, this.SpyController, 'testing');
				var routes = this.router.getRoutes();

				assert.deepPropertyVal(routes, route + '.controller', this.SpyController);
				assert.deepPropertyVal(routes, route + '.action', 'testing');
			});

			test('routes compile a RegExp that matches example routes', function() {
				var route = '/users/:id/:slug/';
				this.router.addRoute('test', route);
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
				this.router.addRoute('test', route, this.SpyController);
				this.router.route('/users/100/oliver-caldwell/');
				assert.isTrue(this.SpyController.prototype.execute.called);
			});

			test('routes through to a controller and passes the correct request values', function() {
				var route = '/users/:id/:slug/';
				this.router.addRoute('test', route, this.SpyController);
				this.router.route('/users/100/oliver-caldwell/');
				var request = {
					id: '100',
					slug: 'oliver-caldwell'
				};
				assert.deepEqual(this.SpyController.prototype.execute.args[0][1], request);
			});

			test('context is passed to the controller', function() {
				var route = '/users/:id/:slug/';
				var targetContext = {
					foo: true
				};
				this.router.addRoute('test', route, this.SpyController);
				this.router.setContextObject(targetContext);
				this.router.route('/users/100/oliver-caldwell/');
				assert.strictEqual(this.SpyController.prototype.execute.args[0][2], targetContext);
			});
		});

		suite('getContextObject', function() {
			test('fetches an empty context object', function() {
				var context = this.router.getContextObject();
				assert.deepEqual(context, {});
			});
		});

		suite('setContextObject', function() {
			test('can set the context object', function() {
				var targetContext = {
					foo: true
				};
				this.router.setContextObject(targetContext);
				var context = this.router.getContextObject();
				assert.strictEqual(context, targetContext);
			});
		});

		suite('reverse', function() {
			test('can reverse a URL', function() {
				var route = '/users/:id/:slug/';
				this.router.addRoute('test', route, this.SpyController);
				var reversed = this.router.reverse('test', {
					id: 200,
					slug: 'oliver-c'
				});

				assert.strictEqual(reversed, '/users/200/oliver-c/');
			});
		});
	});
});
