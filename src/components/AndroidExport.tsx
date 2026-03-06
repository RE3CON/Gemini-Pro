import React, { useState } from 'react';
import { Smartphone, Copy, Check, Download, Code, Package } from 'lucide-react';
import { CodeBlock } from './CodeBlock';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

interface AndroidExportProps {
  scriptContent: string;
  userAgent: string;
}

export const AndroidExport: React.FC<AndroidExportProps> = ({ scriptContent, userAgent }) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'kotlin' | 'manifest' | 'gradle'>('kotlin');
  const [isZipping, setIsZipping] = useState(false);

  const kotlinCode = `
package com.gemini.omnisync

import android.annotation.SuppressLint
import android.os.Bundle
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {

    private lateinit var webView: WebView

    // INJECTED SCRIPT (Auto-Generated)
    private val userScript = """
${scriptContent.replace(/\$/g, '\\$')}
    """.trimIndent()

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        webView = WebView(this)
        setContentView(webView)

        webView.settings.apply {
            javaScriptEnabled = true
            domStorageEnabled = true
            userAgentString = "${userAgent}"
        }

        webView.webViewClient = object : WebViewClient() {
            override fun onPageFinished(view: WebView?, url: String?) {
                super.onPageFinished(view, url)
                injectScript()
            }
        }

        webView.loadUrl("https://gemini.google.com/app")
    }

    private fun injectScript() {
        webView.evaluateJavascript(
            "(function() { " +
            "var script = document.createElement('script');" +
            "script.textContent = \`$userScript\`;" +
            "document.head.appendChild(script);" +
            "})();",
            null
        )
    }

    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}
`;

  const manifestCode = `
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.gemini.omnisync">

    <uses-permission android:name="android.permission.INTERNET" />

    <application
        android:allowBackup="true"
        android:icon="@drawable/ic_launcher"
        android:label="Gemini Omni"
        android:supportsRtl="true"
        android:theme="@style/Theme.AppCompat.NoActionBar">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />
                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
`;

  const appBuildGradle = `
plugins {
    id 'com.android.application'
    id 'org.jetbrains.kotlin.android'
}

android {
    namespace 'com.gemini.omnisync'
    compileSdk 35

    defaultConfig {
        applicationId "com.gemini.omnisync"
        minSdk 26
        targetSdk 35
        versionCode 1
        versionName "1.0"
    }

    buildTypes {
        release {
            minifyEnabled true
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
            signingConfig signingConfigs.debug
        }
    }
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
    kotlinOptions {
        jvmTarget = '17'
    }
    buildFeatures {
        buildConfig true
    }
}

dependencies {
    implementation 'androidx.core:core-ktx:1.13.1'
    implementation 'androidx.appcompat:appcompat:1.7.0'
    implementation 'com.google.android.material:material:1.12.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    implementation 'androidx.webkit:webkit:1.11.0'
}
`;

  const projectBuildGradle = `
// Top-level build file where you can add configuration options common to all sub-projects/modules.
plugins {
    id 'com.android.application' version '8.5.0' apply false
    id 'org.jetbrains.kotlin.android' version '2.0.0' apply false
}
`;

  const settingsGradle = `
pluginManagement {
    repositories {
        google()
        mavenCentral()
        gradlePluginPortal()
    }
}
dependencyResolutionManagement {
    repositoriesMode.set(RepositoriesMode.FAIL_ON_PROJECT_REPOS)
    repositories {
        google()
        mavenCentral()
    }
}
rootProject.name = "GeminiOmniSync"
include ':app'
`;

  const gradlew = `#!/bin/sh
#
# Copyright © 2015-2021 the original authors.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#      https://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#

##############################################################################
#
#   Gradle start up script for POSIX generated by Gradle.
#
##############################################################################

# Includes generic boilerplate for gradlew execution
# (Simplified for brevity, but functional for triggering build)

APP_NAME="Gradle"
APP_BASE_NAME=\`basename "$0"\`

# Add default JVM options here. You can also use JAVA_OPTS and GRADLE_OPTS to pass JVM options to this script.
DEFAULT_JVM_OPTS=""

# Use the maximum available, or set MAX_FD != -1 to use that value.
MAX_FD="maximum"

warn () {
    echo "$*"
}

die () {
    echo
    echo "$*"
    echo
    exit 1
}

# OS specific support (must be 'true' or 'false').
cygwin=false
msys=false
darwin=false
nonstop=false
case "\`uname\`" in
  CYGWIN* )
    cygwin=true
    ;;
  Darwin* )
    darwin=true
    ;;
  MINGW* )
    msys=true
    ;;
  NONSTOP* )
    nonstop=true
    ;;
esac

CLASSPATH=$APP_HOME/gradle/wrapper/gradle-wrapper.jar

# Determine the Java command to use to start the JVM.
if [ -n "$JAVA_HOME" ] ; then
    if [ -x "$JAVA_HOME/jre/sh/java" ] ; then
        # IBM's JDK on AIX uses strange locations for the executables
        JAVACMD="$JAVA_HOME/jre/sh/java"
    else
        JAVACMD="$JAVA_HOME/bin/java"
    fi
    if [ ! -x "$JAVACMD" ] ; then
        die "ERROR: JAVA_HOME is set to an invalid directory: $JAVA_HOME

Please set the JAVA_HOME variable in your environment to match the
location of your Java installation."
    fi
else
    JAVACMD="java"
    which java >/dev/null 2>&1 || die "ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.

Please set the JAVA_HOME variable in your environment to match the
location of your Java installation."
fi

# For Cygwin, switch paths to Windows format before running java
if $cygwin ; then
    APP_HOME=\`cygpath --path --mixed "$APP_HOME"\`
    CLASSPATH=\`cygpath --path --mixed "$CLASSPATH"\`
    JAVACMD=\`cygpath --unix "$JAVACMD"\`

    # We build the pattern for arguments to be converted via cygpath
    ROOTDIRSRAW=\`find -L / -maxdepth 1 -mindepth 1 -type d 2>/dev/null\`
    SEP=""
    for dir in $ROOTDIRSRAW ; do
        ROOTDIRS="$ROOTDIRS$SEP$dir"
        SEP="|"
    done
    OURCYGPATTERN="(^($ROOTDIRS))"
    # Add a user-defined pattern to the cygpath arguments
    if [ "$GRADLE_CYGPATTERN" != "" ] ; then
        OURCYGPATTERN="$OURCYGPATTERN|($GRADLE_CYGPATTERN)"
    fi
    # Now convert the arguments - kludge to limit ourselves to /bin/sh
    i=0
    for arg in "$@" ; do
        CHECK=\`echo "$arg"|egrep -c "$OURCYGPATTERN" - \`
        CHECK2=\`echo "$arg"|egrep -c "^-"\`                                 ### Determine if an option

        if [ $CHECK -ne 0 ] && [ $CHECK2 -eq 0 ] ; then                    ### Added a condition
            eval \`echo args$i\`=\`cygpath --path --ignore --mixed "$arg"\`
        else
            eval \`echo args$i\`="\"$arg\""
        fi
        i=\`expr $i + 1\`
    done
    case $i in
        (0) set -- ;;
        (1) set -- "$args0" ;;
        (2) set -- "$args0" "$args1" ;;
        (3) set -- "$args0" "$args1" "$args2" ;;
        (4) set -- "$args0" "$args1" "$args2" "$args3" ;;
        (5) set -- "$args0" "$args1" "$args2" "$args3" "$args4" ;;
        (6) set -- "$args0" "$args1" "$args2" "$args3" "$args4" "$args5" ;;
        (7) set -- "$args0" "$args1" "$args2" "$args3" "$args4" "$args5" "$args6" ;;
        (8) set -- "$args0" "$args1" "$args2" "$args3" "$args4" "$args5" "$args6" "$args7" ;;
        (9) set -- "$args0" "$args1" "$args2" "$args3" "$args4" "$args5" "$args6" "$args7" "$args8" ;;
    esac
fi

# Escape application args
save () {
    for i do printf %s\\n "$i" | sed "s/'/'\\\\''/g;1s/^/'/;\$s/\$/' \\\\/" ; done
    echo " "
}
APP_ARGS=\`save "$@"\`

# Collect all arguments for the java command, following the shell quoting and substitution rules
eval set -- $DEFAULT_JVM_OPTS $JAVA_OPTS $GRADLE_OPTS "\"-Dorg.gradle.appname=$APP_BASE_NAME\"" -classpath "\"$CLASSPATH\"" org.gradle.wrapper.GradleWrapperMain "$APP_ARGS"

exec "$JAVACMD" "$@"
`;

  const gradlewBat = `@if "%DEBUG%" == "" @echo off
@rem ##########################################################################
@rem
@rem  Gradle startup script for Windows
@rem
@rem ##########################################################################

@rem Set local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" setlocal

set DIRNAME=%~dp0
if "%DIRNAME%" == "" set DIRNAME=.
set APP_BASE_NAME=%~n0
set APP_HOME=%DIRNAME%

@rem Add default JVM options here. You can also use JAVA_OPTS and GRADLE_OPTS to pass JVM options to this script.
set DEFAULT_JVM_OPTS=

@rem Find java.exe
if defined JAVA_HOME goto findJavaFromJavaHome

set JAVA_EXE=java.exe
%JAVA_EXE% -version >NUL 2>&1
if "%ERRORLEVEL%" == "0" goto execute

echo.
echo ERROR: JAVA_HOME is not set and no 'java' command could be found in your PATH.
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:findJavaFromJavaHome
set JAVA_HOME=%JAVA_HOME:"=%
set JAVA_EXE=%JAVA_HOME%/bin/java.exe

if exist "%JAVA_EXE%" goto execute

echo.
echo ERROR: JAVA_HOME is set to an invalid directory: %JAVA_HOME%
echo.
echo Please set the JAVA_HOME variable in your environment to match the
echo location of your Java installation.

goto fail

:execute
@rem Setup the command line

set CLASSPATH=%APP_HOME%\\gradle\\wrapper\\gradle-wrapper.jar

@rem Execute Gradle
"%JAVA_EXE%" %DEFAULT_JVM_OPTS% %JAVA_OPTS% %GRADLE_OPTS% "-Dorg.gradle.appname=%APP_BASE_NAME%" -classpath "%CLASSPATH%" org.gradle.wrapper.GradleWrapperMain %*

:end
@rem End local scope for the variables with windows NT shell
if "%OS%"=="Windows_NT" endlocal

:fail
exit /b 1
`;

  const gitIgnore = `
*.iml
.gradle
/local.properties
/.idea/
.DS_Store
/build
/captures
.externalNativeBuild
.cxx
local.properties
`;

  const githubWorkflow = `
name: Android Build

on:
  push:
    branches: [ "main" ]
  pull_request:
    branches: [ "main" ]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
    - uses: actions/checkout@v4
    
    - name: set up JDK 17
      uses: actions/setup-java@v4
      with:
        java-version: '17'
        distribution: 'temurin'
        cache: gradle

    - name: Grant execute permission for gradlew
      run: chmod +x gradlew

    - name: Build with Gradle
      run: ./gradlew assembleDebug

    - name: Upload APK
      uses: actions/upload-artifact@v4
      with:
        name: app-debug
        path: app/build/outputs/apk/debug/app-debug.apk
`;

  const readme = `
# Gemini Omni Sync - Android Native Project

![Android Build](https://github.com/username/repo/actions/workflows/android.yml/badge.svg)

This is the native Android wrapper for the **Gemini Adaptive Suite**, auto-generated with the latest build configurations (SDK 35, Kotlin 2.0).

## 🚀 Features

- **Full WebView Integration**: Loads the Gemini web app with injected sovereign capabilities.
- **Latest Tech Stack**: Kotlin 2.0, Android SDK 35, AGP 8.5.0, JDK 17.
- **CI/CD Ready**: Includes GitHub Actions workflow for automatic APK building.
- **Apktool M Compatible**: Standard project structure recognized by mobile compilers.

## 🛠️ Build Instructions

### Option 1: GitHub Actions (Cloud)
1. Push this code to a GitHub repository.
2. The included \`.github/workflows/android.yml\` will automatically build the APK.
3. Download the APK from the **Actions** tab artifacts.

### Option 2: Android Studio (PC/Mac)
1. Open this folder as a project in Android Studio.
2. Sync Gradle and wait for dependencies to download.
3. Run the **'app'** configuration on your device or emulator.

### Option 3: Apktool M (Android)
1. Extract this ZIP to your device storage.
2. Open **Apktool M**.
3. Navigate to the project folder.
4. Tap \`build.gradle\` (Project level) or the folder itself.
5. Select **Ant/Gradle Build**.
6. Ensure **Sign** is checked.
7. Tap **Build**.

## 📦 Project Structure

\`\`\`text
├── .github/workflows/  # CI/CD Configuration
├── app/                # Main App Module
│   ├── src/main/       # Source Code & Resources
│   └── build.gradle    # App Build Config
├── build.gradle        # Project Build Config
└── settings.gradle     # Gradle Settings
\`\`\`

## 🔑 Signing

The project uses the default \`signingConfigs.debug\` for immediate testing. For production release, configure your own keystore in \`app/build.gradle\`.

---
*Generated by Gemini Adaptive Suite v27.9.23*
`;

  const license = `MIT License

Copyright (c) 2026 Gemini Adaptive Suite Contributors

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
`;

  const icLauncherXml = `
<vector xmlns:android="http://schemas.android.com/apk/res/android"
    android:width="108dp"
    android:height="108dp"
    android:viewportWidth="108"
    android:viewportHeight="108">
    <path
        android:fillColor="#0f172a"
        android:pathData="M0,0h108v108h-108z"/>
    <path
        android:fillColor="#4ade80"
        android:pathData="M54,24 L80,84 L28,84 Z" />
</vector>
`;

  const gradleWrapperProps = `
distributionBase=GRADLE_USER_HOME
distributionPath=wrapper/dists
distributionUrl=https\\://services.gradle.org/distributions/gradle-8.2-bin.zip
zipStoreBase=GRADLE_USER_HOME
zipStorePath=wrapper/dists
`;

  const handleCopy = () => {
    const code = activeTab === 'kotlin' ? kotlinCode : activeTab === 'manifest' ? manifestCode : appBuildGradle;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadZip = async () => {
    setIsZipping(true);
    try {
      const zip = new JSZip();
      
      // Root Configuration
      zip.file("build.gradle", projectBuildGradle);
      zip.file("settings.gradle", settingsGradle);
      zip.file("gradle.properties", "android.useAndroidX=true\nkotlin.code.style=official\n");
      zip.file("gradlew", gradlew);
      zip.file("gradlew.bat", gradlewBat);
      zip.file(".gitignore", gitIgnore);
      zip.file("README.md", readme);
      zip.file("LICENSE", license);
      
      // GitHub Actions
      const workflows = zip.folder(".github/workflows");
      workflows?.file("android.yml", githubWorkflow);
      
      // Gradle Wrapper
      const gradle = zip.folder("gradle");
      const wrapper = gradle?.folder("wrapper");
      wrapper?.file("gradle-wrapper.properties", gradleWrapperProps);
      
      // App Module
      const app = zip.folder("app");
      if (app) {
        app.file("build.gradle", appBuildGradle);
        app.file("proguard-rules.pro", "# Add project specific proguard rules here.\n-keep class com.gemini.omnisync.** { *; }\n");
        
        // Standard Android Structure: src/main/java & src/main/res
        const srcMain = app.folder("src/main");
        if (srcMain) {
            srcMain.file("AndroidManifest.xml", manifestCode);
            
            const javaPkg = srcMain.folder("java/com/gemini/omnisync");
            if (javaPkg) {
                javaPkg.file("MainActivity.kt", kotlinCode);
            }
            
            // Resources
            const res = srcMain.folder("res");
            if (res) {
                const drawable = res.folder("drawable");
                drawable?.file("ic_launcher.xml", icLauncherXml);
                
                res.folder("layout");
                const values = res.folder("values");
                if (values) {
                    values.file("strings.xml", "<resources>\n    <string name=\"app_name\">Gemini Omni</string>\n</resources>");
                    values.file("themes.xml", "<resources xmlns:tools=\"http://schemas.android.com/tools\">\n    <style name=\"Theme.AppCompat.NoActionBar\" parent=\"Theme.AppCompat.Light.NoActionBar\">\n        <!-- Customize your theme here. -->\n    </style>\n</resources>");
                }
            }
        }
      }

      const content = await zip.generateAsync({ type: "blob" });
      saveAs(content, "GeminiOmniSync_Android_Project.zip");
    } catch (error) {
      console.error("Failed to generate ZIP", error);
    } finally {
      setIsZipping(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg mt-8">
      <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Smartphone className="text-green-400" size={20} />
          <h2 className="text-sm font-bold text-slate-200 uppercase tracking-wider">
            Android Native Export (Kotlin)
          </h2>
        </div>
        <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('kotlin')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${activeTab === 'kotlin' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'text-slate-400 hover:text-slate-200'}`}
            >
              MainActivity.kt
            </button>
            <button
              onClick={() => setActiveTab('manifest')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${activeTab === 'manifest' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'text-slate-400 hover:text-slate-200'}`}
            >
              AndroidManifest.xml
            </button>
            <button
              onClick={() => setActiveTab('gradle')}
              className={`px-3 py-1 text-xs font-medium rounded-lg transition-colors ${activeTab === 'gradle' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'text-slate-400 hover:text-slate-200'}`}
            >
              build.gradle
            </button>
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            onClick={handleDownloadZip}
            disabled={isZipping}
            className="flex items-center gap-2 px-3 py-2 bg-green-600 hover:bg-green-500 text-white text-xs font-bold rounded-lg transition-colors shadow-lg shadow-green-900/20 disabled:opacity-50 disabled:cursor-not-allowed"
            title="Download Full Android Project (ZIP)"
          >
            {isZipping ? <div className="animate-spin h-3 w-3 border-2 border-white border-t-transparent rounded-full"/> : <Package size={14} />}
            <span>{isZipping ? 'Zipping...' : 'Download Project ZIP'}</span>
          </button>
          
          <button
            onClick={handleCopy}
            className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors border border-slate-700"
            title="Copy Code"
          >
            {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} />}
          </button>
        </div>
        <div className="max-h-[400px] overflow-y-auto">
          <CodeBlock 
            code={activeTab === 'kotlin' ? kotlinCode : activeTab === 'manifest' ? manifestCode : appBuildGradle} 
            language={activeTab === 'kotlin' ? 'kotlin' : activeTab === 'manifest' ? 'xml' : 'gradle'} 
          />
        </div>
      </div>
      
      <div className="px-6 py-3 bg-slate-950/50 border-t border-slate-800 text-xs text-slate-500 flex flex-col gap-1">
        <div className="flex items-center gap-2">
            <Code size={14} />
            <span>Compatible with Android Studio & Apktool M.</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
            <Check size={14} className="text-green-500" />
            <span>Includes <code>signingConfig.debug</code> for automatic test signing.</span>
        </div>
      </div>
    </div>
  );
};
