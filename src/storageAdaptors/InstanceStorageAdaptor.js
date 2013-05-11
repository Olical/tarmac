define([
	'./StorageAdaptor'
], function(StorageAdaptor) {
	/**
	 * Stores models in the current instance. Data will be lost when this
	 * object is destroyed.
	 *
	 * @class
	 * @extends StorageAdaptor
	 */
	function InstanceStorageAdaptor() {
		StorageAdaptor.apply(this, arguments);
	}
	InstanceStorageAdaptor.prototype = Object.create(StorageAdaptor.prototype);

	return InstanceStorageAdaptor;
});
