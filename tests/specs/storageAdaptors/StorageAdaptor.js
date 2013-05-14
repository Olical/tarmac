define([
	'tarmac/storageAdaptors/StorageAdaptor'
], function(StorageAdaptor) {
	suite('storageAdaptors/StorageAdaptor', function() {
		setup(function() {
			this.adaptor = new StorageAdaptor();
		});

		suite('save', function() {
			test('returns current instance', function() {
				var result = this.adaptor.save();
				assert.strictEqual(result, this.adaptor);
			});
		});

		suite('find', function() {
			test('returns a blank array', function() {
				var result = this.adaptor.find();
				assert.deepEqual(result, []);
			});
		});
	});
});
