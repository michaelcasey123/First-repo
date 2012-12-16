// Creating a marker and positioning it on the map    
    var marker = new google.maps.Marker({    
      position: new google.maps.LatLng(37.869565, -122.258786),    
      map: map    
    }); 




var marker = new google.maps.Marker({
  position: new google.maps.LatLng(56.8848, 14.7730),
  map: map,
  title: 'My workplace',
  clickable: false
});





var marker = new google.maps.Marker({
  position: new google.maps.LatLng(56.8848, 14.7730), 
  map: map,
  title: 'Lost Pet',
  clickable: false,
  icon: 'tiles/Paw.png'
  //icon: 'http://google-maps-icons.googlecode.com/files/factory.png'
});





var json = [
  {
    "title": "Lost Dog",
    "lat": 53.54,
    "lng": -6.54,
    "description": "Description of Dog 1."
  },
  {
    "title": "Lost Dog",
    "lat": 53.56,
    "lng": -6.47,
    "description": "Description of Dog 2."
  }
]

for (var i = 0, length = json.length; i < length; i++) {
  var data = json[i],
      latLng = new google.maps.LatLng(data.lat, data.lng); 

  // Creating a marker and putting it on the map
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    title: data.title
  });
}
