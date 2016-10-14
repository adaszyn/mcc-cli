var join = require('path').join;
var fs = require('fs');
var SMART_MCC_FILENAME = require("../config").smartmccFileName;
var file = require('file');
var config = require("../config")
var errorMessages = require("../errorMessages");
const rmdir = require('rimraf');

function fileExistsRecursive(currentPath, fileName) {
    if (currentPath === "" || currentPath === "/" || currentPath === ".")
        return false;
    const completePath = join(currentPath, fileName);
    return fs.existsSync(completePath) || fileExistsRecursive(join(currentPath, '..'), fileName);
}

function isValidMccProjectPath(cwd = process.cwd()) {
    return fileExistsRecursive(cwd, SMART_MCC_FILENAME);
}

function getMccProjectRootDirectory(cwd = process.cwd()) {
    if (!isValidMccProjectPath(cwd))
        throw new Error(errorMessages.NOT_MCC_PROJECT);
    let currentPath = cwd;
    while (!fs.existsSync(join(currentPath, config.smartmccFileName)))
        currentPath = join(currentPath, "..");
    return currentPath;
}

function directoryStructureToObject(path) {
    var result = {};
    file.walkSync(path, (dirPath, dirs, files) => {
        if (dirPath.substr(path.length, 1) === "/")
            dirPath = dirPath.substr(path.length + 1);
        else
            dirPath = dirPath.substr(path.length);

        var fileNames = files.map((fullPath) => fullPath.split("/").pop());

        // files.map((fileName) => {
        //   result[fileName] = fs.readFileSync(join(dirPath, fileName))
        // })
        Object.assign(result, createObjectFromPath(result, dirPath, fileNames, path));
    })
    return result;
}

function createObjectFromPath(object, path, files, fullPath) {
    var pathArray = path
        .split("/")
        .filter((dir) => dir !== "");

    var prevObj = object;
    pathArray.forEach((element, index) => {
        if (!prevObj[element])
            prevObj[element] = {};
        prevObj = prevObj[element];
    });

    files.map(fileName => {
        prevObj[fileName] = fs.readFileSync(join(fullPath, path, fileName))
    })
}

function getMccConfigObject(cwd = process.cwd()) {
    let projectPath = getMccProjectRootDirectory(cwd);
    let filePath = join(projectPath, config.smartmccFileName);
    return JSON.parse(fs.readFileSync(filePath).toString());
}

function getFunctionDirectoryPath(functionName) {
    const root = getMccProjectRootDirectory();
    const moduleDir = join(root, `${functionName}${config.moduleSuffix}`);
    return (fs.existsSync(moduleDir) ? moduleDir : null);
}

function deleteDirectory(dirPath) {
    return new Promise(function(resolve, reject) {
      if (fs.existsSync(dirPath)) {
        rmdir(dirPath, function(error){
          (error ? reject(error) : resolve("Deleted"));
        });
      } else {
          reject("Directory does not exist");
      }

    });
}

module.exports = {
    isValidMccProjectPath,
    fileExistsRecursive,
    directoryStructureToObject,
    getMccProjectRootDirectory,
    getMccConfigObject,
    getFunctionDirectoryPath,
    deleteDirectory
};
