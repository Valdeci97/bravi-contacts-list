import App from './app';
import CustomRouter from './routes';

import UserController from './controllers/UserController';
import ContactController from './controllers/ContactController';
import LoginController from './controllers/LoginController';

import UserMiddleware from './middlewares/UserMiddleware';
import GuidMiddleware from './middlewares/GuidMiddleware';
import ContactMiddleware from './middlewares/ContactMiddleware';

const guidMiddleware = new GuidMiddleware();

const userMiddleware = new UserMiddleware();
const userController = new UserController();
const userRouter = new CustomRouter();

userRouter.addGetRoute(userController.route, userController.read);
userRouter.addGetRoute(
  `${userController.route}/:id`,
  userController.readOne,
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
  guidMiddleware.validateGuid,
  userMiddleware.validateName,
  userMiddleware.validateOptionalEmail,
  userMiddleware.validateOptionalPassword
);
userRouter.addDeleteRoute(
  `${userController.route}/:id`,
  userController.delete,
  guidMiddleware.validateGuid
);

const contactMiddleware = new ContactMiddleware();
const contactController = new ContactController();
const contactRouter = new CustomRouter();

contactRouter.addGetRoute(
  `${contactController.route}/:id`,
  contactController.read
);
contactRouter.addGetRoute(
  `${contactController.route}/:id`,
  contactController.readOne,
  guidMiddleware.validateGuid
);
contactRouter.addPostRoute(
  contactController.route,
  contactController.create,
  contactMiddleware.validatePhone,
  contactMiddleware.validateWhatsapp,
  contactMiddleware.validateEmail
);
contactRouter.addPutRoute(
  contactController.route,
  contactController.update,
  contactMiddleware.validatePhone,
  contactMiddleware.validateWhatsapp,
  contactMiddleware.validateEmail
);
contactRouter.addDeleteRoute(
  `${contactController.route}/:id`,
  contactController.delete,
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
