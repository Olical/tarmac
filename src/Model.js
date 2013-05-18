define(function() {
	/**
	 * This is where you store your data and methods to access it.
	 *
	 * You can pass an object to the constructor to start it with data. Models
	 * should be loaded by your controllers which should also stitch them into
	 * views whilst keeping them separate from each other.
	 *
	 * Your controllers should be the middlemen between your views and models.
	 *
	 * @param {Object} data Initial data to store in the model.
	 * @class
	 */
	function Model(data) {
		if (data) {
			this.set(data);
		}
	}

	/**
	 * Retrieves a value from the model by key. If you do not pass a key then
	 * the whole storage object will be returned.
	 *
	 * @param {String} [key] Value to fetch.
	 * @return {*|Object} The value assigned to the key if present, or the whole storage object.
	 */
	Model.prototype.get = function(key) {
		var storage = this._getStorage();

		if (key) {
			return storage[key];
		}
		
		return storage;
	};

	/**
	 * Stores key/value pairs in the model.
	 *
	 * @param {String|Object} key Either the string key to store, or an object to iterate over and store.
	 * @param {*} [value] If your key is a string, then this is the value to be assigned to it.
	 * @return {Object} Current instance for chaining.
	 */
	Model.prototype.set = function(key, value) {
		var storage = this._getStorage();
		var i;

		if (typeof key === 'string') {
			storage[key] = value;
		}
		else {
			for (i in key) {
				if (key.hasOwnProperty(i)) {
					this.set(i, key[i]);
				}
			}
		}

		return this;
	};

	/**
	 * Fetches the data object, will create it if not already done.
	 *
	 * @return {Object} Current storage object.
	 * @private
	 */
	Model.prototype._getStorage = function() {
		if (!this._storage) {
			this._storage = {};
		}

		return this._storage;
	};

	/**
	 * Fetches the (ideally) unique key to identify the model with. If one
	 * hasn't been set internally using unique data then it will generate a
	 * random one. This should be temporary because there is a chance, no matter
	 * how small, that two models will have their automatically assigned random
	 * keys collide.
	 *
	 * @return {String} The key for this model.
	 */
	Model.prototype.getKey = function() {
		if (!this._key) {
			this._setRandomKey();
		}

		return this._key;
	};

	/**
	 * Generates a random key and assigns it to the model.
	 *
	 * @return {Object} Current instance for chaining.
	 * @private
	 */
	Model.prototype._setRandomKey = function() {
		var time = Date.now();
		var randomSalt = Math.floor(Math.random() * 20001) - 10000;
		var keyCharacters = btoa(time + randomSalt).split('');
		keyCharacters.sort(function() {
			return 0.5 - Math.random();
		});

		this._setKey(keyCharacters.join(''));

		return this;
	};

	/**
	 * Sets the models key to the one provided.
	 *
	 * @param {String} key The desired key.
	 * @return {Object} Current instance for chaining.
	 * @private
	 */
	Model.prototype._setKey = function(key) {
		this._key = key;
	};

	return Model;
});
