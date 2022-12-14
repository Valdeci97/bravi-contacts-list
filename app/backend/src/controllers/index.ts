/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from 'express';
import HttpException from '../utils/exceptions/HttpException';
import CrudModel from '../interfaces/CrudModel';
import { RequestWithBody } from '../interfaces/RequestWithBody';

export default abstract class Controller<T> {
  public abstract route: string;

  protected service: CrudModel<T>;

  constructor(service: CrudModel<T>) {
    this.service = service;
  }

  public abstract create(
    req: RequestWithBody<T>,
    res: Response,
    next: NextFunction
  ): any;

  public read = async (
    _req: Request,
    res: Response<Array<T | Partial<T>>>,
    next: NextFunction
  ): Promise<typeof res | void> => {
    try {
      const obj = await this.service.list();
      return res.status(200).json(obj);
    } catch (err) {
      console.log(err);
      next(new HttpException(500, 'Internal server error!'));
    }
  };

  public abstract readOne(
    req: Request,
    res: Response<T | Partial<T>>,
    next: NextFunction
  ): any;

  public abstract update(
    req: RequestWithBody<T>,
    res: Response,
    next: NextFunction
  ): any;

  public abstract delete(req: Request, res: Response, next: NextFunction): any;
}
