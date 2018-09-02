# Comcast xFi thermotate control program
Implemented by React-native with a WebView loading local web content generated by react=redux (https://github.com/JoeyHuangOne/xfi-thermo-redux).

## Run
yarn install

react-native link (needed for rn-fetch-blob module)

react-native run-ios or react-native run-android



## Note:

### A.Web content

React/Webpack generated index.html pointed to js with URL starting with /.
Even though those files are under the root folder (of bundled app), webview need to load the content as './index.html'.
It can't find the js/css with /. So need to update the index.html to load the js/css with ./, instead of /.

Will update Webpack config later to fix this.

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
distributionUrl=https\://services.gradle.org/distributions/gradle-3.5.1-all.zip
> # for jdk 10, may need to use following gradle according to
> # https://stackoverflow.com/questions/46867399/react-native-error-could-not-determine-java-version-from-9-0-1
> #distributionUrl=https\://services.gradle.org/distributions/gradle-4.3-rc-2-all.zip

#### run-android error about Android SDK
May need to set ANDROID_HOME in android/local.properties file
sdk.dir = /Users/joey/Library/Android/sdk

#### run-android error about Java Path
May need to use Java 8
export JAVA_HOME=/Library/Java/JavaVirtualMachines/jdk1.8.0_171.jdk/Contents/Home

