package com.pankaj465.FinGuard

import android.os.Build
import android.os.Bundle
import android.view.WindowManager
import android.widget.Toast
import com.facebook.react.ReactActivity
import com.facebook.react.ReactActivityDelegate
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.fabricEnabled
import com.facebook.react.defaults.DefaultReactActivityDelegate
import expo.modules.ReactActivityDelegateWrapper
import kotlin.system.exitProcess

class MainActivity : ReactActivity() {

  override fun onCreate(savedInstanceState: Bundle?) {
    // ✅ Set theme before loading UI (needed for splash screen)
    setTheme(R.style.AppTheme)

    // ✅ Prevent screenshots and screen recording
    try {
      window.setFlags(
        WindowManager.LayoutParams.FLAG_SECURE,
        WindowManager.LayoutParams.FLAG_SECURE
      )
    } catch (_: Throwable) {}

    // ✅ Security checks: Root, Emulator, Developer Mode
    try {
      val isUntrusted = SecurityUtils.isDeviceRooted(this) ||
                        SecurityUtils.isEmulator() ||
                        (!BuildConfig.DEBUG && SecurityUtils.isDeveloperModeEnabled(this))

      if (isUntrusted) {
        Toast.makeText(
          this,
          "This device is not supported for security reasons.",
          Toast.LENGTH_LONG
        ).show()
        finish()
        exitProcess(0)
        return
      }
    } catch (_: Throwable) {}

    // Continue normal onCreate
    super.onCreate(null)
  }

  override fun getMainComponentName(): String = "main"

  override fun createReactActivityDelegate(): ReactActivityDelegate {
    return ReactActivityDelegateWrapper(
      this,
      BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
      object : DefaultReactActivityDelegate(
        this,
        mainComponentName,
        fabricEnabled
      ) {}
    )
  }

  override fun invokeDefaultOnBackPressed() {
    if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
      if (!moveTaskToBack(false)) {
        super.invokeDefaultOnBackPressed()
      }
      return
    }
    super.invokeDefaultOnBackPressed()
  }
}