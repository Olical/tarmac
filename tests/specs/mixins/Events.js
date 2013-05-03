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
		test('can fetch the events object', function() {
			var events = this.events.getEvents();
			assert.isObject(events);
		});

		test('can fetch an empty listeners array', function() {
			var listeners = this.events.getListeners('test-event');
			assert.isArray(listeners);
		});
	});
});
