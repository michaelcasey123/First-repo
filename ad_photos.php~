<?php
//echo "ad_photos.php acknowledges";// debug code
$ads_id = $_GET["ads_id"];
$animal = $_GET["animal"];

waitforimage();
/*
image.jpg is uploaded and moved to /uploads folder by photoUpload.php 
Now renaming it within /uploads folder
*/

function waitforimage()
{
global $animal; // this is needed for $newfilename and the database entry
global $ads_id; // this is needed for the database entry
if (file_exists("../uploads/image.jpg"))
	{
$timeStamp = time();
$newfilename = $animal . $timeStamp . ".jpg";
//echo $newfilename."<br/>"; // debug code

rename("../uploads/image.jpg","../uploads/" . $newfilename);

// upload the photo from here with its new filename to Amazon Web Services (AWS) then delete the photo from the uploads directory 

	require_once '../AWSSDKforPHP/sdk.class.php';
	$s3 = new AmazonS3();
	$bucket = 'test.pets.ie';
	$response = $s3->create_object($bucket,$newfilename,array(
					'fileUpload'=>'../uploads/'.$newfilename));

unlink('../uploads/'.$newfilename);

	if ($animal != null) 
		{
		//		           DB_HOST,    DB_USER,      DB_PASSWORD, 
		$link_id = mysql_connect('localhost', 'webelevate11_app', '4pp@W3b3LvL11');
		if (!$link_id)
			{
			die(' Could not connect: ' . mysql_error());
			}
		//		 DB_DATABASE
		mysql_select_db("webelevate11_app", $link_id);

		$timedatum = date('Y-m-d H:i:s'); // for second query for photo_id

		$src = date('/Y/m/'); // for insert to database;

		$sqlQuery = "INSERT INTO `ad_photos`(`ad_id`, `file_name`, `src`, `order_seq`, `date_created`, `status`) VALUES ('".$ads_id."','".$newfilename."','".$src."','0',NOW(),'0');";


		// The photo goes into an AWS bucket. A reference to it goes into the database.

		$result = mysql_query($sqlQuery);

		if ($result) {

			// if insert is successful then photo_id is brought out of the database and stored in $photo_id.

			$sqlQuery = "SELECT photo_id FROM ad_photos WHERE ad_id = '".$ads_id."' AND date_created >= '".$timedatum."';";

			$result = mysql_query($sqlQuery);
	
			if ($result)
				{
				list($photo_id) = mysql_fetch_row($result);
				echo $photo_id;
				}
			else {echo "Cannot find id..";}

		}else{
		echo "Photo insert failed. Please try again.";
		die("Failure: " . mysql_error($link_id));

}

die();// get out of database?

mysql_close($link_id); // close the connection
		} // end if $animal != null

	} // end if file_exists
	else 
		{
//		echo "uploading photo...<br/>"; // debug code
		sleep(1); // wait before checking again (seconds)
		waitforimage();
		} // keep checking for image.jpg until it is there.
} // end of function waitforimage()
?>
