define([
	'tarmac/Storage',
	'tarmac/Model',
	'sinon'
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
				assert.lengthOf(result, 1);
				assert.deepEqual(result[0].get(), this.model.get());
			});

			test('stores multiple models', function() {
				var localModel = new this.TestModel({
					name: 'Oliver Caldwell',
					github: 'Wolfy87'
				});

				this.storage.store(this.TestModel, this.model);
				this.storage.store(this.TestModel, localModel);
				var result = this.storage.get(this.TestModel);

				assert.lengthOf(result, 2);
				assert.deepEqual(result[0].get(), this.model.get());
				assert.deepEqual(result[1].get(), localModel.get());
			});

			test('emits the store event', function() {
				var spy = sinon.spy();
				this.storage.addListener('store', spy);
				this.storage.store(this.TestModel, this.model);
				var args = spy.args[0];

				assert.strictEqual(args[0], this.storage);
				assert.strictEqual(args[1], this.TestModel);
				assert.strictEqual(args[2], this.model);
			});
		});

		suite('get', function() {
			test('returns an object with no arguments', function() {
				var result = this.storage.get();
				assert.isObject(result);
			});

			test('returns an array with a model', function() {
				var result = this.storage.get(Model);
				assert.isArray(result);
			});

			test('fetching a model types object creates a persistent object for it', function() {
				this.storage.get(Model);
				var result = this.storage.get();
				assert.isObject(result.Model);
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

				assert.lengthOf(result, 1);
				assert.deepEqual(result[0].get(), original);
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

				assert.lengthOf(result, 1);
				assert.deepEqual(result[0].get(), original);
			});
		});
	});
});
