<!--
// These are only global to index.html. No other files can access these.
// Pet database search variables
var $animal;
var $county;
var $photoID;
var $listingType;
var $keyword;
// Mapping variables for Google Maps
var $lat;
var $lng;
var $zoom;
/* Login variables from Facebook
var $id;
var $name;
var $firstName;
var $lastName;
var $userName;
var $gender;
var $locale;
var $email;
*/
// The following functions get the phone's file system and read the file written by Android in petsie.java

    // Wait for Cordova to load
/*    
    function onLoad() {
        document.addEventListener("deviceready", onDeviceReady, false);
    }

    // Cordova is ready
    // This needs to be done immediately after Facebook Login or from existing file from previous login
    function onDeviceReady() {
        window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFS, fail);
    }

    function gotFS(fileSystem) {
        fileSystem.root.getFile("facebookUserInfo", null, gotFileEntry, fail);
    }

    function gotFileEntry(fileEntry) {
        fileEntry.file(gotFile, fail);
    }

    function gotFile(file){
        readDataUrl(file);
        readAsText(file);
    }

    // I don't think I need this function. Check when file written, whether it's data or text. Also locate it on the phone if possible.

     function readDataUrl(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            console.log("Read as data URL");
            console.log(evt.target.result);
        };
        reader.readAsDataURL(file);
    }

    function readAsText(file) {
        var reader = new FileReader();
        reader.onloadend = function(evt) {
            console.log("Read as text");
            console.log(evt.target.result); // presumably the file's contents are written to the browser debug console. How do I see this from the phone? Are they shown on the Eclipse LogCat? They need to be assigned to variables.
        };
        reader.readAsText(file);
    }

    function fail(error) {
        console.log(error.code);
    }

*/



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




// Rehome Search Button function here

$(document).ready(function(){
  $("#searchButtonRehome").bind("click", function(){//function fires when button id "searchButtonRehome" is pressed
	//window.alert("Search button clicked");//check button
	showRehomePet();// function which communicates the animal and county to the server using 			XMLHttpRequest.send()
});// end click function
});// end document ready function




// the function below uses AJAX to contact the localhost server with data for a database search
function showRehomePet()
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
//xmlhttp.open("GET","http://192.168.1.102/petsie/rehomeSearchLocalDB.php?pettype="+$animal+"&theCounty="+$county,true);
xmlhttp.open("GET","http://localhost/petsie/rehomeSearchLocalDB.php?pettype="+$animal+"&theCounty="+$county,true);
xmlhttp.send();
}




// the function below uses AJAX to contact the localhost server with an ID from the search results data for a database search to get the photo link of the animal required. $photoID is taken from the dblist item pressed.
function showRehomePetPhoto($photoID)
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
    document.getElementById("rehomePhotoFromServer").src=xmlhttp.responseText; 
    // call a function to generate a button below the photo:
    getRehomePetListingButton($photoID);
    }
  };
//xmlhttp.open("GET","http://192.168.1.102/petsie/getLocalPetPhoto.php?theID="+$photoID,true);
xmlhttp.open("GET","http://localhost/petsie/getLocalPetPhoto.php?theID="+$photoID,true);
xmlhttp.send();
}




// The function below is called from showRehomePetPhoto() to generate a button below the photo to display the pet listing details (and photo again) on the next page. Pressing the button/link moves to the next page. Where the information will be written by function getRehomePetListing and getChosenListing.php. 
//There seems to be some idiotic random bug generated by jQuery Mobile causing further program operation to stop after the button is written. Consequently a standard button and link has been used.

function getRehomePetListingButton($photoID)
{
//document.getElementById("rehomeChosenListing").innerHTML="getRehomePetListingButton called. $photoID is "+$photoID;// debug code

//document.getElementById("RehomeListingButtonDiv").innerHTML="<a href='#rehome3' data-role='button' id='selectedRehomeButton' data-iconpos='right' data-icon='arrow-r' data-inline='true' data-theme='b' data-mini='true'>Select This Listing</a>";

document.getElementById("RehomeListingButtonDiv").innerHTML="<a href='#rehome3'><button id='selectedRehomeButton'>Select This Listing</button></a>";

$('#selectedRehomeButton').button(); // initialise button before refreshing it.
$('#selectedRehomeButton').button('refresh');
getChosenRehomePetListing($photoID);// Get detailed listing from server
}




function getChosenRehomePetListing($photoID)
{
//document.getElementById("rehomeChosenListing").innerHTML="getChosenRehomePetListing called. $photoID is "+$photoID;// debug code

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
//xmlhttp.open("GET","http://192.168.1.102/petsie/getChosenListing.php?theID="+$photoID,true);
xmlhttp.open("GET","http://localhost/petsie/getChosenListing.php?theID="+$photoID,true);
xmlhttp.send();
// call a function to fetch the photo:
showChosenRehomePetPhoto($photoID);
}




function showChosenRehomePetPhoto($photoID)
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
//xmlhttp.open("GET","http://192.168.1.102/petsie/getLocalPetPhoto.php?theID="+$photoID,true);
xmlhttp.open("GET","http://localhost/petsie/getLocalPetPhoto.php?theID="+$photoID,true);
xmlhttp.send();
}




// Lost Search Button function here

$(document).ready(function(){
  $("#searchButtonLost").bind("click", function(){//function fires when button id "searchButtonLost" is pressed
	//window.alert("Search button clicked");//check button
	showLostPet();// function which communicates the animal and county to the server using 			XMLHttpRequest.send()
});// end click function
});// end document ready function




// the function below uses AJAX to contact the localhost server with data for a database search
function showLostPet()
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
//xmlhttp.open("GET","http://192.168.1.102/petsie/lostSearchLocalDB.php?pettype="+$animal+"&theCounty="+$county,true);
xmlhttp.open("GET","http://localhost/petsie/lostSearchLocalDB.php?pettype="+$animal+"&theCounty="+$county,true);
xmlhttp.send();
}




// the function below uses AJAX to contact the localhost server with an ID from the search results data for a database search to get the photo link of the animal required. $photoID is taken from the dblist item pressed.
function showLostPetPhoto($photoID)
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
    // write the response from the server into the img src
    document.getElementById("lost2photoFromServer").src=xmlhttp.responseText; 
    // call a function to generate a button below the photo:
    getLostPetListingButton($photoID);
    }
  };
//xmlhttp.open("GET","http://192.168.1.102/petsie/getLocalPetPhoto.php?theID="+$photoID,true);
xmlhttp.open("GET","http://localhost/petsie/getLocalPetPhoto.php?theID="+$photoID,true);
xmlhttp.send();
}





function getLostPetListingButton($photoID)
{
document.getElementById("LostListingButtonDiv").innerHTML="<a href='#lost3'><button id='selectedLostButton'>Select This Listing</button></a>";

$('#selectedLostButton').button(); // initialise button before refreshing it.
$('#selectedLostButton').button('refresh');
getChosenLostPetListing($photoID);// Get detailed listing from server
}




function getChosenLostPetListing($photoID)
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
    // write the response from the server into the listing div:
    document.getElementById("lostChosenListing").innerHTML=xmlhttp.responseText; 
    }
  };
//xmlhttp.open("GET","http://192.168.1.102/petsie/getChosenListing.php?theID="+$photoID,true);
xmlhttp.open("GET","http://localhost/petsie/getChosenListing.php?theID="+$photoID,true);
xmlhttp.send();
// call a function to fetch the photo:
showChosenLostPetPhoto($photoID);
}




function showChosenLostPetPhoto($photoID)
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
//xmlhttp.open("GET","http://192.168.1.102/petsie/getLocalPetPhoto.php?theID="+$photoID,true);
xmlhttp.open("GET","http://localhost/petsie/getLocalPetPhoto.php?theID="+$photoID,true);
xmlhttp.send();
}





// Found Search Button function here

$(document).ready(function(){
  $("#searchButtonFound").bind("click", function(){//function fires when button id "searchButtonFound" is pressed
	//window.alert("Search button clicked");//check button
	showFoundPet();// function which communicates the animal and county to the server using 			XMLHttpRequest.send()
});// end click function
});// end document ready function




// the function below uses AJAX to contact the localhost server with data for a database search
function showFoundPet()
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
//xmlhttp.open("GET","http://192.168.1.102/petsie/foundSearchLocalDB.php?pettype="+$animal+"&theCounty="+$county,true);
xmlhttp.open("GET","http://localhost/petsie/foundSearchLocalDB.php?pettype="+$animal+"&theCounty="+$county,true);
xmlhttp.send();
}




// the function below uses AJAX to contact the localhost server with an ID from the search results data for a database search to get the photo link of the animal required. $photoID is taken from the dblist item pressed.
function showFoundPetPhoto($photoID)
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
    document.getElementById("foundPetsPhotoFromServer").src=xmlhttp.responseText;
    // call a function to generate a button below the photo:
    getFoundPetListingButton($photoID);
    }
  };
//xmlhttp.open("GET","http://192.168.1.102/petsie/getLocalPetPhoto.php?theID="+$photoID,true);
xmlhttp.open("GET","http://localhost/petsie/getLocalPetPhoto.php?theID="+$photoID,true);
xmlhttp.send();
}




function getFoundPetListingButton($photoID)
{
document.getElementById("FoundListingButtonDiv").innerHTML="<a href='#found3'><button id='selectedFoundButton'>Select This Listing</button></a>";

$('#selectedFoundButton').button(); // initialise button before refreshing it.
$('#selectedFoundButton').button('refresh');
getChosenFoundPetListing($photoID);// Get detailed listing from server
}




function getChosenFoundPetListing($photoID)
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
    // write the response from the server into the listing div:
    document.getElementById("foundChosenListing").innerHTML=xmlhttp.responseText; 
    }
  };
//xmlhttp.open("GET","http://192.168.1.102/petsie/getChosenListing.php?theID="+$photoID,true);
xmlhttp.open("GET","http://localhost/petsie/getChosenListing.php?theID="+$photoID,true);
xmlhttp.send();
// call a function to fetch the photo:
showChosenFoundPetPhoto($photoID);
}




function showChosenFoundPetPhoto($photoID)
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
//xmlhttp.open("GET","http://192.168.1.102/petsie/getLocalPetPhoto.php?theID="+$photoID,true);
xmlhttp.open("GET","http://localhost/petsie/getLocalPetPhoto.php?theID="+$photoID,true);
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
xmlhttp.open("GET","http://192.168.1.102/petsie/jqueryInput4l.php?firstname="+$animal+"&theCounty="+$county,true);// uploads the animal and county on click of the upload button
xmlhttp.send();
}





