const mkdirp = require('mkdirp');
const path = require('path');
const fs = require('fs');

// Templates
const bodyTpl = require("./templates/FunctionBody.tpl");
const interfaceTpl = require("./templates/FunctionInterface.tpl");
const requestTpl = require("./templates/FunctionRequest.tpl");
const responseTpl = require("./templates/FunctionResponse.tpl");
const gradleTpl = require("./templates/build.gradle.tpl");
const gitignoreTpl = require("./templates/.gitignore.tpl");


const packageName = `com.mccfunction`;

function createFileWithContents(path, templateFunction, moduleName, packageName) {
    return new Promise((resolve, reject) => {
      fs.writeFile(path, templateFunction(moduleName, packageName), function(err) {
          if (err)
              reject();
          resolve();
      });
    });
}

function createDirectory(path) {
  return new Promise((resolve, reject) => {
    mkdirp(path, function(err) {
        if (err) {
          console.error(`Cannot create directory ${moduleName}`, err);
          reject();
        }
        resolve();
    });
  })
}

module.exports = function(moduleName) {
    const root = path.join(process.cwd(), moduleName);
    const srcDir = path.join(root, "src/main/java/com/mccfunction");
    createDirectory(root)
      .then(() => createDirectory(srcDir))
      .then(() => createFileWithContents(path.join(srcDir, `${moduleName}.java`), bodyTpl, moduleName, packageName))
      .then(() => createFileWithContents(path.join(srcDir, `I${moduleName}.java`), interfaceTpl, moduleName, packageName))
      .then(() => createFileWithContents(path.join(srcDir, `${moduleName}Response.java`), responseTpl, moduleName, packageName))
      .then(() => createFileWithContents(path.join(srcDir, `${moduleName}Request.java`), requestTpl, moduleName, packageName))
      .then(() => createFileWithContents(path.join(root, `build.gradle`), gradleTpl, moduleName, packageName))
      .then(() => createFileWithContents(path.join(root, `.gitignore`), gitignoreTpl, moduleName, packageName))
      .catch(() => {console.log("ERROR")})
}
