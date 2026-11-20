/*export const ERROR_STATUS = {
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_CONTENT: 422,
    SERVER_ERROR: 500,
};*/

export const DEFAULT_MESSAGES = {
    400: "Invalid request. Please check the information provided.",
    401: "Your session has expired or you need to log in.",
    403: "Access denied. You do not have permission to perform this action.",
    404: "The requested resource could not be found.",
    422: "Please fix the validation errors in the form.",
    500: "An unexpected server error occurred. Please try again later.",
};

export function createApiError(status = 500, message = '', fieldErrors = null) {
    const safeStatus = (status >= 500) ? 500 : status;
    const safeMessage = (safeStatus === 500 || !message) ? DEFAULT_MESSAGES[safeStatus] || DEFAULT_MESSAGES[500] : message;

    return {
        status: safeStatus,
        message: safeMessage,
        fieldErrors: (safeStatus === 422) ? fieldErrors : null,
    };
}