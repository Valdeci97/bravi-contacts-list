import { User } from '@prisma/client';

export type UserWithToken = {
  user: Partial<User>;
  token: string;
};
