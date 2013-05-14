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
	 * Searches the storage endpoint for models that match the passed criteria.
	 *
	 * This can be implemented however you want, it just has to return an array
	 * of models.
	 *
	 * @return {Model[]} All models that match.
	 */
	StorageAdaptor.prototype.find = function() {
		return [];
	};

	return StorageAdaptor;
});
