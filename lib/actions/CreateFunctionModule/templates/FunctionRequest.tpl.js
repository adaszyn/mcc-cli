module.exports = (moduleName, packageName) => `

package ${packageName};

public class ${moduleName}Request {
    public ${moduleName}Request() {
    }
}
`
