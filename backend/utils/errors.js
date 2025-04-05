class BaseError extends Error {
    constructor(message, statusCode, errorType) {
        super(message);
        this.statusCode = statusCode;
        this.name = errorType;
    }
}

// Function Errors
class FunctionError extends BaseError {
    constructor(message = 'Function invocation failed') {
        super(message, 500, 'FUNCTION_INVOCATION_FAILED');
    }
}

class FunctionTimeoutError extends BaseError {
    constructor(message = 'Function invocation timed out') {
        super(message, 504, 'FUNCTION_INVOCATION_TIMEOUT');
    }
}

// Deployment Errors
class DeploymentBlockedError extends BaseError {
    constructor(message = 'Deployment blocked') {
        super(message, 403, 'DEPLOYMENT_BLOCKED');
    }
}

class DeploymentNotFoundError extends BaseError {
    constructor(message = 'Deployment not found') {
        super(message, 404, 'DEPLOYMENT_NOT_FOUND');
    }
}

// Routing Errors
class RouterMatchError extends BaseError {
    constructor(message = 'Router cannot match request') {
        super(message, 502, 'ROUTER_CANNOT_MATCH');
    }
}

class ExternalTargetError extends BaseError {
    constructor(message = 'External target error') {
        super(message, 502, 'ROUTER_EXTERNAL_TARGET_ERROR');
    }
}

// Request Errors
class InvalidRequestMethodError extends BaseError {
    constructor(message = 'Invalid request method') {
        super(message, 405, 'INVALID_REQUEST_METHOD');
    }
}

class ResourceNotFoundError extends BaseError {
    constructor(message = 'Resource not found') {
        super(message, 404, 'RESOURCE_NOT_FOUND');
    }
}

// Image Errors
class ImageOptimizeError extends BaseError {
    constructor(message = 'Invalid image optimize request') {
        super(message, 400, 'INVALID_IMAGE_OPTIMIZE_REQUEST');
    }
}

export {
    BaseError,
    FunctionError,
    FunctionTimeoutError,
    DeploymentBlockedError,
    DeploymentNotFoundError,
    RouterMatchError,
    ExternalTargetError,
    InvalidRequestMethodError,
    ResourceNotFoundError,
    ImageOptimizeError
};
