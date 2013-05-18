define([
	'./mixin',
	'./mixins/Events'
], function(mixin, Events) {
	/**
	 * Controllers are instantiated by the router and have their execute
	 * method executed when routed to. This class should handle the required
	 * models and views to render the result. This is pretty much an abstract
	 * class so your should extend it and add your own functionally.
	 *
	 * @class
	 */
	function Controller() {
	}

	mixin(Controller.prototype, Events);

	/**
	 * Called when the controller has been routed to. Gets passed all of the
	 * information required to render a response.
	 *
	 * By default, the execute method will map the action to a method and pass
	 * it the request and context objects. The mapping works by appending
	 * "Action" to the current action name and then calling that method on this
	 * object.
	 *
	 * So calling execute with an action of "createUser" will
	 * call this.createUserAction.
	 *
	 * @param {String|undefined} action Current action, if any.
	 * @param {Object} request Contains values extracted from the URL.
	 * @param {Object} context Object of information that can be passed down from the router.
	 * @return {Object} The current instance to allow chaining.
	 */
	Controller.prototype.execute = function(action, request, context) {
		var actionHandlerName = action + 'Action';

		if (this[actionHandlerName]) {
			this[actionHandlerName](request, context);
		}

		this.emitEvent('executed', action, request, context);
		return this;
	};

	return Controller;
});
