import { Contact } from '@prisma/client';
import { Request, Response, NextFunction } from 'express';
import { RequestWithBody } from '../interfaces/RequestWithBody';
import ContactService from '../services/ContactService';
import HttpException from '../utils/exceptions/HttpException';

export default class ContactController {
  public route: string;

  private service: ContactService;

  constructor(
    service: ContactService = new ContactService(),
    route: string = '/contacts'
  ) {
    this.service = service;
    this.route = route;
  }

  public create = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { body } = req;
    const { userId } = req.body;
    try {
      const contact = await this.service.create(body, userId);
      return res.status(201).json({ contact });
    } catch (err) {
      if (err instanceof HttpException) {
        return next(new HttpException(err.status, err.message));
      }
      next(new HttpException());
    }
  };

  public read = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { userId } = req.body;
    try {
      const contacts = await this.service.list(userId);
      return res.status(200).json(contacts);
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
      const contact = await this.service.listById(id);
      return res.status(200).json({ contact });
    } catch (err) {
      if (err instanceof HttpException) {
        return next(new HttpException(err.status, err.message));
      }
      next(new HttpException());
    }
  };

  public update = async (
    req: RequestWithBody<Contact>,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    const { body } = req;
    try {
      const contact = await this.service.update(body);
      return res.status(200).json({ contact });
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
