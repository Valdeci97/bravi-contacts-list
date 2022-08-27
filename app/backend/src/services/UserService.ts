import { User } from '@prisma/client';
import { hash } from 'bcryptjs';
import Service from '.';
import UserModel from '../models/User';
import HttpException from '../utils/exceptions/HttpException';

const USER_ALREADY_EXISTS = 'User already exists';
const USER_NOT_FOUND = 'User not found!';

export default class UserService extends Service<User> {
  private readonly model: UserModel;

  private readonly hashSalts = 10;

  constructor(model: UserModel = new UserModel()) {
    super();
    this.model = model;
  }

  public async create(obj: User): Promise<User> {
    const userExists = await this.model.findByEmail(obj.email);
    if (userExists) throw new HttpException(409, USER_ALREADY_EXISTS);
    const hashed = await hash(obj.password, this.hashSalts);
    const user = await this.model.create({
      name: obj.name,
      email: obj.email,
      password: hashed,
    } as User);
    return user;
  }

  public async list(): Promise<Array<Partial<User>>> {
    const users = await this.model.list();
    return users;
  }

  public async listById(id: string): Promise<Partial<User>> {
    const user = await this.model.listById(id);
    if (!user) throw new HttpException(404, USER_NOT_FOUND);
    return user;
  }

  public async update(obj: User): Promise<Partial<User>> {
    const userExists = await this.model.listById(obj.id);
    if (!userExists) throw new HttpException(404, USER_NOT_FOUND);
    const user = await this.model.update(obj);
    return user;
  }

  public async destroy(id: string): Promise<void> {
    const user = await this.model.listById(id);
    if (!user) throw new HttpException(404, USER_NOT_FOUND);
    await this.model.destroy(id);
  }
}
