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

	/**
	 * Fetch or create the local cache array or object. For the default storage
	 * object, this is where everything is stored. For other implementations it
	 * could be the holding area before the data is committed to a remote
	 * database.
	 *
	 * If you pass a model then it will return the cache array for that model,
	 * if you don't pass anything then it will return the whole cache object.
	 *
	 * @param {Model} [modelType] Optional model filter. If passed an array of the specific data will be returned.
	 * @return {Object|Object[]} Data currently stored against the passed model type, or the whole object if you didn't pass anything.
	 */
	Storage.prototype.getCache = function(modelType) {
		if (typeof this._cache === 'undefined') {
			this._cache = {};
		}

		if (modelType) {
			if (!this._cache.hasOwnProperty(modelType.name)) {
				this._cache[modelType.name] = [];
			}

			return this._cache[modelType.name];
		}

		return this._cache;
	};

	/**
	 * Clears either the whole cache or the cache for a specific model.
	 *
	 * @param {Model} [modelType] If this is passed then the cache will only be cleared for that model.
	 * @return {Object} Current instance for chaining.
	 */
	Storage.prototype.clearCache = function(modelType) {
		var cache = this.getCache();

		if (modelType) {
			delete cache[modelType.name];
		}
		else {
			delete this._cache;
		}

		return this;
	};

	return Storage;
});
