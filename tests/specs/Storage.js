define([
	'tarmac/Storage'
], function(Storage) {
	suite('Storage', function() {
		setup(function() {
			this.storage = new Storage();
		});

		suite('save', function() {
			test('returns current instance', function() {
				var result = this.storage.save();
				assert.strictEqual(result, this.storage);
			});
		});

		suite('find', function() {
			test('returns an array', function() {
				var result = this.storage.find();
				assert.isArray(result);
			});
		});
	});
});
