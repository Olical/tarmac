define(function() {
	/**
	 * This is where you store your data and methods to access it. Keeping
	 * things simple by giving you a data object to store your data in. No set
	 * or get methods in the way, they are not required. So if you have an
	 * array in storage you can just run model.data.someArray.push, no juggling
	 * .get('someArray').
	 *
	 * You can pass an object to the constructor to start it with data. Models
	 * should be loaded by your controllers which should also stitch them into
	 * views whilst keeping them separate from each other.
	 *
	 * Your controllers should be the middlemen between your views and models.
	 *
	 * @param {Object} data Initial data to store in the model.
	 * @class
	 */
	function Model(data) {
		this.data = data || {};
	}

	return Model;
});
