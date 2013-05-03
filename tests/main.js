requirejs.config({
	paths: {
		chai: '../node_modules/chai/chai',
		mocha: '../node_modules/mocha/mocha',
		tarmac: '../src'
	},
	urlArgs: 'v=' + Date.now()
});

define([
	'require',
	'chai',
	'mocha'
], function(require, chai) {
	mocha.setup('tdd');
	assert = chai.assert;

	require([
		'specs/Controller',
		'specs/Model',
		'specs/Router',
		'specs/Storage',
		'specs/View',

		'specs/mixin',
		'specs/mixins/Events'
	], function() {
		mocha.run();
	});
});
