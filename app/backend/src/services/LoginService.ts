import { PrismaClient, User } from '@prisma/client';
import { compare } from 'bcryptjs';
import database from '../database';
import { UserWithToken } from '../types/UserWithToken';
import HttpException from '../utils/exceptions/HttpException';
import JsonWebToken from '../utils/jwt';

export default class LoginService {
  private model: PrismaClient;

  constructor(model: PrismaClient = database) {
    this.model = model;
  }

  public async login({ email, password }: User): Promise<UserWithToken> {
    const user = await this.findByEmail(email);
    if (!user) throw new HttpException(404, 'User not found');
    const isSamePassword = await compare(password, user.password);
    if (!isSamePassword) {
      throw new HttpException(400, 'Incorrect email or password');
    }
    const token = JsonWebToken.generate({ id: user.id });
    return { user: { id: user.id, name: user.name }, token };
  }

  private async findByEmail(email: string) {
    return this.model.user.findFirst({ where: { email } });
  }
}
