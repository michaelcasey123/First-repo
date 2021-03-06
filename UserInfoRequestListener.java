package com.michael.petsie;

import java.io.*;
import java.net.MalformedURLException;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import com.facebook.android.AsyncFacebookRunner.*;
//import com.facebook.android.Facebook;
import com.facebook.android.FacebookError;
 
import android.app.Activity;
//import android.os.Bundle;
import android.util.Log;

class UserInfoRequestListener implements RequestListener {

	// log tag for any log.x statements
		public static final String TAG = "FACEBOOK CONNECT";	
	
	
  public void onComplete(String response, Object state) {
  	try {
  		// process the response here: executed in background thread
  		Log.d(TAG, "Response: " + response.toString());

//  		JSONObject json = Util.parseJson(response);
//  		final String id = json.getString("id");

		final JSONObject json = new JSONObject(response);
		JSONArray userData = json.getJSONArray("data");  // equivalent to parsing?

//		for (int i = 0; i &lt; userData.length(); i++) { // we don't need the loop
			JSONObject meUser = userData.getJSONObject(0);
			UserInfo meUserInfo = new UserInfo(meUser.getString("id"),
						meUser.getString("name"),
						meUser.getString("first_name"),
						meUser.getString("last_name"),
						meUser.getString("username"),
						meUser.getString("gender"),
						meUser.getString("locale"),
						meUser.getString("email"));
		//	}


  		// then post the processed result back to the UI thread
  		// if we do not do this, a runtime exception will be generated
  		// e.g. "CalledFromWrongThreadException: Only the original
  		// thread that created a view hierarchy can touch its views."
			petsie.this.runOnUiThread(new Runnable() {
  			public void run() {
  			// Is this where I send meUserInfo to the local storage? 
			// The example displays it.
  			}
  		});
  	} catch (JSONException e) {
  		Log.w(TAG, "JSON Error in response");
  	} catch (FacebookError e) {
  		Log.w(TAG, "Facebook Error: " + e.getMessage());
  	}
 
  }
 /*
  private void runOnUiThread(Runnable runnable) {
	// TODO Auto-generated method stub
	
}
*/
public void onIOException(IOException e, Object state) {}
 
  public void onFileNotFoundException(FileNotFoundException e, Object state) {}
 
  public void onMalformedURLException(MalformedURLException e, Object state) {}
 
  public void onFacebookError(FacebookError e, Object state) {}
}
