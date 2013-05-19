define([
	'./mixin',
	'./mixins/Events'
], function(mixin, Events) {
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
	 * @mixes Events
	 */
	function Storage() {
	}

	mixin(Storage.prototype, Events);

	/**
	 * Stores the passed model for later use. Emits the set event and passes
	 * the current storage class, model type and target model.
	 *
	 * @param {Model} modelType The type of model that the target was created from.
	 * @param {Object} target Model instance to store.
	 * @return {Object} Current instance for chaining.
	 */
	Storage.prototype.set = function(modelType, target) {
		var storage = this._getModelStorage(modelType);
		storage[target.getKey()] = target.get();
		this.emitEvent('set', this, modelType, target);
		return this;
	};

	/**
	 * This will either return the whole storage object, an array of
	 * instantiated model objects or a specific models data object.
	 *
	 * If you don't pass anything then it will return the whole storage object.
	 * If you pass a model type then it will return all models for it. The
	 * array of models are actual models, not just objects.
	 *
	 * If you pass a models key then it will return that models data object.
	 *
	 * @param {Model} [modelType] Optional model filter.
	 * @param {String} [model] A key of a model to fetch the data for.
	 * @return {Object|Object[]} Will return the whole storage object, an array of all instantiated models for the passed type or a single matching models data object.
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
				return modelStorage[model];
			}
			else {
				return this._constructModels(modelType, modelStorage);
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
		var storage = this.get();
		var key;

		if (modelType) {
			storage = this._getModelStorage(modelType);

			if (model) {
				if (typeof model === 'string') {
					delete storage[model];
				}
				else {
					delete storage[model.getKey()];
				}
			}
			else {
				for (key in storage) {
					if (storage.hasOwnProperty(key)) {
						this.remove(storage[key]);
					}
				}

				delete this._storage[modelType.name];
			}
		}
		else {
			for (key in storage) {
				if (storage.hasOwnProperty(key)) {
					this.remove(storage[key]);
				}
			}

			delete this._storage;
		}

		return this;
	};

	/**
	 * Returns a models storage object. Will create it if required.
	 *
	 * @param {Model} modelType The model class to fetch the storage object for.
	 * @return {Object} The specified models storage.
	 * @private
	 */
	Storage.prototype._getModelStorage = function(modelType) {
		var storage = this.get();
		var key = modelType.name;

		if (!storage[key]) {
			storage[key] = {};
		}

		return storage[key];
	};

	/**
	 * Builds an array of model instances based on an input object of raw
	 * objects. You much also provide a model type to build from.
	 *
	 * @param {Model} modelType Type to instantiate the data objects into.
	 * @param {Object} models The actual model data to build the models from.
	 * @return {Object[]} Array of built model objects.
	 * @private
	 */
	Storage.prototype._constructModels = function(modelType, models) {
		var result = [];
		var key;

		for (key in models) {
			if (models.hasOwnProperty(key)) {
				result.push(new modelType(models[key]));
			}
		}

		return result;
	};

	return Storage;
});
