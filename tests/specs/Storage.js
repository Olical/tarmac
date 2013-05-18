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

		suite('store', function() {
			test('returns current instance', function() {
				var result = this.storage.store(this.TestModel, this.model);
				assert.strictEqual(result, this.storage);
			});

			test('stores a model', function() {
				this.storage.store(this.TestModel, this.model);
				var result = this.storage.get(this.TestModel);
				var keys = Object.keys(result);
				assert.lengthOf(keys, 1);
				assert.deepEqual(result[keys[0]], this.model.get());
			});

			test('stores multiple models', function() {
				var localModel = new this.TestModel({
					name: 'Oliver Caldwell',
					github: 'Wolfy87'
				});

				this.storage.store(this.TestModel, this.model);
				this.storage.store(this.TestModel, localModel);
				var result = this.storage.get(this.TestModel);
				var keys = Object.keys(result);

				assert.lengthOf(keys, 2);
				assert.deepEqual(result[keys[0]], this.model.get());
				assert.deepEqual(result[keys[1]], localModel.get());
			});
		});

		suite('find', function() {
			test('returns an object', function() {
				var result = this.storage.find();
				assert.isObject(result);
			});

			test('with no filter, everything is returned', function() {
				var localModel = new this.TestModel({
					name: 'Oliver Caldwell',
					github: 'Wolfy87'
				});

				this.storage.store(this.TestModel, this.model);
				this.storage.store(this.TestModel, localModel);
				var result = this.storage.find(this.TestModel);
				var keys = Object.keys(result);

				assert.lengthOf(keys, 2);
				assert.deepEqual(result[keys[0]], this.model.get());
				assert.deepEqual(result[keys[1]], localModel.get());
			});
		});

		suite('get', function() {
			test('returns an object with no arguments', function() {
				var result = this.storage.get();
				assert.isObject(result);
			});

			test('returns an object with a model', function() {
				var result = this.storage.get(Model);
				assert.isObject(result);
			});

			test('fetching a model types object creates a persistent object for it', function() {
				this.storage.get(Model);
				var result = this.storage.get();
				assert.isObject(result.Model);
			});
			
			test('can fetch an individual model by model object (for reloading from DB etc)', function() {
				this.storage.store(this.TestModel, this.model);
				var original = this.model.get();
				var result = this.storage.get(this.TestModel, this.model);
				assert.deepEqual(result, original);
			});

			test('can fetch an individual model by key (for reloading from DB etc)', function() {
				this.storage.store(this.TestModel, this.model);
				var original = this.model.get();
				var key = this.model.getKey();
				var result = this.storage.get(this.TestModel, key);
				assert.deepEqual(result, original);
			});
		});

		suite('remove', function() {
			test('clears whole storage', function() {
				this.storage.get(Model);
				this.storage.get(this.TestModel);
				var result = this.storage.get();

				assert.isObject(result.Model);
				assert.isObject(result.TestModel);

				this.storage.remove();
				result = this.storage.get();

				assert.isUndefined(result.Model);
				assert.isUndefined(result.TestModel);
			});

			test('clears a model types storage', function() {
				this.storage.get(Model);
				this.storage.get(this.TestModel);
				var result = this.storage.get();

				assert.isObject(result.Model);
				assert.isObject(result.TestModel);

				this.storage.remove(Model);
				result = this.storage.get();

				assert.isUndefined(result.Model);
				assert.isObject(result.TestModel);
			});

			test('can remove a single model by passing a specific model object', function() {
				var localModel = new this.TestModel({
					name: 'Oliver Caldwell',
					github: 'Wolfy87'
				});

				this.storage.store(this.TestModel, this.model);
				this.storage.store(this.TestModel, localModel);
				this.storage.remove(this.TestModel, this.model);
				var original = localModel.get();
				var result = this.storage.get(this.TestModel);
				var keys = Object.keys(result);

				assert.lengthOf(keys, 1);
				assert.deepEqual(result[keys[0]], original);
			});

			test('can remove a single model by passing a specific model key', function() {
				var localModel = new this.TestModel({
					name: 'Oliver Caldwell',
					github: 'Wolfy87'
				});

				this.storage.store(this.TestModel, this.model);
				this.storage.store(this.TestModel, localModel);
				var key = this.model.getKey();
				this.storage.remove(this.TestModel, key);
				var original = localModel.get();
				var result = this.storage.get(this.TestModel);
				var keys = Object.keys(result);

				assert.lengthOf(keys, 1);
				assert.deepEqual(result[keys[0]], original);
			});
		});
	});
});
