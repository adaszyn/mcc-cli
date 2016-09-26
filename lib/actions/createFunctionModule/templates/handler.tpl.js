module.exports = (moduleName, packageName) =>
`package ${packageName};

import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;
import com.mccfunction.${moduleName};
import com.mccfunction.${moduleName}Request;
import com.mccfunction.${moduleName}Response;

public class ${moduleName}Handler implements RequestHandler<${moduleName}Request, ${moduleName}Response> {
    public ${moduleName}Response handleRequest(${moduleName}Request request, Context context) {
        return new ${moduleName}().process(request);
    }
}

`
