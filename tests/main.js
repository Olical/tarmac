requirejs.config({
	paths: {
		chai: '../node_modules/chai/chai',
		mocha: '../node_modules/mocha/mocha',
		sinon: '../node_modules/sinon/pkg/sinon',
		tarmac: '../src'
	}
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
