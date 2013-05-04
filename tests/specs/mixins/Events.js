define([
	'tarmac/mixins/Events',
	'tarmac/mixin'
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
	});
});
