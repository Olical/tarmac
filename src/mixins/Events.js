define({
	/**
	 * Fetches the events object for this instance. The events object contains
	 * all of the listener arrays for all registered events. This is a real
	 * reference to the original object.
	 *
	 * @returns {Object} All of the events and their listeners.
	 */
	getEvents: function() {
		if (typeof this._events === 'undefined') {
			this._events = {};
		}

		return this._events;
	},

	/**
	 * Fetches the listeners array for a specific event. This is a real
	 * reference to the original array.
	 *
	 * @param {String} eventName Name of the event you want the listeners for.
	 * @return {Function[]} All listeners for the specified event.
	 */
	getListeners: function(eventName) {
		var events = this.getEvents();

		if (typeof events[eventName] === 'undefined') {
			events[eventName] = [];
		}

		return events[eventName];
	},

	/**
	 * Adds a listener to the specified event. It will not add if there is
	 * already an instance of this function inside the array.
	 *
	 * @param {String} eventName Target event.
	 * @param {Function} listener Listener function to add.
	 * @return {Object} The current instance to allow chaining.
	 */
	addListener: function(eventName, listener) {
		var listeners = this.getListeners(eventName);

		if (listeners.indexOf(listener) === -1) {
			listeners.push(listener);
		}

		return this;
	},

	/**
	 * Removes a listener from an event.
	 *
	 * @param {String} eventName Target event.
	 * @param {Function} listener Listener function to remove.
	 * @return {Object} The current instance to allow chaining.
	 */
	removeListener: function(eventName, listener) {
		var listeners = this.getListeners(eventName);
		var listenerIndex = listeners.indexOf(listener);

		if (listenerIndex !== -1) {
			listeners.splice(listenerIndex, 1);
		}

		if (listeners.length === 0) {
			delete this.getEvents()[eventName];
		}

		return this;
	},

	/**
	 * Emits the specified event which executes all of the attached listeners.
	 * The listeners will be passed any extra arguments you provide this method
	 * other than the event name.
	 *
	 * The listeners are called with the scope of the host object that contains
	 * the events and listeners.
	 *
	 * @param {String} eventName Target event.
	 * @param {...*}
	 * @return {Object} The current instance to allow chaining.
	 */
	emitEvent: function(eventName) {
		var listeners = this.getListeners(eventName);
		var argumentsArray = Array.prototype.slice.call(arguments, 0);
		var listenerArguments = argumentsArray.slice(1);
		var i = listeners.length;

		while (i--) {
			listeners[i].apply(this, listenerArguments);
		}

		return this;
	}
});
