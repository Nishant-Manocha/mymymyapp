package com.pankaj465.FinGuard

import android.app.Application
import android.content.Intent
import android.content.res.Configuration
import android.util.Log
import com.facebook.react.PackageList
import com.facebook.react.ReactApplication
import com.facebook.react.ReactNativeHost
import com.facebook.react.ReactPackage
import com.facebook.react.ReactHost
import com.facebook.react.defaults.DefaultNewArchitectureEntryPoint.load
import com.facebook.react.defaults.DefaultReactNativeHost
import com.facebook.react.soloader.OpenSourceMergedSoMapping
import com.facebook.soloader.SoLoader
import expo.modules.ApplicationLifecycleDispatcher
import expo.modules.ReactNativeHostWrapper
import com.google.android.gms.common.GooglePlayServicesNotAvailableException
import com.google.android.gms.common.GooglePlayServicesRepairableException
import com.google.android.gms.security.ProviderInstaller

class MainApplication : Application(), ReactApplication {

  override val reactNativeHost: ReactNativeHost = ReactNativeHostWrapper(
    this,
    object : DefaultReactNativeHost(this) {
      override fun getPackages(): List<ReactPackage> {
        val packages = PackageList(this).packages
        // Add manual packages here if needed
        return packages
      }

      override fun getJSMainModuleName(): String = ".expo/.virtual-metro-entry"
      override fun getUseDeveloperSupport(): Boolean = BuildConfig.DEBUG
      override val isNewArchEnabled: Boolean = BuildConfig.IS_NEW_ARCHITECTURE_ENABLED
      override val isHermesEnabled: Boolean = BuildConfig.IS_HERMES_ENABLED
    }
  )

  override val reactHost: ReactHost
    get() = ReactNativeHostWrapper.createReactHost(applicationContext, reactNativeHost)

  override fun onCreate() {
    super.onCreate()

    // 🔹 Ensure up-to-date security provider for SSL on older devices
    try {
      ProviderInstaller.installIfNeeded(applicationContext)
      Log.d("MainApplication", "Security provider updated successfully")
    } catch (e: GooglePlayServicesRepairableException) {
      Log.w("MainApplication", "Play Services can prompt user to update security provider")
    } catch (e: GooglePlayServicesNotAvailableException) {
      Log.w("MainApplication", "Device without Play Services, using built-in provider")
    } catch (t: Throwable) {
      Log.e("MainApplication", "Failed to update security provider", t)
    }

    // ✅ Init SoLoader
    SoLoader.init(this, OpenSourceMergedSoMapping)

    // 🔹 Set SSL pinning OkHttp client for all RN network calls
    try {
      com.facebook.react.modules.network.OkHttpClientProvider.setOkHttpClientFactory(
        PinnedOkHttpFactory(this)
      )
      Log.d("MainApplication", "Pinned OkHttp client set successfully")
    } catch (_: Throwable) {
      Log.w("MainApplication", "Failed to set pinned OkHttp client")
    }

    // 🔹 Start background security monitoring service
    try {
      val securityIntent = Intent(this, SecurityMonitor::class.java)
      startService(securityIntent)
      Log.d("MainApplication", "Security monitor service started")
    } catch (_: Throwable) {
      Log.w("MainApplication", "Failed to start security monitor service")
    }

    // 🔹 Load new architecture if enabled
    if (BuildConfig.IS_NEW_ARCHITECTURE_ENABLED) {
      load()
    }

    // ✅ Notify Expo lifecycle
    ApplicationLifecycleDispatcher.onApplicationCreate(this)
  }

  override fun onConfigurationChanged(newConfig: Configuration) {
    super.onConfigurationChanged(newConfig)
    ApplicationLifecycleDispatcher.onConfigurationChanged(this, newConfig)
  }
}