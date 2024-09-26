import { StatusCodes } from "http-status-codes";
import { env } from "~/config/environment";

export const errorHandlingMiddleware = (err, req, res, next) => {
    if (!err.statusCode) err.statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

    const responseError = {
        statusCode: err.statusCode,
        message: err.message || StatusCodes[err.statusCode],
        stack: err.stack,
    };

    if (env.BUILD_MODE !== "development") delete responseError.stack;

    // Đoạn này có thể mở rộng nhiều về sau như ghi Error Log vào file, bắn thông báo lỗi vào group Slack, Telegram, Email...vv
    // Hoặc có thể viết riêng Code ra một file Middleware khác tùy dự án.

    res.status(responseError.statusCode).json(responseError);
};
