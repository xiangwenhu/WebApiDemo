import httpStatus from 'http-status';
import express from "express";

// handle not found errors
export const notFound = (_req: express.Request, res: express.Response, _next: express.NextFunction) => {
    res.status(httpStatus.NOT_FOUND);
    res.json({
        success: false,
        message: 'Requested Resource Not Found'
    });
    res.end();
};

// handle internal server errors
export const internalServerError = (err:any, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
    res.status(err.status || httpStatus.INTERNAL_SERVER_ERROR);
    res.json({
        message: err.message,
        extra: err.extra,
        errors: err
    });
    res.end();
};