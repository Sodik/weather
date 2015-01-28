var services = require('../modules/services');
var template = global.window.document.getElementById('main-template').innerHTML;

module.exports = global.Backbone.View.extend({
	el: '#main-box',
	template: global._.template(template),
	initialize: function(){
		this.model = services.getService('current-weather')
		this.listenTo(this.model, 'change', this.render);
	},
	render: function(){
		this.$el.html(this.template( this.model.toJSON() ));
	}
});