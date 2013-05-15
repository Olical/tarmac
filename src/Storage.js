define(function() {
	/**
	 * Saves and finds models. This class stores all models within the instance
	 * so any persistence is lost when the object is destroyed. It can be
	 * extended to keep data between page loads or server sessions, depending
	 * on where you are using it.
	 *
	 * An example extension would be to pipe the data into localStorage if you
	 * are running within an browser.
	 *
	 * @class
	 */
	function Storage() {
	}

	/**
	 * Saves the passed model for later use.
	 *
	 * @param {Object} target Model instance to save.
	 * @return {Object} Current instance for chaining.
	 */
	Storage.prototype.save = function(target) {
		return this;
	};

	/**
	 * Searches through the stored instances of the passed model using the
	 * provided criteria. It will return all models of the correct type that
	 * match your search.
	 *
	 * @param {Model} modelType A model class which the matched models have to be an instance of.
	 * @param {Object} search Criteria that the matching models must meet.
	 * @return {Object[]} All models that match.
	 */
	Storage.prototype.find = function(modelType, search) {
		return [];
	};

	return Storage;
});
