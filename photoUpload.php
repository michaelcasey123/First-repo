<?php


// delete any existing image.jpg in the uploads folder (left there by an uncompleted process)
unlink('../uploads/image.jpg');

// filePath ("image.jpg") is sent from cameraPets.js function uploadPhoto() no other file types can be sent
if ($_FILES["file"]["error"] > 0)
  {
  echo "Error: " . $_FILES["file"]["error"] . "<br />";
  echo "<p>Photo File not uploaded</p>";
  }
else
  {
	move_uploaded_file($_FILES["file"]["tmp_name"],"/var/www/html/webelevate11.com/app/uploads/" . $_FILES["file"]['name']); 
// The full path is /var/www/html/webelevate11.com/app/uploads/Dog1.jpg . Found using realpath()
// permissions are needed to do this. 'name' is "image.jpg" from uploadPhoto()
}
?>
