var services = require('../modules/services');
var template ='<table class="table table-striped table-bordered">'+
	'<thead>'+
		'<tr>'+
			'<th>Дата</th>'+
			'<th>Темпрература</th>'+
			'<th>Давление</th>'+
			'<th>Влажность</th>'+
			'<th>Описание</th>'+
		'</tr>'+
	'</thead><tbody>'+
	'<% list.forEach(function(item){ %>'+
		'<tr>'+
			'<td><%= item.dt_txt %></td>'+
			'<td>'+
				'<dl>'+
					'<dt class="pull-left">Утро:</dt>'+
					'<dd><%= item.temp.morn %></dd>'+
					'<dt class="pull-left">День:</dt>'+
					'<dd><%= item.temp.day %></dd>'+
					'<dt class="pull-left">Вечер:</dt>'+
					'<dd><%= item.temp.eve %></dd>'+
					'<dt class="pull-left">Ночь:</dt>'+
					'<dd><%= item.temp.night %></dd>'+
				'</dl>'+
			'</td>'+ 
			'<td><%= item.pressure %></td>'+
			'<td><%= item.humidity %></td>'+
			'<td><%= item.weather[0].description %></td>'+
		'</tr>'+
	'<% }) %>'+
'</tbody></table>';

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