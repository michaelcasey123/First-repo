<?php



/*%******************************************************************************************%*/
// SETUP

	// Enable full-blown error reporting. http://twitter.com/rasmus/status/7448448829
	error_reporting(-1);

	// Set plain text headers
	header("Content-type: text/plain; charset=utf-8");

	// Include the SDK
	require_once '../AWSSDKforPHP/sdk.class.php';


/*%******************************************************************************************%*/
// UPLOAD FILES TO S3

	// Instantiate the AmazonS3 class
	$s3 = new AmazonS3();

	$bucket = 'test.pets.ie';

		$list_of_files = filter_file_list(glob('../uploads/*'));

		// Prepare to hold the individual filenames
		$individual_filenames = array();

		// Loop over the list, referring to a single file at a time
		foreach ($list_of_files as $file)
		{
			// Grab only the filename part of the path
			$filename = explode(DIRECTORY_SEPARATOR, $file);
			$filename = array_pop($filename);
//			echo "The filename for upload is ".$filename."\n";// debug code
			// Store the filename for later use
			$individual_filenames[] = $filename;

			/* Prepare to upload the file to our new S3 bucket. Add this
			   request to a queue that we won't execute quite yet. */
			$s3->batch()->create_object($bucket, $filename, array(
				'fileUpload' => $file
			));
//			echo "The filename ".$filename." was inserted into the create_object batch\n";// debug code
		}


		$file_upload_response = $s3->batch()->send();

		/* Since a batch of requests will return multiple responses, let's
		   make sure they ALL came back successfully using `areOK()` (singular
		   responses use `isOK()`). */
		if ($file_upload_response->areOK())
		{
			// Loop through the individual filenames
			foreach ($individual_filenames as $filename)
			{
				/* Display a URL for each of the files we uploaded. Since uploads default to
				   private (you can choose to override this setting when uploading), we'll
				   pre-authenticate the file URL for the next 5 minutes. */
				echo $s3->get_object_url($bucket, $filename, '5 minutes') . PHP_EOL . PHP_EOL;
			}
		}
		else echo "The file_upload_response was not received as ok";


/*%******************************************************************************************%*/
// HELPER FUNCTIONS

	// Filters the list for only files
	function filter_file_list($arr)
	{
		return array_values(array_filter(array_map('file_path', $arr)));
	}

	// Callback used by filter_file_list()
	function file_path($file)
	{
		return !is_dir($file) ? realpath($file) : null;
	}
