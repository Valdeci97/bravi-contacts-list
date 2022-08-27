/* eslint-disable camelcase */
import { Contact, PrismaClient } from '@prisma/client';
import database from '../database';
import HttpException from '../utils/exceptions/HttpException';

export default class ContactModel {
  private model: PrismaClient;

  constructor(model: PrismaClient = database) {
    this.model = model;
  }

  public async create(
    { phone, whatsapp, email }: Contact,
    id: string
  ): Promise<Contact> {
    const user = await this.model.user.findFirst({ where: { id } });
    if (!user) throw new HttpException(404, 'User not found');
    const contact = await this.model.contact.create({
      data: { phone, whatsapp, email, user_id: id },
    });
    return contact;
  }

  public async list(id: string): Promise<Contact[]> {
    const contacts = await this.model.contact.findMany({
      where: { user_id: id },
    });
    return contacts;
  }

  public async listById(id: string): Promise<Contact> {
    const contact = await this.model.contact.findFirst({ where: { id } });
    if (!contact) throw new HttpException(404, 'Contact not found');
    return contact;
  }

  public async update({
    id,
    phone,
    whatsapp,
    email,
  }: Contact): Promise<Contact> {
    const updatedContact = await this.model.contact.update({
      where: { id },
      data: { phone, whatsapp, email },
    });
    return updatedContact;
  }

  public async destroy(id: string): Promise<void> {
    const contact = await this.model.contact.findFirst({ where: { id } });
    if (!contact) throw new HttpException(404, 'Contact not found');
    await this.model.contact.delete({ where: { id } });
  }
}
