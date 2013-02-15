<!--
// These are only global to index.html. No other files can access these.
// Pet database search variables

// useurl is in ajaxconfig.js

var $animal;
var $county;
var $photoID;
var $listingType;
var $keyword;
// Mapping variables for Google Maps
var $lat;
var $lng;
var $zoom;
// Global Login Variables
var $email;
var $password;
var $id; // 'users' id retrieved by register() and registration.php

// upload variables:

var $listingType;
var $advertTitle;
var $description;
var $price;
var $day;
var $month;
var $year;
var $date; // used in edited listings
var $phone; // used in edited listings
var $contact_by_email;
var $agree_to_terms;
var $geolongitude; //This is taken from phone's geolocation
var $geolatitude; //This is taken from phone's geolocation

var $ads_id; // 'ads' id retrieved by uploadlisting() and addalisting.php


// PhoneGap Geolocation functions below:

    // Wait for Cordova to load
    //
//    document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    //


    function onDeviceReady() {
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
	}

    // onSuccess Geolocation
    //
   function onSuccess(position) {
	$geolatitude = position.coords.latitude; 
	$geolongitude = position.coords.longitude;
	}

    // onError Callback receives a PositionError object
    //
    function onError(error) {
	$geolatitude = "failed"; 
	$geolongitude = "failed";
    }




// Map functions for lost and found animals below:


// When map page opens display map

$('.page-mapLost1').live("pagecreate", function(){
	initializeLost();
});




     function initializeLost() {

	mapCounty();
        var mapOptions = {
          center: new google.maps.LatLng($lat, $lng), // $lat, $lng and $zoom are taken from function mapCounty() in petsie.js
          zoom: $zoom,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvasLost"),
            mapOptions);

	google.maps.event.trigger(map,'resize');


/*
var txt = '{"data":[{"lat":53.344, "lng":-6.264},{"lat":53.518, "lng":-6.096}]}';
var json = JSON.parse(txt);
*/


var http_request = new XMLHttpRequest();

http_request.onreadystatechange=function()
  {
var json;
    if (http_request.readyState==4 && http_request.status==200)
    {
//    document.getElementById("map_canvasLost").innerHTML=http_request.responseText;// debug code
      json = JSON.parse(http_request.responseText);
//    document.getElementById("map_canvasLost").innerHTML=json.data.length; // debug code
 }



for (var i = 0; i < json.data.length; i++) {
      latLng = new google.maps.LatLng(json.data[i].lat, json.data[i].lng); 

  // Creating a marker and putting it on the map
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    icon: 'Paw2.png'
    });
  }


};
http_request.open("GET",useurl+"lostMarkersSearchDB.php?pettype="+$animal+"&theCounty="+$county,true);
http_request.send();


}




$('.page-mapFound1').live("pagecreate", function(){
	initializeFound();
});




      function initializeFound() {
	mapCounty();
        var mapOptions = {
          center: new google.maps.LatLng($lat, $lng), // $lat, $lng and $zoom are taken from function mapCounty() in petsie.js
          zoom: $zoom,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvasFound"),
            mapOptions);

	google.maps.event.trigger(map,'resize');

/*
var txt = '{"data":[{"lat":53.344, "lng":-6.264},{"lat":53.518, "lng":-6.096}]}';
var json = JSON.parse(txt);
*/


var http_request = new XMLHttpRequest();

http_request.onreadystatechange=function()
  {
var json; 
   if (http_request.readyState==4 && http_request.status==200)
    {
//    document.getElementById("map_canvasFound").innerHTML=http_request.responseText;// debug code
      json = JSON.parse(http_request.responseText);
//    document.getElementById("map_canvasFound").innerHTML=json.data.length; // debug code
 }

for (var i = 0; i < json.data.length; i++) {
      latLng = new google.maps.LatLng(json.data[i].lat, json.data[i].lng); 

  // Creating a marker and putting it on the map
  var marker = new google.maps.Marker({
    position: latLng,
    map: map,
    icon: 'Paw2.png'
    });
  }


};
http_request.open("GET",useurl+"foundMarkersSearchDB.php?pettype="+$animal+"&theCounty="+$county,true);
http_request.send();
}




function mapCounty(){
     if ($county=="Antrim") {$lat=55.4; $lng=-6.65; $zoom=9;}
else if ($county=="Armagh") {$lat=54.8; $lng=-7; $zoom=9;}
else if ($county=="Carlow") {$lat=53.2; $lng=-7.3; $zoom=9;}
else if ($county=="Cavan") {$lat=54.5; $lng=-8.25; $zoom=8;}
else if ($county=="Clare") {$lat=53.4; $lng=-10.05; $zoom=8;}
else if ($county=="Cork") {$lat=52.5; $lng=-9.65; $zoom=8;}
else if ($county=="Derry") {$lat=55.4; $lng=-7.45; $zoom=9;}
else if ($county=="Donegal") {$lat=55.5; $lng=-8.75; $zoom=8;}
else if ($county=="Down") {$lat=54.8; $lng=-6.4; $zoom=9;}
else if ($county=="Dublin") {$lat=53.60; $lng=-6.45; $zoom=10;}
else if ($county=="Fermanagh") {$lat=54.8; $lng=-8.1; $zoom=9;}
else if ($county=="Galway") {$lat=53.9; $lng=-10.2; $zoom=8;}
else if ($county=="Kerry") {$lat=52.5; $lng=-10.75; $zoom=8;}
else if ($county=="Kildare") {$lat=53.7; $lng=-7.3; $zoom=9;}
else if ($county=="Kilkenny") {$lat=53.1; $lng=-7.8; $zoom=9;}
else if ($county=="Laois") {$lat=53.5; $lng=-7.8; $zoom=9;}
else if ($county=="Leitrim") {$lat=54.6; $lng=-8.5; $zoom=9;}
else if ($county=="Limerick") {$lat=53; $lng=-9.3; $zoom=9;}
else if ($county=="Longford") {$lat=54.2; $lng=-8.3; $zoom=9;}
else if ($county=="Louth") {$lat=54.08; $lng=-6.65; $zoom=10;}
else if ($county=="Mayo") {$lat=54.4; $lng=-10.45; $zoom=8;}
else if ($county=="Meath") {$lat=54.1; $lng=-7.15; $zoom=9;}
else if ($county=="Monaghan") {$lat=54.6; $lng=-7.45; $zoom=9;}
else if ($county=="Offaly") {$lat=53.6; $lng=-8.1; $zoom=9;}
else if ($county=="Roscommon") {$lat=54.2; $lng=-8.8; $zoom=9;}
else if ($county=="Sligo") {$lat=54.6; $lng=-9.2; $zoom=9;}
else if ($county=="Tipperary") {$lat=53.2; $lng=-8.75; $zoom=8;}
else if ($county=="Tyrone") {$lat=55; $lng=-8.05; $zoom=8;}
else if ($county=="Waterford") {$lat=52.8; $lng=-8.45; $zoom=8;}
else if ($county=="Westmeath") {$lat=54; $lng=-8; $zoom=9;}
else if ($county=="Wexford") {$lat=53; $lng=-7.06; $zoom=9;}
else if ($county=="Wicklow") {$lat=53.5; $lng=-6.9; $zoom=9;}

}

////////////////////////////////////// Search Page functions ///////////////////////////////////

// the following function binds the value chosen in the select-animal list to the variable animal when the item is clicked

// Get a New Pet pages:

$(document).ready(function(){
$('#getNewBirdTile').bind("click", function(){
	$animal = "Bird";
	$('#SearchForNewPetsBy').attr('src','choosePetTypeBirdsScaled.png');
});
});

$(document).ready(function(){
$('#getNewExoticTile').bind("click", function(){
	$animal = "Exotic";
	$('#SearchForNewPetsBy').attr('src','choosePetTypeExoticScaled.png');
});
});

$(document).ready(function(){
$('#getNewEquineTile').bind("click", function(){
	$animal = "Equine";
	$('#SearchForNewPetsBy').attr('src','choosePetTypeEquineScaled.png');
});
});

$(document).ready(function(){
$('#getNewDogTile').bind("click", function(){
	$animal = "Dog";
	$('#SearchForNewPetsBy').attr('src','choosePetTypeDogsScaled.png');
});
});

$(document).ready(function(){
$('#getNewCatTile').bind("click", function(){
	$animal = "Cat";
	$('#SearchForNewPetsBy').attr('src','choosePetTypeCatsScaled.png');
});
});

$(document).ready(function(){
$('#getNewSmallfurriesTile').bind("click", function(){
	$animal = "SmallFurries";
	$('#SearchForNewPetsBy').attr('src','choosePetTypeSmallfurriesScaled.png');
});
});

$(document).ready(function(){
$('#getNewAquaticTile').bind("click", function(){
	$animal = "Aquatic";
	$('#SearchForNewPetsBy').attr('src','choosePetTypeAquaticScaled.png');
});
});




// the following function binds the value chosen in the select-county list to the variable county when the item is clicked. The menu item needs to be refreshed on entering the page forwards or backwards.

$(document).ready(function(){
$('#rehomeCounty').bind("change", function(){// use change rather than click here
	$county=$('#rehomeCounty').val();//store county menu item in county variable
	$('#rehomeDdmenuResults').html("You chose: " + $animal + " in " + $county);
   });//close bind function
});//close document ready function


// Lost Pets pages:

$(document).ready(function(){
$('#lostBirdTile').bind("click", function(){
	$animal = "Bird";
	$('#SearchForLostPetsBy').attr('src','choosePetTypeBirdsScaled.png');
});
});

$(document).ready(function(){
$('#lostExoticTile').bind("click", function(){
	$animal = "Exotic";
	$('#SearchForLostPetsBy').attr('src','choosePetTypeExoticScaled.png');
});
});

$(document).ready(function(){
$('#lostEquineTile').bind("click", function(){
	$animal = "Equine";
	$('#SearchForLostPetsBy').attr('src','choosePetTypeEquineScaled.png');
});
});

$(document).ready(function(){
$('#lostDogTile').bind("click", function(){
	$animal = "Dog";
	$('#SearchForLostPetsBy').attr('src','choosePetTypeDogsScaled.png');
});
});

$(document).ready(function(){
$('#lostCatTile').bind("click", function(){
	$animal = "Cat";
	$('#SearchForLostPetsBy').attr('src','choosePetTypeCatsScaled.png');
});
});

$(document).ready(function(){
$('#lostSmallfurriesTile').bind("click", function(){
	$animal = "SmallFurries";
	$('#SearchForLostPetsBy').attr('src','choosePetTypeSmallfurriesScaled.png');
});
});

$(document).ready(function(){
$('#lostAquaticTile').bind("click", function(){
	$animal = "Aquatic";
	$('#SearchForLostPetsBy').attr('src','choosePetTypeAquaticScaled.png');
});
});




// the following function binds the value chosen in the select-county list to the variable county when the item is clicked. The menu item needs to be refreshed on entering the page forwards or backwards.

$(document).ready(function(){
$('#lostCounty').bind("change", function(){// use change rather than click here
	$county=$('#lostCounty').val();//store county menu item in county variable
	$('#lostDdmenuResults').html("You chose: " + $animal + " in " + $county);
	
});//close bind function
});//close document ready function


// Found Pets pages:

$(document).ready(function(){
$('#foundBirdTile').bind("click", function(){
	$animal = "Bird";
	$('#SearchForFoundPetsBy').attr('src','choosePetTypeBirdsScaled.png');
});
});

$(document).ready(function(){
$('#foundExoticTile').bind("click", function(){
	$animal = "Exotic";
	$('#SearchForFoundPetsBy').attr('src','choosePetTypeExoticScaled.png');
});
});

$(document).ready(function(){
$('#foundEquineTile').bind("click", function(){
	$animal = "Equine";
	$('#SearchForFoundPetsBy').attr('src','choosePetTypeEquineScaled.png');
});
});

$(document).ready(function(){
$('#foundDogTile').bind("click", function(){
	$animal = "Dog";
	$('#SearchForFoundPetsBy').attr('src','choosePetTypeDogsScaled.png');
});
});

$(document).ready(function(){
$('#foundCatTile').bind("click", function(){
	$animal = "Cat";
	$('#SearchForFoundPetsBy').attr('src','choosePetTypeCatsScaled.png');
});
});

$(document).ready(function(){
$('#foundSmallfurriesTile').bind("click", function(){
	$animal = "SmallFurries";
	$('#SearchForFoundPetsBy').attr('src','choosePetTypeSmallfurriesScaled.png');
});
});

$(document).ready(function(){
$('#foundAquaticTile').bind("click", function(){
	$animal = "Aquatic";
	$('#SearchForFoundPetsBy').attr('src','choosePetTypeAquaticScaled.png');
});
});




// the following function binds the value chosen in the select-county list to the variable county when the item is clicked. The menu item needs to be refreshed on entering the page forwards or backwards.

$(document).ready(function(){
$('#foundCounty').bind("change", function(){// use change rather than click here
	$county=$('#foundCounty').val();//store county menu item in county variable
	$('#foundDdmenuResults').html("You chose: " + $animal + " in " + $county);
	
});//close bind function
});//close document ready function




// Rehome Search Button function here

$(document).ready(function(){
  $("#searchButtonRehome").bind("click", function(){//function fires when button id "searchButtonRehome" is pressed
	//window.alert("Search button clicked");//check button
	showRehomePets();// function which communicates the animal and county to the server using 			XMLHttpRequest.send()
});// end click function
});// end document ready function




// the function below uses AJAX to contact the localhost server with data for a database search
function showRehomePets()
{
var xmlhttp;
if (($animal == "") || ($county == "")) // if nothing has been chosen
  {
  document.getElementById("rehomeSearchText").innerHTML="Animal or county missing?"; // output nothing
  return; // and leave the function
  }
//else
if (window.XMLHttpRequest)
  {
   xmlhttp=new XMLHttpRequest();// code for IE7+, Firefox, Chrome, Opera, Safari
  }
else
  {
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");// code for IE6, IE5
  };
xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    $('#rehomedblist').append(xmlhttp.responseText);// append the list from searchLocalDB.php to dblist
    $('#rehomedblist').listview('refresh');
    }
  };
xmlhttp.open("GET",useurl+"rehomeSearchDB.php?pettype="+$animal+"&theCounty="+$county,true);
xmlhttp.send();
}




function getChosenRehomePetListing($photoID, $ads_id)
{
//document.getElementById("rehomeChosenListing").innerHTML="getChosenRehomePetListing called. $photoID is "+$photoID;// debug code
window.location = 'index.html#rehome3';
var xmlhttp;

if (window.XMLHttpRequest)
  {
   xmlhttp=new XMLHttpRequest();// code for IE7+, Firefox, Chrome, Opera, Safari
  }
else
  {
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");// code for IE6, IE5
  };
xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    // write the response from the server into the listing div:
    document.getElementById("rehomeChosenListing").innerHTML=xmlhttp.responseText; 
    }
  };
xmlhttp.open("GET",useurl+"getChosenListing.php?theID="+$ads_id,true);
xmlhttp.send();
// call a function to fetch the photo:
showChosenRehomePetPhoto($photoID, $ads_id);
}




function showChosenRehomePetPhoto($photoID, $ads_id)
{
var xmlhttp;

if (window.XMLHttpRequest)
  {
   xmlhttp=new XMLHttpRequest();// code for IE7+, Firefox, Chrome, Opera, Safari
  }
else
  {
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");// code for IE6, IE5
  };
xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    // write the response from the server into the img src:
    document.getElementById("rehomeChosenPhotoFromServer").src=xmlhttp.responseText; 
    }
  };
xmlhttp.open("GET",useurl+"getPetPhoto.php?theID="+$photoID,true);
xmlhttp.send();
}




// Lost Search Button function here

$(document).ready(function(){
  $("#searchButtonLost").bind("click", function(){//function fires when button id "searchButtonLost" is pressed
	//window.alert("Search button clicked");//check button
	showLostPets();// function which communicates the animal and county to the server using 			XMLHttpRequest.send()
});// end click function
});// end document ready function




// the function below uses AJAX to contact the localhost server with data for a database search
function showLostPets()
{
var xmlhttp;
if (($animal == "") || ($county == "")) // if nothing has been chosen
  {
  document.getElementById("lostSearchText").innerHTML="Animal or county missing?"; // output nothing
  return; // and leave the function
  }
//else
if (window.XMLHttpRequest)
  {
   xmlhttp=new XMLHttpRequest();// code for IE7+, Firefox, Chrome, Opera, Safari
  }
else
  {
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");// code for IE6, IE5
  };
xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    $('#lost2dblist').append(xmlhttp.responseText);// append the list from searchLocalDB.php to dblist
    $('#lost2dblist').listview('refresh');
    }
  };
xmlhttp.open("GET",useurl+"lostSearchDB.php?pettype="+$animal+"&theCounty="+$county,true);
xmlhttp.send();
}




function getChosenLostPetListing($photoID, $ads_id)
{
window.location = 'index.html#lost3';
var xmlhttp;

if (window.XMLHttpRequest)
  {
   xmlhttp=new XMLHttpRequest();// code for IE7+, Firefox, Chrome, Opera, Safari
  }
else
  {
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");// code for IE6, IE5
  };
xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    // write the response from the server into the listing div:
    document.getElementById("lostChosenListing").innerHTML=xmlhttp.responseText; 
    }
  };
xmlhttp.open("GET",useurl+"getChosenListing.php?theID="+$ads_id,true);
xmlhttp.send();
// call a function to fetch the photo:
showChosenLostPetPhoto($photoID, $ads_id);
}




function showChosenLostPetPhoto($photoID, $ads_id)
{
var xmlhttp;

if (window.XMLHttpRequest)
  {
   xmlhttp=new XMLHttpRequest();// code for IE7+, Firefox, Chrome, Opera, Safari
  }
else
  {
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");// code for IE6, IE5
  };
xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    // write the response from the server into the img src:
    document.getElementById("lostChosenPhotoFromServer").src=xmlhttp.responseText; 
    }
  };
xmlhttp.open("GET",useurl+"getPetPhoto.php?theID="+$photoID,true);
xmlhttp.send();
}





// Found Search Button function here

$(document).ready(function(){
  $("#searchButtonFound").bind("click", function(){//function fires when button id "searchButtonFound" is pressed
	//window.alert("Search button clicked");//check button
	showFoundPets();// function which communicates the animal and county to the server using 			XMLHttpRequest.send()
});// end click function
});// end document ready function




// the function below uses AJAX to contact the localhost server with data for a database search
function showFoundPets()
{
var xmlhttp;
if (($animal == "") || ($county == "")) // if nothing has been chosen
  {
  document.getElementById("foundSearchText").innerHTML="Animal or county missing?"; // output nothing
  return; // and leave the function
  }
//else
if (window.XMLHttpRequest)
  {
   xmlhttp=new XMLHttpRequest();// code for IE7+, Firefox, Chrome, Opera, Safari
  }
else
  {
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");// code for IE6, IE5
  };
xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    $('#foundPetsdblist').append(xmlhttp.responseText);// append the list from searchLocalDB.php to dblist
    $('#foundPetsdblist').listview('refresh');
    }
  };
xmlhttp.open("GET",useurl+"foundSearchDB.php?pettype="+$animal+"&theCounty="+$county,true);
xmlhttp.send();
}




function getChosenFoundPetListing($photoID, $ads_id)
{
window.location = 'index.html#found3';
var xmlhttp;

if (window.XMLHttpRequest)
  {
   xmlhttp=new XMLHttpRequest();// code for IE7+, Firefox, Chrome, Opera, Safari
  }
else
  {
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");// code for IE6, IE5
  };
xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    // write the response from the server into the listing div:
    document.getElementById("foundChosenListing").innerHTML=xmlhttp.responseText; 
    }
  };
xmlhttp.open("GET",useurl+"getChosenListing.php?theID="+$ads_id,true);
xmlhttp.send();
// call a function to fetch the photo:
showChosenFoundPetPhoto($photoID, $ads_id);
}




function showChosenFoundPetPhoto($photoID, $ads_id)
{
var xmlhttp;

if (window.XMLHttpRequest)
  {
   xmlhttp=new XMLHttpRequest();// code for IE7+, Firefox, Chrome, Opera, Safari
  }
else
  {
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");// code for IE6, IE5
  };
xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    // write the response from the server into the img src:
    document.getElementById("foundChosenPhotoFromServer").src=xmlhttp.responseText; 
    }
  };
xmlhttp.open("GET",useurl+"getPetPhoto.php?theID="+$photoID,true);
xmlhttp.send();
}




////////////////////////////////////// Insert Page functions ///////////////////////////////////


// The function below collects data and fires the login function when the login button from "Place an Ad" is pressed. 

$(document).ready(function(){
$('#loginButton').bind("click", function(){
	$email=$('#storedEmailAddress').val();
	$password=$('#storedPassword').val();
//	$('#loginButtonfeedback').html("email "+$email+" password "+$password); // debug code
	login($email,$password);
});//close bind function
});//close document ready function




// The function below  collects data and fires the login2 function when the login button from "My Ads" is pressed. 

$(document).ready(function(){
$('#login2Button').bind("click", function(){
	$email=$('#storedEmailAddress2').val();
	$password=$('#storedPassword2').val();
//	$('#login2Buttonfeedback').html("email is "+$email+". password is "+$password); // test code
	login2($email,$password);
});//close bind function
});//close document ready function



// The function below passes email and password to the server and if successful returns user id (field id from the 'users' table) to the function and location's to the addalisting Page.

function login($email,$password)
{
var xmlhttp;

if (window.XMLHttpRequest)
  {
   xmlhttp=new XMLHttpRequest();// code for IE7+, Firefox, Chrome, Opera, Safari
  }
else
  {
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");// code for IE6, IE5
  };
xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    // store the response from the server into the id variable:
    $id = xmlhttp.responseText;
//	$('#loginButtonfeedback').html($id); // test code
	$('#addalistingDdmenuResults').html($id); // test code
		if (parseInt($id) > 1 && parseInt($id) < 5000000)
		{
//		$('#loginButtonfeedback').html($id+" Correct!"); // debug code
		window.location = 'index.html#addalisting';
		}
    }
  };
xmlhttp.open("GET",useurl+"login.php?email="+$email+"&password="+$password,true);
xmlhttp.send();
}


// The function below passes email and password to the server and if successful returns user id (field id from the 'users' table) to the function and location's to the myListings Page.

function login2($email,$password)
{
//$('#login2Buttonfeedback').html("email is "+$email+". password is "+$password+". function login2 entered..."); // test code
var xmlhttp;

if (window.XMLHttpRequest)
  {
   xmlhttp=new XMLHttpRequest();// code for IE7+, Firefox, Chrome, Opera, Safari
  }
else
  {
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");// code for IE6, IE5
  };
xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    // store the response from the server into the id variable:
    $id = xmlhttp.responseText;
//	$('#login2Buttonfeedback').html($id); // test code
	$('#myListingsSearchText').html($id); // test code
		if (parseInt($id) > 1 && parseInt($id) < 5000000)
		{
//		$('#loginButton2feedback').html($id+" Correct!"); // debug code
		window.location = 'index.html#myListings';
		getMyListings($id);
		}
    }
  };
xmlhttp.open("GET",useurl+"login.php?email="+$email+"&password="+$password,true);
xmlhttp.send();
}





// The function below  collects data and fires the register function when the Register button from "Place an Ad" is pressed. 

$(document).ready(function(){
$('#registerButton').bind("click", function(){
	$nameTitle = $('#nameTitle').val();
	$firstName = $('#firstName').val();
	$secondName = $('#secondName').val();
	$registerCounty = $('#registerCounty').val();
	$contactPhoneNumber = $('contactPhoneNumber').val();
	$email = $('#contactEmail').val();//store contactEmail text input field contents in email variable
	$password = $('#password').val();//store password text input field contents in password variable
	register($nameTitle,$firstName,$secondName,$registerCounty,$contactPhoneNumber,$email,$password);
});//close bind function
});//close document ready function




function register($nameTitle,$firstName,$secondName,$registerCounty,$contactPhoneNumber,$email,$password)
{
var xmlhttp;

if (window.XMLHttpRequest)
  {
   xmlhttp=new XMLHttpRequest();// code for IE7+, Firefox, Chrome, Opera, Safari
  }
else
  {
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");// code for IE6, IE5
  };
xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    // store the response from the server into the id variable:
    $id = xmlhttp.responseText;
//	$('#registerButtonfeedback').html($id); // test code
	$('#addalistingDdmenuResults').html($id); // test code

		if (parseInt($id) > 1 && parseInt($id) < 5000000)
		{
		window.location = 'index.html#addalisting';
		}

    }
  };
xmlhttp.open("GET",useurl+"registration.php?nameTitle="+$nameTitle+"&firstName="+$firstName+"&secondName="+$secondName+"&registerCounty="+$registerCounty+"&contactPhoneNumber="+$contactPhoneNumber+"&email="+$email+"&password="+$password,true);
xmlhttp.send();
}




// the following function binds the value chosen in the listingType list to the variable $listingType when the item is changed.

$(document).ready(function(){
$('#listingType').bind("change", function(){// use change rather than click here
	$listingType=$('#listingType').val();//store listingType menu item in listingType variable
	priceReplace();
	calendarReplace();
});//close bind function
});//close document ready function




// The function below removes the form item price where not required on page addalisting

function priceReplace()
{
if ($listingType=="2")
	{
	$('#priceDiv').html("");
	}
}


// The function below removes the form item calendar where not required on page addalisting

function calendarReplace()
{
if ($listingType=="1")
	{
	$('#addAListingCalendarDiv').html("");
	}
}




// the following function binds the value chosen in the add-animal list to the variable animal when the item is changed.

$(document).ready(function(){
$('#addAnimal').bind("change", function(){// use change rather than click here
	$animal=$('#addAnimal').val();//store animal menu item in animal variable
});//close bind function
});//close document ready function




// the following function binds the value chosen in the select-county list to the variable county when the item is changed.

$(document).ready(function(){
$('#addCounty').bind("change", function(){// use change rather than click here
	$county=$('#addCounty').val();//store county menu item in county variable
//	$('#addalistingDdmenuResults').html("You chose: "+ $listingType+" and " + $animal + " in " + $county); // debug code
//	mapCounty(); // Don't think we need this here
});//close bind function
});//close document ready function



// the function below gets the user location (if button pressed) and sets the $geolatitude and $geolongitude global variables.

$(document).ready(function(){
$('#geolocationButton').bind("click", function(){
document.addEventListener("deviceready", onDeviceReady, false);
});//close bind function
});//close document ready function


// $listingType, $animal, $id, $county, $geolatitude and $geolongitude are global and are not gathered in the next function which collects data from the addalisting page

$(document).ready(function(){
$('#addListing2Button').bind("click", function(){
	$advertTitle = $('#advertTitle').val();
	$description = $('#description').val();
	$price = $('#price').val();
	$day = $('#addAListingSelectDay').val();
	$month = $('#addAListingSelectMonth').val();
	$year = $('#addAListingSelectYear').val();
	$contact_by_email = $('#addAListingEmailAgree').val();
	$agree_to_terms = $('#addAListingTandCsAgree').val();
	addAListingPreview($id,$listingType,$animal,$county,$advertTitle,$description,$price,$day,$month,$year,$contact_by_email,$agree_to_terms);
});//close bind function
});//close document ready function





// the function below takes the user input, queries the database (via addAListingPreview.php )for the user's phone number and email address and displays a preview of the advert. The photo preview will also be dealt with here

function addAListingPreview($id,$listingType,$animal,$county,$advertTitle,$description,$price,$day,$month,$year,$contact_by_email,$agree_to_terms)
{
// deal with the case where T&Cs are not agreed to:
if ($agree_to_terms=="0")
	{
	$('#addAListingFeedback').html("You must agree to the Terms & Conditions in order to place an advertisement.");
	}
else
	{
	$('#addAListingFeedback').html(""); // clear the message above.

// feedback on geolocation:

	$('#addAListingFeedback').html("Geolocation: "+$geolatitude+" & "+$geolongitude); // debug code

	if ($price==undefined)
	{
	$price = "Price not relevant";
	}
	else
	{
	$price = "EUR"+$price;
	}

	var xmlhttp;

	if (window.XMLHttpRequest)
	  {
	   xmlhttp=new XMLHttpRequest();// code for IE7+, Firefox, Chrome, Opera, Safari
	  }
	else
	  {
	  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");// code for IE6, IE5
	  };
	xmlhttp.onreadystatechange=function()
	  {
		if (xmlhttp.readyState==4 && xmlhttp.status==200)
		{

		$previewText = xmlhttp.responseText;

		$('#addedListing').html($previewText); // test code

		}
	  };
// addAListingPreview.php receives the raw information and adds information from the database tables users, pet_type, location_counties and sends it back in order.
	xmlhttp.open("GET",useurl+"addAListingPreview.php?userid="+$id+"&allowEmail="+$contact_by_email+"&animal="+$animal+"&county="+$county+"&advertTitle="+$advertTitle+"&description="+$description+"&price="+$price,true);
	xmlhttp.send();

	}
}



// the function below uploads the advert using global variables to the server database and the photo to AWS

function uploadlisting()
{
var xmlhttp;

if (window.XMLHttpRequest)
  {
   xmlhttp=new XMLHttpRequest();// code for IE7+, Firefox, Chrome, Opera, Safari
  }
else
  {
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");// code for IE6, IE5
  };
xmlhttp.onreadystatechange=function()
  {
	if (xmlhttp.readyState==4 && xmlhttp.status==200)
	{

	$ads_id = xmlhttp.responseText; // test code
		if (parseInt($ads_id) > 4491)
			{
			$('#uploadFeedback').html("Ad upload successful "+$ads_id); // remove $ads_id later

			photoUploads($ads_id,$animal);

			}
		else
			{
			$('#uploadFeedback').html($ads_id); // test code		
			}
	}
  };
xmlhttp.open("GET",useurl+"addalisting.php?userid="+$id+"&advertTitle="+$advertTitle+"&description="+$description+"&county="+$county+"&allowEmail="+$contact_by_email+"&longitude="+$geolongitude+"&latitude="+$geolatitude+"&date_lost_found="+$year+$month+$day+"&sale_price="+$price+"&ad_type_id="+$listingType+"&pet_type_id="+$animal,true);
xmlhttp.send();
}




function photoUploads($ads_id,$animal)
{

// start loop here

uploadPhoto(filePath); // these are in cameraPets.js

var xmlhttp;

xmlhttp=new XMLHttpRequest(); // not using old IE browsers

xmlhttp.onreadystatechange=function()
  {
	if (xmlhttp.readyState==4 && xmlhttp.status==200)
	{
	$photo_id = xmlhttp.responseText; // test code
		if (parseInt($photo_id) > 6795)
			{
			$('#photoUploadFeedback').html("Photo upload successful "+$photo_id+"<br/>"); // remove $photo_id later
			}
		else
			{
			$('#photoUploadFeedback').html($photo_id); // test code		
			}
	}
  };
// ad_photos.php receives the ads_id and animal and manages the uploaded photos and database inserts.
	xmlhttp.open("GET",useurl+"ad_photos.php?ads_id="+$ads_id+"&animal="+$animal,true);
	xmlhttp.send();

// loop end condition here
}




function getMyListings($id)
{
var xmlhttp;

if (window.XMLHttpRequest)
  {
   xmlhttp=new XMLHttpRequest();// code for IE7+, Firefox, Chrome, Opera, Safari
  }
else
  {
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");// code for IE6, IE5
  };
xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    $('#myListingsdblist').append(xmlhttp.responseText);// append the list from myListings.php to myListingsdblistdblist
    $('#myListingsdblist').listview('refresh');
    }
  };
xmlhttp.open("GET",useurl+"myListings.php?id="+$id,true);
xmlhttp.send();
}




function getChosenMyPetListing($photoID,$ads_id)
{
window.location = 'index.html#chosenPetListing';
var xmlhttp;

if (window.XMLHttpRequest)
  {
   xmlhttp=new XMLHttpRequest();// code for IE7+, Firefox, Chrome, Opera, Safari
  }
else
  {
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");// code for IE6, IE5
  };
xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    // write the response from the server into the listing div:
    document.getElementById("chosenPetListingDiv").innerHTML=xmlhttp.responseText; 
    }
  };
xmlhttp.open("GET",useurl+"getChosenListing.php?theID="+$ads_id,true);
xmlhttp.send();
// call a function to fetch the photo:
showChosenMyPetPhoto($photoID,$ads_id);
}




function showChosenMyPetPhoto($photoID,$ads_id)
{
var xmlhttp;

if (window.XMLHttpRequest)
  {
   xmlhttp=new XMLHttpRequest();// code for IE7+, Firefox, Chrome, Opera, Safari
  }
else
  {
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");// code for IE6, IE5
  };
xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    // write the response from the server into the img src:
    document.getElementById("chosenPetListingPhotoFromServer").src=xmlhttp.responseText; 
    }
  };
xmlhttp.open("GET",useurl+"getPetPhoto.php?theID="+$photoID,true);
xmlhttp.send();
myPetListingButtons($photoID,$ads_id);
}




function myPetListingButtons($photoID,$ads_id)
{
$('#deleteMyListingButton').button().bind("click", function(){
deleteListing($photoID, $ads_id);
});
$('#editMyListingButton').button().bind("click", function(){
editListing($photoID,$ads_id);
});
}




function deleteListing($photoID,$ads_id)
{
var xmlhttp;

if (window.XMLHttpRequest)
  {
   xmlhttp=new XMLHttpRequest();// code for IE7+, Firefox, Chrome, Opera, Safari
  }
else
  {
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");// code for IE6, IE5
  };
xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    // write the response from the server into the div:
    document.getElementById("deleteListingFeedback").innerHTML=xmlhttp.responseText; 
    }
  };
xmlhttp.open("GET",useurl+"deleteListing.php?photoID="+$photoID+"&adID="+$ads_id,true);
xmlhttp.send();
}




function editListing($photoID,$ads_id)
{
var xmlhttp;

if (window.XMLHttpRequest)
  {
   xmlhttp=new XMLHttpRequest();// code for IE7+, Firefox, Chrome, Opera, Safari
  }
else
  {
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");// code for IE6, IE5
  };
xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
	var jsonString = xmlhttp.responseText;
	var jsonObject = eval("("+jsonString+")");

	$animal = jsonObject.animal;
	$county = jsonObject.county;
	$advertTitle = jsonObject.title;
	$description = jsonObject.description;
	$price = jsonObject.sale_price;
	$date = jsonObject.date_lost_found;
	$listingType = jsonObject.listingType;
	$phone = jsonObject.phone;
	$email = jsonObject.email;
	$contact_by_email = jsonObject.contact_by_email;


	$('#editListingFeedbackAnimalDiv').html($animal);
	$('#editListingFeedbackCountyDiv').html($county);

	$('#editUpdateListingAdvertTitle').val($advertTitle);
	$('#editUpdateListingDescription').val($description);
	$('#editUpdateListingPrice').val($price);
	$('#editUpdateListingDate').val($date);
	$('#editUpdateListingContactPhoneNumber').val($phone);
	$('#editUpdateListingContactEmail').val($email);
	$('#editUpdateListingEmailAgree').val($contact_by_email);

	if ($listingType=="2")
		{
		$('#editUpdateListingPriceDiv').html("");
		}

	if ($listingType=="1")
		{
		$('#editUpdateListingCalendarDiv').html("");
		}
    }
  };
xmlhttp.open("GET",useurl+"editListing.php?adID="+$ads_id,true);
xmlhttp.send();
editListingPetPhoto($photoID,$ads_id,$animal,$county);
}




function editListingPetPhoto($photoID,$ads_id,$animal,$county)
{
var xmlhttp;

if (window.XMLHttpRequest)
  {
   xmlhttp=new XMLHttpRequest();// code for IE7+, Firefox, Chrome, Opera, Safari
  }
else
  {
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");// code for IE6, IE5
  };
xmlhttp.onreadystatechange=function()
  {
    if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    // write the response from the server into the img src:
	
    document.getElementById("editUpdateListingPhotoFromServer").src=xmlhttp.responseText;
    document.getElementById("previewEditedListingAnimalImage").src=xmlhttp.responseText;// this is the old photo in the preview if no new image supplied
    }
  };
xmlhttp.open("GET",useurl+"getPetPhoto.php?theID="+$photoID,true);
xmlhttp.send();
updateListingPreviewData($photoID,$ads_id,$animal,$county);
}




function updateListingPreviewData($photoID,$ads_id,$animal,$county)
{
$(document).ready(function(){
$('#editMyListingPreviewButton').bind("click", function(){

	$animal = $('#editListingFeedbackAnimalDiv').html();
	$county = $('#editListingFeedbackCountyDiv').html();

	$advertTitle = $('#editUpdateListingAdvertTitle').val();
	$description = $('#editUpdateListingDescription').val();
	$price = $('#editUpdateListingPrice').val();
	$date = $('#editUpdateListingDate').val();
	$phone = $('#editUpdateListingContactPhoneNumber').val();
	$email = $('#editUpdateListingContactEmail').val();
	$contact_by_email = $('#editUpdateListingEmailAgree').val();
	updateListingPreviewDataCheck($photoID,$ads_id,$animal,$county,$advertTitle,$description,$price,$date,$phone,$email,$contact_by_email);
});//close bind function
});//close document ready function
}




function updateListingPreviewDataCheck($photoID,$ads_id,$animal,$county,$advertTitle,$description,$price,$date,$phone,$email,$contact_by_email)
{
	if ($price==undefined || $price=='Null' )
	{
	$price = "Price not relevant";
	}
	else
	{
	$price = "EUR"+$price;
	}

if ($contact_by_email==1)
	{
	$previewText = $photoID+"<br/>"+$ads_id+"<br/>"+$animal+"<br/>"+$advertTitle+"<br/>"+$description+"<br/>"+$price+"<br/>"+$county+"<br/>"+$phone+"<br/>"+$email;
	}
else
	{
	$previewText = $animal+"<br/>"+$advertTitle+"<br/>"+$description+"<br/>"+$price+"<br/>"+$county+"<br/>"+$phone;
	}

 $('#previewEditedListingDiv').html($previewText);


$(document).ready(function(){
$('#uploadEditedListingButton').bind("click", function(){
$('#updateFeedback').html("Upload Listing Button clicked!...");
updateListing($photoID,$ads_id,$advertTitle,$description,$price,$date,$phone,$email,$contact_by_email);
});
});

}




// the function below updates the advert to the server database and the new photo to AWS

function updateListing($photoID,$ads_id,$advertTitle,$description,$price,$date,$phone,$email,$contact_by_email)
{
var xmlhttp;

if (window.XMLHttpRequest)
  {
   xmlhttp=new XMLHttpRequest();// code for IE7+, Firefox, Chrome, Opera, Safari
  }
else
  {
  xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");// code for IE6, IE5
  };
xmlhttp.onreadystatechange=function()
  {
	if (xmlhttp.readyState==4 && xmlhttp.status==200)
	{

	$animal_id = xmlhttp.responseText; // test code
// $animal_id must be between 68 and 75 inc.
		if (parseInt($animal_id) > 67 && parseInt($animal_id) < 76)
			{
			$('#updateFeedback').html("Ad update successful "+$animal_id); // remove $animal_id later

			if (replacePicture == 1) // globally set in cameraPets.js
				{
				editedPhotoUploads($photoID,$ads_id,$animal_id);
				}
			}
		else
			{
			$('#updateFeedback').html($animal_id); // test code		
			}
	}
  };
xmlhttp.open("GET",useurl+"updateListing.php?ads_id="+$ads_id+"&advertTitle="+$advertTitle+"&description="+$description+"&allowEmail="+$contact_by_email+"&date_lost_found="+$date+"&sale_price="+$price+"&phone="+$phone+"&email="+$email,true);
xmlhttp.send();
}




function editedPhotoUploads($photoID,$ads_id,$animal_id)
{

// start loop here

uploadPhoto(filePath); // these are in cameraPets.js

var xmlhttp;

xmlhttp=new XMLHttpRequest(); // not using old IE browsers

xmlhttp.onreadystatechange=function()
  {
	if (xmlhttp.readyState==4 && xmlhttp.status==200)
	{
	$photo_id = xmlhttp.responseText; // test code
		if (parseInt($photo_id) > 1)
			{
			$('#photoUpdateFeedback').html("Photo upload successful "+$photo_id+"<br/>"); // remove $photo_id later
			}
		else
			{
			$('#photoUpdateFeedback').html($photo_id); // test code		
			}
	}
  };
// edit_ad_photos.php receives the ads_id and animal and manages the uploaded photos and database inserts.
	xmlhttp.open("GET",useurl+"edit_ad_photos.php?ads_id="+$ads_id+"&animal="+$animal_id+"&photoID="+$photoID,true);
	xmlhttp.send();

// loop end condition here
}

