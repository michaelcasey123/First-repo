<!--
// These are only global to index.html. No other files can access these.
var $animal;
var $county;
var $photoID;
var $listingType;
var $keyword;
var $lat;
var $lng;
var $zoom;

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
	}




function mapCounty(){
     if ($county=="Antrim") {$lat=54.4; $lng=-6.65; $zoom=9;}
else if ($county=="Armagh") {$lat=54.8; $lng=-7; $zoom=9;}
else if ($county=="Carlow") {$lat=53.2; $lng=-7.3; $zoom=9;}
else if ($county=="Cavan") {$lat=54.5; $lng=-8.25; $zoom=8;}
else if ($county=="Clare") {$lat=53.4; $lng=-10.05; $zoom=8;}
else if ($county=="Cork") {$lat=52.5; $lng=-9.65; $zoom=8;}
else if ($county=="Derry") {$lat=54.4; $lng=-7.45; $zoom=9;}
else if ($county=="Donegal") {$lat=55.5; $lng=-8.75; $zoom=8;}
else if ($county=="Down") {$lat=54.8; $lng=-6.4; $zoom=9;}
else if ($county=="Dublin") {$lat=53.6; $lng=-6.5; $zoom=10;}
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

$(document).ready(function(){
$('#rehomeAnimal').bind("change", function(){// use change rather than click here
	$animal=$('#rehomeAnimal').val();//store animal menu item in animal variable
});//close bind function
});//close document ready function




// the following function binds the value chosen in the select-county list to the variable county when the item is clicked

$(document).ready(function(){
$('#rehomeCounty').bind("change", function(){// use change rather than click here
	$county=$('#rehomeCounty').val();//store county menu item in county variable
	$('#rehomeDdmenuResults').html("You chose: " + $animal + " in " + $county);
   });//close bind function
});//close document ready function




$(document).ready(function(){
$('#lostAnimal').bind("change", function(){// use change rather than click here
	$animal=$('#lostAnimal').val();//store animal menu item in animal variable
});//close bind function
});//close document ready function




// the following function binds the value chosen in the select-county list to the variable county when the item is clicked

$(document).ready(function(){
$('#lostCounty').bind("change", function(){// use change rather than click here
	$county=$('#lostCounty').val();//store county menu item in county variable
	$('#lostDdmenuResults').html("You chose: " + $animal + " in " + $county);
	
});//close bind function
});//close document ready function




$(document).ready(function(){
$('#foundAnimal').bind("change", function(){// use change rather than click here
	$animal=$('#foundAnimal').val();//store animal menu item in animal variable
});//close bind function
});//close document ready function




// the following function binds the value chosen in the select-county list to the variable county when the item is clicked

$(document).ready(function(){
$('#foundCounty').bind("change", function(){// use change rather than click here
	$county=$('#foundCounty').val();//store county menu item in county variable
	$('#foundDdmenuResults').html("You chose: " + $animal + " in " + $county);
	
});//close bind function
});//close document ready function




$(document).ready(function(){
$('#findAnimal').bind("change", function(){// use change rather than click here
	$animal=$('#findAnimal').val();//store animal menu item in animal variable
});//close bind function
});//close document ready function




// the following function binds the value chosen in the select-county list to the variable county when the item is clicked

$(document).ready(function(){
$('#findCounty').bind("change", function(){// use change rather than click here
	$county=$('#findCounty').val();//store county menu item in county variable
	$('#searchDdmenuResults').html("You chose: " + $animal + " in " + $county);
});//close bind function
});//close document ready function



// Search Button function here

$(document).ready(function(){
  $("#searchButton").bind("click", function(){//function fires when button id "searchButton" is pressed
	//window.alert("Search button clicked");//check button
	showCustomer();// function which communicates the animal and county to the server using 			XMLHttpRequest.send()
});// end click function
});// end document ready function




// the function below uses AJAX to contact the localhost server with data for a database search
function showCustomer()
{
var xmlhttp;
if (($animal == "") || ($county == "")) // if nothing has been chosen
  {
  document.getElementById("dbSearchResults").innerHTML="Animal or county missing?"; // output nothing
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
    $('#dblist').append(xmlhttp.responseText);// append the list from jqueryInput2.php to dblist
    $('#dblist').listview('refresh');
    }
  };
xmlhttp.open("GET","http://192.168.1.102/mtcdb1query/jqueryInput2l.php?firstname="+$animal+"&theCounty="+$county,true);
xmlhttp.send();
}





// the function below uses AJAX to contact the localhost server with an ID from the search results data for a database search to get the photo of the animal required. $photoID is taken from the dblist item pressed.
function showCustomerPhoto($photoID)
{
var xmlhttp;
/*
if (($photoID == "")) // if nothing has been chosen
  {
  document.getElementById("photoText").innerHTML="PhotoID missing"; // output error message in this div
  return; // and leave the function
  }
//else */
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
    document.getElementById("photoFromServer").src=xmlhttp.responseText; // write the response from the server into the img src
    }
  };
xmlhttp.open("GET","http://192.168.1.102/mtcdb1query/getPhotol.php?theID="+$photoID,true);
xmlhttp.send();
}


// The function below is to initialise the map

/*
$('.page-map').live("pagecreate", function() {
if(navigator.geolocation) {
navigator.geolocation.getCurrentPosition(function(position){
	initialize(position.coords.latitude,position.coords.longitude);
	});
   }
});
*/

/*
$('.page-map').live("pagecreate", function() {
	initialize(52.675, -6.309);
});
*/



/*     function initialize() {

        var mapOptions = {
          center: new google.maps.LatLng(52.675, -6.309),
//	    center: new google.maps.LatLng(lat,lng),  
        zoom: 8,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"),
            mapOptions);
      }

*/



////////////////////////////////////// Insert Page functions ///////////////////////////////////


// the following function binds the value chosen in the listingType list to the variable $listingType when the item is changed.

$(document).ready(function(){
$('#listingType').bind("change", function(){// use change rather than click here
	$listingType=$('#listingType').val();//store listingType menu item in listingType variable
	
});//close bind function
});//close document ready function


// The function below removes the form item price where not required on page addalisting2

function priceReplace()
{
if ($listingType=="petWanted" || $listingType=="petLost" || $listingType=="petFound")
	{
	$('#priceDiv').html("");
	}
}


// The function below removes the form item calendar where not required on page addalisting2

function calendarReplace()
{
if ($listingType=="petWanted" || $listingType=="petForRehome")
	{
	$('#addAListingCalendarDiv').html("");
	}
}

// If petWanted then no upload of photo, instead go straight to review advert


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
	$('#addalistingDdmenuResults').html("You chose: "+ $listingType+" and " + $animal + " in " + $county);
	priceReplace();
	calendarReplace();
	mapCounty();
});//close bind function
});//close document ready function




// Upload Button function here. This function may have been superseded by the HTML form.
// Can I delete this and fire insertCustomer() from within function onAnimalPhotoURISuccess() in file camera.js / move those functions to this file
$(document).ready(function(){
  $("#uploadButton").bind("click", function(){//function fires when button id "uploadButton" is pressed
	insertCustomer();// function which communicates the animal and county (and photo?) to the server using XMLHttpRequest.send()

});// end click function
});// end document ready function




// the function below uses AJAX to contact the localhost server with data for a database insert. A seperate function (uploadPhoto) in camera.js uploads the photo at the same time from the same button.


function insertCustomer()
{
var xmlhttp;
if (($animal == "") || ($county == "")) // if nothing has been chosen
  {
  document.getElementById("dbInsertResults").innerHTML="Animal or county missing?"; // output nothing
  return; // and leave the function
  }
//else
  document.getElementById("dbInsertResults").innerHTML="Waiting for image to be uploaded..."; // debug code
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
    document.getElementById("dbInsertResults").innerHTML=xmlhttp.responseText; // write the response from the server into the div
    }
  };
xmlhttp.open("GET","http://192.168.1.102/mtcdb1query/jqueryInput4l.php?firstname="+$animal+"&theCounty="+$county,true);// uploads the animal and county on click of the upload button
xmlhttp.send();
}





