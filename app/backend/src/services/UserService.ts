import { User } from '@prisma/client';
import Service from '.';
import UserModel from '../models/User';

export default class UserService extends Service<User> {
  private readonly model: UserModel;

  private readonly hashSalts = 10;

  constructor(model: UserModel = new UserModel()) {
    super();
    this.model = model;
  }

  public async create(obj: User): Promise<User> {
    const user = await this.model.create(obj);
    return user;
  }

  public async list(): Promise<Array<Partial<User>>> {
    const users = await this.model.list();
    return users;
  }

  public async listById(id: string): Promise<Partial<User>> {
    const user = await this.model.listById(id);
    return user;
  }

  public async update(obj: User): Promise<Partial<User>> {
    const user = await this.model.update(obj);
    return user;
  }

  public async destroy(id: string): Promise<void> {
    await this.model.destroy(id);
  }
}
