import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response) => {
  const statusCode = res.statusCode || 500;

  res.status(statusCode);

  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

export default errorHandler;
