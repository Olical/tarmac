define(function() {
	/**
	 * Blends N objects together and returns a new one containing all of their
	 * properties. The leftmost object will take precedence. This is a shallow
	 * merge, it will not recurse into sub-objects.
	 *
	 * @param {...Object}
	 * @return {Object} Blended object created from provided arguments.
	 */
	function blend() {
		var result = {};
		var i = arguments.length;
		var key;

		while (i--) {
			for (key in arguments[i]) {
				if (arguments[i].hasOwnProperty(key)) {
					result[key] = arguments[i][key];
				}
			}
		}

		return result;
	}

	return blend;
});
