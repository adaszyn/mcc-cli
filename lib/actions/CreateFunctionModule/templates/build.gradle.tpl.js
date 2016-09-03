module.exports = (moduleName, packageName) => `
apply plugin: 'java'

sourceCompatibility = 1.7
targetCompatibility = 1.7

repositories {
    mavenCentral()
}

dependencies {
    compile (
            fileTree(dir: 'lib', include: ['*.jar'])

    )
    compile project(path: ':mcclib')
}

task buildZip(type: Zip) {
    from compileJava
    from processResources
    into('lib') {
        from configurations.runtime
    }
}

build.dependsOn buildZip
`
