package com.michael.petsie;

import android.os.Bundle;
//import android.app.Activity;
import org.apache.cordova.*;

public class Petsie extends DroidGap {

    
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
    }
 
} // end of class
