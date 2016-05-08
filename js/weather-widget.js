/*
* Weather Widget 
* @Author Mohammad Shatnawi 5/8/2016 
*/
(function ( $ ) {
 
    $.fn.weatherWidget = function( options ) {
 
        // default options.
        var settings = $.extend({
            
        }, options );
		
		// enable cross domain requests for IE
		$.support.cors = true;
		
		var $container = $(this);
		$container.html('');
		$container.addClass("ww-container")
		
		$.ajax({
			url: 'https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22fairfax%2C%20va%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys',
			type: 'GET',
			success: function(data){ 
				var locationRow = '<div class="ww-row ww-location-row">' + data.query.results.channel.location.city + '&#44;&nbsp;' + data.query.results.channel.location.region + '</div>';
				$container.append(locationRow);
				
				var currentConditionRow = '<div class="ww-row ww-crnt-cond-row">' + '<div class="ww-cell ww-cell-crn-temp">' + data.query.results.channel.item.condition.temp + '&deg;</div><div class="ww-cell"><div><img src="" /></div><div>' + data.query.results.channel.item.condition.text + '</div></div>';
				$container.append(currentConditionRow);
				
				var forecastListHtml = '';
				var forecastList = data.query.results.channel.item.forecast;
				var forecastListMax = 5;
				if(forecastList.length < 5){
					forecastListMax = forecastList.length;
				}
				for(i = 0; i < forecastListMax; i++){
					var cellClass = 'ww-cell ';
					if(i === 0){
						cellClass += 'ww-cell-first';
					}
					forecastListHtml += '<div class="' + cellClass + '"><div>' + forecastList[i].day + '</div><div>' + forecastList[i].high + '&deg;/' + forecastList[i].low + '&deg;</div></div>';
				}
				var forecastRow = '<div class="ww-row ww-forecast-row">' + forecastListHtml + '</div>';
				$container.append(forecastRow);
			},
			error: function(data) {
				$container.append('Sorry! An error happened while requeting data, please try later.'); 
			}
		});
 
		// for chaining
		return this;
    };
 
}( jQuery ));
