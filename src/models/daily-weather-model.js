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
	 		item.pressure = Math.round(item.pressure*global.mmHg) + ' мм. рт. ст.';
	 		item.temp = {
	 			day: parseFloat(item.temp.day.toFixed(1)) + '°C',
	 			min: parseFloat(item.temp.min.toFixed(1)) + '°C',
	 			max: parseFloat(item.temp.max.toFixed(1)) + '°C',
	 			night: parseFloat(item.temp.night.toFixed(1)) + '°C',
	 			eve: parseFloat(item.temp.eve.toFixed(1)) + '°C',
	 			morn: parseFloat(item.temp.morn.toFixed(1)) + '°C'
	 		}
	 	});

      	return result;
    }
});