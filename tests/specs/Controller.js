define([
	'tarmac/Controller',
	'sinon'
], function(Controller) {
	suite('Controller', function() {
		setup(function() {
			this.controller = new Controller();
		});

		suite('execute', function() {
			test('emits the executed event', function() {
				var spy = sinon.spy();
				var request = {
					name: 'oliver-caldwell',
					github: 'Wolfy87'
				};
				var context = {
					foo: true,
					bar: false
				};
				this.controller.addListener('executed', spy);
				this.controller.execute('test', request, context);

				assert.isTrue(spy.called);
				assert.isTrue(spy.calledWith('test', request, context));
			});

			test('emits the namespaced execute event that contains the action name', function() {
				var spy = sinon.spy();
				var uselessSpy = sinon.spy();
				var request = {
					name: 'oliver-caldwell',
					github: 'Wolfy87'
				};
				var context = {
					foo: true,
					bar: false
				};
				this.controller.addListener('executed:test', spy);
				this.controller.addListener('executed:otherAction', uselessSpy);
				this.controller.execute('test', request, context);

				assert.isTrue(spy.called);
				assert.isTrue(spy.calledWith('test', request, context));

				assert.isFalse(uselessSpy.called);
			});

			test('sets the current object', function() {
				var request = {
					name: 'oliver-caldwell',
					github: 'Wolfy87'
				};
				var context = {
					foo: true,
					bar: false
				};
				this.controller.execute('test', request, context);
				var current = this.controller.current;

				assert.isObject(current);
				assert.strictEqual(current.action, 'test');
				assert.strictEqual(current.request, request);
				assert.strictEqual(current.context, context);
			});
		});
	});
});
