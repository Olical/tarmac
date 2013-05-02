define([
	'tarmac/utils/blend'
], function(blend) {
	suite('tarmac/utils/blend', function() {
		test('returns cloned objects', function() {
			var original = {
				foo: true
			};
			var blended = blend(original);

			blended.bar = true;

			assert.isUndefined(original.bar, 'does not add bar to original');
		});

		test('returns all properties from both inputs', function() {
			var a = {
				foo: 100,
				bar: 200
			};
			var b = {
				baz: 300,
				extra: 400
			};
			var blended = blend(a, b);

			assert.strictEqual(blended.foo, a.foo);
			assert.strictEqual(blended.bar, a.bar);
			assert.strictEqual(blended.baz, b.baz);
			assert.strictEqual(blended.extra, b.extra);
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
			var blended = blend(a, b, c);

			assert.strictEqual(blended.foo, a.foo);
			assert.strictEqual(blended.bar, b.bar);
			assert.strictEqual(blended.baz, c.baz);
		});
	});
});
