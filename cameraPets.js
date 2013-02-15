var filePath;
var replacePicture = 0;

// Wait for PhoneGap to load

        document.addEventListener("deviceready", onDeviceReadyPhoto, false); // this may clash with Geo-location.

// onDeviceReady responds to the button click

function onDeviceReadyPhoto() {
//	introduce the buttons

	var libraryphotobutton = document.getElementById("addAListingGetImage");
	libraryphotobutton.addEventListener("click",getAnimalPhoto,false);

	var camerabutton = document.getElementById("addAListingCapture");
	camerabutton.addEventListener("click",getCameraPhoto,false);

	var editcamerabutton = document.getElementById("editUpdateListingCapture");
	editcamerabutton.addEventListener("click",editGetCameraPhoto,false);

	var editlibraryphotobutton = document.getElementById("editUpdateListingGetImage");
	editlibraryphotobutton.addEventListener("click",editGetAnimalPhoto,false);
}

/*
// testing button - ok
function getAnimalPhoto()
{
alert("Library photo Button pressed");
}

// testing button - ok
function getCameraPhoto()
{
alert("Camera photo Button pressed");
}
*/



// The imageURI is represented by the contents of the curly brackets in the 3rd argument

function getAnimalPhoto() { 

	navigator.camera.getPicture(onPhotoURISuccess,
	onFail,
	{ quality:50,
	  destinationType : navigator.camera.DestinationType.FILE_URI,
	  sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY
	});
}




function editGetAnimalPhoto() { 
	replacePicture = 1;
	navigator.camera.getPicture(onEditPhotoURISuccess,
	onFail,
	{ quality:50,
	  destinationType : navigator.camera.DestinationType.FILE_URI,
	  sourceType : navigator.camera.PictureSourceType.PHOTOLIBRARY
	});
}




function getCameraPhoto() {
	navigator.camera.getPicture(onPhotoURISuccess,
	onFail,
	{ quality : 50 ,
	  destinationType : navigator.camera.DestinationType.FILE_URI,
	  sourceType : navigator.camera.PictureSourceType.CAMERA/*,
	  allowEdit : true,
	  encodingType : camera.EncodingType.JPEG,
	  targetWidth : 640,
	  targetHeight : 480,
	  popoverOptions : CameraPopoverOptions,
	  saveToPhotoAlbum : true */
	});
}




function editGetCameraPhoto() {
	replacePicture = 1;
	navigator.camera.getPicture(onEditPhotoURISuccess,
	onFail,
	{ quality : 50 ,
	  destinationType : navigator.camera.DestinationType.FILE_URI,
	  sourceType : navigator.camera.PictureSourceType.CAMERA/*,
	  allowEdit : true,
	  encodingType : camera.EncodingType.JPEG,
	  targetWidth : 640,
	  targetHeight : 480,
	  popoverOptions : CameraPopoverOptions,
	  saveToPhotoAlbum : true */
	});
}




   function onPhotoURISuccess(imageURI) {
// alert(imageURI+" passed to onAnimalPhotoURISuccess()"); // debug code
      // Uncomment to view the image file URI 
       console.log(imageURI);

	  filePath = imageURI;

      // Get image handle
      $animalImage = document.getElementById('addAListingAnimalImage');

      // Unhide image elements
      $animalImage.style.display = 'block';

      // Show the captured photo
      $animalImage.src = imageURI;

	// Put photo into advert preview
	  $previewImage = document.getElementById("previewAddedListingAnimalImage");

      $previewImage.style.display = 'block';

	  $previewImage.src=imageURI;

/*
$(document).ready(function(){
  $("#uploadAddedListingButton").bind("click", function(){
	uploadPhoto(imageURI);

});// end click function
});// end document ready function
*/
}




   function onEditPhotoURISuccess(imageURI) {
// alert(imageURI+" passed to onAnimalPhotoURISuccess()"); // debug code
      // Uncomment to view the image file URI 
       console.log(imageURI);

	  filePath = imageURI;

      // Get image handle
      $animalImage = document.getElementById('editUpdateListingAnimalImage');

      // Unhide image elements
      $animalImage.style.display = 'block';

      // Show the captured photo
      $animalImage.src = imageURI;

	  // prepare the div (overwrite existing <img> tag)

	$('#previewEditedListingAnimalImageDiv').html('<img style="display:none;width:290px;" id="previewEditedListingAnimalImage" src=""/>');

	// Put photo into update preview
	  $previewImage = document.getElementById("previewEditedListingAnimalImage");



      $previewImage.style.display = 'block';

	  $previewImage.src=imageURI;

/*
$(document).ready(function(){
  $("#uploadAddedListingButton").bind("click", function(){
	uploadPhoto(imageURI);

});// end click function
});// end document ready function
*/
}




function uploadPhoto(filePath) { 

            var uri = encodeURI(useurl+"photoUpload.php"); // useurl is in ajaxconfig.js
// this encodeURI function is in the Cordova 2.0.0 FileTransfer docs. Pre-encoding uri like this is in the iOS quirks section
            var options = new FileUploadOptions();
            options.fileKey="file";
       //   options.fileName=filePath.substr(filePath.lastIndexOf('/')+1); // defaults to "image.jpg"
// The phone does not supply the actual file name (e.g. Snake1.jpg) of the photo


            options.mimeType="image/jpeg";

            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";

            options.params = params;

            var ft = new FileTransfer();
            ft.upload(filePath, uri, win, fail, options); 
return; //(to photoUploads() in petsie.js)
}




function win(r) {
//	console.log("Code = " + r.responseCode);
//	console.log("Response = " + r.response);
//	console.log("Sent = " + r.bytesSent);
return;
}

function fail(error) {
    alert("An error has occurred: Code = " = error.code);
}


function onFail(message) {
	alert('Failed because: ' + message);
}

