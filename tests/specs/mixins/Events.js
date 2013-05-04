define([
	'tarmac/mixins/Events',
	'tarmac/mixin',
	'sinon'
], function(Events, mixin) {
	function TestEvents(){}
	mixin(TestEvents.prototype, Events);

	setup(function() {
		this.events = new TestEvents();
	});

	suite('tarmac/mixins/Events', function() {
		suite('getEvents', function() {
			test('can fetch the events object', function() {
				var events = this.events.getEvents();
				assert.isObject(events);
			});
		});

		suite('getListeners', function() {
			test('can fetch an empty listeners array', function() {
				var listeners = this.events.getListeners('test-event');
				assert.isArray(listeners);
			});
		});

		suite('addListener', function() {
			test('can add a listener to an event and see it in the array', function() {
				function testListener(){}
				this.events.addListener('test-event', testListener);
				var listeners = this.events.getListeners('test-event');

				assert.isArray(listeners);
				assert.lengthOf(listeners, 1);
				assert.strictEqual(listeners[0], testListener);
			});

			test('adding of listeners can be chained', function() {
				function testListener(){}
				function otherTestListener(){}

				this.events
					.addListener('test-event', testListener)
					.addListener('test-event', otherTestListener);

				var listeners = this.events.getListeners('test-event');

				assert.isArray(listeners);
				assert.lengthOf(listeners, 2);
				assert.strictEqual(listeners[0], testListener);
				assert.strictEqual(listeners[1], otherTestListener);
			});

			test('listener arrays are kept seperate', function() {
				function testListener(){}
				function otherTestListener(){}

				this.events
					.addListener('first-event', testListener)
					.addListener('second-event', otherTestListener);

				var first = this.events.getListeners('first-event');
				var second = this.events.getListeners('second-event');

				assert.isArray(first);
				assert.isArray(second);

				assert.lengthOf(first, 1);
				assert.lengthOf(second, 1);

				assert.strictEqual(first[0], testListener);
				assert.strictEqual(second[0], otherTestListener);
			});

			test('can not add multiple instances of the same listener', function() {
				function testListener(){}
				this.events.addListener('test-event', testListener);
				var listeners = this.events.getListeners('test-event');

				assert.isArray(listeners);
				assert.lengthOf(listeners, 1);
				assert.strictEqual(listeners[0], testListener);

				this.events.addListener('test-event', testListener);

				assert.isArray(listeners);
				assert.lengthOf(listeners, 1);
				assert.strictEqual(listeners[0], testListener);
			});
		});

		suite('removeListener', function() {
			test('removing from an empty event is okay', function() {
				function testListener(){}
				assert.ok(this.events.removeListener('test-event', testListener));
			});

			test('can remove a listener', function() {
				function testListener(){}
				this.events.addListener('test-event', testListener);
				var listeners = this.events.getListeners('test-event');

				assert.isArray(listeners);
				assert.lengthOf(listeners, 1);
				assert.strictEqual(listeners[0], testListener);

				this.events.removeListener('test-event', testListener);

				assert.isArray(listeners);
				assert.lengthOf(listeners, 0);
			});

			test('removing a listener leaves others intact', function() {
				function testListener(){}
				function otherTestListener(){}

				this.events
					.addListener('test-event', testListener)
					.addListener('test-event', otherTestListener);

				var listeners = this.events.getListeners('test-event');

				assert.isArray(listeners);
				assert.lengthOf(listeners, 2);
				assert.strictEqual(listeners[0], testListener);
				assert.strictEqual(listeners[1], otherTestListener);

				this.events.removeListener('test-event', testListener);

				assert.isArray(listeners);
				assert.lengthOf(listeners, 1);
				assert.strictEqual(listeners[0], otherTestListener);
			});

			test('removing the last listener deletes the array', function() {
				function testListener(){}
				this.events.addListener('test-event', testListener);
				var listeners = this.events.getListeners('test-event');
				var events = this.events.getEvents();

				assert.isArray(listeners);
				assert.lengthOf(listeners, 1);
				assert.strictEqual(listeners[0], testListener);

				this.events.removeListener('test-event', testListener);

				assert.isUndefined(events['test-event']);
			});
		});

		suite('emitEvent', function() {
			test('can emit an event with no listeners', function() {
				assert.ok(this.events.emitEvent('test-event'));
			});

			test('emitting an event will call it\'s single listener', function() {
				var testListener = sinon.spy();
				this.events
					.addListener('test-event', testListener)
					.emitEvent('test-event');
				assert.isTrue(testListener.called);
			});

			test('emitting an event will call all of it\'s listeners', function() {
				var testListener = sinon.spy();
				var otherTestListener = sinon.spy();

				this.events
					.addListener('test-event', testListener)
					.addListener('test-event', otherTestListener)
					.emitEvent('test-event');

				assert.isTrue(testListener.called);
				assert.isTrue(otherTestListener.called);
			});

			test('emitting an event will not call other events listeners', function() {
				var testListener = sinon.spy();
				var otherTestListener = sinon.spy();

				this.events
					.addListener('test-event', testListener)
					.addListener('other-event', otherTestListener)
					.emitEvent('test-event');

				assert.isTrue(testListener.called);
				assert.isFalse(otherTestListener.called);
			});

			test('emitting with arguments will pass the arguments to the listener', function() {
				var testListener = sinon.spy();
				this.events
					.addListener('test-event', testListener)
					.emitEvent('test-event', 'arg1', 'arg2')
					.emitEvent('test-event', 100, 200);

				assert.strictEqual(testListener.callCount, 2);
				assert.deepEqual(testListener.args[0], ['arg1', 'arg2']);
				assert.deepEqual(testListener.args[1], [100, 200]);
			});

			test('scope of listener is set to host instance by default', function() {
				var testListener = sinon.spy();
				this.events
					.addListener('test-event', testListener)
					.emitEvent('test-event');
				assert.strictEqual(testListener.thisValues[0], this.events);
			});

			test('can set scope of listeners with bind', function() {
				var testListener = sinon.spy();
				var scopeObject = {
					foo: true
				};
				this.events
					.addListener('test-event', testListener.bind(scopeObject))
					.emitEvent('test-event');
				assert.strictEqual(testListener.thisValues[0], scopeObject);
			});
		});
	});
});
