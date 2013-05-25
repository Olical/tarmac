define([
	'./mixin',
	'./mixins/Events'
], function(mixin, Events) {
	'use strict';

	/**
	 * Controllers are instantiated by the router and emit events when routed
	 * to. This class should handle the required models and views to render the
	 * result. This is pretty much an abstract class so your should extend it
	 * and add your own functionally.
	 *
	 * @class
	 * @mixes Events
	 */
	function Controller() {
	}

	mixin(Controller.prototype, Events);

	/**
	 * Called when the controller has been routed to. Gets passed all of the
	 * information required to render a response.
	 *
	 * It will emit the execute event which will be passed the action (if
	 * present), request and context. It will also emit executed:NAME, where
	 * name is the name of the action, if an action is present.
	 *
	 * Also stores the passed arguments in the current object of this object.
	 *
	 * @param {String|undefined} action Current action, if any.
	 * @param {Object} request Contains values extracted from the URL.
	 * @param {Object} context Object of information that can be passed down from the router.
	 * @return {Object} The current instance to allow chaining.
	 */
	Controller.prototype.execute = function(action, request, context) {
		this.current = {
			action: action,
			request: request,
			context: context
		};

		this.emitEvent('executed', action, request, context);

		if (action) {
			this.emitEvent('executed:' + action, action, request, context);
		}

		return this;
	};

	return Controller;
});
