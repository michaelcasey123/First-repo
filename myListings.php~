<?php
//echo "myListings.php acknowledges.";// debug code

$id = $_GET["id"];

//		           			DB_HOST,  		DB_USER,  		DB_PASSWORD, 
$link_id = mysql_connect('localhost', 'webelevate11_app', '4pp@W3b3LvL11');
if (!$link_id)
  {
  die('Could not connect: ' . mysql_error());
  }
//		 			DB_DATABASE
mysql_select_db("webelevate11_app", $link_id);

$sqlQuery = "SELECT a.id, p.name_plural, c.name, u.phone, a.contact_by_phone, u.email, a.contact_by_email, ap.photo_id
FROM ads AS a INNER JOIN users AS u ON a.user_id = u.id INNER JOIN pet_type AS p ON a.pet_type_id = p.old_pet_type_id INNER JOIN location_counties AS c ON a.location_county_id = c.old_county_id LEFT JOIN ad_photos AS ap ON a.id = ap.ad_id
WHERE u.id = '".$id."';";

$result = mysql_query($sqlQuery);

if ($result) {
// $htmlString is a variable to build the complete list before displaying it
	$htmlString = "";
	
	while($pet = mysql_fetch_assoc($result))
	{
		$htmlString .=  "<li><a href='javascript:showMyPetPhoto(" ; // start list item 
		$htmlString .=  ($pet["photo_id"]==NULL)?"1":$pet["photo_id"] ; //add photoID, the first argument. If there is no photo set photoID to 1
		$htmlString .=  ", "; // separate the two arguments to showRehomePetPhoto
		$htmlString .=  $pet["id"];// add adID the second argument
		$htmlString .=  ")'>";//close the function call and tag				
		$htmlString .=  $pet["id"];// start writing the list element
		$htmlString .=  ", "; // comma and space
		$htmlString .=  $pet["name_plural"];
		$htmlString .=  ", ";
		$htmlString .=  $pet["name"];
		$htmlString .=  ", ";
		$htmlString .=  $pet["phone"];
		$htmlString .=  ($pet["contact_by_email"]=="1")?", ".$pet["email"]:"";//Ternary operator
//		$htmlString .=  $pet["petPhoneNo"];// what's this?
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
