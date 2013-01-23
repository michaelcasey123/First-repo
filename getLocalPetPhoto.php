<?php
$theID = $_GET["theID"];// this is the ID from the table link for the photo required

// Amazon Web Service (s3) set up:

	header("Content-type: text/plain; charset=utf-8");

	// Include the SDK
	require_once '../AWSSDKforPHP/sdk.class.php';

	// Instantiate the AmazonS3 class

	$s3 = new AmazonS3();

	$bucket = 'test.pets.ie';


//$x="http://localhost";// development host
//$x="http://michaelcasey123.zxq.net"; // live host
//$x="http://192.168.1.102"; // Mobile development host


//		          DB_HOST,   DB_USER,  DB_PASSWORD, 
$link_id = mysql_connect('localhost', 'root', 'friend88**');
if (!$link_id)
  {
  die('Could not connect: ' . mysql_error());
  }
//		DB_DATABASE
mysql_select_db("db1020773_pets", $link_id);

$sqlQuery = "SELECT src, file_name FROM ad_photos WHERE photo_id = '".$theID."'";
$result = mysql_query($sqlQuery);

$photoRequired = ""; // this is the file

while($pet = mysql_fetch_assoc($result))
	{
//	$photoRequired .= $pet["src"]; // not using this for now
//	$photoRequired .= "_standard_"; // this can be either _full_ , _standard_ or _thumbnail_
	$photoRequired .= $pet["file_name"];
	}

// $photoRequired = ltrim($photoRequired,"/"); // take the unwanted front slash from the src field

// this needs to be sent to the AWS bucket and get back the temporary authorised link.

//list($imagesource) = mysql_fetch_row($result);// put the info from the table into a variable
//$imagelink=$x.$imagesource; // build the image source <img src=""> link from the IP address and the path from the database

if ($result) {

	$response = $s3->get_object_url($bucket,$photoRequired,(time()+600)); // get the photo from AWS

	echo $response;// send the link to the photo of the animal back to the calling function


}else
{die("Failure: " . mysql_error($link_id));}

die();// get out of database

mysql_close($link_id); // close the connection
?>
