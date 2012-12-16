<?php
$theID = $_GET["theID"];// this is the ID from the table link for the photo required

$x="http://localhost";// development host
//$x="http://michaelcasey123.zxq.net"; // live host
//$x="http://192.168.1.102"; // Mobile development host

//		          DB_HOST,   DB_USER,  DB_PASSWORD, 
$link_id = mysql_connect('localhost', 'root', 'friend88**');
if (!$link_id)
  {
  die('Could not connect: ' . mysql_error());
  }
//		DB_DATABASE
mysql_select_db("mtcdb1", $link_id);

$sqlQuery = "SELECT petImageSource FROM pet WHERE petID = '".$theID."'";
$result = mysql_query($sqlQuery);

list($imagesource) = mysql_fetch_row($result);// put the info from the table into a variable
$imagelink=$x.$imagesource; // build the image source <img src=""> link from the IP address and the path from the database

if ($result) {

	echo $imagelink;// send the link to the photo of the animal back to the calling function

}else
{die("Failure: " . mysql_error($link_id));}

die();// get out of database

mysql_close($link_id); // close the connection
?>
