define([
	'tarmac/Storage',
	'tarmac/Model'
], function(Storage, Model) {
	suite('Storage', function() {
		setup(function() {
			this.storage = new Storage();
			
			function TestModel(){}
			TestModel.prototype = Object.create(Model.prototype);
			this.TestModel = TestModel;
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

			test('fetching a models array creates a persistent array for it', function() {
				this.storage.getCache(Model);
				var result = this.storage.getCache();
				assert.isArray(result.Model);
			});
		});

		suite('clearCache', function() {
			test('clears whole caches', function() {
				this.storage.getCache(Model);
				this.storage.getCache(this.TestModel);
				var result = this.storage.getCache();

				assert.isArray(result.Model);
				assert.isArray(result.TestModel);

				this.storage.clearCache();
				result = this.storage.getCache();

				assert.isUndefined(result.Model);
				assert.isUndefined(result.TestModel);
			});

			test('clears singular caches', function() {
				this.storage.getCache(Model);
				this.storage.getCache(this.TestModel);
				var result = this.storage.getCache();

				assert.isArray(result.Model);
				assert.isArray(result.TestModel);

				this.storage.clearCache(Model);
				result = this.storage.getCache();

				assert.isUndefined(result.Model);
				assert.isArray(result.TestModel);
			});
		});
	});
});
