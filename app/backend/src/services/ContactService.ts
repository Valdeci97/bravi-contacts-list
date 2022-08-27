/* eslint-disable camelcase */
import { Contact } from '@prisma/client';
import ContactModel from '../models/Contacts';

export default class ContactService {
  private model: ContactModel;

  constructor(model: ContactModel = new ContactModel()) {
    this.model = model;
  }

  public async create(obj: Contact, id: string): Promise<Contact> {
    const contact = await this.model.create(obj, id);
    return contact;
  }

  public async list(id: string): Promise<Contact[]> {
    const contacts = await this.model.list(id);
    return contacts;
  }

  public async listById(id: string): Promise<Contact> {
    const contact = await this.model.listById(id);
    return contact;
  }

  public async update(obj: Contact): Promise<Contact> {
    const updatedContact = await this.model.update(obj);
    return updatedContact;
  }

  public async destroy(id: string): Promise<void> {
    await this.model.destroy(id);
  }
}
