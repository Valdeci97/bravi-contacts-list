import App from './app';
import CustomRouter from './routes';

import UserController from './controllers/UserController';
import ContactController from './controllers/ContactController';
import LoginController from './controllers/LoginController';

import UserMiddleware from './middlewares/UserMiddleware';
import GuidMiddleware from './middlewares/GuidMiddleware';
import ContactMiddleware from './middlewares/ContactMiddleware';
import TokenMiddleware from './middlewares/Token';

const guidMiddleware = new GuidMiddleware();
const tokenMiddleware = new TokenMiddleware();

const userMiddleware = new UserMiddleware();
const userController = new UserController();
const userRouter = new CustomRouter();

userRouter.addGetRoute(
  userController.route,
  userController.read,
  tokenMiddleware.validate
);
userRouter.addGetRoute(
  `${userController.route}/:id`,
  userController.readOne,
  tokenMiddleware.validate,
  guidMiddleware.validateGuid
);
userRouter.addPostRoute(
  userController.route,
  userController.create,
  userMiddleware.validateName,
  userMiddleware.validateEmail,
  userMiddleware.validatePassword
);
userRouter.addPatchRoute(
  `${userController.route}/:id/update-profile`,
  userController.update,
  tokenMiddleware.validate,
  guidMiddleware.validateGuid,
  userMiddleware.validateName,
  userMiddleware.validateOptionalEmail,
  userMiddleware.validateOptionalPassword
);
userRouter.addDeleteRoute(
  `${userController.route}/:id`,
  userController.delete,
  tokenMiddleware.validate,
  guidMiddleware.validateGuid
);

const contactMiddleware = new ContactMiddleware();
const contactController = new ContactController();
const contactRouter = new CustomRouter();

contactRouter.addGetRoute(
  contactController.route,
  contactController.read,
  tokenMiddleware.validate,
  guidMiddleware.validateBodyGuid
);
contactRouter.addGetRoute(
  `${contactController.route}/:id`,
  contactController.readOne,
  tokenMiddleware.validate,
  guidMiddleware.validateGuid
);
contactRouter.addPostRoute(
  contactController.route,
  contactController.create,
  tokenMiddleware.validate,
  contactMiddleware.validatePhone,
  contactMiddleware.validateWhatsapp,
  contactMiddleware.validateEmail,
  guidMiddleware.validateBodyGuid
);
contactRouter.addPutRoute(
  contactController.route,
  contactController.update,
  tokenMiddleware.validate,
  contactMiddleware.validatePhone,
  contactMiddleware.validateWhatsapp,
  contactMiddleware.validateEmail
);
contactRouter.addDeleteRoute(
  `${contactController.route}/:id`,
  contactController.delete,
  tokenMiddleware.validate,
  guidMiddleware.validateGuid
);

const loginController = new LoginController();
const loginRouter = new CustomRouter();

loginRouter.addPostRoute(
  '/login',
  loginController.login,
  userMiddleware.validateEmail
);

const server = new App();

server.addRouter(userRouter.router);
server.addRouter(contactRouter.router);
server.addRouter(loginRouter.router);

server.addErrorMiddleware();

export default server;
