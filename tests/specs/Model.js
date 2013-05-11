define([
	'tarmac/Model'
], function(Model) {
	suite('Model', function() {
		setup(function() {
			this.model = new Model();
		});

		suite('constructor', function() {
			test('constructor lets you set data', function() {
				var data = {
					foo: true
				};
				var model = new Model(data);
				assert.deepEqual(model.get(), data);
			});
		});

		suite('get', function() {
			test('can fetch whole blank object', function() {
				assert.deepEqual(this.model.get(), {});
			});

			test('can fetch a key', function() {
				this.model.set('foo', 'bar');
				assert.strictEqual(this.model.get('foo'), 'bar');
			});

			test('can fetch a populated object', function() {
				var value = {
					foo: 100,
					bar: 200
				};
				this.model.set(value);
				assert.deepEqual(this.model.get(), value);
			});
		});

		suite('set', function() {
			test('allows chaining', function() {
				var result = this.model.set('foo', 'bar');
				assert.strictEqual(result, this.model);
			});

			test('can set a key', function() {
				this.model.set('foo', 'bar');
				assert.strictEqual(this.model.get('foo'), 'bar');
			});

			test('can set an object', function() {
				var value = {
					foo: 100,
					bar: 200
				};
				this.model.set(value);
				assert.deepEqual(this.model.get(), value);
			});
		});
	});
});
