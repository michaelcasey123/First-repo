package com.michael.petsie;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.MalformedURLException;

import android.os.Bundle;
import android.util.Log;
//import android.app.Activity;
import android.view.Menu;
import org.apache.cordova.*;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import com.facebook.android.*;
import com.facebook.android.AsyncFacebookRunner.RequestListener;
import com.facebook.android.Facebook.*;
import com.facebook.android.AsyncFacebookRunner;

public class Petsie extends DroidGap {
	
	// application id from facebook.com/developers
	public static final String APP_ID = "411666472238883";
	
	// permissions array
	//private static final String[] PERMS = new String[] {};
	
	Facebook facebook = new Facebook("APP_ID");
    AsyncFacebookRunner mAsyncRunner = new AsyncFacebookRunner(facebook);

    private SharedPreferences mPrefs;
    
    
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
        /*
         * Get existing access_token if any
         */
        mPrefs = getPreferences(MODE_PRIVATE);
        String access_token = mPrefs.getString("access_token", null);
        long expires = mPrefs.getLong("access_expires", 0);
        if(access_token != null) {
            facebook.setAccessToken(access_token);
        }
        if(expires != 0) {
            facebook.setAccessExpires(expires);
        }
        
        /*
         * Only call authorize if the access_token has expired.
         */
        
        
    if(!facebook.isSessionValid()) {    
        
      facebook.authorize(this, new String[] { "email", "publish_checkins" },
        		
        new DialogListener() {
            @Override
            public void onComplete(Bundle values) {
            	SharedPreferences.Editor editor = mPrefs.edit();
                editor.putString("access_token", facebook.getAccessToken());
                editor.putLong("access_expires", facebook.getAccessExpires());
                editor.commit();
            }

            @Override
            public void onFacebookError(FacebookError error) {}

            @Override
            public void onError(DialogError e) {}

            @Override
            public void onCancel() {}
        });    
      }
    }
    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        facebook.authorizeCallback(requestCode, resultCode, data);
    }
    
    public void onResume() {    
        super.onResume();
        facebook.extendAccessTokenIfNeeded(this, null);
    }
    
   // mAsyncRunner.request("me", new UserInfoRequestListener());
    
    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
        getMenuInflater().inflate(R.menu.activity_petsie, menu);
        return true;
    }
    
/*    class UserInfoRequestListener implements RequestListener {

    	// log tag for any log.x statements
    		public static final String TAG = "FACEBOOK CONNECT";	
    	String id;
	String name;
	String firstName;
	String lastName;
	String userName;
	String gender;
	String locale;
	String email;
	String FILENAME = "facebookUserInfo"; 
*/	    	
     /* public void onComplete(String response, Object state) {
      	try {
      		// process the response here: executed in background thread
      		Log.d(TAG, "Response: " + response.toString());

//      		JSONObject json = Util.parseJson(response);
//      		final String id = json.getString("id");

    		final JSONObject json = new JSONObject(response);
    		JSONArray userData = json.getJSONArray("data");  // equivalent to parsing?

//    	for (int i = 0; i &lt; userData.length(); i++) { // we don't need the loop
    	JSONObject meUser = userData.getJSONObject(0);
		id = meUser.getString("id");
		name = meUser.getString("name");
		firstName = meUser.getString("first_name");
		lastName = meUser.getString("last_name");
		userName = meUser.getString("username");
		gender = meUser.getString("gender");
		locale = meUser.getString("locale");
		email = meUser.getString("email");
*/

/*   			UserInfo meUserInfo = new UserInfo(meUser.getString("id"),
    						meUser.getString("name"),
    						meUser.getString("first_name"),
    						meUser.getString("last_name"),
    						meUser.getString("username"),
    						meUser.getString("gender"),
    						meUser.getString("locale"),
    						meUser.getString("email"));}
*/

      		// then post the processed result back to the UI thread
      		// if we do not do this, a runtime exception will be generated
      		// e.g. "CalledFromWrongThreadException: Only the original
      		// thread that created a view hierarchy can touch its views."
/*    		Petsie.this.runOnUiThread(new Runnable() {
      		public void run() {
      		// Is this where I send meUserInfo to the local storage? 
    		// The example displays it.
// Do I have to serialise the meUserInfo object before storing it? How do I get it back from PhoneGap as an object? All I want to do is store some strings in the correct order into a file and read them back out again in JavaScript.
		try {
      	FileOutputStream fos = openFileOutput(FILENAME, Context.MODE_PRIVATE);	
		fos.write(id.getBytes());
		fos.write(name.getBytes());
		fos.write(firstName.getBytes());
		fos.write(lastName.getBytes());
		fos.write(userName.getBytes());
		fos.write(gender.getBytes());
		fos.write(locale.getBytes());
		fos.write(email.getBytes());
		fos.close();
		} catch (FileNotFoundException e) {Log.w(TAG, "File not found");}
      	
	} // end of method run()

      		}); // end of runOnUiThread
      	} // end of outer try
	catch (JSONException e) {
      		Log.w(TAG, "JSON Error in response");
      	} catch (FacebookError e) {
      		Log.w(TAG, "Facebook Error: " + e.getMessage());
      	} // end of outer catches
     
      } // end of method onComplete() 
     
      public void onIOException(IOException e, Object state) {}
     
      public void onFileNotFoundException(FileNotFoundException e, Object state) {}
     
      public void onMalformedURLException(MalformedURLException e, Object state) {}
     
      public void onFacebookError(FacebookError e, Object state) {}
    } // end of class UserInfoRequestListener
 */   
} // end of class Petsie


