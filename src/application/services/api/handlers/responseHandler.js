export function responseHandler({message, statusCode = 200, data = {}}) {
    const response = {
        message, status: "", statusCode, data
    };

    if (statusCode >= 500) {
        response.status = "INTERNAL_SERVER_ERROR";
    } else if (statusCode >= 400) {
        response.status = "BAD_REQUEST";
    } else if (statusCode >= 300) {
        response.status = "REDIRECT";
    } else if (statusCode >= 200) {
        response.status = "OK";
    } else {
        response.status = "UNKNOWN";
    }

    return response;
}
