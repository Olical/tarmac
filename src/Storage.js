define([
	'./storageAdaptors/InstanceStorage'
], function(InstanceStorage) {
	/**
	 * Handles loading and saving your models from a local or remove source.
	 * Remote could just mean the localStorage object, it does not have to be
	 * another server or API.
	 *
	 * By default, the Storage class will use the instance adaptor which simply
	 * stores the data within the object. This is not persistent and will be
	 * lost when the adapter is destroyed.
	 *
	 * @class
	 */
	function Storage() {
		this._setStorageAdaptor(new InstanceStorage);
	}

	/**
	 * Sets the storage adaptor object. Needs to be an instance/descendent of
	 * StorageAdaptor.
	 *
	 * @param {Object} adaptor
	 * @private
	 */
	Storage.prototype._setStorageAdaptor = function(adaptor) {
		this._storageAdaptor = adaptor;
	};

	return Storage;
});
