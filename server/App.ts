import  bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import * as errorHandler from './middleware/errorHandler';
import router from "./router/index";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setMiddlewares();
    this.setRoutes();
    this.catchErrors();
  }

  private setMiddlewares(): void {
    this.app.use(cors());
    this.app.use(morgan('dev'));
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(helmet());
  }

  private setRoutes(): void {
    this.app.use('/api', router);
  }

  private catchErrors(): void {
    this.app.use(errorHandler.notFound);
    this.app.use(errorHandler.internalServerError);
  }
}

export default new App().app;