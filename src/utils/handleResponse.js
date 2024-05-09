export const handleResponse = (res, statusCode, data = null, message = '') => {
    return res.status(statusCode).json({
        success: statusCode >= 200 && statusCode < 300,
        statusCode,
        message,
        data
    });
};

