import { User as Users } from 'generated/prisma/client';

export class User implements Users {
  id: string;
  email: string;
  name: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
}
