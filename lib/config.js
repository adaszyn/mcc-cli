module.exports = {
    smartmccFileName: ".smartmcc",
    moduleSuffix: "_smarttask",
    packageName: `com.mccfunction`,
    handlerPackageName: `com.mcchandler`,
    functionDistDir: "handler/build/distributions",
    functionHandlerDir: "handler",
    gradleBuildCommand: "gradle buildZip",
    settingsGradleFileName: "settings.gradle",
    defaultMaxMemory: 256,
    defaultTimeout: 10,
    defaultLambdaSDKOptions: {
      httpOptions: {
        timeout: 480000, // 8 minutes
      }
    },
}
