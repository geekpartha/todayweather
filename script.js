$(document).ready(function(){
	$('.shortline').hide();
	$('#switch').hide();
	if (navigator.geolocation) {
		var currentPosition = '';
		navigator.geolocation.getCurrentPosition(function(position) {
			currentPosition = position;
			//set lat and lon
			var latitude  = currentPosition.coords.latitude;
			var longitude = currentPosition.coords.longitude;
			//console.log(currentPosition);
			var url = 'https://api.apixu.com/v1/current.json?key=05fc2bf7db3b49fbbb964747191102&q=';
			$.getJSON(url + latitude + ',' +longitude, function(data) {
				
				var data = JSON.stringify(data);
				var json = JSON.parse(data);

				var country = json.location.country;
				var city = json.location.name;
				var state = json.location.region;

				var temp_c = json.current.temp_c;
				var temp_f = json.current.temp_f;
				var last_updated = json.current.last_updated.replace('-', ' ');

				var wind = json.current.wind_kph;
				var humidity = json.current.humidity;
				var cloud = json.current.cloud;

				var time = json.location.localtime.split(' ')[1];

				$('#weather').html(city + ', ' + state + ', ' + country);
				
				//Day - Night images//
				var nightTimeStart = 19;
				var nightTimeEnd = 6;
				var current = new Date();
				var currentHour = current.getHours();
				if (currentHour > nightTimeStart || currentHour < nightTimeEnd) {
				   $('.descrb').html("Good Night");
				   $('.grey-jumbo').css({
				   	backgroundImage: 'url(https://cdn.pixabay.com/photo/2018/03/02/19/21/nature-3194001_960_720.jpg)'
				   })
				} else {
				   $('.descrb').html("Good Day");
				   $('.grey-jumbo').css({
				   	backgroundImage: 'url(https://cdn.pixabay.com/photo/2017/11/04/08/14/tree-2916763_960_720.jpg)'
				   })
				}


				$('#info1').html(time);
				$('#info2').html('Wind ' + wind + ' kmph');
				$('#info3').html(temp_c + '&#8451');

				$('.shortline').show();
				$('#switch').show();

				var yes = true;
				$('#switch').on('click', function(){
					if(yes) {
						$('#info3').html(temp_f + '&#8457');
						$('#switch').html('Change to Celcius');
						yes = false;
					} else {
						$('#info3').html(temp_c + '&#8451');
						$('#switch').html('Change to Faranheight');
						yes = true;
					}
				});

				if(cloud <= 30) {
					$('#info4').html('Clear Sky');
				} else {
					$('#info4').html('Cloudy Sky');
				}
				$('#info5').html('Humidity ' + humidity + '%');

				//console.log(data);
			});
		});
	};
});
