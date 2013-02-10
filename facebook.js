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

