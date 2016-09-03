module.exports = (moduleName, packageName) => `

package ${packageName};

public class ${moduleName} implements I${moduleName} {

    @Override
    public ${moduleName}Response process(${moduleName}Request request) {
        return new ${moduleName}Response();
    }
}

`
