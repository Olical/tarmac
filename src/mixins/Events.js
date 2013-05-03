define({
	getEvents: function() {
		if (typeof this._events === 'undefined') {
			this._events = {};
		}

		return this._events;
	},

	getListeners: function(eventName) {
		var events = this.getEvents();

		if (typeof events[eventName] === 'undefined') {
			events[eventName] = [];
		}

		return events[eventName];
	}
});
