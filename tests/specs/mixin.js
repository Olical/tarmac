define([
	'tarmac/mixin'
], function(mixin) {
	suite('mixin', function() {
		test('mixes in all properties from all inputs', function() {
			var a = {
				foo: 100,
				bar: 200
			};
			var b = {
				baz: 300,
				extra: 400
			};
			var mixed = {};
			mixin(mixed, a, b);

			assert.strictEqual(mixed.foo, a.foo);
			assert.strictEqual(mixed.bar, a.bar);
			assert.strictEqual(mixed.baz, b.baz);
			assert.strictEqual(mixed.extra, b.extra);
		});

		test('leftmost takes precedence', function() {
			var a = {
				foo: 'a-foo'
			};
			var b = {
				foo: 'b-foo',
				bar: 'b-bar'
			};
			var c = {
				foo: 'c-foo',
				bar: 'c-bar',
				baz: 'c-baz'
			};
			var mixed = {};
			mixin(mixed, a, b, c);

			assert.strictEqual(mixed.foo, a.foo);
			assert.strictEqual(mixed.bar, b.bar);
			assert.strictEqual(mixed.baz, c.baz);
		});
	});
});
