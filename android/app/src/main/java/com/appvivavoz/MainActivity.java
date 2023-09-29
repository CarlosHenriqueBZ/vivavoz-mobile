package com.app.vivavoz;

import com.facebook.react.ReactActivity;
import org.devio.rn.splashscreen.SplashScreen;
import android.os.Bundle;

public class MainActivity extends ReactActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        SplashScreen.show(this);
        super.onCreate(savedInstanceState);
          SplashScreen.hide(this);
    }

    @Override
    protected void onPause() {
        super.onPause();
    }



  @Override
  protected String getMainComponentName() {
    return "appvivavoz";
  }
}
