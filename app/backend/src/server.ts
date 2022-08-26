import App from './app';
import CustomRouter from './routes';
import UserController from './controllers/UserController';
import ContactController from './controllers/ContactController';

const userController = new UserController();
const userRouter = new CustomRouter();

userRouter.addGetRoute(userController.route, userController.read);
userRouter.addGetRoute(`${userController.route}/:id`, userController.readOne);
userRouter.addPostRoute(userController.route, userController.create);
userRouter.addPatchRoute(
  `${userController.route}/:id/update-profile`,
  userController.update
);
userRouter.addDeleteRoute(`${userController.route}/:id`, userController.delete);

const contactController = new ContactController();
const contactRouter = new CustomRouter();

contactRouter.addGetRoute(contactController.route, contactController.read);
contactRouter.addGetRoute(
  `${contactController.route}/:id`,
  contactController.readOne
);
contactRouter.addPostRoute(contactController.route, contactController.create);
contactRouter.addPutRoute(contactController.route, contactController.update);
contactRouter.addDeleteRoute(
  `${contactController.route}/:id`,
  contactController.delete
);

const server = new App();

server.addRouter(userRouter.router);
server.addRouter(contactRouter.router);

server.addErrorMiddleware();

export default server;
