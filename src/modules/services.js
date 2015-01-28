function Services(){
	this.aggregator = global._.extend({}, Backbone.Events);

	this.getService = function (name) {
        return this[name];
    };

    this.registerService = function (name, source) {
        if (name) {
            this[name] = source;
        }
    };

    this.removeService = function (name) {
        if (name) {
            this[name] = null;
            delete this[name];
        }
    };
}

module.exports = new Services();