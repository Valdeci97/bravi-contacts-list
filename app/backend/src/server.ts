import App from './app';
import CustomRouter from './routes';
import UserController from './controllers/UserController';

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

const server = new App();

server.addRouter(userRouter.router);

export default server;
