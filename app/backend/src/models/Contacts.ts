/* eslint-disable camelcase */
import { Contact, PrismaClient, User } from '@prisma/client';
import database from '../database';

export default class ContactModel {
  private model: PrismaClient;

  constructor(model: PrismaClient = database) {
    this.model = model;
  }

  public async findUser(id: string): Promise<User | null> {
    const user = await this.model.user.findFirst({ where: { id } });
    return user;
  }

  public async create(
    { name, phone, whatsapp, email }: Contact,
    id: string
  ): Promise<Contact> {
    const contact = await this.model.contact.create({
      data: { name, phone, whatsapp, email, user_id: id },
    });
    return contact;
  }

  public async list(id: string): Promise<Contact[]> {
    const contacts = await this.model.contact.findMany({
      where: { user_id: id },
    });
    return contacts;
  }

  public async listById(id: string): Promise<Contact | null> {
    const contact = await this.model.contact.findFirst({ where: { id } });
    return contact;
  }

  public async update({
    id,
    name,
    phone,
    whatsapp,
    email,
  }: Contact): Promise<Contact> {
    const updatedContact = await this.model.contact.update({
      where: { id },
      data: { name, phone, whatsapp, email },
    });
    return updatedContact;
  }

  public async destroy(id: string): Promise<void> {
    await this.model.contact.delete({ where: { id } });
  }
}
