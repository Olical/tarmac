define(function() {
	/**
	 * Stores and finds models. This class stores all models within the
	 * instance so any persistence is lost when the object is destroyed. It can
	 * be extended to keep data between page loads or server sessions,
	 * depending on where you are using it.
	 *
	 * An example extension would be to pipe the data into localStorage if you
	 * are running within an browser.
	 *
	 * @class
	 */
	function Storage() {
	}

	/**
	 * Stores the passed model for later use.
	 *
	 * @param {Model} modelType The type of model that the target was created from.
	 * @param {Object} target Model instance to store.
	 * @return {Object} Current instance for chaining.
	 */
	Storage.prototype.store = function(modelType, target) {
		var storage = this.get(modelType);
		storage[target.getKey()] = target.get();
		return this;
	};

	/**
	 * This will either return the whole storage object, a model types storage
	 * object or a specific models object.
	 *
	 * If you don't pass anything then it will return the whole storage object.
	 * If you pass a model type then it will return all models for it.
	 *
	 * If you pass an actual model instance or a key for one then it will
	 * return that specific models data.
	 *
	 * @param {Model} [modelType] Optional model filter.
	 * @param {Object|String} [model] An actual model or a key of a model to fetch the data for.
	 * @return {Object} Data currently stored against the passed model type, or the whole object if you didn't pass anything.
	 */
	Storage.prototype.get = function(modelType, model) {
		var modelStorage;

		if (typeof this._storage === 'undefined') {
			this._storage = {};
		}

		if (modelType) {
			if (!this._storage.hasOwnProperty(modelType.name)) {
				this._storage[modelType.name] = {};
			}

			modelStorage = this._storage[modelType.name];

			if (model) {
				if (typeof model === 'string') {
					return modelStorage[model];
				}
				else {
					return modelStorage[model.getKey()];
				}
			}
			else {
				return modelStorage;
			}
		}

		return this._storage;
	};

	/**
	 * Clears either the whole storage or the storage for a specific model
	 * type. You can also use this to remove a model by passing the actual
	 * model or it's key.
	 *
	 * @param {Model} [modelType] If this is passed then the storage will only be cleared for that model.
	 * @param {Object|String} [model] Actual model to remove from storage.
	 * @return {Object} Current instance for chaining.
	 */
	Storage.prototype.remove = function(modelType, model) {
		var storage;

		if (modelType) {
			if (model) {
				storage = this.get(modelType);

				if (typeof model === 'string') {
					delete storage[model];
				}
				else {
					delete storage[model.getKey()];
				}
			}
			else {
				storage = this.get();
				delete storage[modelType.name];
			}
		}
		else {
			delete this._storage;
		}

		return this;
	};

	return Storage;
});
