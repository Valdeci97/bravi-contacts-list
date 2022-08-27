import { PrismaClient, User } from '@prisma/client';
import { compare, hash } from 'bcryptjs';
import database from '../database';
import HttpException from '../utils/exceptions/HttpException';

const EMAIL_IN_USE = 'Email already in use.';
const EQUAL_PASSWORD = 'New password must be different than the old one.';
const USER_NOT_FOUND = 'User not found!';

export default class UserModel {
  private db: PrismaClient;

  private hashSalts = 10;

  constructor(db: PrismaClient = database) {
    this.db = db;
  }

  public async create({ name, email, password }: User): Promise<User> {
    const user = await this.db.user.create({
      data: { name, email, password },
    });
    return user;
  }

  public async list(): Promise<Array<Partial<User>>> {
    const users = await this.db.user.findMany({
      select: { id: true, name: true, email: true },
    });
    return users;
  }

  public async listById(id: string): Promise<Partial<User | null>> {
    const user = await this.db.user.findFirst({
      where: { id },
      select: { id: true, name: true, email: true },
    });
    return user;
  }

  public async update(obj: User): Promise<Partial<User>> {
    const updatedUser = await this.updateUserInfo(obj);
    return {
      id: updatedUser.id,
      name: updatedUser.name,
      email: updatedUser.email,
    };
  }

  public async destroy(id: string): Promise<void> {
    await this.db.user.delete({ where: { id } });
  }

  public async findByEmail(email: string): Promise<User | null> {
    const user = await this.db.user.findFirst({ where: { email } });
    return user;
  }

  private async isInvalidEmailToUpdate(
    email: string,
    id: string
  ): Promise<boolean | null> {
    const user = await this.findByEmail(email);
    return user && user.id !== id;
  }

  private async isInvalidPasswordToUpdate(password: string, id: string) {
    const user = await this.db.user.findFirst({ where: { id } });
    if (!user) throw new HttpException(404, USER_NOT_FOUND);
    const isValid = await compare(password, user.password);
    return isValid;
  }

  private async updateName(name: string, id: string): Promise<User> {
    const user = await this.db.user.update({
      where: { id },
      data: { name },
    });
    return user;
  }

  private async updateEmail(
    name: string,
    email: string,
    id: string
  ): Promise<User> {
    const isInValidEmail = await this.isInvalidEmailToUpdate(email, id);
    if (isInValidEmail) throw new HttpException(409, EMAIL_IN_USE);
    const user = await this.db.user.update({
      where: { id },
      data: { name, email },
    });
    return user;
  }

  private async updatePassword(
    name: string,
    password: string,
    id: string
  ): Promise<User> {
    const isInValidPassword = await this.isInvalidPasswordToUpdate(
      password,
      id
    );
    if (isInValidPassword) throw new HttpException(409, EQUAL_PASSWORD);
    const hashed = await hash(password, this.hashSalts);
    const user = await this.db.user.update({
      where: { id },
      data: { name, password: hashed },
    });
    return user;
  }

  private async updateUser(
    id: string,
    name: string,
    email: string,
    password: string
  ): Promise<User> {
    if (!email && !password) return this.updateName(name, id);
    const [isInValidEmail, isInValidPassword] = await Promise.all([
      this.isInvalidEmailToUpdate(email, id),
      this.isInvalidPasswordToUpdate(password, id),
    ]);
    if (isInValidEmail) throw new HttpException(409, EMAIL_IN_USE);
    if (isInValidPassword) throw new HttpException(409, EQUAL_PASSWORD);
    const hashed = await hash(password, this.hashSalts);
    const user = await this.db.user.update({
      where: { id },
      data: { name, email, password: hashed },
    });
    return user;
  }

  private async updateUserInfo({
    id,
    name,
    email,
    password,
  }: User): Promise<User> {
    if (email && !password) return this.updateEmail(name, email, id);
    if (!email && password) return this.updatePassword(name, password, id);
    const user = await this.updateUser(id, name, email, password);
    return user;
  }
}
