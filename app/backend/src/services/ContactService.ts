import { Contact } from '@prisma/client';
import ContactModel from '../models/Contacts';
import HttpException from '../utils/exceptions/HttpException';

export default class ContactService {
  private model: ContactModel;

  constructor(model: ContactModel = new ContactModel()) {
    this.model = model;
  }

  public async create(obj: Contact, id: string): Promise<Contact> {
    const user = await this.model.findUser(id);
    if (!user) throw new HttpException(404, 'User not found');
    const contact = await this.model.create(obj, id);
    return contact;
  }

  public async list(id: string): Promise<Contact[]> {
    const contacts = await this.model.list(id);
    return contacts;
  }

  public async listById(id: string): Promise<Contact> {
    const contact = await this.model.listById(id);
    if (!contact) throw new HttpException(404, 'Contact not found');
    return contact;
  }

  public async update(obj: Contact): Promise<Contact> {
    const updatedContact = await this.model.update(obj);
    return updatedContact;
  }

  public async destroy(id: string): Promise<void> {
    const contact = await this.model.listById(id);
    if (!contact) throw new HttpException(404, 'Contact not found');
    await this.model.destroy(id);
  }
}
