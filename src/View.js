define(function() {
	'use strict';

	/**
	 * Should be loaded by a controller and used to render something.
	 *
	 * So very abstract. Go wild.
	 *
	 * @class
	 */
	function View() {
	}

	/**
	 * This function should perform the final render of the view. If you are
	 * working with a DOM it could inject the result into it directly. If you
	 * are running on a server or something like that you could return the HTML
	 * and pipe that out to the user.
	 */
	View.prototype.render = function() {
	};

	return View;
});
