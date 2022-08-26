import App from './app';
import CustomRouter from './routes';

import UserController from './controllers/UserController';
import ContactController from './controllers/ContactController';

import UserMiddleware from './middlewares/UserMiddleware';
import GuidMiddleware from './middlewares/GuidMiddleware';

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

const contactController = new ContactController();
const contactRouter = new CustomRouter();

contactRouter.addGetRoute(contactController.route, contactController.read);
contactRouter.addGetRoute(
  `${contactController.route}/:id`,
  contactController.readOne,
  guidMiddleware.validateGuid
);
contactRouter.addPostRoute(contactController.route, contactController.create);
contactRouter.addPutRoute(contactController.route, contactController.update);
contactRouter.addDeleteRoute(
  `${contactController.route}/:id`,
  contactController.delete,
  guidMiddleware.validateGuid
);

const server = new App();

server.addRouter(userRouter.router);
server.addRouter(contactRouter.router);

server.addErrorMiddleware();

export default server;
