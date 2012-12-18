<!--
    // Wait for Cordova to load

    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready

    function onDeviceReady() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

    // onSuccess Geolocation

    function onSuccess(position) {
	var lat = position.coords.latitude;
	var lng = position.coords.longitude;
        initialize(lat, lng);// open the map using the co-ords as map center
    }

    // onError Callback receives a PositionError object

    function onError(error) {
        alert('code: '    + error.code    + '\n' +
              'message: ' + error.message + '\n');
    }

function initialize(lat, lng) { 
        var mapOptions = {
          center: new google.maps.LatLng(lat, lng),
          zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);

	var latLng = new google.maps.LatLng(lat, lng);
	
	var marker = new google.maps.Marker({
    	position: latLng,
    	map: map,
    	icon: 'YouAreHereMarker.png'
    	});
   }
-->
