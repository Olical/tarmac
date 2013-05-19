define([
	'tarmac/Controller',
	'sinon'
], function(Controller) {
	suite('Controller', function() {
		setup(function() {
			this.controller = new Controller();
		});

		suite('execute', function() {
			test('executes the correct action', function() {
				this.controller.spyAction = sinon.spy();
				this.controller.execute('spy');
				assert.isTrue(this.controller.spyAction.called);
			});

			test('passes the request and context to the action', function() {
				var request = {
					type: 'request'
				};
				var context = {
					type: 'context'
				};

				this.controller.spyAction = sinon.spy();
				this.controller.execute('spy', request, context);
				var args = this.controller.spyAction.args[0];
				assert.strictEqual(args[0], request);
				assert.strictEqual(args[1], context);
			});

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
				assert.isTrue(spy.calledWith(this.controller, 'test', request, context));
			});
		});
	});
});
