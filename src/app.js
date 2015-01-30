'use strict';
;(function($){
  /* global */
  global._ = _;
  global.$ = $;
  global.Backbone = Backbone;
  global.gui = require('nw.gui');
  global.mmHg = 0.75006375541921;
  global.KELVIN = 273.15;
  global.moment.locale('ru');


  var win = global.gui.Window.get();
  var services = require('./modules/services');
  var CurrentWeather = require('./models/current-weather-model');
  var DailyWeather = require('./models/daily-weather-model');
  var DailyList = require('./modules/daily-list');
  var MainBlock = require('./modules/main-block');

  services.registerService('daily-weather', new DailyWeather());
  services.registerService('current-weather', new CurrentWeather());

  var tray =  require('./modules/tray');
  var dailyList = new DailyList();
  var mainBlock = new MainBlock();

})(jQuery);