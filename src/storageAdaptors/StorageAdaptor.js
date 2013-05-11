define(function() {
	/**
	 * Abstract storage adaptor. Extend this to add functionality.
	 *
	 * @class
	 */
	function StorageAdaptor() {
	}

	/**
	 * Saves the passed model into the storage endpoint.
	 *
	 * @param {Object} model Model to save.
	 * @return {Object} Current instance for chaining.
	 */
	StorageAdaptor.prototype.save = function(model) {
		return this;
	};

	/**
	 * Loads the passed model from the storage endpoint.
	 */
	StorageAdaptor.prototype.load = function() {
	};

	return StorageAdaptor;
});
