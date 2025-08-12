package com.pankaj465.FinGuard

import android.content.Context
import android.os.Build
import android.provider.Settings
import java.io.BufferedReader
import java.io.File
import java.io.InputStreamReader

object SecurityUtils {
    fun isDeviceRooted(context: Context): Boolean {
        // Multiple detection methods for comprehensive coverage
        return canExecuteSu() || 
               hasRootApps() || 
               hasRootBinaries() || 
               hasRootPackages() ||
               hasDangerousProps() ||
               hasRWPaths()
    }
    
    private fun canExecuteSu(): Boolean {
        return try {
            Runtime.getRuntime().exec(arrayOf("which", "su"))
            true
        } catch (e: Exception) {
            false
        }
    }
    
    private fun hasRootApps(): Boolean {
        val rootApps = arrayOf(
            "com.noshufou.android.su",
            "com.thirdparty.superuser",
            "eu.chainfire.supersu",
            "com.topjohnwu.magisk",
            "com.kingroot.kinguser",
            "com.kingo.root",
            "com.smedialink.oneclickroot",
            "com.qihoo.permmgr",
            "com.rootexplorer.cmd",
            "com.alephzain.framaroot"
        )
        
        val packageManager = context.packageManager
        return rootApps.any { packageName ->
            try {
                packageManager.getPackageInfo(packageName, 0)
                true
            } catch (e: Exception) {
                false
            }
        }
    }
    
    private fun hasRootBinaries(): Boolean {
        val rootBinaries = arrayOf(
            "/system/app/Superuser.apk",
            "/sbin/su",
            "/system/bin/su",
            "/system/xbin/su",
            "/data/local/xbin/su",
            "/data/local/bin/su",
            "/system/sd/xbin/su",
            "/system/bin/failsafe/su",
            "/data/local/su",
            "/su/bin/su"
        )
        
        return rootBinaries.any { File(it).exists() }
    }
    
    private fun hasRootPackages(): Boolean {
        val rootPackages = arrayOf(
            "com.noshufou.android.su",
            "com.thirdparty.superuser",
            "eu.chainfire.supersu",
            "com.topjohnwu.magisk"
        )
        
        val packageManager = context.packageManager
        return rootPackages.any { packageName ->
            try {
                packageManager.getPackageInfo(packageName, 0)
                true
            } catch (e: Exception) {
                false
            }
        }
    }
    
    private fun hasDangerousProps(): Boolean {
        val dangerousProps = arrayOf(
            "ro.debuggable" to "1",
            "ro.secure" to "0",
            "ro.build.type" to "userdebug",
            "ro.build.type" to "eng"
        )
        
        return dangerousProps.any { (prop, value) ->
            try {
                val propValue = getSystemProperty(prop)
                propValue == value
            } catch (e: Exception) {
                false
            }
        }
    }
    
    private fun hasRWPaths(): Boolean {
        val rwPaths = arrayOf(
            "/system",
            "/system/bin",
            "/system/sbin",
            "/system/xbin",
            "/vendor/bin",
            "/sbin",
            "/etc"
        )
        
        return rwPaths.any { path ->
            try {
                val file = File(path)
                file.canWrite()
            } catch (e: Exception) {
                false
            }
        }
    }
    
    private fun getSystemProperty(key: String): String? {
        return try {
            val c = Class.forName("android.os.SystemProperties")
            val get = c.getMethod("get", String::class.java)
            get.invoke(c, key) as? String
        } catch (e: Exception) {
            null
        }
    }
    
    fun isEmulator(): Boolean {
        return (Build.FINGERPRINT.startsWith("generic")
                || Build.FINGERPRINT.startsWith("unknown")
                || Build.MODEL.contains("google_sdk")
                || Build.MODEL.contains("Emulator")
                || Build.MODEL.contains("Android SDK built for x86")
                || Build.MANUFACTURER.contains("Genymotion")
                || (Build.BRAND.startsWith("generic") && Build.DEVICE.startsWith("generic"))
                || "google_sdk" == Build.PRODUCT)
    }
    
    fun isDeveloperModeEnabled(context: Context): Boolean {
        return try {
            Settings.Global.getInt(context.contentResolver, Settings.Global.ADB_ENABLED, 0) == 1 ||
            Settings.Global.getInt(context.contentResolver, Settings.Global.DEVELOPMENT_SETTINGS_ENABLED, 0) == 1
        } catch (e: Exception) {
            false
        }
    }
}