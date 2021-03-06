<?php
//echo "ad_photos.php acknowledges";// debug code
$ads_id = $_GET["ads_id"];
$animal = $_GET["animal"];
$photoID = $_GET["photoID"];


waitforimage();
/*
image.jpg is uploaded and moved to /uploads folder by photoUpload.php 
Now renaming it within /uploads folder
*/

function waitforimage()
{
global $animal; // this is needed for $newfilename and the database entry
global $ads_id; // this is needed for the database entry
global $photoID; // this may be needed for a database update

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

		include "dbconfig.php";

		$timedatum = date('Y-m-d H:i:s'); // for second query for photo_id

		$src = date('/Y/m/'); // for insert to database;

	if ($animal != null && intval($photoID) == 1) // (replacing "sorry no photo")
		{
		$sqlQuery = "INSERT INTO `ad_photos`(`ad_id`, `file_name`, `src`, `order_seq`, `date_created`, `status`) VALUES ('".$ads_id."','".$newfilename."','".$src."','0',NOW(),'0');";

		// The photo goes into an AWS bucket. A new reference to it goes into the database.

		$result = mysql_query($sqlQuery);

		if ($result) 
			{
			// if insert is successful then photo_id is brought out of the database and stored in $photo_id.
			$sqlQuery = "SELECT photo_id FROM ad_photos WHERE ad_id = '".$ads_id."' AND date_created >= '".$timedatum."';";

			$result = mysql_query($sqlQuery);
	
			if ($result)
				{
				list($photo_id) = mysql_fetch_row($result);
				echo $photo_id;
				}
			else {echo "Cannot find id..";}
			}
		else
			{
			echo "Photo insert failed. Please try again.";
			die("Failure: " . mysql_error($link_id));
			}
		} // end if $animal != null and photoID == 1

// replace older photos with new ones but leave multi-used photos in AWS bucket:
	if ($animal != null && intval($photoID) > 1 && intval($photoID) <= 6795)  
		{
		$sqlQuery = "UPDATE ad_photos SET file_name = '".$newfilename."', src = '".$src."', date_created = NOW() WHERE photo_id = ".$photoID.";";					

		$result = mysql_query($sqlQuery);
			if ($result)
				{
				echo $photoID;
				}
			else
				{
				echo "Update of ad_photos failed.";
				} 

		}

	if ($animal != null && intval($photoID) > 6795)
		{
		// get old filename from database and delete it from AWS:
		$sqlQuery = "SELECT src, file_name FROM ad_photos WHERE photo_id =".$photoID.";";
		$result = mysql_query($sqlQuery);
			if ($result)
				{
				while($pet = mysql_fetch_assoc($result))
					{
					$src = $pet["src"];
					$file_name = $pet["file_name"];
					}
				$s3->delete_object($bucket, $file_name);
				}
				$sqlQuery = "UPDATE ad_photos SET file_name = '".$newfilename."', src = '".$src."', date_created = NOW() WHERE photo_id = ".$photoID.";";					

				$result = mysql_query($sqlQuery);
					if ($result)
						{
						echo $photoID;
						}
					else
						{
						echo "Update of ad_photos failed.";
						} 
		}

die();// get out of database?

mysql_close($link_id); // close the connection

	} // end if file_exists
	else 
		{
//		echo "uploading photo...<br/>"; // debug code
		sleep(1); // wait before checking again (seconds)
		waitforimage();
		} // keep checking for image.jpg until it is there.
} // end of function waitforimage()
?>
