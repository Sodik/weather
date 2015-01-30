var services = require('../modules/services');
var template = global.window.document.getElementById('daily-template').innerHTML;

module.exports = global.Backbone.View.extend({
	el: '#list',
	template: global._.template(template),
	initialize: function(){
		this.listenTo(services.getService('daily-weather'), 'change', this.render);
	},
	render: function(){
		this.$el.html( this.template( services.getService('daily-weather').toJSON() ) );
	}
});