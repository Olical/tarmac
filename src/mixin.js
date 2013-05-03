define(function() {
	/**
	 * Mixes all passed objects into the leftmost object. The leftmost objects
	 * have higher precedence and will overwrite values set by the rightmost
	 * objects. This is a shallow merge, it will not recurse into sub-objects.
	 *
	 * @param {Object} target Destination object for all other objects values.
	 * @param {...Object}
	 */
	function mixin(target) {
		var i = arguments.length;
		var key;

		while (--i) {
			for (key in arguments[i]) {
				if (arguments[i].hasOwnProperty(key)) {
					target[key] = arguments[i][key];
				}
			}
		}
	}

	return mixin;
});
