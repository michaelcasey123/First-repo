<?php
//echo "foundSearchLocalDB.php acknowledges.";// debug code
//$q = $_POST["q"]; // debug code
$pettype = $_GET["pettype"];
$theCounty = $_GET["theCounty"];
//echo " The animal is ".$pettype." and the county is ".$theCounty;//debug code

//		           DB_HOST,  DB_USER,  DB_PASSWORD, 
$link_id = mysql_connect('localhost', 'root', 'friend88**');
if (!$link_id)
  {
  die('Could not connect: ' . mysql_error());
  }
//		 DB_DATABASE
mysql_select_db("db1020773_pets", $link_id);

$sqlQuery = "SELECT a.id, p.name_plural, c.name, u.phone, a.contact_by_phone, u.email, a.contact_by_email, ap.photo_id
FROM ads AS a INNER JOIN users AS u ON a.user_id = u.id INNER JOIN pet_type AS p ON a.pet_type_id = p.old_pet_type_id INNER JOIN location_counties AS c ON a.location_county_id = c.old_county_id INNER JOIN ad_type AS t ON a.ad_type_id = t.id LEFT JOIN ad_photos AS ap ON a.id = ap.ad_id
WHERE a.date_created > '2012-06' AND a.status = 'active' AND p.name = '".$pettype."' AND c.name = '".$theCounty."' AND t.name = 'Lost & Found' AND (a.title LIKE '%found%' OR a.description LIKE '%found%');";

$result = mysql_query($sqlQuery);

if ($result) {
// $htmlString is a variable to build the complete list before displaying it
	$htmlString = "";
	
	while($pet = mysql_fetch_assoc($result))
	{
		$htmlString .=  "<li><a href='javascript:showFoundPetPhoto(" ; // start list item 
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
