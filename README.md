# Comcast xFi thermotate control program
Implemented by React-native with a WebView loading local web content generated by react=redux (https://github.com/JoeyHuangOne/xfi-thermo-redux).

## Run
yarn install

react-native link (needed for rn-fetch-blob module)

react-native run-ios or react-native run-android

## To debug WebView in react-native
Use Chrome chrome://inspect
But the GUI is messed up in recent Chrome like 63-68. Use the Chrome 62 will have the right GUI.
https://stackoverflow.com/questions/47980279/google-chrome-devtools-broken-when-inspecting-android-webview/48000682#48000682
macOS: https://www.googleapis.com/download/storage/v1/b/chromium-browser-snapshots/o/Mac%2F499098%2Fchrome-mac.zip?generation=1504230238091965&alt=media

To debug the react-native JS, reference http://facebook.github.io/react-native/docs/debugging.html#content

## Note:

### A.Web content

React/Webpack generated index.html pointed to js with URL starting with /.
Even though those files are under the root folder (of bundled app), webview need to load the content as './index.html'.
It can't find the js/css with /. So need to update the index.html to load the js/css with ./, instead of /.

vue.config.js can set baseUrl for this. React may use route baseName, as in https://stackoverflow.com/questions/48134785/how-to-set-a-base-url-for-react-router-at-the-app-level

Vue generated content can be used as web source now. It can be set in app.js by
> source={require('./webSrcVue/index.html')}

or

> source={require('./webSrcRedux/index.html')

It was not working before due to baseUrl and missing default route. The Andoird still have problem about missing attribSet, a server problem.

### B. local file module

rn-fetch-blob module is required. It's a module to access local files inside app bindle. Will use it later to update new local web content.
https://www.npmjs.com/package/react-native-fetch-blob#user-content-installation


### C.Add web content into mobile app


#### There are several ways to add web content into moile app.
##### 1. Using require
        <WebView
          source={require('./webViewSrc/index.html')}
        ></WebView>
This work well for iOS. Need to verify if it works in Android.

##### 2. In XCode, Add Files into project with create folder reference option


### D. To run on Android simulator

Need to set path to Android adb first, like
export PATH="/Users/yourUser/Library/Android/sdk/platform-tools":$PATH




### E. Problems for Android
#### run-android error about Java SDK
In android/gradle/gradle-wrapper/gradle-wrapper.properties file, ay use different gradle version for JDK 10
For jdk 10, may need to use following gradle according to
https://stackoverflow.com/questions/46867399/react-native-error-could-not-determine-java-version-from-9-0-1

> distributionUrl=https\://services.gradle.org/distributions/gradle-3.5.1-all.zip

or

> distributionUrl=https\://services.gradle.org/distributions/gradle-4.3-rc-2-all.zip

#### run-android error about Android SDK
May need to set ANDROID_HOME in android/local.properties file

sdk.dir = /Users/joey/Library/Android/sdk

#### run-android error about Java Path
May need to use Java 8

export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_171.jdk/Contents/Home

#### Thermolist is missing after login
The same web content work well in iOS. For Android request, server returns thermostats without attribSet attribute, even the request data is the same as iOS. Need server to fix it, or use API for individual device, rather than /seeds API.
