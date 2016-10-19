module.exports = {
    smartmccFileName: ".smartmcc",
    moduleSuffix: "_smarttask",
    packageName: `com.mccfunction`,
    handlerPackageName: `com.mcchandler`,
    functionDistDir: "build/distributions",
    functionHandlerDir: "handler",
    gradleBuildCommand: "gradle buildZip",
    settingsGradleFileName: "settings.gradle",
    defaultMaxMemory: 256,
    defaultTimeout: 10,
}
