define([
	'tarmac/Storage',
	'tarmac/Model'
], function(Storage, Model) {
	suite('Storage', function() {
		setup(function() {
			this.storage = new Storage();
			
			function TestModel() {
				Model.apply(this, arguments);
			}
			TestModel.prototype = Object.create(Model.prototype);
			this.TestModel = TestModel;

			this.model = new TestModel({
				foo: true,
				bar: false
			});
		});

		suite('save', function() {
			test('returns current instance', function() {
				var result = this.storage.save(this.TestModel, this.model);
				assert.strictEqual(result, this.storage);
			});

			test('stores a model', function() {
				this.storage.save(this.TestModel, this.model);
				var result = this.storage.getCache(this.TestModel);
				assert.lengthOf(result, 1);
				assert.deepEqual(result[0], this.model.get());
			});

			test('stores multiple models', function() {
				var localModel = new this.TestModel({
					name: 'Oliver Caldwell',
					github: 'Wolfy87'
				});

				this.storage.save(this.TestModel, this.model);
				this.storage.save(this.TestModel, localModel);
				var result = this.storage.getCache(this.TestModel);

				assert.lengthOf(result, 2);
				assert.deepEqual(result[0], this.model.get());
				assert.deepEqual(result[1], localModel.get());
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
