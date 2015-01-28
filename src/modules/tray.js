var services = require('../modules/services');
var win = global.gui.Window.get();
var currentWeather = services.getService('current-weather');
var trayObject = {
	create: function(){
		tray = new gui.Tray(this.getOptions());

	    tray.on('click', this.close.bind(this));
	},
	getOptions: function(){
		var data = currentWeather.toJSON();
		return {
			icon: 'images/' + data.weather[0].icon + '.png',
			tooltip: this.createMessage(data) 
		};
	},
	createMessage: function(data){
		var msg = [];
		
		if(!data){
			return;
		}

		msg.push('Температура: ' + data.main.temp);
		msg.push('Влажность: ' + data.main.humidity);
		msg.push('Давление: ' + data.main.pressure);
		msg.push(data.weather[0].description);

		return msg.join('\n');
	},
	update: function(){
		if(tray){
			this.remove();
			this.create();
		}
	},
	close: function(){
		win.show();
		this.remove();
	},
	remove: function(){
		tray.remove();
		tray = null;
	}
};
var tray;

currentWeather.on('change', function(model){
	if(tray){
		trayObject.update();
	}
});

module.exports = trayObject;