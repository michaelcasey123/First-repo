var filePath;

// Wait for PhoneGap to load

        document.addEventListener("deviceready", onDeviceReady, false);

// onDeviceReady responds to the button click

function onDeviceReady() {
//	introduce the button

	var button = document.getElementById("getImage");
	button.addEventListener("click",getAnimalPhoto,false);
}

/*
// testing button - ok
function getAnimalPhoto()
{
alert("Button pressed");
}
*/


      function uploadPhoto(filePath) { // fullPath here
// alert(filePath+" passed to uploadPhoto()"); // debug code
            var uri = encodeURI("http://michaelcasey123.zxq.net/PHPStuff/jqueryInput5z.php"); 
// this encodeURI function is in the Cordova 2.0.0 FileTransfer docs. Pre-encoding uri like this is in the iOS quirks section
            var options = new FileUploadOptions();
            options.fileKey="file";
       //   options.fileName=filePath.substr(filePath.lastIndexOf('/')+1); // defaults to "image.jpg"
// My Android phone does not supply the actual file name (e.g. Snake1.jpg) of the photo


            options.mimeType="image/jpeg";

            var params = new Object();
            params.value1 = "test";
            params.value2 = "param";

            options.params = params;

            var ft = new FileTransfer();
            ft.upload(filePath, uri, win, fail, options); // fullPath here


// imageURI needs to be a filePath

        } // end of function uploadPhoto

        function win(r) {
            console.log("Code = " + r.responseCode);
            console.log("Response = " + r.response);
            console.log("Sent = " + r.bytesSent);
        }

        function fail(error) {
            alert("An error has occurred: Code = " = error.code);
        }


//the following variable is for the animal photo:

var $animalImage; // I think this the variable (a string) that I need to send to the server

// Retrieve animal image file location from specified source. The argument source is specified as  pictureSource.PHOTOLIBRARY or pictureSource.SAVEDPHOTOALBUM - these pull up a dialog on the phone.

// the getImage button will call this function. The options need to be within this function for it to work
function getAnimalPhoto() { 

	navigator.camera.getPicture(onAnimalPhotoURISuccess,
	onFail,
	{quality:50,destinationType:navigator.camera.DestinationType.FILE_URI,
	sourceType:navigator.camera.PictureSourceType.PHOTOLIBRARY} );
}


   function onAnimalPhotoURISuccess(imageURI) {
// alert(imageURI+" passed to onAnimalPhotoURISuccess()"); // debug code
      // Uncomment to view the image file URI 
      // console.log(imageURI);

      // Get image handle
      $animalImage = document.getElementById('animalImage');

      // Unhide image elements
      $animalImage.style.display = 'block';

      // Show the captured photo
      // The inline CSS rules in the HTML file are used to resize the image
      //
      $animalImage.src = imageURI;

          $('#filename').html(imageURI); // debug code. imageURI reveals a URI excluding the filename

$(document).ready(function(){
  $("#uploadButton").bind("click", function(){//function fires when button id "uploadButton" is pressed
	uploadPhoto(imageURI); // pass imageURI to uploadPhoto from within function onAnimalPhotoURISuccess otherwise it will be lost.
// can I put insertCustomer(); here?	
});// end click function
});// end document ready function

} // end of function onAnimalPhotoURISuccess


// Called if something bad happens:
function onFail(message) {
	alert('Failed because: ' + message);
}


// If this doesn't work, take the imageURI and call that filePath. Then in jqueryInput4z.php do the testtime thing.

//////////////////////////////////////////////////////////////////////////////////////////////

/*

other camera options are: 

{ quality : 75,
  destinationType : Camera.DestinationType.DATA_URL,
  sourceType : Camera.PictureSourceType.CAMERA,
  allowEdit : true,
  encodingType : Camera.EncodingType.JPEG,
  targetWidth : 320,
  targetHeight : 240,
  popoverOptions : CameraPopoverOptions,
  saveToPhotoAlbum : false
};


// This works but loads as soon as the app is opened - too soon!
      function onDeviceReady() {

            // Retrieve image file location from specified source
            navigator.camera.getPicture(uploadPhoto,
                                        function(message) { alert('get picture failed'); },
                                        { quality: 50, 
                                        destinationType: navigator.camera.DestinationType.FILE_URI,
                                        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY }
                                        );

        }



Failed attempts to get the full file path including the file name:

// I need entry which is FileEntry. fileURL and imageURI only gives the path up to the file, not the file itself which is entry (FileEntry).




function filesuccess(file) {
	console.log("File size: " + file.size);
	console.log("File name: " + file.name);
}

function filefail(error) {
	alert("Unable to retrieve file properties: " + error.code);
}

// How do I get FileEntry entry?


entry.file(filesuccess, filefail); // obtain the properties of the file

var fileURL = entry.toURL();

var filePath = entry.fullPath; // this is what I need!!!!!!!!!


window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, gotFileSystem, fail);// I put this line within function onAnimalPhotoURISuccess(imageURI)


function gotFileSystem(fileSystem) {

	fileSystem.root.getFile(imageURI,null,gotFileEntry,onFail);
}

function gotFileEntry(fileEntry) {
        fileEntry.file(gotFile, fail);
}

    function gotFile(file){

var fileName = file.name;
var filePath = file.fullPath;
var fileURL = file.toURL();

// var fileURL = entry.toURL();

// var filePath = entry.fullPath; // this is what I need!!!!!!!!!

        //readDataUrl(file);
}


*/

