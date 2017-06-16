# ReadingTime
Reading Time is a personal library management app. You can add some books in the app with our ISBN searching functionnality (manually or you can scan a barcode). After that you have a book's collection and you can easily see your favorite books, if you have already saw the book or no, give them a rate, etc. 


### Installation
*All the command will be execute on the project folder*

First, you have to install [Node.js](https://nodejs.org), don't forget to add Node on your system PATH if is not already set. After that, you can install Cordova with this command : `npm install -g cordova`.

Then you can run this command : `npm install`, to install all dependencies which define in the package.json file.

### Platforms
The app is guarrantee with the google chrome browser and android >= Android 4.1 Jelly Bean (API 16). You don't have any platforms on your project yet. So you have to add anything you want between the two.

- **Browser :** No specific requirement except Google Chrome. Run this command to add the platform : `cordova platform add browser` and to run the app on the browser : `cordova run browser`.
- **Android :** To run the app on android platform, you must have some prerequisites.
 
  - First, you must have the [Java Development Kit (JDK) 8](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) or later.
  
  - Second, you must have the android SDK, the most simple way is to install [Android Studio](https://developer.android.com/studio/index.html), after the installation launch android studio and you can run the SDK manager and install the android target API you want (minimum API 16). Follow [this link](https://developer.android.com/studio/intro/update.html) to have more details about SDK Manager. If you want to run in an android virtual device, you can add a new AVD via android studio, follow [this link](https://developer.android.com/studio/run/managing-avds.html) to have more details about that.
  
  - Then, you must have some specific environnement variables on your system. Set the **JAVA_HOME** environment variable to the location of your JDK installation, the **ANDROID_HOME** environment variable to the location of your Android SDK installation. And 2 more variable on your PATH system : `<android-sdk-path>\platform-tools` and `<android-sdk-path>\tools`.
  
  - Finally, you can add the android platform to your project with this command `cordova platform add android` and to run the app on your android phone linked to the computer or your android virtual device : `cordova run android`.
  
### Build an android APK
To build an android APK for development test (fully usable and no signature require), you must have the android platforms in your project and you just have to run this command `cordova build android`. As you can see, at the last line of your console, the link to the APK is displayed. So you just have to get this APK, transfert in your phone and install the app.

*Be carefull, to install a "unofficial" you mustsetting up your device : Settings -> Security and lock screen -> Allow to installation from unknown sources*

### Plugins used
With cordova, you can find on the internet many plugins and install them easely. You have a "plugins" directory on your project directory. Here is all the plugins I installed :

- **Cordova Browser-Sync Plugin :** This is a simple plugin to have a sync refresh on our browser / android virtual device when we save our code or refresh the page. Follow this [GIT repo](https://github.com/nparashuram/cordova-plugin-browsersync) to see complete description and specific commands. 
