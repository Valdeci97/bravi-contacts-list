import express, { Router, ErrorRequestHandler } from 'express';
import cors from 'cors';
import GlobalErrorHandler from './middlewares';

export default class App {
  private app: express.Application;

  constructor() {
    this.app = express();
    this.app.use(express.json());
    this.app.use(cors());
  }

  public start(PORT: number | string = 3001): void {
    this.app.listen(PORT, () => console.log('Server runing at port', PORT));
  }

  public addRouter(router: Router): void {
    this.app.use(router);
  }

  public getApp(): express.Application {
    return this.app;
  }

  public addErrorMiddleware(
    middleware: ErrorRequestHandler = new GlobalErrorHandler().error
  ): void {
    this.app.use(middleware);
  }
}
