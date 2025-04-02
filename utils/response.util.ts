// filepath: c:\Users\kevin\OneDrive\Desktop\BE\utils\response.util.ts
export const successResponse = (data: any, message = 'Success') => ({
    status: 'success',
    message,
    data,
});

export const errorResponse = (message = 'Error', statusCode = 500) => ({
    status: 'error',
    message,
    statusCode,
});
