module.exports = global.Backbone.Model.extend({
	initialize: function(){
		this.loop();
	},
	loop: function(){
		this.fillData();
		this.timeoutID = global.window.setTimeout(this.loop.bind(this), 300000);
	},
	fillData: function(){
		var _this = this;
		
		if(this.acXHR && typeof this.acXHR.abort === 'function') {
            this.acXHR.abort(); 
        }

		this.acXHR = global.$.ajax({
			url: 'http://api.openweathermap.org/data/2.5/weather?id=706483&lang=ru&units=metric',
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

	 	result.main = {
	 		temp: this.attributes.main.temp + '°C',
	 		temp_min: this.attributes.main.temp_min + '°C',
	 		temp_max: this.attributes.main.temp_max + '°C',
	 		pressure: Math.round(this.attributes.main.pressure*global.mmHg) + 'мм. рт. ст.',
	 		humidity: Math.round(this.attributes.main.humidity) + '%',
	 	};
	 	result.dt_txt = global.moment.unix(result.dt).format('LL');

      	return result;
    }
});