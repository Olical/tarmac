define([
	'tarmac/Storage',
	'tarmac/Model'
], function(Storage, Model) {
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

		suite('getCache', function() {
			test('returns an object with no arguments', function() {
				var result = this.storage.getCache();
				assert.isObject(result);
			});

			test('returns an array with a model', function() {
				var result = this.storage.getCache(Model);
				assert.isArray(result);
			});
		});
	});
});
