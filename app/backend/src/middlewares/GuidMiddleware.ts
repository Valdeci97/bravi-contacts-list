import { NextFunction, Request, Response } from 'express';
import { uuidBodySchema, uuidSchema } from '../utils/joi-schemas/uuid';

export default class GuidMiddleware {
  public validateGuid = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    const { id } = req.params;
    const { error } = uuidSchema.validate(id);
    if (error) {
      const [code, message] = error.message.split('/');
      return res.status(Number(code)).json({ message });
    }
    next();
  };

  public validateBodyGuid = (
    req: Request,
    res: Response,
    next: NextFunction
  ): Response | void => {
    const { error } = uuidBodySchema.validate(req.user);
    if (error) {
      const [code, message] = error.message.split('/');
      return res.status(Number(code)).json({ message });
    }
    next();
  };
}
