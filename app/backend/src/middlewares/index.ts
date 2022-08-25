import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/exceptions/HttpException';

export default class GlobalErrorHandler {
  private message!: string;

  private code!: number;

  public error = (
    err: HttpException,
    _req: Request,
    res: Response,
    _next: NextFunction
  ): Response => {
    this.code = err.status;
    this.message = err.message;
    return res.status(this.code).json({ message: this.message });
  };
}
