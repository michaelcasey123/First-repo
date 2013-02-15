<?php
// echo "deleteListing.php acknowledges.<br/>";// debug code

$photoID = $_GET["photoID"];
$ads_id = $_GET["adID"];
$htmlString = "";

include "dbconfig.php";

$sqlQuery = "DELETE FROM `ads` WHERE id = '".$ads_id."'";
$result = mysql_query($sqlQuery);

if ($result) 
	{
	$htmlString .= "Listing".$ads_id." deleted.<br/>";

	if ($photoID > '1')
		{	
		$sqlQuery = "SELECT src, file_name FROM `ad_photos` WHERE photo_id = '".$photoID."'";
		$result = mysql_query($sqlQuery);
		if ($result) 
			{
			while($pet = mysql_fetch_assoc($result))
				{
				$src = $pet["src"];
				$file_name = $pet["file_name"];
				}
			$htmlString .= "src is ".$src." file name is ".$file_name."<br/>"; // test code
			$sqlQuery = "DELETE FROM `ad_photos` WHERE photo_id = '".$photoID."'";
			$result = mysql_query($sqlQuery);
			if ($result)
				{
				$htmlString .= "Photo ".$photoID." deleted.<br/>";
				}

			if ($photoID > '6796')
				{
				$htmlString .= $photoID." > 6796. Will delete photo from bucket.<br/>"; // test code
				// Amazon Web Service (s3) set up:
				header("Content-type: text/plain; charset=utf-8");
				// Include the SDK
				require_once '../AWSSDKforPHP/sdk.class.php';
				// Instantiate the AmazonS3 class
				$s3 = new AmazonS3();
				$bucket = 'test.pets.ie';
				$s3->delete_object($bucket, $file_name);

				}
			else 
				{
				$htmlString .= $photoID." <= 6796. Will not delete photo from	bucket.<br/>";}// test code
				}
		}
	else
		{
		$htmlString .= "No Photo with this listing.<br/>";
		}

	echo $htmlString; // send message back to the calling function

	}

else
	{
	die("Failure: " . mysql_error($link_id));
	}

die();// get out of database?

mysql_close($link_id); // close the connection

?>
