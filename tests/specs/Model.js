define([
	'tarmac/Model'
], function(Model) {
	suite('Model', function() {
		setup(function() {
			this.model = new Model();
		});

		suite('Model', function() {
			test('constructor lets you set data', function() {
				var data = {
					foo: true
				};
				var model = new Model(data);
				assert.strictEqual(model.data, data);
			});

			test('constructor sets a default data object if you do not pass one', function() {
				assert.isObject(this.model.data);
			});
		});
	});
});
