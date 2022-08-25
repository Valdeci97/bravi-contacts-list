import { User } from '@prisma/client';
import { Response, NextFunction, Request } from 'express';
import Controller from '.';
import { RequestWithBody } from '../interfaces/RequestWithBody';
import UserService from '../services/UserService';
import HttpException from '../utils/exceptions/HttpException';

export default class UserController extends Controller<User> {
  public route: string;

  constructor(service = new UserService(), route = '/users') {
    super(service);
    this.route = route;
  }

  public create = async (
    req: RequestWithBody<User>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { body } = req;
    try {
      const user = await this.service.create(body);
      return res
        .status(201)
        .json({ user: { id: user.id, name: user.name, email: user.email } });
    } catch (err) {
      if (err instanceof HttpException) {
        return next(new HttpException(err.status, err.message));
      }
      next(new HttpException());
    }
  };

  public readOne = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;
    try {
      const user = await this.service.listById(id);
      return res.status(200).json({ user });
    } catch (err) {
      if (err instanceof HttpException) {
        return next(new HttpException(err.status, err.message));
      }
      next(new HttpException());
    }
  };

  public update = async (
    req: RequestWithBody<User>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;
    req.body.id = id;
    try {
      const user = await this.service.update(req.body);
      return res.status(200).json({ user });
    } catch (err) {
      if (err instanceof HttpException) {
        return next(new HttpException(err.status, err.message));
      }
      next(new HttpException());
    }
  };

  public delete = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { id } = req.params;
    try {
      await this.service.destroy(id);
      return res.status(204).end();
    } catch (err) {
      if (err instanceof HttpException) {
        return next(new HttpException(err.status, err.message));
      }
      next(new HttpException());
    }
  };
}
