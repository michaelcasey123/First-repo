<?php
$animal = "Clock";
$timeStamp = time();
$newfilename = $animal . $timeStamp . ".jpg";
echo $newfilename; 
rename("../uploads/image.jpg","../uploads/" . $newfilename);
?>
