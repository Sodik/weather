module.exports = global.Backbone.Model.extend({
	initialize: function(){
		this.fillData();
	},
	fillData: function(){
		var _this = this;
		global.$.ajax({
			url: 'http://api.openweathermap.org/data/2.5/forecast/daily?id=706483&lang=ru&units=metric',
			dataType: 'jsonp',
			success: function(data){
				_this.set(data);
			},
			error: function(data){
				console.error('Error ' + data);
			}
		});
	},
	toJSON: function(options) {
		var result = _.cloneDeep(this.attributes);

	 	result.list.forEach(function(item){
	 		item.dt_txt = global.moment.unix(item.dt).format('LL');
	 		item.humidity = Math.round(item.humidity) + '%';
	 		item.pressure = Math.round(item.pressure*global.mmHg) + 'мм. рт. ст.';
	 		item.temp = {
	 			day: item.temp.day + '°C',
	 			min: item.temp.min + '°C',
	 			max: item.temp.max + '°C',
	 			night: item.temp.night + '°C',
	 			eve: item.temp.eve + '°C',
	 			morn: item.temp.morn + '°C'
	 		}
	 	});

      	return result;
    }
});