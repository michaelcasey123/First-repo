<?php
//echo "lostSearchOnlineDB.php acknowledges.";// debug code
//$q = $_POST["q"]; // debug code
$pettype = $_GET["pettype"];
$theCounty = $_GET["theCounty"];
//echo " The animal is ".$pettype." and the county is ".$theCounty;//debug code

//		           DB_HOST,    DB_USER,      DB_PASSWORD, 
$link_id = mysql_connect('localhost', '778331_root', 'friend88**');
if (!$link_id)
  {
  die('Could not connect: ' . mysql_error());
  }
//		 DB_DATABASE
mysql_select_db("michaelcasey123_zxq_mtcdb1", $link_id);

$sqlQuery = "SELECT petID, petType, petAddress1, petCounty, petPhoneNo, petEmail FROM pet WHERE petType = '".$pettype."' AND petCounty = '".$theCounty."' AND petListingType = 'Lost'";

$result = mysql_query($sqlQuery);

if ($result) {
// $htmlString is a variable to build the complete list before displaying it
	$htmlString = "";
	
	while($pet = mysql_fetch_assoc($result))
	{
		$htmlString .=  "<li><a href='javascript:showLostPetPhoto(" ; // start list item 
		$htmlString .=  $pet["petID"] ; //add photoID
		$htmlString .=  ")'>";//close the function call and tag				
		$htmlString .=  $pet["petID"];// start writing the list element
		$htmlString .=  ", "; // comma and space
		$htmlString .=  $pet["petType"];
		$htmlString .=  ", ";
		$htmlString .=  $pet["petAddress1"];
		$htmlString .=  ", ";
		$htmlString .=  $pet["petCounty"];
		$htmlString .=  ", ";
		$htmlString .=  $pet["petPhoneNo"];
		$htmlString .=  ", Press to get photo.";
		$htmlString .=  "</a></li>"; // closing anchor tag  and list item
		
	}

	if ($htmlString=="") {echo "<li>Sorry. <br/>No results were found for your search.<br/>Please try again</li>";}
	else {echo $htmlString ;} // send this back to the calling function

}else{

die("Failure: " . mysql_error($link_id));

}

die();// get out of database?
	

mysql_close($link_id); // close the connection

?>
