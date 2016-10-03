module.exports = (moduleName, packageName) =>
`package ${packageName};

import task.ISharedResource;

public interface I${moduleName} extends ISharedResource<${moduleName}Request, ${moduleName}Response> {
    ${moduleName}Response process(${moduleName}Request request);
}
`
