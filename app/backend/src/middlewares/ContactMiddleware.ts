import { NextFunction, Request, Response } from 'express';
import {
  contactEmail,
  contactPhone,
  contactWhatsapp,
} from '../utils/joi-schemas/contact';

export default class ContactMiddleware {
  public validatePhone = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    const { error } = contactPhone.validate(req.body);
    if (error) {
      const [code, message] = error.message.split('/');
      return res.status(Number(code)).json({ message });
    }
    next();
  };

  public validateWhatsapp = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    const { error } = contactWhatsapp.validate(req.body);
    if (error) {
      const [code, message] = error.message.split('/');
      return res.status(Number(code)).json({ message });
    }
    next();
  };

  public validateEmail = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    const { error } = contactEmail.validate(req.body);
    if (error) {
      const [code, message] = error.message.split('/');
      return res.status(Number(code)).json({ message });
    }
    next();
  };
}
